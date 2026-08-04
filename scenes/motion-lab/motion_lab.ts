// Offline motion laboratory for a 32-LED Flowtoys Creators Club.
//
// Page 1 maps long-axis roll into eight visual interpretations.
// Page 2 maps end-over-end flip angle into the same eight interpretations.
// Page 3 explores calibrated activity, flip speed/direction, throws, and
// combinations of the two calibrated axes.
//
// Short click: next effect (committed after the multi-click window).
// Double click: next page and reset to that page's first effect.
// Triple click: reset to page 1, effect 1 from anywhere.
// Long hold: not consumed here; the firmware retains shutdown control.

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
const PAGE_COUNT: i32 = 3;
const EFFECTS_PER_PAGE: i32 = 8;
const MULTI_CLICK_WINDOW: f32 = 0.36;
const LONG_PRESS_THRESHOLD: f32 = 0.50;
// Slow enough to count while holding a club: 180 ms on, 140 ms off. This is
// exactly twice the V3 pulse/cycle duration.
const MARKER_ON: f32 = 0.18;
const MARKER_CYCLE: f32 = 0.32;
const MARKER_GROUP_GAP: f32 = 0.32;
const MARKER_TAIL: f32 = 0.18;
const DEMO_EFFECT_SECONDS: f32 = 10.0;
const TOTAL_EFFECTS: i32 = PAGE_COUNT * EFFECTS_PER_PAGE;

let page: i32 = 0;
let effect: i32 = 0;

let wasPressed: i32 = 0;
let pressStartedAt: f32 = 0.0;
let pendingClicks: i32 = 0;
let clickDeadline: f32 = 0.0;

let markerActive: i32 = 1;
// A negative value means the marker is waiting for the first normal update.
// Script init runs before the firmware initializes Motion and Button, so init
// must not call hardware-backed imports just to obtain a clock value.
let markerStartedAt: f32 = -1.0;

let runtimePrimed: i32 = 0;
let demoMode: i32 = 1;
let demoIndex: i32 = 0;
let demoStartedAt: f32 = -1.0;
let ignoreReleaseAfterDemo: i32 = 0;

let previousAngle: f32 = 0.0;
let previousTime: f32 = 0.0;
let signedSpeed: f32 = 0.0;
let speedMagnitude: f32 = 0.0;
let smoothedActivity: f32 = 0.0;

function clamp01(value: f32): f32 {
  if (value != value) return 0.0;
  if (value < 0.0) return 0.0;
  if (value > 1.0) return 1.0;
  return value;
}

// The firmware normalizes activity against a 40 m/s^2 ceiling, but ordinary
// club movement occupies only a small fraction of that nominal 0..1 range.
// These bounds come from Club 2's accepted REST/ROLL/FLIP/ACTIVE calibration.
function calibratedActivity(raw: f32): f32 {
  const normalized: f32 = clamp01((raw - 0.005976) / 0.546515);
  // Boost the readable middle without clipping the high-energy end.
  return clamp01(normalized * 1.65 - normalized * normalized * 0.65);
}

function wrap01(value: f32): f32 {
  if (value != value) return 0.0;
  let wrapped: f32 = value;
  while (wrapped < 0.0) wrapped += 1.0;
  while (wrapped >= 1.0) wrapped -= 1.0;
  return wrapped;
}

function absf(value: f32): f32 {
  return value < 0.0 ? -value : value;
}

function byte(value: f32): i32 {
  return i32(clamp01(value) * 255.0);
}

// Return RGB as 0xRRGGBB. Saturation and value are normalized.
function hsv(hue: f32, saturation: f32, value: f32): u32 {
  const h: f32 = wrap01(hue) * 6.0;
  const sector: i32 = i32(h);
  const fraction: f32 = h - f32(sector);
  const v: f32 = clamp01(value);
  const s: f32 = clamp01(saturation);
  const low: f32 = v * (1.0 - s);
  const falling: f32 = v * (1.0 - s * fraction);
  const rising: f32 = v * (1.0 - s * (1.0 - fraction));

  let red: i32 = 0;
  let green: i32 = 0;
  let blue: i32 = 0;
  if (sector == 0) {
    red = byte(v); green = byte(rising); blue = byte(low);
  } else if (sector == 1) {
    red = byte(falling); green = byte(v); blue = byte(low);
  } else if (sector == 2) {
    red = byte(low); green = byte(v); blue = byte(rising);
  } else if (sector == 3) {
    red = byte(low); green = byte(falling); blue = byte(v);
  } else if (sector == 4) {
    red = byte(rising); green = byte(low); blue = byte(v);
  } else {
    red = byte(v); green = byte(low); blue = byte(falling);
  }
  return (u32(red) << 16) | (u32(green) << 8) | u32(blue);
}

