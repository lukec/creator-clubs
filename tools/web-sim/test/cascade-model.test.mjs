import assert from "node:assert/strict";
import test from "node:test";

import {
  CASCADE_DEFAULTS,
  sampleCascade,
  sampleThreeClubCascade,
} from "../src/cascade-model.mjs";

const close = (actual, expected, tolerance = 1e-8) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
};

const quaternionDot = (left, right) => (
  left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w
);

const rotateVector = (quaternion, vector) => {
  const crossX = quaternion.y * vector.z - quaternion.z * vector.y;
  const crossY = quaternion.z * vector.x - quaternion.x * vector.z;
  const crossZ = quaternion.x * vector.y - quaternion.y * vector.x;
  const secondCrossX = quaternion.y * crossZ - quaternion.z * crossY;
  const secondCrossY = quaternion.z * crossX - quaternion.x * crossZ;
  const secondCrossZ = quaternion.x * crossY - quaternion.y * crossX;
  return {
    x: vector.x + 2 * (quaternion.w * crossX + secondCrossX),
    y: vector.y + 2 * (quaternion.w * crossY + secondCrossY),
    z: vector.z + 2 * (quaternion.w * crossZ + secondCrossZ),
  };
};

const closeVector = (actual, expected, tolerance = 1e-8) => {
  close(actual.x, expected.x, tolerance);
  close(actual.y, expected.y, tolerance);
  close(actual.z, expected.z, tolerance);
};

test("one club is released on every integer beat", () => {
  for (let beat = 0; beat < 12; beat += 1) {
    const poses = sampleThreeClubCascade(beat * CASCADE_DEFAULTS.beatDuration);
    const releases = poses.filter((pose) => Math.abs(pose.phase) < 1e-8);
    assert.equal(releases.length, 1, `beat ${beat}`);
    assert.equal(releases[0].clubIndex, beat % 3);
  }
});

test("each club repeats after six beats", () => {
  const period = CASCADE_DEFAULTS.beatDuration * 6;
  for (let club = 0; club < 3; club += 1) {
    const first = sampleCascade(0.731, club);
    const repeated = sampleCascade(0.731 + period, club);
    close(first.position.x, repeated.position.x);
    close(first.position.y, repeated.position.y);
    close(first.position.z, repeated.position.z);
    close(first.direction.x, repeated.direction.x);
    close(first.direction.y, repeated.direction.y);
    close(first.direction.z, repeated.direction.z);
    close(Math.abs(quaternionDot(first.quaternion, repeated.quaternion)), 1);
    assert.equal(first.airborne, repeated.airborne);
  }
});

test("flight begins and ends at opposite hands without a position jump", () => {
  const start = sampleCascade(0, 0);
  const justBeforeCatch = sampleCascade(
    CASCADE_DEFAULTS.flightBeats * CASCADE_DEFAULTS.beatDuration - 1e-7,
    0,
  );
  const catchPose = sampleCascade(
    CASCADE_DEFAULTS.flightBeats * CASCADE_DEFAULTS.beatDuration,
    0,
  );

  assert.equal(start.airborne, true);
  const centerY = CASCADE_DEFAULTS.handY - CASCADE_DEFAULTS.gripToCenter;
  close(start.position.x, -CASCADE_DEFAULTS.handX);
  close(start.position.y, centerY);
  close(start.position.z, -CASCADE_DEFAULTS.handDepth);
  assert.ok(Math.abs(justBeforeCatch.position.x - CASCADE_DEFAULTS.handX) < 1e-5);
  assert.ok(Math.abs(justBeforeCatch.position.y - centerY) < 1e-5);
  assert.ok(Math.abs(justBeforeCatch.position.z - CASCADE_DEFAULTS.handDepth) < 1e-5);
  assert.equal(catchPose.airborne, false);
  close(catchPose.position.x, CASCADE_DEFAULTS.handX);
  close(catchPose.position.y, centerY);
  close(catchPose.position.z, CASCADE_DEFAULTS.handDepth);
  assert.ok(Math.abs(justBeforeCatch.direction.x - catchPose.direction.x) < 1e-5);
  assert.ok(Math.abs(justBeforeCatch.direction.y - catchPose.direction.y) < 1e-5);
  assert.ok(Math.abs(justBeforeCatch.direction.z - catchPose.direction.z) < 1e-5);
});

test("a throw begins down, points up halfway, and completes one rotation", () => {
  const release = sampleCascade(0, 0);
  const halfway = sampleCascade(
    CASCADE_DEFAULTS.flightBeats * CASCADE_DEFAULTS.beatDuration * 0.5,
    0,
  );
  close(release.direction.x, 0);
  close(release.direction.y, -1);
  close(release.direction.z, 0);
  close(halfway.spinAngle, Math.PI);
  close(halfway.direction.x, 0);
  close(halfway.direction.y, 1);
  close(halfway.direction.z, 0);
  close(halfway.projectedAngle, 0.5);
  assert.equal(halfway.throwState, 2);
});

