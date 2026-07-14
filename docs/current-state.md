# Current state

Last updated: 2026-07-13 17:35 PDT

## Equipment and ownership

- Yuki bought three Flowtoys **Creators Clubs** for a joint Luke/Yuki
  creative-development project. They are currently with Luke for the work.
- They are developer-oriented Creators hardware, not ordinary Vision clubs and
  not the Flowtoys Connect consumer workflow.
- Club A was initially flashed application-only with 1.2.0b4 through BenTo,
  recovered from the factory golden backup, and then cleanly migrated to stable
  1.2.0. Clubs B and C have now also been cleanly migrated to stable 1.2.0.
- Yuki never flashed or customized the clubs; they arrived in factory state.
- Full factory backups for all three clubs are preserved. There is no longer a
  live club on factory firmware; the archived images are the recovery baseline.

## Public project repository

The project has a public GitHub repository:

```text
https://github.com/lukec/creator-clubs
```

The tracked scope is the short project README, project instructions, and the
maintained `docs/` record. Full flash backups, downloaded firmware, generated
firmware images, the superseded session handoff, and the private device/home-lab
inventory remain local and Git-ignored.

Before publication, exact device MAC addresses, DHCP addresses, USB identifiers,
home-network names, and machine-specific paths were moved to the ignored private
inventory and replaced in public documentation with descriptive placeholders.
No Wi-Fi password was present in the documentation or added to Git.

The repository is publicly readable. No open-source license has been selected
yet, so choosing a license remains a later project decision.

## Stable 1.2.0 baseline

Luke explicitly authorized migrating all three clubs to public Creators Club
stable 1.2.0. All three firmware migrations completed on 2026-07-13.

**Baseline complete:** Luke sees three simultaneous Props entries in BenTo, all
connected over Wi-Fi. Each club has stable 1.2.0, a recorded ESP32 MAC, and
preserved factory recovery material.

Verified on A after migration:

- ESP32 identity remained MAC `CLUB_2_MAC`, 4 MB.
- Whole-chip erase completed successfully.
- Official stable 1.2.0 merged image wrote successfully.
- Bootloader prefix, public partition table, and the entire standalone 1.2.0
  application verify byte-for-byte against the reviewed artifacts.
- Raw USB serial `yo` returned:

  ```text
  wassup CLUB_2_MAC "Creators Club" "Creators Club" "1.2.0"
  ```

This proves the public 1.2.0 runtime is executing and speaking its discovery
protocol.

## Public 1.2.0 Wi-Fi result

Luke entered the existing 2.4 GHz home IoT credentials locally in BenTo and
clicked `Only Set Wifi` once. The club visibly glowed red, showed a moving green
scan, and briefly flashed green. Color names are Luke's physical observation;
network meaning is assigned only because of the independent checks below.

**Verified:** the Mac remained dual-homed with Ethernet on home trusted
(`CONTROLLER_ETHERNET_IP`) and Wi-Fi on home IoT (`CONTROLLER_WIFI_IP`). Its ARP table then
contained Club A's exact MAC at:

```text
CLUB_2_IP -> CLUB_2_MAC on en1
```

A direct unicast OSC `/yo` from `CONTROLLER_WIFI_IP:10000` to
`CLUB_2_IP:9000` received a 92-byte `/wassup` response containing:

```text
CLUB_2_IP
CLUB_2_MAC
Creators Club
Creators Club
1.2.0
```

Wi-Fi association and the public network discovery protocol are therefore both
working.

BenTo subsequently displayed Club A in the Props panel, and Luke successfully
sent multiple patterns that visibly changed the club. This validates the full
baseline chain: USB migration, public firmware boot, Wi-Fi, OSC discovery,
BenTo prop creation, and live LED control.

## Next migration decision

Luke authorized migrating the other two clubs to the same stable public 1.2.0
baseline. They will be handled one at a time:

1. Disconnect A from USB and connect exactly one factory club.
2. Identify it by MAC before any write.
3. Preserve and hash a complete 4 MB factory backup if that exact club has not
   already been backed up.
4. Migrate and validate that club through live pattern control.
5. Only then repeat the backup/migration/validation process for the final club.

This sequence is complete. Club B passed independent Wi-Fi association and OSC
discovery before C was erased. C's identity and complete factory backup were
then captured and validated before its migration.

## Club B stable 1.2.0 migration

