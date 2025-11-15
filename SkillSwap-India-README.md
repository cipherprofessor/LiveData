# SkillSwap India 🔄

## India's First Peer-to-Peer Skill Exchange Platform

**"सीखो और सिखाओ - Trade Skills, Not Money"**

### 🌟 Project Overview

SkillSwap India is a revolutionary peer-to-peer skill exchange platform that enables users to trade skills instead of money. You teach what you know, learn what you need - Zero rupees spent!

### 🎯 The Problem

- 83% of Indian engineering graduates are unemployable (NASSCOM)
- 60% youth earn <₹25,000/month but need expensive upskilling
- English speaking course: ₹15,000 | Digital marketing: ₹30,000 | Video editing: ₹20,000

### 💡 The Solution

A platform where:
- Engineering student knows coding → Needs English speaking
- MBA student knows marketing → Needs coding basics
- Designer knows Photoshop → Needs fitness training
- Everyone wins without spending money!

---

## 🏗️ Technical Architecture

### Technology Stack

#### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15+ with Prisma ORM
- **Cache**: Redis 7+
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.IO
- **File Storage**: AWS S3 / Cloudinary
- **Email**: SendGrid / NodeMailer

#### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand + React Query
- **UI Library**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Maps**: Google Maps API (for location matching)

#### Infrastructure
- **Deployment**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry

---

## 📊 Database Schema

### Core Tables

#### Users
```prisma
model User {
  id                String       @id @default(uuid())
  email             String       @unique
  password          String
  firstName         String
  lastName          String
  phoneNumber       String?
  dateOfBirth       DateTime?
  gender            String?
  profileImage      String?
  bio               String?
  location          Location?
  skillCoins        Int          @default(0)
  swapsCompleted    Int          @default(0)
  rating            Float        @default(0)
  totalRatings      Int          @default(0)
  isPremium         Boolean      @default(false)
  premiumExpiresAt  DateTime?

  skillsToTeach     UserSkill[]  @relation("TeacherSkills")
  skillsToLearn     UserSkill[]  @relation("LearnerSkills")
  swapsAsUser1      Swap[]       @relation("User1Swaps")
  swapsAsUser2      Swap[]       @relation("User2Swaps")
  badges            UserBadge[]
  reviews           Review[]     @relation("ReviewsReceived")
  reviewsGiven      Review[]     @relation("ReviewsGiven")
  events            Event[]

  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}
```

#### Skills
```prisma
model Skill {
  id          String         @id @default(uuid())
  name        String         @unique
  description String?
  category    Category       @relation(fields: [categoryId], references: [id])
  categoryId  String
  icon        String?
  isPremium   Boolean        @default(false)
  popularity  Int            @default(0)

  userSkills  UserSkill[]

  createdAt   DateTime       @default(now())
}

model UserSkill {
  id              String   @id @default(uuid())
  user            User     @relation("TeacherSkills", fields: [userId], references: [id])
  userId          String
  skill           Skill    @relation(fields: [skillId], references: [id])
  skillId         String
  skillType       String   // "TEACH" or "LEARN"
  proficiency     String   // "BEGINNER", "INTERMEDIATE", "EXPERT", "MASTER"
  hoursExperience Int?
  verified        Boolean  @default(false)

  createdAt       DateTime @default(now())

  @@unique([userId, skillId, skillType])
}
```

#### Swaps
```prisma
model Swap {
  id                  String       @id @default(uuid())

  user1               User         @relation("User1Swaps", fields: [user1Id], references: [id])
  user1Id             String
  skill1              String       // Skill user1 teaches

  user2               User         @relation("User2Swaps", fields: [user2Id], references: [id])
  user2Id             String
  skill2              String       // Skill user2 teaches

  status              SwapStatus   @default(PENDING)

  startDate           DateTime?
  endDate             DateTime?
  sessionsPlanned     Int          @default(8)
  sessionsCompleted   Int          @default(0)
  hoursPlanned        Int          @default(8)
  hoursCompleted      Int          @default(0)

  meetingMode         String       // "ONLINE", "OFFLINE", "HYBRID"
  meetingLocation     String?

  user1Rating         Float?
  user2Rating         Float?
  user1Review         String?
  user2Review         String?

  sessions            SwapSession[]

  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt
}

enum SwapStatus {
  PENDING
  ACCEPTED
  ACTIVE
  COMPLETED
  CANCELLED
  DISPUTED
}

model SwapSession {
  id          String   @id @default(uuid())
  swap        Swap     @relation(fields: [swapId], references: [id])
  swapId      String
  sessionDate DateTime
  duration    Int      // in hours
  completed   Boolean  @default(false)
  notes       String?

  createdAt   DateTime @default(now())
}
```

