#!/usr/bin/env python3
"""Generate a no-audio, fixed-global brightness calibration project."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


SLOT_SECONDS = 5.0
GLOBAL_BRIGHTNESS = 0.883
LEVELS = [0.10, 0.14, 0.18, 0.22, 0.26, 0.30, 0.35, 0.40, 0.45, 0.50]
COLORS = [
    ("M", "Magenta", "#FF00A8"),
    ("V", "Violet", "#7A5CFF"),
    ("A", "Amber", "#FF8A00"),
    ("C", "Cyan", "#00E5FF"),
    ("W", "White", "#FFFFFF"),
]
TOTAL_TIME = SLOT_SECONDS * len(LEVELS) * len(COLORS)


def manager(items: list[dict[str, Any]] | None = None) -> dict[str, Any]:
    result: dict[str, Any] = {"viewOffset": [0, 0], "viewZoom": 1.0}
    if items is not None:
        result["items"] = items
    return result


def parameter(address: str, value: Any, **extra: Any) -> dict[str, Any]:
    result = {"value": value, "controlAddress": address}
    result.update(extra)
    return result


def rgb(hex_color: str) -> list[float]:
    value = hex_color.removeprefix("#")
    if len(value) != 6:
        raise ValueError(f"invalid RGB color: {hex_color}")
    return [int(value[i : i + 2], 16) / 255.0 for i in (0, 2, 4)] + [1.0]


def solid_clip(
    code: str,
    name: str,
    color: str,
    color_index: int,
    level_index: int,
    brightness: float,
) -> dict[str, Any]:
    start = (color_index * len(LEVELS) + level_index) * SLOT_SECONDS
    clip_parameters = [
        parameter("/length", SLOT_SECONDS),
        parameter("/activeBlock", "/library/patterns/solidColor"),
    ]
    if start:
        clip_parameters.insert(0, parameter("/startTime", start))

    return {
        "parameters": clip_parameters,
        "niceName": f"{code}{level_index + 1} = {brightness:.2f} {name}",
        "editorIsCollapsed": True,
        "type": "LightBlockClip",
        "blockData": {
            "params": {
                "parameters": [
                    parameter("/brightness", brightness),
                    parameter("/color", rgb(color)),
                    parameter("/hueSpeed", 0.0),
                    parameter("/idOffset", 0.0),
                ]
            }
        },
        "filters": manager(),
        "effects": manager(),
    }


def sequence_block() -> dict[str, Any]:
    clips = [
        solid_clip(code, name, color, color_index, level_index, brightness)
        for color_index, (code, name, color) in enumerate(COLORS)
        for level_index, brightness in enumerate(LEVELS)
    ]
    layer = {
        "parameters": [
            parameter("/listSize", TOTAL_TIME),
            parameter("/blendMode", "Alpha"),
            parameter("/uiHeight", 120, hexMode=False),
        ],
        "niceName": "Floor brightness ladder",
        "type": "Blocks",
        "blocks": {"hideInEditor": True, **manager(clips)},
        "filters": manager(),
    }
    return {
        "niceName": "CAL - Floor ladder M V A C W",
        "type": "SequenceBlock",
        "sequence": {
            "parameters": [
                parameter("/totalTime", TOTAL_TIME),
                parameter("/viewEndTime", TOTAL_TIME),
            ],
            "niceName": "Sequence",
            "type": "Sequence",
            "layers": {"hideInEditor": True, **manager([layer])},
            "cues": {"hideInEditor": True, **manager()},
            "clusterGroups": manager(),
            "editing": True,
        },
    }


def build_project() -> dict[str, Any]:
    empty_model = manager()
    return {
        "metaData": {"version": "2.1.0b6", "versionNumber": 0x20100},
        "projectSettings": {
            "parameters": [
                parameter("/projectName", "Creators Clubs Brightness Calibration")
            ],
            "containers": {
                "dashboardSettings": {
                    "parameters": [
                        parameter("/showDashboardOnStartup", "", enabled=False)
                    ]
                },
                "customDefinitions": {},
                "customParameters": manager(),
            },
        },
        "models": {
            "pictures": empty_model,
            "nodes": empty_model,
            "streamingScripts": empty_model,
            "embeddedScripts": empty_model,
            "sequences": manager([sequence_block()]),
            "video": empty_model,
        },
        "props": {
            "containers": {
                "connection": {
                    "parameters": [parameter("/autoAddNetwork", True)]
                },
                "controls": {
                    "parameters": [parameter("/brightness", GLOBAL_BRIGHTNESS)]
                },
                "playback": {},
            },
            "items": [],
            **manager(),
        },
        "parrots": manager(),
        "dashboardManager": manager(),
    }


def validate(project: dict[str, Any]) -> None:
    if project["props"]["items"]:
        raise ValueError("portable calibration project must not save props")
    controls = project["props"]["containers"]["controls"]["parameters"]
    if controls != [parameter("/brightness", GLOBAL_BRIGHTNESS)]:
        raise ValueError("calibration project must preserve the agreed global brightness")

    sequences = project["models"]["sequences"]["items"]
    if len(sequences) != 1:
        raise ValueError("unexpected sequence count")

    sequence = sequences[0]
    if sequence["niceName"] != "CAL - Floor ladder M V A C W":
        raise ValueError("unexpected sequence name")
    layers = sequence["sequence"]["layers"]["items"]
    if len(layers) != 1 or layers[0]["niceName"] != "Floor brightness ladder":
        raise ValueError("unexpected layer structure")
    clips = layers[0]["blocks"]["items"]
    if len(clips) != len(LEVELS) * len(COLORS):
        raise ValueError("unexpected clip count")

    cursor = 0.0
    clip_index = 0
    for code, name, color in COLORS:
        for level_index, expected_brightness in enumerate(LEVELS):
            clip = clips[clip_index]
            values = {p["controlAddress"]: p["value"] for p in clip["parameters"]}
            start = float(values.get("/startTime", 0.0))
            length = float(values["/length"])
            if start != cursor or length != SLOT_SECONDS:
                raise ValueError(f"gap or overlap at {clip['niceName']}")
            cursor = start + length
            if values["/activeBlock"] != "/library/patterns/solidColor":
                raise ValueError("calibration clip must be full-field Solid Color")

            params = {
                p["controlAddress"]: p["value"]
                for p in clip["blockData"]["params"]["parameters"]
            }
            if params["/brightness"] != expected_brightness:
                raise ValueError(f"wrong level in {clip['niceName']}")
            if params["/color"] != rgb(color):
                raise ValueError(f"wrong color in {clip['niceName']}")
            expected_name = (
                f"{code}{level_index + 1} = {expected_brightness:.2f} {name}"
            )
            if clip["niceName"] != expected_name:
                raise ValueError("unexpected calibration code")
            clip_index += 1

    if cursor != TOTAL_TIME:
        raise ValueError("calibration sequence does not cover its timeline")


def main() -> None:
    project = build_project()
    validate(project)
    output = Path(__file__).with_name("brightness-calibration.bento")
    output.write_text(json.dumps(project, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {output} ({output.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
