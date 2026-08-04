const TAU = Math.PI * 2;

export const CASCADE_DEFAULTS = Object.freeze({
  beatDuration: 0.48,
  flightBeats: 2.34,
  handX: 1.30,
  handDepth: 1.30,
  handY: -0.44,
  gripToCenter: 1.04,
  apexHeight: 5.15,
  scoopDepth: 0.15,
});

const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
const mix = (start, end, amount) => start + (end - start) * amount;
const smoothstep = (value) => value * value * (3 - 2 * value);
const degreesToRadians = (degrees) => degrees * Math.PI / 180;

const quaternionMultiply = (left, right) => ({
  x: left.w * right.x + left.x * right.w + left.y * right.z - left.z * right.y,
  y: left.w * right.y - left.x * right.z + left.y * right.w + left.z * right.x,
  z: left.w * right.z + left.x * right.y - left.y * right.x + left.z * right.w,
  w: left.w * right.w - left.x * right.x - left.y * right.y - left.z * right.z,
});

const quaternionFromAxisAngle = (axis, angle) => {
  const half = angle * 0.5;
  const sine = Math.sin(half);
  return {
    x: axis.x * sine,
    y: axis.y * sine,
    z: axis.z * sine,
    w: Math.cos(half),
  };
};

const quaternionFromBasis = (xAxis, yAxis, zAxis) => {
  const m11 = xAxis.x;
  const m12 = yAxis.x;
  const m13 = zAxis.x;
  const m21 = xAxis.y;
  const m22 = yAxis.y;
  const m23 = zAxis.y;
  const m31 = xAxis.z;
  const m32 = yAxis.z;
  const m33 = zAxis.z;
  const trace = m11 + m22 + m33;

  if (trace > 0) {
    const scale = 2 * Math.sqrt(trace + 1);
    return {
      x: (m32 - m23) / scale,
      y: (m13 - m31) / scale,
      z: (m21 - m12) / scale,
      w: 0.25 * scale,
    };
  }
  if (m11 > m22 && m11 > m33) {
    const scale = 2 * Math.sqrt(1 + m11 - m22 - m33);
    return {
      x: 0.25 * scale,
      y: (m12 + m21) / scale,
      z: (m13 + m31) / scale,
      w: (m32 - m23) / scale,
    };
  }
  if (m22 > m33) {
    const scale = 2 * Math.sqrt(1 + m22 - m11 - m33);
    return {
      x: (m12 + m21) / scale,
      y: 0.25 * scale,
      z: (m23 + m32) / scale,
      w: (m13 - m31) / scale,
    };
  }
  const scale = 2 * Math.sqrt(1 + m33 - m11 - m22);
  return {
    x: (m13 + m31) / scale,
    y: (m23 + m32) / scale,
    z: 0.25 * scale,
    w: (m21 - m12) / scale,
  };
};

const throwPlane = (startHand, settings) => {
  const length = Math.hypot(settings.handX, settings.handDepth);
  const horizontal = {
    x: -startHand * settings.handX / length,
    y: 0,
    z: settings.handDepth / length,
  };
  const normal = {
    x: -horizontal.z,
    y: 0,
    z: horizontal.x,
  };
  const down = { x: 0, y: -1, z: 0 };
  return {
    horizontal,
    normal,
    downQuaternion: quaternionFromBasis(normal, down, horizontal),
  };
};

const downQuaternionForHeading = (heading) => {
  const horizontal = {
    x: Math.sin(heading),
    y: 0,
    z: Math.cos(heading),
  };
  const normal = {
    x: -horizontal.z,
    y: 0,
    z: horizontal.x,
  };
  return {
    horizontal,
    normal,
    quaternion: quaternionFromBasis(normal, { x: 0, y: -1, z: 0 }, horizontal),
  };
};

/**
 * Sample one club in a three-club siteswap-3 cascade.
 *
 * Each throw runs from the rear of one hand path to the front of the opposite
 * hand path. Equal handX/handDepth defaults create front-left/front-right
 * vertical planes yawed 45 degrees toward the audience. The caught club points
 * down while the hand scoops it back and changes to the next throw plane.
 */
