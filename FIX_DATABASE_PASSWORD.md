# Fix Database Password Error

## Problem
```
Error: P1000: Authentication failed against database server, 
the provided database credentials for `aiuser` are not valid.
```

This happens because the PostgreSQL container was initialized with a different password than what's in `.env.production`.

## Solution

Run these commands on your server:

### Option 1: Reset Database (RECOMMENDED - Fresh Start)

```bash
cd /path/to/ai-teacher-training-nextjs

# Stop containers
docker-compose -f docker-compose.prod.yml down

# Remove the postgres volume (this deletes the database data)
docker volume rm ai-teacher-training-nextjs_postgres_data

# Or if that doesn't work:
docker volume ls
docker volume rm <volume_name_with_postgres_data>

# Restart deployment
sudo ./deploy-traefik.sh
```

### Option 2: Keep Existing Data (Update Password Manually)

If you have important data and don't want to lose it:

```bash
cd /path/to/ai-teacher-training-nextjs

# 1. Check what password is in .env.production
cat .env.production | grep DATABASE_URL

# 2. Stop the app container only (keep postgres running)
docker stop ai-teacher-app

# 3. Connect to postgres and change the password
docker exec -it ai-teacher-postgres psql -U aiuser -d ai_teacher_training

# 4. In psql, run (replace NEW_PASSWORD with the one from .env.production):
ALTER USER aiuser WITH PASSWORD 'NEW_PASSWORD';
\q

# 5. Restart the app
docker-compose -f docker-compose.prod.yml up -d app
```

### Option 3: Update .env.production to Match Existing Password

```bash
# 1. Find out what the current postgres password is
docker-compose -f docker-compose.prod.yml exec postgres env | grep POSTGRES_PASSWORD

# 2. Update .env.production with that password
nano .env.production
# Change the password in DATABASE_URL to match

# 3. Restart the app container
docker-compose -f docker-compose.prod.yml restart app
```

## Recommended Fix (Fresh Start)

Since this is a new deployment with no user data yet, I recommend **Option 1**:

```bash
# On your server
cd /path/to/ai-teacher-training-nextjs

# Stop everything
docker-compose -f docker-compose.prod.yml down -v

# Remove all volumes
docker volume prune -f

# Re-run deployment
sudo ./deploy-traefik.sh
```

This will:
1. ✅ Create fresh database with correct password
2. ✅ Run migrations
3. ✅ Seed admin user
4. ✅ Start application successfully

## Verify After Fix

```bash
# Check containers are running
docker ps | grep ai-teacher

# Check logs (should see "Starting application...")
docker-compose -f docker-compose.prod.yml logs -f app

# Test the site
curl https://ai-edulixa360.hamedelfayome.dev
```

## Why This Happened

The `deploy-traefik.sh` script generates a random password each time:
```bash
DB_PASSWORD=$(openssl rand -base64 24 | tr -d "=+/" | cut -c1-16)
```

But if the postgres volume already exists from a previous deployment, it keeps the OLD password.

**Solution:** Always remove volumes when redeploying with new credentials.

