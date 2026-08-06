import test from "node:test";
import assert from "node:assert/strict";
import { PASSING_PATTERNS, getPassingPattern } from "../src/passing-library.mjs";
import { COUNT_IN_BEATS, advancePlayhead, clampPlayhead, cueAtPlayhead, initialClubAllocation, inventoryTokens, sampleInventory, stepPlayhead } from "../src/passing-playback.mjs";

test("Passing Lab inventory always shows exactly each pattern's declared club count", () => {
  for (const pattern of PASSING_PATTERNS) {
    const sampledBeats = [];
    for (let beat = -COUNT_IN_BEATS; beat < pattern.loopBeats; beat += 0.25) sampledBeats.push(beat);
    sampledBeats.push(pattern.loopBeats + 0.25, pattern.loopBeats * 3 + 0.75);
    for (const beat of sampledBeats) {
      const sample = sampleInventory(pattern, beat);
      assert.equal(sample.total, pattern.clubCount, `${pattern.id} at ${beat}`);
      assert.equal(sample.held.length + sample.airborne.length, pattern.clubCount, `${pattern.id} inventory sum`);
      const visibleIds = [...sample.held, ...sample.airborne].map((club) => club.id);
      assert.equal(new Set(visibleIds).size, pattern.clubCount, `${pattern.id} has one visible instance of every club`);
    }
  }
});

test("Passing Lab respects declared exceptional allocations and deterministic rewinding", () => {
  assert.deepEqual(initialClubAllocation(getPassingPattern("stage-v-opening")), [
    { personId: "feeder", count: 1 }, { personId: "receiver-a", count: 1 }, { personId: "receiver-b", count: 1 },
  ]);
  assert.deepEqual(initialClubAllocation(getPassingPattern("directed-triangle-waltz")), [
    { personId: "a", count: 4 }, { personId: "b", count: 3 }, { personId: "c", count: 3 },
  ]);
  const pattern = getPassingPattern("three-count");
  const first = sampleInventory(pattern, 2.5);
  sampleInventory(pattern, 0.15);
  assert.deepEqual(sampleInventory(pattern, 2.5), first, "scrub result does not depend on playback history");
  const laterCycle = sampleInventory(pattern, pattern.loopBeats * 3 + 2.5);
  sampleInventory(pattern, 0.15);
  assert.deepEqual(sampleInventory(pattern, pattern.loopBeats * 3 + 2.5), laterCycle, "absolute-cycle scrubbing remains deterministic");
  assert.equal(inventoryTokens(pattern).length, pattern.clubCount);
});

test("triangle doubles retain their token identity across the intervening beat and catch on the declared boundary", () => {
  const pattern = getPassingPattern("directed-triangle-waltz");
  const countIn = sampleInventory(pattern, -0.01);
  assert.equal(countIn.held.length, 10);
  assert.equal(countIn.activeFlights.length, 0);
  assert.equal(countIn.currentEvents.length, 0);

  const opening = sampleInventory(pattern, 0.5);
  const openingPass = opening.activeFlights.find((event) => event.juggler === "a" && event.kind === "pass");
  assert.ok(openingPass);
  assert.equal(openingPass.flightBeats, 2);
  assert.equal(openingPass.launchBeat, 0);
  assert.equal(openingPass.catchBeat, 2);
  assert.equal(openingPass.elapsedBeats, 0.5);
  assert.equal(openingPass.progress, 0.25);
  assert.equal(opening.currentEvents.length, 3);

  const interveningBeat = sampleInventory(pattern, 1.5);
  const retainedPass = interveningBeat.activeFlights.find((event) => event.id === openingPass.id);
  assert.ok(retainedPass, "the same club remains assigned to the opening double");
  assert.equal(retainedPass.launchBeat, 0);
  assert.equal(retainedPass.catchBeat, 2);
  assert.equal(retainedPass.elapsedBeats, 1.5);
  assert.equal(retainedPass.progress, 0.75);
  assert.equal(interveningBeat.currentEvents.length, 3, "the next schedule row remains separately visible");
  assert.equal(interveningBeat.activeFlights.length, 4, "the prior double overlaps the next row's three throws");
  assert.equal(interveningBeat.held.length, 6);
  assert.equal(new Set([...interveningBeat.held, ...interveningBeat.activeFlights].map((club) => club.id)).size, 10);

  const caught = sampleInventory(pattern, 2);
  assert.equal(caught.activeFlights.some((event) => event.id === openingPass.id), false, "the double leaves the active ledger at its catch boundary");
  const caughtToken = caught.held.find((club) => club.id === openingPass.id);
  assert.ok(caughtToken, "the caught token is held rather than duplicated or discarded");
  assert.equal(caughtToken.homePersonId, "a");
  assert.equal(caughtToken.personId, "b");
  assert.equal(caughtToken.hand, "left", "arrivals transfer the persistent token to the declared target hand before that beat's launches");
  assert.equal(caught.total, 10);
});

