# Prisma Accelerate Setup Guide

This guide helps you configure LiveData with Prisma Accelerate for connection pooling and edge caching.

---

## What is Prisma Accelerate?

Prisma Accelerate provides:
- **Connection Pooling** - Efficiently manage database connections
- **Edge Caching** - Cache query results at the edge for faster response times
- **Global Distribution** - Serve database queries from locations close to your users

---

## Configuration Required

Prisma Accelerate requires **TWO database URLs**:

### 1. DATABASE_URL (Runtime Queries) ✅ Already Configured

```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
```

**Purpose:** Used by your application at runtime for all database queries
**Status:** ✅ Already set in `.env` file

### 2. DIRECT_URL (Migrations) ⚠️ **ACTION REQUIRED**

```env
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

**Purpose:** Direct PostgreSQL connection required for running migrations
**Status:** ⚠️ **You need to add this**

---

## How to Get Your DIRECT_URL

### Step 1: Log into Prisma Cloud

Go to [https://cloud.prisma.io](https://cloud.prisma.io)

### Step 2: Navigate to Your Project

1. Select your project
2. Go to **Database** tab
3. Find **Connection URL** or **Direct Connection URL**

### Step 3: Copy the Direct Connection String

It will look like one of these:

**Neon (Serverless Postgres):**
```env
postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Supabase:**
```env
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres?sslmode=require
```

**Railway:**
```env
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway?sslmode=require
```

**AWS RDS:**
```env
postgresql://username:password@database.123456.us-east-1.rds.amazonaws.com:5432/dbname?sslmode=require
```

### Step 4: Update .env File

Open `backend/.env` and replace the placeholder:

```env
# Replace this:
DIRECT_URL="postgresql://postgres:password@your-direct-host.com:5432/your-database?sslmode=require"

# With your actual URL:
DIRECT_URL="postgresql://actual-user:actual-password@actual-host:5432/actual-db?sslmode=require"
```

---

## Running Migrations

Once you've added DIRECT_URL:

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Push schema to database (creates tables)
npx prisma db push

# Or run migration (recommended for production)
npm run prisma:migrate

# Open Prisma Studio to view data
npm run prisma:studio
```

---

## Verify Setup

### Test 1: Check Environment Variables

```bash
cd backend
cat .env | grep -E "(DATABASE_URL|DIRECT_URL)"
```

You should see BOTH URLs configured.

### Test 2: Generate Prisma Client

```bash
npm run prisma:generate
```

Expected output:
```
✔ Generated Prisma Client (v6.19.0) to ./node_modules/@prisma/client in 126ms
```

### Test 3: Push Schema to Database

```bash
npx prisma db push --accept-data-loss
```

Expected output:
```
✔ Your database is now in sync with your schema.
```

### Test 4: View Database

```bash
npm run prisma:studio
```

Opens browser at `http://localhost:5555` showing all tables.

---

## Troubleshooting

### Error: "Can't reach database server"

**Problem:** DIRECT_URL is not set or incorrect

**Solution:**
1. Check `.env` has `DIRECT_URL` configured
2. Verify connection string is correct
3. Test connection manually: `psql $DIRECT_URL`

### Error: "Environment variable not found: DIRECT_URL"

**Problem:** DIRECT_URL not in `.env` file

**Solution:**
Add this line to `backend/.env`:
```env
DIRECT_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### Error: "Authentication failed"

**Problem:** Incorrect username or password in DIRECT_URL

**Solution:**
1. Go to Prisma Cloud dashboard
2. Verify database credentials
3. Reset password if needed
4. Update DIRECT_URL with new credentials

### Error: "SSL connection required"

**Problem:** Missing `?sslmode=require` in DIRECT_URL

**Solution:**
Add `?sslmode=require` to end of DIRECT_URL:
```env
DIRECT_URL="postgresql://user:password@host:5432/db?sslmode=require"
```

---

## Architecture

```
┌─────────────────┐
│   Your App      │
│  (Runtime)      │
└────────┬────────┘
         │
         │ DATABASE_URL (Accelerate)
         │
         ▼
┌─────────────────────────┐
│  Prisma Accelerate      │
│  - Connection Pooling   │
│  - Edge Caching         │
│  - Global Distribution  │
└────────┬────────────────┘
         │
         │ Direct Connection
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Database)    │
└─────────────────┘

┌─────────────────┐
│  Prisma CLI     │
│  (Migrations)   │
└────────┬────────┘
         │
         │ DIRECT_URL
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Database)    │
└─────────────────┘
```

**Key Points:**
- Runtime queries use DATABASE_URL (through Accelerate)
- Migrations use DIRECT_URL (bypass Accelerate)
- Both connect to the same PostgreSQL database

---

## Benefits of Prisma Accelerate

### Connection Pooling

- Prevents database connection exhaustion
- Handles thousands of concurrent requests
- Automatically scales connections

### Edge Caching

- Cache frequent queries at edge locations
- Reduce database load by 80-90%
- Sub-millisecond response times

### Global Distribution

- Serve queries from nearest edge location
- Reduce latency for users worldwide
- 300+ edge locations globally

---

## Next Steps

After configuring DIRECT_URL:

1. ✅ Run `npm run prisma:generate`
2. ✅ Run `npx prisma db push`
3. ✅ Verify tables created with `npm run prisma:studio`
4. ✅ Start backend with `npm run dev`
5. ✅ Test API with `curl http://localhost:4000/health`

---

## Production Deployment

### Environment Variables

For production, set both variables in your hosting platform:

**Vercel:**
```bash
vercel env add DATABASE_URL
vercel env add DIRECT_URL
```

**Railway:**
```bash
railway variables set DATABASE_URL="prisma+postgres://..."
railway variables set DIRECT_URL="postgresql://..."
```

**Heroku:**
```bash
heroku config:set DATABASE_URL="prisma+postgres://..."
heroku config:set DIRECT_URL="postgresql://..."
```

### Run Migrations in Production

```bash
npm run prisma:migrate:deploy
```

This uses DIRECT_URL to apply migrations safely.

---

## Security Best Practices

1. **Never commit .env file** - Already in .gitignore ✅
2. **Use strong passwords** - 32+ characters
3. **Enable SSL** - Always use `?sslmode=require`
4. **Rotate API keys regularly** - Every 90 days
5. **Use environment-specific keys** - Different for dev/staging/prod

---

## Cost Optimization

Prisma Accelerate pricing is based on:
- Number of queries per month
- Cache hit ratio
- Data transfer

**Tips to reduce costs:**
- Enable caching for read-heavy operations
- Use `cacheStrategy` in queries
- Optimize query patterns
- Monitor cache hit rates in dashboard

---

## Support & Resources

- **Prisma Accelerate Docs:** https://www.prisma.io/docs/accelerate
- **Dashboard:** https://cloud.prisma.io
- **Community:** https://www.prisma.io/community
- **Support:** support@prisma.io

---

**Last Updated:** 2025-01-14
**Status:** ⚠️ Awaiting DIRECT_URL configuration
