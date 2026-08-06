# Current state

Last updated: 2026-08-05 PDT

## 2026-08-05 PDT result: Passing Lab compiles one front-facing actor frame for every pattern

The generic Passing Lab executor no longer reinterprets formation headings
with a reversed Z axis. The catalogue convention is now explicit and compiled:
`0°` faces downstage along `+z`, `90°` faces audience-right along `+x`, and
positive rotation is around `+y`. The compiler emits normalized forward/right
frames from each performer's declared placement. Hands, release/catch lanes,
torso yaw, first-person cameras, and follow-through all consume that same frame.
No pattern ID branch was added.

The defect affected 118 compiled pass events across 31 of the 44 generic cards;
the two-person pair headings had hidden it. Compiler validation now rejects
non-finite placement and any pass that puts either partner behind the other's
declared facing. The generic sampler also rejects a release-to-catch horizontal
grip path that approaches any performer centreline within `0.30 m`. This is a
formation/body-path guard, not full-club biomechanical collision validation.

**Verified local state:** the web suite passes 99/99 and all browser bundles
rebuild. Rendered slow-playback checks covered the directed triangle, canonical
V feed, square PPS cross-feed, and five-person star plus triangle first-person
view. Each formation faced inward, reported its complete inventory, and stayed
outside the guard; the smallest catalogue clearance is `0.376 m`. A 390x844
five-person star check had no horizontal overflow or browser diagnostics.

**Verified publication:** Pages commit `b506611` reached status `built`.
Cache-busted public bytes for the page, generated stage bundle, physical
selector, generic model, library, compiler, and playback module match the staged
site files. At <https://luk.ec/passing-lab/?v=b506611>, the directed triangle
showed three performers, ten clubs, three mid-pass airborne clubs, and `500 mm`
minimum reported body-path clearance. A public 390x844 five-person star check
showed five performers, fifteen clubs, five airborne throws, `510 mm` clearance,
no horizontal overflow, and no browser diagnostics.

## 2026-08-05 PDT result: two-page Motion Lab V6 physical evaluation handout is ready

For tonight's physical evaluation, `output/pdf/motion-lab-v6-physical-evaluation.pdf`
is a static Letter-landscape, exactly two-page handout generated from the
authoritative `scenes/motion-lab-v6/effects.json` catalog. It lists only the 40
on-club V6 candidates - never the browser-only Theme Studio collection - with
effect ID, name, compact observation prompt, visibility/repeatability ratings,
Keep/Tune/Drop marks, and a note line for every effect.

Page 1 contains P1 Roll, P2 Flip, and P3 Energy E1-E4. Page 2 explicitly
continues P3 at E5-E8, then contains P4 Flight and P5 Police. The companion
generator is `tools/generate_motion_lab_v6_evaluation_sheet.py`; its catalog
and 20/20 page split assertions prevent silent drift from the on-club program.

**Validation:** Poppler reported exactly two 792 x 612-point Letter-landscape
pages. PDF parsing confirmed all P1E1 through P5E8 IDs, both partition edges,
and the Theme Studio exclusion. Both 160-DPI rendered pages were visually
inspected for clipping, legibility, header/footer presence, write-in space, and
page-two continuation. No club, firmware, settings, or print action changed.

## 2026-08-04 PDT decision: Creator Clubs uses `main` as its only working branch

Luke clarified that this is a solo project and does not need a standing review
branch workflow. The four completed source/publication commits were verified as
a clean fast-forward from `main`; they are now part of local and remote `main`.
The temporary `codex/store-project-source` branch was deleted locally and on
GitHub. Future completed work for this repository should stay together on
`main` unless Luke explicitly asks for an isolated branch.

## 2026-08-04 PDT result: PPS now executes a compiled alternating-hand pattern

Luke reported that PPS visually left both jugglers holding clubs rather than
performing the pattern. The visible symptom had two verified model causes: the
authored three-beat `P P S` row restarted on the right hand at its loop seam,
and token playback silently selected any held club when the declared throwing
hand was empty. The generic stage also labelled a scheduled event airborne
during its hand-connected load and catch phases.

Passing patterns now compile into validated execution plans before playback.
For normal patterns the compiler requires an explicit action for every
performer/beat, creates an opposite-hand continuation when the notation cycle
is not hand-periodic, and derives the safe initial per-hand inventory. Playback
strictly consumes the declared hand. The pattern page passes the compiled
object into a catalogue-independent generic 3D executor; pattern IDs no longer
drive generic animation logic. PPS therefore executes the six-beat sequence
`P-right, P-left, S-right, P-left, P-right, S-left` for both jugglers.

The 3D sample now separates the current instruction from actual club state. At
mid-flight PPS shows four held and two airborne clubs; during forward load or
catch return all six are truthfully hand-connected while the two active throws
remain identified. The previously requested inward/upward belly-region release
and wider catch lane remain in the shared gesture.

**Verified local state:** `npm --prefix tools/web-sim test` passes 93/93 and the
Passing bundle rebuild succeeds. The tests feed all 48 compiled pattern objects
through the generic executor and cover every PPS beat at load, flight, and
catch phases. Desktop browser sampling showed both simultaneous passes and
selfs; a five-person star showed five performers, fifteen clubs, and five
airborne throws. The 390x844 PPS view remained usable, and all checks reported
no browser errors.

**Verified publication:** Pages commit `c64c6e7` reached status `built`. The
cache-busted public page, bundle, library, playback, generic model, and new
compiler at <https://luk.ec/passing-lab/?v=c64c6e7> match the staged bytes.
Public mobile-browser sampling verified PPS load at six held/zero airborne,
mid-pass at four held/two airborne, and the beat-six left-hand selfs; the
five-person star reported five performers, fifteen clubs, and five airborne
throws. Neither public canary produced browser errors. No club, firmware,
BenTo show, or device setting changed.

**GitHub source:** implementation commit `036fdc2` and publication-record commit
`2a12968` are included on `main`. The public `clubs` repository contains the
compiler, models, page, generated bundle, tests, and documentation together.

## 2026-08-04 PDT local result: full 40-effect Motion Lab V6 is canary-ready, not installed

Luke asked to prepare the larger all-pattern program on one club before any
wider rollout. The authoritative candidate is the newer **five-page, 40-effect
Motion Lab V6** source build at `scenes/motion-lab-v6/motion_lab_v6.ts`, not a
base-firmware image. A fresh local build reproduced
`artifacts/motion-lab-v6.wasm` byte-for-byte: 6,062 bytes, SHA-256
`de23c41a1e18c43f8172666d6c503cc8df16639cb7b659de106622b4559a5a67`.
It adds the eight P5 Police effects to the earlier 32-effect, 5,216-byte V6
currently persisted on the clubs.

**Verified local result:** the final-artifact simulator passed all 40 renderers,
the 400-second Demo traversal, P5 navigation/wrap, input isolation, visibility,
memory, and persisted-startup `init()` contract. The generic 30-second exact
WASM scenario also passed, and `npm --prefix tools/web-sim test` passed 88/88
with the web build and whitespace check clean. These results do not model the
installed firmware's Wasm3 native-stack translation, physical LEDs/diffusion,
or button feel.

**Known physical gate:** the prior 328-second physical soak applies only to the
earlier 5,216-byte four-page V6 and was stable but inconclusive: its serial
capture omitted every E8 marker. The soak helper has been corrected so any
missing address marker now returns **INCONCLUSIVE**, rather than accepting a
timed wrap as proof that the omitted renderer ran.

**Next authorized canary:** retain the currently saved 5,216-byte
`motion-lab-v6` startup cartridge. Upload the exact 6,062-byte candidate under
a distinct temporary name, transiently load it on Club A, require the complete
file-read/lifecycle signature, then observe one 408-second Demo with all 40
`6000..6407` markers, no low-stack stop/panic/reboot, and a hands-on
first-button/P1E1 check. Only after that green gate should it become the saved
startup cartridge; the other two clubs remain untouched until Club A has also
passed a clean persisted reboot. No club, firmware, or saved setting changed in
this local-preflight result.

## 2026-08-04 PDT decision: the complete durable project source belongs on GitHub

Luke explicitly asked that all project code be committed and stored on GitHub,
not left only in a local working tree. The durable public source boundary now
includes the labs and generated standalone viewers, simulator/runtime source,
tests, CLI and build tools, scene programs, reusable calibration show source,
repo-local agent skill, and project documentation.
The concrete lab homes are `studies/passing-lab/` for Passing/Pattern Lab and
`studies/motion-lab-v6-emulator/` for Glow Lab, with shared implementation in
`tools/web-sim/`. The separate `clubs-private` repository remains the home for
licensed audio and other private show/runtime material.

The boundary deliberately excludes recovery/private directories, personal show
projects already tracked in `clubs-private`, binary firmware products,
copyrighted rehearsal audio, generated PDF output, and local editor/cache
files. One redundant local BenTo snapshot inside a private-owned show directory
contains device-specific network identity and therefore remains outside the
public candidate. A repository scan found no credential-shaped values or exact
device/network identifiers in the public commit candidate. The complete source
set was committed as `6795afb` and is now included on `main` with the later lab
and documentation commits. The temporary publication branch is superseded by
the main-only solo-project workflow above.

## 2026-08-04 PDT result: direct Throw buttons and all-pattern Passing Lab 3D are public

**Glow Lab:** the six-value Throw classification is now a direct button group
instead of a select menu. One tap selects Held, Flat, Single, Double+,
Flat-front, or Loftie while preserving the exact numeric `0..5` host value and an
accessible single-selection state. The generated standalone was rebuilt from
the same embedded Motion Lab V6 WASM; this is a browser-control change, not a
club-cartridge or firmware change.

**Passing Lab:** the active viewer no longer creates or flashes an initial 2D
canvas. All 48 playable cards use the shared Three.js stage. The canonical
two-person 1-/2-/3-/4-count cards retain the bounded six-club physical sampler;
the other 44 cards use a new schedule-driven 3D adapter that renders each
card's declared performers, formation, event routes, and complete club
inventory. That adapter is a readable 3D representation of declarative event
data, not a claim of collision-validated biomechanics.

**Catch/release gesture:** both stage paths now carry the throwing hand and club
upward and inward together. A pass releases at a `0.14 m` lateral lane with the
physical seam grip at approximately `1.01 m` high (belly-button region), then
arrives in a wider `0.34 m` catch lane. The detailed physical path remains the
source of truth for the four canonical cards; the generic adapter mirrors the
gesture for visual consistency.

**Verified local state:** the full web-simulator suite passes 88/88, including
all 48 cards at multiple 3D sample times, exact inventories, the direct Throw
button contract, absence of the old Passing canvas, and the new release/catch
geometry. Desktop and 390x844 browser checks rendered both a detailed
two-person card and a schedule-driven five-person star without console
diagnostics or horizontal overflow.

**Verified publication:** site commit `2721d6b` reached GitHub Pages status
`built`. Cache-busted public responses for <https://luk.ec/glow/?v=2721d6b>
and <https://luk.ec/passing-lab/?v=2721d6b> match the staged files byte for
byte; the Passing bundle plus physical and generic model modules also match.
The public mobile browser canary selected the five-person 3-count star as a
schedule-driven stage with five performers and fifteen clubs, then selected
Glow's Loftie button directly; both pages reported no console diagnostics and
Passing had no horizontal overflow.

## 2026-08-04 PDT result: physically soaked Motion Lab V6 restored to all three named clubs

Luke asked to put the best known patterns back on the clubs. This was a
**WASM-cartridge rollout, not an ESP32 firmware flash**: all three remain on
the established stable 1.2.0 base image. The newer 6,062-byte V6 source build
is still an experimental physical candidate, so this rollout deliberately used
the earlier, physically soaked V6 binary recovered read-only from Club 2's
existing `/scripts/motion-lab-v6.wasm`: 5,216 bytes, SHA-256
`151206b301b9359b80b0b3841f35511f36862bf1dff62f26abda433350ff0180`.

**Scoped targets and prior files:** credential-safe preflight positively
identified Clubs 0/B and 1/C as healthy stable-1.2.0 devices with readable
motion and 32 LEDs. Club 0's existing `motion-lab.wasm` (3,997 bytes,
`a1b80729…`) and Club 1's existing `motion-lab.wasm` (3,992 bytes,
`3e11d901…`) were retained. Neither had a `motion-lab-v6.wasm` file before
the initial rollout. Club 2/A supplied the read-only V6 file and already held
that exact artifact; its prior `motion-lab.wasm` was also retained.

**Per-club acceptance:** each target received the same named
`motion-lab-v6.wasm`, then independently returned the complete loader chain:
file read at 5,216 bytes, launch, `init / update / stop`, `Calling init`, and
the `6000` initial Demo marker. Later advancing `60xx` markers proved the
running update loop. After a `Settings saved` acknowledgement for
`scriptAtLaunch=motion-lab-v6`, each club was restarted with an attached
WebSocket; the restart disconnect, HTTP reconnect, exact post-restart file
readback, and a fresh post-boot Demo marker were all observed. Diagnostic debug
forwarding was disabled after every capture.

**Physical correlation:** a direct local USB-camera preview (closed without
recording) showed all three clubs changing cyan, purple, and pale-warm fields
over a 12-second interval, qualitatively consistent with V6's automatic Demo
progression. This is supporting visual evidence only; the loader and
post-restart runtime markers are the acceptance evidence.

**Club A completion:** after Clubs B and C, only Club A was connected. Its LAN
identity was positively matched without exposing identifiers; no CP2102 USB
bridge was present, so the safe network path was used. Its existing exact V6
file was loaded without another upload, returned the complete loader chain and
a later `6002` marker, and then received the explicit saved-startup setting.
A socket-attached restart produced a disconnect, immediate reconnect, exact
5,216-byte post-restart readback, and fresh `6003` marker without a manual
load. A final doctor check reported stable 1.2.0, readable motion, 32 LEDs,
full battery/charging, and a calibration profile. Debug forwarding was disabled
after each capture.

No firmware erase/flash, Wi-Fi, identity, global-brightness, BenTo, or raw
serial command was used. Club A needed no file upload or base-image replacement;
its already-present V6 cartridge was explicitly reloaded, persisted, restarted,
and verified. All three named clubs now start the known-soaked V6 cartridge.

## 2026-07-21 16:04 PDT decision: direct three-club WASM deployment does not require BenTo

**Verified existing path:** stable 1.2.0 accepts a `.wasm` multipart upload over
HTTP into `/scripts`, then accepts OSC commands to enable the Script layer and
load the named module. `tools/load_club_script.py` already performs that
single-club workflow without BenTo, listens to the club's own WebSocket debug
stream, requires both a file-read marker and an init/run marker, and only writes
`scriptAtLaunch` plus saved settings when `--persist` is explicitly requested.
This changes the cartridge file/runtime, not the ESP32 firmware image.

**Parallel conclusion:** the three clubs expose independent HTTP, OSC, and
WebSocket servers, so one host can coordinate three deployments concurrently.
The current helper is single-target; a three-target coordinator is not yet
implemented or physically tested. It should use a transaction-like barrier:
preflight all three, upload/load/verify the already-canary-accepted artifact in
parallel, persist only after all three pass, then clean-restart and verify each
club with bounded concurrency or staggered restarts. A first-ever artifact still
gets a one-club canary before group rollout. There is no true cross-device atomic
commit, so a failed pre-commit run must leave the prior startup cartridge saved
for restart rollback. No club, network, BenTo, or host setting changed during
this source/tooling review.

## 2026-07-20 15:42 PDT result: TP-Link wired show-LAN connection is not up yet

**Verified read-only observation:** after Luke connected the proposed USB-C
Ethernet path to the Archer C4000, macOS still reported only the existing home
Ethernet and Wi-Fi interfaces as active. The existing CalDigit TS3 Plus Intel
Ethernet interface was enabled but had no carrier, no negotiated media, no DHCP
lease, and no route. The enumerated USB device tree did not contain a USB
Ethernet product, and the Mac had no TP-Link/show-LAN interface in its active
network state.

**Inference:** the new adapter is not enumerating, or there is no physical link
between the relevant Ethernet port and the router. This is not yet a router or
DHCP diagnosis because layer-one carrier is absent. Next check: fully seat the
USB-C adapter at the Mac, power the Archer, and connect the cable to one of its
yellow LAN ports; then re-read interface carrier before changing any network
settings. No router, Mac network, club, firmware, BenTo, USB, or Wi-Fi setting
was changed during this inspection.

## 2026-07-20 15:30 PDT result: compact Motion Lab controls remain available while scrolling

**Verified implementation:** Page, **Move it**, Activity, Throw, Roll, and Flip
now live in one `position: sticky` toolbar at the top of the Motion Lab. The two
pose fields remain side by side but shrink from 210-pixel stages to 88 pixels
(84 pixels at the phone breakpoint); secondary pose instructions and markers
are hidden while the angle readouts remain. On phones the four general controls
use a bounded two-column grid. Pattern tiles and the in-place Juggle preview use
toolbar-aware scroll margins so navigation does not place them underneath the
sticky controls.

**Verified validation and deployment:** all 59 web tests pass, including a new
compact/sticky/mobile layout contract. The exact WASM remains unchanged. The
generated 714,638-byte standalone has SHA-256
`c16cc8bea3830259a3c5d6876e01d4f6232293a4e08f51a7f8f428f9c1e474f3`.
Site commit `470e425` reached Pages status `built`; the cache-busted response at
<https://luk.ec/glow/?v=470e425> matches that size/hash and contains the sticky
toolbar, compact pose height, and scroll clearance. No physical club, firmware,
BenTo, USB, serial, or network state changed.

## 2026-07-20 15:17 PDT decision: `/glow/` publication is part of Motion Lab completion

Luke tests Motion Lab at <https://luk.ec/glow/>. Future Motion Lab changes are
not complete at a local build: unless explicitly requested as local-only work,
the handoff must include a pushed `lukec.github.io/glow/index.html`, matching
GitHub Pages status `built`, and a verified cache-busted public response.

## 2026-07-20 15:11 PDT result: Motion Lab now derives Activity and per-club juggling sensors

**Verified prior limitation:** before this revision, Roll Auto and Flip Auto were
independent, the Activity slider was unrelated to either pose control, and the
Juggle view copied one selected RGB frame to all three moving meshes. Club
position changed, but that position was not fed back into the lighting program.

**Verified implementation:** a top-level **Move it** button now starts or stops
Roll Auto and Flip Auto together; the independent buttons remain available.
Manual Roll/Flip changes and automated angular change drive the displayed
Activity value, which decays after motion. Directly moving the Activity slider
returns it to manual mode. The Juggle view now runs three independent exact-WASM
instances, or three independently evaluated Web Studio frames. Each receives
its own simulated Roll, projected Flip angle, Activity, and held/airborne Throw
State from the same cascade pose used to render that club.

**Model boundary:** those are simulated sensor values, not measurements from a
physical IMU. The cascade supplies a single-throw state while airborne, a held
state in the hand, high airborne/low held Activity, and an original modest axial
roll model: each club has a stable starting face plus up to 38 degrees of
handed twist during flight. Other throw classifications and physical roll
statistics remain unmodelled.

**Verified validation and deployment:** all 58 web tests pass, including pose
continuity, axial-roll/quaternion agreement, combined controls, Activity
derivation, three preview hosts, and per-club sensor routing. The exact WASM is
unchanged at 6,062 bytes. The generated 713,946-byte standalone has SHA-256
`a01ca338e9154592c984f4c8a7edf82cbc0927729682c815f11ba99dc8e52b51`.
Site commit `4fc70bf` reached Pages status `built`; the cache-busted response at
<https://luk.ec/glow/?v=4fc70bf> matches that size/hash and contains the new
controls and routing. No physical club, firmware, BenTo, USB, serial, or network
state changed.

## 2026-07-20 09:51 PDT result: Juggle preview now opens beside the chosen effects

**Verified software result:** pressing **Juggle** no longer reveals the single
preview at the top of the Motion Lab. The preview is moved into the pattern grid
immediately after the selected effect's visual row, spans all columns, and uses
nearest-edge scrolling only when needed. The row endpoint is computed from the
currently rendered CSS columns, so a two-column phone layout and four-column
desktop layout both keep the selected pattern and preview together. Closing the
preview leaves the user at the same part of the page.

**Verified validation and deployment:** all 55 web tests pass. The generated
708,510-byte standalone has SHA-256
`7da4f568a2219f8f08b0a2bc6b53a89b9571c00013c14bb57b5c835e063da463`.
Site commit `73089e4` reached Pages status `built`; the cache-busted response at
<https://luk.ec/glow/?v=73089e4> matches that size and hash and contains the
nearby-preview placement logic. No club, firmware, BenTo, USB, serial, or
network state changed.

