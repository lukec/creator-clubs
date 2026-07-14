# BenTo and networking

Last updated: 2026-07-13

## BenTo's role

BenTo is the controller/authoring application for compatible props. Its public
code covers device discovery, firmware delivery, Wi-Fi configuration, file and
show control, streamed LED data, and OSC integration. It is not proof that an
arbitrary Creators Club binary implements the current protocol.

Installed application:

```text
/Applications/BenTo.app
Version: 2.1.0b6
Architecture: Apple Silicon-compatible
```

## Global ID, device `propID`, and saving

The current BenTo/Bentuino source establishes these identity semantics:

- BenTo `Global ID` is the swappable logical ID used to address a prop.
- When the prop's OSCQuery component tree contains `settings/propID`, BenTo
  binds it to the Global ID. Editing either value updates the other.
- `Auto Assign IDs` writes `0..n` according to current manager order.
- `Assign IDs from Props` reads each device's existing `propID` into BenTo; it
  is not the command for choosing and writing new IDs.
- `Save All` asks for confirmation and, after `Yes`, invokes each prop's
  settings-save trigger. Firmware persists its complete current settings tree,
  including `propID`, to flash.

Luke assigned and physically marked IDs `0`, `1`, and `2`, then clicked
`Save All`. A direct read of Club B at `CLUB_0_IP` returned
`/settings/propID = 0`. Later read-only BenTo inspection completed the mapping
by combining each retained prop's Global ID and Network IP with the verified
IP-to-MAC table.

`Save All` does **not** save the BenTo authoring session on the Mac. BenTo
projects use the `.bento` extension and must be saved separately with
`File -> Save As` when the session contains work worth preserving. Device IDs
do not depend on saving the current scratch project.

The completed physical mapping is:

```text
ID 0 -> Club B -> CLUB_0_MAC -> current IP CLUB_0_IP
ID 1 -> Club C -> CLUB_1_MAC -> current IP CLUB_1_IP
ID 2 -> Club A -> CLUB_2_MAC -> current IP CLUB_2_IP
```

## Runtime motion control

Stable 1.2.0 exposes the live OSCQuery tree over HTTP and accepts OSC control on
UDP 9000. The tested runtime address for enabling the IMU is:

```text
/motion/enabled 1
```

The attempted `/root/motion/enabled` form did not change the value; the direct
`/motion/enabled` path succeeded. OSC enum parameters were most reliable when
sent as their integer index: `leds/strip1/fx/isolationAxis = 3` selected `Roll`,
while the attempted string value did not change the field.

These were transient writes. The motion component's source sets `enabled=false`
and `saveEnabled=false` during initialization, so a normal settings save is not
the right mechanism for making the IMU start automatically. A host controller
can enable it after discovery, or an uploaded local script can enable/read it at
startup.

## Music and show synchronization

BenTo's sequence implementation has a single timeline/transport with factory
support for `Blocks`, `Audio`, and `Video` layers. A practical authored-song
show can therefore place the audio file on an Audio layer and club color clips
on Block layers; starting the sequence starts both from the same BenTo clock.
The Mac's selected audio output would feed speakers or the theatre PA while
BenTo streams colors over Wi-Fi.

For a larger theatre system, an external playback/cue application can instead
be the master clock and drive BenTo/Chataigne by OSC or timecode. That is not
needed for the first prototype; one BenTo timeline removes a synchronization
boundary and is easier to measure.

## USB and serial behavior

BenTo recognizes the connected CP2102N device as compatible. Public BentoFlow
uses 115200 baud. A passive baud sweep confirmed that 115200 is also the only
tested common rate that produced fully printable text from the factory firmware.

The public serial discovery request is `yo`, with a response beginning
`wassup`. On 2026-07-13, Club A on stable 1.2.0 answered a direct, non-mutating
raw serial query with its MAC, device/type labels, and firmware version.

## What `Only Set Wifi` actually does

Current BenTo 2.1.0b6 source constructs and sends:

```text
wifi.ssid <ssid>
wifi.pass <password>
settings.save
```

It waits 100 ms and then sends:

```text
root.restart
```

It closes the serial port and prints `All Props wifi are set !` without parsing
or requiring any acknowledgement from the prop. This log line means the host
completed its send sequence; it does not prove that the firmware recognized the
commands, saved credentials, restarted correctly, or joined Wi-Fi.

Elsewhere, the current BentoProp implementation uses a different command:

```text
wifi.setCredentials <ssid>,<password>
```

This reinforces the need to match the controller and firmware generations.

