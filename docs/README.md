# Creators Club project documentation

Last reviewed: 2026-07-17

This directory is the durable source of truth for the project. Chat messages
are working conversation; knowledge that should survive the conversation must
be recorded here.

## Documents

- [Current state](current-state.md) — what is connected, what is known now, and
  the next controlled step.
- [Motion Lab park guide](../output/pdf/motion-lab-quick-guide.pdf) — concise
  single-page controls and descriptions for the current 24 offline effects.
- [Motion Lab field guide](../output/pdf/motion-lab-field-guide.pdf) — the
  longer write-on guide for the earlier 20-effect revision, retained as design
  history.
- [Yuki project overview](yuki-project-overview.html) — a visual, nontechnical
  teaching page covering the creative goal, verified progress, artistic
  lessons, example studies, and questions for the next collaboration session.
- [Hardware and firmware](hardware-and-firmware.md) — club hardware, installed
  firmware evidence, sensors, controls, and public firmware behavior.
- [BenTo and networking](bento-and-network.md) — BenTo's role, USB/serial and
  OSC protocols, Wi-Fi behavior, and the home lab network.
- [Architecture and design](architecture-and-design.md) — proposed performance
  system, design principles, software roles, and staged build plan.
- [Field and theatre deployment](performance-deployment.md) — literal-field
  kit and runbook, simple audio-plus-club operation, full theatre cue/DMX
  boundaries, failure recovery, and the phone/dedicated-device roadmap.
- [ClubShow product and fixture patch](show-box-product.md) — the portable show
  appliance, logical roles, device inventory/calibration, emergency spare
  workflow, multi-vendor drivers, static fixtures, and open-node roadmap.
- [Creative workflow](creative-workflow.md) — Yuki's movement-reactive scene
  catalog, button-driven rehearsal mode, composition model, and music-synced
  performance path.
- [Simulation and pattern lab](simulation-and-pattern-lab.md) — the final-WASM
  Node simulator, interactive exact-WASM browser emulator, rapid visual pattern
  galleries, researched browser club-juggling engines, implemented Three.js
  three-club motion preview, separate single-club lighting/diffusion lab,
  fidelity boundaries, and one-club acceptance loop.
- [Vision pattern library](vision-pattern-library.md) — the consumer Club's 30
  standard and 50 bonus modes, kinetic vocabulary, visual references, and the
  project performance-visibility policy.
- [Theme page designs](theme-page-designs.md) — the authored circus-act brief
  for 78 browser sketches across twelve color/story collections.
- [Brightness calibration](brightness-calibration.md) — the global-versus-show
  brightness model, fixed-step test project, and compact feedback protocol.
- [Club Lab CLI](club-lab-cli.md) — the implemented V0 per-club calibration,
  four-pattern study, resumable feedback files, LLM export, and later adaptive
  tuning design.
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
