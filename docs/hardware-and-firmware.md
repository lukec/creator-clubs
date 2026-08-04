# Hardware and firmware

Last updated: 2026-07-19

## Public Creators Club hardware model

**Source-backed, not yet confirmed component-by-component on the factory clubs:** the
public `BentoFlow` `creatorclub` configuration describes:

- ESP32 controller with 2.4 GHz Wi-Fi.
- 32 SK9822 addressable LEDs.
- Bosch BNO055 nine-axis IMU.
- Battery-voltage sensing.
- One physical button.
- IR LED transmitter hardware.
- SD-card storage for shows and files.
- USB serial and Wi-Fi/OSC control.

The IR component is an emitter, not a position camera. The club cannot derive
reliable room-scale XYZ position from the IMU alone.

## Source-backed shell construction and light transmission

Flowtoys says Creator and Vision props use the same LED pixels, battery,
body/build options, and outside look and feel. The published Vision club is
therefore the applicable public construction reference for the Creator shell,
even though the Creator control electronics differ.

Official specifications give 515 mm length, 82 mm maximum width, a
polycarbonate internal shaft, a special polyethylene-blend club body, an EVA
foam knob, and a silicone cap. Flowtoys says Henrys manufactures the custom
parts to Flowtoys-specified light transmission and weight; standard Henrys
parts are not optical substitutes. Development notes say months were spent
tuning the translucency and amount of material in each part. A support article
identifies extrusion blow molding for the body and handle. No public source
found in the 2026-07-17 review describes a separate diffuser film, so the
molded translucent parts themselves are the source-backed diffuser.

Sources:

- <https://flowtoys2.freshdesk.com/support/solutions/articles/6000201980-vision-vs-creators-what-s-the-difference->
- <https://flowtoys.com/products/vision-club>
- <https://flowtoys2.freshdesk.com/support/solutions/articles/6000201981-vision-clubs-can-i-get-henrys-parts-and-replace-myself-can-i-use-my-own-club-knobs->
- <https://flowtoys.com/blogs/toy-stories/toy-stories-vision-clubs>
- <https://flowtoys2.freshdesk.com/support/solutions/articles/6000230542-my-vision-club-handles-are-cracking-is-this-normal->
- <https://flowtoys.com/cdn/shop/products/vision-clubs-smooth-body-single-led-glow-juggling-club.jpg?v=1778275800&width=1200>

**Verified visual reference supplied by Luke:** the official smooth-club photo
matches the lit physical clubs. It shows distinct overlapping round hotspots in
the narrow handle and much broader, nearly continuous diffusion through the
wide body. Luke also observes two visible RGB emitters facing outward in
opposite directions.

**Open questions:** public sources do not disclose the resin grade, wall
thickness, haze/transmittance, optical coefficients, exact emitter depth, or
physical index map. The current 16-axial-station/two-opposite-source simulator
mapping is therefore an inference that needs a one-source physical index test.

## Bench camera and multi-club USB hub

**Verified on 2026-07-19:** macOS enumerated the new OBSBOT Meet SE through the
new hub and AVFoundation exposed both its video stream and microphone. A
1920×1080 still capture succeeded without opening BenTo or any club serial port.
The first settled frame contained three partially overlapping illuminated club
bodies. Luke then rearranged them and a second capture showed all three clubs
nearly end to end, including handles, bodies, white knobs/caps, and USB leads.
Luke reports all three are plugged in and powered by USB. The image verifies a
usable full-prop optical observation path, though its desk arrangement is not a
motion-tracking view. Captures are private and ignored; no camera image is
stored in the public repo.

The hub enumerates distinct USB 2 and USB 3 branches. At the same observation,
the USB 2 branch contained the camera and two CP2102N club bridges, producing two
USB serial callout devices. Exact USB serial identifiers are deliberately not
recorded. All three receiving USB power does not prove that all three cables
carry data; the present macOS data-side observation remains two clubs. Check the
third cable/port before diagnosing firmware or attempting simultaneous serial
control.

