# Club WASM simulator

This is the reusable offline host for Creators Club stable 1.2.0 cartridges.
It runs the final `.wasm` file—not a JavaScript rewrite—at a simulated 50 Hz
and exposes only the verified legacy `arduino` imports used by this project.

It fails on:

- modules above the 16,000-byte firmware cap;
- unsupported imports or missing `init`, `update`, `stop`, and `memory` exports;
- more than 4,096 bytes of exported WebAssembly memory;
- any time/button/IMU/LED hardware call from persisted-script `init()`;
- invalid LED indices or RGB values;
- runtime traps or memory growth during a scenario; and
- pattern-specific assertions supplied by the cartridge test.

Run the generic moving-sensor scenario with:

```sh
node tools/club-wasm-sim/cli.mjs artifacts/motion-lab-v6.wasm 30
```

The simulator deliberately reports its fidelity boundary. Node runs native
browser WebAssembly, not Wasm3 on the ESP32. It cannot reproduce the installed
binary's historical 255-word native-stack guard, the BNO055, optical diffusion,
network scheduling, or the firmware's downstream `0.5` boot brightness. Those
remain clean-boot physical-canary gates. The practical design response is to
keep the final source shallow, avoid unproven packed/HSV host calls, exercise
every final renderer for real time offline, and then perform one complete
USB-observed Demo traversal on Club 1 before any wider install.
