#!/usr/bin/env python3
"""Club Lab V0: per-club calibration, motion studies, feedback, and export."""

from __future__ import annotations

import argparse
import asyncio
import glob
import hashlib
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from pythonosc.udp_client import SimpleUDPClient

from load_club_script import upload
from motion_calibration import (
    capture_stage,
    circular_span,
    percentile,
    read_motion,
    resolve_ip,
    vector_magnitude,
)

ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / "private" / "club-lab"
PROFILES = PRIVATE / "profiles"
SESSIONS = PRIVATE / "sessions"
EXPORTS = PRIVATE / "llm"
SERIAL_CAPTURES = ROOT / "private" / "serial-captures"
ARTIFACT = ROOT / "artifacts" / "club-lab-study.wasm"
MOTION_ARTIFACT = ROOT / "artifacts" / "motion-lab.wasm"
MANIFEST_PATH = ROOT / "studies" / "manifests" / "club-lab-study-v0.json"
STUDY_PATH = ROOT / "studies" / "definitions" / "club-lab-v0.json"
OSC_PORT = 9000

IP_RE = re.compile(r"(?<![\d.])(?:\d{1,3}\.){3}\d{1,3}(?![\d.])")
MAC_RE = re.compile(r"(?i)\b(?:[0-9a-f]{2}:){5}[0-9a-f]{2}\b")


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_json(path: Path) -> Any:
    return json.loads(path.read_text())


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n")


def credential_safe_tree(ip: str) -> dict[str, Any]:
    import urllib.request

    with urllib.request.urlopen(f"http://{ip}/?config=0", timeout=3) as response:
        return json.load(response)


def leaf(root: dict[str, Any], *parts: str) -> Any:
    item: dict[str, Any] = root
    for part in parts:
        item = item["CONTENTS"][part]
    values = item.get("VALUE", [])
    return values[0] if len(values) == 1 else values


def osc(ip: str, address: str, value: Any = None) -> None:
    client = SimpleUDPClient(ip, OSC_PORT)
    client.send_message(address, [] if value is None else value)


def demo_marker_summary(
    marker_text: str,
    pages: int,
    effects_per_page: int,
    address_base: int,
) -> tuple[list[int], list[int], list[int], bool, bool]:
    """Return expected, observed, missing, wrapped, and final-address evidence.

    A repeat of the first Demo marker proves the timer wrapped, but it cannot
    prove a renderer whose own address line never arrived.  Keep this parser
    independent of the serial transport so the strict marker gate is testable.
    """
    expected = [
        address_base + page * 100 + effect
        for page in range(pages)
        for effect in range(effects_per_page)
    ]
    markers = [int(value) for value in re.findall(r"(?<!\d)(\d{4})(?!\d)", marker_text)]
    observed = sorted({value for value in markers if value in expected})
    missing = [value for value in expected if value not in observed]
    wrapped = markers.count(expected[0]) >= 2
    reached_last = expected[-1] in markers
    return expected, observed, missing, wrapped, reached_last


def speak(message: str, enabled: bool = True) -> None:
    if not enabled:
        return
    try:
        subprocess.run(["/usr/bin/say", message], check=False)
    except OSError as exc:
        print(f"Audio prompt unavailable: {exc}", file=sys.stderr)


def profile_path(club: str) -> Path:
    return PROFILES / f"club-{club}.json"


def session_path(session_id: str) -> Path:
    safe = re.sub(r"[^A-Za-z0-9_.-]", "-", session_id)
    return SESSIONS / f"{safe}.jsonl"


def append_event(path: Path, event: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = {"at": utc_now(), **event}
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, sort_keys=True) + "\n")
        handle.flush()
        os.fsync(handle.fileno())


def load_events(path: Path) -> list[dict[str, Any]]:
    if not path.is_file():
        raise SystemExit(f"Session not found: {path.stem}")
    return [json.loads(line) for line in path.read_text().splitlines() if line.strip()]


