# Lab log

Append dated experiments and results. Preserve negative results; they narrow the
problem and prevent repeated work.

## 2026-07-13 — Initial USB identification

**Setup:** one borrowed Creators Club connected to an Apple Silicon Mac by
micro-USB.

**Verified:** macOS enumerated a Silicon Labs CP2102N USB-to-UART bridge at
`/dev/cu.usbserial-DEVICE` and `/dev/tty.usbserial-DEVICE`. This proves a live serial
interface and a data-capable cable.

**Initial serial result:** traffic appeared garbled under the first observation,
so no firmware compatibility claim was made.

## 2026-07-13 — BenTo recognition

**Setup:** BenTo 2.1.0b6 installed in `/Applications`; one club connected.

**Verified:** Firmware Uploader listed the CP2102N bridge as a compatible USB
device. No firmware upload, OTA upload, or erase was performed.

## 2026-07-13 — Color and button observations

Observed physical states across the three powered clubs included yellow, green,
and white/light-purple. One 2–3 second button hold produced no change during the
hold and changed the club to green after release. Some colors remained steady
for more than ten seconds.

**Result:** observed behavior did not match the current public firmware's button
and transient network-color table. Colors were removed from the diagnostic
decision path.

## 2026-07-13 — Home network setup

**Setup:** Mac Ethernet connected to UniFi home trusted VLAN at `CONTROLLER_ETHERNET_IP`; Mac
Wi-Fi connected to a 2.4 GHz SSID mapped to the `home IoT` network at
`CONTROLLER_WIFI_IP` on subnet `CLUB_LAN_SUBNET`. The SSID/credentials are intentionally
not recorded. UniFi controller was open in Chrome.

**Verified:** BenTo logged discovery on `CLUB_LAN_BROADCAST` using local address
`CONTROLLER_WIFI_IP`, proving it selected the desired Wi-Fi interface.

Three pre-existing anonymous Espressif clients were rejected as candidate clubs
because their six-to-seven-hour uptimes predated configuration of these
never-before-configured clubs.

## 2026-07-13 — One credential write

Luke manually invoked `Only Set Wifi` once for the connected club. Credentials
are intentionally not recorded.

BenTo logged:

```text
PropFlasher (9:54:51) Setting Wifi infos to prop...
PropFlasher (9:54:53) All Props wifi are set !
```

The USB interface remained enumerated. The club later displayed
white/light-purple.

**Independent result:** UniFi remained at 73 online / 75 total clients, no new
club client was identified, and BenTo's Props list remained empty.

**Source follow-up:** `PropFlasher::setAllWifi()` sends settings, waits only
100 ms, sends `root.restart`, and logs completion without checking a reply.
Therefore the host log cannot be counted as a successful device configuration.

## 2026-07-13 — OSC discovery sweep

**Method:** sent valid OSC `/yo` discovery with BenTo's local address as the
argument, via UDP port 9000, directly to all 254 usable hosts on
`CLUB_LAN_SUBNET`.

**Result:** no `/wassup` response and no prop appeared in BenTo.

**Interpretation:** this bypassed broadcast/VLAN ambiguity. The remaining main
possibilities are failure to associate with Wi-Fi or incompatibility with the
current discovery protocol.

## 2026-07-13 — Passive serial baud identification

**Method:** passive reads at common baud rates with original terminal settings
restored afterward. No command was sent to the club.

**Verified:** 115200 baud yielded fully printable text. A five-second capture
contained 13,125 bytes, 625 lines, and one unique line:

```text
Power up Everything
```

**Interpretation at the time:** the firmware was running enough to emit serial
output, but its provenance was unknown. Later golden-image extraction proved the
line is intentionally embedded in the factory test firmware.

## 2026-07-13 — Public firmware comparison

**Method:** inspected the current BenTo source and downloaded every public
Creators Club firmware version listed by BenTo. Searched the application and
full firmware binaries for the exact serial line.

Versions checked:

```text
1.0.3  1.0.4  1.0.5  1.0.6  1.0.7  1.0.8  1.0.9
1.1.0  1.1.1  1.1.2  1.1.3  1.1.4  1.1.5  1.1.9  1.1.10
1.2.0  1.2.0b1  1.2.0b4
```

**Result:** no version contained `Power up Everything`. The local checkout had
only one Git commit, and exact public code search produced no relevant match.

**Conclusion:** the installed factory binary does not match any public Creators
Club firmware currently offered through BenTo. Preserve it before considering a
factory-to-public migration.

## 2026-07-13 10:08 PDT — Public firmware flash initiated by Luke

Luke initiated a live firmware upload before a backup of the original firmware
was made. No assistant UI actions were taken during the operation; BenTo was
observed read-only through macOS accessibility and screenshots.

Visible BenTo configuration:

```text
Category: Creators
Device: Creators Club
Version: 1.2.0b4
Set Wifi During flash: enabled
USB device: Silicon Labs CP2102N at /dev/cu.usbserial-DEVICE
```

Observed progression:

```text
approximately 10:07 PDT: Progression 0.640
approximately 10:08 PDT: Progression 1.000
```

The visible log reported, in order, that flashing started for one prop, the
firmware was flashed to the ESP32 serial device, one prop was flashed, all props
were flashed, Wi-Fi information was set, and all props' Wi-Fi was set.

**Post-write verification:**

