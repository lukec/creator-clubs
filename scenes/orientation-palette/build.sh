#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
output="$repo_root/artifacts/orientation-palette.wasm"

mkdir -p "$(dirname -- "$output")"

npx --yes --package=assemblyscript@0.27.37 asc \
  "$repo_root/scenes/orientation-palette/orientation_palette.ts" \
  -o "$output" \
  -O3z \
  --noAssert \
  --runtime stub \
  --use abort=

printf '%s\n' "$output"
