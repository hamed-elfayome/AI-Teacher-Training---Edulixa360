#!/bin/bash

# Quick fix for NextAuth UntrustedHost error
# Adds AUTH_TRUST_HOST=true to .env.production

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔧 Fixing NextAuth UntrustedHost Error${NC}"
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ .env.production not found!${NC}"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check if AUTH_TRUST_HOST already exists
if grep -q "AUTH_TRUST_HOST" .env.production; then
    echo -e "${YELLOW}⚠️  AUTH_TRUST_HOST already exists in .env.production${NC}"
    echo "Current value:"
    grep "AUTH_TRUST_HOST" .env.production
    
    read -p "Do you want to update it to 'true'? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
    
    # Update existing value
    sed -i.bak 's/AUTH_TRUST_HOST=.*/AUTH_TRUST_HOST="true"/' .env.production
    echo -e "${GREEN}✅ Updated AUTH_TRUST_HOST to true${NC}"
else
    # Add AUTH_TRUST_HOST after NEXTAUTH_SECRET
    if grep -q "NEXTAUTH_SECRET" .env.production; then
        sed -i.bak '/NEXTAUTH_SECRET/a\
AUTH_TRUST_HOST="true"' .env.production
        echo -e "${GREEN}✅ Added AUTH_TRUST_HOST=true to .env.production${NC}"
    else
        echo -e "${RED}❌ NEXTAUTH_SECRET not found in .env.production${NC}"
        echo "Please add AUTH_TRUST_HOST=true manually after NEXTAUTH_SECRET"
        exit 1
    fi
fi

echo ""
echo -e "${YELLOW}📋 Restarting application...${NC}"

# Restart the app container to pick up the new environment variable
if docker-compose -f docker-compose.prod.yml ps | grep -q "ai-teacher-app"; then
    docker-compose -f docker-compose.prod.yml restart app
    echo -e "${GREEN}✅ Application restarted${NC}"
    echo ""
    echo -e "${YELLOW}⏳ Waiting for application to start (10 seconds)...${NC}"
    sleep 10
    echo ""
    echo -e "${GREEN}✅ Done! The UntrustedHost error should now be fixed.${NC}"
    echo ""
    echo "Test the site:"
    echo "  curl -I https://ai-edulixa360.hamedelfayome.dev/api/auth/session"
else
    echo -e "${YELLOW}⚠️  Container not running. Please start it with:${NC}"
    echo "  docker-compose -f docker-compose.prod.yml up -d"
fi

echo ""
echo -e "${GREEN}✨ All done!${NC}"

