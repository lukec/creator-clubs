#!/usr/bin/env node

import fs from "node:fs/promises";

const wasmPath = process.argv[2] ?? new URL("../../artifacts/motion-lab.wasm", import.meta.url);
const bytes = await fs.readFile(wasmPath);

let time = 0;
let button = 0;
let angle = 0.12;
let yaw = -70;
let pitch = 25;
let roll = -35;
let rollWave = true;
let activity = 0.18;
let activityWave = true;
let angleRate = 0.3;
let throwState = 2;
let imuEnabled = 0;
const hardwareCalls = {
  button: 0,
  imu: 0,
  projectedAngle: 0,
  yaw: 0,
  pitch: 0,
  roll: 0,
  activity: 0,
  throwState: 0,
  time: 0,
};
const leds = Array.from({ length: 32 }, () => [0, 0, 0]);
const messages = [];

const arduino = {
  fillLedsRGB(red, green, blue) {
    for (const led of leds) led.splice(0, 3, red, green, blue);
  },
  setLedRGB(index, red, green, blue) {
    leds[index].splice(0, 3, red, green, blue);
  },
  clearLeds() {
    for (const led of leds) led.splice(0, 3, 0, 0, 0);
  },
  getButtonState() { hardwareCalls.button++; return button; },
  setIMUEnabled(enabled) { hardwareCalls.imu++; imuEnabled = enabled; },
  getProjectedAngle() { hardwareCalls.projectedAngle++; return angle; },
  getYaw() { hardwareCalls.yaw++; return yaw; },
  getPitch() { hardwareCalls.pitch++; return pitch; },
  getRoll() { hardwareCalls.roll++; return roll; },
  getActivity() { hardwareCalls.activity++; return activity; },
  getThrowState() { hardwareCalls.throwState++; return throwState; },
  getTime() { hardwareCalls.time++; return time; },
  printInt(value) { messages.push(value); },
};

const { instance } = await WebAssembly.instantiate(bytes, { arduino });

function update(dt = 0.02) {
  time += dt;
  angle = (angle + dt * angleRate) % 1;
  yaw = ((yaw + dt * 45 + 180) % 360) - 180;
  pitch = Math.sin(time) * 70;
  if (rollWave) roll = Math.cos(time * 0.7) * 160;
  if (activityWave) activity = 0.30 + Math.sin(time * 1.3) * 0.25;
  instance.exports.update();
}

function settle(seconds) {
  const count = Math.ceil(seconds / 0.02);
  for (let i = 0; i < count; i++) update();
}

function press(seconds = 0.06) {
  button = 1;
  update();
  settle(seconds);
  button = 0;
  update();
}

function shortClick() {
  press();
  settle(5.00);
}

function doubleClick() {
  press();
  settle(0.10);
  press();
  settle(5.00);
}