def doctor(args: argparse.Namespace) -> int:
    import urllib.error

    ip = resolve_ip(args.club, args.ip)
    try:
        tree = credential_safe_tree(ip)
    except (TimeoutError, OSError, urllib.error.URLError):
        print(f"Club {args.club} | offline or unreachable | no live state read")
        print("No address, MAC, USB serial, Wi-Fi configuration, or credential was read or printed.")
        return 2
    # config=0 exposes live motion values but omits the credential/config-only
    # connected flag. Report only what this safe response actually proves.
    motion_readable = leaf(tree, "motion", "projectedAngle") is not None
    profile = profile_path(args.club)
    artifact = sha256(ARTIFACT)[:12] if ARTIFACT.is_file() else "missing"
    print(f"Club {args.club} | reachable | project firmware baseline stable 1.2.0")
    print(
        f"Motion telemetry {'readable' if motion_readable else 'unavailable'} | "
        f"battery {float(leaf(tree, 'battery', 'batteryLevel')) * 100:.0f}% | "
        f"charging {'yes' if leaf(tree, 'battery', 'charging') else 'no'}"
    )
    print(
        f"LEDs {int(leaf(tree, 'leds', 'strip1', 'count'))} | "
        f"global brightness {float(leaf(tree, 'leds', 'strip1', 'brightness')):.2f} | "
        f"local study build {artifact}"
    )
    print(f"Calibration profile {'present' if profile.is_file() else 'missing'} | READY")
    print("No address, MAC, USB serial, Wi-Fi configuration, or credential was read or printed.")
    return 0


