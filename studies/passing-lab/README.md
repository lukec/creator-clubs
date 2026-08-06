# Passing Lab V1

Passing Lab is a separate, mobile-first neutral-club library/viewer. It does
not replace Stage Lab, control physical clubs, or render Club Lab LED effects.

Run a local HTTP server from the repository root and visit
`/studies/passing-lab/`. The required browser files are:

- `studies/passing-lab/index.html`
- `studies/passing-lab/passing-four-count-stage.iife.js`
- `tools/web-sim/src/passing-library.mjs`
- `tools/web-sim/src/passing-pattern-compiler.mjs`
- `tools/web-sim/src/passing-playback.mjs`
- `tools/web-sim/src/passing-four-count-3d.mjs`
- `tools/web-sim/src/passing-generic-3d.mjs`
- `tools/web-sim/src/cascade-model.mjs`

The generated IIFE contains Three.js, the neutral club geometry, and the
3D-stage renderer, so it has no runtime CDN or `node_modules` dependency. Run
`npm --prefix tools/web-sim run build` when its source changes, then deploy the
page, bundle, and listed modules together with their existing relative paths.

The library's authored truth is a versioned declarative event schedule. Every
event specifies beat, juggler, throwing hand, self/pass/hold role, target,
semantic pass path, throw type, resolved flight duration/spin/height profile,
and throw/catch poses. It also records a Sky/Earth/Pass start convention.
Siteswap or Prechac labels can be added later, but are not used as the rendering
model.

Luke's confirmed passing vocabulary gives `path` a hand-to-hand meaning:
`straight` changes hands at the receiver (right-to-left, or its left-to-right
mirror), while `crossing` stays in the named hand (right-to-right or
left-to-left). Formation topology is separate. The literal `target` performer
defines who receives a pass, so a long star chord or route through the middle
does not become a crossing pass merely because lines cross in an audience-view
diagram.

`passing-pattern-compiler.mjs` turns that authored schedule into the execution
truth consumed by playback. It validates explicit actions and performers,
checks straight/crossing catch-hand semantics, extends a non-hand-periodic
notation cycle with its opposite-hand continuation, rejects two arrivals in the
same performer/hand/beat slot, and derives a safe initial club allocation for
each hand. The page passes that compiled pattern object to the stage; the
generic model has no catalogue import and no per-pattern-ID animation branches.
Technique, route, throw profile, and placement exceptions belong in the pattern
data unless they justify a separately validated physical sampler.

V1 contains twelve playable cards in each 2-, 3-, 4-, and 5-person section.
Every card now exposes one visible description/origin contract. Fifteen cards
have an attributed plain-language summary of pattern-specific published source
material, 32 are explicitly labelled **Passing Lab studies**, and the retained
Stage V opening is labelled **Luke-specified choreography**. Published cards
link the exact supporting page or PDF section; authored cards do not borrow a
broad research link and present it as their own source.
Its known-pattern core includes 1-, 2-, 3-, and 4-count two-person schedules;
a canonical 3-person V 2-count/4-count feed; the existing Stage V opening as a
non-canonical visual variant; a directed 3-count triangle; a four-person PPS
cross feed and mixed-count Accommodation; and 1- through 4-count five-person
star routes. The remaining explicit study cards make their convention visible
rather than claiming a universal community start. Unverified named material,
currently Chocolate Box and a canonical triangle circuit/pair/self start, stays
in **Coming next** instead of being simulated speculatively.

Audience-view coordinates are explicit in data: negative `x` is audience-left,
positive `x` audience-right; `z = 0` is upstage/backdrop and larger `z` is
downstage/toward the audience. Facing angles use `0° = +z/downstage`,
`90° = +x/audience-right`, and positive rotation around `+y`. Target order is
always the event's literal
`target` ID, not an inferred visual direction. Published-source descriptions
are concise Passing Lab paraphrases with direct attribution; no prose,
diagrams, graphics, source code, or bulk pattern data were copied from those
sites. Modern Passing is visibly linked where its CC-BY teaching material
informed the summary and timing. The triangle card's old V-feed citation was
incorrect and now points to the Compendium's ten-club triangle section. That
source describes base-to-base singles and point-to-base doubles, while the
current animation still declares all passes as doubles, so the visible card
warns that its throw split needs review.

