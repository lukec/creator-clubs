import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import {
  GLOW_DSL_PRESET_ORDER,
  GLOW_DSL_PRESETS,
  GlowDslError,
  compileGlowDsl,
  compileGlowDslDocument,
} from "./glow-dsl.mjs";
import {
  CREATOR_CLUB_DIMENSIONS,
  creatorClubRadiusAt,
  makeCreatorClubGeometries,
} from "./creator-club-geometry.mjs";

const LED_COUNT = 32;
const STATION_COUNT = 16;
const HANDLE_STATIONS = 7;

const MODELS = Object.freeze({
  direct: 0,
  diffusion: 1,
  hybrid: 2,
});

const DEFAULT_PARAMS = Object.freeze({
  brightness: 1,
  handleDiffusion: 1,
  bodyDiffusion: 1,
  exposure: 1.18,
  inspection: 0,
});

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
const clampChannel = (value) => Math.round(clamp(Number(value) || 0, 0, 255));

const stationY = (station) => station < HANDLE_STATIONS
  ? -2.18 + station * 0.25
  : -0.42 + (station - HANDLE_STATIONS) * 0.34;

export const CLUB_LIGHTING_LAYOUT = Object.freeze({
  status: "working-hypothesis",
  lengthMm: 515,
  widthMm: 82,
  handleStations: HANDLE_STATIONS,
  stations: Object.freeze(Array.from(
    { length: STATION_COUNT },
    (_, station) => Object.freeze({ station, y: stationY(station) }),
  )),
  sources: Object.freeze(Array.from(
    { length: LED_COUNT },
    (_, index) => Object.freeze({
      index,
      station: index % STATION_COUNT,
      facingZ: index < STATION_COUNT ? 1 : -1,
    }),
  )),
});

const VERTEX_SHADER = /* glsl */`
  varying vec3 vClubPosition;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  void main() {
    vClubPosition = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */`
  uniform sampler2D ledFrame;
  uniform int lightModel;
  uniform float brightness;
  uniform float handleDiffusion;
  uniform float bodyDiffusion;
  uniform float inspection;
  uniform float cutaway;

  varying vec3 vClubPosition;
  varying vec3 vWorldPosition;
  varying vec3 vWorldNormal;

  float gaussian2(float axial, float arc, float sigmaAxial, float sigmaArc) {
    float ay = axial / max(sigmaAxial, 0.001);
    float aa = arc / max(sigmaArc, 0.001);
    return exp(-0.5 * (ay * ay + aa * aa));
  }

  float sourceY(int station) {
    return station < 7
      ? -2.18 + float(station) * 0.25
      : -0.42 + float(station - 7) * 0.34;
  }

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 keyDirection = normalize(vec3(-0.36, 0.72, 0.58));
    vec3 fillDirection = normalize(vec3(0.58, 0.20, -0.78));
    float key = max(dot(normal, keyDirection), 0.0);
    float fill = max(dot(normal, fillDirection), 0.0);
    float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.0);
    float shellLight = mix(0.105, 0.46, inspection)
      + key * mix(0.09, 0.34, inspection)
      + fill * mix(0.025, 0.10, inspection)
      + rim * mix(0.035, 0.08, inspection);
    vec3 whitePlastic = vec3(0.975, 0.965, 0.945) * shellLight;

    float rawRadius = length(vClubPosition.xz);
    float radius = max(rawRadius, 0.05);
    vec3 radial = rawRadius > 0.0001
      ? normalize(vec3(vClubPosition.x, 0.0, vClubPosition.z))
      : vec3(0.0, 0.0, 1.0);
    vec3 weightedColor = vec3(0.0);
    float totalEnergy = 0.0;
    float strongestCore = 0.0;

    for (int index = 0; index < 32; index += 1) {
      int station = index < 16 ? index : index - 16;
      bool frontSource = index < 16;
      vec3 sourceDirection = frontSource ? vec3(0.0, 0.0, 1.0) : vec3(0.0, 0.0, -1.0);
      float angularDistance = acos(clamp(dot(radial, sourceDirection), -1.0, 1.0));
      float arcDistance = radius * angularDistance;
      float ledY = sourceY(station);
      float axialDistance = abs(vClubPosition.y - ledY);
      float bodyPlastic = smoothstep(-0.10, 0.20, vClubPosition.y);
      float regionDiffusion = mix(handleDiffusion, bodyDiffusion, bodyPlastic);

      vec4 led = texture2D(ledFrame, vec2((float(index) + 0.5) / 32.0, 0.5));
      float intensity = led.a * brightness;
      float peak = max(max(led.r, led.g), led.b);
      vec3 hue = led.rgb / max(peak, 0.0001);

      float coreAxial = mix(0.071, 0.105, bodyPlastic);
      float coreArc = mix(0.046, 0.075, bodyPlastic);
      float core = gaussian2(axialDistance, arcDistance, coreAxial, coreArc);
      float haloAxial = mix(0.145, 0.405, bodyPlastic) * regionDiffusion;
      float haloArc = mix(0.120, 0.345, bodyPlastic) * regionDiffusion;
      float halo = gaussian2(axialDistance, arcDistance, haloAxial, haloArc);
      float distance = sqrt(axialDistance * axialDistance + arcDistance * arcDistance);
      float longTail = exp(-distance / (mix(0.32, 0.72, bodyPlastic) * regionDiffusion));

      float energy;
      if (lightModel == 0) {
        energy = core * 1.35 + halo * 0.085;
      } else if (lightModel == 1) {
        energy = core * mix(0.22, 0.06, bodyPlastic)
          + halo * mix(0.68, 0.93, bodyPlastic)
          + longTail * mix(0.025, 0.075, bodyPlastic);
      } else {
        energy = core * mix(1.10, 0.13, bodyPlastic)
          + halo * mix(0.46, 0.95, bodyPlastic)
          + longTail * mix(0.035, 0.115, bodyPlastic);
      }
      energy *= intensity;
      weightedColor += hue * energy;
      totalEnergy += energy;
      strongestCore = max(strongestCore, core * intensity);
    }

    vec3 mixedHue = weightedColor / max(totalEnergy, 0.0001);
    float coverageGain = lightModel == 0 ? 0.72 : (lightModel == 1 ? 1.08 : 1.18);
    float coverage = 1.0 - exp(-totalEnergy * coverageGain);
    float coloredCoverage = clamp(coverage, 0.0, 0.995);
    float luminous = lightModel == 0
      ? strongestCore * 0.36 + totalEnergy * 0.025
      : strongestCore * 0.15 + totalEnergy * 0.060;
    vec3 litPlastic = mixedHue * (0.62 + shellLight * 0.54);
    float photopicGain = dot(mixedHue, vec3(0.22, 0.66, 0.12));
    vec3 outputColor = mix(whitePlastic, litPlastic, coloredCoverage)
      + mixedHue * clamp(luminous * (3.2 + photopicGain * 1.8), 0.0, 8.0);

    float alpha = mix(1.0, 0.28, cutaway);
    gl_FragColor = vec4(outputColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
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
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return { data, texture };
};

