#!/bin/bash

set -e

echo "🚀 AI Teacher Training - Production Deployment"
echo "=============================================="
echo ""

# Configuration
DOMAIN="ai-edulixa360.hamedelfayome.dev"
APP_NAME="ai-teacher-training"
COMPOSE_FILE="docker-compose.prod.yml"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  Please run as root or with sudo"
    exit 1
fi

echo -e "${GREEN}📋 Domain: $DOMAIN${NC}"
echo ""

# Install dependencies
echo "📦 Installing system dependencies..."
apt-get update -qq
apt-get install -y docker.io docker-compose certbot python3-certbot-nginx nginx git curl -qq

# Enable and start Docker
systemctl enable docker
systemctl start docker

echo -e "${GREEN}✅ Dependencies installed${NC}"
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

# Create production docker-compose
cat > docker-compose.prod.yml << 'PRODCOMPOSE'
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
    command: >
      sh -c "
        echo 'Running database migrations...' &&
        npx prisma migrate deploy &&
        echo 'Seeding admin user...' &&
        npx tsx scripts/seed.ts &&
        echo 'Starting application...' &&
        node server.js
      "

  nginx:
    image: nginx:alpine
    container_name: ai-teacher-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    depends_on:
      - app
    networks:
      - app-network
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

  certbot:
    image: certbot/certbot
    container_name: ai-teacher-certbot
    restart: unless-stopped
    volumes:
      - ./certbot/conf:/etc/letsencrypt
      - ./certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
PRODCOMPOSE

# Replace DB_PASSWORD in docker-compose
sed -i "s/\${DB_PASSWORD}/${DB_PASSWORD}/g" docker-compose.prod.yml

echo -e "${GREEN}✅ Docker Compose configured${NC}"
echo ""

# Create Nginx configuration (initial for certbot)
mkdir -p certbot/www certbot/conf

cat > nginx.conf << NGINXCONF
server {
    listen 80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 10M;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINXCONF

echo -e "${GREEN}✅ Nginx configured${NC}"
echo ""

# Start nginx temporarily for certbot
echo "🔒 Setting up SSL certificate..."
docker-compose -f $COMPOSE_FILE up -d nginx

# Wait for nginx
sleep 5

# Get SSL certificate
echo "📜 Obtaining Let's Encrypt certificate..."
docker-compose -f $COMPOSE_FILE run --rm certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email ${ADMIN_EMAIL} \
    --agree-tos \
    --no-eff-email \
    -d ${DOMAIN}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL certificate obtained${NC}"
else
    echo -e "${YELLOW}⚠️  SSL certificate not obtained. Will use HTTP only.${NC}"
    # Create self-signed certificate as fallback
    mkdir -p certbot/conf/live/${DOMAIN}
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout certbot/conf/live/${DOMAIN}/privkey.pem \
        -out certbot/conf/live/${DOMAIN}/fullchain.pem \
        -subj "/CN=${DOMAIN}"
fi

echo ""

# Stop temporary nginx
docker-compose -f $COMPOSE_FILE down

# Build and start all services
echo "🏗️  Building application..."
docker-compose -f $COMPOSE_FILE build --no-cache

echo ""
echo "🚀 Starting services..."
docker-compose -f $COMPOSE_FILE up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
if docker ps | grep -q ai-teacher-app; then
    echo -e "${GREEN}✅ Application is running!${NC}"
else
    echo -e "${YELLOW}⚠️  Application may not be running. Check logs with: docker-compose -f $COMPOSE_FILE logs${NC}"
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo "================================================"
echo ""
echo "📍 Your application is available at:"
echo "   https://${DOMAIN}"
echo ""
echo "🔑 Admin Login:"
echo "   URL: https://${DOMAIN}/login"
echo "   Email: ${ADMIN_EMAIL}"
echo "   Password: [the password you entered]"
echo ""
echo "📊 Useful commands:"
echo "   View logs:          docker-compose -f $COMPOSE_FILE logs -f"
echo "   Stop application:   docker-compose -f $COMPOSE_FILE down"
echo "   Restart:            docker-compose -f $COMPOSE_FILE restart"
echo "   Update:             ./update.sh"
echo ""
echo "🗄️  Database management:"
echo "   Prisma Studio:      docker-compose -f $COMPOSE_FILE exec app npx prisma studio"
echo "   Run migrations:     docker-compose -f $COMPOSE_FILE exec app npx prisma migrate deploy"
echo ""
