#!/usr/bin/env bash
set -euo pipefail

echo "Auto-generating Alembic revision (if schema changed)..."
REV_MSG=${REV_MSG:-"auto revision"}
alembic revision --autogenerate -m "$REV_MSG" || true

LAST_FILE=$(ls -t alembic/versions/*.py 2>/dev/null | head -n 1 || true)
if [[ -z "${LAST_FILE}" ]]; then
  echo "No revision file created."
else
  if grep -qE "def upgrade\\(\\).*\\n\\s+pass" "$LAST_FILE" && grep -qE "def downgrade\\(\\).*\\n\\s+pass" "$LAST_FILE"; then
    echo "Empty autogenerate (no schema changes). Removing $LAST_FILE"
    rm -f "$LAST_FILE"
  else
    echo "New revision created: $LAST_FILE"
  fi
fi

echo "Applying migrations..."
alembic upgrade head

echo "Alembic done."