# Field and theatre deployment

Last updated: 2026-07-20

## Current bench status

On 2026-07-20, the first read-only check after connecting the proposed USB-C
Ethernet path found no active show-LAN interface. The Mac's existing home
Ethernet and Wi-Fi remained active; the existing CalDigit Ethernet service had
no carrier or DHCP lease, and no USB Ethernet product appeared in the USB
device tree. Establish physical carrier to a yellow Archer LAN port before
configuring DHCP, service order, router settings, or club credentials.

This document separates three operational problems that are easy to conflate:

1. carrying a working club show into a literal field;
2. running a self-contained audio-and-club show in a theatre; and
3. integrating that show with a venue's lighting and show-control systems.

The same laptop-and-router rig can cover the first two. A Raspberry Pi-class
show box with wired audio and a browser remote is the recommended later
simplification for small gigs. Full theatre integration adds a cue bridge and a
second network boundary; it should not turn the club LAN into part of the venue
DMX network.

## Decision summary

- **Field/simple-theatre v0:** run BenTo on the Mac, keep the three clubs on an
  isolated TP-Link Archer C4000 show LAN, and take audio from the Mac to a
  battery speaker or venue PA. BenTo owns one clock for both audio and club
  lighting.
- **Small-gig show-box target:** connect a Raspberry Pi-class computer by
  Ethernet to the show router, send wired audio to the speaker or PA, and stream
  pre-rendered per-club frames from a compiled `.clubshow` package. A phone or
  laptop browser uploads shows and controls the box; it is not the runtime.
- **Full-theatre v0:** keep BenTo as the audio/club clock and add a bridge such
  as Chataigne. The bridge accepts `ARM`, `GO`, `STOP`, and emergency commands
  from the venue over OSC or MIDI/MSC, verifies BenTo state, and returns explicit
  `READY`, `PLAYING`, `STOPPED`, or `FAULT` status. Discrete theatre-lighting
  cues can be fired from BenTo time markers through the bridge.
- **DMX boundary:** DMX, Art-Net, and sACN are level transports for lighting
  universes. They are not the preferred bidirectional show-cue protocol. The
  venue console should continue to own its fixtures and DMX universes. Use a
  reserved DMX input channel only as a venue-specific fallback trigger when
  OSC, MIDI/MSC, or timecode is unavailable.
- **Phone path:** use the phone as a browser remote for the show box. Native iOS
  Ethernet/audio playback research is retained as a fallback, not the current
  implementation target.
- **Reliability gate:** central streaming is not yet theatre-safe. Source shows
  that the current club stream layer clears after one second without frames by
  default. The isolated LAN, startup procedure, three-club timing, and a
  nonblack local fallback still require field testing.

## Evidence

### Verified in this project

- BenTo 2.1.0b6 can load the generated Audio-plus-Blocks shows and expose its
  transport, sequence, prop, and routing state through OSC/OSCQuery.
- `tools/bento_show_control.py` can open a project, assign one sequence to
  Global IDs `0`, `1`, and `2`, play it, stop it, and verify the requested state
  through OSCQuery.
- All three clubs operate simultaneously on stable 1.2.0 over the current home
  test Wi-Fi and have stable human/Global-ID labels.
- The current show projects intentionally save no props. Opening a `.bento`
  file is therefore not enough to produce club output; the performance startup
  must discover the clubs and route the sequence to all intended Global IDs.
- BenTo can use an Audio layer and light layers on the same sequence transport.
  Its selected Mac audio device feeds the speaker or PA while BenTo streams
  club colors.

### Source-backed behavior

- BenTo's working club output is Art-Net. `BentoProp::sendColorsToPropInternal`
  sends RGB frames to the club, and stable 1.2.0 receives them in the
  `streamLayer`.
- Stable 1.2.0 declares `clearOnNoReception=true` and
  `noReceptionTime=1.0` for that stream layer. If no Art-Net frame arrives for
  approximately one second, the stream layer clears. Whether a separately
  active local script can provide an acceptable fallback underneath or beside
  it is an open physical test.
- BenTo has a `DMXBlock` skeleton, but the current model library does not
  instantiate it. There is no current generic theatre-fixture DMX layer in the
  installed authoring/runtime path.
- BenTo exposes OSC Remote Control on default port `43000`, but the installed
  build binds it to wildcard interfaces. It is unauthenticated. A dual-homed
  theatre Mac must not expose that listener directly to an untrusted venue LAN.
- The inspected BenTo source has no external LTC, MTC, or other timecode-chase
  input. Starting BenTo and a second timed show system together creates two
  clocks unless one system follows discrete timing markers from the other.
