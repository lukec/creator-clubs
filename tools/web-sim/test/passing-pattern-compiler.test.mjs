import assert from "node:assert/strict";
import test from "node:test";

import { PASSING_PATTERNS, getPassingPattern } from "../src/passing-library.mjs";
import { PASSING_PATTERN_COMPILER_VERSION, compilePassingPattern } from "../src/passing-pattern-compiler.mjs";

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
    performers: [{ id: "a" }],
    events: [],
  }), /a has no action on beat 1/);
});
