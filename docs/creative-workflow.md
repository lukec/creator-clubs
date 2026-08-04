# Creative workflow: motion scenes, rehearsal, and performance

Last updated: 2026-07-16

## Product intent

Yuki's primary creative goal is for each club's visuals to respond to how the
club is moved. The desired workflow has two distinct phases:

1. **Rehearsal/laboratory:** audition a catalog of movement-reactive visual
   scenes directly on a club, advance through them with its button, and learn
   which movements and effects are worth choreographing.
2. **Composition/performance:** arrange the selected scenes into a cue sequence
   controlled by time, button cues, or both, then synchronize that sequence
   with music and a rehearsed juggling routine.

This intent came from Luke's 2026-07-13 discussion with Yuki. It is a creative
requirement, not yet a verified implementation.

## Collaborative operating protocol

Luke wants each BenTo/device operation taught as it is performed so he can
become fluent in the software rather than merely observe remote control. Before
each meaningful step:

1. name the BenTo concept involved, such as Active Block, layer order, blend
   mode, transport, or prop filter;
2. state the exact UI action and what it changes;
3. say what visible result would count as success;
4. after the action, separate what BenTo verified internally from what Luke
   observed on the physical club; and
5. record failed UI paths as well as successful ones.

For timed physical tests, announce the start clearly and leave enough time for
Luke to watch the club. Prefer named controls and explicit Stop/rewind behavior;
BenTo's Play/Pause resumes from the existing playhead rather than guaranteeing
a start at zero.

## Vocabulary

A **scene** is more useful than the word `pattern` because it contains three
things:

```text
scene = motion interpretation + visual renderer + tuned parameters
```

Examples:

- projected angle moves a rainbow around the club;
- activity controls the brightness and flicker of an ember texture;
- a throw-state transition produces a launch or catch pulse.

A scene may also declare a base color palette, smoothing, sensitivity,
transition duration, and safe brightness limit. Separating these parts lets us
create many artistically distinct permutations without writing unrelated code
for every one.

## Performance visibility floor

Luke's experience with six consumer Vision Clubs establishes a non-negotiable
default for dark performance spaces: a juggling club must remain visibly
trackable to both audience and performer throughout an ordinary cue. A sparse
point or short crawl on a black strip may be interesting as screen graphics but
can make the physical prop and catch trajectory disappear.

Treat every scene as two compositional layers:

```text
section-colored visibility base
        +
artistic foreground and motion accents
```

The visibility base should illuminate the full LED strip at a venue-calibrated
low level. Foreground patterns may still use darkness, negative space, flashes,
and local detail, but their inactive pixels or off phases reveal the base rather
than absolute black. A deliberate blackout is an exceptional, rehearsed cue,
not a normal pattern background.

The BenTo implementation is a section-colored, low-brightness Add layer
evaluated after the Alpha motif. The initial normalized `0.08-0.12` proposal was
physically rejected as much too dim at club-global brightness `0.883`, while the
show peaks were acceptable. Calibrate only the floor with the fixed-step
project in `docs/brightness-calibration.md`; acceptance still depends on actual
diffusion, venue, performer comfort, and viewing distance. The detailed policy
and consumer reference catalog are in `docs/vision-pattern-library.md`.

The first three-club Papa Was Stoned rehearsal accepted the generated
`0.30-0.38` floor as adequate, but most scenes and colors still felt muted.
That separates two controls which should not be conflated: the floor prevents a
club from disappearing, while the scene renderer should still exploit the
props' vivid saturation and high-output range. Use restrained output for a
battery-saving functional pass only; return to the fixed reference level when
judging color, impact, and performance beauty.

## Three-club visual coherence

Default music-show output to unison across all three clubs. Because juggling
continuously changes their positions, a small unexplained difference in one
club is more visually salient than the common treatment and looks accidental.
This means generators should normally avoid club-ID hue offsets, even/odd
inversions, and patterns distributed across `numProps=3`.

Break unison only when the difference itself is the readable effect:

- a short transition that cycles one color through Clubs 0, 1, and 2;
- a clearly designed call-and-response or choreographic role;
- a synchronized formation the performer intends to preserve; or
- autonomous sensor response where visibly different movement explains the
  different light behavior.

Name those exceptions in the timeline so they can be rehearsed and reviewed.
For general song generation, identical phase and treatment is the default.

The Gettosinfonía V2 siren treatment is a concrete unison example: all three
clubs alternate the same saturated full-club red and blue on half-beats. It is
dramatically different from the surrounding motif without assigning one club
to be the odd prop. User-identified timbres can support literal visual
associations like this when the cue is strong and repeated, but record the
auditory identification as performer feedback and snap its implementation to
measured musical boundaries.

## Compose on the club's physical canvas

Luke's physical/UI mapping is:

```text
BenTo top    -> larger, brighter club body
BenTo bottom -> narrower handle
```

The body has more visual weight, so a small change confined to part of the
handle often reads as accidental or disappears during juggling. For important
music-linked changes, illuminate at least the body—currently approximated by a
Range from normalized `0.40` to `1.00`—or change the entire club. Keep the
handle visible with a darker version of the same hue or a deliberately
contrasting color. Handle-only detail remains valid when the music genuinely
calls for subtlety, but it is not the default source of visual drama.

Gettosinfonía V3 demonstrates two music-linked techniques. Its second section
uses a measured quarter-beat mid-band spectral peak to drive body hue from
red/orange through yellow/cyan toward violet as the detected tone rises. This
is a visual control signal, not a claim to have transcribed the melody. Other
non-siren sections use half-bar body phrases whose palette position and
brightness combine measured spectral height, energy, and progress through the
section. The underlying motif returns between phrases so the effect still has
texture and breath.

### Score lights as choreography cues, not decoration

A juggler can take movement instructions from both the music and the clubs.
Slow, graceful material supports smooth palettes, longer spatial motion,
pose-legible states, and gentle breathing. Fast, aggressive, or deliberately
"kronchy" material supports shorter attacks, strong beat articulation, broad
color jumps, noisy texture, and fast roll/throw responses. The visual score can
therefore help the performer feel when to move slowly, accelerate, change trick
family, hold a pose, or let the routine become chaotic.

Use this authoring order:

1. describe the song's dramatic story and recurring characters;
2. map sections and recurring sounds to recurring visual families;
3. let measured energy control visual density and attack rate;
4. let a documented spectral-height control move color with audible rises and
   falls, without calling it melody transcription;
5. choose sensor vocabulary that matches the likely juggling—roll for
   manipulation and bright in-flight mixing, folded height for readable poses,
   activity for calm-to-frenzy envelopes, and throw state for release/air/catch
   events; and
