import test from "node:test";
import assert from "node:assert/strict";
import { PASSING_PATTERNS, PASSING_THROW_PROFILES, SIX_CLUB_HALF_SYNCHRONOUS_TOKEN_CYCLE_BEATS, eventsAtBeat, getPassingPattern, passingStateHash, validatePassingPattern } from "../src/passing-library.mjs";
import { oppositePassingHand } from "../src/passing-pattern-compiler.mjs";

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

test("catalogue pass paths own receiving hands without inferring from route geometry", () => {
  PASSING_PATTERNS.forEach((pattern) => {
    pattern.events.filter((event) => event.kind === "pass").forEach((event) => {
      const expected = event.path === "crossing" ? event.hand : oppositePassingHand(event.hand);
      assert.equal(event.catchHand, expected, `${pattern.id}:${event.beat}:${event.juggler} ${event.path}`);
    });
  });
  ["three-round", "four-round", "five-round", "five-star-one", "five-star-two", "five-star-three", "five-star-four"].forEach((id) => {
    assert.ok(getPassingPattern(id).events.filter((event) => event.kind === "pass").every((event) => event.path === "straight"), `${id} does not infer crossing technique from its target route`);
  });
});

test("throw profiles describe holds, singles, and the directed triangle doubles", () => {
  assert.deepEqual(PASSING_THROW_PROFILES.hold, { flightBeats: 0, spinsByKind: { hold: 0 }, heightMultiplier: 0 });
  assert.deepEqual(PASSING_THROW_PROFILES.single, { flightBeats: 1, spinsByKind: { pass: 1.5, self: 1 }, heightMultiplier: 1 });
  assert.deepEqual(PASSING_THROW_PROFILES.double, { flightBeats: 2, spinsByKind: { pass: 2.5, self: 2 }, heightMultiplier: 2 });
  const triangle = getPassingPattern("directed-triangle-waltz");
  triangle.events.filter((event) => event.kind === "pass").forEach((event) => {
    assert.equal(event.throwType, "double");
    assert.equal(event.flightBeats, 2);
    assert.equal(event.spins, 2.5);
    assert.equal(event.heightMultiplier, 2);
  });
  assert.ok(triangle.events.filter((event) => event.kind === "self").every((event) => event.throwType === "single"));
  assert.ok(
    PASSING_PATTERNS.flatMap((pattern) => pattern.events)
      .filter((event) => event.kind === "self")
      .every((event) => event.throwType === "single"),
    "catalogue selfs remain singles unless an individual self event explicitly declares a rare exception",
  );
});

test("six-club facing pairs separate single flight/spin/height from siteswap-3 token timing", () => {
  const facingPairs = PASSING_PATTERNS.filter((pattern) => pattern.peopleCount === 2);
  assert.equal(SIX_CLUB_HALF_SYNCHRONOUS_TOKEN_CYCLE_BEATS, 3);
  assert.equal(facingPairs.length, 12);
  facingPairs.forEach((pattern) => {
    assert.ok(pattern.events.every((event) => event.throwType === "single"), `${pattern.id} keeps ordinary single throws`);
    assert.ok(pattern.events.every((event) => event.flightBeats === 1), `${pattern.id} keeps the nominal single flight profile`);
    assert.ok(pattern.events.every((event) => event.tokenCycleBeats === SIX_CLUB_HALF_SYNCHRONOUS_TOKEN_CYCLE_BEATS), `${pattern.id} uses 3 / 3p token timing`);
    assert.ok(pattern.events.every((event) => event.tokenCycleSource === "declared"), `${pattern.id} explicitly owns its token cycle`);
  });
  assert.deepEqual(getPassingPattern("pps").executionPlan.initialHandAllocation, {
    left: { left: 1, right: 2 },
    right: { left: 1, right: 2 },
  });
  assert.deepEqual(getPassingPattern("pps-left").executionPlan.initialHandAllocation, {
    left: { left: 2, right: 1 },
    right: { left: 2, right: 1 },
  });
});

test("double PPS cross-feed declares its same-hand crossing exchanges as singles", () => {
  const pattern = getPassingPattern("double-pps-cross-feed");
  const crossings = pattern.events.filter((event) => event.kind === "pass" && event.path === "crossing");
  assert.deepEqual(crossings.map((event) => `${event.beat}:${event.juggler}->${event.target}`), [
    "1:a->b", "1:c->d", "2:b->a", "2:d->c",
    "4:a->b", "4:c->d", "5:b->a", "5:d->c",
  ]);
  assert.ok(crossings.every((event) => event.throwType === "single" && event.catchHand === event.hand));
});

test("compiled catalogue has at most one arrival per beat, performer, and hand", () => {
  PASSING_PATTERNS.forEach((pattern) => {
    const occupied = new Set();
    pattern.events.filter((event) => event.kind !== "hold").forEach((event) => {
      const beat = (event.beat + event.flightBeats) % pattern.loopBeats;
      const slot = `${beat}:${event.target}:${event.catchHand}`;
      assert.ok(!occupied.has(slot), `${pattern.id} duplicates arrival ${slot}`);
      occupied.add(slot);
    });
  });
});

test("Passing Lab share state is constrained to a known pattern and neutral club colour", () => {
  assert.equal(passingStateHash({ pattern: "four-count", club: "#dedbd2" }), "#pattern=four-count&club=%23dedbd2");
  assert.match(passingStateHash({ pattern: "not-real", club: "no" }), /one-count/);
});
