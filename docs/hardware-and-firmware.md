# Hardware and firmware

Last updated: 2026-07-13

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

The reviewed stable Bentuino WASM interface directly exposes yaw, pitch, roll,
projected angle, activity, and throw state. It does not directly expose the raw
gyro, acceleration, or computed spin field. A script can estimate rotation
speed from angle change over time; the central host path can use raw gyro and
acceleration from live telemetry.

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