The normal URL hash stores only the selected pattern and neutral club colour.
It never uses a `data:` URL.

## Playback and inventory boundary

The active viewer is first in the document: it remains sticky beside the
catalogue on desktop, and a phone selection scrolls/focuses the active title.
It provides beat stepping, a beat-labelled scrubber, 0.25×/0.5×/1× playback,
and Reset replay of Sky/Earth/Pass. The normal reading path is now title,
source/origin description, source link, animation, controls, and a
plain-language **What happens now** line. Inventory, timing derivation,
execution/token cycles, throw profiles, model identity, and research/legal
notes sit under a closed **Technical details** disclosure.

`passing-playback.mjs` makes the declared `clubCount` visible rather than
treating it as metadata only. Its deterministic ledger follows each unique club
token across held, newly launched, multi-beat airborne, caught, and re-held
states. A self/pass event must select a token from the thrower's declared hand;
an earlier double can remain airborne while the next beat launches more clubs.
The helper asserts that held plus active-flight tokens equal the card's declared
inventory, so scrubbing does not add or duplicate props merely to make a
formation look full.

The current beat's instruction remains active through its load, flight, and
catch phases, but the sampled physical state calls a club airborne only between
release and catch. This distinction prevents the inventory and accessibility
text from claiming that a hand-connected club is already in flight.

Most cards declare three clubs per person. Two explicit data exceptions remain
visible rather than being normalised away: the retained Stage V opening is a
three-prop, non-loop-conserving **visual study** with a one/one/one allocation;
the directed triangle card explicitly declares ten clubs with a four/three/three
allocation. Each triangle pass is explicitly a `double`: two beats of flight,
`2.5` end-over-end rotations (one full rotation beyond the `1.5`-turn single),
and `2×` the generic single-pass arc rise. The longer declared flight keeps its
arrivals out of the simultaneous self-throw catch hand. These numeric values are
a reviewable animation profile based on Luke's description, not measured
ballistics or physical calibration. The visual-study card is deliberately not
claimed as a physical ownership loop, and the normal executor is not a complete
siteswap/Prechac simulator.

Audience view is the default. Every playable pattern now uses the shared
Three.js surface. Per-performer views use the active 3D sample's eye placement
and gaze direction; they are model cameras, not measured eye tracking or a
claim of photorealism.

## Physical 3D foundation: causal six-club facing pairs

Twelve cards now share the intentionally bounded physical 3D player: 1-, 2-,
3-, and 4-count, PPS, Bookends, Countdown, and their five authored left-start
variants. Support is derived from data, not an ID list. A card must declare a
synchronous face-to-face six-club schedule, one single straight-pass/self row
per person and beat, and a valid three-beat token continuation from every catch
hand into that token's next throw. The player tracks exactly six persistent
tokens: three initially assigned to each person. Every token carries a self or
scheduled pass into its next event three beats later; nothing is parked merely
to make the formation look full. Sky starts from the low ready side as a
whole-arm carry, Earth lowers the carry together, and Pass begins the visible
hand-connected load before ballistic release. The other 36 cards use the
compiled-pattern 3D executor: it renders their declared people, formation,
target routes, and entire club inventory, but does not claim the detailed
model's physical/collision coverage.

### Current viewer revision: v22 source-first pattern descriptions

The viewer no longer leads with compiler and model nomenclature. Its catalogue
cards show title, source/origin description, origin, people, and clubs. The
active card links published source material directly; an authored card instead
says that no published description is mapped to that exact schedule. Visible
current-action chips use ordinary sentences such as “Left makes a right-hand
pass to Right.” Detailed catch hands, flight beats, token cycles, rotations,
height multipliers, inventory state, and executor notes remain available but
collapsed.

`sourceMaterial` is validated for all 48 playable cards. The 15 published cards
must have a nonempty pattern-specific reference; 32 Passing Lab studies and one
Luke-specified card cannot claim published references. Descriptions reject the
old `PSS`/`PSSS` shorthand and implementation terms. Desktop and 390×844 local
browser review showed direct source links, an honest no-source authored card,
the closed technical disclosure, no horizontal overflow, and the triangle's
visible source/animation mismatch warning. The 116-test suite and bundle build
pass. The static module graph uses cache revision `source-descriptions-v22`.

