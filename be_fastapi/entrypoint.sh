#!/bin/bash
set -euo pipefail

echo "==================================="
echo "Starting Traffic Violation System"
echo "==================================="

# Auto migration: wait DB, autogenerate, upgrade
./script/auto_migrate.sh

# Start API
uvicorn app.main:app --host 0.0.0.0 --port 8000