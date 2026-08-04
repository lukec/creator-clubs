#!/usr/bin/env python3
"""Apply the stable-1.2.0 native-stack compatibility transform.

AssemblyScript's readable source intentionally retains the original effect
implementations. Stable Creator Club firmware compiles that WebAssembly with
Wasm3 on loopTask; several nested HSV paths cross its native-stack guard. This
size-preserving transform keeps the loader-proven module layout while replacing
only the deep function bodies and the final Axis Weave branch.

The input and output hashes are pinned so an AssemblyScript upgrade or source
change fails closed instead of silently patching the wrong offsets.
"""

from __future__ import annotations

import hashlib
import sys
from pathlib import Path


BASE_SHA256 = "9999c1e70dedb52739d2825e16795bd6495c37f9120426cab1ba29c899196143"
OUTPUT_SHA256 = "3e11d9011d6a3af70145a532e47119a0908eed51cfaef4238d06a6f5e3318b2d"


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def replace_body(data: bytearray, start: int, size: int, declarations: list[int], instructions: list[int]) -> None:
    payload = bytes(declarations + instructions)
    if len(payload) >= size:
        raise ValueError(f"replacement body at {start:#x} does not fit")
    data[start : start + size] = payload + bytes([0x01]) * (size - len(payload) - 1) + bytes([0x0B])


def transform(data: bytes) -> bytes:
    if sha256(data) != BASE_SHA256:
        raise ValueError("unexpected unpatched motion-lab build; refusing offset-based transform")

    out = bytearray(data)
    scale_to_byte = [0x43, 0x00, 0x00, 0x7F, 0x43, 0x94, 0xFC, 0x00, 0x41, 0xFF, 0x01, 0x71]
    angle_to_byte = [0x20, 0x00, 0x43, 0x00, 0x00, 0x7F, 0x43, 0x94, 0xFC, 0x00]
    inverse_to_byte = [
        0x43, 0x00, 0x00, 0x80, 0x3F, 0x20, 0x00, 0x93,
        0x43, 0x00, 0x00, 0x7F, 0x43, 0x94, 0xFC, 0x00,
    ]

    # f21: packed color converter, with no locals and a maximum operand depth
    # of two. Hue controls red/blue; value controls green and the visibility
    # floor. Saturation is intentionally ignored in this firmware profile.
    replace_body(
        out,
        0x635,
        237,
        [0x00],
        [
            0x20, 0x00, *scale_to_byte, 0x41, 0x10, 0x74,
            0x20, 0x02, *scale_to_byte, 0x41, 0x08, 0x74, 0x72,
            0x41, 0xFF, 0x01, 0x20, 0x00, *scale_to_byte, 0x6B, 0x72,
        ],
    )

    # f22: whole-club smooth hue/value mapping with one local.
    replace_body(
        out,
        0x723,
        38,
        [0x01, 0x01, 0x7F],
        [
            0x20, 0x00, 0x43, 0x00, 0x00, 0x7F, 0x43, 0x94, 0xFC, 0x00, 0x21, 0x03,
            0x20, 0x03,
            0x20, 0x02, 0x43, 0x00, 0x00, 0x7F, 0x43, 0x94, 0xFC, 0x00,
            0x41, 0xFF, 0x01, 0x20, 0x03, 0x6B,
            0x10, 0x09,
        ],
    )

    # f29/f31/f32: smooth, full-strip angle palettes. A channel remains at
    # 255 throughout so every result stays trackable in a dark venue.
    replace_body(
        out,
        0x996,
        76,
        [0x01, 0x03, 0x7F],
        [*angle_to_byte, 0x41, 0xFF, 0x01, *inverse_to_byte, 0x10, 0x09],
    )
    replace_body(
        out,
        0x9F2,
        118,
        [0x02, 0x01, 0x7F, 0x01, 0x7D],
        [0x41, 0x32, *angle_to_byte, 0x41, 0xFF, 0x01, 0x10, 0x09],
    )
    replace_body(
        out,
        0xA69,
        85,
        [0x02, 0x02, 0x7F, 0x01, 0x7D],
        [*inverse_to_byte, *angle_to_byte, 0x41, 0xFF, 0x01, 0x10, 0x09],
    )

    # f30: the per-pixel hue wrapper delegates to the shallow fill helper.
    # Repeated calls leave the last phase as the visible whole-club palette.
    replace_body(out, 0x9E3, 14, [0x00], [0x20, 0x01, 0x20, 0x02, 0x20, 0x03, 0x10, 0x16])

    # Page 3 Effect 8 originally performed two packed conversions plus a
    # 32-pixel loop inline in update(). Replace only that branch body with one
    # call to f22; retain the closing control opcode at 0xEE8.
    axis_weave_start = 0xE91
    axis_weave_end = 0xEE8
    axis_weave = bytes([
        0x20, 0x04,
        0x43, 0x00, 0x00, 0x80, 0x3F,
        0x43, 0x00, 0x00, 0x80, 0x3F,
        0x10, 0x16,
    ])
    out[axis_weave_start:axis_weave_end] = axis_weave + bytes([0x01]) * (
        axis_weave_end - axis_weave_start - len(axis_weave)
    )

    result = bytes(out)
    if sha256(result) != OUTPUT_SHA256:
        raise ValueError("stack-safety transform produced an unexpected artifact")
    return result


def main() -> int:
    if len(sys.argv) != 2:
        raise SystemExit("usage: patch_stack_safe_wasm.py ARTIFACT.wasm")
    path = Path(sys.argv[1])
    path.write_bytes(transform(path.read_bytes()))
    print(f"stable-1.2.0 stack-safe transform: {OUTPUT_SHA256[:12]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
