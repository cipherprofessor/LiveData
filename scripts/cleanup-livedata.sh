#!/bin/bash

echo "🗑️  CLEANING UP LIVEDATA FILES..."
echo "=================================="
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

# Backend files to delete
echo "📁 Deleting backend files..."

# Delete file management routes
rm -f backend/src/server/routes/v1/modules/files.ts
rm -f backend/src/server/routes/v1/modules/shares.ts
rm -f backend/src/server/routes/v1/modules/conversions.ts

# Delete file-related schemas
rm -f backend/src/schemas/files.ts
rm -f backend/src/schemas/shares.ts
rm -f backend/src/schemas/conversions.ts

# Delete storage logic
rm -rf backend/src/storage/
rm -rf backend/src/security/
rm -rf backend/src/conversion/

# Delete config files not needed
rm -f backend/src/config/storage.ts

# Delete old Prisma migrations
rm -rf backend/prisma/migrations/

echo "✅ Backend cleanup complete!"
echo ""

# Frontend files to delete
echo "📁 Deleting frontend files..."

# Delete old App.tsx (will be rewritten)
rm -f frontend/src/App.tsx

echo "✅ Frontend cleanup complete!"
echo ""

# Create backup of important files
echo "💾 Creating backup of important files..."
mkdir -p .backup/
cp backend/src/config/env.ts .backup/ 2>/dev/null || true
cp backend/prisma/schema.prisma .backup/ 2>/dev/null || true
cp backend/package.json .backup/ 2>/dev/null || true
cp frontend/package.json .backup/ 2>/dev/null || true

echo "✅ Backup created in .backup/ folder"
echo ""

echo "🎉 CLEANUP COMPLETE!"
echo "==================="
echo ""
echo "Next steps:"
echo "1. Review deleted files"
echo "2. Run: bash scripts/setup-skillswap.sh"
echo ""
