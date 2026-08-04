import assert from "node:assert/strict";
import test from "node:test";

import {
  compileGlowDsl,
  compileGlowDslDocument,
  GLOW_DSL_LAYOUT,
  GLOW_DSL_LIMITS,
  GLOW_DSL_PRESETS,
  GLOW_DSL_PRESET_ORDER,
  GlowDslError,
} from "../src/glow-dsl.mjs";

const BLACK = [0, 0, 0];
const pairFrame = (stations) => [...stations.map((color) => [...color]), ...stations.map((color) => [...color])];

const referenceStations = [
  [50, 108, 255], [97, 92, 255], [158, 82, 255], [212, 66, 255],
  [237, 53, 233], [255, 49, 193], [255, 44, 160], [255, 37, 134],
  [255, 40, 111], [255, 50, 95], [255, 68, 91], [255, 90, 101],
  [255, 110, 117], [255, 130, 144], [255, 159, 178], [255, 212, 242],
];

const sparse = (entries) => Array.from({ length: 16 }, (_, index) => entries.get(index + 1) ?? BLACK);

const expectedPresets = {
  reference: pairFrame(referenceStations),
  handle: pairFrame(sparse(new Map([[4, [255, 47, 220]]]))),
  body: pairFrame(sparse(new Map([[12, [255, 40, 96]]]))),
  adjacent: pairFrame(sparse(new Map([[11, [255, 14, 54]], [12, [12, 72, 255]]]))),
  alternating: pairFrame(Array.from({ length: 16 }, (_, index) => index % 2 === 0
    ? [255, 14, 54]
    : [12, 72, 255])),
  white: pairFrame(Array.from({ length: 16 }, () => [255, 240, 255])),
  off: pairFrame(Array.from({ length: 16 }, () => BLACK)),
};

test("paired16-v0 declares the exact 32-source side mapping", () => {
  assert.equal(GLOW_DSL_LAYOUT.stationCount, 16);
  assert.equal(GLOW_DSL_LAYOUT.ledCount, 32);
  assert.equal(GLOW_DSL_LAYOUT.sideAOffset, 0);
  assert.equal(GLOW_DSL_LAYOUT.sideBOffset, 16);
});

test("all seven exported presets compile byte-for-byte to the existing lab frames", () => {
  assert.deepEqual(GLOW_DSL_PRESET_ORDER, Object.keys(expectedPresets));
  for (const key of GLOW_DSL_PRESET_ORDER) {
    assert.deepEqual(compileGlowDsl(GLOW_DSL_PRESETS[key]), expectedPresets[key], key);
  }
});

test("side-specific paint maps station 1 to offsets 0 and 16", () => {
  const frame = compileGlowDsl(`
    glow 1
    layout paired16-v0
    clear
    side-a 1 = #112233
    side-b 1 = #aabbcc
  `);
  assert.deepEqual(frame[0], [17, 34, 51]);
  assert.deepEqual(frame[16], [170, 187, 204]);
  assert.deepEqual(frame[1], BLACK);
  assert.deepEqual(frame[17], BLACK);
});

test("selectors, exact lists, tile, ramp, comments, and level compose deterministically", () => {
  const result = compileGlowDslDocument(`
    // A small language, never JavaScript.
    glow 1
    layout paired16-v0
    pattern Selector exercise
    level 0.5
    clear
    both handle = tile(#ff0000, #0000ff)
    side-a body = ramp(#000000 -> #ffffff)
    side-b [8, 10, 12] = [#00ff00, #ffff00, #ff00ff]
    both 16 = #ffffff
  `);
  assert.equal(result.pattern, "Selector exercise");
  assert.equal(result.level, 0.5);
  assert.deepEqual(result.frame[0], [128, 0, 0]);
  assert.deepEqual(result.frame[1], [0, 0, 128]);
  assert.deepEqual(result.frame[7], [0, 0, 0]);
  assert.deepEqual(result.frame[15], [128, 128, 128]);
  assert.deepEqual(result.frame[23], [0, 128, 0]);
  assert.deepEqual(result.frame[25], [128, 128, 0]);
  assert.deepEqual(result.frame[27], [128, 0, 128]);
  assert.deepEqual(result.frame[31], [128, 128, 128]);
});

