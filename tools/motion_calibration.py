#!/usr/bin/env python3
"""Collect reproducible motion ranges from one Creators Club.

The tool polls the credential-safe OSCQuery view and retains only live motion
values in memory. It does not read, print, or save Wi-Fi configuration. By
default it resolves a physical club label through the ignored local device
inventory.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import math
import sys
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "private" / "device-inventory.md"


def resolve_ip(club: str, explicit_ip: str | None) -> str:
    if explicit_ip:
        return explicit_ip
    if not INVENTORY.is_file():
        raise SystemExit("Local device inventory is missing; pass --ip instead.")
    for line in INVENTORY.read_text().splitlines():
        if not line.startswith("|"):
            continue
        cells = [cell.strip().strip("`") for cell in line.split("|")[1:-1]]
        if len(cells) >= 4 and cells[0] == club:
            return cells[3]
    raise SystemExit(f"Club {club} is not present in the local device inventory.")


def percentile(values: list[float], fraction: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    index = min(len(ordered) - 1, max(0, round((len(ordered) - 1) * fraction)))
    return ordered[index]


def vector_magnitude(values) -> float:
    return math.sqrt(sum(float(value) ** 2 for value in values))


def circular_span(values: list[float]) -> float:
    wrapped = sorted(value % 1.0 for value in values)
    if len(wrapped) < 2:
        return 0.0
    gaps = [wrapped[i + 1] - wrapped[i] for i in range(len(wrapped) - 1)]
    gaps.append(1.0 - wrapped[-1] + wrapped[0])
    return 1.0 - max(gaps)


def read_motion(ip: str):
    # config=0 omits credential-bearing configuration fields while preserving
    # live read-only motion values.
    with urllib.request.urlopen(f"http://{ip}/?config=0", timeout=2) as response:
        root = json.load(response)
    motion = root["CONTENTS"]["motion"]["CONTENTS"]
    return {
        name: item.get("VALUE", [])
        for name, item in motion.items()
        if name in {"activity", "projectedAngle", "orientation", "gyro", "linearAccel", "accel"}
    }


async def capture_stage(ip: str, label: str, seconds: float):
    scalar = defaultdict(list)
    vector = defaultdict(list)
    deadline = asyncio.get_running_loop().time() + seconds
    shown = None
    while asyncio.get_running_loop().time() < deadline:
        remaining = deadline - asyncio.get_running_loop().time()
        whole = max(0, math.ceil(remaining))
        if whole != shown:
            print(f"\r{label}: {whole:2d}s remaining", end="", flush=True)
            shown = whole
        try:
            values = await asyncio.to_thread(read_motion, ip)
        except Exception:
            await asyncio.sleep(0.1)
            continue
        for name, params in values.items():
            if name in {"activity", "projectedAngle"} and params:
                scalar[name].append(float(params[0]))
            elif name in {"orientation", "gyro", "linearAccel", "accel"} and len(params) >= 3:
                vector[name].append(tuple(float(value) for value in params[:3]))
        await asyncio.sleep(0.08)
    print(f"\r{label}: complete          ")
    return {"scalar": scalar, "vector": vector}


def stage_summary(name: str, data) -> str:
    activity = data["scalar"].get("activity", [])
    gyro = [vector_magnitude(v) for v in data["vector"].get("gyro", [])]
    angle = data["scalar"].get("projectedAngle", [])
    return (
        f"{name:<6} activity p50/p95/max "
        f"{percentile(activity, .50):.5f}/{percentile(activity, .95):.5f}/{max(activity, default=0):.5f}"
        f" | gyro p95 {percentile(gyro, .95):.2f}"
        f" | angle span {circular_span(angle):.3f}"
        f" | samples {len(activity)}"
    )


async def run(args: argparse.Namespace) -> int:
    ip = resolve_ip(args.club, args.ip)
    stages = [
        ("REST", args.rest_seconds, "Put the club down and keep it still."),
        ("SLOW", args.slow_seconds, "Move through slow full rotations and long-axis rolls."),
        ("ACTIVE", args.active_seconds, "Juggle normally, or make vigorous safe swings and spins."),
    ]
    results = {}
    for label, seconds, instruction in stages:
        await asyncio.to_thread(input, f"\n{instruction}\nPress Return to record {label} for {seconds:g}s: ")
        results[label] = await capture_stage(ip, label, seconds)

    for label in ("REST", "SLOW", "ACTIVE"):
        if not results[label]["scalar"].get("activity"):
            print("No activity feedback was received; calibration is incomplete.", file=sys.stderr)
            return 2

    rest = results["REST"]["scalar"]["activity"]
    slow = results["SLOW"]["scalar"]["activity"]
    active = results["ACTIVE"]["scalar"]["activity"]
    activity_floor = max(0.0005, percentile(rest, 0.99) * 1.5)
    useful = slow + active
    activity_ceiling = max(activity_floor + 0.005, percentile(useful, 0.90))

    print("\nMOTION CALIBRATION RESULT")
    for label in ("REST", "SLOW", "ACTIVE"):
        print(stage_summary(label, results[label]))
    print(
        "PASTE_BACK "
        f"activity_floor={activity_floor:.5f} "
        f"activity_ceiling={activity_ceiling:.5f} "
        f"rest_p99={percentile(rest, .99):.5f} "
        f"active_p95={percentile(active, .95):.5f}"
    )
    print("No settings were saved or changed.")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--club", default="2", help="Physical club label in private/device-inventory.md")
    parser.add_argument("--ip", help="Explicit club IP; never printed or stored")
    parser.add_argument("--rest-seconds", type=float, default=4)
    parser.add_argument("--slow-seconds", type=float, default=7)
    parser.add_argument("--active-seconds", type=float, default=10)
    return parser.parse_args()


if __name__ == "__main__":
    raise SystemExit(asyncio.run(run(parse_args())))