Publication evidence will be added after the exact source and Pages commits
build and pass cache-busted public verification.

### Prior viewer revision: v21 causal PPS token ownership

Luke's catch invariant is now executable: after the opening release, no two
live clubs may be attached to the same performer/hand. The visible PPS defect
had two independent causes. Its count-in compiler chose two left-hand clubs and
one right-hand club for a right-start pattern, and the generic animation marked
the opening right pass caught before the receiver's incumbent left-hand club
released.

The event schema now separates a throw's nominal flight from its token
recurrence. Every facing-pair throw remains an ordinary single with
`flightBeats: 1`; an explicit `tokenCycleBeats: 3` states that the caught club
must supply the target catch hand's throw three beats after its prior launch.
Compiler version 4 validates that continuation after completing the
alternating-hand period and uses it to derive PPS's `L1/R2` count-in
(`L2/R1` for the left-start variant). Playback reserves that specific token
instead of choosing any club found in the hand. Patterns without an independent
token-cycle declaration are labelled honestly in the UI rather than being
claimed as causally validated.

Physical selector version 17 derives the 12-card support set from this
declarative contract. In dense `0.025`-beat sweeps across every supported card,
each hand-connected club had a unique performer/hand holder after opening
release. Local slow rendered PPS review showed the next left-hand clubs released
by beat `1.67` (four airborne, two hand-connected) before the opening passes
became caught by beat `1.99` (two airborne, four hand-connected). The static
module graph uses cache revision `causal-pps-v21`.

The generic catalogue is not yet a fully causal siteswap model. Its cards keep
their existing compatibility token-cycle default until their recurrence is
declared and validated from pattern knowledge. This avoids inventing
per-pattern corrections while making the remaining modelling boundary visible.

Source commit `5e2d352` is on `main`. Pages commit `b9c749f` reached the exact
`built` state, and all eight public Passing Lab files matched the committed site
bytes. Cache-busted live PPS review repeated the release-before-catch transition
at beats `1.67` and `1.83` with the dedicated physical six-club model.

### Prior viewer revision: v20 declarative throw and pass semantics

**User-confirmed terminology:** a straight pass changes hands at the receiver;
a crossing pass remains in the same hand. `target` continues to encode formation
topology independently. The compiler rejects contradictory path/catch-hand data
and any completed execution cycle with two clubs arriving in one receiver hand
on the same beat.

Every event carries a named `throwType` and its resolved `flightBeats`, `spins`,
and `heightMultiplier`. Playback retains airborne tokens for the full declared
duration instead of completing every throw inside its launch beat. The generic
3D executor reads those values directly, including the directed triangle's
explicit two-beat, 2.5-rotation, 2×-arc doubles. The UI exposes the same semantic
and numeric profile. Self throws still default independently to singles; a rare
double or triple self must be declared on that specific event. None of these
changes adds a pattern-ID animation branch.

The single/double values are declared teaching-model policy. Only the narrower
canonical two-person sampler claims its existing Earth-gravity timing and
detailed physical/collision checks; v20 does not turn the generic catalogue into
measured biomechanics.

### Prior viewer revision: v19 compiled orientation and body-path guard

The compiler now turns each declared performer heading into one normalized
actor-local frame before execution. The generic model uses that frame for the
person mesh, hands, pass release/catch lanes, follow-through, and participant
camera. Compiler validation rejects non-finite formation data and any pass that
places either partner behind the other's facing. This fixed one Z-axis sign
error that had aimed 118 generic pass events across 31 cards behind bodies;
there is still no per-pattern-ID animation logic.

Every generic pass also has a conservative horizontal check: its
release-to-catch grip segment must remain at least `0.30 m` from every performer
centreline. All catalogue passes clear that guard; the minimum is `0.376 m`.
This is not the detailed full-club/body collision model used by the four
canonical physical cards. Versioned imports keep the static compiler, catalogue,
playback, executor, and IIFE schema synchronized across browser caches.

The 99-test suite covers cardinal headings, all actor frames, every pass's
front hemisphere, rendered local-front agreement, first-person gaze, body-path
clearance, and finite/inventory sampling for every card. Rendered checks covered
triangle, V, square, and star formations plus mobile and first-person views.

