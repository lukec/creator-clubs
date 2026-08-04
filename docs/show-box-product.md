# ClubShow appliance, fixture patch, and open-node product

Last updated: 2026-07-16

## Product thesis

The sellable system is broader than a Flowtoys player. It is a portable show
appliance for synchronized audio and illuminated stage props:

```text
show content -> logical stage roles -> deployment patch -> physical fixtures
```

Flowtoys Creators Clubs are one fixture driver. WLED controllers, ordinary
Art-Net/sACN nodes, DMX gateways, and future open ClubShow hardware can use the
same show, patch, web UI, and transport.

The essential separation is:

1. **Production:** portable `.clubshow` content, audio, cues, logical roles, and
   compiled frame streams.
2. **Deployment patch:** which physical device performs each role for this run
   or venue.
3. **Inventory and calibration:** durable per-device capabilities, identity,
   brightness/color calibration, orientation, pixel map, firmware, and health.

A broken prop is replaced by changing the patch. The production package is not
edited or re-rendered.

## Identity model

Do not overload one number with four meanings:

| Concept | Example | Lifetime |
| --- | --- | --- |
| Physical device identity | device-reported hardware UID kept only in the local appliance database | Device lifetime |
| Human label | `Spare Club 2`, `Moon controller` | Editable inventory label |
| Show role | `juggle.club.1`, `scenic.moon` | Production design |
| Network endpoint | DHCP address, Art-Net universe/start, sACN universe | Current deployment |

Flowtoys `Global ID` / device `propID` remains useful for BenTo compatibility
and physical labelling, but it is not the production's durable identity. DHCP
address is never identity. `clubshow.local` resolves the current device endpoint
from the local patch at `ARM` time.

Exact hardware IDs, network addresses, and Wi-Fi credentials are local private
state. Exported diagnostics and public project files use labels and role IDs.

## `.clubshow` role manifest

Compiled streams should be named by logical role, not current device:

```json
{
  "format": "clubshow/1",
  "roles": [
    {
      "id": "juggle.club.1",
      "requires": {
        "fixtureClass": "pixel-strip",
        "pixels": 32,
        "motionInput": true
      },
      "frames": "frames/juggle.club.1.colors"
    },
    {
      "id": "scenic.moon",
      "requires": {
        "fixtureClass": "pixel-surface",
        "pixels": 144,
        "motionInput": false
      },
      "frames": "frames/scenic.moon.colors"
    }
  ]
}
```

The package declares requirements, not a vendor or serial number. A patch may
use a different compatible fixture without changing the package. If geometry or
capabilities differ, the UI reports a compatibility error or requires an
explicit mapping rather than silently producing the wrong result.

## Local appliance state

The first implementation can use a local SQLite database with backup/export:

- `devices`: private UID, driver, label, hardware profile, firmware, last seen;
- `capabilities`: pixels, color channels/order, geometry, sensors, protocols;
- `calibrations`: brightness trim/ceiling, gamma/color correction, orientation,
  pixel map, and measured latency;
- `productions`: installed `.clubshow` package ID and hash;
- `patches`: named production/venue/deployment patches; and
- `patch_entries`: show role to physical device/output mapping.

Credentials are encrypted or stored separately and are never included in normal
patch or diagnostic export. Every patch change is logged and reversible.

## `clubshow.local` web interface

### Devices

- discover supported devices;
- show online/offline, battery where available, firmware, signal, and errors;
- `IDENTIFY` one device with an unmistakable temporary visual marker;
- assign a human label and hardware profile;
- run a low-brightness canary; and
- expose only the supported safe settings subset.

### Patch

- list every role required by the selected production;
- drag or choose a compatible physical device for each role;
- show missing, duplicate, incompatible, and offline mappings;
- save patches per production or venue;
- stage changes without disturbing the live patch; and
- commit the complete patch atomically after canaries pass.

### Calibration

- device brightness trim and hard safety ceiling;
- role/venue trim without modifying authored show values;
- RGB/RGBW order and color/gamma correction;
- pixel direction, orientation, count, and geometry map;
- output protocol, universe/start channel, and measured latency; and
- explicit comparison/copy tools for matching a spare.

The output brightness pipeline is:

```text
authored frame x role/venue trim x device calibration, capped by device safety ceiling
```

This keeps artistic intent, venue adjustment, hardware matching, and electrical
safety as separate controls.

### Shows and live control

- upload/validate/atomically install `.clubshow` packages;
- select production and deployment patch;
- `ARM` only when every required role is compatible, online, and canaried;
- large deliberate `GO`, local/web `STOP`, and clear fault state; and
- downloadable run and patch-change logs.

Firmware flashing, factory reset, credential display, and full raw settings-save
operations are not normal show controls. They belong in an authenticated service
mode with separate confirmation and recovery procedures.

