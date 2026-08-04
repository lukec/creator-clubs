// Motion Lab V6: shallow, RGB-only, offline experiment for stable 1.2.0.
//
// P1 Roll: long-axis choreography and diffusion-aware spatial studies.
// P2 Flip: literal upright/inverted mappings and broad flip textures.
// P3 Energy: calibrated activity, derived flip speed, and Hand/Air response.
// P4 Flight: explicit throw-state and transition studies.
// P5 Police: the same eight time-based police patterns used by the web lab.
//
// This source intentionally avoids packed color, HSV host calls, arrays,
// allocation, recursion, and deep color-helper chains. The final artifact is
// tested directly in the firmware-shaped simulator; no byte-offset patch is
// applied after compilation.

@external("arduino", "fillLedsRGB")
declare function fillLedsRGB(red: i32, green: i32, blue: i32): void;

@external("arduino", "setLedRGB")
declare function setLedRGB(index: i32, red: i32, green: i32, blue: i32): void;

@external("arduino", "clearLeds")
declare function clearLeds(): void;

@external("arduino", "getButtonState")
declare function getButtonState(buttonIndex: i32): i32;

@external("arduino", "setIMUEnabled")
declare function setIMUEnabled(enabled: i32): void;

@external("arduino", "getProjectedAngle")
declare function getProjectedAngle(): f32;

@external("arduino", "getRoll")
declare function getRoll(): f32;

@external("arduino", "getActivity")
declare function getActivity(): f32;

@external("arduino", "getThrowState")
declare function getThrowState(): i32;

@external("arduino", "getTime")
declare function getTime(): f32;

@external("arduino", "printInt")
declare function printInt(value: i32): void;

const LED_COUNT: i32 = 32;
const PAGE_COUNT: i32 = 5;
const EFFECTS_PER_PAGE: i32 = 8;
const TOTAL_EFFECTS: i32 = PAGE_COUNT * EFFECTS_PER_PAGE;
const MULTI_CLICK_WINDOW: f32 = 0.36;
const LONG_PRESS_THRESHOLD: f32 = 0.50;
const MARKER_ON: f32 = 0.18;
const MARKER_CYCLE: f32 = 0.32;
const MARKER_GROUP_GAP: f32 = 0.32;
const MARKER_TAIL: f32 = 0.18;
const DEMO_EFFECT_SECONDS: f32 = 10.0;

let page: i32 = 0;
let effect: i32 = 0;
let runtimePrimed: i32 = 0;
let demoMode: i32 = 1;
let demoIndex: i32 = 0;
let demoStartedAt: f32 = -1.0;
let ignoreReleaseAfterDemo: i32 = 0;

let wasPressed: i32 = 0;
let pressStartedAt: f32 = 0.0;
let pendingClicks: i32 = 0;
let clickDeadline: f32 = 0.0;

let markerActive: i32 = 0;
let markerStartedAt: f32 = -1.0;

let previousAngle: f32 = 0.0;
let previousTime: f32 = 0.0;
let signedSpeed: f32 = 0.0;
let speedMagnitude: f32 = 0.0;
let activityEnvelope: f32 = 0.0;

let previousThrowState: i32 = 0;
let transitionKind: i32 = 0; // 1 release, 2 catch, 3 class change
let transitionStartedAt: f32 = -10.0;
let frozenLaunchAngle: f32 = 0.0;

function clamp01(value: f32): f32 {
  if (value != value) return 0.0;
  if (value < 0.0) return 0.0;
  if (value > 1.0) return 1.0;
  return value;
}

function wrap01(value: f32): f32 {
  if (value != value) return 0.0;
  let wrapped: f32 = value - f32(i32(value));
  if (wrapped < 0.0) wrapped += 1.0;
  return wrapped;
}

function absf(value: f32): f32 {
  return value < 0.0 ? -value : value;
}

function triangle(value: f32): f32 {
  const phase: f32 = wrap01(value);
  return phase < 0.5 ? phase * 2.0 : (1.0 - phase) * 2.0;
}

function calibratedActivity(raw: f32): f32 {
  const normalized: f32 = clamp01((raw - 0.005976) / 0.546515);
  return clamp01(normalized * 1.65 - normalized * normalized * 0.65);
}