Pages commit `b506611` is built and publicly verified at
<https://luk.ec/passing-lab/?v=b506611>. Public bytes match the staged page,
bundle, physical selector, generic model, library, compiler, and playback
module. Audience triangle and 390x844 five-person-star canaries retained their
declared inventories, simultaneous throws, and body-path clearance with no
horizontal overflow or browser diagnostics.

### Prior viewer revision: v18 compiled pattern execution

The selected card is now compiled before playback and fed to the generic model
as an object. PPS exposes the important result: its authored three-beat `P P S`
notation becomes a six-beat alternating-hand execution cycle rather than
restarting on the right hand after beat three. Both jugglers perform two
passes and a self, then the opposite-hand continuation. Strict token ownership
prevents the executor from hiding an invalid hand schedule by borrowing any
held club.

The generic 3D sample reports `activeEvents` separately from actual `airborne`
clubs. A PPS mid-flight sample contains four held and two airborne clubs;
forward-load and catch-return samples contain all six hand-connected while the
current beat still identifies the two actions. Pass events use the declared
1.5 spins; self events use their declared one spin.

All 48 cards accept the same compiled-object interface. The 93-test web suite
covers compiler validation, periodic hand allocation, exact inventory, all six
PPS beats at load/flight/catch phases, and finite samples for every catalogue
card. Local rendered QA covered PPS on desktop and a 390x844 phone viewport,
plus a five-person star with five performers, fifteen persistent clubs, and
five simultaneous throws; no browser errors appeared.

Pages commit `c64c6e7` is built and publicly verified at
<https://luk.ec/passing-lab/?v=c64c6e7>. Cache-busted public bytes match the
staged page, bundle, library, playback, generic model, and compiler. Public
mobile sampling repeated the PPS load/mid-flight/beat-six checks and the
five-person star inventory check without browser errors.

### Prior viewer revision: v17 all-pattern 3D and midline pass release

The initial Canvas 2D diagram has been removed. One Three.js stage is mounted
from the first frame and switches between the detailed two-person foundation
and the generic schedule adapter behind the same renderer. Runtime datasets and
screen-reader descriptions identify which model is active.

Both paths now carry the throwing hand and club upward and inward together,
release at a `0.14 m` lateral lane, and catch farther outside at `0.34 m`. In
the detailed path the `0.75 m` down-axis balance pivot puts the physical seam
grip at about `1.01 m` high, near belly-button level. These anchors are a visual
gesture policy, not measured human biomechanics.

The generic regression samples all 48 cards at multiple times and proves finite
people/clubs plus exact declared inventory. The full web suite passes 88/88;
desktop and 390x844 browser checks cover both detailed and generic stages with
no horizontal overflow or console diagnostics.

### Prior viewer revision: v16 clean physical stage

The physical rendering area intentionally contains only the selected canvas or
WebGL mount. The old explanatory foundation panel and live cue text were
removed because they obscured the action without helping a juggler read the
motion. Visible cue/beat status stays in the transport below the stage;
inventory, event, and pattern metadata remain in the normal inspector.

The canvas still has an updated screen-reader description and concise status,
but both are visually-hidden siblings after the stage rather than elements over
the image. This preserves semantic playback information without adding a stage
HUD. A focused page test asserts that `stage-mode` and cue overlay elements are
absent while the external description, status, and timeline status remain. No motion,
schedule, camera, count-in, or fallback behavior changed. Full `web-sim`
passes **87/87**; this revision is local and unpublished.

### Latest local foundation revision: v15 whole-arm Sky/Earth count-in (unpublished)

Sky/Earth is now an explicit count-in carry rather than the old per-token
vertical offset plus thresholded down/up axis.  For each of the four physical
two-person cards, the model derives a performer's opening hand groups from the
first three declared scheduled events.  The first-launch club is the primary
seam under the sampled palm; any later launch on that same hand is a bounded,
declared secondary seam in a controlled two-club carry.  This intentional
starting bundle ends with the opening `0.24 s` forward load; after release the
normal six-token model again admits only one club per physical hand.