Club B was connected alone and identified before mutation as ESP32-D0WDQ6
revision 1.0, 4 MB, MAC `CLUB_0_MAC`. Its existing complete factory
backup remained intact:

```text
backups/club-b-golden-20260713-1029-full-4mb.bin
size: 4,194,304 bytes
SHA-256: 8d960fe09206fbc9c2810266ce4663f3e947fcc0bdd359bb9fa89a0db263f7fe
```

The whole chip was erased, the official stable 1.2.0 merged image was written at
offset zero with `--after no_reset`, and all 4 MB were verified before first boot
against the prepared expected image. esptool reported `verify OK (digest
matched)` and then hard-reset the club.

The first runtime serial identity query returned:

```text
wassup CLUB_0_MAC "Creators Club" "Creators Club" "1.2.0"
```

**Current B status:** firmware migration, USB protocol, Wi-Fi association, and
direct OSC discovery pass. B appeared at `CLUB_0_IP` with its exact MAC and
returned Creators Club 1.2.0 in `/wassup`.

## Club C stable 1.2.0 migration

Club C was identified before mutation as ESP32-D0WDQ6 revision 1.0, 4 MB, MAC
`CLUB_1_MAC`. Its entire untouched factory flash is preserved:

```text
backups/club-c-golden-20260713-1507-full-4mb.bin
size: 4,194,304 bytes
SHA-256: 95a1610d80cbc90d414b20eacab6fc8927d2abadeeb400f4fa6c724a4bf5ee97
```

Its factory partition table and app0 matched B's golden image byte-for-byte;
app1 was fully erased. Extracted C app0 is:

```text
backups/extracted/club-c-app0-0x10000-size-0x140000.bin
size: 1,310,720 bytes
SHA-256: 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
```

C was then erased, written with the official stable 1.2.0 merged image, and
verified over all 4 MB before first boot. Its runtime identity is:

```text
wassup CLUB_1_MAC "Creators Club" "Creators Club" "1.2.0"
```

**Current C status:** firmware migration, USB identity, Wi-Fi association, and
direct OSC discovery pass. C appeared at `CLUB_1_IP` with exact MAC
`CLUB_1_MAC` and returned Creators Club 1.2.0 in `/wassup`. BenTo now
shows C alongside A and B as three simultaneous Wi-Fi props.

## Three-club identity and settings persistence

Luke used one-at-a-time BenTo control to identify the physical clubs, marked
them `0`, `1`, and `2`, and used the same numbers as their BenTo Global IDs.
He then clicked `Save All`.

**Source-backed behavior:** for a network Bento prop, changing BenTo's Global ID
updates the device-side `settings/propID`. `Save All` opens a confirmation dialog
and, after `Yes`, triggers each prop's `saveSettings` control. Firmware then
serializes all current persistent settings, including `propID`, to flash. This
saves more than the IDs; it saves all current prop settings.

**Independent live readback at 16:49 PDT:** Club B, MAC
`CLUB_0_MAC`, current DHCP address `CLUB_0_IP`, exposed
`/settings/propID = 0` through its OSCQuery HTTP endpoint. This verifies the
BenTo/device ID synchronization for B.

**BenTo UI mapping verified at 17:00 PDT:** selecting each prop showed its
current Network IP, while the Props panel exposed its Global ID. Combining
those with the previously verified IP-to-MAC observations gives:

| Physical/BenTo ID | Club | MAC | Current DHCP IP |
| --- | --- | --- | --- |
| `0` | B | `CLUB_0_MAC` | `CLUB_0_IP` |
| `1` | C | `CLUB_1_MAC` | `CLUB_1_IP` |
| `2` | A | `CLUB_2_MAC` | `CLUB_2_IP` |

Luke has turned off IDs 1 and 2. ID 0 remains online and reports that it is
charging.

BenTo's device `Save All` is separate from saving the host-side authoring
session. The current scratch session has little authored content and does not
need to be saved merely to preserve device IDs. Save a `.bento` project through
`File -> Save As` once it contains an intentional timeline or reusable setup.

## First live IMU result

At 17:02 PDT, stable 1.2.0 on ID 0 initially exposed:

```text
/motion/enabled   false
/motion/connected false
```

A transient OSC write to `/motion/enabled` enabled the built-in motion
component without saving settings. Readback then returned `enabled=true`,
`connected=true`, and non-default live orientation, acceleration, gyro,
linear-acceleration, and activity values. The BNO055 and public firmware sensor
path therefore work on the actual club.

