# Orientation Palette

This Bentuino 1.2.0 WASM scene maps the BNO055 `projectedAngle` directly to
HSV hue. It makes the entire club one continuously changing color.

Unlike the stock LED FX, it does not convert the angle to one of 32 LED-buffer
positions. The remaining limits are the club's LED refresh rate, 8-bit color
channels, and the BNO055 orientation estimate.

Build with Node.js/npm available. The build uses the same AssemblyScript version
as BenTo's downloadable compiler bundle through `npx`:

```sh
./scenes/orientation-palette/build.sh
```

The ignored build product is written to
`artifacts/orientation-palette.wasm`. This first compatibility version has no
parameters: it uses full saturation and value and maps one projected-angle turn
to one 8-bit FastLED hue turn.

Upload and launch are deliberately separate operations. Follow the controlled
one-club procedure in `docs/creative-workflow.md` before deploying to a group.