test("absolute playhead sampling crosses the compiled loop without discarding active flights", () => {
  const pattern = getPassingPattern("directed-triangle-waltz");
  const sample = sampleInventory(pattern, pattern.loopBeats + 0.5);
  assert.equal(sample.absolutePlayhead, pattern.loopBeats + 0.5);
  assert.equal(sample.playhead, 0.5);
  assert.equal(sample.currentEvents.length, 3);
  assert.equal(sample.activeFlights.length, 4);
  assert.ok(sample.activeFlights.some((event) => event.launchBeat === pattern.loopBeats - 1 && event.catchBeat === pattern.loopBeats + 1));
  assert.ok(sample.activeFlights.some((event) => event.launchBeat === pattern.loopBeats));
  assert.equal(sample.held.length + sample.activeFlights.length, 10);
  assert.equal(new Set([...sample.held, ...sample.activeFlights].map((club) => club.id)).size, 10);
});

test("a boundary catch is available to that hand before its next launch", () => {
  const pattern = {
    id: "catch-then-throw",
    loopBeats: 2,
    clubCount: 1,
    performers: [{ id: "solo" }],
    events: [
      { beat: 0, juggler: "solo", hand: "right", catchHand: "left", kind: "self", target: "solo", flightBeats: 1 },
      { beat: 1, juggler: "solo", hand: "left", catchHand: "right", kind: "self", target: "solo", flightBeats: 1 },
    ],
    executionPlan: { initialHandAllocation: { solo: { left: 0, right: 1 } } },
  };
  const launched = sampleInventory(pattern, 0).activeFlights[0];
  const relaunched = sampleInventory(pattern, 1).activeFlights[0];
  assert.equal(relaunched.id, launched.id, "the boundary arrival supplies the only token available to the declared throw hand");
  assert.equal(relaunched.hand, "left");
  assert.equal(relaunched.launchBeat, 1);
  assert.equal(relaunched.catchBeat, 2);
});

test("PPS launches only the hand declared by its compiled six-beat execution plan", () => {
  const pattern = getPassingPattern("pps");
  assert.equal(pattern.loopBeats, 6);
  for (let beat = 0; beat < pattern.loopBeats; beat += 1) {
    const sample = sampleInventory(pattern, beat + 0.5);
    assert.equal(sample.airborne.length, 2);
    sample.airborne.forEach((club) => {
      assert.equal(club.hand, pattern.events.find((event) => event.beat === beat && event.juggler === club.juggler).hand);
    });
  }
});

test("Passing Lab transport retains Sky/Earth/Pass and snaps accurately between beats", () => {
  const pattern = getPassingPattern("two-count");
  assert.equal(cueAtPlayhead(pattern, -2).name, "Sky");
  assert.equal(cueAtPlayhead(pattern, -1).name, "Earth");
  assert.equal(cueAtPlayhead(pattern, 0).name, "Pass");
  assert.equal(stepPlayhead(pattern, -0.2, -1), -1);
  assert.equal(stepPlayhead(pattern, -0.2, 1), 0);
  assert.ok(Math.abs(advancePlayhead(pattern, pattern.loopBeats - 0.1, 0.2) - 0.1) < 1e-9, "loop wrap retains elapsed fractional beat");
  assert.equal(clampPlayhead(pattern, 99), pattern.loopBeats - 0.001);
});
