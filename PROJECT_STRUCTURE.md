# LiveData - Project Structure

**Last Updated:** 2025-01-14

This document provides a comprehensive overview of the LiveData project's file and folder organization.

---

## 📁 Root Directory Structure

```
LiveData/
├── .github/                    # GitHub configuration
├── backend/                    # Node.js + Express API server
├── frontend/                   # React + Vite web application
├── .dockerignore              # Docker ignore rules
├── .gitignore                 # Git ignore rules
├── docker-compose.yml         # PostgreSQL + Redis services
├── README.md                  # Main project documentation
├── TASKS.md                   # Comprehensive task tracker
├── PROJECT_STRUCTURE.md       # This file - project organization
├── SETUP_DATABASE.md          # Database setup guide
├── APP_PLAN.md                # Complete MVP feature specification
├── ARCHITECTURE_OVERVIEW.md   # System architecture documentation
├── EXECUTIVE_SUMMARY.md       # Project vision and value proposition
└── FEATURE_RECOMMENDATIONS.md # Future phase recommendations
```

---

## 🗂️ Directory Breakdown

### `.github/` - GitHub Configuration

```
.github/
└── workflows/
    └── ci.yml                 # GitHub Actions CI/CD pipeline
                               # - Runs on push to main and PRs
                               # - Builds backend TypeScript
                               # - Verifies Prisma client generation
```

**Purpose:** Automated testing and deployment workflows

---

### `backend/` - Backend API Server

```
backend/
├── src/                       # Source code (TypeScript)
│   ├── index.ts              # Server entry point (16 lines)
│   │
│   ├── server/               # Express application
│   │   ├── app.ts           # Express app configuration (37 lines)
│   │   │                    # - Middleware setup
│   │   │                    # - CORS, Helmet, Morgan
│   │   │                    # - Rate limiting
│   │   │                    # - Route mounting
│   │   │                    # - Error handling
│   │   │
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.ts     # JWT authentication (21 lines)
│   │   │   │               # - Verifies Bearer tokens
│   │   │   │               # - Extracts user from JWT
│   │   │   └── validate.ts # Zod schema validation
│   │   │                   # - Request body validation
│   │   │                   # - Query params validation
│   │   │
│   │   └── routes/         # API routes
│   │       ├── health.ts   # Health check endpoint
│   │       │               # GET /health → {status: "ok"}
│   │       │
│   │       └── v1/         # API version 1
│   │           ├── index.ts           # Route aggregator (17 lines)
│   │           │
│   │           └── modules/           # Feature modules
│   │               ├── auth.ts        # Authentication (86 lines)
│   │               │                  # - POST /register
│   │               │                  # - POST /login
│   │               │                  # - JWT token generation
│   │               │
│   │               ├── files.ts       # File management (202 lines)
│   │               │                  # - POST /upload
│   │               │                  # - GET / (list files)
│   │               │                  # - GET /:id (metadata)
│   │               │                  # - GET /:id/download
│   │               │                  # - GET /:id/preview
│   │               │                  # - GET /:id/thumbnail
│   │               │                  # - PUT /:id (rename)
│   │               │                  # - DELETE /:id
│   │               │                  # - GET /search
│   │               │                  # - POST /:id/password
│   │               │                  # - DELETE /:id/password
│   │               │                  # - PUT /:id/tags
│   │               │
│   │               ├── shares.ts      # File sharing (97 lines)
│   │               │                  # - POST / (create share)
│   │               │                  # - GET /:id
│   │               │                  # - DELETE /:id (revoke)
│   │               │                  # - POST /:id/signed-url
│   │               │                  # - GET /:id/download
│   │               │                  # - GET /public/signed
│   │               │
│   │               └── conversions.ts # Format conversion (63 lines)
│   │                                  # - GET /formats
│   │                                  # - POST / (request)
│   │                                  # - GET /:id (status)
│   │                                  # - GET /:id/download
│   │                                  # - POST /webhook/cloudconvert
│   │
│   ├── schemas/              # Zod validation schemas
│   │   ├── auth.ts          # Auth validation (register, login)
│   │   ├── files.ts         # File operation validation
│   │   ├── shares.ts        # Share creation validation
│   │   └── conversions.ts   # Conversion request validation
│   │
│   ├── config/              # Configuration modules
│   │   ├── env.ts          # Environment variable parsing (37 lines)
│   │   │                   # - Validates required vars
│   │   │                   # - Type-safe config export
│   │   └── storage.ts      # Storage directory initialization
│   │                       # - Creates storage folders
│   │
│   ├── db/                  # Database
│   │   └── prisma.ts       # Prisma client singleton
│   │                       # - Single instance across app
│   │                       # - Connection management
│   │
│   ├── storage/             # File storage abstraction
│   │   ├── index.ts        # Storage interface (63 lines)
│   │   │                   # - Local filesystem storage
│   │   │                   # - S3-compatible storage
│   │   │                   # - Upload, download, delete
│   │   └── thumbnails.ts   # Thumbnail generation (10 lines)
│   │                       # - Sharp library integration
│   │                       # - 256x256 JPEG thumbnails
│   │
│   ├── security/            # Security utilities
│   │   └── signing.ts      # Signed URLs (29 lines)
│   │                       # - HMAC-SHA256 signature
│   │                       # - Time-limited tokens
│   │                       # - URL verification
│   │
│   ├── audit/               # Audit logging
│   │   └── logger.ts       # Event logging (29 lines)
│   │                       # - Database audit trail
│   │                       # - IP address tracking
│   │                       # - User agent logging
│   │
│   └── conversion/          # File conversion
│       └── provider.ts     # Provider abstraction (78 lines)
│                           # - Noop provider (stub)
│                           # - CloudConvert integration
│
├── prisma/                  # Prisma ORM
│   ├── schema.prisma       # Database schema (109 lines)
│   │                       # - User model
│   │                       # - File model
│   │                       # - Share model
│   │                       # - Conversion model
│   │                       # - AuditLog model
│   └── migrations/         # Migration history
│                           # - Auto-generated by Prisma
│
├── scripts/                 # Utility scripts
│   ├── setup.sh            # Automated setup script
│   │                       # - Checks environment
│   │                       # - Installs dependencies
│   │                       # - Runs migrations
│   └── test-db-connection.js # Database connection test
│                           # - Tests PostgreSQL connection
│                           # - Displays database info
│
├── storage/                 # Local file storage (gitignored)
│                           # - User uploaded files
│                           # - Organized by userId
│
├── node_modules/           # Dependencies (gitignored)
├── dist/                   # Compiled JavaScript (gitignored)
│
├── .env                    # Environment variables (gitignored)
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
├── Dockerfile              # Multi-stage Docker build (22 lines)
├── package.json            # Dependencies and scripts
├── package-lock.json       # Dependency lock file
├── tsconfig.json           # TypeScript configuration
└── README.md               # Backend documentation
```

