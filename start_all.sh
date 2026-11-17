#!/bin/bash
# VELOOP Rewards — Dual Server Runner
# Server 1: Zero-dependency multi-screen Web App on port 8080
# Server 2: Next.js 14 App on port 3000

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Server 1 (Root Web App) on http://localhost:8080 ..."
(cd "$ROOT_DIR" && python3 server.py 8080) &
SERVER1_PID=$!

echo "Starting Server 2 (Next.js 14 App) on http://localhost:3000 ..."
(cd "$ROOT_DIR/nextjs-app" && deno task dev -p 3000) &
SERVER2_PID=$!

cleanup() {
  echo "Shutting down servers..."
  kill $SERVER1_PID $SERVER2_PID 2>/dev/null
  exit 0
}

trap cleanup SIGINT SIGTERM

echo "=========================================================="
echo "🚀 Both servers are running:"
echo "👉 Server 1 (Vanilla Multi-Device App): http://localhost:8080"
echo "👉 Server 2 (Next.js 14 Web App):        http://localhost:3000"
echo "=========================================================="

wait
