import * as THREE from "three";

import { CREATOR_CLUB_DIMENSIONS, makeCreatorClubGeometries } from "./creator-club-geometry.mjs";
import { getPassingPattern } from "./passing-library.mjs?build=throw-semantics-v20";
import {
  FOUR_COUNT_3D_PATTERN_ID,
  FOUR_COUNT_3D_SHOULDER_RIG_POLICY,
  FOUR_COUNT_3D_STAGE,
  getFourCount3DCamera,
  sampleSelectedPassing3D,
  selectFourCount3DPattern,
} from "./passing-four-count-3d.mjs?build=throw-semantics-v20";
import { sampleGenericPassing3D } from "./passing-generic-3d.mjs?build=throw-semantics-v20";

const METRES_TO_SCENE_UNITS = 10;
// The desktop stage is wide, but a phone should retain an intelligible pair
// rather than inflate its vertical FOV until people read as tiny cut-outs.
export const FOUR_COUNT_3D_CAMERA_REFERENCE_ASPECT = 2;
export const FOUR_COUNT_3D_MAX_RESPONSIVE_FOV = 44;
const UP = new THREE.Vector3(0, 1, 0);
const toScene = (point) => new THREE.Vector3(point.x, point.y, point.z).multiplyScalar(METRES_TO_SCENE_UNITS);
const freeze = (value) => Object.freeze(value);

// The page owns one requestAnimationFrame transport. This renderer is a
// synchronous view of that transport state, so selecting the physical
// foundation cannot create a second background animation loop.
export const PASSING_FOUR_COUNT_RENDER_POLICY = Object.freeze({
  animationOwner: "Passing Lab host transport",
  rendererAnimationLoopCount: 0,
  patternAnimationCount: 1,
  sceneCount: 1,
  cameraCount: 1,
  cameraChangesReuseScene: true,
});

// This is a testable rendering contract, not a claim that mesh inspection is
// sufficient visual QA. Browser debug data exposes the same facts at runtime.
export const PASSING_FOUR_COUNT_MESH_POLICY = Object.freeze({
  clubMeshParts: Object.freeze(["lathed shell", "lathed knob", "lathed cap"]),
  clubMeshCount: 18,
  clubGeometryType: "LatheGeometry",
  clubSegments: 72,
  clubUsesSprites: false,
  clubUsesCanvasClubs: false,
  clubCastsShadows: true,
  personRig: "volumetric capsule, sphere, cylinder, clavicle-side shoulder, and sampled waist-side-elbow limb meshes",
  shadows: "PCFShadowMap with floor receiving",
});

export function fittedVerticalFov(horizontalFramingFov, aspect) {
  if (!(Number.isFinite(horizontalFramingFov) && horizontalFramingFov > 0 && Number.isFinite(aspect) && aspect > 0)) {
    throw new RangeError("camera fov and aspect must be positive finite numbers");
  }
  const baseRadians = THREE.MathUtils.degToRad(horizontalFramingFov);
  const verticalRadians = 2 * Math.atan(
    Math.tan(baseRadians * 0.5) * FOUR_COUNT_3D_CAMERA_REFERENCE_ASPECT / aspect,
  );
  return Math.min(
    FOUR_COUNT_3D_MAX_RESPONSIVE_FOV,
    Math.max(horizontalFramingFov, THREE.MathUtils.radToDeg(verticalRadians)),
  );
}

export function responsiveCameraDistanceScale(authoredFov, aspect) {
  const verticalFov = fittedVerticalFov(authoredFov, aspect);
  const authoredHorizontal = 2 * Math.atan(
    Math.tan(THREE.MathUtils.degToRad(authoredFov) * 0.5) * FOUR_COUNT_3D_CAMERA_REFERENCE_ASPECT,
  );
  const responsiveHorizontal = 2 * Math.atan(
    Math.tan(THREE.MathUtils.degToRad(verticalFov) * 0.5) * aspect,
  );
  // A portrait view may crop curtain width, but should still fit both people,
  // their down-side arms, and the passing corridor. The observer cameras have
  // a near performer, so even the common ~0.76 phone-stage aspect needs a
  // modest distance correction rather than cutting that person in half.
  const portraitMinimum = aspect < 0.65 ? 42 : 38;
  const targetHorizontal = aspect < 1
    ? Math.min(authoredHorizontal, THREE.MathUtils.degToRad(portraitMinimum))
    : Math.min(authoredHorizontal, responsiveHorizontal);
  return Math.max(1, Math.tan(targetHorizontal * 0.5) / Math.tan(responsiveHorizontal * 0.5));
}

