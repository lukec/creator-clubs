import test from "node:test";
import assert from "node:assert/strict";
import { PASSING_PATTERNS, getPassingPattern } from "../src/passing-library.mjs";
import { COUNT_IN_BEATS, advancePlayhead, clampPlayhead, cueAtPlayhead, initialClubAllocation, inventoryTokens, sampleInventory, stepPlayhead } from "../src/passing-playback.mjs";

test("Passing Lab inventory always shows exactly each pattern's declared club count", () => {
  for (const pattern of PASSING_PATTERNS) {
    for (let beat = -COUNT_IN_BEATS; beat < pattern.loopBeats; beat += 0.25) {
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
  assert.equal(inventoryTokens(pattern).length, pattern.clubCount);
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