const applyFrame = (ledTexture, markerMesh, frame) => {
  if (!Array.isArray(frame) || frame.length !== LED_COUNT) {
    throw new TypeError("lighting-lab frame must contain 32 RGB entries");
  }
  const { data, texture } = ledTexture;
  frame.forEach((rgb, index) => {
    if (!Array.isArray(rgb) || rgb.length < 3) throw new TypeError("invalid RGB entry");
    const red = clampChannel(rgb[0]);
    const green = clampChannel(rgb[1]);
    const blue = clampChannel(rgb[2]);
    const offset = index * 4;
    data[offset] = red;
    data[offset + 1] = green;
    data[offset + 2] = blue;
    data[offset + 3] = Math.max(red, green, blue);
    markerMesh.setColorAt(index, new THREE.Color(red / 255, green / 255, blue / 255));
  });
  texture.needsUpdate = true;
  markerMesh.instanceColor.needsUpdate = true;
};

const createMarkers = () => {
  const geometry = new THREE.SphereGeometry(0.047, 14, 10);
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    toneMapped: false,
    depthTest: true,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, LED_COUNT);
  const matrix = new THREE.Matrix4();
  for (let index = 0; index < LED_COUNT; index += 1) {
    const station = index % STATION_COUNT;
    const y = stationY(station);
    const direction = index < STATION_COUNT ? 1 : -1;
    const radius = creatorClubRadiusAt(y) * 0.64;
    const size = station < HANDLE_STATIONS ? 0.82 : 1.15;
    matrix.compose(
      new THREE.Vector3(0, y, direction * radius),
      new THREE.Quaternion(),
      new THREE.Vector3(size, size, size),
    );
    mesh.setMatrixAt(index, matrix);
    mesh.setColorAt(index, new THREE.Color(0, 0, 0));
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;
  mesh.visible = false;
  mesh.renderOrder = 1;
  return mesh;
};

