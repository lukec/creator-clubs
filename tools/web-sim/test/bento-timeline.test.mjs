import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  createBentoTimeline,
  inspectBentoProject,
  parametersToObject,
  resolveAudioFile,
} from "../src/bento-timeline.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const repository = path.resolve(directory, "../../..");

const parameter = (address, value, extra = {}) => ({
  value,
  controlAddress: `/${address}`,
  ...extra,
});

const manager = (items = []) => ({ items, viewOffset: [0, 0], viewZoom: 1 });

const clip = ({
  name,
  start = 0,
  length = 10,
  pattern = "solidColor",
  params = {},
  fadeIn = 0,
  fadeOut = 0,
}) => ({
  niceName: name,
  type: "LightBlockClip",
  parameters: [
    parameter("startTime", start),
    parameter("length", length),
    parameter("activeBlock", `/library/patterns/${pattern}`),
    ...(fadeIn ? [parameter("fadeIn", fadeIn, { enabled: true })] : []),
    ...(fadeOut ? [parameter("fadeOut", fadeOut, { enabled: true })] : []),
  ],
  blockData: {
    params: {
      parameters: Object.entries(params).map(([address, value]) => parameter(address, value)),
    },
  },
  filters: manager(),
  effects: manager(),
});

const layer = (name, blendMode, clips) => ({
  niceName: name,
  type: "Blocks",
  parameters: [parameter("blendMode", blendMode)],
  blocks: manager(clips),
  filters: manager(),
});

const project = (layers, { duration = 10, brightness, audio = true } = {}) => ({
  metaData: { version: "2.1.0b6" },
  projectSettings: { parameters: [parameter("projectName", "Synthetic test")] },
  models: {
    sequences: manager([
      {
        niceName: "Test sequence",
        type: "SequenceBlock",
        sequence: {
          parameters: [parameter("totalTime", duration)],
          layers: manager([
            ...(audio ? [{
              niceName: "Audio",
              type: "Audio",
              clips: manager([{
                niceName: "Test audio",
                type: "AudioClip",
                parameters: [
                  parameter("length", duration),
                  parameter("filePath", "audio/test.wav"),
                  parameter("volume", 0.8),
                ],
              }]),
            }] : []),
            ...layers,
          ]),
        },
      },
    ]),
  },
  props: {
    containers: brightness === undefined ? {} : {
      controls: { parameters: [parameter("brightness", brightness)] },
    },
    items: [],
  },
});

test("parametersToObject normalizes slash-prefixed addresses", () => {
  assert.deepEqual(
    { ...parametersToObject([parameter("brightness", 0.75), parameter("color", [1, 0, 0, 1])]) },
    { brightness: 0.75, color: [1, 0, 0, 1] },
  );
});

test("inspection reports sequences, providers, audio, and output brightness", () => {
  const data = project([
    layer("Bed", "Alpha", [clip({
      name: "Red",
      params: { brightness: 1, color: [1, 0, 0, 1], hueSpeed: 0, idOffset: 0 },
    })]),
  ], { brightness: 0.883 });
  const inspection = inspectBentoProject(data);
  assert.equal(inspection.projectName, "Synthetic test");
  assert.equal(inspection.outputBrightness, 0.883);
  assert.deepEqual(inspection.providers, { solidColor: 1 });
  assert.equal(inspection.sequences[0].audioClips[0].path, "audio/test.wav");
  assert.deepEqual(inspection.warnings, []);
});

test("absent project output brightness uses BenTo's 0.5 default", () => {
  const inspection = inspectBentoProject(project([]));
  assert.equal(inspection.outputBrightness, 0.5);
});

test("BenTo reverse layer order preserves an additive foreground over an alpha bed", () => {
  const data = project([
    layer("Pulse", "Add", [clip({
      name: "Green pulse",
      start: 1,
      length: 1,
      params: { brightness: 0.5, color: [0, 1, 0, 1], hueSpeed: 0, idOffset: 0 },
    })]),
    layer("Bed", "Alpha", [clip({
      name: "Red bed",
      params: { brightness: 0.25, color: [1, 0, 0, 1], hueSpeed: 0, idOffset: 0 },
    })]),
  ]);
  const timeline = createBentoTimeline(data);
  assert.deepEqual(timeline.sample(0.5).frames[0][0], [64, 0, 0]);
  assert.deepEqual(timeline.sample(1.5).frames[0][0], [64, 128, 0]);
});

