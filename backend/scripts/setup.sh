#!/bin/bash

# LiveData Backend Setup Script
# This script automates the setup process for the LiveData backend

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        LiveData Backend Setup Script                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
echo "📋 Step 1: Checking environment configuration..."
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "   Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Please edit .env and add your DATABASE_URL${NC}"
    echo ""
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

# Check if DATABASE_URL is set
if grep -q "DATABASE_URL=postgresql://" .env; then
    echo -e "${GREEN}✅ DATABASE_URL is configured${NC}"
else
    echo -e "${RED}❌ DATABASE_URL is not configured properly${NC}"
    echo "   Please edit .env and set your DATABASE_URL"
    exit 1
fi

echo ""

# Install dependencies
echo "📦 Step 2: Installing dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi

echo ""

# Generate Prisma Client
echo "🔧 Step 3: Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"

echo ""

# Test database connection
echo "🔍 Step 4: Testing database connection..."
if node scripts/test-db-connection.js > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo -e "${YELLOW}⚠️  Please make sure:${NC}"
    echo "   1. PostgreSQL is running (try: docker-compose up -d)"
    echo "   2. DATABASE_URL in .env is correct"
    echo "   3. You can connect manually: psql \$DATABASE_URL"
    echo ""
    echo "   For detailed setup instructions, see SETUP_DATABASE.md"
    exit 1
fi

echo ""

# Run migrations
echo "🗄️  Step 5: Running database migrations..."
npx prisma migrate dev --name initial_schema
echo -e "${GREEN}✅ Database migrations completed${NC}"

echo ""

# Create storage directory
echo "📁 Step 6: Setting up storage directory..."
mkdir -p storage
echo -e "${GREEN}✅ Storage directory created${NC}"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🎉                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Review .env configuration (especially JWT_SECRET and SIGNING_SECRET)"
echo "  2. Start the development server:"
echo "     ${GREEN}npm run dev${NC}"
echo ""
echo "  3. Test the API:"
echo "     ${GREEN}curl http://localhost:4000/health${NC}"
echo ""
echo "  4. Open Prisma Studio (database GUI):"
echo "     ${GREEN}npm run prisma:studio${NC}"
echo ""
echo "For more information, see README.md"
echo ""