## 2026-07-19 21:56 PDT result: twelve authored theme collections are ready in Motion Lab

**Verified software result:** Motion Lab now keeps P1-P5 as the exact 6,062-byte
WASM cartridge and adds a separate **Web Studio sketches** group containing 12
authored theme collections and 78 effects. The pages are Lightning Storm,
Fire/Furnace, Bioluminescent Ocean, Toxic Reactor, Arcade Power-Up, Disco,
Haunted, Solar Sunset, Matsuri Night, Traffic/Racing, Candy/Unicorn, and Fire
and Ice. Collections deliberately contain six or seven effects rather than an
eight-by-theme matrix. The shared 3D gallery hides unused tiles, keeps one
WebGL/bloom pipeline, applies common Roll/Flip pose to every visible club, and
retains the selected-effect three-club **Juggle** view.

**Verified validation:** all 54 web-simulator tests pass, including every theme
at multiple times and sensor states, bounded RGB output, a colored visibility
floor on all 32 entries, deterministic frame generation, variable page counts,
and explicit Activity/Roll/Flip/throw reactions. The generated standalone is
707,660 bytes with SHA-256
`83b4fb10e71a953873fbdf35d8475137765bdd50be9ca8de64b90545ca3b5ae6`.
The exact WASM is unchanged at SHA-256
`de23c41a1e18c43f8172666d6c503cc8df16639cb7b659de106622b4559a5a67`.

**Verified deployment:** site commit `bb81260` reached GitHub Pages status
`built`. The cache-busted response at <https://luk.ec/glow/?v=bb81260>
returned 707,660 bytes and SHA-256
`83b4fb10e71a953873fbdf35d8475137765bdd50be9ca8de64b90545ca3b5ae6`,
exactly matching the generated source artifact; it contains the Web Studio
selector and theme labels.

**Boundary:** the 78 new effects are browser sketches, clearly labelled as not
yet on the club. Their dramatic and audience-readable qualities are creative
hypotheses until reviewed in the simulator and then physically canaried. No
club, firmware, saved startup, BenTo, serial, USB, or network state changed.

## 2026-07-19 21:36 PDT result: camera-fit optics are now practical; Motion Lab is dark by default

**Verified physical reference:** Luke reports all three clubs are connected to
and powered by the new USB hub. The rearranged private OBSBOT capture shows all
three nearly end to end. It clearly separates smooth, nearly source-free body
diffusion from overlapping circular handle lobes; white/translucent knobs and
caps receive adjacent color, and the clubs cast strong colored light onto the
desk, wall, and each other. macOS still enumerates only two CP2102N serial data
bridges, so three power links but only two data links are currently proved.

**Verified Motion Lab change:** the shared gallery/cascade renderer now caps
neutral shell/key/fill illumination at a low dark-rehearsal level. Powered LEDs
dominate the image, while knob and cap use pale semi-translucent materials rather
than dark gray. Gallery and P1E2 juggling views rendered correctly in browser
with no warning/error logs. The web suite passes 49/49 tests. The exact WASM is
unchanged at 6,062 bytes and SHA-256
`de23c41a1e18c43f8172666d6c503cc8df16639cb7b659de106622b4559a5a67`;
the rebuilt 676,193-byte standalone has SHA-256
`d8325665b27bb183bd001505f3b09e316f7969b4eeeedc323f590840b9bad136`.

**Design direction:** fit the next optical model from locked camera captures,
not further hand-tuned guesses. Capture known transient R/G/B/W levels,
handle/body sources, neighbour mixing, police boundaries, and fixed Roll angles;
fit separate handle/body lookup responses plus cheap colored surface spill; then
validate on held-out patterns. Static optics precedes high-frame-rate motion.

**Effect direction:** stock Vision gaps now recorded include graceful twinkle,
bubbles/cellular/nebula textures, expansion/bounce, hidden-color reveal,
lattice/spokes/pinwheels, and layered passive/active/zero-G transformations.
Candidate theme pages include Lightning Storm, Fire/Furnace, Bioluminescent
Ocean, Toxic Reactor, Arcade Power-Up, Disco, Haunted, Solar Sunset, Matsuri,
Traffic/Racing, Candy/Unicorn, and Fire-and-Ice. No club firmware, scripts,
settings, serial state, or BenTo transport changed in this investigation.

## 2026-07-19 21:18 PDT result: the bench can now see clubs and connect several by USB

**Verified hardware:** AVFoundation identifies the new camera as an OBSBOT Meet
SE, and a 1920×1080 still capture succeeded. The settled image shows three
overlapping illuminated club bodies—violet/blue, pale yellow/green, and warm
red/orange at that instant. The framing is close and partial, so it is already
useful for optical comparison but is not yet a whole-club tracking view.

**Verified USB state:** the new hub enumerates separate USB 2 and USB 3 branches.
At inspection time, the camera and two CP2102N club bridges were present on its
USB 2 side, and macOS exposed two club serial callout devices. The exact USB
identifiers and captured frames remain only under ignored private paths. The
assistant did not open either serial port, send commands, start BenTo, or change
club state.

**Open gate:** three clubs are visible to the camera, but only two club data
connections are currently proved. If all three were meant to be data-connected,
the third cable/port needs a simple enumeration check. High-frame-rate capture
and dropped-frame behavior on the shared hub are untested. The next useful setup
step is wider framing that includes complete clubs, followed by a short
100/150-fps mode test before building tracking software.

## 2026-07-19 21:13 PDT result: Motion Lab renders the diffuser, not an LED rail

**Verified review input:** Luke's P1E2 screenshot showed one straight row of
bright circular points through the body and a blown-out white handle band. Luke
reported that the physical club would never look like that. The exact cartridge
still outputs a broad moving white/pink rider over violet, so the screenshot was
evidence of a rendering failure rather than proof that P1E2's firmware pattern
was physically bad.

**Verified software result:** the shared 3D shader no longer pins one logical
source rail to the camera. It gives every linear axial entry a fixed opposed
source direction in club coordinates, widens body diffusion, weakens body cores,
and derives broad HDR glow from the colored diffuser. Browser QA shows P1E2 as a
smooth violet shell with a broad white/pink transition; limited point definition
remains only in the thinner handle. Manual Roll from `0°` to `90°` changes the
source-facing optical result, and manual Flip from `0°` to `90°` rotates every
gallery club from upright to horizontal. The web suite passes 48/48 tests. The
exact 6,062-byte WASM is unchanged; the rebuilt standalone is 675,538 bytes with
SHA-256
`628800e635279efdcdc78403d8bd5e3eea1a0cacf2c4419fddd9f3680d87ea03`.

**Inference and open gate:** the opposed pair is a useful optical hypothesis,
not a measured PCB/index map. The Motion Lab intentionally preserves its
linear-32 effect semantics instead of adopting Glow DSL's `paired16-v0` layout.
A locked-camera physical comparison remains authoritative for diffusion and
brightness. This revision is local and has not replaced the public artifact.
The previous root-route deployment at commit `9774c6d` is now verified `built`,
and <https://luk.ec/glow/?v=9774c6d> returns HTTP 200 with its expected prior
SHA-256 `fdf4f5ed3e773d6d8ec573bea2a7f1d01c18398d030a50bf3a4ffdb4538f5d68`.
No club, firmware, BenTo, network, or saved device state changed.

## 2026-07-19 16:41 PDT result: `/glow/` is the sole Motion Lab route in source

**Verified repository state:** deployment commit `9774c6d` makes the validated
Motion Lab artifact the public site's `glow/index.html` and deletes
`glow/motion/index.html`. The two intermediate direct-publish commits were
superseded before Pages finished them. The final site repository is clean,
matches `origin/master`, and the root artifact SHA-256 is
`fdf4f5ed3e773d6d8ec573bea2a7f1d01c18398d030a50bf3a4ffdb4538f5d68`.

**Deployment state:** GitHub Pages build `1104356677` for the final commit is
queued with status `building` and zero build duration. GitHub's public status
API reports Pages operational, but the live CDN still serves the previous
build. Do not call <https://luk.ec/glow/> updated until its response matches the
source hash. No club, BenTo, firmware, or network state changed.

## 2026-07-19 16:23 PDT result: every Motion Lab effect is now a live 3D club

**Verified software result:** the local Motion Lab now presents the selected
page as eight square tiles containing complete simulated Creator Clubs with the
shared internal-source/diffuser shader and HDR bloom. All eight tiles use one
WebGL context, one scene, and one post-processing pipeline. They receive the
eight exact WASM frames and the same Roll/Flip pose. Choosing **Juggle** stops
painting the tile gallery and renders the chosen frame on the separate
three-club cascade; closing it resumes the gallery.

Roll and Flip now have independent **Auto** buttons. Browser interaction QA
verified Roll Auto changes only Roll, Flip Auto changes only Flip, both can run
together, and manually changing Roll stops only Roll Auto while Flip Auto keeps
running. P5 switched to all eight Police names with one gallery canvas, eight
simulated clubs, and no horizontal overflow or browser warning/error at the
normal lab width. The web suite passes 47/47 tests. The exact cartridge remains
unchanged at 6,062 bytes and SHA-256
`de23c41a1e18c43f8172666d6c503cc8df16639cb7b659de106622b4559a5a67`;
the rebuilt standalone page is 674,653 bytes with SHA-256
`fdf4f5ed3e773d6d8ec573bea2a7f1d01c18398d030a50bf3a4ffdb4538f5d68`.

**Deployment and hardware boundary:** this revision is local and is not yet at
the public `/glow/motion/` route. No club, firmware, BenTo, or network state
changed.

## 2026-07-18 20:51 PDT result: unified Motion Lab published

**Verified:** the standalone unified Motion Lab was copied unchanged to the
existing `lukec.github.io` GitHub Pages repository as `/glow/motion/index.html`.
Site commit `58a6422` reached Pages status `built`. The cache-busted public URL
<https://luk.ec/glow/motion/?v=58a6422> returned HTTP 200, the expected
`Creator Club Motion Lab` title, and SHA-256
`2daf1ca04f32d56bfe492395673c38e44715e63593f41260cf6aad6d09a2ed8b`,
which exactly matches the generated local page.

This deployment contains the repaired full club shells, shared motion
controls, simultaneous eight-effect page view, and P5 Police effects. It did
not change the root Glow Lab, the older focused Police Lab, the site's CNAME,
or any club/BenTo/device state.

## 2026-07-18 12:47 PDT result: one exact-WASM Motion Lab now contains P5 Police

The cap-only 3D regression was a fragment-shader compile failure, not missing
club geometry. A generated GLSL expression emitted `float * 4`; WebGL ES does
not implicitly convert that integer literal. The shell shader failed while the
separate opaque cap and knob materials kept rendering. The generator now emits
decimal float literals, and browser QA shows complete illuminated shells with
no shader warning or error.

Motion Lab V6 now contains five pages of eight effects. P5 implements the eight
Police Lab patterns directly in AssemblyScript, so browser and on-club behavior
come from the same 6,062-byte WASM artifact rather than parallel JavaScript and
WASM interpretations. The exact artifact SHA-256 is
`de23c41a1e18c43f8172666d6c503cc8df16639cb7b659de106622b4559a5a67`.
Final-WASM simulation passes all 40 addresses, the complete 400-second Demo
traversal, click navigation through P5 and wrap, visibility, memory, and init
contracts.

The unified browser Motion Lab puts Roll, Flip, Activity, Throw State, Auto
Motion, and Page at the top. It runs eight isolated instances of that exact
WASM and displays every effect on the selected page simultaneously. Each row
can move one shared three-club juggling preview beneath itself. Browser QA
verified eight rows, one shared canvas, no horizontal overflow at the normal
lab width, and no warnings/errors. The complete web suite passes 46/46 tests.

The HDR shader now explicitly decodes sRGB LED bytes before emission, compresses
secondary emission channels to resist tone-map whitening, and uses a stronger
bounded shell-tint response. Roadblock renders as visibly red/blue luminous
clubs rather than caps-only or a white seam, but physical comparison remains
the authority for optics.

Club 2 was offline/unreachable during the credential-safe doctor check, and no
USB club was visible. The new artifact is therefore built and hardware-ready
but **not installed on any club**. No firmware, saved startup, BenTo state,
network setting, or public deployment changed.

## 2026-07-18 12:45 PDT result: private portable show repository is live

**Verified:** GitHub repository `lukec/clubs-private` exists with visibility
`PRIVATE`, default branch `main`, and initial commit `98767cb`. The initial
bundle contains 12 canonical `.bento` projects across six music-show
directories, the six referenced audio files, and their generators, analysis,
and show notes. Git LFS tracks every audio file; a fresh remote clone downloaded
all six LFS objects and passed the repository's portability verifier with 91.8
MiB of media.

**Privacy and portability boundary:** BenTo autosaves, scratch projects, and a
stale manual copy containing a local network address were excluded. Every
included project parses as JSON, has an empty saved-prop item list, and resolves
its audio through a relative path inside its own show directory. No club,
BenTo, firmware, audio playback, or network state changed.

**Working state:** `clubs-private` is the complete cross-Mac personal
performance bundle; this public repository remains the durable record for
shareable engineering, architecture, and sanitized show development. Git LFS
must be installed and initialized before cloning on another Mac. Private Git
hosting supplies versioning and transfer, not redistribution or
public-performance rights and not the sole backup for irreplaceable media.

## 2026-07-18 12:30 PDT result: red/blue boundaries no longer expose a white seam

Luke's follow-up showed that **Roadblock 50/50** also looked white in its
middle even though its source frame contains only red and blue. This ruled out
white-source intensity as the complete explanation. The shader was averaging
overlapping saturated hues into a lower-amplitude purple, then using a weak
diffusion-coverage value to mix that pale result over the milky white shell.

The renderer now keeps intensity in the coverage channel and renormalizes the
mixed RGB direction back to a saturated hue. Diffusion tint coverage uses a
bounded exponential response (`1 - exp(-4c)`) so a red/blue boundary colors the
plastic rather than exposing a bright white seam. The rebuilt Police Pattern
Lab passes all 45 tests. White-source restraint remains at the previous `0.78`
pending review of this more fundamental correction; the logical patterns are
unchanged and this revision is not yet published.

## 2026-07-18 11:29 PDT result: white scanner no longer bleaches the police split

Luke's physical comparison found that the Police Pattern Lab was close but the
moving white band still made the juggled clubs look mostly white. That is not
how the real clubs behave, particularly through the thinner handle. Inspection
found that the shader mixed nearby LED cores and their broad diffusion into one
average color before emission, so a few white LEDs desaturated a much larger
red/blue region.

The shared three-club shader now accumulates tight LED cores and diffusion halos
separately. The handle kernel is narrower and weaker than the body kernel, and
neutral-white HDR emission is restrained to `0.78` while saturated police red
and blue keep their existing hue-luminance compensation. The White scanner
source pattern is unchanged. The Police Pattern Lab standalone was rebuilt;
all 44 web-simulator tests pass and the page opens with no browser warnings or
errors. This is a perceptual correction, not measured photometry. Physical
review remains authoritative, and this revision has not yet been published to
`luk.ec`.

## 2026-07-18 result: Motion Lab has direct-manipulation Roll and Flip controls

The Motion Lab V6 emulator no longer represents its two orientation axes as
abstract horizontal sliders. Roll is now an end-on knob view: drag the circular
handle around the face, with `0°` at the top and signed clockwise/counterclockwise
values in the cartridge's `-180..180` range. Flip is a visible club silhouette:
drag around its field to point the body toward `0°` up, `90°` right, `180°`
down, or `270°` left. This makes upright/inverted and intermediate pose effects
legible before reading the light result.

Both widgets retain native range inputs as the interaction and accessibility
surface. Pointer capture provides mouse/touch circular dragging; keyboard arrow,
Home, and End behavior remains native; visible focus and `aria-valuetext`
describe the pose. Manual Roll, Flip, or Activity input disables Auto motion so
the user's value is not immediately overwritten. Auto motion updates the same
visual controls.

The WASM, sensor ranges, effect addresses, 50 Hz execution, and RGB output are
unchanged. The generated standalone page passes all 42 web-simulator tests.
Browser QA verified correct keyboard-to-visual synchronization, no console
errors, no horizontal overflow at a 390-pixel phone viewport, and two
343-by-200-pixel touch targets. Physical touch feel remains a phone acceptance
step. This revision has not yet been published to `luk.ec`.

## 2026-07-17 deployment: performance-tuned Police Pattern Lab is live

Only `glow/police/index.html` was copied into the existing `lukec.github.io`
deployment repository. Site commit `a71edb1` was pushed to `master`; the GitHub
Pages API reported that exact commit `built`. A cache-busted request to
<https://luk.ec/glow/police/?v=a71edb1> returned HTTP 200 and SHA-256
`a53da3067ec30103ef5b71398f336ce2326208d4699a3d76c737ec3ac8c44a29`, exactly
matching the checked-in generated study. The live response contains the 30 FPS
cap, dirty-RGB cache, paint containment, and zero-blur emission-ring markers.
No other public route, CNAME, Pages setting, club, firmware, BenTo state, or
network setting changed.

## 2026-07-17 result: Police Pattern Lab returns to a bounded 30 FPS render path

The first saturated-color correction accidentally made every one of the 256
gallery LEDs recalculate color conversion and rewrite three large blurred CSS
shadows on every browser animation frame. This was visibly slow even with the
3D juggling preview closed. The optical idea was sound, but applying a costly
diffusion effect independently to every thumbnail LED was the wrong layer.

The gallery now caps visual updates at 30 FPS, reuses its 32 RGB arrays, caches
the small set of color styles, and writes a DOM LED only when that LED's RGB
actually changes. Offscreen pattern rows use `content-visibility`, and each
strip contains its paint. The thumbnail glow is a zero-blur colored emission
ring plus fixed inset highlight; hue-luminance gain changes ring area without
asking the browser to rasterize 768 blurred shadows per frame. The selected 3D
preview retains the higher-fidelity HDR/bloom shader and shares the same 30 FPS
schedule, which is sufficient for effect selection rather than film output.

The standalone Police Pattern Lab was rebuilt and sanitized. The complete web
simulator suite passes 41/41 tests, including a regression guard against
per-frame blurred-shadow writes. No hardware or live BenTo state changed.

## 2026-07-17 result: saturated police colors now carry full simulated glow

Luke's physical observation is that full-power red and blue Creator Club light
are room-filling in a dark office, while the previous Police Pattern Lab made
white dominate them. Inspection found a renderer mismatch rather than a weak
pattern: screen-space bloom thresholded Rec. 709 luminance, so white received
three bright display channels while saturated red and blue often stayed below
the bloom threshold even at maximum RGB channel value.

The shared three-club shader now keeps RGB frames unchanged but normalizes the
HDR emission component by hue luminance before bloom, bounded to `12.5x` with a
`0.08` luminance floor. For the current police palette this gives white `1.0x`,
red `4.565x`, and blue `6.665x` emission gain. The Police Pattern Lab's compact
LED rows use the same gain to enlarge colored halos without changing the exact
RGB cores. The rebuilt lab therefore lets red and blue read as luminous sources
alongside white instead of as ordinary dark screen colors.

The complete web simulator suite passes 40/40 tests, including explicit
red/blue/white emission-parity and bounded-gain tests. This is a perceptual
correction grounded in Luke's physical observation, not a lumen calibration.
No club, firmware, BenTo state, or network setting was read or changed. A fresh
human comparison of **White scanner** against the real clubs remains the next
calibration step.

## 2026-07-17 result: BenTo Juggle Player previews complete song timelines with audio

`studies/bento-juggle-player/` is a new local browser rehearsal tool. Its
`tools/web-sim/src/bento-timeline.mjs` evaluator reads a supported subset of a
BenTo `.bento` sequence and produces three independent 32-RGB frames for
logical IDs `0`, `1`, and `2`. `bento-juggle-player.mjs` packages that evaluator
with the shared three-club renderer. The browser audio element's
`currentTime` is the master timeline clock, so Play, Pause, and Seek drive both
the light evaluation and the audio position rather than starting two unrelated
clocks.

The supported provider set is `solidColor`, `rainbow`, `strobe`, `point`,
`range`, `multipoint`, `ledRange`, and `noise`, with clip fades and BenTo's
reverse-order `Add`, `Alpha`, and `Mask` layer compositor. The evaluator mirrors
the source-backed physical stream rule: after clip/layer composition, each RGB
channel is multiplied by the final color alpha before conversion to an 8-bit
prop frame. Project/prop output brightness remains a separate final preview
gain; if it is absent, the source-backed BenTo default is `0.5`.

The included CC-licensed 60-second demo was regenerated from its checked-in
generator after two accidentally serialized physical prop records were found.
It now has an empty saved-prop list, and an automated fixture test enforces that
privacy boundary. User-selected `.bento` and audio files remain as browser
`File`/blob objects inside the tab; the player ignores saved physical prop
records and does not upload local files. Copyrighted audio is local-only and is
not copied into a generated or published page.

