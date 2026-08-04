# Brightness model and calibration

Last reviewed: 2026-07-14

## Current observation

**Verified observation:** with BenTo's global Brightness showing `0.883`, Luke
found the visibility-first song's brightest effects acceptable but its dim
floor much too dim. Preserve existing peak values; calibrate only the persistent
whole-club floor.

The earlier proposed floor of `0.08-0.12` is rejected for this setup. It remains
useful only as a recorded failed starting hypothesis.

**Later three-club observation:** the Papa Was Stoned score's section-colored
floor at `0.30-0.38` was better and acceptable as a general visibility floor.
This does not establish one exact minimum for every hue, venue, or movement;
the per-color ladder remains useful for that. It also does not define the
desired scene intensity: Luke found most of that show's colors and scenes too
muted and wants performance material to use more of the clubs' vivid,
high-output range.

## How the two brightness controls combine

**Source-backed behavior from BenTo 2.1.0b6 and Creator firmware 1.2.0:**

1. A pattern's own `brightness` parameter multiplies the pattern color in
   `Source/LightBlock/model/blocks/pattern/PatternBlock.cpp`.
2. BenTo's Props-panel global Brightness is created in
   `Source/Prop/PropManager.cpp` and sent to every listed prop when changed.
3. The prop firmware stores that value as `globalBrightness` and applies it at
   LED output in
   `Firmware/BentoFlow/src/leds/output/RGBLedsManager.cpp`.
4. Firmware clamps incoming global brightness to `0-1`, even though the BenTo
   manager control is declared with a `0-2` range.
5. The firmware brightness command calls `setBrightness(value, true)`, which
   persists the value to preferences/settings.

The practical model is approximately:

```text
visible LED output = composed pattern color × club global brightness
```

Therefore the show does **not** override the `0.883` global setting. Its low
pattern values are being multiplied by `0.883`, which makes them slightly
dimmer still. For example, a saturated pattern channel at `0.10` becomes about
`0.088` before hardware, diffuser, ambient-light, and human-perception effects.

Do not use values above `1.0` on the BenTo global control as additional headroom;
the firmware clamps them to `1.0`.

## Why the test uses fixed pattern steps

The global slider is mathematically useful, but it is a poor control to scrub
repeatedly during calibration because BenTo sends it to every prop and the
firmware persists brightness commands. Leave it fixed at the observed `0.883`
for this test and vary only generated pattern parameters. This also makes the
result reproducible and avoids confounding global and show-level changes.

**Verified project-load behavior:** a portable project that omits the Props
manager controls displays the BenTo default global Brightness `0.500`, even if
the previously open project displayed `0.883`. The calibration project
therefore explicitly stores manager brightness `0.883` while still saving no
prop items or device identities. It also enables ordinary network auto-add so a
powered club can be rediscovered after the portable project loads.

## Prepared calibration project

`shows/brightness-calibration/brightness-calibration.bento` contains one
no-audio, full-strip sequence with five consecutive color rounds:

| Code | Color | Purpose |
| --- | --- | --- |
| `W` | white | high-perceived-brightness reference |
| `A` | amber | warm show sections |
| `C` | cyan | cool show sections |
| `M` | magenta | saturated show sections; test first |
| `V` | violet | likely weakest/darkest show floor; test first |

Each round presents ten five-second steps. Magenta occupies 0:00-0:50 and
violet 0:50-1:40; the remaining colors are optional cross-checks.

| Step | Pattern value | Approx. scalar after global `0.883` |
| ---: | ---: | ---: |
| 1 | 0.10 | 0.088 |
| 2 | 0.14 | 0.124 |
| 3 | 0.18 | 0.159 |
| 4 | 0.22 | 0.194 |
| 5 | 0.26 | 0.230 |
| 6 | 0.30 | 0.265 |
| 7 | 0.35 | 0.309 |
| 8 | 0.40 | 0.353 |
| 9 | 0.45 | 0.397 |
| 10 | 0.50 | 0.442 |

The scalar column is not a photometric measurement. Diffusion and human color
sensitivity mean two hues with the same numeric value can look different.

## Interactive calibration CLI

Use the project controller from the repository root while BenTo has the
calibration `.bento` open and the intended club is detected:

```text
python3 tools/brightness_calibration.py
```

The controller reads the colors, steps, clip times, and global value from the
generated artifact instead of maintaining a second ladder definition. It
assigns the sequence to project-local Club ID 0 by default. Left/right changes
the active color's level, up/down changes color, and Enter or `q` finishes. Each
change is implemented as a verified seek followed by a short play/pause so the
club holds a single known output indefinitely; the user never needs to count
five-second intervals. Exit stops transport and prints compact and expanded
results. Untested colors are printed as `?`, not silently accepted at the
default step. The renderer uses a full table when space permits and a compact
active-color view in short or narrow terminal panes.

The CLI's float OSC support extends the same generic OSC/OSCQuery control plane
as `tools/bento_show_control.py`. It does not save the project, upload playback,
change Global IDs, scrub the persistent global slider, or alter firmware or
Wi-Fi.

## Feedback result

For each tested color, report the lowest step that is comfortably trackable
while holding, swinging, and making an ordinary toss. Do not choose a value
that is merely barely visible.

Start with magenta and violet. A complete minimal result is:

```text
G=.883 M=6 V=7
```

The show generator can then map `M=6` to `0.30` and `V=7` to `0.35`, update only
the section-colored floor, preserve the accepted peaks, regenerate, and present
one-club canaries for confirmation. In the absence of completed per-color
results, the physically accepted `0.30-0.38` Papa range is the current practical
default, not a universal calibrated table.

## Evidence boundary

- The multiplication and persistence behavior are source-backed.
- Global `0.883`, the rejected `0.08-0.12` floor, the later acceptable
  `0.30-0.38` Papa floor, and the Papa show's generally muted scene output are
  Luke's direct observations.
- The candidate values and color ordering are an experimental design, not yet
  accepted performance settings.