function updateMotion(angle: f32, rawActivity: f32, now: f32): void {
  const elapsed: f32 = now - previousTime;
  if (elapsed > 0.001 && elapsed < 0.25) {
    let delta: f32 = angle - previousAngle;
    if (delta > 0.5) delta -= 1.0;
    if (delta < -0.5) delta += 1.0;
    const instantaneous: f32 = delta / elapsed;
    const targetSpeed: f32 = clamp01(absf(instantaneous) / 0.65);
    signedSpeed += (instantaneous - signedSpeed) * 0.42;
    speedMagnitude += (targetSpeed - speedMagnitude) * (targetSpeed > speedMagnitude ? 0.58 : 0.20);
  }
  const targetActivity: f32 = calibratedActivity(rawActivity);
  activityEnvelope += (targetActivity - activityEnvelope) * (targetActivity > activityEnvelope ? 0.66 : 0.24);
  previousAngle = angle;
  previousTime = now;
}

function updateThrow(throwState: i32, angle: f32, now: f32): void {
  if (throwState == previousThrowState) return;
  if (previousThrowState == 0 && throwState != 0) {
    transitionKind = 1;
    frozenLaunchAngle = angle;
  } else if (previousThrowState != 0 && throwState == 0) {
    transitionKind = 2;
  } else {
    transitionKind = 3;
  }
  transitionStartedAt = now;
  previousThrowState = throwState;
}

function showMarker(now: f32): bool {
  if (markerActive == 0) return false;
  const elapsed: f32 = now - markerStartedAt;
  const pagePulses: i32 = page + 1;
  const effectPulses: i32 = effect + 1;
  const pageDuration: f32 = f32(pagePulses) * MARKER_CYCLE;
  const effectStart: f32 = pageDuration + MARKER_GROUP_GAP;
  const effectDuration: f32 = f32(effectPulses) * MARKER_CYCLE;

  if (elapsed < pageDuration) {
    const phase: f32 = elapsed - f32(i32(elapsed / MARKER_CYCLE)) * MARKER_CYCLE;
    if (phase < MARKER_ON) fillLedsRGB(35, 80, 255);
    else fillLedsRGB(38, 14, 82);
    return true;
  }
  if (elapsed < effectStart) {
    fillLedsRGB(38, 14, 82);
    return true;
  }
  const effectElapsed: f32 = elapsed - effectStart;
  if (effectElapsed < effectDuration) {
    const phase: f32 = effectElapsed - f32(i32(effectElapsed / MARKER_CYCLE)) * MARKER_CYCLE;
    if (phase < MARKER_ON) fillLedsRGB(255, 255, 255);
    else fillLedsRGB(64, 64, 72);
    return true;
  }
  if (effectElapsed < effectDuration + MARKER_TAIL) {
    fillLedsRGB(64, 64, 72);
    return true;
  }
  markerActive = 0;
  return false;
}

function startMarker(now: f32): void {
  markerActive = 1;
  markerStartedAt = now;
}

function resetDynamics(): void {
  signedSpeed = 0.0;
  speedMagnitude = 0.0;
  activityEnvelope = 0.0;
  transitionKind = 0;
  transitionStartedAt = -10.0;
}

function commitClicks(now: f32): void {
  if (pendingClicks == 1) {
    effect = (effect + 1) % EFFECTS_PER_PAGE;
  } else if (pendingClicks == 2) {
    page = (page + 1) % PAGE_COUNT;
    effect = 0;
  } else {
    page = 0;
    effect = 0;
  }
  pendingClicks = 0;
  resetDynamics();
  startMarker(now);
  printInt(6000 + page * 100 + effect);
}

function exitDemo(now: f32): void {
  demoMode = 0;
  demoIndex = 0;
  page = 0;
  effect = 0;
  pendingClicks = 0;
  ignoreReleaseAfterDemo = 1;
  resetDynamics();
  startMarker(now);
  printInt(6000);
}

function updateDemo(now: f32): void {
  if (demoMode == 0) return;
  if (demoStartedAt < 0.0) demoStartedAt = now;
  const nextIndex: i32 = i32((now - demoStartedAt) / DEMO_EFFECT_SECONDS) % TOTAL_EFFECTS;
  if (nextIndex == demoIndex) return;
  demoIndex = nextIndex;
  page = demoIndex / EFFECTS_PER_PAGE;
  effect = demoIndex % EFFECTS_PER_PAGE;
  resetDynamics();
  printInt(6000 + page * 100 + effect);
}

