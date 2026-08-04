import assert from "node:assert/strict";
import fs from "node:fs";

let angle = 0.1;
let roll = 0.0;
let activity = 0.0;
let now = 0.0;
let frame = Array.from({ length: 32 }, () => [0, 0, 0]);
const prints = [];

const arduino = {
  setIMUEnabled() {},
  getButtonState() { return 0; },
  getProjectedAngle() { return angle; },
  getRoll() { return roll; },
  getTime() { return now; },
  printInt(value) { prints.push(value); },
  getActivity() { return activity; },
  clearLeds() { frame = Array.from({ length: 32 }, () => [0, 0, 0]); },
  fillLedsRGB(r, g, b) { frame = Array.from({ length: 32 }, () => [r, g, b]); },
  setLedRGB(index, r, g, b) { frame[index] = [r, g, b]; },
};

const bytes = fs.readFileSync(new URL("../../artifacts/club-lab-study.wasm", import.meta.url));
const { instance } = await WebAssembly.instantiate(bytes, { arduino });
const api = instance.exports;
for (const name of ["init", "update", "stop", "setParam"]) {
  assert.equal(typeof api[name], "function", `${name} export`);
}

api.init();
assert.equal(prints.at(-1), 5000);

const signatures = [];
for (let pattern = 0; pattern < 4; pattern += 1) {
  api.setParam(0, pattern);
  angle = 0.13 + pattern * 0.17;
  roll = -120 + pattern * 70;
  activity = pattern >= 2 ? 0.08 : 0.01;
  now += 0.05;
  api.update();
  assert.ok(frame.every((rgb) => Math.max(...rgb) > 0), `pattern ${pattern} preserves visibility`);
  signatures.push(JSON.stringify(frame));
  assert.equal(prints.at(-1), 5000 + pattern);
}
assert.equal(new Set(signatures).size, 4, "four patterns render differently");

api.setParam(8, 0.7);
api.setParam(9, 1.0);
api.setParam(10, 1.0);
now += 0.05;
api.update();
api.stop();

console.log("club-lab-study simulator: four visible patterns and setParam contract passed");
