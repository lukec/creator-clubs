#!/usr/bin/env python3
"""Generate the two-page physical evaluation sheet for on-club Motion Lab V6."""

from __future__ import annotations

import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "scenes" / "motion-lab-v6" / "effects.json"
OUTPUT = ROOT / "output" / "pdf" / "motion-lab-v6-physical-evaluation.pdf"
PAGE_W, PAGE_H = landscape(letter)

INK = colors.HexColor("#122033")
MUTED = colors.HexColor("#526273")
PAPER = colors.HexColor("#FCFBF8")
WHITE = colors.white
RULE = colors.HexColor("#D7DEE5")
HEADER = colors.HexColor("#17324D")
CYAN = colors.HexColor("#138EA5")
GOLD = colors.HexColor("#B7791F")
VIOLET = colors.HexColor("#7650A8")
TEAL = colors.HexColor("#167E74")
RED = colors.HexColor("#B43A48")

PAGE_COLORS = {1: CYAN, 2: GOLD, 3: VIOLET, 4: TEAL, 5: RED}

MARGIN_X = 28.0
CONTENT_W = PAGE_W - MARGIN_X * 2
TABLE_TOP = 473.0
TABLE_HEAD_H = 21.0
ROW_H = 20.6
FOOTER_Y = 25.0
COLUMN_WIDTHS = (47.0, 138.0, 238.0, 72.0, 67.0, 174.0)
assert sum(COLUMN_WIDTHS) == CONTENT_W

NAME_STYLE = ParagraphStyle(
    "EffectName",
    fontName="Helvetica-Bold",
    fontSize=6.9,
    leading=7.7,
    textColor=INK,
)
STUDY_STYLE = ParagraphStyle(
    "Study",
    fontName="Helvetica",
    fontSize=6.35,
    leading=7.25,
    textColor=MUTED,
)


def load_catalog() -> list[dict[str, object]]:
    data = json.loads(CATALOG.read_text())
    assert data["version"] == "6-experimental"
    assert data["addressBase"] == 6000
    entries: list[dict[str, object]] = []
    for page in data["pages"]:
        effects = page["effects"]
        assert len(effects) == 8
        for effect in effects:
            entries.append(
                {
                    "page": page["page"],
                    "page_name": page["name"],
                    "effect": effect["effect"],
                    "id": f"P{page['page']}E{effect['effect']}",
                    "name": effect["name"],
                    "study": effect["study"],
                }
            )
    assert len(entries) == 40
    assert [entry["id"] for entry in entries] == [
        f"P{page}E{effect}" for page in range(1, 6) for effect in range(1, 9)
    ]
    return entries


def place_paragraph(
    c: canvas.Canvas,
    text: str,
    style: ParagraphStyle,
    x: float,
    row_y: float,
    width: float,
    height: float,
) -> None:
    paragraph = Paragraph(escape(text), style)
    _, paragraph_h = paragraph.wrap(width, height)
    paragraph.drawOn(c, x, row_y + (height - paragraph_h) / 2)


def draw_text(c: canvas.Canvas, text: str, x: float, y: float, font: str, size: float, color) -> None:
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, text)


def tint(color: colors.Color, strength: float) -> colors.Color:
    """Return an opaque paper tint so page graphics state cannot leak alpha."""
    return colors.Color(
        1.0 - (1.0 - color.red) * strength,
        1.0 - (1.0 - color.green) * strength,
        1.0 - (1.0 - color.blue) * strength,
    )


def draw_wrapped_label(c: canvas.Canvas, text: str, x: float, y: float, width: float, color) -> None:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, "Helvetica-Bold", 7.1) <= width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    lines = lines[:2]
    if len(lines) == 1:
        draw_text(c, lines[0], x, y + 3.0, "Helvetica-Bold", 7.1, color)
    else:
        draw_text(c, lines[0], x, y + 6.7, "Helvetica-Bold", 7.1, color)
        draw_text(c, lines[1], x, y - 1.0, "Helvetica-Bold", 7.1, color)