#### Categories & Badges
```prisma
model Category {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  icon        String?
  color       String?

  skills      Skill[]

  createdAt   DateTime @default(now())
}

model Badge {
  id           String      @id @default(uuid())
  name         String      @unique
  description  String
  icon         String
  requirement  String      // "Complete 100 hours", "Teach 50 people"
  category     String      // "TEACHING", "LEARNING", "COMMUNITY"
  coinReward   Int         @default(0)

  users        UserBadge[]

  createdAt    DateTime    @default(now())
}

model UserBadge {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  badge     Badge    @relation(fields: [badgeId], references: [id])
  badgeId   String
  earnedAt  DateTime @default(now())

  @@unique([userId, badgeId])
}
```

#### Reviews & Locations
```prisma
model Review {
  id           String   @id @default(uuid())
  reviewer     User     @relation("ReviewsGiven", fields: [reviewerId], references: [id])
  reviewerId   String
  reviewee     User     @relation("ReviewsReceived", fields: [revieweeId], references: [id])
  revieweeId   String
  swapId       String?
  rating       Int      // 1-5 stars
  comment      String?

  createdAt    DateTime @default(now())
}

model Location {
  id          String   @id @default(uuid())
  user        User     @relation(fields: [userId], references: [id])
  userId      String   @unique
  city        String
  state       String
  country     String   @default("India")
  pincode     String?
  latitude    Float?
  longitude   Float?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Event {
  id             String   @id @default(uuid())
  organizer      User     @relation(fields: [organizerId], references: [id])
  organizerId    String
  title          String
  description    String
  date           DateTime
  location       String
  city           String
  maxAttendees   Int      @default(50)
  attendeeCount  Int      @default(0)
  imageUrl       String?

  createdAt      DateTime @default(now())
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

function calculateMatchScore(user: User, potentialMatch: User): number {
  let score = 0;

  // Skill overlap (30%)
  const skillMatch = countComplementarySkills(user, potentialMatch);
  score += skillMatch * 0.3;

  // Location proximity (20%)
  const distance = calculateDistance(user.location, potentialMatch.location);
  score += (10 - Math.min(distance, 10)) * 0.2;

  // Rating/reputation (25%)
  score += potentialMatch.rating * 0.25;

  // Activity level (15%)
  score += potentialMatch.swapsCompleted * 0.15;

  // Availability match (10%)
  const availabilityScore = checkCalendarOverlap(user, potentialMatch);
  score += availabilityScore * 0.1;

  return score;
}
```

### 2. Gamification System

#### SkillCoins
- Complete a swap: +10 coins
- Get 5-star rating: +5 bonus coins
- Refer a friend: +20 coins
- First swap of month: +15 coins
- Teach 100 hours: +100 coins (Gold Badge)

#### Spending SkillCoins
- Priority matching (30 coins)
- Verified skill badge (50 coins)
- Feature your profile (100 coins)
- Premium skills access (150 coins)
- Amazon vouchers (500 coins = ₹500)

#### Badges
- 🎖️ SKILL MASTER (Taught 100+ hours)
- 🔥 LEARNING BEAST (Learned 10+ skills)
- ⚡ FAST LEARNER (Completed swap in 2 weeks)
- 💎 TRUSTED TEACHER (50+ 5-star ratings)
- 🌟 COMMUNITY HERO (Helped 100+ people)

### 3. Leaderboards

- Top Teachers (Weekly/Monthly/All-time)
- Top Learners
- Top Cities
- Most Popular Skills

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
```

### User Profile
```
GET    /api/v1/users/me              - Get current user profile
PUT    /api/v1/users/me              - Update profile
GET    /api/v1/users/:id             - Get user by ID
POST   /api/v1/users/avatar          - Upload profile image
```

### Skills
```
GET    /api/v1/skills                - List all skills
GET    /api/v1/skills/categories     - List all categories
POST   /api/v1/users/skills/teach    - Add skill to teach
POST   /api/v1/users/skills/learn    - Add skill to learn
DELETE /api/v1/users/skills/:id      - Remove skill
POST   /api/v1/skills/verify         - Take verification quiz
```

### Matching
```
GET    /api/v1/matches               - Get matched users (AI-powered)
GET    /api/v1/matches/:userId       - Get specific user details
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
PUT    /api/v1/swaps/:id/sessions/:sessionId - Mark session complete
POST   /api/v1/swaps/:id/complete    - Complete swap and review
```

### Gamification
```
GET    /api/v1/coins                 - Get SkillCoin balance
POST   /api/v1/coins/spend           - Spend coins
GET    /api/v1/badges                - Get earned badges
GET    /api/v1/leaderboard           - Get leaderboard
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
- Unlimited swaps
- Priority matching
- Video call integration
- Background verification
- Cancel without penalty