- BenTo continued to show `1 Compatible Device` after restart.
- `/dev/cu.usbserial-DEVICE` existed independently at 10:09:20 PDT.
- BenTo resumed automatic `/yo` discovery attempts.
- No prop appeared in BenTo's Props list during the next 15 seconds.
- No flash error was visible.
- A single dim red light inside the club came on when flashing began and
  remained visible. It appeared to be on the internal board rather than one of
  the 32 main LEDs. USB remained present while it was lit.

**Conclusion:** the firmware write completed and the USB device recovered. Wi-Fi
association and network discovery are not yet verified.

**Internal red-light interpretation:** public `config_creatorclub.h` does not
define a separate red status LED; it only identifies the main LED power, data,
and clock pins. The light is plausibly a board-level power/USB/boot indicator,
not a BentoFlow network-error color. This remains an inference pending hardware
documentation or direct component identification.

**Preservation consequence:** the original application firmware on this one
club was not backed up before replacement. The exact esptool command/offset and
whether a full-flash erase was selected still need to be recovered from the log
before making claims about preservation of NVS, files, shows, or calibration.

**Rule for the remaining two clubs:** make a read-only backup and record hashes
before any firmware write.

## 2026-07-13 10:11 PDT — First post-flash unplug

After BenTo reached 100%, reported a completed flash, and the CP2102N serial
device re-enumerated, Luke unplugged the USB cable. The club immediately went
fully dark, including the dim red internal board light.

**Conclusion:** the internal red light was dependent on USB power or the
USB-powered board state. The observation does not yet distinguish an asleep
controller from an uncharged/disconnected battery.

## 2026-07-13 10:12 PDT — Short battery wake attempt

With the flashed club unplugged and dark, Luke pressed and immediately released
the single button. Nothing visible happened.

**Source context:** the public firmware's `veryLongPressTime` is 1,500 ms; that
event invokes sleep. The board configuration also sets a keep-alive pin high
during startup. A very short physical press may release power before firmware
initialization can latch it.

**Next test:** hold for approximately one second, then release. This is below the
1.5-second sleep threshold while providing substantially more startup time.

## 2026-07-13 10:13 PDT — Battery wake still fails

Luke tried multiple tap and hold patterns, including the controlled
approximately one-second hold. The unplugged club remained completely dark and
unresponsive.

**Comparison:** before flashing, this physical club produced visible colors and
responded to button interaction while unplugged. Immediately after flashing
public version 1.2.0b4, it powers down when USB is removed and cannot be woken
from battery.

**Conclusion:** battery-powered wake is a confirmed post-flash regression, not
just an inadequately short press. The leading possibilities are incompatible
power-latch/button behavior for this hardware revision or loss/change of a
required setting. A coincidental battery problem remains possible but is not the
leading explanation given the timing.

**Recovery status:** the club is not considered bricked because the ESP32/USB
path re-enumerated normally after the flash. Reconnect USB without pressing the
button and continue with passive boot/serial inspection. Do not flash the other
two clubs.

## 2026-07-13 10:14 PDT — USB recovery but no application response

Luke reconnected the flashed club without pressing its button. The faint
internal red light returned. BenTo listed one compatible USB device, confirming
the CP2102N bridge, but its Props pane remained empty.

BenTo logger events:

```text
10:14:02  /dev/cu.usbserial-DEVICE added
10:14:21  /dev/cu.usbserial-DEVICE removed
10:14:25  /dev/cu.usbserial-DEVICE added again
```

No process owned the serial device when checked with `lsof`.

**Passive serial test:** opened the device read-only/nonblocking at 115200 baud,
changed no modem-control lines, captured for five seconds, restored its prior
terminal settings, and received zero bytes.

**Identity test:** sent only the public firmware's non-mutating `yo` discovery
line and listened for three seconds. Received zero bytes instead of the expected
`wassup <device-id> "Flowtoys Creator Club"` response.

**Conclusion:** BenTo currently detects the USB-UART bridge, not a functioning
prop application. The flashed ESP32 application is not reaching its serial
command loop. This also explains why battery wake and Wi-Fi discovery fail.

The downloaded 1.2.0b4 manifest says:

```text
firmwareOffset: 0x10000
chip: esp32
flash_mode: dio
flash_freq: 80m
flash_size: 4MB
before: default_reset
after: hard_reset
```

The UI log has not yet established whether the upload used application-only
`firmware.bin` or full image `firmware_full.bin`.

**Recovery plan:** do not write again. First make and hash a read-only 4 MB flash
dump, preserve it, and inspect its bootloader/partition table/NVS/filesystem.
Only then decide whether a full public image, older compatible image, or original
owner firmware is the right recovery target.

## 2026-07-13 10:16 PDT — Stable-version comparison

Luke suggested reverting to 1.1.10. The three relevant public packages were
downloaded to temporary storage and their manifests, sizes, and SHA-256 hashes
were inspected without touching the club.

Package chronology:

```text
1.1.10   generated 2026-01-14, commit d8b92345585ca00a209b4b0c267a0ba706ea539d
1.2.0b4  generated 2026-02-01, no commit recorded
1.2.0    generated 2026-03-04, commit cff344ebcb90c12be7ef604b64134bd4266eb540
```

All declare the same principal flash geometry:

```text
chip esp32; firmware offset 0x10000; 4 MB; DIO; 80 MHz
```

The BenTo UI's `1.2.0b4 (latest)` label follows list order rather than package
date or semantic release status. Public 1.2.0 is both newer and non-beta.

