# AI Teacher Training - Next.js Application

Complete Next.js application with landing page, admin dashboard, and database integration.

## 🚀 Quick Deploy

```bash
# On your server (with Traefik already running)
git clone <your-repo-url>
cd ai-teacher-training-nextjs
sudo ./deploy-traefik.sh
```

That's it! Your site will be live at https://ai-edulixa360.hamedelfayome.dev

---

## ✨ Features

### Landing Page
- **Identical to React Version**: Dark gradient background, custom colors, animations
- **Arabic RTL Support**: Full right-to-left layout
- **Responsive Design**: Works on all devices
- **Contact Form**: Collects visitor data and submissions
- **Analytics Integration**: Tracks visitors automatically

### Admin Dashboard
- **Login System**: Secure authentication with NextAuth
- **Analytics Overview**: View visitors, submissions, conversion rates
- **Geographic Data**: See where visitors are from
- **Submissions Management**: View and filter all form submissions
- **Real-time Updates**: Data updates immediately

### Technical Stack
- **Next.js 15.5.4** - React framework
- **PostgreSQL** - Database via Prisma
- **Tailwind CSS v3** - Styling
- **Traefik** - Reverse proxy with automatic SSL
- **Docker** - Containerized deployment

---

## 📋 Prerequisites

### On Your Server:

1. **Docker & Docker Compose** installed
2. **Traefik** running with:
   - `traefik-public` network created
   - Let's Encrypt configured for SSL
   - Listening on ports 80/443
3. **DNS** pointing to your server:
   ```
   ai-edulixa360.hamedelfayome.dev → Your Server IP
   ```

---

## 🛠️ Deployment

### Option 1: Using deploy-traefik.sh (Recommended for Traefik)

```bash
# Clone repository
git clone <repo-url>
cd ai-teacher-training-nextjs

# Deploy
sudo ./deploy-traefik.sh

# During deployment, you'll be asked for:
# - Admin email
# - Admin password (enter twice)

# Watch deployment
docker-compose -f docker-compose.prod.yml logs -f app
```

### Option 2: Using deploy.sh (Fresh Server with nginx)

```bash
sudo ./deploy.sh
```

This installs nginx, certbot, and handles SSL automatically.

---

## 🔧 Configuration

### Default Settings

| Setting | Default Value | Change Via |
|---------|---------------|------------|
| Domain | `ai-edulixa360.hamedelfayome.dev` | `export DOMAIN=your-domain.com` |
| Internal Port | `3010` | `export APP_PORT=3011` |
| Admin Email | (asked during deploy) | Deploy script prompt |
| Database | PostgreSQL 16 | docker-compose.prod.yml |

### Custom Configuration

```bash
# Use custom domain
export DOMAIN="your-custom-domain.com"

# Use custom internal port
export APP_PORT=3011

# Deploy
sudo ./deploy-traefik.sh
```

---

## 📊 Usage

### Access the Site

- **Landing Page**: https://ai-edulixa360.hamedelfayome.dev
- **Admin Login**: https://ai-edulixa360.hamedelfayome.dev/login
- **Dashboard**: https://ai-edulixa360.hamedelfayome.dev/dashboard
- **Submissions**: https://ai-edulixa360.hamedelfayome.dev/dashboard/submissions

### Admin Login

Use the credentials you set during deployment:
- Email: The email you entered
- Password: The password you entered

---

## 🐛 Troubleshooting

### Site Returns 504 Gateway Timeout

**Cause**: Traefik can't reach the container

**Fix**:
```bash
# Check if containers are on the same network
docker inspect ai-teacher-app | grep Networks

# Should show: traefik-public

# If missing, the deploy script will fix it automatically
```

### Database Password Error

**Cause**: Old postgres volume with different password

**Fix**:
```bash
docker-compose -f docker-compose.prod.yml down
docker volume rm ai-teacher-training---edulixa360_postgres_data
sudo ./deploy-traefik.sh
```

### Migration Failed

