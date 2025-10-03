#!/bin/bash

set -e

echo "🔄 AI Teacher Training - Update Script"
echo "======================================"
echo ""

# Configuration
COMPOSE_FILE="docker-compose.prod.yml"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  Please run as root or with sudo"
    exit 1
fi

# Check if docker-compose.prod.yml exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ Production deployment not found. Run ./deploy.sh first."
    exit 1
fi

echo -e "${BLUE}📥 Pulling latest changes from Git...${NC}"
git fetch origin
git pull origin main || git pull origin master

echo -e "${GREEN}✅ Code updated${NC}"
echo ""

echo -e "${BLUE}🏗️  Rebuilding Docker images...${NC}"
docker-compose -f $COMPOSE_FILE build --no-cache

echo -e "${GREEN}✅ Build complete${NC}"
echo ""

echo -e "${BLUE}🔄 Restarting services...${NC}"
docker-compose -f $COMPOSE_FILE down
docker-compose -f $COMPOSE_FILE up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Run migrations
echo -e "${BLUE}🗄️  Running database migrations...${NC}"
docker-compose -f $COMPOSE_FILE exec -T app npx prisma migrate deploy

echo -e "${GREEN}✅ Migrations complete${NC}"
echo ""

# Check if services are running
if docker ps | grep -q ai-teacher-app; then
    echo -e "${GREEN}✅ Application updated successfully!${NC}"
    echo ""
    echo "📊 View logs with: docker-compose -f $COMPOSE_FILE logs -f app"
else
    echo -e "${YELLOW}⚠️  Warning: Application may not be running properly${NC}"
    echo "📊 Check logs with: docker-compose -f $COMPOSE_FILE logs app"
    exit 1
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ UPDATE COMPLETE!${NC}"
echo "================================================"
echo ""
