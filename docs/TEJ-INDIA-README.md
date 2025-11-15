# Tej India 🔄

## India's First Peer-to-Peer Skill Exchange Platform

**"सीखो और सिखाओ - Trade Skills, Not Money"**

---

## 🌟 Project Overview

Tej India is a revolutionary peer-to-peer skill exchange platform that enables users to trade skills instead of money. Built with modern technologies and PostgreSQL database, it provides a seamless experience for Indians to learn and teach skills without spending money!

### 🎯 The Problem We Solve

- **83%** of Indian engineering graduates are unemployable (NASSCOM)
- **60%** youth earn <₹25,000/month but need expensive upskilling
- **Skills are expensive**: English speaking (₹15,000), Digital marketing (₹30,000), Video editing (₹20,000)

### 💡 Our Solution

A platform where:
- 🎓 Engineering student knows coding → Needs English speaking
- 📊 MBA student knows marketing → Needs coding basics
- 🎨 Designer knows Photoshop → Needs fitness training
- **Everyone wins without spending money!**

---

## 🏗️ Technical Architecture

### Technology Stack

#### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: **PostgreSQL 15+** with Prisma ORM
- **Cache**: Redis 7+
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.IO for chat
- **File Storage**: AWS S3 / Cloudinary
- **Email**: SendGrid / NodeMailer
- **Queue**: Bull (Redis-based)

#### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand + React Query
- **UI Library**: **Glass Morphism Design System** (from your existing project)
- **Styling**: SCSS Modules + Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Maps**: Google Maps API (location matching)
- **Charts**: Recharts

#### Database (PostgreSQL)
- **Version**: PostgreSQL 15+
- **ORM**: Prisma 5+
- **Features**:
  - Row-level security
  - Full-text search
  - JSONB for flexible data
  - Geospatial queries (PostGIS)
  - Connection pooling

#### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (production)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Logging**: Winston + ELK Stack

---

## 📊 Database Schema (PostgreSQL + Prisma)

### Core Models