function tripleClick() {
  press();
  settle(0.10);
  press();
  settle(0.10);
  press();
  settle(5.00);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertVisible(label) {
  const black = leds.findIndex(([red, green, blue]) => red === 0 && green === 0 && blue === 0);
  assert(black < 0, `${label}: LED ${black} is black`);
  const tooDim = leds.findIndex(([red, green, blue]) => Math.max(red, green, blue) < 120);
  assert(tooDim < 0, `${label}: LED ${tooDim} is below the V4 visibility floor`);
  const stronglyLit = leds.filter(([red, green, blue]) => Math.max(red, green, blue) >= 160).length;
  assert(stronglyLit >= 30, `${label}: only ${stronglyLit}/32 LEDs are strongly illuminated; first=${leds[0]}`);
}

function countMarkerPulses(clickCount) {
  for (let i = 0; i < clickCount; i++) {
    press();
    if (i < clickCount - 1) settle(0.10);
  }
  // Commit after the multi-click decision window, then observe the marker.
  settle(0.38);
  let blue = 0;
  let white = 0;
  let wasBlue = false;
  let wasWhite = false;
  for (let i = 0; i < 550; i++) {
    const [red, green, blueChannel] = leds[0];
    const isBlue = red === 35 && green === 80 && blueChannel === 255;
    const isWhite = red === 255 && green === 255 && blueChannel === 255;
    if (isBlue && !wasBlue) blue++;
    if (isWhite && !wasWhite) white++;
    wasBlue = isBlue;
    wasWhite = isWhite;
    update(0.01);
  }
  return { blue, white };
}

instance.exports.init();
assert(imuEnabled === 0, "init touched the IMU before firmware component initialization");
assert(
  Object.values(hardwareCalls).every((count) => count === 0),
  `init touched firmware hardware before component initialization: ${JSON.stringify(hardwareCalls)}`,
);
update();
assert(imuEnabled === 1, "first update did not enable the IMU");
assertVisible("demo page 1 effect 1");

// Boot demo must visit every production address for ten seconds each without
// requiring button input. Diagnostic messages expose the selected address.
for (let index = 1; index < 24; index++) {
  settle(10.05);
  const expected = 4000 + Math.floor(index / 8) * 100 + (index % 8);
  assert(messages.at(-1) === expected, `demo did not select address ${expected}`);
  assertVisible(`demo address ${expected}`);
}

// The first press edge exits demo directly to P1E1. Its release must not also
// commit a normal short click to P1E2.
const beforeDemoExit = messages.length;
press();
assert(messages.length === beforeDemoExit + 1, "demo exit emitted more than one selection");
assert(messages.at(-1) === 4000, "first demo click did not select P1E1");
const demoExitPulses = (() => {
  let blue = 0;
  let white = 0;
  let wasBlue = false;
  let wasWhite = false;
  for (let i = 0; i < 150; i++) {
    const [red, green, blueChannel] = leds[0];
    const isBlue = red === 35 && green === 80 && blueChannel === 255;
    const isWhite = red === 255 && green === 255 && blueChannel === 255;
    if (isBlue && !wasBlue) blue++;
    if (isWhite && !wasWhite) white++;
    wasBlue = isBlue;
    wasWhite = isWhite;
    update(0.01);
  }
  return { blue, white };
})();
assert(demoExitPulses.blue === 1 && demoExitPulses.white === 1, "demo-exit marker is not blue, white");
settle(0.50);
assert(messages.at(-1) === 4000, "demo-exit release also advanced the effect");
assertVisible("page 1 effect 1");

// Page 1 must respond to long-axis roll and ignore projected-angle changes.
rollWave = false;
angleRate = 0;
angle = 0.12;
roll = -150;
update();
const rollColorA = [...leds[0]];
roll = 30;
update();
const rollColorB = [...leds[0]];
assert(String(rollColorA) !== String(rollColorB), "page 1 roll rainbow did not respond to roll");
angle = 0.72;
update();
assert(String(leds[0]) === String(rollColorB), "page 1 roll rainbow responded to flip angle");
rollWave = true;
angleRate = 0.3;

for (let effect = 2; effect <= 8; effect++) {
  shortClick();
  assert(messages.at(-1) === 4000 + effect - 1, `wrong page 1 selection for effect ${effect}`);
  assertVisible(`page 1 effect ${effect}`);
  if (effect === 2) {
    // The widened comet must alter a large region when the club rolls. V3's
    // four-pixel head passed visibility checks but looked almost stationary.
    rollWave = false;
    roll = -150;
    update();
    const frameA = leds.map((led) => [...led]);
    roll = 30;
    update();
    const changed = leds.filter((led, index) => String(led) !== String(frameA[index])).length;
    assert(changed >= 12, `roll comet changed only ${changed}/32 LEDs`);
    rollWave = true;
  }
}

shortClick();
assert(messages.at(-1) === 4000, "page 1 did not wrap from effect 8 to effect 1");
assertVisible("page 1 wrapped effect 1");

const beforeDouble = messages.length;
const page2Marker = countMarkerPulses(2);
assert(messages.length === beforeDouble + 1, "double click also committed a single click");
assert(messages.at(-1) === 4100, "double click did not select page 2 effect 1");
assert(page2Marker.blue === 2 && page2Marker.white === 1, "page 2 effect 1 marker is not blue, blue, white");
assertVisible("page 2 effect 1");

// Page 2 must respond to projected flip angle and ignore shaft-roll changes.
rollWave = false;
angleRate = 0;
angle = 0.12;
roll = -150;
update();
const flipColorA = [...leds[0]];
angle = 0.72;
update();
const flipColorB = [...leds[0]];
assert(String(flipColorA) !== String(flipColorB), "page 2 flip rainbow did not respond to flip angle");
roll = 30;
update();
assert(String(leds[0]) === String(flipColorB), "page 2 flip rainbow responded to shaft roll");
rollWave = true;
angleRate = 0.3;

for (let effect = 2; effect <= 8; effect++) {
  shortClick();
  assert(messages.at(-1) === 4100 + effect - 1, `wrong page 2 selection for effect ${effect}`);
  assertVisible(`page 2 effect ${effect}`);
}

shortClick();
assert(messages.at(-1) === 4100, "page 2 did not wrap from effect 8 to effect 1");

const page3Marker = countMarkerPulses(2);
assert(messages.at(-1) === 4200, "double click did not select page 3 effect 1");
assert(page3Marker.blue === 3 && page3Marker.white === 1, "page 3 effect 1 marker is not blue, blue, blue, white");
assertVisible("page 3 effect 1");

// The calibrated activity curve must produce a strong visual difference over
// the physically observed useful range, not require a raw value near 1.0.
activityWave = false;
activity = 0.005976;
settle(1.2);
const flameStill = [...leds[0]];
activity = 0.552491;
settle(1.2);
const flameActive = [...leds[0]];
assert(flameActive[1] > flameStill[1] + 120, "activity calibration is not visibly responsive");
activityWave = true;

for (let effect = 2; effect <= 8; effect++) {
  shortClick();
  assert(messages.at(-1) === 4200 + effect - 1, `wrong page 3 selection for effect ${effect}`);
  assertVisible(`page 3 effect ${effect}`);
  // Stress each Page 3 renderer beyond a marker transition. This cannot model
  // the ESP32 stack guard, but catches unstable math, indices, and state drift.
  settle(10.0);
  assertVisible(`page 3 effect ${effect} after stress`);
}

const beforeLongHold = messages.length;
button = 1;
update();
settle(0.60);
button = 0;
update();
settle(0.50);
assert(messages.length === beforeLongHold, "long hold was incorrectly treated as a click");

const homeMarker = countMarkerPulses(3);
assert(messages.at(-1) === 4000, "triple click did not reset to page 1 effect 1");
assert(homeMarker.blue === 1 && homeMarker.white === 1, "home marker is not blue, white");
assertVisible("page 1 effect 1 after triple-click reset");

doubleClick();
assert(messages.at(-1) === 4100, "double click did not return to page 2 effect 1");
doubleClick();
assert(messages.at(-1) === 4200, "double click did not return to page 3 effect 1");
doubleClick();
assert(messages.at(-1) === 4000, "page 3 did not wrap back to page 1");
assertVisible("page 1 after page wrap");

instance.exports.stop();
assert(imuEnabled === 0, "stop did not disable the IMU");

console.log("motion-lab simulator: 24 high-coverage effects; slow counted markers, axis isolation, broad comet motion, calibrated activity, Page 3 stress, and click controls passed");
