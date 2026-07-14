# Creators Club project documentation

Last reviewed: 2026-07-13

This directory is the durable source of truth for the project. Chat messages
are working conversation; knowledge that should survive the conversation must
be recorded here.

## Documents

- [Current state](current-state.md) — what is connected, what is known now, and
  the next controlled step.
- [Hardware and firmware](hardware-and-firmware.md) — club hardware, installed
  firmware evidence, sensors, controls, and public firmware behavior.
- [BenTo and networking](bento-and-network.md) — BenTo's role, USB/serial and
  OSC protocols, Wi-Fi behavior, and the home lab network.
- [Architecture and design](architecture-and-design.md) — proposed performance
  system, design principles, software roles, and staged build plan.
- [Creative workflow](creative-workflow.md) — Yuki's movement-reactive scene
  catalog, button-driven rehearsal mode, composition model, and music-synced
  performance path.
- [Safety and recovery](safety-and-recovery.md) — rules for borrowed devices,
  backups, flashing, and reversible testing.
- [Flashing and migration](flashing-and-migration.md) — available firmware
  paths, the recommended factory-to-public canary procedure, verification gates,
  and rollback.
- [Lab log](lab-log.md) — dated observations and experiments, including negative
  results.

## Evidence labels

The documents use these labels where ambiguity matters:

- **Verified:** directly observed on the clubs, Mac, network, or BenTo.
- **Source-backed:** read from a named source or firmware implementation, but
  not necessarily confirmed on the factory firmware installed on these clubs.
- **Inference:** the best current interpretation of verified evidence.
- **Open question:** unknown and worth testing or asking the device owner.

## Maintenance rule

Every meaningful project session must update these documents. In particular,
`current-state.md` and `lab-log.md` should be updated before a session ends.
Never put Wi-Fi passwords or other secrets in the repository.

This is a public project record. Exact device MAC addresses, current DHCP
addresses, USB serial identifiers, machine-local paths, firmware binaries, and
flash backups remain in ignored local storage. Tracked documents use descriptive
placeholders such as `CLUB_0_MAC` and `CLUB_0_IP` where identity matters.
