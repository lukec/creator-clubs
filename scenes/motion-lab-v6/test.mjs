#!/usr/bin/env node

import fs from "node:fs/promises";
import { ClubWasmSimulator } from "../../tools/club-wasm-sim/club_wasm_sim.mjs";

const wasmPath = process.argv[2] ?? new URL("../../artifacts/motion-lab-v6.wasm", import.meta.url);
const sourcePath = new URL("./motion_lab_v6.ts", import.meta.url);
const source = await fs.readFile(sourcePath, "utf8");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// Stable-1.2.0 design lint. These tokens either target an unproven ABI path or
// recreate the deep/allocation-heavy source shapes that failed on Club 1.
for (const forbidden of [
  "fillLedsHSV",
  "fillLeds(",
  "new Array",
  "Array<",
  "Math.",
  "patch_stack_safe_wasm",
]) {
  assert(!source.includes(forbidden), `source contains forbidden stable-1.2.0 token: ${forbidden}`);
}

const club = await ClubWasmSimulator.fromFile(wasmPath);
club.init();
assert(club.initHardwareCalls.length === 0, "init touched hardware");

function settle(seconds, driver = null) {
  const frames = Math.ceil(seconds / 0.02);
  for (let frame = 0; frame < frames; frame += 1) {
    if (driver) driver(frame);
    club.step();
  }
}

function select(page, effect) {
  club.exports.diagnosticSelect(page, effect);
  club.setSensors({ button: 0 });
  settle(0.08);
}

function changedPixels(before, after) {
  return after.filter((led, index) => String(led) !== String(before[index])).length;
}

function assertVisibleAddress(page, effect, options = {}) {
  club.assertVisible(`P${page + 1}E${effect + 1}`, options);
}

// First normal update owns the IMU startup; persisted init must not.
club.setSensors({ projectedAngle: 0.12, roll: -120, activity: 0.18, throwState: 0 });
club.step();
assert(club.imuEnabled === 1, "first update did not enable IMU");
club.assertVisible("boot demo P1E1");

// Every roll effect must respond broadly to long-axis roll and ignore a pure
// projected-angle change. This catches another semantic patch/substitution.
for (let effect = 0; effect < 8; effect += 1) {
  select(0, effect);
  club.setSensors({ roll: -150, projectedAngle: 0.12 });
  club.step();
  const rollA = club.frame();
  club.setSensors({ roll: 35 });
  club.step();
  const rollB = club.frame();
  assert(changedPixels(rollA, rollB) >= 12, `P1E${effect + 1} changed fewer than 12 LEDs with roll`);
  club.setSensors({ projectedAngle: 0.72 });
  club.step();
  assert(changedPixels(rollB, club.frame()) === 0, `P1E${effect + 1} responded to flip-only input`);
  assertVisibleAddress(0, effect);
}

// Every flip effect must respond broadly to projected angle and ignore a pure
// shaft-roll change.
for (let effect = 0; effect < 8; effect += 1) {
  select(1, effect);
  club.setSensors({ projectedAngle: 0.02, roll: -150 });
  club.step();
  const flipA = club.frame();
  club.setSensors({ projectedAngle: 0.48 });
  club.step();
  const flipB = club.frame();
  assert(changedPixels(flipA, flipB) >= 12, `P2E${effect + 1} changed fewer than 12 LEDs with flip`);
  club.setSensors({ roll: 35 });
  club.step();
  assert(changedPixels(flipB, club.frame()) === 0, `P2E${effect + 1} responded to roll-only input`);
  assertVisibleAddress(1, effect);
}

// Page 3 probes the exact weaknesses from V5's physical review.
select(2, 0);
club.setSensors({ activity: 0.005976 });
settle(0.5);
const flameStill = club.frame();
club.setSensors({ activity: 0.552491 });
settle(0.18);
const flameActive = club.frame();
assert(changedPixels(flameStill, flameActive) === 32, "P3E1 is not fast/full-club across calibrated activity");
assertVisibleAddress(2, 0);

select(2, 1);
club.setSensors({ activity: 0.005976 });
settle(0.3);
const stillBloom = club.frame();
club.setSensors({ activity: 0.552491 });
settle(0.3);
assert(changedPixels(stillBloom, club.frame()) >= 12, "P3E2 stillness bloom lacks visible contrast");
assertVisibleAddress(2, 1);

