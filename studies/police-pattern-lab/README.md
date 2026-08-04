# Police Pattern Lab

Open `index.html` in a browser to compare eight animated 32-LED police
vocabularies at once. Every candidate maintains a red, blue, or white
whole-strip field so the prop remains trackable in a dark venue.

These eight candidates are now also implemented as Motion Lab V6 P5E1-E8.
The exact cartridge is authoritative for web/on-club parity; this focused page
remains useful for quick police-only comparison and terse picks.

Controls:

- adjust the common animation speed;
- pause all patterns on the same instant;
- select any promising rows; and
- open the selected row in the shared three-club **Juggle** preview; and
- use **Copy picks** to produce a terse response such as
  `Police picks: 1, 3, 6`.

Only one Three.js canvas is created. Selecting another **Juggle** row moves the
same fixed-audience preview beneath that pattern and applies its current 32-RGB
frame to all three virtual clubs.

The display model compensates saturated-color emission before bloom. An
ordinary monitor gives white three active color channels but a saturated hue
only one dominant channel, which previously made white wash out red and blue.
The logical RGB patterns are unchanged; bounded hue-luminance gain affects only
the simulated HDR glow and the size of each compact LED halo. This is a
perceptual fit to physical observation, not a lumen measurement.

The selected 3D renderer also keeps each LED's tight core separate from its
broader diffusion halo. This prevents the moving white band in **White
scanner** from averaging a much larger red/blue area toward white. Handle
scatter is intentionally tighter and weaker than body scatter, and neutral
white HDR emission is modestly restrained without reducing saturated police
colors. The source pattern itself is unchanged; the values are still working
perceptual parameters pending physical calibration.

Red/blue boundaries receive an additional correction that does not involve any
white source: averaging two saturated hues must not make their overlap look
dim, then reveal the white shell underneath. Mixed RGB is peak-normalized as a
hue direction, while a separate bounded coverage response determines how much
the diffusion colors the plastic. **Roadblock 50/50** should therefore show a
saturated violet/magenta transition rather than a white seam.

The gallery is intentionally bounded to 30 FPS. Compact LED rows cache their
small color vocabulary, reuse frame buffers, and update only changed pixels.
Their glow is a zero-blur emission ring rather than hundreds of CSS blur layers;
the selected 3D preview is the only place that pays for HDR bloom. Offscreen
rows skip browser layout/paint and Pause stops visual rendering.

The handle/body divider after LED 16 is only a working project convention for
visual review; it is not a verified mechanical LED map. The 3D view uses an
approximate solid-white shell with round internal point-source cores and broader
body than handle diffusion. It does not reproduce measured club optics,
firmware brightness, motion blur, battery voltage, or persistence of vision.
Accepted candidates should be ported into the RGB-only cartridge and checked in
the final-WASM simulator before one-club physical review.

The editable source is `template.fragment.html`. Rebuild the shared bundle and
inject it before wrapping the fragment as the checked-in standalone page:

```sh
npm --prefix tools/web-sim test
npm --prefix tools/web-sim run build
node tools/web-sim/embed_preview.mjs \
  studies/police-pattern-lab/template.fragment.html \
  private/generated/police-pattern-lab.fragment.html
VISUALIZE_RENDERER="/path/to/visualize/skills/visualize/scripts/render.py"
python3 "$VISUALIZE_RENDERER" \
  --title "Creator Club Police Pattern Lab" \
  private/generated/police-pattern-lab.fragment.html \
  studies/police-pattern-lab/index.html
node tools/web-sim/sanitize_standalone.mjs \
  studies/police-pattern-lab/index.html
```

Current candidates:

1. Full pursuit — whole-club red/blue alternation.
2. Double tap — two red hits followed by two blue hits.
3. Roadblock 50/50 — the accepted half-and-half split.
4. Body alarm — the large body leads while the handle answers.
5. White scanner — a broad white scan over the split.
6. Braided bands — advancing four-LED red/blue blocks.
7. Twin beacons — opposed white heads with colored tails.
8. Three-zone dispatch — rotating red, blue, and white zones.
