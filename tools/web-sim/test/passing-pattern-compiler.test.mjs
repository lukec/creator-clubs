import assert from "node:assert/strict";
import test from "node:test";

import { PASSING_PATTERNS, getPassingPattern } from "../src/passing-library.mjs";
import {
  PASSING_FACING_CONVENTION,
  PASSING_PATTERN_COMPILER_VERSION,
  compilePassingPattern,
  passingFacingVector,
} from "../src/passing-pattern-compiler.mjs";

const dotXZ = (left, right) => left.x * right.x + left.z * right.z;
const unitBetween = (source, target) => {
  const x = target.x - source.x;
  const z = target.z - source.z;
  const length = Math.hypot(x, z);
  return { x: x / length, z: z / length };
};

test("passing headings use the documented audience coordinate convention", () => {
  assert.deepEqual(passingFacingVector(0), { x: 0, y: 0, z: 1 });
  assert.ok(Math.abs(passingFacingVector(90).x - 1) < 1e-12);
  assert.ok(Math.abs(passingFacingVector(90).z) < 1e-12);
  assert.ok(Math.abs(passingFacingVector(180).x) < 1e-12);
  assert.ok(Math.abs(passingFacingVector(180).z + 1) < 1e-12);
  assert.equal(PASSING_FACING_CONVENTION.zeroDirection, "downstage (+z)");
});

test("PPS notation compiles into its alternating-hand execution period", () => {
  const pattern = getPassingPattern("pps");
  const leftActions = pattern.events
    .filter((event) => event.juggler === "left")
    .map((event) => `${event.kind}:${event.hand}->${event.catchHand}`);

  assert.equal(pattern.executionPlan.compilerVersion, PASSING_PATTERN_COMPILER_VERSION);
  assert.equal(pattern.executionPlan.sourceLoopBeats, 3);
  assert.equal(pattern.executionPlan.handPeriodMultiplier, 2);
  assert.equal(pattern.loopBeats, 6);
  assert.deepEqual(leftActions, [
    "pass:right->left",
    "pass:left->right",
    "self:right->left",
    "pass:left->right",
    "pass:right->left",
    "self:left->right",
  ]);
});

test("every playable pattern has a periodic compiled plan and complete initial hand inventory", () => {
  PASSING_PATTERNS.forEach((pattern) => {
    assert.equal(pattern.executionPlan.compilerVersion, PASSING_PATTERN_COMPILER_VERSION, pattern.id);
    assert.deepEqual(pattern.executionPlan.orientation.convention, PASSING_FACING_CONVENTION, pattern.id);
    assert.equal(pattern.executionPlan.orientation.source, "declared-performer-facing", pattern.id);
    pattern.performers.forEach((person) => {
      const frame = pattern.executionPlan.orientation.performers[person.id];
      assert.equal(frame.facingDegrees, person.facing, `${pattern.id}:${person.id} retains declared facing`);
      assert.ok(Math.abs(Math.hypot(frame.forward.x, frame.forward.z) - 1) < 1e-12, `${pattern.id}:${person.id} forward is unit length`);
      assert.ok(Math.abs(Math.hypot(frame.right.x, frame.right.z) - 1) < 1e-12, `${pattern.id}:${person.id} right is unit length`);
      assert.ok(Math.abs(dotXZ(frame.forward, frame.right)) < 1e-12, `${pattern.id}:${person.id} actor frame is orthogonal`);
    });
    const performers = new Map(pattern.performers.map((person) => [person.id, person]));
    pattern.events.filter((event) => event.kind === "pass").forEach((event) => {
      const source = performers.get(event.juggler);
      const target = performers.get(event.target);
      const route = unitBetween(source, target);
      assert.ok(dotXZ(pattern.executionPlan.orientation.performers[source.id].forward, route) > 0, `${pattern.id}:${source.id} sees ${target.id} in front`);
      assert.ok(dotXZ(pattern.executionPlan.orientation.performers[target.id].forward, { x: -route.x, z: -route.z }) > 0, `${pattern.id}:${target.id} sees ${source.id} in front`);
    });
    if (pattern.inventoryMode === "visual-study") {
      assert.equal(pattern.executionPlan.handFlow, "visual-study", pattern.id);
      return;
    }
    assert.equal(pattern.executionPlan.handFlow, "periodic", pattern.id);
    const allocated = Object.values(pattern.executionPlan.initialHandAllocation)
      .reduce((total, hands) => total + hands.left + hands.right, 0);
    assert.equal(allocated, pattern.clubCount, `${pattern.id} compiled hand allocation`);
  });
});

test("the compiler rejects a missing performer action instead of inventing animation logic", () => {
  assert.throws(() => compilePassingPattern({
    id: "incomplete",
    loopBeats: 1,
    clubCount: 3,
    performers: [{ id: "a", x: 0, z: 0, facing: 0 }],
    events: [],
  }), /a has no action on beat 1/);
});

test("the compiler rejects invalid placement and passes behind declared facing", () => {
  assert.throws(() => compilePassingPattern({
    id: "invalid-placement",
    loopBeats: 1,
    clubCount: 3,
    performers: [{ id: "a", x: 0, z: 0, facing: Number.NaN }],
    events: [],
  }), /finite x, z, and facing/);

  assert.throws(() => compilePassingPattern({
    id: "behind-body",
    loopBeats: 1,
    clubCount: 6,
    performers: [
      { id: "a", x: 0, z: 0, facing: 0 },
      { id: "b", x: 0, z: -2, facing: 180 },
    ],
    events: [
      { beat: 0, juggler: "a", hand: "right", catchHand: "left", kind: "pass", target: "b" },
      { beat: 0, juggler: "b", hand: "right", catchHand: "left", kind: "pass", target: "a" },
    ],
  }), /behind or beside/);
});

test("the triangle actor frames face inward under the shared convention", () => {
  const triangle = getPassingPattern("directed-triangle-waltz").executionPlan.orientation.performers;
  assert.ok(triangle.a.forward.z < -0.99, "downstage A faces upstage toward the formation");
  assert.ok(triangle.b.forward.x > 0 && triangle.b.forward.z > 0, "audience-left B faces inward and downstage");
  assert.ok(triangle.c.forward.x < 0 && triangle.c.forward.z > 0, "audience-right C faces inward and downstage");
});
