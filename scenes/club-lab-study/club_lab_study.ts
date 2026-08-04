// Club Lab V0: four parameterized motion-to-light studies.

@external("arduino", "fillLedsRGB")
declare function fillLedsRGB(red: i32, green: i32, blue: i32): void;

@external("arduino", "setLedRGB")
declare function setLedRGB(index: i32, red: i32, green: i32, blue: i32): void;

@external("arduino", "clearLeds")
declare function clearLeds(): void;

@external("arduino", "setIMUEnabled")
declare function setIMUEnabled(enabled: i32): void;

@external("arduino", "getButtonState")
declare function getButtonState(buttonIndex: i32): i32;

@external("arduino", "getProjectedAngle")
declare function getProjectedAngle(): f32;

@external("arduino", "getRoll")
declare function getRoll(): f32;

@external("arduino", "getActivity")
declare function getActivity(): f32;

@external("arduino", "getTime")
declare function getTime(): f32;

@external("arduino", "printInt")
declare function printInt(value: i32): void;

const LED_COUNT: i32 = 32;

let pattern: i32 = 0;
let activityFloor: f32 = 0.005976;
let activityCeiling: f32 = 0.552491;
let curve: f32 = 0.65;
let attack: f32 = 0.34;
let release: f32 = 0.12;
let angleOffset: f32 = 0.0;
let direction: f32 = 1.0;
let visibilityFloor: f32 = 0.55;
let peakBrightness: f32 = 1.0;
let palette: i32 = 0;
let spatialSpeed: f32 = 1.0;

let previousAngle: f32 = 0.0;
let previousTime: f32 = 0.0;
let smoothedActivity: f32 = 0.0;
let smoothedSpin: f32 = 0.0;
let wasPressed: i32 = 0;

function clamp01(value: f32): f32 {
  if (value != value || value < 0.0) return 0.0;
  if (value > 1.0) return 1.0;
  return value;
}

function wrap01(value: f32): f32 {
  let result: f32 = value;
  while (result < 0.0) result += 1.0;
  while (result >= 1.0) result -= 1.0;
  return result;
}

function asByte(value: f32): i32 {
  return i32(clamp01(value) * 255.0);
}

function fillHue(hue: f32, brightness: f32): void {
  const h: f32 = wrap01(hue) * 6.0;
  const sector: i32 = i32(h);
  const fraction: f32 = h - f32(sector);
  const low: f32 = 0.0;
  const falling: f32 = (1.0 - fraction) * brightness;
  const rising: f32 = fraction * brightness;
  const high: i32 = asByte(brightness);
  if (sector == 0) fillLedsRGB(high, asByte(rising), 0);
  else if (sector == 1) fillLedsRGB(asByte(falling), high, 0);
  else if (sector == 2) fillLedsRGB(0, high, asByte(rising));
  else if (sector == 3) fillLedsRGB(0, asByte(falling), high);
  else if (sector == 4) fillLedsRGB(asByte(rising), 0, high);
  else fillLedsRGB(high, 0, asByte(falling));
}

function normalizeActivity(raw: f32): f32 {
  const span: f32 = activityCeiling - activityFloor;
  if (span <= 0.0001) return 0.0;
  const value: f32 = clamp01((raw - activityFloor) / span);
  return clamp01(value * (1.0 + curve) - value * value * curve);
}

function updateMotion(angle: f32, rawActivity: f32, now: f32): void {
  const target: f32 = normalizeActivity(rawActivity);
  const gain: f32 = target > smoothedActivity ? attack : release;
  smoothedActivity += (target - smoothedActivity) * clamp01(gain);

  const elapsed: f32 = now - previousTime;
  if (elapsed > 0.001 && elapsed < 0.25) {
    let delta: f32 = angle - previousAngle;
    if (delta < 0.0) delta = -delta;
    if (delta > 0.5) delta = 1.0 - delta;
    const spin: f32 = clamp01((delta / elapsed) / (0.65 * spatialSpeed));
    smoothedSpin += (spin - smoothedSpin) * (spin > smoothedSpin ? attack : release);
  }
  previousAngle = angle;
  previousTime = now;
}

