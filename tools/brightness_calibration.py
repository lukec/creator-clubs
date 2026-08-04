#!/usr/bin/env python3
"""Interactively choose per-color floor brightness on one BenTo-controlled club."""

from __future__ import annotations

import argparse
import curses
import json
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import bento_show_control as bento


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SHOW = REPO_ROOT / "shows/brightness-calibration/brightness-calibration.bento"
SEQUENCE_NAME = "CAL - Floor ladder M V A C W"
CLIP_NAME = re.compile(
    r"^(?P<code>[A-Z])(?P<step>\d+) = (?P<brightness>\d+(?:\.\d+)?) (?P<name>.+)$"
)


@dataclass(frozen=True)
class Level:
    step: int
    brightness: float
    start_time: float


@dataclass(frozen=True)
class Color:
    code: str
    name: str
    levels: tuple[Level, ...]


@dataclass(frozen=True)
class Calibration:
    global_brightness: float
    colors: tuple[Color, ...]


def parameter_value(parameters: list[dict[str, Any]], address: str, default: Any = None) -> Any:
    for parameter in parameters:
        if parameter.get("controlAddress") == address:
            return parameter.get("value")
    return default


def load_calibration(path: Path) -> Calibration:
    project = json.loads(path.read_text(encoding="utf-8"))
    controls = project["props"]["containers"]["controls"]["parameters"]
    global_brightness = float(parameter_value(controls, "/brightness"))

    sequences = project["models"]["sequences"]["items"]
    sequence = next(item for item in sequences if item["niceName"] == SEQUENCE_NAME)
    layers = sequence["sequence"]["layers"]["items"]
    clips = layers[0]["blocks"]["items"]

    grouped: dict[str, tuple[str, list[Level]]] = {}
    order: list[str] = []
    for clip in clips:
        match = CLIP_NAME.match(clip["niceName"])
        if not match:
            raise ValueError(f"unrecognized calibration clip: {clip['niceName']!r}")
        code = match.group("code")
        if code not in grouped:
            grouped[code] = (match.group("name"), [])
            order.append(code)
        parameters = clip["parameters"]
        start_time = float(parameter_value(parameters, "/startTime", 0.0))
        length = float(parameter_value(parameters, "/length"))
        grouped[code][1].append(
            Level(
                step=int(match.group("step")),
                brightness=float(match.group("brightness")),
                start_time=start_time + length / 2,
            )
        )

    colors = tuple(
        Color(code, grouped[code][0], tuple(grouped[code][1])) for code in order
    )
    if not colors or any(not color.levels for color in colors):
        raise ValueError("calibration project has no usable color levels")
    return Calibration(global_brightness, colors)


def transport_state(host: str, port: int, sequence: dict[str, Any]) -> tuple[bool, float]:
    node = bento.query(host, port, f"{sequence['path']}/sequence")
    return (
        bool(bento.value(node, "isPlaying", False)),
        float(bento.value(node, "currentTime", 0.0)),
    )


def hold_level(
    host: str,
    port: int,
    sequence: dict[str, Any],
    level: Level,
    timeout: float,
) -> None:
    """Seek while paused, briefly evaluate, then hold the selected output."""
    transport = f"{sequence['path']}/sequence"
    playing, _ = transport_state(host, port, sequence)
    if playing:
        bento.set_transport(host, port, sequence, "pause", False, timeout)

    bento.send(host, port, f"{transport}/currentTime", [level.start_time])

    def sought() -> bool:
        _, current_time = transport_state(host, port, sequence)
        return abs(current_time - level.start_time) < 0.05

    bento.wait_for(sought, timeout, f"seek to calibration step {level.step}")
    bento.set_transport(host, port, sequence, "play", True, timeout)
    time.sleep(0.08)
    bento.set_transport(host, port, sequence, "pause", False, timeout)

    _, current_time = transport_state(host, port, sequence)
    if not level.start_time <= current_time < level.start_time + 0.75:
        raise bento.BentoControlError(
            f"BenTo paused at {current_time:.3f}s instead of step {level.step}"
        )


def format_result(
    calibration: Calibration, selections: list[int], visited: set[int]
) -> str:
    global_value = f"{calibration.global_brightness:.3f}".removeprefix("0")
    fields = [f"G={global_value}"]
    for index, color in enumerate(calibration.colors):
        value = str(selections[index] + 1) if index in visited else "?"
        fields.append(f"{color.code}={value}")
    return " ".join(fields)


def draw(
    screen: curses.window,
    calibration: Calibration,
    selections: list[int],
    visited: set[int],
    active: int,
    prop_id: int,
) -> None:
    screen.erase()

    def line(row: int, text: str) -> None:
        height, width = screen.getmaxyx()
        if row < 0 or row >= height or width < 2:
            return
        try:
            screen.addnstr(row, 0, text, width - 1)
        except curses.error:
            # Terminal resizing can invalidate dimensions between getmaxyx and draw.
            pass

    height, width = screen.getmaxyx()
    line(0, f"Club {prop_id} brightness floor calibration")
    line(1, "L/R: brightness   U/D: color   Enter/q: finish")

    if height >= 15 and width >= 66:
        line(3, "Choose the lowest comfortably trackable level while moving.")
        line(5, "    Color       Step   Pattern   Effective   State")
        for index, color in enumerate(calibration.colors):
            level = color.levels[selections[index]]
            effective = level.brightness * calibration.global_brightness
            marker = ">" if index == active else " "
            state = "live" if index == active else "tested" if index in visited else "not tested"
            line(
                6 + index,
                f"{marker}   {color.name:<10}  {level.step:>2}    "
                f"{level.brightness:>5.2f}      {effective:>5.3f}   {state}",
            )
        line(12, "Current result:")
        line(13, format_result(calibration, selections, visited))
    else:
        color = calibration.colors[active]
        level = color.levels[selections[active]]
        effective = level.brightness * calibration.global_brightness
        line(3, f"> {color.code} {color.name}: step {level.step}/{len(color.levels)}")
        line(4, f"Pattern {level.brightness:.2f}   Effective {effective:.3f}")
        line(6, "Result:")
        line(7, format_result(calibration, selections, visited))
    screen.refresh()


