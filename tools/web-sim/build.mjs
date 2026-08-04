#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const directory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(directory, "dist");

await fs.mkdir(outputDirectory, { recursive: true });
const entries = [
  { entry: "creator-club-preview.mjs", output: path.join(outputDirectory, "creator-club-preview.iife.js") },
  { entry: "club-lighting-lab.mjs", output: path.join(outputDirectory, "club-lighting-lab.iife.js") },
  { entry: "bento-juggle-player.mjs", output: path.join(outputDirectory, "bento-juggle-player.iife.js") },
  // Passing Lab keeps its source modules readable while bundling the Three.js
  // renderer beside the page for a CDN-free static publication.
  { entry: "passing-four-count-stage.mjs", output: path.join(directory, "..", "..", "studies", "passing-lab", "passing-four-count-stage.iife.js") },
];

for (const { entry, output } of entries) {
  await build({
    entryPoints: [path.join(directory, "src", entry)],
    outfile: output,
    bundle: true,
    format: "iife",
    platform: "browser",
    target: ["es2020"],
    minify: true,
    legalComments: "inline",
    sourcemap: false,
  });
  const stat = await fs.stat(output);
  console.log(`${output} (${stat.size.toLocaleString()} bytes)`);
}