function updateButton(now: f32): void {
  const pressed: i32 = getButtonState(0) != 0 ? 1 : 0;
  if (demoMode != 0) {
    if (pressed != 0 && wasPressed == 0) exitDemo(now);
    wasPressed = pressed;
    return;
  }
  if (ignoreReleaseAfterDemo != 0) {
    if (pressed == 0) ignoreReleaseAfterDemo = 0;
    wasPressed = pressed;
    return;
  }
  if (pressed != 0 && wasPressed == 0) {
    pressStartedAt = now;
  } else if (pressed == 0 && wasPressed != 0) {
    if (now - pressStartedAt < LONG_PRESS_THRESHOLD) {
      pendingClicks += 1;
      clickDeadline = now + MULTI_CLICK_WINDOW;
    }
  }
  if (pendingClicks != 0 && now > clickDeadline) commitClicks(now);
  wasPressed = pressed;
}

// --------------------------------------------------------------------------
// Page 1: Roll

function rollWheel(phase: f32): void {
  const t: f32 = triangle(phase);
  fillLedsRGB(20 + i32(235.0 * t), 225 - i32(5.0 * t), 255 - i32(235.0 * t));
}

function rollWhiteRider(phase: f32): void {
  fillLedsRGB(96, 35, 190);
  const head: i32 = i32(triangle(phase) * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > head ? i - head : head - i;
    if (distance <= 1) setLedRGB(i, 255, 255, 255);
    else if (distance <= 3) setLedRGB(i, 242, 145, 255);
    else if (distance <= 6) setLedRGB(i, 176, 75, 235);
  }
}

function rollPinkRider(phase: f32): void {
  fillLedsRGB(32, 75, 205);
  const head: i32 = i32(triangle(phase) * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > head ? i - head : head - i;
    if (distance <= 1) setLedRGB(i, 255, 235, 255);
    else if (distance <= 3) setLedRGB(i, 255, 80, 205);
    else if (distance <= 6) setLedRGB(i, 160, 60, 235);
  }
}

function rollSplit(phase: f32): void {
  const boundary: i32 = i32(triangle(phase) * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    if (i < boundary) setLedRGB(i, 15, 215, 215);
    else setLedRGB(i, 255, 70, 125);
  }
  setLedRGB(boundary, 255, 245, 235);
}

function rollBands(phase: f32): void {
  const offset: i32 = i32(phase * 8.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const width: i32 = i < 16 ? 4 : 8;
    if (((i + offset) / width) % 2 == 0) setLedRGB(i, 30, 215, 225);
    else setLedRGB(i, 145, 55, 245);
  }
}

function rollSeamlessFade(phase: f32): void {
  const t: f32 = triangle(phase);
  fillLedsRGB(20 + i32(20.0 * t), 235 - i32(205.0 * t), 255 - i32(55.0 * t));
}

function rollAurora(phase: f32): void {
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const t: f32 = triangle(phase + f32(i) / 31.0);
    setLedRGB(i, 20 + i32(225.0 * t), 215 - i32(160.0 * t), 245);
  }
}

function rollPortals(phase: f32): void {
  fillLedsRGB(75, 35, 180);
  const a: i32 = i32(triangle(phase) * 31.0);
  const b: i32 = 31 - a;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const da: i32 = i > a ? i - a : a - i;
    const db: i32 = i > b ? i - b : b - i;
    if (da <= 1) setLedRGB(i, 210, 255, 255);
    else if (db <= 1) setLedRGB(i, 255, 220, 250);
    else if (da <= 4) setLedRGB(i, 25, 210, 245);
    else if (db <= 4) setLedRGB(i, 245, 70, 200);
  }
}

// --------------------------------------------------------------------------
// Page 2: Flip

function flipPoseWash(angle: f32): void {
  const t: f32 = triangle(angle);
  fillLedsRGB(20 + i32(235.0 * t), 220, 250 - i32(225.0 * t));
}

