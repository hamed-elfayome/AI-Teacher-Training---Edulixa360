# Troubleshooting Guide

Common issues and their solutions for the AI Teacher Training Next.js application.

---

## 🔐 Authentication Issues

### Error: UntrustedHost - NextAuth Error

**Error Message:**
```
[auth][error] UntrustedHost: Host must be trusted. URL was: https://ai-edulixa360.hamedelfayome.dev/api/auth/session
```

**Cause:** NextAuth doesn't trust the domain when behind a reverse proxy (Traefik/nginx).

**Quick Fix:**

```bash
# On your server
cd /path/to/ai-teacher-training-nextjs
sudo ./fix-auth-trust.sh
```

**Manual Fix:**

```bash
# Add AUTH_TRUST_HOST to .env.production
echo 'AUTH_TRUST_HOST="true"' >> .env.production

# Restart the app
docker-compose -f docker-compose.prod.yml restart app
```

**Prevention:** This is now included in both `deploy.sh` and `deploy-traefik.sh` scripts.

---

## 🌐 Network & Connectivity Issues

### Error: 504 Gateway Timeout

**Error Message:**
```
Gateway time-out Error code 504
```

**Cause:** Traefik can't reach the application container due to network configuration.

**Traefik Logs Show:**
```
error="service \"ai-teacher-training\" error: unable to find the IP address for the container \"/ai-teacher-app\": the server is ignored"
```

**Solution:**

This is **already fixed** in `deploy-traefik.sh` (line 136):
```yaml
- "traefik.docker.network=traefik-public"
```

If you deployed before this fix:

```bash
# Option 1: Redeploy (recommended)
cd /path/to/ai-teacher-training-nextjs
docker-compose -f docker-compose.prod.yml down
sudo ./deploy-traefik.sh

# Option 2: Manual fix
# Edit docker-compose.prod.yml and add the label:
nano docker-compose.prod.yml
# Find the app service labels and add:
#   - "traefik.docker.network=traefik-public"

docker-compose -f docker-compose.prod.yml restart app
```

**Verify Fix:**
```bash
# Check Traefik logs (should see no errors)
docker logs traefik --tail=20 | grep ai-teacher

# Test connection
curl -I https://ai-edulixa360.hamedelfayome.dev
```

---

## 🗄️ Database Issues

### Error: P1000 - Authentication Failed

**Error Message:**
```
Error: P1000: Authentication failed against database server, the provided database credentials for aiuser are not valid.
```

**Cause:** Old PostgreSQL volume with different password.

**Solution:**

```bash
# 1. Stop containers
docker-compose -f docker-compose.prod.yml down

# 2. Remove old database volume
docker volume rm ai-teacher-training---edulixa360_postgres_data

# 3. Redeploy (creates fresh database)
sudo ./deploy-traefik.sh
```

**⚠️ Warning:** This deletes all database data. If you need to keep data, backup first:

```bash
docker exec ai-teacher-postgres pg_dump -U aiuser ai_teacher_training > backup.sql
```

---

### Error: P2021 - Table Does Not Exist

**Error Message:**
```
Error: P2021: The table public.User does not exist in the current database.
```

**Cause:** Database migrations haven't been applied.

**Solution:**

```bash
# Apply migrations
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# If that fails, restart the app (migrations run on startup)
docker-compose -f docker-compose.prod.yml restart app
```

---

### Error: No Migration Found

**Error Message:**
```
No migration found in prisma/migrations
```

**Cause:** Migration files missing from the project.

**Solution:**

The migration files should exist at:
```
prisma/migrations/
├── 20250103000000_init/
│   └── migration.sql
└── migration_lock.toml
```

If missing, they're in the repository. Pull latest code:

```bash
git pull
docker-compose -f docker-compose.prod.yml restart app
```

---

## 🎨 Styling Issues

### Tailwind Classes Not Working

**Symptoms:**
- White background instead of dark gradient
- Missing colors
- No animations

**Cause:** Tailwind CSS v4 conflict or missing configuration.

**Solution:**

✅ **Already Fixed!** The repository now uses:
- Tailwind CSS v3 (downgraded from v4)
- Custom colors in `tailwind.config.js`
- All styles in `app/globals.css`

If you have styling issues:

```bash
# 1. Pull latest code
git pull

# 2. Rebuild
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🚀 Build & Deployment Issues

### Error: Module Not Found (seed.ts)

**Error Message:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/app/scripts/seed.ts'
```

**Cause:** Seed script dependencies issue.

**Solution:**

✅ **Already Fixed!** The `Dockerfile` now compiles `seed.ts` to `seed.js` during build.

The deployment scripts now use:
```bash
command: ["sh", "-c", "npx prisma migrate deploy && node scripts/seed.js && npm start"]
```

---

### Error: Cannot Apply Unknown Utility Class

**Error Message:**
```
CssSyntaxError: Cannot apply unknown utility class border-border
```

**Cause:** Tailwind v4 attempting to parse v3 CSS.

**Solution:**

✅ **Already Fixed!** Project now uses Tailwind v3 throughout.

---

## 🔒 Port Conflicts

### Error: Port Already in Use

**Error Message:**
```
Error starting userland proxy: listen tcp4 0.0.0.0:3010: bind: address already in use
```

**Solution:**