- Chataigne supports OSC/OSCQuery, MIDI, DMX including Art-Net and sACN, serial,
  UDP/TCP, HTTP, WebSockets, Ableton Link, state machines, timelines, routers,
  and browser dashboards. That makes it a suitable adapter/cue layer; it does
  not need to replace BenTo's club renderer in v0.
- The official Archer C4000 V3 specification gives a `12 V DC, 5 A` supply.
  Earlier regional data lists some variants at `12 V, 3.3 A`. The physical
  router and adapter labels are authoritative before choosing field power.
- Jonglissimo's 2023 Flutter `bento-remote` app demonstrates direct phone
  discovery, local MP3/WAV playback, and synchronized start commands for baked
  prop sequences. Its README says iOS was not compiled or tested by the
  authors. The code uses legacy `/player/*` and `/rgb/*` addresses, whereas the
  current stable club exposes playback under `/leds/strip1/playbackLayer/*`.
  It does not parse or execute `.bento` projects.

### Inference and design choice

- The Archer is a good zero-cost prototype router but a mediocre final travel
  router: it is physically large, uses a high-current 12 V adapter, and has no
  battery or USB-C power input. Use it to prove the show-LAN architecture before
  buying smaller hardware.
- For precise music choreography, BenTo should remain the first master clock
  because its Audio and light layers share one transport. A venue may trigger
  that transport, but the bridge should derive later theatre cue markers from
  BenTo's observed time rather than free-running an unverified parallel clock.
- A wired audio path is preferable to Bluetooth. Bluetooth adds output latency
  and another 2.4 GHz radio in the same performance area as the clubs.

## Mode A: autonomous field rehearsal

The smallest field system is no laptop and no router:

```text
club battery -> persisted local WASM -> IMU/button -> LEDs
phone        -> music -> battery speaker
```

This is useful for motion-scene exploration, not music-exact choreography. Club
2 has the Motion Lab program persisted, but battery-powered LED output, button
grammar, restart, and operation with no access point remain physical acceptance
gates. Do not call this ready until those tests pass.

Advantages:

- least equipment and least radio risk;
- continues when the laptop or LAN is absent; and
- ideal for discovering useful movement mappings.

Limitations:

- audio and clubs have no shared clock;
- only the installed local scene catalog is available; and
- current acceptance covers one club, not the full three-club rig.

## Mode B: synchronized field and simple theatre

### Topology

```text
                         isolated show LAN
                   +--------------------------+
                   | TP-Link Archer C4000     |
                   | WAN disconnected         |
                   | DHCP + 2.4 GHz WPA2      |
                   +------------+-------------+
                                |
          Mac by Ethernet ------+------ clubs 0, 1, and 2 by 2.4 GHz Wi-Fi
             |
             +-> BenTo Audio-plus-Blocks transport
             |
             +-> wired audio -> battery speaker / DI / venue PA
```

Prefer Ethernet from the Mac to an Archer LAN port. It removes the Mac's Wi-Fi
radio from the club link and leaves only the clubs on 2.4 GHz. In a theatre,
use a separate USB network adapter if the Mac also needs the venue control LAN.
Never enable macOS Internet Sharing or bridge the two networks.

If Ethernet is unavailable, the Mac can join the isolated show SSID over Wi-Fi,
as already designed in `bento-and-network.md`. Start with all show clients on
2.4 GHz and no Smart Connect or cross-band dependency.

### Required field kit

- Mac with BenTo 2.1.0b6 and the exact tested show directory;
- Archer C4000, stock power adapter, and one short Ethernet cable;
- USB-C Ethernet adapter or hub for the Mac;
- AC mains or a portable AC power station for the Archer;
- charged clubs, club charging cables, and the Mac charger;
- battery speaker for field use, or an agreed wired PA connection;
- wired 3.5 mm/USB audio cable as appropriate; and
- printed startup, GO, stop, and recovery card.

The Archer adapter rating is not its measured consumption. Do not estimate a
field runtime from `12 V x 5 A`; measure the real rig with a watt meter before
buying a battery around that number. Until then, use its stock adapter from a
proper AC source.

### Router configuration

Configure the router once, offline, before a performance day:

- factory reset it;
- leave WAN physically disconnected;
- use a unique show-only SSID and WPA2 password that are not reused elsewhere;
- use a distinct private subnet;
- disable WPS, UPnP, remote/cloud administration, guest networks, and Smart
  Connect;
- keep client/AP isolation off;
- use 20 MHz channel width and choose a fixed non-overlapping 2.4 GHz channel
  (`1`, `6`, or `11`) after an on-site scan;
