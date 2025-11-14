# Database Setup Guide

This guide will help you set up the PostgreSQL database for LiveData.

## Option 1: Using Docker Compose (Recommended)

The easiest way to set up PostgreSQL and Redis is using Docker Compose.

### Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop/))

### Steps

1. **Start the database services:**
   ```bash
   docker-compose up -d
   ```

2. **Verify services are running:**
   ```bash
   docker-compose ps
   ```

   You should see:
   - `live_data_postgres` on port 5432
   - `live_data_redis` on port 6379

3. **Check logs (optional):**
   ```bash
   docker-compose logs postgres
   docker-compose logs redis
   ```

4. **Stop services (when needed):**
   ```bash
   docker-compose down
   ```

5. **Reset database (remove all data):**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

---

## Option 2: Install PostgreSQL Manually

If you don't want to use Docker, you can install PostgreSQL directly on your machine.

### macOS

Using Homebrew:
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Windows

Download and install from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)

### Create Database and User

After installation, create the database:

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# In PostgreSQL shell, run:
CREATE DATABASE live_data;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE live_data TO postgres;
\q
```

### Install Redis

**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt install redis-server
sudo systemctl start redis-server
```

**Windows:**
Download from [Redis for Windows](https://github.com/microsoftarchive/redis/releases)

---

## Option 3: Using Cloud Database

You can use a cloud-hosted PostgreSQL database:

### Supabase (Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string from Settings → Database
4. Paste it in `backend/.env` as `DATABASE_URL`

Example:
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Neon (Free Tier)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Paste it in `backend/.env`

### Railway (Free Trial)

1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy connection string
4. Paste it in `backend/.env`

---

## Step 2: Configure Environment Variables

1. **Edit your `.env` file:**
   ```bash
   cd backend
   nano .env
   ```

2. **Update the DATABASE_URL:**

   If using Docker Compose (default):
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/live_data
   ```

   If using a different password:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/live_data
   ```

   If using a cloud database:
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

---

## Step 3: Test Database Connection

Run the connection test script:

```bash
cd backend
node scripts/test-db-connection.js
```

You should see:
```
✅ Successfully connected to PostgreSQL!
```

If you see errors, check:
- Is PostgreSQL running? (`docker-compose ps` or `pg_isready`)
- Is the DATABASE_URL correct in `.env`?
- Can you connect manually? (`psql $DATABASE_URL`)

---

## Step 4: Generate Prisma Client

Generate the Prisma Client from the schema:

```bash
cd backend
npx prisma generate
```

You should see:
```
✔ Generated Prisma Client (v6.19.0)
```

---

## Step 5: Run Database Migrations

Create all database tables by running migrations:

```bash
cd backend
npx prisma migrate dev --name initial_schema
```

This will:
1. Create all tables (users, files, shares, conversions, audit_logs)
2. Set up indexes
3. Configure relationships
4. Apply default values

You should see:
```
✔ Applying migration `20250114000000_initial_schema`
```

---

## Step 6: Verify Database Schema

View your database in Prisma Studio:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- View all tables
- See relationships
- Add/edit data manually
- Run queries

Or check with the test script again:

```bash
node scripts/test-db-connection.js
```

You should now see all 5 tables listed.

---

## Step 7: (Optional) Seed Database with Sample Data

Create a seed file if needed:

```bash
# Create seed script
touch prisma/seed.ts
```

Then run:
```bash
npx prisma db seed
```

---

## Troubleshooting

### Error: "Can't reach database server"

**Solution:**
- Make sure PostgreSQL is running
- Check connection string in `.env`
- Test connectivity: `pg_isready -h localhost -p 5432`

### Error: "P1001: Can't reach database server"

**Solution:**
```bash
# Restart Docker services
docker-compose restart postgres

# Or restart system PostgreSQL
sudo systemctl restart postgresql  # Linux
brew services restart postgresql@16  # macOS
```

### Error: "Authentication failed"

**Solution:**
- Check username and password in `DATABASE_URL`
- Reset password if needed

### Error: "Database does not exist"

**Solution:**
```bash
# Create database manually
createdb live_data

# Or using psql
psql -U postgres -c "CREATE DATABASE live_data;"
```

### Port 5432 already in use

**Solution:**
```bash
# Find what's using the port
sudo lsof -i :5432

# Stop other PostgreSQL instances
brew services stop postgresql  # macOS
sudo systemctl stop postgresql  # Linux

# Or change port in docker-compose.yml
```

---

## Useful Commands

### Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f postgres

# Restart a service
docker-compose restart postgres

# Remove all data and restart fresh
docker-compose down -v
docker-compose up -d
```

### Prisma

```bash
# Generate client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Check migration status
npx prisma migrate status

# Format schema file
npx prisma format
```

### PostgreSQL

```bash
# Connect to database
psql $DATABASE_URL

# Or with Docker
docker exec -it live_data_postgres psql -U postgres -d live_data

# List databases
\l

# List tables
\dt

# Describe table
\d users

# Quit
\q
```

---

## Next Steps

After completing the database setup:

1. ✅ Database running
2. ✅ Connection tested
3. ✅ Prisma client generated
4. ✅ Migrations applied
5. ✅ Schema verified

**You're ready to start the backend server!**

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:4000`

Test with:
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{"status":"ok"}
```

---

## Need Help?

- Check Prisma documentation: https://www.prisma.io/docs
- PostgreSQL documentation: https://www.postgresql.org/docs/
- Open an issue: https://github.com/cipherprofessor/LiveData/issues