## Public network protocol

Verified on the live stable 1.2.0 club:

- ESP32 Creators Clubs use 2.4 GHz Wi-Fi, not 5 GHz-only Wi-Fi.
- mDNS advertises `_osc._udp` on port 9000 and `_oscjson._tcp` on port 80,
  with device ID, name, and type in TXT fields.
- The club receives binary OSC messages over UDP 9000. BenTo normally receives
  club OSC feedback on UDP 10000.
- BenTo broadcasts `/yo`; a compatible club answers with `/wassup` containing
  IP, MAC/device ID, device type, device name, and firmware version.
- HTTP port 80 implements OSCQuery. `GET /?HOST_INFO` reports the OSC transport
  and extensions. `GET /?config=0` returns a typed JSON tree of runtime
  components, values, ranges, and access flags while omitting configuration
  fields.
- A WebSocket at `ws://<club-ip>/` on the same port carries binary OSC messages
  in both directions and broadcasts live parameter feedback. BenTo uses this to
  synchronize its component inspector.
- `POST /uploadFile` stores `.wasm` files under `/scripts` and playback assets
  such as `.colors`, `.meta`, and `.seq` under `/playback`.
- The LED stream layer receives ArtDMX via the ArtnetWifi library on standard
  Art-Net UDP port 6454. A club maps RGB bytes from its configured universe and
  start channel onto its 32 LEDs.

Conceptually:

```text
mDNS                      find clubs and advertise services
HTTP OSCQuery :80         inspect capabilities and current state
WebSocket :80             live OSC parameter updates and control
OSC/UDP :9000 -> :10000   discovery, commands, and optional feedback
Art-Net/UDP :6454         high-rate RGB frames for the LED strip
HTTP POST :80             upload scripts and pre-rendered playback assets
```

OSC itself is an address-plus-typed-values encoding rather than a REST API. A
message is analogous to calling a named function:

```text
/motion/enabled                int 1
/leds/strip1/brightness        float 0.5
/leds/strip1/fx/isolationAxis  int 3
```

The OSCQuery JSON is the discoverable schema that explains which OSC addresses
exist and what type/range each expects.

## Network security boundary

The club's HTTP, WebSocket, OSC, and Art-Net services have no authentication or
encryption. A live check found that the default `GET /` and `GET /?config=1`
responses include the Wi-Fi SSID and password fields in clear JSON.
`GET /?config=0` omits both credential fields and is the required form for safe
diagnostics, logs, and captures.

Never archive or paste an unfiltered full OSCQuery response. Keep clubs on a
trusted private VLAN/show LAN, prevent guest/venue clients from reaching them,
and do not forward their ports from the internet.

**Project decision, 2026-07-13:** move the clubs to a dedicated portable show
network. The credential exposure does not become harmless on that network: any
participant that can reach a club can still read its configuration and control
its unauthenticated services. The dedicated network limits the blast radius by
using a unique credential that protects nothing else and by providing no route
to the home trusted or IoT networks.

For a test network, avoid captive portals, client isolation, and WPA3-only
configuration. A simple private WPA2 2.4 GHz network is the least ambiguous.
Avoid commas in credentials when a comma-separated firmware command is in use.

## Home lab topology

```text
Mac Ethernet (home trusted VLAN, CONTROLLER_ETHERNET_IP)
       +
Mac Wi-Fi (SSID mapped to home IoT, CONTROLLER_WIFI_IP)
       |
UniFi 2.4 GHz home IoT network (CLUB_LAN_SUBNET)
       |
Club A public 1.2.0 (CLUB_2_IP, MAC CLUB_2_MAC)
```

The dual-homed Mac was initially a possible source of broadcast ambiguity.
After Mac Wi-Fi association, BenTo explicitly logged the correct home IoT local
IP and broadcast address. A unicast sweep then removed broadcast forwarding as
an explanation for the missing response.

## Historical factory-firmware discovery test

On 2026-07-13, a valid OSC `/yo` packet carrying BenTo's home IoT IP was sent
directly to UDP 9000 at every usable address on `CLUB_LAN_SUBNET`. No `/wassup`
response appeared in BenTo. UniFi's client counts remained unchanged.

This narrows the result to two principal possibilities:

1. The club never associated with the Wi-Fi network.
2. It associated but does not implement the current discovery protocol.

The second is less likely to explain the complete absence of a new UniFi client,
but the available observations do not identify a club MAC address, so it cannot
be ruled out absolutely.

## Public 1.2.0 discovery result