**Decision:** do not application-flash 1.1.10 merely because it looks stable.
The shared `0x10000` assumption means it may reproduce the same boot failure.
Back up and inspect the existing full flash first. If recovery with a public
full image is appropriate afterward, 1.2.0 is the current leading stable
candidate.

## 2026-07-13 10:18 PDT — Two golden working clubs confirmed

Luke confirmed that the two unflashed clubs remain functional on their original
firmware.

**Impact:** public version selection is no longer the preferred first recovery
path. A read-only dump from one working club can reveal the actual bootloader,
partition table, application, and stored-data layout used by the factory image.

**Revised plan:** back up flashed club A, then read one golden club B and compare
regions. Preserve golden club C completely untouched. Do not clone B wholesale
onto A because per-device NVS/filesystem content may be unique.

## 2026-07-13 10:19–10:26 PDT — Full read-only backup of Club A

Luke explicitly authorized a read-only backup of connected Club A.

Command shape:

```text
esptool.py 4.8.1 --chip esp32 --port /dev/cu.usbserial-DEVICE \
  --baud <rate> --before default_reset --after hard_reset \
  read_flash 0x000000 0x400000 <backup-file>
```

921600 and 460800 baud attempts connected, identified the chip, uploaded the
temporary RAM stub, then failed at the baud-change boundary with `Invalid head
of packet (0xFF)`. No backup file was retained from either failed attempt and no
flash erase/write command was issued.

The 115200-baud attempt read all 4,194,304 bytes in 376.9 seconds and hard-reset
the ESP32 afterward.

```text
File: backups/club-a-flashed-20260713-1018-full-4mb.bin
SHA-256: 4ce1ad2c9305370596343e55adf3dc4ddd36f2e86f4312223208104cb2ec6bd2
Chip: ESP32-D0WDQ6 revision 1.0
MAC: CLUB_2_MAC
```

## 2026-07-13 10:27 PDT — Exact flash-overflow diagnosis

The A backup's app region at `0x10000`, over the exact 1,447,520-byte public
application length, hashes to:

```text
f1515069f00c883b1e7fae9e6918189edb63e9159d3835971088124adca56ee5
```

This exactly equals public Creators Club 1.2.0b4 `firmware.bin`. The equivalent
prefix does not equal `firmware_full.bin`, proving the upload was app-only.

The preserved original partition table says app0 starts at `0x10000` and is
`0x140000` bytes; app1 starts at `0x150000` and is also `0x140000` bytes. The
public binary is `0x161660` bytes. Written at `0x10000`, it ended at `0x171660`:

```text
app0 overflow: 0x21660 bytes = 136,800 bytes
damage: all app0 replaced; first 0x21660 bytes of app1 replaced
```

**Root cause:** the current public application does not fit the factory partition
layout. BenTo did not validate the application size against the device's
existing partition table before writing. The overflow damaged both boot slots.

NVS (`0x9000`), EEPROM (`0x290000`), and SPIFFS (`0x291000`) are outside the
write range and were captured in the backup. Recovery should copy the correct
original application slots from a golden club, not write another oversized
public application or blindly clone device-specific data.

## 2026-07-13 10:29–10:36 PDT — Full read-only backup of golden Club B

Club B was connected as the selected golden reference. A 115200-baud read
completed without errors and hard-reset the device afterward.

```text
File: backups/club-b-golden-20260713-1029-full-4mb.bin
Size: 4,194,304 bytes
SHA-256: 8d960fe09206fbc9c2810266ce4663f3e947fcc0bdd359bb9fa89a0db263f7fe
Chip: ESP32-D0WDQ6 revision 1.0
MAC: CLUB_0_MAC
Read time: 377.8 seconds
```

Club C remained untouched.

## 2026-07-13 10:37 PDT — Golden application extraction and comparison

Club B's app0 partition was extracted offline from `0x10000`, length `0x140000`:

```text
SHA-256: 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
ESP checksum: valid
ESP validation hash: valid
12 ESP32 image segments
Entry point: 0x400835fc
Last non-erased image byte ends at offset 0x0b1f40
```

Strings in the golden application include:

```text
Power up Everything
test firmware version 0.0
```

This proves the repeated pre-flash line was intentional output from the factory
test firmware, not by itself a reset loop.

B's app1 at `0x150000` is erased/blank. B's OTA data selects app0 (sequence 1).
A and B's bootloader, partition table, and OTA-data hashes match exactly.
EEPROM and SPIFFS also match exactly. NVS differs and must remain device-specific.

**Prepared repair:** write only the full extracted B app0 partition to A at
`0x10000`, leaving bootloader, partition table, OTA data, NVS, EEPROM, SPIFFS,
and damaged/inactive app1 unchanged. Verify the written region before physical
boot testing. This write requires Luke's explicit authorization.

## 2026-07-13 10:39 PDT — Club A golden app0 restoration

Luke replied `ready go`, explicitly authorizing the prepared app0-only write.

Identity gate before writing:

```text
MAC: CLUB_2_MAC (Club A, confirmed)
Chip: ESP32-D0WDQ6 revision 1.0
Flash: 4 MB
Golden source SHA-256: 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
```

esptool bounded the erase to `0x00010000–0x0014ffff`, compressed the 1,310,720
byte golden partition to 433,617 bytes for transfer, wrote it in 39.7 seconds,
reported `Hash of data verified`, and hard-reset A.