function shadowMesh(mesh, { receive = false } = {}) {
  mesh.castShadow = true;
  mesh.receiveShadow = receive;
  return mesh;
}

function neutralClub(geometries, materials) {
  const group = new THREE.Group();
  group.name = "physical-neutral-club";
  const balancedParts = new THREE.Group();
  balancedParts.name = "club-balance-pivot";
  // The shared lathed geometry is centred geometrically. Its balance point is
  // deliberately offset so the sampled pose pivots at the real balance point;
  // the four-count model derives the palm separately from the actual
  // knob/handle seam instead of pretending this group origin is a hand.
  balancedParts.position.y = -CREATOR_CLUB_DIMENSIONS.balanceY;
  const shell = shadowMesh(new THREE.Mesh(geometries.shell, materials.shell));
  shell.name = "club-lathed-shell";
  const knob = shadowMesh(new THREE.Mesh(geometries.knob, materials.knob));
  knob.name = "club-lathed-knob";
  const cap = shadowMesh(new THREE.Mesh(geometries.cap, materials.cap));
  cap.name = "club-lathed-cap";
  balancedParts.add(shell, knob, cap);
  group.add(balancedParts);
  return { group, meshes: [shell, knob, cap] };
}

function segment(material, radius) {
  return shadowMesh(new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.90, 1, 14), material));
}

function joint(material, radius) {
  return shadowMesh(new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 10), material));
}

function setSegment(mesh, from, to) {
  const delta = to.clone().sub(from);
  const distance = Math.max(0.001, delta.length());
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(UP, delta.normalize());
  mesh.scale.set(1, distance, 1);
}

function makePerson(person, materials) {
  const root = new THREE.Group();
  root.name = `physical-juggler-${person.id}`;
  root.scale.setScalar(FOUR_COUNT_3D_STAGE.personRigScale);
  const torso = shadowMesh(new THREE.Mesh(new THREE.CapsuleGeometry(1.8, 6.2, 8, 16), materials.clothing));
  torso.position.y = 10.8;
  const chest = shadowMesh(new THREE.Mesh(new THREE.SphereGeometry(1.92, 16, 12), materials.clothing));
  chest.scale.set(1, 0.64, 0.78);
  chest.position.y = 13.0;
  const hips = shadowMesh(new THREE.Mesh(new THREE.SphereGeometry(2.0, 14, 10), materials.clothing));
  hips.scale.set(1, 0.58, 0.74);
  hips.position.y = 7.0;
  const head = shadowMesh(new THREE.Mesh(new THREE.SphereGeometry(1.55, 18, 14), materials.skin));
  head.position.y = 18.1;
  // A true 3D face-direction cue makes the body's local -Z front legible in
  // all three cameras; it is not a camera overlay or a billboard.
  const faceDirectionCue = shadowMesh(new THREE.Mesh(new THREE.SphereGeometry(0.34, 14, 10), materials.skin));
  faceDirectionCue.name = "juggler-face-direction-cue";
  faceDirectionCue.position.set(0, 18.08, -1.42);
  const neck = shadowMesh(new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.7, 1.0, 12), materials.skin));
  neck.position.y = 16.55;
  const legGeometry = new THREE.CylinderGeometry(0.74, 0.58, 6.8, 12);
  [-0.82, 0.82].forEach((offset) => {
    const leg = shadowMesh(new THREE.Mesh(legGeometry, materials.trousers));
    leg.position.set(offset, 3.4, 0);
    root.add(leg);
  });
  root.add(torso, chest, hips, head, faceDirectionCue, neck);
  const arms = {};
  ["left", "right"].forEach((hand) => {
    const upper = segment(materials.skin, FOUR_COUNT_3D_SHOULDER_RIG_POLICY.upperArmShoulderRadiusMetres * METRES_TO_SCENE_UNITS);
    const lower = segment(materials.skin, 0.43);
    // This mesh is a scene sibling rather than a child of the scaled torso
    // root, so its radius is sourced in metres from the same policy that owns
    // its sampled clavicle/acromion anchor.
    const shoulder = joint(materials.skin, FOUR_COUNT_3D_SHOULDER_RIG_POLICY.shoulderJointRadiusMetres * METRES_TO_SCENE_UNITS);
    shoulder.name = `juggler-${hand}-clavicle-shoulder`;
    const elbow = joint(materials.skin, 0.49);
    const palm = joint(materials.skin, 0.58);
    arms[hand] = { upper, lower, shoulder, elbow, palm };
  });
  return { id: person.id, root, arms };
}