test("odd, even, numeric, and range selectors address one-based stations", () => {
  const frame = compileGlowDsl(`
    glow 1
    layout paired16-v0
    clear
    side-a odd = #010000
    side-a even = #000100
    side-a 3..5 = #000001
    side-a 16 = #010101
  `);
  assert.deepEqual(frame.slice(0, 6), [
    [1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 1, 0],
  ]);
  assert.deepEqual(frame[15], [1, 1, 1]);
});

test("malformed headers and unknown statements fail with line-aware errors", () => {
  assert.throws(() => compileGlowDsl("layout paired16-v0\nglow 1"), GlowDslError);
  assert.throws(
    () => compileGlowDsl("glow 1\nlayout paired16-v0\nexplode all = #ffffff"),
    /line 3: unrecognized statement/,
  );
});

test("out-of-bounds, reversed, duplicate, and malformed selectors are rejected", () => {
  const source = (selector) => `glow 1\nlayout paired16-v0\nboth ${selector} = #ffffff`;
  assert.throws(() => compileGlowDsl(source("0")), /outside 1\.\.16/);
  assert.throws(() => compileGlowDsl(source("17")), /outside 1\.\.16/);
  assert.throws(() => compileGlowDsl(source("8...3")), /unknown selector/);
  assert.throws(() => compileGlowDsl(source("8..3")), /low to high/);
  assert.throws(() => compileGlowDsl(source("[1, 1]")), /cannot contain duplicates/);
  assert.throws(() => compileGlowDsl(source("[1, nope]")), /comma-separated integers/);
});

test("exact lists enforce selected length and paints reject malformed colors", () => {
  const header = "glow 1\nlayout paired16-v0\n";
  assert.throws(
    () => compileGlowDsl(`${header}both 1..2 = [#ffffff]`),
    /1 colors for 2 selected stations/,
  );
  assert.throws(() => compileGlowDsl(`${header}both 1 = #fff`), /unknown paint/);
  assert.throws(() => compileGlowDsl(`${header}both 1 = tile()`), /cannot be empty/);
  assert.throws(() => compileGlowDsl(`${header}both 1 = ramp(#000000)`), /at least two colors/);
});

test("level is bounded and metadata directives cannot be repeated or moved after paint", () => {
  const header = "glow 1\nlayout paired16-v0\n";
  assert.throws(() => compileGlowDsl(`${header}level 1.01\nclear`), /from 0 through 1/);
  assert.throws(() => compileGlowDsl(`${header}level -0.1\nclear`), /from 0 through 1/);
  assert.throws(() => compileGlowDsl(`${header}clear\nclear`), /only be declared once/);
  assert.throws(() => compileGlowDsl(`${header}both all = off\nlevel 1`), /before paint statements/);
});

test("source and operation limits are enforced before work can grow without bound", () => {
  assert.throws(
    () => compileGlowDsl("x".repeat(GLOW_DSL_LIMITS.maxSourceLength + 1)),
    /source exceeds/,
  );
  const paints = Array.from(
    { length: GLOW_DSL_LIMITS.maxPaintStatements + 1 },
    () => "both 1 = #000000",
  ).join("\n");
  assert.throws(
    () => compileGlowDsl(`glow 1\nlayout paired16-v0\n${paints}`),
    /paint statements/,
  );
});

test("compiler accepts Unicode metadata but rejects non-string/control input and never evaluates paint", () => {
  assert.throws(() => compileGlowDsl(null), TypeError);
  assert.equal(
    compileGlowDslDocument("glow 1\nlayout paired16-v0\npattern 夜の光").pattern,
    "夜の光",
  );
  assert.throws(
    () => compileGlowDsl("glow 1\nlayout paired16-v0\npattern bad\u0000name"),
    /control characters/,
  );
  assert.throws(
    () => compileGlowDsl("glow 1\nlayout paired16-v0\nboth all = (() => process.exit())()"),
    /unknown paint/,
  );
});