- reserve DHCP addresses for the three private club MAC records; and
- back up the router configuration under ignored `private/` storage without
  publishing credentials.

The router is a security boundary, not merely a convenience. Stable 1.2.0's
unauthenticated full OSCQuery response contains configured Wi-Fi credentials.
No venue, guest, or home client should be admitted to this LAN.

### BenTo-free cartridge deployment

Once the Mac and clubs share the isolated show LAN, WASM cartridges can be
updated directly. The host uploads the same accepted `.wasm` artifact to each
club's HTTP file endpoint, commands its local Script component over OSC, and
checks that club's WebSocket loader signature. USB and BenTo are unnecessary for
this path.

Three-club rollout should be parallel only after a one-club canary accepts the
exact artifact hash. Use all-target preflight, parallel transfer/transient load,
an all-three verification barrier, then explicit persistence. Clean restarts may
be staggered to keep failure attribution clear. This is not a distributed
transaction: before persistence, restart is the rollback to the previous saved
startup cartridge; after persistence, repair or rollback is per club. Never
print or commit runtime addresses, and keep BenTo closed so it cannot compete
for diagnostic/control sessions.

### One-time club migration

Moving the clubs from the home test network is a persistent settings change and
must follow the established canary sequence:

1. configure and verify the Archer without touching a club;
2. connect the Mac to the Archer and verify local DHCP;
3. move Club 0 only using the already-tested BenTo Wi-Fi workflow;
4. verify DHCP identity, credential-safe OSCQuery, direct `/yo` discovery,
   BenTo discovery, and one short LED canary;
5. power-cycle Club 0 and repeat the checks; and
6. only then migrate Clubs 1 and 2 one at a time and run a simultaneous test.

No part of that migration was performed during this design session.

### Per-performance startup

Power and prepare in this order:

1. Place the router above floor/body level, away from metal scenery, the PA
   rack, microwaves, and dense audience traffic. Extend its antennas.
2. Power the Archer and wait for a stable 2.4 GHz LAN before powering clubs.
3. Connect the Mac by Ethernet, turn off Internet Sharing, and confirm the
   expected isolated subnet.
4. Disable sleep, screen lock, notification banners, automatic updates, cloud
   sync, and unnecessary radios/apps for the show window.
5. Connect the wired audio path, select it explicitly in BenTo, and play a
   quiet line-check sample.
6. Power the clubs and run BenTo `Detect Props`. Confirm exactly Global IDs
   `0`, `1`, and `2`, acceptable battery levels, and no duplicates.
7. Open the exact `.bento` file. Confirm its relative audio resolves and that
   transport is stopped at `0.000`.
8. Assign the intended sequence to all three clubs. Opening the file alone does
   not assign it.
9. Run `python3 tools/bento_show_control.py status` and record a human-readable
   `READY` only if file, sequence, props, batteries, routing, and stopped
   transport are all correct.
10. Run a five-second low-risk canary, stop, and confirm all three clubs and
    the speaker behaved together.
11. Perform a range walk through the actual juggling area with the audience
    area occupied as closely as practical.
12. Return transport to zero, recheck routing, then hand control to the single
    designated GO operator.

An eventual `arm` command should automate steps 7-10 and emit one clear
`READY`/`NOT READY` result. Until it exists, the UI plus the verified helper are
the supported path.

### GO and stop

- One action owns GO. Do not independently start an audio player and BenTo.
- For CLI-assisted operation, `play` can route all three IDs before starting:

  ```text
  python3 tools/bento_show_control.py play \
    --prop-id 0 --prop-id 1 --prop-id 2 "SEQUENCE DISPLAY NAME"
  ```

- The STOP operator must know both the BenTo UI control and:

  ```text
  python3 tools/bento_show_control.py stop
  ```

- The performer should not also operate the laptop unless the choreography
  explicitly includes that action. Field rehearsal can use a remote GO button;
  theatre operation should have a technician or stage manager.

### Failure behavior and recovery

| Failure | Current expected behavior | v0 response | Theatre gate |
| --- | --- | --- | --- |
| Art-Net/BenTo frames stop | Source default clears the stream layer after about 1 second | Stop/restart the cue; stage wash or intentional blackout covers recovery | Prove a nonblack local fallback or an agreed venue-lighting recovery cue |
| One club disappears | Other clubs may continue | Stop if the asymmetry is artistically unsafe; repower/redetect the missing club | Rehearse single-club loss and explicit continue/abort policy |
| BenTo exits | Audio and central light transport stop | Relaunch, wait for startup to settle, reopen, redetect, reassign, return to zero | Eliminate modal/autosave surprises and prove restart time |
| Archer loses power | Club LAN and stream fail | Restore router power, wait for association, redetect and rearm | Put router on tested UPS/portable power and rehearse AP restart |
| Audio cable/PA fails | Clubs may continue on BenTo time | Stop unless silent continuation is intentional | Give venue an audio-loss abort cue |

