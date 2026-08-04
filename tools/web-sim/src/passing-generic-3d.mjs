import { getPassingPattern } from "./passing-library.mjs";
import { sampleInventory } from "./passing-playback.mjs";

export const GENERIC_PASSING_3D_VERSION = 1;
export const GENERIC_PASSING_3D_TIMING = Object.freeze({ release: 0.20, catch: 0.80 });
export const GENERIC_PASSING_3D_GESTURE = Object.freeze({
  readySideMetres: 0.50,
  readyForwardMetres: 0.32,
  readyGripHeightMetres: 0.80,
  releaseSideMetres: 0.14,
  releaseForwardMetres: 0.52,
  releaseGripHeightMetres: 1.00,
  catchSideMetres: 0.34,
  catchForwardMetres: 0.38,
  catchGripHeightMetres: 1.20,
  gripFromBalanceMetres: 0.2515,
  passSpinRadians: Math.PI * 3,
  selfSpinRadians: Math.PI * 2,
});

const UP = Object.freeze({ x: 0, y: 1, z: 0 });
const DOWN = Object.freeze({ x: 0, y: -1, z: 0 });
const freeze = (value) => Object.freeze(value);
const clamp = (value, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));
const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
const smoothstep = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const smootherstep = (value) => { const t = clamp(value); return t ** 3 * (t * (t * 6 - 15) + 10); };
const vector = (x = 0, y = 0, z = 0) => ({ x, y, z });
const add = (left, right) => vector(left.x + right.x, left.y + right.y, left.z + right.z);
const subtract = (left, right) => vector(left.x - right.x, left.y - right.y, left.z - right.z);
const scale = (value, amount) => vector(value.x * amount, value.y * amount, value.z * amount);
const mix = (start, end, amount) => start + (end - start) * amount;
const lerp = (start, end, amount) => vector(mix(start.x, end.x, amount), mix(start.y, end.y, amount), mix(start.z, end.z, amount));
const dot = (left, right) => left.x * right.x + left.y * right.y + left.z * right.z;
const cross = (left, right) => vector(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x);
const magnitude = (value) => Math.hypot(value.x, value.y, value.z);
const normalize = (value, fallback = UP) => { const length = magnitude(value); return length > 1e-9 ? scale(value, 1 / length) : { ...fallback }; };
const finiteVector = (value) => [value.x, value.y, value.z].every(Number.isFinite);
const quaternionMultiply = (left, right) => ({
  x: left.w * right.x + left.x * right.w + left.y * right.z - left.z * right.y,
  y: left.w * right.y - left.x * right.z + left.y * right.w + left.z * right.x,
  z: left.w * right.z + left.x * right.y - left.y * right.x + left.z * right.w,
  w: left.w * right.w - left.x * right.x - left.y * right.y - left.z * right.z,
});
const quaternionFromAxisAngle = (axis, angle) => { const unit = normalize(axis); const half = angle * 0.5; return { x: unit.x * Math.sin(half), y: unit.y * Math.sin(half), z: unit.z * Math.sin(half), w: Math.cos(half) }; };
const quaternionFromBasis = (xAxis, yAxis, zAxis) => {
  const m11 = xAxis.x; const m12 = yAxis.x; const m13 = zAxis.x;
  const m21 = xAxis.y; const m22 = yAxis.y; const m23 = zAxis.y;
  const m31 = xAxis.z; const m32 = yAxis.z; const m33 = zAxis.z;
  const trace = m11 + m22 + m33;
  if (trace > 0) { const s = 2 * Math.sqrt(trace + 1); return { x: (m32 - m23) / s, y: (m13 - m31) / s, z: (m21 - m12) / s, w: 0.25 * s }; }
  if (m11 > m22 && m11 > m33) { const s = 2 * Math.sqrt(1 + m11 - m22 - m33); return { x: 0.25 * s, y: (m12 + m21) / s, z: (m13 + m31) / s, w: (m32 - m23) / s }; }
  if (m22 > m33) { const s = 2 * Math.sqrt(1 + m22 - m11 - m33); return { x: (m12 + m21) / s, y: 0.25 * s, z: (m23 + m32) / s, w: (m13 - m31) / s }; }
  const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
  return { x: (m13 + m31) / s, y: (m23 + m32) / s, z: 0.25 * s, w: (m21 - m12) / s };
};
const quaternionForDirection = (direction, horizontal) => {
  const yAxis = normalize(direction, DOWN);
  let zAxis = normalize(subtract(horizontal, scale(yAxis, dot(horizontal, yAxis))), vector(0, 0, 1));
  const xAxis = normalize(cross(yAxis, zAxis), vector(1, 0, 0));
  zAxis = normalize(cross(xAxis, yAxis), zAxis);
  return quaternionFromBasis(xAxis, yAxis, zAxis);
};
const quaternionRotate = (quaternion, point) => {
  const pure = { x: point.x, y: point.y, z: point.z, w: 0 };
  const inverse = { x: -quaternion.x, y: -quaternion.y, z: -quaternion.z, w: quaternion.w };
  const rotated = quaternionMultiply(quaternionMultiply(quaternion, pure), inverse);
  return vector(rotated.x, rotated.y, rotated.z);
};

