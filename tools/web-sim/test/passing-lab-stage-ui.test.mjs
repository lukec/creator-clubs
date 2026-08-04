import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../../../studies/passing-lab/index.html", import.meta.url);

test("the all-pattern 3D stage replaces the initial 2D canvas while semantic status remains outside it", async () => {
  const page = await fs.readFile(pageUrl, "utf8");

  assert.match(
    page,
    /<div class="stage"><div id="stage-3d" class="stage-3d" aria-live="off" aria-describedby="stage-description"><\/div><\/div><p id="stage-description" class="sr-only"><\/p><p id="stage-status" class="sr-only" role="status"><\/p>/,
    "the Three.js mount keeps semantic description and status outside the visual stage",
  );
  assert.doesNotMatch(page, /<canvas id="stage"/, "there is no initial 2D diagram surface");
  assert.match(page, /function hasThreeStage\(\)/, "every playable card is routed through the shared 3D stage capability");
  assert.match(page, /schedule-driven 3D stage/, "non-dedicated cards are labelled honestly");
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
