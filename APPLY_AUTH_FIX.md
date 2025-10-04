# Apply NextAuth Fix - Server Instructions

Your deployment scripts are now fixed, but you need to apply the fix to your **currently running server**.

---

## 🚀 Quick Fix (Choose One Option)

### Option 1: Automated Fix Script (Recommended)

```bash
# 1. Upload the fix-auth-trust.sh script to your server
scp fix-auth-trust.sh root@your-server:/root/ai-teacher-training-nextjs/

# 2. SSH into your server
ssh root@your-server

# 3. Navigate to project directory
cd /root/ai-teacher-training-nextjs

# 4. Make script executable
chmod +x fix-auth-trust.sh

# 5. Run the fix
sudo ./fix-auth-trust.sh
```

---

### Option 2: Manual Fix (Fastest)

**On your server**, run these commands:

```bash
# Navigate to project directory
cd /path/to/ai-teacher-training-nextjs

# Add AUTH_TRUST_HOST to .env.production
echo 'AUTH_TRUST_HOST="true"' >> .env.production

# Restart the app container
docker-compose -f docker-compose.prod.yml restart app

# Wait 10 seconds for app to start
sleep 10

# Test
curl -I https://ai-edulixa360.hamedelfayome.dev/api/auth/session
```

---

### Option 3: Full Redeploy (If you want latest code)

```bash
# On your server
cd /path/to/ai-teacher-training-nextjs

# Pull latest code (includes the fix)
git pull

# Stop containers (keeps database)
docker-compose -f docker-compose.prod.yml down

# Remove old docker-compose file
rm docker-compose.prod.yml

# Redeploy with updated script
sudo ./deploy-traefik.sh
```

---

## ✅ Verification

After applying the fix, verify it works:

```bash
# 1. Check .env.production contains the variable
grep AUTH_TRUST_HOST .env.production
# Should show: AUTH_TRUST_HOST="true"

# 2. Check container is running
docker ps | grep ai-teacher-app

# 3. Check logs (should see no auth errors)
docker-compose -f docker-compose.prod.yml logs --tail=50 app

# 4. Test the site
curl https://ai-edulixa360.hamedelfayome.dev
# Should return HTML without errors

# 5. Test login page
curl https://ai-edulixa360.hamedelfayome.dev/login
# Should work without UntrustedHost error
```

---

## 🎯 Expected Result

After applying the fix:
- ✅ No more `UntrustedHost` errors in logs
- ✅ Login page loads correctly
- ✅ Authentication works
- ✅ Dashboard accessible

---

## 💡 What This Does

The `AUTH_TRUST_HOST="true"` environment variable tells NextAuth to trust the host when running behind a reverse proxy (Traefik). This is safe because:
- Your app is internal (not exposed directly)
- Traefik handles SSL and routing
- The domain is yours and verified via DNS

---

## 📝 For Future Deployments

This fix is now **permanently included** in both:
- `deploy-traefik.sh` (line 84)
- `deploy.sh` (line 84)

Future deployments will automatically include this fix. No manual steps needed! 🎉

