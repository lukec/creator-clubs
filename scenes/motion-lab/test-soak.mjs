#!/usr/bin/env node

import fs from "node:fs/promises";

const bytes = await fs.readFile(new URL("../../artifacts/motion-lab-soak.wasm", import.meta.url));
let time = 0;
let hardwareCalls = 0;
const leds = Array.from({ length: 32 }, () => [0, 0, 0]);
const messages = [];

const arduino = {
  fillLedsRGB(red, green, blue) { for (const led of leds) led.splice(0, 3, red, green, blue); },
  setLedRGB(index, red, green, blue) { leds[index].splice(0, 3, red, green, blue); },
  clearLeds() { for (const led of leds) led.splice(0, 3, 0, 0, 0); },
  getButtonState() { hardwareCalls++; return 0; },
  setIMUEnabled() { hardwareCalls++; },
  getProjectedAngle() { hardwareCalls++; return (time * 0.31) % 1; },
  getRoll() { hardwareCalls++; return Math.sin(time * 0.7) * 175; },
  getActivity() { hardwareCalls++; return 0.20 + Math.sin(time) * 0.18; },
  getThrowState() { hardwareCalls++; return Math.floor(time / 3) % 6; },
  getTime() { hardwareCalls++; return time; },
  printInt(value) { messages.push(value); },
};

const { instance } = await WebAssembly.instantiate(bytes, { arduino });
instance.exports.init();
if (hardwareCalls !== 0) throw new Error(`soak init made ${hardwareCalls} hardware calls`);
for (let frame = 0; frame < 12100; frame++) {
  time += 0.02;
  instance.exports.update();
  if (frame % 500 === 0 && time > 5) {
    const tooDim = leds.findIndex(([r, g, b]) => Math.max(r, g, b) < 120);
    if (tooDim >= 0) throw new Error(`all-effect soak LED ${tooDim} fell below visibility floor`);
  }
}

const selections = messages
  .filter((value) => value >= 4000 && value <= 4207)
  .filter((value, index, values) => index === 0 || value !== values[index - 1]);
const expected = [
  4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007,
  4100, 4101, 4102, 4103, 4104, 4105, 4106, 4107,
  4200, 4201, 4202, 4203, 4204, 4205, 4206, 4207,
];
if (String(selections) !== String(expected)) {
  throw new Error(`wrong all-effect soak sequence: ${selections}`);
}
instance.exports.stop();
console.log("motion-lab all-effect soak: all 24 production renderers advanced for ten seconds and stayed visible");