The shared-hub arrangement is sufficient for still capture and two serial
devices. High-frame-rate motion capture at 100/150 fps has not been tested and
may expose camera bandwidth, cable, or hub-branch limits. Prefer a direct camera
connection only if that test shows dropped frames or unavailable modes; keep the
club hub for power/data fan-out.

## Club inventory

| Club | Physical/BenTo ID | ESP32 MAC | Factory backup | Current firmware |
| --- | --- | --- | --- | --- |
| A | `2` | `CLUB_2_MAC` | Preserved/reconstructed rollback plus original failed-flash capture | Stable 1.2.0; Wi-Fi/OSC/live patterns pass |
| B | `0` (live OSCQuery readback) | `CLUB_0_MAC` | `club-b-golden-20260713-1029-full-4mb.bin` | Stable 1.2.0; Wi-Fi/OSC pass |
| C | `1` | `CLUB_1_MAC` | `club-c-golden-20260713-1507-full-4mb.bin` | Stable 1.2.0; USB/Wi-Fi/OSC/BenTo prop pass |

BenTo displays all three clubs simultaneously as Wi-Fi props. Current IPs are
useful for diagnosis but are DHCP-derived and not durable device identifiers.
Luke physically labeled the clubs `0`, `1`, and `2` to match BenTo. BenTo's
Global-ID and Network-IP fields, combined with the verified IP-to-MAC table,
establish the complete mapping: B=`0`, C=`1`, A=`2`.

## Installed firmware evidence

**Verified:** the connected club speaks serial at 115200 baud but continuously
prints only `Power up Everything` during passive observation.

**Verified:** that exact string was not found in:

- The current public BenTo checkout.
- Creators Club public firmware packages 1.0.3 through 1.2.0b4 downloaded from
  BenTo's configured firmware service and inspected with `strings`.
- An exact public web/code search performed on 2026-07-13.

**Inference:** current public firmware documentation and behavior tables cannot
be applied directly to this installed binary.

## Historical factory button and color evidence

Observed color states across the three clubs included yellow, green, and
white. `White` is Luke's standard name for the previously described
white/light-purple appearance. A roughly 2–3 second button hold caused no visible change
while held, then a change to green on release. Solid colors persisted long
enough that they may be shows/demo states rather than transient network status.

Therefore:

- Do not use color alone to diagnose Wi-Fi.
- Do not use the public button-duration table to control the factory test build.
- Record color changes with the exact preceding action and timestamps, but do
  not attach a meaning until confirmed by logs or the matching firmware source.

## Public firmware button references

The original observations below came from the factory test build and should not
be projected onto stable 1.2.0.

### Legacy BentoFlow button behavior

| Gesture | Current public behavior |
| --- | --- |
| Press while asleep | Wake |
| Short press under about 0.5 s | Emit `shortPress`; effect is show-defined |
| Hold about 0.5–1.5 s | Emit `longPress`; effect is show-defined |
| Very long hold around 1.5 s | Sleep/power off |
| Press during Wi-Fi connection | Disable/cancel Wi-Fi attempt |
| Two quick presses | Stop player/script in certain failed/disabled Wi-Fi states |
| Three or more quick presses | Load numbered demos when present and allowed |

The observed 2–3 second behavior did not match this table.

### Stable 1.2.0 Bentuino button behavior

The firmware now installed on all three clubs uses a different button
implementation. Source-backed behavior is:

| Gesture/state | Stable 1.2.0 behavior |
| --- | --- |
| Physical press | Sets the button value and increments `multiPressCount` |
| Held past 500 ms | Sets `longPress`; local WASM `getState()` returns `2` |
| Held past 1,500 ms | Sets `veryLongPress`; local WASM `getState()` returns `3` |
| Battery club very-long press | Shuts down when `canShutDown` remains enabled |
| Multiple presses | Counted when the next press occurs within the 300 ms window |
| Released before 500 ms | The dedicated short-press event is commented out; a script can detect the press/release edge |