Do not improvise a restart from the middle of a song until seek, audio, and all
three club outputs have been tested together. The safe v0 recovery is stop,
rearm at zero, and restart on the stage manager's decision.

## Mode C: full theatre integration

### Separate cueing from DMX levels

```text
venue show-control LAN                    isolated club LAN

lighting console / QLab                  Archer C4000
        |                                      |
 OSC or MIDI/MSC                       clubs 0, 1, and 2
        |                                      ^
        v                                      | Art-Net
 Chataigne / cue bridge -> local OSC -> BenTo on the Mac
        |                                  |
        +-> venue cue/status               +-> wired audio -> PA
```

The Mac is dual-homed but not routed. The bridge is the only application that
needs to speak the venue's cue protocol. BenTo's club-facing OSC, OSCQuery, and
Art-Net remain on the isolated side.

The venue console owns its DMX/sACN/Art-Net output to stage fixtures. Our system
must not emit levels into those universes without an explicit patch, merge,
priority, and failure-behavior agreement with the venue lighting department.

### Recommended first control contract

Use named, idempotent commands rather than exposing BenTo's object tree to the
venue:

| Venue to bridge | Meaning |
| --- | --- |
| `ARM show-id` | Open the exact project, discover/verify props, assign all routes, stop at zero, and return readiness |
| `GO show-id` | Accepted only from `READY`; start the one BenTo transport |
| `STOP show-id` | Stop transport and return stopped state |
| `ABORT show-id` | Immediate safe stop plus venue recovery cue |
| `STATUS show-id` | Return current state, time, prop count, and fault summary |

| Bridge to venue | Meaning |
| --- | --- |
| `READY show-id` | File, audio, props, routing, and stopped transport verified |
| `PLAYING show-id time` | BenTo transport is running at observed time |
| `CUE show-id marker` | BenTo crossed an authored theatre marker |
| `STOPPED show-id` | Transport is verified stopped |
| `FAULT show-id reason` | A required invariant failed; GO is inhibited |

Use a command ID or monotonic generation number so retries cannot start the
show twice. `GO` must not toggle; it is a transition from `READY` to `PLAYING`.
The bridge should acknowledge observed BenTo state, not merely receipt of a UDP
packet.

### Clock ownership

For the first integrated production:

1. the venue calls `ARM` and waits for `READY`;
2. the venue calls `GO` once;
3. BenTo owns audio and club-show time from that point;
4. the bridge observes BenTo time and fires authored `CUE` markers to the venue
   lighting console; and
5. the venue may send `STOP`/`ABORT`, but ordinary cues do not seek or restart
   BenTo.

This supports "the theatre cues BenTo and BenTo cues the theatre" without two
systems fighting over transport. It is cue-accurate, not frame-accurate. The
bridge's polling/trigger jitter must be measured against the artistic need.

A venue-timecode-master design is a later architecture. The current BenTo
source does not chase LTC/MTC. Do not claim hard timecode lock until BenTo gains
that capability or a different runtime renders both audio and club output from
the venue clock.

### Protocol order

Prefer integrations in this order:

1. OSC with explicit acknowledgement and status;
2. MIDI Show Control or well-defined MIDI notes with a return/status path;
3. venue-specific OSC adapters such as ETC Eos or QLab modules;
4. timecode after a real chase implementation exists; and
5. a reserved DMX input channel as a one-way fallback trigger.

Chataigne is a strong first bridge because it already supports these protocol
families, state machines, routing, and web dashboards. A small dedicated bridge
can replace it later if the production needs a narrower, auditable appliance.

### Theatre security and interfaces

- Use separate network interfaces for the club LAN and venue LAN.
- Disable forwarding and Internet Sharing between them.
- Bind the venue bridge explicitly to the venue interface and allow-list the
  console/show-control host where practical.
- Keep BenTo OSC Remote Control local. Because the installed build listens on
  wildcard interfaces, add an interface-specific firewall rule or a small
  loopback-only proxy before connecting the Mac to a venue network.
- Use a wired, balanced audio handoff through an appropriate USB interface or
  DI box. Agree on stereo/mono, level, sample rate, connector, and who owns mute.
- Put the Archer and audio interface on tested UPS power. The Mac battery is not
  a substitute for router power.

## Portable show-player roadmap

### Recommended small-gig topology

