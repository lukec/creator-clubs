# Safety and recovery

Last updated: 2026-07-13

## Ownership and authority boundary

Yuki bought the three clubs for a joint Luke/Yuki creative-development
project. They are physically with Luke for the collaboration; this is not an
unapproved third-party hardware investigation. Still treat factory firmware,
stored shows, calibration, identity, and credentials as project assets worth
preserving.

Luke explicitly authorized migrating Club A to public stable 1.2.0 on
2026-07-13. That authorization covers the reviewed erase/write/verify canary
procedure in `flashing-and-migration.md`. After A passed Wi-Fi discovery and
live pattern control, Luke explicitly authorized migrating Clubs B and C to the
same stable 1.2.0 baseline. The new authorization is sequential: preserve each
club's full backup and validate B before erasing C.

## Allowed without additional approval

- Physical inspection without disassembly.
- USB enumeration and system information.
- Passive serial capture.
- Network observation and controller/router log inspection.
- Reading public source, firmware packages, and documentation.
- Reversible host-side configuration that does not write to the clubs.

## Requires Luke's explicit approval

- Resetting the controller into its bootloader for a read-only flash backup.
- Sending hand-written serial commands to the club.
- Writing credentials or settings again.
- Uploading files or shows.
- OTA operations.
- Flashing any firmware image.
- Erasing flash, NVS, filesystem, shows, or calibration.
- Opening or electrically modifying a club.

## Before any firmware replacement

1. Confirm which physical club is authorized for the operation and keep the
   others disconnected.
2. Label the physical club.
3. Record USB identity and any discovered device ID/MAC.
4. Read and preserve the full flash image when technically possible.
5. Hash the backup and record the exact command/tool version.
6. Store any available original binary/source and matching BenTo version.
7. Confirm that the backup can at least be parsed and that the target firmware
   matches the hardware configuration.
8. Define the rollback procedure before writing.

## Golden-image rule

As of 2026-07-13, all three clubs run stable public 1.2.0. There is no remaining
live golden factory device. Complete factory backups for A, B, and C are
preserved; B's golden application has already recovered A successfully.

- Treat the three full factory backups as immutable recovery artifacts.
- Preserve each club's device-specific backup rather than cloning another
  club's full image wholesale.
- A read-only full-flash dump from one golden club is preferable to guessing a
  public version.
- Hash and archive every dump before analysis.
- Do not clone the entire dump onto another club without comparing regions;
  NVS, filesystems, calibration, identity, shows, or credentials may be unique.
- Prefer restoring only the confirmed boot/application/partition regions while
  retaining the target club's device-specific data.

## BenTo controls to treat as mutating

- `Only Set Wifi` writes settings and restarts the prop.
- `Upload firmware` writes firmware.
- `OTA Upload` writes firmware over the network.
- Full-flash or erase options may replace filesystems, settings, calibration,
  or other owner data in addition to the application image.

Do not interpret BenTo's completion log as device-side verification unless the
protocol also produces a checked acknowledgement or the result is confirmed by
independent observation.

BenTo's `Full Flash` option does not issue an explicit whole-chip erase in
2.1.0b6; it writes the merged image at offset zero. For the factory-to-public
partition migration, use the reviewed erase/write/whole-chip-verify sequence in
`flashing-and-migration.md` instead.

## Secrets

Do not write Wi-Fi passwords, tokens, or private keys into project documents,
logs, screenshots, shell history, or bug reports. Redact credentials from
captured BenTo output. An SSID may be recorded when necessary to understand the
network topology.