function formationPeople(pattern) {
  const rawX = pattern.performers.map((person) => person.x);
  const rawZ = pattern.performers.map((person) => person.z);
  const centreX = (Math.min(...rawX) + Math.max(...rawX)) * 0.5;
  const centreZ = (Math.min(...rawZ) + Math.max(...rawZ)) * 0.5;
  const spanX = Math.max(0.01, Math.max(...rawX) - Math.min(...rawX));
  const spanZ = Math.max(0.01, Math.max(...rawZ) - Math.min(...rawZ));
  const formationScale = Math.min(0.62, 4.4 / spanX, 2.8 / spanZ);
  return pattern.performers.map((person) => {
    const headingRadians = person.facing * Math.PI / 180;
    const forward = normalize(vector(Math.sin(headingRadians), 0, -Math.cos(headingRadians)), vector(0, 0, -1));
    const right = normalize(cross(forward, UP), vector(1, 0, 0));
    return {
      id: person.id,
      name: person.name,
      position: vector((person.x - centreX) * formationScale, 0, (person.z - centreZ) * formationScale),
      forward,
      right,
      headingRadians,
      visualYawRadians: -headingRadians,
    };
  });
}

const personById = (people, personId) => {
  const person = people.find((entry) => entry.id === personId);
  if (!person) throw new RangeError(`unknown performer ${personId}`);
  return person;
};
const sideSign = (hand) => hand === "left" ? -1 : 1;
const handAnchor = (person, hand, { sideMetres, forwardMetres, heightMetres }) => add(
  add(person.position, scale(person.right, sideSign(hand) * sideMetres)),
  add(scale(person.forward, forwardMetres), vector(0, heightMetres, 0)),
);
const readyGrip = (person, hand) => handAnchor(person, hand, {
  sideMetres: GENERIC_PASSING_3D_GESTURE.readySideMetres,
  forwardMetres: GENERIC_PASSING_3D_GESTURE.readyForwardMetres,
  heightMetres: GENERIC_PASSING_3D_GESTURE.readyGripHeightMetres,
});
const releaseGrip = (person, hand) => handAnchor(person, hand, {
  sideMetres: GENERIC_PASSING_3D_GESTURE.releaseSideMetres,
  forwardMetres: GENERIC_PASSING_3D_GESTURE.releaseForwardMetres,
  heightMetres: GENERIC_PASSING_3D_GESTURE.releaseGripHeightMetres,
});
const catchGrip = (person, hand) => handAnchor(person, hand, {
  sideMetres: GENERIC_PASSING_3D_GESTURE.catchSideMetres,
  forwardMetres: GENERIC_PASSING_3D_GESTURE.catchForwardMetres,
  heightMetres: GENERIC_PASSING_3D_GESTURE.catchGripHeightMetres,
});
const balanceForGrip = (grip, direction) => add(grip, scale(normalize(direction, DOWN), GENERIC_PASSING_3D_GESTURE.gripFromBalanceMetres));

