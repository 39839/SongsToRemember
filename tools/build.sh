#!/usr/bin/env bash
# Build The Zikaron Project.
#
# Compiles the JSX source files (components.js, app.js, song-page.js, about.js,
# requests.js) and songs-data.js into small, minified scripts in js/, then
# regenerates every page's HTML (including a folder for each song in songs-data.js).
#
# Run after editing any of those files, or after adding a song:
#     ./tools/build.sh
set -euo pipefail
cd "$(dirname "$0")/.."

ESBUILD="npx --yes esbuild@0.24.0"
FILES=(songs-data.js components.js app.js song-page.js about.js requests.js)

mkdir -p js
for f in "${FILES[@]}"; do
  $ESBUILD "$f" --loader:.js=jsx --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
    --format=iife --target=es2018 --minify --charset=utf8 --legal-comments=none --log-level=warning --outfile="js/$f"
done

python3 -I tools/build_pages.py "$PWD" > /dev/null

echo "Built: $(ls js | tr '\n' ' ')"
echo "Pages regenerated for $(ls -d songs/*/ | wc -l | tr -d ' ') songs."