### 2. B2B Corporate (₹15,000-50,000/month)
- Internal skill swapping
- Team building
- Analytics dashboard
- Custom skill trees

### 3. Premium Skills Commission (20%)
- IELTS/GRE Prep
- Stock Market Trading
- Professional Photography
Users charge ₹200-500/hour, platform takes 20%

### 4. Affiliate Partnerships
- Amazon (courses, books)
- Udemy (discount codes)
- Canon (cameras)

---

## 📱 User Journey Example

### Priya's Story:

**Day 1:**
- Downloads app
- Adds: "I teach: Python, Excel" | "I need: English, Photography"
- AI finds 15 matches

**Day 2:**
- Matches with Rahul (English teacher who needs Excel)
- They chat, schedule first meeting (Saturday, cafe)

**Week 1:**
- First session: Priya teaches Excel (2 hours)
- Rahul teaches English (2 hours)
- Both rate 5 stars, earn 5 SkillCoins

**Week 4:**
- Swap completed! 8 hours each
- Priya can speak confidently in English
- Rahul masters Excel
- Both earn "First Swap" badge + 10 coins

**Month 6:**
- Priya: 100+ SkillCoins
- Learned 8 skills, made 12 friends
- Redeems ₹500 Amazon voucher
- Gets job offer (mentioned SkillSwap in interview!)

**Result: ₹0 spent, ₹2 Lakhs+ value gained! 🚀**

---

## 🎯 Revenue Projection

### Year 1
- 1 Lakh users (Free)
- 20,000 Premium (₹299/month) = ₹71 Lakhs/month
- 50 Corporate (₹25K/month) = ₹12.5 Lakhs/month
- Premium Skills commission = ₹6 Lakhs/month
- **Total: ₹12 Crores/year**

### Year 3
- 50 Lakh users
- 5 Lakh Premium = ₹15 Cr/month
- 1,000 Corporate = ₹2.5 Cr/month
- **Total: ₹222 Crores/year 🚀**

---

## 🚀 Go-to-Market Strategy

### Phase 1: College Blitzkrieg (Month 1-3)
- Target 10 colleges in Bangalore
- 50 student ambassadors
- Campus events: "SkillSwap Weekend"
- **Goal: 10,000 users, 500 swaps**

### Phase 2: City Domination (Month 4-9)
- Bangalore, Pune, Hyderabad, Delhi, Mumbai
- Instagram influencers (10 × ₹50K)
- Offline meetups every weekend
- **Goal: 1 Lakh users, 10,000 swaps/month**

### Phase 3: National Explosion (Month 10-18)
- 50 cities across India
- TV ads during IPL
- Celebrity endorsement
- Government partnership (Skill India)
- **Goal: 10 Lakh users, 1 Lakh swaps/month**

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npx prisma migrate dev
npx prisma generate
npm run seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up -d
```

---

## 📊 Success Metrics

### Technical KPIs
- API Response Time: <200ms
- Page Load Time: <2s
- Uptime: 99.9%
- Error Rate: <1%

### Business KPIs
- Monthly Active Users: 1,000 (Year 1)
- Swap Completion Rate: 70%
- Customer Acquisition Cost: <₹100
- Premium Conversion: 20%
- Churn Rate: <10%

---

## 🏆 Competitive Advantage

### vs. Traditional Courses
- **Cost**: ₹0 vs ₹5,000-30,000
- **Interaction**: Live 1-on-1 vs Pre-recorded
- **Motivation**: High (you owe someone) vs Low (3% completion)
- **Networking**: Build lifelong connections vs Zero

### vs. Competitors
- Simbi (USA): Not in India, not localized
- TimeRepublik (Switzerland): No Indian presence
- SkillShare: Paid model (₹15,000/year)
- TaskRabbit: Physical tasks only

**We're the FIRST in India! 🇮🇳**

---

## 📞 Contact & Support

- **Email**: support@skillswapindia.com
- **Website**: https://skillswapindia.com
- **Instagram**: @skillswapindia
- **LinkedIn**: /company/skillswap-india

---

## 📝 License

Proprietary - SkillSwap India © 2024

---

**"Trade Skills, Not Money - Your Skills Are Your Currency!"** 🚀
