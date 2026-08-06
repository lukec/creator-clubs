# Architecture and design

Last updated: 2026-08-05

## Goal

Build a reliable creative and performance system around three Creators Clubs,
starting with observable motion-to-light behavior and growing toward
multi-prop, cueable theatre operation.

The system should make the smallest useful slice work before embedded firmware
changes: detect one club, log its sensors, control its LEDs, then add mappings,
multiple clubs, cues, and optional visual tracking.

## Passing Lab: compile pattern data, then execute it

Passing Lab has one visible playback surface: the shared Three.js stage. It is
mounted from the first frame for every playable card; there is no provisional
Canvas 2D diagram and therefore no 2D-to-3D swap when a card is selected.

The generic path is a compiler/executor pipeline rather than a catalogue of
animations:

```text
pattern card in passing-library.mjs
  -> passing-pattern-compiler.mjs validates and completes the hand period
  -> executionPlan plus explicit events
  -> passing-playback.mjs assigns, reserves, and moves persistent club tokens
  -> passing-generic-3d.mjs samples hands, clubs, paths, duration, height, and spin
  -> passing-four-count-stage.mjs renders the sampled state
```

The page passes the selected compiled pattern object into the stage. The
generic model does not import the catalogue, inspect a pattern ID, or contain a
PPS branch. It reads performer positions, throw/catch hands, target, pass/self
kind, semantic path, throw type, flight duration, height multiplier, and spin
count from the compiled data. It also reads an independently declared token
cycle when the pattern owns one. Pattern-specific teaching information should
therefore be represented as data for technique, placement, route, or throw
profile overrides. A dedicated sampler is justified only when a narrower
pattern family has materially stronger physical/anatomical validation.

The playback data and the teaching copy are separate contracts. Every card
must expose `sourceMaterial` with one of three honest origins: an attributed
published-source summary, a Passing Lab-authored study description, or
Luke-specified choreography. Published summaries require a pattern-specific
reference; authored descriptions cannot carry a reference that would make them
look published. The primary viewer leads with that description and source or
origin. Club inventory, BPM derivation, compiler cycles, token recurrence,
throw profiles, and model identity remain available under a closed **Technical
details** disclosure rather than competing with the pattern explanation.
Source descriptions are concise paraphrases with direct links, not copied
source prose.

The compiler requires one explicit action per performer per beat for normal
patterns and rejects unknown performers, hands, targets, actions, throw types,
or duplicate beat slots. A straight pass must arrive in the opposite hand
(right-to-left or its left-to-right mirror); a crossing pass must arrive in the
same hand (right-to-right or left-to-left). The target performer owns formation
topology independently: star chords and other audience-view line crossings do
not imply a crossing hand path.

A notation cycle that is not hand-periodic is followed by its opposite-hand
continuation. This is why the three-symbol PPS notation `P P S` executes as six
throws: `P-right, P-left, S-right, P-left, P-right, S-left`. After completing
that execution period, the compiler indexes each non-hold arrival by wrapped
beat, target performer, and catch hand. Two clubs may not occupy the same
arrival slot. Flight duration and token recurrence are deliberately distinct:
`flightBeats` describes the nominal trajectory while `tokenCycleBeats`
describes when that same token must next leave its target catch hand. Declared
token continuations are checked after hand-period completion, and startup hand
allocation uses the token cycle rather than confusing it with flight time.
Playback reserves every caught token for that future launch and throws the due
token actually present in the declared hand; it cannot quietly borrow from the
other hand. The retained
non-conserving Stage V visual study is explicitly exempt and remains labelled
`visual-study`.

World placement and actor-local orientation have one compiled meaning. Negative
`x` is audience-left, positive `x` is audience-right, and increasing `z` is
downstage toward the audience. Facing angles use `0° = +z`, `90° = +x`, with
positive rotation around `+y`. The compiler converts each declared angle to an
orthonormal forward/right frame and stores it in `executionPlan.orientation`.
It rejects non-finite or duplicate performer placement and any pass where the
target is not in the thrower's front hemisphere or the thrower is not in the
receiver's. The model consumes that frame for hands, paths, gaze, and a yaw that
maps the person mesh's local `-Z` front to the same world forward. Neither the
renderer nor a camera is allowed to reinterpret the angle convention.

An active event is not the same as a newly launched or airborne club. Playback
uses an absolute-playhead, persistent token ledger: it settles launches and
arrivals in chronological order, then retains each in-flight token until its
declared duration completes. A double launched on the preceding beat can remain
airborne while the current beat begins new hand loads. During the first part of
a throw the hand and club are still connected in the upward/inward load; during
the final part they are connected in the catch return. Samples expose both the
active instructions and the actual held/airborne state so UI, accessibility,
and runtime diagnostics remain truthful.

That presentation contract must not erase the difference between two data
contracts:

- `samplePhysicalTwoPerson3D` is the bounded physical foundation for the 12
  structurally qualifying six-club facing-pair cards. Support is derived from
  the declarative contract: synchronized rows, single straight passes/selfs,
  and a valid three-beat token continuation. It owns the six persistent clubs,
  Earth-gravity timing, seam grips, articulated arms, collision checks, and
  participant-eye cameras.
- `sampleGenericPassing3D` is the compiled-pattern executor for the other 36
  cards. It owns exact declared inventory, formation coordinates and facing,
  event targets, semantic pass/self paths, declared throw profiles, articulated
  visual gestures, and performer camera placement. It enforces a conservative
  `0.30 m` horizontal grip-path distance from each performer centreline, but
  does not claim swept-full-club or biomechanical collision validation.

The stage renderer selects between those samplers behind one stable canvas and
resizes reusable person/club rigs to the current card. Accessibility and
runtime datasets state which contract is active, so a uniform 3D appearance
does not turn the generic cards into inferred physical truth.

Passing Lab's static module graph is revisioned as a unit in browser import
URLs. A compiler-plan schema change must update the page, library, playback,
generic executor, physical selector, and generated stage bundle together. This
prevents a returning browser from combining a new executor with a cached old
pattern object that lacks the required execution-plan fields.

Both contracts use one legible pass gesture: ready outside, hand and club travel
upward/inward together, release near the torso midline at `0.14 m` lateral
offset, and catch farther outside at `0.34 m`. The generic event contract keeps
the named `throwType` alongside its resolved flight duration, rotation count,
token-cycle policy, and arc-height multiplier. A normal six-club facing-pair
single is therefore `flightBeats: 1` and `tokenCycleBeats: 3`; changing the
former to three would create a slow three-beat trajectory rather than causal
siteswap-3 ownership. The current directed ten-club triangle data declares
each pass as a two-beat double with 2.5 rotations and twice the single-pass arc
rise. Its newly corrected Compendium source mapping instead describes singles
between the two base jugglers and doubles between either base juggler and the
point. The viewer flags that mismatch; the card is not source-conformant until
its event data is reviewed. The compiler does not infer throw type from club
count or pattern ID. Self
throws independently default to singles; only an explicit per-event override
represents one of the rare non-single selfs. In the detailed model a `0.75 m`
down-axis release balance pivot places the actual seam grip at about `1.01 m`,
near the belly button. These numeric anchors and the generic single/double
profiles are rendering policy, not anthropometric or ballistic measurements.

## Public repository is the durable source of truth

Creator Clubs source is not complete when it exists only in a local checkout or
when only its generated `luk.ec` page has been published. The public repository
stores the reviewable chain together: authored scene/show/lab inputs, generators
and build tools, simulator/runtime implementation, tests, reusable calibration
show outputs, standalone viewer artifacts needed by the static publication
flow, and the documentation that records evidence and design boundaries.

The repository is not a backup target for sensitive or reproducible local
material. Private recovery data, device-specific network identity, credentials,
firmware binaries, copyrighted rehearsal audio, caches/dependencies, and
generated PDF output remain ignored. Personal performance shows, their
generators, and licensed media live together in `clubs-private`; a reusable
sanitized calibration show may remain public. An ad-hoc BenTo snapshot that
retains live device identity may not be tracked in either source tree. This
keeps GitHub useful as both engineering record and reproducible source without
turning it into a device/configuration leak.

This is a solo-project repository. `main` is the single long-lived working
branch, and completed source changes should be committed and pushed there so
the project remains together. Do not leave review branches or compare-only
publication state unless Luke explicitly asks for an isolated branch.

## Music-show palette and instrumentation policy

A measured spectral feature is a control signal, not permission to use the
entire hue wheel. Gettosinfonía V4 demonstrated that a technically responsive
frequency-to-HSV mapping can still look ugly and sectionally incoherent.
Music-show authoring should instead separate three decisions:

```text
published/listening context -> visual world and chapter vocabulary
measured audio feature      -> movement inside that vocabulary
physical prop geometry      -> where and how broadly it appears
```

Each section should own a small authored palette, usually two or three related
anchors plus a neutral pearl/white accent. Pitch or timbre may interpolate
within those anchors but should not select an arbitrary global hue. Reserve
highly semantic colors—such as pure police red/blue/white—for the scene that
needs them so they retain meaning. Repeating instruments or voices should also
receive repeating visual grammar across sections; a recurring bass voice can
become a broad body bloom whose position, size, and color respond to measured
pitch/energy while its palette changes only at an intentional chapter boundary.

Ground aesthetic framing in both sources and the exact audio. Album/artist
reviews can establish terms such as organic/digital collage, dreamlike versus
danceable, low-slung, percussive, hypnotic, or sample-led. They cannot prove the
instrument producing a particular sound in one track. The waveform can verify
frequency, onset, energy, and recurrence but not automatically name that
instrument. Document the former as source-backed context and the latter as
measurement; label terms such as "synth bass" as inference until credited or
otherwise confirmed.

For additive accents, a black provider background is acceptable only when a
separate continuous nonblack motif/floor remains active underneath. Alpha
effects still need their own visible background. This preserves the dark-venue
visibility floor while allowing bass blooms, glints, and impacts to read as
musical additions rather than full-frame replacements.

## Offline rehearsal architecture

The exploratory mode is one compact cartridge on the supported stable firmware,
not 24 separate firmware builds and not a custom firmware fork:

```text
stable 1.2.0 boot
  -> persisted scriptAtLaunch = motion-lab
  -> /scripts/motion-lab.wasm
  -> local IMU + button -> 3 x 8 effects -> 32 LEDs
```

### Direct WASM deployment without BenTo

The stable club firmware, not BenTo, owns the file and runtime endpoints used
for a local cartridge update:

