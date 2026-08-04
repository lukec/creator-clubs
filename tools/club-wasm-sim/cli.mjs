#!/usr/bin/env node

import { ClubWasmSimulator } from "./club_wasm_sim.mjs";

const path = process.argv[2];
if (!path) {
  throw new Error("usage: node tools/club-wasm-sim/cli.mjs ARTIFACT.wasm [SECONDS]");
}
const seconds = Number(process.argv[3] ?? 20);
if (!Number.isFinite(seconds) || seconds <= 0) throw new Error(`invalid seconds: ${process.argv[3]}`);

const simulator = await ClubWasmSimulator.fromFile(path);
simulator.init();
simulator.run(seconds, (club) => {
  const time = club.time;
  club.setSensors({
    projectedAngle: (time * 0.31) % 1,
    roll: Math.sin(time * 0.71) * 175,
    pitch: Math.sin(time * 0.43) * 82,
    yaw: ((time * 41 + 180) % 360) - 180,
    activity: 0.24 + Math.sin(time * 1.17) * 0.22,
    throwState: Math.floor(time / 2.5) % 6,
  });
});
simulator.stop();
console.log(JSON.stringify(simulator.report(), null, 2));
