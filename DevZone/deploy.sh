#!/bin/bash

echo "========================================"
echo "Deploying DevZone - Social Media for Developers"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "Error: docker-compose.yml not found!"
    echo "Please make sure you're in the DevZone directory."
    exit 1
fi

# Create necessary directories
echo "Creating directories..."
mkdir -p nginx logs backend frontend

# Check Docker permissions
echo "Checking Docker permissions..."

# Determine if we need sudo
USE_SUDO=""
if docker ps &> /dev/null; then
    echo "✓ Docker is accessible without sudo"
else
    echo "⚠ Docker not accessible without sudo"
    if sudo docker ps &> /dev/null; then
        echo "✓ Docker works with sudo"
        USE_SUDO="sudo"
    else
        echo "✗ Docker is not running or installed"
        echo "Please start Docker: sudo systemctl start docker"
        exit 1
    fi
fi

# Clean up any existing containers
echo "Cleaning up any existing containers..."
${USE_SUDO} docker-compose down 2>/dev/null || true

# Build containers
echo "Building containers..."
${USE_SUDO} docker-compose build

# Start containers
echo "Starting containers..."
${USE_SUDO} docker-compose up -d

# Wait for services to start
echo "Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "Checking service status..."
${USE_SUDO} docker-compose ps

echo ""
echo "========================================"
echo "🎉 DevZone is now running!"
echo "========================================"
echo ""
echo "🌐 Frontend:    http://localhost:3000"
echo "⚡ Backend API: http://localhost:8000"
echo "📚 API Docs:    http://localhost:8000/docs"
echo "🗄️  Database:    localhost:5432"
echo "               Username: devzone"
echo "               Password: devzone"
echo ""
echo "========================================"
echo "🛠️  Useful Commands:"
echo "========================================"
echo "View logs:              ${USE_SUDO} docker-compose logs -f"
echo "Stop DevZone:           ${USE_SUDO} docker-compose down"
echo "Restart:                ${USE_SUDO} docker-compose restart"
echo "Rebuild:                ${USE_SUDO} docker-compose up -d --build"
echo "Check status:           ${USE_SUDO} docker-compose ps"
echo "Access backend shell:   ${USE_SUDO} docker-compose exec backend bash"
echo "Access database:        ${USE_SUDO} docker-compose exec db psql -U devzone"
echo "========================================"
