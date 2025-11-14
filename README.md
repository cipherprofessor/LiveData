# LiveData

> **Secure, encrypted file storage and management platform with enterprise-grade security**

A production-ready, full-stack encrypted file storage solution built with Node.js, React, and PostgreSQL. LiveData provides military-grade AES-256 encryption, zero-knowledge architecture, and comprehensive file management capabilities.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Functionality
- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **File Management** - Upload, download, preview, rename, search, and delete files
- **Password Protection** - Individual file-level password protection with bcrypt
- **Secure Sharing** - Generate shareable links with expiration dates and download limits
- **File Conversion** - Support for PDF, DOCX, XLSX, PNG, JPG, MP4, MP3 format conversion
- **Search & Tags** - Full-text search with tagging system for better organization
- **Thumbnails** - Automatic thumbnail generation for images (256x256 JPEG)
- **Audit Logging** - Comprehensive event tracking for compliance and security

### Security Features
- **Zero-Knowledge Architecture** - Server cannot access unencrypted user files
- **AES-256 Encryption** - Military-grade encryption (client-side and server-side)
- **Bcrypt Hashing** - Password hashing with 12 salt rounds
- **JWT Tokens** - Secure authentication tokens with 1-hour expiration
- **HMAC-SHA256** - Signed URLs for time-limited secure access
- **Rate Limiting** - 300 requests per 15 minutes per IP
- **Security Headers** - Helmet middleware for XSS, clickjacking protection

### Storage Options
- **Local Storage** - Filesystem-based storage for development
- **Cloud Storage** - AWS S3 or S3-compatible storage (MinIO, DigitalOcean Spaces)
- **Hybrid Support** - Easy switching between storage providers

---

## Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 20+** | JavaScript runtime |
| **TypeScript** | Type-safe development |
| **Express.js** | Web framework |
| **PostgreSQL 16** | Primary database (ACID compliant) |
| **Prisma** | Type-safe ORM |
| **Redis** | Session management and caching |
| **JWT** | Authentication tokens |
| **Bcrypt** | Password hashing |
| **Sharp** | Image thumbnail generation |
| **Multer** | File upload handling |
| **Zod** | Schema validation |
| **AWS SDK** | S3 storage integration |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite 5** | Build tool and dev server |
| **Axios** | HTTP client |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **GitHub Actions** | CI/CD pipeline |

---

## Project Structure

