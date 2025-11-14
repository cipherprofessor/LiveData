# LiveData Backend

Express.js + TypeScript + Prisma + PostgreSQL backend for LiveData encrypted file storage platform.

## Quick Start

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL 16.x (or use Docker)
- Redis 7.x (or use Docker)

### Option 1: Automated Setup (Recommended)

Run the automated setup script:

```bash
# Make sure you're in the backend directory
cd backend

# Run the setup script
./scripts/setup.sh
```

This will:
1. ✅ Check/create `.env` file
2. ✅ Install dependencies
3. ✅ Generate Prisma Client
4. ✅ Test database connection
5. ✅ Run migrations to create all tables
6. ✅ Set up storage directory

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and set your DATABASE_URL

# 3. Start database (if using Docker)
docker-compose up -d

# 4. Generate Prisma Client
npm run prisma:generate

# 5. Run migrations
npm run prisma:migrate

# 6. Test connection
npm run db:test
```

### Start Development Server

```bash
npm run dev
```

Server runs at: `http://localhost:4000`

Test with:
```bash
curl http://localhost:4000/health
```

---

## Environment Configuration

### Required Variables

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/live_data

# Redis
REDIS_URL=redis://localhost:6379

# Security (change in production!)
JWT_SECRET=your-secret-key
SIGNING_SECRET=your-signing-secret
```

For a complete list of environment variables, see [`.env.example`](.env.example).

---

## Available Scripts

### Development

```bash
npm run dev              # Start development server with hot reload
npm run build            # Build for production
npm start                # Start production server
```

### Database Management

```bash
npm run db:setup         # Generate Prisma client + run migrations
npm run db:test          # Test database connection
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Create and run new migration
npm run prisma:studio    # Open Prisma Studio (database GUI)
npm run db:reset         # Reset database (WARNING: deletes all data)
```

### Prisma Commands

```bash
npm run prisma:generate         # Generate Prisma Client
npm run prisma:migrate          # Run migrations (development)
npm run prisma:migrate:deploy   # Run migrations (production)
npm run prisma:migrate:reset    # Reset database
npm run prisma:studio           # Open Prisma Studio
npm run prisma:format           # Format schema file
```

---

## Database Setup

### Using Docker Compose (Recommended)

```bash
# Start PostgreSQL + Redis
docker-compose up -d

# Check services are running
docker-compose ps