**Fix**:
```bash
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

### Can't Access Admin Dashboard

**Fix**:
```bash
# Reset admin password by re-seeding
docker-compose -f docker-compose.prod.yml exec app node scripts/seed.js
```

### Site Not Accessible via Domain

**Checks**:
```bash
# 1. DNS resolves correctly
dig ai-edulixa360.hamedelfayome.dev

# 2. Traefik is running
docker ps | grep traefik

# 3. App is running
docker ps | grep ai-teacher-app

# 4. Test local connection
curl http://localhost:3010

# 5. Check Traefik logs
docker logs traefik --tail=50
```

---

## 📁 Project Structure

```
ai-teacher-training-nextjs/
├── app/                          # Next.js app directory
│   ├── (auth)/login/            # Login page
│   ├── api/                     # API routes
│   │   ├── analytics/           # Analytics endpoint
│   │   ├── submissions/         # Form submissions
│   │   └── visitors/            # Visitor tracking
│   ├── dashboard/               # Admin dashboard
│   ├── globals.css              # Global styles (from React)
│   └── page.tsx                 # Landing page
├── components/
│   └── landing/                 # Landing page components (from React)
│       ├── Hero.jsx
│       ├── ContactForm.jsx      # Database integration
│       └── ...
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── scripts/
│   └── seed.ts                  # Admin user seeding
├── public/
│   └── Logo 414x143.png         # Logo file
├── Dockerfile                   # Production build
├── deploy-traefik.sh            # Deployment script (Traefik)
├── deploy.sh                    # Deployment script (nginx)
└── docker-compose.prod.yml      # Generated during deployment
```

---

## 🔄 Updates

### Update Code

```bash
cd /path/to/ai-teacher-training-nextjs
git pull
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### Database Migrations

```bash
# After adding new models to schema.prisma
npx prisma migrate dev --name your_migration_name

# On server
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

---

## 📈 Monitoring

### View Logs

```bash
# All logs
docker-compose -f docker-compose.prod.yml logs -f

# App only
docker-compose -f docker-compose.prod.yml logs -f app

# Database only
docker-compose -f docker-compose.prod.yml logs -f postgres

# Last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100
```

### Check Status

```bash
# Container status
docker-compose -f docker-compose.prod.yml ps

# Resource usage
docker stats ai-teacher-app ai-teacher-postgres

# Health check
curl -I https://ai-edulixa360.hamedelfayome.dev
```

---

## 🗄️ Database Management

### Prisma Studio (GUI)

```bash
docker-compose -f docker-compose.prod.yml exec app npx prisma studio

# Access at: http://localhost:5555
```

### Backup Database

```bash
docker exec ai-teacher-postgres pg_dump -U aiuser ai_teacher_training > backup.sql
```

### Restore Database

```bash
cat backup.sql | docker exec -i ai-teacher-postgres psql -U aiuser -d ai_teacher_training
```

---

## 🔐 Security

- **HTTPS Only**: Traefik handles SSL via Let's Encrypt
- **Password Hashing**: bcryptjs with 12 rounds
- **Secure Secrets**: Auto-generated during deployment
- **Environment Variables**: Stored in `.env.production`
- **Non-root Container**: Runs as `nextjs` user

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review `DEPLOYMENT_READY.md` for detailed fixes
3. Check container logs for errors

---

## 📝 License

Private project - All rights reserved

---

## ✅ Deployment Checklist

- [ ] Server has Docker & Docker Compose
- [ ] Traefik is running with `traefik-public` network
- [ ] DNS points to server IP
- [ ] Ports 80/443 available for Traefik
- [ ] Run `sudo ./deploy-traefik.sh`
- [ ] Enter admin credentials when prompted
- [ ] Wait for deployment to complete
- [ ] Test: `curl https://ai-edulixa360.hamedelfayome.dev`
- [ ] Login to dashboard
- [ ] Verify analytics tracking

---

**Last Updated**: October 2025  
**Deployment Status**: ✅ Production Ready