Local scripts can read both button state and multipress count. For the proposed
rehearsal scene browser, use short clicks and reserve long holds for normal
power behavior. Single-versus-double click interpretation needs one physical
end-to-end script test because delaying a single-click action until the 300 ms
window closes may be necessary.

**2026-07-15 physical exception:** Club 1 remained illuminated after USB was
removed and the button was held past the documented threshold. The source path
requires both an updating/enabled button component and `canShutDown=true`.
Because a prior diagnostic temporarily controlled button enablement, the live
component/setting state is the leading hypothesis, but it has not been read
back. This observation does not invalidate the source threshold; it shows that
the prerequisite runtime state cannot be assumed after a diagnostic.

Source inspection found no stable 1.2.0 connection from the button component to
the LED playback layer. `LedStripPlaybackLayer::togglePlayPause()` exists but
has no discovered caller and its current conditional appears reversed: the
not-playing branch calls `pause()` while the playing branch calls `play()`.
Therefore do not expect the stock button to start, pause, or cycle uploaded
playbacks. A WASM scene engine or a reviewed firmware change must implement the
desired next/previous behavior.

### Network indicator colors

| Pattern | Current public meaning |
| --- | --- |
| Cyan moving/pulsing | Joining stored Wi-Fi |
| Brief green fade | Wi-Fi joined |
| Red pulsing point | Wi-Fi join failed |
| Purple | Wi-Fi disabled |
| Yellow | Hotspot mode if implemented by that build |

These indicators can be superseded by a playing show and are not confirmed for
the factory test binary.

## Factory firmware identification

Yuki did not flash or customize the clubs. Golden Club B's valid app0 image
contains both:

```text
Power up Everything
test firmware version 0.0
```

The repeated serial line is therefore intentional behavior of the factory test
firmware, not evidence of a boot loop or a private Jonglissimo build.

## IMU signals available in public firmware

| Signal | Meaning | Candidate creative use |
| --- | --- | --- |
| `orientation` | Yaw, pitch, roll | Hue, gradient direction, scene selection |
| `gyro` | Angular velocity | Spin energy and texture |
| `accel` | Acceleration including gravity | Impacts and broad movement |
| `linearAccel` | Acceleration without gravity | Catch/impact envelopes |
| `quaternion` | Fused orientation | 3D graphics integration |
| `calibration` | Fusion sensor calibration state | Quality diagnostics |
| `activity` | Smoothed movement intensity | Brightness/energy envelope |
| `throwState` | Heuristic throw classification | Launch/catch triggers |
| `spin` | Estimated rotations during a throw | Spin-indexed effects |
| `projectedAngle` | Normalized orientation-derived angle | Continuous effect phase |

The BNO055 performs onboard sensor fusion. On 2026-07-13, ID 0's public stable
1.2.0 runtime successfully initialized the physical BNO055 and returned live
values. The motion component starts disabled on each boot; a transient
`/motion/enabled = true` write changed both `enabled` and `connected` to true.

### Persisted-script startup ordering

The checked-out stable Bentuino source and Club 1's 2026-07-16 continuous boot
trace agree on a critical ordering rule. Root adds and immediately initializes
the Script component before Buttons and Motion. Loading `scriptAtLaunch` calls
the WASM `init()` during that Script initialization. Motion has therefore not
yet run its own `initInternal()` when the cartridge starts.

The pre-fix 4,113-byte V4 cartridge called `setIMUEnabled(1)` in `init()`. On
Club 1 this began BNO055 setup before normal Motion initialization; the later
Motion path began another setup, followed by two detection/setup sequences,
I2C `ESP_ERR_INVALID_STATE`, and continuing invalid (`nan`) reads. No low-stack
stop occurred. Persisted cartridges must keep `init()` hardware-free and defer
time, button, motion getters, and IMU enablement until the first normal
`update()`. This is now a simulator-enforced contract in Motion Lab V5.