```text
phone/laptop browser -- Wi-Fi --> Archer show LAN <-- Ethernet -- show box
Clubs 0/1/2         <-- 2.4 GHz --/                         \
                                                           wired audio -> speaker/PA
```

The show box owns both clocks: it plays audio through one fixed wired output and
streams the corresponding frames by Ethernet to the router and Wi-Fi clubs. The
browser is only a remote panel; closing it or losing the phone connection must
not stop a playing show. Connect the box to a LAN port, let the Archer provide
DHCP, reserve a stable address, and do not depend on WAN or venue networking.

Use a tested USB audio adapter/interface unless the chosen board has a proven
onboard output. The field kit still needs separate, tested power for the router,
show box, and speaker. A phone joins the show SSID only to reach the web UI,
ideally through a local name such as `clubshow.local` with the reserved IP shown
as a fallback.

The C4000 is appropriate for the first proof, but its AC power brick and size
work against the small-gig goal. Once the software path passes, a compact
USB-C-powered travel router is the useful hardware optimization.

### Product boundary: compile shows; do not initially port BenTo

The recommended product is a **Club Show Player**, not a promise to execute
every arbitrary `.bento` project. Keep BenTo as the authoring tool and add an
export step that produces a portable package such as:

```text
show.clubshow/
  manifest.json       format, duration, fps, club IDs, hashes, safe fallback
  source/show.bento   optional editable/generated BenTo project
  audio/track.m4a     licensed local performance asset
  frames/club-0.meta
  frames/club-0.colors
  frames/club-1.meta
  frames/club-1.colors
  frames/club-2.meta
  frames/club-2.colors
```

`.clubshow` is a proposed project format, not an existing BenTo standard. Make
it an ordinary ZIP container with a versioned JSON manifest. It can retain the
`.bento` source for provenance while giving the player the portable audio and
precomputed frames that `.bento` itself does not contain.

BenTo already flattens an assigned sequence to `.meta` plus alpha/red/green/blue
`.colors` playback data: four bytes per LED per frame in `A,R,G,B` order for the
Creators build. The exporter can package those rendered frames with the audio
and manifest. The show box then owns one monotonic show clock, plays audio, and
streams the already-rendered frames to each discovered club over unicast
Art-Net. This is preferable to starting playback independently on the three
clubs: one phone clock avoids four clocks drifting against one another.

The data volume is small. At 60 frames/s, three 32-pixel clubs with four bytes
per pixel produce about 6.9 MB of uncompressed frame data for a five-minute
show; the audio is likely larger. Runtime traffic is far below 1 Mbit/s.

**Repository audit, 2026-07-15:** all 37 `.bento` files then present, including
autosaves, use only seven stock providers: Multipoint, Noise, Point, Rainbow,
Range, Solid Color, and Strobe. None contains a nonempty clip effect, filter, or
parameter link. A direct iOS renderer for the project's current subset is
therefore tractable later, but pre-rendering is still the safer first fidelity
boundary.

A general `.bento` runtime would need project/schema and relative-asset loading,
the layer compositor and blend order, every provider and its animation rules,
automation, effects, filters, targeting, version compatibility, audio routing,
and Art-Net output. That is an engine port rather than a file picker. BenTo's
source snapshot is GPL-3.0, so directly incorporating its C++ renderer also
creates a distribution/licensing design decision. Independent package playback
does not need the BenTo engine in the iPhone app.

There is also a reasonable middle path: implement a strict renderer for only
the repository's supported `.bento` subset. JSON parsing is easy; the real work
is reproducing each pattern's time function, fades, targeting, reverse layer
composition, and blend modes. This is manageable for the current seven-pattern
corpus, but the compiled frame player is smaller still and creates a byte-for-
byte artifact that can be tested before a gig.

### Dedicated frame-player hardware

Once frames are compiled, the light-streaming loop is tiny: read the frame for
the current monotonic time, convert `A,R,G,B` to alpha-scaled Art-Net RGB, and
send one unicast packet to each club. Storage, CPU, and Ethernet bandwidth are
not demanding.

An ESP-class board is therefore credible as a **lights-only** player. It becomes
a less attractive first product if it must also import shows, decode and output
audio, expose a recovery UI, update safely, and keep audio and lights on one
clock. Those pieces are possible but dominate the frame streamer.

The recommended first dedicated appliance is a Raspberry Pi-class Linux SBC
connected by Ethernet to the router, with fixed wired audio and a phone-
accessible web control page. It can own file import, `ARM`, `GO`, audio, frame
timing, logs, and recovery using mature OS services. After that behavior is
proven, the same manifest/frame contract can be moved onto an ESP-class board if
size, boot time, or cost justifies the embedded work.

