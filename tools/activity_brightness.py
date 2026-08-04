#!/usr/bin/env python3
"""Map a Creators Club's motion activity to transient LED brightness.

The controller reads the credential-safe OSCQuery snapshot (config=0) and
sends only /leds/strip1/brightness over OSC/UDP. It restores the brightness
observed at startup when stopped normally.
"""

from __future__ import annotations

import argparse
import json
import math
import socket
import struct
import sys
import time
import urllib.error
import urllib.request
from typing import Any, Iterator


ACTIVITY_PATH = "/motion/activity"
BRIGHTNESS_PATH = "/leds/strip1/brightness"


def walk_objects(value: Any) -> Iterator[dict[str, Any]]:
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk_objects(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_objects(child)


def read_snapshot(host: str, timeout: float) -> dict[str, float]:
    request = urllib.request.Request(
        f"http://{host}/?config=0",
        headers={"Connection": "close"},
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        document = json.load(response)

    result: dict[str, float] = {}
    for item in walk_objects(document):
        full_path = item.get("FULL_PATH")
        values = item.get("VALUE")
        if full_path in (ACTIVITY_PATH, BRIGHTNESS_PATH) and values:
            result[full_path] = float(values[0])
    return result


def osc_float(address: str, value: float) -> bytes:
    def padded(text: str) -> bytes:
        data = text.encode("utf-8") + b"\0"
        return data + b"\0" * ((-len(data)) % 4)

    return padded(address) + padded(",f") + struct.pack(">f", value)


def send_brightness(sock: socket.socket, host: str, value: float) -> None:
    sock.sendto(osc_float(BRIGHTNESS_PATH, value), (host, 9000))


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("host", help="Club hostname or IP address")
    parser.add_argument("--rate", type=float, default=10.0, help="Poll/send rate in Hz")
    parser.add_argument("--idle", type=float, default=0.0035, help="Activity at rest")
    parser.add_argument("--active", type=float, default=0.080, help="Activity mapped to maximum")
    parser.add_argument("--minimum", type=float, default=0.15, help="Brightness floor")
    parser.add_argument("--maximum", type=float, default=0.90, help="Brightness ceiling")
    parser.add_argument("--attack", type=float, default=0.08, help="Brightening time constant")
    parser.add_argument("--release", type=float, default=0.30, help="Dimming time constant")
    parser.add_argument("--timeout", type=float, default=0.8, help="HTTP timeout in seconds")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.rate <= 0 or args.active <= args.idle:
        raise SystemExit("rate must be positive and active must exceed idle")

    initial = read_snapshot(args.host, args.timeout)
    if ACTIVITY_PATH not in initial or BRIGHTNESS_PATH not in initial:
        raise SystemExit("club snapshot did not contain activity and brightness")

    original_brightness = initial[BRIGHTNESS_PATH]
    brightness = original_brightness
    period = 1.0 / args.rate
    last_time = time.monotonic()
    last_report = 0.0
    failures = 0
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    print(
        f"activity-to-brightness active; original={original_brightness:.3f}, "
        f"range={args.minimum:.3f}..{args.maximum:.3f}; Ctrl-C stops and restores"
    )

    try:
        while True:
            started = time.monotonic()
            try:
                snapshot = read_snapshot(args.host, args.timeout)
                activity = snapshot[ACTIVITY_PATH]
                failures = 0
            except (KeyError, OSError, ValueError, urllib.error.URLError) as error:
                failures += 1
                print(f"snapshot failure {failures}: {error}", file=sys.stderr)
                if failures >= 5:
                    raise RuntimeError("five consecutive snapshot failures") from error
                time.sleep(period)
                continue

            level = clamp((activity - args.idle) / (args.active - args.idle), 0.0, 1.0)
            level = math.sqrt(level)
            target = args.minimum + level * (args.maximum - args.minimum)

            now = time.monotonic()
            elapsed = max(now - last_time, 1e-6)
            tau = args.attack if target > brightness else args.release
            alpha = 1.0 - math.exp(-elapsed / max(tau, 1e-6))
            brightness += (target - brightness) * alpha
            brightness = clamp(brightness, args.minimum, args.maximum)
            send_brightness(sock, args.host, brightness)
            last_time = now

            if now - last_report >= 0.5:
                print(f"activity={activity:.5f} brightness={brightness:.3f}", flush=True)
                last_report = now

            time.sleep(max(0.0, period - (time.monotonic() - started)))
    except KeyboardInterrupt:
        print("stopping")
    finally:
        for _ in range(3):
            send_brightness(sock, args.host, original_brightness)
            time.sleep(0.03)
        sock.close()
        print(f"restored brightness={original_brightness:.3f}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
