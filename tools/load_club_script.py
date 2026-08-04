#!/usr/bin/env python3
"""Upload and load a Bentuino WASM script with bounded loader diagnostics.

The club IP is supplied at runtime and is never stored or printed. This tool is
intended for local lab use against a club already joined to the trusted test
network.
"""

from __future__ import annotations

import argparse
import asyncio
import re
import sys
import urllib.request
import uuid
from pathlib import Path

import websockets
from pythonosc.osc_message_builder import OscMessageBuilder
from pythonosc.osc_packet import OscPacket
from pythonosc.udp_client import SimpleUDPClient


SAFE_LOG_TERMS = (
    "load script",
    "script read",
    "script launching",
    "finding functions",
    "found function",
    "calling init",
    "print from script",
    "low stack",
    "stopping script",
    "fatal:",
    "error reading file",
    "parsemodule",
    "loadmodule",
)


def osc(client: SimpleUDPClient, address: str, value=None) -> None:
    if value is None:
        client.send_message(address, [])
    else:
        client.send_message(address, value)


def upload(ip: str, wasm: Path) -> int:
    boundary = f"----motionlab-{uuid.uuid4().hex}"
    body = bytearray()
    body.extend(f"--{boundary}\r\n".encode())
    body.extend(
        (
            'Content-Disposition: form-data; name="uploadData"; '
            f'filename="{wasm.name}"\r\n'
        ).encode()
    )
    body.extend(b"Content-Type: application/wasm\r\n\r\n")
    body.extend(wasm.read_bytes())
    body.extend(f"\r\n--{boundary}--\r\n".encode())
    request = urllib.request.Request(
        f"http://{ip}/uploadFile?folder=scripts",
        data=bytes(body),
        method="POST",
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        response.read()
        return response.status


def safe_loader_lines(data: bytes) -> list[str]:
    try:
        packet = OscPacket(data)
    except Exception:
        return []

    found: list[str] = []
    for timed in packet.messages:
        message = timed.message
        for param in message.params:
            if not isinstance(param, str):
                continue
            value = re.sub(r"(?:\d{1,3}\.){3}\d{1,3}", "<device>", param)
            if any(term in value.lower() for term in SAFE_LOG_TERMS):
                found.append(value.strip())
    return found


async def run(args: argparse.Namespace) -> int:
    client = SimpleUDPClient(args.ip, args.osc_port)
    observed: list[str] = []
    success = False

    try:
        async with websockets.connect(
            f"ws://{args.ip}/", open_timeout=5, close_timeout=2, ping_interval=None
        ) as websocket:
            osc(client, "/comm/server/sendDebugLogs", True)
            await asyncio.sleep(0.3)

            if not args.skip_upload:
                status = await asyncio.to_thread(upload, args.ip, args.wasm)
                if status != 200:
                    print(f"Upload failed with HTTP {status}", file=sys.stderr)
                    return 2
                print(f"Upload accepted ({args.wasm.stat().st_size} bytes).")
            else:
                print("Using the already-uploaded script file.")

            # Upload handling can suspend component updates, so reassert debug
            # forwarding after the transfer before asking the runtime to load.
            osc(client, "/comm/server/sendDebugLogs", True)
            await asyncio.sleep(0.2)

            # A script should own the rendered frame while it runs. Alpha avoids
            # retaining unrelated colors from a stale effect or playback layer.
            osc(client, "/leds/strip1/scriptLayer/enabled", True)
            osc(client, "/leds/strip1/scriptLayer/blendMode", 4)
            osc(client, "/script/load", args.name)

            deadline = asyncio.get_running_loop().time() + args.log_seconds
            while asyncio.get_running_loop().time() < deadline:
                remaining = deadline - asyncio.get_running_loop().time()
                try:
                    message = await asyncio.wait_for(websocket.recv(), timeout=remaining)
                except asyncio.TimeoutError:
                    break
                except websockets.ConnectionClosed:
                    print("Diagnostic WebSocket closed before the capture ended.", file=sys.stderr)
                    break
                if isinstance(message, str):
                    value = re.sub(
                        r"(?:\d{1,3}\.){3}\d{1,3}", "<device>", message
                    )
                    if any(term in value.lower() for term in SAFE_LOG_TERMS):
                        if value not in observed:
                            observed.append(value)
                            print(value)
                elif isinstance(message, bytes):
                    for line in safe_loader_lines(message):
                        if line not in observed:
                            observed.append(line)
                            print(line)

            success = any("script read" in line.lower() for line in observed) and any(
                "calling init" in line.lower() or "print from script" in line.lower()
                for line in observed
            )
            if args.persist and success:
                osc(client, "/script/scriptAtLaunch", args.name)
                await asyncio.sleep(0.15)
                osc(client, "/settings/saveSettings")
                print(f"Saved '{args.name}' as the startup script.")
    finally:
        # Never leave network debug forwarding enabled after a diagnostic run.
        osc(client, "/comm/server/sendDebugLogs", False)

    if not success:
        print("Did not capture a complete successful-load signature.", file=sys.stderr)
        return 3
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ip", required=True, help="Club IP (not logged)")
    parser.add_argument("--wasm", required=True, type=Path)
    parser.add_argument("--name", required=True)
    parser.add_argument("--persist", action="store_true")
    parser.add_argument("--skip-upload", action="store_true")
    parser.add_argument("--osc-port", type=int, default=9000)
    parser.add_argument("--log-seconds", type=float, default=5.0)
    args = parser.parse_args()
    if not args.wasm.is_file():
        parser.error(f"WASM file not found: {args.wasm}")
    if args.wasm.name != f"{args.name}.wasm":
        parser.error("--name must match the WASM filename basename")
    return args


if __name__ == "__main__":
    raise SystemExit(asyncio.run(run(parse_args())))
