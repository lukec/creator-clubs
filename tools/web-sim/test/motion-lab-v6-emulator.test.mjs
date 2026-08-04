import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateUrl = new URL("../../../studies/motion-lab-v6-emulator/template.fragment.html", import.meta.url);

test("motion lab exposes independent auto-capable radial pose controls", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /id="motion-roll" class="pose-input" type="range" min="-180" max="180"/);
  assert.match(source, /id="motion-flip" class="pose-input" type="range" min="0" max="360"/);
  assert.match(source, /class="roll-arm"/);
  assert.match(source, /class="flip-club-body"/);
  assert.match(source, /class="flip-club-handle"/);
  assert.match(source, /touch-action: none;/);
  assert.match(source, /input\.setPointerCapture\(event\.pointerId\)/);
  assert.match(source, /Math\.atan2\(y, x\) \* 180 \/ Math\.PI \+ 90/);
  assert.match(source, /angle > 180 \? angle - 360 : angle/);
  assert.match(source, /rollFace\.style\.setProperty\("--pose-angle"/);
  assert.match(source, /flipClub\.style\.setProperty\("--pose-angle"/);
  assert.match(source, /id="motion-roll-auto"[^>]*aria-pressed="false"/);
  assert.match(source, /id="motion-flip-auto"[^>]*aria-pressed="false"/);
  assert.match(source, /const stopRollAuto = \(\) => \{\s*setAutoButton\(rollAutoButton, false\);\s*syncMoveButton\(\);/s);
  assert.match(source, /const stopFlipAuto = \(\) => \{\s*setAutoButton\(flipAutoButton, false\);\s*syncMoveButton\(\);/s);
  assert.match(source, /if \(autoEnabled\(rollAutoButton\)\)/);
  assert.match(source, /if \(autoEnabled\(flipAutoButton\)\)/);
  assert.match(source, /id="motion-move"[^>]*aria-pressed="false"[^>]*>Move it<\/button>/);
  assert.match(source, /moveButton\.addEventListener\("click"/);
  assert.match(source, /setAutoButton\(rollAutoButton, enabled\);\s*setAutoButton\(flipAutoButton, enabled\)/s);
  assert.doesNotMatch(source, /id="motion-auto"/);
});

test("motion controls stay compact and available while browsing lower effects", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /class="motion-toolbar"/);
  assert.match(source, /\.motion-toolbar \{\s*position: sticky;\s*top: 0;\s*z-index: 20;/s);
  assert.match(source, /class="toolbar-main"/);
  assert.match(source, /\.toolbar-main \{[\s\S]*grid-template-columns: minmax\(180px, 1\.5fr\) auto minmax\(150px, 1fr\) minmax\(150px, 1fr\);/);
  assert.match(source, /\.pose-stage \{[\s\S]*height: 88px;/);
  assert.match(source, /@media \(max-width: 500px\)[\s\S]*\.toolbar-main \{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/s);
  assert.match(source, /@media \(max-width: 500px\)[\s\S]*\.motion-pose-controls \{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/s);
  assert.match(source, /scroll-margin-top: var\(--motion-toolbar-clearance\);/);
  assert.doesNotMatch(source, /\.motion-pose-controls \{\s*grid-template-columns: 1fr;/s);
});

test("throw classification is a directly clickable six-button group", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /class="throw-options" role="radiogroup"/);
  assert.equal((source.match(/data-throw-state="[0-5]"/g) || []).length, 6);
  assert.match(source, /data-throw-state="0" aria-pressed="true"/);
  assert.match(source, /throwButtons\.forEach\(\(button\) => button\.addEventListener\("click"/);
  assert.match(source, /entry\.setAttribute\("aria-pressed", String\(entry === button\)\)/);
  assert.doesNotMatch(source, /id="motion-throw"/);
});

test("roll and flip motion drive Activity while the slider remains a manual override", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /activityMode: "manual"/);
  assert.match(source, /const shortestDegreesDelta = \(previous, next\)/);
  assert.match(source, /const applyPoseActivity = \(deltaDegrees, decay = 0\.72\)/);
  assert.match(source, /applyPoseActivity\(shortestDegreesDelta\(previous, state\.roll\)\)/);
  assert.match(source, /applyPoseActivity\(shortestDegreesDelta\(previous, state\.projectedAngle \* 360\)\)/);
  assert.match(source, /state\.activityMode = "manual";\s*state\.activityPercent = Number\(activityInput\.value\)/s);
  assert.match(source, /motionDegrees[\s\S]*applyPoseActivity\(motionDegrees, 0\.86\)/);
  assert.match(source, /derived from pose motion/);
});

test("motion lab presents every exact cartridge effect as a page gallery", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /<option value="wasm:4">P5 Police<\/option>/);
  assert.match(source, /const rows = Array\.from\(\{ length: 8 \}/);
  assert.match(source, /P5E3.*Roadblock 50\/50|\["Roadblock 50\/50"/s);
  assert.match(source, /row\.instance\.exports\.diagnosticSelect\(selected\.pageIndex, effectIndex\)/);
  assert.match(source, /rows\.forEach\(\(row\) => \{\s*row\.instance\.exports\.update\(\)/s);
  assert.match(source, /8 live 3D effects/);
  assert.match(source, /createCreatorClubGallery\(\{/);
  assert.match(source, /tileElements: rows\.map\(\(row\) => row\.row\)/);
  assert.match(source, /rows\.map\(\(row\) => row\.frame\)/);
  assert.match(source, /projectedAngle: state\.projectedAngle/);
  assert.match(source, /rollDegrees: state\.roll/);
  assert.match(source, /selectedPreview !== null[\s\S]*ensurePreview\(\)\?\.render[\s\S]*else[\s\S]*ensureGallery\(\)\?\.render/);
  assert.doesNotMatch(source, /className = "led-strip"/);
});

test("motion lab adds authored variable-length Web Studio collections without claiming they are on-club", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /<optgroup label="Web Studio sketches">/);
  assert.match(source, /<option value="theme:lightning">Lightning Storm<\/option>/);
  assert.match(source, /<option value="theme:fire-ice">Fire and Ice<\/option>/);
  assert.match(source, /const themePages = window\.CreatorClub3D\.themePages/);
  assert.match(source, /window\.CreatorClub3D\.renderThemeEffect\(effect\.id, state, state\.time, rows\[index\]\.frame\)/);
  assert.match(source, /row\.row\.hidden = !visible/);
  assert.match(source, /setActiveCount\(selected\.effects\.length\)/);
  assert.match(source, /browser only, not yet on the club/);
});

test("juggle preview opens beside the selected gallery row instead of returning to the page top", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /\.juggle-preview \{\s*grid-column: 1 \/ -1;/s);
  assert.match(source, /const placePreviewNear = \(effectIndex\) =>/);
  assert.match(source, /getComputedStyle\(patternList\)\.gridTemplateColumns/);
  assert.match(source, /visibleRows\[rowEndPosition\]\.row\.after\(previewHost\)/);
  assert.match(source, /placePreviewNear\(effectIndex\);\s*previewHost\.hidden = false;/s);
  assert.match(source, /previewHost\.scrollIntoView\(\{[\s\S]*block: "nearest"/);
});

test("juggle preview evaluates each club with its own cascade sensor state", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /const previewSlots = Array\.from\(\{ length: 3 \}/);
  assert.match(source, /sampleThreeClubCascade\(timeSeconds\)/);
  assert.match(source, /slot\.sensor\.roll = pose\.rollDegrees/);
  assert.match(source, /slot\.sensor\.projectedAngle = pose\.projectedAngle/);
  assert.match(source, /slot\.sensor\.activityPercent = pose\.activity \* 100/);
  assert.match(source, /slot\.sensor\.throwState = pose\.throwState/);
  assert.match(source, /arduino: makeArduino\(slot, slot\.sensor\)/);
  assert.match(source, /slot\.instance\?\.exports\.update\(\)/);
  assert.match(source, /previewSlots\.map\(\(slot\) => slot\.frame\)/);
  assert.match(source, /each club drives its own Roll, Flip, Activity, and Throw State/);
});
