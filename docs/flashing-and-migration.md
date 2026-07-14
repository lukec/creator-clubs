# Flashing and migration

Last updated: 2026-07-13

## Executive decision

To obtain BenTo control, Wi-Fi/OSC discovery, and IMU telemetry, migrate **Club
A only** from factory test firmware to public BentoFlow using a deliberate full
4 MB erase followed by the public 1.2.0 stable merged image.

Do not use BenTo's ordinary `Upload firmware` from the factory layout. Do not
trust BenTo's `Full Flash` option to erase the whole chip. Do not touch Clubs B
or C until A passes every validation gate.

## Available paths

| Path | Benefits | Costs and risks | Recommendation |
| --- | --- | --- | --- |
| Keep factory firmware | Already works; no migration risk | Factory test build, serial spam, no demonstrated current BenTo/OSC protocol | Preserve on B/C as references |
| Reverse-engineer factory build | May retain factory storage and behavior | High effort; no source; likely recreates capabilities public BentoFlow already has | Only if factory behavior is uniquely valuable |
| Full migration to public 1.2.0 | Current BenTo model, Wi-Fi/OSC, IMU, shows/scripts | Replaces partition/storage layout; requires erase and tested rollback | Recommended on A as canary |
| Build custom firmware | Maximum control and project ownership | Toolchain and long-term maintenance burden; still needs a full layout migration | Later, after public stack works |
| Ask Flowtoys/Ben Kuper for an official factory migration | May reveal intended tooling or newer image | External dependency and delay | Worth doing in parallel, not a substitute for backups |

## Why application-only flashing failed

The factory and public layouts are incompatible:

| Region | Factory | Public 1.2.x |
| --- | --- | --- |
| app0 | `0x10000`, `0x140000` bytes | `0x10000`, `0x1e0000` bytes |
| app1 | `0x150000`, `0x140000` bytes | `0x1f0000`, `0x1e0000` bytes |
| EEPROM | `0x290000`, `0x1000` bytes | Removed |
| SPIFFS | `0x291000`, `0x16f000` bytes | `0x3d0000`, `0x20000` bytes |
| Coredump | Absent | `0x3f0000`, `0x10000` bytes |

Public 1.2.0b4 `firmware.bin` is `0x161660` bytes, larger than the factory
`0x140000` app0. BenTo wrote it anyway and overflowed into app1.

The public 1.2.0 full image has the same larger public partition layout as
1.2.0b4. A factory-to-public install is therefore a storage migration, not an
application update.

## BenTo 2.1.0b6 hazards discovered

1. `Upload firmware` does not compare application size with the device's
   partition table.
2. The firmware list labels 1.2.0b4 `latest`, although stable 1.2.0 was generated
   later.
3. `Full Flash` selects `firmware_full.bin` and offset `0x0`, but the source does
   not call `erase_flash`. It only erases sectors covered by the roughly 1.5 MB
   file, leaving old bytes elsewhere in the 4 MB chip.
4. `Only Set Wifi` logs success after sending commands; it does not require a
   device acknowledgement.

Because the public layout reinterprets upper-flash addresses, stale factory data
must not be left there. Use explicit full-chip erase outside BenTo.

## Upstream documentation and community path

**Source-backed:** the official BenTo README describes the software as under
heavy development, links the Crazy Bento Notion documentation, and directs
users to the project's Discord for questions and discussion:

- Documentation:
  <https://benkuper.notion.site/The-Crazy-Bento-Documentation-ee3a243320814347996ad9005de4397d>
- Discord: <https://discord.gg/kedAeCbKUM>
- Source: <https://github.com/benkuper/BenTo>

The public documentation did not yield a factory-Creators-to-public-1.2.x
migration runbook. The source history is more informative. Commit
`ea41dc0f9094fecd4579fe4ef28a3efe0282a1e3` (2025-10-13), titled `b15 app-only
flashing, save settings shortcut, better prop flash filter`, introduced the
`Full Flash` checkbox. Its tooltip says it erases the full flash and is needed
for some major version changes, but the implementation only switches from
`firmware.bin` at the manifest offset to `firmware_full.bin` at `0x00000`.
There is no mass-erase command in that path.