**Verified desktop/browser result:** the final web-simulator suite passes
38/38 tests. The self-contained player page is 601,279 bytes (including its
embedded 570,555-byte simulator bundle). A recorded Gettosinfonía V5
timeline-only stress benchmark was `0.086 ms/frame`; that measures evaluator
sampling, not audio decode, WebGL, display refresh, or physical output. Browser
checks verified Play advances audio and lights together, Pause holds them,
seeking is stateless, the CC demo's three-ID scene at `45.5s`, the local V5
three-role scene at `81.2s`, and no horizontal overflow at a 320-pixel viewport.

**Source-backed authoring correction:** BenTo Multipoint computes
`targetPos = speed*time + offset + id*numProps`, then phases the result by
`gap`. Therefore `numProps=1` is not inherently unison: IDs still differ when
`gap` does not divide one exactly. Gettosinfonía V5 uses Multipoint gaps `0.12`
and `0.16`, so its IDs can be phase shifted even though its validator accepted
`idOffset=0`, `numProps=1`, and disabled inversion as sufficient unison
evidence. Future validators must sample the actual provider for IDs 0/1/2 and
compare frames rather than infer unison from parameters alone.

**Known compatibility boundary:** prop filters, block effects, position remap,
parameter links/automation, explicit core/loop timing, and mixing multiple
audio clips are reported but not implemented. Noise is a deterministic visual
approximation because the exact Perlin helper is absent from the inspected
source snapshot. Juggling BPM is a fixed/user-set visualization input; the
player does not yet infer cascade tempo or choreography from the audio. The
browser is a rehearsal simulator, not BenTo, a show-network output, or proof of
physical fidelity.

No physical club, live BenTo state, firmware, network setting, or saved device
state was read or changed. The next show-authoring fix is to replace V5's
parameter-only unison assertion with rendered cross-ID checks before treating
all non-role Multipoint clips as synchronized.

## 2026-07-17 result: Glow Club Lab now has corrected geometry, editable source, and bounded HDR glow

The single-club experiment at `studies/club-lighting-lab/index.html` has been
revised around Flowtoys' published 515 by 82 mm envelope and official
straight-on product photographs. The shared geometry now has a gently widening
handle,
the late broad bulge of the Henrys Pirouette-derived body, a separate EVA knob,
and a broad blunt silicone cap. The published balance point is approximately
28 cm from the knob. The outline is an image-derived visual fit, not CAD or a
measured cross-section.

Roll and Flip are now independent nested transforms. Roll turns the source
pairs around the club's local long axis; Flip turns the complete prop end over
end around the published balance point. This removes the prior mixed Euler
motion that appeared to pivot around an arbitrary point. The optical model now
renders bounded HDR emission through selective screen-space bloom, so the
highest **Perceived glow** setting can show clipped cores and a strong aura
without calling the control lumens. The unpowered shell remains white.

The seven diagnostic frames are now visible and editable as data-only **Glow
DSL v0** programs. `layout paired16-v0` exposes `both`, `side-a`, and `side-b`,
bounded station selectors, exact color lists, `tile(...)`, and multi-stop
`ramp(...)`. The parser is limited to 8 KiB and never evaluates JavaScript.
This layout describes the lab's provisional 16 opposite-pair hypothesis; it is
not BenTo or firmware's working linear-32 source convention.

The same corrected shell, separate knob/cap, balance offset, and bounded bloom
are now used by the reusable three-club renderer. That renderer deliberately
preserves its established linear-32 working mapping, so this optical revision
does not silently reinterpret existing Motion Lab or police frames.

All 27 web-simulator tests pass, including byte-for-byte compilation of the
seven DSL presets and geometry invariants for the late bulge and separate blunt
cap. The generated pages are self-contained after removing the
visualization wrapper's optional unused `unpkg` scripts. Generation also fixed
a literal-replacement bug in `embed_preview.mjs`: minified `$&` text must be
inserted with a replacement function or JavaScript's string-replacement rules
can corrupt the embedded bundle.

**Brightness evidence boundary:** the public Creator configuration declares 32
SK9822 RGB packages and `LED_MAX_BRIGHTNESS 60`; Flowtoys markets 96
high-brightness LEDs. Counting three emitting dies per RGB package is a
plausible 32-times-3 explanation, not an explicitly documented convention. A
representative SK9822 datasheet gives bare-package optical/current ranges, not
measured output through these clubs. No lumen calibration is claimed.

**Publication state (verified):** the clubs repository remains the editable
source. Built artifacts were copied into the existing `lukec.github.io` site,
committed as `b0fb589`, pushed to `master`, and accepted by GitHub Pages. Live
browser/HTTP checks found no console errors and returned 200 with the expected
title at <https://luk.ec/glow/>, <https://luk.ec/glow/motion/>, and
<https://luk.ec/glow/police/>. The root page loaded only its own HTML; it made
no required runtime CDN request.

No physical club, BenTo project or state, firmware, network setting, or saved
device state was read or changed. The next optical gate remains a
locked-exposure physical photo series. Future publishes must repeat the Pages
build-status, public HTTP, and live-browser checks.

## 2026-07-17 result: single-club lighting and diffusion lab is ready

`studies/club-lighting-lab/index.html` is a new self-contained optics
experiment. It keeps one approximate 515 by 82 mm club stationary and compares
three rendering approaches over the same fixed source geometry: crisp direct
transmission, broad analytic shell diffusion, and a reference-oriented hybrid.
The default hybrid is tuned toward Flowtoys' official lit smooth-club photo:
individual round hotspots remain legible in the narrow handle while the larger
body becomes a broad, nearly continuous colored surface. The unlit molded shell
remains white rather than becoming black or clear.

**Source-backed construction:** Flowtoys says Creator and Vision props use the
same LED pixels and outside build. The official Vision specification gives a
polycarbonate shaft, special polyethylene-blend body, EVA knob, silicone cap,
515 mm length, and 82 mm maximum width. Flowtoys and Henrys tuned the molded
parts' translucency, material amount, light transmission, and weight; no source
found describes a separate diffuser film. The plastic parts themselves are
therefore the source-backed diffuser, while the shader's diffusion layer is
only a rendering abstraction.

**Observed versus inferred source geometry:** Luke reports two visible RGB
emitters facing outward on opposite sides of the club. The lab represents that
as 16 axial stations with two fixed opposite-facing sources, accounting for the
firmware's 32 controlled RGB entries. The fixed directions are important: club
Roll changes which face is toward the viewer rather than moving a hotspot to
the camera-facing meridian. The 16-station mapping, seven-station handle split,
source depth, and axial spacing remain a working hypothesis until photographed
or physically indexed.

Controls select seven diagnostic LED frames, change model, rotate the club,
auto-roll it, expose the shaft and paired sources in a cutaway, switch between
dark-venue and inspection lighting, and tune level, handle spread, body spread,
and exposure. **Copy settings** produces one terse line for low-token review.
The official photo stays an external reference link; its downloaded inspection
copy remains ignored and is not committed to this public repository.

Fourteen Node tests now pass: the prior eleven cascade tests plus three source-
layout invariants. The independently bundled lab is about 0.62 MB. Browser QA
found one canvas, 32 source indicators, working model/pattern/cutaway/inspection/
auto-roll/reset/copy controls, no horizontal overflow at exact 736- and
320-pixel content widths, and no warning or error logs. This verifies the tool,
not its physical accuracy. No club, BenTo state, firmware, network setting, or
saved device state was read or changed.

**Next optical gate:** photograph one isolated handle pair and one isolated
body pair with locked exposure, focus, white balance, distance, and club Roll
angles. Fit separate axial and circumferential response kernels from those
images, then use the accepted hybrid preset in the shared three-club renderer.

## 2026-07-17 result: 3D cascade now uses diagonal throw planes and point-source LEDs

The first reusable juggling preview is implemented in `tools/web-sim/`. It uses
pinned Three.js `0.185.1`, an original siteswap-`3` motion model, and one
release/full end-over-end turn per beat. After Luke's first visual review, the
motion was revised from a screen-parallel approximation to two genuine 3D
vertical throw planes aimed front-left/front-right at approximately 45 degrees.
Flight moves from the rear of one hand path to the front of the opposite hand.
During the catch/throw dwell, the club points down, scoops front-to-rear, and
changes heading into the next plane. Quaternions now drive the rendered pose.

Each club is one capped opaque-white lathed shell. A 32 by 1 RGBA data texture
supplies logical RGB plus peak intensity to a shell shader, which renders tight
round cores and local handle/body-specific diffusion. This visually represents
internal emitters beneath a diffuser; it is not measured emitter depth or
optical transport. An unlit frame stays white. The prior continuous additive
light-band look is gone. The current 16/16 handle/body placement, shell
dimensions, and diffusion constants remain provisional. The fixed audience
camera and public `setView()` remain.

`studies/police-pattern-lab/index.html` now has a **Juggle** action beside every
candidate. It creates only one WebGL renderer, moves that shared preview under
the selected row, and feeds the exact RGB frame already shown in that row to all
three moving clubs. `studies/motion-lab-v6-emulator/index.html` has a matching
**Juggle** toggle and feeds it the exact current frame produced by the embedded
5,216-byte V6 WASM. V1 deliberately clones one frame across all three clubs; it
does not yet claim to simulate three independent sensor-reactive props.

**Verified desktop result:** eleven deterministic cascade tests pass, including
release cadence, six-beat repeat, 45-degree plane membership, quaternion-to-pose
agreement, catch/next-release position and orientation continuity, down-pointing
dwell, and single-turn rotation.
Both generated standalone pages are under 0.7 MB. Browser checks at 736 and 320
CSS pixels found one canvas per open preview, eight police **Juggle** controls,
live exact-WASM output, responsive narrow layout, and no runtime log errors.
Visual checks showed a club pointing down in the hand path, foreshortened
diagonal crossings, solid-white unlit shell areas, distinct point cores, and
local red/blue diffusion in the Police **Braided bands** canary.

The full Three.js MIT notice is retained beside and embedded into generated
pages. No JuggleCraft, Passist, WebGL Juggler, or other simulator source or asset
was copied. No club, firmware, saved setting, network state, or BenTo state was
read or changed.

**Next implementation slice:** compare the approximate paths, club proportions,
LED spacing, and diffusion against slow-motion video or measured real hardware.
Then run three isolated V6 WASM hosts with phase-shifted pose inputs and add an
independent axial-twist model before calling Roll effects movement-accurate.
Audience/orbit camera controls can follow without changing the effect contract.

## 2026-07-17 result: genuine browser club simulators found