function flipHeightTracer(angle: f32): void {
  fillLedsRGB(35, 105, 210);
  const head: i32 = 31 - i32(triangle(angle) * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > head ? i - head : head - i;
    if (distance <= 1) setLedRGB(i, 255, 255, 255);
    else if (distance <= 3) setLedRGB(i, 120, 235, 255);
    else if (distance <= 6) setLedRGB(i, 55, 165, 245);
  }
}

function flipPinkTracer(angle: f32): void {
  fillLedsRGB(65, 45, 185);
  const head: i32 = 31 - i32(triangle(angle) * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > head ? i - head : head - i;
    if (distance <= 1) setLedRGB(i, 255, 245, 255);
    else if (distance <= 3) setLedRGB(i, 255, 85, 205);
    else if (distance <= 6) setLedRGB(i, 120, 80, 245);
  }
}

function flipPoseBoundary(angle: f32): void {
  const boundary: i32 = i32(triangle(angle) * 32.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    if (i < boundary) setLedRGB(i, 255, 65, 125);
    else setLedRGB(i, 20, 215, 235);
  }
  if (boundary < LED_COUNT) setLedRGB(boundary, 255, 245, 235);
}

function flipBands(angle: f32): void {
  const offset: i32 = i32(triangle(angle) * 8.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const width: i32 = i < 16 ? 4 : 8;
    if (((i + offset) / width) % 2 == 0) setLedRGB(i, 25, 205, 235);
    else setLedRGB(i, 255, 70, 165);
  }
}

function flipOpposed(angle: f32): void {
  fillLedsRGB(25, 145, 190);
  const a: i32 = i32(angle * 31.0);
  const b: i32 = 31 - a;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const da: i32 = i > a ? i - a : a - i;
    const db: i32 = i > b ? i - b : b - i;
    if (da <= 1 || db <= 1) setLedRGB(i, 255, 255, 255);
    else if (da <= 4) setLedRGB(i, 45, 225, 255);
    else if (db <= 4) setLedRGB(i, 250, 80, 205);
  }
}

function flipReversingGradient(angle: f32): void {
  const pose: f32 = triangle(angle);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    let t: f32 = f32(i) / 31.0;
    if (pose > 0.5) t = 1.0 - t;
    setLedRGB(i, 35 + i32(215.0 * t), 95 - i32(30.0 * t), 235);
  }
}

function flipMirror(phase: f32): void {
  const shift: i32 = i32(phase * 8.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    let local: i32 = (i + shift) % 8;
    if (local > 4) local = 8 - local;
    const t: f32 = f32(local) / 4.0;
    setLedRGB(i, 30 + i32(220.0 * t), 210 - i32(150.0 * t), 245);
  }
}

// --------------------------------------------------------------------------
// Page 3: Energy

function energyFlame(energy: f32, now: f32): void {
  const level: f32 = clamp01(energy);
  fillLedsRGB(235 + i32(20.0 * level), 45 + i32(190.0 * level), 12 + i32(70.0 * level));
  const tick: i32 = i32(now * (7.0 + level * 26.0));
  const tips: i32 = 2 + i32(level * 6.0);
  for (let i: i32 = 0; i < tips; i++) {
    const led: i32 = 31 - ((tick * 3 + i * 5 + i * i) % 9);
    if ((tick + i) % 3 == 0) setLedRGB(led, 255, 255, 245);
    else setLedRGB(led, 255, 150 + ((i * 17) % 90), 35);
  }
}

function stillnessBloom(energy: f32, now: f32): void {
  const stillness: f32 = 1.0 - clamp01(energy);
  const breathe: i32 = i32(triangle(now * 0.18) * 35.0);
  fillLedsRGB(70 + breathe, 35, 175 + breathe);
  const center: i32 = 24;
  const radius: i32 = 3 + i32(stillness * 10.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > center ? i - center : center - i;
    if (distance <= radius) setLedRGB(i, 100 + i32(95.0 * stillness), 85 + i32(145.0 * stillness), 245);
  }
}

function activityContrast(energy: f32, now: f32): void {
  const level: f32 = clamp01(energy);
  const breathe: i32 = i32(triangle(now * 0.22) * 18.0);
  fillLedsRGB(42 + breathe + i32(18.0 * level), 18 + i32(212.0 * level), 58 + breathe + i32(175.0 * level));
}