# View logs
docker-compose logs -f postgres
```

### Manual Installation

See [`SETUP_DATABASE.md`](../SETUP_DATABASE.md) for detailed instructions.

---

## Project Structure

```
backend/
├── src/
│   ├── index.ts                    # Server entry point
│   ├── server/
│   │   ├── app.ts                  # Express app configuration
│   │   ├── middleware/
│   │   │   ├── auth.ts            # JWT authentication
│   │   │   └── validate.ts        # Zod validation
│   │   └── routes/
│   │       └── v1/
│   │           ├── index.ts       # Route aggregator
│   │           └── modules/
│   │               ├── auth.ts    # Auth endpoints
│   │               ├── files.ts   # File management
│   │               ├── shares.ts  # File sharing
│   │               └── conversions.ts # Format conversion
│   ├── schemas/                    # Zod validation schemas
│   ├── config/                     # Configuration
│   ├── db/                         # Database (Prisma)
│   ├── storage/                    # File storage abstraction
│   ├── security/                   # Security utilities
│   ├── audit/                      # Audit logging
│   └── conversion/                 # File conversion providers
│
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration history
│
├── scripts/
│   ├── setup.sh                   # Automated setup script
│   └── test-db-connection.js      # Database connection test
│
├── .env                           # Environment variables (gitignored)
├── .env.example                   # Environment template
├── package.json
├── tsconfig.json
└── Dockerfile
```

---

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

### Files

- `POST /api/v1/files/upload` - Upload file
- `GET /api/v1/files` - List files
- `GET /api/v1/files/:fileId` - Get file metadata
- `GET /api/v1/files/:fileId/download` - Download file
- `GET /api/v1/files/:fileId/preview` - Preview file
- `GET /api/v1/files/:fileId/thumbnail` - Get thumbnail
- `PUT /api/v1/files/:fileId` - Rename file
- `DELETE /api/v1/files/:fileId` - Delete file
- `GET /api/v1/files/search` - Search files

### File Passwords

- `POST /api/v1/files/:fileId/password` - Set password
- `DELETE /api/v1/files/:fileId/password` - Remove password

### File Tags

- `PUT /api/v1/files/:fileId/tags` - Update tags

### Shares

- `POST /api/v1/shares` - Create share link
- `GET /api/v1/shares/:shareId` - Get share details
- `DELETE /api/v1/shares/:shareId` - Revoke share
- `POST /api/v1/shares/:shareId/signed-url` - Generate signed URL
- `GET /api/v1/shares/:shareId/download` - Download shared file

### Conversions

- `GET /api/v1/conversions/formats` - List supported formats
- `POST /api/v1/conversions` - Request conversion
- `GET /api/v1/conversions/:id` - Get conversion status
- `GET /api/v1/conversions/:id/download` - Download converted file

For detailed API documentation, see [API Documentation](../README.md#api-documentation).

---

## Database Schema

### Models

- **User** - User accounts with authentication
- **File** - File metadata and storage references
- **Share** - Shareable file links with expiration
- **Conversion** - File format conversion jobs
- **AuditLog** - Comprehensive audit trail

### Relationships

```
User (1) ─── (*) File
User (1) ─── (*) Share
User (1) ─── (*) Conversion
User (1) ─── (*) AuditLog
File (1) ─── (*) Share
File (1) ─── (*) Conversion
```

---

## Testing Database Connection

Use the built-in test script:

```bash
npm run db:test
```

Or manually:

```bash
node scripts/test-db-connection.js
```

This will verify:
- ✅ Database connectivity
- ✅ PostgreSQL version
- ✅ Tables exist
- ✅ All models are accessible

---

## Troubleshooting

### "Can't reach database server"

**Solution:**
```bash
# Check if PostgreSQL is running
docker-compose ps

# Or restart services
docker-compose restart postgres

# Check connection manually
psql $DATABASE_URL
```

### "Prisma Client not generated"

**Solution:**
```bash
npm run prisma:generate
```

### "Migration failed"

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npm run db:reset

# Then run migrations again
npm run prisma:migrate
```

### Port 4000 already in use

**Solution:**
```bash
# Change PORT in .env
PORT=4001

# Or kill the process using port 4000
lsof -ti:4000 | xargs kill -9
```

---

## Development Tips

### View Database

Open Prisma Studio to view/edit data:

```bash
npm run prisma:studio
```

Opens at: `http://localhost:5555`

### Create New Migration

```bash
npm run prisma:migrate -- --name your_migration_name
```

### Reset Database

```bash
# Interactive (asks for confirmation)
npm run prisma:migrate:reset

# Force reset (no confirmation)
npm run db:reset
```

### Enable SQL Query Logging

Add to `.env`:
```env
PRISMA_LOG_QUERIES=true
```

---

## Docker

### Build Image

```bash
docker build -t livedata-backend .
```

### Run Container

```bash
docker run -p 4000:4000 \
  -e DATABASE_URL=$DATABASE_URL \
  -e JWT_SECRET=$JWT_SECRET \
  livedata-backend
```

---

## Production Deployment

### Environment Variables

For production, set:

```env
NODE_ENV=production
DATABASE_URL=postgresql://...  # Production database
JWT_SECRET=...                 # Strong random secret (use: openssl rand -base64 64)
SIGNING_SECRET=...             # Strong random secret
STORAGE_PROVIDER=s3            # Use S3 for production
S3_BUCKET=your-production-bucket
```

### Run Migrations

```bash
npm run prisma:migrate:deploy
```

### Build and Start

```bash
npm run build
npm start
```

---

## Need Help?

- See [`SETUP_DATABASE.md`](../SETUP_DATABASE.md) for detailed database setup
- See [Main README](../README.md) for overall project documentation
- Check [Prisma Docs](https://www.prisma.io/docs) for Prisma-specific issues
- Open an issue on GitHub

---

**Version:** 1.0.0-MVP
**Last Updated:** 2025-01-14