The strongest historical match for the remembered JavaScript simulator is
[WebGL Juggler](https://www.brianapps.net/juggle/webgl.html). Its live pattern
menu includes multiple explicit three-club patterns and it renders true club
geometry and rotation. Its linked older Juggler3D/JuggleSaver C++ source has a
permissive notice and the enclosing JMLib code is Modified BSD; the served
minified JavaScript itself does not show a license notice, so any reuse should
port from the explicitly licensed source and retain attribution.

[JuggleCraft 3D](https://kinetara.github.io/app/) is the strongest modern visual
reference. It supports clubs, one/two/three-spin plus heli/flat rotation,
multiple camera views, trails, routines, and choreography. It is proprietary
and its published terms prohibit extracting or adapting its code, so it is a
visual reference rather than a project dependency.

[Passist](https://passist.org/) is the strongest modern source-visible technical
reference. Its current Svelte/Three.js GPLv3 source has a true club mesh,
ballistic paths, explicit spin axes/counts, quaternions, dwell motion, and a
reusable animation widget. Directly copying it would not preserve this
repository's simple MIT-only licensing. Gunswap was also inspected: despite
declaring a club enum,
its current renderer makes only non-rotating spheres and its repository has no
explicit license. Juggling Lab and SiteswapSim are valuable trajectory/notation
references but do not provide a true rotating club renderer.

No club, BenTo state, firmware, or saved setting changed during that research.
The implemented original Three.js PoC is now described in the newer section
above; it did not require porting the Juggler3D engine. Club 2's V6 hardware
state and manual gate below remain current. Full findings and evidence labels
are in `docs/simulation-and-pattern-lab.md`.

## 2026-07-17 result: Motion Lab V6 is running on Club 2; manual visual gate is open

Luke connected physical Club 2 over USB and explicitly invited the hardware
test. Credential-safe preflight identified the single USB serial club, stable
1.2.0, 32 LEDs, readable motion, 100% battery while charging, and firmware-global
brightness `0.50`. Clubs 0 and 1 and BenTo were not changed.

The exact 5,216-byte V6 artifact, SHA-256
`151206b301b9359b80b0b3841f35511f36862bf1dff62f26abda433350ff0180`,
was uploaded as the new, separate `motion-lab-v6` file and saved as Club 2's
startup cartridge. The older `motion-lab` file was preserved. A clean boot read
the exact 5,216 bytes, found `init / update / stop`, and began Demo without a
panic or low-stack stop.

The 328-second physical soak remained alive, wrapped to P1E1, and produced no
panic, low-stack message, or unexpected reboot. The serial address evidence is
still **inconclusive**: it reported E1 through E7 on every page but omitted E8
on all four pages, then reported the following page and final wrap. A corrected
passive timing probe showed Page 4 E1 through E7 arriving exactly ten seconds
apart and left the expected extra ten-second E8 slot before wrap, but logical
slot timing alone does not prove the E8 renderer's physical output. Do not call
all 32 effects hardware-accepted yet.

Serial-injected button presses again proved invalid for navigation: short and
longer injected pulses grouped unpredictably and repeatedly reset P1E1. No
crash occurred, cleanup restored physical button polling, and the supported
soak tool no longer injects button state. The first-button exit and navigation
are now explicitly manual physical gates.

The clean boot also exposed saved ESP-NOW/channel-scan mode and temporarily
removed ordinary Wi-Fi. Source-backed serial recovery set
`comm.espnow.enabled=false`, `buttons.button1.enabled=true`, and
`buttons.button1.canShutDown=true`; the correct serial trigger
`settings.save` acknowledged the save. One clean restart then loaded V6 again
without panic/low-stack output, stopped the channel scan, and restored Wi-Fi and
motion telemetry. Narrow filtered readback verifies ESP-NOW false, button enabled,
shutdown ownership true, and saved startup `motion-lab-v6`. Club 2 is currently
running V6 Boot Demo, reachable, charging, and waiting for Luke's physical
first-button/P1E1 twist observation.

`tools/club-lab soak-effects` now accepts an explicit artifact, script name,
page/effect counts, address base, and computed soak duration. The V6 invocation
is documented in `docs/club-lab-cli.md`. Its strict address gate remains
inconclusive until the missing E8 diagnostic evidence is fixed; it does not
silently weaken that requirement.

## 2026-07-16 result: Motion Lab V6 and two no-club iteration tools are ready

At the end of the offline 2026-07-16 build, V6 had not yet been uploaded. It
contains four pages of eight effects: repaired Roll vocabulary, literal/broad
Flip vocabulary, stronger Energy mappings, and a focused Flight/classification
page. The 2026-07-17 section above supersedes that deployment state.

V6 targets stable 1.2.0 with shallow RGB-only AssemblyScript. It uses no packed
color, host HSV, arrays, allocation, recursion, `Math.*`, or post-build byte
patch. AssemblyScript 0.27.37 O1/S2 produced a 5,216-byte artifact, SHA-256
`151206b301b9359b80b0b3841f35511f36862bf1dff62f26abda433350ff0180`,
well inside the 16,000-byte limit.

`tools/club-wasm-sim/` is now a reusable final-artifact simulator. It enforces
the exact stable import surface, module and memory limits, hardware-free
`init()`, 50 Hz execution, valid RGB/index writes, and cartridge-defined
semantic/visibility tests. V6's exact artifact passed all 32 renderers for ten
seconds each, Roll/Flip isolation, activity contrast, direction dead band,
rest stability, six class colors, Flight differences, full 320-second Demo,
single/double/triple/long-hold/page-wrap controls, and `stop()` IMU cleanup. The
generic 30-second scenario used zero linear-memory bytes; repeated desktop p95
results remained below 0.025 ms. Browser/Node timing is a regression signal and
does not model ESP32 Wasm3 timing.

Two browser tools are ready:

- `studies/motion-lab-v6-emulator/index.html` embeds and executes the exact V6
  WASM with Page/Effect, Roll, Flip, Activity, Throw State, and Auto Motion
  controls. It now also sends the exact current frame to the shared three-club
  **Juggle** preview. Automated browser QA found 32 rendered LEDs, responsive
  controls, correct 5,216/16,000 and 0/4,096 status, no JavaScript errors, and
  no horizontal overflow at 736 or 320 pixels.
- `studies/police-pattern-lab/index.html` compares eight synchronized police
  candidates, returns terse selections such as `Police picks: 1, 3, 6`, and
  moves one shared three-club **Juggle** preview beneath the selected row.
  Browser QA found eight rows/256 LED marks, working selection and Juggle
  controls, no JavaScript errors, and no 320-pixel overflow.

Neither desktop tool reproduces the installed binary's historical 255-word
native-stack guard, Wasm3 translation, BNO055 behavior, diffusion, motion blur,
radio scheduling, or downstream boot brightness. The 2026-07-17 Club 2 canary
above is now the authoritative physical state. BenTo remains on Gettosinfonía
V5 stopped at zero with no props saved or assigned.

## 2026-07-16 result: Gettosinfonía Organic Collage V5 is loaded stopped

Luke's V4 physical review found the show merely okay: the unconstrained
spectral hue wheel produced ugly colors, and the recurring low "blurpy" voice
needed to lead the visual response. Published context now gives the revision a
stronger vocabulary than modem metaphors alone. A contemporary Emol review of
*Collage Binario* describes digitally cut/transformed/reassembled structures
that retain unusual organic substance and move between dreamlike and danceable.
Resident Advisor's DJ Raff biography describes low-slung dance music,
percussive patterns, hypnotic melodies, atmospheric moods, and sample-led
storytelling. These are album/artist descriptions, not proof of the exact
instrumentation in Gettosinfonía.

The new `analyze_bass_voice.py` measures the exact authorized WAV four times per
95 BPM beat. The recurring 35-180 Hz voice clusters mainly around 75-80 Hz,
with repeated lower answers near 50-55 Hz. Calling it synth bass remains an
inference; frequency, energy, timing, and contour are verified measurements.
The analysis contains 820 quarter-beat samples and SHA-256
`db9e145266bbb9711d0a45f9c7432c81704c68d9f4b0e84104b90ce332c4c1b8`.

V5 removes the global hue wheel. Each ordinary chapter interpolates only
inside a coherent three-anchor indigo/navy, cyan/teal,
violet/magenta/coral/pearl family. Red, blue, and white are reserved for the
police scenes. There are 368 broad additive bass blooms whose vertical position,
size, brightness, and section-constrained color follow the measured low voice,
plus 49 restrained high-frequency/noisy collage glints. The accepted continuous
visibility floor, strict-unison rule, 201 beat pulses, and 70-clip three-family
police suite remain.

Python compilation, generator validation, JSON parsing, exact audio and four
analysis bindings, relative audio path, layer order/counts, provider schemas,
clip bounds, continuous floor/motif/pitch coverage, police layout, unison
invariants, and empty saved props passed. The 3,059,514-byte artifact is
`gettosinfonia-organic-collage-v5.bento`, SHA-256
`cd2bfad9f3c87c229b0af2ec6a43698769bb4bf4a3fbd179e0c3f8b3a1090d8f`.
BenTo 2.1.0b6 reports **Gettosinfonía - Organic Collage V5** stopped at
`0.000/129.620s`, with no props saved or assigned. No audio or LED playback was
started.

Next: rediscover and assign the three clubs, use the central-show hard-stop
preflight before Play, then physically judge bass coupling, palette beauty and
continuity, and police accuracy. V5's physical appearance remains unverified.

## 2026-07-16 result: local Motion Lab was competing with streamed Gettosinfonía

Luke played Signal Chase V4 with all three clubs and observed different colors,
one apparently darker club, and one club failing to reproduce a police color.
This was not a V4 assignment or master-brightness mismatch. Readback found V4
assigned and enabled for BenTo Global IDs 0, 1, and 2. All three clubs reported
the same firmware-global brightness `0.50`, but all three also had
`script.enabled=true`, `scriptAtLaunch=motion-lab`, the local Alpha script layer
enabled, and the BenTo Alpha stream layer enabled simultaneously.

The local program uses independent motion, throw state, demo time, and button
state on each club. Its Alpha output can therefore replace the BenTo frame with
a different color/brightness on each prop. This directly explains the reported
symptom and is a stronger diagnosis than blaming V4's intentional role scene.

All three clubs are now in **transient show mode**: the WASM runtime received
the source-backed `/script/stop` trigger, `scriptLayer.enabled=false`,
`streamLayer.enabled=true`, and brightness `0.50`.
Motion Lab remains installed and `scriptAtLaunch=motion-lab` was deliberately
left intact, so no autonomous work was lost and the script will return after a
club reboot. No setting was saved, no firmware/file changed, and no BenTo
playback was started. BenTo remains on the exact V4 file, stopped at zero, with
all three Global IDs assigned. Luke should now replay V4; if a brightness or
police mismatch remains, record the exact club ID and approximate timestamp.

**Recovery correction:** Luke physically observed Club 1 still running Demo
after the first transition, and Club 2 later produced pink while the other two
clubs were red around 35 seconds. Club 2 readback proved both script flags had
returned true within six seconds. The generic `/script/enabled=false` command
only disables the Script component update loop; it does not unload the WASM
runtime and is not a valid Show-mode stop. The correct source-backed command is
the `/script/stop` trigger. After sending that plus script-layer disable to all
three clubs, a six-second delayed read verified every script layer false, every
stream layer true, and every brightness `0.50`. `scriptAtLaunch=motion-lab`
remains unchanged. Treat physical output as authoritative and require per-club
post-command acknowledgement in the future mode tool.

Operational follow-up: add explicit `show` and `rehearsal` mode commands to the
control tool. BenTo show preparation must call `/script/stop` and disable the
local script layer before playback; autonomous rehearsal must stop central streaming before
enabling Motion Lab. Never assume layer exclusivity from assignment alone.
Stock `.bento` open cannot perform this reliably. The next control-tool slice
should add a show execution policy and a preflighted launcher that opens,
assigns, hard-stops local WASM, sets layers, verifies IDs/brightness, and leaves
the sequence stopped. Preserve a separate `hybrid` policy rather than globally
stopping scripts, because central music plus local sensor rendering remains an
explicit project architecture to explore.

## 2026-07-16 result: Gettosinfonía Signal Chase V4 is loaded stopped for review

The new V4 tells a modem-like signal-chase story rather than treating effects as
independent decoration. A new exact-audio analysis measures 410 half-beats and
derives weighted spectral height, energy, flux, high-frequency ratio, and a
documented `kronch` texture control. The score uses 262 of those samples outside
its bespoke handshake, gates, breath, police, and ending: tonal moments make
the large body follow measured spectral height, while high-kronch moments turn
into short, fast packet trains over a nonblack related-color background.

Every practical 95 BPM beat still receives a pulse, and the broader impact
layer now uses 48 bright, large sparks rather than 36 small ones. Both identified
siren passages contain exactly three police scene families: bright full-club
red/blue half-beat alternation, the physically liked 50/50 red-blue split, and a
brief ID-labelled role tableau. The tableau intentionally maps Global IDs
0/1/2 to blue/red/white; it is the only per-club exception. The first window
rotates those roles after a one-bar hold, while the return holds them static.

Generation, Python compilation, JSON parsing, exact audio/analysis binding,
provider schema, clip bounds/counts, floor coverage, pitch-span coverage,
three-family police layout, exact three-ID role selectors, general unison
invariants, and empty saved props all pass. The V4 artifact is 2,496,973 bytes,
SHA-256 `2ac69a7a343215577936b3664bd211f5435b1055506e5cb8b7aa372177536f61`.
BenTo 2.1.0b6 natively loaded the exact file and reports **Gettosinfonía -
Signal Chase V4** stopped at `0.000/129.620s`, with no props saved or assigned.
No audio, LED playback, club setting, script, firmware, or network state was
changed.

Next physical step: bring the clubs online, assign the stopped sequence, and
review one club first around the handshake, regular signal passages, and all
six police scenes. Then verify ordinary three-club unison and the explicit
blue/red/white role scene before a full juggling listen. Separately, Motion Lab
V6 remains a Club 1 solo canary: page count is open, P3E3 may breathe/flicker
gently at zero activity, and throw-class repeatability is a priority study. Only
the accepted follow-up should roll to all three clubs for Yuki.

## 2026-07-16 result: all three Motion Lab pages reviewed; V6 should precede three-club rollout

Luke completed the first addressed physical review of all 24 V5 effects on
Club 1. Page 1 confirms long-axis roll is a strong performance control,
especially once color is judged in flight rather than at rest. Page 2 separates
literal pose control from abstract circular phase: deliberate choreography
benefits from up/down mappings that an audience can understand, while raw phase
can still make excellent slow-flip textures. Page 3 shows that dynamics need
effect-specific conditioning rather than one shared smoothing curve.

Page 3's strongest effects are P3E1 Activity Flame, P3E6 Activity Sparks, and
P3E7 Throw Bloom. P3E1 needs a faster response and a lively flame/tip accent.
P3E6 is compelling but moves even at rest and becomes busy too quickly. P3E7
reveals a larger design space: state 0 produces the in-hand purple field, while
firmware classifications 1-5 select different colors during detected throws.
A simple hand/air color swap and explicit release/catch transitions should be
tested alongside the multi-class version.

Several weak effects have exact implementation causes. P3E2 changes too little
with activity. P3E3's intended per-pixel rainbow is collapsed by the stack
transform into repeated whole-club fills, so only the final fill survives and
brightness moves over a narrow `0.72..1.0` authored range. P3E4's intended
blue-to-red heat hue is converted into the observed cyan/yellow family. P3E5
uses the sign of near-zero derived speed without a dead band, so idle noise
flickers between its direction colors. P3E8's entire roll/flip/activity weave
was replaced by a flip-angle whole-club fill and therefore cannot respond to
roll as named.

**Combined design direction:** use broad high-contrast changes; tailor spatial
detail to handle versus body diffusion; distinguish pose-legible,
abstract-phase, manipulation, throw, and juggling effects; make circular seams
intentional; and condition each input with its own normalization, dead zone,
hysteresis, response curve, and attack/release. The normal visibility floor
remains the default, but V6 should include a clearly labelled contrast study
that becomes substantially dimmer at rest and bright under motion. This is a
deliberate exception, not permission for accidental blackout.

Do not copy V5 to Clubs 0 and 2 yet. The next engineering gate is a V6 Club 1
canary with post-transform semantic tests and a full stack soak. V6 should
replace duplicate/overwritten effects, preserve the proven winners, add
pose-height mappings, and use P3E8 for a simple hand/air plus transition study.
Only after physical acceptance should the exact artifact roll out to the other
two clubs. No program, setting, or device state changed during this review.

## 2026-07-16 result: Page 2 review separates pose-legible control from abstract flip phase

Luke reviewed all eight end-over-end flip effects on Club 1 using clock-face
orientation. P2E1 progresses cyan toward yellow around the circle and snaps
back to cyan at 12 o'clock. P2E2's white region travels around the LED strip;
at vertical it wraps across both physical ends, while left/right positions put
it approximately one-quarter or three-quarters along the club. P2E3 is similar
but visually strong, especially during slow flips. P2E4 places a blue/orange
boundary directly from circular phase, making up/down half-and-half or seam
states rather than two legible endpoint colors. P2E5 is too subtle to read.
P2E6 duplicates E1, P2E7 has the same family of issues, and P2E8 looks good in
motion.

The exact installed branch confirms all eight Page 2 renderers receive raw
`projectedAngle` or a linear conversion of it. P2E2 computes a 32-position head
and wraps its 13-LED region modulo the strip; P2E4 maps the raw angle directly
to its 32-position boundary. For deliberate choreography, V6 should add a
vertical-height operator such as `h = abs(2*a - 1)`: 12 and 6 o'clock become
opposite endpoints, both 3 and 9 become the middle, and 12 o'clock has no seam.
A height-following pulse must clip at the strip ends rather than wrap.

This does not invalidate the current circular-phase looks. P2E3 and P2E8 show
that an abstract mapping can be beautiful during flips even when an audience
cannot infer its rule. The library should distinguish **pose-legible** effects
for specific tricks from **abstract-phase** effects for music, texture, and
motion. The Page 3 review is now complete in the synthesis above. No code,
settings, or device state changed during this analysis.

## 2026-07-16 result: first physical Page 1 review exposes useful winners and V5 substitutions

Luke reviewed all eight long-axis roll effects on Club 1 while holding,
manipulating, and juggling it. P1E1's cyan/yellow whole-club change was much
more compelling in flight than at rest: the two colors blur into a bright,
wild throw. P1E2 and P1E3 made broad bright regions travel along the club and
were strong both for deliberate manipulation and juggling. P1E4's moving
blue/orange boundary was also choreographically useful, although roll becomes
crunchy during end-over-end flips. P1E5's four-pixel teal/orange bands moved too
subtly and blended toward white in the wide body. P1E7 jumped at its blue/cyan
roll seam; P1E8 provided a more colorful cyan/magenta version.

Inspection of the exact installed 3,992-byte artifact explains the surprising
parts. P1E6 is effectively identical to P1E1: the stable-1.2.0 stack-safety
transform replaced the intended handle/body complement with the same shallow
cyan/yellow whole-strip mapping. P1E7 and P1E8 are linear palettes over a
circular roll coordinate, so their unequal endpoint colors necessarily jump at
the wrap seam. These are implementation properties, not subjective misses.

The next Motion Lab revision should retain P1E1-P1E4 as distinct performance
vocabulary, replace duplicate P1E6, compare deliberate snap seams with periodic
seamless palettes, and run a geometry test using multiple cluster widths in the
narrow handle versus the diffuse body. The Page 2 and Page 3 reviews are now
complete. No code, settings, or device state changed during this analysis.

## 2026-07-16 result: Club 1 boots the complete 24-effect demo and passes a real hardware soak

Luke explicitly authorized the bounded script, settings, restart, and club-test
changes needed to keep moving. Club 1 is now the accepted canary:

- saved `script.enabled=true` and `scriptAtLaunch=motion-lab` load the cartridge
  automatically after restart;
- boot begins in Demo mode, advances through all 24 P1/P2/P3 effects at ten
  seconds each, then wraps to P1E1;
- the first button press exits Demo immediately to normal P1E1 and suppresses
  that press's release, so it cannot also advance to P1E2;
- normal single/double/triple-click behavior and the slower blue/white address
  markers remain unchanged; and
- Club 1 is currently online, charging, at normal P1E1, with physical button
  polling restored. Clubs 0 and 2 remain off and unchanged on accepted V3.

The production artifact is 3,992 bytes, SHA-256
`3e11d9011d6a3af70145a532e47119a0908eed51cfaef4238d06a6f5e3318b2d`.
`build.sh` first creates the pinned readable-source module and then applies a
hash-guarded, size-preserving stable-1.2.0 stack transform. Local WebAssembly
validation, the 24-effect simulator, and the ten-second-per-effect diagnostic
soak pass. The exact output is byte-for-byte equal to the physically accepted
V5 artifact.

**Verified physical acceptance:** a fresh-boot, 248-second USB-serial soak
reached P3E8, wrapped to P1E1, and produced no `Low stack while running wasm`,
panic, or reboot. A direct 18-second P3E8 canary also passed. The saved
production boot loaded the exact 3,992-byte module and advanced through Demo.
A software-injected firmware button edge then exited Demo to P1E1; the harness
restored physical pin polling and saved no button setting.

The investigation also established two separate firmware limits. Disassembly
of the installed image proves that `Script::update()` runs WASM only while
`uxTaskGetStackHighWaterMark(NULL) > 255`; the 255-word high-water result is
historical until reboot. A path can therefore be stopped safely on the update
after it consumes the margin, or can trigger a stack-canary panic inside the
same update before the guard runs again. The physically accepted build removes
both deep paths rather than relaxing the firmware threshold.

`tools/club-lab soak-effects --club 1 --install` now packages the acceptance
workflow: install/save the current artifact, clean-boot, observe one complete
Demo cycle without printing private boot text, detect stack stop/panic/reboot,
and finish with a synthetic first-button canary. Raw serial is stored only under
ignored `private/serial-captures/` because boot logs can contain credentials.

**This former V5 rollout gate is superseded by the completed artistic review.**
Do not install V5 on Clubs 0 and 2. Build and physically accept V6 on Club 1,
then connect Clubs 0 and 2 one at a time for the same install-and-soak command
before the three-club brightness, motion, click, shutdown, and battery/offline
test. Persistent global brightness remains separate: stable 1.2.0 still
restores its downstream master to `0.5` at boot.

The agreed execution order is:

1. Restart Club 1 into Demo and do one human visual pass. Record only favorites
   and exceptions as `P#E# keep`, `P#E# too dim`, `P#E# weak motion`, or a short
   replacement note. Pressing the button during Demo exits directly to P1E1.
2. If Club 1 has no showstopper, connect only Club 0 and run
   `tools/club-lab soak-effects --club 0 --install`; repeat separately for Club
   2. Each run is about 4.5 minutes and ends at normal P1E1.
3. Boot all three, exit Demo on each, compare the same effects while juggling,
   and record per-club differences separately from effect-design feedback.
4. Finish with physical click grammar, long-hold shutdown, battery-only reboot,
   no-home-Wi-Fi operation, and a 10-15 minute park-style endurance pass.

This is a persisted script cartridge on the accepted stable 1.2.0 firmware; the
next two installations do not replace or reflash the base firmware.

## A Raspberry Pi-class show box with wired audio is the recommended small-gig runtime

The selected topology is one Linux show box connected by Ethernet to the Archer,
the three clubs on the Archer's isolated 2.4 GHz WLAN, and fixed wired audio from
the box to the speaker or PA. A phone or laptop joins the show LAN only to use a
local web interface. The browser uploads shows and sends acknowledged
`ARM`/`GO`/`STOP`; it is not the playback process, and disconnecting it must not
affect a running show.

`.bento` is confirmed to be version-tagged JSON: a serialized BenTo project
recipe containing sequences, layers, clips, provider addresses/parameters,
relative audio paths, and editor state. The repo can produce it directly because
its Python generators deliberately target a known subset; the audio and rendered
pixels are not embedded.

The proposed `.clubshow` is an ordinary versioned ZIP—not an existing BenTo
standard—with a manifest, hashes, bundled audio, optional source `.bento`, and
baked `A,R,G,B` frame files for Clubs 0/1/2. The show box uses one wired-audio
clock to play the track and stream those frames by unicast Art-Net. Five minutes
of three-club, 32-pixel, 60-fps four-byte frames is only about 6.9 MB
uncompressed, so compute, storage, and bandwidth are not the hard parts.

**Source-backed scope:** all 37 `.bento` files present in the 2026-07-15 audit,
including autosaves, use only Multipoint, Noise, Point, Rainbow, Range, Solid
Color, and Strobe, with no populated effects, filters, or parameter links. A
direct subset renderer is possible later. A general runtime remains a larger
engine and compatibility port, and direct BenTo C++ reuse has a GPL-3.0
distribution implication.

**Dedicated-device conclusion:** an ESP-class board is sufficient for a
pre-rendered lights-only streamer. A Raspberry Pi-class SBC is the first complete
player because the same box owns wired audio, show import, timing, logs, web
controls, and recovery. Uploads are staged, validated, and atomically promoted;
the service boots stopped, forbids mutation during playback, survives browser
disconnection, and has a local physical STOP path. No player or package format
has been implemented yet.

**Integrated-Wi-Fi product direction:** Raspberry Pi OS officially supports AP
mode, so the first prototype should test the Pi itself as the private 2.4 GHz
show AP for the three clubs and phone web client. The player remains network-
agnostic and must also work behind the Archer. The sellable topology is not yet
chosen: compare AP range, packet loss, body occlusion, audio-plus-stream load,
browser recovery, and cold boots with margin. Unless onboard Wi-Fi passes, early
low-volume units should ship with an unchanged certified travel router as a
field-replaceable companion. An eventual one-enclosure product can still keep
separate playback and router subsystems internally.

**Compliance boundary:** certified Pi/router radio reduces but does not erase
Canadian final-host obligations. Exact enclosure, antenna, power, labelling,
RF-exposure, and bilingual user notices need review by a recognized compliance
lab before sale. No radio hardware or product enclosure has been selected.

**Fixture-patch product direction:** `.clubshow` must target logical roles, not
Global IDs or physical devices. `clubshow.local` keeps a separate private device
inventory, capability/calibration profiles, and named production/venue patches.
A broken club is replaced by discovering and identifying a compatible spare,
canarying it, and atomically moving the role; the show package is unchanged.
The supported UI subset includes Identify, label, patch, role/venue trim, device
brightness ceiling/calibration, pixel orientation/order/geometry, health, and
safe protocol settings. Firmware, credentials, factory reset, and full raw
settings save remain separate commissioning/service operations.

This makes the appliance vendor-neutral. Creator Clubs are one driver alongside
generic Art-Net/sACN, WLED through its JSON API and DDP/Art-Net/E1.31, USB DMX,
and future open ClubShow nodes. Static scenic props should default to wired
Ethernet or DMX; prove the workflow with off-the-shelf controllers before
building an open static node. Battery/IMU/impact-safe juggling hardware is a
later product. The full design is `docs/show-box-product.md`.

**Existing-system conclusion:** the generic runtime is substantially prior art.
Falcon Player already runs synchronized FSEQ sequences and audio on Pi-class
hardware with a web interface and standard lighting outputs; xLights already
uploads sequence, media, model, and controller configuration. ETC Eos' fixture
patch confirms the professional separation of logical programming from device
type/address, while QLab and standalone controllers already cover theatre cue
exchange and recorded lighting playback. ClubShow's defensible scope is the
BenTo/Flowtoys bridge, portable-prop role patch, calibration and spare workflow,
and performer-friendly appliance—not a new console or general sequencer.

**Next implementation slice:** first export one current BenTo show to FSEQ plus
audio and test it on stock FPP, including frame/audio parity and the API/plugin,
boot, update, security, reliability, and licensing boundaries. If it passes,
make FSEQ the compiled payload inside `.clubshow` and implement the role-aware
ClubShow service beside FPP. Only build the narrow custom player after a
documented incompatibility. Then add inventory/Identify/patch without rewriting
persistent `propID`, a spare-replacement canary, and one static WLED role. No
router, club, BenTo, FPP, or show-box state was changed in this design session.

## Field and theatre deployment architecture is documented; the show LAN is not yet configured

The first operational design is now in `docs/performance-deployment.md`.
Field/simple-theatre v0 uses the Mac running BenTo, the unused Archer C4000 as
an isolated 2.4 GHz show LAN, and wired audio to a battery speaker or venue PA.
BenTo owns one transport for audio and club lighting. Opening a portable show
does not route it: startup must discover Global IDs `0`, `1`, and `2`, assign the
sequence, verify stopped-at-zero state, and run a short canary before `READY`.

Full-theatre v0 does not put the clubs directly under venue DMX. A bridge such
as Chataigne should accept acknowledged OSC or MIDI/MSC `ARM`, `GO`, `STOP`, and
`STATUS` commands, control BenTo locally, and send discrete venue-lighting cues
from observed BenTo time. The venue console remains owner of its DMX universes.
The inspected BenTo source has no external timecode chase and its current DMX
block is not instantiated, so hard venue-clock lock and generic DMX output are
not current capabilities.

**Source-backed risk:** stable 1.2.0's stream layer clears after approximately
one second without Art-Net frames by default. A nonblack local fallback has not
been physically proven. Central streaming is therefore a field rehearsal path,
not yet an accepted theatre-failure mode.

**Current physical state:** the Archer is not configured and no club Wi-Fi
setting was changed in this design session. Its official V3 supply rating is
`12 V DC, 5 A`, making AC or portable AC power the safe first field-power path;
the physical version/adapter label still needs verification. The next
deployment action is offline Archer configuration and power measurement,
followed only on explicit approval by the established Club 0 migration canary.

## Motion Lab V5 is physically accepted on Club 1

Luke's V3 review drove the slower address flashes, broad sensor-driven motion,
raised color levels, and executable dark-venue coverage rules. V5 adds
hardware-free startup, Boot Demo, and stable-1.2.0 native-stack compatibility
without changing the three-page/eight-effect address catalog:
`init()` cannot touch firmware time, buttons, or motion, because the installed
Root initializes the script component before those components.

The production artifact is 3,992 bytes, SHA-256
`3e11d9011d6a3af70145a532e47119a0908eed51cfaef4238d06a6f5e3318b2d`.
The test harness proves that `init()` makes zero hardware-import calls, then the
first update enables the IMU. It also verifies all effects, click grammar,
slower markers, roll/flip isolation, calibrated activity, broad comet motion,
the whole-strip visibility floor, Boot Demo traversal, first-button suppression,
and ten-second all-effect stress. Club 1 then passed the exact 248-second
physical run and a saved production restart.

The global-brightness boundary is unchanged: stable 1.2.0 applies a downstream
`0.5` multiplier after reboot, and the WASM ABI has no master setter. V5 can
improve authored level and spatial coverage but cannot override that ceiling.

Club 1 now saves V5 as `motion-lab`; ESP-NOW is disabled, normal Wi-Fi works,
and button polling is enabled. Clubs 0 and 2 remain on V3 while V6 is developed,
installed, and accepted on Club 1. Do not give them V5. The printed guide needs
regeneration for V6 before it is treated as the next field reference.

## Motion Lab V3 remains the accepted baseline on Clubs 0 and 2

Luke reported that the profile-baked Club Lab effects respond well and that
some are already promising enough for show use. That review drove a 24-effect
Motion Lab organized by physically distinct controls rather than generic
orientation labels:

```text
Page 1: eight long-axis roll interpretations
Page 2: eight end-over-end flip interpretations
Page 3: activity, flip speed/direction, throw state, and axis combinations
```

The exact AssemblyScript artifact is 3,997 bytes, SHA-256
`a1b80729cb41bf05893c47288148b8b536157fd0bb78278dd6a540f848e54309`,
well below the installed 16,000-byte limit. Its Node simulator exercises all
24 effects and verifies the nonblack visibility floor, calibrated activity
contrast, page/effect marker counts, all page/effect wraps, single/double/triple
click behavior, long-hold rejection, and IMU enable/disable.

**Verified persistent writes:** Club 2 first received the exact artifact as a
one-club canary; Clubs 0 and 1 then passed credential-safe stable-1.2.0/motion/
LED preflight and received the same file. For each club, `scriptAtLaunch` was
set to `motion-lab`, settings were saved, and a clean restart was sent. No
firmware image was replaced. No post-boot network/debug query was made because
that path can disturb this factory runtime.

**Acceptance boundary:** Luke needed to power the clubs down after installation
and was told that the saved launch would persist. The saved-startup operation
is verified, but the exact V3 artifact still needs a
hands-on cold-boot check: P1E1 marker, roll response, one-click effect advance,
double-click page advance, and representative P2/P3 response. Clubs 0 and 1 do
not yet have individual calibration profiles; this park build deliberately
uses Club 2's measured activity range as a common baseline.

**New Club 1 observation:** after plugging it in, Luke reported that Club 1
seemed to behave differently. Filtered readback shows the expected saved
`motion-lab` launch name, enabled script, 50 Hz update, global brightness `0.50`,
and sane still sensor values. The exact visible symptom is still open. Do not
attribute it to calibration until a controlled matched-orientation comparison
separates a different but responsive roll color from a stuck or wrong effect.
After the unresponsive report, a correctly configured 20-second USB serial
canary clean-restarted Club 1 and captured the exact 3,997-byte file, all three
required exports, `Calling init`, and marker `4000`, with no low-stack stop. The
program is running. Luke then confirmed that P1E1 changes whole-club color on a
long-axis twist. Club 1 therefore passes the exact V3 boot and first-effect
physical canary. Its earlier unresponsive state was cleared by the clean reboot
without another upload or per-club calibration change; the pre-reboot cause was
not captured and remains open.

The current one-page reference is
`output/pdf/motion-lab-quick-guide.pdf`. It was generated with ReportLab,
confirmed as one landscape Letter page, text-extracted, rendered to PNG for
visual inspection, and accepted by the default printer. The older
five-page guide documents the prior 20-effect revision and is retained only as
design history.

## Club Lab V0 is implemented; its calibration informed Motion Lab V3

`tools/club_lab.py` now implements the first complete learning loop:

```text
doctor -> per-club motion calibration -> four-pattern physical study
       -> append-only JSONL checkpoint -> six-file LLM evidence export
```

The tracked cartridge contains projected-angle orientation wheel, roll-driven
orbit comet, calibrated activity flame, and derived flip-speed heat. Each keeps
a nonblack full-club field. One physical short click advances and wraps. The
current 1,731-byte WASM, SHA-256
`f37a0957e3ee361e5366f1970cda3d61d239e23d1b9235524ccec457c86182af`,
passes WABT validation and its Node simulator. The earlier V0 live Club 2 boot canary found
`init / update / stop / setParam`, called `init`, printed pattern marker `5000`,
and produced no low-stack stop. The cartridge was then removed from startup and
Motion Lab was restored and independently boot-canary verified.

**Installed-firmware limitation:** the checked-out source contains
`/script/setScriptParam`, but factory stable 1.2.0 rejected that exact command as
unhandled even though it found the WASM export. V0 therefore uses the physical
button to select patterns and records the exact compiled defaults. Measured
profiles are created and exported but cannot yet be applied live; parameterized
A/B tuning waits for a compatible host command or a source-reviewed firmware
revision.

**Runtime rule:** network upload/debug activity can trigger stable 1.2.0's
`Low stack while running wasm, stopping script` guard even for the previously
working 1,170-byte sensor playground. A clean boot clears the condition. Club
Lab preparation therefore temporarily saves the study as the boot cartridge,
reboots, and makes no post-boot network probe during physical testing; on exit
it restores the known `motion-lab` startup and reboots. This is a bounded
persistent swap, not a firmware flash.

Private profiles, JSONL sessions, and LLM bundles live under ignored
`private/club-lab/`. The export writes manifest, profile, pattern manifest,
trials, feedback summary, and open questions, and a synthetic end-to-end test
verified JSON validity and address/MAC-shaped text scrubbing. A real Club 2
motion profile now exists privately; human pattern ratings have not yet been
collected.

**Earlier physical observation:** Luke initially saw no obvious motion response in the
first two effects. Those effects read projected angle directly, so activity
calibration would not fix them. The next gate is a deliberate full end-over-end
rotation followed, if still static, by a projected-angle span capture. Pause
pattern ratings until that input is proven. The calibration command records a
profile for rebuilding; installed firmware cannot apply it live.

The first calibration attempt was invalid and its private profile was removed:
REST/SLOW/ACTIVE all returned zero activity and gyro plus the same impossible
half-turn angle span. A direct sensor-only retry—WASM stopped, motion component
enabled—immediately produced nonzero activity/gyro and stable angle. The CLI now
prepares that sensor-only state, splits long-axis ROLL from end-over-end FLIP,
announces spoken starts/stops with macOS `say`, rejects implausible captures,
and restores Motion Lab afterward. The corrected run is now complete.

A second run proved projected angle responds—REST span `0.000`, movement spans
about `0.499`—but full activity/gyro telemetry stayed stale at zero and was
correctly rejected. The missing setup was a forced IMU task restart plus full
telemetry: the CLI now toggles motion off→on, sets `sendLevel=All`, and refuses
to begin human prompts unless an eight-sample activity/gyro preflight is
nonzero. The live corrected preflight passed (`0.00260` activity maximum,
`0.23` gyro-magnitude maximum).

The accepted Club 2 run measured REST angle span `0.001`, ROLL `0.037`, FLIP `0.927`,
and ACTIVE `0.909`. Activity floor/ceiling are `0.005976..0.552491`. This proves
projected angle is primarily an end-over-end control for this test, not a
long-axis-roll control. The profile-baked revision changes Pattern 2 to use raw
roll, passes offline validation, and has been uploaded/saved as Club 2's
temporary startup cartridge. A clean reboot was sent without a post-boot
network probe. Luke then physically confirmed that the revised effects worked
well, including several with plausible show value. Motion Lab V3 subsequently
replaced the temporary cartridge on all three clubs.

Luke first reported the booted study was too dim. The expected global post-reboot
brightness is `0.5`, which halves even fully authored RGB output. A single live
OSC write set it to `0.9`; Luke's later physical review found the revised
effects responsive and useful. The live value does not survive reboot, so
persistent offline brightness remains a firmware/settings problem and the park
test begins from the firmware's `0.5` baseline.

## Motion Lab implementation and recovery history

Luke authorized a local exploratory program and any firmware change required
to make it start and remain controllable without Wi-Fi. Live preflight found
that no firmware replacement is required. The implementation is:

```text
club boot -> stable 1.2.0 scriptAtLaunch -> /scripts/motion-lab.wasm
          -> page/effect click state machine -> 32 LEDs
```

`scenes/motion-lab/motion_lab.ts` now contains three pages of eight effects.
Page 1 uses long-axis roll, Page 2 uses end-over-end projected angle, and Page 3
uses calibrated activity, derived flip speed/direction, firmware throw state,
and combined axes. A short
click advances and wraps within a page after a `0.36s` multi-click decision
window. A double click changes page and resets to effect 1. Three or more quick
clicks reset to Page 1, Effect 1 from anywhere. Holds of `0.50s` or longer are
ignored by the cartridge so firmware retains its very-long-hold shutdown path.
Every selection now gives a sequential address marker: saturated blue-violet
pulses count the page, then white pulses count the effect. Thus P1-E1 is blue-
violet, white; P2-E1 is blue-violet, blue-violet, white; P3-E1 adds a third
blue-violet page pulse before white.

The current local AssemblyScript 0.27.37 artifact is 3,997 bytes with SHA-256
`a1b80729cb41bf05893c47288148b8b536157fd0bb78278dd6a540f848e54309`.
It uses optimization/shrink level zero to preserve 40 helper functions and keep
`update()` around 342 bytes; the prior aggressive build collapsed it to roughly
2.1 KB. An attempted `@inline(false)` workaround was rejected because it made
`update()` roughly 4.75 KB. The current build's Node WebAssembly simulator
exercises all 24 effects with realistic small
activity values and verifies a raised per-LED floor, counted markers, single/
double/triple click behavior, wrapping, long-hold rejection, IMU enable/disable,
and a large still-to-active visual change.

The initial source investigation followed the obsolete BentoFlow branch and
produced a valid but architecturally wrong custom image. Live 1.2.0 instead
exposes Bentuino paths `/leds/strip1`, `/motion`, `/buttons`, and `/script`.
Its ESP image metadata is app version `8cabf2c`, compiled 2026-02-11 against
ESP-IDF 5.5.2, unlike the candidate's legacy ESP-IDF 3.3.5 base. The candidate
is rejected and must not be flashed. The public repo retains only a rejection
notice, not the patch or build script.

Credential-safe live configuration did not show boot configuration, so a
credential-bearing full tree was queried in memory and immediately discarded;
only safe script fields were emitted. It verified writable
`/script/scriptAtLaunch`. The live Bentuino button path exposes raw value,
multipress count, long press, and very-long press; the inspected root handler
reserves very-long press for shutdown and does not contain BentoFlow's offline
double-click stop behavior.

A read-only ESP32 identification reset matched the connected USB device to
physical Club 2 without emitting or recording its private identifiers. Club 2
rediscovered normally. The first upload returned HTTP success but did not
produce loader evidence. BenTo was then closed so a single diagnostic WebSocket
could receive the club's own messages. The original load reported all 3,499
bytes read, `init / update / stop` found, `init` called, and the cartridge's
`4000` startup marker. Debug forwarding was disabled after each bounded capture.

**Verified persistent state:** `/script/scriptAtLaunch` was set to
`motion-lab`, `/settings/save` was triggered, and Club 2 was restarted through
the stock firmware. It returned to the network with `motion-lab` still set, the
script component and layer enabled, and the motion sensor connected. The script
layer's blend mode returned to stock value `0` after boot; playback and FX
layers were disabled in the last live readback. No firmware was flashed.

The current revision uses Club 2's accepted activity range
`0.005976..0.552491`. The restore command uploaded this exact artifact before
saving/rebooting Motion Lab on Clubs 0, 1, and 2.

**Historical V2 gate:** Luke's first physical review found navigation feedback
unclear, all effects dim, and sensor response weak. V2 corrected those mappings
and was persisted as `motion-lab` during that phase. After the page-crash
investigation,
the 4,303-byte function-preserving build was uploaded and restored as startup.
A clean-boot serial soak found its complete signature and marker `4000` with no
low-stack stop. Club Lab then isolated long-axis roll from end-over-end flip,
and Luke reported that the corrected study effects worked well. V3 applies the
measured distinction across its page structure. V3 was saved on all three;
Clubs 0 and 2 still have it, while Club 1 was later changed to the 4,113-byte
pre-fix V4 and has now advanced to the accepted 3,992-byte V5 described above.

**Brightness finding:** live readback showed global strip brightness `0.5`.
Setting `0.9` worked immediately, but both the legacy `/settings/save` and live
`/settings/saveSettings` paths reported success yet brightness returned to
`0.5` after restart. This is a verified stable-1.2.0 persistence limitation or
bug, not an authored-color issue. Club 2 accepted a live `0.9` during that test,
but it has since rebooted/off and no such current value is claimed. Later
Motion Lab revisions raise their authored color floors substantially.

**Calibration finding:** source confirms yaw/roll in degrees, pitch in degrees,
projected angle in `0..1`, and activity normalized against a high 40 m/s2
ceiling. Ordinary motion therefore occupies a small part of activity's nominal
range. The accepted Club 2 profile measures `0.005976..0.552491`; the current
local Motion Lab uses that range with stronger attack/slower release and
derives spin from wrap-safe projected-angle change rather than the less-certain
raw spin import. `tools/club-lab calibrate motion` owns the validated,
hands-free REST/ROLL/FLIP/ACTIVE workflow.

The one-page `output/pdf/motion-lab-quick-guide.pdf` describes the accepted V3
three-page/eight-effect layout, click grammar, markers, all 24 effect names,
and concise movement/visual descriptions. It passed page-count, text, and
render inspection and was printed. V5 keeps the same addresses but adds Boot
Demo and stack-safe palette substitutions; the guide has not yet been regenerated
for those details. The older five-page
`output/pdf/motion-lab-field-guide.pdf` describes the prior 20-effect revision.

## Kōjō no Tsuki Japanese-autumn unison V2 is loaded stopped

Luke reviewed the original Kōjō no Tsuki show and requested an entirely autumn
palette plus identical treatment on all clubs. The original
`kojo-no-tsuki.bento` remains unchanged. Its source-backed routing included
`numProps=3` spatial providers and Noise `idOffset=0.11`, mechanisms capable of
per-club differences.

The separate `generate_autumn_unison_bento.py` produces
`kojo-no-tsuki-autumn-unison-v2.bento`. It preserves the exact 41.743673-second
recording, four measured phrase entries, five strong blooms, 43 measured pluck
accents, continuous floor, and no-strobe phrase-led structure. Every stored
foreground, background, floor, bloom, and accent color now belongs to a warm
nine-color set inspired by momiji red, shu vermilion, kaki orange, yamabuki and
kogane gold, kuchiba fallen-leaf brown, kuri chestnut, ebicha red-brown, and
warm washi ivory. These hex values are project-specific approximations, not
canonical traditional-color definitions.

The visual narrative is now autumn castle walls, golden harvest moon, moving
maple leaves, warm lantern shimmer, and a fallen-leaf afterglow. Motif output is
brighter and more saturated while the accepted continuous floor remains
`0.31-0.36`. All applicable routing parameters are strict unison:
`idOffset=0`, `numProps=1`, and false even/odd inversion.

Python, original structural/audio validation, JSON parsing, 66 clip/provider
checks, exact nine-color containment, strict-unison invariants, relative audio,
exact audio hash, empty saved props, and whitespace validation pass. The V2
artifact is 196,190 bytes with SHA-256
`51afb9d5e6f13f61f284a8b637879566498a5bdb5c6e0331cf6f9544212e1514`.

Before loading, the original sequence was stopped at its end with live IDs 0,
1, and 2 assigned. BenTo 2.1.0b6 loaded the exact V2 file and reports **Kojo no
Tsuki - Japanese Autumn Unison V2** stopped at `0.000/41.740s`. Because the
portable project saves no props, the prior project-local prop list cleared and
no clubs rediscovered during a three-second check. No assignment or playback
was started. Next action: after the clubs reappear in the live Props list,
verify their reported IDs, assign V2 to each, and let Luke begin playback.

## High-level Yuki project overview is ready

`docs/yuki-project-overview.html` is a self-contained, responsive teaching page
for Luke's next conversation with Yuki. It deliberately leads with the creative
goal rather than firmware and protocol details. The page explains movement-
directed, music-directed, and future hybrid performance modes; summarizes the
physical milestones; presents the six main composition lessons; introduces six
creative studies; and ends with a four-step demonstration sequence plus six
questions for Yuki.

Two optional disclosure panels explain BenTo and remaining uncertainties
without making the main presentation technical. The page includes a print/PDF
layout, responsive mobile layout, reduced-motion support, no external assets,
and no private device or network details.

Local validation found six main content sections, two expandable detail panels,
no horizontal overflow at the current Chrome viewport, and no browser console
errors. It is open in Luke's Chrome at the local project URL. The local server
is presentation infrastructure only; this session did not publish or deploy the
page and did not communicate with BenTo or any club.

## Heartaches V1 generated and loaded stopped

Luke purchased Tropkillaz's **Heartaches** and supplied the downloaded FLAC.
The private master is now under the show's ignored audio directory; no audio,
payment information, credentials, device addresses, or saved props entered the
public project. It is verified as 16-bit/44.1 kHz stereo FLAC, 128.265624
seconds, SHA-256
`a6d0d3318def521f530eb5597ba678c084732c5d76d6a7e3c6f79db762c16c35`.
Measured loudness is -10.2 LUFS with +0.3 dBFS true peak, so the BenTo audio
clip is set to `0.80`.

Reproducible analysis selected a practical 80 BPM grid at phase `0.655s`, with
a `0.375s` half-beat. Measured four-bar similarity strongly links the first
drop beginning near `24.655s` with its return near `102.655s`. The strongest
section change is near `48.655s`; a sustained high-energy central passage runs
approximately `66.655-87.655s`.

Neither the local Whisper tiny model nor the existing large-v3-turbo service
could reliably transcribe the processed vocal. The score therefore does not
invent lyric timing. Candidate red-heartbreak passages at `0.655-12.655`,
`39.655-48.655`, and `90.655-102.655` are explicitly named hypotheses and live
in one isolated layer for easy rehearsal retiming.

`heartaches-performance-v1.bento` contains one audio layer plus 610 light
clips: 13 continuous floors, 12 section blooms, 168 practical 80 BPM body
pulses, 192 half-beat trap accents, 48 measured full-body impacts, 88 red
double-heartbeat clips, 42 feature-linked body-color phrases, 34 continuous
trap-suite clips, and 13 continuous section motifs. All three clubs receive
strictly identical routing. Important geometry covers the upper body or whole
club; scene output is bright and saturated while the accepted `0.30-0.38`
visibility floor remains.

The central overload cycles Rainbow, cyan/magenta Multipoint, lightning Noise,
acid body color, and one bar of rapid saturated color changes. There are no
black frames or explicit strobe provider, but that final overload bar should be
reviewed stationary before juggling. The returning drop deliberately recalls
the first drop's visual family at higher speed and contrast.

Python, generator, JSON, exact audio/analysis binding, relative audio path,
provider schemas, clip bounds, continuous floor/motif coverage, minimum floor,
strict-unison invariants, saved-prop portability, and whitespace validation
passed. The generated show SHA-256 is
`a5277171de505986dffdd83cb3d4a9534a095caa99a87a1dafe83d97c6e5cbc8`.
BenTo 2.1.0b6 loaded the exact file and reports **Heartaches - Heartbreak to
Trap V1** stopped at `0.000/128.260s` with no props. The assistant did not
assign, play, save, upload, or change any club or network setting. Next action:
turn on the desired clubs, confirm their live IDs, assign this sequence, then
perform a stationary first review before juggling.

## Papa Was Stoned received its first full three-club review

Luke supplied a Google Drive link that Yuki had sent for the song Yuki performs
to. Luke's existing Chrome session opened it successfully as **13 Papa Was
Stoned - add silence.wav**. Drive reported that anyone with the link can access
it without sign-in. The public repository does not record the capability URL.

The downloaded file is locally stored at the generalized ignored show-audio
path for `papa-was-stoned`. It is verified as 16-bit/44.1 kHz stereo PCM,
283.460272 seconds, 50,002,436 bytes, SHA-256
`0a29f3b98bba8caab907ce1a4f64cf7b18d663deeba737755a376bd75c87bd87`.
The `.gitignore` rule now protects audio under every `shows/*/audio/` directory,
while still allowing a placement README.

Reproducible analysis selected a practical 123.5 BPM grid at phase `0.46491s`,
supported by 102 beat-like intervals and bar-aligned spectral-change points.
The strongest full-groove arrivals are near 47.105, 155.930, and 204.513
seconds. The generated 19-section score uses recurring visual families when
musical material returns and develops them across the A, B, and C drives.

`papa-was-stoned-performance.bento` contains one Audio layer plus 555 light
clips: 19 continuous visibility floors, 19 section blooms, 381 practical beat
pulses, 64 measured impact sparks, 53 three-club counterpoint gestures, and 19
continuous section motifs. The ordinary floor remains at pattern brightness
`0.30-0.38`; no strobe is used. The file contains no saved props, uses the
relative ignored audio path, and reduces the loudly mastered source to BenTo
volume `0.78`.

The musical audio ends around 268.376 seconds, leaving approximately 15.084
seconds of silence. The current score interprets that tail as a steady warm
amber stage afterglow for a final pose or bow and fades only over the last 1.2
seconds. This is an explicit creative assumption, not a verified part of
Yuki's routine, and should be reviewed with him.

Offline validation passed for audio/analysis binding, provider schemas, layer
order, clip bounds and counts, continuous floor/motif coverage, floor minimum,
and saved-prop portability. BenTo 2.1.0b6 loaded the exact file and sequence.

Luke subsequently watched and listened to the complete score with all three
clubs. His physical review found the `0.30-0.38` minimum brightness materially
better and acceptable, but most scenes/colors still felt muted relative to the
clubs' most attractive bright output. More importantly, the generated
per-club offsets and mirrored treatments made one club visibly different at
times, or grouped two against one. In ordinary juggling this looked strange:
the clubs constantly change position, so the audience's eye is drawn to the
odd prop even when the difference is minor.

The new default is identical treatment across all three clubs. Per-club
differences are reserved for explicitly authored, readable effects such as a
color cycle, a choreographed role, a short transition, or sensor-driven output
whose differing movement visually explains the difference. Future generators
should default to zero ID offset, no even/odd inversion, and no distributed
three-prop geometry. Performance scenes should use stronger saturation and
output; battery-saving test levels are a separate temporary operating mode.

The Papa score is intentionally unchanged. Luke is reviewing the other shows
before selecting revisions.

## Gettosinfonía music-linked/body-aware V3 generated and under review

Luke completed PayPal biometric authentication and Bandcamp confirmed the
US$1.12 purchase of DJ Raff's **Gettosinfonía**. A receipt was emailed. No
payment details were inspected or recorded. The purchased WAV is locally stored
at the show's ignored audio path and verified as 16-bit/44.1 kHz stereo PCM,
129.613333 seconds, SHA-256
`fa51477472fb81dfa560e1d6d5b519e7b3fb6f546a1e7f8a31c13b856aaa03e9`.

`shows/gettosinfonia/analyze_audio.py` and `analysis.json` now bind analysis to
that exact recording. The practical authoring grid is 95 BPM at phase
`0.24386s`, based on 125 beat-like onset intervals and bar-aligned spectral
changes; this is measured working timing rather than an official notated tempo.
The interpreted form has 13 sections.

Luke's first review of the flagship identified two almost police-siren-like
passages, starting around 1:06 and again around 1:37. The grid-snapped windows
are `65.92807-86.13860` (eight bars) and `96.24386-106.34912` (four bars). He
also requested strict three-club unison, a pulse on more beats, and more intense
patterns throughout.

The original `gettosinfonia-flagship.bento` remains unchanged as a baseline.
The current generator produces `gettosinfonia-unison-v2.bento`: 107 continuous
visibility-floor clips, 13 brighter section blooms, 201 every-beat pulses, 36 brighter measured
impact sparks, 19 unison kinetic gestures, 96 half-beat full-club red/blue
siren clips, and 13 higher-intensity continuous motifs. The accepted
`0.30-0.38` floor is unchanged and no strobe is used.

The two siren sections split the floor into the same red/blue half-beats as the
Alpha siren layer. This prevents the earlier teal/magenta section floors from
adding into and desaturating the intended police colors.

Generator validation now rejects any nonzero ID offset, multi-prop geometry, or
even/odd inversion. Inspection confirmed every applicable parameter as
`idOffset=0`, `numProps=1`, `invertEvens=false`, and `invertOdds=false`. Audio
digest/path, provider schemas, layer order, clip bounds/counts, continuous
floor/motif coverage, empty saved-prop list, Python, and JSON validation passed.

Luke's V2 review added two requirements. The second section's rising electronic
tone should drive changing color instead of remaining light orange, and each
police passage should cycle through several police-pattern vocabularies. He
also supplied the physical map that BenTo's display bottom is the handle and
the top is the larger, brighter body. Important cues should occupy the body or
whole club; small handle-only differences are too subtle for ordinary juggling.

`analyze_tone.py` now measures 48 quarter-beat dominant mid-band peaks across
the second section. Repeated examples move from roughly 180 Hz to 220 Hz, jump
into roughly 530-720 Hz, then fall back. The generated mapping drives the upper
60% body through saturated red/orange, yellow, cyan/blue, and violet while the
handle keeps a darker version of the same hue. This is a measured spectral-peak
control signal, not a melody transcription.

The current generator produces `gettosinfonia-music-linked-v3.bento`. Its nine
light layers contain 83 visibility-floor clips, 13 blooms, 201 every-beat
pulses, 36 measured impacts, 19 unison gestures, 30 bar-feature-linked body
phrases, 48 pitch-linked body clips, 72 police-pattern clips, and 13 continuous
motifs. The police suites now cycle through full-club alternation, bold
body/handle swaps, moving Multipoint beacons, and a faster double-flash finale.
Their matching floor uses the same pattern geometry at `0.30-0.38`, preserving
color and visibility. All club-routing parameters remain strict unison.

Python, JSON, audio/tone-analysis binding, clip/provider/count validation,
continuous floor/motif/pitch spans, siren floor/Alpha equivalence, unison
invariants, and saved-prop portability passed. BenTo 2.1.0b6 reports the exact
V3 file and **Gettosinfonía - Music-Linked Police V3** stopped at
`0.000/129.620s`. No props rediscovered during a three-second check, so V3 is
not assigned or played by the assistant. During the final reproducibility
check, Luke had independently started V3; BenTo reported it playing at
`26.060/129.620s`. The assistant left it running. The oversized `/props`
response was malformed again, so CLI readback did not verify individual club
routing. Luke's physical review should focus on the second section's pitch
colors, body prominence, police-pattern legibility, and overall music/color
correspondence.

## Candidate audio acquisition audited; no live free download found

All six exact commercial-song candidates were checked for a legitimate local
audio acquisition path. None currently has a live, verified,
artist-authorized free download that can be fetched without a purchase.

**Bird Brain** has the strongest free-release provenance: Bro Safari's official
SoundCloud description says the artists offered *Animal* for free, and UFO!'s
official track page advertised an Artist Union download. Both legacy endpoints
are now dead: the album short link ultimately names a non-resolving
artist-hosted domain, and the Artist Union path returns `404`. A Wayback CDX
query did not find the exact official ZIP. No unofficial mirror or stream rip
was used.

The clean current choices are an artist-direct Bandcamp purchase for
**Gettosinfonía**, a lossless Qobuz purchase for **Heartaches**, Beatport
purchases for **Jump Up** or **Waist Time**, or a verified commercial download
for **Bird Brain** or **Jacquadi**. Luke's plan to clear performance rights is a
separate legal step from acquiring the recording. No audio was downloaded,
purchased, played, or copied, and no BenTo, club, network, or persistent state
changed.

## Jacquadi added as the narrative-show candidate

Polo & Pan's **Jacquadi**, created with Jacques Auberger and released on
*Caravelle (Deluxe)*, is verified at 4:07 with a reported 120 BPM. This yields a
simple grid of `0.5s` per beat, `2s` per bar, `8s` per four bars, and `16s` per
eight bars. It is the longest current candidate.

Source descriptions characterize DIY percussion blended with soft melodies and
a surreal official video involving a frog, overflowing landscapes, and a
kaleidoscopic jungle. The proposed treatment is therefore a multi-chapter
theatrical show: playful call-and-response, recurring character motifs, palette
transformations, and synchronized surprises over a gentle but safe visibility
field. This contrasts usefully with the impact-driven bass candidates.

Jacquadi may be the richest narrative performance but is not the smallest first
proof because it requires more scoring and performer stamina. No track was
selected or acquired, no show directory was created, and no BenTo or club state
changed.

## Jump Up and Waist Time added; Waist Time confirmed

Luke added Major Lazer's **Jump Up** and corrected the Diplo candidate to
**Waist Time**. Verified catalog identities are **Jump Up — Major Lazer,
Leftside & Supa Hype**, approximately 3:43 at 128 BPM, and **Waist Time — Diplo
& Autoerotique**, approximately 3:18 at 127–128 BPM. Beatport offers both
original releases commercially.

The shared 128 BPM grid is authoring-friendly: `0.46875s` per quarter note,
`1.875s` per 4/4 bar, `7.5s` per four bars, and `15s` per eight bars. Exact
files still determine phase and form. Jump Up suggests vertical lift and
large-scale energy development. Waist Time is especially relevant because its
official video is built around hooping, rotation, bright colors, and light
trails; it suggests a hybrid show where BenTo controls the song/form and local
projected-angle logic controls orbiting details.

That hybrid layer interaction is not yet physically proven, so it remains a
candidate experiment rather than an implementation claim. No song was selected
or acquired, no show directory was created, and no BenTo or club state changed.

## Bird Brain found and added as a third candidate

The requested track is **Bird Brain — Bro Safari & UFO!**, from *Animal (Deluxe
Edition)*. Spotify and Amazon report 3:31; tempo sources report 110–111 BPM. It
is longer than Gettosinfonía and Heartaches, creating more room for a complete
three-club narrative but a larger choreography and authoring commitment.

The original artists described *Animal* as a free album, and UFO!'s official
SoundCloud page still advertises a free Artist Union download for Bird Brain.
The old external link has not been validated and the page labels the recording
all rights reserved, so no download or reuse-right conclusion was assumed.
Commercial Apple/Amazon versions exist as fallback sources. Exact file analysis
is still required before choosing cues.

Technically, approximately 110 BPM is an attractive direct juggling grid:
whole-club changes can follow quarter notes while only selected events use
eighth-note accents. Proposed vocabulary includes darting points, mirrored
wing sweeps, three-club flocking offsets, and full-club impact blooms over the
required visibility floor. No show candidate has been selected, no directory
was created, no audio was acquired, and no BenTo or club state changed.

## Heartaches added as a second commercial-show candidate

Tropkillaz's **Heartaches** is verified as a 2:08 electronic single released by
Elemess in 2015. Shazam reports 80 BPM. Qobuz offers a DRM-free 16-bit/44.1 kHz
purchase and supports WAV/FLAC downloads, making it a clean technical fit for
the same ignored-local-audio and single-BenTo-transport workflow.

Heartaches may be the easier first authored timing exercise: 80 BPM provides a
slow structural pulse plus a possible 160-pulse double-time grid for quicker
juggling accents. This is a metadata-based design hypothesis, not a verified
musical analysis; exact tempo, phase, subdivisions, drops, and form still
require the purchased file and listening. Gettosinfonía remains the existing
prepared project, and no second show directory or selection decision was made.
No audio was acquired and no BenTo or club state changed.

## Juggled Wi-Fi meter is feasible; no device change made

A read-only investigation found that the running club publishes a float at
`/wifi/signal` in the credential-safe OSCQuery response. Five stationary
samples returned `0`, so its units and live behavior remain unverified. The
exact stable 1.2.0 WASM import set has no Wi-Fi getter, which means the current
sensor program cannot directly read signal or connection state.

The originally proposed host bridge has now failed its live canary. The study
cartridge exported `setParam`, but factory stable 1.2.0 rejected
`/script/setScriptParam` as an unhandled command. A host-assisted Wi-Fi meter
therefore needs a different verified input surface or a reviewed firmware
update. Before mapping `/wifi/signal` to colors, compare it at several
distances with an independent access-point reading to determine whether `0` is
a real scale endpoint or a placeholder.

A self-contained implementation would require adding read-only Wi-Fi RSSI and
connection-state imports to a reviewed Bentuino firmware fork. That is a future
firmware change requiring explicit authorization and the one-club rollback
process. No club, file, firmware, network setting, or running script was changed
during this investigation.

A third, home-lab-specific option is now preferred for the first radio-metric
experiment: use a least-privilege UniFi API key on the Mac, read the controller's
view of each club, and forward normalized values through a future verified
script-input bridge. Ubiquiti's supported API can enumerate connected
clients and basic connection details, but its public schema does not guarantee
per-client RSSI. The next read-only step is to inspect this controller's
version-specific **Network > Integrations** documentation and a redacted club
response. The key must live in Keychain or ignored `private/` storage and never
in Git or logs. This architecture does not apply to the portable TP-Link router
without a separate router-specific adapter.

## Four-scene sensor playground is running on one club

Luke explicitly requested a local program on the single connected club that
starts solid red and advances red -> green -> blue -> red on ordinary button
presses. `scenes/rgb-button-cycle/` now contains the AssemblyScript source,
reproducible build, and usage notes. The ignored 304-byte artifact has SHA-256
`5655b283af78126b04b3fbdb5914d8e0d0e735278c0987f142ba114b40b281e7`.
Offline validation confirmed only the intended legacy `arduino` imports,
zero-page memory, and `init`, `update`, and `stop` exports.

The club was available as the sole BenTo-discovered prop and also enumerated as
one local USB serial device. BenTo had not selected that serial port, so the
authorized upload used the already-established network endpoint instead of a
hand-written serial command. Only `rgb-button-cycle.wasm` was stored. Runtime
changes were transient: stop any previous script, enable the script layer, set
its blend mode to Alpha, keep FX disabled, and load `rgb-button-cycle`. Firmware
logs verified a 304-byte read, all three exports, `init`, and diagnostic `1000`
(program state red). Ten consecutive HTTP health polls passed.

Luke physically accepted the RGB canary: it displayed solid red, green, and
blue and wrapped back to red. The debug stream independently recorded three
button press/release edges and diagnostics `1001`, `1002`, and `1000`. This
validates the old-ABI `fillLedsRGB` output path, Alpha layer replacement, raw
button reading, one-change-per-press edge detection, and wraparound.

The canary has now been replaced at runtime by
`scenes/sensor-playground/sensor_playground.ts`. Its four quick-press-selected
scenes are Orientation wheel, Orbit comet, Activity flame, and Spin heat. Every
scene retains a nonblack full-club field. The 1,170-byte ignored artifact has
SHA-256
`e28f2c7e1ebc1fc84873b8712277e29d4c4520082503ea6a8298bca245dc5990`.
Offline validation confirmed its nine expected legacy imports and all exports.

The authorized one-club upload and launch passed: firmware read all 1,170
bytes, found `init / update / stop`, initialized the BNO055, printed scene state
`2000`, and reported motion enabled and connected with live projected angle.
The initial transient NaN readings during BNO055 setup stopped once connection
completed. Physical behavior of the four scenes remains under Luke's test.

No firmware flash, credential/settings write, Global ID change, Save All,
automatic launch, reboot, or additional-club mutation occurred. Both WASM files
remain stored; only `sensor-playground` is transiently running.

## Local-on-club execution paths clarified

A read-only review of the exact BenTo/Bentuino 2.1.0b6 source at commit
`4943e3bf850074b11b434f5fc4877376e2f442aa` established two distinct local
artifact paths. BenTo can flatten an assigned block into per-club `.meta` and
`.colors` playback files, upload them, and command the club's local playback
layer. Separately, a `.wasm` scene engine can read IMU/button state and is the
intended architecture for Yuki's button-browsed movement effects.

Pre-rendered playback remains physically untested, and stable 1.2.0 has no
discovered stock button wiring for starting or cycling it. Autonomous WASM is
now physically proven for solid RGB output and raw button cycling; sensor scene
behavior is in canary testing. Boot-time launch and operation after Wi-Fi loss
remain unproven.

After accepting/tuning the four sensor scenes, the next autonomous tests are
operation after Wi-Fi removal and reboot/startup behavior. The separate baked
playback canary still requires an explicit test session.

## Current show-development state

BenTo is currently open on the no-audio
`shows/brightness-calibration/brightness-calibration.bento` project. The single
sequence **CAL - Floor ladder M V A C W** is assigned to project-local Club ID
0 and stopped at `0.000/250.000s`; the club reported 100% battery in the final
read-only status check. The project carries Props-manager global Brightness
`0.883`, saves no prop items or identities, and the UI visibly confirmed
`0.883`.

`tools/brightness_calibration.py` is now the preferred calibration interface.
It holds one known solid-color level at a time: left/right selects brightness,
up/down selects color, and Enter or `q` stops and prints both the compact result
and exact pattern/effective values. The CLI reads values from the generated
`.bento` artifact, verifies the exact live project, prop, assignment, seek, and
pause state, adapts to the short Codex terminal pane, and marks unvisited colors
as `?`. A 10-row live canary passed after the compact-layout fix. The next
action is for Luke to rerun `python3 tools/brightness_calibration.py`, tune the
useful colors, and paste the result. Existing show peaks remain unchanged.

Luke directly observed that the visibility-first show's maximum brightness is
acceptable while its minimum floor is much too low. The former provisional
`0.08-0.12` floor is therefore rejected for the present club/global/room setup.
`docs/brightness-calibration.md` records the source-backed two-stage brightness
model and the fixed-step test.

## Kōjō no Tsuki show prepared offline

A second music-synchronized example now exists under `shows/kojo-no-tsuki/`.
It uses ContributorQ's unmodified 41.743673-second koto recording of **Kōjō no
Tsuki** from Wikimedia Commons under CC BY-SA 4.0. The public source,
attribution, exact audio hash, and absence of modification are recorded beside
the asset.

Offline analysis found four clearly separated melodic phrases beginning at
approximately 0.209, 10.159, 19.772, and 29.013 seconds, followed by a long
decay. The generated score maps them to widening ruined-wall bands, a rising
moon, drifting petals, warm lantern shimmer, and a final cool afterimage. Five
strong entries receive longer whole-club blooms; 43 other measured koto attacks
receive short additive accents. No constant beat grid or strobe is used.

The 195,528-byte `kojo-no-tsuki.bento` artifact has SHA-256
`adf4be29619822dba5dda326e5a5f1cf1a0cd7d3a48e6945fc5270324728040d`.
Generation, JSON parsing, Python compilation, exact audio-hash checking,
provider schemas, clip bounds, deterministic regeneration, continuous floor,
relative asset path, and privacy/portability scans passed. It stores no prop
identities. Its provisional full-field floor is `0.30-0.36` at project-global
`0.883`; this is intentionally more conservative than the rejected
`0.08-0.12`, but remains physically unaccepted until Luke returns.

BenTo was left on the stopped brightness-calibration project. The new show was
not opened, assigned, played, or heard through the Mac, and no club state was
changed. The next action is a native-load inspection followed by one stationary
club with audio muted at the five documented canary times.

BenTo 2.1.0b6 can now be controlled for the current show-authoring workflow
without a fork or MCP server. Its existing OSC Remote Control service is enabled
on port `43000`, and **Ask to restore on startup** is disabled so stale autosave
prompts do not normally block remote reloads. `tools/bento_show_control.py` now
uses built-in OSC commands plus OSCQuery HTTP readback for verified `status`,
`open`, `assign`, `play`, and `stop` operations. Live tests opened the one-minute
and full-song files in both directions, restored the full-song working copy,
routed project-local Global ID 0, observed a five-second transport advance, and
observed Stop reset it to zero. The service binds wildcard interfaces and has no
authentication, so it is suitable only on a trusted local or isolated show
network. No BenTo source changes or MCP dependencies are required.

The reusable workflow is packaged as the repo-local `$control-bento` skill at
`.agents/skills/control-bento/`. `AGENTS.md` explicitly routes `.bento`
authoring, loading, assignment, preview, and stop tasks to it, so a Codex session
opened in this repository can reproduce the workflow without relying on chat
history.

The one-minute **Exit the Premises** proof of concept passed native loading,
Active Block routing, BenTo-side playback, and physical authored-color output
on Club 0. Its initial beat accents were hidden by reversed compositor order.
The generator and the live sequence were corrected to store the additive beat
layer before the Alpha color bed. Luke took over playback after that correction;
his physical assessment of beat visibility has not yet been reported.

A separate full-song score now exists under
`shows/exit-the-premises-full/`. It uses the exact 210.07675-second source MP3
and an interpreted 112-bar form: deceptive intro, two Groove A/B cycles, first
synth lift, breakdown/rebuild, bridge, final build, final peak, and outro. The
musical section names are our interpretation; they are not publisher-supplied
stanza names.

The full score has one continuous Alpha motif layer plus additive section
transitions, rhythmic accents, and low-duty texture layers. It uses five stock
BenTo pattern families across 43 gap-free motif clips, 392 beat accents, 10
section bursts, and four low-duty strobe textures. Repeated musical material
reuses a recognizable visual family with increasing speed, density,
brightness, or spatial fill as the track builds.

**Offline verification:** the generated `.bento` parses successfully, has a
continuous base timeline with no gaps or overlaps, references its audio by a
relative path, contains no saved props, and caps strobe frequency at
approximately 4.27 Hz with a 12% duty parameter. Its SHA-256 is
`0990df3b943284e74048e82f1e1585255045f15723a45ea9de521765c996916b`.

Luke saved the one-minute session, after which the full score opened natively
in BenTo 2.1.0b6. The waveform resolved and all five rows appeared in the
intended compositor-safe order. BenTo rediscovered the single powered physical
Club 1 but initially gave it project-local Global ID 0 because the portable
show saves no props. **Assign IDs from Props** did not recover the earlier ID;
the selected prop was therefore set locally to Global ID 1. No **Save All** or
device-setting write occurred.

**Exit the Premises - Full Show** is now Club 1's Active Block. The working UI
gesture was to drag the small sequence icon under **Blocks > Sequences** onto
the prop card. Dragging the Inspector title and clicking the visible Active
Block text did not assign it. BenTo currently shows `Is Playing` off and
`Current Time = 00:00:00.000`; no playback has started. Luke will press Play
and watch the stationary club. The low-duty strobe layers still require a
photosensitivity warning and explicit physical acceptance before juggling or
three-club playback.

Luke's full-track observation added a new performance requirement: ordinary
patterns must maintain enough whole-club light for audience tracking and safe
catches in a dark venue. The current score's sparse bridge Point clips and early
Range rebuild do not meet that policy because most LEDs can remain black or
nearly black. Preserve the current file as the first form-aware proof, but add a
section-colored visibility-floor layer before calling it performance-ready.

The official Vision Club pattern library has now been recovered and cataloged
in `docs/vision-pattern-library.md`: 30 standard modes, 50 experimental modes,
their adjustments, kinetic classifications, and visual references. No consumer
firmware extraction was needed because Flowtoys publishes the complete visual
chart. The current official attachment is byte-identical to the archived 2021
flowOS 2.6 chart; use it as design inspiration, not proof that later firmware
implementations are unchanged.

All 80 entries now also have project-authored retrieval tags for mood, visible
palette, spatial structure, theme, and energy. These tags are explicitly
inferred from the official snapshot and name; they are not Flowtoys metadata,
and adjustable/time-varying modes may look different.

A separate visibility-first revision of the full-song score now exists at
`shows/exit-the-premises-full/exit-the-premises-vision.bento`. It preserves the
previous full-song file as a rollback baseline, emulates named Vision-library
families with BenTo's stock primitives, and records the references in clip
names. Its six rows are Audio, Visibility floor, Section transitions, Rhythmic
pulses, Vision-inspired textures, and Section motifs. The generated project
contains 11 continuous floor clips, 10 transitions, 312 rhythmic pulses, 11
textures, and 35 section motifs.

The new generator rejects gaps/overlaps in the floor and ordinary floor
brightness below `0.08`; only the final 0.8 seconds deliberately fade to black.
It passed generation, JSON parsing, provider-parameter, timing-boundary,
layer-order, portability, and structural floor validation. It has not yet been
opened in native BenTo or tested on a club. A native-load attempt stopped before
mutation because BenTo still had the original full-song project open with its
unsaved-change marker. Next action: deliberately save or close that app state,
then open the new project,
assign one powered club without playing, keep audio muted for short canaries at
0:00, 1:52.5, 2:22.5, 3:00, and the ending, then physically tune the floor in a
dark clear space before three-club use.

The `0.08` structural assertion above documents what the current generated
artifact contains; it is no longer an accepted physical target. Regenerate the
visibility-first show only after the calibration result is known, changing its
floor values while preserving its already accepted peaks.

## Equipment and ownership

- Yuki bought three Flowtoys **Creators Clubs** for a joint Luke/Yuki
  creative-development project. They are currently with Luke for the work.
- They are developer-oriented Creators hardware, not ordinary Vision clubs and
  not the Flowtoys Connect consumer workflow.
- Club A was initially flashed application-only with 1.2.0b4 through BenTo,
  recovered from the factory golden backup, and then cleanly migrated to stable
  1.2.0. Clubs B and C have now also been cleanly migrated to stable 1.2.0.
- Yuki never flashed or customized the clubs; they arrived in factory state.
- Full factory backups for all three clubs are preserved. There is no longer a
  live club on factory firmware; the archived images are the recovery baseline.

## Public project repository

The project has a public GitHub repository:

```text
https://github.com/lukec/creator-clubs
```

The tracked scope is the short project README, MIT license, project
instructions, and the maintained `docs/` record. Full flash backups, downloaded
firmware, generated firmware images, the superseded session handoff, and the
private device/home-lab inventory remain local and Git-ignored.

Before publication, exact device MAC addresses, DHCP addresses, USB identifiers,
home-network names, and machine-specific paths were moved to the ignored private
inventory and replaced in public documentation with descriptive placeholders.
No Wi-Fi password was present in the documentation or added to Git.

The repository is publicly readable. Luke selected the MIT License on
2026-07-13 for original project material. Third-party hardware, firmware,
libraries, and dependencies remain subject to their own terms.

## Stable 1.2.0 baseline

Luke explicitly authorized migrating all three clubs to public Creators Club
stable 1.2.0. All three firmware migrations completed on 2026-07-13.

**Baseline complete:** Luke sees three simultaneous Props entries in BenTo, all
connected over Wi-Fi. Each club has stable 1.2.0, a recorded ESP32 MAC, and
preserved factory recovery material.

Verified on A after migration:

- ESP32 identity remained MAC `CLUB_2_MAC`, 4 MB.
- Whole-chip erase completed successfully.
- Official stable 1.2.0 merged image wrote successfully.
- Bootloader prefix, public partition table, and the entire standalone 1.2.0
  application verify byte-for-byte against the reviewed artifacts.
- Raw USB serial `yo` returned:

  ```text
  wassup CLUB_2_MAC "Creators Club" "Creators Club" "1.2.0"
  ```

This proves the public 1.2.0 runtime is executing and speaking its discovery
protocol.

## Public 1.2.0 Wi-Fi result

Luke entered the existing 2.4 GHz home IoT credentials locally in BenTo and
clicked `Only Set Wifi` once. The club visibly glowed red, showed a moving green
scan, and briefly flashed green. Color names are Luke's physical observation;
network meaning is assigned only because of the independent checks below.

**Verified:** the Mac remained dual-homed with Ethernet on home trusted
(`CONTROLLER_ETHERNET_IP`) and Wi-Fi on home IoT (`CONTROLLER_WIFI_IP`). Its ARP table then
contained Club A's exact MAC at:

```text
CLUB_2_IP -> CLUB_2_MAC on en1
```

A direct unicast OSC `/yo` from `CONTROLLER_WIFI_IP:10000` to
`CLUB_2_IP:9000` received a 92-byte `/wassup` response containing:

```text
CLUB_2_IP
CLUB_2_MAC
Creators Club
Creators Club
1.2.0
```

Wi-Fi association and the public network discovery protocol are therefore both
working.

BenTo subsequently displayed Club A in the Props panel, and Luke successfully
sent multiple patterns that visibly changed the club. This validates the full
baseline chain: USB migration, public firmware boot, Wi-Fi, OSC discovery,
BenTo prop creation, and live LED control.

## Next migration decision

Luke authorized migrating the other two clubs to the same stable public 1.2.0
baseline. They will be handled one at a time:

1. Disconnect A from USB and connect exactly one factory club.
2. Identify it by MAC before any write.
3. Preserve and hash a complete 4 MB factory backup if that exact club has not
   already been backed up.
4. Migrate and validate that club through live pattern control.
5. Only then repeat the backup/migration/validation process for the final club.

This sequence is complete. Club B passed independent Wi-Fi association and OSC
discovery before C was erased. C's identity and complete factory backup were
then captured and validated before its migration.

## Club B stable 1.2.0 migration

Club B was connected alone and identified before mutation as ESP32-D0WDQ6
revision 1.0, 4 MB, MAC `CLUB_0_MAC`. Its existing complete factory
backup remained intact:

```text
backups/club-b-golden-20260713-1029-full-4mb.bin
size: 4,194,304 bytes
SHA-256: 8d960fe09206fbc9c2810266ce4663f3e947fcc0bdd359bb9fa89a0db263f7fe
```

The whole chip was erased, the official stable 1.2.0 merged image was written at
offset zero with `--after no_reset`, and all 4 MB were verified before first boot
against the prepared expected image. esptool reported `verify OK (digest
matched)` and then hard-reset the club.

The first runtime serial identity query returned:

```text
wassup CLUB_0_MAC "Creators Club" "Creators Club" "1.2.0"
```

**Current B status:** firmware migration, USB protocol, Wi-Fi association, and
direct OSC discovery pass. B appeared at `CLUB_0_IP` with its exact MAC and
returned Creators Club 1.2.0 in `/wassup`.

## Club C stable 1.2.0 migration

Club C was identified before mutation as ESP32-D0WDQ6 revision 1.0, 4 MB, MAC
`CLUB_1_MAC`. Its entire untouched factory flash is preserved:

```text
backups/club-c-golden-20260713-1507-full-4mb.bin
size: 4,194,304 bytes
SHA-256: 95a1610d80cbc90d414b20eacab6fc8927d2abadeeb400f4fa6c724a4bf5ee97
```

Its factory partition table and app0 matched B's golden image byte-for-byte;
app1 was fully erased. Extracted C app0 is:

```text
backups/extracted/club-c-app0-0x10000-size-0x140000.bin
size: 1,310,720 bytes
SHA-256: 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
```

C was then erased, written with the official stable 1.2.0 merged image, and
verified over all 4 MB before first boot. Its runtime identity is:

```text
wassup CLUB_1_MAC "Creators Club" "Creators Club" "1.2.0"
```

**Current C status:** firmware migration, USB identity, Wi-Fi association, and
direct OSC discovery pass. C appeared at `CLUB_1_IP` with exact MAC
`CLUB_1_MAC` and returned Creators Club 1.2.0 in `/wassup`. BenTo now
shows C alongside A and B as three simultaneous Wi-Fi props.

## Three-club identity and settings persistence

Luke used one-at-a-time BenTo control to identify the physical clubs, marked
them `0`, `1`, and `2`, and used the same numbers as their BenTo Global IDs.
He then clicked `Save All`.

**Source-backed behavior:** for a network Bento prop, changing BenTo's Global ID
updates the device-side `settings/propID`. `Save All` opens a confirmation dialog
and, after `Yes`, triggers each prop's `saveSettings` control. Firmware then
serializes all current persistent settings, including `propID`, to flash. This
saves more than the IDs; it saves all current prop settings.

**Independent live readback at 16:49 PDT:** Club B, MAC
`CLUB_0_MAC`, current DHCP address `CLUB_0_IP`, exposed
`/settings/propID = 0` through its OSCQuery HTTP endpoint. This verifies the
BenTo/device ID synchronization for B.

**BenTo UI mapping verified at 17:00 PDT:** selecting each prop showed its
current Network IP, while the Props panel exposed its Global ID. Combining
those with the previously verified IP-to-MAC observations gives:

| Physical/BenTo ID | Club | MAC | Current DHCP IP |
| --- | --- | --- | --- |
| `0` | B | `CLUB_0_MAC` | `CLUB_0_IP` |
| `1` | C | `CLUB_1_MAC` | `CLUB_1_IP` |
| `2` | A | `CLUB_2_MAC` | `CLUB_2_IP` |

All three clubs are now powered and reachable. A post-power-cycle read at 18:21
PDT unexpectedly returned `/settings/propID = 0` from both physical IDs 1 and
2, despite the earlier BenTo assignment and `Save All`. Before sending any
runtime changes, their live IP-to-MAC mappings were independently compared with
the ignored private inventory and both matched the intended physical clubs.
The device-side ID persistence needs a separate investigation; it did not block
safe addressing for the current test.

BenTo's device `Save All` is separate from saving the host-side authoring
session. The current scratch session has little authored content and does not
need to be saved merely to preserve device IDs. Save a `.bento` project through
`File -> Save As` once it contains an intentional timeline or reusable setup.

## First live IMU result

At 17:02 PDT, stable 1.2.0 on ID 0 initially exposed:

```text
/motion/enabled   false
/motion/connected false
```

A transient OSC write to `/motion/enabled` enabled the built-in motion
component without saving settings. Readback then returned `enabled=true`,
`connected=true`, and non-default live orientation, acceleration, gyro,
linear-acceleration, and activity values. The BNO055 and public firmware sensor
path therefore work on the actual club.

The built-in LED FX stage was then enabled transiently with roll isolation,
speed `1.0`, and smoothing `0.15`. Luke is testing whether rotating/tilting ID 0
visibly remaps the current multicolor LED pattern. None of these IMU/FX changes
were saved to flash.

**Visible result at 17:39 PDT:** Luke picked up ID 0 and rolled it around its
long axis. Its displayed color changed in response. This confirms the complete
local path from physical club rotation through BNO055 orientation and the
built-in roll-isolation FX to the LEDs. It does not yet establish whether a
given absolute roll angle always produces the same color or how much smoothing,
latency, hysteresis, or drift is present.

At 18:11 PDT, with Luke's authorization, the same transient FX was changed from
`Roll` to `Projected Angle` through one OSC integer write. Filtered HTTP readback
confirmed `motion_enabled=true`, `motion_connected=true`, `fx_enabled=true`, and
`isolation_axis="Projected Angle"`. No settings-save, firmware, Wi-Fi, ID, or
other-club command was issued.

At 18:21 PDT, Luke powered IDs 1 and 2 and explicitly asked to configure them
the same way. After the identity check above, the same transient runtime values
were sent to those two clubs. The motion connection took approximately one
second to initialize. Final filtered readback from all three clubs was
identical:

```text
motion_enabled       true
motion_connected     true
fx_enabled           true
isolation_axis       Projected Angle
isolation_speed      1.0
isolation_smoothing  0.15
```

No save, firmware, Wi-Fi, Global ID, or Club 0 write was performed. The three
clubs are armed for a physical unison test. Avoid power-cycling them before the
test because these settings are transient.

**Immediate next observation:** juggle all three and compare colors when the
clubs have similar orientations, especially upright/apex and inverted. Report
whether they align, whether one club has a different base palette or phase, and
whether the effect remains coherent in motion.

Luke reported that the three-club mapping worked but felt somewhat laggy and
changed color too abruptly between angles. Source inspection established two
different causes/limits:

- `isolationSmoothing=0.15` retains 15 percent of the previous angle each LED
  update; setting it to zero removes that extra filter delay.
- The stock FX computes `int(angleOffset * 32)` and selects a whole source LED;
  it never interpolates between adjacent colors. Smoothing the angle cannot
  eliminate these 1/32-turn selection steps.

At 18:27 PDT all three clubs were changed transiently to
`isolationSmoothing=0`; filtered readback verified the value plus connected
motion and enabled projected-angle FX on each club.

A 285-byte proof-of-concept WASM scene was then built to map the continuous
projected angle directly to HSV hue. It validated offline with the expected
imports and exports. The file upload to Club 0 returned HTTP 200, but after the
script-load command Club 0 alone stopped responding on HTTP while Clubs 1 and 2
remained reachable. No deployment was attempted on the other clubs.

**Current safety state:** Clubs 1 and 2 remain on the stock projected-angle FX
with smoothing zero. Club 0 requires a physical observation and likely a power
cycle; uploaded scripts are not configured to auto-load, so a power cycle
should return it to the normal unscripted boot state. Do not load this prototype
on another club until Club 0's behavior and serial diagnostics are understood.

Luke subsequently rebooted all three and confirmed they were back online. A
filtered baseline read showed motion and stock FX disabled on all three, which
is the expected clean, unscripted boot state. Luke then explicitly asked to load
the smoother code on all three. Because the previous failure was unresolved,
deployment used Club 0 as a canary instead of risking the whole set.

Club 0 remained healthy after motion enable, Alpha script-layer selection, and
stock-FX disable. Loading `orientation-palette` reproduced the failure: one
partial HTTP response arrived, then all further HTTP requests timed out. Three
best-effort `/script/stop` messages did not recover it. Luke physically observed
Club 0 dark and unresponsive to movement. Clubs 1 and 2 were not loaded with the
prototype and remain reachable in their clean reboot state.

**Immediate recovery:** attempt a greater-than-1.5-second button hold and wake.
Because the script component runs before the button, server, motion, and Wi-Fi
components in the main update order, a hung script may also prevent the normal
software button shutdown path. If the button cannot recover it, connect Club 0
by USB and reset it through the serial interface. Do not load this WASM module
again until serial output identifies where the runtime stalls.

Luke recovered Club 0 through a reboot. The module was then reduced to a
142-byte compatibility version with an empty `init()` and a minimal `update()`:

```text
projectedAngle -> fillHSV(angle, 1.0, 1.0)
```

This version has no mutable globals, helper/wrapping function, branching,
parameters, or host call during initialization. It passed offline validation
and dummy-import execution. A controlled Club 0 load remained reachable for ten
consecutive polls with motion connected and live projected-angle readback.

The exact cause inside the first module is not yet isolated because several
features were removed together. The evidence establishes compatibility of the
minimal version, not that any one removed WebAssembly feature is broken.

After the canary passed, the identical artifact was uploaded and loaded on
Clubs 1 and 2. All three remained reachable through ten further group polls and
reported:

```text
motion enabled/connected  true
stock FX enabled          false
script-layer blend        Alpha
projected angle           live
```

**Correction after physical test:** network reachability and live sensor
readback did not prove that this module rendered. Luke observed all three still
showing the solid/static rainbow and no intended motion response. The reduced
module's unresolved host calls failed without hanging the runtime, making the
ten-poll network test a false positive for artistic functionality.

Inspection then identified a versioned script ABI mismatch. The exact official
CreatorsClub 1.2.0 application contains `fillLedsHSV`, `clearLeds`,
`getProjectedAngle`, `/scripts/`, and `/uploadFile`. Its supported script ABI
uses module `arduino`, integer HSV values, and compiler-generated modules with
an exported zero-page WebAssembly memory. The first project modules instead
used newer component-style imports and had no memory section.

An ABI-correct but still memory-less 129-byte solid-red WAT diagnostic was
loaded on Club 0. It immediately reproduced the runtime stall, showing that
correct import names alone were insufficient. Club 0 is currently offline
awaiting another reboot; Clubs 1 and 2 remain online and were not given this
diagnostic.

The official BenTo compiler bundle was downloaded and inspected. It contains
AssemblyScript 0.27.37, and its own sample exports a zero-page `memory`. Both the
solid-red canary and orientation scene have now been rebuilt with that exact
compiler pattern. Their imports and memory/export structure match the official
sample, but neither rebuilt artifact has yet been loaded onto a club.

Luke rebooted Club 0 and reported it back. The compiler-built 136-byte
`solid-red.wasm` was uploaded and loaded on Club 0 only. It remained reachable
through all ten one-second HTTP polls, unlike both memory-less WAT modules.
This verifies that the AssemblyScript/compiler memory layout resolves the
control-plane stall. Luke then observed that Club 0 was still rainbow, not red.
The compiler-built artifact therefore also failed the visual gate. Do not
advance to the motion scene.

**Loader diagnosis:** Club 0 was connected by USB, but its serial stream carried
binary protocol traffic rather than readable loader text. Enabling the live
`/comm/server/sendDebugLogs` flag exposed the firmware's loader messages over
WebSocket instead.

With the first compiler-built red module, the club reported the file found and
read, WASM launched, but only `init / stop` found. `update` was absent even
though it was exported. That function called `arduino.fillLedsHSV`, so WASM3
could not compile/link the update body. The module stayed online but never
painted LEDs.

The canary was changed to use `arduino.fillLeds(0xff0000)`, the exact host call
used by BenTo's own compiler sample. The new 110-byte build produced explicit
live logs:

```text
[script] Script read 110 bytes
[script] Script Launching wasm...
[script] Finding functions
[script] Found functions : init / update / stop
[script] Calling init
```

Club 0 remained reachable through three post-load polls. This proves the file,
loader, memory layout, and `fillLeds` host-call link work. Luke then reported no
visual change: Club 0 remained rainbow.

A one-shot execution marker was added to the same module. Live logs proved
`init()` executed (`101`) and `update()` executed (`202`) while `fillLeds` was
called in every update. The LEDs still did not change. This establishes a real
integration boundary: the legacy script call is callable but does not affect
the LED output path used by this Creators Club configuration. An undocumented
mode/focus requirement remains possible; calling this definitively a firmware
bug requires either exact build-source confirmation or a known-working upstream
scene.

The diagnostic was stopped. All three clubs were then returned to the last
working built-in configuration: scripts stopped, motion enabled/connected,
stock FX enabled, axis `Projected Angle`, speed `1.0`, and smoothing `0`.
Filtered readback confirmed those values on every club.

**Current physical test:** the clubs should again react to projected angle with
less filter lag than the original `0.15` setting, but still use the stock
32-position lookup. The custom continuous renderer is not working on stable
1.2.0.

**Physical acceptance at 22:21 PDT:** Luke confirmed that the restored effect
works on all three clubs and that smoothing `0` feels less laggy. The color
changes are still visibly coarse: during movement he sees large jumps and does
not perceive 32 distinct colors. The source code permits at most 32 source
positions per revolution, but the physical observation is the stronger
artistic result: the current source pattern, adjacent-color similarity, motion,
and sampling combine into substantially fewer visibly distinct steps. Do not
describe this scene as a 32-color visual effect.

**Next experiment implementation:** `tools/activity_brightness.py` keeps the
proven projected-angle hue local and maps Club 0's `/motion/activity` value to
whole-club brightness from the Mac. It uses only credential-safe
`GET /?config=0` snapshots and transient OSC brightness messages, with a dim
floor, bright ceiling, asymmetric attack/release smoothing, and automatic
restoration of the startup brightness on normal stop.

The first run at 22:25-22:29 reached Club 0 and drove it to the stillness floor,
but the sampled activity stayed within approximately `0.0019-0.0035`; no
movement interval was captured, so the artistic mapping remains untested. The
controller was stopped and readback verified brightness restored to `0.5`.
There was no firmware flash, upload, settings save, or change to Clubs 1 and 2.
Rerun only when Luke is holding Club 0 and can perform the still/slow/fast test.
Continuous central color and a firmware script-layer repair remain later
engineering options.

**Projected-angle physical result at 18:16 PDT:** Luke moved the club through a
full end-over-end circle and reported that it worked very well. In the current
palette/offset, red appeared when the club was upright, and the colors progressed
around the circle. While juggling, Luke observed a compelling effect in which
the clubs appeared the same color at particular points in the air.

This validates projected angle as the project's first repeatable artistic input:
orientation can act as a spatial color coordinate. `Red is up` describes this
current pattern and offset, not a universal firmware status or fixed hardware
meaning. A controlled three-club test is still required before claiming that
all three devices share identical phase/calibration.

## Immediate next engineering step

### Network decision

Luke now agrees that the clubs should move off the home IoT network and
onto a dedicated show network. Stable 1.2.0's unauthenticated full OSCQuery
response exposes the configured SSID and password to any network participant
that can reach a club. The dedicated network must use a credential that is not
reused anywhere else and must have no route to the home networks.

The unused TP-Link Archer C4000 is the current candidate. No router or club
network settings have been changed yet. When Luke chooses to begin, configure
the Archer offline, keep its WAN disconnected, join the dual-homed Mac, and
migrate Club 0 as a canary before changing Clubs 1 and 2. The detailed target
topology and checklist are in `docs/bento-and-network.md`.

### Creative work

1. On explicit approval, run a transient Club 0 hybrid test: stock
   projected-angle hue locally, with host-mapped movement intensity controlling
   whole-club brightness. Test stillness, a slow arc, and a fast swing/spin.
2. If brightness makes movement energy legible, add a launch/catch pulse as the
   third primitive. If not, tune or replace the movement metric before scaling.
3. Treat the successful projected-angle palette as scene `01`; retain its
   stepped stock rendering as the baseline rather than hiding that limitation.
4. Later build an angle-gated 12-spoke POV mode and short-press scene selection.
5. Build the same four scenes in a central Mac-side controller, compare both
   tracks, and put them on a BenTo Audio-plus-Block song timeline.
6. Have Yuki rehearse with the small catalog, tune it from his actual movement,
   and expand only the useful combinations toward a 20-scene library.
7. Open and natively resave the generated first music timeline once BenTo is
   unlocked; keep the generated source as the reproducible record.

Yuki's desired workflow and the proposed rehearsal/composition architecture are
recorded in `docs/creative-workflow.md`.

**New POV hypothesis:** the 32 longitudinal LEDs can provide radial pixels while
a fast repeatable planar swing provides angular columns. The first test should
be rings and 12 angle-gated spokes, not text or a logo. The IMU tracks attitude,
not room position, so detailed stationary imagery will depend on consistent
swing geometry. No POV test has yet been run.

Do not click `Auto Assign IDs`; it rewrites IDs according to manager order. Do
not click `Assign IDs from Props` as part of assignment; it reads device IDs
back into BenTo rather than choosing new ones.

### First music-synchronized PoC prepared offline

The first central-show package now exists under
`shows/exit-the-premises-poc/`. It uses the first 60 seconds of Kevin MacLeod's
CC BY 4.0 track **Exit the Premises** and contains:

- a 60-second, 192 kbps MP3 excerpt with a 0.5-second ending fade;
- a deterministic `.bento` generator;
- a generated BenTo 2.1.0b6 project with one Audio layer;
- 17 lower-brightness color-bed clips; and
- 128 additive beat-pulse clips on a 128 BPM grid.

The score applies to every connected prop without Global-ID filters. This is
intentional because device-side Global-ID persistence is still unresolved.

**Offline-validated:** the audio is exactly 60 seconds, the generated file is
valid JSON, its layer/type/count structure is internally checked, all clips
stay inside the sequence, the relative audio asset exists, and its 128 beat
pulses span the minute. The project and audio contain no saved props, private
addresses, device identifiers, or credentials.

**Native BenTo load now passes:** the first overnight file loaded but showed an
empty timeline because it used the older `models.timelines` / `Timeline` schema
and older `/library/generic/...` pattern paths. A native 2.1.0b6 scratch save and
the matching source established the current format:
`models.sequences` / `SequenceBlock` and `/library/patterns/...`.

After correcting and regenerating the project, BenTo displayed the resolved
audio waveform plus `Color bed` and `Beat pulses` across exactly one minute.
The transport remained stopped at `00:00`; no sound was played and no club was
contacted. The remaining canary gates are visual scrubbing, five seconds on
Club 0, and then audio/light timing before powering the other two clubs.

## Historical BenTo setup issue, now bypassed

BenTo 2.1.0b6 initially reopened with its Firmware Uploader filtered to
`Creators Ball`, so that panel showed zero compatible devices. An automated
click on `Detect Props` did not add A over USB even though the equivalent raw
serial identity query worked. Selecting `Creators Club` fixed uploader
compatibility, and network OSC discovery subsequently added all three props.
The remaining USB Props-panel discovery bug is non-blocking.

Completed BenTo setup sequence for A:

1. In `Firmware Uploader`, change the middle firmware/device dropdown from
   `Creators Ball` to `Creators Club`. Do not click `Upload firmware`.
2. Confirm the left panel changes from `0 Compatible Device` to one CP2102N
   device. **Verified by Luke:** it now shows one compatible device.
3. Enter the existing 2.4 GHz home IoT SSID and password locally in BenTo.
   Do not paste the password into chat or project files.
4. Use `Only Set Wifi` once.
5. Put the Mac's Wi-Fi interface on that same SSID/VLAN, confirm A in UniFi, and
   then use Props -> `Detect Props` for network discovery.

## Verified working pieces

- The Mac recognizes the connected club through a Silicon Labs CP2102N
  USB-to-UART bridge.
- Serial device paths:

  ```text
  /dev/cu.usbserial-DEVICE
  /dev/tty.usbserial-DEVICE
  ```

- USB bridge serial identifier:

  ```text
  PRIVATE_USB_SERIAL
  ```

- BenTo 2.1.0b6 is installed in `/Applications` and recognizes the USB bridge as
  a compatible device.
- On the archived factory test firmware, a passive serial capture at 115200
  baud produced valid text continuously:

  ```text
  Power up Everything
  ```

  A five-second sample contained 625 identical lines (approximately 125 lines
  per second).

## Historical factory-firmware Wi-Fi test (failed)

- The test Wi-Fi is a 2.4 GHz SSID mapped to UniFi's `home IoT`
  `CLUB_LAN_SUBNET` network. The actual SSID and password are intentionally not
  recorded here.
- During the test, the Mac had Ethernet on home trusted (`CONTROLLER_ETHERNET_IP`) and Wi-Fi
  on home IoT (`CONTROLLER_WIFI_IP`).
- BenTo correctly selected the Wi-Fi interface and logged discovery broadcast
  to `CLUB_LAN_BROADCAST` with local address `CONTROLLER_WIFI_IP`.
- BenTo's `Only Set Wifi` action was run once for the connected club. BenTo
  logged:

  ```text
  Setting Wifi infos to prop...
  All Props wifi are set !
  ```

- The club did not appear as a new UniFi client, did not appear in BenTo's Props
  list, and did not answer a direct unicast OSC `/yo` sweep of all addresses on
  `CLUB_LAN_SUBNET` at UDP port 9000.
- The club changed from green to white/light-purple after the credential action
  and restart. This color is not proof of Wi-Fi state.

## Flash completed at 10:08 PDT

Luke initiated an `Upload firmware` operation in BenTo with:

```text
Category: Creators
Device: Creators Club
Version: 1.2.0b4
Set Wifi During flash: enabled
```

BenTo reached `Progression : 1.000` and logged that one prop was flashed, all
props were flashed, Wi-Fi settings were sent, and all props' Wi-Fi was set. The
club then re-enumerated as one compatible USB device. macOS independently still
showed `/dev/cu.usbserial-DEVICE` after completion.

**Verified:** the firmware write completed without a reported error and the USB
controller returned after restart.

**Verified:** after an additional 15-second discovery window, the Props list
remained empty. This is a post-flash Wi-Fi/discovery question, not evidence that
the flash write failed.

**Physical observation:** a single dim red light is visible from the internal
board. It first appeared when flashing began and remained visible afterward;
the 32 outward-facing club LEDs were not described as red. USB continued to
enumerate normally while this light was present.

The public Creators Club board definition assigns pins 25, 26, and 27 to the
external LED clock/data/power path but does not define a separate controllable
red status LED. The internal red light is therefore likely a board-level power,
USB-UART, or boot/activity indicator, but this is not verified without a board
schematic or physical identification of the component.

At approximately 10:11 PDT, after the completed flash and USB recovery, Luke
unplugged the club. It immediately went fully dark. This confirms that the dim
internal red light depended on USB power or USB-powered board state. It does not
yet prove whether the battery is charged or whether the controller is asleep.

A subsequent brief press-and-release produced no visible response. Luke then
tried multiple tap and hold patterns, including the controlled approximately
one-second hold; none produced any response.

**Verified regression:** this club responded on battery before the public
firmware flash but no longer wakes or latches power from battery afterward.
This rules out a merely too-short first tap. The new firmware may not match this
hardware revision's power-latch/button behavior, or the flash may have changed a
required setting. A coincidental battery fault is possible but less consistent
with the timing.

**Important:** no backup of the factory application firmware was made before
Luke initiated the flash. Subsequent full-flash reads from A and golden Club B
allowed it to be recovered exactly.

## Current conclusion

**Verified:** USB works, but network connectivity has not been established.

**Verified:** BenTo's credential workflow does not wait for or validate a reply
from the club before printing its success message.

**Historical observation:** before the 10:08 flash, `Power up Everything` was
absent from the current public BenTo source and from all public Creators Club
firmware binaries offered by BenTo, versions 1.0.3 through 1.2.0b4.

**Retracted historical inference:** the initial working theory was that Yuki's
installed firmware was private or custom. Luke later confirmed Yuki never
flashed the clubs. Golden Club B proves the installed application is factory
test firmware containing `test firmware version 0.0` and
`Power up Everything`.

## Historical recovery gate (completed)

At this point in the recovery, Club A's factory app0 was restored and verified
over USB, and battery operation was the next test. That test later passed; A was
subsequently migrated to stable public 1.2.0 as recorded in the current canary
state at the top of this document. Do not flash either remaining club.

## USB recovery and application check at 10:14 PDT

Luke reconnected the same club. The faint internal red light returned and BenTo
again listed one compatible CP2102N device. BenTo's Props pane remained empty.
The log showed the serial device added at 10:14:02, briefly removed at 10:14:21,
and added again at 10:14:25.

A five-second passive 115200-baud capture returned zero bytes. A single
documented, non-mutating serial identity query (`yo`) also returned zero bytes;
a running public BentoFlow application should answer with `wassup` and its
identity.

**Current diagnosis:** the CP2102N USB bridge is healthy, but the newly flashed
ESP32 application is not running far enough to initialize/respond over serial.
This explains the combined absence of battery power latch, serial identity, and
network discovery. Wi-Fi is not the primary blocker.

The 1.2.0b4 manifest specifies an application offset of `0x10000`, 4 MB flash,
DIO mode, 80 MHz flash frequency, and hard reset after flashing. It is not yet
known whether Luke's BenTo operation wrote only `firmware.bin` at `0x10000` or
used `firmware_full.bin` at `0x00000`.

**Next safe recovery step:** with explicit approval, read the full 4 MB flash
into a backup without erasing or writing it. Inspect the partition table and
hash/archive the image before any further flash operation.

## Club A backup and confirmed root cause

Luke authorized a read-only backup. Two high-speed attempts at 921600 and
460800 baud failed immediately after the temporary RAM reader stub changed baud;
neither read or wrote flash. A 115200-baud read completed successfully:

```text
File: backups/club-a-flashed-20260713-1018-full-4mb.bin
Size: 4,194,304 bytes
SHA-256: 4ce1ad2c9305370596343e55adf3dc4ddd36f2e86f4312223208104cb2ec6bd2
Chip: ESP32-D0WDQ6 revision 1.0
Crystal: 40 MHz
MAC: CLUB_2_MAC
Tool: esptool.py 4.8.1
```

The A image's bytes at `0x10000` exactly match the complete public 1.2.0b4
`firmware.bin` SHA-256, while its prefix does not match `firmware_full.bin`.
Therefore BenTo performed an application-only write and preserved A's original
bootloader and partition table.

The preserved partition table defines:

```text
nvs      0x009000  size 0x005000
otadata  0x00e000  size 0x002000
app0     0x010000  size 0x140000
app1     0x150000  size 0x140000
eeprom   0x290000  size 0x001000
spiffs   0x291000  size 0x16f000
```

**Confirmed root cause:** public 1.2.0b4 `firmware.bin` is `0x161660` bytes, but
A's original app0 partition is only `0x140000` bytes. The write starting at
`0x10000` ended at `0x171660`, overflowing app0 by `0x21660` bytes (136,800
bytes) and overwriting the beginning of app1. Neither application slot remains
bootable. This explains USB-bridge detection with no application response,
battery latch, or Wi-Fi.

NVS, EEPROM, and SPIFFS lie outside the overwritten range and are present in the
backup. Their semantic integrity has not yet been analyzed, but the failed
application write did not reach their address ranges.

## Candidate recovery firmware comparison

Luke proposed reverting to 1.1.10 as a previous stable version. Direct package
metadata shows:

| Version | Generated | Characterization |
| --- | --- | --- |
| 1.1.10 | 2026-01-14 | Older non-beta release; commit recorded |
| 1.2.0b4 | 2026-02-01 | Beta build currently flashed; no commit in manifest |
| 1.2.0 | 2026-03-04 | Newer non-beta release; commit recorded |

BenTo labels 1.2.0b4 as `latest` because of server-list ordering, despite the
1.2.0 package being newer and non-beta.

All three packages specify ESP32, 4 MB flash, DIO mode, 80 MHz, and application
offset `0x10000`. Therefore an application-only downgrade to 1.1.10 may fail in
the same way if the underlying bootloader/partition layout is incompatible.

If a public recovery image is ultimately selected, 1.2.0 is currently the more
defensible stable candidate than 1.1.10. This is not authorization to flash it;
first preserve and inspect the current full flash.

## Revised recovery plan: use a golden working club

The two untouched working clubs remove the need to guess which public release
matches the factory hardware/layout. Treat them as irreplaceable golden
references.

1. Physically label the flashed/nonworking club `A`.
2. Label the untouched working clubs `B` and `C`.
3. Read and hash the full 4 MB flash from `A` before another write.
4. Read and hash the full 4 MB flash from one golden club, preferably `B`.
5. Compare bootloader, partition table, application, NVS, filesystem, and other
   regions.
6. Identify the original application version/build from the golden image.
7. Restore only the regions required to make `A` boot, preserving A's
   device-specific settings/files where possible.
8. Keep `C` untouched as the final fallback/reference.

Do not blindly clone an entire golden flash onto A: NVS or filesystem regions
may contain per-device identity, calibration, shows, or credentials. Compare and
extract first.

## Club B golden backup and recovery image

Club B was connected and read at 115200 baud without any flash write:

```text
File: backups/club-b-golden-20260713-1029-full-4mb.bin
Size: 4,194,304 bytes
SHA-256: 8d960fe09206fbc9c2810266ce4663f3e947fcc0bdd359bb9fa89a0db263f7fe
Chip: ESP32-D0WDQ6 revision 1.0
MAC: CLUB_0_MAC
Read time: 377.8 seconds at 115200 baud
```

Extracted golden application:

```text
File: backups/extracted/club-b-app0-0x10000-size-0x140000.bin
Size: 0x140000 (1,310,720 bytes)
SHA-256: 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
ESP image checksum: valid
ESP validation hash: valid
Last non-0xFF byte: 0x0b1f3f within the extracted partition
```

B's app0 contains `Power up Everything` and `test firmware version 0.0`.
B's app1 begins with erased `0xFF` bytes and is blank. OTA data selects app0
with sequence 1.

Offline A/B region comparison:

| Region | Result |
| --- | --- |
| Bootloader | Identical SHA-256 |
| Partition table | Identical SHA-256 |
| OTA data | Identical SHA-256 |
| app0 | A overwritten; B valid golden image |
| app1 | A partly overwritten; B blank |
| NVS | Different; preserve A |
| EEPROM | Identical SHA-256 |
| SPIFFS | Identical SHA-256 |

**Minimum-risk repair:** write only B's full app0 partition image to A at
`0x10000`, verify it, and test boot/battery behavior. Do not touch app1 during
the first repair. Its damaged contents are inactive because OTA data selects
app0; it can be erased later if required after A is demonstrably recovered.

## Club A app0 recovery completed

Luke explicitly authorized the prepared app0-only repair. Before writing,
esptool confirmed Club A's expected MAC `CLUB_2_MAC`, ESP32-D0WDQ6
revision 1.0, and 4 MB flash.

The golden source hash was rechecked, then esptool erased and wrote only:

```text
0x00010000 through 0x0014ffff
```

It wrote B's full `0x140000`-byte app0 partition image, verified the write hash,
and hard-reset A. No other region was included in the command.

Post-write evidence:

- A emitted 5,271 serial bytes in two seconds at 115200 baud.
- All 251 nonempty lines were exactly `Power up Everything`.
- A separate esptool `verify_flash` compared all `0x140000` bytes at `0x10000`
  with B's extracted golden app0 and reported `verify OK (digest matched)`.
- esptool hard-reset A again after verification.

**Current status:** A's factory application and battery-powered operation are
restored. A's inactive app1 remains partly overwritten; do not use OTA/update
operations until it is deliberately erased or restored.

After the final hard reset, while still connected to USB, A's 32 main LEDs
illuminated in the previously described white/light-purple color. Luke will call
this observed state **white** from now on. This confirms the restored factory
application is again controlling the main LEDs; white is not assigned a Wi-Fi
meaning.

Luke later unplugged A and left the desk. At 13:38 PDT, A remained solid white
while macOS confirmed `/dev/cu.usbserial-DEVICE` was absent. It had therefore run
from battery for roughly three hours after the restore. This validates the
battery power latch and establishes Club A as functionally recovered on factory
app0.

## Factory-to-public migration finding

Luke confirmed Yuki never flashed these clubs; all three arrived with factory
firmware. Golden B identifies it as `test firmware version 0.0`.

The public 1.2.0 and 1.2.0b4 full images use a different partition layout from
the factory image:

| Region | Factory layout | Public 1.2.x full layout |
| --- | --- | --- |
| app0 | `0x10000`, size `0x140000` | `0x10000`, size `0x1e0000` |
| app1 | `0x150000`, size `0x140000` | `0x1f0000`, size `0x1e0000` |
| EEPROM | `0x290000`, size `0x1000` | Removed |
| SPIFFS | `0x291000`, size `0x16f000` | `0x3d0000`, size `0x20000` |
| Coredump | Absent | `0x3f0000`, size `0x10000` |

Therefore moving a factory club to public 1.2.x is a partition-layout migration,
not an ordinary application update. It requires a carefully planned full flash,
backups, and acceptance that the factory EEPROM/SPIFFS layout is replaced. BenTo
did not prevent an oversized application-only upload to the factory layout.