function spinHeat(speed: f32): void {
  const heat: f32 = clamp01(speed);
  fillLedsRGB(20 + i32(235.0 * heat), 220 - i32(145.0 * heat), 245 - i32(125.0 * heat));
}

function directionLock(direction: f32, speed: f32): void {
  const power: i32 = 195 + i32(60.0 * clamp01(speed));
  if (absf(direction) < 0.12) fillLedsRGB(115, 45, 220);
  else if (direction > 0.0) fillLedsRGB(20, power, 235);
  else fillLedsRGB(power, 45, 185);
  if (absf(direction) >= 0.12) setLedRGB(direction > 0.0 ? 31 : 0, 255, 255, 255);
}

function activitySparks(energy: f32, now: f32): void {
  const level: f32 = clamp01(energy);
  fillLedsRGB(180, 45, 110);
  if (level < 0.10) return;
  const sparks: i32 = 2 + i32(level * 9.0);
  const tick: i32 = i32(now * (2.0 + level * 20.0));
  for (let i: i32 = 0; i < sparks; i++) {
    const led: i32 = (tick * 11 + i * 7 + i * i * 3) % LED_COUNT;
    setLedRGB(led, 255, 170 + ((i * 17) % 86), 225);
  }
}

function handAirField(throwState: i32, now: f32): void {
  const age: f32 = now - transitionStartedAt;
  if (age < 0.13) fillLedsRGB(255, 255, 255);
  else if (throwState == 0) fillLedsRGB(125, 45, 225);
  else fillLedsRGB(255, 75, 130);
}

function throwClassField(throwState: i32): void {
  if (throwState == 0) fillLedsRGB(125, 45, 225);
  else if (throwState == 1) fillLedsRGB(25, 220, 225);
  else if (throwState == 2) fillLedsRGB(255, 85, 125);
  else if (throwState == 3) fillLedsRGB(255, 235, 115);
  else if (throwState == 4) fillLedsRGB(90, 235, 150);
  else fillLedsRGB(235, 75, 220);
}

// --------------------------------------------------------------------------
// Page 4: Flight / classifier experiments

function flightBinary(throwState: i32): void {
  if (throwState == 0) fillLedsRGB(90, 35, 190);
  else {
    for (let i: i32 = 0; i < LED_COUNT; i++) {
      if (i < 16) setLedRGB(i, 25, 210, 235);
      else setLedRGB(i, 255, 70, 155);
    }
  }
}

function flightTransitions(throwState: i32, now: f32): void {
  const age: f32 = now - transitionStartedAt;
  if (age < 0.18 && transitionKind == 1) fillLedsRGB(255, 255, 255);
  else if (age < 0.22 && transitionKind == 2) fillLedsRGB(25, 235, 225);
  else if (throwState == 0) fillLedsRGB(115, 40, 210);
  else fillLedsRGB(255, 75, 135);
}

function airborneTracer(throwState: i32, angle: f32): void {
  if (throwState == 0) {
    fillLedsRGB(105, 40, 205);
    return;
  }
  fillLedsRGB(35, 155, 210);
  const head: i32 = i32(angle * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > head ? i - head : head - i;
    if (distance <= 1) setLedRGB(i, 255, 255, 255);
    else if (distance <= 5) setLedRGB(i, 255, 80, 185);
  }
}

function frozenLaunch(throwState: i32): void {
  const t: f32 = triangle(frozenLaunchAngle);
  if (throwState == 0) fillLedsRGB(85, 40, 185);
  else fillLedsRGB(20 + i32(235.0 * t), 220 - i32(85.0 * t), 245 - i32(115.0 * t));
}

function classColors(throwState: i32): void {
  throwClassField(throwState);
}

function classBands(throwState: i32): void {
  const width: i32 = 2 + throwState;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const band: i32 = ((i / width) + throwState) % 2;
    if (band == 0) setLedRGB(i, 25, 210, 230);
    else setLedRGB(i, 245, 65 + throwState * 18, 180);
  }
}

function flightEnergy(throwState: i32, energy: f32): void {
  const level: f32 = clamp01(energy);
  if (throwState == 0) fillLedsRGB(95, 40, 195);
  else fillLedsRGB(35 + i32(220.0 * level), 205 - i32(105.0 * level), 235);
}

