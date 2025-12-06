#!/bin/bash

echo "=== Testing DevZone API Endpoints ==="
echo ""

echo "1. Root endpoint:"
curl -s http://localhost:8000/ | python3 -m json.tool
echo ""

echo "2. Health endpoint:"
curl -s http://localhost:8000/api/health | python3 -m json.tool
echo ""

echo "3. Users endpoint:"
curl -s http://localhost:8000/api/users | python3 -m json.tool
echo ""

echo "4. Posts endpoint:"
curl -s http://localhost:8000/posts | python3 -m json.tool
echo ""

echo "5. Single post:"
curl -s http://localhost:8000/posts/1 | python3 -m json.tool
echo ""

echo "6. Comments endpoint:"
curl -s http://localhost:8000/comments | python3 -m json.tool
echo ""

echo "7. Single comment:"
curl -s http://localhost:8000/comments/1 | python3 -m json.tool
echo ""

echo "8. Feed endpoint:"
curl -s http://localhost:8000/feed | python3 -m json.tool
echo ""

echo "9. API Documentation: http://localhost:8000/docs"
echo "10. Frontend: http://localhost:3000"