test("alternating throws form 45-degree front-left and front-right planes", () => {
  const quarterFlight = CASCADE_DEFAULTS.flightBeats * 0.25;
  const leftToRight = sampleCascade(
    quarterFlight * CASCADE_DEFAULTS.beatDuration,
    0,
  );
  const rightToLeft = sampleCascade(
    (1 + quarterFlight) * CASCADE_DEFAULTS.beatDuration,
    1,
  );
  const diagonal = Math.SQRT1_2;

  close(leftToRight.direction.x, diagonal);
  close(leftToRight.direction.y, 0);
  close(leftToRight.direction.z, diagonal);
  close(rightToLeft.direction.x, -diagonal);
  close(rightToLeft.direction.y, 0);
  close(rightToLeft.direction.z, diagonal);
  close(leftToRight.planeHorizontal.x, diagonal);
  close(leftToRight.planeHorizontal.z, diagonal);
  close(rightToLeft.planeHorizontal.x, -diagonal);
  close(rightToLeft.planeHorizontal.z, diagonal);
});

test("the caught club points down while carrying rearward into the next plane", () => {
  const dwellPhase = CASCADE_DEFAULTS.flightBeats
    + (3 - CASCADE_DEFAULTS.flightBeats) * 0.75;
  const held = sampleCascade(dwellPhase * CASCADE_DEFAULTS.beatDuration, 0);
  assert.equal(held.airborne, false);
  close(held.direction.x, 0);
  close(held.direction.y, -1);
  close(held.direction.z, 0);
  assert.ok(held.position.z < 0);
  assert.ok(held.planeHorizontal.x < 0, "right-hand catch prepares the front-left plane");
});

test("all returned quaternions are normalized", () => {
  for (let step = 0; step <= 60; step += 1) {
    const pose = sampleCascade(step * CASCADE_DEFAULTS.beatDuration / 20, step % 3);
    close(quaternionDot(pose.quaternion, pose.quaternion), 1, 1e-7);
  }
});

test("the render quaternion agrees with the reported club and plane directions", () => {
  for (let step = 0; step <= 72; step += 1) {
    const pose = sampleCascade(step * CASCADE_DEFAULTS.beatDuration / 24, step % 3);
    closeVector(rotateVector(pose.quaternion, { x: 0, y: 1, z: 0 }), pose.direction, 1e-7);
    if ((!pose.airborne || Math.abs(Math.sin(pose.spinAngle)) < 1e-8)
      && Math.abs(pose.rollDegrees % 360) < 1e-8) {
      closeVector(
        rotateVector(pose.quaternion, { x: 0, y: 0, z: 1 }),
        pose.planeHorizontal,
        1e-7,
      );
    }
  }
});

test("each virtual club exposes axial roll that matches its rendered pose", () => {
  for (let clubIndex = 0; clubIndex < 3; clubIndex += 1) {
    const release = sampleCascade(clubIndex * CASCADE_DEFAULTS.beatDuration, clubIndex);
    close(release.rollDegrees, clubIndex * 120);
  }

  const quarterFlight = sampleCascade(
    CASCADE_DEFAULTS.flightBeats * CASCADE_DEFAULTS.beatDuration * 0.25,
    0,
  );
  assert.notEqual(quarterFlight.rollDegrees, 0);
  closeVector(
    rotateVector(quarterFlight.quaternion, { x: 0, y: 1, z: 0 }),
    quarterFlight.direction,
    1e-7,
  );
});

test("flight centers stay inside their diagonal throw plane", () => {
  const release = sampleCascade(0, 0);
  for (let step = 0; step <= 20; step += 1) {
    const pose = sampleCascade(
      CASCADE_DEFAULTS.flightBeats * CASCADE_DEFAULTS.beatDuration * step / 20,
      0,
    );
    if (!pose.airborne) continue;
    const offset = {
      x: pose.position.x - release.position.x,
      y: pose.position.y - release.position.y,
      z: pose.position.z - release.position.z,
    };
    close(
      offset.x * pose.planeNormal.x
        + offset.y * pose.planeNormal.y
        + offset.z * pose.planeNormal.z,
      0,
      1e-7,
    );
  }
});

test("position and orientation remain continuous at catch and the next release", () => {
  for (const boundaryBeat of [CASCADE_DEFAULTS.flightBeats, 3]) {
    const before = sampleCascade((boundaryBeat - 1e-7) * CASCADE_DEFAULTS.beatDuration, 0);
    const after = sampleCascade(boundaryBeat * CASCADE_DEFAULTS.beatDuration, 0);
    const separation = Math.hypot(
      before.position.x - after.position.x,
      before.position.y - after.position.y,
      before.position.z - after.position.z,
    );
    assert.ok(separation < 2e-6, `position jump at beat ${boundaryBeat}`);
    const angle = 2 * Math.acos(Math.min(1, Math.abs(quaternionDot(before.quaternion, after.quaternion))));
    assert.ok(angle < 2e-6, `orientation jump at beat ${boundaryBeat}`);
  }
});

test("invalid inputs fail closed", () => {
  assert.throws(() => sampleCascade(Number.NaN, 0), /finite/);
  assert.throws(() => sampleCascade(0, 3), /0, 1, or 2/);
  assert.throws(() => sampleCascade(0, 0, { flightBeats: 3 }), /between 0 and 3/);
  assert.throws(() => sampleCascade(0, 0, { handDepth: 0 }), /must be positive/);
  assert.throws(() => sampleCascade(0, 0, { apexHeight: Number.NaN }), /must be finite/);
  assert.throws(() => sampleCascade(0, 0, { scoopDepth: -1 }), /must be non-negative/);
});
