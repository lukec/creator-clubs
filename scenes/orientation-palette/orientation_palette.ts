// CreatorsClub 1.2.0 script ABI, compiled with AssemblyScript 0.27.37.

@external("arduino", "getProjectedAngle")
declare function getProjectedAngle(): f32;

@external("arduino", "fillLedsHSV")
declare function fillLedsHSV(hue: i32, saturation: i32, value: i32): void;

@external("arduino", "clearLeds")
declare function clearLeds(): void;

export function init(): void {}

export function update(): void {
  const angle: f32 = getProjectedAngle();
  const hue: i32 = i32(angle * 255.0);
  fillLedsHSV(hue, 255, 255);
}

export function stop(): void {
  clearLeds();
}