The built-in LED FX stage was then enabled transiently with roll isolation,
speed `1.0`, and smoothing `0.15`. Luke is testing whether rotating/tilting ID 0
visibly remaps the current multicolor LED pattern. None of these IMU/FX changes
were saved to flash.

## Immediate next engineering step

### Network decision

Luke now agrees that the clubs should move off the home home IoT network and
onto a dedicated show network. Stable 1.2.0's unauthenticated full OSCQuery
response exposes the configured SSID and password to any network participant
that can reach a club. The dedicated network must use a credential that is not
reused anywhere else and must have no route to the home networks.

The unused TP-Link Archer C4000 is the current candidate. No router or club
network settings have been changed yet. When Luke chooses to begin, configure
the Archer offline, keep its WAN disconnected, join the dual-homed Mac, and
migrate Club 0 as a canary before changing Clubs 1 and 2. The detailed target
topology and checklist are in `docs/bento-and-network.md`.

### Creative work

1. Observe the armed roll-isolation test on ID 0 and record its visible result.
2. Build one minimal local AssemblyScript/WASM scene that maps projected angle
   to a rotating rainbow and an angle-gated 12-spoke POV test, then add
   short-press next-scene behavior.
3. Validate four primitives before expanding the catalog: projected angle,
   derived rotation speed, activity, and throw/catch state.
4. Build the same four scenes in a central Mac-side controller, compare both
   tracks, and put them on a BenTo Audio-plus-Block song timeline.
5. Have Yuki rehearse with the small catalog, tune it from his actual movement,
   and expand only the useful combinations toward a 20-scene library.
6. Save a `.bento` session once it contains an intentional show/timeline; the
   current scratch session does not yet contain important authored work.

Yuki's desired workflow and the proposed rehearsal/composition architecture are
recorded in `docs/creative-workflow.md`.

**New POV hypothesis:** the 32 longitudinal LEDs can provide radial pixels while
a fast repeatable planar swing provides angular columns. The first test should
be rings and 12 angle-gated spokes, not text or a logo. The IMU tracks attitude,
not room position, so detailed stationary imagery will depend on consistent
swing geometry. No POV test has yet been run.

Do not click `Auto Assign IDs`; it rewrites IDs according to manager order. Do
not click `Assign IDs from Props` as part of assignment; it reads device IDs
back into BenTo rather than choosing new ones.

## Historical BenTo setup issue, now bypassed

BenTo 2.1.0b6 initially reopened with its Firmware Uploader filtered to
`Creators Ball`, so that panel showed zero compatible devices. An automated
click on `Detect Props` did not add A over USB even though the equivalent raw
serial identity query worked. Selecting `Creators Club` fixed uploader
compatibility, and network OSC discovery subsequently added all three props.
The remaining USB Props-panel discovery bug is non-blocking.

Completed BenTo setup sequence for A:

1. In `Firmware Uploader`, change the middle firmware/device dropdown from
   `Creators Ball` to `Creators Club`. Do not click `Upload firmware`.
2. Confirm the left panel changes from `0 Compatible Device` to one CP2102N
   device. **Verified by Luke:** it now shows one compatible device.
3. Enter the existing 2.4 GHz home IoT SSID and password locally in BenTo.
   Do not paste the password into chat or project files.
4. Use `Only Set Wifi` once.
5. Put the Mac's Wi-Fi interface on that same SSID/VLAN, confirm A in UniFi, and
   then use Props -> `Detect Props` for network discovery.

## Verified working pieces

- The Mac recognizes the connected club through a Silicon Labs CP2102N
  USB-to-UART bridge.
- Serial device paths:

  ```text
  /dev/cu.usbserial-DEVICE
  /dev/tty.usbserial-DEVICE
  ```

- USB bridge serial identifier:

  ```text
  PRIVATE_USB_SERIAL
  ```

- BenTo 2.1.0b6 is installed in `/Applications` and recognizes the USB bridge as
  a compatible device.
- On the archived factory test firmware, a passive serial capture at 115200
  baud produced valid text continuously:

  ```text
  Power up Everything
  ```

  A five-second sample contained 625 identical lines (approximately 125 lines
  per second).

## Historical factory-firmware Wi-Fi test (failed)

- The test Wi-Fi is a 2.4 GHz SSID mapped to UniFi's `home IoT`
  `CLUB_LAN_SUBNET` network. The actual SSID and password are intentionally not
  recorded here.