def soak_effects(args: argparse.Namespace) -> int:
    """Clean-boot and observe one complete on-club Motion Lab demo cycle."""
    import serial

    artifact = args.artifact.resolve()
    script_name = args.script_name
    total_effects = args.pages * args.effects_per_page
    seconds = args.seconds if args.seconds is not None else total_effects * 10.0 + 8.0
    if not artifact.is_file():
        raise SystemExit(f"Motion Lab artifact is missing: {artifact}")
    if artifact.name != f"{script_name}.wasm":
        raise SystemExit(
            f"Artifact filename must match --script-name: expected {script_name}.wasm, got {artifact.name}"
        )
    if args.pages < 1 or args.effects_per_page < 1:
        raise SystemExit("--pages and --effects-per-page must both be positive")

    ip = resolve_ip(args.club, args.ip)
    if args.install:
        status = upload(ip, artifact)
        if status != 200:
            raise SystemExit(f"Motion Lab upload failed with HTTP {status}")
        print(
            f"Installed {script_name} ({artifact.stat().st_size} bytes, "
            f"{sha256(artifact)[:12]}) as the saved startup cartridge."
        )
        osc(ip, "/script/enabled", True)
        time.sleep(0.2)
        osc(ip, "/script/scriptAtLaunch", script_name)
        time.sleep(0.2)
        osc(ip, "/settings/saveSettings")
        time.sleep(0.8)

    ports = sorted(glob.glob("/dev/cu.usbmodem*") + glob.glob("/dev/cu.usbserial*"))
    if not ports:
        raise SystemExit("No USB serial club is connected.")

    SERIAL_CAPTURES.mkdir(parents=True, exist_ok=True)
    capture = SERIAL_CAPTURES / (
        f"club-{args.club}-{script_name}-soak-{datetime.now().strftime('%Y%m%dT%H%M%S')}.log"
    )
    raw: list[bytes] = []
    ser = serial.Serial(ports[0], 115200, timeout=0.05)

    def collect(seconds: float, destination: list[bytes] | None = None) -> bytes:
        chunks: list[bytes] = []
        deadline = time.monotonic() + seconds
        while time.monotonic() < deadline:
            chunk = ser.read(4096)
            if chunk:
                raw.append(chunk)
                chunks.append(chunk)
                if destination is not None:
                    destination.append(chunk)
        return b"".join(chunks)

    try:
        time.sleep(0.2)
        ser.reset_input_buffer()
        print("Clean-booting the saved cartridge; private boot text is captured but never printed...")
        osc(ip, "/restart")

        boot_text = ""
        boot_deadline = time.monotonic() + args.boot_wait
        while time.monotonic() < boot_deadline:
            chunk = ser.read(4096)
            if chunk:
                raw.append(chunk)
                boot_text += chunk.decode("utf-8", "replace")
                if "Guru Meditation" in boot_text:
                    break
                if "Running WebAssembly" in boot_text:
                    break
        if "Guru Meditation" in boot_text:
            print("FAIL: firmware panicked while loading the startup cartridge.")
            return_code = 2
        elif "Running WebAssembly" not in boot_text:
            print("INCONCLUSIVE: no WebAssembly-running marker arrived before the boot deadline.")
            return_code = 2
        else:
            print(
                f"Startup confirmed; observing {seconds:g}s "
                f"({total_effects} effects at 10s, then wrap)..."
            )
            runtime_chunks: list[bytes] = []
            start = time.monotonic()
            next_report = 30.0
            failure = ""
            while time.monotonic() - start < seconds:
                chunk = ser.read(4096)
                if chunk:
                    raw.append(chunk)
                    runtime_chunks.append(chunk)
                    recent = b"".join(runtime_chunks[-20:]).decode("utf-8", "replace")
                    if "Guru Meditation" in recent:
                        failure = "firmware panic"
                    elif "Low stack while running wasm" in recent:
                        failure = "firmware low-stack stop"
                    elif "ESP-ROM:" in recent or "\nrst:" in recent:
                        failure = "unexpected reboot"
                elapsed = time.monotonic() - start
                if elapsed >= next_report:
                    print(f"  {int(elapsed):3d}s: running")
                    next_report += 30.0
                if failure:
                    break

            runtime_text = b"".join(runtime_chunks).decode("utf-8", "replace")
            # init prints the first address immediately before the firmware's
            # "Running WebAssembly" line, so include boot text when proving
            # the later timed wrap produced the same address again.
            marker_text = boot_text + runtime_text
            expected, observed, missing_serial, wrapped, reached_last = demo_marker_summary(
                marker_text,
                args.pages,
                args.effects_per_page,
                args.address_base,
            )
            elapsed = time.monotonic() - start

            if failure:
                print(f"FAIL after {elapsed:.1f}s: {failure}.")
                return_code = 2
            # A timed wrap proves that the Demo clock kept advancing, but it
            # does not prove that every renderer was entered or visibly ran.
            # In particular, a prior V6 hardware soak omitted each E8 marker.
            # Keep that evidence boundary strict: any missing address is an
            # inconclusive physical canary, not a successful full-effect soak.
            elif elapsed + 0.5 < seconds or not wrapped or not reached_last or missing_serial:
                print(
                    f"INCONCLUSIVE after {elapsed:.1f}s: last={reached_last}, wrap={wrapped}, "
                    f"serial addresses={len(observed)}/{total_effects}; "
                    f"missing={','.join(str(value) for value in missing_serial) or 'none'}."
                )
                return_code = 2
            else:
                print(
                    f"PASS: all {total_effects} timed effects completed; "
                    "no stack stop, panic, or reboot."
                )
                print(
                    "MANUAL GATE: press the physical button once, confirm the page/effect flashes, "
                    "then gently exercise P1E1 while USB remains still."
                )
                return_code = 0
    finally:
        capture.write_bytes(b"".join(raw))
        ser.close()
        print(f"Private raw capture saved under {capture.relative_to(ROOT)}.")

    return return_code


def summarize_capture(data: dict[str, Any]) -> dict[str, Any]:
    activity = list(data["scalar"].get("activity", []))
    angle = list(data["scalar"].get("projectedAngle", []))
    gyro = [vector_magnitude(value) for value in data["vector"].get("gyro", [])]
    return {
        "samples": len(activity),
        "activity": {
            "p50": percentile(activity, 0.50),
            "p95": percentile(activity, 0.95),
            "p99": percentile(activity, 0.99),
            "max": max(activity, default=0.0),
        },
        "projected_angle_circular_span": circular_span(angle),
        "gyro_magnitude_p95": percentile(gyro, 0.95),
    }