def read_key(screen: curses.window) -> int:
    """Read curses keys while also accepting terminals that expose raw arrows."""
    key = screen.getch()
    if key != 27:
        return key

    screen.timeout(75)
    try:
        second = screen.getch()
        third = screen.getch() if second in (ord("["), ord("O")) else -1
    finally:
        screen.timeout(-1)
    return {
        ord("A"): curses.KEY_UP,
        ord("B"): curses.KEY_DOWN,
        ord("C"): curses.KEY_RIGHT,
        ord("D"): curses.KEY_LEFT,
    }.get(third, 27)


def run_ui(
    screen: curses.window,
    calibration: Calibration,
    selections: list[int],
    host: str,
    port: int,
    sequence: dict[str, Any],
    timeout: float,
    prop_id: int,
) -> set[int]:
    try:
        curses.curs_set(0)
    except curses.error:
        # Some otherwise functional terminals cannot change cursor visibility.
        pass
    screen.keypad(True)
    active = 0
    visited = {active}
    hold_level(host, port, sequence, calibration.colors[active].levels[selections[active]], timeout)

    while True:
        draw(screen, calibration, selections, visited, active, prop_id)
        key = read_key(screen)
        changed = False
        if key == curses.KEY_LEFT:
            new_value = max(0, selections[active] - 1)
            changed = new_value != selections[active]
            selections[active] = new_value
        elif key == curses.KEY_RIGHT:
            new_value = min(len(calibration.colors[active].levels) - 1, selections[active] + 1)
            changed = new_value != selections[active]
            selections[active] = new_value
        elif key == curses.KEY_UP:
            active = (active - 1) % len(calibration.colors)
            changed = True
        elif key == curses.KEY_DOWN:
            active = (active + 1) % len(calibration.colors)
            changed = True
        elif key in (10, 13, ord("q"), ord("Q")):
            return visited
        elif key in (27,):
            return visited
        elif key == curses.KEY_RESIZE:
            continue

        if changed:
            visited.add(active)
            hold_level(
                host,
                port,
                sequence,
                calibration.colors[active].levels[selections[active]],
                timeout,
            )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--show", type=Path, default=DEFAULT_SHOW)
    parser.add_argument("--prop-id", type=int, default=0, help="BenTo project-local Global ID")
    parser.add_argument("--start-level", type=int, default=6, help="initial step, 1-10")
    parser.add_argument("--host", default=bento.DEFAULT_HOST)
    parser.add_argument("--port", type=int, default=bento.DEFAULT_PORT)
    parser.add_argument("--timeout", type=float, default=bento.DEFAULT_TIMEOUT)
    return parser


def main() -> int:
    args = build_parser().parse_args()
    show = args.show.expanduser().resolve()
    if not show.is_file():
        raise SystemExit(f"error: calibration show does not exist: {show}")
    if args.start_level < 1:
        raise SystemExit("error: --start-level must be at least 1")
    if not sys.stdin.isatty() or not sys.stdout.isatty():
        raise SystemExit("error: this arrow-key interface requires an interactive terminal")

    try:
        calibration = load_calibration(show)
        if any(args.start_level > len(color.levels) for color in calibration.colors):
            raise bento.BentoControlError("--start-level exceeds the available ladder")

        info = bento.host_info(args.host, args.port)
        open_file = info.get("METADATA", {}).get("filePath")
        if open_file != str(show):
            raise bento.BentoControlError(
                "BenTo does not have the calibration show open. Run: "
                f"python3 tools/bento_show_control.py --timeout 10 open {show}"
            )

        sequence = bento.resolve_sequence(args.host, args.port, SEQUENCE_NAME)
        prop = bento.resolve_prop(args.host, args.port, args.prop_id)
        bento.assign(args.host, args.port, sequence, prop, args.timeout)
        selections = [args.start_level - 1 for _ in calibration.colors]
        visited: set[int] = set()
        try:
            visited = curses.wrapper(
                run_ui,
                calibration,
                selections,
                args.host,
                args.port,
                sequence,
                args.timeout,
                args.prop_id,
            )
        finally:
            bento.set_transport(args.host, args.port, sequence, "stop", False, args.timeout)

        print("Calibration result:")
        print(format_result(calibration, selections, visited))
        print("Pattern values:")
        for index, color in enumerate(calibration.colors):
            if index not in visited:
                print(f"  {color.code} {color.name}: not tested")
                continue
            level = color.levels[selections[index]]
            effective = level.brightness * calibration.global_brightness
            print(
                f"  {color.code} {color.name}: step {level.step}, "
                f"pattern {level.brightness:.2f}, effective {effective:.3f}"
            )
        return 0
    except (bento.BentoControlError, KeyError, ValueError, json.JSONDecodeError) as exc:
        raise SystemExit(f"error: {exc}") from exc


if __name__ == "__main__":
    raise SystemExit(main())
