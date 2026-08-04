---
name: control-bento
description: Create, edit, validate, load, inspect, assign, preview, and stop BenTo `.bento` shows in the clubs repository using the installed BenTo application's existing OSC and OSCQuery control service. Use for BenTo show authoring, generator changes, direct `.bento` JSON edits, reloading a generated show without UI dragging, checking live sequences or props, assigning a sequence to a project-local prop ID, or running a short verified playback canary.
---

# Control BenTo

Use `.bento` files and their generators as the authoring surface. Use
`tools/bento_show_control.py` to control the running app and verify its observed
state. Do not build MCP or automate drag-and-drop for this workflow.

## Establish context

1. Work from the `clubs` repository root.
2. Read `AGENTS.md` and the relevant parts of `docs/current-state.md`.
3. For architecture or protocol questions, read the **BenTo automation control
   plane** section of `docs/architecture-and-design.md`.
4. Inspect the target show's README, generator, and existing `.bento` artifact
   before editing.

Keep a generator as the editable source of truth when one exists. Treat its
`.bento` output as a reproducible artifact. Preserve relative asset paths and
the BenTo 2.1 `models.sequences` / `SequenceBlock` schema used by the existing
shows.

## Author and validate

1. Change the generator or `.bento` JSON with the smallest necessary edit.
2. Regenerate the artifact when a generator exists.
3. Run the generator's built-in validation and any show-specific checks.
4. At minimum, validate JSON and changed Python:

   ```bash
   jq empty path/to/show.bento
   python3 -m py_compile path/to/changed_generator.py
   ```

5. Confirm referenced audio and other assets resolve relative to the show
   directory. Do not embed machine-specific absolute paths in portable shows.

Do not save discovered props into a portable show unless the user explicitly
wants project-local routing persisted.

## Connect to BenTo

First query the existing service:

```bash
python3 tools/bento_show_control.py status
```

The configured exploration installation uses OSC and OSCQuery HTTP on
`127.0.0.1:43000`. Port `10000` is prop feedback and is not a control port.

BenTo 2.1.0b6 may truncate the recursive sequence-manager JSON for a dense
timeline. The helper handles this narrowly: it matches shallow live summaries
against every sequence in the exact `.bento` path reported open, then verifies
transport through smaller live OSCQuery endpoints. A missing match still
fails status; do not treat truncation or UDP send success as acknowledgement.

If status cannot connect and BenTo is not running, launch the installed app
with the target file, wait for startup to settle, and retry status:

```bash
open -a /Applications/BenTo.app --args "/absolute/path/to/show.bento"
```

If BenTo is running but port `43000` is unavailable, report that **OSC Remote
Control** is disabled or failed to bind. Do not silently edit preferences. Do
not send the old custom `/codex/...` messages; they did not change observed
state in the installed build.

## Load or reload a show

Use an absolute path:

```bash
python3 tools/bento_show_control.py --timeout 10 open \
  "/absolute/path/to/show.bento"
python3 tools/bento_show_control.py status
```

Accept the load only when status reports the exact target path and the expected
sequence list. BenTo exposes its control listener before initial file loading
has necessarily settled, so do not send another open immediately after process
startup.

If open times out, inspect BenTo for an unsaved-document or modal dialog. Do not
discard or overwrite unsaved work. Preserve it with **Save Copy** or request a
decision from the user. The configured installation has **Ask to restore on
startup** disabled, but other dialogs can still block loading.

## Assign and preview

Never assume a prop ID. Run status immediately before assignment and use the
project-local Global ID currently reported for the intended prop.

Assign without playback:

```bash
python3 tools/bento_show_control.py assign \
  "Sequence Display Name" --prop-id 0
```

For a requested preview, announce the canary and start with one stationary prop,
muted or reduced audio, and a short duration:

```bash
python3 tools/bento_show_control.py play \
  "Sequence Display Name" --prop-id 0 --duration 5
python3 tools/bento_show_control.py status
```

Use `stop` after any preview started by the current task or when the user asks.
Do not stop playback that may have been started independently by the user:

```bash
python3 tools/bento_show_control.py stop
```

Treat CLI success as BenTo-side evidence: it verifies Active Block and transport
through HTTP readback. Record physical LED or audio behavior only when the user
observes it or another direct measurement proves it. Warn before previewing
shows with strobe or photosensitivity risk.

## Safety boundary

Ordinary show control may open files, assign Active Block, play, and stop. It
must not implicitly:

- save or overwrite the currently open document;
- use **Save All**, **Upload All**, or playback upload;
- change Global IDs with **Auto Assign IDs**;
- write club Wi-Fi or persistent settings;
- flash firmware, power off props, or delete files; or
- expose port `43000` on an untrusted network.

BenTo's enabled service is unauthenticated and binds wildcard interfaces even
though the helper targets localhost. Keep it enabled only on a trusted local or
isolated show network.

## Record the session

Follow the repository's docs-as-you-go rule in the same session:

- append experiments, failures, and results to `docs/lab-log.md`;
- update `docs/current-state.md` when the working state or next action changes;
- update architecture or show documentation when a durable decision changes;
- distinguish verified observation, source-backed behavior, inference, and open
  questions; and
- never record credentials, private device identifiers, or machine-specific
  private paths in public documentation.
