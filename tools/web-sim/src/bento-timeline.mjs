const DEFAULT_RESOLUTION = 32;
const SUPPORTED_PATTERNS = new Set([
  "ledRange",
  "multipoint",
  "noise",
  "point",
  "rainbow",
  "range",
  "solidColor",
  "strobe",
]);

const clamp = (value, low = 0, high = 1) => Math.max(low, Math.min(high, value));
const wrap = (value, modulus = 1) => ((value % modulus) + modulus) % modulus;
const rgba = (red = 0, green = 0, blue = 0, alpha = 1) => [red, green, blue, alpha];
const transparentFrame = (resolution) => Array.from({ length: resolution }, () => rgba(0, 0, 0, 0));

const normalizeAddress = (address) => String(address || "").replace(/^\//, "");

export const parametersToObject = (container) => {
  const result = Object.create(null);
  const parameters = Array.isArray(container)
    ? container
    : Array.isArray(container?.parameters)
      ? container.parameters
      : [];
  for (const parameter of parameters) {
    if (!parameter || typeof parameter.controlAddress !== "string") continue;
    result[normalizeAddress(parameter.controlAddress)] = parameter.value;
  }
  return result;
};

const findParameter = (container, address) => {
  const normalized = normalizeAddress(address);
  const parameters = Array.isArray(container)
    ? container
    : Array.isArray(container?.parameters)
      ? container.parameters
      : [];
  return parameters.find((parameter) => normalizeAddress(parameter?.controlAddress) === normalized);
};

const parameterValue = (container, address, fallback, { disabledValue = fallback } = {}) => {
  const parameter = findParameter(container, address);
  if (!parameter) return fallback;
  if (parameter.enabled === false) return disabledValue;
  return parameter.value ?? fallback;
};

const asNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const asColor = (value, fallback = [0, 0, 0, 1]) => {
  if (!Array.isArray(value) || value.length < 3) return [...fallback];
  return [
    clamp(asNumber(value[0])),
    clamp(asNumber(value[1])),
    clamp(asNumber(value[2])),
    clamp(asNumber(value[3], 1)),
  ];
};

const multiplyBrightness = (color, brightness) => [
  clamp(color[0] * brightness),
  clamp(color[1] * brightness),
  clamp(color[2] * brightness),
  color[3],
];

const interpolateColor = (from, to, amount) => {
  const weight = clamp(amount);
  return from.map((channel, index) => channel + (to[index] - channel) * weight);
};

const rgbToHsv = ([red, green, blue]) => {
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  let hue = 0;
  if (delta > 0) {
    if (maximum === red) hue = ((green - blue) / delta) % 6;
    else if (maximum === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue /= 6;
  }
  return [wrap(hue), maximum === 0 ? 0 : delta / maximum, maximum];
};

const hsvToRgb = (hue, saturation, value, alpha = 1) => {
  const h = wrap(hue) * 6;
  const chroma = value * saturation;
  const x = chroma * (1 - Math.abs((h % 2) - 1));
  const match = value - chroma;
  let channels;
  if (h < 1) channels = [chroma, x, 0];
  else if (h < 2) channels = [x, chroma, 0];
  else if (h < 3) channels = [0, chroma, x];
  else if (h < 4) channels = [0, x, chroma];
  else if (h < 5) channels = [x, 0, chroma];
  else channels = [chroma, 0, x];
  return [...channels.map((channel) => clamp(channel + match)), clamp(alpha)];
};

const patternNameFromPath = (path) => {
  const raw = String(path || "").split("/").filter(Boolean).at(-1) || "";
  const aliases = {
    "led-range": "ledRange",
    ledRange: "ledRange",
    multipoint: "multipoint",
    noise: "noise",
    point: "point",
    rainbow: "rainbow",
    range: "range",
    solidColor: "solidColor",
    "solid-color": "solidColor",
    strobe: "strobe",
  };
  return aliases[raw] || raw;
};

// BenTo's Noise pattern uses a default siv::PerlinNoise instance. That helper
// is not included in the published source snapshot, so this deterministic
// gradient-noise implementation preserves the same controls and range while
// remaining explicitly reported as an approximation by inspectBentoProject().
const permutation = (() => {
  const values = Array.from({ length: 256 }, (_, index) => index);
  let state = 0x4b1d_5eed;
  for (let index = values.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const target = state % (index + 1);
    [values[index], values[target]] = [values[target], values[index]];
  }
  return [...values, ...values];
})();

const fadeCurve = (value) => value ** 3 * (value * (value * 6 - 15) + 10);
const gradient = (hash, x, y) => {
  const choice = hash & 7;
  const u = choice < 4 ? x : y;
  const v = choice < 4 ? y : x;
  return ((choice & 1) ? -u : u) + ((choice & 2) ? -2 * v : 2 * v);
};
const perlin01 = (x, y) => {
  const floorX = Math.floor(x);
  const floorY = Math.floor(y);
  const cellX = floorX & 255;
  const cellY = floorY & 255;
  const localX = x - floorX;
  const localY = y - floorY;
  const u = fadeCurve(localX);
  const v = fadeCurve(localY);
  const aa = permutation[permutation[cellX] + cellY];
  const ab = permutation[permutation[cellX] + cellY + 1];
  const ba = permutation[permutation[cellX + 1] + cellY];
  const bb = permutation[permutation[cellX + 1] + cellY + 1];
  const top = gradient(aa, localX, localY) * (1 - u) + gradient(ba, localX - 1, localY) * u;
  const bottom = gradient(ab, localX, localY - 1) * (1 - u) + gradient(bb, localX - 1, localY - 1) * u;
  return clamp((top * (1 - v) + bottom * v) * 0.25 + 0.5);
};

const evaluateSolidColor = ({ params, time, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 1);
  const color = asColor(params.color, [1, 0, 0, 1]);
  const [baseHue, saturation, value] = rgbToHsv(color);
  const hue = baseHue
    + time * asNumber(params.hueSpeed)
    + propId * asNumber(params.idOffset);
  const output = hsvToRgb(hue, saturation, value * brightness, color[3]);
  return Array.from({ length: resolution }, () => [...output]);
};

const evaluateRainbow = ({ params, time, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 0.75);
  const offset = time * asNumber(params.speed)
    + asNumber(params.offset)
    + propId * asNumber(params.idOffset);
  const density = asNumber(params.density, 1);
  return Array.from({ length: resolution }, (_, index) => {
    const hue = wrap((1 - index / resolution) * density + offset);
    return hsvToRgb(hue, 1, brightness, 1);
  });
};

const evaluateNoise = ({ params, time, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 1);
  const foreground = asColor(params.color, [1, 1, 1, 1]);
  const background = asColor(params.backgroundColor ?? params.bgColor, [0, 0, 0, 1]);
  const scale = asNumber(params.scale, 3);
  const speed = asNumber(params.speed, 1);
  const contrast = asNumber(params.contrast, 3);
  const balance = asNumber(params.balance);
  const idOffset = asNumber(params.idOffset);
  return Array.from({ length: resolution }, (_, index) => {
    const noise = perlin01(index * scale / resolution + propId * idOffset, time * speed);
    const weight = (noise - 0.5) * contrast + 0.5 + balance * 2;
    return multiplyBrightness(interpolateColor(background, foreground, weight), brightness);
  });
};

const evaluateStrobe = ({ params, time, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 1);
  const foreground = asColor(params.color, [1, 1, 1, 1]);
  const background = asColor(params.color2, [0, 0, 0, 1]);
  const balance = clamp(asNumber(params.onOffBalance, 0.5));
  const fadeIn = asNumber(params.fadeIn);
  const fadeOut = asNumber(params.fadeOut);
  const phase = wrap(
    time * asNumber(params.frequency, 1)
      - propId * asNumber(params.idOffset)
      - asNumber(params.offset),
  );
  const fadeInTime = fadeIn * (1 - balance);
  const fadeOutTime = fadeOut * (1 - balance);
  const offRelIn = fadeInTime === 0 ? 0 : clamp((phase - (1 - fadeInTime)) / fadeInTime);
  const offRelOut = fadeOutTime === 0 ? 0 : clamp(1 - (phase - balance) / fadeOutTime);
  const weight = Math.max(offRelIn, offRelOut);
  const color = phase < balance ? foreground : interpolateColor(background, foreground, weight);
  const output = multiplyBrightness(color, brightness);
  return Array.from({ length: resolution }, () => [...output]);
};

const evaluatePoint = ({ params, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 1);
  const foreground = asColor(params.color, [1, 1, 1, 1]);
  const background = asColor(params.backgroundColor ?? params.bgColor, [0, 0, 0, 1]);
  const size = Math.max(0, asNumber(params.size, 0.25));
  const fade = clamp(asNumber(params.fade, 1));
  const extend = Math.max(1, Math.trunc(asNumber(params.numProps ?? params.extendNum, 1)));
  const invert = propId % 2 === 0 ? Boolean(params.invertEvens) : Boolean(params.invertOdds);
  const loop = params.loop !== false;
  const frame = Array.from({ length: resolution }, () => multiplyBrightness(background, brightness));
  let position = asNumber(params.position, 0.5);
  if (loop) position = wrap(position, extend);

  const positions = [position];
  if (loop && position - size / 2 < 0) positions.push(position + extend);
  else if (loop && position + size / 2 > extend) positions.push(position - extend);

  for (const candidate of positions) {
    const relativeSize = size * resolution;
    if (relativeSize <= 0 || fade <= 0) continue;
    const relativePosition = (candidate - propId % extend) * resolution;
    const relativeStart = Math.max(Math.trunc(relativePosition - size * resolution / 2), 0);
    const relativeEnd = Math.min(Math.trunc(relativePosition + size * resolution / 2), resolution);
    for (let index = relativeStart; index <= relativeEnd && index < resolution; index += 1) {
      const difference = 1 - Math.abs(index - relativePosition) / (relativeSize / (fade * 2));
      const target = invert ? resolution - 1 - index : index;
      frame[target] = multiplyBrightness(
        interpolateColor(frame[target], foreground, difference),
        brightness,
      );
    }
  }
  return frame;
};

const evaluateRange = ({ params, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 1);
  const foreground = multiplyBrightness(asColor(params.color, [1, 1, 1, 1]), brightness);
  const background = multiplyBrightness(
    asColor(params.backgroundColor ?? params.bgColor, [0, 0, 0, 1]),
    brightness,
  );
  const extend = Math.max(1, Math.trunc(asNumber(params.numProps ?? params.extendNum, 1)));
  const relativeStart = Math.max(
    Math.trunc((asNumber(params.start) * extend - propId % extend) * resolution),
    0,
  );
  const relativeEnd = Math.min(
    Math.trunc((asNumber(params.end, 0.5) * extend - propId % extend) * resolution),
    resolution,
  );
  const invert = propId % 2 === 0 ? Boolean(params.invertEvens) : Boolean(params.invertOdds);
  const frame = Array.from({ length: resolution }, () => [...background]);
  for (let index = relativeStart; index <= relativeEnd && index < resolution; index += 1) {
    // RangePattern.cpp uses resolution-index (unlike Point's
    // resolution-1-index). Preserve that native off-by-one behavior.
    const target = invert ? resolution - index : index;
    if (target >= 0 && target < resolution) frame[target] = [...foreground];
  }
  return frame;
};

const evaluateMultipoint = ({ params, time, propId, resolution }) => {
  const brightness = asNumber(params.brightness, 1);
  const foreground = asColor(params.color, [1, 1, 1, 1]);
  const background = asColor(params.backgroundColor ?? params.bgColor, [0, 0, 0, 1]);
  const extend = Math.max(1, Math.trunc(asNumber(params.numProps ?? params.extendNum, 1)));
  let targetPosition = asNumber(params.speed, 0.25) * time
    + asNumber(params.offset)
    + propId * extend;
  const size = clamp(asNumber(params.size, 0.5));
  const fade = clamp(asNumber(params.fade, 1));
  const gap = Math.max(0, asNumber(params.gap, 0.25));
  const frame = Array.from({ length: resolution }, () => multiplyBrightness(background, brightness));
  if (gap === 0 || size === 0) return frame;
  if (targetPosition < 0) targetPosition = wrap(targetPosition, gap);
  for (let index = 0; index < resolution; index += 1) {
    const relativeTotal = wrap(1 - index / resolution);
    const relativeGap = wrap((relativeTotal + gap + targetPosition) / gap);
    const centered = 1 - Math.abs((relativeGap - 0.5) * 2) / size;
    if (centered < 0) continue;
    const faded = (1 - fade) + clamp(centered) * fade;
    frame[index] = multiplyBrightness(
      interpolateColor(background, foreground, faded),
      brightness,
    );
  }
  return frame;
};

const evaluateLedRange = ({ params, resolution }) => {
  const start = Math.trunc(asNumber(params.start, 1));
  const count = Math.trunc(asNumber(params.count, 1));
  const foreground = asColor(params.color, [1, 0, 0, 1]);
  const background = asColor(params.backgroundColor ?? params.bgColor, [0, 0, 0, 1]);
  return Array.from({ length: resolution }, (_, index) => (
    index >= start - 1 && index < start + count - 1 ? [...foreground] : [...background]
  ));
};

const evaluators = {
  ledRange: evaluateLedRange,
  multipoint: evaluateMultipoint,
  noise: evaluateNoise,
  point: evaluatePoint,
  rainbow: evaluateRainbow,
  range: evaluateRange,
  solidColor: evaluateSolidColor,
  strobe: evaluateStrobe,
};

const evaluatePattern = (pattern, context) => {
  const evaluator = evaluators[pattern];
  return evaluator ? evaluator(context) : transparentFrame(context.resolution);
};

const itemsOf = (manager) => Array.isArray(manager?.items) ? manager.items : [];

const managerHasItems = (manager) => itemsOf(manager).length > 0;

const normalizeClip = (clip, layerIndex, clipIndex) => {
  const values = parametersToObject(clip?.parameters);
  const pattern = patternNameFromPath(values.activeBlock);
  return Object.freeze({
    source: clip,
    layerIndex,
    clipIndex,
    name: String(clip?.niceName || `Clip ${clipIndex + 1}`),
    start: asNumber(values.startTime),
    length: Math.max(0, asNumber(values.length)),
    fadeIn: Math.max(0, asNumber(parameterValue(clip?.parameters, "fadeIn", 0, { disabledValue: 0 }))),
    fadeOut: Math.max(0, asNumber(parameterValue(clip?.parameters, "fadeOut", 0, { disabledValue: 0 }))),
    timeOffsetById: asNumber(values.timeOffsetByID),
    pattern,
    params: parametersToObject(clip?.blockData?.params),
    enabled: clip?.enabled !== false,
  });
};

const normalizeAudioClip = (clip, index) => {
  const values = parametersToObject(clip?.parameters);
  return Object.freeze({
    index,
    name: String(clip?.niceName || `Audio ${index + 1}`),
    path: String(values.filePath || ""),
    start: asNumber(values.startTime),
    length: Math.max(0, asNumber(values.length)),
    volume: clamp(asNumber(values.volume, 1)),
    fadeIn: Math.max(0, asNumber(values.fadeIn)),
    fadeOut: Math.max(0, asNumber(values.fadeOut)),
  });
};

const normalizeSequence = (block, sequenceIndex) => {
  const sequence = block?.sequence || {};
  const sequenceValues = parametersToObject(sequence.parameters);
  const layers = itemsOf(sequence.layers);
  const lightLayers = [];
  const audioClips = [];
  layers.forEach((layer, layerIndex) => {
    if (layer?.type === "Audio") {
      itemsOf(layer.clips).forEach((clip, index) => audioClips.push(normalizeAudioClip(clip, index)));
      return;
    }
    if (layer?.type !== "Blocks") return;
    const layerValues = parametersToObject(layer.parameters);
    lightLayers.push(Object.freeze({
      source: layer,
      sourceIndex: layerIndex,
      name: String(layer.niceName || `Layer ${layerIndex + 1}`),
      blendMode: String(layerValues.blendMode || "Add"),
      enabled: layer.enabled !== false,
      clips: itemsOf(layer.blocks).map((clip, clipIndex) => normalizeClip(clip, layerIndex, clipIndex)),
    }));
  });
  const duration = Math.max(
    0,
    asNumber(sequenceValues.totalTime),
    ...lightLayers.flatMap((layer) => layer.clips.map((clip) => clip.start + clip.length)),
    ...audioClips.map((clip) => clip.start + clip.length),
  );
  return Object.freeze({
    source: sequence,
    sequenceIndex,
    name: String(block?.niceName || `Sequence ${sequenceIndex + 1}`),
    duration,
    lightLayers: Object.freeze(lightLayers),
    audioClips: Object.freeze(audioClips),
  });
};

export const inspectBentoProject = (project) => {
  const warnings = [];
  if (!project || typeof project !== "object" || Array.isArray(project)) {
    throw new TypeError("BenTo project must be a JSON object");
  }
  const blocks = itemsOf(project?.models?.sequences);
  if (blocks.length === 0) throw new Error("BenTo project contains no sequences");
  const sequences = blocks
    .filter((block) => block?.type === "SequenceBlock" && block?.sequence)
    .map(normalizeSequence);
  if (sequences.length === 0) throw new Error("BenTo project contains no playable SequenceBlock");

  const providerCounts = new Map();
  for (const sequence of sequences) {
    if (sequence.audioClips.length === 0) warnings.push(`${sequence.name}: no audio clip`);
    if (sequence.audioClips.length > 1) warnings.push(`${sequence.name}: multiple audio clips are not mixed by this player`);
    for (const layer of sequence.lightLayers) {
      if (managerHasItems(layer.source?.filters)) {
        warnings.push(`${sequence.name} / ${layer.name}: layer prop filters are not yet supported`);
      }
      const remap = findParameter(layer.source?.parameters, "positionRemap");
      if (remap?.enabled) warnings.push(`${sequence.name} / ${layer.name}: layer position remap is not yet supported`);
      for (const clip of layer.clips) {
        providerCounts.set(clip.pattern, (providerCounts.get(clip.pattern) || 0) + 1);
        if (!SUPPORTED_PATTERNS.has(clip.pattern)) {
          warnings.push(`${sequence.name} / ${layer.name} / ${clip.name}: unsupported provider ${clip.pattern || "(missing)"}`);
        }
        if (managerHasItems(clip.source?.filters)) {
          warnings.push(`${sequence.name} / ${layer.name} / ${clip.name}: clip prop filters are not yet supported`);
        }
        if (managerHasItems(clip.source?.effects)) {
          warnings.push(`${sequence.name} / ${layer.name} / ${clip.name}: block effects are not yet supported`);
        }
        const remapParameter = findParameter(clip.source?.parameters, "positionRemap");
        if (remapParameter?.enabled) {
          warnings.push(`${sequence.name} / ${layer.name} / ${clip.name}: clip position remap is not yet supported`);
        }
        if (clip.source?.blockData?.params?.paramLinks
          && Object.keys(clip.source.blockData.params.paramLinks).length > 0) {
          warnings.push(`${sequence.name} / ${layer.name} / ${clip.name}: parameter links or automation are not yet supported`);
        }
        const clipValues = parametersToObject(clip.source?.parameters);
        if (asNumber(clipValues.loopLength) > 0 || clipValues.coreLength !== undefined) {
          warnings.push(`${sequence.name} / ${layer.name} / ${clip.name}: explicit core or loop lengths are not yet supported`);
        }
      }
    }
  }
  if (providerCounts.has("noise")) {
    warnings.push("Noise uses a deterministic compatible approximation because BenTo's bundled Perlin helper is absent from the source snapshot");
  }
  const savedBrightness = parameterValue(project?.props?.containers?.controls?.parameters, "brightness", 0.5);
  return Object.freeze({
    projectName: String(parametersToObject(project?.projectSettings?.parameters).projectName || "BenTo project"),
    version: String(project?.metaData?.version || "unknown"),
    outputBrightness: clamp(asNumber(savedBrightness, 0.5), 0, 2),
    sequences: Object.freeze(sequences),
    providers: Object.freeze(Object.fromEntries([...providerCounts].sort())),
    warnings: Object.freeze([...new Set(warnings)]),
  });
};

const clipFade = (clip, relativeTime) => {
  let factor = 1;
  if (clip.fadeIn > 0) factor *= Math.min(relativeTime / clip.fadeIn, 1);
  if (clip.fadeOut > 0) factor *= Math.min((clip.length - relativeTime) / clip.fadeOut, 1);
  return Math.max(0, factor);
};

const evaluateClip = (clip, time, propId, resolution) => {
  const relativeTotal = time - clip.start + propId * clip.timeOffsetById;
  const factor = clipFade(clip, relativeTotal);
  const relativeTime = clip.length > 0 ? wrap(relativeTotal, clip.length) : 0;
  const colors = evaluatePattern(clip.pattern, {
    params: clip.params,
    time: relativeTime,
    propId,
    resolution,
  });
  return colors.map((color) => [color[0], color[1], color[2], color[3] * factor]);
};

const evaluateLayer = (layer, time, propId, resolution) => {
  const active = layer.clips.filter((clip) => (
    clip.enabled && clip.length > 0 && time >= clip.start && time < clip.start + clip.length
  ));
  if (active.length === 0) return { frame: transparentFrame(resolution), active };
  const clipFrames = active.map((clip) => evaluateClip(clip, time, propId, resolution));
  const output = transparentFrame(resolution);
  for (let led = 0; led < resolution; led += 1) {
    let red = 0;
    let green = 0;
    let blue = 0;
    let alpha = 0;
    for (const frame of clipFrames) {
      const color = frame[led];
      red += color[0] * color[3];
      green += color[1] * color[3];
      blue += color[2] * color[3];
      alpha += color[3];
    }
    output[led] = rgba(clamp(red), clamp(green), clamp(blue), clamp(alpha));
  }
  return { frame: output, active };
};

const compositeLayers = (evaluatedLayers, resolution) => {
  if (evaluatedLayers.length === 1) return evaluatedLayers[0].frame;
  const output = transparentFrame(resolution);
  for (let led = 0; led < resolution; led += 1) {
    let red = 0;
    let green = 0;
    let blue = 0;
    let alpha = 0;
    for (let index = evaluatedLayers.length - 1; index >= 0; index -= 1) {
      const { frame, blendMode } = evaluatedLayers[index];
      const color = frame[led];
      if (blendMode === "Alpha") {
        red += (color[0] - red) * color[3];
        green += (color[1] - green) * color[3];
        blue += (color[2] - blue) * color[3];
        alpha += color[3];
      } else if (blendMode === "Mask") {
        const brightness = Math.max(color[0], color[1], color[2]);
        const factor = 1 + (brightness - 1) * color[3];
        red *= factor;
        green *= factor;
        blue *= factor;
        alpha *= factor;
      } else {
        red += color[0];
        green += color[1];
        blue += color[2];
        alpha += color[3];
      }
    }
    output[led] = rgba(clamp(red), clamp(green), clamp(blue), clamp(alpha));
  }
  return output;
};

// BentoProp's Art-Net path multiplies each final Colour channel by its alpha
// before sending it to the prop, so sample() returns physical LED bytes rather
// than the intermediate JUCE Colour buffer.
const toRgb8 = (frame) => frame.map((color) => [
  Math.round(clamp(color[0] * color[3]) * 255),
  Math.round(clamp(color[1] * color[3]) * 255),
  Math.round(clamp(color[2] * color[3]) * 255),
]);

export const createBentoTimeline = (project, { sequenceIndex = 0, resolution = DEFAULT_RESOLUTION } = {}) => {
  if (!Number.isInteger(resolution) || resolution <= 0) throw new TypeError("resolution must be a positive integer");
  const inspection = inspectBentoProject(project);
  const sequence = inspection.sequences[sequenceIndex];
  if (!sequence) throw new RangeError(`sequenceIndex ${sequenceIndex} is outside the project`);

  const sample = (timeSeconds, propIds = [0, 1, 2]) => {
    const time = clamp(asNumber(timeSeconds), 0, sequence.duration);
    const activeNames = new Set();
    const frames = propIds.map((propId) => {
      const evaluated = [];
      for (const layer of sequence.lightLayers) {
        if (!layer.enabled) continue;
        const layerResult = evaluateLayer(layer, time, propId, resolution);
        layerResult.active.forEach((clip) => activeNames.add(`${layer.name} · ${clip.name}`));
        evaluated.push({
          frame: layerResult.frame,
          blendMode: layer.blendMode,
        });
      }
      return toRgb8(compositeLayers(evaluated, resolution));
    });
    return Object.freeze({
      time,
      frames,
      activeClips: Object.freeze([...activeNames]),
    });
  };

  return Object.freeze({
    projectName: inspection.projectName,
    version: inspection.version,
    outputBrightness: inspection.outputBrightness,
    sequence,
    sequences: inspection.sequences,
    providers: inspection.providers,
    warnings: inspection.warnings,
    sample,
  });
};

export const resolveAudioFile = (audioPath, files) => {
  const normalizedPath = String(audioPath || "").replaceAll("\\", "/").replace(/^\.\//, "");
  const baseName = normalizedPath.split("/").at(-1);
  const candidates = Array.from(files || []);
  return candidates.find((file) => {
    const relative = String(file.webkitRelativePath || file.name || "").replaceAll("\\", "/");
    return relative === normalizedPath || relative.endsWith(`/${normalizedPath}`);
  }) || candidates.find((file) => file.name === baseName) || null;
};