```text
host -> HTTP multipart .wasm -> club /scripts/<name>.wasm
host -> OSC /script/load <name> -> stop old runtime, read, link, init new runtime
host <- WebSocket debug markers -> read/init/run acceptance
host -> scriptAtLaunch + settings save -> optional persistence
host -> clean restart -> field startup state
```

`tools/load_club_script.py` is the verified single-target implementation. It
keeps runtime addresses private and persistence opt-in. This is a filesystem and
WASM-runtime operation, not an ESP32 firmware flash; it needs a reachable club
on the same LAN but does not need USB or BenTo.

Multi-club deployment is host coordination over three independent device
servers, not one broadcast upload. A future coordinator should provide a
transaction-like barrier: read-only preflight of all target labels; parallel
upload and transient load; one successful loader signature per club; then
explicit persistence and clean restart. There is no real distributed atomic
commit across the devices. Until persistence, a restart recovers the previous
saved launch choice; after persistence, failures and rollback are per club.
Never use all three as the first hardware canary for a new artifact: accept one
club first, then deploy that exact hash to the group. Network-heavy debug/load
sessions must end with debug forwarding disabled and a clean restart because
the installed runtime has previously shown stack sensitivity after such work.

### Central-show and autonomous-rehearsal modes are exclusive

BenTo assignment does not disable an already running local WASM script. Stable
1.2.0 can leave both `streamLayer` and `scriptLayer` enabled with Alpha blending;
Motion Lab then replaces streamed show frames according to each club's
independent sensor, button, and demo state. This was physically exposed during
Gettosinfonía V4 as unmatched colors, perceived brightness differences, and a
wrong police color even though all three BenTo assignments and global brightness
values matched.

Define explicit runtime modes:

```text
SHOW       /script/stop trigger, scriptLayer.enabled=false, streamLayer=true
REHEARSAL  central stream stopped, scriptLayer=true, script.enabled=true
```

Mode transitions must be acknowledged by readback on every club before playback
or juggling. `scriptAtLaunch=motion-lab` may remain persisted: transient Show
mode preserves the cartridge, and reboot intentionally returns to autonomous
rehearsal. A future Club Lab command should make these transitions atomic from
the operator's perspective and identify any club that fails acknowledgement.
Do not substitute `/script/enabled=false` for `/script/stop`: the former only
disables component updates, leaves the loaded runtime resident, and was observed
to return true within six seconds. The stop trigger calls `Script::stop()`, runs
the cartridge stop hook, marks the runtime not running, and frees it.

A stock `.bento` file cannot reliably enforce this transition merely by being
opened. It serializes the BenTo project/timeline, but exposes no project-open
hook for arbitrary prop OSC commands. BenTo's experimental Embedded Script
provider is not a safe substitute: entering its clip loads another WASM, exiting
can send `script.stop`, the action occurs only after timeline evaluation, and it
does not itself guarantee `scriptLayer.enabled=false`. Saving live props inside
the project could preserve component values, but would bind a public show to
private device identity/network state and still would not invoke the hard-stop
trigger.

Use an opt-in launcher/preflight instead. Every show should declare one execution
policy outside the stock BenTo semantics:

```text
central     hard-stop WASM, disable script layer, enable stream layer
hybrid      load/verify the named local script and its deliberate blend contract
autonomous  stop BenTo transport/streaming and enable the local cartridge
```

For a central song, the launcher opens the `.bento`, waits for clubs, assigns
the sequence, sends `/script/stop`, disables the script layer, enables streaming,
verifies all expected Global IDs and a common brightness, then leaves transport
stopped for the operator. Any failed acknowledgement prevents Play. Do not make
hard-stop global inside BenTo because future hybrid shows intentionally combine
central timing with sensor-responsive local rendering.

The page structure teaches the measured sensor model directly:

```text
P1 ROLL   -> getRoll() long-axis shaft twist -> 8 visual interpretations
P2 FLIP   -> projectedAngle end-over-end arc -> the same 8 interpretations
P3 ENERGY -> calibrated activity + derived flip speed/direction + throw/combo
```

At boot, Demo mode derives an index from elapsed time and shows each of the 24
addresses for ten seconds. It is a performer preview and a hardware soak in the
same code path. The first press edge exits immediately to P1E1 and suppresses
that edge's later release; normal click grouping starts only after release.

Repeating a common visual grammar on Pages 1 and 2 is intentional. It lets a
performer compare what each physical axis contributes without also learning a
different effect vocabulary. Page 3 then tests signals whose meaning depends
on motion intensity or multiple axes.

A single click must be deferred until the `0.36s` multi-click window expires;
otherwise the first half of a double or triple click would also change the
effect. Page changes reset to effect 1, and a triple click resets to P1-E1, so
the performer always has a known entry point. Every selection first flashes the
page count in blue-violet and then the effect count in white. Very-long-hold
shutdown remains firmware-owned.

### Startup-script initialization boundary

The installed Bentuino component graph initializes children in insertion order.
`RootComponent::initInternal()` adds Script before Buttons and Motion, and
`Component::addComponent()` immediately initializes each child. A persisted
cartridge's exported `init()` therefore runs before button and IMU hardware are
ready. This is both source-backed and verified by Club 1's continuous restart
trace.

Cartridge `init()` must be limited to private WASM state and non-hardware
diagnostics. It must not read firmware time, button state, or motion values, and
must not call `setIMUEnabled`. Hardware baselines and enablement belong in the
first normal `update()` after Root has completed child initialization. Violating
this boundary on the pre-fix V4 cartridge started two BNO055 tasks, producing
I2C invalid-state errors and persistent invalid motion. Simulator acceptance
must count hardware imports and prove that `init()` calls none.

Live stable 1.2.0 exposes a writable `/script/scriptAtLaunch` setting. It also
exposes Bentuino `/buttons` state and multipress fields, while its inspected root
button handler reserves very-long press for shutdown and does not include the
obsolete BentoFlow offline double-click stop shortcut. The cartridge can own
single/double interpretation through raw button state and the stock firmware can
own boot persistence and shutdown. This was first verified on Club 2: a Motion
Lab WASM produced a complete loader signature, `scriptAtLaunch=motion-lab`
survived a stock-firmware restart, and the club returned with the script
component and motion sensor enabled. The 3,997-byte V3 revision was then saved
and clean-restarted on all three clubs. V5 is runtime-accepted and artistically
reviewed on Club 1, but several deployed effects are duplicate, overwritten, or
under-responsive. Clubs 0 and 2 remain on V3 while V6 is developed and accepted
on Club 1; only that accepted V6 artifact should receive their independent
clean-boot all-effect soaks. Physical cold-boot LED output remains a separate
per-club gate because the protocol does not expose rendered pixels.

Sensor mappings must be calibrated against observed working ranges, not only
nominal firmware ranges. Source maps activity against a 40 m/s2 ceiling, so
ordinary juggling occupies a small part of `0..1`; direct use of raw activity
made the first Motion Lab look nearly static. The offline mapping now uses an
empirical floor/ceiling curve and separate attack/release gains. The accepted
workflow captures REST, long-axis ROLL, end-over-end FLIP, and ACTIVE separately
after forcing a fresh IMU task and full telemetry.

The accepted Club 2 capture measured projected-angle spans of `0.001` at rest,
`0.037` during shaft roll, `0.927` during end-over-end flip, and `0.909` during
active motion. **Verified observation:** `projectedAngle` is an effective flip
control but a poor shaft-roll control in this setup; `getRoll()` is the correct
on-club source for the latter. Raw gyro is visible to the calibration client
but not exported through the installed WASM ABI, so the cartridge derives flip
speed and direction from wrap-safe projected-angle differences.

Global brightness is a separate boot-state problem. Club 2 accepts `0.9` live,
and the correct `/settings/saveSettings` trigger reports success, but stable
1.2.0 restores `0.5` after restart. Inspection of the installed WASM ABI found
no script-callable master-brightness setter, so an autonomous cartridge cannot
override that downstream multiplier. Until a stock-compatible persistent path
is found, authored colors should use near/full-scale channels and field startup
must treat global brightness as an explicit check.

For autonomous effects, visibility is now a measurable spatial invariant as
well as an artistic principle. At a steady evaluation frame, every LED must
have at least one authored channel at `120/255` or above and at least 30 of 32
LEDs must have a channel at `160/255` or above. This channel-max test does not
model human luminance or prove venue brightness; it prevents the specific
failure mode where a small bright foreground passes over a mostly dark prop.
Motion that matters should affect a broad handle/body region, not only one to
four pixels. V4's comet therefore moves 13 LEDs and its paired portals each
cover nine LEDs over a nonblack full-strip base.

Counted page/effect feedback is part of the physical interface, not decorative
animation. V4 uses `0.18s` on-time in a `0.32s` pulse cycle, with a `0.32s`
between-group gap. These values are exactly twice V3 and remain subject to
Luke/Yuki physical acceptance.

An early investigation built a source-backed BentoFlow 1.2.4 candidate before
the live component tree was checked. That was the wrong architecture: the live
club exposes Bentuino `/leds/strip1`, `/motion`, `/buttons`, and `/script`, and
its image metadata shows ESP-IDF 5.5.2 rather than the candidate's legacy 3.3.5
base. The candidate is rejected and must not be flashed. This failed path is
retained in the lab log because a valid ESP image and matching WASM symbols are
not evidence of firmware architectural equivalence.

Acceptance still keeps separate physical gates. Club 1 now passes exact saved
boot, all 24 LED renderers, and the first-button handoff. Battery-only restart,
physical shutdown, no-access-point operation, and the same acceptance on Clubs
0 and 2 still need hands-on tests. Compilation, HTTP reachability, or motion
telemetry alone is insufficient.

Stable 1.2.0 adds a runtime acceptance constraint that offline simulation does
not cover. Exact installed-binary disassembly now proves—not merely infers—that
`Script::update()` calls `uxTaskGetStackHighWaterMark(NULL)` and runs WASM only
when the result is greater than 255 words. The value records historical minimum
margin until reboot. A deep effect can therefore trip a guarded stop on the
next update or overflow the stack canary inside the current update. Build
acceptance requires a clean boot, one complete real-time traversal, passive USB
serial, and explicit rejection of both signatures.

Compiler source shape also matters. AssemblyScript may inline a simpler-looking
renderer into a much larger native `update()` frame. V5 therefore uses a pinned
AssemblyScript 0.27.37 O3/S2 baseline and a hash-guarded, size-preserving
compatibility transform. The transform replaces only native-deep HSV/helper
paths and P3E8's inline split with smooth, bright whole-club mappings. It fails
closed if the readable source no longer compiles to the known baseline hash.
The exact 3,992-byte result passed 248 seconds on Club 1, including P3E8 and a
wrap, with no guard stop, panic, or reboot.

