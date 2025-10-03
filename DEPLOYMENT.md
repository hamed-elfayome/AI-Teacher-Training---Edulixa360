# Production Deployment Guide

## One-Command Deployment

Deploy the entire application with SSL on your server:

```bash
sudo ./deploy.sh
```

This script will:
- ✅ Install all system dependencies (Docker, Nginx, Certbot)
- ✅ Ask for admin email and password
- ✅ Generate secure secrets automatically
- ✅ Configure database with secure password
- ✅ Set up SSL certificate with Let's Encrypt
- ✅ Configure Nginx reverse proxy
- ✅ Build and start Docker containers
- ✅ Run database migrations
- ✅ Seed admin user
- ✅ Configure auto-renewal for SSL certificates

## Updating the Application

To pull latest changes and update:

```bash
sudo ./update.sh
```

This will:
- ✅ Pull latest code from Git
- ✅ Rebuild Docker images
- ✅ Run database migrations
- ✅ Restart all services with zero downtime

## Server Requirements

- **OS**: Ubuntu 20.04+ / Debian 11+
- **RAM**: Minimum 2GB
- **Disk**: Minimum 10GB
- **Domain**: DNS A record pointing to your server IP

## Pre-Deployment Setup

1. **Configure DNS**:
   ```
   Type: A
   Name: ai-edulixa360
   Value: YOUR_SERVER_IP
   TTL: 300
   ```

2. **Clone repository on server**:
   ```bash
   git clone <your-repo-url>
   cd ai-teacher-training-nextjs
   chmod +x deploy.sh update.sh
   ```

3. **Run deployment**:
   ```bash
   sudo ./deploy.sh
   ```

## What Gets Deployed

### Services
- **PostgreSQL**: Database on port 5432 (internal)
- **Next.js App**: Application on port 3000 (internal)
- **Nginx**: Reverse proxy on ports 80/443
- **Certbot**: Auto SSL renewal

### URLs
- **Landing Page**: https://ai-edulixa360.hamedelfayome.dev
- **Admin Login**: https://ai-edulixa360.hamedelfayome.dev/login
- **Dashboard**: https://ai-edulixa360.hamedelfayome.dev/dashboard

## Useful Commands

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Application only
docker-compose -f docker-compose.prod.yml logs -f app

# Nginx only
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Restart Services
```bash
# Restart all
docker-compose -f docker-compose.prod.yml restart

# Restart app only
docker-compose -f docker-compose.prod.yml restart app
```

### Stop Services
```bash
docker-compose -f docker-compose.prod.yml down
```

### Database Management
```bash
# Access Prisma Studio (on server, then tunnel)
docker-compose -f docker-compose.prod.yml exec app npx prisma studio

# Run migrations manually
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy

# Access PostgreSQL
docker-compose -f docker-compose.prod.yml exec postgres psql -U aiuser -d ai_teacher_training
```

### Backup Database
```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U aiuser ai_teacher_training > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U aiuser ai_teacher_training < backup_file.sql
```

## SSL Certificate

The deployment script automatically:
- Obtains SSL certificate from Let's Encrypt
- Configures auto-renewal (runs every 12 hours)
- Sets up HTTPS redirect

To manually renew:
```bash
docker-compose -f docker-compose.prod.yml exec certbot certbot renew
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload
```

## Troubleshooting

### SSL Certificate Issues
```bash
# Check certificate status
docker-compose -f docker-compose.prod.yml exec certbot certbot certificates

# Force renewal
docker-compose -f docker-compose.prod.yml exec certbot certbot renew --force-renewal
```

### Application Not Starting
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs app

# Rebuild and restart
docker-compose -f docker-compose.prod.yml build --no-cache app
docker-compose -f docker-compose.prod.yml up -d
```

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres

# Restart database
docker-compose -f docker-compose.prod.yml restart postgres
```

### Reset Everything
```bash
# WARNING: This deletes all data
docker-compose -f docker-compose.prod.yml down -v
sudo ./deploy.sh
```

## Monitoring

### Check Service Status
```bash
docker ps
```

### Resource Usage
```bash
docker stats
```

### Disk Usage
```bash
docker system df
```

## Security Notes

- Admin credentials are stored in `.env.production`
- Database password is auto-generated
- NEXTAUTH_SECRET is auto-generated
- SSL certificates auto-renew
- All services run in isolated Docker network
- PostgreSQL is not exposed to the internet

## Updating Domain

To change domain after deployment:

1. Update DNS to point to server
2. Edit `deploy.sh` and change `DOMAIN` variable
3. Run `sudo ./deploy.sh` again

## Production Checklist

Before going live:
- [ ] DNS configured correctly
- [ ] Server has at least 2GB RAM
- [ ] Ports 80 and 443 are open
- [ ] Domain resolves to server IP
- [ ] Admin credentials are secure
- [ ] Database backups configured
- [ ] Monitoring set up

## Support

For issues:
1. Check logs: `docker-compose -f docker-compose.prod.yml logs`
2. Verify services are running: `docker ps`
3. Check domain DNS: `dig ai-edulixa360.hamedelfayome.dev`
4. Test SSL: `curl -I https://ai-edulixa360.hamedelfayome.dev`