The same trace separately reported ESP-NOW in normal mode and explicitly said
ordinary Wi-Fi was not connecting. That is saved transport state, not an IMU
symptom. A later authorized private settings read verified
`comm.espnow.enabled=true` and `buttons.button1.enabled=false`; no credential or
exact identifier was copied into tracked files. Club 1 was repaired and saved
with ESP-NOW disabled and button 1 enabled. Normal Wi-Fi, motion telemetry,
saved Motion Lab boot, and the synthetic first-button handoff now pass.

The current stable runtime can emit orientation at up to 50 frames per second
when enabled. Its `sendLevel` convention is:

```text
0  None
1  Orientation
2  All: orientation plus accel, linearAccel, gyro, and projectedAngle
```

`activity`, spin, and throw state are calculated locally and exposed through
the runtime tree; activity and throw state also have direct local script calls.
The current continuous-send loop does not send all of those fields. The
built-in `leds/strip1/fx` stage can locally remap an
existing pattern using projected angle, yaw, pitch, or roll. More general
activity-to-brightness or activity-to-color behavior is supported by the local
WASM script API (`motion.getActivity()`, orientation access, and throw state)
but needs an authored script rather than another firmware flash.

**Verified on the physical club:** with the built-in FX set to roll isolation,
rolling ID 0 around its long axis changed the visible color. This is the first
completed local motion-to-light test. Absolute-angle repeatability, latency,
wrap behavior, and drift remain unmeasured.

**Verified optical observation from the V5 Page 1 review:** the physical strip
does not have uniform apparent spatial resolution. Luke estimates the handle at
roughly 3/4 to 9/8 inch across its taper and the body at roughly 3 inches at its
widest. Small LED groups remain separately visible in the handle. In the larger
diffusing body, neighboring blue/orange bands blend toward a whiter result and
the orange loses saturation. These dimensions are performer estimates, not a
mechanical drawing. The exact LED-index boundary and useful minimum cluster
width for each region remain to be measured with an index/cluster test pattern.

The transient isolation axis was subsequently changed to `Projected Angle` and
read back successfully while motion and FX remained enabled. Luke then moved the
club through a full end-over-end circle: the color followed orientation, with
red at upright for the current palette/offset, and produced a compelling effect
during juggling. This validates projected angle as a useful artistic control on
one club. At 18:21 PDT, the same transient projected-angle configuration was
applied to the other two clubs; all three BNO055 devices then reported connected
and all three FX configurations matched in filtered readback. Physical
cross-club phase and palette alignment still require Luke's juggling test.

The stock FX is not a continuous color interpolator. It filters its floating
angle, multiplies the result by the strip length, truncates that to an integer
source index, and copies the selected source LED. With 32 LEDs, a full-speed
one-turn mapping therefore has 32 spatial source selections. Reducing
`isolationSmoothing` can reduce filter lag, but genuinely continuous hue needs
a renderer that consumes the floating projected angle directly.

The first attempted direct path did not render on any club. It used the newer
component-style `motion.getProjectedAngle` and `leds.fillHSV` imports, while the
exact official CreatorsClub 1.2.0 binary exposes the older `arduino` script ABI:
`getProjectedAngle`, `fillLedsHSV`, and integer FastLED HSV values. Network
reachability after loading was a false positive because the firmware does not
surface per-update WASM errors in OSCQuery.

An additional compatibility constraint is under test: BenTo's official
AssemblyScript 0.27.37 compiler emits an exported zero-page WebAssembly memory,
while the failed hand-written WAT modules had no memory section. Compiler-built
red and orientation modules now match that structure but still require a
physical Club 0 canary.

Live loader diagnostics refined the ABI boundary further. On the official
CreatorsClub 1.2.0 build, an AssemblyScript function calling
`arduino.fillLedsHSV` was omitted from the runtime's discovered callable
functions, while the same module's empty `init` and separate `stop` were found.
Replacing HSV with the official sample's `arduino.fillLeds(i32)` made
`init / update / stop` all discoverable. Until proven otherwise, scenes for
this exact firmware should compute color themselves and use packed RGB through
`fillLeds`, rather than relying on the apparently unavailable HSV host call.