Testing now has four complementary layers. A logical browser gallery compares
many artistic candidates without claiming firmware equivalence. The reusable
Node host and interactive browser emulator both execute the exact final WASM,
enforce the stable module/import/memory/startup contract, and expose the 32
logical RGB pixels. Boot Demo then runs every production address for ten
seconds on a cleanly booted physical club. Finally, a firmware-backed synthetic
press can pause physical pin polling briefly, inject one update-visible
press/release edge, verify exit to P1E1, and restore polling without saving it.
Raw boot serial is private because the firmware can print configured Wi-Fi
credentials.

These layers answer different questions and must not be collapsed. A pattern
gallery answers "which motion looks promising?" Exact-WASM desktop execution
answers "does this final artifact obey the contract and produce the intended
logical frames?" Only a clean-boot physical canary answers native-stack,
sensor, diffuser, motion-blur, brightness, and performer-readability questions.

Motion Lab V6 embodies the resulting compiler profile. It uses shallow
RGB-only AssemblyScript 0.27.37 O1/S2, no allocation or recursive/helper-heavy
color graph, and no post-build byte transform. Its five pages and 40 effects
fit in 6,062 bytes and use zero bytes of linear-memory data. Final-artifact
tests traverse the entire 400-second Demo and every control path. This removes
V5's source-versus-transformed-semantics ambiguity, but it does not reproduce
Wasm3 native translation or the installed binary's historical 255-word stack
guard; the physical acceptance gate therefore remains mandatory.

### Three-club motion preview

A browser preview of juggling motion is a fourth visual layer, separate from
the straight 32-pixel pattern gallery and exact-WASM logic emulator. Its job is
to answer whether an effect reads while three clubs cross, flip, blur, and
exchange apparent identity in an audience view.

Research found that siteswap alone does not provide the pose needed for this:
the renderer also needs each club's position, quaternion, spin count/axis, and
hand-dwell motion. JuggleCraft 3D already provides an excellent proprietary
reference. Passist provides a current GPLv3 Three.js implementation, but direct
reuse would add a licensing obligation to this MIT project. The older WebGL
Juggler is probably the historical simulator Luke remembers; its linked
Juggler3D C++ engine carries a permissive notice and the surrounding JMLib
source is Modified BSD. Luke subsequently chose a 3D first implementation so
camera movement can be added without replacing the renderer. The implemented
architecture is an original siteswap-`3` pose model feeding a pinned, locally
bundled Three.js renderer. The revised pose uses two true vertical throw planes
aimed front-left/front-right at approximately 45 degrees: flight goes from the
rear of one hand path to the front of the other, and down-pointing catch dwell
carries the club back while changing into the next plane. Position, plane, and
quaternion are separate data; the renderer applies the quaternion directly.
It uses a fixed audience camera, one capped opaque lathed shell per club, and a
per-club 32 by 1 RGBA texture. One shader interprets the logical values as tight
point-source cores plus handle/body-specific local diffusion, for three shell
draw calls total rather than physical emitter meshes. This is an artistic
internal-source/diffuser interpretation, not a measured optical model. Motion,
frame production, and rendering remain
independent modules; the public camera setter changes view without changing the
cascade or effect contracts. No served WebGL Juggler code, JuggleCraft
asset/code, or GPL Passist code was copied.

The focused Police gallery keeps inexpensive straight rows and one selected
**Juggle** renderer. The consolidated Motion Lab now gives every effect a full
3D club without creating eight WebGL contexts: one gallery renderer owns eight
shell instances, eight 32-RGB textures, one orthographic camera, and one shared
bloom pipeline. The responsive DOM tiles supply club centres to that scene.
The page reuses each exact current WASM frame rather than calling `update()` a
second time for rendering.

The consolidated Motion Lab runs eight isolated instances of one exact
cartridge artifact, one instance per effect address on the selected page. Shared
sensor controls feed all instances, while each instance retains its own derived
dynamics and 32-RGB frame. This is the correct simultaneous-comparison model:
repeatedly changing one stateful instance's diagnostic address would reset
dynamics and could not produce eight coherent frames. The page normally paints
the one-context eight-club gallery. Selecting **Juggle** leaves that canvas and
its frames intact but stops calling its renderer. A separately lazy-created
three-club renderer receives three frames from three additional isolated WASM
hosts. The same cascade sample supplies each host and mesh with per-club
projected angle, synthetic axial Roll, Activity, held/airborne Throw State, and
time. Web Studio sketches evaluate the same three sensor records without WASM.
Closing Juggle reverses the renderer choice. Pattern definitions that must also
run on-club, including the P5 Police vocabulary, belong in cartridge source; a
JavaScript-only copy is not an authoritative second implementation.

The explicit axial twist is deliberately modest and synthetic: stable per-club
starting faces plus a handed flight excursion. It exists so Roll-reactive
effects can be studied and so the visible optical source face matches the input
given to the effect. It must not be called a measured property of a natural
cascade. Likewise, simulator Activity is derived from modeled motion rather
than BNO055 samples. Physical video/IMU capture remains the calibration gate.

The preview is an artistic approximation, not a physics or firmware oracle.
Luke's performer observations now define the direction of travel and
down-pointing hand phase, but exact hand depth, grip position, club dimensions,
LED spacing, diffuser response, exposure/motion blur, and camera view remain
assumptions until measured or compared against real video. The white-shell
point-source shader is an optical model, not proof of the physical internal
construction, and it cannot replace physical review.

### Optical model and calibration lab

The shared juggling renderer should not hide optical assumptions inside one
camera-relative glow shader. `studies/club-lighting-lab/` is now the separate
calibration surface for those assumptions. One club, one camera, one 32-entry
frame, and one source layout feed three interchangeable transport models:

```text
fixed paired emitters + shell geometry + RGB frame
                   |
       +-----------+------------+
       |            |            |
     direct      diffusion     hybrid
   tight cores   broad shell   handle cores + body field
```

This separation lets the project compare optical approaches without coupling
them to juggling kinematics, firmware execution, or effect authoring. The same
controls and input frames must remain common across models; otherwise a brighter
input could be mistaken for a better diffusion model.

**Physical/source-backed model:** Flowtoys specifies a custom translucent
polyethylene-blend club body around a polycarbonate shaft and says both
translucency and material amount were tuned with Henrys. Creator and Vision
clubs share the outside build and LED pixels. The shell is therefore modeled as
the diffuser and stays milky white when unlit. The EVA knob and silicone cap
should remain visually distinct rather than becoming uniformly emissive.

**Working source model:** Luke's physical observation of two opposite-facing
emitters is represented as 16 axial stations with fixed local positive-Z and
negative-Z sources. Fixed local orientation is an architectural requirement:
axial Roll changes which source face is visible. A camera-facing artificial
meridian, as used by the earlier quick shader, makes the light follow the viewer
and cannot calibrate circumferential diffusion. The station count/mapping,
handle boundary, source depth, and spacing are still provisional.

The production candidate is the hybrid analytic surface kernel: it is one
opaque/depth-writing shell draw, evaluates axial plus circumferential distance,
preserves tight handle cores, and broadens body peaks while retaining a longer
scatter tail. Optical-region parameters follow the receiving shell with a
smooth shoulder blend rather than the source index. It is cheap enough for
three crossing clubs and keeps source
directions object-relative. Direct transmission is a diagnostic lower bound;
broad diffusion is the smooth upper comparison. An explicit transparent inner-
emitter/shell stack is useful only as a cutaway because transparent sorting
becomes fragile when several clubs overlap.

The strongest eventual model is measured rather than more complicated. Locked-
camera one-pair photographs can produce separate handle/body response kernels
over axial distance and Roll angle. Those lookup tables can replace the assumed
Gaussian widths while retaining the same renderer contract. Keep two named
fits: a close-up physical response and an audience-perceptual response that may
deliberately add camera bloom or motion persistence. Neither should be called
calibrated until it matches physical images under documented exposure.

#### Shared physical outline, pose, and perceived brightness

All browser club renderers should use one shared geometry module. Its current
envelope is the published 515 by 82 mm, with the approximately 28 cm balance
point measured from the knob. The lathed profile is an image-derived fit to the
official Henrys Pirouette comparison: the handle widens gently, the body reaches
its broadest region late, and the final taper terminates in a broad blunt cap.
The EVA knob, translucent PE-blend shell, and silicone cap are separate meshes.
This is a stronger visual model than one capped teardrop, but it remains a fit
to photographs rather than CAD or a measured cross-section.

Pose also has one shared semantic contract:

```text
balance-point group -> end-over-end Flip
  axial child       -> local long-axis Roll
    shell + knob + cap + fixed local light sources
```

The order matters. Roll must change which source face is toward the viewer
without moving the club's center or turning it end over end. Flip must rotate
the entire prop around the published balance point. A fixed presentation tilt
can be an initial Flip value, not an unrelated parent rotation that makes Roll
appear to orbit a world-space point.

Interactive sensor emulators should expose those same physical semantics in
their controls. Roll is best manipulated as an end-on radial dial around the
club's long axis. Flip is best manipulated by rotating a visible club silhouette
whose body makes up/down explicit. Both can retain native range inputs beneath
the direct manipulation so pointer/touch geometry does not sacrifice keyboard
or assistive-technology behavior. Manual input must suspend automatic motion;
otherwise the simulator appears to ignore the performer.

Brightness controls must describe the renderer, not invent photometry. The
public Creator configuration declares 32 SK9822 RGB packages and
`LED_MAX_BRIGHTNESS 60`, while Flowtoys markets 96 high-brightness LEDs.
Thirty-two RGB packages times three emitting dies is a reasonable explanation
of 96, but remains inference unless Flowtoys confirms its counting convention.
A representative SK9822 datasheet can bound bare-package current, viewing angle,
and flux, yet it cannot supply a club lumen value through an unknown installed
lot, drive curve, shell, diffuser, color correction, battery, and thermal state.

The renderer therefore uses **Perceived glow**: HDR source radiance plus
selective, bounded screen-space bloom. It can model clipped camera cores and an
aura at the high end while keeping the unpowered shell white. It must never
label that value lumens or calibrated brightness. The locked-exposure physical
photo series remains the calibration gate.

