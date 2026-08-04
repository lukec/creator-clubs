import assert from "node:assert/strict";
import test from "node:test";

import { CLUB_LIGHTING_LAYOUT } from "../src/club-lighting-lab.mjs";
import {
  CREATOR_CLUB_DIMENSIONS,
  CREATOR_CLUB_PROFILES,
  creatorClubRadiusAt,
} from "../src/creator-club-geometry.mjs";

test("lighting lab declares the measured club envelope and provisional source model", () => {
  assert.equal(CLUB_LIGHTING_LAYOUT.status, "working-hypothesis");
  assert.equal(CLUB_LIGHTING_LAYOUT.lengthMm, 515);
  assert.equal(CLUB_LIGHTING_LAYOUT.widthMm, 82);
  assert.equal(CLUB_LIGHTING_LAYOUT.stations.length, 16);
  assert.equal(CLUB_LIGHTING_LAYOUT.sources.length, 32);
});

test("sixteen axial stations are monotonic with a seven-station handle region", () => {
  assert.equal(CLUB_LIGHTING_LAYOUT.handleStations, 7);
  CLUB_LIGHTING_LAYOUT.stations.forEach((entry, index) => {
    assert.equal(entry.station, index);
    if (index > 0) assert.ok(entry.y > CLUB_LIGHTING_LAYOUT.stations[index - 1].y);
  });
});

test("each station has one fixed positive-Z and one fixed negative-Z source", () => {
  for (let station = 0; station < 16; station += 1) {
    const sources = CLUB_LIGHTING_LAYOUT.sources.filter((source) => source.station === station);
    assert.deepEqual(sources.map((source) => source.facingZ), [1, -1]);
  }
});

test("shared outline preserves the published envelope, balance, and late body bulge", () => {
  assert.deepEqual(CREATOR_CLUB_DIMENSIONS, {
    lengthMm: 515,
    widthMm: 82,
    balanceFromKnobMm: 280,
    balanceY: 0.225,
  });
  const widest = CREATOR_CLUB_PROFILES.shell.reduce(
    (best, point) => point[1] > best[1] ? point : best,
  );
  assert.deepEqual(widest, [1.466, 0.410]);
  assert.ok(widest[0] > 1.2, "body should bulge late rather than at its shoulder");
});

test("the PE body, EVA knob, and broad flat silicone cap remain separate", () => {
  assert.ok(CREATOR_CLUB_PROFILES.knob.at(-2)[0] < -2.29);
  assert.deepEqual(CREATOR_CLUB_PROFILES.shell.at(-2), [2.420, 0.207]);
  assert.deepEqual(CREATOR_CLUB_PROFILES.cap.at(-2), [2.575, 0.190]);
  assert.deepEqual(CREATOR_CLUB_PROFILES.cap.at(-1), [2.575, 0.000]);
  assert.ok(creatorClubRadiusAt(1.466) >= 0.409);
});
