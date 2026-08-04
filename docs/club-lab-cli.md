# Club Lab CLI design

Last reviewed: 2026-07-15

## Goal

Build one human-in-the-loop CLI that can:

1. measure each physical club's sensor and brightness behavior;
2. present repeatable pattern experiments;
3. collect concise structured feedback plus optional notes;
4. preserve every trial in a resumable session file;
5. export a compact evidence bundle for an LLM;
6. turn an accepted revision back into a one-club canary and, later, a
   three-club deployment.

Working name: **Club Lab**. V0 provides the repo-local `tools/club-lab`
launcher over `tools/club_lab.py`.

The CLI is not primarily a firmware flasher, show player, or generic BenTo
replacement. It is a reproducible instrument for learning which motion-to-light
mappings work and why.

## Central design decision: separate calibration from taste

Each club may have different bias, noise, useful dynamic range, axis alignment,
brightness, or battery behavior. Luke and Yuki may also have different movement
styles and artistic preferences. Those are different variables and must not be
collapsed into one per-club fork of every effect.

```text
raw physical club signals
  -> per-club calibration profile
  -> normalized artistic signals (angle, activity, spin, throw)
  -> shared pattern + explicit trial parameters
  -> human observation and ratings
  -> LLM evidence bundle
  -> revised shared patterns and, only if justified, profile changes
```

The preferred outcome is one shared pattern library plus three small calibration
profiles. A club-specific artistic fork is an exception supported by repeated
evidence, not the default.

## Evidence boundary

### Verified now

- Physical labels `0`, `1`, and `2` identify the three project clubs without
  exposing network identifiers.
- Stable 1.2.0 exposes credential-safe live motion values through OSCQuery.
- `tools/motion_calibration.py` can already collect REST/SLOW/ACTIVE ranges.
- `tools/brightness_calibration.py` already demonstrates keyboard-driven,
  structured perceptual calibration.
- `tools/load_club_script.py` can require a complete loader signature before
  persisting a WASM launch name.
- Club 2 can boot the 1,693-byte V0 cartridge, discover
  `init / update / stop / setParam`, call `init`, and remain free of the
  low-stack stop during a clean-boot serial canary.
- The V0 CLI can produce six privacy-scrubbed LLM handoff files from a resumable
  append-only session.

### Source/binary mismatch now live-verified

Stable Bentuino source exposes `/script/setScriptParam index value`. The WASM
loader searches for an exported `setParam` function and reports it alongside
`init / update / stop`. Factory stable 1.2.0 did find the export, but rejected
the exact host command with `Param not found` and `Command was not handled`.
V0 does not depend on it. One physical short click advances/wraps the four
patterns; the numbered contract remains versioned for a compatible future
runtime. The inspected source also checks for `stop` before calling `setParam`,
so cartridges continue exporting both.

## V0 commands now implemented

```sh
tools/club-lab doctor --club 2
tools/club-lab soak-effects --club 2 --install
tools/club-lab soak-effects --club 2 --install \
  --artifact artifacts/motion-lab-v6.wasm \
  --script-name motion-lab-v6 --pages 5 --effects-per-page 8 \
  --address-base 6000
tools/club-lab calibrate motion --club 2
tools/club-lab study run --club 2
tools/club-lab study resume SESSION_ID --club 2
tools/club-lab export SESSION_ID --for-llm
tools/club-lab restore --club 2
```

`study run` temporarily saves `club-lab-study` as the startup cartridge and
reboots. This is required because a network upload/debug session can trip the
installed firmware's WASM stack guard. The physical trial then uses no network
control. Normal completion, checkpoint exit, or `restore` saves the known
`motion-lab` startup back and reboots. No firmware image is flashed.

V0 stores exact compiled parameters rather than applying the measured profile
at runtime. Profiles are still measured, versioned privately, and included in
the LLM bundle so the next compatible cartridge/firmware revision can consume
them.

`soak-effects` is the hardware acceptance path for a named cartridge. Its
defaults retain the 24-effect `motion-lab.wasm` workflow. Explicit artifact,
script name, page/effect count, and address-base options run the same gate for
V6 or a later cartridge; duration defaults to ten seconds per effect plus eight
seconds to prove wrap. It fails on the installed low-stack message, ESP32 panic,
unexpected reboot, a missing address marker (including any E8), missing final
effect, or missing wrap. A timed wrap alone does not prove the omitted renderer
ran or looked correct.