Perceived glow must also compensate for the display's color-channel handicap.
Giving white, red, and blue the same peak RGB value does not give them the same
screen luminance: white energizes three subpixels, while a saturated hue relies
mostly on one. A luminance-thresholded bloom pass then compounds the error by
blooming white but not saturated colors. The shared preview therefore
normalizes only HDR emissive energy by the linear hue's Rec. 709 luminance,
with a finite gain limit and floor. Source RGB, spatial pattern, and dark-shell
appearance remain unchanged. This is an audience-perceptual rendering rule
supported by physical comparison, not a claim that the real LEDs have equal
radiometric output at every hue.

Color diffusion and source intensity must remain separate calculations. Do not
average a tight LED core and a broad shell halo into one color before emission:
in mixed patterns such as a moving white scanner over red/blue, that makes a
small white source bleach a much larger colored area. Accumulate and normalize
core and halo colors independently, then composite their contributions. The
thinner handle also needs a tighter/weaker scatter kernel than the body. A
bounded neutral-white emission restraint is acceptable as a display-perceptual
fit, provided saturated-color gain and the logical RGB frame remain unchanged.
These are working optical parameters, not material coefficients; locked-camera
physical images remain the calibration gate.

Likewise, do not treat the amplitude of an averaged RGB vector as diffusion
intensity. Averaging neighbouring saturated red and blue lowers the peak channel
even though both sources are bright; compositing that pale average over a white
shell creates a false white seam. Preserve intensity in an explicit bounded
coverage term and renormalize the mixed RGB vector only as a hue/chroma
direction. The shell-tint response may be nonlinear because translucent plastic
becomes visibly colored before a local source reaches its maximum, but the
chosen response remains a perceptual fit until measured.

The diffusing shell, not the logical pixel rail, is the primary rendered light
source. A shader must not expose one camera-facing dot per logical RGB entry as
if the club were an uncovered LED strip. In the broad body, adjacent sources
should normally merge into a continuous colored volume; a moving white or
contrasting region should read as a wide transition in that volume. Limited
hotspot detail is more plausible in the thinner handle. Drive the broad HDR
halo from the already-tinted diffuser coverage, and keep raw source cores weak
enough that luminosity does not require a visible bead chain.

Until a physical index map is measured, preserve effect semantics separately
from optical interpretation. The Motion Lab continues to feed its established
linear 32-entry axial frame to the shader. For optics only, each entry is given
a fixed opposed source direction in club coordinates. That makes Roll change
which source face is visible without relabeling effect indices. This is a
working physical hypothesis and must not be confused with the optical lab's
explicit `paired16-v0` DSL layout.

Custom shaders must receive type-correct generated literals and browser/WebGL
compilation is an acceptance gate. JavaScript unit tests can validate the
parameter function yet never compile GLSL; a generated integer literal in a
float expression can therefore remove the entire shell while leaving unrelated
trim meshes visible. Author-facing LED bytes also need one explicit color-space
boundary. The current shader stores the texture as `NoColorSpace`, decodes sRGB
exactly once, and performs HDR/chroma operations in linear space. Tone-map
whitening is controlled separately by compressing secondary emission channels,
not by changing the logical RGB frame.

Pattern galleries must bound optical cost explicitly. The focused Police study
uses cached zero-blur DOM emission rings and reserves HDR shell diffusion for
its one selected cascade. The Motion Lab's purpose now requires a full 3D club
for each of its eight exact effects, so it uses eight shader shells but shares
one scene, one WebGL context, one camera, one bloom pipeline, geometry, trim
materials, and the page animation clock. Gallery pixel ratio is capped at 1.35,
rendering remains cadence-limited, and gallery painting stops while Juggle is
open. Never implement this layout as eight renderers or eight bloom pipelines.

Motion Lab now has two intentionally separate execution tiers behind that one
32-RGB frame and renderer contract:

```text
P1-P5 exact WASM cartridge -> eight isolated instances -> 32-RGB frames
Web Studio theme sketch    -> bounded JS renderer      -> 32-RGB frames
                                                       -> shared 3D gallery
                                                       -> selected Juggle view
```

The exact tier is evidence about the current 6,062-byte candidate cartridge and
must keep enforcing import, memory, initialization, index, and update-rate
contracts. The studio tier is a creative search space. It may use more code,
deterministic time, and the same simulated sensor values, but it must be labelled
browser-only and never described as installed or WASM-compatible merely because
it looks good in the same renderer.

This split lets theme pages contain the number of dramatic ideas the theme
deserves rather than filling an eight-effect matrix. Browser frames still obey
hardware-shaped safety rules: 32 bounded RGB entries, a colored whole-prop
visibility floor, broad body masses, and finer handle detail. The promotion gate
is browser shortlist -> physical optical review -> constrained rewrite ->
one-club canary -> multi-club install.

The single-club lab and reusable three-club preview share this geometry and
bloom vocabulary. They do not yet share an index layout. The cascade preserves
its existing linear-32 working mapping so current Motion Lab and gallery frames
do not change meaning during an optical refactor.

The 2026-07-19 three-club camera reference adds four verified visual targets:

- broad body light hides discrete source positions;
- handle light preserves overlapping circular lobes;
- white/translucent knob and cap receive neighbouring color; and
- bright clubs illuminate nearby surfaces and each other.

Do not respond by turning the mobile gallery into a path tracer. Build an
empirical camera-fit model with a small reproducible capture set:

```text
known transient RGB frame -> physical club -> locked OBSBOT capture
                                            -> axial/chroma response extraction
same logical RGB frame --------------------> simulated club
                                            -> image/profile comparison
```

Use one club at a time for isolated kernels and all three only for consistency
and cross-light tests. Capture unlit shell, solid R/G/B/W at several levels,
single handle/body sources, adjacent equal/mixed pairs, Roadblock, White Scanner,
and Roll at fixed angles. Fit separate handle/body axial and circumferential
lookup responses, a bounded hue/luminance curve, trim pickup, and a cheap dark
surface-spill term. Preserve the current shader/performance contract by storing
fits in small lookup textures or a few bounded kernels. Hold out at least two
patterns from fitting and compare them side by side before accepting the model.

Static optics comes before motion. After the held-club model is credible, test
the camera's 1080p/100-fps and 720p/150-fps modes for actual delivered frames,
rolling bands, exposure, and drops; then add camera shutter/motion-blur response.
Keep captures under ignored private paths and never make camera availability a
dependency for autonomous on-club effects.

#### Glow DSL and static publication boundary

Glow DSL v0 is a safe browser authoring format for the optical lab, not embedded
club code. It deliberately describes one bounded RGB frame and never executes
JavaScript:

```text
glow 1
layout paired16-v0
pattern Police split
level 1
clear
side-a all = #ff143c
side-b all = #145cff
```

`paired16-v0` names the exact hypothesis rather than hiding it: 16 one-based
axial stations, side A in offsets 0-15 and side B in offsets 16-31. Paint can
target `both`, `side-a`, or `side-b`; use named, numeric, range, or exact-list
selectors; and supply a single color, exact color list, `tile(...)`,
`ramp(...)`, or `off`. Source, line, and operation limits are part of the
language contract, including the 8 KiB source ceiling. Parsing must fail closed
with line-aware errors and retain the last valid frame. `eval`, `Function`, and
dynamic module execution are out of scope.

This provisional paired layout must not be presented as the physical PCB map,
BenTo geometry, or the stable firmware/WASM linear-32 source convention. A
future measured map receives a new layout identifier; existing source never
changes meaning silently. Temporal composition, sensors, music, and compilation
to BenTo or WASM remain future translators above this static frame language,
not hidden side effects inside v0.

Publication keeps editable and generated responsibilities separate:

```text
creator-clubs source/build
  -> standalone static artifacts
  -> existing lukec.github.io repository
       /glow/         exact-WASM Motion Lab (canonical beta entry)
       /glow/police/  pattern comparison gallery
```

The single-club optical/Glow DSL lab remains an engineering study in this
repository rather than a separate public route. The beta has no legacy-link
contract, so do not duplicate Motion Lab at `/glow/motion/`.

The published files contain bundled renderer/effect code and no required
runtime dependency on `unpkg`; optional wrapper libraries are stripped after
generation. Bundle insertion must use a replacement function so minified `$&`
or `$'` sequences remain literal rather than invoking JavaScript
replacement-string syntax. The clubs repository remains authoritative; the
site repository contains deployable outputs. Exact GitHub Pages URL checks are
required after each publish before the links are described as live.

The first deployment followed that gate: site commit `b0fb589` reached Pages
status `built`; `/glow/`, `/glow/motion/`, and `/glow/police/` each returned
HTTP 200 with the expected title; and the root WebGL/DSL page loaded without a
console error or required runtime CDN request. The existing `CNAME` and Pages
settings were left unchanged.

## Public engineering source and private performance bundles

Two repository boundaries now serve different artifacts:

```text
public creator-clubs repository
  -> shareable tooling, generators, architecture, labs, and sanitized records

private clubs-private repository
  -> exact personal audio + canonical .bento + rebuild/support files
  -> portable Git LFS clone for the working Macs
```

The private repository is authoritative for a complete personal-performance
snapshot that can be opened on another Mac without reconstructing ignored
media. This public repository remains authoritative for general engineering,
architecture, safety, and publishable show development. Show-specific source
is duplicated only to keep the private bundle self-contained; changes must be
promoted deliberately and reviewed rather than silently synchronized in either
direction.

Every private bundle must preserve relative media paths, keep BenTo's saved
prop-item list empty, and exclude autosaves, scratch copies, machine paths,
device identifiers, and network addresses. Audio belongs in Git LFS. A fresh
clone is accepted only after LFS checkout and structural verification prove
that real media—not pointer text—is present. Repository privacy does not grant
redistribution or public-performance rights and does not replace an independent
backup.

## Club Lab calibration and learning loop

Per-club hardware differences and artistic preferences are separate layers:

```text
raw Club 0/1/2 sensors -> per-club normalization -> shared pattern parameters
  -> blinded/repeatable human trials -> structured feedback -> LLM revision
  -> simulator -> one-club canary -> accepted shared library/profile update
```

This avoids maintaining three artistic forks merely because one device has a
different activity floor, axis offset, noise level, or brightness behavior.
Club-specific pattern code requires repeated residual evidence after
normalization.

Club Lab sessions should be append-only and resumable. The fast screening
questions are visibility, controllability, delight, and Keep/Tune/Drop; only
Tune candidates receive adaptive A/B trials. Raw notes and sensor samples remain
ignored/private by default, while physical-label-only profiles and sanitized
summaries may be explicitly promoted to the public repo.

