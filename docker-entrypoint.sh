#!/bin/sh
# Entry point script: write runtime env into a JS file that the browser can read
# This allows injecting secrets at container start (runtime) instead of build time.

BUILD_DIR="/myapp/build"
OUT_FILE="$BUILD_DIR/env-config.js"

echo "Creating runtime env file: $OUT_FILE"

mkdir -p "$BUILD_DIR"

cat > "$OUT_FILE" << EOF
// WARNING: This file is generated at container start and exposes runtime env to the browser
window._env_ = {
  REACT_APP_API_KEY: "${REACT_APP_API_KEY}",
  REACT_APP_AUTH_DOMAIN: "${REACT_APP_AUTH_DOMAIN}",
  REACT_APP_PROJECT_ID: "${REACT_APP_PROJECT_ID}",
  REACT_APP_STORAGE_BUCKET: "${REACT_APP_STORAGE_BUCKET}",
  REACT_APP_MESSAGING_SENDER_ID: "${REACT_APP_MESSAGING_SENDER_ID}",
  REACT_APP_APP_ID: "${REACT_APP_APP_ID}",
  REACT_APP_IMG_BB_KEY: "${REACT_APP_IMG_BB_KEY}"
};
EOF

echo "Wrote runtime env to $OUT_FILE"

exec "$@"
