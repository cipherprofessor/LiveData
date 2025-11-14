/**
 * Database Connection Test Script
 *
 * This script tests the database connection and displays configuration info.
 * Run with: node scripts/test-db-connection.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('🔍 Testing Database Connection...\n');
  console.log('📋 Configuration:');
  console.log('   DATABASE_URL:', process.env.DATABASE_URL || '(not set)');
  console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');
  console.log('');

  try {
    // Test basic connection
    console.log('⏳ Attempting to connect to database...');
    await prisma.$connect();
    console.log('✅ Successfully connected to PostgreSQL!');
    console.log('');

    // Test query execution
    console.log('⏳ Testing database query...');
    const result = await prisma.$queryRaw`SELECT version() as version`;
    console.log('✅ Database query successful!');
    console.log('   PostgreSQL Version:', result[0]?.version);
    console.log('');

    // Check if tables exist
    console.log('⏳ Checking database schema...');
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    if (tables.length === 0) {
      console.log('⚠️  No tables found in database.');
      console.log('   Run migrations with: npx prisma migrate dev');
    } else {
      console.log('✅ Found', tables.length, 'table(s) in database:');
      tables.forEach(t => console.log('   -', t.table_name));
    }
    console.log('');

    // Test each model if tables exist
    if (tables.length > 0) {
      console.log('⏳ Testing Prisma models...');

      try {
        const userCount = await prisma.user.count();
        console.log('   ✅ Users table:', userCount, 'records');
      } catch (e) {
        console.log('   ❌ Users table: Error -', e.message);
      }

      try {
        const fileCount = await prisma.file.count();
        console.log('   ✅ Files table:', fileCount, 'records');
      } catch (e) {
        console.log('   ❌ Files table: Error -', e.message);
      }

      try {
        const shareCount = await prisma.share.count();
        console.log('   ✅ Shares table:', shareCount, 'records');
      } catch (e) {
        console.log('   ❌ Shares table: Error -', e.message);
      }

      try {
        const conversionCount = await prisma.conversion.count();
        console.log('   ✅ Conversions table:', conversionCount, 'records');
      } catch (e) {
        console.log('   ❌ Conversions table: Error -', e.message);
      }

      try {
        const auditLogCount = await prisma.auditLog.count();
        console.log('   ✅ AuditLogs table:', auditLogCount, 'records');
      } catch (e) {
        console.log('   ❌ AuditLogs table: Error -', e.message);
      }
    }

    console.log('');
    console.log('🎉 Database connection test completed successfully!');
    return true;

  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('');
    console.error('Error details:');
    console.error('   Code:', error.code || 'N/A');
    console.error('   Message:', error.message);
    console.error('');

    if (error.code === 'P1001') {
      console.error('💡 Troubleshooting:');
      console.error('   1. Make sure PostgreSQL is running');
      console.error('   2. Check if the connection details in .env are correct');
      console.error('   3. Start with Docker: docker-compose up -d');
      console.error('   4. Or install PostgreSQL manually');
    }

    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
