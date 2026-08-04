#!/usr/bin/env python3
"""Generate the printable Motion Lab field guide and feedback sheets."""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "motion-lab-field-guide.pdf"
PAGE_W, PAGE_H = letter

INK = colors.HexColor("#17202A")
MUTED = colors.HexColor("#5B6570")
PAPER = colors.HexColor("#FAF8F3")
AMBER = colors.HexColor("#E78722")
AMBER_PALE = colors.HexColor("#FFF0D9")
VIOLET = colors.HexColor("#7047B8")
VIOLET_PALE = colors.HexColor("#EEE7FA")
CYAN = colors.HexColor("#1F8CA5")
RULE = colors.HexColor("#D6D1C8")
WHITE = colors.white

STYLES = getSampleStyleSheet()
BODY = ParagraphStyle(
    "Body",
    parent=STYLES["BodyText"],
    fontName="Helvetica",
    fontSize=9.4,
    leading=12.2,
    textColor=INK,
    spaceAfter=0,
)
SMALL = ParagraphStyle(
    "Small",
    parent=BODY,
    fontSize=8.2,
    leading=10.2,
    textColor=MUTED,
)
CARD_TITLE = ParagraphStyle(
    "CardTitle",
    parent=BODY,
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
)
CENTER_SMALL = ParagraphStyle(
    "CenterSmall", parent=SMALL, alignment=TA_CENTER, fontSize=7.6, leading=9
)
TABLE_HEAD = ParagraphStyle(
    "TableHead",
    parent=SMALL,
    fontName="Helvetica-Bold",
    textColor=WHITE,
    alignment=TA_CENTER,
    fontSize=7.6,
    leading=8.8,
)


ORIENTATION = [
    ("P1-E1", "Orientation Wheel", "The whole club changes hue as its end-over-end angle changes.", "Roll it through a slow circle, then make smooth cascades."),
    ("P1-E2", "Orbit Comet", "A white-magenta comet travels around a purple-lit club.", "Compare a slow rotation with a fast spin."),
    ("P1-E3", "Opposed Comets", "Cyan and pink comets stay opposite each other on a teal-lit base.", "Try flats, helicopters, and normal throws."),
    ("P1-E4", "Pitch Horizon", "A blue-orange boundary moves along the club as it tilts up or down.", "Point the body up, sideways, and down."),
    ("P1-E5", "Roll Bands", "Teal and gold bands shift when the club rolls along its long axis.", "Hold it level and twist the handle slowly."),
    ("P1-E6", "Compass Wash", "Facing direction chooses one bright whole-club color.", "Turn your body in place; note drift or jumps."),
    ("P1-E7", "Gravity Gradient", "A blue-violet gradient follows angle and tilt while keeping a visible base.", "Sweep wide circles at several tilts."),
    ("P1-E8", "Kaleidoscope", "Mirrored rainbow wedges rotate as the club changes angle.", "Try clean singles, doubles, and stalls."),
    ("P1-E9", "Body/Handle Complement", "The large body and handle use opposite colors selected by angle.", "Look for readable silhouettes during throws."),
    ("P1-E10", "Tilt Aurora", "A moving aurora uses facing direction for hue and tilt for speed.", "Lean and turn while keeping motion gentle."),
]

DYNAMICS = [
    ("P2-E1", "Activity Flame", "Stillness is deep ember; stronger motion blooms toward hot yellow-white.", "Move from stillness to vigorous juggling."),
    ("P2-E2", "Activity Ocean", "Blue waves become brighter and faster as movement increases.", "Compare calm pendulums with fast patterns."),
    ("P2-E3", "Activity Rainbow", "Angle chooses the rainbow phase; activity controls brightness.", "Pause at an angle, then accelerate."),
    ("P2-E4", "Spin Heat", "Slow movement is cool blue; faster end-over-end spin heats toward orange.", "Try slow singles, fast singles, then doubles."),
    ("P2-E5", "Spin Direction", "Spin direction chooses cyan or pink-red; speed controls intensity.", "Reverse the rotation and check reliability."),
    ("P2-E6", "Spin Spokes", "Faster spin adds more colored spokes around a purple-lit base.", "Build speed gradually and count what appears."),
    ("P2-E7", "Activity Sparks", "Movement adds brighter, faster gold sparks over a dim amber club.", "Shake, swing, and juggle at three energies."),
    ("P2-E8", "Motion Breath", "Activity changes the breathing rate and shifts the hue from violet toward warm.", "Hold still, walk, then juggle continuously."),
    ("P2-E9", "Throw Bloom", "Detected throw types receive different whole-club colors plus a white angle point.", "Over a soft area, compare flat, single, and double throws."),
    ("P2-E10", "Hybrid", "Angle, activity, and spin combine into a bright traveling rainbow wave.", "Freestyle: find motions that create repeatable looks."),
]