function setPacked(index: i32, color: u32): void {
  setLedRGB(index, i32((color >> 16) & 255), i32((color >> 8) & 255), i32(color & 255));
}

function fillPacked(color: u32): void {
  fillLedsRGB(i32((color >> 16) & 255), i32((color >> 8) & 255), i32(color & 255));
}

function setHue(index: i32, hue: f32, saturation: f32, value: f32): void {
  setPacked(index, hsv(hue, saturation, value));
}

function fillHue(hue: f32, saturation: f32, value: f32): void {
  fillPacked(hsv(hue, saturation, value));
}

function triangle(value: f32): f32 {
  const phase: f32 = wrap01(value);
  return phase < 0.5 ? phase * 2.0 : (1.0 - phase) * 2.0;
}

function angularDistance(a: f32, b: f32): f32 {
  let d: f32 = absf(wrap01(a) - wrap01(b));
  if (d > 0.5) d = 1.0 - d;
  return d;
}

function updateMotion(angle: f32, activity: f32, now: f32): void {
  const elapsed: f32 = now - previousTime;
  if (elapsed > 0.001 && elapsed < 0.25) {
    let delta: f32 = angle - previousAngle;
    if (delta > 0.5) delta -= 1.0;
    if (delta < -0.5) delta += 1.0;

    // About two thirds of a turn per second reaches full scale. Use a faster
    // attack than release so a throw reads clearly but does not chatter.
    const instantaneous: f32 = delta / elapsed;
    const targetMagnitude: f32 = clamp01(absf(instantaneous) / 0.65);
    const speedGain: f32 = targetMagnitude > speedMagnitude ? 0.36 : 0.14;
    signedSpeed += (instantaneous - signedSpeed) * 0.28;
    speedMagnitude += (targetMagnitude - speedMagnitude) * speedGain;
  }
  const targetActivity: f32 = calibratedActivity(activity);
  const activityGain: f32 = targetActivity > smoothedActivity ? 0.34 : 0.12;
  smoothedActivity += (targetActivity - smoothedActivity) * activityGain;
  previousAngle = angle;
  previousTime = now;
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
    // Saturated blue-violet pulses count the page.
    if (phase < MARKER_ON) fillLedsRGB(35, 80, 255);
    else fillLedsRGB(28, 10, 55);
    return true;
  }

  if (elapsed < effectStart) {
    fillLedsRGB(28, 10, 55);
    return true;
  }

  const effectElapsed: f32 = elapsed - effectStart;
  if (effectElapsed < effectDuration) {
    const phase: f32 = effectElapsed - f32(i32(effectElapsed / MARKER_CYCLE)) * MARKER_CYCLE;
    // Bright white pulses count the effect within the page.
    if (phase < MARKER_ON) fillLedsRGB(255, 255, 255);
    else fillLedsRGB(48, 48, 48);
    return true;
  }

  if (effectElapsed < effectDuration + MARKER_TAIL) {
    fillLedsRGB(48, 48, 48);
    return true;
  }

  markerActive = 0;
  return false;
}

function startMarker(now: f32): void {
  markerActive = 1;
  markerStartedAt = now;
}

function commitClicks(now: f32): void {
  if (pendingClicks == 1) {
    effect = (effect + 1) % EFFECTS_PER_PAGE;
  } else if (pendingClicks == 2) {
    page = (page + 1) % PAGE_COUNT;
    effect = 0;
  } else {
    // Three or more quick clicks are the always-known home gesture.
    page = 0;
    effect = 0;
  }

  pendingClicks = 0;
  signedSpeed = 0.0;
  speedMagnitude = 0.0;
  smoothedActivity = 0.0;
  startMarker(now);
  printInt(4000 + page * 100 + effect);
}

function exitDemo(now: f32): void {
  demoMode = 0;
  demoIndex = 0;
  page = 0;
  effect = 0;
  pendingClicks = 0;
  signedSpeed = 0.0;
  speedMagnitude = 0.0;
  smoothedActivity = 0.0;
  // The press edge exits demo immediately. Suppress its later release so the
  // same physical click cannot also advance from P1E1 to P1E2.
  ignoreReleaseAfterDemo = 1;
  startMarker(now);
  printInt(4000);
}