```bash
# Option 1: Use different port
export APP_PORT=3011
sudo ./deploy-traefik.sh

# Option 2: Stop conflicting service
docker ps | grep 3010
docker stop <container-id>
sudo ./deploy-traefik.sh
```

---

## 📦 Docker Issues

### Cannot Connect to Docker

**Error Message:**
```
Cannot connect to the Docker daemon
```

**Solution:**

```bash
# Start Docker
sudo systemctl start docker

# Enable Docker on boot
sudo systemctl enable docker

# Add user to docker group (optional, then re-login)
sudo usermod -aG docker $USER
```

---

### Container Keeps Restarting

**Check logs:**
```bash
docker-compose -f docker-compose.prod.yml logs -f app
```

**Common causes:**
1. **Database connection fails** - Check DATABASE_URL in `.env.production`
2. **Missing environment variables** - Ensure `.env.production` exists
3. **Build errors** - Rebuild with `--build` flag

**Solution:**
```bash
# View detailed logs
docker-compose -f docker-compose.prod.yml logs --tail=100 app

# Rebuild if needed
docker-compose -f docker-compose.prod.yml up -d --build app
```

---

## 🌍 DNS & SSL Issues

### Site Not Accessible via Domain

**Checklist:**

```bash
# 1. Check DNS resolution
dig ai-edulixa360.hamedelfayome.dev
# Should return your server's IP

# 2. Check Traefik is running
docker ps | grep traefik

# 3. Check app is running
docker ps | grep ai-teacher-app

# 4. Test local connection
curl http://localhost:3010
# Should return HTML

# 5. Check Traefik logs
docker logs traefik --tail=50
```

---

### SSL Certificate Issues

**Symptoms:**
- Browser shows "Not Secure"
- Certificate errors
- HTTPS doesn't work

**Check:**
```bash
# Verify Traefik labels
docker inspect ai-teacher-app | grep -A 5 "traefik"

# Should see:
# - traefik.enable=true
# - traefik.http.routers.*.tls.certresolver=letsencrypt
```

**Solution:**

Traefik handles SSL automatically via Let's Encrypt. If not working:

1. **Check Traefik configuration** - Ensure Let's Encrypt is configured
2. **Check domain DNS** - Must point to server
3. **Wait 2-3 minutes** - Certificate generation takes time

---

## 📊 Performance Issues

### Slow Page Load

**Check:**
```bash
# View resource usage
docker stats ai-teacher-app

# Check logs for errors
docker-compose -f docker-compose.prod.yml logs -f app
```

**Solutions:**
- Increase container resources
- Check database query performance
- Review API response times

---

## 🔍 Debugging Commands

### View All Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# App only
docker-compose -f docker-compose.prod.yml logs -f app

# Database only
docker-compose -f docker-compose.prod.yml logs -f postgres

# Last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100
```

### Check Container Status
```bash
# List running containers
docker-compose -f docker-compose.prod.yml ps

# Detailed container info
docker inspect ai-teacher-app

# Resource usage
docker stats
```

### Network Debugging
```bash
# List networks
docker network ls

# Inspect network
docker network inspect traefik-public

# Check container networks
docker inspect ai-teacher-app | grep -A 20 Networks
```

### Database Access
```bash
# Connect to database
docker exec -it ai-teacher-postgres psql -U aiuser -d ai_teacher_training

# Run SQL query
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training -c "SELECT * FROM \"User\";"

# Prisma Studio (GUI)
docker-compose -f docker-compose.prod.yml exec app npx prisma studio
# Access at http://localhost:5555
```

---

## 🆘 Still Having Issues?

### Collect Information

```bash
# Create debug report
cat > debug-info.txt << EOF
=== Container Status ===
$(docker-compose -f docker-compose.prod.yml ps)

=== App Logs (last 50 lines) ===
$(docker-compose -f docker-compose.prod.yml logs --tail=50 app)

=== Environment Check ===
Domain: $(grep NEXTAUTH_URL .env.production)
Port: $(grep APP_PORT docker-compose.prod.yml || echo "Default: 3010")

=== Network Info ===
$(docker inspect ai-teacher-app | grep -A 20 Networks)

=== Traefik Logs (last 20 lines) ===
$(docker logs traefik --tail=20 2>&1 | grep ai-teacher || echo "No Traefik logs found")
EOF

cat debug-info.txt
```

### Full Reset (Last Resort)

⚠️ **Warning:** This deletes all data!

```bash
# Stop and remove everything
docker-compose -f docker-compose.prod.yml down -v

# Remove images
docker rmi ai-teacher-training-nextjs_app

# Redeploy fresh
sudo ./deploy-traefik.sh
```

---

## ✅ Verification Checklist

After fixing any issue, verify:

- [ ] Site loads: `curl -I https://ai-edulixa360.hamedelfayome.dev`
- [ ] Login works: Visit `/login` and authenticate
- [ ] Dashboard accessible: Visit `/dashboard`
- [ ] Form submissions work: Test contact form
- [ ] Analytics tracking: Check visitor count in dashboard
- [ ] SSL valid: Check browser shows lock icon
- [ ] No errors in logs: `docker-compose -f docker-compose.prod.yml logs --tail=50`

---

**Last Updated:** October 2025  
**All Issues Fixed:** ✅ Production Ready

