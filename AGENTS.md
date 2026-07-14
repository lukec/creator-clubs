# Project instructions

This workspace is the durable engineering record for the Flowtoys Creators Club
project.

After every investigation, experiment, design discussion, implementation, or
decision, update the relevant files under `docs/` in the same working session.
Do not leave important knowledge only in chat history.

Documentation rules:

- Separate **verified observation**, **source-backed behavior**, **inference**,
  and **open question**. Never turn a color or other ambiguous symptom into a
  fact without evidence.
- Add experiments and results to `docs/lab-log.md` with a date. Record failed
  paths as well as successful ones so they are not repeated.
- Update `docs/current-state.md` whenever the working state or next action
  changes.
- Record architectural conclusions and their rationale in
  `docs/architecture-and-design.md`.
- Record commands, protocol details, device identifiers, versions, and source
  paths when they are useful for reproducing a result.
- Never record passwords, private keys, tokens, or other secrets. SSID names may
  be recorded when they are relevant; credentials may not.
- This repository is public. Keep exact MAC addresses, DHCP addresses, USB
  serial identifiers, machine-specific paths, flash dumps, and downloaded
  firmware under ignored local paths such as `private/`, `backups/`, and
  `artifacts/`. Use descriptive placeholders in tracked documentation.
- Yuki bought these clubs for a joint Luke/Yuki creative-development
  project. Preserve the installed firmware and settings unless Luke explicitly
  authorizes a mutating operation. Follow `docs/safety-and-recovery.md`.
- Prefer the actual device, logs, packet behavior, source code, and generated
  files over assumptions or generic product documentation.