The first live canary disproved a source-only assumption. The checked-out source
implements `/script/setScriptParam index value`, and factory stable 1.2.0 finds
the cartridge's `setParam` export, but the installed command router rejects
`setScriptParam` as unhandled. Club Lab V0 therefore selects its four patterns
with the physical button and records exact compiled values. A measured per-club
profile is kept separate and exported, but applying it live awaits either a
compatible runtime or a source-reviewed firmware revision.

The stack-guard interaction also changes study deployment. V0 temporarily
saves `club-lab-study` as the startup cartridge, reboots, performs the physical
study without post-boot network control, then saves the known `motion-lab`
startup back and reboots. This bounded boot-cartridge swap is more reliable than
a nominally transient load into a network-poisoned runtime. It must always have
an explicit restore script and serial boot canaries; it never flashes firmware.
Restore uploads the current validated Motion Lab artifact before saving and
rebooting its launch name; selecting an existing filename alone could silently
restore stale calibration code.
Detailed commands, schema, privacy model, LLM handoff, and staged implementation
are in `docs/club-lab-cli.md`.

## Candidate system roles

| Component | Role |
| --- | --- |
| Creators Club firmware | Local sensors, show/script playback, LEDs, files, OSC |
| BenTo | Prop discovery, configuration, authoring, streaming, OSC control |
| Chataigne | Cueing, routing, mappings, and orchestration |
| TouchDesigner | Real-time visuals, spatial logic, and richer show behavior |
| OpenCV/camera system | Optional external room-position tracking |
| After Effects | Offline rendered/video assets |
| Dedicated router | Portable, controlled show LAN after compatibility works |

Jonglissimo's `Galactica` credits included this general toolset. The table is an
architectural interpretation, not a confirmed diagram of their production.

## Design principles

1. **Prove each boundary.** Verify USB, firmware protocol, Wi-Fi association,
   discovery, sensor telemetry, and LED control independently.
2. **Keep firmware replaceable.** Put artistic logic on the host initially so
   iteration does not require reflashing borrowed props.
3. **Design for degraded operation.** Decide which effects can run locally if
   Wi-Fi or the controller fails during a performance.
4. **Make identity explicit.** Assign each physical club a durable label and map
   it to USB serial, firmware version, device ID, Wi-Fi MAC, and artistic role.
5. **Use timestamps and telemetry.** Record packet, sensor, and cue timing so
   performance bugs can be distinguished from networking or firmware bugs.
6. **Treat colors as output, not diagnostics.** Use explicit health telemetry or
   controller state rather than inferring system health from show LEDs.
7. **Separate motion from position.** The onboard IMU handles attitude,
   rotation, impact, and short events. Add cameras only if room-scale position
   materially improves the piece.
8. **Keep the show network boring.** Once firmware compatibility is proven, use
   a controlled 2.4 GHz network with client isolation off, fixed addressing or
   reservations, and no dependency on venue infrastructure.
9. **Preserve the prop's visual silhouette.** In dark juggling performances,
   ordinary cues need a low but continuous whole-club visibility floor. Sparse
   foreground detail must sit over a nonblack base; blackout is an explicit,
   rehearsed exception rather than an accidental pattern background.
10. **Separate show amplitude from club-global output.** BenTo pattern
    brightness scales authored colors; the Creator firmware applies and
    persists a second global multiplier at LED output. Keep the global value
    fixed during show calibration and tune generated floor values separately so
    results remain reproducible.
11. **Score the entire performance file, including silence.** An intentional
    silent head or tail can represent an entrance, held pose, bow, applause, or
    recovery window. Give it an explicit visible state and label that purpose as
    interpretation until the performer confirms it; do not let the audio
    waveform's end accidentally decide whether the props disappear.
12. **Default a juggling set to visual unison.** Clubs constantly exchange
    positions in flight, so an incidental per-ID difference reads as an error
    and pulls the audience's eye toward one prop. Generate identical color,
    phase, direction, and spatial treatment on all clubs unless the score names
    a deliberate divergence: a short transition, an easily read color chase,
    an explicit choreographic role, or local sensor response caused by visibly
    different movement. In BenTo generators, default `idOffset=0`, both
    inversion flags false, and single-prop pattern geometry; opt into
    multi-prop distribution only for a labelled group effect. These parameter
    checks are necessary but not sufficient: Multipoint adds
    `id * numProps` before taking phase modulo `gap`, so `numProps=1` still
    shifts IDs whenever `gap` does not divide one. A unison validator must
    evaluate IDs 0/1/2 through the actual provider at representative times and
    compare frames byte-for-byte.
13. **Separate functional test output from performance output.** A
    battery-saving bench pass may use a temporary master reduction, but do not
    judge the artistic palette from that mode. Author performance scenes to use
    the clubs' saturated, luminous range, with real contrast between the
    accepted tracking floor and energetic passages. Restore the fixed reference
    master level before comparing or calibrating shows.
14. **Compose for the physical club, not a generic LED strip.** In BenTo's
    normalized vertical display, Luke identifies the lower portion as the
    handle and the upper portion as the larger club body. The body has more
    illuminated area and reads more strongly in motion. Reserve a small
    handle-only difference for deliberately subtle music; an important pitch,
    transition, or thematic change should normally occupy the body or the whole
    club. Body-led Range effects currently use approximately `0.40-1.00`, with
    the handle carrying a darker related color rather than disappearing.
15. **Design spatial frequency per diffuser region.** Physical review shows
    that small LED clusters remain distinct in the narrow handle while the
    broad body blends adjacent blue/orange fields toward white and weakens the
    orange. Treat handle and body as different optical surfaces: fine detail is
    available in the handle; important body detail needs broader saturated
    fields. Calibrate useful cluster widths physically rather than assuming all
    32 LED indices have equal visual resolution.
16. **Make every angular seam intentional.** Roll and projected angle are
    circular coordinates. A continuous effect must use a periodic mapping whose
    final color returns to its initial color. A linear palette with unequal
    endpoints will snap at the wrap; retain that only when the snap itself is a
    named, rehearsable gesture.
17. **Review the deployed renderer, not its pre-transform source name.** The
    stable-1.2.0 stack transform can change visual semantics. Generated guides,
    effect catalogs, and artistic review must describe the post-transform WASM.
    P1E6 in V5 is a concrete failure: its intended body/handle complement became
    the same whole-club palette as P1E1.
18. **Separate circular phase from physical height.** Raw projected angle maps
    one complete flip around `0..1`; using that number as a linear LED position
    puts left/right at distinct quarter positions and creates a seam at upright.
    A pose-legible vertical mapping folds the circle into an up/down coordinate,
    for example `abs(2*a - 1)`, so up and down are opposite endpoints and both
    horizontal poses share the middle. Use phase for abstract orbits and height
    for tricks whose light should visibly explain the club pose.
19. **Tag sensor effects by choreographic semantics.** At minimum distinguish
    pose-legible, abstract-phase, throw/juggling, and manipulation effects. A
    beautiful abstract response is valid for music and texture; a predictable
    pose mapping is more useful for hitting a named angle in a deliberate trick.
    Do not judge one category by the other's purpose.
20. **Condition motion per effect.** Do not feed one globally smoothed activity
    or signed-speed value into every renderer. Use an explicit pipeline of raw
    input, per-club calibration, dead zone or hysteresis, nonlinear response,
    and effect-specific attack/release. Fire needs fast attack; water can carry
    inertia; direction must ignore near-zero sign noise; sparks need a truly
    quiet state before scaling count and rate.
21. **Use sensor state transitions as creative events.** A sustained state can
    select a hand or air palette, while remembered changes can trigger release
    and catch accents. Firmware `throwState` is a heuristic classification
    (`none`, `flat`, `single`, `double+`, `flat-front`, `loftie`), not a promised
    airborne boolean, so test repeatability before binding precise choreography
    to individual classes.
22. **Permit named contrast exceptions to the visibility floor.** Broadly lit,
    trackable output remains the production default. A sensor study may use a
    substantially dimmer—but still intentionally visible—rest state when large
    brightness contrast is the experiment. Mark and test the exception rather
    than weakening the safety rule globally; blackout remains a deliberate,
    rehearsed event.
23. **Assert perceptual distinctness after final transformation.** Canonical
    sensor frames must show that different effect slots differ and that each
    claimed input changes the deployed output. Source-level unit tests are
    insufficient when a stack-safety transform can collapse a per-pixel
    rainbow, duplicate another palette, alter heat colors, or remove an axis.
24. **Treat the light score as a second choreography channel.** The performer
    responds to musical tempo, energy, articulation, and mood, but can also use
    color, motion, and state changes as cues. Slow/graceful passages should use
    smoother visual motion and pose-legible holds; fast, chaotic, or noisy
    passages can use shorter attacks, denser accents, and larger hue changes.
    Build recurring visual characters and transformations so the score tells a
    story rather than decorating every beat independently.
25. **Author zero-input behavior explicitly.** Still sensor input may produce a
    fixed state, gentle breath, ember, or subtle flicker. It need not be frozen.
    Keep that idle behavior low-amplitude enough that the sensor-driven change
    remains obvious, and retain the ordinary tracking floor except for a named
    contrast experiment.
26. **Judge patterns through the diffuser, not from logical pixels.** A pattern
    that looks attractive as 32 discrete dots can turn into mud in the broad
    body, while a broad field or rider can become a luminous volume. Body
    motifs need enough axial extent and chroma to survive blending; handle
    motifs can use finer detail. If the simulator shows a perfect camera-facing
    bead rail, treat that first as an optical-renderer failure rather than as
    evidence about the physical effect.

The three-club stable 1.2.0/Wi-Fi baseline passed on 2026-07-13. Luke then used
one-at-a-time control to label the physical clubs `0`, `1`, and `2` to match
BenTo Global IDs and invoked `Save All`. The complete mapping is B=`0`, C=`1`,
A=`2`. Do not treat DHCP IP as identity.

## Execution architectures

### Performance deployment boundary

The operational design now has three explicit modes:

1. autonomous field rehearsal, with local club scripts and separately played
   music;
2. synchronized field/simple theatre, with BenTo owning one Audio-plus-Blocks
   clock on a Mac over the isolated Archer show LAN; and
3. full theatre, with a cue/status bridge between the venue control LAN and
   BenTo while the venue console continues to own its DMX universes.

