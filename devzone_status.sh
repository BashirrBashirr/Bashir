#!/bin/bash

echo "========================================="
echo "📊 DevZone Status Dashboard"
echo "========================================="
echo ""

echo "🛠️  Service Status:"
sudo docker-compose ps
echo ""

echo "🌐 Network Endpoints:"
echo "  Frontend UI:     http://localhost:3000"
echo "  Backend API:     http://localhost:8000"
echo "  API Docs:        http://localhost:8000/docs"
echo "  Database:        localhost:5432"
echo ""

echo "✅ Quick Health Check:"

# Check backend
echo -n "Backend API: "
if curl -s --max-time 2 http://localhost:8000/ > /dev/null; then
    echo "✅ Running"
else
    echo "❌ Down"
fi

# Check frontend
echo -n "Frontend:     "
if curl -s --max-time 2 http://localhost:3000 > /dev/null; then
    echo "✅ Running"
else
    echo "⚠️  Starting up..."
fi

# Check database
echo -n "Database:     "
if sudo docker-compose exec db pg_isready -U devzone > /dev/null 2>&1; then
    echo "✅ Running"
else
    echo "❌ Down"
fi

echo ""
echo "🔧 Available Endpoints:"
echo "  GET  /                    - Root endpoint"
echo "  GET  /api/health          - Health check"
echo "  GET  /api/users           - List users"
echo "  GET  /posts               - Get all posts"
echo "  GET  /posts/{id}          - Get single post"
echo "  GET  /comments            - Get all comments"
echo "  GET  /comments/{id}       - Get single comment"
echo "  GET  /feed                - Get feed"
echo "  GET  /docs                - Interactive API docs"
echo "  GET  /openapi.json        - OpenAPI specification"
echo ""

echo "🎯 Next Steps:"
echo "  1. Open http://localhost:3000 in browser"
echo "  2. Explore API at http://localhost:8000/docs"
echo "  3. Check logs: sudo docker-compose logs -f"
echo "  4. Stop DevZone: sudo docker-compose down"
echo ""

echo "🛠️  Management Commands:"
echo "  ./manage_devzone.sh start    - Start all services"
echo "  ./manage_devzone.sh stop     - Stop all services"
echo "  ./manage_devzone.sh restart  - Restart services"
echo "  ./manage_devzone.sh logs     - View logs"
echo "  ./manage_devzone.sh status   - Show status"
echo "========================================="