6. preserve unison by default, making any per-club role a short, named story
   event that can be rehearsed.

Stillness is also an authored state. A zero-activity effect may be fixed or may
use a gentle pulse, ember, or low-amplitude flicker so the club feels alive. The
important contrast is that movement produces an unmistakably larger change;
zero input does not require a frozen renderer or accidental blackout.

Gettosinfonía V4 applies this as a signal-chase story. Half-beat weighted
spectral measurements choose body hue; high-frequency/flux-heavy slices become
short packet trains; broader measured impacts answer the beat. Both siren
passages contain the same three police scene families—bright full-club
alternation, the accepted 50/50 red-blue split, and a brief blue/red/white
three-club role tableau. The tableau is an explicit exception to unison, not a
new default.

### Keep uncertain semantic cues easy to retime

When a performer requests an effect for a lyric or named sound but automated
transcription is unreliable, do not convert a plausible section boundary into
a claimed lyric timestamp. Put the candidate cues in one clearly named layer,
label the windows as hypotheses, and preserve the measured beat/bar grid
separately. A physical listening pass can then report only which window is
early, late, missing, or too long without invalidating the rest of the score.

Heartaches V1 applies this rule to three red double-heartbeat windows. Its
processed vocal defeated two available transcription models, so the windows
are creative/form hypotheses based on Luke's request. The measured drop
repetition, energy form, beat grid, and onset accents remain independently
reproducible even if every heartbeat window moves after rehearsal.

### Selecting references with creative tags

Each of the 80 catalog entries now has inferred tags for mood, visible palette,
structure, theme, and energy. Use them as search facets, not ground truth: hue
adjustment can change the palette, and the official image is only one moment in
a time-varying movement trace.

A practical selection order is:

1. choose the musical emotion and energy (`calm`, `playful`, `urgent`,
   `climactic`);
2. narrow to a section-compatible palette (`amber/orange`, `cyan/blue`,
   `magenta`, `rainbow`);
3. choose spatial grammar (`full-field`, `rings`, `particles`, `spokes`,
   `gradient`);
4. decide whether motion should be decorative, strongly kinetic, or tied to a
   throw/catch/stall event; and
5. reject or layer any sparse/high-contrast candidate that cannot independently
   satisfy the performance visibility policy.

The tags describe inspiration. A Creators BenTo score still has to emulate the
look with available primitives or a custom script; it cannot directly select a
consumer Vision preset by name.

## Phrase-led music scoring

Do not force every song onto a uniform beat grid. For sparse acoustic music,
separate three timescales:

1. **phrase form:** use rests, energy valleys, repetition, and strong entries to
   define the slow visual narrative;
2. **note attacks:** use measured onsets for short accents that acknowledge the
   instrumental articulation; and
3. **continuous visibility:** keep a full-club color field independent of both,
   so musical silence creates visual stillness rather than an unsafe blackout.

The `shows/kojo-no-tsuki/` study applies this method to a 41.744-second koto
recording. Four measured phrase entries drive ruined-wall, moonrise, petal, and
lantern scenes. Forty-three other high-confidence plucks receive short additive
accents. The artistic labels are interpretations; the timestamps come from the
exact bundled audio. This provides a useful contrast with the regular 128 BPM
grid used for **Exit the Premises**.

Luke's first review added a palette-coherence rule. When a score declares a
culturally or seasonally specific palette, constrain every compositing source:
motif foregrounds, motif backgrounds, visibility floors, phrase blooms, and
note accents. Recoloring only the dominant motif still allows an additive cool
floor or white accent to break the intended scene. Kōjō no Tsuki V2 therefore
validates every stored color against one explicit Japanese-autumn set and also
enforces the project-wide strict-unison parameters. Traditional color names are
creative references; exact LED hex values should be documented as project
approximations unless a named authoritative standard is being followed.

## Commercial music rehearsal workflow

Copyrighted music can use the same central BenTo architecture without placing
the media in this public repository. Keep the generator, interpreted form,
light score, and validation metadata public; ignore the local authorized audio
file. Bind generated timing to the exact local copy using duration and SHA-256,
but do not publish the file or treat a download purchase as public-performance
permission.

### Acquisition audit (2026-07-14)

None of the exact commercial candidates currently has a live, verified,
artist-authorized **free** download that can be fetched unattended. **Bird
Brain** came closest: Bro Safari's official SoundCloud page describes *Animal*
as a free release, and UFO!'s official track page advertised a free Artist Union
download. The album short link now resolves to a dead artist-hosted domain, the
Artist Union link returns `404`, and the exact artist-hosted ZIP was not present
in the Internet Archive CDX index when checked. Do not replace those dead links
with a stream rip or an unofficial mirror.

The current legitimate acquisition paths are:

- **Gettosinfonía:** purchased artist-direct from Bandcamp on 2026-07-14; the
  local WAV is ignored and bound to the public analysis by SHA-256.
- **Heartaches:** DRM-free Qobuz purchase, including lossless WAV/FLAC options.
- **Bird Brain:** seek a new official rehost or purchase a commercial copy.
- **Jump Up** and **Waist Time:** Beatport purchases of the original mixes.
- **Jacquadi:** commercial store purchase; verify that the selected store yields
  a usable local file before buying.

Clearing public-performance rights and acquiring the recording are separate
steps. Luke intends to clear performance rights, but the rehearsal audio must
still come from an authorized download. A purchase is also an external
transaction and therefore needs Luke's explicit confirmation at checkout.

For exact choreography, prefer a local authorized audio file in BenTo's Audio
layer. BenTo then owns both audio and light time from one Play action. Starting
a streaming service and BenTo separately is acceptable for a rough preview but
adds a variable initial offset and offers no reliable shared seek/pause clock.

The first commercial-track study is now implemented at
`shows/gettosinfonia/` for DJ Raff's **Gettosinfonía**. The exact purchased WAV
is 129.613333 seconds. Reproducible analysis supports a practical 95 BPM grid,
278 strong onsets, per-bar energy/spectral features, and thirteen interpreted
sections. Signal Chase V4 contains one audio layer and 769 light clips with a
`0.30-0.38` continuous visibility floor. It has passed structural validation
and native stopped BenTo loading but still needs listening, stationary
brightness checks, and physical three-club rehearsal.

Yuki's existing performance track is now implemented separately at
`shows/papa-was-stoned/`. Analysis of the exact shared WAV supports a practical
123.5 BPM grid and three major full-groove arrivals near 0:47, 2:36, and 3:25.
The score gives the repeated intro phrases a related breathing treatment and
reuses an increasingly energetic Multipoint/Rainbow family for the later
returns. Quiet suspensions retain the `0.30` minimum whole-club field while
reducing pulses to downbeats, so musical space does not become prop
disappearance.