No bootloader, partition table, OTA metadata, NVS, app1, EEPROM, or SPIFFS range
was included in the command.

Immediate passive serial validation captured 5,271 bytes over two seconds: 251
nonempty lines, all exactly `Power up Everything`. This proves the restored
application boots and executes.

An independent read-only `verify_flash` then compared all `0x140000` bytes at
`0x10000` against the golden extracted image and reported:

```text
verify OK (digest matched)
```

The device was hard-reset after verification.

**Remaining validation:** unplug A and observe battery operation. Its inactive
app1 remains partly overwritten from the oversized public image; leave it alone
until app0/battery behavior is confirmed. Avoid OTA updates in this state.

## 2026-07-13 10:41 PDT — Factory provenance confirmed

Luke clarified that Yuki never flashed or customized any club; all three arrived
in factory state. This retracts the earlier private/custom-firmware hypothesis.
The embedded `test firmware version 0.0` string is a literal factory-test marker.

Offline inspection of public 1.2.0 and 1.2.0b4 full images showed both replace
the factory partition table:

```text
factory app slots:    0x140000 each
public 1.2.x slots:   0x1e0000 each
factory EEPROM:       present at 0x290000
public EEPROM:        absent
factory SPIFFS:       0x16f000 bytes
public SPIFFS:        0x020000 bytes
public coredump:       added at 0x3f0000
```

**Conclusion:** the first factory-to-public 1.2.x installation is necessarily a
full partition/storage migration. Application-only Upload is unsafe because the
public binary is larger than the factory app slot. BenTo 2.1.0b6 failed to check
that invariant before writing.

## 2026-07-13 10:42 PDT — Restored A drives main LEDs

Without unplugging after the final verification reset, A's main LEDs illuminated
white/light-purple. Luke standardized the name of this observed state as
**white** for all future notes.

**Conclusion:** restored factory app0 is executing and controlling the external
LEDs while USB-powered. No network meaning is assigned to white. Battery latch
validation still requires unplugging A.

## 2026-07-13 13:38 PDT — Club A battery recovery validated

Luke returned after leaving the desk and reported that A continued to display
solid white. A direct macOS check confirmed `/dev/cu.usbserial-DEVICE` was absent,
so A was unplugged rather than being sustained by USB.

**Result:** A ran from battery and held its powered state for roughly three hours
after the golden app0 restoration. The factory application, external LED control,
and battery power latch are recovered.

**Remaining caveat:** inactive app1 still contains the first `0x21660` bytes of
the oversized public application. OTA/update operations must remain off-limits
until app1 is intentionally returned to an erased state. This does not affect
the currently selected and verified app0 boot.

## 2026-07-13 13:45 PDT — Migration options and full-flash audit

The project compared keeping factory firmware, reverse engineering it, migrating
to public BentoFlow, and building custom firmware. Public 1.2.0 stable on Club A
was selected as the leading canary path because it exposes the intended
BenTo/Wi-Fi/OSC/IMU stack while B and C preserve factory recovery.

Source audit of BenTo 2.1.0b6 showed that `Full Flash` changes the selected file
to `firmware_full.bin` and the write offset to `0x0`, but does not call
`erase_flash`. Since the merged file is only about 1.5 MB, bytes in the rest of
the 4 MB chip can survive and be reinterpreted by the new partition table.

**Decision:** the reliable factory migration is explicit whole-chip erase,
stable merged-image write, whole-chip verification against a prepared expected
image, serial identity proof, and only then separate Wi-Fi configuration.

Prepared artifacts:

```text
Club A factory rollback 4 MB
SHA-256 2a2faeb76d5bdea1a46e1dc007638d671df45fc7b2210f065934323a6dea67b5

Public 1.2.0 stable firmware_full.bin
SHA-256 1418269f739475ef081678966280325538bd19b10a7b8e87e5638935b0f5d970

Expected erased 4 MB plus public full image
SHA-256 1f313531db28054300daf4023546dc978532ebdc22dc497c7cce133e0fb5b4ab
```

A first attempt to generate the expected image with locale-sensitive `tr`
produced an invalid 8 MB file and was rejected/deleted. It was regenerated with
byte-exact binary handling and verified as exactly 4 MB, with the public full
image as its prefix and all remaining bytes equal to `0xFF`.

The stable 1.2.0 application extracted at `0x10000` from the merged full image
matched standalone `firmware.bin` exactly by SHA-256. esptool also validated the
application checksum and embedded validation hash.

## 2026-07-13 14:00 PDT — Upstream migration-path research and authorization

Luke clarified that Yuki bought the clubs for their joint creative-development
project, rather than lending them for an unrelated investigation. Luke
explicitly authorized the reviewed public stable 1.2.0 migration on Club A.
This authorization does not extend to B or C.

The official BenTo README was checked for support paths. It calls the software
under heavy development and links both the Crazy Bento Notion documentation and
the official Discord (`https://discord.gg/kedAeCbKUM`). No public
factory-Creators-to-1.2.x migration runbook was found.

Git history identified commit
`ea41dc0f9094fecd4579fe4ef28a3efe0282a1e3` from 2025-10-13, titled `b15 app-only
flashing, save settings shortcut, better prop flash filter`, as the introduction
of the `Full Flash` checkbox. The new tooltip says it erases full flash and is
needed for some major version changes. Its code selects `firmware_full.bin` and
offset `0x00000`, but does not issue a whole-chip erase.

