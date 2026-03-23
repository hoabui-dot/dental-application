#!/bin/bash

# Rebuild frontend with proper environment variables

set -e

echo "=== Rebuilding Frontend Docker Image ==="
echo ""

# Load environment variables
if [ -f .env ]; then
    echo "Loading .env file..."
    export $(cat .env | grep -v '^#' | xargs)
fi

echo "Environment variables:"
echo "  STRAPI_URL: ${STRAPI_URL}"
echo "  NEXT_PUBLIC_SERVER_URL: ${NEXT_PUBLIC_SERVER_URL}"
echo ""

# Stop frontend
echo "Stopping frontend container..."
docker-compose stop frontend

# Remove old container
echo "Removing old container..."
docker-compose rm -f frontend

# Rebuild with no cache
echo "Rebuilding frontend image..."
docker-compose build --no-cache frontend

# Start frontend
echo "Starting frontend..."
docker-compose up -d frontend

echo ""
echo "=== Rebuild Complete ==="
echo ""
echo "Check logs with: docker logs -f dental-frontend"
echo "Check status with: docker ps | grep frontend"
