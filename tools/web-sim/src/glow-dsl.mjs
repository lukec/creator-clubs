const STATION_COUNT = 16;
const LED_COUNT = 32;
const HANDLE_STATION_COUNT = 7;

export const GLOW_DSL_LIMITS = Object.freeze({
  maxSourceLength: 8192,
  maxLineLength: 512,
  maxLines: 128,
  maxPaintStatements: 64,
  maxPatternNameLength: 80,
});

export const GLOW_DSL_LAYOUT = Object.freeze({
  id: "paired16-v0",
  stationCount: STATION_COUNT,
  ledCount: LED_COUNT,
  handleStations: Object.freeze([1, 2, 3, 4, 5, 6, 7]),
  bodyStations: Object.freeze([8, 9, 10, 11, 12, 13, 14, 15, 16]),
  sideAOffset: 0,
  sideBOffset: STATION_COUNT,
});

export class GlowDslError extends SyntaxError {
  constructor(message, line = null) {
    super(line === null ? message : `line ${line}: ${message}`);
    this.name = "GlowDslError";
    this.line = line;
  }
}

const PRESET = (lines) => `${lines.join("\n")}\n`;

export const GLOW_DSL_PRESETS = Object.freeze({
  reference: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern Official-photo gradient",
    "level 1",
    "clear",
    "both all = [#326cff, #615cff, #9e52ff, #d442ff, #ed35e9, #ff31c1, #ff2ca0, #ff2586, #ff286f, #ff325f, #ff445b, #ff5a65, #ff6e75, #ff8290, #ff9fb2, #ffd4f2]",
  ]),
  handle: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern One handle pair",
    "level 1",
    "clear",
    "both 4 = #ff2fdc",
  ]),
  body: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern One body pair",
    "level 1",
    "clear",
    "both 12 = #ff2860",
  ]),
  adjacent: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern Adjacent body pairs",
    "level 1",
    "clear",
    "both [11, 12] = [#ff0e36, #0c48ff]",
  ]),
  alternating: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern Alternating pairs",
    "level 1",
    "clear",
    "both all = tile(#ff0e36, #0c48ff)",
  ]),
  white: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern All white",
    "level 1",
    "clear",
    "both all = #fff0ff",
  ]),
  off: PRESET([
    "glow 1",
    "layout paired16-v0",
    "pattern LEDs off",
    "level 1",
    "clear",
    "both all = off",
  ]),
});

export const GLOW_DSL_PRESET_ORDER = Object.freeze([
  "reference",
  "handle",
  "body",
  "adjacent",
  "alternating",
  "white",
  "off",
]);

const blackFrame = () => Array.from({ length: LED_COUNT }, () => [0, 0, 0]);

const fail = (message, line = null) => {
  throw new GlowDslError(message, line);
};

const parseHexColor = (token, line) => {
  const match = /^#([0-9a-fA-F]{6})$/.exec(token.trim());
  if (!match) fail(`expected a color in #RRGGBB form, got "${token.trim()}"`, line);
  const value = Number.parseInt(match[1], 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const parseColorList = (text, line) => {
  const tokens = text.split(",").map((token) => token.trim());
  if (tokens.length === 0 || tokens.some((token) => token.length === 0)) {
    fail("color lists cannot be empty and must separate colors with commas", line);
  }
  return tokens.map((token) => parseHexColor(token, line));
};

const stationRange = (start, end) => Array.from(
  { length: end - start + 1 },
  (_, index) => start + index,
);

const assertStation = (station, line) => {
  if (!Number.isInteger(station) || station < 1 || station > STATION_COUNT) {
    fail(`station ${station} is outside 1..${STATION_COUNT}`, line);
  }
  return station;
};

const parseSelector = (source, line) => {
  const selector = source.trim();
  if (selector === "all") return stationRange(1, STATION_COUNT);
  if (selector === "handle") return stationRange(1, HANDLE_STATION_COUNT);
  if (selector === "body") return stationRange(HANDLE_STATION_COUNT + 1, STATION_COUNT);
  if (selector === "odd") return stationRange(1, STATION_COUNT).filter((station) => station % 2 === 1);
  if (selector === "even") return stationRange(1, STATION_COUNT).filter((station) => station % 2 === 0);

  const single = /^(\d+)$/.exec(selector);
  if (single) return [assertStation(Number(single[1]), line)];

  const range = /^(\d+)\.\.(\d+)$/.exec(selector);
  if (range) {
    const start = assertStation(Number(range[1]), line);
    const end = assertStation(Number(range[2]), line);
    if (start > end) fail("station ranges must run from low to high", line);
    return stationRange(start, end);
  }

  const list = /^\[([^\]]*)\]$/.exec(selector);
  if (list) {
    const tokens = list[1].split(",").map((token) => token.trim());
    if (tokens.length === 0 || tokens.some((token) => !/^\d+$/.test(token))) {
      fail("station lists must contain comma-separated integers", line);
    }
    const stations = tokens.map((token) => assertStation(Number(token), line));
    if (new Set(stations).size !== stations.length) {
      fail("station lists cannot contain duplicates", line);
    }
    return stations;
  }

  fail(`unknown selector "${selector}"`, line);
};

const interpolateColor = (start, end, amount) => start.map(
  (channel, index) => Math.round(channel + (end[index] - channel) * amount),
);

const rampColors = (stops, count) => {
  if (count === 1) return [[...stops[0]]];
  return Array.from({ length: count }, (_, index) => {
    const position = index / (count - 1);
    const scaled = position * (stops.length - 1);
    const stopIndex = Math.min(Math.floor(scaled), stops.length - 2);
    return interpolateColor(stops[stopIndex], stops[stopIndex + 1], scaled - stopIndex);
  });
};

const parsePaint = (source, selectedCount, line) => {
  const paint = source.trim();
  if (paint === "off") return Array.from({ length: selectedCount }, () => [0, 0, 0]);
  if (/^#[0-9a-fA-F]{6}$/.test(paint)) {
    const color = parseHexColor(paint, line);
    return Array.from({ length: selectedCount }, () => [...color]);
  }

  const exact = /^\[([^\]]*)\]$/.exec(paint);
  if (exact) {
    const colors = parseColorList(exact[1], line);
    if (colors.length !== selectedCount) {
      fail(`exact color list has ${colors.length} colors for ${selectedCount} selected stations`, line);
    }
    return colors;
  }

  const tile = /^tile\((.*)\)$/.exec(paint);
  if (tile) {
    const colors = parseColorList(tile[1], line);
    return Array.from({ length: selectedCount }, (_, index) => [...colors[index % colors.length]]);
  }

  const ramp = /^ramp\((.*)\)$/.exec(paint);
  if (ramp) {
    const tokens = ramp[1].split("->").map((token) => token.trim());
    if (tokens.length < 2 || tokens.some((token) => token.length === 0)) {
      fail("ramps require at least two colors separated by ->", line);
    }
    return rampColors(tokens.map((token) => parseHexColor(token, line)), selectedCount);
  }

  fail(`unknown paint "${paint}"`, line);
};

