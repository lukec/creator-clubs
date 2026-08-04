# Club Lab study cartridge

This is Club Lab V0's four-pattern, live-parameterized cartridge:

1. projected-angle color wheel;
2. long-axis-roll comet over a visible full-field base;
3. calibrated activity flame;
4. derived spin heat.

One short physical button click advances and wraps the four patterns. It also
exports `init`, `update`, `stop`, and `setParam`, but factory stable 1.2.0 does
not expose the source tree's `/script/setScriptParam` command. The numbered
contract is retained for a future compatible runtime and tracked in
`studies/manifests/club-lab-study-v0.json`.

Build with `./scenes/club-lab-study/build.sh`. A network upload/debug session
can trip stable 1.2.0's historical stack guard, so live validation requires a
clean stock reboot before loading and judging the uploaded cartridge.
