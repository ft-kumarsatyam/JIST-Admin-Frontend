#!/usr/bin/env bash
# Rebuilds the Khelo Tech JIST guides as HTML and PDF.
# Requires pandoc and Google Chrome.
set -euo pipefail

cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME"; exit 1; }
command -v pandoc >/dev/null || { echo "pandoc not installed: brew install pandoc"; exit 1; }

for doc in ADMIN-GUIDE USER-GUIDE; do
  echo "Building $doc..."
  pandoc "$doc.md" \
    --standalone \
    --metadata charset=utf-8 \
    --css=print.css \
    --embed-resources \
    --syntax-highlighting=tango \
    -o "$doc.html"

  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$PWD/$doc.pdf" "file://$PWD/$doc.html" 2>/dev/null

  echo "  -> $doc.pdf"
done

echo "Done."
