# Creative workflow: motion scenes, rehearsal, and performance

Last updated: 2026-07-13

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

## Rehearsal mode

The proposed first useful product is one local `motion-lab` WASM script with a
data-driven catalog of scenes:

```text
club IMU + button -> local motion-lab script -> 32 LEDs
```

Proposed controls:

- short press: next scene;
- double press: previous scene, after the firmware's multipress window is
  understood in a live test;
- press-and-hold: reserved for normal power behavior, not scene selection;
- scene change: briefly display an unmistakable index/family signature before
  entering the live effect.

With one button, random access among 20 scenes would be cumbersome. A sequential
next/previous browser is appropriate for hands-on rehearsal, while BenTo or a
small host UI should provide random access during authoring. Yuki can record the
scene number and notes for effects he wants to keep.

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

These statements are source-backed. We have not yet compiled, uploaded, or run
a custom script on one of the physical clubs, and the exact AssemblyScript
import names and button behavior still need an end-to-end test.

### Boot behavior remains open

The stock runtime can load a named script on command, but source inspection has
not yet established a persistent boot-time script filename. First launch the
rehearsal script from BenTo and test that it continues after Wi-Fi is removed.
Then determine whether a stock-firmware playback asset can launch it after a
power cycle or whether a host-side `arm rehearsal mode` action is required.

## Initial scene catalog

This is a design backlog, not 20 already-validated effects. Start by building
the four starred representatives; expand only after their sensor behavior looks
good in Yuki's hands.

| # | Scene | Motion input | Visual response |
| --- | --- | --- | --- |
| 01* | Roll rainbow | Projected angle | Rotate a continuous rainbow around the shaft |
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