function updateDemo(now: f32): void {
  if (demoMode == 0) return;
  if (demoStartedAt < 0.0) demoStartedAt = now;

  const nextIndex: i32 = i32((now - demoStartedAt) / DEMO_EFFECT_SECONDS) % TOTAL_EFFECTS;
  if (nextIndex == demoIndex) return;

  demoIndex = nextIndex;
  page = demoIndex / EFFECTS_PER_PAGE;
  effect = demoIndex % EFFECTS_PER_PAGE;
  signedSpeed = 0.0;
  speedMagnitude = 0.0;
  smoothedActivity = 0.0;
  printInt(4000 + page * 100 + effect);
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
    const held: f32 = now - pressStartedAt;
    if (held < LONG_PRESS_THRESHOLD) {
      pendingClicks += 1;
      clickDeadline = now + MULTI_CLICK_WINDOW;
    }
  }

  if (pendingClicks != 0 && now > clickDeadline) {
    commitClicks(now);
  }
  wasPressed = pressed;
}

// --------------------------------------------------------------------------
// Reusable angle studies. Page 1 supplies measured long-axis roll and Page 2
// supplies measured projected angle (the end-over-end flip axis).

function p1OrientationWheel(angle: f32): void {
  fillHue(angle, 1.0, 1.0);
}

function p1OrbitComet(angle: f32): void {
  // A thirteen-LED moving region reads as travel on a juggled prop. V3's
  // four-pixel head was technically moving but physically too subtle.
  fillLedsRGB(105, 32, 185);
  const head: i32 = i32(angle * f32(LED_COUNT)) % LED_COUNT;
  for (let offset: i32 = -6; offset <= 6; offset++) {
    const distance: i32 = offset < 0 ? -offset : offset;
    const led: i32 = (head + offset + LED_COUNT) % LED_COUNT;
    if (distance <= 1) setLedRGB(led, 255, 255, 255);
    else if (distance <= 3) setLedRGB(led, 255, 90, 225);
    else if (distance <= 5) setLedRGB(led, 190, 60, 235);
    else setLedRGB(led, 145, 45, 210);
  }
}

function p1OpposedComets(angle: f32): void {
  fillLedsRGB(20, 125, 180);
  const a: i32 = i32(angle * f32(LED_COUNT)) % LED_COUNT;
  const b: i32 = (a + LED_COUNT / 2) % LED_COUNT;
  for (let offset: i32 = -4; offset <= 4; offset++) {
    const distance: i32 = offset < 0 ? -offset : offset;
    const ledA: i32 = (a + offset + LED_COUNT) % LED_COUNT;
    const ledB: i32 = (b + offset + LED_COUNT) % LED_COUNT;
    if (distance <= 1) {
      setLedRGB(ledA, 170, 255, 255);
      setLedRGB(ledB, 255, 165, 235);
    } else if (distance <= 3) {
      setLedRGB(ledA, 35, 220, 255);
      setLedRGB(ledB, 255, 65, 190);
    } else {
      setLedRGB(ledA, 25, 170, 225);
      setLedRGB(ledB, 210, 45, 160);
    }
  }
}

function p1PitchHorizon(pitch: f32): void {
  const tilt: f32 = clamp01((pitch + 90.0) / 180.0);
  const boundary: i32 = i32(tilt * f32(LED_COUNT - 1));
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    if (i <= boundary) setLedRGB(i, 25, 125, 240);
    else setLedRGB(i, 255, 95, 12);
  }
  setLedRGB(boundary, 255, 220, 90);
}

function p1RollBands(roll: f32): void {
  const offset: i32 = i32(wrap01((roll + 180.0) / 360.0) * 8.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const band: i32 = (i + offset) % 8;
    if (band < 4) setLedRGB(i, 20, 210, 245);
    else setLedRGB(i, 255, 130, 15);
  }
}

function p1GravityGradient(angle: f32, pitch: f32): void {
  const tilt: f32 = clamp01(absf(pitch) / 90.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const position: f32 = f32(i) / f32(LED_COUNT - 1);
    const glow: f32 = 0.70 + 0.30 * (1.0 - angularDistance(position, angle));
    setHue(i, 0.56 + tilt * 0.24, 0.88, glow);
  }
}