def paragraph(text: str, style: ParagraphStyle = BODY) -> Paragraph:
    return Paragraph(text, style)


def draw_paragraph(c: canvas.Canvas, text: str, x: float, y_top: float, width: float, style: ParagraphStyle = BODY) -> float:
    p = paragraph(text, style)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y_top - height)
    return y_top - height


def header(c: canvas.Canvas, title: str, kicker: str, accent) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(accent)
    c.rect(0, PAGE_H - 18, PAGE_W, 18, fill=1, stroke=0)
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(42, PAGE_H - 45, kicker.upper())
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(42, PAGE_H - 76, title)
    c.setStrokeColor(accent)
    c.setLineWidth(2)
    c.line(42, PAGE_H - 91, PAGE_W - 42, PAGE_H - 91)


def footer(c: canvas.Canvas, page_number: int) -> None:
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(42, 25, "Motion Lab v0.2  |  Flowtoys Creators Club  |  15 July 2026")
    c.drawRightString(PAGE_W - 42, 25, f"Page {page_number} of 5")


def rounded_box(c: canvas.Canvas, x: float, y: float, w: float, h: float, fill, stroke=RULE, radius: float = 9) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.8)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=1)


def page_quick_start(c: canvas.Canvas) -> None:
    header(c, "Motion Lab Field Guide", "Offline sensor playground", CYAN)
    y = PAGE_H - 116
    y = draw_paragraph(
        c,
        "A button-controlled program for exploring how club movement can become light. It contains <b>2 pages and 20 effects</b>. Every normal effect keeps some light across the club so it remains visible in a dark room.",
        42,
        y,
        PAGE_W - 84,
        ParagraphStyle("Lead", parent=BODY, fontSize=12, leading=16),
    )

    box_y = y - 102
    controls = [
        ("1 CLICK", "Next effect", "Wait about half a second for the click group to settle."),
        ("2 QUICK CLICKS", "Next page", "The new page always begins at effect 1."),
        ("3 QUICK CLICKS", "Go home", "Reset to Page 1, Effect 1 from anywhere."),
        ("MARKER", "Read the address", "Blue-violet flashes count the page; white flashes count the effect."),
    ]
    box_w = (PAGE_W - 108) / 4
    for i, (label, title, text) in enumerate(controls):
        x = 42 + i * (box_w + 8)
        rounded_box(c, x, box_y, box_w, 88, WHITE)
        c.setFillColor(CYAN)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawString(x + 10, box_y + 66, label)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 10, box_y + 50, title)
        draw_paragraph(c, text, x + 10, box_y + 39, box_w - 20, ParagraphStyle("ControlSmall", parent=SMALL, fontSize=7.6, leading=9.2))

    y = box_y - 27
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(42, y, "A simple test session")
    y -= 18
    steps = [
        ("1", "Unplug before moving", "Confirm the club starts Motion Lab on battery. Give it room; do not juggle while attached to USB."),
        ("2", "Start slow", "For each effect: hold still, rotate slowly, make one controlled movement, then juggle normally."),
        ("3", "Watch the whole silhouette", "Notice the brighter club body and smaller handle. Ask whether the effect reads from across a dark room."),
        ("4", "Record repeatability", "Can you deliberately make the same visual again? A beautiful accident and a controllable cue are both useful, but different."),
        ("5", "Write compact feedback", "Use P1-E4 style IDs. Rate visibility and response from 1 to 5, then mark Keep, Tune, or Drop."),
    ]
    for number, title, text in steps:
        c.setFillColor(CYAN)
        c.circle(53, y - 4, 11, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 9)
        c.drawCentredString(53, y - 7, number)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(72, y, title)
        draw_paragraph(c, text, 72, y - 4, PAGE_W - 114, SMALL)
        y -= 55

    rounded_box(c, 42, 76, PAGE_W - 84, 72, colors.HexColor("#FFF7E8"), AMBER)
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(54, 127, "SAFETY + INTERPRETATION")
    draw_paragraph(
        c,
        "Test throws over a clear, soft area. Avoid long button holds during selection because the club's normal power control still applies. Example marker: P2-E1 is blue-violet, blue-violet, white. Sensor labels describe intent, not a guarantee; calibration and repeatability matter.",
        54,
        114,
        PAGE_W - 108,
        SMALL,
    )
    footer(c, 1)
    c.showPage()