Do not split audio onto a phone and frames onto a separate embedded box without
a synchronization protocol: that recreates two clocks and transport latency.
Whichever device plays the audio should normally be the show-clock master.

### Show-box web interface and runtime

The web service binds only to the isolated show LAN. It should provide:

- a show catalog with duration, audio name, package hash, and validation state;
- upload of one `.clubshow` to a temporary location, followed by ZIP path-
  safety, manifest-schema, hash, audio, frame-length, FPS, and club-ID checks;
- atomic promotion only after validation, so a failed upload cannot replace the
  last known-good show;
- live inventory and patch status for every logical show role; the initial
  deployment maps three roles to Creator Global IDs `0`, `1`, and `2`;
- Identify, replacement, calibration, and compatibility checks for the assigned
  physical devices, plus the selected wired audio device;
- `ARM`, large deliberate `GO`, `STOP`, and explicit `READY`/`PLAYING`/`FAULT`
  states; and
- a compact downloadable run log after each show.

The player service starts automatically at boot in `STOPPED`, never resumes a
show after power loss, and forbids upload/delete/update operations while
playing. `ARM` opens and buffers the audio, verifies exact package hashes,
discovers all expected clubs, sends a low-brightness canary, and pre-resolves
unicast destinations. `GO` starts the wired audio and frame scheduler on one
clock. Browser disconnection does not alter playback.

Shows target logical roles, not physical IDs. The appliance stores the private
inventory, per-device calibration, and production/venue patch separately. A
broken club is replaced by discovering and identifying a compatible spare,
canarying it, and atomically changing the patch; the `.clubshow` package remains
unchanged. This same driver/patch boundary extends to static WLED, Art-Net,
sACN, DMX, and future open ClubShow fixtures. See `docs/show-box-product.md`.

The web UI must not be the only emergency path. The first field box should have
either a locally connected keyboard/button or a GPIO STOP input that is handled
inside the player service. A later enclosure can add dedicated ARM/GO/STOP
controls and status LEDs without changing the package/runtime contract.

### Integrated Wi-Fi product boundary

Raspberry Pi OS officially supports access-point mode on current Wi-Fi-equipped
Pi families through NetworkManager. A one-board prototype can therefore host a
private 2.4 GHz show SSID, provide DHCP, serve `clubshow.local`, receive phone
control, and send unicast Art-Net to the clubs without an external router. The
Ethernet port can remain a maintenance/fallback interface.

This creates three product architectures:

| Architecture | Customer experience | Main advantage | Main risk/cost |
| --- | --- | --- | --- |
| Pi onboard Wi-Fi is the AP | One board and one enclosure | Lowest BOM and setup | Player reboot also removes the network; onboard antenna/range and AP stability need stage proof |
| Finished travel router plus show box | Two field-replaceable devices sold as one kit | Mature RF/router behavior and lowest radio-integration risk | More cabling, power, setup, and support surface |
| One enclosure with separate router subsystem | One customer-facing box, internally two computers joined by Ethernet | Network can remain up while the player restarts; radio and playback responsibilities stay clean | Highest enclosure, thermal, integration, and regulatory work |

**Recommended sequence:** prototype Pi onboard-AP mode first because the traffic
and client count are tiny and the one-box value is real. Keep the player
network-agnostic so the same image also works behind an Archer or travel router.
Compare the Pi AP against the Archer at the intended performance distance plus
margin, with three streaming clubs, a connected phone, wired audio, body
occlusion, a full-show soak, browser reconnection, and repeated cold boots. Use
a separate finished router for early sellable units unless the onboard AP passes
those tests with comfortable margin.

For the AP configuration, use a market-correct regulatory country, fixed 2.4
GHz channel plan, WPA2-compatible security for the clubs, no client isolation,
no WAN dependency, and an explicit recovery path. Do not assume a third-party
antenna is covered by the board's existing approvals.

**Product-compliance boundary, not legal advice:** ISED permits a host product
to rely on certified radio modules in specified circumstances, but the module
must be integrated according to the certificate holder's instructions and the
final host still has RF-exposure, labelling, and user-notice obligations under
RSS-Gen/RSS-102. Raspberry Pi publishes modular certifications and product-
integration support; antenna changes can add approval work. Before selling even
a low-volume Canadian run, have a recognized test/compliance lab review the
exact board, enclosure, antenna, power supply, labels, and bilingual notices.
Selling an unchanged, already-certified travel router as a separate companion
is the lowest-complexity radio path.

### Deferred iPhone-native runtime

The following iOS work is retained as a fallback if a native phone runtime is
revisited. It is not the current small-gig implementation target.

