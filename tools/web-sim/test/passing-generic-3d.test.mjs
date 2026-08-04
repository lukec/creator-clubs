import assert from "node:assert/strict";
import test from "node:test";

import { PASSING_PATTERNS, eventsAtBeat, getPassingPattern } from "../src/passing-library.mjs";
import {
  GENERIC_PASSING_3D_GESTURE,
  GENERIC_PASSING_3D_TIMING,
  genericPassingGesture,
  sampleGenericPassing3D,
} from "../src/passing-generic-3d.mjs";

const dot = (left, right) => left.x * right.x + left.y * right.y + left.z * right.z;
const subtract = (left, right) => ({ x: left.x - right.x, y: left.y - right.y, z: left.z - right.z });

test("every catalogue pattern can be fed directly into the compiled-pattern 3D executor", () => {
  PASSING_PATTERNS.forEach((pattern) => {
    [-2, -1, 0, 0.1, 0.5, 0.9].forEach((playhead) => {
      const sample = sampleGenericPassing3D(pattern, playhead);
      assert.equal(sample.model, "compiled-pattern-3d", pattern.id);
      assert.equal(sample.executionPlan, pattern.executionPlan, `${pattern.id} retains its compiler output`);
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

test("PPS executes PP S on alternating hands with real load, flight, and catch states", () => {
  const pattern = getPassingPattern("pps");
  const expectedKinds = ["pass", "pass", "self", "pass", "pass", "self"];
  const expectedHands = ["right", "left", "right", "left", "right", "left"];

  for (let beat = 0; beat < pattern.loopBeats; beat += 1) {
    const declared = eventsAtBeat(pattern, beat);
    assert.equal(declared.length, 2, `PPS beat ${beat + 1} has one action per juggler`);
    assert.ok(declared.every((event) => event.kind === expectedKinds[beat]));
    assert.ok(declared.every((event) => event.hand === expectedHands[beat]));

    const load = sampleGenericPassing3D(pattern, beat + 0.1);
    assert.equal(load.activeEvents.length, 2);
    assert.equal(load.airborne.length, 0, "the club is still connected during the forward load");
    load.activeEvents.forEach((event) => {
      const club = load.clubs.find((entry) => entry.id === event.id);
      const person = load.people.find((entry) => entry.id === event.juggler);
      assert.equal(club.motionState, "forward-load");
      assert.equal(club.holder.personId, event.juggler);
      assert.equal(club.holder.hand, event.hand);
      assert.equal(person.handMotion[event.hand].mode, "forward-load");
    });

    const flight = sampleGenericPassing3D(pattern, beat + 0.5);
    assert.equal(flight.airborne.length, 2, "both declared throws leave their hands");
    assert.ok(flight.airborne.every((club) => club.motionState === "flight"));

    const caught = sampleGenericPassing3D(pattern, beat + 0.9);
    assert.equal(caught.airborne.length, 0, "the actual state no longer calls a caught club airborne");
    caught.activeEvents.forEach((event) => {
      const club = caught.clubs.find((entry) => entry.id === event.id);
      assert.equal(club.motionState, "catch-return");
      assert.equal(club.holder.personId, event.target);
      assert.equal(club.holder.hand, event.catchHand);
    });
  }
});

test("the generic pass loads upward toward the midline and catches outside its release", () => {
  const pattern = getPassingPattern("pps");
  const gesture = genericPassingGesture(pattern, 0);
  const releaseDelta = subtract(gesture.releaseGrip, gesture.source.position);
  const catchDelta = subtract(gesture.catchGrip, gesture.target.position);
  const releaseSide = Math.abs(dot(releaseDelta, gesture.source.right));
  const catchSide = Math.abs(dot(catchDelta, gesture.target.right));

  assert.ok(releaseSide < GENERIC_PASSING_3D_GESTURE.readySideMetres, "release travels inward from the ready hand");
  assert.ok(Math.abs(releaseSide - GENERIC_PASSING_3D_GESTURE.releaseSideMetres) < 1e-12);
  assert.ok(Math.abs(gesture.releaseGrip.y - 1.0) < 1e-12, "release hand reaches the belly-button-height cue");
  assert.ok(catchSide > releaseSide, "catch is laterally outside the release");

  const load = sampleGenericPassing3D(pattern, GENERIC_PASSING_3D_TIMING.release);
  const source = load.people.find((person) => person.id === gesture.event.juggler);
  assert.ok(Math.abs(source.hands[gesture.event.hand].y - gesture.releaseGrip.y) < 1e-12, "hand remains connected through release");
});