- During the test, the Mac had Ethernet on home trusted (`CONTROLLER_ETHERNET_IP`) and Wi-Fi
  on home IoT (`CONTROLLER_WIFI_IP`).
- BenTo correctly selected the Wi-Fi interface and logged discovery broadcast
  to `CLUB_LAN_BROADCAST` with local address `CONTROLLER_WIFI_IP`.
- BenTo's `Only Set Wifi` action was run once for the connected club. BenTo
  logged:

  ```text
  Setting Wifi infos to prop...
  All Props wifi are set !
  ```

- The club did not appear as a new UniFi client, did not appear in BenTo's Props
  list, and did not answer a direct unicast OSC `/yo` sweep of all addresses on
  `CLUB_LAN_SUBNET` at UDP port 9000.
- The club changed from green to white/light-purple after the credential action
  and restart. This color is not proof of Wi-Fi state.

## Flash completed at 10:08 PDT

Luke initiated an `Upload firmware` operation in BenTo with:

```text
Category: Creators
Device: Creators Club
Version: 1.2.0b4
Set Wifi During flash: enabled
```

BenTo reached `Progression : 1.000` and logged that one prop was flashed, all
props were flashed, Wi-Fi settings were sent, and all props' Wi-Fi was set. The
club then re-enumerated as one compatible USB device. macOS independently still
showed `/dev/cu.usbserial-DEVICE` after completion.

**Verified:** the firmware write completed without a reported error and the USB
controller returned after restart.

**Verified:** after an additional 15-second discovery window, the Props list
remained empty. This is a post-flash Wi-Fi/discovery question, not evidence that
the flash write failed.

**Physical observation:** a single dim red light is visible from the internal
board. It first appeared when flashing began and remained visible afterward;
the 32 outward-facing club LEDs were not described as red. USB continued to
enumerate normally while this light was present.

The public Creators Club board definition assigns pins 25, 26, and 27 to the
external LED clock/data/power path but does not define a separate controllable
red status LED. The internal red light is therefore likely a board-level power,
USB-UART, or boot/activity indicator, but this is not verified without a board
schematic or physical identification of the component.

At approximately 10:11 PDT, after the completed flash and USB recovery, Luke
unplugged the club. It immediately went fully dark. This confirms that the dim
internal red light depended on USB power or USB-powered board state. It does not
yet prove whether the battery is charged or whether the controller is asleep.

A subsequent brief press-and-release produced no visible response. Luke then
tried multiple tap and hold patterns, including the controlled approximately
one-second hold; none produced any response.

**Verified regression:** this club responded on battery before the public
firmware flash but no longer wakes or latches power from battery afterward.
This rules out a merely too-short first tap. The new firmware may not match this
hardware revision's power-latch/button behavior, or the flash may have changed a
required setting. A coincidental battery fault is possible but less consistent
with the timing.

**Important:** no backup of the factory application firmware was made before
Luke initiated the flash. Subsequent full-flash reads from A and golden Club B
allowed it to be recovered exactly.

## Current conclusion

**Verified:** USB works, but network connectivity has not been established.

**Verified:** BenTo's credential workflow does not wait for or validate a reply
from the club before printing its success message.

**Historical observation:** before the 10:08 flash, `Power up Everything` was
absent from the current public BenTo source and from all public Creators Club
firmware binaries offered by BenTo, versions 1.0.3 through 1.2.0b4.

**Retracted historical inference:** the initial working theory was that Yuki's
installed firmware was private or custom. Luke later confirmed Yuki never
flashed the clubs. Golden Club B proves the installed application is factory
test firmware containing `test firmware version 0.0` and
`Power up Everything`.

## Historical recovery gate (completed)

At this point in the recovery, Club A's factory app0 was restored and verified
over USB, and battery operation was the next test. That test later passed; A was
subsequently migrated to stable public 1.2.0 as recorded in the current canary
state at the top of this document. Do not flash either remaining club.

## USB recovery and application check at 10:14 PDT

Luke reconnected the same club. The faint internal red light returned and BenTo
again listed one compatible CP2102N device. BenTo's Props pane remained empty.
The log showed the serial device added at 10:14:02, briefly removed at 10:14:21,
and added again at 10:14:25.

A five-second passive 115200-baud capture returned zero bytes. A single
documented, non-mutating serial identity query (`yo`) also returned zero bytes;
a running public BentoFlow application should answer with `wassup` and its
identity.

