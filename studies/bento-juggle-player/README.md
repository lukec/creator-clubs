# BenTo Juggle Player

This browser study evaluates a BenTo sequence for logical Creator Club IDs
`0`, `1`, and `2`, renders the resulting 32-RGB frames on the shared three-club
cascade, and uses the audio element as the transport clock.

From the repository root:

```sh
npm --prefix tools/web-sim test
npm --prefix tools/web-sim run build
node tools/web-sim/embed_preview.mjs \
  studies/bento-juggle-player/template.html \
  studies/bento-juggle-player/index.html \
  --bundle bento-juggle-player
python3 -m http.server 8877
```

Then open:

```text
http://127.0.0.1:8877/studies/bento-juggle-player/
```

The included smoke test is the sanitized, CC BY 4.0 60-second “Exit the
Premises” project. A local `.bento` and its audio can also be selected together;
both remain inside the browser tab. Purchased/copyrighted audio remains ignored
and must not be copied into a published build.

The evaluator supports the built-in `solidColor`, `rainbow`, `strobe`, `point`,
`range`, `multipoint`, `ledRange`, and `noise` providers, BenTo clip fades, and
`Add`, `Alpha`, and `Mask` layer compositing. It reports unsupported filters,
effects, parameter links, multi-audio timelines, and providers instead of
silently claiming exact compatibility. Noise is a deterministic visual
approximation because the Perlin helper used by BenTo is absent from the local
source snapshot.
