#!/bin/bash

echo "🚀 SETTING UP SKILLSWAP INDIA..."
echo "================================"
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

# 1. Update package names
echo "📦 Updating package names..."
cd backend
npm pkg set name="skillswap-backend"
npm pkg set description="SkillSwap India - Peer-to-peer skill exchange platform"
cd ..

cd frontend
npm pkg set name="skillswap-frontend"
npm pkg set description="SkillSwap India - Frontend application"
cd ..

echo "✅ Package names updated!"
echo ""

# 2. Install new dependencies
echo "📦 Installing new backend dependencies..."
cd backend
npm install --save \
  bcrypt \
  @types/bcrypt

echo "✅ Backend dependencies installed!"
echo ""

# 3. Create new directory structure
echo "📁 Creating new directories..."
cd src

mkdir -p ai
mkdir -p notifications
mkdir -p analytics
mkdir -p lib

cd ../..

cd frontend/src
mkdir -p hooks
mkdir -p contexts
mkdir -p pages

cd ../..

echo "✅ Directories created!"
echo ""

# 4. Update environment file
echo "📝 Creating new .env.example..."
cd backend

cat > .env.example << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=4000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skillswap_india
DIRECT_URL=postgresql://postgres:postgres@localhost:5432/skillswap_india

# Redis
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Frontend URL
FRONTEND_URL=http://localhost:5173
EOF

cp .env.example .env

echo "✅ Environment file created!"
echo ""

cd ..

echo "🎉 SKILLSWAP INDIA SETUP COMPLETE!"
echo "=================================="
echo ""
echo "📋 What was done:"
echo "  ✅ Updated package names"
echo "  ✅ Installed dependencies"
echo "  ✅ Created new directory structure"
echo "  ✅ Created environment file"
echo ""
echo "🚀 Next Steps:"
echo "  1. Update Prisma schema"
echo "  2. Run: cd backend && npx prisma generate"
echo "  3. Run: cd backend && npx prisma migrate dev --name init_skillswap"
echo "  4. Run: cd backend && npx prisma db seed"
echo "  5. Start backend: cd backend && npm run dev"
echo "  6. Start frontend: cd frontend && npm run dev"
echo ""