**Current diagnosis:** the CP2102N USB bridge is healthy, but the newly flashed
ESP32 application is not running far enough to initialize/respond over serial.
This explains the combined absence of battery power latch, serial identity, and
network discovery. Wi-Fi is not the primary blocker.

The 1.2.0b4 manifest specifies an application offset of `0x10000`, 4 MB flash,
DIO mode, 80 MHz flash frequency, and hard reset after flashing. It is not yet
known whether Luke's BenTo operation wrote only `firmware.bin` at `0x10000` or
used `firmware_full.bin` at `0x00000`.

**Next safe recovery step:** with explicit approval, read the full 4 MB flash
into a backup without erasing or writing it. Inspect the partition table and
hash/archive the image before any further flash operation.

## Club A backup and confirmed root cause

Luke authorized a read-only backup. Two high-speed attempts at 921600 and
460800 baud failed immediately after the temporary RAM reader stub changed baud;
neither read or wrote flash. A 115200-baud read completed successfully:

```text
File: backups/club-a-flashed-20260713-1018-full-4mb.bin
Size: 4,194,304 bytes
SHA-256: 4ce1ad2c9305370596343e55adf3dc4ddd36f2e86f4312223208104cb2ec6bd2
Chip: ESP32-D0WDQ6 revision 1.0
Crystal: 40 MHz
MAC: CLUB_2_MAC
Tool: esptool.py 4.8.1
```

The A image's bytes at `0x10000` exactly match the complete public 1.2.0b4
`firmware.bin` SHA-256, while its prefix does not match `firmware_full.bin`.
Therefore BenTo performed an application-only write and preserved A's original
bootloader and partition table.

The preserved partition table defines:

```text
nvs      0x009000  size 0x005000
otadata  0x00e000  size 0x002000
app0     0x010000  size 0x140000
app1     0x150000  size 0x140000
eeprom   0x290000  size 0x001000
spiffs   0x291000  size 0x16f000
```

**Confirmed root cause:** public 1.2.0b4 `firmware.bin` is `0x161660` bytes, but
A's original app0 partition is only `0x140000` bytes. The write starting at
`0x10000` ended at `0x171660`, overflowing app0 by `0x21660` bytes (136,800
bytes) and overwriting the beginning of app1. Neither application slot remains
bootable. This explains USB-bridge detection with no application response,
battery latch, or Wi-Fi.

NVS, EEPROM, and SPIFFS lie outside the overwritten range and are present in the
backup. Their semantic integrity has not yet been analyzed, but the failed
application write did not reach their address ranges.

## Candidate recovery firmware comparison

Luke proposed reverting to 1.1.10 as a previous stable version. Direct package
metadata shows:

| Version | Generated | Characterization |
| --- | --- | --- |
| 1.1.10 | 2026-01-14 | Older non-beta release; commit recorded |
| 1.2.0b4 | 2026-02-01 | Beta build currently flashed; no commit in manifest |
| 1.2.0 | 2026-03-04 | Newer non-beta release; commit recorded |

BenTo labels 1.2.0b4 as `latest` because of server-list ordering, despite the
1.2.0 package being newer and non-beta.

All three packages specify ESP32, 4 MB flash, DIO mode, 80 MHz, and application
offset `0x10000`. Therefore an application-only downgrade to 1.1.10 may fail in
the same way if the underlying bootloader/partition layout is incompatible.

If a public recovery image is ultimately selected, 1.2.0 is currently the more
defensible stable candidate than 1.1.10. This is not authorization to flash it;
first preserve and inspect the current full flash.

## Revised recovery plan: use a golden working club

The two untouched working clubs remove the need to guess which public release
matches the factory hardware/layout. Treat them as irreplaceable golden
references.

1. Physically label the flashed/nonworking club `A`.
2. Label the untouched working clubs `B` and `C`.
3. Read and hash the full 4 MB flash from `A` before another write.
4. Read and hash the full 4 MB flash from one golden club, preferably `B`.
5. Compare bootloader, partition table, application, NVS, filesystem, and other
   regions.
6. Identify the original application version/build from the golden image.
7. Restore only the regions required to make `A` boot, preserving A's
   device-specific settings/files where possible.
8. Keep `C` untouched as the final fallback/reference.

Do not blindly clone an entire golden flash onto A: NVS or filesystem regions
may contain per-device identity, calibration, shows, or credentials. Compare and
extract first.