Sky starts with a slight per-**person** stagger, while both hands of that
person share the same carrier phase.  Earth then descends synchronously.  The
carrier moves actual handle/knob-seam grips and derives each club's balance
pivot after rotating it continuously **down → forward → up** around the
actor-local right axis.  This replaces the former mid-count threshold flip
that could move a seam about half a metre in one frame.  Sky/Earth is the one
deliberate whole-arm exception to the normal rig: elbows may rise with the
count-in, then return exactly to the strict waist-side policy as Pass begins.
All six full club segments are collision-guarded during the count-in as well
as the normal loop.

Focused physical tests pass **19/19** and the full `web-sim` suite passes
**86/86**.  The v15 regression covers all four physical cards, person-level
Sky / shared-Earth phases, rigid seam-carrier reconstruction, primary and
secondary carry contact, full-club clearance, Sky→Earth and Earth→Pass
finite-difference continuity, and post-load one-club-per-hand recovery.
Local browser review slow-scrubbed the motion in audience, Left/A, and Right/B
views and checked responsive `390×844` portrait plus `844×390` landscape with
no console warnings/errors or horizontal overflow.  The regenerated local
IIFE is `612405` bytes, SHA-256
`1bac2dff6a56cb9504f6e923b0805e5cd816d28407101ba4f8dfb7fc5a96d30c`.
This is local only: deploy still requires the page, bundle, and relative
modules listed above together.

### Prior local foundation revision: v14 path-plane passes and participant eyes (unpublished)

The pass contract is now distinct from ordinary self handling.  It starts at
the low side seam grip with the club body down, rotates a signed `3π` / 540° at
one constant rate about the normal of its actual horizontal partner path, and
arrives body-up at the receiver's shoulder-plus-`0.3048 m` front **seam grip**.
Only after that exact catch does the hand-connected return lower it.  Ordinary
selfs retain their mirrored diagonal track.  The strict v12 body-side elbow
and v13 clavicle/acromion shoulder policies remain active; forearms reach the
shoulder-front catch rather than pulling elbows forward.

Audience remains the external stage view.  The Left/A and Right/B choices are
now literal model-eye views: camera position comes from the current sampled
performer and the gaze follows the partner-facing line down to the
working/catch zone.  To prevent a camera-in-own-body view, the current
performer's torso/head/leg root is hidden, but their arms, hands, and clubs
stay visible in the working frame.  These are participant-relative
cyclopean-eye views, not measured eye tracking or a claim of photorealistic
biomechanics.

Local validation passes the focused physical suite (18/18), the full
`web-sim` suite (85/85), build, and diff check.  Browser review confirms one
host-owned WebGL stage for each of the four accepted cards, the then-existing
PPS 2D fallback, 0.25× audience/participant-eye pass scrubs, and responsive 390×844
portrait / 844×390 landscape layouts without console diagnostics.  The
participant view keeps real limbs in the scene rather than duplicating a HUD
arm, so the own hands/near club sit at the working edge when an eye-level view
is looking down the passing lane.  This revision is local and unpublished;
deploy requires the static page, bundle, and relative modules together as
listed above.

### Latest local handling revision: v13 clavicle/acromion shoulders (unpublished)

The shoulder is now deliberately distinct from the hand’s forward juggling
lane. Each model-owned shoulder sits `0.230 m` lateral, `-0.015 m`
local-forward, and `1.440 m` high: at the top/outer torso beside the base of
the neck. The old `+0.130 m` forward shoulder anchor was an actual rig error,
not a camera illusion. Its live Three sphere was in front of the neck because
the sampled arm meshes are direct scene siblings rather than scaled torso
children.

`passing-four-count-clavicle-acromion-shoulders-v1` now also declares the live
rendered shoulder (`62 mm`) and upper-arm (`52→46.8 mm`) surface extents. A
260-beat regression sweep verifies their actual surfaces never project forward
of the rendered neck silhouette, while the shoulder stays laterally and
vertically seated at the upper-torso/acromion seam. The upper arm descends to
the existing strict body-side elbow; palms/forearms still make the juggling
stroke. This four-count-only local revision preserves v12’s fixed-world 540°
flight and all token, cadence, collision, and fallback contracts.

### Previous local handling revision: v12 waist-side elbows and continuous end-over-end spin (unpublished)