The tool no longer injects button values. Physical-club trials showed synthetic
serial presses grouping unpredictably and resetting to P1E1, so they are not
valid navigation evidence. After a passive renderer soak passes, the operator
must press the physical button once and confirm the address flashes and P1E1
response. Boot serial stays under ignored `private/serial-captures/` and is
never printed because it can contain network credentials.

## Proposed command surface

```text
club-lab doctor --club 2
club-lab calibrate motion --club 2
club-lab calibrate brightness --club 2
club-lab study run studies/motion-screen-v1.yaml --club 2
club-lab study resume <session-id>
club-lab study summarize <session-id>
club-lab export <session-id> --for-llm
club-lab deploy <revision> --club 2 --canary
club-lab compare --clubs 0,1,2 --profile normalized-unison
```

`doctor` is read-only. Reachable clubs report filtered motion, battery, LED,
brightness, local-build, and profile state without printing an address or
identifier. An offline/timeout result is a concise two-line status with exit
code 2, not a Python traceback. On factory stable 1.2.0, `study run` must make a
bounded and reversible startup-script save because transient network loading is
not a stable runtime. It records/restores the known `motion-lab` launch name and
does not change firmware. Later firmware should return study selection to a
truly transient path.

## Guided study workflow

### Phase 0: preflight

The CLI should show one compact readiness panel:

```text
Club 2 | firmware 1.2.0 | motion connected | battery 74%
Brightness 0.90 live / 0.50 boot | Motion Lab Study r3 | READY
```

It verifies physical label, firmware, motion connectivity, battery, current
global brightness, expected script hash, and loader/runtime health. Exact IP,
MAC, and USB identifiers stay private and never appear in session exports.

### Phase 1: per-club physical calibration

Use controlled movements rather than generic “wave it around”:

- rest on a stable surface;
- slow end-over-end rotation;
- slow long-axis roll;
- controlled pendulum swing;
- ordinary single throw;
- ordinary double throw;
- vigorous but safe juggling sample.

Capture useful percentiles, not only minimum and maximum. A single impact should
not define the entire response curve. Candidate profile fields include:

- activity rest `p99`, slow `p50/p95`, active `p50/p95`;
- activity floor, ceiling, gamma, attack, and release;
- projected-angle offset, direction, circular span, and stationary jitter;
- yaw/pitch/roll offset, axis sign, range, and discontinuities;
- gyro bias/noise and movement percentiles;
- throw-state detection frequency and confusion notes;
- live and post-reboot global brightness;
- per-color comfortable visibility floors.

V0 captures REST, long-axis ROLL, end-over-end FLIP, and ACTIVE as separate
stages. By default macOS `say` announces each transition, a three-second start,
and the stop, then proceeds automatically so the performer does not need to
watch the terminal. `--step-through` restores a Return gate before each stage.
Before polling, the CLI
stops WASM and enables the motion component directly; this avoids a stopped
script disabling the IMU when stable 1.2.0's network/stack guard fires. Zero
ACTIVE sensors and implausible REST/rotation spans are rejected rather than
saved as calibration. It also forces an enabled false→true edge and
`sendLevel=All`, then requires a live activity/gyro preflight before starting.

### Phase 2: rapid pattern screening

Show one representative version of each pattern. Keep the required response
small enough that 20 patterns do not become an interrogation.

Core ratings:

1. **Visibility** `1-5`: can the prop always be tracked in a dark room?
2. **Controllability** `1-5`: can the performer deliberately reproduce the
   visual response?
3. **Delight** `1-5`: is the result artistically exciting?
4. **Verdict**: `Keep`, `Tune`, or `Drop`.

If the verdict is `Tune`, ask for one or more fast problem tags:

```text
dim | too-bright | weak-response | twitchy | laggy | stepped
wrong-axis | confusing | poor-color | loses-silhouette | unsafe | other
```

Free text is optional. The tags give the LLM consistent evidence even when the
note is only “almost good.”