The file also contains about 15 seconds of intentional-looking trailing
silence. The first score treats it as a warm bow/pose afterglow with a final
1.2-second fade. This illustrates a general authoring rule: silence in a
performance edit is a timed stage region, not automatically dead timeline.
Choose and label its visible behavior explicitly, then verify its purpose with
the performer before calling the score final.

Tropkillaz's **Heartaches** is a second strong candidate. Current commercial
metadata identifies a 2:08 electronic single and Shazam reports 80 BPM. For a
juggling score, that supports both a broad half-time body pulse and a potential
160-pulse double-time accent grid, but exact beat phase and useful subdivision
must be derived from the acquired file and checked by listening. Qobuz offers a
DRM-free 16-bit/44.1 kHz purchase with WAV and FLAC among its download formats,
which fits the ignored-local-audio BenTo workflow directly.

**Current comparison:** Gettosinfonía is the active implementation because it
is now legitimately acquired, analyzed, and authored. Heartaches remains a
good second commercial example because its published tempo and lossless Qobuz
path offer a contrasting timing study. Do not infer that metadata convenience
makes it artistically better; listening and juggling rehearsal still decide.

Bro Safari & UFO!'s **Bird Brain** is a third candidate with a different scale:
3:31 at approximately 110–111 BPM. That middle tempo is promising for readable
club changes directly on the beat while retaining half-beat space for selected
accents. The extra 81–83 seconds relative to the two shorter candidates creates
more room for recurring motifs and a developed routine, but also asks the
juggler and visual score to sustain a longer narrative.

The artists originally released the *Animal* album for free, and UFO!'s official
SoundCloud description still points to an Artist Union free download for Bird
Brain. The track is nevertheless labeled all rights reserved, and the legacy
download destination may no longer operate. Treat it as an authorized-acquisition
lead to verify, not as permission for public performance or redistribution.
Apple/Amazon listings provide a commercial fallback.

Bird Brain suggests a particularly legible visual identity—darting point groups,
wing-like mirrored sweeps, flocking phase offsets across three clubs, and sudden
full-club impact blooms—but those remain title/genre-inspired concepts until the
exact recording is analyzed and listened to.

Major Lazer's **Jump Up** (with Leftside and Supa Hype) and Diplo &
Autoerotique's **Waist Time** add two related 128 BPM candidates. Commercial
listings report approximately 3:43 and 3:18 respectively, and Beatport sells
both original releases. At exactly 128 BPM, a quarter note is `0.46875s`, a 4/4
bar is `1.875s`, four bars are `7.5s`, and eight bars are `15s`. That regular
grid is useful for authoring and could share timing machinery between projects,
but every exact phase and section boundary must still come from the acquired
file.

The songs call for different treatments:

- **Jump Up:** vertical lift, expanding fills, upward spatial sweeps, collective
  impact blooms, and progressively larger returns. At 3:43 and high sustained
  energy, it needs deliberate contrast so the show does not remain visually
  maximal for its entire duration.
- **Waist Time:** rotation, orbiting points, circular hue motion, lateral
  transfer, and movement-reactive projected-angle detail. Its official video
  centers on hooping and uses bright color and light-trail imagery, making it a
  particularly relevant reference for the hybrid central-timeline plus local
  motion-rendering architecture.

Waist Time is currently the strongest architectural study among the commercial
candidates because its musical grid and visual concept naturally connect the
two project tracks: BenTo owns audio/form while on-club sensor logic can own
low-latency rotation response. This is a design hypothesis; simultaneous
central and local layer behavior still needs a physical canary.

Polo & Pan's **Jacquadi**, created with Jacques Auberger, adds a theatrical
candidate: 4:07 at a reported 120 BPM. At 120 BPM the timing grid is exact and
human-readable: `0.5s` per quarter note, `2s` per 4/4 bar, `8s` per four bars,
and `16s` per eight bars. It is the longest candidate and therefore needs a
deliberate multi-chapter juggling narrative rather than one repeating effect.

Published descriptions identify DIY percussion blended with Polo & Pan's softer
melodies, while the official video's surreal imagery moves through a frog,
overflowing oceans and mountains, and a kaleidoscopic jungle. This supports a
different visual grammar from the bass tracks: playful call-and-response,
character signatures, palette-defined story chapters, transformations, and
occasional synchronized surprises. A visibility field can remain gentle rather
than dim, with saturated focal gestures carrying the theatrical action.

Jacquadi is currently the strongest candidate for an expressive narrative show
and for exploring restraint. It is less suitable as the fastest first proof
because its 4:07 duration requires more authored form and more performer
stamina. Exact structure and acquisition format remain to be verified from the
authorized local copy.

## Rehearsal mode

The proposed first useful product is one local `motion-lab` WASM script with a
data-driven catalog of scenes:

```text
club IMU + button -> local motion-lab script -> 32 LEDs
```

Implemented Motion Lab controls:

- boot: Demo mode shows every P1/P2/P3 effect for ten seconds and wraps;
- first press in Demo: exit immediately to P1E1 without also advancing;
- short press: next scene;
- double press: next page and reset to its first scene;
- triple press: reset to Page 1, Effect 1;
- press-and-hold: reserved for normal power behavior, not scene selection;
- scene change: count the page in blue-violet and the effect in white before
  entering the live effect. V4 uses `0.18s` on / `0.32s` cycle pulses because
  V3's count was too fast to follow while handling a club.

With one button, random access among 24 scenes would be cumbersome. Three pages
of eight provide a learnable hierarchy: Page 1 is shaft roll, Page 2 is
end-over-end flip, and Page 3 is energy/combined motion. A sequential browser is
appropriate for hands-on rehearsal, while BenTo or a small host UI should
provide random access during authoring. Yuki can record concise addresses such
as `P2E4` and notes for effects he wants to keep.

### Autonomous effects need broad, bright physical coverage

The performance visibility rule applies just as strongly to the offline Motion
Lab as it does to a BenTo song score. A technically nonblack pixel is not enough
to keep a club trackable in a dark venue. Ordinary effects should illuminate
the full strip or nearly all of it with saturated, high-value colors; a moving
detail should sit on a bright related base. Darkness is reserved for a short,
deliberate, rehearsed event.

Motion legibility is also spatial. V3's four-pixel comet did move in software,
but Luke could barely see the travel on the physical club. V4 expands it to a
13-LED bright region, and uses two nine-LED regions for its paired portals.
This yields a practical authoring heuristic: if sensor input is the point of an
effect, let it change a substantial part of the body and/or handle rather than
only a tiny highlight.