export function sampleCascade(timeSeconds, clubIndex, options = {}) {
  if (!Number.isFinite(timeSeconds)) throw new TypeError("timeSeconds must be finite");
  if (!Number.isInteger(clubIndex) || clubIndex < 0 || clubIndex > 2) {
    throw new RangeError("clubIndex must be 0, 1, or 2");
  }

  const settings = { ...CASCADE_DEFAULTS, ...options };
  for (const name of [
    "beatDuration",
    "flightBeats",
    "handX",
    "handDepth",
    "handY",
    "gripToCenter",
    "apexHeight",
    "scoopDepth",
  ]) {
    if (!Number.isFinite(settings[name])) throw new TypeError(`${name} must be finite`);
  }
  if (!(settings.beatDuration > 0)) throw new RangeError("beatDuration must be positive");
  if (!(settings.flightBeats > 0 && settings.flightBeats < 3)) {
    throw new RangeError("flightBeats must be between 0 and 3");
  }
  if (!(settings.handX > 0 && settings.handDepth > 0)) {
    throw new RangeError("handX and handDepth must be positive");
  }
  if (!(settings.gripToCenter > 0)) throw new RangeError("gripToCenter must be positive");
  if (!(settings.apexHeight >= 0 && settings.scoopDepth >= 0)) {
    throw new RangeError("apexHeight and scoopDepth must be non-negative");
  }

  const rawGlobalBeat = timeSeconds / settings.beatDuration;
  const nearestBeat = Math.round(rawGlobalBeat);
  const globalBeat = Math.abs(rawGlobalBeat - nearestBeat) < 1e-10
    ? nearestBeat
    : rawGlobalBeat;
  const shiftedBeat = globalBeat - clubIndex;
  const cycle = Math.floor(shiftedBeat / 3);
  const phase = mod(shiftedBeat, 3);
  const throwBeat = clubIndex + cycle * 3;
  const startHand = mod(throwBeat, 2) === 0 ? -1 : 1;
  const startX = startHand * settings.handX;
  const endX = -startX;
  const centerY = settings.handY - settings.gripToCenter;
  const plane = throwPlane(startHand, settings);

  if (phase < settings.flightBeats) {
    const flight = phase / settings.flightBeats;
    const arc = 4 * flight * (1 - flight);
    const spinAngle = TAU * flight;
    const spinSine = Math.sin(spinAngle);
    const spinQuaternion = quaternionFromAxisAngle(plane.normal, spinAngle);
    // A normal cascade is dominated by end-over-end rotation, but a thrown
    // physical club also acquires some axial roll. Give each prop a stable
    // starting face and a modest handed roll during flight so Roll-reactive
    // lighting can be evaluated against the same pose the audience sees.
    const rollDegrees = clubIndex * 120 + startHand * 38 * Math.sin(Math.PI * flight);
    const rollQuaternion = quaternionFromAxisAngle(
      { x: 0, y: 1, z: 0 },
      degreesToRadians(rollDegrees),
    );
    const edgePulse = Math.max(0, 1 - Math.min(flight, 1 - flight) / 0.14);
    return {
      clubIndex,
      phase,
      airborne: true,
      position: {
        x: mix(startX, endX, flight),
        y: centerY + settings.apexHeight * arc,
        z: mix(-settings.handDepth, settings.handDepth, flight),
      },
      direction: {
        x: plane.horizontal.x * spinSine,
        y: -Math.cos(spinAngle),
        z: plane.horizontal.z * spinSine,
      },
      quaternion: quaternionMultiply(
        quaternionMultiply(spinQuaternion, plane.downQuaternion),
        rollQuaternion,
      ),
      planeHorizontal: plane.horizontal,
      planeNormal: plane.normal,
      spinAngle,
      rollDegrees,
      angularSpeed: TAU / (settings.flightBeats * settings.beatDuration),
      projectedAngle: flight,
      activity: Math.min(1, 0.58 + edgePulse * 0.34),
      throwState: 2,
    };
  }

  const dwell = (phase - settings.flightBeats) / (3 - settings.flightBeats);
  const eased = smoothstep(dwell);
  const incomingHeading = Math.atan2(plane.horizontal.x, plane.horizontal.z);
  const outgoingHeading = -incomingHeading;
  const carryPlane = downQuaternionForHeading(mix(incomingHeading, outgoingHeading, eased));
  const scoop = Math.sin(Math.PI * dwell) ** 2;
  const rollDegrees = clubIndex * 120;
  const rollQuaternion = quaternionFromAxisAngle(
    { x: 0, y: 1, z: 0 },
    degreesToRadians(rollDegrees),
  );
  return {
    clubIndex,
    phase,
    airborne: false,
    position: {
      x: endX,
      y: centerY - settings.scoopDepth * scoop,
      z: mix(settings.handDepth, -settings.handDepth, eased),
    },
    direction: { x: 0, y: -1, z: 0 },
    quaternion: quaternionMultiply(carryPlane.quaternion, rollQuaternion),
    planeHorizontal: carryPlane.horizontal,
    planeNormal: carryPlane.normal,
    spinAngle: TAU,
    rollDegrees,
    angularSpeed: 0,
    projectedAngle: 0,
    activity: 0.08,
    throwState: 0,
  };
}

export function sampleThreeClubCascade(timeSeconds, options = {}) {
  return [0, 1, 2].map((clubIndex) => sampleCascade(timeSeconds, clubIndex, options));
}