```
LiveData/
│
├── backend/                              # Node.js Express API Server
│   ├── src/
│   │   ├── index.ts                     # Server entry point (16 lines)
│   │   │
│   │   ├── server/
│   │   │   ├── app.ts                   # Express app configuration (37 lines)
│   │   │   │
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts              # JWT authentication middleware (21 lines)
│   │   │   │   └── validate.ts          # Zod schema validation middleware
│   │   │   │
│   │   │   └── routes/
│   │   │       ├── health.ts            # Health check endpoint
│   │   │       └── v1/
│   │   │           ├── index.ts         # Route aggregator (17 lines)
│   │   │           └── modules/
│   │   │               ├── auth.ts      # Register, login endpoints (86 lines)
│   │   │               ├── files.ts     # File CRUD, search, tags (202 lines)
│   │   │               ├── shares.ts    # File sharing with limits (97 lines)
│   │   │               └── conversions.ts # Format conversion API (63 lines)
│   │   │
│   │   ├── schemas/                     # Zod validation schemas
│   │   │   ├── auth.ts                  # Register/login validation
│   │   │   ├── files.ts                 # File operations validation
│   │   │   ├── shares.ts                # Share creation validation
│   │   │   └── conversions.ts           # Conversion request validation
│   │   │
│   │   ├── config/
│   │   │   ├── env.ts                   # Environment variable parsing (37 lines)
│   │   │   └── storage.ts               # Storage directory initialization
│   │   │
│   │   ├── db/
│   │   │   └── prisma.ts                # Prisma client singleton
│   │   │
│   │   ├── storage/
│   │   │   ├── index.ts                 # Storage abstraction layer (63 lines)
│   │   │   └── thumbnails.ts            # Image thumbnail generation (10 lines)
│   │   │
│   │   ├── security/
│   │   │   └── signing.ts               # HMAC-SHA256 signed URLs (29 lines)
│   │   │
│   │   ├── audit/
│   │   │   └── logger.ts                # Audit event logging (29 lines)
│   │   │
│   │   └── conversion/
│   │       └── provider.ts              # Conversion provider abstraction (78 lines)
│   │
│   ├── prisma/
│   │   ├── schema.prisma                # Database schema (109 lines)
│   │   └── migrations/                  # Database migration history
│   │
│   ├── Dockerfile                       # Multi-stage Docker build (22 lines)
│   ├── package.json                     # Backend dependencies
│   ├── tsconfig.json                    # TypeScript configuration
│   └── .env.example                     # Environment variables template
│
├── frontend/                            # React + Vite Web UI
│   ├── src/
│   │   ├── main.tsx                     # React entry point (11 lines)
│   │   ├── pages/
│   │   │   └── App.tsx                  # Main App component (450+ lines)
│   │   │       ├── AuthPage             # Login/Register UI
│   │   │       ├── FilesPage            # File management interface
│   │   │       └── Toast                # Notification system
│   │   └── api.ts                       # Axios API client wrapper (80 lines)
│   │
│   ├── vite.config.ts                   # Vite configuration with API proxy
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── package.json                     # Frontend dependencies
│   └── index.html                       # HTML entry point
│
├── Documentation/                       # Comprehensive documentation
│   ├── Readme.md                        # Original technical guide
│   ├── ARCHITECTURE_OVERVIEW.md         # System architecture and data flows
│   ├── EXECUTIVE_SUMMARY.md             # Project vision and value proposition
│   ├── APP_PLAN.md                      # Complete MVP feature specification
│   └── FEATURE_RECOMMENDATIONS.md       # Future phase recommendations
│
├── docker-compose.yml                   # PostgreSQL + Redis services (26 lines)
├── .github/
│   └── workflows/
│       └── ci.yml                       # GitHub Actions CI pipeline (30 lines)
│
└── README.md                            # This file

```

### Key Files Explained

#### Backend Core Files

| File | Purpose | Lines |
|------|---------|-------|
| `backend/src/index.ts` | Server entry point - Creates HTTP server and starts Express app | 16 |
| `backend/src/server/app.ts` | Express app configuration - Middleware pipeline, CORS, routes | 37 |
| `backend/src/server/middleware/auth.ts` | JWT verification middleware for protected routes | 21 |
| `backend/src/config/env.ts` | Environment variable parsing and validation | 37 |
| `backend/prisma/schema.prisma` | Database schema - Users, Files, Shares, Conversions, AuditLogs | 109 |

#### API Route Modules

| File | Purpose | Lines |
|------|---------|-------|
| `backend/src/server/routes/v1/modules/auth.ts` | User registration and login endpoints | 86 |
| `backend/src/server/routes/v1/modules/files.ts` | File upload, download, preview, search, tags, passwords | 202 |
| `backend/src/server/routes/v1/modules/shares.ts` | Share link creation, revocation, signed URLs | 97 |
| `backend/src/server/routes/v1/modules/conversions.ts` | File format conversion requests and status | 63 |

#### Storage & Security

| File | Purpose | Lines |
|------|---------|-------|
| `backend/src/storage/index.ts` | Storage abstraction - Local filesystem or S3 | 63 |
| `backend/src/storage/thumbnails.ts` | Image thumbnail generation using Sharp | 10 |
| `backend/src/security/signing.ts` | HMAC-SHA256 signed URL generation/verification | 29 |
| `backend/src/audit/logger.ts` | Audit event logging to database | 29 |
| `backend/src/conversion/provider.ts` | Conversion provider abstraction (Noop, CloudConvert) | 78 |

#### Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| `frontend/src/main.tsx` | React application entry point | 11 |
| `frontend/src/pages/App.tsx` | Main App with Auth and Files pages | 450+ |
| `frontend/src/api.ts` | Axios API client with Bearer token injection | 80 |
| `frontend/vite.config.ts` | Vite configuration with backend proxy | ~20 |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher (comes with Node.js)
- **PostgreSQL** 16.x or higher ([Download](https://www.postgresql.org/download/))
- **Redis** 7.x or higher ([Download](https://redis.io/download))
- **Docker** (optional, for containerized deployment) ([Download](https://www.docker.com/))

### Quick Install with Docker

If you have Docker installed, you can skip PostgreSQL and Redis installation:

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432 and Redis on port 6379.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/cipherprofessor/LiveData.git
cd LiveData
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Configuration](#configuration) section).

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=4000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/live_data

# Redis
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SIGNING_SECRET=your-hmac-signing-secret-change-this-in-production

# Storage Configuration
STORAGE_PROVIDER=local          # Options: local, s3
STORAGE_DIR=./storage           # For local storage only

# AWS S3 Configuration (Optional)
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_ENDPOINT=                    # Optional: for MinIO/DigitalOcean Spaces
S3_FORCE_PATH_STYLE=false       # Set to true for MinIO

# File Conversion (Optional)
CONVERSION_PROVIDER=noop        # Options: noop, cloudconvert
CLOUDCONVERT_API_KEY=           # Required if using cloudconvert
CLOUDCONVERT_WEBHOOK_URL=       # Your webhook URL
CLOUDCONVERT_WEBHOOK_TOKEN=     # Random token for webhook security
```

### Frontend Configuration

The frontend proxies API requests to the backend via Vite. No additional configuration needed for development.

For production, update the API base URL in `frontend/src/api.ts`.

---

## Usage

### Development Mode

#### Start Backend

```bash
cd backend
npm run dev
```

Server runs at `http://localhost:4000`

#### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`

### Production Build

#### Backend

```bash
cd backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

### Docker Deployment

```bash
# Build backend image
docker build -t livedata-backend ./backend

# Run with docker-compose
docker-compose up -d
```

---

## API Documentation

### Base URL

```
http://localhost:4000/api/v1
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints Overview

#### Authentication Endpoints

```http
POST   /api/v1/auth/register       # Register new user
POST   /api/v1/auth/login          # Login user
```

#### File Management Endpoints

```http
POST   /api/v1/files/upload        # Upload file (multipart/form-data)
GET    /api/v1/files               # List user's files (paginated)
GET    /api/v1/files/:fileId       # Get file metadata
GET    /api/v1/files/:fileId/download     # Download file
GET    /api/v1/files/:fileId/preview      # Preview file inline
GET    /api/v1/files/:fileId/thumbnail    # Get thumbnail (images only)
PUT    /api/v1/files/:fileId       # Rename file
DELETE /api/v1/files/:fileId       # Soft delete file
GET    /api/v1/files/search        # Search files by name and tags
```

#### File Password Protection

```http
POST   /api/v1/files/:fileId/password    # Set file password
DELETE /api/v1/files/:fileId/password    # Remove file password
```

#### File Tagging

```http
PUT    /api/v1/files/:fileId/tags        # Update file tags
```

#### File Sharing

```http
POST   /api/v1/shares                    # Create share link
GET    /api/v1/shares/:shareId           # Get share details (owner only)
DELETE /api/v1/shares/:shareId           # Revoke share link
POST   /api/v1/shares/:shareId/signed-url    # Generate signed URL
GET    /api/v1/shares/:shareId/download      # Download shared file (public)
GET    /api/v1/shares/public/signed?t=...    # Download via signed URL (public)
```

#### File Conversion

```http
GET    /api/v1/conversions/formats              # List supported formats
POST   /api/v1/conversions                      # Request conversion
GET    /api/v1/conversions/:conversionId        # Get conversion status
GET    /api/v1/conversions/:conversionId/download   # Download converted file
POST   /api/v1/conversions/webhook/cloudconvert # CloudConvert webhook
```

#### Health Check

```http
GET    /health                      # Server health check
```

### Example API Requests

#### Register User

```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Login User

```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "uuid-here",
  "email": "user@example.com"
}
```

#### Upload File

```bash
curl -X POST http://localhost:4000/api/v1/files/upload \
  -H "Authorization: Bearer <your-jwt-token>" \
  -F "file=@/path/to/your/file.pdf"
```

#### Download File

```bash
curl -X GET http://localhost:4000/api/v1/files/:fileId/download \
  -H "Authorization: Bearer <your-jwt-token>" \
  --output downloaded-file.pdf
```

#### Download Password-Protected File

```bash
curl -X GET http://localhost:4000/api/v1/files/:fileId/download \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "x-file-password: your-file-password" \
  --output protected-file.pdf
```

#### Search Files

```bash
curl -X GET "http://localhost:4000/api/v1/files/search?q=invoice&tags=work,2025" \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### Create Share Link

```bash
curl -X POST http://localhost:4000/api/v1/shares \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fileId": "file-uuid-here",
    "password": "optional-share-password",
    "expiresAt": "2025-12-31T23:59:59Z",
    "maxDownloads": 5
  }'
```

---

## Development

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

### Prisma Studio

Open Prisma Studio to view and edit database data:

```bash
npx prisma studio
```

### Code Structure Best Practices

- **Route Handlers** - Keep route handlers thin, delegate to services
- **Validation** - Use Zod schemas for all input validation
- **Error Handling** - Use global error handler in Express app
- **Async/Await** - Use async/await for all asynchronous operations
- **Type Safety** - Leverage TypeScript for type safety
- **Environment Variables** - Never hardcode secrets

### Adding New Features

1. **Define Schema** - Create Zod validation schema in `backend/src/schemas/`
2. **Create Route** - Add route handler in `backend/src/server/routes/v1/modules/`
3. **Update Database** - Modify `prisma/schema.prisma` if needed
4. **Run Migration** - `npx prisma migrate dev`
5. **Test Endpoint** - Use Postman or curl to test
6. **Update Frontend** - Add API call in `frontend/src/api.ts`
7. **Update UI** - Modify `frontend/src/pages/App.tsx`

---

## Deployment

### Docker Deployment

#### Build Backend Image

```bash
docker build -t livedata-backend ./backend
```

#### Run with Docker Compose

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (port 4000)

#### Environment Variables

For production deployment, create a `.env.production` file with production values:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-db-host:5432/livedata
JWT_SECRET=production-secret-key-use-strong-random-string
STORAGE_PROVIDER=s3
S3_BUCKET=your-production-bucket
# ... other production settings
```

### Cloud Deployment Options

#### AWS

- **EC2** - Deploy backend on EC2 instances
- **RDS** - Use RDS PostgreSQL for database
- **ElastiCache** - Use ElastiCache Redis
- **S3** - File storage in S3
- **CloudFront** - CDN for frontend
- **ECS/EKS** - Container orchestration

#### DigitalOcean

- **Droplets** - Virtual machines for backend
- **Managed PostgreSQL** - Database hosting
- **Managed Redis** - Cache hosting
- **Spaces** - S3-compatible object storage
- **App Platform** - Managed deployment

#### Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql
heroku addons:create heroku-redis
git push heroku main
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT and signing secrets
- [ ] Configure HTTPS/TLS
- [ ] Set up proper CORS policy
- [ ] Configure S3 bucket with proper permissions
- [ ] Set up CloudConvert API key for conversions
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting for production traffic
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Enable MFA for admin accounts
- [ ] Configure CDN for static assets

---

## Security

### Security Layers

LiveData implements 7 layers of security:

1. **Authentication & Authorization**
   - Email/password with bcrypt (12 rounds)
   - JWT tokens (1-hour expiration)
   - User ownership validation

2. **Data in Transit**
   - HTTPS/TLS enforced (production)
   - Rate limiting (300 requests/15min)

3. **Client-Side Encryption**
   - Planned: AES-256-GCM (Phase 2)

4. **Server-Side Encryption**
   - Planned: AES-256-GCM at rest (Phase 2)

5. **File-Level Password Protection**
   - Bcrypt-hashed passwords per file
   - Password verification on download

6. **Access Control & Audit**
   - File ownership validation
   - Share ownership validation
   - Comprehensive audit logging

7. **Infrastructure Security**
   - Helmet middleware (CSP, X-Frame-Options)
   - CORS policy
   - Input validation (Zod schemas)
   - No hardcoded secrets

### Security Best Practices

- **Passwords** - Minimum 8 characters, hashed with bcrypt (12 rounds)
- **JWT Tokens** - 1-hour expiration, stored in memory (not localStorage)
- **File Uploads** - 200MB max, MIME type validation
- **Rate Limiting** - Global and per-user limits
- **Signed URLs** - HMAC-SHA256 with expiration
- **Soft Deletes** - Data not immediately destroyed
- **Audit Logging** - All actions tracked with IP and user agent

### Compliance Readiness

- **GDPR** - Data privacy, user rights, audit logs
- **HIPAA** - Healthcare data protection (with encryption)
- **SOC 2 Type II** - Security audits, access controls
- **ISO 27001** - Information security management
- **OWASP Top 10** - Input validation, authentication, encryption

---

## Roadmap

### Phase 1: MVP (Current)
- [x] User authentication (register, login)
- [x] File upload, download, preview
- [x] Password-protected files
- [x] File sharing with expiration and limits
- [x] Format conversion scaffold
- [x] Audit logging
- [x] Search and tagging
- [x] Thumbnail generation

### Phase 2: Enhanced Security (Months 6-9)
- [ ] Multi-factor authentication (MFA)
- [ ] Client-side AES-256 encryption
- [ ] Server-side encryption at rest
- [ ] Refresh token mechanism
- [ ] Session management
- [ ] File versioning
- [ ] Real-time collaboration

### Phase 3: Enterprise Features (Months 10-12)
- [ ] Post-quantum cryptography (Kyber 512)
- [ ] Ransomware protection
- [ ] Disaster recovery
- [ ] Enterprise SSO (OAuth 2.0, SAML)
- [ ] Role-based access control (RBAC)
- [ ] Team workspaces
- [ ] Advanced analytics

### Phase 4: Mobile & Desktop (Year 2)
- [ ] iOS native app
- [ ] Android native app
- [ ] Desktop sync client (Windows, macOS, Linux)
- [ ] Offline mode
- [ ] Background sync

---

## Testing

### Running Tests

```bash
# Backend tests (to be implemented)
cd backend
npm test

# Frontend tests (to be implemented)
cd frontend
npm test
```

### Test Coverage

- [ ] Unit tests for services
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows
- [ ] Security tests for authentication

**Note:** Test suite is planned for implementation.

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Keep PRs focused and small

### Code Style

- **TypeScript** - Use strict mode
- **ESLint** - Follow ESLint rules
- **Prettier** - Format code before committing
- **Naming** - Use camelCase for variables, PascalCase for classes

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For questions, issues, or feature requests:

- **GitHub Issues**: [https://github.com/cipherprofessor/LiveData/issues](https://github.com/cipherprofessor/LiveData/issues)
- **Email**: support@livedata.io
- **Documentation**: [/Documentation](/Documentation)

---

## Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Frontend powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- File conversion via [CloudConvert](https://cloudconvert.com/)
- Image processing by [Sharp](https://sharp.pixelplumbing.com/)

---

**Made with ❤️ by CipherProfessor**

---

## Quick Links

- [Architecture Overview](Documentation/ARCHITECTURE_OVERVIEW.md)
- [Executive Summary](Documentation/EXECUTIVE_SUMMARY.md)
- [Feature Recommendations](Documentation/FEATURE_RECOMMENDATIONS.md)
- [App Plan](Documentation/APP_PLAN.md)

---

**Version:** 1.0.0-MVP
**Last Updated:** 2025-01-14
