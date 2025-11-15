# SkillSwap India 🔄

> **India's First Peer-to-Peer Skill Exchange Platform**
> *सीखो और सिखाओ - Learn & Teach, Trade Skills Not Money*

A revolutionary platform connecting Indian youth to exchange skills for free through AI-powered matching and gamified learning experiences.

---

## 🌟 The Problem We're Solving

**India's Youth Skill Crisis:**
- 83% of engineering graduates are unemployable (NASSCOM)
- Upskilling courses cost ₹15,000-50,000
- 60% of youth earn less than ₹25,000/month
- Total affected: **2 Crore+ youth** graduate yearly with no job-ready skills

**Current "Solutions" are Failing:**
- Online courses: Too expensive (₹5K-30K)
- Offline coaching: Even more expensive (₹10K-50K)
- YouTube: No structure, feedback, or accountability

---

## 💡 The SkillSwap Solution

**Trade Skills, Not Money**

You teach what you know → Learn what you need → Zero rupees spent!

### How It Works

1. **Create Profile** - Add skills you can teach and want to learn (2 minutes)
2. **Get Matched** - AI finds perfect partners who teach what you need
3. **Schedule Swap** - Connect and plan sessions (online or offline)
4. **Learn & Teach** - Exchange knowledge, earn badges & SkillCoins

---

## 🚀 Core Features

### ✅ Implemented
- **User Authentication** - JWT-based with bcrypt
- **Basic Infrastructure** - Express + TypeScript + PostgreSQL
- **AI Matching Algorithm** - Smart pairing based on 5 factors
- **Database Schema** - 14 models (User, Skill, Swap, Badge, etc.)

### 🚧 In Development (60% Complete)
- **Skills Management** - Add/remove skills, verify expertise
- **Skill Swaps** - Request, accept, track sessions
- **Gamification** - SkillCoins, badges, levels, leaderboards
- **Messaging** - Real-time chat with swap partners
- **Reviews & Ratings** - Build reputation through swaps

### 📋 Planned (Phase 2)
- Mobile apps (iOS & Android)
- Video calling integration
- Offline event meetups
- Premium features
- Corporate B2B platform

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL 16 (via Prisma ORM)
- **Cache:** Redis 7
- **Auth:** JWT + Bcrypt
- **Validation:** Zod schemas

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling:** SCSS/CSS
- **HTTP Client:** Axios

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Deployment:** AWS/DigitalOcean (planned)

---

## 📦 Quick Start

### Prerequisites

```bash
Node.js 20+
PostgreSQL 16+
Redis 7+
npm 10+
```

### Installation

```bash
# 1. Clone repository
git clone https://github.com/cipherprofessor/LiveData.git
cd LiveData

# 2. Start infrastructure services
docker-compose up -d

# 3. Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration

# 4. Database setup
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# 5. Frontend setup
cd ../frontend
npm install

# 6. Start development servers
# Terminal 1 - Backend (port 4000)
cd backend && npm run dev

# Terminal 2 - Frontend (port 5173)
cd frontend && npm run dev
```

Visit `http://localhost:5173` to see the app!

---

## 🎯 API Endpoints

### Authentication
```
POST   /api/v1/auth/register      # Register new user
POST   /api/v1/auth/login         # Login user
```

### Skills (Coming Soon)
```
GET    /api/v1/skills/categories  # List skill categories
GET    /api/v1/skills              # List all skills
POST   /api/v1/skills/add          # Add skill to profile
```

### Matching (Coming Soon)
```
GET    /api/v1/matches             # Get matched users
```

### Swaps (Coming Soon)
```
POST   /api/v1/swaps               # Create swap request
GET    /api/v1/swaps               # List user's swaps
```

---

## 💰 Business Model

### Free Tier
- 2 active swaps/month
- **₹0/month**

### Premium
- Unlimited swaps
- **₹299/month**

### B2B Corporate
- Internal skill-sharing platforms
- **₹15,000-50,000/month**

---

## 🗺️ Roadmap

### Phase 1: MVP (Current - 60% Complete)
- [x] Core infrastructure
- [x] Database schema
- [x] AI matching algorithm
- [ ] Skills management API
- [ ] Swap creation & tracking

### Phase 2: Enhanced Features (Months 1-3)
- [ ] Real-time chat
- [ ] Push notifications
- [ ] Video calling

### Phase 3: Scale (Months 4-6)
- [ ] Mobile apps
- [ ] Payment integration
- [ ] Corporate B2B portal

---

## 🌟 Transformation Status

**LiveData → SkillSwap India: 60% Complete**

This platform was transformed from LiveData (file storage) to SkillSwap India (skill exchange).

**See transformation documentation:**
- `SKILLSWAP_TRANSFORMATION.md` - Complete guide
- `TRANSFORMATION_README.md` - Quick reference

---

## 🎉 Vision

**Empower 5 Crore Indian youth to learn skills for free by 2028**

**Made with ❤️ in India**

**Version:** 1.0.0-MVP (In Development)
**Last Updated:** 2025-11-15