test("clip fades are deterministic at boundaries and seeking is stateless", () => {
  const data = project([
    layer("Bed", "Alpha", [clip({
      name: "Fade",
      start: 2,
      length: 4,
      fadeIn: 1,
      fadeOut: 1,
      params: { brightness: 1, color: [1, 0, 0, 1], hueSpeed: 0, idOffset: 0 },
    })]),
  ]);
  const timeline = createBentoTimeline(data);
  assert.deepEqual(timeline.sample(2).frames[0][0], [0, 0, 0]);
  // A lone light layer returns directly, then BentoProp multiplies RGB by the
  // final Colour alpha while producing the physical Art-Net bytes.
  assert.deepEqual(timeline.sample(2.5).frames[0][0], [64, 0, 0]);
  assert.deepEqual(timeline.sample(3).frames[0][0], [255, 0, 0]);
  assert.deepEqual(timeline.sample(5.5).frames[0][0], [64, 0, 0]);
  assert.deepEqual(timeline.sample(3).frames[0][0], [255, 0, 0]);
});

test("inactive configured layers still participate in BenTo's multi-layer alpha path", () => {
  const data = project([
    layer("Inactive add", "Add", [clip({
      name: "Later pulse",
      start: 5,
      length: 1,
      params: { brightness: 1, color: [1, 1, 1, 1], hueSpeed: 0, idOffset: 0 },
    })]),
    layer("Fading bed", "Alpha", [clip({
      name: "Red fade",
      fadeIn: 2,
      params: { brightness: 1, color: [1, 0, 0, 1], hueSpeed: 0, idOffset: 0 },
    })]),
  ]);
  // At fade factor .5: layer RGB=.5/A=.5, Alpha blend RGB=.25/A=.5,
  // then BentoProp's physical output applies final alpha once more.
  assert.deepEqual(createBentoTimeline(data).sample(1).frames[0][0], [32, 0, 0]);
});

test("Global IDs 0, 1, and 2 independently drive rainbow idOffset", () => {
  const data = project([
    layer("Bed", "Alpha", [clip({
      name: "ID rainbow",
      params: { brightness: 1, offset: 0, speed: 0, density: 0, idOffset: 1 / 3 },
      pattern: "rainbow",
    })]),
  ]);
  const frames = createBentoTimeline(data).sample(1).frames;
  assert.deepEqual(frames.map((frame) => frame[0]), [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
  ]);
});

test("Range numProps can create a blue, red, white three-club role tableau", () => {
  const role = (name, start, end, color) => clip({
    name,
    pattern: "range",
    params: {
      brightness: 1,
      color,
      backgroundColor: [0, 0, 0, 1],
      start,
      end,
      fade: 0,
      numProps: 3,
      invertEvens: false,
      invertOdds: false,
    },
  });
  const data = project([
    layer("Roles", "Alpha", [
      role("Blue", 0, 1 / 3 - 0.001, [0, 0, 1, 1]),
      role("Red", 1 / 3 + 0.001, 2 / 3 - 0.001, [1, 0, 0, 1]),
      role("White", 2 / 3 + 0.001, 1, [1, 1, 1, 1]),
    ]),
  ]);
  const frames = createBentoTimeline(data).sample(1).frames;
  assert.deepEqual(frames.map((frame) => frame[16]), [
    [0, 0, 255],
    [255, 0, 0],
    [255, 255, 255],
  ]);
});

test("unknown providers render transparent and produce a visible warning", () => {
  const data = project([
    layer("Mystery", "Add", [clip({ name: "Unknown", pattern: "futurePattern" })]),
  ]);
  const timeline = createBentoTimeline(data);
  assert.match(timeline.warnings.join("\n"), /unsupported provider futurePattern/);
  assert.deepEqual(timeline.sample(1).frames[0][0], [0, 0, 0]);
});

test("resolveAudioFile matches relative paths and falls back to basename", () => {
  const relative = { name: "test.wav", webkitRelativePath: "show/audio/test.wav" };
  const basename = { name: "other.wav", webkitRelativePath: "" };
  assert.equal(resolveAudioFile("audio/test.wav", [relative, basename]), relative);
  assert.equal(resolveAudioFile("audio/other.wav", [relative, basename]), basename);
  assert.equal(resolveAudioFile("audio/missing.wav", [relative, basename]), null);
});

test("sanitized Exit fixture exercises solid and ID-shifted rainbow playback", () => {
  const fixturePath = path.join(
    repository,
    "shows/exit-the-premises-poc/exit-the-premises-60s.bento",
  );
  const data = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  assert.equal(data.props.items.length, 0, "public fixture must not contain serialized props");
  const timeline = createBentoTimeline(data);
  assert.deepEqual(timeline.providers, { rainbow: 1, solidColor: 144 });
  assert.equal(timeline.sequence.duration, 60);
  assert.equal(timeline.sequence.audioClips[0].path, "audio/exit-the-premises-poc-60s.mp3");
  assert.deepEqual(timeline.sample(0.035).frames[0][0], [255, 255, 255]);
  const finale = timeline.sample(45.5).frames.map((frame) => frame[0]);
  assert.equal(new Set(finale.map(String)).size, 3, "rainbow idOffset should distinguish all three IDs");
});