**Total Backend Files:** ~60 TypeScript files
**Total Lines of Code:** ~1,100 (excluding tests)

---

### `frontend/` - React Web Application

```
frontend/
├── src/
│   ├── main.tsx            # React entry point (11 lines)
│   │                       # - ReactDOM.render
│   │                       # - App mount
│   │
│   ├── pages/
│   │   └── App.tsx         # Main application (450+ lines)
│   │       ├── AuthPage    # Login/Register UI
│   │       │               # - Email/password forms
│   │       │               # - Registration logic
│   │       │               # - Login logic
│   │       │
│   │       ├── FilesPage   # File management interface
│   │       │               # - File list display
│   │       │               # - Drag-and-drop upload
│   │       │               # - Upload progress
│   │       │               # - File operations (download, delete, rename)
│   │       │               # - Search and filtering
│   │       │               # - Tag management
│   │       │               # - Share link generation
│   │       │
│   │       └── Toast       # Notification system
│   │                       # - Success/error messages
│   │                       # - Auto-dismiss
│   │
│   └── api.ts              # API client (80 lines)
│                           # - Axios wrapper
│                           # - Bearer token injection
│                           # - Error handling
│                           # - Upload progress tracking
│
├── public/                 # Static assets
├── node_modules/          # Dependencies (gitignored)
├── dist/                  # Production build (gitignored)
│
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
│                          # - API proxy setup
│                          # - Build optimization
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
└── tsconfig.json          # TypeScript configuration
```

**Total Frontend Files:** ~5 TypeScript/React files
**Total Lines of Code:** ~550

---

## 📄 Documentation Files

### Root Level Documentation