async def calibrate_motion(args: argparse.Namespace) -> int:
    ip = resolve_ip(args.club, args.ip)
    audio = not getattr(args, "no_audio", False)
    print("Preparing sensor-only capture (stopping WASM and enabling the IMU)...")
    osc(ip, "/script/stop")
    await asyncio.sleep(0.25)
    # The component can still say enabled after its reader task has stopped.
    # Force a false->true edge so onEnabledChanged starts a fresh IMU task.
    osc(ip, "/motion/enabled", False)
    await asyncio.sleep(0.2)
    osc(ip, "/motion/enabled", True)
    await asyncio.sleep(0.25)
    # Stable 1.2.0 leaves this at None/Orientation in normal operation. All is
    # required for fresh gyro, acceleration, and activity telemetry.
    osc(ip, "/motion/sendLevel", 2)
    await asyncio.sleep(2.5)
    preflight_activity: list[float] = []
    preflight_gyro: list[float] = []
    for _ in range(8):
        values = await asyncio.to_thread(read_motion, ip)
        if values.get("activity"):
            preflight_activity.append(float(values["activity"][0]))
        if len(values.get("gyro", [])) >= 3:
            preflight_gyro.append(vector_magnitude(values["gyro"][:3]))
        await asyncio.sleep(0.08)
    if max(preflight_activity, default=0.0) == 0.0 and max(preflight_gyro, default=0.0) == 0.0:
        osc(ip, "/restart")
        raise SystemExit("Sensor preflight rejected: activity and gyro are still zero; no movement prompts were started.")
    print(
        f"Sensor preflight passed: activity max {max(preflight_activity, default=0.0):.5f}, "
        f"gyro magnitude max {max(preflight_gyro, default=0.0):.2f}."
    )
    stages = [
        ("rest", args.rest_seconds, "Put the club down and keep it still.", "Place the club flat and do not touch it."),
        ("roll", args.roll_seconds, "Slowly rotate the club around its long shaft.", "Pick up the club. Rotate it around its long shaft, like a screwdriver."),
        ("flip", args.flip_seconds, "Slowly rotate the whole club end-over-end like a clock hand.", "Rotate the whole club end over end like a clock hand, with the tip tracing a large circle."),
        ("active", args.active_seconds, "Juggle normally, or make vigorous safe swings and spins.", "Use normal juggling in a clear area, or vigorous controlled swings, spins, rolls, and flips."),
    ]
    captured: dict[str, Any] = {}
    try:
        for name, seconds, instruction, audio_instruction in stages:
            print(f"\n{instruction}")
            if args.step_through:
                await asyncio.to_thread(input, f"Press Return to record {name.upper()} for {seconds:g}s: ")
            else:
                await asyncio.to_thread(speak, f"Next is the {name} test. {audio_instruction} Get ready now.", audio)
            await asyncio.to_thread(
                speak,
                f"{name} test starts in 3, 2, 1, start.",
                audio,
            )
            captured[name] = await capture_stage(ip, name.upper(), seconds)
            await asyncio.to_thread(speak, f"Stop. {name} test complete.", audio)
        summaries = {name: summarize_capture(captured[name]) for name, _, _, _ in stages}
        for name in ("rest", "roll", "flip", "active"):
            summary = summaries[name]
            activity = summary["activity"]
            print(
                f"{name.upper():<6} activity p95/max {activity['p95']:.5f}/{activity['max']:.5f} | "
                f"gyro p95 {summary['gyro_magnitude_p95']:.2f} | "
                f"angle span {summary['projected_angle_circular_span']:.3f}"
            )
        if any(summary["samples"] == 0 for summary in summaries.values()):
            raise SystemExit("Calibration rejected: at least one stage received no activity samples.")
        active = summaries["active"]
        if active["activity"]["max"] <= 0.001 and active["gyro_magnitude_p95"] <= 0.5:
            raise SystemExit("Calibration rejected: ACTIVE activity and gyro remained effectively zero.")
        if summaries["rest"]["projected_angle_circular_span"] > 0.10:
            raise SystemExit("Calibration rejected: projected angle moved implausibly during REST.")
        roll_span = summaries["roll"]["projected_angle_circular_span"]
        flip_span = summaries["flip"]["projected_angle_circular_span"]
        if max(roll_span, flip_span) < 0.20:
            raise SystemExit("Calibration rejected: neither ROLL nor FLIP covered enough projected angle.")
        rest_p99 = summaries["rest"]["activity"]["p99"]
        useful = (
            list(captured["roll"]["scalar"]["activity"])
            + list(captured["flip"]["scalar"]["activity"])
            + list(captured["active"]["scalar"]["activity"])
        )
        floor = max(0.0005, rest_p99 * 1.5)
        ceiling = max(floor + 0.005, percentile(useful, 0.90))
        profile = {
            "schema_version": 1,
            "physical_club": args.club,
            "status": "measured",
            "measured_at": utc_now(),
            "source": "credential-safe OSCQuery GET /?config=0 with WASM stopped and motion enabled",
            "normalization": {
                "activity_floor": floor,
                "activity_ceiling": ceiling,
                "activity_curve": 0.65,
                "attack_gain": 0.34,
                "release_gain": 0.12,
                "projected_angle_offset": 0.0,
                "projected_angle_direction": 1.0,
            },
            "stages": summaries,
        }
        output = profile_path(args.club)
        write_json(output, profile)
        print(f"Saved measured Club {args.club} profile to {output.relative_to(ROOT)}")
        print(f"Activity floor {floor:.5f}; ceiling {ceiling:.5f}")
        return 0
    finally:
        print("Restarting into the already-saved Motion Lab cartridge...")
        osc(ip, "/restart")


