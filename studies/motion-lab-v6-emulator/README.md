# Motion Lab V6 browser emulator

Public beta: <https://luk.ec/glow/>

`index.html` embeds and runs the exact final `artifacts/motion-lab-v6.wasm` at a
simulated 50 Hz. Roll, Flip, calibrated Activity, and Throw State are shared
controls in a compact sticky toolbar, so they remain usable while reviewing
patterns lower on the page. Roll and Flip have independent **Auto** buttons: either
axis can animate by itself, both can animate together, and manually changing
one axis stops only that axis's automation.

Throw State is a directly clickable six-button group rather than a dropdown.
The buttons retain the cartridge's exact numeric host values: Held `0`, Flat
`1`, Single `2`, Double+ `3`, Flat-front `4`, and Loftie `5`. The active button is
exposed through `aria-pressed`, so pointer, touch, and assistive-technology
users get the same single-selection contract.

A Page / collection selector has two explicit groups. **Exact on-club
cartridge** shows all eight effects on one P1-P5 page; eight isolated WASM
instances run the exact artifact with one diagnostic address each. **Web Studio
sketches** adds 12 authored theme collections and 78 browser-only effects, six
or seven per page. Those sketches are a cheap creative search space and are not
claimed to fit or run on the club.

Both groups render complete 3D diffusing clubs rather than abstract strips. One
WebGL context, one scene, and one bloom pipeline render the active tiles,
keeping the gallery practical on mobile hardware. Every tile has **Juggle**,
which pauses gallery rendering and opens one shared Three.js fixed-audience
cascade with that tile's current 32-RGB frame applied to all three virtual
clubs. The preview is inserted immediately after the selected tile's current
visual row, so lower-page and mobile selections stay in view rather than sending
the user back to a preview above the gallery. Closing Juggle resumes the gallery
without scrolling back.

P5 Police is implemented in the cartridge itself, not duplicated as a
JavaScript-only gallery. The browser and future on-club installation therefore
share the same eight executable police effects.

Roll is an end-on circular knob control: drag around the face, with `0°` at the
top and signed angles matching `getRoll()`. Flip is a draggable club silhouette:
its body points up at `0°`, right at `90°`, down at `180°`, and left at `270°`,
matching `getProjectedAngle()`. Both are native range inputs under the custom
visuals, so arrow/Home/End keys and accessible values continue to work. Manual
Roll disables only Roll Auto; manual Flip disables only Flip Auto. Activity and
Throw State remain visible in the toolbar. Roll/Flip movement derives Activity
until moving the Activity slider returns it to manual mode. The pose fields stay
side by side at a compact 88-pixel height (84 pixels at the phone breakpoint),
and pattern/Juggle targets reserve scroll space beneath the toolbar.

Regenerate after rebuilding the cartridge:

```sh
npm --prefix tools/web-sim test
npm --prefix tools/web-sim run build
node tools/web-sim/embed_preview.mjs \
  studies/motion-lab-v6-emulator/template.fragment.html \
  private/generated/motion-lab-v6-emulator.fragment.html \
  --wasm artifacts/motion-lab-v6.wasm
VISUALIZE_RENDERER="/path/to/visualize/skills/visualize/scripts/render.py"
python3 "$VISUALIZE_RENDERER" \
  --title "Creator Club Motion Lab" \
  private/generated/motion-lab-v6-emulator.fragment.html \
  studies/motion-lab-v6-emulator/index.html
node tools/web-sim/sanitize_standalone.mjs \
  studies/motion-lab-v6-emulator/index.html
```

Then wrap the generated fragment using the installed visualization renderer or
serve it in the project tooling. The checked-in `index.html` is the current
standalone result.

This visual emulator executes the real WebAssembly and enforces the module,
import, memory, initialization, RGB, index, and 50 Hz host contract. Like the
Node simulator, it cannot reproduce Wasm3's ESP32 native-stack translation,
physical diffusion, the BNO055, radio behavior, or downstream boot brightness.
The 3D renderer now shares the corrected 515 × 82 mm image-derived club
outline, separate dark knob/blunt cap, and bounded HDR bloom with the optical
lab. Its point-source/white-shell diffusion remains a visual approximation,
not a physical reproduction or lumen measurement. This renderer preserves the
existing linear 32-index working convention; it does not silently adopt the
optical lab's provisional paired-source DSL layout. The page isolates eight
WASM instances for simultaneous effect comparison. The selected 3D preview uses
three additional isolated instances and feeds each its own cascade-derived Roll,
Flip, Activity, Throw State, and time, producing three independently evaluated
frames. Web Studio sketches receive the equivalent three state records.

**Move it** toggles Roll Auto and Flip Auto together while preserving both
independent buttons. Roll/Flip displacement drives Activity in motion mode and
the label says so; moving the Activity slider returns to a fixed manual value.
The top controls drive the gallery. During Juggle, each virtual club instead
uses its own cascade pose-derived sensors so its lighting and rendered movement
refer to the same modeled state.

The gallery's optical interpretation is shell-first. Each linear axial frame
entry receives a fixed opposed source direction in club coordinates, broad body
diffusion, tighter handle diffusion, and a weak raw core. Roll therefore moves
the visible source side around the white shell while Flip rotates the complete
club. Broad HDR glow comes from the colored diffuser rather than from exposing
one bright camera-facing dot per logical entry. The opposed pair is a working
rendering hypothesis, not a measured PCB/index map; physical comparison remains
authoritative.

The default presentation is now a dark rehearsal scene. Neutral shell/key/fill
light is deliberately weak so powered pixels supply nearly all visible energy.
Knob and cap use pale semi-translucent molded-plastic materials, although they
may be nearly invisible when no nearby LED light reaches them. This change is
renderer-only; it does not alter the embedded WASM or its logical RGB frames.

The theme catalog lives in `tools/web-sim/src/theme-pages.mjs`; the creative
brief lives in `docs/theme-page-designs.md`. Theme effects accept the same time,
Roll, Flip, Activity, and Throw State values as the exact host and produce the
same 32-RGB frame shape. Automated tests enforce bounded integer channels,
determinism, representative sensor reactions, variable page counts, and a
colored visibility floor. Artistic quality and physical brightness still
require review on the real clubs.
