#!/bin/bash

echo "=== Checking Backend Logs ==="
echo ""

# Stop any existing logs command
pkill -f "docker-compose logs" 2>/dev/null || true

# Start backend fresh
echo "1. Restarting backend..."
sudo docker-compose restart backend

echo "2. Waiting 5 seconds..."
sleep 5

echo "3. Getting logs..."
LOGS=$(sudo docker-compose logs --tail=50 backend 2>&1)
echo "$LOGS"

echo ""
echo "4. Looking for errors..."
if echo "$LOGS" | grep -q "ImportError\|ModuleNotFoundError\|SyntaxError\|Error loading ASGI app"; then
    echo "❌ Found errors in logs!"
    echo "$LOGS" | grep -B5 -A5 "ImportError\|ModuleNotFoundError\|SyntaxError\|Error loading ASGI app"
else
    echo "✅ No import errors found in logs"
fi

echo ""
echo "5. Testing connection..."
timeout 3 curl -v http://localhost:8000/ 2>&1 | head -20