The selected 4-count now treats the elbow as a torso-owned side joint, not a
weighted result of the travelling palm. Each elbow rests at `0.305 m` outward,
`-0.050 m` front (slightly behind the body-side plane), and `0.985 m` high in
its actor-local frame: where it would hang beside the waist. Its independent
motion is only `10 mm` lateral, `4 mm` front/back, and `16 mm` vertical; it
never follows a club or hand path. A rendered `49 mm` elbow joint is also
required to stay within `5 mm` of that side plane, so the visible surface cannot
read as a forward-reaching elbow. The upper arm therefore descends beside the
body while the longer forearm/wrist makes the forward/cross-body handling
motion.

The prior diagonal-frame blend is also removed from airborne motion. A forward
load rotates the club into the 45° release diagonal around one authored signed
world axis; the ballistic pass retains the requested `3π` / 540° count around
that same axis through the seam catch. The receiver's shoulder-front **grip**
cue is still exact, but its lowering/reorientation begins only after the club
is hand-connected—never as a hidden flight-frame slerp. Focused regressions
take actual `1/240 s` quaternion differences across both pass directions and
both self throws, checking the signed world axis, unwrapped count, release
rate continuity, bounded speed, and the final in-flight step into catch. This
is still a visual teaching model, not measured biomechanics.

The v12 work is four-count-only and unpublished. It preserves the v10 seam
grip, 45° local handling endpoints, gravity timing, six-token ownership,
collision guard, cameras, and all 47 schedule-viewer fallbacks.

### Historical local handling revision: v11 compact tucked elbows (superseded)

The selected physical four-count now has one actor-local, sampled elbow for
each hand; the stage does not invent an elbow from screen-space arm geometry.
The readability policy rests each elbow at the lower ribs (`0.33 m` outward,
`0.40 m` forward, `1.05 m` high) and bounds palm-driven movement to `25 mm`
lateral, `60 mm` forward, and `90 mm` vertical. This lets the forearm/wrist and
seam-grip hand make the forward/cross-body work while shoulders stay quiet and
the arm avoids a lateral chicken-wing or straight-arm silhouette. The compact
post-release hand gesture begins at the release seam, rather than chasing the
flying club.

This is an intentionally schematic visual-anatomy policy, not a biomechanics
claim. A 260-beat deterministic regression sweep verifies every ready/load/
follow/catch/return state against the elbow envelope, compact limb spans, and a
`2.60 rad` maximum extension cap; it also prevents the prior renderer-only
elbow solver from returning. It preserves the v10 seam grip, mirrored diagonal,
six-token, gravity, collision, camera, and fallback-card boundaries below.
The local focused test suite passes 14/14, the full web-sim suite 81/81, and
the rebuilt standalone page has been slow-scrubbed at 0.25× from audience,
Left/A, and Right/B views plus phone portrait/landscape. These are local
validation facts, not public deployment evidence.

### Latest local handling revision: v10 diagonal handle grip (unpublished)

The local v10 four-count model supersedes the older vertical/body-down
release-and-end-over-end wording in this section. The neutral mesh group stays
rooted at its balance point, but a palm now attaches to the physical
knob/handle seam `0.2515 m` toward the knob from that pivot (not its visual
centre). The distal knob tip and cap remain `0.280 m` and `0.235 m` from the
balance point for the conservative collision segment. Thus every ready, load,
release, catch, and return sample exposes the same seam contact without a
visible knob-to-hand gap.

At a throwing pose, the mesh's knob-to-cap local +Y axis is deliberately
defined in the performer/partner basis. Right hand is
`-0.5 right + 0.7071 up + 0.5 forward`; left is the exact lateral mirror.
That is a 45° upward, cross-body-and-forward diagonal. Earth/ready remains
down-pointing; its seam-grip hand swings continuously forward/up during the
existing `0.240 s` load to a hip-height diagonal release. The receiver's
literal shoulder-plus-`0.3048 m` forward cue now names the **grip**, so its
balance pivot is derived from the same diagonal transform. The pass is still
3π / 540° in declared accumulated rotation, but it is an axial roll in the
interpolated diagonal frame: a literal odd end-over-end flip would reverse the
long axis and cannot also stay positive-up diagonal through flight and arrive
body-up. This is an explicit visual teaching-pose convention, not a measured
biomechanics claim.