def draw_section_pills(c: canvas.Canvas, labels: list[tuple[str, colors.Color]]) -> None:
    x = MARGIN_X
    y = 501.0
    for label, color in labels:
        width = stringWidth(label, "Helvetica-Bold", 7.1) + 20
        c.setFillColor(tint(color, 0.12))
        c.setStrokeColor(tint(color, 0.55))
        c.roundRect(x, y, width, 15, 7.5, fill=1, stroke=1)
        draw_text(c, label, x + 10, y + 4.4, "Helvetica-Bold", 7.1, color)
        x += width + 7


def draw_header(c: canvas.Canvas, page_number: int) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(HEADER)
    c.rect(0, PAGE_H - 12, PAGE_W, 12, fill=1, stroke=0)
    draw_text(c, "MOTION LAB V6", MARGIN_X, PAGE_H - 39, "Helvetica-Bold", 18.5, INK)
    draw_text(c, "Physical club evaluation - 40 on-club effects only", MARGIN_X, PAGE_H - 54, "Helvetica", 8.6, MUTED)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.8)
    c.line(MARGIN_X, PAGE_H - 63, PAGE_W - MARGIN_X, PAGE_H - 63)

    if page_number == 1:
        draw_text(c, "PAGE 1 OF 2", PAGE_W - MARGIN_X - 78, PAGE_H - 39, "Helvetica-Bold", 8.1, CYAN)
        draw_text(c, "P1 Roll, P2 Flip, P3 Energy E1-E4", PAGE_W - MARGIN_X - 212, PAGE_H - 54, "Helvetica", 7.5, MUTED)
        draw_section_pills(c, [("P1 ROLL  E1-E8", CYAN), ("P2 FLIP  E1-E8", GOLD), ("P3 ENERGY  E1-E4", VIOLET)])
    else:
        draw_text(c, "PAGE 2 OF 2", PAGE_W - MARGIN_X - 78, PAGE_H - 39, "Helvetica-Bold", 8.1, TEAL)
        draw_text(c, "P3 Energy E5-E8 continued, P4 Flight, P5 Police", PAGE_W - MARGIN_X - 250, PAGE_H - 54, "Helvetica", 7.5, MUTED)
        draw_section_pills(c, [("P3 ENERGY  E5-E8 - CONTINUED", VIOLET), ("P4 FLIGHT  E1-E8", TEAL), ("P5 POLICE  E1-E8", RED)])

    draw_text(
        c,
        "Tester: __________________  Club: __________________  Date / venue: __________________  Brightness / distance: __________________",
        MARGIN_X,
        487.0,
        "Helvetica",
        7.1,
        MUTED,
    )


def draw_table_header(c: canvas.Canvas) -> list[float]:
    c.setFillColor(HEADER)
    c.rect(MARGIN_X, TABLE_TOP - TABLE_HEAD_H, CONTENT_W, TABLE_HEAD_H, fill=1, stroke=0)
    starts = [MARGIN_X]
    for width in COLUMN_WIDTHS[:-1]:
        starts.append(starts[-1] + width)
    labels = ("ID", "EFFECT", "WHAT TO LOOK FOR", "RATE", "VERDICT", "NOTE")
    for index, label in enumerate(labels):
        draw_text(c, label, starts[index] + 6, TABLE_TOP - 13.4, "Helvetica-Bold", 6.5, WHITE)
    c.setStrokeColor(colors.HexColor("#9DAFBE"))
    c.setLineWidth(0.45)
    for x in starts[1:]:
        c.line(x, TABLE_TOP - TABLE_HEAD_H, x, TABLE_TOP)
    return starts