The simulator now enforces a coarse floor at steady frames: no LED may have all
channels below `120/255`, and at least 30 of 32 LEDs must have one channel at or
above `160/255`. This is a guardrail against sparse/dim composition, not a
photometric standard. Human brightness still depends on hue, diffuser area,
ambient light, and the stock firmware's separate global multiplier, which
currently returns to `0.5` after reboot and is not writable through the WASM
ABI.

### Sensor vocabulary should match physical movement

The accepted calibration separated motions that had previously been described
too loosely as "rotation":

- long-axis **roll** strongly changes `getRoll()` and gyro/activity, but changed
  `projectedAngle` by only `0.037` of a turn in the Club 2 capture;
- end-over-end **flip** changed `projectedAngle` by `0.927` of a turn;
- active juggling reached a `0.909` projected-angle span and useful raw
  activity up to approximately `0.55`; and
- REST activity p95 was `0.00398`; the conservative normalization floor is
  `0.005976`, not zero.

This is why Pages 1 and 2 reuse the same eight visual grammars with different
axes. A performer can learn whether a look comes from a shaft twist or a broad
throwing arc. Page 3 then explores intensity, flip speed/direction, throw state,
and combined axes. Luke's first physical review of the corrected study reported
that the effects worked well and that several were already plausible show
material; controllability and beauty still need per-effect field notes.

### Page 1 physical review: static appearance is not the performance result

Luke's 2026-07-16 review supplies the first addressed artistic feedback for the
accepted V5 cartridge. These are verified physical observations on Club 1;
the implementation column is verified from the exact installed artifact.

| Address | Installed response | Physical result | Design status |
| --- | --- | --- | --- |
| P1E1 | Whole club moves continuously from cyan to yellow with roll | Initially plain at rest, but very bright and wild when the colors blur during juggling flips | Keep as a throw/juggling look; the seam may be a useful deliberate snap |
| P1E2 | Purple base plus a broad 13-LED white/pink moving region, positioned in 32 roll steps | Strong controlled up/down travel when twisted; steady when held; cool when juggled; jumps somewhat during flips | Keep; test circular smoothing or interpolation without destroying responsiveness |
| P1E3 | Cyan/blue base plus two opposed nine-LED cyan and pink regions | Attractive blue/pink palette, good brightness, and similar useful travel | Keep as the paired version of P1E2 |
| P1E4 | A hard blue/orange boundary moves through 32 LED positions, with a gold boundary pixel | Good for individual-club manipulation and still interesting in flight; crunchy during flips | Keep; compare hard boundary with a 3-5-pixel crossfade |
| P1E5 | Repeating four-LED teal/four-LED orange bands shift through only eight phase positions | Roll motion is subtle; separate blocks read in the handle but body diffusion blends them and makes orange less orange | Redesign around physical regions and larger body color fields |
| P1E6 | Stack-safe build fills the whole club with the same cyan/yellow mapping as P1E1 | Looks the same as P1E1 | Replace; the intended body/handle complement did not survive the compatibility transform |
| P1E7 | Whole club ramps dark blue to cyan once per roll | Obvious blue-to-cyan jump at the roll wrap | Replace or compare with a periodic blue-cyan-blue mapping |
| P1E8 | Whole club ramps magenta through blue to cyan once per roll | More colorful variation than P1E7 | Retest for the same wrap seam; restore real spatial kaleidoscope only with a stack-safe renderer |

Several broader lessons follow:

1. Judge every autonomous effect in at least three modes: still pose, slow
   intentional manipulation, and normal juggling. P1E1 reverses its first
   impression in flight because temporal color mixing is part of the artwork.
2. Classify effects by performance purpose. P1E2-P1E4 are especially legible
   for controlled individual-club manipulation; P1E1 is strongest as a thrown
   ensemble look. An effect need not be equally smooth for every movement if
   its intended choreography is explicit.
3. Treat angular seams as a design parameter. A circular sensor needs either a
   periodic palette whose endpoints agree or an intentionally named snap. A
   one-way linear ramp cannot be seamless at both ends.
4. Author spatial frequency for the diffuser. The narrow handle preserves
   small LED clusters; the broad body optically averages adjacent colors and
   needs larger, more saturated fields. A mathematically uniform strip pattern
   is not a perceptually uniform club pattern.
5. Keep post-build safety substitutions artistically accountable. The exact
   installed cartridge, its guide, and its names must agree; P1E6 proves that a
   crash-safe substitution can silently remove meaningful variety.

The highest-value V6 experiment is a short optical-resolution page: compare
one-, two-, four-, and eight-LED color blocks in known handle and body regions,
including orange/blue and cyan/magenta pairs. Use it to choose separate minimum
cluster sizes and saturation rules for each physical region. Then test two roll
filters side by side: raw roll for immediacy and wrap-safe circular smoothing
for choreography. Preserve one intentional hard-seam whole-club effect and one
periodic seamless effect so Luke and Yuki can compare them in actual throws.

It remains an open question how much P1E2-P1E4's flip crunch comes from the
expected roll wrap versus Euler-axis coupling during an end-over-end flip. A
future telemetry capture should record `getRoll()` through controlled flips
before adding aggressive smoothing.

### Page 2 physical review: circular phase is not physical height

Luke reviewed Page 2 using a clock face: 12 o'clock points up, 6 points down,
and 3/9 point sideways. The installed code feeds normalized projected angle
`a` directly into the same visual functions as Page 1. This makes the four
cardinal positions roughly `0`, `0.25`, `0.5`, and `0.75` around a circular
phase. That is useful for an orbit, but it does not express where the club's
tip is vertically.

| Address | Installed response | Physical result | V6 direction |
| --- | --- | --- | --- |
| P2E1 | Whole club follows a one-way cyan-to-yellow ramp over raw flip phase | Cyan at 12, mostly cyan through the first quadrant, increasingly yellow through the rest, then an abrupt yellow-to-cyan reset at vertical | Add a pose-legible cyan/yellow version driven by vertical height; retain a snap-cycle only if labelled abstract |
| P2E2 | A 13-LED white/pink region uses `floor(32*a)` and wraps modulo 32 | The pulse follows clock phase; at vertical it can occupy both club ends, while left/right place it near quarter/three-quarter positions | Use height rather than phase and clip at the physical ends; direct and inverse orientations are both choreographable |
| P2E3 | Two opposed nine-LED cyan/pink regions orbit from raw phase | Pretty and especially effective in slow flips | Keep as an abstract-phase flip effect; its lack of literal height correspondence is acceptable and useful |
| P2E4 | A hard blue/orange boundary uses raw phase as its 0-31 strip position | Up/down do not become clearly distinct solid colors; half-and-half states obscure the physical rule | Use vertical height so up and down are opposite color endpoints and both sideways poses meet at the same half state |
| P2E5 | Four-LED teal/orange bands move through eight phase positions | Change is too subtle to identify during a flip | Replace or enlarge into body-scale fields; do not spend another slot on nearly invisible phase motion |
| P2E6 | Stack-safe build duplicates P2E1's cyan/yellow whole-club mapping | Same feedback as E1 | Replace with a genuinely different pose-legible or body/handle response |
| P2E7 | Whole-club dark-blue-to-cyan linear phase ramp | Same seam/legibility family as E1 | Compare a seamless height palette with any intentional abstract snap |
| P2E8 | Whole-club magenta-to-cyan linear phase ramp | Looks good when flipped | Keep as an abstract flip wash, then decide by juggling whether its seam is artistically useful |