function stageMesh(mesh, { receive = false } = {}) {
  mesh.castShadow = false;
  mesh.receiveShadow = receive;
  return mesh;
}

function makeProscenium(scene) {
  const floor = stageMesh(new THREE.Mesh(
    new THREE.PlaneGeometry(FOUR_COUNT_3D_STAGE.stageWidth * METRES_TO_SCENE_UNITS, FOUR_COUNT_3D_STAGE.stageDepth * METRES_TO_SCENE_UNITS),
    new THREE.MeshStandardMaterial({ color: 0x252b34, roughness: 0.80, metalness: 0.05 }),
  ), { receive: true });
  floor.name = "stage-floor-shadow-receiver";
  floor.rotation.x = -Math.PI / 2;
  floor.position.z = 1.0;
  scene.add(floor);

  const back = stageMesh(new THREE.Mesh(
    new THREE.BoxGeometry(FOUR_COUNT_3D_STAGE.stageWidth * METRES_TO_SCENE_UNITS, FOUR_COUNT_3D_STAGE.prosceniumHeight * METRES_TO_SCENE_UNITS, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x151c28, roughness: 0.94 }),
  ));
  back.position.set(0, FOUR_COUNT_3D_STAGE.prosceniumHeight * METRES_TO_SCENE_UNITS * 0.5, -FOUR_COUNT_3D_STAGE.stageDepth * METRES_TO_SCENE_UNITS * 0.5);
  scene.add(back);

  const curtainMaterial = new THREE.MeshStandardMaterial({ color: 0x2a151e, roughness: 0.93 });
  const curtainWidth = 4.6;
  [-1, 1].forEach((side) => {
    const curtain = stageMesh(new THREE.Mesh(new THREE.BoxGeometry(curtainWidth, 38, 2.2), curtainMaterial));
    curtain.position.set(side * (FOUR_COUNT_3D_STAGE.stageWidth * METRES_TO_SCENE_UNITS * 0.5 - curtainWidth * 0.42), 19, -4);
    scene.add(curtain);
    for (let fold = 0; fold < 4; fold += 1) {
      const seam = stageMesh(new THREE.Mesh(new THREE.BoxGeometry(0.18, 38.3, 2.28), new THREE.MeshStandardMaterial({ color: 0x10090d, roughness: 1 })));
      seam.position.copy(curtain.position).add(new THREE.Vector3(side * (fold - 1.5) * 0.82, 0, -1.15));
      scene.add(seam);
    }
  });
  const valance = stageMesh(new THREE.Mesh(new THREE.BoxGeometry(FOUR_COUNT_3D_STAGE.stageWidth * METRES_TO_SCENE_UNITS + 5, 3.2, 2.2), curtainMaterial));
  valance.position.set(0, 37.1, -4);
  scene.add(valance);

  const grid = new THREE.GridHelper(FOUR_COUNT_3D_STAGE.stageWidth * METRES_TO_SCENE_UNITS, 12, 0x63748a, 0x313c4b);
  grid.position.set(0, 0.02, 1.0);
  grid.material.transparent = true;
  grid.material.opacity = 0.30;
  scene.add(grid);
}

