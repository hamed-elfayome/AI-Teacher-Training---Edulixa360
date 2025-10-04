# Rebuild Required - Auth Fix Applied

The `trustHost: true` configuration has been added to `lib/auth.ts`. This requires rebuilding the Docker image.

---

## 🚀 Apply on Your Server

### Option 1: Upload Files & Rebuild (Fastest)

```bash
# On your LOCAL machine:
# Upload the updated auth.ts file
scp lib/auth.ts root@your-server:/root/ai-teacher-training-nextjs/lib/

# SSH into your server
ssh root@your-server

# On SERVER:
cd /root/ai-teacher-training-nextjs

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build app

# Watch logs to verify
docker-compose -f docker-compose.prod.yml logs -f app
```

---

### Option 2: Git Pull & Rebuild (If using Git)

```bash
# On your SERVER:
cd /root/ai-teacher-training-nextjs

# Pull latest code
git pull

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build app

# Watch logs
docker-compose -f docker-compose.prod.yml logs -f app
```

---

### Option 3: Quick File Edit on Server

```bash
# On your SERVER:
cd /root/ai-teacher-training-nextjs

# Edit the auth.ts file
nano lib/auth.ts

# Find this line (around line 6):
#   export const { handlers, signIn, signOut, auth } = NextAuth({
#     session: {

# Add this line AFTER the NextAuth({ opening brace:
#   trustHost: true,

# It should look like:
#   export const { handlers, signIn, signOut, auth } = NextAuth({
#     trustHost: true,
#     session: {
#       strategy: "jwt",
#     },

# Save: Ctrl+O, Enter, Ctrl+X

# Rebuild
docker-compose -f docker-compose.prod.yml up -d --build app

# Watch logs
docker-compose -f docker-compose.prod.yml logs -f app
```

---

## ✅ Verification

After rebuild completes (2-3 minutes), you should see:

```
✅ Starting application...
▲ Next.js 15.5.4
  - Local: http://localhost:3000
  - Network: http://0.0.0.0:3000

✓ Starting...
✓ Ready in 338ms
```

**No more `UntrustedHost` errors!**

Test the site:
```bash
# Should work without errors
curl https://ai-edulixa360.hamedelfayome.dev

# Try the login page
curl https://ai-edulixa360.hamedelfayome.dev/login
```

---

## 🎯 What Changed

**File**: `lib/auth.ts`  
**Change**: Added `trustHost: true` to NextAuth configuration

**Before**:
```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
```

**After**:
```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,  // ← Added this line
  session: {
    strategy: "jwt",
  },
```

This tells NextAuth to trust the host when running behind a reverse proxy (Traefik).

---

## 💡 Why Rebuild is Needed

Unlike environment variables (which can be changed without rebuild), code changes require rebuilding the Docker image because:
- The TypeScript needs to be compiled
- Next.js needs to build the application
- The new compiled code needs to be in the container

---

## ⏱️ Rebuild Time

Expect the rebuild to take **2-3 minutes**:
- 1-2 minutes: Building Next.js app
- 30 seconds: Docker image creation
- 30 seconds: Container startup

---

## 🔍 Troubleshooting

### If rebuild fails:

```bash
# Check build logs
docker-compose -f docker-compose.prod.yml logs app

# If needed, full rebuild
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache app
docker-compose -f docker-compose.prod.yml up -d
```

### If still seeing errors:

```bash
# Verify the file was updated
cat lib/auth.ts | grep trustHost
# Should show: trustHost: true,

# Check environment variable too
grep AUTH_TRUST_HOST .env.production
# Should show: AUTH_TRUST_HOST="true"
```

---

## ✅ Final Check

Once rebuild completes:
1. No `UntrustedHost` errors in logs
2. Site loads correctly
3. Login page accessible
4. Dashboard works after login

**All should be working now!** 🎉