function flightRoll(throwState: i32, rollPhase: f32): void {
  if (throwState == 0) {
    fillLedsRGB(100, 40, 200);
    return;
  }
  const boundary: i32 = i32(triangle(rollPhase) * 31.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    if (i < boundary) setLedRGB(i, 25, 215, 225);
    else setLedRGB(i, 255, 75, 150);
  }
  setLedRGB(boundary, 255, 255, 255);
}

// --------------------------------------------------------------------------
// Page 5: Police pattern vocabulary

function policeSolid(red: bool): void {
  if (red) fillLedsRGB(255, 18, 48);
  else fillLedsRGB(18, 92, 255);
}

function policeDim(red: bool, level: i32): void {
  if (level == 76) {
    if (red) fillLedsRGB(194, 14, 36);
    else fillLedsRGB(14, 70, 194);
  } else {
    if (red) fillLedsRGB(184, 13, 35);
    else fillLedsRGB(13, 66, 184);
  }
}

function policeSet(index: i32, red: bool, dim: bool = false): void {
  if (dim) {
    if (red) setLedRGB(index, 184, 13, 35);
    else setLedRGB(index, 13, 66, 184);
  } else {
    if (red) setLedRGB(index, 255, 18, 48);
    else setLedRGB(index, 18, 92, 255);
  }
}

function policeFullPursuit(now: f32): void {
  policeSolid(i32(now / 0.32) % 2 == 0);
}

function policeDoubleTap(now: f32): void {
  const step: i32 = i32(now / 0.18) % 4;
  const red: bool = step < 2;
  if (step % 2 == 0) policeSolid(red);
  else policeDim(red, 72);
}

function policeRoadblock(now: f32): void {
  const swap: bool = i32(now / 0.64) % 2 != 0;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    policeSet(i, i < 16 ? !swap : swap);
  }
}

function policeBodyAlarm(now: f32): void {
  const swap: bool = i32(now / 0.32) % 2 != 0;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    if (i < 16) {
      if (swap) setLedRGB(i, 14, 70, 194);
      else setLedRGB(i, 194, 14, 36);
    } else policeSet(i, swap);
  }
  if (i32(now / 0.16) % 2 == 0) setLedRGB(31, 255, 255, 255);
}

function policeWhiteScanner(now: f32): void {
  const head: i32 = i32(triangle(now / 2.4) * 31.0 + 0.5);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distance: i32 = i > head ? i - head : head - i;
    if (distance <= 1) setLedRGB(i, 255, 255, 255);
    else if (distance <= 3) setLedRGB(i, 184, 184, 184);
    else policeSet(i, i >= 16);
  }
}

function policeBraidedBands(now: f32): void {
  const shift: i32 = i32(now / 0.18) % 8;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    policeSet(i, ((i + shift) / 4) % 2 == 0);
  }
}

function circularLedDistance(a: i32, b: i32): i32 {
  const direct: i32 = a > b ? a - b : b - a;
  return direct < LED_COUNT - direct ? direct : LED_COUNT - direct;
}

function policeTwinBeacons(now: f32): void {
  const headA: i32 = i32(now * 7.0) % LED_COUNT;
  const headB: i32 = (headA + 16) % LED_COUNT;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const distanceA: i32 = circularLedDistance(i, headA);
    const distanceB: i32 = circularLedDistance(i, headB);
    if (distanceA <= 1 || distanceB <= 1) setLedRGB(i, 255, 255, 255);
    else if (distanceA <= 4) policeSet(i, true);
    else if (distanceB <= 4) policeSet(i, false);
    else policeSet(i, i >= 16, true);
  }
}

function policeThreeZone(now: f32): void {
  const shift: i32 = i32(now / 0.64) % 3;
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    let zone: i32 = i / 11;
    if (zone > 2) zone = 2;
    const color: i32 = (zone + shift) % 3;
    if (color == 0) policeSet(i, false);
    else if (color == 1) policeSet(i, true);
    else setLedRGB(i, 255, 255, 255);
  }
}

