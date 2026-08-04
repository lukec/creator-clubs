import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import { sampleThreeClubCascade } from "./cascade-model.mjs";
import {
  CREATOR_CLUB_DIMENSIONS,
  creatorClubRadiusAt,
  makeCreatorClubGeometries,
} from "./creator-club-geometry.mjs";
import {
  createThemeFrame,
  findThemePage,
  renderThemeEffect,
  THEME_EFFECT_COUNT,
  THEME_PAGES,
} from "./theme-pages.mjs";

const LED_COUNT = 32;
const EMISSION_LUMINANCE_FLOOR = 0.08;
const EMISSION_GAIN_LIMIT = 12.5;
const WHITE_EMISSION_SCALE = 0.78;
const DIFFUSION_TINT_GAIN = 12.0;
const REC709_LUMA = Object.freeze([0.2126, 0.7152, 0.0722]);
export const CREATOR_CLUB_OPTICS = Object.freeze({
  bodyAxialSigma: 0.26,
  bodyCoreRadius: 0.105,
  bodyCoreStrength: 0.06,
  bodyHaloStrength: 0.23,
  bodyWrap: 0.22,
  handleAxialSigma: 0.11,
  handleCoreRadius: 0.07,
  handleCoreStrength: 0.22,
  handleHaloStrength: 0.13,
  handleWrap: 0.10,
  coreEmissionScale: 1.05,
  coreEmissionLimit: 1.25,
  haloEmissionScale: 0.18,
  haloEmissionLimit: 0.22,
  diffusionTintGain: DIFFUSION_TINT_GAIN,
  whiteEmissionScale: WHITE_EMISSION_SCALE,
});
export const CREATOR_CLUB_SCENE_LIGHTING = Object.freeze({
  shellAmbient: 0.10,
  shellKey: 0.12,
  shellFill: 0.04,
  shellRim: 0.05,
  hemisphereIntensity: 0.16,
  keyIntensity: 0.20,
  fillIntensity: 0.06,
});
export const CREATOR_CLUB_TRIM = Object.freeze({
  knobColor: 0xf1f0ea,
  knobOpacity: 0.86,
  capColor: 0xf4f3ee,
  capOpacity: 0.82,
});
const DEFAULT_FRAME = Array.from({ length: LED_COUNT }, () => [0, 0, 0]);
const LED_LAYOUT = Object.freeze(Array.from({ length: LED_COUNT }, (_, index) => {
  const body = index >= 16;
  const localIndex = body ? index - 16 : index;
  const y = body
    ? -0.39 + localIndex * (2.22 / 15)
    : -2.05 + localIndex * (1.50 / 15);
  return Object.freeze({
    index,
    y,
    shellRadius: creatorClubRadiusAt(y),
  });
}));
const LED_Y = Float32Array.from(LED_LAYOUT, ({ y }) => y);
const LED_SHELL_RADIUS = Float32Array.from(LED_LAYOUT, ({ shellRadius }) => shellRadius);

const clampChannel = (value) => Math.max(0, Math.min(255, Math.round(Number(value) || 0)));

export const chromaEmissionGain = (linearRgb) => {
  if (!Array.isArray(linearRgb) || linearRgb.length < 3) {
    throw new TypeError("linearRgb must contain three channels");
  }
  const channels = linearRgb.slice(0, 3).map((value) => Math.max(0, Number(value) || 0));
  const peak = Math.max(...channels);
  if (peak <= 0) return 1;
  const hue = channels.map((value) => value / peak);
  const luminance = hue.reduce((sum, value, index) => sum + value * REC709_LUMA[index], 0);
  return Math.min(EMISSION_GAIN_LIMIT, 1 / Math.max(luminance, EMISSION_LUMINANCE_FLOOR));
};

export const whiteEmissionRestraint = (linearRgb) => {
  if (!Array.isArray(linearRgb) || linearRgb.length < 3) {
    throw new TypeError("linearRgb must contain three channels");
  }
  const channels = linearRgb.slice(0, 3).map((value) => Math.max(0, Number(value) || 0));
  const peak = Math.max(...channels);
  if (peak <= 0) return 1;
  const trough = Math.min(...channels);
  const saturation = (peak - trough) / peak;
  const edge = Math.max(0, Math.min(1, saturation / 0.72));
  const smooth = edge * edge * (3 - 2 * edge);
  return WHITE_EMISSION_SCALE + (1 - WHITE_EMISSION_SCALE) * smooth;
};