For a stack-cheap literal mapping, start with:

```text
phase a:   12=0/1, 3=0.25, 6=0.5, 9=0.75
height h:  abs(2*a - 1)
            12=1, 3=0.5, 6=0, 9=0.5
```

A cosine would produce more physical angular easing, but the triangular height
function has the correct cardinal poses, is continuous across the 12 o'clock
wrap, and is shallow enough for the constrained stable-1.2.0 WASM stack. For a
moving highlight, compute its linear position from `h` and clip its tail at LED
0/31; modulo wrapping turns one endpoint highlight into two disconnected end
highlights and defeats the visual metaphor.

The artistic catalog should now tag movement semantics as well as color/theme:

- **pose-legible:** an audience or performer can predict the light from the
  club's pose; useful for stalls, balances, and exact choreographic angles;
- **abstract-phase:** orientation changes the look continuously, but the spatial
  result need not imitate the pose; useful for flowing flips and music texture;
- **throw/juggling:** optimized for temporal mixing in flight rather than a
  readable held pose; and
- **manipulation:** optimized for slow, intentional control of an individual
  club.

An abstract relationship is not a defect. P2E3 and P2E8 demonstrate that the
motion can look excellent even when its rule is invisible. The defect is
presenting an abstract phase mapping as though it were a literal up/down cue.

### Page 3 physical review: condition each dynamic signal for its effect

Page 3 tests calibrated activity, derived flip speed/direction, firmware throw
classification, and a combined-axis concept. Luke's physical review and exact
post-transform disassembly produce this mapping:

| Address | Actual V5 behavior | Physical result | V6 direction |
| --- | --- | --- | --- |
| P3E1 | Activity moves a whole-club flame from `(210,45,8)` toward `(255,255,113)` through the shared smoothed activity | Cool and readable, but feels slow | Keep; use less secondary smoothing or raw firmware activity for attack, plus a faster flickering flame region at a verified club end |
| P3E2 | Activity modestly changes an always-moving blue/green wave's speed and RGB range | Motion does not noticeably change it | Increase contrast radically: calm deep field at rest, faster high-contrast cyan/white water under motion |
| P3E3 | Intended per-pixel activity rainbow calls a patched helper that fills the entire club 32 times; the final fill wins and value only spans `0.72..1.0` | Brightness barely changes | Replace with a direct-RGB contrast study whose deliberately dim rest state rises to full output |
| P3E4 | Intended blue-to-red spin heat passes through the patched hue helper, which maps it into cyan/yellow RGB | No orange appears | Restore a shallow direct-RGB cyan/blue -> gold -> orange/red heat curve |
| P3E5 | Direction sign selects one of two patched colors even when speed magnitude is nearly zero | Cyan/yellow flicker when idle, then a more stable solid color under movement | Add enter/exit thresholds and a latched direction; use a stable neutral still state |
| P3E6 | Orange base always has at least one moving spark at 4 Hz; activity raises count to ten and rate toward 32 Hz | Cool, but never truly still and becomes busy on almost any motion | Keep; add a still ember zone, dead band, nonlinear count/rate, and more gradual energy stages |
| P3E7 | Firmware throw states 0-5 select purple, cyan, orange, white, green, or pink; one white pixel follows flip phase | Purple in hand and another color during detected flight is immediately compelling | Keep as Throw Classifier; test repeatability and add a simpler binary Hand/Air sibling with release/catch accents |
| P3E8 | Stack transform replaces the intended roll/flip/activity handle/body weave with one whole-club flip-angle palette | Roll appears irrelevant; only blue/yellow changes, so the concept is hard to understand | Replace completely, preferably with the binary Hand/Air transition experiment |

The firmware already smooths `activity`: every IMU read maps maximum linear
acceleration against a `40 m/s²` ceiling and moves only 10% toward the new
value. V5 normalizes that result through the measured Club 2 range and then
applies a second attack/release filter. P3E1's perceived slow sampling is
therefore probably response latency from two filters, not evidence that the
BNO055 samples slowly. The IMU is configured for 100 Hz fusion and the read task
loops with a 5 ms delay, although the physical script/LED frame rate remains to
be measured. V6 should compare raw firmware activity with separately tuned fast
and slow envelopes instead of using one global `smoothedActivity` everywhere.

P3E5 demonstrates why a signed motion estimate needs hysteresis. At rest,
numerical noise changes the sign of `signedSpeed`; V5 selects cyan or yellow
from that sign even while `speedMagnitude` is tiny. A direction effect should
remain in a stable neutral state below an exit threshold, latch clockwise or
counter-clockwise only above a higher entry threshold, and retain that choice
until motion genuinely stops or reverses strongly.

P3E7 is more specific than a generic airborne flag. Source defines the values
as `0 none`, `1 flat`, `2 single`, `3 double+`, `4 flat-front`, and `5 loftie`.
The classifier uses acceleration thresholds, so Luke's observed in-hand/air
color swap is a promising physical correlation, not yet a guaranteed lifecycle
signal. The next test should perform repeated examples of the same throws and
record state sequences. Two artistic families then become possible:

- **binary lifecycle:** state 0 uses the hand color and any nonzero state uses
  the air color; remembered transitions create release and catch flashes; and
- **throw vocabulary:** preserve distinct colors or textures for flat, single,
  double+, flat-front, and loftie only if repeated trials classify reliably.

### Combined lessons from the 24-effect review

1. **Test the performed result.** A held-pose opinion can reverse during
   juggling because motion blur and temporal color mixing are part of the
   display. Every candidate needs still, controlled manipulation, slow flip,
   normal juggling, and audience-distance review.
2. **Make the visual change large enough to read.** The weakest effects use
   narrow brightness ranges, eight-step phase shifts, or fine body bands. A
   sensor relationship should normally change a broad saturated region,
   brightness by a large ratio, motion speed substantially, or the whole state.