def draw_effect_rows(c: canvas.Canvas, entries: list[dict[str, object]]) -> None:
    assert len(entries) == 20
    starts = draw_table_header(c)
    previous_page: int | None = None
    for row, entry in enumerate(entries):
        y = TABLE_TOP - TABLE_HEAD_H - (row + 1) * ROW_H
        page = int(entry["page"])
        color = PAGE_COLORS[page]
        if row % 2:
            c.setFillColor(colors.HexColor("#F8FAFC"))
        else:
            c.setFillColor(WHITE)
        c.rect(MARGIN_X, y, CONTENT_W, ROW_H, fill=1, stroke=0)
        c.setFillColor(tint(color, 0.14))
        c.rect(MARGIN_X, y, 4.2, ROW_H, fill=1, stroke=0)

        c.setStrokeColor(color if page != previous_page else RULE)
        c.setLineWidth(1.1 if page != previous_page else 0.38)
        c.line(MARGIN_X, y + ROW_H, PAGE_W - MARGIN_X, y + ROW_H)
        c.setStrokeColor(RULE)
        c.setLineWidth(0.35)
        for x in starts[1:]:
            c.line(x, y, x, y + ROW_H)

        draw_text(c, str(entry["id"]), starts[0] + 8, y + 7.1, "Helvetica-Bold", 6.8, color)
        draw_wrapped_label(c, str(entry["name"]), starts[1] + 6, y + 5.4, COLUMN_WIDTHS[1] - 11, INK)
        place_paragraph(c, str(entry["study"]), STUDY_STYLE, starts[2] + 6, y, COLUMN_WIDTHS[2] - 10, ROW_H)
        draw_text(c, "V ____", starts[3] + 7, y + 11.5, "Helvetica", 6.25, INK)
        draw_text(c, "R ____", starts[3] + 7, y + 4.0, "Helvetica", 6.25, INK)
        draw_text(c, "[ ] K", starts[4] + 5, y + 11.5, "Helvetica", 6.1, INK)
        draw_text(c, "[ ] T", starts[4] + 31, y + 11.5, "Helvetica", 6.1, INK)
        draw_text(c, "[ ] D", starts[4] + 5, y + 4.0, "Helvetica", 6.1, INK)
        c.setStrokeColor(colors.HexColor("#BFCAD5"))
        c.setLineWidth(0.45)
        c.line(starts[5] + 6, y + 8.5, starts[5] + COLUMN_WIDTHS[5] - 7, y + 8.5)
        previous_page = page

    bottom = TABLE_TOP - TABLE_HEAD_H - len(entries) * ROW_H
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.rect(MARGIN_X, bottom, CONTENT_W, TABLE_HEAD_H + len(entries) * ROW_H, fill=0, stroke=1)


def draw_footer(c: canvas.Canvas, page_number: int) -> None:
    draw_text(c, "V = visibility (1-5)   R = repeatability/control (1-5)   K = keep   T = tune   D = drop", MARGIN_X, FOOTER_Y, "Helvetica", 6.8, MUTED)
    draw_text(c, "40 on-club V6 effects - browser-only Theme Studio excluded", PAGE_W - MARGIN_X - 217, FOOTER_Y, "Helvetica-Oblique", 6.8, MUTED)
    draw_text(c, f"{page_number} / 2", PAGE_W - MARGIN_X, 12.5, "Helvetica-Bold", 6.8, INK)


def draw_page(c: canvas.Canvas, page_number: int, entries: list[dict[str, object]]) -> None:
    draw_header(c, page_number)
    draw_effect_rows(c, entries)
    draw_footer(c, page_number)
    c.showPage()


def generate() -> Path:
    entries = load_catalog()
    page_one = [entry for entry in entries if int(entry["page"]) in (1, 2)] + [
        entry for entry in entries if int(entry["page"]) == 3 and int(entry["effect"]) <= 4
    ]
    page_two = [
        entry for entry in entries if int(entry["page"]) == 3 and int(entry["effect"]) >= 5
    ] + [entry for entry in entries if int(entry["page"]) in (4, 5)]
    assert len(page_one) == len(page_two) == 20
    assert [entry["id"] for entry in page_one[-4:]] == ["P3E1", "P3E2", "P3E3", "P3E4"]
    assert [entry["id"] for entry in page_two[:4]] == ["P3E5", "P3E6", "P3E7", "P3E8"]

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=landscape(letter), pageCompression=1)
    c.setTitle("Motion Lab V6 Physical Evaluation")
    c.setAuthor("Closscraft Labs / Luke and Yuki Creators Club project")
    c.setSubject("Two-page field handout for the 40 on-club Motion Lab V6 effects")
    draw_page(c, 1, page_one)
    draw_page(c, 2, page_two)
    c.save()
    return OUTPUT


if __name__ == "__main__":
    print(generate())
