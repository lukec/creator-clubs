import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../../../studies/passing-lab/index.html", import.meta.url);
const sourceUrl = (name) => new URL(`../src/${name}`, import.meta.url);

test("the all-pattern 3D stage replaces the initial 2D canvas while semantic status remains outside it", async () => {
  const page = await fs.readFile(pageUrl, "utf8");

  assert.match(
    page,
    /<div class="stage"><div id="stage-3d" class="stage-3d" aria-live="off" aria-describedby="stage-description"><\/div><\/div><p id="stage-description" class="sr-only"><\/p><p id="stage-status" class="sr-only" role="status"><\/p>/,
    "the Three.js mount keeps semantic description and status outside the visual stage",
  );
  assert.doesNotMatch(page, /<canvas id="stage"/, "there is no initial 2D diagram surface");
  assert.match(page, /function hasThreeStage\(\)/, "every playable card is routed through the shared 3D stage capability");
  assert.match(page, /compiled-pattern 3D executor/, "non-dedicated cards identify the shared compiled executor");
  assert.match(page, /card supplies a compiled execution plan/, "the page describes the pattern-data to executor boundary");
  assert.match(page, /renderer\.render\(physicalPlayhead, \{ pattern, camera:/, "the page feeds the selected compiled pattern object into the model");
  assert.match(page, /sample\.activeEvents \|\| sample\.airborne/, "the current beat remains visible during load, flight, and catch phases");
  assert.match(page, /Every playable pattern uses the shared 3D stage/, "the transport no longer advertises a 2D fallback");
  assert.match(page, /id="timeline-position"/, "the visible transport status remains below the stage");
  assert.match(page, /\$\('#stage-description'\)\.textContent =/, "the semantic description remains populated during playback");
  assert.match(page, /\$\('#stage-status'\)\.textContent =/, "screen-reader status remains available outside the stage");

  [
    'class="stage-mode"',
    'id="stage-mode"',
    'class="cue"',
    'id="cue-title"',
    'id="cue-detail"',
  ].forEach((overlay) => {
    assert.equal(page.includes(overlay), false, `${overlay} must not obscure a physical 3D stage`);
  });
});

test("the static Passing Lab module graph uses one cache revision", async () => {
  const revision = "orientation-plan-v19";
  const files = await Promise.all([
    fs.readFile(pageUrl, "utf8"),
    fs.readFile(sourceUrl("passing-library.mjs"), "utf8"),
    fs.readFile(sourceUrl("passing-playback.mjs"), "utf8"),
    fs.readFile(sourceUrl("passing-four-count-3d.mjs"), "utf8"),
    fs.readFile(sourceUrl("passing-generic-3d.mjs"), "utf8"),
    fs.readFile(sourceUrl("passing-four-count-stage.mjs"), "utf8"),
  ]);
  files.forEach((contents) => assert.match(contents, new RegExp(`\\?build=${revision}`)));
});