A fourth, deliberately narrower runtime is the recommended small-gig product: a
Raspberry Pi-class show box connects by Ethernet to the isolated router, sends
unicast frames to Wi-Fi clubs, and sends audio through a fixed wired output. A
phone or laptop browser is only its upload/control panel. The first version
consumes a compiled `.clubshow` package containing audio plus pre-rendered per-
club `A,R,G,B` frames, not the full BenTo runtime. This keeps audio and lights on
one box-owned clock, avoids independent on-club playback drift, and makes
unsupported authoring features an export-time error.

The format boundary is architectural. `.bento` is version-tagged JSON containing
BenTo's serialized project/object graph: timeline recipe, pattern parameters,
relative asset paths, and editor state. `.clubshow` is a proposed versioned ZIP
performance artifact with a manifest, declared club IDs, hashes, bundled audio,
and pre-rendered frames; it may also retain the source `.bento` for provenance.
Direct `.bento` interpretation is a later compatibility layer. The repository's
current shows use a small seven-provider subset with no populated effects,
filters, or parameter links, but a general player would still be an engine
port. Direct reuse of GPL-3.0 BenTo renderer source must be treated as a
distribution/licensing choice rather than an incidental implementation detail.

The compiled playback engine is now a reuse gate rather than an assumed custom
component. Falcon Player already provides Raspberry Pi/BeagleBone sequence and
audio playback plus E1.31, DDP, DMX, and other outputs; xLights uploads FSEQ
sequences, associated media, model data, and Art-Net/E1.31/DDP definitions to
it. Before implementing a private frame format/player, export one current BenTo
show to FSEQ plus audio and test stock FPP. If playback parity and the API/plugin,
security, update, reliability, and commercial-licence boundaries are acceptable,
use FSEQ as the compiled payload inside `.clubshow` and put ClubShow's effort
into Flowtoys support, role patching, calibration, replacement, and show control.
Build a custom narrow player only after recording a concrete FPP incompatibility.

This also clarifies the full-theatre product boundary. Professional systems
already divide responsibilities: QLab or another show-control system owns audio
and cue flow, the lighting console owns fixture profiles/patch and venue
universes, and a media/pixel player owns dense frame playback. ClubShow is the
touring prop-lighting subsystem that owns its mobile/scenic fixtures and exposes
standard OSC/MSC and Art-Net/sACN interfaces. It is not a replacement for the
venue console or QLab.

For a dedicated player, keep audio and LEDs under one master clock. A Raspberry
Pi-class Linux SBC is the preferred first appliance because Ethernet, wired
audio, filesystem import, logging, updates, and a phone web UI are routine. The
browser is stateless control: playback survives browser disconnection. Uploads
are staged and validated, known-good packages are promoted atomically, the box
boots stopped, and a local physical STOP path remains available. An ESP-class
board has ample resources for pre-rendered frame storage and Art-Net streaming,
but becomes the second optimization when it also has to provide audio decode/
output, show import, UI, and safe recovery. A lights-only ESP plus phone audio is
not simpler operationally unless an explicit two-device synchronization
protocol is added.

The customer-facing enclosure and the fault domains are separate decisions.
Raspberry Pi OS can make the Pi's own radio a 2.4 GHz AP, so the smallest
prototype may be one board providing DHCP, web control, club networking, audio,
and playback. The runtime must nevertheless stay network-agnostic and also work
behind an external router. Compare onboard AP mode against the Archer under the
same three-club show soak before choosing the sellable topology.

For early low-volume sales, an unchanged certified travel router sold as a
field-replaceable companion is the lowest radio-integration risk. The eventual
one-box product may contain separate playback and router subsystems connected by
internal Ethernet, retaining independent failure/restart domains while
presenting one enclosure and power input. A one-board Pi AP is acceptable only
after RF range, antenna orientation, packet loss, thermal load, boot recovery,
and market-specific compliance pass with margin. Certified-module use reduces
but does not remove final-host labelling, RF-exposure, integration, and user-
notice obligations.

The show package, deployment patch, and device inventory are separate layers:

```text
.clubshow role -> venue/production patch -> calibrated physical device -> endpoint
```

`.clubshow` streams are keyed by logical roles such as `juggle.club.1` or
`scenic.moon`, with capability requirements rather than Flowtoys Global IDs,
serials, MACs, IPs, or universes. `clubshow.local` keeps the private hardware
inventory and per-device calibration in a local database, then resolves the
current patch at `ARM`. Replacing a failed club transfers the role to a
compatible canaried spare atomically; it does not modify or re-render the show.
Persistent `propID`, Wi-Fi, brightness, and firmware changes are explicit
commissioning operations, not automatic effects of patching.

The fixture abstraction is vendor-neutral: discovery/capability description,
Identify, health, supported configuration, frame output, and safe stop. Initial
drivers can cover Creators via OSCQuery/OSC plus Art-Net, generic Art-Net/sACN,
WLED through its JSON API plus DDP/Art-Net/E1.31, and USB DMX through a local
gateway. Each output has one master; venue-owned fixtures remain on venue
universes while ClubShow may own its mobile and scenic prop outputs.

Static scenic fixtures should default to wired Ethernet or DMX because they do
not need mobility. The open-hardware sequence starts with off-the-shelf
controllers and strips, then an open wired static-node reference design with
standard protocols and certified external low-voltage power. Battery, charging,
IMU, impact mechanics, and a safe juggling body form a later and substantially
harder product. The detailed data model, replacement flow, web controls, driver
contract, and open-node roadmap are in `docs/show-box-product.md`.

DMX is not the primary bidirectional cue protocol. BenTo's current `DMXBlock`
is a non-instantiated skeleton, while its verified control plane is OSC plus
OSCQuery and its club output is Art-Net. Use OSC or MIDI/MSC for theatre
commands and acknowledgements, with Chataigne as the first adapter candidate.
A reserved DMX input channel is only a venue-specific one-way fallback.

The first full-theatre clock design keeps BenTo authoritative after GO: the
venue may arm/start/stop it, and a bridge observes BenTo time to fire discrete
venue cues. The inspected BenTo source has no external LTC/MTC chase, so a
parallel independently timed theatre show is not yet hard-synchronized. Avoid
two masters until a chase path has been implemented and measured.

The club LAN and venue LAN remain separate interfaces with routing disabled.
This also prevents stable 1.2.0's unauthenticated services and exposed Wi-Fi
configuration from becoming reachable to venue clients. BenTo's wildcard,
unauthenticated control listener needs interface-specific filtering before the
Mac is connected to a venue LAN.

The detailed kit, startup/recovery runbook, theatre command contract, and phone
roadmap are in `docs/performance-deployment.md`.

### Browser BenTo rehearsal player

The BenTo Juggle Player is a browser rehearsal and authoring-debug layer between
static pattern galleries and live BenTo. It interprets a deliberately bounded
subset of a `.bento` project, drives the same three-club renderer used by the
other labs, and keeps audio and sampled light frames on one browser-owned clock:

```text
local .bento -> normalize supported sequence/providers -> sample IDs 0,1,2
                                                            |
audio.currentTime ------------------------------------------+-> 3 x 32 RGB
                                                                 |
project output brightness (default 0.5 if absent) --------------+
                                                                 |
user-set juggling BPM -> cascade pose only ---------------------+-> WebGL + strips
```

`tools/web-sim/src/bento-timeline.mjs` is a stateless evaluator: a given show
time and logical ID produce one 32-RGB frame without requiring playback from
zero. `studies/bento-juggle-player/` uses the HTML audio element's
`currentTime` as master when audio exists, writes that clock on seek, and pauses
the render loop with audio. A silent `performance.now()` fallback is useful for
visual inspection but does not prove synchronization. Juggling BPM affects only
the illustrative cascade motion and remains fixed/user-selected; it is not yet
derived from the song or a choreography track.

The implemented compatibility slice covers `solidColor`, `rainbow`, `strobe`,
`point`, `range`, `multipoint`, `ledRange`, and `noise`, clip fades, and the
reverse-order `Add`, `Alpha`, and `Mask` compositor. Its output contract follows
the inspected BenTo/BentoProp path: layers produce RGBA, and the streamed
physical RGB byte is the final RGB multiplied by final alpha. Saved/project
output brightness is not folded into provider colors; it is a distinct final
gain with BenTo's source default of `0.5` when absent.

Compatibility is fail-visible. Prop filters, block effects, position remap,
parameter links or automation, explicit clip core/loop timing, unsupported
providers, and multiple audio clips produce diagnostic notes. They are not
ignored and called exact. Noise is the only deliberate visual approximation in
the supported set because the precise Perlin helper is absent from the
inspected source snapshot; a deterministic gradient-noise function preserves
control shape for preview while remaining labelled approximate. Provider
compatibility also preserves odd source details: Range inversion uses
`resolution-index`, whereas Point uses `resolution-1-index`.

This browser interpreter does not replace BenTo, FPP export, or the proposed
compiled show appliance. It sends nothing to physical clubs and does not model
Wi-Fi, Art-Net timing, firmware brightness, or venue audio. Its purpose is to
catch project/schema/compositor/per-ID mistakes cheaply and to preview a song
with virtual motion before a live canary.

The local-file boundary is part of the architecture. User-selected `.bento`
and audio files remain browser `File`/blob objects; no upload path exists, saved
physical prop records are ignored, and the simulation always uses logical IDs
0/1/2. Only appropriately licensed demo media may ship with the site.
Purchased/copyrighted audio remains ignored and local-only.

The first parser-driven finding changes show validation. BenTo Multipoint uses:

```text
targetPos = speed * time + offset + id * numProps
```

and then phases by `gap`. Consequently, single-prop geometry does not imply
unison. Gettosinfonía V5 gaps `0.12` and `0.16` leave different remainders for
IDs 0/1/2, despite the generator's earlier `numProps=1` assertion. Every future
unison validator should run the actual provider implementation for all target
IDs across clip boundaries and representative interior times. Parameter-shape
lint remains useful, but rendered equality is the acceptance criterion.

### Central live show

```text
club IMU -> Wi-Fi feedback -> Mac mapping/timeline -> Art-Net color frames -> club LEDs
                                      |
                                      +-> Mac audio output -> speakers/PA
```

BenTo can host Audio and Block layers on the same sequence transport, so a song
and its authored club cues can start from one clock. This is the fastest path
for designing a song-specific show and lets the Mac perform complex mappings.
It requires a healthy show Wi-Fi link and a running Mac.

The first implementation of this architecture is
`shows/exit-the-premises-poc/`: a 60-second Audio-plus-Blocks project generated
for BenTo 2.1.0b6. Its light score targets all discovered props without ID
filters, contains a slower color bed plus 128 short beat pulses, and references
the audio asset relatively so the show directory is portable. The generator is
the editable source of truth; the `.bento` file is the reproducible product.