## Emergency spare workflow

1. Power the spare and open **Devices**.
2. Discover it and press **Identify**; confirm the physical light that responds.
3. Choose **Replace** beside the missing show role.
4. Check capability compatibility and the spare's own calibration/profile.
5. Apply only required transient runtime settings, then run the role canary.
6. Commit the patch atomically; leave the old device offline/unassigned in
   history.
7. Re-`ARM` and continue with the unchanged `.clubshow` package.

Do not blindly copy the failed unit's physical calibration onto the spare.
Transfer the role and venue trim; retain or deliberately measure the spare's
device-specific correction and ceiling.

For Creator Clubs, the appliance can normally target the resolved device
directly without rewriting persistent `propID`. Persistent ID, Wi-Fi, brightness,
or firmware changes remain explicit commissioning actions rather than automatic
consequences of a show patch.

## Driver boundary

Each fixture driver should implement a small common contract:

```text
discover -> describe capabilities -> identify -> read health
         -> validate/apply supported config -> send frame -> stop/safe state
```

Initial drivers:

| Driver | Discovery/configuration | Live output |
| --- | --- | --- |
| Flowtoys Creators | mDNS, OSCQuery/HTTP, OSC | Unicast Art-Net RGB |
| Generic Art-Net | configured or ArtPoll discovery | ArtDMX |
| Generic sACN | configured universe/priority | E1.31 |
| WLED | JSON API and local discovery | DDP, Art-Net, or E1.31 |
| USB DMX gateway | local adapter/OLA patch | DMX512 |
| Future ClubShow Node | open capability/config API | Art-Net, sACN, or DDP |

Prefer established realtime transports over a proprietary pixel protocol.
WLED already supports E1.31, Art-Net, and DDP, plus a JSON API exposing friendly
name, LED capabilities, realtime state, and Wi-Fi information. Open Lighting
Architecture can bridge Art-Net, sACN, OSC, and supported USB DMX devices on
Linux/ARM; whether to ship OLA is a later dependency and licence decision.

## Static fixtures and open hardware

Static scenery should normally use wired Ethernet or DMX. It is not moving, so
Wi-Fi adds RF load and a failure mode without solving a mobility requirement.
Wi-Fi remains useful where cabling is genuinely impractical.

The lowest-risk open ecosystem sequence is:

1. **Off-the-shelf static nodes:** control common addressable LED strips through
   existing WLED, Art-Net, sACN, or DMX controllers. Prove the patch, geometry,
   calibration, and show workflow before creating electronics.
2. **Open ClubShow static node:** publish a reference controller/firmware with
   stable identity, capability reporting, identify/canary, wired Ethernet,
   standard realtime protocols, and externally supplied certified low-voltage
   LED power. Do not put mains power design into V1.
3. **Mobile open prop electronics:** add Wi-Fi, battery/BMS, charging, IMU,
   impact-tolerant mechanics, thermal protection, and serviceability only after
   the static node and appliance are proven.
4. **Juggling prop hardware:** treat this as a separate mechanical, battery,
   optical, impact-safety, and certification program—not a quick extension of a
   static pixel controller.

An open static-node reference design can be commercially valuable without
trying to clone the Flowtoys club first. It also broadens the appliance to
scenic arches, staffs on stands, floor markers, backdrops, costume elements,
pixel sculptures, and conventional DMX fixtures.

Use certified external power supplies, fused outputs, documented voltage and
current limits, strain relief, thermal testing, and flame/rigging-safe materials.
Stage installations and anything overhead require professional electrical and
structural review beyond this software architecture.

## Scaling and network rules

- Unicast frames after discovery; do not broadcast every fixture stream.
- Group roles only when they intentionally share identical pixels.
- Budget by pixels, frame rate, packets per second, and wireless client airtime,
  not only nominal Wi-Fi bitrate.
- Prefer wired nodes for static fixtures and reserve RF for mobile props.
- Test maximum supported fixture count under full audio/frame load and degraded
  signal before advertising a number.
- WLED's current guidance recommends no more than three universes per controller
  for fluent 40 fps or higher; treat controller limits independently from the
  show-box network limit.

## Existing systems and the product boundary

Much of the proposed appliance already exists, but it is split across products
aimed at different operators.

### Source-backed overlap

- **Falcon Player (FPP)** is already a web-managed sequence player for
  Raspberry Pi and BeagleBone-class computers. It plays synchronized sequence
  and media files and outputs E1.31, DDP, DMX, Pixelnet, Renard, or direct pixel
  data. xLights' FPP Connect uploads compressed or sparse FSEQ sequences,
  associated audio, model data, and E1.31/DDP/Art-Net output definitions.