## Club B golden backup and recovery image

Club B was connected and read at 115200 baud without any flash write:

```text
File: backups/club-b-golden-20260713-1029-full-4mb.bin
Size: 4,194,304 bytes
SHA-256: 8d960fe09206fbc9c2810266ce4663f3e947fcc0bdd359bb9fa89a0db263f7fe
Chip: ESP32-D0WDQ6 revision 1.0
MAC: CLUB_0_MAC
Read time: 377.8 seconds at 115200 baud
```

Extracted golden application:

```text
File: backups/extracted/club-b-app0-0x10000-size-0x140000.bin
Size: 0x140000 (1,310,720 bytes)
SHA-256: 6c696480a74a18dbc1aa6fcd200c68a651d47202ed317e2a88c4d6c34de44b21
ESP image checksum: valid
ESP validation hash: valid
Last non-0xFF byte: 0x0b1f3f within the extracted partition
```

B's app0 contains `Power up Everything` and `test firmware version 0.0`.
B's app1 begins with erased `0xFF` bytes and is blank. OTA data selects app0
with sequence 1.

Offline A/B region comparison:

| Region | Result |
| --- | --- |
| Bootloader | Identical SHA-256 |
| Partition table | Identical SHA-256 |
| OTA data | Identical SHA-256 |
| app0 | A overwritten; B valid golden image |
| app1 | A partly overwritten; B blank |
| NVS | Different; preserve A |
| EEPROM | Identical SHA-256 |
| SPIFFS | Identical SHA-256 |

**Minimum-risk repair:** write only B's full app0 partition image to A at
`0x10000`, verify it, and test boot/battery behavior. Do not touch app1 during
the first repair. Its damaged contents are inactive because OTA data selects
app0; it can be erased later if required after A is demonstrably recovered.

## Club A app0 recovery completed

Luke explicitly authorized the prepared app0-only repair. Before writing,
esptool confirmed Club A's expected MAC `CLUB_2_MAC`, ESP32-D0WDQ6
revision 1.0, and 4 MB flash.

The golden source hash was rechecked, then esptool erased and wrote only:

```text
0x00010000 through 0x0014ffff
```

It wrote B's full `0x140000`-byte app0 partition image, verified the write hash,
and hard-reset A. No other region was included in the command.

Post-write evidence:

- A emitted 5,271 serial bytes in two seconds at 115200 baud.
- All 251 nonempty lines were exactly `Power up Everything`.
- A separate esptool `verify_flash` compared all `0x140000` bytes at `0x10000`
  with B's extracted golden app0 and reported `verify OK (digest matched)`.
- esptool hard-reset A again after verification.

**Current status:** A's factory application and battery-powered operation are
restored. A's inactive app1 remains partly overwritten; do not use OTA/update
operations until it is deliberately erased or restored.

After the final hard reset, while still connected to USB, A's 32 main LEDs
illuminated in the previously described white/light-purple color. Luke will call
this observed state **white** from now on. This confirms the restored factory
application is again controlling the main LEDs; white is not assigned a Wi-Fi
meaning.

Luke later unplugged A and left the desk. At 13:38 PDT, A remained solid white
while macOS confirmed `/dev/cu.usbserial-DEVICE` was absent. It had therefore run
from battery for roughly three hours after the restore. This validates the
battery power latch and establishes Club A as functionally recovered on factory
app0.

## Factory-to-public migration finding

Luke confirmed Yuki never flashed these clubs; all three arrived with factory
firmware. Golden B identifies it as `test firmware version 0.0`.

The public 1.2.0 and 1.2.0b4 full images use a different partition layout from
the factory image:

| Region | Factory layout | Public 1.2.x full layout |
| --- | --- | --- |
| app0 | `0x10000`, size `0x140000` | `0x10000`, size `0x1e0000` |
| app1 | `0x150000`, size `0x140000` | `0x1f0000`, size `0x1e0000` |
| EEPROM | `0x290000`, size `0x1000` | Removed |
| SPIFFS | `0x291000`, size `0x16f000` | `0x3d0000`, size `0x20000` |
| Coredump | Absent | `0x3f0000`, size `0x10000` |

Therefore moving a factory club to public 1.2.x is a partition-layout migration,
not an ordinary application update. It requires a carefully planned full flash,
backups, and acceptance that the factory EEPROM/SPIFFS layout is replaced. BenTo
did not prevent an oversized application-only upload to the factory layout.
