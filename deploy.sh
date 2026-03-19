#!/bin/bash

# ============================================
# Deployment Script
# ============================================
#
# Automates Docker deployment process
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Dental CMS Deployment Script${NC}"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo ""
    echo "Creating .env from template..."
    cp .env.docker .env
    echo -e "${GREEN}✓${NC} .env created"
    echo ""
    echo -e "${YELLOW}⚠️  Using development environment${NC}"
    echo "For production, copy .env.production and customize it"
    echo ""
fi

# Parse command
COMMAND=${1:-up}

case $COMMAND in
  build)
    echo "🔨 Building Docker images..."
    docker-compose build
    echo -e "${GREEN}✓${NC} Build complete"
    ;;
    
  up)
    echo "🚀 Starting services..."
    docker-compose up -d
    echo ""
    echo "⏳ Waiting for services to be healthy..."
    sleep 10
    
    # Check status
    docker-compose ps
    echo ""
    
    echo -e "${GREEN}✓${NC} Services started"
    echo ""
    echo "📍 Access points:"
    echo "   Frontend: http://localhost:3000"
    echo "   Strapi Admin: http://localhost:1337/admin"
    echo "   Strapi API: http://localhost:1337/api"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop: docker-compose down"
    echo "   Restart: docker-compose restart"
    ;;
    
  down)
    echo "🛑 Stopping services..."
    docker-compose down
    echo -e "${GREEN}✓${NC} Services stopped"
    ;;
    
  restart)
    echo "🔄 Restarting services..."
    docker-compose restart
    echo -e "${GREEN}✓${NC} Services restarted"
    ;;
    
  logs)
    echo "📋 Viewing logs (Ctrl+C to exit)..."
    docker-compose logs -f
    ;;
    
  clean)
    echo -e "${RED}⚠️  This will remove all volumes and data${NC}"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
      docker-compose down -v
      echo -e "${GREEN}✓${NC} Cleaned up"
    else
      echo "Cancelled"
    fi
    ;;
    
  rebuild)
    echo "🔨 Rebuilding from scratch..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo -e "${GREEN}✓${NC} Rebuild complete"
    ;;
    
  status)
    echo "📊 Service status:"
    docker-compose ps
    ;;
    
  *)
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build    - Build Docker images"
    echo "  up       - Start services (default)"
    echo "  down     - Stop services"
    echo "  restart  - Restart services"
    echo "  logs     - View logs"
    echo "  clean    - Remove all volumes and data"
    echo "  rebuild  - Rebuild from scratch"
    echo "  status   - Show service status"
    ;;
esac