This first version intentionally tests master-transport synchronization rather
than motion response. It does not yet degrade gracefully if the host or show
network fails. Native BenTo 2.1.0b6 loading now succeeds after correcting the
project to the current `models.sequences` / `SequenceBlock` schema and
`/library/patterns/...` provider paths.

A new phrase-led central-show study under `shows/kojo-no-tsuki/` tests the same transport
architecture against sparse acoustic music. It uses phrase boundaries and
measured koto attacks instead of assuming that every score has a useful constant
beat grid. This establishes a general authoring split: long-form structure owns
motifs and palette, onset events own brief accents, and an independent Add layer
owns performance visibility. The generated project is validated offline but has
not yet passed native BenTo or physical-club playback.

BenTo has two distinct runtime relationships that a show launcher must manage:

```text
sequence transport (play/seek/stop)
            +
prop routing (Active Block -> that sequence)
            =
rendered frames sent to the prop
```

Opening a sequence and pressing its Play button does not assign it to a prop.
The rehearsal UI or launcher must first set the target prop's `Active Block`,
then start the shared transport. BenTo's built-in drag or `Assign to...` UI is
the current path. `tools/bento_show_control.py` provides the same operation
through BenTo's optional OSC Remote Control interface. That receiver is now
enabled in the exploration installation, and the helper verifies commands
through the service's OSCQuery HTTP state. Do not confuse BenTo's UDP `10000`
prop-feedback socket with the remote-control port `43000`. A later UI canary verified the
internal pipeline through Global ID 0: active-block routing, five seconds of
transport, and orange output in BenTo's prop visualizer all passed before Stop
reset the sequence. Luke also verified the authored colors on the physical
club. Beat visibility after the compositor-order correction and audio/light
timing remain unverified.

BenTo's block-layer list is also a compositor stack, not just an organizational
list. `SequenceBlockSequence::getColors` walks the list in reverse. For a base
Alpha layer plus an additive accent layer, store the additive layer before the
opaque base layer so reverse evaluation lays down the base first and adds the
accent afterward. The opposite order can leave all clips visible in the editor
while making the additive result physically invisible.

The second central-show implementation is
`shows/exit-the-premises-full/`, a complete 210.07675-second score based on an
interpreted 112-bar form. Its architecture generalizes the first prototype into
five rows stored in compositor-safe order:

```text
Audio
Transition bursts  Add
Rhythmic accents   Add
Strobe textures    Add
Section motifs     Alpha
```

The Alpha row provides continuous musical identity; the Add rows are sparse
emphasis. Recurring song material should reuse a visual family so its return is
recognizable, then communicate musical development by changing a small number
of legible parameters: brightness, motion speed, density, spatial fill, gap,
and accent frequency. This gives the visual score memory and direction instead
of becoming a succession of unrelated effects.

The generated full score uses only stock BenTo 2.1 patterns and saves no props,
so routing remains a deliberate rehearsal/performance operation. Native loading
and project-local routing to Club 1 pass, and Luke observed the complete score
on that club. Three-club synchronization of the full score remains unverified.

The visibility-first revision keeps that file as a rollback baseline and adds a
separate generated project. Its rows are stored as:

```text
Audio
Visibility floor          Add
Section transitions       Add
Rhythmic pulses            Add
Vision-inspired textures  Add
Section motifs             Alpha
```

Reverse evaluation lays down the Alpha motif, then textures/pulses/transitions,
and finally adds the full-strip floor. This makes the floor a compositing
invariant rather than a convention every motif author must remember. The
generator also proves that floor clips cover the complete timeline without
gaps and remain at or above a configured structural minimum, except for an
explicit end-of-show fade.

Consumer Vision names are reference vocabulary, not executable Creator pattern
identifiers. Preserve that boundary in tools and documentation: select a
reference using mood/palette/structure tags, record its name as provenance, and
implement or approximate it with BenTo primitives or a custom Creator script.
This avoids implying that a BenTo block named after a Vision mode reproduces
the consumer firmware algorithm exactly.

### BenTo automation control plane

The current authoring workflow does **not** require a BenTo fork or an MCP
server. BenTo 2.1.0b6 already ships an OSC Remote Control service on port
`43000`, and that same service exposes an OSCQuery HTTP tree. Live testing of
the installed application verified the following built-in operations:

- `GET /?HOST_INFO` reports the application version and exact open file;
- `GET /library/sequences` enumerates sequences, duration, current time, and
  playing state;
- `GET /props` enumerates project-local Global IDs, enabled state, battery, and
  Active Block routing;
- OSC `/openFile` opens or reloads an absolute `.bento` path;
- the generic prop `activeBlock` OSC address assigns a sequence; and
- the generic sequence `play` and `stop` trigger addresses control transport.

`tools/bento_show_control.py` wraps those operations as `status`, `open`,
`assign`, `play`, and `stop`. It sends a narrow OSC command, then polls HTTP
until the requested file, route, or transport state is observed. This closes
the important acknowledgement gap without changing BenTo: UDP send success is
not treated as command success.

```text
Codex or terminal
        -> edit/generate and validate .bento JSON
        -> tools/bento_show_control.py
        -> built-in OSC commands + OSCQuery HTTP readback
running BenTo 2.1.0b6
        -> existing club output
```

The earlier proposed application API plus `bento-mcp` sidecar is therefore
deferred. MCP would only wrap this CLI for the current goal and would add
installation, configuration, and another failure boundary without adding a
capability Codex needs.

Known limitations remain:

- BenTo's service is unauthenticated and the installed build binds port `43000`
  on wildcard interfaces, not loopback only. Enable it only on a trusted local
  or isolated show network.
- A native unsaved-document or newer-autosave dialog can block `/openFile`.
  The exploration installation now has **Ask to restore on startup** disabled;
  the CLI reports a verification timeout if another modal dialog intervenes.
- The OSCQuery tree does not currently expose a clear dirty flag or structured
  error from `loadDocument`.
- BenTo 2.1.0b6 can truncate the recursive `/library/sequences` JSON for a
  dense timeline. The flagship Gettosinfonía response ended at 15,852 bytes
  without closing JSON, while its narrow sequence transport endpoint remained
  valid. `tools/bento_show_control.py` now recovers only shallow sequence
  summaries that match every sequence in the exact file BenTo reports open,
  then continues to verify transport through the narrow live endpoint. It does
  not treat the truncated response or a UDP send as acknowledgement.
- The custom `BentoEngine::processMessage` helpers such as
  `/codex/assignAndPlay` were accepted at the UDP socket but did not change
  observed state in the installed build. Use the verified generic object paths.

A narrow fork becomes justified only if these limitations matter in practice:
bind the service to loopback, add explicit load completion/error and dirty
state, make file opens non-modal, or provide an event stream. If a future
non-Codex client needs tool discovery, an MCP adapter can be added outside the
application on top of the same CLI or protocol; it is not the next engineering
step.

### Autonomous club behavior

```text
club IMU -> local WASM script / built-in FX -> club LEDs
```

Stable 1.2.0 already exposes local script functions for orientation, projected
angle, activity, and throw state. It also has a built-in FX stage that remaps a
pattern from projected angle/yaw/pitch/roll. This path continues without Wi-Fi
for the built-in FX. Source indicates a loaded WASM also executes locally, but
boot-time launch is not established. Authoring/debugging and multi-club/music
synchronization are more involved.

### Juggled Wi-Fi diagnostic

There are three materially different ways to turn a club into a Wi-Fi meter.

**Host-assisted, no-flash prototype:** a Mac helper polls the club's
credential-safe OSCQuery tree and measures reachability/round-trip time, then
sends normalized values to a running WASM program through the script parameter
command. The program records the last update time locally. A fresh heartbeat
can render signal quality as a green/cyan-to-yellow-to-red field; if updates
stop for a few seconds, the club itself switches to a disconnected warning.
That timeout is essential because a final "disconnected" network packet cannot
reach a club after the path has already failed.

This design is useful and does not require replacing firmware, but it measures
the whole club-to-helper path. It cannot by itself distinguish club Wi-Fi loss
from failure of the Mac, helper, access point, or controller.

**Controller-observed, no-flash prototype:** on the home UniFi network, a Mac
helper can query the controller with a read-only API key, identify each club by
its private MAC-to-project-ID mapping, and forward available client metrics to
the same WASM `setParam` bridge. This is a better observer of the radio link
because the access point sees the club directly. Depending on the installed
UniFi Network version and its local Integration schema, useful fields may
include association state, serving AP/radio, signal, retry/rate data, or a
vendor-computed experience score. Only fields present in the actual supported
response should be used.

The official 2026 UniFi Network API guarantees connected-client discovery and
basic connection details, but its public client schema does not promise
per-client RSSI. UniFi explicitly directs local integrations to the
version-specific API documentation inside Network > Integrations. Therefore
the first step is a read-only schema and one-client response probe against
Luke's controller. Do not depend on undocumented dashboard-private endpoints
unless the supported Integration API proves insufficient and the maintenance
cost is accepted.

This controller path is home-lab-specific. A portable Archer show network will
not provide UniFi telemetry, so the host heartbeat or self-contained firmware
path remains necessary for a router-independent diagnostic.

**Self-contained firmware extension:** add small read-only WASM imports such as
`getWifiRSSI()` and `getWifiState()`, backed by the ESP32 Wi-Fi driver and the
firmware's existing connection-state enum. A local program could then display
radio signal and connection state even while disconnected from the controller.
This is the architecturally clean version, but it requires a reviewed firmware
build, explicit authorization, a one-club canary, and the normal rollback path.

The installed stable 1.2.0 binary exposes a float at `/wifi/signal` over
OSCQuery, but its meaning is not yet calibrated: five stationary samples all
returned `0`. Do not label it RSSI, dBm, or a quality percentage until it is
compared at multiple distances against an independent access-point reading.
The current WASM import set contains no Wi-Fi getter. The reviewed source does
support an optional exported `setParam(index, value)` function and a
two-argument `/script/setScriptParam` command, but the factory stable 1.2.0
binary rejected that command during the Club Lab canary. A no-flash Wi-Fi meter
therefore needs a different verified host bridge or a reviewed firmware update.

### BenTo timeline, local playback, and local program are different artifacts

The word **sequence** can hide three different execution models:

