# Architecture and design

Last updated: 2026-07-13

## Goal

Build a reliable creative and performance system around three Creators Clubs,
starting with observable motion-to-light behavior and growing toward
multi-prop, cueable theatre operation.

The system should make the smallest useful slice work before embedded firmware
changes: detect one club, log its sensors, control its LEDs, then add mappings,
multiple clubs, cues, and optional visual tracking.

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

The three-club stable 1.2.0/Wi-Fi baseline passed on 2026-07-13. Luke then used
one-at-a-time control to label the physical clubs `0`, `1`, and `2` to match
BenTo Global IDs and invoked `Save All`. The complete mapping is B=`0`, C=`1`,
A=`2`. Do not treat DHCP IP as identity.

## Execution architectures

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

### Autonomous club behavior

```text
club IMU -> local WASM script / built-in FX -> club LEDs
```

Stable 1.2.0 already exposes local script functions for orientation, projected
angle, activity, and throw state. It also has a built-in FX stage that remaps a
pattern from projected angle/yaw/pitch/roll. This path continues without Wi-Fi
after its assets and startup behavior are installed, but authoring/debugging and
multi-club/music synchronization are more involved.

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
current multicolor pattern.

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
