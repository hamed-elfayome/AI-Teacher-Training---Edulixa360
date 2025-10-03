# AI Teacher Training - Next.js Full-Stack

A modern full-stack application for AI teacher training with analytics dashboard built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Features

### Landing Page (SSR)
- 🌍 Arabic RTL support with Cairo font
- 🎨 Same beautiful design from original React version
- ⚡ Server-side rendering for optimal SEO
- 📊 Visitor tracking with geolocation
- 📝 Contact form with location data

### Admin Dashboard (Dark Mode)
- 🔐 Secure authentication with NextAuth.js
- 📈 Analytics overview with charts
- 🌎 Country-based statistics
- 📋 Submissions management
- 🔍 Search and filter functionality
- 📥 Export to CSV
- 🎨 Dark themed UI with shadcn/ui

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js v5
- **UI**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Deployment**: Docker + Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for containerized setup)
- PostgreSQL (if running locally without Docker)

### Installation

1. **Clone the repository**
   ```bash
   cd ai-teacher-training-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your values:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/ai_teacher_training?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your-password"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   npx tsx scripts/seed.ts  # Creates admin user
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and run containers**
   ```bash
   docker-compose up -d
   ```

   This will:
   - Start PostgreSQL on port 5432
   - Build and run the Next.js app on port 3000
   - Run database migrations automatically

2. **Create admin user**
   ```bash
   docker-compose exec app npx tsx scripts/seed.ts
   ```

3. **View logs**
   ```bash
   docker-compose logs -f app
   ```

4. **Stop containers**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

```bash
# Build the image
docker build -t ai-teacher-training .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret" \
  ai-teacher-training
```

## Project Structure

```
ai-teacher-training-nextjs/
├── app/
│   ├── (auth)/
│   │   └── login/              # Admin login page
│   ├── dashboard/
│   │   ├── page.tsx            # Analytics dashboard
│   │   ├── submissions/        # Submissions table
│   │   └── layout.tsx          # Dashboard layout
│   ├── api/
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── submissions/        # Submissions CRUD
│   │   ├── visitors/           # Visitor tracking
│   │   └── analytics/          # Analytics data
│   ├── page.tsx                # Landing page (SSR)
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── landing/                # Landing page components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── auth.ts                 # NextAuth config
│   ├── prisma.ts               # Prisma client
│   └── utils.ts                # Utilities
├── prisma/
│   └── schema.prisma           # Database schema
├── scripts/
│   └── seed.ts                 # Database seeding
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose setup
└── middleware.ts               # Auth middleware
```

## Database Schema

### User
- Admin authentication

### Visitor
- Page visitor tracking
- Geolocation data

### Submission
- Form submissions
- Contact information
- Location data

## API Routes

- `POST /api/visitors` - Track visitor
- `POST /api/submissions` - Create submission
- `GET /api/submissions` - List submissions (auth required)
- `GET /api/analytics` - Get analytics (auth required)

## Admin Dashboard

### Access
1. Navigate to `/login`
2. Use credentials from `.env`:
   - Email: `ADMIN_EMAIL`
   - Password: `ADMIN_PASSWORD`

### Features
- **Analytics**: Total visitors, submissions, conversion rate
- **Countries**: Top visitor and submission countries
- **Submissions**: Searchable and filterable table
- **Export**: Download data as CSV

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="random-secret-key"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure-password"
```

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Docker Production

```bash
# Build optimized image
docker build -t ai-teacher-training:prod .

# Run in production mode
docker-compose up -d
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check `DATABASE_URL` is correct
- Run `npx prisma migrate reset` to reset database

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Clear browser cookies
- Check admin user exists: `npx prisma studio`

### Docker Issues
- Run `docker-compose down -v` to remove volumes
- Rebuild: `docker-compose build --no-cache`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx tsx scripts/seed.ts` - Seed admin user
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create migration

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