| File | Purpose | Lines | Status |
|------|---------|-------|--------|
| `README.md` | Main project documentation with setup guides, API docs, tech stack | 868 | ✅ Current |
| `TASKS.md` | Comprehensive task tracker with completed/pending tasks | 650+ | ✅ Current |
| `PROJECT_STRUCTURE.md` | This file - complete project organization | ~500 | ✅ Current |
| `SETUP_DATABASE.md` | Database setup guide (Docker, cloud, manual) | 300+ | ✅ Current |
| `APP_PLAN.md` | Complete MVP feature specification | 450+ | ✅ Legacy |
| `ARCHITECTURE_OVERVIEW.md` | System architecture and data flows | 700+ | ✅ Legacy |
| `EXECUTIVE_SUMMARY.md` | Project vision and value proposition | 350+ | ✅ Legacy |
| `FEATURE_RECOMMENDATIONS.md` | Future phase recommendations | 550+ | ✅ Legacy |

**Note:** Legacy documentation files contain original planning documents. All current information is in README.md and TASKS.md.

---

## 🔧 Configuration Files

### Root Level

- `.gitignore` - Git ignore rules (node_modules, .env, dist, storage)
- `.dockerignore` - Docker ignore rules
- `docker-compose.yml` - PostgreSQL + Redis container orchestration

### Backend

- `.env` - Environment variables (DATABASE_URL, JWT_SECRET, etc.) **[GITIGNORED]**
- `.env.example` - Environment template (safe to commit)
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts
- `Dockerfile` - Multi-stage Docker build

### Frontend

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts

---

## 🗄️ Database Schema

### Tables

```sql
-- Users table
users (
  user_id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  mfa_enabled BOOLEAN DEFAULT false,
  storage_quota BIGINT DEFAULT 5GB,
  storage_used BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
)

-- Files table
files (
  file_id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY → users.user_id,
  file_name VARCHAR,
  file_size BIGINT,
  mime_type VARCHAR,
  storage_path VARCHAR,
  is_password_protected BOOLEAN,
  password_hash VARCHAR,
  tags TEXT[],
  thumbnail_key VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  is_deleted BOOLEAN
)
INDEXES: user_id

-- Shares table
shares (
  share_id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY → users.user_id,
  file_id UUID FOREIGN KEY → files.file_id,
  password_hash VARCHAR,
  expires_at TIMESTAMP,
  max_downloads INTEGER,
  downloads INTEGER DEFAULT 0,
  revoked BOOLEAN DEFAULT false,
  created_at TIMESTAMP
)
INDEXES: user_id, file_id

-- Conversions table
conversions (
  conversion_id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY → users.user_id,
  file_id UUID FOREIGN KEY → files.file_id,
  target_format VARCHAR,
  status VARCHAR DEFAULT 'queued',
  external_id VARCHAR,
  result_key VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
INDEXES: user_id, file_id, external_id

-- Audit Logs table
audit_logs (
  log_id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY → users.user_id,
  action VARCHAR,
  resource_type VARCHAR,
  resource_id VARCHAR,
  ip_address VARCHAR,
  user_agent VARCHAR,
  status VARCHAR,
  details JSON,
  created_at TIMESTAMP
)
INDEXES: user_id
```

---

## 📦 Dependencies

### Backend Dependencies

**Production:**
- `@aws-sdk/client-s3` - S3 storage integration
- `@prisma/client` - Database ORM
- `axios` - HTTP client for CloudConvert
- `bcrypt` - Password hashing
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `express` - Web framework
- `express-rate-limit` - Rate limiting
- `helmet` - Security headers
- `jsonwebtoken` - JWT authentication
- `mime-types` - MIME type detection
- `morgan` - HTTP logging
- `multer` - File upload handling
- `pg` - PostgreSQL driver
- `sharp` - Image thumbnail generation
- `uuid` - UUID generation
- `zod` - Schema validation

**Development:**
- `@types/*` - TypeScript type definitions
- `prisma` - Prisma CLI
- `ts-node-dev` - TypeScript development server
- `typescript` - TypeScript compiler

### Frontend Dependencies

**Production:**
- `react` - UI library
- `react-dom` - React DOM renderer
- `axios` - HTTP client

**Development:**
- `@vitejs/plugin-react` - Vite React plugin
- `vite` - Build tool
- `typescript` - TypeScript compiler

---

## 🔐 Environment Variables

### Required

```env
# Database
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=...

# Redis
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-secret-key
SIGNING_SECRET=your-signing-secret
```

### Optional

