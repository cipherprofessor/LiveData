# 🚀 Tej India - Quick Start Guide

Get Tej India running on your machine in **5 minutes**!

---

## 📋 Prerequisites

Make sure you have these installed:

- ✅ **Node.js** 18+ ([Download](https://nodejs.org/))
- ✅ **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- ✅ **Git** ([Download](https://git-scm.com/))

---

## 🎯 Option 1: Quick Start with Docker (Recommended)

### Step 1: Clone & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd LiveData

# Start PostgreSQL and Redis
docker-compose up -d

# Wait for containers to be healthy (about 30 seconds)
docker-compose ps
```

### Step 2: Backend Setup

```bash
# Navigate to backend (you'll create this structure)
mkdir -p backend
cd backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install @prisma/client prisma bcrypt express cors dotenv
npm install -D typescript @types/node @types/express @types/bcrypt ts-node

# Copy Prisma schema
cp ../schema.prisma ./prisma/schema.prisma

# Copy environment file
cp ../.env.example ./.env

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database
cp ../seed.ts ./prisma/seed.ts
npx ts-node prisma/seed.ts
```

### Step 3: Verify Database

```bash
# Open Prisma Studio to view data
npx prisma studio

# Or access pgAdmin at http://localhost:5050
# Email: admin@tejindia.com
# Password: admin123
```

### Step 4: Start Development

```bash
# Start backend (you'll create server.ts)
npm run dev

# In another terminal, start frontend
cd frontend
npm install
npm run dev
```

🎉 **Done!** Visit http://localhost:5173

---

## 🔧 Option 2: Manual Setup (Without Docker)

### Step 1: Install PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql-15 postgresql-contrib-15
sudo systemctl start postgresql
```

**Windows:**
Download from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)

### Step 2: Create Database

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Run these commands in psql:
CREATE DATABASE tej_india;
CREATE USER tej_user WITH ENCRYPTED PASSWORD 'tej_password_123';
GRANT ALL PRIVILEGES ON DATABASE tej_india TO tej_user;

# Enable PostGIS extension
\c tej_india
CREATE EXTENSION IF NOT EXISTS postgis;

# Exit
\q
```

### Step 3: Install Redis

**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt install redis-server
sudo systemctl start redis
```

**Windows:**
Download from [Redis Official Site](https://redis.io/download)

### Step 4: Setup Project

```bash
# Follow steps from Option 1, Step 2 onwards
cd backend
npm install
cp ../.env.example ./.env

# Edit .env with your database credentials
nano .env

# Run migrations and seed
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

---

## 🗂️ Project Structure to Create

```
LiveData/ (Tej India)
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma         # Copy from root
│   │   ├── seed.ts                # Copy from root
│   │   └── migrations/            # Auto-generated
│   ├── src/
│   │   ├── server.ts              # Main server file
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── skills.ts
│   │   │   ├── swaps.ts
│   │   │   └── users.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── schema.prisma
├── seed.ts
├── .env.example
└── TEJ-INDIA-README.md
```

---

## 🧪 Testing the Setup

### Test Database Connection

```bash
cd backend
npx prisma studio
```

Visit http://localhost:5555 - You should see your data!

### Test PostgreSQL

```bash
# Connect to database
psql -U tej_user -d tej_india -h localhost

# Run a query
SELECT * FROM "User";

# Exit
\q
```

### Test Redis

```bash
redis-cli ping
# Should return: PONG
```

---

## 🔐 Test Login Credentials

After seeding, use these credentials to test:

**User 1 (Rahul):**
- Email: `rahul@tejindia.com`
- Password: `password123`
- Skills: Python, Excel (teaches) | English (learns)

**User 2 (Priya):**
- Email: `priya@tejindia.com`
- Password: `password123`
- Skills: English (teaches) | Excel (learns)

**User 3 (Arjun):**
- Email: `arjun@tejindia.com`
- Password: `password123`

---

## 📊 Database Management Tools

### Prisma Studio (Built-in)
```bash
npx prisma studio
# Visit: http://localhost:5555
```

### pgAdmin (Docker)
If you used docker-compose:
- URL: http://localhost:5050
- Email: `admin@tejindia.com`
- Password: `admin123`

### DBeaver (Recommended Desktop App)
Download: https://dbeaver.io/download/

Connection details:
- Host: `localhost`
- Port: `5432`
- Database: `tej_india`
- Username: `tej_user`
- Password: `tej_password_123`

---

## 🛠️ Common Commands

### Database

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Seed database
npx ts-node prisma/seed.ts

# Open Prisma Studio
npx prisma studio
```

### Docker

```bash
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f postgres

# Restart containers
docker-compose restart

# Remove all data (⚠️ destructive)
docker-compose down -v
```

---

## 🐛 Troubleshooting

### Issue: Cannot connect to PostgreSQL

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Issue: Prisma migrate fails

```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Issue: Port already in use

```bash
# Check what's using port 5432
lsof -i :5432

# Kill the process or change port in docker-compose.yml
# Change: "5433:5432" and update .env
```

### Issue: PostGIS extension error

```bash
# Connect to database
docker exec -it tej-india-postgres psql -U tej_user -d tej_india

# Enable extension manually
CREATE EXTENSION IF NOT EXISTS postgis;
```

---

## 📚 Next Steps

1. ✅ Database is running
2. ✅ Data is seeded
3. ⏭️ Create backend API server
4. ⏭️ Create frontend React app
5. ⏭️ Implement authentication
6. ⏭️ Build matching algorithm
7. ⏭️ Deploy to production

---

## 🎓 Learning Resources

### PostgreSQL
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Prisma Docs](https://www.prisma.io/docs/)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### React
- [React Docs](https://react.dev/)

---

## 💬 Need Help?

- 📧 Email: support@tejindia.com
- 📖 Documentation: See `TEJ-INDIA-README.md`
- 🐛 Issues: Create a GitHub issue

---

## 🎉 You're All Set!

Your Tej India development environment is ready. Start building the future of skill exchange in India! 🚀🇮🇳

**Next file to read:** `TEJ-INDIA-README.md`
