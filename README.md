# AI Teacher Training Platform 🎓

A comprehensive Next.js application for AI teacher training with an integrated analytics dashboard and admin panel.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748)](https://www.prisma.io/)

## ✨ Features

### Landing Page
- 🎨 Modern, responsive design with dark gradient theme
- 🌐 Arabic RTL support with Cairo font
- 📱 Fully mobile-optimized
- ✉️ Interactive contact form
- 🎭 Smooth animations with Framer Motion
- 🔄 Session-based visitor tracking

### Admin Dashboard
- 📊 **Rich Analytics**
  - Total visitors and submissions (all-time + period-based)
  - Conversion rate tracking
  - Device breakdown (Mobile/Desktop/Tablet)
  - Geographic insights (top countries)
  - Daily trends visualization
  - Recent activity monitoring
- 🔐 Secure authentication with NextAuth
- 📋 Submissions management with search and filters
- 📥 CSV export functionality
- 🎯 Period selector (7/30/90 days)

### Technical Features
- ⚡ Built with Next.js 15 App Router
- 🗄️ PostgreSQL database with Prisma ORM
- 🔄 Automatic database migrations
- 🐳 Docker containerization
- 🔒 SSL/HTTPS via Traefik or Nginx
- 📈 Real-time analytics tracking
- 🎨 Tailwind CSS for styling
- 🔐 Secure admin authentication

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Docker)
- Git

### Local Development

```bash
# 1. Clone the repository
git clone <repository-url>
cd ai-teacher-training-nextjs

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# 4. Set up database
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# 5. Start development server
npm run dev

# 6. Open http://localhost:3000
```

### Production Deployment

#### Option 1: With Traefik (Recommended for multi-app servers)

```bash
# Deploy with Traefik reverse proxy
sudo ./deploy-traefik.sh
```

#### Option 2: Standalone with Nginx

```bash
# Deploy with built-in Nginx and SSL
sudo ./deploy.sh
```

See [QUICK_START.md](QUICK_START.md) for detailed deployment instructions.

---

## 📁 Project Structure

```
ai-teacher-training-nextjs/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── api/                 # API routes
│   │   ├── analytics/       # Analytics endpoint
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── submissions/     # Form submissions API
│   │   └── visitors/        # Visitor tracking API
│   ├── dashboard/           # Admin dashboard
│   ├── globals.css          # Global styles
│   └── page.tsx             # Landing page
├── components/
│   ├── landing/             # Landing page components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── auth.ts              # Authentication configuration
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Utility functions
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── scripts/
│   └── seed.ts              # Database seeding script
├── docs/                    # Additional documentation
├── deploy-traefik.sh        # Traefik deployment script
├── deploy.sh                # Nginx deployment script
├── setup.sh                 # Local setup script
├── update.sh                # Production update script
└── README.md                # This file
```

---

## 🗄️ Database Schema

The application uses PostgreSQL with the following models:

- **User**: Admin users for dashboard access
- **Visitor**: Tracks landing page visitors (session-based)
- **Submission**: Stores contact form submissions

See `prisma/schema.prisma` for the complete schema.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file (or `.env.production` for deployment):

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"
AUTH_TRUST_HOST="true"

# Admin Credentials (for seeding)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure-password"
```

### Deployment Configuration

Edit `deploy-traefik.sh` or `deploy.sh` to customize:
- Domain name
- Internal ports
- SSL settings
- Database credentials

---

## 📊 Analytics & Tracking

### Visitor Tracking
- **Session-based**: Counts unique browser sessions
- Uses `sessionStorage` to prevent duplicate counts
- Captures: IP, location, device, browser info

### Analytics Dashboard
View comprehensive metrics:
- Total visitors (all-time + period)
- Form submissions
- Conversion rates
- Device breakdown
- Geographic distribution
- Daily trends
- Recent activity

### Database Management

Clear analytics data when needed:

```bash
# See all commands
cat docs/CLEAR_DATABASE.md

# Quick clear (on server)
docker exec ai-teacher-postgres psql -U aiuser -d ai_teacher_training \
  -c "DELETE FROM \"Visitor\"; DELETE FROM \"Submission\";"
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Linting
npm run lint             # Run ESLint
```

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

---

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# Stop services
docker-compose -f docker-compose.prod.yml down

# Rebuild after code changes
docker-compose -f docker-compose.prod.yml up -d --build app
```

---

## 🔐 Security

- ✅ Password hashing with bcryptjs
- ✅ Secure session management with NextAuth
- ✅ Environment variable protection
- ✅ SQL injection prevention via Prisma
- ✅ HTTPS/SSL enforcement
- ✅ Non-root Docker containers

---

## 🌐 Localization

The landing page supports:
- **Arabic (RTL)**: Primary language
- **English**: Secondary elements
- Custom Cairo font for Arabic text
- Inter font for English text

---

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Fast deployment instructions
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Common issues and solutions
- [Visitor Tracking](docs/VISITOR_TRACKING.md) - Session-based tracking details
- [Database Management](docs/CLEAR_DATABASE.md) - Database cleanup commands

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Common Issues

**Port Conflicts**
```bash
# Use custom port
export APP_PORT=3011
sudo ./deploy-traefik.sh
```

**Database Connection Errors**
```bash
# Check container is running
docker ps | grep postgres

# View logs
docker logs ai-teacher-postgres
```

**Build Errors**
```bash
# Clear cache and rebuild
docker-compose -f docker-compose.prod.yml build --no-cache
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more solutions.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Hamed Elfayome**  
🌐 [hamedelfayome.dev](https://hamedelfayome.dev)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn/ui for beautiful components
- Vercel for deployment platform
- All contributors and users

---

## 📞 Support

For support, email support@edulixa360.com or open an issue in the repository.

---

**Made with ❤️ for educators worldwide**
