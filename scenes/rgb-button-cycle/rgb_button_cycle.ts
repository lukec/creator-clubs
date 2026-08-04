// CreatorsClub stable 1.2.0 autonomous RGB button canary.
//
// The installed firmware exposes the legacy `arduino` WASM ABI. Using the
// three-channel call avoids the packed-color/alpha ambiguity of `fillLeds` in
// the transitional layered LED implementation.

@external("arduino", "fillLedsRGB")
declare function fillLedsRGB(red: i32, green: i32, blue: i32): void;

@external("arduino", "clearLeds")
declare function clearLeds(): void;

@external("arduino", "getButtonState")
declare function getButtonState(buttonIndex: i32): i32;

@external("arduino", "printInt")
declare function printInt(value: i32): void;

let colorIndex: i32 = 0;
let wasPressed: i32 = 0;

function paint(): void {
  if (colorIndex == 0) {
    fillLedsRGB(255, 0, 0);
  } else if (colorIndex == 1) {
    fillLedsRGB(0, 255, 0);
  } else {
    fillLedsRGB(0, 0, 255);
  }
}

export function init(): void {
  colorIndex = 0;
  wasPressed = getButtonState(0) != 0 ? 1 : 0;
  printInt(1000 + colorIndex);
  paint();
}

export function update(): void {
  const isPressed: i32 = getButtonState(0) != 0 ? 1 : 0;

  // Advance only on the unpressed -> pressed edge, so holding the button does
  // not race through all three colors.
  if (isPressed != 0 && wasPressed == 0) {
    colorIndex = (colorIndex + 1) % 3;
    printInt(1000 + colorIndex);
  }

  wasPressed = isPressed;
  paint();
}

export function stop(): void {
  clearLeds();
}
