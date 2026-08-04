#!/usr/bin/env node

import fs from "node:fs/promises";

const [wasmPath, templatePath, outputPath] = process.argv.slice(2);
if (!wasmPath || !templatePath || !outputPath) {
  throw new Error("usage: node build_browser_lab.mjs ARTIFACT.wasm TEMPLATE.html OUTPUT.html");
}

const [wasm, template] = await Promise.all([
  fs.readFile(wasmPath),
  fs.readFile(templatePath, "utf8"),
]);
if (!template.includes("__WASM_BASE64__")) throw new Error("template lacks __WASM_BASE64__ placeholder");
if (wasm.length > 16_000) throw new Error(`${wasmPath} is ${wasm.length} bytes; stable-1.2.0 limit is 16000`);

const output = template.replaceAll("__WASM_BASE64__", wasm.toString("base64"));
await fs.writeFile(outputPath, output, "utf8");
console.log(`${outputPath} (${wasm.length}-byte embedded WASM)`);