export function genericPassingGesture(patternId, eventIndex = 0) {
  const pattern = getPassingPattern(patternId);
  const event = pattern.events[eventIndex];
  if (!event) throw new RangeError(`${patternId} has no event ${eventIndex}`);
  const people = formationPeople(pattern);
  const source = personById(people, event.juggler);
  const target = personById(people, event.target || event.juggler);
  return freeze({
    event,
    source,
    target,
    sourceReadyGrip: freeze(readyGrip(source, event.hand)),
    releaseGrip: freeze(releaseGrip(source, event.hand)),
    catchGrip: freeze(catchGrip(target, event.catchHand)),
    targetReadyGrip: freeze(readyGrip(target, event.catchHand)),
  });
}

function armPose(person, hand, palm) {
  const shoulder = handAnchor(person, hand, { sideMetres: 0.23, forwardMetres: -0.015, heightMetres: 1.44 });
  const rest = handAnchor(person, hand, { sideMetres: 0.305, forwardMetres: -0.05, heightMetres: 0.985 });
  const palmVector = subtract(palm, person.position);
  const palmOutward = sideSign(hand) * dot(palmVector, person.right);
  const outward = clamp(0.305 + (palmOutward - 0.305) * 0.08, 0.29, 0.33);
  const elbow = add(
    add(person.position, scale(person.right, sideSign(hand) * outward)),
    add(scale(person.forward, -0.05), vector(0, clamp(rest.y + (palm.y - 0.80) * 0.08, 0.97, 1.04), 0)),
  );
  return { shoulder, elbow, palm };
}

function countInProgress(playhead, personIndex, peopleCount) {
  if (playhead < -1) return smootherstep((playhead + 2 - personIndex * Math.min(0.055, 0.18 / Math.max(1, peopleCount - 1))) / 0.76);
  return 1 - smootherstep(playhead + 1);
}

function activeHandTargets(inventory, people, phase) {
  const hands = new Map(people.map((person) => [person.id, {
    left: { position: readyGrip(person, "left"), influence: 0, mode: "ready" },
    right: { position: readyGrip(person, "right"), influence: 0, mode: "ready" },
  }]));
  const apply = (personId, hand, position, influence, mode) => {
    const current = hands.get(personId)?.[hand];
    if (!current || current.influence > influence) return;
    hands.get(personId)[hand] = { position, influence, mode };
  };
  inventory.airborne.forEach((event) => {
    const source = personById(people, event.juggler);
    const target = personById(people, event.target || event.juggler);
    const sourceReady = readyGrip(source, event.hand);
    const release = releaseGrip(source, event.hand);
    const targetReady = readyGrip(target, event.catchHand);
    const catcher = catchGrip(target, event.catchHand);
    if (phase <= GENERIC_PASSING_3D_TIMING.release) {
      apply(source.id, event.hand, lerp(sourceReady, release, smootherstep(phase / GENERIC_PASSING_3D_TIMING.release)), 1, "forward-load");
    } else if (phase < 0.48) {
      const follow = add(release, add(scale(source.forward, 0.035), vector(0, 0.025, 0)));
      apply(source.id, event.hand, lerp(release, follow, smoothstep((phase - GENERIC_PASSING_3D_TIMING.release) / 0.28)), 0.84, "throw-follow");
    }
    if (phase >= 0.62 && phase < GENERIC_PASSING_3D_TIMING.catch) {
      apply(target.id, event.catchHand, lerp(targetReady, catcher, smootherstep((phase - 0.62) / (GENERIC_PASSING_3D_TIMING.catch - 0.62))), 0.92, "catch-reach");
    } else if (phase >= GENERIC_PASSING_3D_TIMING.catch) {
      apply(target.id, event.catchHand, lerp(catcher, targetReady, smootherstep((phase - GENERIC_PASSING_3D_TIMING.catch) / (1 - GENERIC_PASSING_3D_TIMING.catch))), 1, "catch-return");
    }
  });
  return hands;
}

