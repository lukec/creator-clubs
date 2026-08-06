# Creator Club 3D web previews

This package supplies the shared Three.js renderer used by the browser studies.
It is deliberately separate from the effect sources:

```text
effect or WASM host -> 32 RGB values -> shared 3D club renderer
                                     -> three-club cascade poses

BenTo JSON + audio time -> three logical 32-RGB frames
                        -> shared 3D club renderer

optics test frame  -> 32 fixed sources -> single-club lighting lab
                                         direct / diffusion / hybrid
```

The shared club outline now follows Flowtoys' 515 × 82 mm Henrys
Pirouette-derived envelope and an image-derived straight-on profile. It keeps
the late body bulge, dark EVA knob, and blunt, separate silicone cap. This is a
photographic fit rather than CAD. Powered sources use bounded HDR emission and
selective bloom; the unlit PE shell remains white.

The siteswap-3 cascade uses two
front-left/front-right throw planes at approximately 45 degrees, one
end-over-end quaternion rotation per throw, and a down-pointing front-to-rear
hand carry between throws. The fixed audience camera is behind `setView()` so a
future movable view stays out of the motion and effect code.

Passing Lab uses a data-to-motion pipeline. `passing-library.mjs` supplies
authored events, `passing-pattern-compiler.mjs` validates them and completes
their alternating-hand execution period, `passing-playback.mjs` maintains a
strict persistent club ledger across multi-beat flights and declared token
continuations, and
`passing-generic-3d.mjs` samples the compiled object without importing the
catalogue or branching on pattern IDs. `passing-four-count-stage.mjs` is the
reusable Three.js renderer for that sample. Pattern-specific teaching
differences should normally be data; the separate physical two-person sampler
remains a deliberately narrower validated override.

The user-confirmed pass vocabulary is semantic rather than diagrammatic:
`straight` means opposite-hand reception (right-to-left or left-to-right), and
`crossing` means same-hand reception (right-to-right or left-to-left). The
event's literal `target` owns formation topology independently. Every throw also
declares `throwType`, `flightBeats`, `tokenCycleBeats`, `spins`, and
`heightMultiplier`; compiler
validation rejects contradictory catch hands and duplicate
arrival-beat/receiver/hand slots. The ten-club directed triangle therefore
declares its passes as two-beat doubles with 2.5 rotations and twice the generic
single-pass arc rise. Self throws default independently to singles, so a rare
non-single self requires an explicit event override. Those numeric profiles are
animation policy, not measured ballistics.

Flight time and token recurrence are separate data. In standard six-club
half-synchronous facing pairs, a normal throw retains the one-beat nominal
single profile while the same club is reserved for its next throw three beats
later. The compiler validates each explicitly declared continuation only after
it has completed the alternating-hand period; playback then selects that due
token rather than any convenient club in the hand. Patterns without an
independent token-cycle declaration retain the generic compatibility policy and
are labelled as such in Passing Lab instead of being presented as causally
validated siteswaps.

Passing world coordinates use `0° = +z/downstage` and `90° =
+x/audience-right`. Compiler output owns the normalized forward/right actor
frames; the generic sampler and renderer consume those frames rather than
reinterpreting headings. Generic passes must keep their horizontal
release-to-catch grip segment at least `0.30 m` from every performer centreline.

`setFrames()` accepts either one 32-RGB frame, which it clones across all three
clubs, or three explicit frames. The current studies pass one frame. The
renderer owns no animation loop and draws one opaque shell per club; the host
page supplies both time and color frames.

Build and test the reusable bundle:

```sh
npm --prefix tools/web-sim install
npm --prefix tools/web-sim test
npm --prefix tools/web-sim run build
```

Inject the bundle into the editable study fragments:

```sh
node tools/web-sim/embed_preview.mjs \
  studies/police-pattern-lab/template.fragment.html \
  private/generated/police-pattern-lab.fragment.html

node tools/web-sim/embed_preview.mjs \
  studies/motion-lab-v6-emulator/template.fragment.html \
  private/generated/motion-lab-v6-emulator.fragment.html \
  --wasm artifacts/motion-lab-v6.wasm

node tools/web-sim/embed_preview.mjs \
  studies/club-lighting-lab/template.fragment.html \
  private/generated/club-lighting-lab/fragment.html \
  --bundle club-lighting-lab

node tools/web-sim/embed_preview.mjs \
  studies/bento-juggle-player/template.html \
  studies/bento-juggle-player/index.html \
  --bundle bento-juggle-player
```

The final `studies/*/index.html` files are standalone wrappers produced from
those generated fragments with the installed visualization renderer. The
Three.js bundle and full MIT notice are embedded so the 3D preview itself does
not depend on a CDN. Run `node tools/web-sim/sanitize_standalone.mjs FILE...`
after wrapping to remove the visualization shell's optional tooltip/icon CDN
scripts, which these labs do not use. `embed_preview.mjs` inserts bundles with
a literal replacement function so minified `$&` sequences cannot be mistaken
for string-substitution tokens.

The lighting-lab bundle exposes `CreatorClubLightingLab.create({ mount })`.
Its returned controller supports `setFrame()`, `setModel()`, `setParams()`,
`setRoll()`, `setFlip()`, `showSources()`, `setView()`, `render()`, `getState()`, and
`dispose()`. It uses one shell shader and a cutaway-only instanced source view.
The current model has 16 axial stations with fixed positive-Z/negative-Z source
pairs. That mapping follows Luke's physical observation and is deliberately
reported as a working hypothesis, not a measured LED index map.

The same bundle exposes a safe `CreatorClubLightingLab.dsl` API. Glow DSL v0
pins the `paired16-v0` layout and compiles bounded, line-oriented source into
exactly 32 RGB triples. This is a browser pattern language only. It is not yet
a BenTo generator or an AssemblyScript/WASM backend, and the shared three-club
renderer deliberately retains its pre-existing linear 32-index working map.

V1 clones one RGB frame onto all three virtual clubs. It does not yet run three
independent WASM instances or derive each club's Flip, Activity, Throw State,
and axial Roll inputs from its simulated pose. It also does not draw a juggler,
model motion blur/camera exposure/persistence of vision, or claim measured
mechanical LED placement or diffuser response. The point-source shader is an
artistic approximation that must be compared with the physical prop.

The BenTo Juggle Player is the first host to pass three independent frames. Its
DOM-free `bento-timeline.mjs` evaluator models logical Global IDs `0`, `1`, and
`2`, 32 LEDs, clip-local time and fades, the built-in pattern subset used by the
current generated shows, reverse stored layer order, and BenTo's physical
RGB-times-final-alpha output. The visible player uses its audio element as the
only transport clock; selected `.bento` and audio files remain browser-local.
Filters, effects, position remaps, parameter automation/links, nested or looped
clips, and multiple audio clips are reported as compatibility notes. Noise is
a deterministic approximation because BenTo's exact Perlin helper is absent
from the local source snapshot.