**Conclusion:** the official tool has an intended full-image path for major
version changes, but the default app-only path was unsafe for this factory
partition table and the full-image path does not fully implement its erase
description. Proceed with official stable 1.2.0 artifacts using explicit
whole-chip erase, merged-image write, and whole-chip verification on A only.

## 2026-07-13 13:59 PDT — Club A migrated to public stable 1.2.0

**Authorization:** Luke explicitly approved the reviewed stable 1.2.0 canary
migration. B and C were not connected or changed.

**Identity gate:** esptool 4.8.1 reported ESP32-D0WDQ6 revision 1.0, 4 MB flash,
and MAC `CLUB_2_MAC`, exactly matching Club A. The reviewed public full
image, expected image, and A rollback image hashes and sizes matched their
recorded values before mutation.

**Write:** BenTo was terminated to avoid a serial-port race. `erase_flash`
completed successfully in 7.7 seconds. The official stable 1.2.0 merged image
was written at offset zero at 115200 baud.

**Verification correction:** the first post-write whole-chip comparison against
the full image plus an all-erased tail failed. This did not demonstrate a bad
application write: the write command used `--after hard_reset`, so the public
firmware booted and legitimately changed runtime-owned NVS/OTA/filesystem
sectors before verification. The original post-boot whole-chip oracle was
therefore invalid.

The immutable regions were then verified separately and all matched:

```text
0x00000000 length 0x8000: bootloader/prefix — digest matched
0x00008000 length 0x1000: public partition table — digest matched
0x00010000 length 0x1656b0: stable firmware.bin — digest matched
```

The migration runbook now leaves the chip in the bootloader after writing and
performs whole-chip verification before first boot. For an already-booted
device, it excludes runtime-owned data partitions.

**Runtime identity:** after a hard reset, a direct non-mutating `yo` serial
query returned:

```text
wassup CLUB_2_MAC "Creators Club" "Creators Club" "1.2.0"
```

The first validation harness expected the older source label `Flowtoys Creator
Club` and reported a string-label failure despite receiving this valid response.
That overly specific expectation was corrected. Club A is verified running
public stable 1.2.0.

**BenTo integration:** BenTo reopened with Firmware Uploader filtered to
`Creators Ball`, which showed zero compatible devices. An automated `Detect
Props` attempt did not add A even though the equivalent raw serial query worked.
No Wi-Fi credentials were written. This is the next host-side integration issue,
not a firmware-write failure.

Current upstream `PropManager.cpp` was then checked directly. The method that
would populate `vidpids` from downloaded prop definitions is entirely commented
out, but `checkSerialDevices()` and automatic USB discovery only inspect devices
that match entries in that array. This explains why Props -> `Detect Props`
never issued the working serial query. Firmware Uploader has a separate manifest
VID/PID filter and defaults to the first Creators device, `Creators Ball`, rather
than `Creators Club`.

The upstream network path remains usable: `Detect Props` broadcasts OSC `/yo`,
and an OSC `/wassup` can create a generic `BentoProp` even when the reported prop
type is not in the factory. The next controlled step is therefore to select
`Creators Club` in Firmware Uploader, configure Wi-Fi over USB, independently
confirm association, and use network `Detect Props` on the same VLAN.

## 2026-07-13 14:05 PDT — Firmware Uploader manifest selection confirmed

Luke manually changed the Firmware Uploader device dropdown from its startup
default `Creators Ball` to `Creators Club`. The left panel immediately changed
from zero to **one compatible device**.

**Conclusion:** BenTo's Firmware Uploader recognizes Club A's CP2102N USB bridge
when the correct Club manifest and its `0x10c4:0xea60` VID/PID filter are active.
This validates the USB path needed for `Only Set Wifi`; it does not fix the
separate Props-panel USB discovery bug.

## 2026-07-13 14:08 PDT — Club A joined Wi-Fi and answered OSC

Luke entered the 2.4 GHz home IoT SSID and password locally in BenTo without
sharing or recording them, then clicked `Only Set Wifi` once.

**Physical observation:** the club glowed red, then displayed a moving green
scan, then briefly flashed green. These color descriptions are observations, not
the basis for the network conclusion.

**Association evidence:** the Mac was active on home IoT as
`CONTROLLER_WIFI_IP/24`. Its ARP table showed:

```text
CLUB_2_IP at CLUB_2_MAC on en1
```

The MAC exactly matches Club A's esptool identity.

**Protocol test:** a byte-correct OSC `/yo` with the Mac's home IoT IP string
was sent by unicast to `CLUB_2_IP:9000` while listening on
`CONTROLLER_WIFI_IP:10000`. Club A returned a 92-byte `/wassup` packet from UDP 9000
with OSC type tag `,sssss` and these values:

```text
CLUB_2_IP
CLUB_2_MAC
Creators Club
Creators Club
1.2.0
```

**Result:** Wi-Fi association and bidirectional public 1.2.0 OSC discovery both
pass. BenTo's Props -> `Detect Props` is the remaining UI-level discovery gate.

## 2026-07-13 14:12 PDT — BenTo live control passed; B/C migration authorized

Club A appeared in BenTo's Props panel without another manual discovery click,
consistent with BenTo receiving the `/wassup` generated during the direct OSC
test. Luke sent multiple different patterns from BenTo and observed the club
change accordingly.

**Result:** Club A passes end-to-end live control on stable public 1.2.0.

