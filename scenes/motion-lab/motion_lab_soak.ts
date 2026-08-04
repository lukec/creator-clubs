// Temporary on-device all-effect soak. This imports the exact production
// renderers and advances through all 24 addresses every ten seconds without
// using the physical or firmware synthetic-button paths.

import {
  diagnosticSelect,
  init as motionLabInit,
  stop as motionLabStop,
  update as motionLabUpdate,
} from "./motion_lab";

@external("arduino", "getTime")
declare function getTime(): f32;

let scene: i32 = 0;
let nextChange: f32 = 0.0;

export function init(): void {
  motionLabInit();
  scene = 0;
  diagnosticSelect(0, 0);
  // The wrapper follows the same startup contract as production: no firmware
  // clock or hardware access until the first normal update.
  nextChange = -1.0;
}

export function update(): void {
  const now: f32 = getTime();
  if (nextChange < 0.0) {
    nextChange = now + 10.0;
  } else if (scene < 23 && now >= nextChange) {
    scene += 1;
    diagnosticSelect(scene / 8, scene % 8);
    nextChange = now + 10.0;
  }
  motionLabUpdate();
}

export function stop(): void {
  motionLabStop();
}
