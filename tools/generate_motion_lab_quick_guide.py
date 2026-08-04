#!/usr/bin/env python3
"""Generate the one-page Motion Lab field reference."""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "motion-lab-quick-guide.pdf"
PAGE_W, PAGE_H = landscape(letter)

INK = colors.HexColor("#17202A")
MUTED = colors.HexColor("#56616C")
PAPER = colors.HexColor("#FAF8F3")
WHITE = colors.white
RULE = colors.HexColor("#D8D3CA")
BLUE = colors.HexColor("#2855D9")
VIOLET = colors.HexColor("#7047B8")
ORANGE = colors.HexColor("#DD741C")

PAGES = [
    (
        "PAGE 1 - ROLL",
        "Twist around the long shaft",
        BLUE,
        [
            ("P1E1", "Roll Rainbow", "Whole-club hue follows shaft roll."),
            ("P1E2", "Roll Comet", "A bright comet circles as the handle twists."),
            ("P1E3", "Roll Portals", "Opposed cyan and pink heads track roll."),
            ("P1E4", "Roll Split", "A blue-orange boundary slides with roll."),
            ("P1E5", "Roll Bands", "Teal-gold bands rotate around the shaft."),
            ("P1E6", "Roll Complement", "Handle and body take opposite roll hues."),
            ("P1E7", "Roll Gradient", "A blue-violet gradient follows roll."),
            ("P1E8", "Roll Kaleidoscope", "Mirrored rainbow facets rotate."),
        ],
    ),
    (
        "PAGE 2 - FLIP",
        "Rotate end-over-end like a clock hand",
        VIOLET,
        [
            ("P2E1", "Flip Rainbow", "Whole-club hue follows flip angle."),
            ("P2E2", "Flip Comet", "A bright comet travels through each flip."),
            ("P2E3", "Flip Portals", "Opposed cyan and pink heads track flips."),
            ("P2E4", "Flip Horizon", "A blue-orange boundary follows tilt."),
            ("P2E5", "Flip Bands", "Teal-gold bands advance through flips."),
            ("P2E6", "Flip Complement", "Handle and body take opposite flip hues."),
            ("P2E7", "Flip Gradient", "A blue-violet gradient follows the arc."),
            ("P2E8", "Flip Kaleidoscope", "Mirrored rainbow facets follow flips."),
        ],
    ),
    (
        "PAGE 3 - ENERGY + COMBOS",
        "Change speed, energy, direction, and throws",
        ORANGE,
        [
            ("P3E1", "Activity Flame", "Motion heats ember into yellow-white."),
            ("P3E2", "Activity Ocean", "Motion brightens and accelerates blue waves."),
            ("P3E3", "Activity Rainbow", "Flip sets hue; activity sets brightness."),
            ("P3E4", "Flip Heat", "Faster flips heat blue toward orange."),
            ("P3E5", "Flip Direction", "Direction selects cyan or pink-red."),
            ("P3E6", "Activity Sparks", "Motion adds fast gold sparks on amber."),
            ("P3E7", "Throw Bloom", "Throw state selects color; angle adds white."),
            ("P3E8", "Axis Weave", "Roll, flip, and activity weave a rainbow."),
        ],
    ),
]


BODY = ParagraphStyle(
    "body",
    fontName="Helvetica",
    fontSize=7.3,
    leading=8.6,
    textColor=MUTED,
)


def draw_paragraph(c: canvas.Canvas, text: str, x: float, top: float, width: float) -> float:
    p = Paragraph(text, BODY)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, top - height)
    return height


def generate() -> Path:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("Motion Lab Quick Guide")
    c.setAuthor("Closscraft Labs / Luke and Yuki Creators Club project")
    c.setSubject("One-page reference for 24 offline sensor-reactive club effects")

    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 21)
    c.drawString(0.42 * inch, PAGE_H - 0.45 * inch, "MOTION LAB - PARK GUIDE")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.7)
    c.drawRightString(
        PAGE_W - 0.42 * inch,
        PAGE_H - 0.39 * inch,
        "1 click: next effect   |   2 clicks: next page   |   3 clicks: P1E1",
    )
    c.drawRightString(
        PAGE_W - 0.42 * inch,
        PAGE_H - 0.55 * inch,
        "Blue-violet flashes count page; white flashes count effect",
    )

    margin = 0.38 * inch
    gap = 0.13 * inch
    top = PAGE_H - 0.78 * inch
    bottom = 0.38 * inch
    col_w = (PAGE_W - 2 * margin - 2 * gap) / 3
    col_h = top - bottom

    for column, (page_title, subtitle, accent, effects) in enumerate(PAGES):
        x = margin + column * (col_w + gap)
        c.setFillColor(WHITE)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.8)
        c.roundRect(x, bottom, col_w, col_h, 8, fill=1, stroke=1)
        c.setFillColor(accent)
        c.roundRect(x, top - 0.57 * inch, col_w, 0.57 * inch, 8, fill=1, stroke=0)
        c.rect(x, top - 0.57 * inch, col_w, 0.12 * inch, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(x + 0.14 * inch, top - 0.23 * inch, page_title)
        c.setFont("Helvetica", 7.3)
        c.drawString(x + 0.14 * inch, top - 0.41 * inch, subtitle)

        row_top = top - 0.66 * inch
        row_h = (col_h - 0.72 * inch) / 8
        for row, (effect_id, name, description) in enumerate(effects):
            y_top = row_top - row * row_h
            if row:
                c.setStrokeColor(RULE)
                c.setLineWidth(0.5)
                c.line(x + 0.12 * inch, y_top, x + col_w - 0.12 * inch, y_top)
            c.setFillColor(accent)
            c.setFont("Helvetica-Bold", 8.4)
            c.drawString(x + 0.14 * inch, y_top - 0.20 * inch, effect_id)
            c.setFillColor(INK)
            c.setFont("Helvetica-Bold", 8.6)
            c.drawString(x + 0.58 * inch, y_top - 0.20 * inch, name)
            draw_paragraph(
                c,
                description,
                x + 0.58 * inch,
                y_top - 0.25 * inch,
                col_w - 0.72 * inch,
            )

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 6.6)
    c.drawString(margin, 0.17 * inch, "Motion Lab v0.3 | 24 effects | 15 July 2026")
    c.drawRightString(PAGE_W - margin, 0.17 * inch, "Keep the club unplugged while moving or juggling.")
    c.save()
    return OUTPUT


if __name__ == "__main__":
    print(generate())
