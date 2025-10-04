# Quick Start Guide

## 🚀 Deploy in 5 Minutes

### Prerequisites

✅ Server with Docker & Docker Compose  
✅ Traefik running with `traefik-public` network  
✅ DNS: `ai-edulixa360.hamedelfayome.dev` → Your Server IP

### Deployment Steps

```bash
# 1. Clone repository (or upload files)
cd /path/to/server
git clone <repo-url>
cd ai-teacher-training-nextjs

# 2. Deploy
sudo ./deploy-traefik.sh

# 3. Enter credentials when prompted
# Admin Email: your@email.com
# Admin Password: [enter secure password]
# Confirm Password: [re-enter password]

# 4. Wait 2-3 minutes for deployment

# 5. Test
curl https://ai-edulixa360.hamedelfayome.dev
```

### Done! 🎉

Your site is now live:
- **Landing Page**: https://ai-edulixa360.hamedelfayome.dev
- **Admin Login**: https://ai-edulixa360.hamedelfayome.dev/login

---

## 🔧 Common Issues

### Issue: "Port already in use"
```bash
export APP_PORT=3011
sudo ./deploy-traefik.sh
```

### Issue: "Database password error"
```bash
docker-compose -f docker-compose.prod.yml down
docker volume rm ai-teacher-training---edulixa360_postgres_data
sudo ./deploy-traefik.sh
```

### Issue: "504 Gateway Timeout"
Already fixed! The deploy script includes the network label:
```yaml
- "traefik.docker.network=traefik-public"
```

---

## 📊 After Deployment

### Login to Dashboard
1. Go to: https://ai-edulixa360.hamedelfayome.dev/login
2. Enter your admin credentials
3. View analytics and submissions

### Test Contact Form
1. Visit landing page
2. Fill out contact form
3. Submit
4. Check dashboard → Submissions

---

## 🔄 Update Deployment

```bash
cd /path/to/ai-teacher-training-nextjs
git pull
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 📝 Useful Commands

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# Check status
docker-compose -f docker-compose.prod.yml ps

# Restart app
docker-compose -f docker-compose.prod.yml restart app

# Stop everything
docker-compose -f docker-compose.prod.yml down

# Start everything
docker-compose -f docker-compose.prod.yml up -d
```

---

**Need more help?** Check `README.md` or `DEPLOYMENT_READY.md`