def prepare_cartridge(args: argparse.Namespace) -> int:
    if not ARTIFACT.is_file():
        raise SystemExit("Study artifact is missing; run scenes/club-lab-study/build.sh first.")
    ip = resolve_ip(args.club, args.ip)
    status = upload(ip, ARTIFACT)
    if status != 200:
        raise SystemExit(f"Study upload failed with HTTP {status}")
    print(f"Uploaded verified study artifact ({ARTIFACT.stat().st_size} bytes, {sha256(ARTIFACT)[:12]}).")
    print("Temporarily saving Club Lab as the startup cartridge, then rebooting cleanly...")
    osc(ip, "/script/scriptAtLaunch", "club-lab-study")
    time.sleep(0.2)
    osc(ip, "/settings/saveSettings")
    time.sleep(0.5)
    osc(ip, "/restart")
    try:
        time.sleep(getattr(args, "boot_wait", 10.0))
    except KeyboardInterrupt:
        print("\nPreparation interrupted; restoring Motion Lab before exit...", file=sys.stderr)
        restore_startup(args)
        raise
    print("Club Lab should now be at pattern 1. Avoid BenTo/network control during the physical study.")
    print("The study or restore command will put the known Motion Lab startup back.")
    return 0


def restore_startup(args: argparse.Namespace) -> int:
    ip = resolve_ip(args.club, args.ip)
    restore_script = getattr(args, "restore_script", "motion-lab")
    print(f"Restoring the known startup cartridge '{restore_script}' and rebooting...")
    if restore_script == "motion-lab" and MOTION_ARTIFACT.is_file():
        status = upload(ip, MOTION_ARTIFACT)
        if status != 200:
            raise RuntimeError(f"Motion Lab upload failed with HTTP {status}")
        print(
            f"Uploaded current Motion Lab ({MOTION_ARTIFACT.stat().st_size} bytes, "
            f"{sha256(MOTION_ARTIFACT)[:12]})."
        )
    osc(ip, "/script/scriptAtLaunch", restore_script)
    time.sleep(0.2)
    osc(ip, "/settings/saveSettings")
    time.sleep(0.5)
    osc(ip, "/restart")
    time.sleep(getattr(args, "boot_wait", 10.0))
    print("Restore reboot sent. No post-boot network probe was made.")
    return 0


