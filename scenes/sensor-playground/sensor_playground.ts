// Four-scene autonomous sensor playground for CreatorsClub stable 1.2.0.

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

@external("arduino", "getActivity")
declare function getActivity(): f32;

@external("arduino", "getTime")
declare function getTime(): f32;

@external("arduino", "printInt")
declare function printInt(value: i32): void;

const LED_COUNT: i32 = 32;
const SCENE_COUNT: i32 = 4;

let scene: i32 = 0;
let wasPressed: i32 = 0;
let previousAngle: f32 = 0.0;
let previousTime: f32 = 0.0;
let smoothedSpin: f32 = 0.0;

function clamp01(value: f32): f32 {
  if (value < 0.0) return 0.0;
  if (value > 1.0) return 1.0;
  return value;
}

function wrap01(value: f32): f32 {
  let wrapped = value;
  while (wrapped < 0.0) wrapped += 1.0;
  while (wrapped >= 1.0) wrapped -= 1.0;
  return wrapped;
}

function byte(value: f32): i32 {
  return i32(clamp01(value) * 255.0);
}

function fillHue(hue: f32, value: f32): void {
  const h: f32 = wrap01(hue) * 6.0;
  const sector: i32 = i32(h);
  const fraction: f32 = h - f32(sector);
  const low: f32 = 0.0;
  const falling: f32 = 1.0 - fraction;
  const rising: f32 = fraction;

  if (sector == 0) {
    fillLedsRGB(byte(value), byte(rising * value), byte(low));
  } else if (sector == 1) {
    fillLedsRGB(byte(falling * value), byte(value), byte(low));
  } else if (sector == 2) {
    fillLedsRGB(byte(low), byte(value), byte(rising * value));
  } else if (sector == 3) {
    fillLedsRGB(byte(low), byte(falling * value), byte(value));
  } else if (sector == 4) {
    fillLedsRGB(byte(rising * value), byte(low), byte(value));
  } else {
    fillLedsRGB(byte(value), byte(low), byte(falling * value));
  }
}

// Scene 0: the entire club moves continuously around a color wheel as its
// projected angle changes.
function orientationWheel(angle: f32): void {
  clearLeds();
  fillHue(angle, 1.0);
}

// Scene 1: a bright comet travels along the strip over a dim purple field.
// The full-field base preserves visibility even when the head is elsewhere.
function orbitComet(angle: f32): void {
  clearLeds();
  fillLedsRGB(12, 4, 24);

  const head: i32 = i32(angle * f32(LED_COUNT)) % LED_COUNT;
  const tail1: i32 = (head + LED_COUNT - 1) % LED_COUNT;
  const tail2: i32 = (head + LED_COUNT - 2) % LED_COUNT;
  const tail3: i32 = (head + LED_COUNT - 3) % LED_COUNT;

  setLedRGB(head, 255, 255, 255);
  setLedRGB(tail1, 255, 80, 220);
  setLedRGB(tail2, 130, 20, 180);
  setLedRGB(tail3, 55, 8, 80);
}

// Scene 2: inspired by Fire / Flamebow. The normalized motion-activity signal
// heats a persistent amber field toward bright yellow-white.
function activityFlame(activity: f32): void {
  const energy: f32 = clamp01((activity - 0.0035) / 0.0765);
  const red: i32 = 70 + i32(185.0 * energy);
  const green: i32 = 8 + i32(205.0 * energy);
  const blue: i32 = 2 + i32(58.0 * energy);

  clearLeds();
  fillLedsRGB(red, green, blue);
}

// Scene 3: estimated angular speed changes a full-field color from cool blue
// through violet to hot orange. It uses angle delta rather than raw gyro so it
// works with the installed script ABI.
function spinHeat(spin: f32): void {
  const heat: f32 = clamp01(spin);
  const red: i32 = 20 + i32(235.0 * heat);
  const green: i32 = 30 + i32(105.0 * heat);
  const blue: i32 = 150 - i32(130.0 * heat);

  clearLeds();
  fillLedsRGB(red, green, blue);
  setLedRGB(0, 90 + i32(165.0 * heat), 90 + i32(165.0 * heat), 255);
  setLedRGB(LED_COUNT - 1, 90 + i32(165.0 * heat), 90 + i32(165.0 * heat), 255);
}

function resetMotionEstimator(): void {
  previousAngle = wrap01(getProjectedAngle());
  previousTime = getTime();
  smoothedSpin = 0.0;
}

export function init(): void {
  scene = 0;
  wasPressed = getButtonState(0) != 0 ? 1 : 0;
  setIMUEnabled(1);
  resetMotionEstimator();
  printInt(2000 + scene);
}

export function update(): void {
  const isPressed: i32 = getButtonState(0) != 0 ? 1 : 0;
  if (isPressed != 0 && wasPressed == 0) {
    scene = (scene + 1) % SCENE_COUNT;
    resetMotionEstimator();
    printInt(2000 + scene);
  }
  wasPressed = isPressed;

  const angle: f32 = wrap01(getProjectedAngle());
  const activity: f32 = getActivity();
  const now: f32 = getTime();
  const elapsed: f32 = now - previousTime;

  if (elapsed > 0.001 && elapsed < 0.25) {
    let distance: f32 = angle - previousAngle;
    if (distance < 0.0) distance = -distance;
    if (distance > 0.5) distance = 1.0 - distance;

    // Two turns per second maps to full heat. Smoothing suppresses stationary
    // orientation jitter while keeping the response quick enough for juggling.
    const instantSpin: f32 = clamp01((distance / elapsed) / 2.0);
    smoothedSpin += (instantSpin - smoothedSpin) * 0.20;
  }

  previousAngle = angle;
  previousTime = now;

  if (scene == 0) {
    orientationWheel(angle);
  } else if (scene == 1) {
    orbitComet(angle);
  } else if (scene == 2) {
    activityFlame(activity);
  } else {
    spinHeat(smoothedSpin);
  }
}

export function stop(): void {
  clearLeds();
  setIMUEnabled(0);
}