select(2, 2);
club.setSensors({ activity: 0.005976 });
settle(0.4);
// This is the explicit user-approved exception: the idle state may be much
// dimmer, but it remains nonblack and rises dramatically with movement.
assertVisibleAddress(2, 2, { minimum: 35, stronglyLit: 0 });
const contrastStill = Math.max(...club.leds[0]);
club.setSensors({ activity: 0.552491 });
settle(0.22);
const contrastActive = Math.max(...club.leds[0]);
assert(contrastActive >= contrastStill + 130, "P3E3 activity contrast is still too subtle");

select(2, 3);
club.setSensors({ projectedAngle: 0.10, activity: 0.18 });
club.step();
club.setSensors({ projectedAngle: 0.42 });
club.step();
assertVisibleAddress(2, 3);

select(2, 4);
club.setSensors({ projectedAngle: 0.42 });
settle(0.4);
const deadbandA = club.frame();
club.setSensors({ projectedAngle: 0.4202 });
settle(0.2);
assert(changedPixels(deadbandA, club.frame()) === 0, "P3E5 changes direction inside the idle dead band");
assertVisibleAddress(2, 4);

select(2, 5);
club.setSensors({ activity: 0.005976 });
settle(0.4);
const sparksIdle = club.frame();
settle(0.4);
assert(changedPixels(sparksIdle, club.frame()) === 0, "P3E6 moves while settled at rest");
club.setSensors({ activity: 0.552491 });
settle(0.25);
assert(changedPixels(sparksIdle, club.frame()) >= 2, "P3E6 does not wake with activity");
assertVisibleAddress(2, 5);

select(2, 6);
club.setSensors({ throwState: 0 });
settle(0.3);
const hand = club.frame();
club.setSensors({ throwState: 2 });
settle(0.3);
assert(changedPixels(hand, club.frame()) === 32, "P3E7 Hand/Air field does not switch");
assertVisibleAddress(2, 6);

select(2, 7);
const classFrames = new Set();
for (let state = 0; state <= 5; state += 1) {
  club.setSensors({ throwState: state });
  settle(0.08);
  classFrames.add(String(club.leds[0]));
  assertVisibleAddress(2, 7);
}
assert(classFrames.size === 6, `P3E8 exposes only ${classFrames.size}/6 distinct class colors`);

// Page 4 is explicitly exploratory. Exercise held/airborne/class-transition
// states for every renderer and demand a visible change in each.
for (let effect = 0; effect < 8; effect += 1) {
  select(3, effect);
  club.setSensors({ throwState: 0, projectedAngle: 0.12, roll: -120, activity: 0.03 });
  settle(0.24);
  const held = club.frame();
  club.setSensors({ throwState: 3, projectedAngle: 0.62, roll: 80, activity: 0.50 });
  settle(0.24);
  assert(changedPixels(held, club.frame()) >= 1, `P4E${effect + 1} does not expose held/flight difference`);
  assertVisibleAddress(3, effect);
}

// Page 5 is the shared web/on-club police vocabulary. It is time-driven and
// must keep each full strip visibly lit. Roadblock is explicitly red/blue only.
for (let effect = 0; effect < 8; effect += 1) {
  select(4, effect);
  settle(0.24);
  assertVisibleAddress(4, effect, effect === 1 ? { minimum: 13, stronglyLit: 32 } : {});
  const before = club.frame();
  const sampleSeconds = [0.34, 0.20, 0.66, 0.34, 0.22, 0.20, 0.16, 0.66][effect];
  settle(sampleSeconds);
  assert(changedPixels(before, club.frame()) >= 1, `P5E${effect + 1} does not animate`);
}
select(4, 2);
settle(0.12);
for (const [red, green, blue] of club.frame()) {
  const policeRed = red === 255 && green === 18 && blue === 48;
  const policeBlue = red === 18 && green === 92 && blue === 255;
  assert(policeRed || policeBlue, `P5E3 introduced a non-police source color: ${red},${green},${blue}`);
}