```env
# Storage (S3)
STORAGE_PROVIDER=s3
S3_BUCKET=your-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...

# File Conversion
CONVERSION_PROVIDER=cloudconvert
CLOUDCONVERT_API_KEY=...

# Server
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

See `.env.example` for complete list.

---

## 🚀 Build Output

### Backend

```
backend/dist/
├── index.js                 # Compiled server entry
├── server/
│   ├── app.js
│   ├── middleware/
│   └── routes/
├── config/
├── db/
├── storage/
├── security/
├── audit/
└── conversion/
```

**Build Command:** `npm run build`
**Output:** Compiled JavaScript in `dist/`

### Frontend

```
frontend/dist/
├── index.html               # Optimized HTML
├── assets/
│   ├── index-[hash].js     # Bundled JavaScript
│   └── index-[hash].css    # Bundled CSS
└── vite.svg
```

**Build Command:** `npm run build`
**Output:** Production-ready static files in `dist/`

---

## 📊 File Statistics

### By Type

| Type | Count | Purpose |
|------|-------|---------|
| `.ts` files | ~26 | Backend TypeScript source |
| `.tsx` files | ~2 | Frontend React components |
| `.md` files | 8 | Documentation |
| `.json` files | 6 | Configuration (package.json, tsconfig.json) |
| `.yml` files | 2 | Docker Compose, GitHub Actions |
| `.sh` files | 1 | Setup script |
| `.prisma` files | 1 | Database schema |

### By Directory

| Directory | Files | Lines of Code |
|-----------|-------|---------------|
| `backend/src` | ~26 | ~1,100 |
| `frontend/src` | ~3 | ~550 |
| `prisma` | 1 | ~109 |
| Documentation | 8 | ~2,500 |
| Configuration | ~10 | ~200 |

---

## 🧹 Excluded from Git

```
# Dependencies
node_modules/
package-lock.json (tracked but auto-generated)

# Build output
dist/
build/

# Environment
.env
.env.local
.env.*.local

# Storage
backend/storage/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Prisma
.prisma/
```

See `.gitignore` for complete list.

---

## 📍 Important File Locations

### Frequently Modified Files

| File | Location | Purpose |
|------|----------|---------|
| Environment Config | `backend/.env` | Database URL, secrets |
| Database Schema | `backend/prisma/schema.prisma` | Table definitions |
| API Routes | `backend/src/server/routes/v1/modules/` | Endpoint logic |
| Frontend UI | `frontend/src/pages/App.tsx` | Main React component |
| Task Tracker | `TASKS.md` | Project task management |

### Setup Files

| File | Location | Purpose |
|------|----------|---------|
| Setup Script | `backend/scripts/setup.sh` | Automated setup |
| DB Test | `backend/scripts/test-db-connection.js` | Connection test |
| Docker Compose | `docker-compose.yml` | Local services |
| Main README | `README.md` | Getting started guide |
| DB Setup Guide | `SETUP_DATABASE.md` | Database setup |

---

## 🎯 Quick Navigation

### Want to...

**Add a new API endpoint?**
→ `backend/src/server/routes/v1/modules/`

**Modify database schema?**
→ `backend/prisma/schema.prisma` then run `npm run prisma:migrate`

**Change authentication logic?**
→ `backend/src/server/middleware/auth.ts`

**Update frontend UI?**
→ `frontend/src/pages/App.tsx`

**Add environment variable?**
→ `backend/.env` and `backend/.env.example`

**View/edit database?**
→ Run `npm run prisma:studio`

**Check project tasks?**
→ `TASKS.md`

**Read API documentation?**
→ `README.md` → API Documentation section

---

## 🔄 Workflow Diagrams

### File Upload Flow

```
User → Frontend → Backend API → Storage (Local/S3) → Database
                                      ↓
                                 Thumbnail Generation
                                      ↓
                                 Audit Logging
```

### Authentication Flow

```
User → POST /auth/login → Validate Credentials → Generate JWT → Return Token
                               ↓                       ↓
                          Hash Password           Sign with Secret
                               ↓                       ↓
                          Compare Hash            Set Expiration
```

### File Download Flow

```
User → GET /files/:id/download → Check Auth → Check File Password
                                      ↓              ↓
                                 Verify Owner   Verify Password
                                      ↓              ↓
                                 Stream File    Log Download
```

---

## 📝 Maintenance Notes

### Regular Tasks

- Review and update `TASKS.md` weekly
- Check for outdated dependencies monthly
- Review audit logs for security issues
- Backup database regularly
- Monitor error logs
- Update documentation as features change

### Before Deploying

- [ ] Run `npm run build` in backend
- [ ] Run `npm run build` in frontend
- [ ] Test all API endpoints
- [ ] Review environment variables
- [ ] Check database migrations
- [ ] Update CHANGELOG.md
- [ ] Tag release in Git

---

**Last Updated:** 2025-01-14
**Maintained By:** CipherProfessor
**Next Review:** 2025-01-21