Luke then authorized migrating both remaining factory clubs to establish a
common three-club baseline. The execution decision is sequential rather than a
batch: identify and back up each physical club, migrate and functionally prove
the next club, and only then erase the final factory device. Existing golden B
backup MAC is `CLUB_0_MAC`; C still requires identity capture and a full
4 MB backup.

## 2026-07-13 14:18 PDT — Club B migrated to stable 1.2.0

BenTo was terminated before touching the serial port. Club B was connected
alone. esptool 4.8.1 identified ESP32-D0WDQ6 revision 1.0, 4 MB flash, and MAC
`CLUB_0_MAC`, exactly matching the recorded B identity.

The existing full factory backup was revalidated before erase:

```text
backups/club-b-golden-20260713-1029-full-4mb.bin
4,194,304 bytes
SHA-256 8d960fe09206fbc9c2810266ce4663f3e947fcc0bdd359bb9fa89a0db263f7fe
```

The official stable full image and prepared pre-boot expected image also matched
their recorded sizes and hashes.

**Migration:** `erase_flash` completed successfully in 3.0 seconds. The stable
1.2.0 merged image wrote at offset zero at 115200 baud in 81.7 seconds, and
esptool verified its data hash. `--after no_reset` kept B in the bootloader.

**Pre-first-boot verification:** all `0x400000` bytes were compared with the
expected official image plus erased remainder. esptool reported:

```text
verify OK (digest matched)
```

It then hard-reset B for first boot. A direct raw serial `yo` returned:

```text
wassup CLUB_0_MAC "Creators Club" "Creators Club" "1.2.0"
```

**Result:** B's stable firmware migration and USB discovery protocol pass. Do
not erase C until B also passes Wi-Fi/OSC discovery and live BenTo pattern
control.

## 2026-07-13 15:08 PDT — Club B Wi-Fi/OSC gate passed

Luke reported B up and running on Wi-Fi. The Mac independently resolved B's
exact MAC to `CLUB_0_IP` on home IoT. A direct unicast OSC `/yo` returned
92 bytes from UDP 9000 with IP `CLUB_0_IP`, MAC
`CLUB_0_MAC`, device/type `Creators Club`, and firmware `1.2.0`.

**Result:** B's association and bidirectional OSC gate pass, authorizing the
preservation and migration sequence for C.

## 2026-07-13 15:17 PDT — Club C preserved and migrated to stable 1.2.0

BenTo was terminated. Connected C identified as ESP32-D0WDQ6 revision 1.0,
4 MB, MAC `CLUB_1_MAC`.

Before any write, all `0x400000` bytes were read at 115200 baud in 377.8 seconds:

```text
backups/club-c-golden-20260713-1507-full-4mb.bin
4,194,304 bytes
SHA-256 95a1610d80cbc90d414b20eacab6fc8927d2abadeeb400f4fa6c724a4bf5ee97
```

The factory partition table and complete app0 matched golden B byte-for-byte;
app1 was all `0xFF`. C's extracted app0 matched the known factory application:

```text
backups/extracted/club-c-app0-0x10000-size-0x140000.bin
1,310,720 bytes
SHA-256 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
```

After the backup gate passed, `erase_flash` completed in 3.6 seconds. The
official stable 1.2.0 merged image wrote at offset zero in 81.7 seconds with its
data hash verified and `--after no_reset`. A pre-first-boot comparison of all
4 MB reported `verify OK (digest matched)`, then hard-reset C.

Direct raw serial returned:

```text
[wifi] Connection Error
wassup CLUB_1_MAC "Creators Club" "Creators Club" "1.2.0"
```

**Result:** C's factory state is archived, and its stable 1.2.0 firmware and USB
protocol pass. Wi-Fi credentials, OSC discovery, and live pattern control remain.

## 2026-07-13 16:40 PDT — Club C Wi-Fi/OSC gate passed

Luke configured C with the same 2.4 GHz home IoT network through BenTo's
`Only Set Wifi` path without exposing or recording the credentials.

The Mac's home IoT ARP table resolved C's exact MAC to:

```text
CLUB_1_IP at CLUB_1_MAC on en1
```

A direct unicast OSC `/yo` from `CONTROLLER_WIFI_IP:10000` to
`CLUB_1_IP:9000` received a 92-byte `/wassup` from C with IP
`CLUB_1_IP`, MAC `CLUB_1_MAC`, type/name `Creators Club`, and
firmware `1.2.0`.

**Result:** C's association and bidirectional OSC discovery pass. All three
clubs now have preserved factory recovery material and verified stable 1.2.0
firmware/network baselines. C needs one visible BenTo pattern change to finish
the same end-to-end functional check already completed on A.

## 2026-07-13 16:42 PDT — Three simultaneous Wi-Fi props in BenTo

Luke reported that BenTo displays all three clubs as connected Wi-Fi props at
the same time.

**Result:** the shared three-club baseline is complete at the firmware,
association, OSC discovery, and BenTo prop-presence layers. All clubs run stable
1.2.0, and every original factory state is represented by preserved recovery
artifacts.

**Next test:** send a distinct solid color to one prop entry at a time, map it
to physical A/B/C, and assign durable BenTo names/global IDs. Record MAC-to-ID
mapping; do not depend on DHCP IP addresses remaining fixed.

## 2026-07-13 16:53 PDT — Physical IDs assigned and Save All invoked

Luke used the IDs visible in BenTo to identify and physically mark the three
clubs `0`, `1`, and `2`. He then clicked BenTo's `Save All` control.

