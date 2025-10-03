# Setup Guide

## Quick Start

### Option 1: Docker (Recommended)

1. **Start everything with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Create admin user:**
   ```bash
   docker-compose exec app npx tsx scripts/seed.ts
   ```

3. **Access the application:**
   - Landing page: http://localhost:3000
   - Admin login: http://localhost:3000/login
   - Default credentials: admin@example.com / changeme123

### Option 2: Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and credentials
   ```

3. **Setup database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_teacher_training?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```

## Database Commands

- `npm run db:migrate` - Run migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed admin user
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database

## Features Overview

### Landing Page
- ✅ SSR for SEO
- ✅ Arabic RTL layout
- ✅ Visitor tracking
- ✅ Contact form with geolocation

### Dashboard
- ✅ Admin authentication
- ✅ Analytics overview
- ✅ Submissions table
- ✅ Search & filter
- ✅ CSV export
- ✅ Dark mode

## Troubleshooting

### Prisma Issues
```bash
npm run db:generate
npx prisma migrate reset
```

### Docker Issues
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### NextAuth Issues
- Clear browser cookies
- Regenerate NEXTAUTH_SECRET
- Check admin user exists in database