| Model | What the club stores | What executes the visuals | Current button behavior | Current project status |
| --- | --- | --- | --- | --- |
| BenTo sequence | Nothing by default | BenTo evaluates the editable timeline on the Mac and sends output | Not involved | Working for the authored song shows |
| Baked playback | A `.meta` description plus `.colors` `A,R,G,B` frames under `/playback` | The club's playback layer advances the stored frames at the exported FPS | No source-backed button connection | Implemented in BenTo/Bentuino source; not yet tested on a physical club |
| Autonomous scene program | A small `.wasm` file under `/scripts` | The club runs sensor/button logic and renders LEDs locally | Boot Demo plus first-press exit and raw click cycling are physically verified | The 24-effect V5 program is saved, soaked, and artistically reviewed on Club 1; Clubs 0 and 2 remain on V3 while V6 replaces the rejected/overwritten effects |

BenTo's **Generate and Upload** operation flattens the currently assigned block
into per-prop frames. The resulting club playback does not retain BenTo's
editable layers, providers, automation curves, or audio track. It can continue
advancing LED frames locally after it has been loaded and started, but the
source does not establish button launch, boot-time launch, or music playback.
Music still needs an external player and a master start/synchronization method;
independent club clocks may drift from one another and from the audio.

Playback metadata can name up to 32 timed WASM intervals in the reviewed
Creators configuration. That is a promising future hybrid, but it inherits the
current script-to-LED integration blocker and is not yet a validated path.

For Yuki's rehearsal browser, an autonomous scene program remains the right
product model: one compact parameterized engine, not 20 unrelated uploads, with
short click for next and double click for previous. Stock stable 1.2.0 does not
wire the button to playback selection, and the dedicated short-press event is
commented out; the program must interpret the exposed button state and
multipress counter itself. Boot-time auto-launch also remains an open question.

If the installed firmware's script layer cannot be activated or repaired
without replacement, the fallback is to compile the scene engine directly into
a reviewed Bentuino fork. That provides deterministic boot and button behavior
but is the most invasive option and therefore requires an offline build,
explicit authorization, a one-club canary, and the documented rollback path.

### Project decision: implement and compare both

Luke wants both architectures built as project tracks so their tradeoffs can be
experienced rather than guessed:

1. **Central track:** a Mac-side sensor logger/mapper, then a BenTo song timeline
   with Audio and Block layers.
2. **Autonomous track:** the built-in motion FX, then a local WASM script that
   maps orientation/activity/throw state directly to LEDs.

Run the same artistic mapping on each track where practical. Compare measured
latency/jitter, behavior during Wi-Fi loss, startup complexity, edit speed,
battery/load, synchronization across three clubs, and music-cue integration.
The likely production answer remains hybrid, but that is a hypothesis to test,
not a decision to impose before the experiments.

### Creative product model

Yuki's target workflow is now explicit: first browse and practice a catalog of
movement-reactive scenes from the club button, then arrange the selected scenes
into a time- or cue-driven performance score. A scene combines a motion
interpretation, visual renderer, and tuned parameters. The detailed scene
catalog and workflow are recorded in `docs/creative-workflow.md`.

For rehearsal, the preferred autonomous prototype is one compact local WASM
scene engine with short-press next and, if live multipress behavior proves
reliable, double-press previous. For exact musical choreography, one master
transport should own audio time and scene boundaries while the local club
continues to render low-latency motion response inside the active scene.

Button-advanced show cues remain a valid option for flexible pieces and
fallback operation. They are not the default for music-exact work because the
performer would be responsible for both the juggling choreography and another
manual clock.

## Staged build plan

### Stage 0: Preserve and identify

- Record all three physical identifiers and observable boot behavior.
- Preserve the factory firmware and confirm ownership/permission boundaries.
- Make a read-only flash backup before any firmware replacement.
- Determine whether a matching BenTo/controller build exists.

Exit condition: the installed build is identified or safely backed up, and a
recovery path is understood.

### Stage 1: One-club transport

- Establish Wi-Fi association on a controlled 2.4 GHz network.
- Confirm the club in the router client table by MAC address.
- Confirm request/response discovery and record UDP ports/device ID.
- Send a reversible LED test from BenTo.

Exit condition: one club can be deliberately discovered and controlled after a
power cycle.

### Stage 2: One-club sensor loop

- Log raw IMU events with timestamps.
- Map orientation to hue or gradient direction.
- Map gyro or activity to brightness/texture.
- Trigger a short pulse on a confirmed throw/catch event.

Exit condition: the full sensor-to-host-to-light loop is repeatable and its
latency is measured.

ID 0 passed the first hardware boundary on 2026-07-13: its stock stable 1.2.0
firmware initialized the BNO055 and returned live IMU values after a transient
enable. The first visible test uses the built-in roll-isolation FX on the
current multicolor pattern. Luke then physically rolled the club around its long
axis and observed the displayed color change, validating the autonomous local
sensor-to-FX-to-LED chain. Switching to projected angle produced a successful
full-circle color mapping with red at upright for the current palette/offset and
a strong visual effect during juggling. All three clubs are now transiently
armed with matching projected-angle, speed, and smoothing values. Cross-club
phase alignment and timing still need controlled physical measurement.

### Spatial color coordinate

The successful projected-angle test suggests a simple reusable scene primitive:

```text
color = palette(projectedAngle + clubPhaseOffset)
```

Using the same phase on every club can create color unison whenever their
orientations match. Intentional per-club offsets can instead create complementary
colors, rotational chases, or symmetric groupings. This local relationship does
not require the host to send frame-by-frame timing, but all clubs must use the
same palette and verified calibration/offset before cross-club matching can be
claimed.

Stable 1.2.0's stock FX truncates the continuous angle to one of 32 source-LED
positions. Its smoothing parameter filters angle over time but does not
interpolate color. The production scene should therefore render HSV or another
continuous palette function directly from the floating projected angle; retain
the stock FX as the no-code baseline. The first WASM implementation validated
offline but took Club 0 offline when loaded, so runtime compatibility must be
diagnosed before any group deployment.

Physical testing adds an important distinction: 32 source positions is an
implementation upper bound, not 32 perceived colors. Luke saw substantially
coarser jumps even with smoothing zero. Pattern content, adjacent-color
similarity, and motion/display sampling all affect effective visual resolution.
Measure the visible result rather than naming scenes from the internal index
count.

The reduced module's network canary passed, but the physical LED test later
showed that it rendered nothing. The real architectural boundary is versioned:
CreatorsClub 1.2.0 exposes the older `arduino` WASM ABI with integer FastLED HSV,
whereas current Bentuino source exposes component-named imports and float HSV.
Scene source and build metadata must therefore declare their target firmware
ABI explicitly. No continuous local renderer is accepted until the corrected
compiler-built module passes a visual canary.

The first compiler-built module proved that its legacy `fillLeds(0xff0000)` call
did not affect visible output: instrumented `init` and `update` markers executed
while the club remained rainbow. Later comparison exposed a packed-color/alpha
bridge mismatch rather than a general script-layer failure. A replacement using
`fillLedsRGB(r,g,b)` with Alpha blend physically rendered red, green, and blue;
three button presses advanced and wrapped the colors exactly once per edge.
Stable 1.2.0 is therefore a usable autonomous scene platform through the
three-channel RGB path. Packed `fillLeds` and `fillLedsHSV` remain unsupported
for this project until separately proven.

The next architecture probe is now fully local: one button-browsed sensor
playground uses projected angle, activity, and derived angular speed for four
visibility-preserving scenes. This tests the intended autonomous rehearsal
boundary directly. The host activity-to-brightness mapper remains useful as a
central/hybrid comparison, not as a prerequisite for local sensor rendering.

The first host implementation is `tools/activity_brightness.py`. Stable 1.2.0
computes `activity` locally but does not include it in the continuous
`sendLevel=All` feedback block, so this prototype polls the credential-safe
OSCQuery snapshot instead of changing feedback configuration. This is suitable
for a one-club artistic probe, not yet a production transport decision. If HTTP
polling proves too slow or costly, derive a host activity envelope from the
continuously available linear-acceleration or gyro feedback and compare timing.

### Stage 3: Three-club identity and coordination

- Add the other clubs one at a time.
- Give each a durable human label and network reservation.
- Test simultaneous telemetry and streaming load.
- Implement per-club and group cues.

Exit condition: each club can be addressed independently and all three remain
stable under representative traffic.

### Stage 4: Portable show network

- Configure the Archer C4000 as the dedicated isolated 2.4 GHz show LAN. This is
  now a project decision, not merely an option: stable 1.2.0 exposes configured
  Wi-Fi credentials through an unauthenticated full configuration response.
- Document startup, addressing, channel choice, backups, and venue placement.
- Test recovery from controller restart, AP restart, and individual club loss.

Exit condition: the system can be carried to a theatre and started from a
written checklist without UniFi or internet access.

### Stage 5: Optional visual tracking

- Add cameras/OpenCV only for effects that require room-space position.
- Fuse external position with the club's higher-rate orientation and rotation.
- Keep camera tracking failure from breaking basic local/IMU effects.

The first hardware prerequisite now exists: a bench OBSBOT Meet SE can capture
the illuminated clubs, while the powered multiport hub exposes multiple club
serial bridges. Use this first as an observation channel for color, relative
brightness, diffusion, and gross pose. Whole-club 2D trajectories require wider
framing, locked/short exposure, and a measured high-frame-rate mode. Camera
frames must remain private by default. Treat the webcam as feedback/measurement,
not as a required dependency for autonomous IMU effects.

## First creative experiment

After transport works, prefer this minimal mapping:

```text
tilt/orientation -> hue or directional gradient
gyro/activity    -> brightness and texture energy
throw transition -> short pulse
```

This validates the useful artistic chain before tuning throw classifiers or
building a larger show-control stack.

Do not build 20 effects before validating the four underlying interaction
primitives: projected orientation, derived angular speed, activity, and
throw/catch state. Once each primitive is convincing in Yuki's hands, combine
them as parameterized scenes rather than unrelated programs.

## Open architecture decisions

- The factory test builds are archived and all three clubs have migrated to
  supported stable 1.2.0; future firmware changes should retain the same
  backup-and-verify discipline.
- Use BenTo itself as the main runtime controller or use it as the prop gateway
  beneath Chataigne/TouchDesigner?
- Which behaviors must survive loss of Wi-Fi?
- What latency and update rate are acceptable for three simultaneous props?
- Does the intended performance actually require XYZ tracking?

## Firmware platform decision

All three clubs now use public stable 1.2.0. Factory images are preserved in the
project recovery artifacts, and the full-flash migration process is recorded in
`docs/flashing-and-migration.md`. Host-first artistic iteration remains the
default; another firmware change needs a concrete capability or reliability
reason.