The app needs the iOS Local Network usage declaration and must explain the
permission before requesting it. The clubs already advertise Bonjour
`_osc._udp` and `_oscjson._tcp`; discover those services, read their Global IDs,
and then send OSC/HTTP and Art-Net to resolved unicast addresses. Do not make
Art-Net broadcast discovery the normal path.

This matters because Apple requires a separately approved multicast entitlement
for arbitrary UDP broadcast or multicast. Bonjour discovery through the system
API plus unicast show traffic avoids that entitlement. A DHCP reservation or a
manual emergency address can be a fallback, but an address must never replace
Global ID as club identity.

The app's `ARM` screen should require:

- Local Network permission granted and Ethernet path present;
- exactly Global IDs `0`, `1`, and `2`, with expected firmware and acceptable
  battery state;
- the intended Bluetooth audio route, not the iPhone speaker;
- matching package, audio, and frame hashes;
- a successful low-brightness frame canary; and
- transport stopped at zero with a stored speaker latency calibration.

### Audio/light synchronization and failure behavior

Bluetooth adds output latency that varies by speaker, codec negotiation, route,
and reconnection. iOS exposes an estimated audio output latency, but the full
acoustic offset should be measured and stored per speaker. Schedule audio on a
future audio-device time, start the LED timeline at the calibrated acoustic
presentation time, and invalidate `READY` whenever the audio route changes.
A wired audio adapter remains the more deterministic option when timing matters.

During a show the app should remain foreground, disable idle sleep, suppress
interactive controls except an intentional STOP, and use Guided Access or a
similar operator setup. An audio interruption, route change, Ethernet path
loss, missing club, or sustained frame-send failure must leave the playing state
and present a clear fault. Stable 1.2.0 currently clears its stream layer about
one second after frames stop; a tested local nonblack failure layer remains a
separate safety requirement.

### Deferred iPhone-native test slice

1. Build a native networking/audio harness: Bonjour-discover the three clubs
   over USB-C Ethernet, send a unicast solid-color canary, select Bluetooth
   output, and display the iOS latency estimate.
2. Export one existing show into a versioned `.clubshow` package containing its
   audio and per-club rendered frames, then verify all hashes on import.
3. Add only `IMPORT`, `ARM`, `GO`, and deliberate `STOP`, with acknowledged club
   health, route-change handling, and a per-speaker visual-offset calibration.
4. Run repeated five-minute and full-song tests, then inject Ethernet,
   Bluetooth, router, and single-club failures before treating it as gig-ready.

Jonglissimo's 2023 Flutter `bento-remote` is useful protocol/UI prior art, but
it is not this player: it was not tested on iOS, uses legacy `/player/*` and
`/rgb/*` paths, plays a separate local audio file, and does not parse `.bento`.

### Phone roles

- **Show-box remote:** the current target is an ordinary browser that uploads
  `.clubshow` packages and sends acknowledged `ARM`, `GO`, `STOP`, and `STATUS`
  requests to the Raspberry Pi-class box. No native app is required.
- **BenTo remote:** the same browser contract could later control BenTo on a Mac
  through a local runner, but that does not remove the laptop.
- **On-club baked playback:** the phone uploads or selects `.colors` data and
  starts local playback on each club while playing audio. Network load is tiny,
  but three club clocks plus Bluetooth audio need measured start-skew and drift
  correction. Keep this as an experiment, not the default architecture.
- **Direct subset renderer:** independently implement only the seven currently
  used stock patterns and reject unsupported `.bento` constructs at import.
  This can reduce package size later, but it increases parity and versioning
  work without improving the first gig.

### Dedicated hardware

The first dedicated device should package a proven runtime, not force a new one.
A laptop remains the immediate field v0 because it has a display, battery,
audio, recovery tools, and a validated BenTo build. The first purpose-built
target is now a Raspberry Pi-class Linux show box with Ethernet, fixed wired
audio, and a web remote. Later candidates are:

- an applianceized Mac or small computer running BenTo plus a phone/web remote;
- a small computer running a purpose-built baked-playback/audio controller; or
- a redundant pair for productions that justify the complexity.

The show box does not initially run the BenTo GUI or depend on BenTo's Raspberry
build targets. Falcon Player/FSEQ is the first runtime candidate: it already
provides Pi-class sequence-plus-audio playback, web management, and standard
lighting outputs. Test a stock FPP export before implementing the narrower
compiled-frame/audio service. ClubShow can remain the portable wrapper and
role/inventory/calibration layer if FPP's playback parity, extension boundary,
licensing, security, updates, and recovery are acceptable. Headless startup,
fixed audio enumeration, network binding, watchdog behavior, storage recovery,
and power-loss behavior still require proof before production use.