// Production Demo must select all 40 exact renderers for ten seconds each.
// Use a fresh simulator so earlier diagnostic selection cannot disable Demo.
const demo = await ClubWasmSimulator.fromFile(wasmPath);
demo.init();
for (let frame = 0; frame < 40 * 500 + 5; frame += 1) {
  const time = demo.time;
  demo.setSensors({
    projectedAngle: (time * 0.29) % 1,
    roll: Math.sin(time * 0.73) * 175,
    activity: 0.24 + Math.sin(time * 1.1) * 0.22,
    throwState: Math.floor(time / 2.6) % 6,
  });
  try {
    demo.step();
  } catch (error) {
    const address = 6000 + Math.floor(frame / 500 / 8) * 100 + (Math.floor(frame / 500) % 8);
    throw new Error(`Demo frame ${frame}, expected ${address}, sensors ${JSON.stringify(demo.sensors)}: ${error.message}`);
  }
  if (frame % 500 === 250) {
    const address = 6000 + Math.floor(frame / 500 / 8) * 100 + (Math.floor(frame / 500) % 8);
    if (address !== 6202 && address !== 6401) demo.assertVisible(`Demo ${address}`);
    else if (address === 6401) demo.assertVisible(`Demo ${address}`, { minimum: 13, stronglyLit: 32 });
    else demo.assertVisible(`Demo ${address}`, { minimum: 35, stronglyLit: 0 });
  }
}
const selections = demo.messages
  .filter((value) => value >= 6000 && value <= 6407)
  .filter((value, index, values) => index === 0 || value !== values[index - 1]);
const expected = [];
for (let p = 0; p < 5; p += 1) for (let e = 0; e < 8; e += 1) expected.push(6000 + p * 100 + e);
assert(String(selections.slice(0, 40)) === String(expected), `Demo traversal mismatch: ${selections}`);

// The exact production click grammar gets its own fresh instance: first press
// exits Demo, single advances, double changes page, triple returns home, long
// hold is ignored, and the fifth page wraps to the first.
const controls = await ClubWasmSimulator.fromFile(wasmPath);
controls.init();
controls.setSensors({ projectedAngle: 0.12, roll: -90, activity: 0.12, throwState: 0 });
controls.step();
const controlsSettle = (seconds) => {
  for (let frame = 0; frame < Math.ceil(seconds / 0.02); frame += 1) controls.step();
};
const press = (seconds = 0.06) => {
  controls.setSensors({ button: 1 });
  controls.step();
  controlsSettle(seconds);
  controls.setSensors({ button: 0 });
  controls.step();
};
const click = () => {
  press();
  controlsSettle(0.40);
};
const doubleClick = () => {
  press(); controlsSettle(0.10); press(); controlsSettle(0.40);
};
const tripleClick = () => {
  press(); controlsSettle(0.10); press(); controlsSettle(0.10); press(); controlsSettle(0.40);
};

press();
assert(controls.messages.at(-1) === 6000, "first press did not exit Demo to P1E1");
controlsSettle(1.4);
assert(controls.messages.at(-1) === 6000, "Demo-exit release also advanced the effect");
click();
assert(controls.messages.at(-1) === 6001, "single click did not advance to P1E2");
doubleClick();
assert(controls.messages.at(-1) === 6100, "double click did not advance to P2E1");
tripleClick();
assert(controls.messages.at(-1) === 6000, "triple click did not return home");
const beforeLongHold = controls.messages.length;
press(0.62);
controlsSettle(0.45);
assert(controls.messages.length === beforeLongHold, "long hold was consumed as a click");
doubleClick();
doubleClick();
doubleClick();
assert(controls.messages.at(-1) === 6300, "page navigation did not reach P4E1");
doubleClick();
assert(controls.messages.at(-1) === 6400, "page navigation did not reach P5E1");
doubleClick();
assert(controls.messages.at(-1) === 6000, "P5 did not wrap to P1");

club.stop();
demo.stop();
controls.stop();
assert(club.imuEnabled === 0 && demo.imuEnabled === 0 && controls.imuEnabled === 0, "stop did not disable IMU");

const report = club.report();
console.log(
  `motion-lab-v6 simulator: 40 exact renderers, roll/flip isolation, calibrated dynamics, ` +
  `throw studies, full Demo traversal, click navigation, limits, init contract, and visibility passed; ` +
  `${report.moduleBytes} bytes; p95 ${report.updateMs.p95} ms`,
);