```prisma
// User Management
model User {
  id                String       @id @default(uuid())
  email             String       @unique
  passwordHash      String
  firstName         String
  lastName          String
  phoneNumber       String?      @unique
  dateOfBirth       DateTime?
  gender            Gender?
  profileImage      String?
  bio               String?      @db.Text
  city              String?
  state             String?
  country           String       @default("India")
  pincode           String?
  latitude          Decimal?     @db.Decimal(10, 8)
  longitude         Decimal?     @db.Decimal(11, 8)

  // Gamification
  skillCoins        Int          @default(0)
  swapsCompleted    Int          @default(0)
  totalHoursTaught  Int          @default(0)
  totalHoursLearned Int          @default(0)
  rating            Decimal      @default(0) @db.Decimal(3, 2)
  totalRatings      Int          @default(0)

  // Premium
  isPremium         Boolean      @default(false)
  premiumExpiresAt  DateTime?

  // Verification
  emailVerified     Boolean      @default(false)
  phoneVerified     Boolean      @default(false)

  // Relations
  skillsToTeach     UserSkill[]  @relation("TeacherSkills")
  skillsToLearn     UserSkill[]  @relation("LearnerSkills")
  swapsAsUser1      Swap[]       @relation("User1Swaps")
  swapsAsUser2      Swap[]       @relation("User2Swaps")
  badges            UserBadge[]
  reviewsReceived   Review[]     @relation("ReviewsReceived")
  reviewsGiven      Review[]     @relation("ReviewsGiven")
  sentMessages      Message[]    @relation("SentMessages")
  receivedMessages  Message[]    @relation("ReceivedMessages")
  connections       Connection[] @relation("UserConnections")
  connectedBy       Connection[] @relation("ConnectedUsers")
  eventsCreated     Event[]      @relation("EventOrganizer")
  eventAttendances  EventAttendance[]
  notifications     Notification[]

  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt

  @@index([email])
  @@index([city, state])
  @@index([latitude, longitude])
}

enum Gender {
  MALE
  FEMALE
  OTHER
  PREFER_NOT_TO_SAY
}

// Skills & Categories
model SkillCategory {
  categoryId    String    @id @default(uuid())
  name          String    @unique
  slug          String    @unique
  description   String?   @db.Text
  icon          String?
  color         String?
  order         Int       @default(0)

  skills        Skill[]

  createdAt     DateTime  @default(now())

  @@index([slug])
}

model Skill {
  skillId       String         @id @default(uuid())
  name          String         @unique
  slug          String         @unique
  description   String?        @db.Text
  category      SkillCategory  @relation(fields: [categoryId], references: [categoryId])
  categoryId    String
  isPremium     Boolean        @default(false)
  popularity    Int            @default(0)

  userSkills    UserSkill[]

  createdAt     DateTime       @default(now())

  @@index([slug])
  @@index([categoryId])
  @@index([popularity])
}

model UserSkill {
  userSkillId     String           @id @default(uuid())
  user            User             @relation("TeacherSkills", fields: [userId], references: [id], name: "TeacherSkillsRelation")
  userId          String
  skill           Skill            @relation(fields: [skillId], references: [skillId])
  skillId         String
  skillType       SkillType
  proficiency     ProficiencyLevel @default(BEGINNER)
  hoursExperience Int?
  verified        Boolean          @default(false)
  verifiedAt      DateTime?

  createdAt       DateTime         @default(now())

  @@unique([userId, skillId, skillType])
  @@index([userId, skillType])
}

enum SkillType {
  TEACH
  LEARN
}

enum ProficiencyLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
  MASTER
}

// Swaps & Sessions
model Swap {
  swapId              String        @id @default(uuid())

  user1               User          @relation("User1Swaps", fields: [user1Id], references: [id])
  user1Id             String
  skill1Name          String        // Skill user1 teaches

  user2               User          @relation("User2Swaps", fields: [user2Id], references: [id])
  user2Id             String
  skill2Name          String        // Skill user2 teaches

  status              SwapStatus    @default(PENDING)

  startDate           DateTime?
  endDate             DateTime?
  sessionsPlanned     Int           @default(8)
  sessionsCompleted   Int           @default(0)
  hoursPlanned        Int           @default(8)
  hoursCompleted      Int           @default(0)

  meetingMode         MeetingMode   @default(HYBRID)
  meetingLocation     String?       @db.Text

  user1Rating         Decimal?      @db.Decimal(3, 2)
  user2Rating         Decimal?      @db.Decimal(3, 2)
  user1Review         String?       @db.Text
  user2Review         String?       @db.Text

  sessions            SwapSession[]

  createdAt           DateTime      @default(now())
  updatedAt           DateTime      @updatedAt

  @@index([user1Id, status])
  @@index([user2Id, status])
  @@index([status])
}

enum SwapStatus {
  PENDING
  ACCEPTED
  ACTIVE
  COMPLETED
  CANCELLED
  DISPUTED
}

enum MeetingMode {
  ONLINE
  OFFLINE
  HYBRID
}

model SwapSession {
  sessionId     String    @id @default(uuid())
  swap          Swap      @relation(fields: [swapId], references: [swapId], onDelete: Cascade)
  swapId        String
  sessionNumber Int
  sessionDate   DateTime
  duration      Int       // in minutes
  completed     Boolean   @default(false)
  notes         String?   @db.Text

  createdAt     DateTime  @default(now())
  completedAt   DateTime?

  @@index([swapId])
}

// Gamification
model Badge {
  badgeId       String      @id @default(uuid())
  name          String      @unique
  slug          String      @unique
  description   String      @db.Text
  icon          String
  category      BadgeCategory
  rarity        BadgeRarity @default(COMMON)
  skillCoins    Int         @default(0)
  requirement   Json        // Store complex requirements as JSON

  users         UserBadge[]

  createdAt     DateTime    @default(now())

  @@index([category])
  @@index([rarity])
}

enum BadgeCategory {
  ACHIEVEMENT
  TEACHING
  LEARNING
  COMMUNITY
  MILESTONE
  SPECIAL
}

enum BadgeRarity {
  COMMON
  RARE
  EPIC
  LEGENDARY
}

model UserBadge {
  userBadgeId   String   @id @default(uuid())
  user          User     @relation(fields: [userId], references: [id])
  userId        String
  badge         Badge    @relation(fields: [badgeId], references: [badgeId])
  badgeId       String
  earnedAt      DateTime @default(now())

  @@unique([userId, badgeId])
  @@index([userId])
}

// Reviews & Ratings
model Review {
  reviewId      String   @id @default(uuid())
  reviewer      User     @relation("ReviewsGiven", fields: [reviewerId], references: [id])
  reviewerId    String
  reviewee      User     @relation("ReviewsReceived", fields: [revieweeId], references: [id])
  revieweeId    String
  swapId        String?
  rating        Int      // 1-5 stars
  comment       String?  @db.Text
  helpful       Int      @default(0)

  createdAt     DateTime @default(now())

  @@index([revieweeId])
  @@index([reviewerId])
}

// Connections & Chat
model Connection {
  connectionId  String           @id @default(uuid())
  user          User             @relation("UserConnections", fields: [userId], references: [id])
  userId        String
  connectedUser User             @relation("ConnectedUsers", fields: [connectedUserId], references: [id])
  connectedUserId String
  status        ConnectionStatus @default(PENDING)

  createdAt     DateTime         @default(now())
  acceptedAt    DateTime?

  @@unique([userId, connectedUserId])
  @@index([userId, status])
}

enum ConnectionStatus {
  PENDING
  ACCEPTED
  REJECTED
  BLOCKED
}

model Message {
  messageId     String      @id @default(uuid())
  sender        User        @relation("SentMessages", fields: [senderId], references: [id])
  senderId      String
  recipient     User        @relation("ReceivedMessages", fields: [recipientId], references: [id])
  recipientId   String
  content       String      @db.Text
  read          Boolean     @default(false)
  readAt        DateTime?

  createdAt     DateTime    @default(now())

  @@index([senderId, recipientId])
  @@index([recipientId, read])
}

// Events
model Event {
  eventId       String            @id @default(uuid())
  organizer     User              @relation("EventOrganizer", fields: [organizerId], references: [id])
  organizerId   String
  title         String
  description   String            @db.Text
  date          DateTime
  location      String
  city          String
  state         String?
  latitude      Decimal?          @db.Decimal(10, 8)
  longitude     Decimal?          @db.Decimal(11, 8)
  maxAttendees  Int               @default(50)
  imageUrl      String?

  attendances   EventAttendance[]

  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  @@index([city])
  @@index([date])
}

model EventAttendance {
  attendanceId  String   @id @default(uuid())
  event         Event    @relation(fields: [eventId], references: [eventId], onDelete: Cascade)
  eventId       String
  user          User     @relation(fields: [userId], references: [id])
  userId        String
  status        AttendanceStatus @default(REGISTERED)

  registeredAt  DateTime @default(now())

  @@unique([eventId, userId])
  @@index([eventId])
}

enum AttendanceStatus {
  REGISTERED
  ATTENDED
  CANCELLED
}

// Notifications
model Notification {
  notificationId String           @id @default(uuid())
  user           User             @relation(fields: [userId], references: [id])
  userId         String
  type           NotificationType
  title          String
  message        String           @db.Text
  data           Json?            // Additional data as JSON
  read           Boolean          @default(false)
  readAt         DateTime?

  createdAt      DateTime         @default(now())

  @@index([userId, read])
  @@index([createdAt])
}

enum NotificationType {
  SWAP_REQUEST
  SWAP_ACCEPTED
  SWAP_COMPLETED
  MESSAGE
  BADGE_EARNED
  REVIEW
  EVENT_REMINDER
  SYSTEM
}

// Audit Logs
model AuditLog {
  logId         String   @id @default(uuid())
  userId        String?
  action        String
  entity        String
  entityId      String?
  changes       Json?
  ipAddress     String?
  userAgent     String?

  createdAt     DateTime @default(now())

  @@index([userId])
  @@index([entity, entityId])
  @@index([createdAt])
}
```