function p1Kaleidoscope(angle: f32): void {
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    let mirrored: i32 = i % 8;
    if (mirrored > 4) mirrored = 8 - mirrored;
    const local: f32 = f32(mirrored) / 4.0;
    setHue(i, angle * 3.0 + local * 0.28, 1.0, 0.72 + 0.28 * local);
  }
}

function p1BodyHandleComplement(angle: f32): void {
  const handle: u32 = hsv(angle, 0.96, 0.90);
  const body: u32 = hsv(angle + 0.5, 0.92, 1.0);
  for (let i: i32 = 0; i < LED_COUNT; i++) setPacked(i, i < 16 ? handle : body);
}

// --------------------------------------------------------------------------
// Page 3: activity, flip-speed, throw, and combined-axis studies

function p2ActivityFlame(activity: f32): void {
  const energy: f32 = clamp01(activity);
  fillLedsRGB(210 + i32(45.0 * energy), 45 + i32(210.0 * energy), 8 + i32(105.0 * energy));
}

function p2ActivityOcean(activity: f32, now: f32): void {
  const energy: f32 = clamp01(activity);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    const wave: f32 = triangle(f32(i) / 15.0 - now * (0.10 + energy * 1.2));
    setLedRGB(i, 25 + i32(45.0 * energy), 90 + i32(165.0 * wave), 175 + i32(80.0 * energy));
  }
}

function p2ActivityRainbow(activity: f32, angle: f32): void {
  const energy: f32 = clamp01(activity);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    setHue(i, angle + f32(i) / f32(LED_COUNT), 0.90, 0.72 + 0.28 * energy);
  }
}

function p2SpinHeat(speed: f32): void {
  const heat: f32 = clamp01(speed);
  // Keep full value while hue travels from electric blue to hot red. Direct
  // RGB interpolation made the midpoint an unintended muted gray.
  fillHue(0.62 - heat * 0.62, 0.96, 1.0);
}

function p2SpinDirection(direction: f32, speed: f32): void {
  const power: f32 = 0.75 + clamp01(speed) * 0.25;
  if (direction >= 0.0) fillHue(0.49, 1.0, power);
  else fillHue(0.93, 1.0, power);
  const end: i32 = direction >= 0.0 ? LED_COUNT - 1 : 0;
  setLedRGB(end, 255, 255, 255);
}

function p2ActivitySparks(activity: f32, now: f32): void {
  const energy: f32 = clamp01(activity);
  fillLedsRGB(180, 45, 8);
  const sparks: i32 = 1 + i32(energy * 9.0);
  const tick: i32 = i32(now * (4.0 + energy * 28.0));
  for (let i: i32 = 0; i < sparks; i++) {
    const led: i32 = (tick * 13 + i * 7 + i * i * 3) % LED_COUNT;
    setLedRGB(led, 255, 190 + ((i * 19) % 66), 45);
  }
}

function p2ThrowBloom(throwState: i32, angle: f32): void {
  if (throwState == 0) {
    fillLedsRGB(150, 40, 220);
  } else if (throwState == 1) {
    fillLedsRGB(80, 190, 255);
  } else if (throwState == 2) {
    fillLedsRGB(255, 85, 20);
  } else if (throwState == 3) {
    fillLedsRGB(255, 255, 255);
  } else if (throwState == 4) {
    fillLedsRGB(65, 255, 135);
  } else {
    fillLedsRGB(255, 60, 210);
  }
  const head: i32 = i32(angle * f32(LED_COUNT)) % LED_COUNT;
  setLedRGB(head, 255, 255, 255);
}

function p3AxisWeave(activity: f32, angle: f32, rollAngle: f32): void {
  const energy: f32 = clamp01(activity);
  // Two broad, fully lit zones make both axes legible with a shallow call
  // graph. This replaces V3's per-pixel HSV wave, the leading crash suspect.
  const level: f32 = 0.86 + 0.14 * energy;
  const handle: u32 = hsv(rollAngle, 0.96, level);
  const body: u32 = hsv(angle + 0.08 * energy, 0.92, level);
  for (let i: i32 = 0; i < LED_COUNT; i++) {
    setPacked(i, i < 16 ? handle : body);
  }
}