### Phase 3: adaptive tuning

Only `Tune` candidates receive more trials. Change one primary dimension at a
time:

- sensitivity or deadband;
- attack/release smoothing;
- minimum and maximum brightness;
- color/palette;
- spatial density or body/handle balance;
- response direction or axis;
- pulse, wave, or trail speed.

Use randomized A/B labels instead of showing raw parameter values. “A feels
better than B” is often easier and less biased than asking whether sensitivity
should be `0.42` or `0.57`. Include an occasional repeated control trial to
measure rating consistency.

### Phase 4: cross-club validation

After individual profiles exist, run the same normalized pattern on Clubs 0,
1, and 2:

- one at a time for hardware comparison;
- all together for visual unison;
- during juggling for residual differences.

If the normalized outputs still differ, capture that as calibration evidence.
Do not immediately create three artistic variants.

## Terminal interaction

The first version should remain a normal terminal program, not a browser or MCP
service. It can reuse the robust raw-key techniques from the brightness tool and
add a simple full-screen panel later.

Suggested keys during a trial:

```text
Space  start/hold trial          R  replay marker and trial
Left   previous A/B variant      Right  next A/B variant
1-5    rating                    K/T/D  verdict
N      optional note             Enter  save and continue
Q      save checkpoint and exit safely
```

The screen must always show physical club label, pattern ID/revision, movement
instruction, and whether the V0 startup swap is active. It should never require
the user to count hidden parameter steps.

## Parameterized study cartridge

The V0 `club-lab-study.wasm` contains the pattern library and exports:

```text
init()
update()
stop()
setParam(index, value)
```

The numbered contract is implemented in the cartridge and manifest, but the
factory host cannot invoke it. V0 uses physical-button pattern selection; a
future compatible runtime can use `/script/setScriptParam` without changing the
contract:

| Index | Meaning |
| ---: | --- |
| 0 | pattern index |
| 1 | activity floor |
| 2 | activity ceiling |
| 3 | activity gamma/curve |
| 4 | attack gain |
| 5 | release gain |
| 6 | projected-angle offset |
| 7 | projected-angle direction/sign |
| 8 | authored visibility floor |
| 9 | peak brightness |
| 10 | palette/variant index |
| 11 | animation/spatial speed |

The contract belongs in a versioned manifest. The CLI must reject a cartridge
whose parameter-contract version or hash does not match the study definition.

## Study definition

A tracked YAML or JSON file should define the experiment without containing
device addresses:

```yaml
schema_version: 1
study_id: motion-screen-v1
cartridge: club-lab-study-r1
clubs: [0, 1, 2]
patterns:
  - id: activity-flame
    movement_prompt: still, slow swing, then ordinary cascade
    variants:
      sensitivity: [low, medium, high]
      smoothing: [responsive, balanced]
questions: [visibility, controllability, delight, verdict]
randomize_variants: true
repeat_controls: 2
```

Human-facing labels stay descriptive; exact numeric values live in the
versioned cartridge manifest so blinded A/B trials remain possible.

## Data layout and privacy

The repository is public. Raw session notes should default to ignored storage
because free text may mention people, venues, or private context.

```text
private/club-lab/sessions/<session-id>.jsonl     append-only raw events
private/club-lab/sensor/<session-id>.jsonl      optional high-rate samples
private/club-lab/llm/<session-id>/               compact LLM bundle

profiles/clubs/club-0.json                       approved public-safe profile
profiles/clubs/club-1.json
profiles/clubs/club-2.json
studies/definitions/*.yaml                       tracked study designs
studies/manifests/*.json                         pattern/parameter contracts
studies/results/*.json                           explicitly promoted summaries
```

Calibration profiles use physical label only. They never store IP, MAC, USB
serial, Wi-Fi credentials, or a flash dump. Promotion from raw session to a
tracked result is explicit and runs the same privacy scan used elsewhere in the
project.

## Append-only session schema

JSON Lines makes every answer crash-safe and allows exact resume. Suggested
event types:

```text
session_started
preflight_observed
calibration_stage_started
sensor_summary_recorded
trial_presented
rating_recorded
note_recorded
trial_completed
session_checkpointed
session_completed
```

Every trial event records:

