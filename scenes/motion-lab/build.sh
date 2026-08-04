#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
output="$repo_root/artifacts/motion-lab.wasm"

mkdir -p "$(dirname -- "$output")"

npx --yes --package=assemblyscript@0.27.37 asc \
  "$repo_root/scenes/motion-lab/motion_lab.ts" \
  -o "$output" \
  --optimizeLevel 3 \
  --shrinkLevel 2 \
  --noAssert \
  --runtime stub \
  --use abort=

python3 "$repo_root/scenes/motion-lab/patch_stack_safe_wasm.py" "$output"

size=$(wc -c < "$output" | tr -d ' ')
if [ "$size" -gt 16000 ]; then
  printf 'motion-lab.wasm is %s bytes; installed firmware limit is 16000\n' "$size" >&2
  exit 1
fi

printf '%s (%s bytes)\n' "$output" "$size"