3. **Choose the motion operator intentionally.** Roll is excellent for direct
   manipulation and wild in-flight mixing. Raw flip phase is excellent for
   abstract orbits. Folded vertical height is better when choreography calls
   for a predictable up/down pose. Throw classification opens stateful effects.
4. **Condition per effect, not per sensor globally.** The useful pipeline is
   `raw -> calibration -> dead zone/hysteresis -> nonlinear curve ->
   attack/release -> visual`. Flame wants fast attack; ocean may want inertia;
   direction requires a dead zone; sparks need a quiet threshold.
5. **Treat the club as two optical surfaces.** Fine clusters can read on the
   handle; the body needs larger fields because its diffuser blends adjacent
   colors. A geometry-resolution test should precede more band designs.
6. **Use a default visibility floor, with named contrast exceptions.** Luke
   explicitly wants the activity-brightness experiment to go substantially
   dimmer so movement becomes obvious. V6 may lower the floor for that labelled
   study while remaining visibly trackable; accidental or prolonged blackout
   is still rejected.
7. **Test the deployed semantics.** The safety transform created duplicates,
   erased spatial rainbows, changed heat colors, and removed an axis. V6 tests
   must compare canonical frames for perceptual distinctness and assert each
   named input actually changes its claimed output after the final transform.

The implemented V6 keeps quality and comparability ahead of effect count:

- Page 1 retains the successful roll wheel/comet/portals/split and uses weak
  slots for geometry, smoothing, and seamless-versus-snap experiments.
- Page 2 gains literal up/down color, a non-wrapping height tracer, and a
  pose-legible fill while retaining the successful abstract portals and wash.
- Page 3 keeps and strengthens flame, sparks, and throw classification; fixes
  contrast, heat, direction, and quiet-state stability; and replaces the
  nonexistent weave with a simple Hand/Air effect.
- Page 4 isolates held/air, release/catch, launch-color freeze, flight energy,
  roll-in-flight, and all six source-backed throw classes so classification can
  be explored without hiding inside a combined effect.

Page count is not an artistic target; every slot must remain distinct,
understandable, and safe under the stable-1.2.0 stack gate. V6 now has four
pages of eight and an exact-WASM test for all six throw-state colors. The next
step is still a single-club Luke canary; only a physically accepted follow-up
should be copied to all three clubs for Luke/Yuki play.

For rapid visual ideation, compare simultaneous 32-pixel candidates in a
browser gallery first and return terse choices plus tuning notes. Then port only
the selected concepts to the shallow RGB cartridge, test the exact final WASM,
manipulate its sensor inputs in the browser emulator, and use one club for the
physical optics and stack gate. Browser pixels accelerate selection; they do
not predict diffuser mixing or juggling readability.

### Source-backed feasibility on stable 1.2.0

The current Bentuino Creators Club build includes `USE_SCRIPT`, `USE_MOTION`,
`USE_BUTTON`, and the script LED layer. The local WASM API exposes:

- orientation (`getYaw`, `getPitch`, `getRoll`);
- projected angle;
- activity;
- throw state;
- button state and multipress count;
- LED clear, fill, range, point, RGB/HSV, individual-pixel, and blend controls.

The button implementation uses source thresholds of 500 ms for long press,
1,500 ms for very-long press, and a 300 ms multipress window. On a battery build,
a very-long press can shut down the club. Rehearsal controls must therefore not
depend on holding the button beyond that threshold.

The global script loader accepts a `.wasm` file under `/scripts`, calls exported
`init`, `update`, and optional `stop`/`setParam` functions, and caps a script at
16,000 bytes with a 4,096-byte WASM memory limit. A compact parameterized scene
engine is therefore preferable to 20 large independent programs.

The word `init` is misleading for hardware work on this firmware. Persisted
script `init()` runs while Root is still constructing components: Script comes
before Buttons and Motion. Use it only to reset cartridge-owned variables and
emit non-hardware diagnostics. Enable/read the IMU, read the button, and
establish time baselines on the first normal `update()`. The pre-fix V4 broke
this rule and started two overlapping IMU setup paths; V5 enforces the rule
with import-call counters in its simulator.

These API statements are now backed by a physical end-to-end canary. The first
packed-color `arduino.fillLeds` diagnostic executed but remained visually
transparent. Replacing it with `arduino.fillLedsRGB(r,g,b)` and selecting Alpha
blend produced solid red, green, and blue on Club 0. Luke observed the complete
cycle, while live logs recorded three raw press edges and state transitions
green -> blue -> red. The autonomous scene browser is no longer blocked on
script-to-LED integration; use the proven three-channel RGB path and treat
packed RGB/HSV calls as separate unverified ABI variants.

### Boot behavior uses stock `scriptAtLaunch`

The stock runtime stores scripts under `/scripts`, loads a named script on
command, and live stable 1.2.0 exposes writable `/script/scriptAtLaunch`. The
earlier reboot returned unscripted because that setting was empty, not because
boot launch was absent. The live Bentuino button path also lacks the obsolete
BentoFlow offline double-click stop shortcut; very-long press remains reserved
for shutdown.

All three clubs first received the 3,997-byte V3 `motion-lab.wasm`. Club 1 now
saves the runtime-accepted 3,992-byte V5 as `motion-lab`; it clean-boots into
Demo, completed a full 24-effect physical soak, and accepts a first press to
P1E1. Its artistic review is also complete and identified several effects that
must change. Clubs 0 and 2 remain off on V3 until V6 passes Club 1's physical
and runtime gates; do not install V5 on them. Battery operation without the
home access point remains a later acceptance gate.

## Initial scene catalog

The table below remains the broader design vocabulary. The current 24-effect
implementation exists as three eight-effect families in
`scenes/motion-lab/`: roll, flip, and energy/combinations. Its software behavior
is simulator-validated and Club 1 passed exact 24-effect runtime acceptance.
Luke's complete physical review now identifies which effects to keep, repair,
or replace in V6; Yuki's separate artistic review remains future work.