At 1× the player uses a first-order Earth-gravity teaching calculation, not a
measured biomechanics claim: `g = 9.80665 m/s²`, adult reference height
`1.7526 m`, and a club balance-point cap of `1.7006 m` after reserving the
maximum 52 mm deterministic anchor offset. A `0.738622 s` self flight plus a
`0.500 s` catch/regrip/return/ready/load path makes a three-beat `1.238622 s`
cycle, i.e. `0.412874 s/beat` / **145.323 BPM**. The last `0.240 s` is the
readable hand-connected forward load, not a playback multiplier. The
`0.479902 s` pass flight has its own endpoint solve under `-g`; 0.5× and 0.25×
are deliberate slow motion. The cap is for the club balance/pivot path, not
every point on the visible club mesh.

The normal self path adapts the shared local siteswap-3 cascade sampler at that
derived duration and uses the same front-of-body preparation. A club rests
down-side, then its active hand visibly carries it forward/up to a hip-height
seam-grip release whose far end reads elbow-ish in front. The mean
**balance-point** anchors, in each partner-facing local frame as
`|side| / forward / height` metres, are ready `0.54 / 0.36 / 0.5485`, release
`0.40 / 0.62 / 1.10`, and self catch `0.42 / 0.56 / 0.96`. A pass follows its
true 3D gravity path, retains its positive-up diagonal long axis, and catches
at the receiver's literal left-hand shoulder-plus-front **grip** cue before
returning continuously to ready. State is explicit (`count-in`, `ready`,
`forward-load`, `release`, `flight`, `catch`, `return`) and preserves six
unique tokens; the display does not claim a fixed held/airborne split.

Each white/neutral club is true volume, not a sprite: a 72-segment lathed shell,
knob, and cap mesh with material, lighting, depth, quaternion rotation, and PCF
soft shadows. The deliberately simple jugglers likewise have volumetric bodies
and articulated limb meshes whose hands follow ready/load/release/recovery/
catch/return.
Their forward bases point to the actual partner; body yaw, arm anchors, pass
geometry, and the small 3D face-direction cue all derive from that same basis.

This does not generalise physical validity to the other cards. They continue to
use the clear schedule viewer and say so in the stage. The 3D renderer has no
animation loop of its own; Passing Lab's host transport remains the only
running player. It offers audience plus Left/A and Right/B observer-relative
3D cameras. They reuse one scene and sit behind/toward the participant's own
right shoulder while looking along the real passing line, but are still not
literal eye tracking, photorealism, or free camera control. On a portrait phone
the FOV caps at 44° and the camera moves back modestly to keep the near
observer-view performer framed.

Throw/catch anchors receive a deterministic, smooth humanisation policy rather
than random per-frame jitter: the stable
`passing-four-count-human-anchor-v1` seed uses periodic performer/hand/club
components and never exceeds 0.052 m from the nominal anchor. It preserves the
mean ready and catch positions and does not affect timing or club inventory.
This remains a bounded visual humanisation convention, not measured human
biomechanics or a substitute for accurate physics.

### Front-of-body, pre-throw, and stable-playback guard

The physical four-count keeps ready/load/release/self-catch anchors at local
forward `0.430/0.620/0.560 m` respectively; its pass still catches exactly
`0.3048 m` in front of the receiver's shoulder. Every post-count-in club,
including a hand-connected forward-load club, is sampled as its actual 515 mm
balance-point segment against conservative torso and head envelopes; the model
requires `0.025 m` clearance. During only the opening `.240 s` load, the active
club and queued starter can share a nominal hand label as an explicit
three-club carry convention; their six persistent IDs remain distinct and one
club per hand resumes at release. This is a sampled rendering guard rather
than mesh collision, medical biomechanics, or a safety assurance. The live
transport reserves a one-line status slot and fixed-height, scrollable event
list so changing beat/cue detail does not resize the viewer or shift the
catalogue while it plays.

Local verification of the forward-load revision passed its focused trajectory,
collision, token, camera, and continuity suite (12/12), the full `web-sim`
suite (79/79), static build, and audience/Left-A/Right-B slow-scrub checks.
It remains unpublished until a separate publisher deploys the matching static
artifact. It changes only the selected physical 4-count; the other 47 cards
remain schedule-viewer fallbacks.