export const diffusionTintCoverage = (diffusionCoverage) => (
  Math.min(0.98, 1 - Math.exp(-Math.max(0, Number(diffusionCoverage) || 0) * DIFFUSION_TINT_GAIN))
);

const copyFrame = (frame, target) => {
  if (!Array.isArray(frame) || frame.length !== LED_COUNT) {
    throw new TypeError("Creator Club preview frame must contain 32 RGB entries");
  }
  frame.forEach((rgb, index) => {
    if (!Array.isArray(rgb) || rgb.length < 3) throw new TypeError("invalid RGB entry");
    target[index][0] = clampChannel(rgb[0]);
    target[index][1] = clampChannel(rgb[1]);
    target[index][2] = clampChannel(rgb[2]);
  });
  return target;
};

const VERTEX_SHADER = /* glsl */`
  varying vec3 vClubPosition;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldRadial;
  varying vec3 vWorldSourceAxis;

  void main() {
    vClubPosition = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldRadial = normalize(mat3(modelMatrix) * vec3(position.x, 0.0, position.z));
    // The working physical model gives each controlled axial pixel an opposed
    // emitter pair. Keep that pair fixed in club coordinates so axial Roll
    // moves the hotspots around the shell instead of pinning a fake LED rail
    // to the camera-facing centreline.
    vWorldSourceAxis = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */`
  uniform sampler2D ledFrame;
  uniform float ledY[32];
  uniform float ledShellRadius[32];

  const vec3 REC709_LUMA = vec3(0.2126, 0.7152, 0.0722);
  const float EMISSION_LUMINANCE_FLOOR = ${EMISSION_LUMINANCE_FLOOR};
  const float EMISSION_GAIN_LIMIT = ${EMISSION_GAIN_LIMIT};
  const float WHITE_EMISSION_SCALE = ${WHITE_EMISSION_SCALE};

  float emissionGain(vec3 color) {
    float peak = max(max(color.r, color.g), color.b);
    vec3 hue = color / max(peak, 0.0001);
    float hueLuminance = dot(hue, REC709_LUMA);
    return min(
      EMISSION_GAIN_LIMIT,
      1.0 / max(hueLuminance, EMISSION_LUMINANCE_FLOOR)
    );
  }

  float whiteRestraint(vec3 color) {
    float peak = max(max(color.r, color.g), color.b);
    float trough = min(min(color.r, color.g), color.b);
    float saturation = (peak - trough) / max(peak, 0.0001);
    return mix(WHITE_EMISSION_SCALE, 1.0, smoothstep(0.0, 0.72, saturation));
  }

  vec3 srgbToLinear(vec3 color) {
    vec3 low = color / 12.92;
    vec3 high = pow((color + 0.055) / 1.055, vec3(2.4));
    return mix(low, high, step(vec3(0.04045), color));
  }

  varying vec3 vClubPosition;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldRadial;
  varying vec3 vWorldSourceAxis;

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 keyDirection = normalize(vec3(-0.32, 0.78, 0.54));
    vec3 fillDirection = normalize(vec3(0.58, 0.28, -0.76));
    float key = max(dot(normal, keyDirection), 0.0);
    float fill = max(dot(normal, fillDirection), 0.0);
    float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.0);
    // Rehearsal happens in a dark room. Keep only enough neutral inspection
    // light to locate an unpowered shell; powered pixels should dominate.
    float shellLight = ${CREATOR_CLUB_SCENE_LIGHTING.shellAmbient.toFixed(2)}
      + key * ${CREATOR_CLUB_SCENE_LIGHTING.shellKey.toFixed(2)}
      + fill * ${CREATOR_CLUB_SCENE_LIGHTING.shellFill.toFixed(2)}
      + rim * ${CREATOR_CLUB_SCENE_LIGHTING.shellRim.toFixed(2)};
    vec3 shellColor = vec3(0.96, 0.955, 0.94) * shellLight;

    float surfaceRadius = max(length(vClubPosition.xz), 0.08);
    // Two sources point along +Z and -Z in club coordinates. abs(dot()) chooses
    // the nearer member of that opposed pair for each visible shell fragment.
    // Unlike the previous camera-facing approximation, this axis rotates with
    // the club and makes Roll optically visible.
    float sourceFacing = clamp(abs(dot(
      normalize(vWorldRadial),
      normalize(vWorldSourceAxis)
    )), 0.0, 1.0);
    float arcDistance = acos(sourceFacing) * surfaceRadius;
    float bodyAngularHalo = exp(-0.5 * (arcDistance / 0.30) * (arcDistance / 0.30));
    float handleAngularHalo = exp(-0.5 * (arcDistance / 0.12) * (arcDistance / 0.12));
    vec3 weightedHaloColor = vec3(0.0);
    vec3 weightedCoreColor = vec3(0.0);
    float haloColorWeight = 0.0;
    float coreColorWeight = 0.0;
    float diffusionCoverage = 0.0;
    float coreCoverage = 0.0;

    for (int index = 0; index < 32; index += 1) {
      bool body = index >= 16;
      vec4 led = texture2D(ledFrame, vec2((float(index) + 0.5) / 32.0, 0.5));
      float intensity = led.a;
      vec3 linearRgb = srgbToLinear(led.rgb);
      float linearPeak = max(max(linearRgb.r, linearRgb.g), linearRgb.b);
      vec3 hue = linearRgb / max(linearPeak, 0.0001);
      float axialDistance = abs(vClubPosition.y - ledY[index]);
      float axialSigma = body
        ? ${CREATOR_CLUB_OPTICS.bodyAxialSigma}
        : ${CREATOR_CLUB_OPTICS.handleAxialSigma};
      float axialRatio = axialDistance / axialSigma;
      float axialHalo = exp(-0.5 * axialRatio * axialRatio);
      float angularHalo = body ? bodyAngularHalo : handleAngularHalo;
      float wrap = body
        ? ${CREATOR_CLUB_OPTICS.bodyWrap}
        : ${CREATOR_CLUB_OPTICS.handleWrap};
      float haloStrength = body
        ? ${CREATOR_CLUB_OPTICS.bodyHaloStrength}
        : ${CREATOR_CLUB_OPTICS.handleHaloStrength};
      float halo = axialHalo * mix(wrap, 1.0, angularHalo) * haloStrength * intensity;
      float radiusScale = clamp(ledShellRadius[index] / 0.41, 0.28, 1.0);
      float coreRadius = (body
        ? ${CREATOR_CLUB_OPTICS.bodyCoreRadius}
        : ${CREATOR_CLUB_OPTICS.handleCoreRadius})
        * mix(0.86, 1.08, radiusScale);
      float axialCore = axialDistance / coreRadius;
      float angularCore = arcDistance / coreRadius;
      float coreDistance = sqrt(axialCore * axialCore + angularCore * angularCore);
      float coreStrength = body
        ? ${CREATOR_CLUB_OPTICS.bodyCoreStrength}
        : ${CREATOR_CLUB_OPTICS.handleCoreStrength};
      float core = (1.0 - smoothstep(0.68, 1.0, coreDistance))
        * intensity
        * coreStrength;
      float coreWeight = core * 1.35;
      weightedHaloColor += hue * halo;
      weightedCoreColor += hue * coreWeight;
      haloColorWeight += halo;
      coreColorWeight += coreWeight;
      diffusionCoverage += halo;
      coreCoverage = max(coreCoverage, core);
    }

    vec3 haloColor = weightedHaloColor / max(haloColorWeight, 0.0001);
    vec3 coreColor = weightedCoreColor / max(coreColorWeight, 0.0001);
    if (haloColorWeight < 0.0001) haloColor = coreColor;
    if (coreColorWeight < 0.0001) coreColor = haloColor;
    // Averaging two saturated neighbours lowers the peak channel. Feeding that
    // pale average into the white shell makes a red/blue boundary look white.
    // Intensity already lives in the coverage terms, so restore only hue/chroma
    // here before the shell and emission stages.
    haloColor /= max(max(haloColor.r, haloColor.g), max(haloColor.b, 0.0001));
    coreColor /= max(max(coreColor.r, coreColor.g), max(coreColor.b, 0.0001));
    float coreDominance = smoothstep(0.04, 0.55, coreCoverage);
    vec3 ledColor = mix(haloColor, coreColor, coreDominance);
    float diffusionTint = 1.0 - exp(-diffusionCoverage * ${DIFFUSION_TINT_GAIN.toFixed(1)});
    float coverage = clamp(max(coreCoverage * 0.98, diffusionTint), 0.0, 0.98);
    // Preserve the white shell when dark, but let powered pixels emit bounded
    // HDR energy. The post-process bloom pass turns only values above the white
    // shell into a visible halo.
    float coreEmission = clamp(
      coreCoverage * ${CREATOR_CLUB_OPTICS.coreEmissionScale},
      0.0,
      ${CREATOR_CLUB_OPTICS.coreEmissionLimit}
    );
    // The diffuser is the visible emitter. Drive broad HDR energy from the
    // shell tint, not from raw point-source coverage, so a luminous club does
    // not require exposing a dotted LED rail.
    float haloEmission = clamp(
      diffusionTint * ${CREATOR_CLUB_OPTICS.haloEmissionScale},
      0.0,
      ${CREATOR_CLUB_OPTICS.haloEmissionLimit}
    );
    // A normal display gives white three emitting subpixels but saturated red
    // or blue only one dominant subpixel. The real club does not have that
    // screen-channel handicap: saturated light still pours through a large
    // diffusing shell. Normalize the HDR emission by hue luminance so all
    // full-power hues cross the bloom threshold with comparable energy. This
    // affects only emitted light; the unpowered white shell stays calibrated.
    vec3 coloredShell = ledColor * (0.72 + shellLight * 0.28);
    // Tone mapping turns small secondary channels into pale cores when HDR is
    // high. Compress those secondary channels for emission only; the diffuser
    // shell above retains the authored hue. White remains white because all
    // three normalized channels are one.
    vec3 coreEmissionColor = coreColor * coreColor;
    vec3 haloEmissionColor = haloColor * haloColor;
    vec3 outputColor = mix(shellColor, coloredShell, coverage)
      + coreEmissionColor * coreEmission * emissionGain(coreEmissionColor) * whiteRestraint(coreColor)
      + haloEmissionColor * haloEmission * emissionGain(haloEmissionColor) * whiteRestraint(haloColor);

    gl_FragColor = vec4(outputColor, 1.0);
  }
