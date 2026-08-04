# Motion Lab

This directory documents and rebuilds the V5 cartridge currently accepted on
Club 1. The next uninstalled experiment is
[`../motion-lab-v6/`](../motion-lab-v6/README.md); it replaces V5's transformed
semantics with a shallow, unpatched 32-effect build and exact-WASM tests. Keep
V5 reproducible until V6 passes a clean-boot physical canary.

`motion_lab.ts` is an offline, sensor-reactive scene cartridge for the
32-LED Creators Club. It contains three pages of eight effects:

- **Page 1 — Roll:** eight bright interpretations of long-axis shaft roll:
  rainbow, comet, opposed portals, split, bands, body/handle complements,
  gradient, and kaleidoscope.
- **Page 2 — Flip:** the same eight visual grammars driven by end-over-end
  projected angle, making the difference between the two axes easy to feel.
- **Page 3 — Energy + combinations:** calibrated activity flame/ocean/rainbow,
  derived flip heat and direction, activity sparks, throw bloom, and a
  roll/flip/activity weave.

Controls:

- **Boot Demo:** show all 24 effects for ten seconds each, then wrap.
- **First press in Demo:** exit immediately to Page 1, Effect 1. That press's
  release is suppressed so it cannot also advance to Effect 2.
- **Short click:** advance one effect, wrapping after effect 8. The change is
  delayed about 0.36 seconds so the program can distinguish a click group.
- **Double click:** advance one page, wrapping after page 3, and select effect
  1 on the new page.
- **Triple click:** reset to Page 1, Effect 1 from anywhere.
- **Long hold:** reserved for the firmware's shutdown behavior.

Every selection flashes its full address before the effect begins. Saturated
blue-violet pulses count the page, then white pulses count the effect. P1-E1 is
blue-violet, white; P2-E1 is blue-violet, blue-violet, white. Every normal
effect maintains a raised nonblack whole-club base. V4 doubles the V3 count
timing to `0.18s` on a `0.32s` cycle, with a `0.32s` pause between page and
effect counts.

V4 treats physical coverage as a testable requirement. At a settled frame,
every LED must have at least one authored channel at `120/255` or above and at
least 30 of 32 LEDs must have a channel at `160/255` or above. The comet now
moves a 13-LED region and the paired portals use two nine-LED regions, each over
a bright full-strip base. This prevents tiny foreground motion from leaving
most of the club visually inert or too dark to track.

Build with:

```sh
./scenes/motion-lab/build.sh
```

The result is the ignored local artifact `artifacts/motion-lab.wasm`. It must
remain no larger than the installed stable firmware's 16,000-byte script limit.

Live stable 1.2.0 can store and run this cartridge and exposes a writable
`/script/scriptAtLaunch` setting for boot persistence. Its Bentuino button path
reserves very-long press for shutdown but does not contain the obsolete
BentoFlow offline double-click stop shortcut. V5 keeps `init()` hardware-free
and primes time, button, and motion only on the first normal `update()`; the
simulator explicitly checks that startup contract.

The current production artifact is 3,992 bytes, SHA-256
`3e11d9011d6a3af70145a532e47119a0908eed51cfaef4238d06a6f5e3318b2d`.
The build pins AssemblyScript 0.27.37 O3/S2, verifies the readable source's
baseline hash, then applies a size-preserving stable-1.2.0 stack transform.
That transform is required because the installed firmware stops WASM at a
historical loopTask high-water mark of 255 words, and several deep HSV paths can
otherwise reach the stack canary before the next check.

The transform changes artistic semantics as well as call depth. In the exact
V5 artifact, P1/P2 E6 is no longer a handle/body complement: it is the same
whole-strip cyan/yellow palette as E1. E7 is a whole-strip dark-blue-to-cyan
linear ramp, and E8 is a whole-strip magenta-to-cyan linear ramp. Both ramps
have unequal colors at the roll/flip wrap seam. The readable TypeScript and the
current quick-guide names therefore describe the intended vocabulary, not the
exact E6-E8 V5 appearance. Correct that mismatch in V6 rather than treating it
as accepted artistic behavior.

Page 3 has additional substitutions confirmed by physical review and exact
disassembly. E3's per-pixel hue helper becomes a whole-strip fill, repeated 32
times, so only the final fill remains. E4's intended blue-to-red heat passes
through the shallow cyan/yellow converter. E8's combined roll/flip/activity
branch becomes a flip-angle whole-strip fill and does not use roll or activity.
Near zero speed, E5 also selects direction from sign noise without a dead band.
These V5 slots are runtime-safe but not artistically accepted; V6 must test the
post-transform output semantics, not merely the readable-source functions.

Club 1 saves this exact build as `motion-lab`. It passed a fresh-boot 248-second
physical Demo cycle, reached P3E8, wrapped to P1E1, and produced no low-stack
stop, panic, or reboot. A synthetic firmware button edge then exited Demo to
P1E1 and restored physical polling. Clubs 0 and 2 remain off on accepted V3
while V6 replaces the effects rejected or overwritten during physical review.
Do not install V5 on them; first accept V6 on Club 1, then give each club an
independent install-and-soak gate.

V6 may use more than three pages when the added effects are genuinely distinct
and still pass size, final-artifact semantics, stack, and full-demo soak gates.
The next round is intentionally a solo Club 1 review with Luke. The following
accepted revision—not this exploratory build—is the candidate for Yuki and all
three clubs. P3E3's zero-activity state may be steady or use a gentle pulse or
flicker; its job is to provide a subtle baseline with much stronger motion
contrast. Include a focused throw-classification study, or keep it in a separate
diagnostic cartridge if it threatens the production stack margin.

Do not judge a cartridge immediately after a network upload/debug session.
Factory stable 1.2.0's stack high-water value is historical until reboot, so it
can stop a much smaller previously working cartridge after a deep path. Reboot
cleanly into the saved startup script and use USB serial only as the runtime
acceptance observer. The repeatable command is:

```sh
tools/club-lab soak-effects --club 1 --install
```

The concise one-page park reference is generated with a Python environment
that includes ReportLab:

```sh
python3 tools/generate_motion_lab_quick_guide.py
```

The final PDF is `output/pdf/motion-lab-quick-guide.pdf`. The older printable
test reference and write-on feedback sheets are generated with:

```sh
python3 tools/generate_motion_lab_field_guide.py
```

The longer PDF is `output/pdf/motion-lab-field-guide.pdf` and describes the
earlier 20-effect revision; use the one-page guide for the current build.

For empirical sensor tuning, run:

```sh
tools/club-lab calibrate motion --club 2
```

The default hands-free run speaks REST, ROLL, FLIP, and ACTIVE instructions,
validates live telemetry, writes the private profile, and restarts the saved
cartridge. Use `--step-through` to require Return before every stage.

Stable 1.2.0 currently resets the global strip brightness to `0.5` at reboot
even after `/settings/saveSettings` reports success. Motion Lab raises its own
color floors and spatial coverage, but the installed WASM ABI has no
script-callable global brightness setter. A live adjustment above `0.5` is not
an offline-persistent solution, and an authored `255` channel cannot exceed the
downstream `0.5` multiplier.

`motion_lab_soak.ts`, `build-soak.sh`, and `test-soak.mjs` are diagnostic-only.
They directly select all 24 readable-source renderers for ten seconds without
button input. The current 4,707-byte wrapper, SHA-256
`3278d896d5ea58f55b783f5f6747ce174dd5f618280d009a8752a073225d94d5`,
passes locally, including the hardware-free init contract. Hardware acceptance
uses the production Boot Demo and `soak-effects`; never save the diagnostic
wrapper as the field launch artifact.
