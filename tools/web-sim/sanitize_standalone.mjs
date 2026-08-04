#!/usr/bin/env node

import fs from "node:fs/promises";

const paths = process.argv.slice(2);
if (paths.length === 0) {
  throw new Error("usage: node sanitize_standalone.mjs STANDALONE.html [...]");
}

for (const path of paths) {
  const original = await fs.readFile(path, "utf8");
  // The visualization renderer includes optional tooltip/icon libraries in its
  // srcdoc. These labs use neither feature, so remove the three network loads
  // while retaining the renderer's tested responsive shell and base styles.
  const sanitized = original.replace(
    /&lt;script[^\n]*?src=&quot;https:\/\/unpkg\.com\/[^\n]*?&gt;&lt;\/script&gt;\n?/g,
    "",
  );
  if (sanitized === original) {
    console.log(`${path}: no optional unpkg scripts present`);
    continue;
  }
  await fs.writeFile(path, sanitized, "utf8");
  console.log(`${path}: removed optional unpkg runtime dependencies`);
}
