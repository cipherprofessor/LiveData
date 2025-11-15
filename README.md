# Tej India - सीखो और सिखाओ

**Trade Skills, Not Money**

A peer-to-peer skill exchange platform empowering Indian youth to learn and teach skills without monetary transactions.

## 🚀 Project Overview

Tej India is a full-stack web application that enables users to:
- **Learn** new skills from talented individuals in their community
- **Teach** what they know and help others grow
- **Earn** Tej Coins and badges through skill exchanges
- **Connect** with like-minded people across India

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Documentation](#documentation)

## ✨ Features

### Core Features
- 🔐 User authentication & authorization (JWT)
- 👤 User profiles with skills and badges
- 🔄 Skill swap matching algorithm
- 💬 Real-time chat (Socket.IO)
- 🏆 Gamification with Tej Coins & badges
- 📍 Location-based skill discovery
- ⭐ Reviews and ratings system
- 📅 Event management
- 🔔 Real-time notifications

### Technical Features
- RESTful API architecture
- Real-time WebSocket communication
- PostgreSQL with Prisma ORM
- Redis caching
- Glass morphism UI design
- Responsive mobile-first design
- Type-safe TypeScript codebase

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 15+ with Prisma ORM
- **Cache:** Redis 7+
- **Real-time:** Socket.IO
- **Authentication:** JWT with refresh tokens
- **Validation:** Zod

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Zustand + React Query
- **Styling:** Tailwind CSS
- **UI Components:** Custom Glass Morphism Design
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

### DevOps
- **Containerization:** Docker & Docker Compose
- **Database Management:** pgAdmin 4

## 📁 Project Structure

```
LiveData/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Server entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── tests/              # Test files
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── stores/        # State management
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript types
│   │   ├── assets/        # Images, icons, etc.
│   │   ├── styles/        # Global styles
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                   # Project documentation
│   ├── TEJ-INDIA-README.md
│   ├── Tej-India-Design-System-guide.md
│   └── ...
│
├── docker-compose.yml      # Docker services configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Docker** and Docker Compose
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LiveData
   ```

2. **Start Docker services** (PostgreSQL, Redis, pgAdmin)
   ```bash
   docker-compose up -d
   ```

3. **Set up the backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration

   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration

   npm install
   ```

## ⚙️ Environment Setup

### Backend Environment Variables

Create `backend/.env` based on `.env.example`:

```env
DATABASE_URL=postgresql://tejindia:tejindia123@localhost:5432/tejindia_db
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### Frontend Environment Variables

Create `frontend/.env` based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

## 💻 Development

### Running the Application

**Start all services:**

1. **Start Docker containers** (in project root):
   ```bash
   docker-compose up -d
   ```

2. **Start backend** (in `backend/` directory):
   ```bash
   npm run dev
   ```
   Server runs on: http://localhost:5000

3. **Start frontend** (in `frontend/` directory):
   ```bash
   npm run dev
   ```
   App runs on: http://localhost:3000

### Database Management

**Access pgAdmin:**
- URL: http://localhost:5050
- Email: admin@tejindia.com
- Password: admin123

**Prisma Commands:**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Useful Commands

**Backend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm test             # Run tests
```

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 📚 Documentation

Detailed documentation is available in the `docs/` directory:

- **[Technical README](docs/TEJ-INDIA-README.md)** - Technical architecture and API documentation
- **[Design System Guide](docs/Tej-India-Design-System-guide.md)** - UI/UX design guidelines
- **[Quick Start Guide](docs/QUICKSTART.md)** - Quick setup instructions
- **[Business Plan](docs/myproject.md)** - Business model and strategy

## 🔗 Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Backend API | http://localhost:5000 | - |
| API Health | http://localhost:5000/health | - |
| PostgreSQL | localhost:5432 | tejindia / tejindia123 |
| Redis | localhost:6379 | - |
| pgAdmin | http://localhost:5050 | admin@tejindia.com / admin123 |

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📝 License

MIT License - See LICENSE file for details

## 👥 Team

Tej India Team

---

**Built with ❤️ for the Indian youth community**

*सीखो और सिखाओ - Trade Skills, Not Money*
