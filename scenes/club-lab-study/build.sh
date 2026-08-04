#!/bin/sh
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
output="$repo_root/artifacts/club-lab-study.wasm"

mkdir -p "$(dirname -- "$output")"

npx --yes --package=assemblyscript@0.27.37 asc \
  "$repo_root/scenes/club-lab-study/club_lab_study.ts" \
  -o "$output" \
  -O3z \
  --noAssert \
  --runtime stub \
  --use abort=

size=$(wc -c < "$output" | tr -d ' ')
if [ "$size" -gt 16000 ]; then
  printf 'club-lab-study.wasm is %s bytes; installed firmware limit is 16000\n' "$size" >&2
  exit 1
fi
printf '%s (%s bytes)\n' "$output" "$size"