## Next experiments

1. Read the physical Archer hardware-version and power-adapter labels; record
   only the model/version, not credentials or serial identifiers.
2. Configure the Archer offline and measure its real AC power draw.
3. With explicit approval, migrate Club 0 as a canary, then all three only after
   power-cycle and one-club success.
4. Add a read-only `arm`/preflight operation that verifies exact file and audio,
   all three Global IDs, batteries, routing, stopped-at-zero state, and audio
   device before emitting `READY`.
5. Run a 30-minute field soak with wired Mac-to-Archer networking and wired
   audio. Record packet loss, club dropouts, timing, range, and power.
6. Inject failure: stop BenTo, disconnect the Mac, power-cycle the Archer, and
   remove one club. Observe LEDs and measure recovery rather than inferring it.
7. Test a local nonblack fallback layer that does not corrupt normal streamed
   show output.
8. Prototype one OSC `ARM`/`GO`/`STATUS` bridge and one authored theatre marker
   before adding any venue-specific DMX fixture control.
9. Ask the first target venue which console/show-control system it uses and
   which of OSC, MIDI/MSC, LTC/MTC, Art-Net, and sACN it will accept.
10. Export one current show to FSEQ plus audio, run it on stock Falcon Player,
    and compare every streamed frame and audio timing against the Mac reference.
    Inspect the API/plugin, boot, update, security, recovery, and licence
    boundaries before choosing it as the product runtime.
11. Build the smallest role-aware show-box canary beside FPP if that spike
    passes: boot to `STOPPED`, expose one local ClubShow page, discover the three
    clubs, select wired audio, patch three logical roles, and send a unicast LED
    canary. If FPP fails, record the incompatibility before substituting a custom
    player.
12. Disconnect the browser during playback, then inject audio-device, Ethernet,
    router, power, corrupt-upload, and single-club failures. Verify local STOP
    and that the service never auto-resumes after reboot.

## Sources

- BenTo 2.1.0b6 source snapshot:
  `artifacts/source/bento-2.1.0b6/Source/BentoEngine.cpp`,
  `Source/Prop/props/bento/BentoProp.cpp`,
  `Source/LightBlock/model/LightBlockModelLibrary.cpp`, and
  `Firmware/Bentuino/src/Component/components/ledstrip/Layer/layers/stream/LedStripStreamLayer.*`.
- Bento Remote source snapshot at commit
  `a3d7f1bbed00e292216ae66bf5a0a79a1920d0b6`:
  `artifacts/source/bento-remote/lib/stateModel.dart`,
  `musicPlayerGlobal.dart`, and `propList.dart`.
- [Chataigne repository and protocol list](https://github.com/benkuper/Chataigne)
- [Falcon Player](https://github.com/FalconChristmas/fpp)
- [xLights FPP Connect](https://manual.xlights.org/xlights/chapters/chapter-five-menus/tools/fpp-connect)
- [ETC Eos fixture patch](https://www.etcconnect.com/WebDocs/Controls/EosFamilyOnlineHelp/en/Content/06_Patch/About_Patch.htm)
- [QLab show-control broadcast](https://qlab.app/docs/v5/networking/show-control-broadcast/)
- [Jonglissimo Bento Remote](https://github.com/jonglissimo/bento-remote)
- [TP-Link Archer C4000 V3 specifications](https://www.tp-link.com/us/home-networking/wifi-router/archer-c4000/v3/)
- [Apple: USB-C connector on iPhone](https://support.apple.com/en-us/105099)
- [Apple TN3179: local network privacy](https://developer.apple.com/documentation/technotes/tn3179-understanding-local-network-privacy)
- [Apple: multicast networking entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.networking.multicast)
- [Apple: AVAudioSession output latency](https://developer.apple.com/documentation/avfaudio/avaudiosession/outputlatency)
- [Raspberry Pi: host a wireless network](https://www.raspberrypi.com/documentation/configuration/wireless/wireless-access-point.md)
- [Raspberry Pi product compliance](https://www.raspberrypi.com/for-industry/compliance/)
- [ISED RSP-100 host and modular product requirements](https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/devices-and-equipment/radio-standards-procedures-rsp/rsp-100-certification-radio-apparatus-and-broadcasting-equipment)
- [ISED RSS-Gen labelling and host requirements](https://ised-isde.canada.ca/site/spectrum-management-telecommunications/en/devices-and-equipment/radio-equipment-standards/radio-standards-specifications-rss/rss-gen-general-requirements-compliance-radio-apparatus)
- BenTo GPL-3.0 license: `artifacts/source/bento-2.1.0b6/LICENSE`.