function clubPoseForEvent(event, people, phase) {
  const source = personById(people, event.juggler);
  const target = personById(people, event.target || event.juggler);
  const sourceReady = readyGrip(source, event.hand);
  const release = releaseGrip(source, event.hand);
  const catcher = catchGrip(target, event.catchHand);
  const targetReady = readyGrip(target, event.catchHand);
  const releaseQuaternion = quaternionForDirection(DOWN, source.forward);
  const isPass = event.kind === "pass";
  const spinRadians = isPass ? GENERIC_PASSING_3D_GESTURE.passSpinRadians : GENERIC_PASSING_3D_GESTURE.selfSpinRadians;
  const horizontal = normalize(vector(catcher.x - release.x, 0, catcher.z - release.z), source.forward);
  const axis = normalize(cross(horizontal, UP), source.right);
  if (phase <= GENERIC_PASSING_3D_TIMING.release) {
    const progress = smootherstep(phase / GENERIC_PASSING_3D_TIMING.release);
    const grip = lerp(sourceReady, release, progress);
    return { position: balanceForGrip(grip, DOWN), quaternion: releaseQuaternion, direction: DOWN, motionState: "forward-load", state: "held", holder: { personId: source.id, hand: event.hand } };
  }
  if (phase < GENERIC_PASSING_3D_TIMING.catch) {
    const progress = clamp((phase - GENERIC_PASSING_3D_TIMING.release) / (GENERIC_PASSING_3D_TIMING.catch - GENERIC_PASSING_3D_TIMING.release));
    const quaternion = quaternionMultiply(quaternionFromAxisAngle(axis, spinRadians * progress), releaseQuaternion);
    const direction = normalize(quaternionRotate(quaternion, UP), DOWN);
    const start = balanceForGrip(release, DOWN);
    const end = balanceForGrip(catcher, isPass ? UP : DOWN);
    const position = lerp(start, end, progress);
    position.y += Math.sin(Math.PI * progress) * (isPass ? 0.64 : 0.72);
    return { position, quaternion, direction, motionState: "flight", state: "airborne", holder: null };
  }
  const catchDirection = isPass ? UP : DOWN;
  const catchQuaternion = quaternionForDirection(catchDirection, target.forward);
  const progress = smootherstep((phase - GENERIC_PASSING_3D_TIMING.catch) / (1 - GENERIC_PASSING_3D_TIMING.catch));
  const grip = lerp(catcher, targetReady, progress);
  const direction = normalize(lerp(catchDirection, DOWN, progress), DOWN);
  return { position: balanceForGrip(grip, direction), quaternion: progress < 0.5 ? catchQuaternion : quaternionForDirection(direction, target.forward), direction, motionState: "catch-return", state: "held", holder: { personId: target.id, hand: event.catchHand } };
}

function cameraFor(people, mode) {
  if (mode !== "audience") {
    const owner = personById(people, mode);
    const position = add(owner.position, add(vector(0, 1.62, 0), scale(owner.forward, 0.07)));
    return freeze({ id: mode, viewKind: "first-person", ownerPersonId: mode, position: freeze(position), target: freeze(add(position, add(scale(owner.forward, 3.2), vector(0, -0.72, 0)))), fov: 54 });
  }
  const depth = Math.max(...people.map((person) => Math.abs(person.position.z)), 1);
  return freeze({ id: "audience", viewKind: "audience", ownerPersonId: null, position: freeze(vector(0, 2.55, 7.4 + depth)), target: freeze(vector(0, 0.98, 0)), fov: 31 });
}

