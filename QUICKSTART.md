# Quick Start Guide

## 🚀 Deploy to Production Server (One Command)

### On Your Server

```bash
# Clone the repository
git clone <your-repo-url> ai-teacher-training-nextjs
cd ai-teacher-training-nextjs

# Make scripts executable
chmod +x deploy.sh update.sh

# Deploy everything (asks for admin email/password)
sudo ./deploy.sh
```

That's it! The script will:
- Install Docker, Nginx, Certbot
- Configure SSL for `ai-edulixa360.hamedelfayome.dev`
- Set up database with secure password
- Build and start all services
- Create admin user with your credentials

### After Deployment

**Access your application:**
- Landing Page: https://ai-edulixa360.hamedelfayome.dev
- Admin Dashboard: https://ai-edulixa360.hamedelfayome.dev/login

**Update with latest changes:**
```bash
sudo ./update.sh
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database URL and credentials
nano .env

# Setup database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

Open http://localhost:3000

---

## 📋 What You Need

### For Production Deployment
- Ubuntu/Debian server (2GB+ RAM)
- Domain DNS pointing to server
- Root/sudo access

### For Local Development
- Node.js 20+
- PostgreSQL database

---

## 🔑 Default Admin Login

After running `deploy.sh`, use the email and password you entered during setup.

For local development (after `npm run db:seed`):
- Email: admin@example.com (or from `.env`)
- Password: changeme123 (or from `.env`)

---

## 📚 Full Documentation

- [Complete Deployment Guide](./DEPLOYMENT.md)
- [Detailed README](./README.md)
- [Setup Instructions](./SETUP.md)

---

## 🆘 Quick Troubleshooting

**View application logs:**
```bash
docker-compose -f docker-compose.prod.yml logs -f app
```

**Restart application:**
```bash
docker-compose -f docker-compose.prod.yml restart
```

**Check if services are running:**
```bash
docker ps
```

---

## 📞 Support

For issues, check the logs first:
```bash
docker-compose -f docker-compose.prod.yml logs
```