def effect_page(c: canvas.Canvas, page_no: int, title: str, subtitle: str, accent, pale, effects) -> None:
    header(c, title, subtitle, accent)
    card_w = (PAGE_W - 94) / 2
    card_h = 119
    top = PAGE_H - 112
    for index, (effect_id, name, behavior, test) in enumerate(effects):
        col = index % 2
        row = index // 2
        x = 42 + col * (card_w + 10)
        y = top - (row + 1) * card_h
        rounded_box(c, x, y, card_w, card_h - 9, WHITE, RULE)
        c.setFillColor(accent)
        c.roundRect(x, y + card_h - 37, card_w, 28, 9, fill=1, stroke=0)
        c.rect(x, y + card_h - 37, card_w, 9, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 10, y + card_h - 26, effect_id)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 50, y + card_h - 26, name)
        draw_paragraph(c, behavior, x + 10, y + card_h - 45, card_w - 20, BODY)
        c.setFillColor(pale)
        c.roundRect(x + 9, y + 9, card_w - 18, 31, 6, fill=1, stroke=0)
        draw_paragraph(c, f"<b>Try:</b> {test}", x + 15, y + 34, card_w - 30, SMALL)
    footer(c, page_no)
    c.showPage()


def feedback_page(c: canvas.Canvas, page_no: int, title: str, accent, effects) -> None:
    header(c, title, "Field feedback sheet", accent)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8.5)
    c.drawString(42, PAGE_H - 108, "Testers: ______________________________")
    c.drawString(300, PAGE_H - 108, "Date / place: ______________________________")
    c.drawString(42, PAGE_H - 127, "Club(s): _________________________________")
    c.drawString(300, PAGE_H - 127, "Brightness / distance: _______________________")

    data = [[
        paragraph("ID + EFFECT", TABLE_HEAD),
        paragraph("MOVEMENT TRIED", TABLE_HEAD),
        paragraph("VISIBILITY<br/>1-5", TABLE_HEAD),
        paragraph("RESPONSE<br/>1-5", TABLE_HEAD),
        paragraph("KEEP / TUNE / DROP", TABLE_HEAD),
        paragraph("NOTES: WHAT WORKED? WHAT SHOULD CHANGE?", TABLE_HEAD),
    ]]
    for effect_id, name, _, _ in effects:
        data.append([
            paragraph(f"<b>{effect_id}</b><br/>{name}", ParagraphStyle("EffectCell", parent=SMALL, textColor=INK)),
            "",
            "",
            "",
            paragraph("KEEP<br/>TUNE<br/>DROP", CENTER_SMALL),
            "",
        ])
    table = Table(
        data,
        colWidths=[116, 86, 46, 46, 75, 159],
        rowHeights=[31] + [49] * 10,
        repeatRows=1,
    )
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), accent),
        ("GRID", (0, 0), (-1, -1), 0.65, RULE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 1), (-1, -1), 5),
        ("RIGHTPADDING", (0, 1), (-1, -1), 5),
        ("TOPPADDING", (0, 1), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 4),
        ("BACKGROUND", (0, 1), (-1, -1), WHITE),
    ]))
    table.wrapOn(c, PAGE_W - 84, PAGE_H)
    table.drawOn(c, 42, 94)
    c.setFillColor(MUTED)
    c.setFont("Helvetica-Oblique", 8)
    c.drawString(42, 72, "Rating guide: 1 = unusable / invisible, 3 = promising but needs tuning, 5 = performance-ready response.")
    footer(c, page_no)
    c.showPage()


def generate() -> Path:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("Motion Lab Field Guide")
    c.setAuthor("Closscraft Labs / Luke and Yuki Creators Club project")
    c.setSubject("Offline motion-reactive effects test guide and feedback sheets")
    page_quick_start(c)
    effect_page(c, 2, "Page 1: Orientation", "Angle, tilt, roll, and facing direction", AMBER, AMBER_PALE, ORIENTATION)
    effect_page(c, 3, "Page 2: Dynamics", "Activity, spin, direction, and throw state", VIOLET, VIOLET_PALE, DYNAMICS)
    feedback_page(c, 4, "Page 1 Feedback", AMBER, ORIENTATION)
    feedback_page(c, 5, "Page 2 Feedback", VIOLET, DYNAMICS)
    c.save()
    return OUTPUT


if __name__ == "__main__":
    print(generate())