Further live instrumentation invalidated the assumption that successful
`fillLeds` linking implied LED control. One-shot `printInt` markers proved both
`init()` and `update()` executed, and the update called `fillLeds(0xff0000)` on
every frame, yet Luke observed no color change. The legacy API is therefore
callable but disconnected from the visible LED output, or requires an
undocumented mode/focus transition. Exact build-source or upstream-scene
evidence is needed to distinguish those cases.

A later source comparison exposed a narrower compatibility hypothesis. The
installed image links legacy `arduino.fillLeds(i32)`, but the layered Bentuino
implementation represents each LED as four channels including alpha. The old
canary's conventional packed `0xff0000` can therefore be transparent or
channel-shifted at that bridge rather than opaque red. The RGB button canary
uses `arduino.fillLedsRGB(r,g,b)` and an Alpha script layer to avoid packed-color
interpretation. Luke physically observed red -> green -> blue -> red while live
logs recorded the matching three press-edge state changes. This revises the
earlier integration-gap conclusion: local script rendering works through
`fillLedsRGB`; conventional packed `fillLeds` and `fillLedsHSV` remain unproven
on the transitional ABI/layer bridge.

The reviewed stable Bentuino WASM interface directly exposes yaw, pitch, roll,
projected angle, activity, and throw state. It does not directly expose the raw
gyro, acceleration, or computed spin field. A script can estimate rotation
speed from angle change over time; the central host path can use raw gyro and
acceleration from live telemetry.

Activity is already a filtered signal before WASM receives it. Bentuino divides
the maximum absolute linear-acceleration axis by `40 m/s²`, clamps to `0..1`,
and moves the stored value 10% toward each new sample. Motion Lab V5 then
normalizes that value through the Club 2 calibration and applies another
attack/release filter. Luke's P3E1 review found the result perceptually slow.
This is evidence to remove or specialize the second filter, not evidence that
the BNO055 itself has a low sample rate.

The source-backed throw values are `0 none`, `1 flat`, `2 single`, `3 double+`,
`4 flat-front`, and `5 loftie`. The classifier derives them from acceleration
thresholds with hysteresis. Luke physically observed V5 P3E7 as purple in hand
and another classifier-selected color in the air. That makes a binary
state-0/nonzero Hand/Air experiment promising, but the field is not a formal
airborne flag; repeated throw trials must verify lifecycle correlation and
per-class repeatability before choreography depends on it.

The classification itself is now a priority creative input, not merely a debug
field. The next diagnostic should repeat one named throw at a time and record
the complete state sequence, duration, spin estimate, and false classifications
while held, released, airborne, caught, and dropped. Only repeatable classes
should receive trick-specific choreography. A binary `none` versus `nonzero`
Hand/Air scene remains useful even if the finer classes prove performer- or
club-specific.

For persistence-of-vision work, the BNO055 is configured in NDOF mode. The
manufacturer specifies 100 Hz fusion output for that mode. Bentuino reads the
sensor in a separate task with a 5 ms loop delay and computes
`projectedAngle`; the user-configurable 50 Hz orientation rate only gates
network feedback. The actual fresh-angle and full LED-frame rates on the
physical stable 1.2.0 club remain unmeasured.

The Creators Club configuration uses 32 clocked SK9822 LEDs. Firmware refreshes
the entire strip through `Adafruit_DotStar` in the main component loop with no
explicit frame delay. This hardware class is appropriate for a POV experiment,
but the use of a pin-selected DotStar constructor and the rest of the main loop
mean its real update ceiling must be measured rather than inferred from the LED
chip's theoretical serial rate.

The stable build caps each WASM file at 16,000 bytes and configures a 4,096-byte
WASM memory limit. The planned 20-scene rehearsal catalog should therefore be a
compact parameterized engine, not 20 large independent implementations.