export function sampleGenericPassing3D(patternId, playheadBeats, { camera = "audience" } = {}) {
  const pattern = getPassingPattern(patternId);
  const playhead = Math.max(-2, Number.isFinite(Number(playheadBeats)) ? Number(playheadBeats) : -2);
  const normalizedPlayhead = playhead < 0 ? playhead : mod(playhead, pattern.loopBeats);
  const inventory = sampleInventory(pattern, normalizedPlayhead);
  const phase = normalizedPlayhead < 0 ? 0 : mod(normalizedPlayhead, 1);
  const peopleBase = formationPeople(pattern);
  const handTargets = normalizedPlayhead < 0
    ? new Map(peopleBase.map((person, index) => {
      const progress = countInProgress(normalizedPlayhead, index, peopleBase.length);
      return [person.id, Object.fromEntries(["left", "right"].map((hand) => {
        const ready = readyGrip(person, hand);
        const sky = add(ready, add(vector(0, 0.72, 0), scale(person.right, -sideSign(hand) * 0.18)));
        return [hand, { position: lerp(ready, sky, progress), influence: 1, mode: "count-in" }];
      }))];
    }))
    : activeHandTargets(inventory, peopleBase, phase);
  const people = freeze(peopleBase.map((person) => {
    const left = handTargets.get(person.id).left;
    const right = handTargets.get(person.id).right;
    const leftArm = armPose(person, "left", left.position);
    const rightArm = armPose(person, "right", right.position);
    return freeze({
      ...person,
      position: freeze(person.position), forward: freeze(person.forward), right: freeze(person.right),
      shoulders: freeze({ left: freeze(leftArm.shoulder), right: freeze(rightArm.shoulder) }),
      elbows: freeze({ left: freeze(leftArm.elbow), right: freeze(rightArm.elbow) }),
      hands: freeze({ left: freeze(leftArm.palm), right: freeze(rightArm.palm) }),
      handMotion: freeze({ left: freeze({ mode: left.mode }), right: freeze({ mode: right.mode }) }),
    });
  }));
  const heldClubs = inventory.held.map((item) => {
    const person = personById(peopleBase, item.personId);
    const hand = item.hand || (item.slot % 2 ? "right" : "left");
    const grip = handTargets.get(person.id)[hand].position;
    const middle = (item.heldCount - 1) * 0.5;
    const fan = add(scale(person.right, (item.slot - middle) * 0.075), vector(0, (item.slot % 2) * 0.035, 0));
    const fannedGrip = add(grip, fan);
    return freeze({ ...item, position: freeze(balanceForGrip(fannedGrip, DOWN)), direction: DOWN, quaternion: freeze(quaternionForDirection(DOWN, person.forward)), state: "held", motionState: normalizedPlayhead < 0 ? "count-in" : "ready", holder: freeze({ personId: person.id, hand }) });
  });
  const eventClubs = inventory.airborne.map((event) => {
    const pose = clubPoseForEvent(event, peopleBase, phase);
    return freeze({ ...event, sourcePersonId: event.juggler, targetPersonId: event.target, ...pose, position: freeze(pose.position), direction: freeze(pose.direction), quaternion: freeze(pose.quaternion), holder: pose.holder ? freeze(pose.holder) : null });
  });
  const clubs = freeze([...heldClubs, ...eventClubs]);
  if (clubs.length !== pattern.clubCount || new Set(clubs.map((club) => club.id)).size !== clubs.length) throw new RangeError(`${patternId}: generic 3D inventory must remain unique and complete`);
  if (clubs.some((club) => !finiteVector(club.position) || ![club.quaternion.x, club.quaternion.y, club.quaternion.z, club.quaternion.w].every(Number.isFinite))) throw new RangeError(`${patternId}: generic 3D pose must stay finite`);
  return freeze({
    version: GENERIC_PASSING_3D_VERSION,
    patternId,
    physical: false,
    threeD: true,
    model: "schedule-driven-3d",
    playhead: normalizedPlayhead,
    cue: inventory.cue,
    camera: cameraFor(people, camera),
    clubs,
    held: inventory.held,
    airborne: inventory.airborne,
    handConnected: freeze(clubs.filter((club) => club.state !== "airborne")),
    people,
    allocation: inventory.allocation,
    mode: inventory.mode,
    total: clubs.length,
    collision: freeze({ minimumClearanceMetres: Infinity, method: "not evaluated for schedule-driven 3D" }),
  });
}
