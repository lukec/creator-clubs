# Glow Club Lab

Open `index.html` to compare three browser models of one illuminated Flowtoys
club:

1. **Direct transmission** keeps individual LED sources crisp.
2. **Shell diffusion** spreads each source through the molded plastic.
3. **Reference hybrid** combines visible handle hotspots with the broad,
   continuous body light seen in Flowtoys' official photograph.

The editable source is `template.fragment.html`. The generated `index.html` is
self-contained and does not load its renderer or UI helpers from the network.

The **Pattern preset** menu now loads concise, editable **Glow DSL v0** source.
Edits compile after a short debounce or with Command/Control-Enter. A bad
program reports its line and leaves the last valid frame visible. The language
is deliberately data-only: it supports club-local `both`, `side-a`, and
`side-b` painting, bounded station selectors, exact lists, `tile(...)`, and
multi-stop `ramp(...)`; it never evaluates JavaScript.

Every saved program declares `layout paired16-v0`. That profile is a browser
optics hypothesis and must not be confused with BenTo's or the installed WASM
firmware's linear 32-index authoring conventions. A future measured physical
map gets a new layout name rather than silently changing existing source.

## Evidence and assumptions

**Source-backed:** Creator and Vision clubs use the same LED pixels and outside
build. Flowtoys specifies a polycarbonate internal shaft, a custom translucent
polyethylene-blend body, an EVA knob, and a silicone cap. Henrys manufactures
the molded parts to Flowtoys-specified transmission and weight. Flowtoys says
it tuned both translucency and the amount of material, so the molded handle and
body themselves are the diffuser rather than a confirmed separate film.
Flowtoys gives the club as 515 by 82 mm, describes the shape as Henrys
Pirouette-derived, and places the balance point around 28 cm from the knob. The
renderer now uses an image-derived straight-on outline within that published
envelope: a gently tapered long handle, a late body bulge, a separate dark EVA
knob, and a blunt PE-body end covered by a broad silicone cap. The profile is a
fit to official photographs, not CAD.

Sources:

- [Creator versus Vision construction](https://flowtoys2.freshdesk.com/support/solutions/articles/6000201980-vision-vs-creators-what-s-the-difference-)
- [Official Vision club specifications](https://flowtoys.com/products/vision-club)
- [Custom Henrys parts and light transmission](https://flowtoys2.freshdesk.com/support/solutions/articles/6000201981-vision-clubs-can-i-get-henrys-parts-and-replace-myself-can-i-use-my-own-club-knobs-)
- [Flowtoys development history](https://flowtoys.com/blogs/toy-stories/toy-stories-vision-clubs)
- [Official lit smooth-club reference](https://flowtoys.com/cdn/shop/products/vision-clubs-smooth-body-single-led-glow-juggling-club.jpg?v=1778275800&width=1200)
- [Official smooth/grip outline and Henrys comparison](https://flowtoys2.freshdesk.com/support/solutions/articles/6000201875-vision-clubs-how-do-flowtoys-clubs-compare-to-henrys-and-play-)
- [Official blunt silicone-cap comparison](https://cdn.shopify.com/s/files/1/0566/3535/9401/products/club_cap_silicone_-_compare2.png?v=1710877443)

**Luke's physical observation:** the visible emitters face outward in opposite
pairs. V0 therefore uses 16 axial stations with two fixed opposite-facing RGB
sources at each station. That accounts for the firmware's 32 controlled RGB
entries, but the exact package mapping, source depth, and axial spacing have not
been measured.

**Model, not measurement:** diffusion widths, shell thickness, absorption,
exposure, tone mapping, and the handle/body boundary are adjustable visual
parameters. None is yet a measured optical coefficient. The lab keeps the
unlit shell white, preserves tighter round hotspots in the narrow handle, and
uses wider scatter through the larger body because those distinctions are
visible in the official photograph. Screen-space HDR bloom gives the powered
club clipped cores and a visible aura; **Perceived glow** is deliberately not
labeled as lumens.

The public Creator configuration declares 32 SK9822 RGB packages and a
firmware brightness ceiling of 60/255. Flowtoys markets “96 high-brightness
LEDs,” which is consistent with counting the three dies in each RGB package,
but that counting convention is not stated explicitly. A representative
SK9822 datasheet provides bare-package flux values, not a measured output for
these installed, diffused clubs; it therefore informs the rendering range but
does not calibrate it.

The pose controls use independent transforms: **Roll** rotates around the
club's own long axis, while **Flip** rotates end-over-end around the published
balance point. This replaces the former mixed Euler transform that made Roll
look as though it pivoted around an arbitrary world-space point.

## Build

```sh
npm --prefix tools/web-sim test
npm --prefix tools/web-sim run build
node tools/web-sim/embed_preview.mjs \
  studies/club-lighting-lab/template.fragment.html \
  private/generated/club-lighting-lab/fragment.html \
  --bundle club-lighting-lab
VISUALIZE_RENDERER="/path/to/visualize/skills/visualize/scripts/render.py"
python3 "$VISUALIZE_RENDERER" \
  --title "Glow Club Lab" \
  private/generated/club-lighting-lab/fragment.html \
  studies/club-lighting-lab/index.html
node tools/web-sim/sanitize_standalone.mjs \
  studies/club-lighting-lab/index.html
```

The next calibration step is a locked-exposure photograph of one handle source
and one body source at several roll angles. Those images can replace the
assumed diffusion kernels with fitted handle and body response profiles.

## Published studies

- <https://luk.ec/glow/> — optical model and Glow DSL editor
- <https://luk.ec/glow/motion/> — exact Motion Lab V6 WASM and juggling view
- <https://luk.ec/glow/police/> — eight police-pattern comparisons

The clubs repository remains the editable source. These generated standalone
files are copied to the existing `lukec.github.io` GitHub Pages repository; do
not hand-edit the deployed copies.
