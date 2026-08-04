# Simulation and pattern lab

Last updated: 2026-07-19

## Purpose

Reduce physical-club iteration without pretending a desktop browser is an
ESP32. The project now uses four deliberately different tool classes:

```text
idea gallery           compare many logical 32-LED animations quickly
BenTo Juggle Player    sample a supported song timeline with browser audio
browser WASM emulator  manipulate the exact final cartridge interactively
Node WASM simulator    enforce final-artifact limits and automated scenarios
                              |
                              v
                    clean-boot physical canary
```

The gallery optimizes artistic selection. The BenTo player catches timeline,
compositor, and per-ID authoring mistakes. The two WASM tools optimize embedded
software correctness. None removes the final hardware gate.

## Stable-1.2.0 contract

The reusable host in `tools/club-wasm-sim/` models these source-backed or
physically verified constraints:

- 32 logical RGB LEDs;
- 50 Hz `update()` cadence;
- 16,000-byte script cap;
- 4,096-byte WebAssembly memory ceiling;
- only the verified legacy `arduino` imports;
- exported `init`, `update`, `stop`, and zero-page `memory`;
- no hardware-backed LED, time, button, or motion call from persisted-script
  `init()`;
- physically proven `fillLedsRGB`/`setLedRGB` output rather than packed or host
  HSV calls;
- valid LED indices and integer `0..255` channels;
- calibrated activity, wrap-safe projected angle, raw roll, throw state, and
  button inputs; and
- the project's visibility-coverage invariant, with named artistic exceptions.

The simulator runs the final `.wasm`, not a JavaScript translation. Cartridge
tests can drive exact sensor timelines, inspect every resulting logical pixel,
hold each renderer for real simulated time, test click grammar, and fail on a
trap or memory growth.

## Fidelity boundary

| Behavior | Node simulator | Browser emulator | Physical club |
| --- | --- | --- | --- |
| Final WASM bytes and imports | Exact | Exact embedded bytes | Exact uploaded bytes |
| 16 KB module / 4 KB memory | Enforced | Enforced | Enforced by firmware |
| `init()` hardware ordering | Import-count enforced | Import-count enforced | Real component order |
| 50 Hz timing and sensor values | Deterministic model | Interactive/modelled | Real BNO055 and firmware task |
| 32 logical RGB results | Exact host-call result | Exact host-call result | Physical LEDs/diffusers |
| Wasm3 native stack translation | Not reproduced | Not reproduced | Authoritative |
| Historical 255-word stack guard | Reported boundary | Reported boundary | Authoritative after clean boot |
| Handle/body diffusion and motion blur | Not reproduced | Approximate point-source diffuser; no blur | Authoritative |
| Downstream `0.5` boot brightness | Not reproduced | Not reproduced | Authoritative |
| Network/radio scheduling | Not reproduced | Not reproduced | Authoritative |

The installed binary's stack guard uses the historical minimum native-stack
margin since boot. V6 responds architecturally: shallow RGB-only source,
AssemblyScript O1/S2 rather than O3 inlining, no allocation or deep color helper
graph, no byte-offset semantic patch, full final-artifact traversal, and then a
clean-boot USB-observed one-club canary. Desktop success never authorizes group
deployment by itself.

The first V6 physical canary moved to the actually connected Club 2 on
2026-07-17. It ran 328 seconds without panic, low-stack stop, or reboot and
wrapped, but serial omitted every page's E8 address. That is a concrete example
of the fidelity boundary: final-WASM desktop traversal passed all 32 addresses,
while the physical diagnostic evidence is still only 28/32. Keep the hardware
gate strict until E8 is explicitly observed rather than interpreting a stable
wrap as proof of every renderer.

## Browser-based club-juggling simulation research

Research on 2026-07-17 found two genuine browser club simulators and several
trajectory-only tools.

