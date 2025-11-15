import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Tej India...\n');

  // 1. Create Skill Categories
  console.log('📚 Creating skill categories...');
  const categories = [
    {
      name: 'Programming & Development',
      slug: 'programming',
      description: 'Software development, coding, web development, and technical skills',
      icon: '💻',
      color: '#3b82f6',
      order: 1,
    },
    {
      name: 'Languages',
      slug: 'languages',
      description: 'Spoken and written language skills including English, Hindi, and foreign languages',
      icon: '🗣️',
      color: '#10b981',
      order: 2,
    },
    {
      name: 'Design & Creative',
      slug: 'design',
      description: 'Graphic design, video editing, photography, and creative arts',
      icon: '🎨',
      color: '#8b5cf6',
      order: 3,
    },
    {
      name: 'Business & Marketing',
      slug: 'business',
      description: 'Marketing, sales, entrepreneurship, and business development',
      icon: '📈',
      color: '#f59e0b',
      order: 4,
    },
    {
      name: 'Health & Fitness',
      slug: 'health',
      description: 'Yoga, gym training, nutrition, and wellness',
      icon: '💪',
      color: '#ef4444',
      order: 5,
    },
    {
      name: 'Music & Arts',
      slug: 'music',
      description: 'Musical instruments, singing, dancing, and performing arts',
      icon: '🎵',
      color: '#ec4899',
      order: 6,
    },
    {
      name: 'Finance & Investing',
      slug: 'finance',
      description: 'Stock market, cryptocurrency, personal finance, and investing',
      icon: '💰',
      color: '#14b8a6',
      order: 7,
    },
    {
      name: 'Academic & Test Prep',
      slug: 'academic',
      description: 'IELTS, GRE, GMAT, JEE, NEET, and other competitive exams',
      icon: '📖',
      color: '#6366f1',
      order: 8,
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.skillCategory.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      })
    )
  );
  console.log(`✅ Created ${createdCategories.length} skill categories\n`);

  // 2. Create Skills
  console.log('🎯 Creating skills...');
  const skills = [
    // Programming
    { name: 'Python Programming', slug: 'python', categorySlug: 'programming', popularity: 95, isPremium: false },
    { name: 'JavaScript', slug: 'javascript', categorySlug: 'programming', popularity: 92, isPremium: false },
    { name: 'Web Development', slug: 'web-dev', categorySlug: 'programming', popularity: 91, isPremium: false },
    { name: 'React.js', slug: 'reactjs', categorySlug: 'programming', popularity: 88, isPremium: false },
    { name: 'Node.js', slug: 'nodejs', categorySlug: 'programming', popularity: 85, isPremium: false },
    { name: 'Data Structures & Algorithms', slug: 'dsa', categorySlug: 'programming', popularity: 90, isPremium: true },
    { name: 'Machine Learning', slug: 'ml', categorySlug: 'programming', popularity: 87, isPremium: true },

    // Languages
    { name: 'English Speaking', slug: 'english-speaking', categorySlug: 'languages', popularity: 98, isPremium: false },
    { name: 'English Writing', slug: 'english-writing', categorySlug: 'languages', popularity: 85, isPremium: false },
    { name: 'Spanish', slug: 'spanish', categorySlug: 'languages', popularity: 75, isPremium: false },
    { name: 'French', slug: 'french', categorySlug: 'languages', popularity: 70, isPremium: false },
    { name: 'German', slug: 'german', categorySlug: 'languages', popularity: 68, isPremium: false },

    // Design
    { name: 'Graphic Design', slug: 'graphic-design', categorySlug: 'design', popularity: 88, isPremium: false },
    { name: 'Video Editing', slug: 'video-editing', categorySlug: 'design', popularity: 90, isPremium: false },
    { name: 'Adobe Photoshop', slug: 'photoshop', categorySlug: 'design', popularity: 86, isPremium: false },
    { name: 'Adobe Premiere Pro', slug: 'premiere', categorySlug: 'design', popularity: 84, isPremium: false },
    { name: 'Figma', slug: 'figma', categorySlug: 'design', popularity: 82, isPremium: false },
    { name: 'UI/UX Design', slug: 'ui-ux', categorySlug: 'design', popularity: 89, isPremium: true },

    // Business
    { name: 'Digital Marketing', slug: 'digital-marketing', categorySlug: 'business', popularity: 92, isPremium: false },
    { name: 'Social Media Marketing', slug: 'smm', categorySlug: 'business', popularity: 88, isPremium: false },
    { name: 'SEO', slug: 'seo', categorySlug: 'business', popularity: 85, isPremium: false },
    { name: 'Content Writing', slug: 'content-writing', categorySlug: 'business', popularity: 83, isPremium: false },
    { name: 'Excel & Data Analysis', slug: 'excel', categorySlug: 'business', popularity: 87, isPremium: false },

    // Health
    { name: 'Yoga', slug: 'yoga', categorySlug: 'health', popularity: 80, isPremium: false },
    { name: 'Gym Training', slug: 'gym', categorySlug: 'health', popularity: 78, isPremium: false },
    { name: 'Nutrition & Diet Planning', slug: 'nutrition', categorySlug: 'health', popularity: 75, isPremium: false },

    // Music
    { name: 'Guitar', slug: 'guitar', categorySlug: 'music', popularity: 85, isPremium: false },
    { name: 'Piano', slug: 'piano', categorySlug: 'music', popularity: 82, isPremium: false },
    { name: 'Singing', slug: 'singing', categorySlug: 'music', popularity: 84, isPremium: false },
    { name: 'Dancing', slug: 'dancing', categorySlug: 'music', popularity: 80, isPremium: false },

    // Finance
    { name: 'Stock Market Trading', slug: 'stock-trading', categorySlug: 'finance', popularity: 88, isPremium: true },
    { name: 'Cryptocurrency', slug: 'crypto', categorySlug: 'finance', popularity: 82, isPremium: true },
    { name: 'Personal Finance', slug: 'personal-finance', categorySlug: 'finance', popularity: 79, isPremium: false },

    // Academic
    { name: 'IELTS Preparation', slug: 'ielts', categorySlug: 'academic', popularity: 90, isPremium: true },
    { name: 'GRE Preparation', slug: 'gre', categorySlug: 'academic', popularity: 85, isPremium: true },
    { name: 'Mathematics Tutoring', slug: 'math-tutor', categorySlug: 'academic', popularity: 87, isPremium: false },
    { name: 'Resume Writing', slug: 'resume', categorySlug: 'business', popularity: 86, isPremium: false },
  ];

  for (const skill of skills) {
    const category = createdCategories.find(c => c.slug === skill.categorySlug);
    if (category) {
      await prisma.skill.upsert({
        where: { slug: skill.slug },
        update: {},
        create: {
          name: skill.name,
          slug: skill.slug,
          categoryId: category.categoryId,
          popularity: skill.popularity,
          isPremium: skill.isPremium,
        },
      });
    }
  }
  console.log(`✅ Created ${skills.length} skills\n`);

  // 3. Create Badges
  console.log('🏆 Creating badges...');
  const badges = [
    {
      name: 'First Swap',
      slug: 'first-swap',
      description: 'Complete your first skill swap successfully',
      icon: '🎯',
      category: 'ACHIEVEMENT',
      rarity: 'COMMON',
      skillCoins: 10,
      requirement: JSON.stringify({ completedSwaps: 1 }),
    },
    {
      name: 'Fast Learner',
      slug: 'fast-learner',
      description: 'Complete a swap in less than 2 weeks',
      icon: '⚡',
      category: 'ACHIEVEMENT',
      rarity: 'RARE',
      skillCoins: 25,
      requirement: JSON.stringify({ swapDurationDays: 14 }),
    },
    {
      name: 'Skill Master',
      slug: 'skill-master',
      description: 'Teach for 100+ hours',
      icon: '🎖️',
      category: 'TEACHING',
      rarity: 'EPIC',
      skillCoins: 100,
      requirement: JSON.stringify({ totalHoursTaught: 100 }),
    },
    {
      name: 'Learning Beast',
      slug: 'learning-beast',
      description: 'Learn 10 different skills',
      icon: '🔥',
      category: 'LEARNING',
      rarity: 'EPIC',
      skillCoins: 75,
      requirement: JSON.stringify({ uniqueSkillsLearned: 10 }),
    },
    {
      name: 'Trusted Teacher',
      slug: 'trusted-teacher',
      description: 'Receive 50+ five-star ratings',
      icon: '💎',
      category: 'TEACHING',
      rarity: 'LEGENDARY',
      skillCoins: 150,
      requirement: JSON.stringify({ fiveStarRatings: 50 }),
    },
    {
      name: 'Community Hero',
      slug: 'community-hero',
      description: 'Help 100+ people through skill swaps',
      icon: '🌟',
      category: 'COMMUNITY',
      rarity: 'LEGENDARY',
      skillCoins: 200,
      requirement: JSON.stringify({ completedSwaps: 100 }),
    },
    {
      name: 'Early Adopter',
      slug: 'early-adopter',
      description: 'One of the first 1000 users on Tej India',
      icon: '🚀',
      category: 'SPECIAL',
      rarity: 'RARE',
      skillCoins: 50,
      requirement: JSON.stringify({ userNumber: 1000 }),
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: badge,
    });
  }
  console.log(`✅ Created ${badges.length} badges\n`);

  // 4. Create Test Users
  console.log('👥 Creating test users...');
  const passwordHash = await bcrypt.hash('password123', 12);

  const testUsers = [
    {
      email: 'rahul@tejindia.com',
      firstName: 'Rahul',
      lastName: 'Sharma',
      city: 'Bangalore',
      state: 'Karnataka',
      phoneNumber: '+919876543210',
      skillCoins: 50,
      gender: 'MALE',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      email: 'priya@tejindia.com',
      firstName: 'Priya',
      lastName: 'Desai',
      city: 'Bangalore',
      state: 'Karnataka',
      phoneNumber: '+919876543211',
      skillCoins: 75,
      gender: 'FEMALE',
      latitude: 12.9352,
      longitude: 77.6245,
    },
    {
      email: 'arjun@tejindia.com',
      firstName: 'Arjun',
      lastName: 'Patel',
      city: 'Pune',
      state: 'Maharashtra',
      phoneNumber: '+919876543212',
      skillCoins: 30,
      gender: 'MALE',
      latitude: 18.5204,
      longitude: 73.8567,
    },
  ];

  for (const userData of testUsers) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        passwordHash,
        emailVerified: true,
      },
    });
  }
  console.log(`✅ Created ${testUsers.length} test users\n`);

  // 5. Add skills to users
  console.log('🎓 Adding skills to users...');
  const pythonSkill = await prisma.skill.findUnique({ where: { slug: 'python' } });
  const excelSkill = await prisma.skill.findUnique({ where: { slug: 'excel' } });
  const englishSkill = await prisma.skill.findUnique({ where: { slug: 'english-speaking' } });
  const guitarSkill = await prisma.skill.findUnique({ where: { slug: 'guitar' } });

  const rahul = await prisma.user.findUnique({ where: { email: 'rahul@tejindia.com' } });
  const priya = await prisma.user.findUnique({ where: { email: 'priya@tejindia.com' } });

  if (rahul && pythonSkill && excelSkill && englishSkill) {
    // Rahul can teach Python and Excel
    await prisma.userSkill.create({
      data: {
        userId: rahul.id,
        skillId: pythonSkill.skillId,
        skillType: 'TEACH',
        proficiency: 'INTERMEDIATE',
        hoursExperience: 200,
        verified: true,
      },
    });

    await prisma.userSkill.create({
      data: {
        userId: rahul.id,
        skillId: excelSkill.skillId,
        skillType: 'TEACH',
        proficiency: 'EXPERT',
        hoursExperience: 500,
        verified: true,
      },
    });

    // Rahul wants to learn English
    await prisma.userSkill.create({
      data: {
        userId: rahul.id,
        skillId: englishSkill.skillId,
        skillType: 'LEARN',
        proficiency: 'BEGINNER',
      },
    });
  }

  if (priya && englishSkill && excelSkill) {
    // Priya can teach English
    await prisma.userSkill.create({
      data: {
        userId: priya.id,
        skillId: englishSkill.skillId,
        skillType: 'TEACH',
        proficiency: 'EXPERT',
        hoursExperience: 300,
        verified: true,
      },
    });

    // Priya wants to learn Excel
    await prisma.userSkill.create({
      data: {
        userId: priya.id,
        skillId: excelSkill.skillId,
        skillType: 'LEARN',
        proficiency: 'BEGINNER',
      },
    });
  }
  console.log('✅ Added skills to users\n');

  console.log('');
  console.log('🎉 ========================================');
  console.log('🎉 DATABASE SEEDING COMPLETE!');
  console.log('🎉 ========================================');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${createdCategories.length} Skill Categories`);
  console.log(`   - ${skills.length} Skills`);
  console.log(`   - ${badges.length} Badges`);
  console.log(`   - ${testUsers.length} Test Users`);
  console.log('');
  console.log('🔐 Test Login Credentials:');
  console.log('   Email: rahul@tejindia.com');
  console.log('   Email: priya@tejindia.com');
  console.log('   Email: arjun@tejindia.com');
  console.log('   Password: password123');
  console.log('');
  console.log('🚀 You can now start the application!');
  console.log('');
}

main()
  .catch((e) => {
    console.error('');
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