| # | Scene | Motion input | Visual response |
| --- | --- | --- | --- |
| 01* | Orientation palette | Projected angle | Map a full planar revolution to a continuous palette; validated on one club |
| 02 | Gravity split | Roll | Move a hard boundary between two colors |
| 03 | Tilt fill | Pitch | Fill more of the strip as the club tips |
| 04 | Compass bands | Yaw | Select/rotate bands by heading; venue-sensitive |
| 05 | Lantern | Orientation | Upright, horizontal, and inverted poses have distinct palettes |
| 06* | Spin comet | Angle change over time | Faster rotation produces a longer/brighter tail |
| 07 | Counter wheel | Projected angle | Two opposed points travel around the LEDs |
| 08 | Velocity palette | Angle change over time | Rotation speed selects hue or saturation |
| 09* | Activity flame | Activity | Movement increases flame height, brightness, and flicker |
| 10 | Stillness bloom | Inverse activity | A soft bloom grows while held still and scatters on motion |
| 11 | Shake sparks | Activity spikes | Short random sparks appear during energetic movement |
| 12 | Energy bands | Activity | More movement creates more or narrower bands |
| 13* | Launch/catch pulse | Throw-state transitions | Distinct launch, airborne, and catch accents |
| 14 | Airborne tracer | Throw state + angle | A point or stripe moves while the club is airborne |
| 15 | Throw freeze | Throw state | Freeze the last orientation palette during flight |
| 16 | Catch inversion | Throw-state transition | Briefly invert the base palette at catch |
| 17 | Spinning throw | Throw state + angle change | Airborne rotation drives stripe speed |
| 18 | Hue and energy | Projected angle + activity | Orientation selects hue; movement selects brightness |
| 19 | Firefly orbit | Projected angle + activity | Angle positions a point; activity controls its tail |
| 20 | Choreography scene | Multiple signals | Calm base texture plus rotation and throw accents |

The local script API does not directly expose gyro or raw acceleration in the
reviewed stable source. Rotation speed can be estimated from angle change over
time. A central host experiment can separately use the live gyro and
acceleration fields and show whether extending the local API would be valuable.

## Persistence-of-vision renderer

**Feasibility hypothesis:** the club can act as a polar persistence-of-vision
(POV) display during a fast, repeatable 360-degree planar swing:

```text
32 LEDs along club = radial pixels
successive frames during rotation = angular columns
```

At each measured angle, a local script selects one column from a polar bitmap
and writes its 32 radial pixels. This should run locally rather than stream full
frames over Wi-Fi, because angular phase and LED output need low and predictable
latency.

**Source-backed timing:** the firmware configures the BNO055 in NDOF mode and
computes a normalized `projectedAngle` from fused orientation. Bosch specifies
100 Hz fusion output in NDOF mode. The firmware polls the sensor in a dedicated
task with a 5 ms delay, although the actual end-to-end fresh-sample rate remains
to be measured. The 50 Hz `orientationSendRate` controls network feedback, not
the local script's access to the latest computed angle. The 32 SK9822 LEDs are
clocked devices and the firmware refreshes them from its main loop without an
explicit frame-rate delay, but the actual stable club LED frame rate is also
unmeasured.

If fresh angular phase is effectively 100 Hz, the un-interpolated angular
column budget would be approximately:

| Rotation rate | Columns per revolution | Angular spacing |
| --- | --- | --- |
| 1 revolution/s | 100 | 3.6 degrees |
| 2 revolutions/s | 50 | 7.2 degrees |
| 3 revolutions/s | 33 | 10.9 degrees |
| 4 revolutions/s | 25 | 14.4 degrees |

Prediction between fresh angle samples may improve that, but the current local
WASM API does not directly expose gyro. Do not claim a particular image
resolution until measured on the physical club.

### Geometric limitation

The IMU measures attitude, not room position. A recognizable stationary POV
image requires the club's attitude to map consistently to its location around
the swing. A radial club rotating in a stable plane is a good case. Moving the
club around a circle while independently changing wrist orientation, changing
the swing plane, or translating the pivot will bend or smear the image.

A single 360-degree swing is likely to create an obvious light trail and can
produce a complete image in a fixed long-exposure camera. A stable complete
naked-eye image is a harder target and will generally benefit from repeated,
fast, consistent revolutions in a dark environment. Treat camera POV and
naked-eye POV as separate capabilities.

Simple rings, spokes, sectors, radial gradients, and abstract motion textures
should tolerate real juggling better than text, logos, or detailed pictures.
External camera tracking would be needed only if a picture must stay fixed in
room coordinates despite free-form motion.

### Progressive POV experiment

1. **Ring, no phase tracking:** illuminate one fixed LED and make a safe planar
   sweep; it should trace a circle/arc in darkness or a long-exposure photo.
2. **Spokes:** use `projectedAngle` to flash all 32 LEDs in narrow windows every
   30 degrees; look for a 12-spoke wheel.
3. **Polar test card:** render alternating rings and sectors from a small
   32-by-48 bitmap.
4. **Image test:** try one bold glyph or icon, then measure distortion at
   different rotation speeds.
5. Compare naked-eye appearance, normal video, slow-motion video, and a fixed
   long-exposure camera. These are different acceptance tests.

Perform physical swing tests only in a clear area away from the desk, cables,
people, and the other clubs.

External timing reference: [Bosch BNO055 datasheet, section 3.6.3](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bno055-ds000.pdf).

## Composition model

The scenes should be reusable building blocks rather than copied code. A show
score can refer to them by stable ID:

```text
cue  start       scene             clubs  transition  parameters
01   00:00.000   stillness-bloom   all    1.0 s       blue, low energy
02   00:18.500   roll-rainbow      all    0.3 s       mirrored by club ID
03   00:41.250   launch-catch      0,2    cut         white catch pulse
```

During rehearsal, button presses choose the scene. During a tightly
choreographed musical performance, time from a single master transport should
choose the scene; movement should modulate the scene from inside the cue.

Button-driven cue advance remains useful for exploratory practice, pieces with
flexible timing, and recovery/fallback. It should not be the default master clock
for music-exact choreography because it adds manual timing error and another
task for the performer.

## Music-synchronized performance architecture

The intended magical effect comes from three synchronized layers:

```text
master transport -> music playback
                 -> scheduled scene cues -> clubs
juggler hears music and performs the rehearsed movement
club IMU modifies the active scene locally
```

This is a hybrid architecture:

- one host clock owns song position, cue boundaries, start, pause, and recovery;
- each club owns the fast movement-to-light rendering inside the current scene;
- a lost network packet should not make the club go dark; it should continue
  its current local scene until it receives a later cue or stop command.

BenTo already supports Audio and Block layers on one sequence transport for the
first host-timed prototype. The firmware playback layer can also run local color
files and start/stop named scripts at metadata-defined times, with a source
limit of 32 script intervals. We must measure multi-club start alignment and
drift before treating on-prop playback as music-exact.

### First generated music score

`shows/exit-the-premises-poc/` is the first concrete central-show prototype. It
uses a one-minute excerpt of **Exit the Premises** at 128 BPM and combines one
Audio layer with a color-bed layer and a beat-pulse layer. The structure is
deliberately simple enough to judge:

- four eight-bar visual sections create large-scale form;
- white downbeat flashes make musical alignment obvious;
- shorter colored pulses mark the other beats; and
- all connected clubs receive the same score, avoiding the unresolved
  device-ID persistence issue during the canary.

The generated project is a central streaming experiment, not yet the target
hybrid architecture: movement does not modulate these cues, and loss of the
host/network can stop the live show. Its purpose is to establish whether one
BenTo transport keeps audio and three-club lighting aligned and whether the
chosen visual phrasing is useful for juggling.

The overnight build was offline only because the Mac was locked. Native BenTo
loading now passes: the waveform and both light layers render across the full
minute with transport stopped at zero. Active Block routing and physical
authored-color output passed on Club 0. The first beat accents were hidden by
BenTo's reverse compositor order; the stored order is corrected, but Luke's
physical beat-visibility assessment remains pending.

### Full-song form score

`shows/exit-the-premises-full/` expands the proof into the complete 3:30 track.
The exact source was analyzed in 4-bar units using energy, spectral shape,
onset flux, and repetition similarity. That supports eleven interpreted roles:
intro, Groove A1, Chiptune B1, Groove A2, Chiptune B2, first lift,
breakdown/rebuild, bridge, final build, final peak, and outro. These names are
our compositional interpretation, not official verse or stanza labels.

The score applies two reusable arrangement rules:

1. Give recurring musical material a recurring visual family. The audience can
   recognize a return even when the palette changes.
2. Make the return develop. Increase only a few readable dimensions—speed,
   brightness, density, spatial fill, shrinking gaps, and accent intensity—so
   the visual energy builds with the music.

The resulting motifs are slow purple Noise for intro/outro, Multipoint lattices
for the Groove A/final-build family, Rainbow and electric Noise for Chiptune B
and the synth lifts, a progressive Range fill for the rebuild, and beat-stepped
Point positions for the bridge. Sparse Add layers supply beat, transition, and
low-duty strobe emphasis over the continuous Alpha motif.

This full score is still a central streamed show: it is time-reactive, not yet
movement-reactive. A later hybrid revision can retain these section/motif cues
while using local IMU response inside the active motif. It has passed offline
generation and structural validation but not native BenTo or physical-club
testing.

## Recommended development sequence

1. Finish the already-armed built-in roll-isolation observation.
2. Create one minimal local WASM scene: projected-angle rainbow.
3. Add short-press scene advance and a visible scene-number signature.
4. Add the other three representative primitives: derived spin speed, activity,
   and throw/catch state.
5. Put those four scenes in a BenTo song timeline and compare central full-color
   streaming with local rendering plus low-rate scene cues.
6. Have Yuki rehearse with the four scenes and tune the interaction from his
   actual movements.
7. Expand the catalog toward 20 only from combinations that prove visually and
   choreographically useful.
8. Build the final score from selected scene IDs, then test three-club timing,
   Wi-Fi loss, controller restart, and a portable show network.

This order deliberately tests the four distinct sensor/interaction primitives
before investing in a catalog of superficially different effects.

## First validated artistic scene

On 2026-07-13, the built-in FX mapped projected angle around a full end-over-end
circle. With the current palette and offset, red appeared at upright and the
color progressed around the circle. Luke reported that the orientation-linked
colors looked especially compelling while juggling, with matching colors
appearing at particular points in the air.

This becomes scene `01: Orientation palette`. The reusable control is projected
angle, not the specific statement `red is up`; palette and phase should remain
tunable. The next group experiment is to verify whether all three clubs show the
same color at matched orientations, then deliberately compare unison with
per-club phase offsets. At 18:21 PDT, all three were verified motion-connected
and armed transiently with matching Projected Angle, speed `1.0`, and smoothing
`0.15`; the physical three-club result is now the only missing part of the
unison test.

Luke's first three-club test succeeded but exposed two quality issues: lag and
visible angle-to-color steps. Smoothing was reduced transiently from `0.15` to
`0` on all three to remove the stock FX's additional angle filter. The remaining
steps are structural: stock FX chooses among 32 integer LED-buffer positions.

The follow-up physical test accepted the lower-lag configuration but refined
the visual finding: Luke did not perceive 32 distinct colors; he saw a much
coarser set of jumps. Thirty-two is only the maximum number of source indices
selected per revolution. It is not the effective palette resolution of the
current pattern in motion. Scene `01` should therefore be described as a
stepped orientation palette, not a 32-color palette.

The first custom implementation of scene `01` now lives in
`scenes/orientation-palette/` and maps the continuous projected-angle float to a
solid HSV hue. Its first controlled load on Club 0 was halted because the club
went offline immediately afterward. It must not be deployed to the other clubs
until Club 0 is recovered and the module/device interaction is diagnosed.

Club 0 was recovered, and a reduced module passed a ten-poll network canary
before group deployment. The subsequent physical test invalidated the claimed
scene success: all three continued showing the prior solid/static rainbow and
did not render the direct mapping. The module used the wrong versioned host ABI.

The corrected scene now targets CreatorsClub 1.2.0's `arduino` imports and
8-bit FastLED HSV through BenTo's own AssemblyScript compiler version. It is not
yet accepted. The next creative gate is intentionally non-motion: Club 0 must
become unmistakably solid red and remain reachable. Only after that should the
continuous angle mapping be tried again.

That first red gate also failed. Live one-shot log markers proved the script's
`init()` and `update()` functions executed, but a linked
`fillLeds(0xff0000)` call on every update did not change the visible rainbow.
The later RGB button canary isolated the failure to that packed-color call:
`fillLedsRGB(r,g,b)` with Alpha blend physically rendered solid colors and raw
button-edge cycling. `scenes/sensor-playground/` now implements four local
scenes using that proven output path: Orientation wheel, Orbit comet, Activity
flame, and Spin heat. Its loader, IMU initialization, and network-health gates
passed; Luke's physical sensor assessment is pending.

## Next scene experiment: hue and energy

The next proposed one-club experiment is a minimal hybrid version of scene
`18: Hue and energy`:

```text
local built-in FX: projected angle -> stepped hue
Mac controller:    movement intensity -> whole-club brightness
```

Begin with Club 0 only and do not save the settings. Use a nonzero brightness
floor so stillness never looks like a dead or disconnected prop, a brighter
ceiling for energetic motion, and a short attack/release envelope to prevent
flicker. Test stillness, slow movement, and fast movement before tuning numbers.
This mapping tolerates network latency better than host-controlled hue phase:
the club still renders angle locally, while the host supplies only a broad
energy envelope.

If the result is artistically legible, extend it to all three and compare
simultaneous response. If it is not, inspect the chosen activity or gyro signal
and timing before adding more effects.