---

## 🎮 Core Features

### 1. Smart AI Matching Algorithm

```typescript
interface MatchCriteria {
  skillOverlap: number;      // 30% weight
  locationProximity: number; // 20% weight
  rating: number;            // 25% weight
  activityLevel: number;     // 15% weight
  availability: number;      // 10% weight
}

async function findMatches(userId: string): Promise<MatchedUser[]> {
  // PostgreSQL query with geospatial search
  const matches = await prisma.$queryRaw`
    SELECT u.*,
           ST_Distance(
             ST_MakePoint(${userLng}, ${userLat})::geography,
             ST_MakePoint(u.longitude, u.latitude)::geography
           ) / 1000 as distance_km
    FROM "User" u
    WHERE u.id != ${userId}
    AND EXISTS (
      SELECT 1 FROM "UserSkill" us1
      WHERE us1."userId" = u.id
      AND us1."skillType" = 'TEACH'
      AND us1."skillId" IN (
        SELECT us2."skillId" FROM "UserSkill" us2
        WHERE us2."userId" = ${userId}
        AND us2."skillType" = 'LEARN'
      )
    )
    ORDER BY distance_km ASC
    LIMIT 20
  `;

  return calculateMatchScores(matches);
}
```

### 2. Gamification System

#### SkillCoins
- Complete swap: **+10 coins**
- Get 5-star rating: **+5 bonus**
- Refer friend: **+20 coins**
- First swap of month: **+15 coins**
- Teach 100 hours: **+100 coins** 🏆