| Project | Verified behavior | Reuse position | Project verdict |
| --- | --- | --- | --- |
| [JuggleCraft 3D](https://kinetara.github.io/app/) | Current browser 3D simulator with clubs, selectable one/two/three-spin, heli and flat throws, audience/top/FPV views, trails, routines, and choreography | Proprietary terms forbid source extraction, adaptation, reverse engineering, and derivative works without permission | Best immediate visual reference; do not copy or derive code/assets |
| [WebGL Juggler](https://www.brianapps.net/juggle/webgl.html) / [Juggler3D source](https://github.com/perjg/jugglemaster/tree/master/src/jmlib/jugglesaver) | Older JavaScript/WebGL stick-figure simulator with explicit three-, four-, five-, and seven-club patterns, club geometry, spins, hand splines, and audience camera rotation | The served minified JavaScript has no visible license notice. Its linked C++ Juggler3D/JuggleSaver engine has an explicit permissive notice; the wider JMLib directory is Modified BSD | Strongest match for the simulator Luke may remember and strongest MIT-compatible implementation lead; port only from explicitly licensed source with attribution, not from the served minified JavaScript |
| [Passist](https://passist.org/) / [source](https://github.com/helbling/passist) | Current Svelte/Three.js app; its source contains a lathed club mesh, ballistic throw curves, explicit spin counts and axes, quaternion orientation, dwell motion, and a reusable animation widget | GPLv3, while this project is MIT | Strongest technical reference and usable standalone simulator; direct code reuse would require an explicit licensing decision or separate permission |
| [Gunswap](https://github.com/yDgunz/gunswap) | TypeScript/React/Three.js trajectory and hand-path engine; current renderer creates a sphere for every prop and never applies prop orientation | No explicit license found in the repository; last commit inspected was 2021-09-05 | Useful to study conceptually, but neither a club renderer nor a safe copy source |
| [Juggling Lab](https://jugglinglab.org/) | Powerful browser/desktop siteswap, hand-path and graphical editor system | GPLv2; browser version is the Java/Kotlin application running through CheerpJ; documented props are ball/image/ring rather than rotating clubs | Useful for notation and path ideas, not a direct club-light preview |
| [SiteswapSim](https://siteswapsim.com/) | Vanilla-JS 2D siteswap visualizer | Public repository; license not evaluated because it lacks club orientation | Timing/trajectory reference only |

**Source-backed conclusion:** siteswap establishes throw/catch timing but is not
enough to render a club. The light preview also needs a prop pose: position,
orientation (normally a quaternion), spin count/axis, and a hand-dwell path.
Passist's implementation demonstrates this separation explicitly.

**Architecture decision:** do not copy JuggleCraft, do not copy the unlicensed
served WebGL JavaScript, and do not silently import GPLv3 Passist code into this
MIT repository. The lowest-risk implementation is a small Three.js layer for
the three-club cascade (`siteswap 3` initially), either implemented originally
or ported from the explicitly permissive Juggler3D C++ engine while preserving
its notice. It should calculate ballistic position and single-spin orientation,
map the existing 32-logical-LED output onto discrete sources inside an
approximate white shell/diffuser, and render all three clubs from an audience
camera. A later licensing review
can decide whether Passist should instead run as a separate GPL component or
whether its author should be asked about a permissive license for the animation
module.

**Open questions:** the Creator Club's exact LED-to-physical-length geometry is
still provisional; the current diffusion model needs real-prop calibration and
there is no motion blur; generated pose must eventually be tied to a BenTo/music
clock if it is to preview an authored show rather than a free-running cascade.

### Implemented Creator Club 3D cascade preview

Luke chose a 3D first implementation so camera motion can be added without
discarding the renderer. `tools/web-sim/` now contains an original two-plane
siteswap-`3` pose model and a pinned Three.js `0.185.1` renderer. V1 draws only
the three clubs—no juggler, body, or hands—from a fixed audience camera. The
camera is private to the renderer but can already be changed through `setView()`.
The Three.js bundle and full MIT notice are embedded into each generated page;
the project did not copy code or assets from the simulators surveyed above.

The reusable pipeline is:

```text
clock -> three-club cascade -> three poses --------+
                                                    +-> Three.js renderer
selected effect -> one 32-RGB frame ---------------+

planned: three pose-derived sensor states -> three WASM hosts -> three frames
```

The component boundaries are:

1. `sampleCascade(time, clubIndex)` returns position, direction, plane,
   quaternion, airborne/held state, angular speed, and throw phase. The model is
   siteswap `3`: alternating left/right throws, three clubs one beat apart,
   parabolic flight in two front-left/front-right 45-degree vertical planes,
   one full flip, and a front-to-rear hand-dwell path. During dwell the club
   points down and changes heading into its next plane. Hands and the body are
   not drawn.
2. A frame source returns exactly 32 RGB values for a time and sensor state.
   Existing JavaScript gallery effects get a thin adapter around their current
   `render(ledIndex, time)` functions. The exact-WASM emulator gets a separate
   adapter around its host frame.
3. `createCreatorClubPreview()` creates one Three.js scene, perspective camera,
   WebGL renderer, and three capped approximate lathed club meshes. Each opaque
   white shell samples a 32 by 1 RGBA texture (RGB plus peak intensity). Its
   shader presents those values
   as round internal point-source cores with a local halo; body diffusion is
   broader than handle diffusion. Black output remains white shell rather than
   transparent or black plastic. The current 16/16 handle/body boundary,
   dimensions, emitter spacing, and diffusion constants remain provisional.
4. The host page owns the only animation loop. The 3D renderer has no internal
   `requestAnimationFrame`; it receives time and a frame from the police or
   Motion Lab loop. Every police row has a **Juggle** button, but the page moves
   one shared preview beneath the selected row rather than creating eight
   WebGL contexts.

The implemented reactive mode runs three isolated WASM instances, one per
virtual club. The cascade's per-club projected angle, Activity, held/airborne
state, and synthetic axial Roll are given to the lighting evaluator at the same
time used to render the mesh. Web Studio sketches receive equivalent per-club
state. Time-only and centrally scripted effects still naturally produce unison;
sensor-reactive effects may now differ only because the virtual props are at
different points in the cascade.

Axial Roll remains independent of the visible end-over-end flip. The current
model gives clubs stable 0/120/240-degree starting faces and adds up to 38
degrees of handed twist through a flight, applying it to both the render
quaternion and effect input. That is an original exploratory model, not a claim
about measured natural juggling. Activity is likewise a bounded simulator
signal rather than a calibrated BNO055 value.

**Verified V1:** eleven deterministic tests cover one release per beat,
six-beat per-club repeat, full rotation, plus/minus-45-degree plane membership,
down-pointing dwell, render-quaternion agreement, and position/orientation
continuity at catch and the next release. Fresh browser checks found one canvas
per open preview, exact-WASM output, no runtime log errors, and responsive 736-
and 320-pixel layouts. The generated pages are each below 0.7 MB. Visual
inspection showed discrete colored cores and local diffusion over white shell,
diagonal foreshortening/crossing, and a down-pointing hand-path pose. Physical
and optical fidelity remains unverified.

**Next gates:** compare path depth, grip offset, proportions, LED spacing,
diffusion, axial-roll amount, and Activity envelope against slow-motion video or
synchronized IMU capture, then expose audience/orbit controls. The physical prop
remains authoritative for brightness, diffuser mixing, persistence of vision,
sensor classification, and performer/audience readability.

## Single-club lighting lab

`studies/club-lighting-lab/index.html` isolates optical rendering from motion
and firmware. It uses the official 515 by 82 mm envelope, a milky-white molded
shell, and the same pinned/bundled Three.js toolchain as the cascade, but it
draws one stationary club. Creator and Vision use the same outside build, so
Flowtoys' official lit Vision photograph is a valid visual target for the
Creator shell.

The current source geometry is explicitly provisional: Luke observes two
outward-facing emitters on opposite sides, so V0 maps the 32 controlled RGB
entries to 16 fixed opposite pairs along the shaft. Seven stations are assigned
to the handle and nine to the body for this experiment. Axial Roll rotates
those fixed sources with the club; no hotspot is moved artificially toward the
camera.

Three common-input modes bracket the visual problem:

| Mode | Purpose | Expected appearance |
| --- | --- | --- |
| Direct transmission | Lower-scatter diagnostic | Round cores and minimal lateral transport |
| Shell diffusion | Broad-scatter comparison | Smooth handle/body fields with weak cores |
| Reference hybrid | Default candidate | Overlapping handle dots plus continuous body light |

Seven test frames isolate location, adjacent-color mixing, uniform output, and
the official-photo gradient. Shared controls adjust level, handle/body spread,
exposure, Roll, cutaway, and inspection lighting. **Copy settings** produces a
single compact line so a review can report values without describing slider
positions.

The shader is not a resin simulation. Public sources do not provide wall
thickness, haze/transmittance, absorption/scattering coefficients, emitter
depth, or an exact index map. Its Gaussian-like axial/circumferential kernels
and long tail are fit parameters. The next fidelity step is a locked-exposure
one-pair photo set, followed by measured handle/body lookup kernels. Until then,
the physical club is authoritative and the lab is an organized hypothesis
comparison.

### Glow Club Lab revision: shared outline, true pose axes, HDR glow, and DSL

The first lab outline was directionally close but too teardrop-like: its body
tapered too early into a small point and the knob/cap were part of one emissive
shell. The revised shared profile is fit to Flowtoys' front-on Henrys comparison
inside the published 515 by 82 mm envelope. It has a gently widening handle, a
late body bulge, a short rounded final taper, a separate dark EVA knob, and a
broad blunt silicone cap. The approximately 28 cm published balance point is
now a transform origin. These outline points come from image fitting, not CAD.

The pose hierarchy now expresses the two physical motions directly. The inner
group rotates around the club's own long axis for **Roll**. Its parent rotates
the complete prop end over end around the balance point for **Flip**. This fixes
the earlier axial slider's mixed world/local pivot. The same corrected geometry
and balance offset now feed the shared three-club renderer.

Max output is a perceptual camera model. A bounded HDR/bloom pipeline can show
clipped source cores and the aura visible in official photos, but its control is
named **Perceived glow**, not lumens. Flowtoys' 96-LED wording, the public 32
SK9822-package configuration, its `LED_MAX_BRIGHTNESS 60`, and a representative
bare-package datasheet provide useful plausibility bounds only. Installed drive,
diffuser loss, battery, thermal behavior, spectral response, and camera exposure
remain unknown. The reusable three-club preview adopts the same bounded bloom
and corrected shell while preserving its existing linear-32 frame mapping.

Glow DSL v0 makes each of the seven diagnostic presets visible and editable in
the page. It is a bounded parser, not executable code. The explicit
`layout paired16-v0` maps 16 stations on each of two local sides; `both`,
`side-a`, and `side-b` statements paint named/numeric/range/list selectors with
single colors, exact lists, `tile(...)`, `ramp(...)`, or `off`. The source limit
is 8 KiB, malformed input fails with a line error, and the last valid frame
stays visible. The exact presets are Official-photo gradient, One handle pair,
One body pair, Adjacent body pairs, Alternating pairs, All white, and LEDs off.

`paired16-v0` is deliberately provisional. It does not claim the physical PCB
index order and is not a replacement for BenTo or the firmware/WASM linear-32
authoring source. A measured pair map must receive a new layout identifier.
Twenty-seven automated tests now pass, including byte-exact compilation of all
seven presets, the DSL safety/bounds cases, the paired source invariants, and
the original cascade motion suite, plus explicit late-bulge and separate-cap
geometry invariants.

The generation path now treats bundles as literal text: a function replacement
prevents `$&` and related sequences in minified JavaScript from corrupting
placeholder substitution. A post-generation sanitizer removes optional unused
`unpkg` icon/tooltip loads, leaving the generated studies self-contained. This
matters for both local rehearsal and static publication.

The publication design keeps this repository as source and copies standalone
builds into the existing `lukec.github.io` repository. The current beta route
contract is `/glow/` for the exact-WASM Motion Lab and `/glow/police/` for the
focused comparison study; there is deliberately no `/glow/motion/` alias. The
original deployment at commit `b0fb589` temporarily used three routes while the
labs were separate. The optical/DSL page now remains a source study rather than
the public root. No club, BenTo state, firmware, network setting, or saved
device state is changed by static publication.

For Motion Lab work, local generation is not completion. Every accepted change
must be copied to `lukec.github.io/glow/index.html`, committed, pushed, allowed
to reach GitHub Pages status `built`, and verified through a cache-busted
<https://luk.ec/glow/> response. Luke tests that public route, so handoff must
include the verified live URL unless he explicitly asks for a local-only draft.

### Web Studio theme collections

The Page selector now separates the five exact-WASM pages from twelve
browser-only Web Studio collections. The studio contains 78 effects across
Lightning, Fire, Ocean, Toxic, Arcade, Disco, Haunted, Solar, Matsuri, Racing,
Candy, and Fire-and-Ice themes. Pages contain six or seven effects according to
their dramatic idea; unused gallery tiles are hidden and removed from the
shared renderer's active layout.

`tools/web-sim/src/theme-pages.mjs` owns the theme catalog and deterministic
32-RGB evaluator. The evaluator accepts the same time, Roll, Flip, Activity,
and throw-state shape as the WASM host. The output can therefore use the same
3D shell/diffuser gallery and three-club cascade without claiming that the
larger JavaScript implementation fits the club. A visible runtime line labels
every studio page **browser only, not yet on the club**.

Automated coverage renders all 78 effects at multiple times and sensor states,
checks exactly 32 bounded RGB triples, enforces a minimum colored visibility
floor, proves deterministic caller-owned buffers, and checks representative
sensor reactions. These checks establish contract safety, not artistic or
physical acceptance. The design rationale and intended circus surprise for
each effect is in `docs/theme-page-designs.md`.

The selected Juggle preview belongs to the pattern row that invoked it, not to
the page header. On open, the host counts the currently rendered grid columns,
places the full-width preview after the selected visual row, and scrolls only
the nearest edge into view. This preserves context on two-column phones without
creating a second Three.js renderer or duplicating the preview for every tile.

### Shell-first Motion Lab optics

Luke's 2026-07-19 review of P1E2 exposed a useful failure mode. The rendered
club showed a straight camera-facing chain of 32 bright dots, with the white
rider becoming an overexposed trench. That screenshot is verified; Luke's
physical observation is that a real club would not look that way. The exact
P1E2 WASM output remains a violet frame plus a broad moving white/pink rider, so
the screenshot did not by itself prove that the embedded pattern was bad.

The renderer was wrong at two levels. It treated each logical axial RGB entry
as one visible camera-facing bulb, and it gave those raw cores enough energy to
dominate the shell. A physical audience primarily sees light transmitted
through the milky plastic. The broader body should merge neighbouring sources
into a colored volume and a wide rider band; the thinner handle may retain some
source definition. Pattern review should therefore judge the shell-level field,
not reward or reject a motif because a simulated LED rail is visible.

The shared preview now keeps the established linear-32 effect convention but
interprets every controlled axial entry as a fixed opposed source pair for the
optical calculation. This is a working physical hypothesis, not a measured PCB
map and not an implicit switch to Glow DSL's `paired16-v0` index semantics. The
source axis rotates in club coordinates, body core strength is substantially
lower than handle core strength, body axial diffusion is wider, and broad HDR
energy comes from the tinted diffuser rather than point-source coverage.

Browser QA verified that P1E2 now renders a smooth violet shell with a broad
white/pink transition in the body and only limited source definition in the
handle. Manual Roll changes the source-facing optics while preserving the club
outline; manual Flip rotates the complete rendered club. The 48-test web suite
passes and browser logs contain no warnings or errors. This is still a visual
fit. A locked-camera comparison with the physical club remains the optical
acceptance gate.

### First direct three-club camera reference

The rearranged 2026-07-19 OBSBOT frame contains all three powered clubs in one
view. It verifies the region split more strongly than the earlier close crop:
the body is a broad nearly continuous luminous volume, while the narrow handle
shows overlapping round source lobes. The white/translucent knob and cap pick up
nearby color, and the clubs cast strong colored light onto the desk, wall, and
one another. The private capture is ignored and is not part of the public repo.

The Motion Lab's immediate correction uses a dark-rehearsal scene: neutral shell
inspection light is capped at a low level, gallery and cascade LEDs dominate,
and knob/cap materials are pale semi-translucent rather than dark plastic. The
exact WASM remains unchanged. The web suite now passes 49 tests and browser QA
shows the dark gallery and juggling view without warnings or errors.

The next optical pass should fit the camera rather than guess more shader
constants. Lock camera/focus/exposure/white balance; capture unlit, solid
red/green/blue/white brightness steps; isolate handle/body sources; capture
same-color and mixed-color neighbours; and repeat Roadblock/White Scanner at
known Roll angles. Extract axial/circumferential response separately for handle
and body, then encode small lookup textures or bounded kernels in the fast
shader. Add a simple dark receiving surface for colored spill. Validate against
held-out patterns before adding video motion blur or high-frame-rate tracking.

The first follow-up publication changed only `/glow/police/index.html`.
Performance-tuned site commit `a71edb1` reached Pages `built`; the cache-busted
live response returned HTTP 200 and matched the generated source artifact's
SHA-256 exactly. Use <https://luk.ec/glow/police/?v=a71edb1> for immediate mobile
testing while the normal Pages cache expires.

## BenTo Juggle Player

`studies/bento-juggle-player/index.html` evaluates a supported subset of a
BenTo project at an arbitrary time and sends three distinct 32-RGB frames to the
shared cascade renderer for logical IDs `0`, `1`, and `2`. The exact straight
LED rows stay visible below the 3D clubs, so optical diffusion never hides the
underlying logical result.

The data path is:

```text
.bento JSON -> bento-timeline.mjs -> RGBA provider/layer composition
                                    -> physical RGB * final alpha
                                    -> separate output-brightness gain
                                    -> three strip rows + three-club renderer
```

The browser audio element is the master clock when audio is available. Play,
Pause, and Seek use `audio.currentTime`; evaluation itself is stateless, so
seeking back to one time reproduces the same frame. A silent monotonic-clock
fallback supports inspection without audio. The cascade motion has its own
fixed/user-set BPM and is only an illustrative juggling layer—it does not infer
beat, tempo change, or choreography from the audio.

The evaluator currently implements `solidColor`, `rainbow`, `strobe`, `point`,
`range`, `multipoint`, `ledRange`, and `noise`; clip fades; and reverse-order
`Add`, `Alpha`, and `Mask` layer composition. It reproduces the source-backed
BentoProp streamed-output rule by multiplying final RGB by final alpha before
making 8-bit prop frames. Project output brightness remains separate and
defaults to the source-backed `0.5` when no value is saved.

The compatibility report distinguishes exact, approximate, and unsupported
features. Noise is a deterministic approximation because the precise BenTo
Perlin helper was absent from the inspected source snapshot. Prop filters,
block effects, position remap, parameter links/automation, unsupported
providers, explicit core/loop timing, and multiple-audio mixing are not
implemented and produce visible notes. Range and Point also retain their
different source inversion expressions rather than normalizing them. This is
intentionally narrower than a general BenTo engine port.

Local `.bento` and audio selections remain inside the tab through browser
`File` and blob objects. The player does not upload them and ignores serialized
physical prop records, always simulating IDs 0/1/2. The CC-licensed 60-second
demo was regenerated from its deterministic generator after two accidental
physical prop records appeared; its saved-prop array is now empty and guarded
by a fixture test. Copyrighted audio remains local-only and absent from the
study artifact.

The local full-show stress case exposed an authoring-validator flaw. BenTo's
Multipoint source adds `id * numProps` to position before taking phase modulo
`gap`; therefore `numProps=1` does not guarantee unison. Gaps `0.12` and `0.16`
in Gettosinfonía V5 can phase-shift IDs 0/1/2 even though its validator checks
zero ID offset, one prop, and disabled inversion. Rendered equality across IDs,
not parameter inspection alone, is now the required unison test.

**Verified browser and desktop evidence:** Play/Pause/Seek stayed audio-locked;
the CC demo's ID-dependent scene at `45.5s` and local V5 role scene at `81.2s`
rendered; and the complete page had no horizontal overflow at 320 pixels. The
final self-contained page is 601,279 bytes, including its embedded
570,555-byte simulator bundle. All 38 Node tests pass. A recorded full-V5
timeline sampling benchmark was `0.086 ms/frame`, excluding JSON parse, audio,
WebGL, browser scheduling, and hardware output.

This tool verifies the supported evaluator and UI behavior, not physical club
brightness, diffusion, radio delivery, audio-device latency, or complete BenTo
compatibility. A real BenTo comparison and one-club canary remain authoritative
for any show intended for performance.

## Motion Lab V6 emulator

`studies/motion-lab-v6-emulator/index.html` embeds the exact 6,062-byte V6
artifact and runs it at 50 Hz. Roll, Flip, calibrated Activity, Throw State,
and Page controls share a compact sticky toolbar above an eight-tile gallery,
so the same controls remain available while reviewing lower effects. Each tile
owns an isolated instance of the exact cartridge, selected to one effect address on the current
page, so all eight effects respond simultaneously to the shared sensor inputs
without resetting one another's dynamics. Each tile now shows a complete 3D
diffusing club. One WebGL renderer draws all eight clubs in one scene and one
bloom pass; this is not eight canvas/context stacks. **Juggle** pauses gallery
painting and feeds the chosen exact 32-RGB host frame to all three virtual
clubs in the separate shared cascade.

P5 Police implements the former Police Pattern Lab candidates in the cartridge
itself. Web and physical installation now share one executable definition for
Full Pursuit, Double Tap, Roadblock 50/50, Body Alarm, White Scanner, Braided
Bands, Twin Beacons, and Three-Zone Dispatch. The focused Police Pattern Lab may
remain as a design study, but it is no longer the authoritative implementation.

Roll and Flip now use pose-shaped direct manipulation instead of horizontal
sliders. Roll is an end-on circular knob with `0°` at the top and signed
clockwise/counterclockwise angles. Flip is a draggable club silhouette whose
body points up at `0°` and down at `180°`. Native range elements remain beneath
both visuals for keyboard/accessibility behavior. Each pose control has its own
**Auto** button: either or both may run, and manual input disables only the
automation for that axis. Throw State remains explicit. Roll/Flip motion drives
derived Activity until the user moves the Activity slider back to manual mode.
The pose stages are 88 pixels
high (84 pixels at the phone breakpoint) and remain side by side. The four
general controls reflow into two bounded columns on phones. Pattern and Juggle
targets reserve scroll clearance for the sticky toolbar.

The gallery renderer maps the responsive tile rectangles into an orthographic
camera, then applies one shared pose to every club: Flip rotates about the view
axis and Roll rotates around the club's local long axis before that flip. A
1.35 device-pixel-ratio cap and one shared post-processing chain bound the
eight-club cost. Opening Juggle stops gallery render calls rather than running
both HDR scenes concurrently.

This is the fast way to answer questions such as:

- Does P2E2 place its broad tracer at the expected end of the strip?
- Does P3E5 remain purple inside the direction dead band?
- Are six throw classes visually distinct?
- Is an effect spatially broad enough before loading a club?

It cannot answer whether the wide body diffuses two neighboring colors into a
muddy third color or whether a juggled effect reads at distance. P5 has passed
final-WASM simulation but is not installed on hardware; Club 2 was offline and
no USB club was present during this build.

## Pattern galleries

Pattern galleries intentionally do **not** execute firmware. They let Luke and
Yuki compare many ideas simultaneously and return terse selections before the
costlier translation/test/install loop.

`studies/police-pattern-lab/index.html` presents eight synchronized 32-LED
police candidates. A speed control and common pause make temporal and static
comparison easy. Checkboxes produce `Police picks: 1, 3, 6`, which is enough
feedback for the next revision. Every row has a **Juggle** action that moves one
shared 3D preview beneath the selected pattern without creating another WebGL
context. Every current candidate keeps the complete strip red, blue, or white;
no sparse beacon is allowed to erase the prop.

The first optical pass made white disproportionately dominant because its three
display channels crossed the luminance-based bloom threshold while saturated
red and blue often did not. The shared 3D renderer now applies bounded
luminance equalization to HDR emission only; the gallery's compact LED rows use
the same gain for halo size. Logical RGB values remain exact. This makes
**White scanner** a comparison between bright white and bright police colors,
not between an emissive source and two ordinary screen swatches. It is a
perceptual correction from physical observation and still requires visual
acceptance against the real club.

A second physical comparison found a separate spatial problem: **White
scanner** still looked mostly white in Juggle mode, particularly through the
handle. The shared shader had blended tight core and broad halo weights into
one color before emission, letting a small white band desaturate neighbouring
red/blue diffusion. Cores and halos are now normalized/emitted independently;
the handle kernel is narrower/weaker than the body, and neutral-white HDR
emission is scaled to `0.78` without dimming saturated red/blue or changing the
32-RGB source pattern. This remains a perceptual fit pending side-by-side club
review.

Roadblock 50/50 then exposed a third, more fundamental failure: a white-looking
middle existed even with no white source pixels. The renderer had allowed the
lower peak created by averaging red and blue to behave like lower intensity,
then composited too much uncolored white shell at their boundary. Mixed core
and halo RGB directions are now peak-normalized after averaging, while a
separate bounded exponential coverage term controls how strongly diffusion
tints the shell. Thus a red/blue overlap stays saturated violet/magenta instead
of becoming pale. White-source intensity remains unchanged for the next
comparison so the two corrections are not conflated.

The first implementation of that correction generated an integer `4` inside a
GLSL float multiplication. WebGL rejected the complete shell shader, leaving
only the independently rendered caps/knobs. The corrected generator emits a
decimal float literal and browser QA is now mandatory after shader changes.
Further visual review showed that nonlinear sRGB mid-channels were entering HDR
emission; the shared renderer now marks the texture unclassified, decodes sRGB
once in shader, compresses secondary emission channels before tone mapping, and
uses a `12.0` bounded diffusion-tint gain. Roadblock now renders visibly colored
red/blue shells rather than floating caps or a white seam. This still awaits
physical optical comparison.

The compact rows deliberately use a cheaper model than the selected 3D view.
An initial attempt gave all 256 DOM LEDs three blurred shadows and rewrote them
every display frame; it made even the non-juggling gallery visibly slow. Rows
now update at most 30 times per second, mutate reusable RGB frames, cache color
styles, skip unchanged LEDs, and use zero-blur emission rings. Browser
`content-visibility` lets offscreen rows skip layout and paint. Only the selected
shared 3D preview pays for HDR diffusion and bloom, on the same bounded cadence.

The divider after logical LED 16 is a provisional handle/body convention based
on current code and visual review, not a verified mechanical map. Browser
selection is concept approval. Accepted candidates must still be implemented
through the RGB-only cartridge path, tested as final WASM, and viewed on one
club.

## Recommended loop

1. Generate six to twelve variants around one concrete artistic question.
2. Review them simultaneously in a browser and return only selected numbers
   plus short tuning notes.
3. Port selected concepts into shallow RGB-only AssemblyScript.
4. Run exact-WASM semantic, coverage, timing, control, Demo, import, memory, and
   size tests.
5. Manipulate the exact artifact in the browser emulator.
6. Clean-boot Club 1, pass full Demo/stack/serial canary, then review physically.
7. Only accepted output becomes the candidate for Clubs 0 and 2.

This loop makes browser review cheap without letting an attractive mockup become
false firmware confidence.