The current Motion Lab V5 `motion-lab.wasm` is 3,992 bytes, SHA-256
`3e11d9011d6a3af70145a532e47119a0908eed51cfaef4238d06a6f5e3318b2d`,
and uses only the verified legacy `arduino` ABI: RGB LED writes, button state,
IMU enable, projected angle, yaw, pitch, roll, activity, throw state, time, and
integer diagnostics. It
derives angular speed from wrap-safe projected-angle change instead of the raw
spin import. Its exported `init()` deliberately calls none of those
hardware-backed imports; the first `update()` primes them after Root has
finished initialization.

### Installed native-stack guard

**Verified from the official installed 1.2.0 binary:** `Script::update()` calls
`uxTaskGetStackHighWaterMark(NULL)`, compares it with immediate `255`, and calls
the WASM update only when the result is greater. FreeRTOS reports stack words,
so the threshold is approximately 1,020 bytes on ESP32. The high-water mark is
historical until reboot; loading a smaller script does not restore margin.

The guard is checked before each WASM update. If one update consumes the margin
without overflowing, the following update logs `Low stack while running wasm,
stopping script`. If the same update exceeds the canary first, the ESP32 panics
before the guard can run again. Both signatures were reproduced while reducing
the P2/P3 renderer call graph. The accepted V5 build leaves the firmware guard
unchanged and instead removes the native-deep paths. A 248-second fresh-boot
physical soak completed all 24 effects and wrapped with neither signature.
Source-backed units/semantics are: yaw/pitch/roll in degrees; projected angle
normalized to one revolution; activity smoothed and clamped to `0..1`; throw
states `0` none, `1` flat, `2` single, `3` double+, `4` flat-front, `5` loftie;
and `spin` as accumulated projected-angle phase while a throw state is active.

An experimental companion image was built from checked-in BentoFlow 1.2.4
source, but live preflight rejected it before flash. The installed stable 1.2.0
image exposes the Bentuino component tree and reports ESP application metadata
`8cabf2c`, compiled 2026-02-11 with ESP-IDF 5.5.2. The candidate used legacy
BentoFlow and ESP-IDF 3.3.5. A valid 4 MB/DIO image that fits app0 is therefore
not sufficient evidence of compatibility.

The live firmware already exposes writable `/script/scriptAtLaunch`, along
with `/script`, `/motion`, `/buttons`, and `/leds/strip1/scriptLayer`. This
removes the need for a firmware change: persist the cartridge name only after a
manual visual/button canary, then test reboot and no-access-point operation on
the supported stable application.

IMU integration is unsuitable for stable room position because error rapidly
accumulates. Magnetometer heading is also venue-sensitive and should be treated
as an artistic signal, not precision tracking.

## Relevant source checkout

```text
LOCAL_BENTO_CHECKOUT
```

High-signal files:

```text
Firmware/Bentuino/platformio.ini
Firmware/Bentuino/src/Common/script/Script.h
Firmware/Bentuino/src/Common/script/Script.cpp
Firmware/Bentuino/src/Component/components/io/button/ButtonComponent.h
Firmware/Bentuino/src/Component/components/io/button/ButtonComponent.cpp
Firmware/Bentuino/src/Component/components/motion/MotionComponent.h
Firmware/Bentuino/src/Component/components/motion/MotionComponent.cpp
Firmware/Bentuino/src/Component/components/ledstrip/LedStripComponent.h
Firmware/Bentuino/src/Component/components/ledstrip/LedStripComponent.cpp
Firmware/Bentuino/src/Component/components/ledstrip/Layer/layers/playback/LedStripPlaybackLayer.cpp
Firmware/BentoFlow/src/common/config/config_creatorclub.h
Firmware/BentoFlow/src/sensors/button/ButtonManager.cpp
Firmware/BentoFlow/src/sensors/imu/IMUManager.cpp
Firmware/BentoFlow/src/MainManager.cpp
Firmware/BentoFlow/src/leds/system/SystemLedMode.cpp
Firmware/BentoFlow/src/communication/wifi/WifiManager.cpp
Firmware/BentoFlow/src/communication/serial/SerialManager.cpp
Source/Prop/PropFlasher.cpp
Source/Prop/props/bento/BentoProp.cpp
```
