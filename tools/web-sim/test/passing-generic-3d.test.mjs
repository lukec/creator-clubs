import assert from "node:assert/strict";
import test from "node:test";

import { PASSING_PATTERNS } from "../src/passing-library.mjs";
import {
  GENERIC_PASSING_3D_GESTURE,
  GENERIC_PASSING_3D_TIMING,
  genericPassingGesture,
  sampleGenericPassing3D,
} from "../src/passing-generic-3d.mjs";

const dot = (left, right) => left.x * right.x + left.y * right.y + left.z * right.z;
const subtract = (left, right) => ({ x: left.x - right.x, y: left.y - right.y, z: left.z - right.z });

test("every catalogue pattern has a complete finite schedule-driven 3D sample", () => {
  PASSING_PATTERNS.forEach((pattern) => {
    [-2, -1, 0, 0.1, 0.5, 0.9].forEach((playhead) => {
      const sample = sampleGenericPassing3D(pattern.id, playhead);
      assert.equal(sample.people.length, pattern.peopleCount, `${pattern.id} renders every performer`);
      assert.equal(sample.clubs.length, pattern.clubCount, `${pattern.id} renders every declared club`);
      assert.equal(new Set(sample.clubs.map((club) => club.id)).size, pattern.clubCount, `${pattern.id} keeps unique club identities`);
      sample.clubs.forEach((club) => {
        assert.ok([club.position.x, club.position.y, club.position.z].every(Number.isFinite));
        assert.ok([club.quaternion.x, club.quaternion.y, club.quaternion.z, club.quaternion.w].every(Number.isFinite));
      });
    });
  });
});

test("the generic pass loads upward toward the midline and catches outside its release", () => {
  const gesture = genericPassingGesture("pps", 0);
  const releaseDelta = subtract(gesture.releaseGrip, gesture.source.position);
  const catchDelta = subtract(gesture.catchGrip, gesture.target.position);
  const releaseSide = Math.abs(dot(releaseDelta, gesture.source.right));
  const catchSide = Math.abs(dot(catchDelta, gesture.target.right));

  assert.ok(releaseSide < GENERIC_PASSING_3D_GESTURE.readySideMetres, "release travels inward from the ready hand");
  assert.ok(Math.abs(releaseSide - GENERIC_PASSING_3D_GESTURE.releaseSideMetres) < 1e-12);
  assert.ok(Math.abs(gesture.releaseGrip.y - 1.0) < 1e-12, "release hand reaches the belly-button-height cue");
  assert.ok(catchSide > releaseSide, "catch is laterally outside the release");

  const load = sampleGenericPassing3D("pps", GENERIC_PASSING_3D_TIMING.release);
  const source = load.people.find((person) => person.id === gesture.event.juggler);
  assert.ok(Math.abs(source.hands[gesture.event.hand].y - gesture.releaseGrip.y) < 1e-12, "hand remains connected through release");
});