export function init(): void {
  page = 0;
  effect = 0;
  runtimePrimed = 0;
  demoMode = 1;
  demoIndex = 0;
  demoStartedAt = -1.0;
  ignoreReleaseAfterDemo = 0;
  wasPressed = 0;
  pendingClicks = 0;
  markerActive = 0;
  markerStartedAt = -1.0;
  previousTime = 0.0;
  previousAngle = 0.0;
  previousThrowState = 0;
  resetDynamics();
  printInt(6000);
}

export function diagnosticSelect(nextPage: i32, nextEffect: i32): void {
  demoMode = 0;
  page = nextPage < 0 ? 0 : nextPage >= PAGE_COUNT ? PAGE_COUNT - 1 : nextPage;
  effect = nextEffect < 0 ? 0 : nextEffect >= EFFECTS_PER_PAGE ? EFFECTS_PER_PAGE - 1 : nextEffect;
  pendingClicks = 0;
  markerActive = 0;
  markerStartedAt = -1.0;
  resetDynamics();
  printInt(6000 + page * 100 + effect);
}

export function update(): void {
  const now: f32 = getTime();
  if (runtimePrimed == 0) {
    setIMUEnabled(1);
    previousTime = now;
    previousAngle = wrap01(getProjectedAngle());
    previousThrowState = getThrowState();
    wasPressed = getButtonState(0) != 0 ? 1 : 0;
    runtimePrimed = 1;
  }
  if (markerStartedAt < 0.0) markerStartedAt = now;

  updateDemo(now);
  updateButton(now);

  const angle: f32 = wrap01(getProjectedAngle());
  const roll: f32 = getRoll();
  const rollPhase: f32 = wrap01((roll + 180.0) / 360.0);
  const rawActivity: f32 = clamp01(getActivity());
  const throwState: i32 = getThrowState();
  updateMotion(angle, rawActivity, now);
  updateThrow(throwState, angle, now);

  clearLeds();
  if (showMarker(now)) return;

  if (page == 0) {
    if (effect == 0) rollWheel(rollPhase);
    else if (effect == 1) rollWhiteRider(rollPhase);
    else if (effect == 2) rollPinkRider(rollPhase);
    else if (effect == 3) rollSplit(rollPhase);
    else if (effect == 4) rollBands(rollPhase);
    else if (effect == 5) rollSeamlessFade(rollPhase);
    else if (effect == 6) rollAurora(rollPhase);
    else rollPortals(rollPhase);
  } else if (page == 1) {
    if (effect == 0) flipPoseWash(angle);
    else if (effect == 1) flipHeightTracer(angle);
    else if (effect == 2) flipPinkTracer(angle);
    else if (effect == 3) flipPoseBoundary(angle);
    else if (effect == 4) flipBands(angle);
    else if (effect == 5) flipOpposed(angle);
    else if (effect == 6) flipReversingGradient(angle);
    else flipMirror(angle);
  } else if (page == 2) {
    if (effect == 0) energyFlame(activityEnvelope, now);
    else if (effect == 1) stillnessBloom(activityEnvelope, now);
    else if (effect == 2) activityContrast(activityEnvelope, now);
    else if (effect == 3) spinHeat(speedMagnitude);
    else if (effect == 4) directionLock(signedSpeed, speedMagnitude);
    else if (effect == 5) activitySparks(activityEnvelope, now);
    else if (effect == 6) handAirField(throwState, now);
    else throwClassField(throwState);
  } else if (page == 3) {
    if (effect == 0) flightBinary(throwState);
    else if (effect == 1) flightTransitions(throwState, now);
    else if (effect == 2) airborneTracer(throwState, angle);
    else if (effect == 3) frozenLaunch(throwState);
    else if (effect == 4) classColors(throwState);
    else if (effect == 5) classBands(throwState);
    else if (effect == 6) flightEnergy(throwState, activityEnvelope);
    else flightRoll(throwState, rollPhase);
  } else {
    if (effect == 0) policeFullPursuit(now);
    else if (effect == 1) policeDoubleTap(now);
    else if (effect == 2) policeRoadblock(now);
    else if (effect == 3) policeBodyAlarm(now);
    else if (effect == 4) policeWhiteScanner(now);
    else if (effect == 5) policeBraidedBands(now);
    else if (effect == 6) policeTwinBeacons(now);
    else policeThreeZone(now);
  }
}

export function stop(): void {
  clearLeds();
  setIMUEnabled(0);
}