**Source audit:** BenTo mirrors its Global ID to the network prop's
`settings/propID`. `Save All` displays a confirmation and, after `Yes`, calls
`savePropSettings()` on every prop. For a normal network Bento prop this
triggers the device's settings-save control. Bentuino includes `propID` in its
persistent settings tree, so the save covers the ID plus all other current prop
settings. This is distinct from saving the host `.bento` project.

**Read-only live check:** OSCQuery HTTP at Club B's current address
`CLUB_0_IP` returned:

```text
/settings/propID = 0
```

The address still resolved to MAC `CLUB_0_MAC`. Club A at
`CLUB_2_IP` rejected the HTTP connection and Club C at `CLUB_1_IP` timed
out during the same check. Those are current reachability observations, not
evidence that their saved settings failed. Do not guess whether A or C is ID
`1`/`2`; complete that mapping through later readback.

**Next checks:** save the BenTo authoring session as a `.bento` file, then use a
controlled power cycle to verify device-side ID persistence.

## 2026-07-13 17:00 PDT — Complete BenTo ID-to-MAC mapping

Luke turned off two clubs and left ID 0 online/charging. Read-only inspection of
the three retained BenTo entries showed these Global-ID and Network-IP pairs:

```text
ID 0 / Creators Club 1 -> CLUB_0_IP
ID 1 / Creators Club   -> CLUB_1_IP
ID 2 / Creators Club 2 -> CLUB_2_IP
```

Combining those values with the independently verified ARP/MAC observations
completes the durable mapping:

```text
ID 0 -> B -> CLUB_0_MAC
ID 1 -> C -> CLUB_1_MAC
ID 2 -> A -> CLUB_2_MAC
```

IP addresses remain DHCP observations; the physical number and MAC are the
durable identifiers.

## 2026-07-13 17:05 PDT — ID 0 BNO055 and local motion-FX test

**Initial read-only state:** ID 0 at `CLUB_0_IP` exposed a full motion tree
but reported `motion/enabled=false`, `motion/connected=false`, `sendLevel=None`,
and default sensor values.

**Negative protocol check:** an OSC integer write to
`/root/motion/enabled` did not change the field.

**Successful transient enable:** the equivalent OSC write to
`/motion/enabled` changed the state to:

```text
enabled   true
connected true
```

Immediate OSCQuery readback contained non-default live values, including:

```text
orientation [2.788391, 3.305248, 80.29919]
accel       [-0.54, 9.38, 1.59]
gyro        [-0.1875, -0.0625, 0]
linearAccel [0.02, -0.26, -0.05]
activity    0.006492
```

**Conclusion:** the physical BNO055, I2C pin configuration, sensor-fusion loop,
and OSCQuery readback work on the actual stable 1.2.0 club. Custom firmware is
not required for the first motion-to-light experiment.

**Local visual test armed:** enabled `leds/strip1/fx`, set
`isolationSpeed=1.0`, `isolationSmoothing=0.15`, and selected enum index `3`
(`Roll`). Sending the enum as the string `Roll` did not change it; the integer
index did. Luke had stepped away before the physical rotation observation, so
the visual result remains pending.

None of the motion or FX changes were saved to flash. Source inspection shows
the motion component initializes with both `enabled=false` and
`saveEnabled=false`, so a host startup action or local script should own future
automatic enablement.

## 2026-07-13 17:15 PDT — Live network protocol and HTTP security probe

Club 0 remained reachable at `CLUB_0_IP`. Its read-only
`GET /?HOST_INFO` response identified `Creators Club`, OSC over UDP port 9000,
and OSCQuery extensions including value/type/range/access and listen/path
notifications. `GET /?config=0` exposed top-level runtime components for
settings, LEDs, Wi-Fi, battery, files, scripts, buttons, IR, motion, and
communication without exposing credential fields.

**Verified protocol surfaces:** HTTP/OSCQuery and a binary-OSC WebSocket share
TCP port 80; OSC commands arrive on UDP 9000 and feedback defaults to UDP 10000;
mDNS advertises `_osc._udp` and `_oscjson._tcp`; LED streaming uses ArtDMX on
the ArtnetWifi library's UDP port 6454; HTTP file uploads route scripts and
playback assets to their device folders.

**Security finding:** the default full `GET /` and explicit `GET /?config=1`
responses each contained the Wi-Fi SSID and password fields. Values were not
printed or recorded. `GET /?config=0` contained zero credential fields. The
services expose no authentication or encryption, so the clubs belong on a
trusted isolated show network and full configuration responses must never be
logged or shared.

**Architecture decision:** implement both central and autonomous
motion-to-light tracks and compare them firsthand before settling on a hybrid
production design.

## 2026-07-13 17:22 PDT — Yuki's creative workflow and scene-engine design

Luke described Yuki's goal: visuals should respond to club movement; during
practice he should be able to browse roughly 20 movement/visual permutations
with the club button; later he should arrange the useful scenes into a sequence
advanced by time, button cues, or both. The reference performances Luke has seen
appeared tightly choreographed to music, with both the juggler and club visuals
in exact musical synchronization.

**Design decision:** model each reusable item as a scene containing a motion
interpretation, visual renderer, and tuned parameters. Prototype one compact
local WASM scene engine with button browsing rather than 20 unrelated programs.
Use button selection for rehearsal and flexible cueing; use one master transport
for exact music timing, with local IMU response modulating the active scene.