#### Spending SkillCoins
- Priority matching: **30 coins**
- Verified skill badge: **50 coins**
- Feature profile: **100 coins**
- Premium access: **150 coins**
- Amazon vouchers: **500 coins = ₹500**

#### Badges (Stored in PostgreSQL)
- 🎖️ **SKILL MASTER** - Taught 100+ hours
- 🔥 **LEARNING BEAST** - Learned 10+ skills
- ⚡ **FAST LEARNER** - Completed swap in 2 weeks
- 💎 **TRUSTED TEACHER** - 50+ 5-star ratings
- 🌟 **COMMUNITY HERO** - Helped 100+ people

### 3. Real-time Chat (Socket.IO + PostgreSQL)

```typescript
// Messages stored in PostgreSQL
io.on('connection', (socket) => {
  socket.on('send_message', async (data) => {
    const message = await prisma.message.create({
      data: {
        senderId: data.senderId,
        recipientId: data.recipientId,
        content: data.content
      }
    });

    io.to(data.recipientId).emit('new_message', message);
  });
});
```

---

## 🚀 API Endpoints

### Authentication
```
POST   /api/v1/auth/register         - Register new user
POST   /api/v1/auth/login            - Login user
POST   /api/v1/auth/refresh          - Refresh access token
POST   /api/v1/auth/logout           - Logout user
POST   /api/v1/auth/forgot-password  - Request password reset
POST   /api/v1/auth/reset-password   - Reset password
POST   /api/v1/auth/verify-email     - Verify email
```

### Skills
```
GET    /api/v1/skills                - List all skills
GET    /api/v1/skills/categories     - List categories
POST   /api/v1/users/skills/teach    - Add skill to teach
POST   /api/v1/users/skills/learn    - Add skill to learn
DELETE /api/v1/users/skills/:id      - Remove skill
POST   /api/v1/skills/verify         - Verify skill
```

### Matching (AI-Powered)
```
GET    /api/v1/matches               - Get matched users
GET    /api/v1/matches/:userId       - Get user details
POST   /api/v1/matches/:userId/connect - Send connection request
```

### Swaps
```
GET    /api/v1/swaps                 - List your swaps
POST   /api/v1/swaps                 - Create new swap
GET    /api/v1/swaps/:id             - Get swap details
PUT    /api/v1/swaps/:id             - Update swap
DELETE /api/v1/swaps/:id             - Cancel swap
POST   /api/v1/swaps/:id/sessions    - Add session
PUT    /api/v1/swaps/:id/sessions/:sessionId - Mark complete
POST   /api/v1/swaps/:id/complete    - Complete & review
```

### Gamification
```
GET    /api/v1/coins                 - Get coin balance
POST   /api/v1/coins/spend           - Spend coins
GET    /api/v1/badges                - Get earned badges
GET    /api/v1/leaderboard           - City/national leaderboard
```

### Events
```
GET    /api/v1/events                - List upcoming events
POST   /api/v1/events                - Create event
GET    /api/v1/events/:id            - Get event details
POST   /api/v1/events/:id/register   - Register for event
```

---

## 💰 Business Model

### 1. Freemium (₹299/month)

**FREE:**
- 2 active swaps/month
- Basic matching
- Community access

**PREMIUM:**
- ✅ Unlimited swaps
- ✅ Priority matching
- ✅ Video call integration
- ✅ Background verification
- ✅ Cancel without penalty

### 2. B2B Corporate (₹15,000-50,000/month)
- Internal skill swapping
- Team building
- Analytics dashboard

### 3. Premium Skills Commission (20%)
- IELTS/GRE Prep
- Stock Market Trading
- Users charge ₹200-500/hour

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- **PostgreSQL 15+**
- Redis 7+
- Docker (optional)

### Quick Start with Docker