export function createPassingFourCountStage({ mount, ariaLabel = "True 3D six-club two-person passing stage" } = {}) {
  if (!(mount instanceof HTMLElement)) throw new TypeError("Passing Lab 3D stage requires a mount HTMLElement");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e15);
  scene.fog = new THREE.Fog(0x0a0e15, 58, 120);
  const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 220);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.22;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.setAttribute("role", "img");
  renderer.domElement.setAttribute("aria-label", ariaLabel);
  renderer.domElement.dataset.clubCount = "0";
  renderer.domElement.dataset.clubMeshCount = "0";
  renderer.domElement.dataset.clubGeometry = "lathed-knob-shell-cap";
  renderer.domElement.dataset.personRig = "volumetric-articulated";
  renderer.domElement.dataset.shadowMap = "pcf";
  renderer.domElement.dataset.sceneReuse = "true";
  renderer.domElement.dataset.animationLoops = "0";
  renderer.domElement.dataset.animationOwner = "passing-lab-host";
  mount.replaceChildren(renderer.domElement);

  makeProscenium(scene);
  scene.add(new THREE.HemisphereLight(0xdce7ff, 0x1a1018, 2.15));
  const key = new THREE.SpotLight(0xffefd6, 850, 120, Math.PI / 5.3, 0.36, 1.1);
  key.position.set(-22, 47, 32);
  key.target.position.set(-4, 8, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0002;
  scene.add(key, key.target);
  const fill = new THREE.SpotLight(0xa9c7ff, 520, 110, Math.PI / 4.4, 0.48, 1.35);
  fill.position.set(24, 32, 24);
  fill.target.position.set(8, 8, 2);
  scene.add(fill, fill.target);
  const rim = new THREE.DirectionalLight(0xff829b, 1.45);
  rim.position.set(0, 27, -24);
  scene.add(rim);

  const bodyMaterials = {
    clothing: new THREE.MeshStandardMaterial({ color: 0x587ba8, roughness: 0.70, metalness: 0.02 }),
    trousers: new THREE.MeshStandardMaterial({ color: 0x252d3b, roughness: 0.82 }),
    skin: new THREE.MeshStandardMaterial({ color: 0xd9af90, roughness: 0.86 }),
  };
  const people = new Map();
  const addPerson = (person) => {
    const rig = makePerson(person, bodyMaterials);
    scene.add(
      rig.root,
      rig.arms.left.upper, rig.arms.left.lower, rig.arms.left.shoulder, rig.arms.left.elbow, rig.arms.left.palm,
      rig.arms.right.upper, rig.arms.right.lower, rig.arms.right.shoulder, rig.arms.right.elbow, rig.arms.right.palm,
    );
    people.set(person.id, rig);
    return rig;
  };

  const geometries = makeCreatorClubGeometries({ segments: PASSING_FOUR_COUNT_MESH_POLICY.clubSegments });
  const clubMaterials = {
    shell: new THREE.MeshPhysicalMaterial({ color: 0xf5f1e7, roughness: 0.34, metalness: 0.0, clearcoat: 0.16, clearcoatRoughness: 0.48 }),
    knob: new THREE.MeshStandardMaterial({ color: 0x24272d, roughness: 0.84 }),
    cap: new THREE.MeshStandardMaterial({ color: 0xe2e4e1, roughness: 0.45, metalness: 0.06 }),
  };
  const clubMeshes = [];
  const clubs = new Map();
  const addClub = (id) => {
    const club = neutralClub(geometries, clubMaterials);
    clubMeshes.push(...club.meshes);
    scene.add(club.group);
    clubs.set(id, club);
    return club;
  };

  let disposed = false;
  let width = 0;
  let height = 0;
  let selectedCamera = "audience";
  let clubColour = "#f4f1e8";
  let lastSample = null;
  let lastCameraDistanceScale = 1;
  let activePattern = FOUR_COUNT_3D_PATTERN_ID;

  const applyAvatarVisibility = (definition) => {
    people.forEach((rig, personId) => {
      // Actor bodies are separate from arm/hand meshes. In a literal
      // participant view remove only the owning torso/head/legs so the
      // viewer sees their own working forearms, palms, and all physical clubs.
      rig.root.visible = definition.viewKind !== "first-person" || definition.ownerPersonId !== personId;
    });
  };

  const applyCamera = (sample = lastSample) => {
    const definition = sample?.camera || getFourCount3DCamera(selectedCamera);
    const aspect = Math.max(camera.aspect || 1, 0.01);
    if (definition.viewKind === "first-person") {
      camera.position.copy(toScene(definition.position));
      camera.fov = definition.fov;
      camera.up.set(0, 1, 0);
      camera.lookAt(toScene(definition.target));
      camera.updateProjectionMatrix();
      lastCameraDistanceScale = 1;
      applyAvatarVisibility(definition);
      return definition;
    }
    const target = toScene(definition.target);
    const basePosition = toScene(definition.position);
    lastCameraDistanceScale = responsiveCameraDistanceScale(definition.fov, aspect);
    camera.position.copy(target).add(basePosition.sub(target).multiplyScalar(lastCameraDistanceScale));
    camera.fov = fittedVerticalFov(definition.fov, aspect);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    applyAvatarVisibility(definition);
    return definition;
  };

  const resize = () => {
    if (disposed) return;
    const nextWidth = Math.max(1, Math.round(mount.clientWidth));
    const nextHeight = Math.max(1, Math.round(mount.clientHeight));
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    applyCamera();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);

  const updateCamera = (mode) => {
    selectedCamera = mode || "audience";
    applyCamera(lastSample);
  };

  const updatePerson = (person) => {
    const rig = people.get(person.id) || addPerson(person);
    rig.root.position.copy(toScene(person.position));
    // The model's forward vector comes from the compiler's declared-facing
    // actor frame. Three's local visual front is -Z, so the model also supplies
    // the matching yaw instead of making the renderer reinterpret headings.
    rig.root.rotation.y = person.visualYawRadians;
    ["left", "right"].forEach((hand) => {
      const shoulder = toScene(person.shoulders[hand]);
      const palm = toScene(person.hands[hand]);
      // The model owns an actor-local waist-side elbow envelope. Do not rebuild
      // a midpoint in camera/scene space here: that was the source of the
      // broad stiff-arm/chicken-wing read in earlier revisions.
      const elbow = toScene(person.elbows[hand]);
      setSegment(rig.arms[hand].upper, shoulder, elbow);
      setSegment(rig.arms[hand].lower, elbow, palm);
      rig.arms[hand].shoulder.position.copy(shoulder);
      rig.arms[hand].elbow.position.copy(elbow);
      rig.arms[hand].palm.position.copy(palm);
    });
  };

  const render = (playheadBeats, options = {}) => {
    if (disposed) return lastSample;
    const requestedPattern = options.pattern || getPassingPattern(options.patternId || activePattern);
    const capability = selectFourCount3DPattern(requestedPattern.id);
    activePattern = requestedPattern.id;
    if (options.camera) updateCamera(options.camera);
    if (options.clubColour && options.clubColour !== clubColour) {
      clubColour = options.clubColour;
      clubMaterials.shell.color.set(clubColour);
    }
    resize();
    const sample = capability.supported
      ? sampleSelectedPassing3D(activePattern, playheadBeats, { camera: selectedCamera })
      : sampleGenericPassing3D(requestedPattern, playheadBeats, { camera: selectedCamera });
    const visiblePeople = new Set(sample.people.map((person) => person.id));
    people.forEach((rig, personId) => { rig.root.visible = visiblePeople.has(personId); });
    sample.people.forEach(updatePerson);
    const visibleClubIds = new Set(sample.clubs.map((club) => club.id));
    clubs.forEach((club, clubId) => { club.group.visible = visibleClubIds.has(clubId); });
    sample.clubs.forEach((pose) => {
      const club = clubs.get(pose.id) || addClub(pose.id);
      club.group.position.copy(toScene(pose.position));
      club.group.quaternion.set(pose.quaternion.x, pose.quaternion.y, pose.quaternion.z, pose.quaternion.w);
      club.group.visible = true;
    });
    const cameraDefinition = applyCamera(sample);
    const activePatternTitle = requestedPattern.title;
    renderer.domElement.setAttribute(
      "aria-label",
      sample.physical
        ? `${activePatternTitle}: detailed physical 3D six-club passing stage`
        : `${activePatternTitle}: compiled-pattern 3D stage with ${sample.people.length} performers and ${sample.total} clubs`,
    );
    renderer.domElement.dataset.activePattern = sample.patternId;
    renderer.domElement.dataset.stageModel = sample.physical ? "dedicated-physical-3d" : sample.model;
    renderer.domElement.dataset.clubCount = String(sample.total);
    renderer.domElement.dataset.clubMeshCount = String(sample.total * PASSING_FOUR_COUNT_MESH_POLICY.clubMeshParts.length);
    renderer.domElement.dataset.performerCount = String(sample.people.length);
    renderer.domElement.dataset.handConnectedClubs = String((sample.handConnected || sample.held).length);
    renderer.domElement.dataset.inFlightClubs = String(sample.airborne.length);
    renderer.domElement.dataset.minimumBodyClearanceMm = Number.isFinite(sample.collision.minimumClearanceMetres)
      ? String(Math.round(sample.collision.minimumClearanceMetres * 1000))
      : "not-applicable";
    renderer.domElement.dataset.bodyCollisionMethod = sample.collision.method;
    renderer.domElement.dataset.camera = selectedCamera;
    renderer.domElement.dataset.cameraKind = cameraDefinition.viewKind;
    renderer.domElement.dataset.cameraOwner = cameraDefinition.ownerPersonId || "";
    renderer.domElement.dataset.hiddenAvatar = cameraDefinition.viewKind === "first-person"
      ? cameraDefinition.ownerPersonId
      : "";
    renderer.domElement.dataset.visibleClubs = String([...clubs.values()].filter((club) => club.group.visible).length);
    renderer.domElement.dataset.cameraFov = camera.fov.toFixed(2);
    renderer.domElement.dataset.cameraAspect = camera.aspect.toFixed(3);
    renderer.domElement.dataset.cameraDistanceScale = lastCameraDistanceScale.toFixed(3);
    renderer.render(scene, camera);
    lastSample = sample;
    return sample;
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    resizeObserver.disconnect();
    const disposedGeometries = new Set();
    const disposedMaterials = new Set();
    scene.traverse((object) => {
      if (!object.isMesh) return;
      if (object.geometry && !disposedGeometries.has(object.geometry)) {
        disposedGeometries.add(object.geometry);
        object.geometry.dispose();
      }
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => {
        if (material && !disposedMaterials.has(material)) {
          disposedMaterials.add(material);
          material.dispose();
        }
      });
    });
    renderer.dispose();
    mount.replaceChildren();
  };

  updateCamera("audience");
  resize();
  return freeze({
    render,
    setCamera: updateCamera,
    dispose,
    debug: () => freeze({
      rendererCount: 1,
      sceneCount: PASSING_FOUR_COUNT_RENDER_POLICY.sceneCount,
      cameraCount: PASSING_FOUR_COUNT_RENDER_POLICY.cameraCount,
      cameraChangesReuseScene: PASSING_FOUR_COUNT_RENDER_POLICY.cameraChangesReuseScene,
      animationLoopCount: PASSING_FOUR_COUNT_RENDER_POLICY.rendererAnimationLoopCount,
      animationOwner: PASSING_FOUR_COUNT_RENDER_POLICY.animationOwner,
      activePattern,
      clubCount: lastSample?.total || 0,
      clubMeshCount: lastSample ? lastSample.total * PASSING_FOUR_COUNT_MESH_POLICY.clubMeshParts.length : 0,
      allClubMeshesLathed: clubMeshes.every((mesh) => mesh.geometry.type === PASSING_FOUR_COUNT_MESH_POLICY.clubGeometryType),
      clubUsesSprites: PASSING_FOUR_COUNT_MESH_POLICY.clubUsesSprites,
      shadowMapEnabled: renderer.shadowMap.enabled,
      camera: selectedCamera,
      cameraKind: lastSample?.camera?.viewKind || getFourCount3DCamera(selectedCamera).viewKind,
      cameraPose: lastSample?.camera || null,
      hiddenAvatarRoots: [...people.entries()]
        .filter(([, rig]) => !rig.root.visible)
        .map(([personId]) => personId),
      visibleArmRigs: [...people.keys()],
      actorFacing: lastSample
        ? Object.fromEntries(lastSample.people.map((person) => [person.id, {
          forward: person.forward,
          visualYawRadians: person.visualYawRadians,
        }]))
        : null,
      width,
      height,
      cameraDistanceScale: lastCameraDistanceScale,
      threeRevision: THREE.REVISION,
    }),
  });
}

globalThis.PassingFourCount3D = freeze({
  create: createPassingFourCountStage,
  // Every playable card has a Three.js stage. Four canonical facing-pair cards
  // retain the narrower validated physical sampler; the rest use the explicit
  // declarative schedule adapter.
  isSupported: (patternOrId) => {
    try { sampleGenericPassing3D(typeof patternOrId === "string" ? getPassingPattern(patternOrId) : patternOrId, -2); return true; } catch { return false; }
  },
  isDedicatedPhysical: (patternId) => selectFourCount3DPattern(patternId).supported,
  revision: THREE.REVISION,
});