- **Lighting consoles** already separate programming from hardware through a
  fixture patch. ETC Eos associates a logical channel with a device type and
  physical address, supports custom fixture profiles, and can discover RDM
  devices. That is the professional precedent for ClubShow roles and the local
  deployment patch.
- **QLab** already provides precise audio playback and exchanges GO/status with
  other show systems over OSC and MIDI Show Control. In a full theatre it is a
  natural audio/cue master or peer; ClubShow does not need to replace it.
- **Standalone architectural/show controllers** such as ENTTEC S-PLAY already
  offer web programming, recorded DMX/Art-Net/sACN streams, playlists, custom
  control pages, and OSC/DMX/network triggers.
- **xLights, WLED, OLA, Art-Net, sACN, and DDP** already cover pixel modelling,
  controller configuration, fixture transport, and protocol bridging.

The rough architectural estimate is that existing systems cover most of the
generic player, transport, and patch machinery. This is an engineering
estimate, not a measured percentage: approximately 70-80% of a generic
"Pi plays frames and audio to lights" product is prior art.

### ClubShow's actual differentiator

The remaining product is a focused integration layer for portable illuminated
props:

- import/compile BenTo productions;
- manage Flowtoys Creators and future mobile-prop capabilities;
- patch human show roles to heterogeneous calibrated devices;
- identify and replace a failed prop without touching show programming;
- apply prop-specific orientation, brightness ceilings, color correction, and
  visibility/safety policy;
- provide a one-purpose ARM/GO/STOP interface for performers and small crews;
  and
- present the whole subsystem to a theatre through standard cue and lighting
  protocols.

The product should therefore be positioned as a **touring prop-lighting
appliance**, not a new lighting console, QLab replacement, or general pixel
sequencer.

### Runtime reuse gate

Do not implement the compiled player until an FPP/FSEQ spike answers:

1. Can one current BenTo show be exported losslessly into FSEQ plus its audio?
2. Can FPP keep the required audio/frame synchronization and unicast output to
   the Creators Clubs?
3. Can a ClubShow plugin or companion service own role patching, inventory,
   calibration, Flowtoys discovery, and ARM/GO/STOP without a fragile fork?
4. Do FPP's mixed licences, update model, security surface, boot behavior, and
   plugin/API boundaries fit a low-volume commercial appliance?

If those pass, `.clubshow` can remain the portable product wrapper while FSEQ
is its compiled frame payload and FPP is the underlying playback engine. If
they fail, record the exact incompatibility before building the narrow custom
player. FPP's holiday-lighting heritage is not evidence of theatre-grade
reliability; soak, recovery, security, and licensing review remain mandatory.

## Theatre ownership boundary

Every output has exactly one live owner:

- ClubShow may own mobile props and self-contained scenic pixel fixtures.
- The venue console owns house fixtures and its assigned DMX/sACN universes.
- A fixture is never driven concurrently by ClubShow and the venue without an
  explicitly designed merge/arbitration system.
- Full-theatre integration exchanges cues/status or uses a negotiated patch; it
  does not silently transmit into venue universes.

## Smallest product slice

1. Export one current show to FSEQ plus audio and run it on stock FPP on a
   Pi-class device; measure frame/audio parity and inspect its supported API,
   plugin, security, update, and licence boundaries.
2. Add logical `roles` to one provisional `.clubshow` manifest, using FSEQ as
   the frame payload if the spike passes.
3. Implement local device inventory, Identify, and a patch mapping for the three
   Creator Clubs without changing their persistent `propID` values.
4. Replace one powered club with a compatible spare in the patch, canary it, and
   run the same show artifact unchanged.
5. Add one off-the-shelf WLED static strip as `scenic.test.1` using a standard
   realtime protocol.
6. Run a combined three-mobile-plus-one-static full-show soak and inject device,
   AP, browser, audio, and player failures.

## Sources

- [WLED E1.31, Art-Net, and DDP support](https://kno.wled.ge/interfaces/e1.31-dmx/)
- [WLED JSON API](https://kno.wled.ge/interfaces/json-api/)
- [Art-Net 4 specification](https://art-net.org.uk/art-net-specification/)
- [Open Lighting Architecture](https://docs.openlighting.org/ola/doc/latest/index.html)
- [Falcon Player](https://github.com/FalconChristmas/fpp)
- [xLights FPP Connect](https://manual.xlights.org/xlights/chapters/chapter-five-menus/tools/fpp-connect)
- [ETC Eos fixture patch](https://www.etcconnect.com/WebDocs/Controls/EosFamilyOnlineHelp/en/Content/06_Patch/About_Patch.htm)
- [QLab show-control broadcast](https://qlab.app/docs/v5/networking/show-control-broadcast/)
- [ENTTEC S-PLAY Programmer](https://support.enttec.com/user-manuals/s-play-programmer)
- BenTo/Creator identity and settings behavior: `docs/bento-and-network.md`.
