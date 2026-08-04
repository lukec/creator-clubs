#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
let wasmPath = null;
let bundleName = "creator-club-preview";
const positional = [];
for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (argument === "--wasm") {
    wasmPath = args[index + 1];
    index += 1;
  } else if (argument === "--bundle") {
    bundleName = args[index + 1];
    index += 1;
  } else {
    positional.push(argument);
  }
}
const [templatePath, outputPath] = positional;

if (!templatePath || !outputPath || args.includes("--wasm") && !wasmPath || args.includes("--bundle") && !bundleName) {
  throw new Error(
    "usage: node embed_preview.mjs TEMPLATE.html OUTPUT.html [--bundle creator-club-preview|club-lighting-lab|bento-juggle-player] [--wasm ARTIFACT.wasm]",
  );
}

const directory = path.dirname(fileURLToPath(import.meta.url));
const bundles = {
  "creator-club-preview": {
    file: "creator-club-preview.iife.js",
    placeholder: "__CREATOR_CLUB_3D_BUNDLE__",
  },
  "club-lighting-lab": {
    file: "club-lighting-lab.iife.js",
    placeholder: "__CLUB_LIGHTING_LAB_BUNDLE__",
  },
  "bento-juggle-player": {
    file: "bento-juggle-player.iife.js",
    placeholder: "__BENTO_JUGGLE_PLAYER_BUNDLE__",
  },
};
const bundleConfig = bundles[bundleName];
if (!bundleConfig) {
  throw new Error(`unknown bundle ${bundleName}; expected ${Object.keys(bundles).join(" or ")}`);
}
const bundlePath = path.join(directory, "dist", bundleConfig.file);
const licensePath = path.join(directory, "vendor", "three-LICENSE.txt");
const [template, rawBundle, license] = await Promise.all([
  fs.readFile(templatePath, "utf8"),
  fs.readFile(bundlePath, "utf8"),
  fs.readFile(licensePath, "utf8"),
]);

if (!template.includes(bundleConfig.placeholder)) {
  throw new Error(`${templatePath} lacks ${bundleConfig.placeholder}`);
}

// A literal closing script tag would terminate the inline bundle in HTML.
const licenseComment = `/*\nBundled third-party license:\n\n${license.trim()}\n*/\n`;
const bundle = `${licenseComment}${rawBundle}`.replaceAll("</script", "<\\/script");
// A function replacement preserves minified `$&`, `$'`, and similar text
// literally instead of treating it as String.replace substitution syntax.
let output = template.replaceAll(bundleConfig.placeholder, () => bundle);

if (wasmPath) {
  const wasm = await fs.readFile(wasmPath);
  if (wasm.length > 16_000) {
    throw new Error(`${wasmPath} is ${wasm.length} bytes; stable-1.2.0 limit is 16000`);
  }
  if (!output.includes("__WASM_BASE64__")) {
    throw new Error(`${templatePath} lacks __WASM_BASE64__`);
  }
  output = output.replaceAll("__WASM_BASE64__", () => wasm.toString("base64"));
}

await fs.writeFile(outputPath, output, "utf8");
console.log(`${outputPath} (${Buffer.byteLength(output).toLocaleString()} bytes)`);
