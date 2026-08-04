// Unmistakable rendering canary for the CreatorsClub 1.2.0 script ABI.

@external("arduino", "fillLeds")
declare function fillLeds(color: i32): void;

@external("arduino", "printInt")
declare function printInt(value: i32): void;

let didLogUpdate: bool = false;

export function init(): void {
  printInt(101);
}

export function update(): void {
  if (!didLogUpdate) {
    printInt(202);
    didLogUpdate = true;
  }
  fillLeds(0xff0000);
}

export function stop(): void {
  fillLeds(0);
}