function orientationWheel(angle: f32): void {
  fillHue(angle + f32(palette) * 0.0833, peakBrightness);
}

function orbitComet(angle: f32): void {
  const base: i32 = asByte(visibilityFloor);
  if ((palette & 1) == 0) fillLedsRGB(i32(f32(base) * 0.42), i32(f32(base) * 0.10), base);
  else fillLedsRGB(0, i32(f32(base) * 0.48), i32(f32(base) * 0.62));
  const head: i32 = i32(angle * f32(LED_COUNT)) % LED_COUNT;
  const peak: i32 = asByte(peakBrightness);
  setLedRGB(head, peak, peak, peak);
  setLedRGB((head + 31) % LED_COUNT, peak, i32(f32(peak) * 0.25), i32(f32(peak) * 0.82));
  setLedRGB((head + 30) % LED_COUNT, i32(f32(peak) * 0.55), 0, i32(f32(peak) * 0.70));
}

function activityFlame(activity: f32): void {
  const floor: f32 = visibilityFloor;
  const level: f32 = floor + (peakBrightness - floor) * activity;
  if ((palette & 1) == 0) {
    fillLedsRGB(asByte(level), asByte(0.08 + activity * 0.82), asByte(0.01 + activity * 0.24));
  } else {
    fillLedsRGB(asByte(0.10 + activity * 0.55), asByte(level), asByte(0.34 + activity * 0.66));
  }
}

function spinHeat(spin: f32): void {
  const level: f32 = visibilityFloor + (peakBrightness - visibilityFloor) * spin;
  if ((palette & 1) == 0) {
    fillLedsRGB(asByte(0.10 + spin * 0.90), asByte(0.18 + spin * 0.45), asByte(level * (1.0 - spin * 0.88)));
  } else {
    fillLedsRGB(asByte(level), asByte(0.08 + spin * 0.55), asByte(0.45 + spin * 0.55));
  }
}

export function init(): void {
  setIMUEnabled(1);
  wasPressed = getButtonState(0) != 0 ? 1 : 0;
  previousAngle = wrap01(getProjectedAngle());
  previousTime = getTime();
  smoothedActivity = 0.0;
  smoothedSpin = 0.0;
  printInt(5000 + pattern);
}

export function update(): void {
  const pressed: i32 = getButtonState(0) != 0 ? 1 : 0;
  if (pressed != 0 && wasPressed == 0) {
    pattern = (pattern + 1) % 4;
    printInt(5000 + pattern);
  }
  wasPressed = pressed;
  const angle: f32 = wrap01(getProjectedAngle() * direction + angleOffset);
  const rollAngle: f32 = wrap01((getRoll() + 180.0) / 360.0);
  updateMotion(angle, getActivity(), getTime());
  clearLeds();
  if (pattern == 0) orientationWheel(angle);
  else if (pattern == 1) orbitComet(rollAngle);
  else if (pattern == 2) activityFlame(smoothedActivity);
  else spinHeat(smoothedSpin);
}

export function setParam(index: i32, value: f32): void {
  if (index == 0) {
    pattern = i32(value);
    if (pattern < 0) pattern = 0;
    if (pattern > 3) pattern = 3;
    printInt(5000 + pattern);
  } else if (index == 1) activityFloor = value;
  else if (index == 2) activityCeiling = value;
  else if (index == 3) curve = clamp01(value);
  else if (index == 4) attack = clamp01(value);
  else if (index == 5) release = clamp01(value);
  else if (index == 6) angleOffset = value;
  else if (index == 7) direction = value < 0.0 ? -1.0 : 1.0;
  else if (index == 8) visibilityFloor = clamp01(value);
  else if (index == 9) peakBrightness = clamp01(value);
  else if (index == 10) palette = i32(value);
  else if (index == 11) spatialSpeed = value < 0.1 ? 0.1 : value;
}

export function stop(): void {
  clearLeds();
  setIMUEnabled(0);
}
