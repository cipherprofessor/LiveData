# SkillSwap India - Complete Transformation Guide

## 🎯 Overview

This document explains how to transform the LiveData project into SkillSwap India - a peer-to-peer skill exchange platform.

## 📋 Transformation Steps

### Step 1: Run Cleanup Script

```bash
bash scripts/cleanup-livedata.sh
```

This will:
- Delete old file management routes
- Remove storage-related code
- Clean up file schemas
- Create backup of important files

### Step 2: Run Setup Script

```bash
bash scripts/setup-skillswap.sh
```

This will:
- Update package names
- Install new dependencies
- Create new directory structure
- Set up environment files

### Step 3: Update Prisma Schema

```bash
cd backend

# Replace the schema
cp prisma/schema-skillswap.prisma prisma/schema.prisma

# Generate Prisma client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init_skillswap
```

### Step 4: Create Seed Data

Create `backend/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Skill Categories
  const categories = [
    {
      name: 'Programming & Development',
      slug: 'programming',
      description: 'Software development, coding, and technical skills',
      icon: '💻',
      color: '#3B82F6',
    },
    {
      name: 'Languages',
      slug: 'languages',
      description: 'Spoken and written language skills',
      icon: '🗣️',
      color: '#10B981',
    },
    {
      name: 'Design & Creative',
      slug: 'design',
      description: 'Graphic design, video editing, and creative arts',
      icon: '🎨',
      color: '#8B5CF6',
    },
    {
      name: 'Business & Marketing',
      slug: 'business',
      description: 'Marketing, sales, entrepreneurship',
      icon: '📈',
      color: '#F59E0B',
    },
  ];

  console.log('Creating skill categories...');
  const createdCategories = await Promise.all(
    categories.map((category, index) =>
      prisma.skillCategory.create({
        data: { ...category, order: index + 1 },
      })
    )
  );
  console.log(`✅ Created ${createdCategories.length} skill categories`);

  // 2. Create Skills
  const programmingCategory = createdCategories[0];
  const languagesCategory = createdCategories[1];

  const skills = [
    // Programming
    {
      name: 'Python Programming',
      slug: 'python-programming',
      categoryId: programmingCategory.categoryId,
      popularity: 95,
    },
    {
      name: 'JavaScript',
      slug: 'javascript',
      categoryId: programmingCategory.categoryId,
      popularity: 92,
    },
    {
      name: 'Web Development',
      slug: 'web-development',
      categoryId: programmingCategory.categoryId,
      popularity: 91,
    },
    // Languages
    {
      name: 'English Speaking',
      slug: 'english-speaking',
      categoryId: languagesCategory.categoryId,
      popularity: 98,
    },
    {
      name: 'Spanish',
      slug: 'spanish',
      categoryId: languagesCategory.categoryId,
      popularity: 75,
    },
  ];

  console.log('Creating skills...');
  const createdSkills = await Promise.all(
    skills.map((skill) => prisma.skill.create({ data: skill }))
  );
  console.log(`✅ Created ${createdSkills.length} skills`);

  // 3. Create Badges
  const badges = [
    {
      name: 'First Swap',
      slug: 'first-swap',
      description: 'Complete your first skill swap',
      icon: '🎯',
      category: 'ACHIEVEMENT',
      rarity: 'COMMON',
      skillCoins: 10,
      requirement: JSON.stringify({ completedSwaps: 1 }),
    },
    {
      name: 'Skill Master',
      slug: 'skill-master',
      description: 'Teach for 100+ hours',
      icon: '🏆',
      category: 'TEACHING',
      rarity: 'EPIC',
      skillCoins: 100,
      requirement: JSON.stringify({ totalHoursTaught: 100 }),
    },
  ];

  console.log('Creating badges...');
  const createdBadges = await Promise.all(
    badges.map((badge) => prisma.badge.create({ data: badge }))
  );
  console.log(`✅ Created ${createdBadges.length} badges`);

  // 4. Create Test User
  const passwordHash = await bcrypt.hash('password123', 12);
  const testUser = await prisma.user.create({
    data: {
      email: 'test@skillswap.in',
      passwordHash,
      firstName: 'Test',
      lastName: 'User',
      city: 'Bangalore',
      state: 'Karnataka',
      phoneNumber: '+919876543210',
      skillCoins: 50,
    },
  });
  console.log(`✅ Created test user: ${testUser.email}`);

  console.log('');
  console.log('🎉 SEEDING COMPLETE!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `backend/package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Run the seed:

```bash
npm install --save-dev ts-node
npx prisma db seed
```

### Step 5: Start Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🗂️ New File Structure

