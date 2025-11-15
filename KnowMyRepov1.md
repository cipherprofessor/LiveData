# 🎓 CyberFort LMS - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Development Setup](#development-setup)
5. [UI Design System](#ui-design-system)
6. [API Architecture](#api-architecture)
7. [Database Schema](#database-schema)
8. [What We've Built](#what-weve-built)
9. [Development Guidelines](#development-guidelines)
10. [Security Considerations](#security-considerations)
11. [Testing Strategy](#testing-strategy)
12. [Deployment](#deployment)

---

## Project Overview

**CyberFort LMS** is a modern, multi-tenant Learning Management System designed for cybersecurity training and general education. It provides a complete platform for organizations to create, manage, and deliver online courses with advanced features like progress tracking, assessments, certificates, and more.

### Key Features
- 🏢 **Multi-Tenancy**: Separate organizations with isolated data
- 👥 **Role-Based Access**: Super Admin, Tenant Admin, Instructor, Student
- 📚 **Course Management**: Full CRUD for courses, modules, lessons
- 📹 **Multiple Content Types**: Video, Document, Text, Interactive
- 📊 **Progress Tracking**: Real-time tracking of student progress
- 🎓 **Certificates**: Auto-generated upon course completion
- 🔖 **Bookmarks & Notes**: Students can bookmark and take notes
- 📈 **Analytics & Reports**: Detailed progress and performance reports
- 🎨 **Modern UI**: Dark mode, responsive design, smooth animations
- 🔒 **Security**: JWT authentication, tenant isolation, RBAC

### Project Type
**B2B SaaS** - Organizations purchase subscriptions to create their own learning portals for employees/students.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Admin    │  │ Instructor │  │  Student   │            │
│  │  Dashboard │  │  Dashboard │  │  Portal    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Go/Fiber)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Tenant  │  │  Course  │  │ Progress │   │
│  │ Middleware│  │ Context  │  │ Service  │  │  Service │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Database (PostgreSQL)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Multi-Tenant │  │   Courses    │  │   Progress   │      │
│  │    Schema    │  │   Modules    │  │  Enrollments │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Tenancy Model

**Approach**: Shared database with organization_id isolation
- All tables have `organization_id` column
- Middleware injects tenant context from subdomain
- Row-level security enforced in queries

```
Example:
- tenant1.cyberfort.com → organization_id = uuid-1
- tenant2.cyberfort.com → organization_id = uuid-2
```

---

## Tech Stack

### Frontend
- **Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: 
  - Zustand (global state)
  - TanStack Query (server state)
- **Styling**: SCSS Modules
- **UI Components**: Custom components (no external library)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Rich Text Editor**: TipTap (for course content)
- **Icons**: Lucide React

### Backend
- **Language**: Go 1.21+
- **Framework**: Fiber v2 (Express-like for Go)
- **Database**: PostgreSQL 15+
- **Database Driver**: pgx v5
- **Authentication**: JWT (golang-jwt)
- **Validation**: go-playground/validator
- **UUID**: google/uuid
- **Environment**: godotenv

### DevOps (Not Implemented Yet)
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- AWS/DigitalOcean for hosting

---

## Development Setup

### Prerequisites
```bash
# Required
- Node.js 18+ and npm/yarn
- Go 1.21+
- PostgreSQL 15+
- Git

# Optional
- Docker & Docker Compose
- Postman/Insomnia (API testing)
```

### Backend Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd cyberfort-lms/BackEnd

# 2. Install dependencies
go mod download

# 3. Create .env file
cp .env.example .env

# 4. Configure .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=cyberfort_lms
DB_SSL_MODE=disable

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=24h

SERVER_PORT=8080
ALLOWED_ORIGINS=http://localhost:5173

# 5. Create database
psql -U postgres
CREATE DATABASE cyberfort_lms;
\q

# 6. Run migrations
# SQL files are in BackEnd/migrations/
psql -U postgres -d cyberfort_lms -f migrations/001_init.sql
psql -U postgres -d cyberfort_lms -f migrations/002_courses.sql
# ... run all migration files in order

# 7. Run the server
go run cmd/main.go

# Server starts on http://localhost:8080
```

### Frontend Setup

```bash
# 1. Navigate to frontend
cd ../frontend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Configure .env
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=CyberFort LMS

# 5. Run development server
npm run dev

# Frontend starts on http://localhost:5173
```

### Test User Accounts

After running migrations, seed data creates:

```
Super Admin:
- Email: admin@cyberfort.com
- Password: Admin@123

Tenant Admin (testorg):
- Email: admin@testorg.com
- Password: Admin@123
- Subdomain: testorg.localhost:5173

Student (testorg):
- Email: student@testorg.com
- Password: Student@123
```

---

## UI Design System

### Color Palette

```scss
/* Light Mode */
--background: #ffffff
--foreground: #0a0a0b
--card: #f8f9fa
--card-foreground: #0a0a0b
--primary: #3b82f6
--primary-foreground: #ffffff
--secondary: #64748b
--muted: #f1f5f9
--muted-foreground: #64748b
--accent: #f1f5f9
--border: #e2e8f0
--destructive: #ef4444

/* Dark Mode */
--background: #0a0a0b
--foreground: #ffffff
--card: rgb(25, 25, 28)
--card-foreground: #ffffff
--primary: #3b82f6
--primary-foreground: #ffffff
--secondary: #94a3b8
--muted: rgba(255, 255, 255, 0.1)
--muted-foreground: rgba(255, 255, 255, 0.7)
--accent: rgba(59, 130, 246, 0.1)
--border: rgba(255, 255, 255, 0.2)
--destructive: #ef4444
```

### Typography

```scss
/* Headings */
h1: 2.25rem (36px), font-weight: 700
h2: 1.875rem (30px), font-weight: 700
h3: 1.5rem (24px), font-weight: 600
h4: 1.25rem (20px), font-weight: 600

/* Body */
body: 1rem (16px), font-weight: 400
small: 0.875rem (14px)
xs: 0.75rem (12px)

/* Font Family */
font-family: system-ui, -apple-system, 'Segoe UI', sans-serif
```

### Spacing Scale

```scss
0.25rem → 4px
0.5rem  → 8px
0.75rem → 12px
1rem    → 16px
1.5rem  → 24px
2rem    → 32px
3rem    → 48px
4rem    → 64px
```

### Animation System

```scss
/* Durations */
--animation-fast: 150ms
--animation-normal: 250ms
--animation-slow: 350ms

/* Easings */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)

/* Usage */
transition: all var(--animation-normal) var(--ease-smooth);
```

### Component Patterns

#### Buttons
```scss
// Primary Button
.primaryButton {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
}

// Secondary Button
.secondaryButton {
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--foreground);
  border-radius: 0.5rem;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
  }
}
```

#### Cards
```scss
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--primary);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}
```

### Dark Mode Implementation

```tsx
// Toggle dark mode
document.documentElement.classList.toggle('dark');

// All dark mode styles use :global(.dark) selector
:global(.dark) & {
  background-color: rgb(25, 25, 28);
  color: #ffffff;
}
```

### Responsive Breakpoints

```scss
/* Mobile First Approach */
@media (max-width: 640px)  { /* Mobile */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 1024px) { /* Small Desktop */ }
@media (max-width: 1280px) { /* Desktop */ }
@media (min-width: 1536px) { /* Large Desktop */ }
```

---

## API Architecture

### API Base URL
```
http://localhost:8080/api/v1
```

### Authentication Flow

```
1. User logs in → POST /auth/login
   Request: { email, password }
   Response: { token, user, organization }

2. Store token in localStorage
   localStorage.setItem('token', data.token)

3. Every API call includes token in header
   Authorization: Bearer <token>

4. Backend middleware validates token
   - Extracts userID, orgID, email, userType
   - Injects into Fiber context: c.Locals()

5. Handlers access user info from context
   userID := c.Locals("userID")
   orgID := c.Locals("orgID")
```

### Middleware Chain

```go
Request → TenantContext → AuthRequired → Handler
          ↓                ↓               ↓
    Extract subdomain  Validate JWT   Business logic
    Set orgID         Set user context  Return response
```

### API Patterns

#### Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "error": true,
  "message": "Error description",
  "details": { ... }
}
```

#### Pagination

```json
// Request
GET /courses?page=1&limit=20&status=published

// Response
{
  "success": true,
  "data": {
    "courses": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

#### Filtering & Search

```
GET /courses?search=python&difficulty=intermediate&category=programming
GET /users?role=student&status=active&sort=createdAt:desc
```

### Key API Endpoints

#### Authentication
```
POST   /auth/login              - Login
POST   /auth/register           - Register new user
POST   /auth/logout             - Logout
GET    /auth/me                 - Get current user
POST   /auth/refresh            - Refresh token
POST   /auth/forgot-password    - Request password reset
POST   /auth/reset-password     - Reset password
```

#### Courses (Admin)
```
GET    /courses                 - List all courses
POST   /courses                 - Create course
GET    /courses/:id             - Get course details
PUT    /courses/:id             - Update course
DELETE /courses/:id             - Delete course
PATCH  /courses/:id/publish     - Publish course
PATCH  /courses/:id/unpublish   - Unpublish course
```

#### Modules
```
GET    /courses/:courseId/modules              - List modules
POST   /courses/:courseId/modules              - Create module
GET    /courses/:courseId/modules/:id          - Get module
PUT    /courses/:courseId/modules/:id          - Update module
DELETE /courses/:courseId/modules/:id          - Delete module
PATCH  /courses/:courseId/modules/reorder      - Reorder modules
```

#### Lessons
```
GET    /courses/:courseId/modules/:moduleId/lessons        - List lessons
POST   /courses/:courseId/modules/:moduleId/lessons        - Create lesson
GET    /courses/:courseId/modules/:moduleId/lessons/:id    - Get lesson
PUT    /courses/:courseId/modules/:moduleId/lessons/:id    - Update lesson
DELETE /courses/:courseId/modules/:moduleId/lessons/:id    - Delete lesson
```

#### Student Enrollment
```
POST   /enrollments/self-enroll                - Self-enroll in course
GET    /my-enrollments                         - Get my enrollments
GET    /enrollments/:id                        - Get enrollment details
DELETE /enrollments/:id                        - Unenroll from course
```

#### Progress Tracking
```
POST   /lessons/:lessonId/start                - Start lesson
PUT    /lessons/:lessonId/progress             - Update progress
POST   /lessons/:lessonId/complete             - Complete lesson
GET    /lessons/:lessonId/progress             - Get lesson progress
GET    /courses/:courseId/progress             - Get course progress
GET    /courses/:courseId/module-progress      - Get module progress
GET    /my-learning-progress                   - Get all my progress
```

#### Bookmarks & Notes
```
POST   /bookmarks                              - Create bookmark
GET    /bookmarks                              - Get my bookmarks
PUT    /bookmarks/:id                          - Update bookmark
DELETE /bookmarks/:id                          - Delete bookmark

POST   /notes                                  - Create note
GET    /notes                                  - Get my notes
GET    /lessons/:lessonId/notes                - Get lesson notes
PUT    /notes/:id                              - Update note
DELETE /notes/:id                              - Delete note
```

#### Course Player
```
GET    /student/courses/:courseId/player       - Get course for player
                                                 (includes modules, lessons, progress)
```

### Error Handling

```go
// Backend returns consistent errors
type ErrorResponse struct {
    Error   bool   `json:"error"`
    Message string `json:"message"`
    Details any    `json:"details,omitempty"`
}

// Status codes
200 - OK
201 - Created
400 - Bad Request (validation errors)
401 - Unauthorized (invalid/missing token)
403 - Forbidden (no permission)
404 - Not Found
409 - Conflict (duplicate resource)
500 - Internal Server Error
```

### API Security

```go
// 1. Authentication Required
middleware.AuthRequired(cfg, db)

// 2. Tenant Isolation
middleware.TenantContext()
// Every query filters by organization_id

// 3. Role-Based Access
if user.UserType != "tenant_admin" {
    return fiber.StatusForbidden
}

// 4. UUID Type Safety
// Always handle both string and uuid.UUID from context
func extractUUID(c *fiber.Ctx, key string) (uuid.UUID, error) {
    raw := c.Locals(key)
    switch v := raw.(type) {
    case uuid.UUID:
        return v, nil
    case string:
        return uuid.Parse(v)
    default:
        return uuid.UUID{}, fmt.Errorf("invalid type")
    }
}
```

---

## Database Schema

### Core Tables

#### organizations
```sql
id                UUID PRIMARY KEY
name              VARCHAR(255) NOT NULL
subdomain         VARCHAR(100) UNIQUE NOT NULL
domain            VARCHAR(255)
contact_email     VARCHAR(255) NOT NULL
logo_url          TEXT
plan_tier         VARCHAR(50) DEFAULT 'free'
max_courses       INTEGER
max_users         INTEGER
is_active         BOOLEAN DEFAULT true
subscription_expires_at TIMESTAMPTZ
created_at        TIMESTAMPTZ DEFAULT NOW()
updated_at        TIMESTAMPTZ DEFAULT NOW()
```

#### users
```sql
id                UUID PRIMARY KEY
organization_id   UUID REFERENCES organizations(id)
email             VARCHAR(255) UNIQUE NOT NULL
password_hash     VARCHAR(255) NOT NULL
first_name        VARCHAR(100)
last_name         VARCHAR(100)
user_type         VARCHAR(50) NOT NULL -- super_admin, tenant_admin, instructor, student
avatar_url   TEXT
phone             VARCHAR(20)
is_active         BOOLEAN DEFAULT true
email_verified    BOOLEAN DEFAULT false
last_login_at     TIMESTAMPTZ
created_at        TIMESTAMPTZ DEFAULT NOW()
updated_at        TIMESTAMPTZ DEFAULT NOW()
```

#### courses
```sql
id                      UUID PRIMARY KEY
organization_id         UUID REFERENCES organizations(id)
title                   VARCHAR(255) NOT NULL
slug                    VARCHAR(255) UNIQUE NOT NULL
short_description       TEXT
description             TEXT
thumbnail_url           TEXT
difficulty              VARCHAR(50) -- beginner, intermediate, advanced
language                VARCHAR(10) DEFAULT 'en'
status                  VARCHAR(50) DEFAULT 'draft' -- draft, published, archived
category                VARCHAR(100)
duration_hours          INTEGER
total_modules           INTEGER DEFAULT 0
total_lessons           INTEGER DEFAULT 0
total_assessments       INTEGER DEFAULT 0
enrollment_count        INTEGER DEFAULT 0
certificate_enabled     BOOLEAN DEFAULT false
self_enrollment_enabled BOOLEAN DEFAULT true
start_date              TIMESTAMPTZ
end_date                TIMESTAMPTZ
created_by              UUID REFERENCES users(id)
updated_by              UUID REFERENCES users(id)
created_at              TIMESTAMPTZ DEFAULT NOW()
updated_at              TIMESTAMPTZ DEFAULT NOW()
deleted_at              TIMESTAMPTZ
```

#### course_modules
```sql
id                          UUID PRIMARY KEY
organization_id             UUID REFERENCES organizations(id)
course_id                   UUID REFERENCES courses(id)
title                       VARCHAR(255) NOT NULL
slug                        VARCHAR(255) NOT NULL
description                 TEXT
sort_order                  INTEGER NOT NULL
status                      VARCHAR(50) DEFAULT 'draft'
estimated_duration_minutes  INTEGER
is_locked                   BOOLEAN DEFAULT false
unlock_date                 TIMESTAMPTZ
total_lessons               INTEGER DEFAULT 0
total_assessments           INTEGER DEFAULT 0
total_labs                  INTEGER DEFAULT 0
created_by                  UUID REFERENCES users(id)
updated_by                  UUID REFERENCES users(id)
created_at                  TIMESTAMPTZ DEFAULT NOW()
updated_at                  TIMESTAMPTZ DEFAULT NOW()
deleted_at                  TIMESTAMPTZ
```

#### lessons
```sql
id                          UUID PRIMARY KEY
organization_id             UUID REFERENCES organizations(id)
course_id                   UUID REFERENCES courses(id)
module_id                   UUID REFERENCES course_modules(id)
title                       VARCHAR(255) NOT NULL
slug                        VARCHAR(255) NOT NULL
description                 TEXT
lesson_type                 VARCHAR(50) -- video, document, text, quiz, lab
content                     TEXT
video_url                   TEXT
document_url                TEXT
sort_order                  INTEGER NOT NULL
status                      VARCHAR(50) DEFAULT 'draft'
estimated_duration_minutes  INTEGER
is_locked                   BOOLEAN DEFAULT false
prerequisite_lesson_id      UUID REFERENCES lessons(id)
allow_download              BOOLEAN DEFAULT false
created_by                  UUID REFERENCES users(id)
updated_by                  UUID REFERENCES users(id)
created_at                  TIMESTAMPTZ DEFAULT NOW()
updated_at                  TIMESTAMPTZ DEFAULT NOW()
deleted_at                  TIMESTAMPTZ
```

#### course_enrollments
```sql
id                      UUID PRIMARY KEY
organization_id         UUID REFERENCES organizations(id)
course_id               UUID REFERENCES courses(id)
user_id                 UUID REFERENCES users(id)
enrollment_status       VARCHAR(50) DEFAULT 'active' -- active, completed, suspended, dropped
enrollment_source       VARCHAR(50) -- self, admin, bulk
enrolled_at             TIMESTAMPTZ DEFAULT NOW()
access_expires_at       TIMESTAMPTZ
progress_percentage     DECIMAL(5,2) DEFAULT 0
last_accessed_at        TIMESTAMPTZ
completed_at            TIMESTAMPTZ
completion_score        DECIMAL(5,2)
certificate_issued      BOOLEAN DEFAULT false
certificate_issued_at   TIMESTAMPTZ
total_time_spent_minutes INTEGER DEFAULT 0
suspended_at            TIMESTAMPTZ
suspended_reason        TEXT
dropped_at              TIMESTAMPTZ
drop_reason             TEXT
enrolled_by             UUID REFERENCES users(id)
updated_at              TIMESTAMPTZ DEFAULT NOW()
```

#### lesson_progress
```sql
id                      UUID PRIMARY KEY
organization_id         UUID REFERENCES organizations(id)
course_id               UUID REFERENCES courses(id)
module_id               UUID REFERENCES course_modules(id)
lesson_id               UUID REFERENCES lessons(id)
user_id                 UUID REFERENCES users(id)
enrollment_id           UUID REFERENCES course_enrollments(id)
status                  VARCHAR(50) DEFAULT 'not_started' -- not_started, in_progress, completed
progress_percentage     DECIMAL(5,2) DEFAULT 0
started_at              TIMESTAMPTZ
completed_at            TIMESTAMPTZ
last_accessed_at        TIMESTAMPTZ
time_spent_seconds      INTEGER DEFAULT 0
video_progress_seconds  INTEGER DEFAULT 0
video_watch_percentage  DECIMAL(5,2) DEFAULT 0
criteria_met            BOOLEAN DEFAULT false
last_position           JSONB
user_notes              TEXT
metadata                JSONB
created_at              TIMESTAMPTZ DEFAULT NOW()
updated_at              TIMESTAMPTZ DEFAULT NOW()
```

#### module_progress
```sql
id                      UUID PRIMARY KEY
organization_id         UUID REFERENCES organizations(id)
course_id               UUID REFERENCES courses(id)
module_id               UUID REFERENCES course_modules(id)
user_id                 UUID REFERENCES users(id)
enrollment_id           UUID REFERENCES course_enrollments(id)
status                  VARCHAR(50) DEFAULT 'not_started'
progress_percentage     DECIMAL(5,2) DEFAULT 0
completed_lessons_count INTEGER DEFAULT 0
total_lessons_count     INTEGER DEFAULT 0
started_at              TIMESTAMPTZ
completed_at            TIMESTAMPTZ
time_spent_seconds      INTEGER DEFAULT 0
created_at              TIMESTAMPTZ DEFAULT NOW()
updated_at              TIMESTAMPTZ DEFAULT NOW()
```

#### lesson_bookmarks
```sql
id                UUID PRIMARY KEY
organization_id   UUID REFERENCES organizations(id)
lesson_id         UUID REFERENCES lessons(id)
user_id           UUID REFERENCES users(id)
title             VARCHAR(255)
note              TEXT
position          JSONB -- { videoTime: 120, scrollPosition: 500 }
created_at        TIMESTAMPTZ DEFAULT NOW()
updated_at        TIMESTAMPTZ DEFAULT NOW()
```

#### lesson_notes
```sql
id                UUID PRIMARY KEY
organization_id   UUID REFERENCES organizations(id)
lesson_id         UUID REFERENCES lessons(id)
user_id           UUID REFERENCES users(id)
content           TEXT NOT NULL
timestamp_seconds INTEGER -- For video timestamp
content_block_id  UUID -- For specific content section
is_private        BOOLEAN DEFAULT true
created_at        TIMESTAMPTZ DEFAULT NOW()
updated_at        TIMESTAMPTZ DEFAULT NOW()
deleted_at        TIMESTAMPTZ
```

### Indexes for Performance

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_org ON users(organization_id);

-- Course queries
CREATE INDEX idx_courses_org ON courses(organization_id);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_status ON courses(status);

-- Enrollment queries
CREATE INDEX idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX idx_enrollments_org ON course_enrollments(organization_id);

-- Progress queries
CREATE INDEX idx_lesson_progress_user_lesson ON lesson_progress(user_id, lesson_id);
CREATE INDEX idx_module_progress_user_module ON module_progress(user_id, module_id);

-- Soft delete support
CREATE INDEX idx_courses_deleted ON courses(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_modules_deleted ON course_modules(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_lessons_deleted ON lessons(deleted_at) WHERE deleted_at IS NULL;
```

---

## What We've Built

### ✅ Completed Features

#### 1. **Authentication System** ✅
- JWT-based authentication
- Login/Register/Logout
- Password hashing with bcrypt
- Token refresh mechanism
- Role-based access control (RBAC)
- Multi-tenant user isolation

#### 2. **Multi-Tenancy Infrastructure** ✅
- Organization management
- Subdomain-based tenant detection
- Tenant context middleware
- Row-level tenant isolation
- Organization profiles

#### 3. **User Management** ✅
- Super Admin dashboard
- Tenant Admin dashboard
- User CRUD operations
- Role assignment
- User profiles
- Active/inactive status management

#### 4. **Course Management (Admin)** ✅
- Course CRUD operations
- Rich text editor for descriptions
- Course status management (draft/published/archived)
- Thumbnail uploads
- Course categories
- Difficulty levels
- Duration tracking
- Enrollment settings
- Certificate configuration

#### 5. **Module Management** ✅
- Module CRUD within courses
- Drag-and-drop reordering
- Estimated duration
- Lock/unlock functionality
- Status management
- Denormalized statistics (total lessons, assessments)

#### 6. **Lesson Management** ✅
- Multiple lesson types:
  - Video lessons
  - Document lessons (PDF)
  - Text/HTML content
  - Interactive content
- Lesson CRUD operations
- Drag-and-drop reordering
- Prerequisites
- Download permissions
- Estimated duration

#### 7. **Student Portal** ✅
- Course browsing
- Course detail pages
- Self-enrollment
- My Learning dashboard
- Continue learning functionality
- Course progress overview

#### 8. **Course Player** ✅
- Full-screen learning experience
- Sidebar with course outline
- Module/lesson navigation
- Video player with progress tracking
- Document viewer
- Rich text content display
- Previous/Next lesson navigation
- Auto-complete on video end
- Progress indicators
- Locked lesson indicators
- Mobile-responsive design
- Dark mode support

#### 9. **Progress Tracking** ✅
- Lesson progress tracking
- Module progress tracking
- Course progress summary
- Real-time progress updates
- Auto-save every 30 seconds
- Video position tracking
- Time spent tracking
- Completion criteria
- Last accessed timestamps

#### 10. **Enrollment System** ✅
- Self-enrollment
- Admin enrollment
- Enrollment status tracking
- Access expiration
- Enrollment history
- Unenrollment

#### 11. **Bookmarks & Notes** ✅ (Backend Ready)
- Create bookmarks with timestamps
- Add notes to lessons
- Video timestamp bookmarks
- Private/public notes
- Note management
- Bookmark organization

#### 12. **UI/UX Components** ✅
- Responsive layouts
- Dark mode toggle
- Sidebar navigation
- Admin headers
- Student headers
- Loading states
- Error states
- Toast notifications
- Modal dialogs
- Form components
- Table components
- Card components
- Button variants
- Progress bars
- Search functionality

#### 13. **API Infrastructure** ✅
- RESTful API design
- Middleware chain
- Error handling
- Response formatting
- Pagination
- Filtering & search
- Sorting
- Validation
- CORS configuration

---

### 🚧 In Progress / Partially Complete

#### 1. **Assessments/Quizzes** 🚧
- Database schema exists
- Backend handlers needed
- Frontend UI needed
- Auto-grading system needed

#### 2. **Certificates** 🚧
- Database schema exists
- Auto-generation on completion needed
- PDF template needed
- Email delivery needed

#### 3. **Reports & Analytics** 🚧
- Basic progress tracking works
- Advanced analytics needed:
  - Completion rates
  - Time analytics
  - Engagement metrics
  - Performance reports

#### 4. **File Upload System** 🚧
- Backend endpoints exist
- Cloud storage integration needed (AWS S3 / Cloudflare R2)
- File validation needed
- Thumbnail generation needed

---

### 📋 Not Started / Future Features

#### 1. **Discussion Forums** 📋
- Course discussions
- Lesson comments
- Q&A threads
- Instructor responses

#### 2. **Live Classes** 📋
- Zoom/Teams integration
- Schedule management
- Attendance tracking
- Recording storage

#### 3. **Assignments** 📋
- Assignment creation
- Submission system
- Grading interface
- Feedback mechanism

#### 4. **Gamification** 📋
- Points system
- Badges/achievements
- Leaderboards
- Streaks

#### 5. **Advanced Search** 📋
- Elasticsearch integration
- Full-text search
- Filters
- Auto-suggestions

#### 6. **Email System** 📋
- Welcome emails
- Course enrollment emails
- Progress reminders
- Certificate emails
- Newsletter

#### 7. **Payment Integration** 📋
- Stripe integration
- Subscription management
- Invoice generation
- Payment history

#### 8. **Mobile App** 📋
- React Native app
- Offline mode
- Push notifications
- Native video player

#### 9. **Admin Analytics Dashboard** 📋
- User statistics
- Course performance
- Revenue metrics
- Engagement charts

#### 10. **Content Drip** 📋
- Scheduled content release
- Unlock rules
- Time-based access

---

## Development Guidelines

### Code Organization

#### Backend Structure
```
BackEnd/
├── cmd/
│   └── main.go              # Entry point
├── internal/
│   ├── api/
│   │   └── routes/          # Route definitions
│   ├── config/              # Configuration
│   ├── database/            # Database connection
│   ├── handlers/            # HTTP handlers
│   │   ├── auth/
│   │   ├── course/
│   │   ├── user/
│   │   ├── progress/
│   │   └── student/
│   ├── middleware/          # Middleware functions
│   ├── models/              # Data models
│   ├── repositories/        # Database layer
│   ├── services/            # Business logic
│   └── utils/               # Helper functions
├── migrations/              # SQL migrations
├── .env                     # Environment variables
├── go.mod
└── go.sum
```

#### Frontend Structure
```
frontend/
├── src/
│   ├── api/                 # API client setup
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── common/          # Generic components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── tenant/
│   │   └── student/
│   ├── services/            # API service layer
│   ├── store/               # Zustand stores
│   ├── styles/              # Global styles
│   ├── types/               # TypeScript types
│   ├── utils/               # Helper functions
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── public/
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Naming Conventions

#### Backend (Go)
```go
// Files: snake_case
user_repository.go
course_service.go

// Types: PascalCase
type User struct { ... }
type CourseService struct { ... }

// Functions: PascalCase (exported), camelCase (private)
func CreateUser() { ... }
func validateEmail() { ... }

// Variables: camelCase
var userID uuid.UUID
var courseTitle string

// Constants: PascalCase or UPPER_SNAKE_CASE
const MaxRetries = 3
const DEFAULT_PAGE_SIZE = 20
```

#### Frontend (TypeScript/React)
```typescript
// Files: PascalCase for components, camelCase for utils
UserCard.tsx
CourseList.tsx
apiClient.ts
formatDate.ts

// Components: PascalCase
const UserCard: React.FC = () => { ... }

// Hooks: camelCase starting with 'use'
const useAuth = () => { ... }

// Functions: camelCase
const handleSubmit = () => { ... }

// Variables: camelCase
const userName = 'John'
const isLoading = false

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://...'
const MAX_FILE_SIZE = 5_000_000

// Types/Interfaces: PascalCase
interface User { ... }
type CourseStatus = 'draft' | 'published'

// CSS Modules: camelCase
.userCard { ... }
.primaryButton { ... }
```

### Git Workflow

```bash
# Branch naming
feature/user-authentication
bugfix/course-creation-error
hotfix/security-vulnerability
refactor/database-queries

# Commit messages (Conventional Commits)
feat: add course enrollment API
fix: resolve UUID conversion error in progress handler
docs: update API documentation
style: format code with prettier
refactor: extract auth logic to service layer
test: add unit tests for user repository
chore: update dependencies

# Example workflow
git checkout -b feature/course-player
# ... make changes ...
git add .
git commit -m "feat: implement course player with progress tracking"
git push origin feature/course-player
# Create pull request
```

### Code Review Checklist

#### Backend
- [ ] No SQL injection vulnerabilities
- [ ] Proper error handling
- [ ] Tenant isolation enforced
- [ ] UUID type safety (handle both string and uuid.UUID)
- [ ] Input validation
- [ ] Logging added
- [ ] Performance optimized (N+1 queries avoided)
- [ ] Database indexes exist
- [ ] Transactions used where needed
- [ ] Tests written

#### Frontend
- [ ] TypeScript types defined
- [ ] Error boundaries implemented
- [ ] Loading states handled
- [ ] Dark mode supported
- [ ] Mobile responsive
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Performance optimized (memo, useCallback)
- [ ] API calls use React Query
- [ ] Forms validated with Zod
- [ ] No console.log statements

### Testing Strategy

```bash
# Backend testing (not fully implemented yet)
go test ./...

# Test files: *_test.go
user_repository_test.go
course_service_test.go

# Frontend testing (not fully implemented yet)
npm run test

# Test files: *.test.tsx
UserCard.test.tsx
useAuth.test.ts
```

### Performance Guidelines

#### Backend
1. **Database Optimization**
   ```go
   // Bad: N+1 query problem
   for _, enrollment := range enrollments {
       course := courseRepo.FindByID(enrollment.CourseID)
   }

   // Good: Single query with JOIN
   SELECT e.*, c.title FROM enrollments e
   JOIN courses c ON e.course_id = c.id
   ```

2. **Pagination**
   ```go
   // Always paginate large datasets
   func ListCourses(page, limit int) { ... }
   ```

3. **Caching** (Future)
   ```go
   // Cache frequently accessed data
   cache.Set("course:"+id, course, 5*time.Minute)
   ```

#### Frontend
1. **React Query Caching**
   ```typescript
   // Cache API responses
   useQuery({
     queryKey: ['course', id],
     queryFn: () => courseService.getCourse(id),
     staleTime: 5 * 60 * 1000, // 5 minutes
   })
   ```

2. **Code Splitting**
   ```typescript
   // Lazy load routes
   const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
   ```

3. **Memoization**
   ```typescript
   // Expensive calculations
   const sortedCourses = useMemo(
     () => courses.sort((a, b) => a.title.localeCompare(b.title)),
     [courses]
   )
   ```

---

## Security Considerations

### 1. Authentication & Authorization

```go
// ✅ ALWAYS validate JWT tokens
middleware.AuthRequired(cfg, db)

// ✅ ALWAYS check user permissions
if user.UserType != "tenant_admin" {
    return fiber.StatusForbidden
}

// ✅ NEVER trust client input
if err := utils.ValidateStruct(&req); err != nil {
    return fiber.StatusBadRequest
}
```

### 2. Tenant Isolation

```go
// ✅ ALWAYS filter by organization_id
WHERE course_id = $1 AND organization_id = $2 AND deleted_at IS NULL

// ❌ NEVER query without org filter (except super_admin)
WHERE course_id = $1 -- DANGEROUS!

// ✅ Use tenant context middleware
middleware.TenantContext()
orgID := c.Locals("orgID")
```

### 3. SQL Injection Prevention

```go
// ✅ ALWAYS use parameterized queries
db.QueryRow("SELECT * FROM users WHERE id = $1", userID)

// ❌ NEVER concatenate SQL strings
db.QueryRow("SELECT * FROM users WHERE id = " + userID) // DANGEROUS!
```

### 4. XSS Prevention

```typescript
// ✅ React escapes by default
<div>{userInput}</div> // Safe

// ⚠️ Be careful with dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

// ✅ Sanitize HTML before rendering
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirty)
```

### 5. Password Security

```go
// ✅ ALWAYS hash passwords
hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

// ❌ NEVER store plain text passwords
user.Password = password // DANGEROUS!

// ✅ Use strong password requirements
- Minimum 8 characters
- At least 1 uppercase
- At least 1 lowercase
- At least 1 number
- At least 1 special character
```

### 6. CORS Configuration

```go
// ✅ Restrict allowed origins
app.Use(cors.New(cors.Config{
    AllowOrigins: "http://localhost:5173",
    AllowHeaders: "Origin, Content-Type, Accept, Authorization",
}))

// ❌ NEVER use wildcard in production
AllowOrigins: "*" // DANGEROUS!
```

### 7. Rate Limiting (Future)

```go
// ✅ Implement rate limiting
app.Use(limiter.New(limiter.Config{
    Max: 100,
    Expiration: 1 * time.Minute,
}))
```

### 8. File Upload Security (Future)

```go
// ✅ Validate file types
allowedTypes := []string{"image/jpeg", "image/png", "application/pdf"}

// ✅ Limit file size
maxSize := 10 * 1024 * 1024 // 10MB

// ✅ Sanitize filenames
filename = regexp.MustCompile(`[^a-zA-Z0-9._-]`).ReplaceAllString(filename, "")

// ✅ Scan for viruses (ClamAV)
```

### 9. Environment Variables

```bash
# ✅ NEVER commit .env files
.env should be in .gitignore

# ✅ Use strong secrets
JWT_SECRET=<generate with: openssl rand -base64 32>

# ✅ Different secrets per environment
JWT_SECRET_DEV=...
JWT_SECRET_PROD=...
```

### 10. UUID Type Safety

```go
// ✅ ALWAYS handle both string and UUID from context
func extractUUID(c *fiber.Ctx, key string) (uuid.UUID, error) {
    raw := c.Locals(key)
    switch v := raw.(type) {
    case uuid.UUID:
        return v, nil
    case string:
        return uuid.Parse(v)
    default:
        return uuid.UUID{}, fmt.Errorf("invalid type")
    }
}

// ✅ Use the helper
userID, err := extractUUID(c, "userID")
```

---

## Common Pitfalls & Solutions

### 1. UUID String vs UUID Type

**Problem:**
```
PANIC/ERROR: interface conversion: interface {} is string, not uuid.UUID
```

**Solution:**
```go
// Use the extractUUID helper everywhere
userID, err := extractUUID(c, "userID")
orgID, err := extractUUID(c, "orgID")
```

### 2. React Query invalidateQueries Syntax

**Problem:**
```typescript
// Old syntax (doesn't work in newer versions)
queryClient.invalidateQueries(['course', id])
```

**Solution:**
```typescript
// New syntax
queryClient.invalidateQueries({ queryKey: ['course', id] })
```

### 3. Go Optional Types in Frontend

**Problem:**
```typescript
// Backend returns: { String: "value", Valid: true }
<p>{lesson.description}</p> // Error!
```

**Solution:**
```typescript
// Check if it's an optional type
{lesson.description && typeof lesson.description === 'object' && 'Valid' in lesson.description
  ? lesson.description.Valid && <p>{lesson.description.String}</p>
  : lesson.description && <p>{lesson.description as string}</p>
}
```

### 4. JSONB Type in Go

**Problem:**
```go
LastPosition: make(map[string]interface{}), // Error!
```

**Solution:**
```go
emptyMap := make(map[string]interface{})
LastPosition: models.NewJSONB(emptyMap),
```

### 5. Tenant Isolation

**Problem:**
```sql
-- Missing org filter - returns data from all tenants!
SELECT * FROM courses WHERE id = $1
```

**Solution:**
```sql
-- Always include organization_id
SELECT * FROM courses WHERE id = $1 AND organization_id = $2
```

### 6. Soft Deletes

**Problem:**
```sql
-- Returns deleted records
SELECT * FROM courses WHERE id = $1
```

**Solution:**
```sql
-- Filter out deleted records
SELECT * FROM courses WHERE id = $1 AND deleted_at IS NULL
```

---

## Deployment

### Environment Setup

#### Production Environment Variables

**Backend (.env)**
```bash
# Database
DB_HOST=production-db.example.com
DB_PORT=5432
DB_USER=lms_user
DB_PASSWORD=<strong-password>
DB_NAME=cyberfort_lms_prod
DB_SSL_MODE=require

# JWT
JWT_SECRET=<generate-with-openssl-rand-base64-32>
JWT_EXPIRY=24h

# Server
SERVER_PORT=8080
ALLOWED_ORIGINS=https://cyberfort.com,https://*.cyberfort.com

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-1
AWS_S3_BUCKET=cyberfort-lms-assets

# Email (SendGrid/AWS SES)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=<sendgrid-api-key>
FROM_EMAIL=noreply@cyberfort.com

# Monitoring
SENTRY_DSN=<sentry-dsn>
```

**Frontend (.env)**
```bash
VITE_API_URL=https://api.cyberfort.com/api/v1
VITE_APP_NAME=CyberFort LMS
VITE_ENVIRONMENT=production
```

### Docker Deployment

```dockerfile
# Backend Dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main cmd/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: cyberfort_lms
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./BackEnd
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: cyberfort_lms

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Database Migrations

```bash
# Run migrations on production
psql -h <prod-db-host> -U <user> -d <database> -f migrations/001_init.sql

# Or use migration tool (future)
migrate -path ./migrations -database "postgresql://..." up
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run backend tests
        run: |
          cd BackEnd
          go test ./...
      - name: Run frontend tests
        run: |
          cd frontend
          npm install
          npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Deploy script here
```

---

## Monitoring & Logging

### Backend Logging

```go
// Structured logging
log.Printf("[%s] %s - userID: %s, orgID: %s", 
    level, message, userID, orgID)

// Error tracking
fmt.Printf("[ERROR] Failed to create course: %v\n", err)
```

### Frontend Error Tracking

```typescript
// Sentry integration (future)
Sentry.captureException(error)

// Console logging
console.error('API Error:', error)
```

---

## Performance Metrics

### Backend
- Response time: < 200ms (average)
- Database query time: < 50ms (average)
- Concurrent requests: 1000+

### Frontend
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: 90+

---

## Support & Contribution

### Getting Help
- Check documentation
- Search existing issues
- Create new issue with:
  - Clear description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots/logs

### Contributing
1. Fork repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit pull request

---

## License

[Your License Here]

---

## Contact

- **Project Lead**: [Mohsin Manzoor Bhat]
- **Email**: [Your Email]
- **Website**: https://cyberfort.com

---

**Last Updated**: October 2025
**Version**: 1.0.0
**Status**: In Active Development 🚀