After `Only Set Wifi` on the verified public 1.2.0 installation, Club A appeared
in the Mac's home IoT ARP table at `CLUB_2_IP` with its exact Wi-Fi MAC
`CLUB_2_MAC`.

A direct OSC `/yo` sent to UDP 9000 produced `/wassup` from the same address and
included five string arguments: IP, MAC, device type, device name, and firmware
version. The values identified `Creators Club` version `1.2.0`. This proves both
association and bidirectional OSC reachability without relying on BenTo's
success log or LED-color interpretation.

## Dedicated performance router

Luke has an unused TP-Link Archer C4000. The earlier diagnostic reason for
deferring it is resolved: all three clubs now run known stable 1.2.0 and work
simultaneously over Wi-Fi. The Archer is the current candidate for the isolated
home-test and portable show LAN.

Target topology:

```text
Internet / home LAN               isolated club LAN
Mac Ethernet -> home trusted        Mac Wi-Fi -> Archer 2.4 GHz
                                      |
                              clubs 0, 1, and 2

Archer WAN: disconnected
Mac Internet Sharing/routing: disabled
```

Configuration requirements:

- factory-reset the unused router before configuration so stale settings do
  not become part of the show system;
- use a new SSID and a strong WPA2 password used nowhere else; never record the
  password in these docs;
- use a subnet distinct from the home networks and common venue ranges, for
  example a chosen private `/24` under `10.0.0.0/8`;
- keep the Archer WAN disconnected and disable WPS, UPnP, remote administration,
  and guest access;
- use a separate strong router-administration password;
- keep wireless client/AP isolation **off**, because BenTo and the clubs must
  communicate directly on the same broadcast domain;
- start with both the Mac and clubs on the 2.4 GHz SSID to remove cross-band
  discovery ambiguity; a bridged 5 GHz Mac path can be tested later;
- create DHCP reservations for the three recorded club MAC addresses;
- do not enable macOS Internet Sharing between home trusted Ethernet and the show
  Wi-Fi interface.

This is containment, not authentication. Anyone admitted to the show LAN may
still be able to inspect or manipulate a club. Treat the network credential and
physical/router access as the security boundary.

Safe migration sequence, after Luke explicitly starts the change:

1. Configure and verify the Archer offline without changing a club.
2. Join the Mac to the new SSID while keeping home trusted Ethernet connected.
3. Update Club 0 alone through the already-tested local BenTo Wi-Fi workflow.
4. Verify DHCP/MAC, safe OSCQuery, OSC discovery, BenTo presence, and one LED
   change.
5. Only after the canary passes, migrate Clubs 1 and 2 one at a time.
6. Re-run the three-simultaneous-prop and power-cycle checks.

## Firmware uploader limitations found in practice

BenTo 2.1.0b6 allowed a public application larger than the factory app partition
to be written application-only. Its `Full Flash` source path selects the merged
image and offset zero but does not execute a whole-chip erase. Its `latest`
firmware label follows list order rather than package chronology, and its Wi-Fi
completion log is not device-acknowledged.

For the first factory-to-public migration, use the controlled CLI runbook in
`flashing-and-migration.md`; use BenTo only after the public application and
partition layout are verified.

## USB prop discovery limitation in current BenTo

**Source-backed and reproduced:** Firmware Uploader detection and Props
discovery are separate BenTo paths. The uploader uses the selected firmware
manifest's VID/PID list. On startup it defaults to `Creators Ball`
(`0x303a:0x1001`), so it reports zero compatible devices for the Club's CP2102N
(`0x10c4:0xea60`) until the operator selects `Creators Club`.

The current upstream `PropManager.cpp` has a more fundamental USB discovery
problem: the code that loads prop definitions and populates its `vidpids` array
is commented out, while both `Detect Props` and automatic USB discovery iterate
only over that array. A direct raw USB serial `yo` works on migrated Club A, but
BenTo's Props panel does not attempt it because the VID/PID gate is empty.

This does not block the intended network path. `Detect Props` broadcasts OSC
`/yo` to each local `/24` broadcast address. An OSC `/wassup` with at least four
arguments enters `createPropIfNotExist`; if the reported type is not registered,
BenTo creates a generic `BentoProp` and sets its remote host. Therefore:

1. use USB/Firmware Uploader to flash and set Wi-Fi;
2. put the Mac on the club's same 2.4 GHz VLAN/SSID for broadcast discovery;
3. use Props -> `Detect Props` to add the network prop.

USB Props-panel discovery should be reported upstream separately. It is not
evidence of a failed club firmware installation.