```bash
# Clone repository
git clone <repo-url>
cd tej-india

# Start PostgreSQL & Redis using Docker
docker-compose up -d

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with PostgreSQL connection

# Run migrations
npx prisma migrate dev
npx prisma generate

# Seed database
npx prisma db seed

# Start backend
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Manual PostgreSQL Setup

```bash
# Install PostgreSQL 15
sudo apt install postgresql-15

# Create database
sudo -u postgres psql
CREATE DATABASE tej_india;
CREATE USER tej_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tej_india TO tej_user;

# Enable PostGIS extension (for location features)
\c tej_india
CREATE EXTENSION IF NOT EXISTS postgis;
\q
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://tej_user:your_password@localhost:5432/tej_india?schema=public"

# JWT
JWT_SECRET=your-super-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=7d

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# AWS S3 (for file uploads)
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=tej-india-uploads

# Google Maps (for location)
GOOGLE_MAPS_API_KEY=your-google-maps-key

# Frontend
VITE_API_URL=http://localhost:4000
```

---

## 📱 User Journey Example

### Priya's Story:

**Day 1:**
- Downloads app
- Adds: "I teach: Python, Excel" | "I need: English, Photography"
- **PostgreSQL** finds 15 matches using geospatial queries

**Day 2:**
- Matches with Rahul (2.3 km away)
- They chat via real-time messaging
- Schedule first meeting

**Week 4:**
- Swap completed! 8 hours each
- **PostgreSQL** updates: swapsCompleted++, skillCoins+10
- Both earn "First Swap" badge

**Month 6:**
- 100+ SkillCoins stored in PostgreSQL
- Learned 8 skills, made 12 friends
- Redeems ₹500 Amazon voucher

**Result: ₹0 spent, ₹2 Lakhs+ value gained! 🚀**

---

## 📊 PostgreSQL Performance Optimizations

### Indexes
```sql
-- User search
CREATE INDEX idx_users_location ON "User" USING GIST (
  ST_MakePoint(longitude::float, latitude::float)::geography
);

-- Skill matching
CREATE INDEX idx_user_skills_lookup ON "UserSkill" (
  "userId", "skillType", "skillId"
);

-- Full-text search on skills
CREATE INDEX idx_skills_fulltext ON "Skill" USING GIN (
  to_tsvector('english', name || ' ' || COALESCE(description, ''))
);

-- Leaderboard queries
CREATE INDEX idx_users_leaderboard ON "User" (
  "swapsCompleted" DESC,
  "totalHoursTaught" DESC,
  "rating" DESC
);
```

### Connection Pooling
```typescript
// backend/src/config/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'error', 'warn'],
});

// Connection pool settings in DATABASE_URL:
// ?connection_limit=20&pool_timeout=20
```

---

## 🎯 Revenue Projection

### Year 1
- 1 Lakh users
- 20,000 Premium @ ₹299/month = **₹71 Lakhs/month**
- 50 Corporate @ ₹25K/month = **₹12.5 Lakhs/month**
- **Total: ₹12 Crores/year**

### Year 3
- 50 Lakh users
- 5 Lakh Premium = **₹15 Cr/month**
- 1,000 Corporate = **₹2.5 Cr/month**
- **Total: ₹222 Crores/year 🚀**

---

## 🏆 Why Tej India Will Win

### vs Traditional Courses
| Feature | Traditional | Tej India |
|---------|------------|-----------|
| Cost | ₹5,000-30,000 | **₹0** |
| Interaction | Pre-recorded | **Live 1-on-1** |
| Completion | 3% | **70%+** |
| Networking | Zero | **Lifelong friends** |

### vs Competitors
- **Simbi (USA)**: Not in India
- **TimeRepublik (Switzerland)**: No Indian presence
- **SkillShare**: Paid (₹15,000/year)
- **We're the FIRST in India!** 🇮🇳

---

## 📞 Contact & Support

- **Email**: support@tejindia.com
- **Website**: https://tejindia.com
- **Instagram**: @tejindia
- **LinkedIn**: /company/tej-india

---

## 📝 License

Proprietary - Tej India © 2024

---

**"Trade Skills, Not Money - Your Skills Are Your Currency!"** 🚀🇮🇳

---

## Next Steps

1. ✅ PostgreSQL database configured
2. ✅ Prisma schema created
3. ⏳ Run migrations
4. ⏳ Seed database
5. ⏳ Build API endpoints
6. ⏳ Build frontend with Glass Morphism UI
7. ⏳ Deploy to production

**Ready to revolutionize skill learning in India!** 🔥