def study_parameters(club: str, manifest: dict[str, Any]) -> dict[str, float]:
    # These are the exact values compiled into V0. A measured profile is
    # exported beside the trials, but factory stable 1.2.0 cannot apply it at
    # runtime because its host command for the setParam export is absent.
    return {key: float(value) for key, value in manifest["defaults"].items()}


def ask_rating(label: str) -> int:
    while True:
        value = input(f"{label} (1-5): ").strip()
        if value in {"1", "2", "3", "4", "5"}:
            return int(value)
        print("Enter one number from 1 to 5.")


def ask_verdict() -> str:
    while True:
        value = input("Verdict [K]eep / [T]une / [D]rop: ").strip().lower()
        if value[:1] in {"k", "t", "d"}:
            return {"k": "keep", "t": "tune", "d": "drop"}[value[0]]
        print("Enter K, T, or D.")


def run_study(args: argparse.Namespace, resume_id: str | None = None) -> int:
    manifest = read_json(MANIFEST_PATH)
    study = read_json(STUDY_PATH)
    ip = resolve_ip(args.club, args.ip)
    if not args.no_prepare:
        prepare_cartridge(args)
    try:
        input("Safety: unplug USB before juggling or making large movements. Press Return when ready: ")
    except (KeyboardInterrupt, EOFError):
        print("\nStudy did not start; restoring Motion Lab...", file=sys.stderr)
        restore_startup(args)
        return 130
    session_id = resume_id or args.session_id or f"{datetime.now().strftime('%Y%m%dT%H%M%S')}-club{args.club}"
    path = session_path(session_id)
    events = load_events(path) if path.is_file() else []
    completed = {event["pattern_id"] for event in events if event.get("event") == "trial_completed"}
    params = study_parameters(args.club, manifest)
    current_pattern = 0
    if not events:
        append_event(
            path,
            {
                "event": "session_started",
                "session_id": session_id,
                "physical_club": args.club,
                "study_id": study["study_id"],
                "cartridge_sha256": sha256(ARTIFACT),
                "manifest_sha256": sha256(MANIFEST_PATH),
                "profile_sha256": sha256(profile_path(args.club)) if profile_path(args.club).is_file() else None,
            },
        )
    try:
        for pattern in study["patterns"]:
            if pattern["id"] in completed:
                continue
            cartridge_pattern = next(item for item in manifest["patterns"] if item["id"] == pattern["id"])
            target_pattern = int(cartridge_pattern["index"])
            clicks = (target_pattern - current_pattern) % 4
            if clicks:
                input(
                    f"\nShort-click the club button {clicks} time{'s' if clicks != 1 else ''} "
                    f"to select {pattern['id']}, then press Return here: "
                )
            current_pattern = target_pattern
            append_event(
                path,
                {
                    "event": "trial_presented",
                    "session_id": session_id,
                    "pattern_id": pattern["id"],
                    "pattern_index": cartridge_pattern["index"],
                    "parameters": params,
                    "selection_transport": "physical-button",
                },
            )
            print(f"\n[{cartridge_pattern['index'] + 1}/4] {pattern['id']}")
            print(pattern["movement_prompt"])
            input("Press Return after you have observed it: ")
            visibility = ask_rating("Visibility")
            controllability = ask_rating("Controllability")
            delight = ask_rating("Delight")
            verdict = ask_verdict()
            tags: list[str] = []
            if verdict == "tune":
                print("Tags: dim, too-bright, weak-response, twitchy, laggy, stepped,")
                print("      wrong-axis, confusing, poor-color, loses-silhouette, unsafe, other")
                tags = [tag.strip() for tag in input("Comma-separated tags: ").split(",") if tag.strip()]
            note = input("Optional note (Return to skip): ").strip()
            append_event(
                path,
                {
                    "event": "trial_completed",
                    "session_id": session_id,
                    "physical_club": args.club,
                    "pattern_id": pattern["id"],
                    "pattern_index": cartridge_pattern["index"],
                    "movement_prompt": pattern["movement_prompt"],
                    "parameters": params,
                    "selection_transport": "physical-button",
                    "ratings": {
                        "visibility": visibility,
                        "controllability": controllability,
                        "delight": delight,
                    },
                    "verdict": verdict,
                    "tags": tags,
                    "note": note,
                },
            )
        append_event(path, {"event": "session_completed", "session_id": session_id})
        print(f"\nStudy complete. Session: {session_id}")
    except (KeyboardInterrupt, EOFError):
        append_event(path, {"event": "session_checkpointed", "session_id": session_id, "reason": "user_exit"})
        print(f"\nCheckpoint saved. Resume with: python3 tools/club_lab.py study resume {session_id} --club {args.club}")
        return_code = 130
    else:
        return_code = 0
    finally:
        print("Restoring the known Motion Lab startup with a clean reboot...")
        try:
            restore_startup(args)
        except Exception as exc:
            print(f"Restore reboot was sent but return was not confirmed: {exc}", file=sys.stderr)
    return return_code