**Conclusion:** BenTo contains the intended major-version migration concept;
the first failure came from taking the default app-only path across an
incompatible partition-layout change. The explicit mass erase before writing
the same official merged image is a defensive correction for the gap between
the `Full Flash` tooltip and its implementation, not a custom firmware hack.

If upstream confirmation is wanted before changing B or C, ask in the official
Discord with the exact factory/public partition tables, public image size, and
BenTo commit above. Do not include Wi-Fi credentials or device-specific NVS.

## Prepared and verified artifacts

### Club A factory rollback

```text
backups/club-a-factory-rollback-reconstructed-20260713.bin
size: 4,194,304 bytes
SHA-256: 2a2faeb76d5bdea1a46e1dc007638d671df45fc7b2210f065934323a6dea67b5
```

This begins with A's preserved full-flash backup, replaces app0 with B's valid
factory image, and returns app1 to B's factory-erased state. It preserves A's
own NVS and the factory EEPROM/SPIFFS data captured before recovery.

### Public Creators Club 1.2.0 stable

```text
artifacts/firmware/CreatorsClub/1.2.0/firmware_full.bin
size: 1,529,520 bytes
SHA-256: 1418269f739475ef081678966280325538bd19b10a7b8e87e5638935b0f5d970
manifest commit: cff344ebcb90c12be7ef604b64134bd4266eb540
generated: 2026-03-04T21:23:03Z
```

The application embedded at `0x10000` in the merged image exactly matches
standalone `firmware.bin` SHA-256
`9974bfa47958fbc430c1c99ad4477dfd84ad06a2ac45fda75c1915571857ae39`.
esptool reports a valid ESP image checksum and validation hash.

The complete downloaded package is preserved at:

```text
artifacts/firmware/CreatorsClub/1.2.0/CreatorsClub_1.2.0.zip
SHA-256: 28b7a3b1db319f60d6c81cc5fdeeaf2ce461fba4c2c9543662484ead5ec3a537
```

### Expected post-migration 4 MB state

```text
artifacts/firmware/CreatorsClub/1.2.0/expected-erased-4mb-with-full-image.bin
size: 4,194,304 bytes
SHA-256: 1f313531db28054300daf4023546dc978532ebdc22dc497c7cce133e0fb5b4ab
```

This is the stable merged full image followed by erased `0xFF` bytes through the
end of the 4 MB chip. It is used only for whole-chip verification after the
erase/write sequence.

## Recommended canary migration for Club A

This is an operator runbook. Re-check paths, hashes, port ownership, and A's MAC
at execution time. Do not paste it as an unattended script.

### Gate 0: physical and host setup

- Club A only; B and C physically disconnected.
- Known-good USB data cable and stable Mac power.
- BenTo closed so it cannot race for the serial port.
- Prevent the Mac from sleeping during erase/write/verify.
- Expected A MAC: `CLUB_2_MAC`.
- Use the known-reliable 115200 baud. Faster read rates failed on this link.

Bundled tool:

```text
/Applications/BenTo.app/Contents/Resources/esptool/esptool
```

### Gate 1: verify identity and artifacts

Run `flash_id` and abort unless the chip is ESP32-D0WDQ6 revision 1.0, flash is
4 MB, and MAC is A's expected MAC. Recalculate all hashes above and abort on any
mismatch.

### Gate 2: erase all 4 MB

After explicit approval at action time:

```sh
/Applications/BenTo.app/Contents/Resources/esptool/esptool \
  --chip esp32 --port /dev/cu.usbserial-DEVICE --baud 115200 \
  --before default_reset --after hard_reset erase_flash
```

This is deliberately destructive. The rollback image and golden clubs are the
recovery route.

### Gate 3: write the stable merged image

