#!/usr/bin/env bash
set -euo pipefail

echo "Applying migrations..."
alembic upgrade head
echo "Alembic done."