export function createClubLightingLab({ mount, ariaLabel = "Single illuminated juggling club diffusion model" }) {
  if (!(mount instanceof HTMLElement)) throw new TypeError("mount must be an HTMLElement");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 0.10, 10.9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = DEFAULT_PARAMS.exposure;
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute("aria-label", ariaLabel);
  renderer.domElement.dataset.clubCount = "1";
  renderer.domElement.dataset.sourceCount = String(LED_COUNT);
  renderer.domElement.dataset.stationCount = String(STATION_COUNT);
  mount.replaceChildren(renderer.domElement);

  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.4, 0.66, 0.72);
  const outputPass = new OutputPass();
  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  const flipPivot = new THREE.Group();
  const axialGroup = new THREE.Group();
  axialGroup.position.y = -CREATOR_CLUB_DIMENSIONS.balanceY;
  flipPivot.add(axialGroup);
  scene.add(flipPivot);

  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x111827, 0.30);
  const accessoryKey = new THREE.DirectionalLight(0xffffff, 0.42);
  accessoryKey.position.set(-3, 5, 7);
  scene.add(hemisphere, accessoryKey);

  const geometries = makeCreatorClubGeometries();
  const ledTexture = makeLedTexture();
  const shellMaterial = new THREE.ShaderMaterial({
    uniforms: {
      ledFrame: { value: ledTexture.texture },
      lightModel: { value: MODELS.hybrid },
      brightness: { value: DEFAULT_PARAMS.brightness },
      handleDiffusion: { value: DEFAULT_PARAMS.handleDiffusion },
      bodyDiffusion: { value: DEFAULT_PARAMS.bodyDiffusion },
      inspection: { value: DEFAULT_PARAMS.inspection },
      cutaway: { value: 0 },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthTest: true,
    depthWrite: true,
    side: THREE.FrontSide,
    toneMapped: true,
  });
  const shell = new THREE.Mesh(geometries.shell, shellMaterial);
  shell.renderOrder = 2;
  axialGroup.add(shell);

  const knobMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaa7a0,
    emissive: 0x08070b,
    roughness: 0.96,
    metalness: 0,
    transparent: true,
  });
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0x777b83,
    emissive: 0x09070d,
    roughness: 0.86,
    metalness: 0,
    transparent: true,
  });
  const knob = new THREE.Mesh(geometries.knob, knobMaterial);
  const cap = new THREE.Mesh(geometries.cap, capMaterial);
  knob.renderOrder = 3;
  cap.renderOrder = 3;
  axialGroup.add(knob, cap);

  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.054, 0.054, 4.72, 24),
    new THREE.MeshBasicMaterial({ color: 0xdde7f0, transparent: true, opacity: 0.64 }),
  );
  shaft.position.y = 0.04;
  shaft.visible = false;
  shaft.renderOrder = 0;
  axialGroup.add(shaft);

  const markers = createMarkers();
  axialGroup.add(markers);

  let model = "hybrid";
  let roll = 0;
  let flip = -27;
  flipPivot.rotation.z = THREE.MathUtils.degToRad(flip);
  let showSourceMarkers = false;
  let disposed = false;
  let lastWidth = 0;
  let lastHeight = 0;
  let currentFrame = Array.from({ length: LED_COUNT }, () => [0, 0, 0]);
  let params = { ...DEFAULT_PARAMS };

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

  const render = () => {
    if (disposed) return;
    resize();
    composer.render();
  };

  const setFrame = (frame) => {
    currentFrame = frame.map((rgb) => rgb.slice(0, 3).map(clampChannel));
    applyFrame(ledTexture, markers, currentFrame);
    render();
  };

  const setModel = (nextModel) => {
    if (!(nextModel in MODELS)) throw new TypeError(`unknown lighting model: ${nextModel}`);
    model = nextModel;
    shellMaterial.uniforms.lightModel.value = MODELS[nextModel];
    render();
  };

  const setParams = (nextParams = {}) => {
    const merged = { ...params };
    if (nextParams.brightness !== undefined) merged.brightness = clamp(Number(nextParams.brightness), 0, 4);
    if (nextParams.handleDiffusion !== undefined) merged.handleDiffusion = clamp(Number(nextParams.handleDiffusion), 0.35, 2.4);
    if (nextParams.bodyDiffusion !== undefined) merged.bodyDiffusion = clamp(Number(nextParams.bodyDiffusion), 0.35, 2.4);
    if (nextParams.exposure !== undefined) merged.exposure = clamp(Number(nextParams.exposure), 0.35, 2.5);
    if (nextParams.inspection !== undefined) merged.inspection = nextParams.inspection ? 1 : 0;
    if (!Object.values(merged).every(Number.isFinite)) throw new TypeError("lighting parameters must be finite");
    params = merged;
    shellMaterial.uniforms.brightness.value = params.brightness;
    shellMaterial.uniforms.handleDiffusion.value = params.handleDiffusion;
    shellMaterial.uniforms.bodyDiffusion.value = params.bodyDiffusion;
    shellMaterial.uniforms.inspection.value = params.inspection;
    renderer.toneMappingExposure = params.exposure;
    bloomPass.strength = 0.72 + params.brightness * 0.42;
    hemisphere.intensity = params.inspection ? 1.35 : 0.30;
    accessoryKey.intensity = params.inspection ? 1.20 : 0.42;
    render();
  };

  const setRoll = (degrees) => {
    roll = clamp(Number(degrees) || 0, -180, 180);
    axialGroup.rotation.y = THREE.MathUtils.degToRad(roll);
    render();
  };

  const setFlip = (degrees) => {
    flip = clamp(Number(degrees) || 0, -180, 180);
    flipPivot.rotation.z = THREE.MathUtils.degToRad(flip);
    render();
  };

  const showSources = (visible) => {
    showSourceMarkers = Boolean(visible);
    markers.visible = showSourceMarkers;
    shaft.visible = showSourceMarkers;
    shellMaterial.uniforms.cutaway.value = showSourceMarkers ? 1 : 0;
    shellMaterial.depthWrite = !showSourceMarkers;
    shellMaterial.side = showSourceMarkers ? THREE.DoubleSide : THREE.FrontSide;
    shellMaterial.needsUpdate = true;
    [knobMaterial, capMaterial].forEach((material) => {
      material.opacity = showSourceMarkers ? 0.32 : 1;
      material.depthWrite = !showSourceMarkers;
    });
    render();
  };

  const setView = ({ position = [0, 0.10, 10.9], target = [0, 0, 0], fov = 31 } = {}) => {
    const values = [...position, ...target, fov];
    if (position.length !== 3 || target.length !== 3 || !values.every(Number.isFinite)) {
      throw new TypeError("camera position, target, and fov must be finite");
    }
    camera.position.set(...position);
    camera.fov = fov;
    camera.lookAt(...target);
    camera.updateProjectionMatrix();
    render();
  };

  const getState = () => ({
    model,
    roll,
    flip,
    showSources: showSourceMarkers,
    params: { ...params },
    frame: currentFrame.map((rgb) => [...rgb]),
    geometry: {
      lengthMm: CREATOR_CLUB_DIMENSIONS.lengthMm,
      widthMm: CREATOR_CLUB_DIMENSIONS.widthMm,
      balanceFromKnobMm: CREATOR_CLUB_DIMENSIONS.balanceFromKnobMm,
      axialStations: STATION_COUNT,
      oppositeSourcesPerStation: 2,
      sourceMapping: "working-hypothesis",
    },
    renderer: {
      revision: THREE.REVISION,
      drawCalls: renderer.info.render.calls,
      width: lastWidth,
      height: lastHeight,
    },
  });

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    resizeObserver.disconnect();
    Object.values(geometries).forEach((geometry) => geometry.dispose());
    shellMaterial.dispose();
    knobMaterial.dispose();
    capMaterial.dispose();
    ledTexture.texture.dispose();
    markers.geometry.dispose();
    markers.material.dispose();
    shaft.geometry.dispose();
    shaft.material.dispose();
    bloomPass.dispose();
    outputPass.dispose();
    composer.dispose();
    renderer.dispose();
    mount.replaceChildren();
  };

  const resizeObserver = new ResizeObserver(render);
  resizeObserver.observe(mount);
  applyFrame(ledTexture, markers, currentFrame);
  render();

  return Object.freeze({
    dispose,
    getState,
    render,
    resize,
    setFrame,
    setModel,
    setParams,
    setFlip,
    setRoll,
    setView,
    showSources,
  });
}

globalThis.CreatorClubLightingLab = Object.freeze({
  create: createClubLightingLab,
  dsl: Object.freeze({
    compile: compileGlowDsl,
    compileDocument: compileGlowDslDocument,
    errorClass: GlowDslError,
    presetOrder: GLOW_DSL_PRESET_ORDER,
    presets: GLOW_DSL_PRESETS,
  }),
  models: Object.keys(MODELS),
  revision: THREE.REVISION,
});