```sh
/Applications/BenTo.app/Contents/Resources/esptool/esptool \
  --chip esp32 --port /dev/cu.usbserial-DEVICE --baud 115200 \
  --before default_reset --after no_reset write_flash \
  --flash_mode dio --flash_freq 80m --flash_size 4MB \
  0x0 artifacts/firmware/CreatorsClub/1.2.0/firmware_full.bin
```

Require esptool's data-hash verification and leave the chip in the bootloader.
Abort on any error; do not boot or continue into Wi-Fi configuration.

### Gate 4: verify the whole 4 MB state

Use read-only `verify_flash` against the prepared expected 4 MB image:

```sh
/Applications/BenTo.app/Contents/Resources/esptool/esptool \
  --chip esp32 --port /dev/cu.usbserial-DEVICE --baud 115200 \
  --before default_reset --after hard_reset verify_flash --diff no \
  0x0 artifacts/firmware/CreatorsClub/1.2.0/expected-erased-4mb-with-full-image.bin
```

Require `verify OK (digest matched)`, then hard-reset the chip. This comparison
is only valid before the first public-firmware boot: first boot legitimately
writes NVS, OTA metadata, and possibly filesystem metadata, so a later complete
4 MB comparison against an all-erased tail will fail.

If the new firmware has already booted, verify immutable regions instead:

- bootloader/prefix `0x0000..0x7fff` against the full image;
- partition table `0x8000..0x8fff` against the full image;
- application at `0x10000` against standalone `firmware.bin`.

Do not compare runtime-owned NVS, `otadata`, SPIFFS, or coredump sectors with an
all-`0xFF` expected file after first boot.

### Gate 5: prove firmware before Wi-Fi

With A still on USB:

1. Passively capture serial at 115200 and check for a sane boot/runtime state.
2. Send only the non-mutating serial identity query `yo`.
3. Require a response matching the stable 1.2.0 form observed on Club A:

   ```text
   wassup <MAC> "Creators Club" "Creators Club" "1.2.0"
   ```
4. Confirm BenTo can add A as a USB prop, not merely list the CP2102N bridge in
   Firmware Uploader. As of BenTo 2.1.0b6, current upstream source leaves the
   USB Props-discovery VID/PID list empty; a successful raw `yo` response is the
   reliable USB protocol gate, and network discovery may be needed to create the
   actual Props entry.

Do not set credentials until these pass. This isolates firmware migration from
network configuration.

### Gate 6: configure Wi-Fi separately

- Use a 2.4 GHz WPA2-compatible SSID; ESP32-D0WDQ6 does not support 5 GHz.
- Keep the Mac on the same home IoT network/VLAN during discovery.
- Enter credentials in BenTo; never place the password in docs or shell history.
- Use `Only Set Wifi` once, then wait for restart.
- Treat BenTo's success message only as host-side completion.

Independent success criteria:

1. UniFi shows A's Wi-Fi client/MAC on the intended network.
2. BenTo receives `/wassup` and adds A to Props.
3. Direct unicast `/yo` to A on UDP 9000 produces the expected response.
4. A survives a power cycle and reconnects without USB.

### Gate 7: functional canary tests

- Deliberate solid-color command from BenTo.
- Brightness control.
- Battery reading.
- Raw orientation/gyro/acceleration telemetry.
- At least 30 minutes of continuous operation.
- Controller restart and club restart recovery.

Only after all gates pass should B be backed up individually and considered for
migration. Keep C on factory firmware until the performance stack is proven.

## Rollback Club A to factory state

Rollback is another explicit erase/write operation:

1. Confirm A by MAC.
2. `erase_flash` at 115200.
3. Write
   `backups/club-a-factory-rollback-reconstructed-20260713.bin` at `0x0`.
4. Verify the complete 4 MB against that same rollback image.
5. Require `Power up Everything` serial output and battery-powered white state.

Do not write Club B's full image wholesale to A; use A's reconstructed rollback
so A retains its own preserved NVS.