- session and opaque trial ID;
- physical club label;
- study, cartridge, manifest, source, and calibration-profile revisions;
- pattern ID and hidden variant ID;
- exact numeric parameters in the private record;
- movement prompt and environment context;
- sensor summary during the observation window;
- ratings, verdict, tags, optional note, and response time;
- whether the trial was interrupted, replayed, or repeated.

Never overwrite a rating. A correction is a later event referring to the prior
event. Derived summaries can be regenerated from the event log.

## LLM handoff contract

`club-lab export <session> --for-llm` should create a compact folder containing:

```text
manifest.json                 exact versions and hashes
calibration-profiles.json     public labels and normalized ranges
pattern-manifest.json         tested patterns and numeric variants
feedback-summary.md           human-readable synthesis
trials.json                   structured ratings and tags
open-questions.md             contradictions and missing evidence
```

The default bundle should summarize sensor time series rather than include every
sample. Raw samples remain available when a specific anomaly needs diagnosis.

The LLM's revision response should be equally structured:

- keep/tune/drop decision for each pattern;
- proposed parameter or code change;
- evidence events supporting the change;
- confidence and unresolved contradiction;
- simulator/regression tests required;
- one-club canary order and rollback artifact.

The LLM should not automatically persist a build merely because it generated
one. Club Lab runs offline tests, validates the manifest/hash contract, loads
one canary transiently, gathers physical acceptance, and only then offers a
separate persist action.

## Why files before MCP

The first useful version does not need MCP. Versioned files are auditable,
diffable, resumable, and easy for Codex to inspect directly. An MCP server may
later expose `list_sessions`, `get_profile`, `get_feedback_summary`, and
`launch_trial`, but it should wrap the same files and CLI engine rather than
become a second source of truth.

## Safety and cleanup

- Default to one-club canaries.
- Never flash firmware during a study run.
- Never juggle while attached to USB.
- Cap trial brightness and warn before sustained white/high-output tests.
- Record battery and global brightness so comparisons are not confounded.
- V0 explicitly announces its temporary startup-cartridge save. On normal
  completion or checkpoint exit it saves the known Motion Lab startup back and
  reboots; `club-lab restore` is the manual recovery command.
- Checkpoint after every trial so `Ctrl-C`, Wi-Fi loss, or a battery shutdown is
  resumable.
- Require a complete loader signature and matching hash before a new cartridge
  can participate in a study.

## Staged implementation

### V0: four-pattern end-to-end slice — implemented

1. Add `club-lab doctor` using the existing private inventory and OSCQuery.
2. Implement promotion of motion calibration output into a versioned Club 2
   profile. No real movement profile has been captured yet.
3. Build a four-pattern study cartridge; the `setParam` canary was correctly
   rejected by the installed host, so physical-button selection is implemented.
4. Run visibility/controllability/delight/verdict questions.
5. Append every event to one private JSONL session.
6. Export one LLM-ready Markdown/JSON bundle.

The software and live boot boundaries are complete. The first real movement
profile, four physical ratings, and resulting non-synthetic LLM bundle are the
next hands-on session.

### V1: full pattern screening

- all 20 Motion Lab effects;
- adaptive `Tune` branches;
- A/B randomization and repeat controls;
- resume and session-summary commands;
- profile and study schema validation.

### V2: three-club normalization

- per-club profiles;
- sequential and simultaneous comparison;
- residual-difference report;
- shared-pattern versus justified per-club override decisions.

### V3: revision and deployment pipeline

- LLM bundle and structured revision plan;
- automatic simulator/regression invocation;
- transient one-club canary;
- accepted revision manifest, rollback, and explicit persistence workflow.

## Open questions

1. Which future firmware revision should expose `/script/setScriptParam`, and
   can it do so without reintroducing the current stack-guard failure?
2. Which signals remain useful and consistent when the club is airborne rather
   than hand-held?
3. Should brightness/color calibration be one performer-independent profile or
   a combination of device, venue, and performer profiles?
4. How many questions can Luke and Yuki answer per pattern before fatigue makes
   ratings less reliable?
5. Should raw free-text sessions remain permanently private, or should Club Lab
   offer an interactive redaction/promotion step for public research results?