`;

const makeLedTexture = () => {
  const data = new Uint8Array(LED_COUNT * 4);
  const texture = new THREE.DataTexture(
    data,
    LED_COUNT,
    1,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  // Decode the author-facing sRGB bytes explicitly in the custom shader. This
  // keeps saturated police red/blue from carrying their nonlinear mid-channels
  // into HDR emission and washing toward white under tone mapping.
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return { data, texture };
};

const makeTrimMaterials = () => Object.freeze({
  knob: new THREE.MeshStandardMaterial({
    color: CREATOR_CLUB_TRIM.knobColor,
    roughness: 0.92,
    metalness: 0,
    transparent: true,
    opacity: CREATOR_CLUB_TRIM.knobOpacity,
  }),
  cap: new THREE.MeshStandardMaterial({
    color: CREATOR_CLUB_TRIM.capColor,
    roughness: 0.88,
    metalness: 0,
    transparent: true,
    opacity: CREATOR_CLUB_TRIM.capOpacity,
  }),
});

const makeClub = (geometries, trimMaterials) => {
  const group = new THREE.Group();
  const clubParts = new THREE.Group();
  // Cascade poses rotate around the measured balance point rather than the
  // geometric midpoint of the 515 mm envelope.
  clubParts.position.y = -CREATOR_CLUB_DIMENSIONS.balanceY;
  const ledTexture = makeLedTexture();
  const shellMaterial = new THREE.ShaderMaterial({
    uniforms: {
      ledFrame: { value: ledTexture.texture },
      ledY: { value: LED_Y },
      ledShellRadius: { value: LED_SHELL_RADIUS },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: false,
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide,
    toneMapped: true,
  });
  const shell = new THREE.Mesh(geometries.shell, shellMaterial);
  const knob = new THREE.Mesh(geometries.knob, trimMaterials.knob);
  const cap = new THREE.Mesh(geometries.cap, trimMaterials.cap);
  clubParts.add(shell, knob, cap);
  group.add(clubParts);
  group.scale.setScalar(0.72);
  return {
    group,
    ledTexture,
    shellMaterial,
  };
};

const applyFrame = (club, frame) => {
  const { data, texture } = club.ledTexture;
  let changed = false;
  frame.forEach(([red, green, blue], index) => {
    const offset = index * 4;
    const peak = Math.max(red, green, blue);
    if (
      data[offset] !== red
      || data[offset + 1] !== green
      || data[offset + 2] !== blue
      || data[offset + 3] !== peak
    ) {
      data[offset] = red;
      data[offset + 1] = green;
      data[offset + 2] = blue;
      data[offset + 3] = peak;
      changed = true;
    }
  });
  if (changed) {
    texture.needsUpdate = true;
  }
};

export function createCreatorClubPreview({ mount, ariaLabel = "Three illuminated clubs juggling a cascade" }) {
  if (!(mount instanceof HTMLElement)) throw new TypeError("mount must be an HTMLElement");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
  camera.position.set(0, 1.65, 15.4);
  camera.lookAt(0, 1.15, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute("aria-label", ariaLabel);
  renderer.domElement.dataset.clubCount = "3";
  renderer.domElement.dataset.ledCount = String(LED_COUNT);
  mount.replaceChildren(renderer.domElement);

  const hemisphere = new THREE.HemisphereLight(
    0xf2f4ff,
    0x171921,
    CREATOR_CLUB_SCENE_LIGHTING.hemisphereIntensity,
  );
  const key = new THREE.DirectionalLight(
    0xffffff,
    CREATOR_CLUB_SCENE_LIGHTING.keyIntensity,
  );
  key.position.set(-4, 7, 8);
  const fill = new THREE.DirectionalLight(
    0xb8ccff,
    CREATOR_CLUB_SCENE_LIGHTING.fillIntensity,
  );
  fill.position.set(5, 2, -6);
  scene.add(hemisphere, key, fill);

  const geometries = makeCreatorClubGeometries({ segments: 72 });
  const trimMaterials = makeTrimMaterials();
  const clubs = [0, 1, 2].map(() => makeClub(geometries, trimMaterials));
  clubs.forEach((club) => scene.add(club.group));

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(1, 1),
    0.72,
    0.48,
    1.02,
  );
  const outputPass = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  let disposed = false;
  let lastWidth = 0;
  let lastHeight = 0;
  const frameBuffers = [0, 1, 2].map(() => Array.from({ length: LED_COUNT }, () => [0, 0, 0]));
  frameBuffers.forEach((frame) => copyFrame(DEFAULT_FRAME, frame));
  const frames = [frameBuffers[0], frameBuffers[0], frameBuffers[0]];

  const resize = () => {
    if (disposed) return;
    const width = Math.max(1, Math.round(mount.clientWidth));
    const height = Math.max(1, Math.round(mount.clientHeight));
    if (width === lastWidth && height === lastHeight) return;
    lastWidth = width;
    lastHeight = height;
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);
  resize();

  const setFrames = (nextFrames) => {
    if (Array.isArray(nextFrames) && nextFrames.length === 3 && Array.isArray(nextFrames[0]?.[0])) {
      nextFrames.forEach((frame, index) => copyFrame(frame, frameBuffers[index]));
      frames[0] = frameBuffers[0];
      frames[1] = frameBuffers[1];
      frames[2] = frameBuffers[2];
      return;
    }
    copyFrame(nextFrames, frameBuffers[0]);
    frames[0] = frameBuffers[0];
    frames[1] = frameBuffers[0];
    frames[2] = frameBuffers[0];
  };

  const setView = ({ position = [0, 1.65, 15.4], target = [0, 1.15, 0], fov = 37 } = {}) => {
    const values = [...position, ...target, fov];
    if (position.length !== 3 || target.length !== 3 || !values.every(Number.isFinite)) {
      throw new TypeError("camera position, target, and fov must be finite");
    }
    camera.position.set(...position);
    camera.fov = fov;
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
  };

  const render = (timeSeconds, nextFrames) => {
    if (disposed) return;
    if (nextFrames !== undefined) setFrames(nextFrames);
    resize();
    const poses = sampleThreeClubCascade(timeSeconds);
    clubs.forEach((club, index) => {
      const pose = poses[index];
      club.group.position.set(pose.position.x, pose.position.y, pose.position.z);
      club.group.quaternion.set(
        pose.quaternion.x,
        pose.quaternion.y,
        pose.quaternion.z,
        pose.quaternion.w,
      );
      applyFrame(club, frames[index]);
    });
    composer.render();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    resizeObserver.disconnect();
    clubs.forEach((club) => {
      club.ledTexture.texture.dispose();
      club.shellMaterial.dispose();
    });
    Object.values(geometries).forEach((geometry) => geometry.dispose());
    Object.values(trimMaterials).forEach((material) => material.dispose());
    bloomPass.dispose();
    outputPass.dispose();
    composer.dispose();
    renderer.dispose();
    mount.replaceChildren();
  };

  render(0.78, DEFAULT_FRAME);
  return Object.freeze({
    dispose,
    render,
    setFrames,
    setView,
    debug: () => ({
      clubCount: clubs.length,
      ledCount: LED_COUNT,
      rendererCount: 1,
      drawCalls: clubs.length * 3,
      lightModel: "internal-point-led-with-diffuser",
      glowModel: "separated-core-halo-hdr-bloom",
      revision: THREE.REVISION,
      width: lastWidth,
      height: lastHeight,
    }),
  });
}

export function createCreatorClubGallery({
  mount,
  tileElements,
  ariaLabel = "Eight illuminated Creator Clubs showing the selected effect page",
}) {
  if (!(mount instanceof HTMLElement)) throw new TypeError("mount must be an HTMLElement");
  if (!Array.isArray(tileElements) || tileElements.length !== 8) {
    throw new TypeError("tileElements must contain eight gallery tiles");
  }
  if (!tileElements.every((tile) => tile instanceof HTMLElement)) {
    throw new TypeError("every gallery tile must be an HTMLElement");
  }

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(0, 0, 18);
  camera.lookAt(0, 0, 0);

  // One WebGL context and one bloom pipeline render all eight tiles. Eight
  // independent contexts were noticeably slower on phones and can exceed a
  // browser's context budget once the separate juggling preview is opened.
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.35));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.className = "club-gallery-canvas";
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute("aria-label", ariaLabel);
  renderer.domElement.dataset.clubCount = "8";
  renderer.domElement.dataset.ledCount = String(LED_COUNT);
  mount.prepend(renderer.domElement);

  const hemisphere = new THREE.HemisphereLight(
    0xf2f4ff,
    0x171921,
    CREATOR_CLUB_SCENE_LIGHTING.hemisphereIntensity,
  );
  const key = new THREE.DirectionalLight(
    0xffffff,
    CREATOR_CLUB_SCENE_LIGHTING.keyIntensity,
  );
  key.position.set(-4, 7, 8);
  const fill = new THREE.DirectionalLight(
    0xb8ccff,
    CREATOR_CLUB_SCENE_LIGHTING.fillIntensity,
  );
  fill.position.set(5, 2, -6);
  scene.add(hemisphere, key, fill);

  const geometries = makeCreatorClubGeometries({ segments: 72 });
  const trimMaterials = makeTrimMaterials();
  const clubs = tileElements.map(() => makeClub(geometries, trimMaterials));
  clubs.forEach((club) => scene.add(club.group));

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(1, 1),
    0.72,
    0.48,
    1.02,
  );
  const outputPass = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  let disposed = false;
  let lastWidth = 0;
  let lastHeight = 0;
  let layoutDirty = true;
  let activeCount = clubs.length;
  const frameBuffers = clubs.map(() => Array.from({ length: LED_COUNT }, () => [0, 0, 0]));
  frameBuffers.forEach((frame) => copyFrame(DEFAULT_FRAME, frame));

  const updateLayout = () => {
    if (disposed) return;
    const width = Math.max(1, Math.round(mount.clientWidth));
    const height = Math.max(1, Math.round(mount.clientHeight));
    if (width !== lastWidth || height !== lastHeight) {
      lastWidth = width;
      lastHeight = height;
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      layoutDirty = true;
    }
    if (!layoutDirty) return;

    const mountRect = mount.getBoundingClientRect();
    const tileRects = tileElements.slice(0, activeCount).map((tile) => tile.getBoundingClientRect());
    const tileSize = Math.max(1, Math.min(...tileRects.map((rect) => Math.min(rect.width, rect.height))));
    const pixelsPerUnit = tileSize / 4.35;
    camera.left = -width / (2 * pixelsPerUnit);
    camera.right = width / (2 * pixelsPerUnit);
    camera.top = height / (2 * pixelsPerUnit);
    camera.bottom = -height / (2 * pixelsPerUnit);
    camera.updateProjectionMatrix();

    clubs.forEach((club, index) => {
      club.group.visible = index < activeCount;
      if (!club.group.visible) return;
      const rect = tileRects[index];
      const centerX = rect.left - mountRect.left + rect.width / 2;
      // Bias toward the visual upper half so the club does not hide behind the
      // name/description overlay at the bottom of the square.
      const centerY = rect.top - mountRect.top + rect.height * 0.44;
      club.group.position.set(
        (centerX - width / 2) / pixelsPerUnit,
        (height / 2 - centerY) / pixelsPerUnit,
        0,
      );
    });
    layoutDirty = false;
  };

  const resizeObserver = new ResizeObserver(() => {
    layoutDirty = true;
    updateLayout();
  });
  resizeObserver.observe(mount);
  tileElements.forEach((tile) => resizeObserver.observe(tile));
  updateLayout();

  const flipAxis = new THREE.Vector3(0, 0, 1);
  const rollAxis = new THREE.Vector3(0, 1, 0);
  const flipQuaternion = new THREE.Quaternion();
  const rollQuaternion = new THREE.Quaternion();

  const render = ({ projectedAngle = 0, rollDegrees = 0 } = {}, nextFrames = frameBuffers) => {
    if (disposed) return;
    if (!Array.isArray(nextFrames) || nextFrames.length !== clubs.length) {
      throw new TypeError("Creator Club gallery must receive eight LED frames");
    }
    updateLayout();
    const normalizedFlip = Number(projectedAngle || 0);
    const normalizedRoll = Number(rollDegrees || 0);
    flipQuaternion.setFromAxisAngle(flipAxis, -normalizedFlip * Math.PI * 2);
    rollQuaternion.setFromAxisAngle(rollAxis, normalizedRoll * Math.PI / 180);
    renderer.domElement.dataset.flipDegrees = String(normalizedFlip * 360);
    renderer.domElement.dataset.rollDegrees = String(normalizedRoll);
    clubs.forEach((club, index) => {
      copyFrame(nextFrames[index], frameBuffers[index]);
      applyFrame(club, frameBuffers[index]);
      club.group.quaternion.copy(flipQuaternion).multiply(rollQuaternion);
    });
    composer.render();
  };

  const setActiveCount = (nextCount) => {
    const count = Number(nextCount);
    if (!Number.isInteger(count) || count < 1 || count > clubs.length) {
      throw new RangeError(`active gallery count must be an integer from 1 through ${clubs.length}`);
    }
    if (count === activeCount) return;
    activeCount = count;
    renderer.domElement.dataset.clubCount = String(activeCount);
    clubs.forEach((club, index) => { club.group.visible = index < activeCount; });
    layoutDirty = true;
    updateLayout();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    resizeObserver.disconnect();
    clubs.forEach((club) => {
      club.ledTexture.texture.dispose();
      club.shellMaterial.dispose();
    });
    Object.values(geometries).forEach((geometry) => geometry.dispose());
    Object.values(trimMaterials).forEach((material) => material.dispose());
    bloomPass.dispose();
    outputPass.dispose();
    composer.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  render({}, frameBuffers);
  return Object.freeze({
    dispose,
    render,
    setActiveCount,
    debug: () => ({
      clubCount: clubs.length,
      activeCount,
      ledCount: LED_COUNT,
      rendererCount: 1,
      drawCalls: clubs.length * 3,
      lightModel: "internal-point-led-with-diffuser",
      glowModel: "separated-core-halo-hdr-bloom",
      revision: THREE.REVISION,
      width: lastWidth,
      height: lastHeight,
    }),
  });
}

globalThis.CreatorClub3D = Object.freeze({
  chromaEmissionGain,
  createThemeFrame,
  createCreatorClubGallery,
  createCreatorClubPreview,
  diffusionTintCoverage,
  findThemePage,
  renderThemeEffect,
  sampleThreeClubCascade,
  themeEffectCount: THEME_EFFECT_COUNT,
  themePages: THEME_PAGES,
  whiteEmissionRestraint,
  revision: THREE.REVISION,
});