def sanitize_text(value: str) -> str:
    return MAC_RE.sub("<redacted-mac>", IP_RE.sub("<redacted-address>", value))


def export_session(args: argparse.Namespace) -> int:
    path = session_path(args.session_id)
    events = load_events(path)
    start = next((event for event in events if event.get("event") == "session_started"), None)
    if start is None:
        raise SystemExit("Session has no session_started event.")
    trials = [event for event in events if event.get("event") == "trial_completed"]
    safe_trials = []
    for trial in trials:
        copy = dict(trial)
        copy["note"] = sanitize_text(str(copy.get("note", "")))
        safe_trials.append(copy)
    out = EXPORTS / args.session_id
    out.mkdir(parents=True, exist_ok=True)
    profile = profile_path(str(start["physical_club"]))
    write_json(out / "calibration-profiles.json", [read_json(profile)] if profile.is_file() else [])
    write_json(out / "pattern-manifest.json", read_json(MANIFEST_PATH))
    write_json(out / "trials.json", safe_trials)
    write_json(
        out / "manifest.json",
        {
            "schema_version": 1,
            "exported_at": utc_now(),
            "session_id": args.session_id,
            "study_id": start["study_id"],
            "physical_club": start["physical_club"],
            "source_hashes": {
                "cartridge": sha256(ARTIFACT),
                "study": sha256(STUDY_PATH),
                "pattern_manifest": sha256(MANIFEST_PATH),
                "calibration_profile": sha256(profile) if profile.is_file() else None,
            },
            "trial_count": len(safe_trials),
        },
    )
    rows = ["# Club Lab feedback summary", "", f"Session: `{args.session_id}`", "", "| Pattern | Visibility | Control | Delight | Verdict | Tags |", "| --- | ---: | ---: | ---: | --- | --- |"]
    for trial in safe_trials:
        rating = trial["ratings"]
        rows.append(
            f"| {trial['pattern_id']} | {rating['visibility']} | {rating['controllability']} | "
            f"{rating['delight']} | {trial['verdict']} | {', '.join(trial.get('tags', [])) or '-'} |"
        )
    (out / "feedback-summary.md").write_text("\n".join(rows) + "\n")
    questions = []
    if not profile.is_file():
        questions.append("- This club has no measured calibration profile; defaults were used.")
    missing = 4 - len(safe_trials)
    if missing > 0:
        questions.append(f"- {missing} of 4 pattern trials are still incomplete.")
    for trial in safe_trials:
        if trial["verdict"] == "tune":
            questions.append(f"- Which one-variable A/B test should tune `{trial['pattern_id']}` first?")
    if not questions:
        questions.append("- No blocking question; propose evidence-linked keep/tune/drop actions.")
    (out / "open-questions.md").write_text("# Open questions\n\n" + "\n".join(questions) + "\n")
    print(f"Exported {len(safe_trials)} trials to {out.relative_to(ROOT)}")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    doctor_parser = sub.add_parser("doctor", help="Read-only, credential-safe club preflight")
    doctor_parser.add_argument("--club", default="2")
    doctor_parser.add_argument("--ip")
    doctor_parser.set_defaults(handler=doctor)

    soak = sub.add_parser("soak-effects", help="Clean-boot and verify every effect in one Motion Lab cartridge")
    soak.add_argument("--club", default="2")
    soak.add_argument("--ip")
    soak.add_argument("--install", action="store_true", help="Upload and save the current Motion Lab before testing")
    soak.add_argument("--artifact", type=Path, default=MOTION_ARTIFACT)
    soak.add_argument("--script-name", default="motion-lab")
    soak.add_argument("--pages", type=int, default=3)
    soak.add_argument("--effects-per-page", type=int, default=8)
    soak.add_argument("--address-base", type=int, default=4000)
    soak.add_argument("--seconds", type=float)
    soak.add_argument("--boot-wait", type=float, default=30.0)
    soak.set_defaults(handler=soak_effects)

    calibrate = sub.add_parser("calibrate", help="Create a per-club profile")
    calibrate_sub = calibrate.add_subparsers(dest="calibration", required=True)
    motion = calibrate_sub.add_parser("motion")
    motion.add_argument("--club", default="2")
    motion.add_argument("--ip")
    motion.add_argument("--rest-seconds", type=float, default=4)
    motion.add_argument("--roll-seconds", type=float, default=7)
    motion.add_argument("--flip-seconds", type=float, default=7)
    motion.add_argument("--active-seconds", type=float, default=10)
    motion.add_argument("--no-audio", action="store_true", help="Disable macOS say start/stop prompts")
    motion.add_argument("--step-through", action="store_true", help="Wait for Return before each stage")
    motion.set_defaults(handler=calibrate_motion)

    prepare = sub.add_parser("prepare", help="Upload, clean-reboot, and transiently load the V0 cartridge")
    prepare.add_argument("--club", default="2")
    prepare.add_argument("--ip")
    prepare.add_argument("--boot-wait", type=float, default=10.0)
    prepare.set_defaults(handler=prepare_cartridge)

    restore = sub.add_parser("restore", help="Reboot into the already-saved startup script")
    restore.add_argument("--club", default="2")
    restore.add_argument("--ip")
    restore.add_argument("--restore-script", default="motion-lab")
    restore.add_argument("--boot-wait", type=float, default=10.0)
    restore.set_defaults(handler=restore_startup)

    study_parser = sub.add_parser("study", help="Run or resume structured pattern feedback")
    study_sub = study_parser.add_subparsers(dest="study_command", required=True)
    run = study_sub.add_parser("run")
    run.add_argument("--club", default="2")
    run.add_argument("--ip")
    run.add_argument("--session-id")
    run.add_argument("--no-prepare", action="store_true")
    run.add_argument("--restore-script", default="motion-lab")
    run.add_argument("--boot-wait", type=float, default=10.0)
    run.set_defaults(handler=run_study)
    resume = study_sub.add_parser("resume")
    resume.add_argument("session_id")
    resume.add_argument("--club", default="2")
    resume.add_argument("--ip")
    resume.add_argument("--no-prepare", action="store_true")
    resume.add_argument("--restore-script", default="motion-lab")
    resume.add_argument("--boot-wait", type=float, default=10.0)
    resume.set_defaults(handler=lambda args: run_study(args, args.session_id))

    export = sub.add_parser("export", help="Create a privacy-scrubbed LLM evidence bundle")
    export.add_argument("session_id")
    export.add_argument("--for-llm", action="store_true", required=True)
    export.set_defaults(handler=export_session)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    result = args.handler(args)
    if asyncio.iscoroutine(result):
        return asyncio.run(result)
    return int(result)


if __name__ == "__main__":
    raise SystemExit(main())