const sanitizeSource = (source) => {
  if (typeof source !== "string") throw new TypeError("Glow DSL source must be a string");
  if (source.length > GLOW_DSL_LIMITS.maxSourceLength) {
    fail(`source exceeds ${GLOW_DSL_LIMITS.maxSourceLength} characters`);
  }
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(source)) {
    fail("source contains unsupported control characters");
  }
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  if (lines.length > GLOW_DSL_LIMITS.maxLines) {
    fail(`source exceeds ${GLOW_DSL_LIMITS.maxLines} lines`);
  }
  lines.forEach((line, index) => {
    if (line.length > GLOW_DSL_LIMITS.maxLineLength) {
      fail(`line exceeds ${GLOW_DSL_LIMITS.maxLineLength} characters`, index + 1);
    }
  });
  return lines;
};

const logicalLines = (source) => sanitizeSource(source)
  .map((raw, index) => ({
    line: index + 1,
    text: raw.replace(/\/\/.*$/, "").trim(),
  }))
  .filter(({ text }) => text.length > 0);

export function compileGlowDslDocument(source) {
  const lines = logicalLines(source);
  if (lines.length === 0) fail("source is empty");
  if (lines[0].text !== "glow 1") fail('first statement must be "glow 1"', lines[0].line);
  if (lines.length < 2 || lines[1].text !== "layout paired16-v0") {
    fail('second statement must be "layout paired16-v0"', lines[1]?.line ?? lines[0].line);
  }

  let pattern = null;
  let level = 1;
  let sawPattern = false;
  let sawLevel = false;
  let sawClear = false;
  let paintStatements = 0;
  const frame = blackFrame();

  for (const { text, line } of lines.slice(2)) {
    if (text.startsWith("pattern ")) {
      if (paintStatements > 0) fail("pattern metadata must appear before paint statements", line);
      if (sawPattern) fail("pattern may only be declared once", line);
      pattern = text.slice("pattern ".length).trim();
      if (pattern.length === 0) fail("pattern name cannot be empty", line);
      if (pattern.length > GLOW_DSL_LIMITS.maxPatternNameLength) {
        fail(`pattern name exceeds ${GLOW_DSL_LIMITS.maxPatternNameLength} characters`, line);
      }
      sawPattern = true;
      continue;
    }

    if (text.startsWith("level ")) {
      if (paintStatements > 0) fail("level must appear before paint statements", line);
      if (sawLevel) fail("level may only be declared once", line);
      const token = text.slice("level ".length).trim();
      if (!/^(?:0(?:\.\d+)?|1(?:\.0+)?)$/.test(token)) {
        fail("level must be a decimal from 0 through 1", line);
      }
      level = Number(token);
      sawLevel = true;
      continue;
    }

    if (text === "clear") {
      if (paintStatements > 0) fail("clear must appear before paint statements", line);
      if (sawClear) fail("clear may only be declared once", line);
      frame.forEach((color) => color.fill(0));
      sawClear = true;
      continue;
    }

    if (/^(?:glow|layout)(?:\s|$)/.test(text)) fail("headers may only appear once at the top", line);

    const statement = /^(both|side-a|side-b)\s+(.+?)\s*=\s*(.+)$/.exec(text);
    if (!statement) fail(`unrecognized statement "${text}"`, line);
    paintStatements += 1;
    if (paintStatements > GLOW_DSL_LIMITS.maxPaintStatements) {
      fail(`source exceeds ${GLOW_DSL_LIMITS.maxPaintStatements} paint statements`, line);
    }

    const [, side, selectorSource, paintSource] = statement;
    const stations = parseSelector(selectorSource, line);
    const colors = parsePaint(paintSource, stations.length, line);
    const offsets = side === "both" ? [0, STATION_COUNT] : [side === "side-a" ? 0 : STATION_COUNT];
    offsets.forEach((offset) => {
      stations.forEach((station, index) => {
        frame[offset + station - 1] = [...colors[index]];
      });
    });
  }

  const scaledFrame = frame.map((color) => color.map((channel) => Math.round(channel * level)));
  return {
    version: 1,
    layout: GLOW_DSL_LAYOUT.id,
    pattern,
    level,
    frame: scaledFrame,
  };
}

export function compileGlowDsl(source) {
  return compileGlowDslDocument(source).frame;
}
