#!/usr/bin/env bash
# Canary smoke test — curls a URL passed as $1, expects HTTP 200 + JSON
# body matching {"ok": true, "ts": "<ISO string>"}.
#
# Wired into lifeos-devops repo_config.smoke_command_text as:
#   bash scripts/canary-smoke.sh <production-alias>/api/canary
set -euo pipefail

URL="${1:-}"
if [ -z "$URL" ]; then
  echo "ERROR: missing URL arg (usage: canary-smoke.sh https://.../api/canary)" >&2
  exit 1
fi

echo "[canary-smoke] GET $URL"
RESPONSE_FILE="$(mktemp)"
HTTP_CODE="$(curl --max-time 30 --silent --output "$RESPONSE_FILE" --write-out '%{http_code}' "$URL")"
BODY="$(cat "$RESPONSE_FILE")"
rm -f "$RESPONSE_FILE"

echo "[canary-smoke] HTTP $HTTP_CODE"
echo "[canary-smoke] body: $BODY"

if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: expected HTTP 200; got $HTTP_CODE" >&2
  exit 1
fi

# Validate JSON shape: ok must be true, ts must be a non-empty string.
OK="$(echo "$BODY" | node -e "const b=JSON.parse(require('fs').readFileSync(0,'utf8'));process.stdout.write(String(b.ok===true));")"
TS="$(echo "$BODY" | node -e "const b=JSON.parse(require('fs').readFileSync(0,'utf8'));process.stdout.write(typeof b.ts==='string' && b.ts.length>0 ? 'yes':'no');")"

if [ "$OK" != "true" ]; then
  echo "ERROR: expected body.ok === true; got '$OK'" >&2
  exit 1
fi
if [ "$TS" != "yes" ]; then
  echo "ERROR: expected body.ts to be a non-empty string" >&2
  exit 1
fi

echo "[canary-smoke] OK"
