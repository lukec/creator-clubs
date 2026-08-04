#!/usr/bin/env python3
"""Open, inspect, route, and play BenTo shows through its local control service.

BenTo's OSC Remote Control setting must be enabled. Commands are sent over OSC
and verified through BenTo's OSCQuery HTTP endpoint on the same port. This tool
does not save files, upload playback, change club settings, or flash firmware.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import socket
import struct
import time
import urllib.error
import urllib.parse
import urllib.request
from collections.abc import Callable, Sequence
from pathlib import Path
from typing import Any


DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = int(os.environ.get("BENTO_OSC_PORT", "43000"))
DEFAULT_TIMEOUT = 5.0


class BentoControlError(RuntimeError):
    """A BenTo command could not be verified."""


def osc_string(value: str) -> bytes:
    encoded = value.encode("utf-8") + b"\0"
    return encoded + b"\0" * ((-len(encoded)) % 4)


def osc_message(address: str, arguments: Sequence[str | int | float]) -> bytes:
    tags = [
        "s" if isinstance(value, str) else "f" if isinstance(value, float) else "i"
        for value in arguments
    ]
    packet = osc_string(address) + osc_string("," + "".join(tags))
    for value in arguments:
        if isinstance(value, str):
            packet += osc_string(value)
        elif isinstance(value, float):
            packet += struct.pack(">f", value)
        else:
            packet += struct.pack(">i", value)
    return packet


def send(
    host: str, port: int, address: str, arguments: Sequence[str | int | float]
) -> int:
    packet = osc_message(address, arguments)
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        return sock.sendto(packet, (host, port))


def query_text(host: str, port: int, path: str, timeout: float = 1.0) -> str:
    quoted_path = urllib.parse.quote(path, safe="/?=&")
    url = f"http://{host}:{port}{quoted_path}"
    try:
        with urllib.request.urlopen(url, timeout=timeout) as response:
            return response.read().decode("utf-8")
    except (OSError, UnicodeDecodeError, urllib.error.URLError) as exc:
        raise BentoControlError(
            f"BenTo did not return OSCQuery data at {url}: {exc}"
        ) from exc


def query(host: str, port: int, path: str, timeout: float = 1.0) -> dict[str, Any]:
    quoted_path = urllib.parse.quote(path, safe="/?=&")
    url = f"http://{host}:{port}{quoted_path}"
    text = query_text(host, port, path, timeout)
    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        raise BentoControlError(
            f"BenTo did not return valid OSCQuery data at {url}: {exc}"
        ) from exc
    if not isinstance(data, dict):
        raise BentoControlError(f"BenTo returned an unexpected response at {url}: {data!r}")
    return data


def host_info(host: str, port: int) -> dict[str, Any]:
    return query(host, port, "/?HOST_INFO")


def value(node: dict[str, Any], key: str, default: Any = None) -> Any:
    values = node.get("CONTENTS", {}).get(key, {}).get("VALUE")
    return values[0] if values else default


def sequence_summaries(host: str, port: int) -> list[dict[str, Any]]:
    try:
        root = query(host, port, "/library/sequences")
        return list(root.get("CONTENTS", {}).values())
    except BentoControlError as original_error:
        # Dense timelines can make BenTo 2.1.0b6 truncate this recursive
        # manager response around 16 KB. Recover only the shallow live summary
        # fields, and require them to match every sequence in the exact file
        # BenTo says is open. Transport state is still read from valid narrow
        # live OSCQuery endpoints below.
        info = host_info(host, port)
        file_path = info.get("METADATA", {}).get("filePath", "")
        try:
            project = json.loads(Path(file_path).read_text(encoding="utf-8"))
            expected_names = [
                item["niceName"] for item in project["models"]["sequences"]["items"]
            ]
        except (KeyError, OSError, TypeError, json.JSONDecodeError) as exc:
            raise original_error from exc

        text = query_text(host, port, "/library/sequences")
        pattern = re.compile(
            r'"DESCRIPTION"\s*:\s*"(?P<description>(?:\\.|[^"\\])*)"\s*,\s*'
            r'"FULL_PATH"\s*:\s*"(?P<path>/library/sequences/[^/"\\]+)"'
        )
        found: dict[str, dict[str, Any]] = {}
        for match in pattern.finditer(text):
            description = json.loads(f'"{match.group("description")}"')
            found[description] = {
                "DESCRIPTION": description,
                "FULL_PATH": match.group("path"),
            }
        missing = [name for name in expected_names if name not in found]
        if missing:
            raise BentoControlError(
                "BenTo's sequence listing was truncated and its shallow prefix "
                f"did not contain the open file's sequence(s): {', '.join(missing)}"
            ) from original_error
        return [found[name] for name in expected_names]


def list_sequences(host: str, port: int) -> list[dict[str, Any]]:
    summaries = sequence_summaries(host, port)
    result: list[dict[str, Any]] = []
    for summary in summaries:
        full_path = summary["FULL_PATH"]
        key = full_path.rsplit("/", 1)[-1]
        transport = query(host, port, f"{full_path}/sequence")
        result.append(
            {
                "key": key,
                "name": summary.get("DESCRIPTION", key),
                "path": full_path,
                "is_playing": bool(value(transport, "isPlaying", False)),
                "current_time": float(value(transport, "currentTime", 0.0)),
                "total_time": float(value(transport, "totalTime", 0.0)),
            }
        )
    return result


def list_props(host: str, port: int) -> list[dict[str, Any]]:
    root = query(host, port, "/props")
    result: list[dict[str, Any]] = []
    for key, summary in root.get("CONTENTS", {}).items():
        if summary.get("TYPE") != "BLIP":
            continue
        full_path = summary.get("FULL_PATH", f"/props/{key}")
        prop = query(host, port, full_path)
        main = query(host, port, f"{full_path}/mainParameters")
        result.append(
            {
                "key": key,
                "name": summary.get("DESCRIPTION", key),
                "path": full_path,
                "global_id": int(value(main, "globalID", -1)),
                "type": value(main, "type", "Unknown"),
                "battery": float(value(main, "battery", 0.0)),
                "enabled": bool(value(prop, "enabled", False)),
                "active_block": value(prop, "activeBlock", ""),
            }
        )
    return result


def resolve_sequence(host: str, port: int, selector: str) -> dict[str, Any]:
    matches = [
        sequence
        for sequence in list_sequences(host, port)
        if selector in (sequence["name"], sequence["key"], sequence["path"])
    ]
    if len(matches) == 1:
        return matches[0]
    available = ", ".join(sequence["name"] for sequence in list_sequences(host, port))
    if not matches:
        raise BentoControlError(f"Sequence {selector!r} was not found. Available: {available}")
    raise BentoControlError(f"Sequence {selector!r} is ambiguous. Available: {available}")


def resolve_prop(host: str, port: int, prop_id: int) -> dict[str, Any]:
    matches = [prop for prop in list_props(host, port) if prop["global_id"] == prop_id]
    if len(matches) == 1:
        return matches[0]
    available = ", ".join(str(prop["global_id"]) for prop in list_props(host, port))
    if not matches:
        raise BentoControlError(f"Prop Global ID {prop_id} was not found. Available: {available}")
    raise BentoControlError(f"Prop Global ID {prop_id} is not unique in this project")


def wait_for(predicate: Callable[[], bool], timeout: float, description: str) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if predicate():
            return
        time.sleep(0.1)
    raise BentoControlError(f"Timed out waiting for BenTo to {description}")


def assign(host: str, port: int, sequence: dict[str, Any], prop: dict[str, Any], timeout: float) -> None:
    send(host, port, f"{prop['path']}/activeBlock", [sequence["path"]])

    def assigned() -> bool:
        return value(query(host, port, prop["path"]), "activeBlock", "") == sequence["path"]

    wait_for(assigned, timeout, f"assign {sequence['name']!r} to prop {prop['global_id']}")


def set_transport(
    host: str,
    port: int,
    sequence: dict[str, Any],
    action: str,
    expected_playing: bool,
    timeout: float,
) -> None:
    transport_path = f"{sequence['path']}/sequence"
    send(host, port, f"{transport_path}/{action}", [])

    def reached_state() -> bool:
        transport = query(host, port, transport_path)
        return bool(value(transport, "isPlaying", False)) is expected_playing

    wait_for(reached_state, timeout, f"set {sequence['name']!r} playing={expected_playing}")


def print_status(host: str, port: int) -> None:
    info = host_info(host, port)
    metadata = info.get("METADATA", {})
    print(f"BenTo {metadata.get('version', 'unknown')} on OSC/HTTP {host}:{info.get('OSC_PORT', port)}")
    print(f"File: {metadata.get('filePath', '(unsaved)')}")

    sequences = list_sequences(host, port)
    print("Sequences:")
    for sequence in sequences:
        state = "playing" if sequence["is_playing"] else "stopped"
        print(
            f"  {sequence['name']} [{sequence['key']}] "
            f"{state} {sequence['current_time']:.3f}/{sequence['total_time']:.3f}s"
        )

    props = list_props(host, port)
    print("Props:")
    if not props:
        print("  (none)")
    for prop in props:
        print(
            f"  ID {prop['global_id']}: {prop['name']} ({prop['type']}), "
            f"enabled={str(prop['enabled']).lower()}, battery={prop['battery']:.0%}, "
            f"active={prop['active_block'] or '(none)'}"
        )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default=DEFAULT_HOST, help="BenTo host (default: localhost)")
    parser.add_argument("--port", default=DEFAULT_PORT, type=int, help="BenTo control port")
    parser.add_argument(
        "--timeout", default=DEFAULT_TIMEOUT, type=float, help="verification timeout in seconds"
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("status", help="show the open file, sequences, props, and transport")

    open_file = subparsers.add_parser("open", help="open or reload a .bento file")
    open_file.add_argument("file", type=Path)

    assign_parser = subparsers.add_parser("assign", help="route a sequence to one prop")
    assign_parser.add_argument("sequence", help="sequence display name, OSC key, or full path")
    assign_parser.add_argument("--prop-id", required=True, type=int, help="BenTo Global ID")

    play = subparsers.add_parser("play", help="route props and start a sequence from the beginning")
    play.add_argument("sequence", help="sequence display name, OSC key, or full path")
    play.add_argument(
        "--prop-id", action="append", required=True, type=int, help="repeat for multiple props"
    )
    play.add_argument(
        "--duration", type=float, default=0, help="stop after this many seconds; 0 keeps playing"
    )

    subparsers.add_parser("stop", help="stop every sequence in the open project")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    if args.timeout <= 0:
        raise SystemExit("--timeout must be greater than zero")

    try:
        if args.command == "status":
            print_status(args.host, args.port)
            return 0

        if args.command == "open":
            target = args.file.expanduser().resolve()
            if not target.is_file():
                raise BentoControlError(f"File does not exist: {target}")
            send(args.host, args.port, "/openFile", [str(target)])

            def opened() -> bool:
                return host_info(args.host, args.port).get("METADATA", {}).get("filePath") == str(target)

            try:
                wait_for(opened, args.timeout, f"open {target}")
            except BentoControlError as exc:
                raise BentoControlError(
                    f"{exc}. Check BenTo for an unsaved-document or autosave dialog."
                ) from exc
            print(f"Opened {target}")
            return 0

        if args.command == "assign":
            sequence = resolve_sequence(args.host, args.port, args.sequence)
            prop = resolve_prop(args.host, args.port, args.prop_id)
            assign(args.host, args.port, sequence, prop, args.timeout)
            print(f"Assigned {sequence['name']!r} to prop ID {args.prop_id}")
            return 0

        if args.command == "stop":
            sequences = list_sequences(args.host, args.port)
            for sequence in sequences:
                set_transport(args.host, args.port, sequence, "stop", False, args.timeout)
            print(f"Stopped {len(sequences)} BenTo sequence(s)")
            return 0

        if args.duration < 0:
            raise BentoControlError("--duration must be zero or greater")
        sequence = resolve_sequence(args.host, args.port, args.sequence)
        props = [resolve_prop(args.host, args.port, prop_id) for prop_id in args.prop_id]
        for prop in props:
            assign(args.host, args.port, sequence, prop, args.timeout)
        set_transport(args.host, args.port, sequence, "stop", False, args.timeout)
        set_transport(args.host, args.port, sequence, "play", True, args.timeout)
        ids = ", ".join(str(prop["global_id"]) for prop in props)
        print(f"Playing {sequence['name']!r} on prop ID(s) {ids}")
        if args.duration:
            try:
                time.sleep(args.duration)
            finally:
                set_transport(args.host, args.port, sequence, "stop", False, args.timeout)
            print(f"Stopped after {args.duration:g}s")
        return 0
    except BentoControlError as exc:
        raise SystemExit(f"error: {exc}") from exc


if __name__ == "__main__":
    raise SystemExit(main())
