# Creators Clubs brightness calibration

This no-audio BenTo project calibrates the show's minimum persistent brightness
while leaving both the accepted peak brightness and the club's global
Brightness setting unchanged. It contains one 250-second sequence with five
50-second color rounds:

- `M` - magenta;
- `V` - violet;
- `A` - amber;
- `C` - cyan; and
- `W` - white.

Each round contains ten full-club, five-second steps. Pattern brightness is the
only changing variable. Magenta runs from 0:00-0:50 and violet from 0:50-1:40;
those are the only rounds needed for the initial test. Amber, cyan, and white
follow as optional cross-checks.

| Code suffix | Pattern brightness | Approx. output at global `0.883` |
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

The last column is the pattern scalar multiplied by the current club-global
scalar. It is not a photometric measurement, and human sensitivity differs by
color.

## Test protocol

The preferred interface is the interactive terminal controller from the
repository root:

```text
python3 tools/brightness_calibration.py
```

It expects this calibration project to be open in BenTo and defaults to the
currently tested project-local Club ID 0. Use left/right to lower or raise the
selected color's step, up/down to switch colors, and Enter or `q` to finish.
Every change seeks to the middle of the corresponding clip, briefly evaluates
it, pauses, and leaves that exact solid output visible. The live table shows the
step, pattern value, approximate effective scalar, and which colors were
tested. Short or narrow terminal panes automatically use a compact view showing
only the active color plus the current result. Exit stops the BenTo transport
and prints a copyable result; unvisited colors are reported as `?`.

The underlying manual protocol is:

1. Use one club in a clear, darkened space.
2. Confirm BenTo's global Brightness is `0.883`; the project carries this
   manager value so the portable-project default of `0.500` cannot invalidate
   the ladder. Leave it unchanged for the entire test.
3. Open `brightness-calibration.bento` and assign **CAL - Floor ladder M V A C
   W** to the club without saving the prop into the portable project.
4. Play the ladder while holding, slowly swinging, and making a normal-height
   toss. Each numbered level lasts five seconds.
5. Record one number per tested color: the lowest level that is comfortably and
   reliably trackable, not merely barely visible.
6. Stop after violet unless another color appears materially different in the
   show. Amber, cyan, and white are optional later rounds.

Compact report format:

```text
G=.883 M=6 V=7
```

This means global `0.883`, magenta floor level `6`, and violet floor level `7`.
The generator maps those numbers back to exact pattern values. The accepted
show peaks remain unchanged.

Do not continuously scrub the global slider for this test. BenTo sends that
control to every detected prop, and Creator firmware persists brightness
commands. If global brightness is intentionally changed, record the value and
restore the agreed performance setting afterward.

## Generate

From the repository root:

```text
python3 shows/brightness-calibration/generate_bento.py
```

The output contains no audio, saved props, network information, or device
identifiers.
