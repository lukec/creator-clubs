import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  chromaEmissionGain,
  CREATOR_CLUB_OPTICS,
  CREATOR_CLUB_SCENE_LIGHTING,
  CREATOR_CLUB_TRIM,
  createCreatorClubGallery,
  diffusionTintCoverage,
  whiteEmissionRestraint,
} from "../src/creator-club-preview.mjs";

const previewSourceUrl = new URL("../src/creator-club-preview.mjs", import.meta.url);

test("shared gallery renderer is exported for exact and variable-length pages", () => {
  assert.equal(typeof createCreatorClubGallery, "function");
});

const srgbToLinear = (channel) => {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4;
};

const linearize = (rgb) => rgb.map(srgbToLinear);
const normalizedLuminance = (linearRgb) => {
  const peak = Math.max(...linearRgb);
  const hue = linearRgb.map((channel) => channel / peak);
  return hue[0] * 0.2126 + hue[1] * 0.7152 + hue[2] * 0.0722;
};

test("saturated police colors receive bloom energy comparable to white", () => {
  const red = linearize([255, 18, 48]);
  const blue = linearize([18, 92, 255]);
  const white = linearize([255, 255, 255]);

  assert.equal(chromaEmissionGain(white), 1);
  assert.ok(chromaEmissionGain(red) > 4);
  assert.ok(chromaEmissionGain(blue) > 6);

  for (const rgb of [red, blue, white]) {
    const equalizedLuminance = normalizedLuminance(rgb) * chromaEmissionGain(rgb);
    assert.ok(Math.abs(equalizedLuminance - 1) < 1e-9);
  }
});

test("emission gain is bounded for dark and degenerate colors", () => {
  assert.equal(chromaEmissionGain([0, 0, 0]), 1);
  assert.equal(chromaEmissionGain([0, 0, 1]), 12.5);
  assert.throws(() => chromaEmissionGain([1, 0]), /three channels/);
});

test("white bloom is restrained without dimming saturated police hues", () => {
  const red = linearize([255, 18, 48]);
  const blue = linearize([18, 92, 255]);
  const white = linearize([255, 255, 255]);

  assert.equal(whiteEmissionRestraint(white), CREATOR_CLUB_OPTICS.whiteEmissionScale);
  assert.equal(whiteEmissionRestraint(red), 1);
  assert.equal(whiteEmissionRestraint(blue), 1);
  assert.throws(() => whiteEmissionRestraint([1, 0]), /three channels/);
});

test("handle optics stay tighter than the diffusing body", () => {
  assert.ok(CREATOR_CLUB_OPTICS.handleAxialSigma < CREATOR_CLUB_OPTICS.bodyAxialSigma);
  assert.ok(CREATOR_CLUB_OPTICS.handleHaloStrength < CREATOR_CLUB_OPTICS.bodyHaloStrength);
  assert.ok(CREATOR_CLUB_OPTICS.handleWrap < CREATOR_CLUB_OPTICS.bodyWrap);
  assert.ok(CREATOR_CLUB_OPTICS.handleCoreRadius < CREATOR_CLUB_OPTICS.handleAxialSigma);
  assert.ok(CREATOR_CLUB_OPTICS.bodyCoreStrength < CREATOR_CLUB_OPTICS.handleCoreStrength);
  assert.ok(CREATOR_CLUB_OPTICS.bodyCoreStrength <= 0.06);
  assert.ok(CREATOR_CLUB_OPTICS.coreEmissionLimit <= 1.25);
  assert.ok(CREATOR_CLUB_OPTICS.haloEmissionLimit < CREATOR_CLUB_OPTICS.coreEmissionLimit);
});

test("the rehearsal scene is club-lit and molded trim is pale translucent plastic", () => {
  const shellInspectionMaximum = CREATOR_CLUB_SCENE_LIGHTING.shellAmbient
    + CREATOR_CLUB_SCENE_LIGHTING.shellKey
    + CREATOR_CLUB_SCENE_LIGHTING.shellFill
    + CREATOR_CLUB_SCENE_LIGHTING.shellRim;
  assert.ok(shellInspectionMaximum <= 0.31);
  assert.ok(CREATOR_CLUB_SCENE_LIGHTING.hemisphereIntensity <= 0.16);
  assert.ok(CREATOR_CLUB_SCENE_LIGHTING.keyIntensity <= 0.20);
  assert.ok(CREATOR_CLUB_SCENE_LIGHTING.fillIntensity <= 0.06);

  for (const color of [CREATOR_CLUB_TRIM.knobColor, CREATOR_CLUB_TRIM.capColor]) {
    assert.ok((color & 0xff) >= 0xea);
    assert.ok(((color >> 8) & 0xff) >= 0xea);
    assert.ok(((color >> 16) & 0xff) >= 0xea);
  }
  assert.ok(CREATOR_CLUB_TRIM.knobOpacity < 1 && CREATOR_CLUB_TRIM.knobOpacity > 0.75);
  assert.ok(CREATOR_CLUB_TRIM.capOpacity < 1 && CREATOR_CLUB_TRIM.capOpacity > 0.75);
});

test("opposed source axis rotates with the club instead of following the camera", async () => {
  const source = await readFile(previewSourceUrl, "utf8");

  assert.match(source, /vWorldSourceAxis = normalize\(mat3\(modelMatrix\) \* vec3\(0\.0, 0\.0, 1\.0\)\)/);
  assert.match(source, /abs\(dot\([\s\S]*vWorldRadial[\s\S]*vWorldSourceAxis/);
  assert.match(source, /float haloEmission = clamp\(\s*diffusionTint \*/);
  assert.doesNotMatch(source, /float haloEmission = clamp\(\s*diffusionCoverage \*/);
  assert.doesNotMatch(source, /radialViewVector|radialFacing/);
});

test("overlapping diffusion strongly tints the white shell", () => {
  assert.equal(diffusionTintCoverage(0), 0);
  assert.ok(diffusionTintCoverage(0.1) > 0.69);
  assert.equal(diffusionTintCoverage(Number.POSITIVE_INFINITY), 0.98);
  assert.equal(CREATOR_CLUB_OPTICS.diffusionTintGain, 12);
});