```
LiveData/ (now SkillSwap India)
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   │   └── matcher.ts          # AI matching algorithm
│   │   ├── lib/
│   │   │   └── utils.ts            # Utility functions
│   │   ├── schemas/
│   │   │   ├── skills.ts           # Skill validation
│   │   │   └── swaps.ts            # Swap validation
│   │   └── server/routes/v1/modules/
│   │       ├── skills.ts           # Skills API (to be created)
│   │       ├── matching.ts         # Matching API (to be created)
│   │       └── swaps.ts            # Swaps API (to be created)
│   └── prisma/
│       ├── schema.prisma           # Updated schema
│       └── seed.ts                 # Seed data
├── frontend/
│   └── src/
│       └── pages/
│           └── LandingPage.tsx     # New landing page (to be created)
└── scripts/
    ├── cleanup-livedata.sh         # ✅ Created
    └── setup-skillswap.sh          # ✅ Created
```

## 📝 Files Created

✅ `scripts/cleanup-livedata.sh`
✅ `scripts/setup-skillswap.sh`
✅ `backend/prisma/schema-skillswap.prisma`
✅ `backend/src/lib/utils.ts`
✅ `backend/src/ai/matcher.ts`
✅ `backend/src/schemas/skills.ts`
✅ `backend/src/schemas/swaps.ts`

## 🚧 Files To Create Next

The following files need to be created to complete the transformation:

### Backend Routes (High Priority)

1. **`backend/src/server/routes/v1/modules/skills.ts`**
   - GET /skills/categories
   - GET /skills
   - POST /skills/add
   - PUT /skills/:userSkillId
   - DELETE /skills/:userSkillId
   - GET /skills/recommendations

2. **`backend/src/server/routes/v1/modules/matching.ts`**
   - GET /matches
   - GET /matches/:matchUserId

3. **`backend/src/server/routes/v1/modules/swaps.ts`**
   - POST /swaps
   - GET /swaps
   - GET /swaps/:swapId
   - PUT /swaps/:swapId
   - POST /swaps/:swapId/sessions/:sessionId/complete
   - POST /swaps/:swapId/review

4. **`backend/src/server/routes/v1/modules/chat.ts`**
   - POST /chat/send
   - GET /chat/:userId
   - GET /chat/conversations

5. **Update `backend/src/server/routes/v1/index.ts`**
   - Import and register new routes

### Frontend Pages (High Priority)

1. **`frontend/src/App.tsx`** - Main app with routing
2. **`frontend/src/pages/LandingPage.tsx`** - Landing page
3. **`frontend/src/pages/DashboardPage.tsx`** - User dashboard
4. **`frontend/src/pages/DiscoverPage.tsx`** - Find matches
5. **`frontend/src/pages/SwapsPage.tsx`** - Active swaps
6. **`frontend/src/services/api.service.ts`** - API client

## 🧪 Testing the Transformation

1. **Test Backend**:
```bash
cd backend
npm run dev

# Test health endpoint
curl http://localhost:4000/health

# Test skills endpoint (after creating route)
curl http://localhost:4000/api/v1/skills/categories
```

2. **Test Frontend**:
```bash
cd frontend
npm run dev

# Visit http://localhost:5173
```

## 🎯 Next Implementation Steps

### Immediate (Day 1)

1. Create backend route files:
   - `skills.ts`
   - `matching.ts`
   - `swaps.ts`

2. Update `backend/src/server/routes/v1/index.ts`

3. Test backend APIs with Postman/curl

### Short-term (Day 2-3)

1. Create frontend `App.tsx` with routing
2. Create `LandingPage.tsx`
3. Create `DashboardPage.tsx`
4. Test user flows

### Medium-term (Week 1)

1. Add chat functionality
2. Add notifications
3. Add gamification features
4. Polish UI/UX

## 📚 Database Schema Changes

### Removed Models:
- File
- Share
- Conversion

### Added Models:
- Skill & SkillCategory
- UserSkill
- Swap & SwapSession
- Review
- Connection
- Message
- Badge & UserBadge
- Notification
- AuditLog

## 🔄 Core Concept Change

**Before (LiveData):**
- Users upload files
- Files are encrypted and stored
- Files can be shared via links

**After (SkillSwap India):**
- Users add skills they can teach/learn
- AI matches users with complementary skills
- Users exchange skills through swaps
- Gamification rewards learning & teaching

## 🚀 Business Model

### Free Tier:
- 2 active swaps/month
- Basic matching
- Community access

### Premium (₹299/month):
- Unlimited swaps
- Priority matching
- Video calls
- Background verification

### B2B:
- Corporate skill-sharing platforms
- ₹15,000-50,000/month

## 💡 Key Features

1. **AI Matching**: Smart algorithm matches users based on skills, location, ratings
2. **Gamification**: SkillCoins, badges, levels, leaderboards
3. **Verification**: Skill verification through quizzes
4. **Flexibility**: Online & offline meetups
5. **Safety**: Reviews, ratings, verified profiles

## ⚠️ Important Notes

- Keep the cleanup backup in `.backup/` directory
- Test thoroughly before deleting old code
- Update CLAUDE.md after transformation
- Document any custom changes

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review CLAUDE.md
3. Check backend logs: `cd backend && npm run dev`
4. Check Prisma Studio: `cd backend && npx prisma studio`

---

**Transformation Status**: 60% Complete
**Remaining**: Backend routes + Frontend pages + Testing
