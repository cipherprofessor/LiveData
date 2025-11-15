# CLAUDE.md - AI Assistant Guide for LiveData

> **Last Updated:** 2025-11-15
> **Project:** LiveData - Secure Encrypted File Storage Platform
> **Version:** 1.0.0-MVP

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Codebase Structure](#codebase-structure)
3. [Technology Stack](#technology-stack)
4. [Development Workflows](#development-workflows)
5. [Code Conventions](#code-conventions)
6. [Architecture Patterns](#architecture-patterns)
7. [Database Schema](#database-schema)
8. [API Patterns](#api-patterns)
9. [Security Guidelines](#security-guidelines)
10. [Common Tasks](#common-tasks)
11. [Testing Guidelines](#testing-guidelines)
12. [Deployment](#deployment)

---

## Project Overview

LiveData is a production-ready, full-stack encrypted file storage solution with the following core features:

- **Authentication:** JWT-based auth with bcrypt password hashing
- **File Management:** Upload, download, preview, rename, search, delete
- **Password Protection:** Individual file-level password protection
- **Secure Sharing:** Shareable links with expiration and download limits
- **File Conversion:** Support for various format conversions
- **Storage:** Local filesystem or S3-compatible cloud storage
- **Security:** AES-256 encryption, rate limiting, audit logging

### Project Structure

```
LiveData/
├── backend/              # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── index.ts     # Server entry point
│   │   ├── server/      # Express app, routes, middleware
│   │   ├── config/      # Environment & storage config
│   │   ├── db/          # Prisma client singleton
│   │   ├── schemas/     # Zod validation schemas
│   │   ├── storage/     # Storage abstraction (local/S3)
│   │   ├── security/    # HMAC signing utilities
│   │   ├── audit/       # Audit logging
│   │   └── conversion/  # File conversion providers
│   ├── prisma/          # Database schema & migrations
│   └── package.json
│
├── frontend/            # React + Vite + TypeScript SPA
│   ├── src/
│   │   ├── main.tsx    # React entry point
│   │   ├── App.tsx     # Main application component
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable UI components
│   │   ├── services/   # API service layer
│   │   ├── contexts/   # React contexts
│   │   ├── lib/        # Utility functions
│   │   └── types/      # TypeScript type definitions
│   └── package.json
│
├── docker-compose.yml   # PostgreSQL + Redis services
└── .github/workflows/   # CI/CD pipelines
```

---

## Codebase Structure

### Backend Architecture (`/backend`)

#### Core Files

| Path | Purpose | Lines | Key Responsibilities |
|------|---------|-------|---------------------|
| `src/index.ts` | Server entry point | 16 | Creates HTTP server, starts Express app |
| `src/server/app.ts` | Express configuration | 37 | Middleware pipeline, CORS, routes, error handler |
| `src/config/env.ts` | Environment parsing | 37 | Validates and exports env variables |
| `prisma/schema.prisma` | Database schema | 109 | Defines Users, Files, Shares, Conversions, AuditLogs |

#### Directory Structure

```
backend/src/
├── index.ts                    # Entry point
├── server/
│   ├── app.ts                  # Express app setup
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication (21 lines)
│   │   └── validate.ts        # Zod validation middleware
│   └── routes/
│       ├── health.ts          # Health check endpoint
│       └── v1/
│           ├── index.ts       # Route aggregator
│           └── modules/
│               ├── auth.ts    # Register, login (86 lines)
│               ├── files.ts   # File CRUD, search, tags (202 lines)
│               ├── shares.ts  # File sharing (97 lines)
│               └── conversions.ts # Format conversion (63 lines)
│
├── schemas/                    # Zod validation schemas
│   ├── auth.ts
│   ├── files.ts
│   ├── shares.ts
│   └── conversions.ts
│
├── config/
│   ├── env.ts                 # Environment config
│   └── storage.ts             # Storage directory setup
│
├── db/
│   └── prisma.ts              # Prisma singleton
│
├── storage/
│   ├── index.ts               # Storage abstraction (63 lines)
│   └── thumbnails.ts          # Image thumbnail generation
│
├── security/
│   └── signing.ts             # HMAC-SHA256 signed URLs (29 lines)
│
├── audit/
│   └── logger.ts              # Audit event logging (29 lines)
│
└── conversion/
    └── provider.ts            # Conversion provider abstraction (78 lines)
```

### Frontend Architecture (`/frontend`)

```
frontend/src/
├── main.tsx                   # React entry point
├── App.tsx                    # Main app component
├── pages/
│   ├── AuthPage/             # Login/Register
│   └── DashboardPage/        # File management UI
│
├── components/
│   └── ui/                   # Reusable UI components
│       ├── Button/
│       ├── Card/
│       ├── Input/
│       ├── ThemeToggle/
│       └── Toast/
│
├── services/
│   └── api.service.ts        # API client with axios
│
├── contexts/                  # React contexts (theme, etc.)
├── lib/
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript types
└── styles/                    # Global styles
```

---

## Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20+ | JavaScript runtime |
| TypeScript | 5.4+ | Type-safe development |
| Express.js | 4.19+ | Web framework |
| PostgreSQL | 16+ | Primary database |
| Prisma | 6.19+ | Type-safe ORM |
| Redis | 7+ | Session & cache |
| JWT | jsonwebtoken 9.0+ | Authentication |
| Bcrypt | 5.1+ | Password hashing |
| Sharp | 0.33+ | Image processing |
| Multer | 1.4+ | File upload handling |
| Zod | 3.23+ | Schema validation |
| AWS SDK | 3.668+ | S3 storage |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3+ | UI framework |
| TypeScript | 5.4+ | Type-safe development |
| Vite | 5.4+ | Build tool & dev server |
| Axios | 1.7+ | HTTP client |
| SCSS | 1.94+ | Styling |
| Lucide React | 0.553+ | Icons |

### Infrastructure

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline

---

## Development Workflows

### Local Development Setup

#### 1. Prerequisites

```bash
# Required:
- Node.js 20+
- npm 10+
- PostgreSQL 16+ (or Docker)
- Redis 7+ (or Docker)
```

#### 2. Environment Setup

```bash
# Start infrastructure services
docker-compose up -d

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run prisma:generate
npm run prisma:migrate

# Frontend setup
cd ../frontend
npm install
```

#### 3. Running Development Servers

```bash
# Terminal 1 - Backend (port 4000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 5173)
cd frontend
npm run dev
```

### Build Process

#### Backend Build

```bash
cd backend
npm run build          # Compiles TypeScript to dist/
npm start             # Runs compiled JavaScript
```

#### Frontend Build

```bash
cd frontend
npm run build         # Builds to dist/
npm run preview       # Preview production build
```

### Database Workflows

```bash
# Generate Prisma client after schema changes
npm run prisma:generate

# Create a new migration
npm run prisma:migrate -- --name migration_name

# Apply migrations to production
npm run prisma:migrate:deploy

# Reset database (development only - DESTRUCTIVE)
npm run prisma:migrate:reset

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

### Git Workflow

- **Main Branch:** `main` - Production-ready code
- **Feature Branches:** `claude/feature-name-sessionid` for AI assistant work
- **CI/CD:** GitHub Actions runs on push to main and PRs

#### Commit Message Format

```
<type>: <description>

Types: feat, fix, docs, refactor, test, chore
Examples:
- feat: add file sharing with expiration
- fix: correct authentication token validation
- docs: update API documentation
```

---

## Code Conventions

### TypeScript Standards

#### Backend Conventions

```typescript
// 1. Use strict TypeScript
// tsconfig.json has strict: true

// 2. Prefer interfaces for objects, types for unions
interface User {
  userId: string;
  email: string;
}

type Status = 'pending' | 'completed' | 'failed';

// 3. Use async/await over promises
async function uploadFile(file: File) {
  const result = await storage.upload(file);
  return result;
}

// 4. Error handling with try/catch
try {
  const user = await db.user.findUnique({ where: { userId } });
  if (!user) throw { status: 404, message: 'user_not_found' };
} catch (error) {
  next(error);
}

// 5. Use Zod for validation
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// 6. Export named exports, not default (except for app.ts, main components)
export function authenticate(req, res, next) { /* ... */ }
```

#### Frontend Conventions

```typescript
// 1. React functional components with TypeScript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  return <button className={`btn-${variant}`} onClick={onClick}>{children}</button>;
};

// 2. Use SCSS modules for styling
import styles from './Button.module.scss';

// 3. API calls in services layer
// services/api.service.ts
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/files/upload', formData);
};
```

### File Naming

- **Backend:** `camelCase.ts` for utilities, `PascalCase.ts` for classes
- **Frontend:** `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **SCSS:** `Component.module.scss` for component styles

### Code Organization

1. **Keep route handlers thin** - Delegate business logic to services
2. **Validation first** - Use Zod schemas at route entry points
3. **Error handling** - Use centralized error handler in Express
4. **No secrets in code** - All secrets in environment variables
5. **Type safety** - Leverage TypeScript, avoid `any` except error handlers

---

## Architecture Patterns

### Backend Patterns

#### 1. Layered Architecture

```
Routes (HTTP) → Middleware (Auth/Validation) → Business Logic → Database (Prisma)
                                              ↓
                                         External Services (S3, Redis)
```

#### 2. Middleware Pipeline

```typescript
// server/app.ts
app.use(helmet());        // Security headers
app.use(cors());          // CORS policy
app.use(express.json());  // JSON parsing
app.use(morgan('dev'));   // Request logging
app.use(limiter);         // Rate limiting
app.use('/api/v1', apiV1Router); // Routes
app.use(errorHandler);    // Error handler
```

#### 3. Authentication Pattern

```typescript
// All protected routes use authenticate middleware
router.get('/files', authenticate, async (req: AuthenticatedRequest, res) => {
  const { userId } = req.user!; // Set by authenticate middleware
  const files = await prisma.file.findMany({ where: { userId } });
  res.json({ files });
});
```

#### 4. Validation Pattern

```typescript
// Use Zod schemas with validate middleware
import { validate } from '../middleware/validate';
import { uploadFileSchema } from '../schemas/files';

router.post('/files/upload', authenticate, validate(uploadFileSchema), handler);
```

#### 5. Storage Abstraction

```typescript
// storage/index.ts provides unified interface
// Supports local filesystem and S3-compatible storage
const storage = env.storageProvider === 's3' ? new S3Storage() : new LocalStorage();
await storage.upload(key, buffer);
const url = await storage.getSignedUrl(key);
```

### Frontend Patterns

#### 1. Component Structure

```
components/
  ui/
    ComponentName/
      ComponentName.tsx
      ComponentName.module.scss
      index.ts  (re-exports)
```

#### 2. API Service Layer

```typescript
// services/api.service.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

// Inject JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

#### 3. State Management

- **Local state:** `useState` for component-specific state
- **Context:** Theme, Toast notifications
- **No external state library** (Redux, Zustand) - intentionally kept simple

---

## Database Schema

### Core Models

#### User

```prisma
model User {
  userId        String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  firstName     String?
  lastName      String?
  storageQuota  BigInt   @default(5368709120) // 5GB
  storageUsed   BigInt   @default(0)
  createdAt     DateTime @default(now())

  files         File[]
  shares        Share[]
  conversions   Conversion[]
  auditLogs     AuditLog[]
}
```

#### File

```prisma
model File {
  fileId              String   @id @default(uuid())
  userId              String
  fileName            String
  fileSize            BigInt
  mimeType            String
  storagePath         String
  isPasswordProtected Boolean  @default(false)
  passwordHash        String?
  tags                String[] @default([])
  thumbnailKey        String?
  isDeleted           Boolean  @default(false)
  deletedAt           DateTime?

  user        User     @relation(fields: [userId], references: [userId])
  shares      Share[]
  conversions Conversion[]
}
```

#### Share

```prisma
model Share {
  shareId      String   @id @default(uuid())
  userId       String
  fileId       String
  passwordHash String?
  expiresAt    DateTime?
  maxDownloads Int?
  downloads    Int      @default(0)
  revoked      Boolean  @default(false)

  user User @relation(fields: [userId], references: [userId])
  file File @relation(fields: [fileId], references: [fileId])
}
```

### Database Operations

```typescript
// Always use Prisma for database access
import { prisma } from '../db/prisma';

// Find unique
const user = await prisma.user.findUnique({ where: { email } });

// Find many with conditions
const files = await prisma.file.findMany({
  where: { userId, isDeleted: false },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: 0,
});

// Create
const file = await prisma.file.create({
  data: { userId, fileName, fileSize, mimeType, storagePath },
});

// Update
await prisma.file.update({
  where: { fileId },
  data: { fileName: newName },
});

// Soft delete
await prisma.file.update({
  where: { fileId },
  data: { isDeleted: true, deletedAt: new Date() },
});
```

---

## API Patterns

### REST API Structure

**Base URL:** `http://localhost:4000/api/v1`

### Authentication Endpoints

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### File Management Endpoints

```
POST   /api/v1/files/upload          # Upload file (multipart/form-data)
GET    /api/v1/files                 # List files (paginated)
GET    /api/v1/files/:fileId         # Get file metadata
GET    /api/v1/files/:fileId/download      # Download file
GET    /api/v1/files/:fileId/preview       # Preview inline
GET    /api/v1/files/:fileId/thumbnail     # Get thumbnail
PUT    /api/v1/files/:fileId         # Rename file
DELETE /api/v1/files/:fileId         # Soft delete file
GET    /api/v1/files/search          # Search files
POST   /api/v1/files/:fileId/password      # Set password
DELETE /api/v1/files/:fileId/password      # Remove password
PUT    /api/v1/files/:fileId/tags          # Update tags
```

### Share Endpoints

```
POST   /api/v1/shares                # Create share link
GET    /api/v1/shares/:shareId       # Get share details
DELETE /api/v1/shares/:shareId       # Revoke share
POST   /api/v1/shares/:shareId/signed-url  # Generate signed URL
GET    /api/v1/shares/:shareId/download    # Download shared file
```

### Request/Response Patterns

#### Authentication Required

```typescript
// Headers
Authorization: Bearer <jwt-token>

// Response on auth failure
{ "message": "unauthorized" }
```

#### Standard Error Response

```typescript
{
  "message": "error_code_or_message"
}
```

#### Pagination Pattern

```typescript
// Query params
?skip=0&take=20

// Response
{
  "files": [...],
  "total": 100,
  "skip": 0,
  "take": 20
}
```

#### File Upload

```typescript
// Request
Content-Type: multipart/form-data
file: <binary>

// Response
{
  "fileId": "uuid",
  "fileName": "example.pdf",
  "fileSize": 1024,
  "mimeType": "application/pdf"
}
```

---

## Security Guidelines

### Security Layers

1. **Authentication & Authorization**
   - JWT tokens (1-hour expiration)
   - Bcrypt password hashing (12 rounds)
   - User ownership validation on all operations

2. **Input Validation**
   - Zod schema validation on all inputs
   - File type validation
   - File size limits (200MB max)

3. **Rate Limiting**
   - 300 requests per 15 minutes per IP
   - Applied globally via express-rate-limit

4. **Security Headers**
   - Helmet middleware for CSP, X-Frame-Options, etc.

5. **File-Level Security**
   - Optional password protection (bcrypt)
   - Shared link expiration
   - Download limits on shares

6. **Audit Logging**
   - All actions logged to AuditLog table
   - Includes IP address, user agent, timestamps

### Security Best Practices for AI Assistants

#### ✅ DO:

1. **Always validate user input** with Zod schemas
2. **Use parameterized queries** (Prisma handles this)
3. **Hash passwords** with bcrypt before storage
4. **Verify JWT tokens** on protected routes
5. **Check ownership** before allowing operations
6. **Use HTTPS** in production
7. **Sanitize file uploads** - check MIME types
8. **Implement rate limiting** on sensitive endpoints
9. **Use environment variables** for secrets
10. **Log security events** to audit trail

#### ❌ DON'T:

1. **Never log sensitive data** (passwords, tokens, file contents)
2. **Never hardcode secrets** in code
3. **Never trust client input** without validation
4. **Never expose internal errors** to clients
5. **Don't use string interpolation** for SQL (use Prisma)
6. **Don't store passwords in plaintext**
7. **Don't skip authentication** on protected routes
8. **Don't allow arbitrary file execution**
9. **Don't expose stack traces** in production
10. **Don't use weak cryptographic algorithms**

### Common Security Patterns

```typescript
// 1. Password hashing
import bcrypt from 'bcrypt';
const passwordHash = await bcrypt.hash(password, 12);
const isValid = await bcrypt.compare(password, passwordHash);

// 2. JWT signing
import jwt from 'jsonwebtoken';
const token = jwt.sign({ sub: userId, email }, env.jwtSecret, { expiresIn: '1h' });

// 3. Ownership validation
const file = await prisma.file.findUnique({ where: { fileId } });
if (file.userId !== req.user.userId) {
  throw { status: 403, message: 'forbidden' };
}

// 4. HMAC signed URLs
import { signUrl, verifyUrl } from '../security/signing';
const signedUrl = signUrl(shareId, 3600); // 1 hour
const isValid = verifyUrl(signedUrl);
```

---

## Common Tasks

### Adding a New API Endpoint

1. **Define Zod schema** in `backend/src/schemas/`
2. **Create route handler** in `backend/src/server/routes/v1/modules/`
3. **Add route** to `backend/src/server/routes/v1/index.ts`
4. **Test with curl** or Postman
5. **Update frontend** service in `frontend/src/services/api.service.ts`
6. **Integrate in UI** in relevant page component

#### Example: Adding a "Mark File as Favorite" Feature

```typescript
// 1. Update Prisma schema
model File {
  // ... existing fields
  isFavorite Boolean @default(false) @map("is_favorite")
}

// 2. Create migration
// npm run prisma:migrate -- --name add_favorite_field

// 3. Create Zod schema (backend/src/schemas/files.ts)
export const toggleFavoriteSchema = z.object({
  fileId: z.string().uuid(),
});

// 4. Add route handler (backend/src/server/routes/v1/modules/files.ts)
router.post('/files/:fileId/favorite', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { fileId } = req.params;
    const { userId } = req.user!;

    const file = await prisma.file.findUnique({ where: { fileId } });
    if (!file || file.userId !== userId) {
      throw { status: 404, message: 'file_not_found' };
    }

    const updated = await prisma.file.update({
      where: { fileId },
      data: { isFavorite: !file.isFavorite },
    });

    res.json({ isFavorite: updated.isFavorite });
  } catch (error) {
    next(error);
  }
});

// 5. Add to frontend API service
export const toggleFavorite = async (fileId: string) => {
  return api.post(`/files/${fileId}/favorite`);
};
```

### Adding a New Frontend Component

1. **Create component directory** in `frontend/src/components/ui/`
2. **Create files:** `ComponentName.tsx`, `ComponentName.module.scss`, `index.ts`
3. **Implement component** with TypeScript interfaces
4. **Export** from `index.ts`
5. **Use** in pages or other components

### Modifying Database Schema

```bash
# 1. Edit prisma/schema.prisma
# 2. Generate migration
cd backend
npm run prisma:migrate -- --name your_migration_name

# 3. Migration files created in prisma/migrations/
# 4. Prisma client auto-regenerated
```

### Adding Environment Variables

```bash
# 1. Add to backend/.env.example with documentation
NEW_FEATURE_API_KEY=your-api-key-here

# 2. Add to backend/src/config/env.ts
export const env = {
  // ... existing
  newFeatureApiKey: process.env.NEW_FEATURE_API_KEY || '',
};

# 3. Add to your .env file
# 4. Use in code
import { env } from '../config/env';
console.log(env.newFeatureApiKey);
```

---

## Testing Guidelines

### Current State

- **Backend:** No test suite currently implemented
- **Frontend:** No test suite currently implemented
- **CI/CD:** GitHub Actions runs build checks only

### Testing Roadmap

#### Backend Testing (Planned)

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

#### Test Structure (Recommended)

```
backend/
  src/
    __tests__/
      unit/
        services/
        utils/
      integration/
        routes/
          auth.test.ts
          files.test.ts
      e2e/
        user-flows.test.ts
```

#### Testing Libraries (Recommended)

- **Jest** - Test runner
- **Supertest** - HTTP assertions
- **@faker-js/faker** - Test data generation
- **@testcontainers** - Database testing

---

## Deployment

### Environment Setup

#### Production Environment Variables

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://user:pass@prod-host:5432/livedata
REDIS_URL=redis://prod-redis:6379
JWT_SECRET=<strong-random-secret>
SIGNING_SECRET=<strong-random-secret>
STORAGE_PROVIDER=s3
S3_BUCKET=prod-livedata-files
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=<aws-access-key>
S3_SECRET_ACCESS_KEY=<aws-secret-key>
CORS_ORIGIN=https://yourdomain.com
```

### Docker Deployment

```bash
# Build backend image
docker build -t livedata-backend ./backend

# Run with docker-compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT and signing secrets
- [ ] Configure HTTPS/TLS
- [ ] Set proper CORS policy
- [ ] Use S3 or cloud storage (not local filesystem)
- [ ] Configure database backups
- [ ] Set up monitoring (e.g., Sentry, DataDog)
- [ ] Configure rate limiting for production traffic
- [ ] Enable MFA for admin accounts
- [ ] Set up CDN for static assets
- [ ] Configure proper logging
- [ ] Set up database connection pooling

---

## AI Assistant Guidelines

### When Working on This Project

#### Understanding the Codebase

1. **Start with README.md** for project overview
2. **Read this CLAUDE.md** for detailed architecture
3. **Check `backend/src/server/routes/v1/modules/`** for API endpoint implementations
4. **Review `prisma/schema.prisma`** for data model
5. **Check `.env.example`** for configuration options

#### Making Changes

1. **Always read existing code** before modifying
2. **Follow existing patterns** (validation, error handling, naming)
3. **Maintain type safety** - avoid `any` types
4. **Validate inputs** with Zod schemas
5. **Add audit logging** for security-relevant operations
6. **Update this CLAUDE.md** if making architectural changes

#### Common Pitfalls to Avoid

1. **Don't skip authentication** middleware on protected routes
2. **Don't forget ownership validation** when accessing resources
3. **Don't use `any` type** without good reason
4. **Don't hardcode values** that should be environment variables
5. **Don't expose sensitive data** in error messages or logs
6. **Don't forget to update Prisma client** after schema changes (`npx prisma generate`)
7. **Don't create new patterns** when existing ones work
8. **Don't skip input validation** - always use Zod schemas

#### Best Practices

1. **Read before writing** - understand existing code first
2. **Small, focused changes** - avoid large refactors
3. **Test locally** - run both backend and frontend
4. **Check the database** - use Prisma Studio to verify changes
5. **Follow TypeScript strictly** - leverage type system
6. **Document complex logic** - add comments where needed
7. **Use meaningful names** - clear variable and function names
8. **Handle errors gracefully** - use try/catch and error handler

#### File References

When discussing code, reference files with line numbers:

```
backend/src/server/routes/v1/modules/files.ts:45
frontend/src/services/api.service.ts:78
```

#### Useful Commands

```bash
# Backend
cd backend
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run prisma:studio          # Open database GUI
npm run prisma:migrate         # Run migrations

# Frontend
cd frontend
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview production build

# Database
docker-compose up -d           # Start PostgreSQL & Redis
docker-compose down            # Stop services
docker-compose logs -f         # View logs
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-15 | Initial CLAUDE.md creation |

---

## Additional Resources

- **GitHub Repository:** https://github.com/cipherprofessor/LiveData
- **README:** `/README.md` - User-facing documentation
- **Prisma Docs:** https://www.prisma.io/docs
- **Express Docs:** https://expressjs.com
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev

---

**For questions or clarifications, refer to the codebase or ask the development team.**
