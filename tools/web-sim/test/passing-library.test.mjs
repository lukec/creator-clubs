import test from "node:test";
import assert from "node:assert/strict";
import { PASSING_PATTERNS, eventsAtBeat, getPassingPattern, passingStateHash, validatePassingPattern } from "../src/passing-library.mjs";

test("Passing Lab has independently declared schedules from two through five people", () => {
  assert.deepEqual([...new Set(PASSING_PATTERNS.map((pattern) => pattern.peopleCount))], [2, 3, 4, 5]);
  assert.deepEqual(Object.fromEntries([2, 3, 4, 5].map((count) => [count, PASSING_PATTERNS.filter((pattern) => pattern.peopleCount === count).length])), { 2: 12, 3: 12, 4: 12, 5: 12 });
  for (const pattern of PASSING_PATTERNS) assert.equal(validatePassingPattern(pattern), null, pattern.id);
});

test("Passing Lab stores events, poses, count-in, and target roles explicitly", () => {
  const pattern = getPassingPattern("v-feed-2-4");
  assert.deepEqual(pattern.countIn.map((cue) => cue.name), ["Sky", "Earth", "Pass"]);
  assert.equal(eventsAtBeat(pattern, 0).find((entry) => entry.juggler === "feeder").target, "receiver-a");
  assert.equal(eventsAtBeat(pattern, 1).find((entry) => entry.juggler === "feeder").kind, "self");
  assert.equal(eventsAtBeat(pattern, 2).find((entry) => entry.juggler === "feeder").target, "receiver-b");
  assert.equal(pattern.events[0].startPose, "side-head-down");
  assert.equal(pattern.events[0].catchPose, "shoulder-club-up");
  assert.equal(pattern.events[0].catchHand, "left", "the event model records the receiver hand instead of relying on a camera inference");
  assert.equal(pattern.events[0].spins, 1.5, "pass spin count is declarative input to the executor");
  assert.equal(pattern.executionPlan.handFlow, "periodic", "library cards expose validated execution plans");
});

test("Passing Lab share state is constrained to a known pattern and neutral club colour", () => {
  assert.equal(passingStateHash({ pattern: "four-count", club: "#dedbd2" }), "#pattern=four-count&club=%23dedbd2");
  assert.match(passingStateHash({ pattern: "not-real", club: "no" }), /one-count/);
});
