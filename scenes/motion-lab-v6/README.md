# Motion Lab V6 experimental cartridge

V6 is the current **one-club experiment**. The exact artifact below is installed
on Club 2 under the separate saved startup name `motion-lab-v6`; the older
`motion-lab` file remains available. It has passed a stable 328-second runtime
soak but not the complete physical acceptance gate because all four E8 address
lines were absent and manual first-button/visual review is pending.

The cartridge contains five pages of eight effects:

- **P1 Roll** repairs the accepted roll vocabulary with seamless palettes,
  larger moving regions, and separate handle/body cluster widths.
- **P2 Flip** makes upright and inverted poses literal where choreography needs
  them, while retaining broad abstract textures that looked good in slow flips.
- **P3 Energy** strengthens activity contrast, adds the requested flame-tip
  flicker, makes idle direction stable, and tests a simple Hand/Air field.
- **P4 Flight** explores release, catch, frozen launch orientation, airborne
  tracing, and the six firmware throw classifications.
- **P5 Police** carries the same eight time-based police patterns shown in the
  unified browser Motion Lab: pursuit, double tap, roadblock, body alarm, white
  scanner, braided bands, twin beacons, and three-zone dispatch.

`effects.json` is the compact review vocabulary and source for future field
guides. Addresses are `P1E1 = 6000` through `P5E8 = 6407`.

## Stable-1.2.0 design profile

The final source is deliberately shallow and uses only the physically proven
`arduino.fillLedsRGB` and `arduino.setLedRGB` output path. It does not use
packed color, host HSV, arrays, allocation, recursion, or `Math.*`. Unlike V5,
there is no offset-based post-build patch that changes the readable source's
artistic meaning.

The build pins AssemblyScript 0.27.37 at O1/S2. Lower optimization avoids the
aggressive inlining that helped make V5's native ESP32 call frame unsafe. The
build fails above the installed firmware's 16,000-byte script cap and tests the
exact final artifact through `tools/club-wasm-sim`.

Simulator gates cover:

- the exact import/export surface and final module size;
- zero hardware-backed calls from persisted-script `init()`;
- 4,096-byte memory ceiling and no runtime growth;
- 50 Hz execution with all 40 effects held for ten seconds in Demo;
- first-press Demo exit plus single/double/triple/long-hold/page-wrap controls;
- long-axis versus end-over-end input isolation;
- broad spatial response, visibility, calibrated activity contrast, direction
  dead band, Hand/Air response, and six distinct class colors; and
- final `stop()` disabling the IMU.

The simulator cannot reproduce Wasm3's native stack translation or the
installed binary's historical 255-word stack guard. Club 2 clean-booted and ran
328 seconds without a panic, low-stack stop, or reboot, but the serial log
omitted E8 on every page before wrapping. Manual first-button exit and visual
review plus explicit E8 evidence remain required. Do not install on Clubs 0 or
1 until this one-club artifact is accepted.

The current exact final artifact is 6,062 bytes, SHA-256
`de23c41a1e18c43f8172666d6c503cc8df16639cb7b659de106622b4559a5a67`.
The generic 30-second scenario reported zero bytes of linear memory, no
hardware-backed `init()` calls, all 32 LEDs strongly lit in its last running
frame, and repeated Node p95 update times below 0.025 ms. Node timing is a
regression metric, not an ESP32 deadline guarantee.

Build and test with:

```sh
sh scenes/motion-lab-v6/build.sh
node tools/club-wasm-sim/cli.mjs artifacts/motion-lab-v6.wasm 30
```