**Source-backed feasibility:** the Creators Club 1.2.0 build exposes local WASM
access to orientation, projected angle, activity, throw state, button state,
multipress count, and LED rendering. Source thresholds are 500 ms long press,
1,500 ms very-long press, and a 300 ms multipress window. Very-long press may
shut down a battery club. The WASM file limit is 16,000 bytes and its configured
memory limit is 4,096 bytes, favoring parameterized scenes. BenTo's firmware
playback layer supports up to 32 timed script intervals in playback metadata.

**Open tests:** custom AssemblyScript compile/upload/launch on the physical club;
single/double-click behavior inside a script; continued execution after Wi-Fi
loss; script launch behavior after power cycle; multi-club playback alignment
and drift.

**Next action:** finish the pending built-in roll-isolation observation, then
implement one projected-angle rainbow scene before expanding the catalog.

## 2026-07-13 17:27 PDT — Dedicated show network accepted

Luke concluded that stable 1.2.0's Wi-Fi credential exposure makes a separate
club network necessary rather than merely convenient.

**Decision:** use a dedicated portable show LAN with a unique, non-reused
credential and no route to home trusted, home IoT, venue guest, or internet
networks. The unused TP-Link Archer C4000 is the current candidate. Client/AP
isolation must remain off so BenTo can discover and control the clubs; access to
the show LAN itself remains the trust boundary because the club services have
no authentication.

**No mutation performed:** the Archer has not been reset/configured and the
clubs still retain their current home IoT settings.

**Planned migration:** configure the Archer offline with WAN disconnected;
dual-home the Mac using home trusted Ethernet plus show Wi-Fi; migrate Club 0 as a
canary; verify DHCP/MAC, OSCQuery `?config=0`, OSC discovery, BenTo presence, and
LED control; then migrate Clubs 1 and 2 one at a time.

## 2026-07-13 17:30 PDT — Persistence-of-vision feasibility assessment

Luke proposed swinging a club through 360 degrees to create a
persistence-of-vision display.

**Inference:** the geometry is favorable. The 32 longitudinal LEDs act as radial
pixels and successive frames at different angles act as angular columns. A
local script could map `projectedAngle` to a column in a 32-by-N polar bitmap.

**Source-backed limits:** stable Bentuino configures the BNO055 in NDOF mode;
Bosch specifies 100 Hz fusion output for NDOF. The firmware's dedicated IMU task
has a 5 ms loop delay and computes a normalized projected angle. Its 50 Hz
orientation setting gates network feedback rather than the local sensor task.
The 32 SK9822 LEDs are refreshed with `Adafruit_DotStar` from the main loop with
no explicit frame delay. Actual fresh-angle, script-loop, and LED-frame rates
on the club have not been measured.

**Geometric constraint:** the IMU supplies attitude rather than XYZ position. A
stable radial planar rotation can make orientation correspond to screen angle;
free translation, plane changes, or independent wrist rotation will warp the
image. Rings, spokes, sectors, and abstract trails should be substantially more
robust than text or fixed logos.

**Perception constraint:** one 360-degree swing should create a trail and may
form a complete image for a fixed long-exposure camera. A stable complete image
for the naked eye is a separate, harder test likely to require repeated fast
revolutions and consistent geometry.

**Proposed tests:** one fixed LED for a ring, then all LEDs gated every 30
degrees for 12 spokes, then a 32-by-48 polar test card. Evaluate naked eye,
normal/slow-motion video, and fixed long exposure separately. No physical POV
test has been performed.

## 2026-07-13 17:35 PDT — Public repository and publication boundary

Luke requested a separate public GitHub repository containing the project's
documentation and a brief non-technical README suitable for sharing with Yuki.

**Repository:** `https://github.com/lukec/creator-clubs`

**Initial public scope:** top-level README, project `AGENTS.md`, `.gitignore`,
and the maintained `docs/` tree. The MIT `LICENSE` was added immediately after
Luke selected it.

**Local-only scope:** flash dumps and extracted partitions under `backups/`,
downloaded/generated firmware under `artifacts/`, the stale original
`notes.md` handoff, and a `private/` device/home-lab inventory. All are covered
by explicit ignore rules; firmware-like binary extensions are ignored globally.

**Privacy transformation:** exact club MACs and DHCP addresses, controller
addresses, USB serial identifiers, exact home-network labels, Yuki's surname,
and the machine-specific BenTo checkout path were removed from tracked files.
Public docs use stable descriptive placeholders such as `CLUB_0_MAC` and
`CLUB_0_IP`; the exact values remain available locally.

The repository is public but has no open-source license yet. No Wi-Fi password
was present in the maintained documentation.

**Pre-push validation passed:** all 12 staged paths are text files; the recovery,
firmware, private-inventory, and stale-note paths are positively ignored; Git's
whitespace check passes; and index-only scans found no exact MAC/home address,
machine path, USB serial, personal email, token/private-key pattern, or assigned
credential. The only literal IP range is the generic private-network example
`10.0.0.0/8`.

## 2026-07-13 17:38 PDT — MIT License selected

Luke selected the MIT License for the public project repository. The standard
MIT text uses `Copyright (c) 2026 Creator Clubs contributors` so current and
future contributors are covered without asserting ownership of third-party
work.

The README states that the license applies to original repository material.
Flowtoys hardware/firmware, BenTo, libraries, and other dependencies remain
under their respective owners' terms.
