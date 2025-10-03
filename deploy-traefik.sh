#!/bin/bash

set -e

echo "🚀 AI Teacher Training - Production Deployment (Traefik)"
echo "========================================================"
echo ""

# Configuration
DOMAIN="${DOMAIN:-ai-edulixa360.hamedelfayome.dev}"
APP_NAME="ai-teacher-training"
COMPOSE_FILE="docker-compose.prod.yml"
APP_PORT="${APP_PORT:-3010}"  # Internal port for Traefik to route to

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  Please run as root or with sudo"
    exit 1
fi

echo -e "${GREEN}📋 Configuration:${NC}"
echo "   Domain: $DOMAIN"
echo "   App Port: $APP_PORT"
echo ""

# Check Docker installation
echo "📦 Checking dependencies..."

if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    apt-get update -qq
    apt-get install -y docker.io -qq
    systemctl enable docker
    systemctl start docker
else
    echo -e "${GREEN}✅ Docker already installed${NC}"
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    apt-get install -y docker-compose -qq
else
    echo -e "${GREEN}✅ Docker Compose already installed${NC}"
fi

echo -e "${GREEN}✅ All dependencies ready${NC}"
echo ""

# Get admin credentials
echo "👤 Admin Account Setup"
echo "======================"
read -p "Enter admin email: " ADMIN_EMAIL
while true; do
    read -s -p "Enter admin password: " ADMIN_PASSWORD
    echo
    read -s -p "Confirm admin password: " ADMIN_PASSWORD_CONFIRM
    echo
    [ "$ADMIN_PASSWORD" = "$ADMIN_PASSWORD_CONFIRM" ] && break
    echo "⚠️  Passwords don't match. Try again."
done

echo -e "${GREEN}✅ Admin credentials set${NC}"
echo ""

# Generate secure secrets
echo "🔐 Generating secure secrets..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
DB_PASSWORD=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-16)

# Create .env.production
cat > .env.production << EOF
# Database
DATABASE_URL="postgresql://aiuser:${DB_PASSWORD}@postgres:5432/ai_teacher_training?schema=public"

# NextAuth
NEXTAUTH_URL="https://${DOMAIN}"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"

# Admin Credentials
ADMIN_EMAIL="${ADMIN_EMAIL}"
ADMIN_PASSWORD="${ADMIN_PASSWORD}"
EOF

echo -e "${GREEN}✅ Environment configured${NC}"
echo ""

# Create production docker-compose for Traefik
cat > docker-compose.prod.yml << PRODCOMPOSE
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: ai-teacher-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: aiuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ai_teacher_training
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U aiuser -d ai_teacher_training"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ai-teacher-app
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    env_file:
      - .env.production
    environment:
      NODE_ENV: production
    networks:
      - app-network
      - traefik-public
    ports:
      - "${APP_PORT}:3000"
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=traefik-public"
      - "traefik.http.routers.${APP_NAME}.rule=Host(\`${DOMAIN}\`)"
      - "traefik.http.routers.${APP_NAME}.entrypoints=websecure"
      - "traefik.http.routers.${APP_NAME}.tls=true"
      - "traefik.http.routers.${APP_NAME}.tls.certresolver=letsencrypt"
      - "traefik.http.services.${APP_NAME}.loadbalancer.server.port=3000"
    command: >
      sh -c "
        echo '🔄 Running database migrations...' &&
        npx prisma migrate deploy &&
        echo '👤 Seeding admin user...' &&
        node scripts/seed.js &&
        echo '✅ Starting application...' &&
        node server.js
      "

networks:
  app-network:
    driver: bridge
  traefik-public:
    external: true

volumes:
  postgres_data:
PRODCOMPOSE

# Replace DB_PASSWORD in docker-compose
sed -i "s/\${DB_PASSWORD}/${DB_PASSWORD}/g" docker-compose.prod.yml
sed -i "s/\${APP_PORT}/${APP_PORT}/g" docker-compose.prod.yml
sed -i "s/\${APP_NAME}/${APP_NAME}/g" docker-compose.prod.yml
sed -i "s/\${DOMAIN}/${DOMAIN}/g" docker-compose.prod.yml

echo -e "${GREEN}✅ Docker Compose configured for Traefik${NC}"
echo ""

# Check if traefik network exists
if ! docker network ls | grep -q traefik-public; then
    echo -e "${YELLOW}⚠️  Traefik network not found. Creating it...${NC}"
    docker network create traefik-public
fi

# Build and start services
echo "🏗️  Building application..."
docker-compose -f $COMPOSE_FILE build --no-cache

echo ""
echo "🚀 Starting services..."
docker-compose -f $COMPOSE_FILE up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check if services are running
if docker ps | grep -q ai-teacher-app; then
    echo -e "${GREEN}✅ Application is running!${NC}"
else
    echo -e "${RED}❌ Application may not be running. Check logs with: docker-compose -f $COMPOSE_FILE logs${NC}"
    echo ""
    echo "Showing recent logs:"
    docker-compose -f $COMPOSE_FILE logs --tail=50
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo "================================================"
echo ""
echo "📍 Your application should be available at:"
echo "   https://${DOMAIN}"
echo ""
echo "   (Make sure Traefik is configured to route to this domain)"
echo ""
echo "🔑 Admin Login:"
echo "   URL: https://${DOMAIN}/login"
echo "   Email: ${ADMIN_EMAIL}"
echo "   Password: [the password you entered]"
echo ""
echo "📊 Useful commands:"
echo "   View logs:          docker-compose -f $COMPOSE_FILE logs -f"
echo "   View app logs:      docker-compose -f $COMPOSE_FILE logs -f app"
echo "   Stop application:   docker-compose -f $COMPOSE_FILE down"
echo "   Restart:            docker-compose -f $COMPOSE_FILE restart"
echo ""
echo "🗄️  Database management:"
echo "   Prisma Studio:      docker-compose -f $COMPOSE_FILE exec app npx prisma studio"
echo "   Run migrations:     docker-compose -f $COMPOSE_FILE exec app npx prisma migrate deploy"
echo ""
echo "🔧 Troubleshooting:"
echo "   If app is not accessible:"
echo "   1. Check Traefik is running: docker ps | grep traefik"
echo "   2. Check Traefik logs: docker logs traefik"
echo "   3. Verify DNS points to this server"
echo "   4. Check app logs: docker-compose -f $COMPOSE_FILE logs app"
echo ""