export function init(): void {
  page = 0;
  effect = 0;
  pendingClicks = 0;
  markerActive = 0;
  markerStartedAt = -1.0;
  runtimePrimed = 0;
  demoMode = 1;
  demoIndex = 0;
  demoStartedAt = -1.0;
  ignoreReleaseAfterDemo = 0;
  previousTime = 0.0;
  previousAngle = 0.0;
  wasPressed = 0;
  printInt(4000);
}

// Diagnostic-only entry used by motion_lab_soak.ts. The installed firmware has
// no reliable setParam command, so a separate temporary cartridge calls this
// directly to soak each real renderer without synthesizing physical clicks.
export function diagnosticSelect(nextPage: i32, nextEffect: i32): void {
  demoMode = 0;
  page = nextPage < 0 ? 0 : nextPage >= PAGE_COUNT ? PAGE_COUNT - 1 : nextPage;
  effect = nextEffect < 0 ? 0 : nextEffect >= EFFECTS_PER_PAGE ? EFFECTS_PER_PAGE - 1 : nextEffect;
  pendingClicks = 0;
  signedSpeed = 0.0;
  speedMagnitude = 0.0;
  smoothedActivity = 0.0;
  // Diagnostic soak addresses render the selected production effect for its
  // full interval; counted markers are tested through the real click grammar.
  markerActive = 0;
  markerStartedAt = -1.0;
  printInt(4000 + page * 100 + effect);
}

export function update(): void {
  const now: f32 = getTime();

  // Root initialization loads the startup script before it initializes the
  // Motion and Button components. Touching those components from init() caused
  // two overlapping BNO055 starts and permanent NaN samples on Club 1. The
  // first update runs only after Root has finished initialization.
  if (runtimePrimed == 0) {
    setIMUEnabled(1);
    previousTime = now;
    previousAngle = wrap01(getProjectedAngle());
    wasPressed = getButtonState(0) != 0 ? 1 : 0;
    runtimePrimed = 1;
  }
  if (markerStartedAt < 0.0) markerStartedAt = now;

  updateDemo(now);
  updateButton(now);

  const angle: f32 = wrap01(getProjectedAngle());
  const roll: f32 = getRoll();
  const rollAngle: f32 = wrap01((roll + 180.0) / 360.0);
  const rollTilt: f32 = rollAngle * 180.0 - 90.0;
  const flipDegrees: f32 = angle * 360.0 - 180.0;
  const flipTilt: f32 = angle * 180.0 - 90.0;
  const activity: f32 = clamp01(getActivity());
  const throwState: i32 = getThrowState();
  updateMotion(angle, activity, now);

  clearLeds();
  if (showMarker(now)) return;

  if (page == 0) {
    if (effect == 0) p1OrientationWheel(rollAngle);
    else if (effect == 1) p1OrbitComet(rollAngle);
    else if (effect == 2) p1OpposedComets(rollAngle);
    else if (effect == 3) p1PitchHorizon(rollTilt);
    else if (effect == 4) p1RollBands(roll);
    else if (effect == 5) p1BodyHandleComplement(rollAngle);
    else if (effect == 6) p1GravityGradient(rollAngle, rollTilt);
    else p1Kaleidoscope(rollAngle);
  } else if (page == 1) {
    if (effect == 0) p1OrientationWheel(angle);
    else if (effect == 1) p1OrbitComet(angle);
    else if (effect == 2) p1OpposedComets(angle);
    else if (effect == 3) p1PitchHorizon(flipTilt);
    else if (effect == 4) p1RollBands(flipDegrees);
    else if (effect == 5) p1BodyHandleComplement(angle);
    else if (effect == 6) p1GravityGradient(angle, flipTilt);
    else p1Kaleidoscope(angle);
  } else {
    if (effect == 0) p2ActivityFlame(smoothedActivity);
    else if (effect == 1) p2ActivityOcean(smoothedActivity, now);
    else if (effect == 2) p2ActivityRainbow(smoothedActivity, angle);
    else if (effect == 3) p2SpinHeat(speedMagnitude);
    else if (effect == 4) p2SpinDirection(signedSpeed, speedMagnitude);
    else if (effect == 5) p2ActivitySparks(smoothedActivity, now);
    else if (effect == 6) p2ThrowBloom(throwState, angle);
    else p3AxisWeave(smoothedActivity, angle, rollAngle);
  }
}

export function stop(): void {
  clearLeds();
  setIMUEnabled(0);
}
