import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateUrl = new URL("../../../studies/police-pattern-lab/template.fragment.html", import.meta.url);

test("police gallery avoids per-frame blurred shadows and unnecessary DOM writes", async () => {
  const source = await readFile(templateUrl, "utf8");

  assert.match(source, /const FRAME_INTERVAL = 1000 \/ 30;/);
  assert.match(source, /content-visibility: auto;/);
  assert.match(source, /contain: layout paint;/);
  assert.match(source, /const ledStyleCache = new Map\(\);/);
  assert.match(source, /0 0 0 var\(--emission-ring, 0\) currentColor/);
  assert.match(source, /if \(pattern\.lastRgb\[ledIndex\] !== key\)/);
  assert.doesNotMatch(source, /led\.style\.boxShadow/);
  assert.doesNotMatch(source, /glowFor\(\[red, green, blue\]\)/);
});
