#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
source_file="$repo_root/scenes/motion-lab-v6/motion_lab_v6.ts"
output="$repo_root/artifacts/motion-lab-v6.wasm"

mkdir -p "$(dirname -- "$output")"

# O1/S2 keeps the call graph shallower than the earlier O3 build while staying
# far inside the 16 KB module ceiling. There is deliberately no post-build
# byte-offset transform: tests exercise the exact readable-source semantics.
npx --yes --package=assemblyscript@0.27.37 asc \
  "$source_file" \
  -o "$output" \
  --optimizeLevel 1 \
  --shrinkLevel 2 \
  --noAssert \
  --runtime stub \
  --use abort=

size=$(wc -c < "$output" | tr -d ' ')
if [ "$size" -gt 16000 ]; then
  printf 'motion-lab-v6.wasm is %s bytes; installed firmware limit is 16000\n' "$size" >&2
  exit 1
fi

node "$repo_root/scenes/motion-lab-v6/test.mjs" "$output"
printf '%s (%s bytes)\n' "$output" "$size"
