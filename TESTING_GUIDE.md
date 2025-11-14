# LiveData - Comprehensive Testing Guide

**Version:** 1.0.0
**Last Updated:** 2025-01-14
**Status:** Implementation Guide

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Testing Strategy](#testing-strategy)
3. [Backend Testing](#backend-testing)
4. [Frontend Testing](#frontend-testing)
5. [Integration Testing](#integration-testing)
6. [End-to-End Testing](#end-to-end-testing)
7. [Performance Testing](#performance-testing)
8. [Security Testing](#security-testing)
9. [CI/CD Integration](#cicd-integration)
10. [Best Practices](#best-practices)

---

## 🎯 Overview

This guide provides comprehensive instructions for implementing and running tests across the LiveData application. The testing strategy follows the **Testing Pyramid** approach:

```
        /\
       /E2E\         ← Few (Critical user flows)
      /------\
     /  INT   \      ← Some (API + DB integration)
    /----------\
   /    UNIT    \    ← Many (Business logic, utilities)
  /--------------\
```

### Current Testing Status

| Category | Status | Priority |
|----------|--------|----------|
| Backend Unit Tests | ❌ Not Implemented | 🔴 High |
| Frontend Unit Tests | ❌ Not Implemented | 🔴 High |
| Integration Tests | ❌ Not Implemented | 🟡 Medium |
| E2E Tests | ❌ Not Implemented | 🟡 Medium |
| Performance Tests | ❌ Not Implemented | 🟢 Low |
| Security Tests | ❌ Not Implemented | 🔴 High |

---

## 📊 Testing Strategy

### Goals

1. **Code Coverage**: Achieve minimum 80% code coverage
2. **Test Speed**: Unit tests < 10s, Integration tests < 2m, E2E tests < 5m
3. **Reliability**: Tests should be deterministic (no flaky tests)
4. **Maintainability**: Tests should be easy to read and update

### Test Types

- **Unit Tests**: Test individual functions/components in isolation
- **Integration Tests**: Test multiple components working together
- **E2E Tests**: Test complete user workflows through the UI
- **Performance Tests**: Test system under load
- **Security Tests**: Test for vulnerabilities

---

## 🔧 Backend Testing

### Setup

#### 1. Install Testing Dependencies

```bash
cd backend
npm install --save-dev \
  jest \
  @types/jest \
  ts-jest \
  supertest \
  @types/supertest \
  @faker-js/faker \
  jest-mock-extended
```

#### 2. Configure Jest

Create `backend/jest.config.js`:

```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/*.interface.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts']
};
```

#### 3. Update package.json

Add to `backend/package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

#### 4. Create Test Setup

Create `backend/tests/setup.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

// Mock Prisma Client for unit tests
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    file: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    share: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn()
    },
    conversion: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn()
    },
    auditLog: {
      create: jest.fn()
    },
    $disconnect: jest.fn()
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient)
  };
});

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.SIGNING_SECRET = 'test-signing-secret-key-for-testing';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
```

### Unit Tests Examples

#### Test Authentication Service

Create `backend/tests/unit/services/auth.service.test.ts`:

```typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('register', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        email: faker.internet.email(),
        password: 'SecurePass123!',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      const mockUser = {
        userId: faker.string.uuid(),
        email: userData.email,
        passwordHash: await bcrypt.hash(userData.password, 12),
        firstName: userData.firstName,
        lastName: userData.lastName,
        mfaEnabled: false,
        storageQuota: BigInt(5368709120),
        storageUsed: BigInt(0),
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: null,
        isActive: true
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      // Call your auth service register function here
      // const result = await authService.register(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName
        })
      });
    });

    it('should throw error if email already exists', async () => {
      const existingEmail = faker.internet.email();

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        userId: faker.string.uuid(),
        email: existingEmail
      });

      // Test that registration with existing email throws error
      // await expect(authService.register({ email: existingEmail, ... }))
      //   .rejects.toThrow('Email already registered');
    });

    it('should hash password with bcrypt', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await bcrypt.hash(password, 12);

      expect(hashedPassword).not.toBe(password);
      expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
    });
  });

  describe('login', () => {
    it('should return JWT token for valid credentials', async () => {
      const email = faker.internet.email();
      const password = 'TestPassword123!';
      const hashedPassword = await bcrypt.hash(password, 12);

      const mockUser = {
        userId: faker.string.uuid(),
        email,
        passwordHash: hashedPassword,
        isActive: true
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      // Test login logic
      // const result = await authService.login({ email, password });
      // expect(result).toHaveProperty('token');
      // expect(result.token).toBeTruthy();
    });

    it('should throw error for invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      // await expect(authService.login({ email: 'test@test.com', password: 'wrong' }))
      //   .rejects.toThrow('Invalid credentials');
    });
  });

  describe('JWT Token', () => {
    it('should generate valid JWT token', () => {
      const userId = faker.string.uuid();
      const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '1h'
      });

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      expect(decoded.userId).toBe(userId);
    });

    it('should expire JWT token after specified time', () => {
      const userId = faker.string.uuid();
      const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '0s'
      });

      expect(() => {
        jwt.verify(token, process.env.JWT_SECRET!);
      }).toThrow();
    });
  });
});
```

#### Test File Service

Create `backend/tests/unit/services/file.service.test.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

describe('FileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('uploadFile', () => {
    it('should create file record in database', async () => {
      const fileData = {
        userId: faker.string.uuid(),
        fileName: faker.system.fileName(),
        fileSize: BigInt(1024000),
        mimeType: 'application/pdf',
        storagePath: faker.system.filePath()
      };

      const mockFile = {
        fileId: faker.string.uuid(),
        ...fileData,
        isPasswordProtected: false,
        passwordHash: null,
        tags: [],
        thumbnailKey: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        isDeleted: false
      };

      (prisma.file.create as jest.Mock).mockResolvedValue(mockFile);

      // Test file upload
      // const result = await fileService.uploadFile(fileData);
      // expect(result.fileId).toBe(mockFile.fileId);
    });

    it('should check storage quota before upload', async () => {
      const userId = faker.string.uuid();
      const fileSize = BigInt(6000000000); // 6GB

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        userId,
        storageQuota: BigInt(5368709120), // 5GB
        storageUsed: BigInt(1000000000) // 1GB used
      });

      // Should throw error because file would exceed quota
      // await expect(fileService.uploadFile({ userId, fileSize, ... }))
      //   .rejects.toThrow('Storage quota exceeded');
    });
  });

  describe('deleteFile', () => {
    it('should soft delete file', async () => {
      const fileId = faker.string.uuid();

      (prisma.file.update as jest.Mock).mockResolvedValue({
        fileId,
        isDeleted: true,
        deletedAt: new Date()
      });

      // Test soft delete
      // await fileService.deleteFile(fileId);
      // expect(prisma.file.update).toHaveBeenCalledWith({
      //   where: { fileId },
      //   data: { isDeleted: true, deletedAt: expect.any(Date) }
      // });
    });
  });

  describe('searchFiles', () => {
    it('should search files by name', async () => {
      const searchQuery = 'report';
      const mockFiles = [
        {
          fileId: faker.string.uuid(),
          fileName: 'annual-report.pdf',
          fileSize: BigInt(1024000)
        },
        {
          fileId: faker.string.uuid(),
          fileName: 'monthly-report.xlsx',
          fileSize: BigInt(512000)
        }
      ];

      (prisma.file.findMany as jest.Mock).mockResolvedValue(mockFiles);

      // Test search
      // const results = await fileService.searchFiles({ query: searchQuery });
      // expect(results).toHaveLength(2);
    });

    it('should filter files by tags', async () => {
      const tags = ['work', 'important'];

      (prisma.file.findMany as jest.Mock).mockResolvedValue([
        {
          fileId: faker.string.uuid(),
          fileName: 'document.pdf',
          tags: ['work', 'important']
        }
      ]);

      // Test tag filtering
      // const results = await fileService.searchFiles({ tags });
      // expect(results[0].tags).toEqual(expect.arrayContaining(tags));
    });
  });
});
```

### Integration Tests Examples

Create `backend/tests/integration/api/auth.test.ts`:

```typescript
import request from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../../src/app'; // Your Express app

describe('Auth API Integration', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user and return token', async () => {
      const userData = {
        email: faker.internet.email(),
        password: 'SecurePass123!',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'invalid-email',
          password: 'SecurePass123!',
          firstName: 'John',
          lastName: 'Doe'
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 for duplicate email', async () => {
      const email = faker.internet.email();
      const userData = {
        email,
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe'
      };

      // First registration
      await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      // Duplicate registration
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain('already exists');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login with valid credentials', async () => {
      // First register a user
      const credentials = {
        email: faker.internet.email(),
        password: 'SecurePass123!'
      };

      await request(app)
        .post('/api/v1/auth/register')
        .send({
          ...credentials,
          firstName: 'John',
          lastName: 'Doe'
        });

      // Then login
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: faker.internet.email(),
          password: 'WrongPassword123!'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

### Running Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run specific test file
npm test -- auth.service.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should register"
```

---

## ⚛️ Frontend Testing

### Setup

#### 1. Install Testing Dependencies

```bash
cd frontend
npm install --save-dev \
  vitest \
  @vitest/ui \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jsdom \
  @faker-js/faker
```

#### 2. Configure Vitest

Create `frontend/vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**'
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

#### 3. Update package.json

Add to `frontend/package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

#### 4. Create Test Setup

Create `frontend/tests/setup.ts`:

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});
```

### Unit Tests Examples

#### Test Button Component

Create `frontend/tests/unit/components/Button.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/Button';
import { Upload } from 'lucide-react';

describe('Button Component', () => {
  it('should render with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render different variants', () => {
    const { container, rerender } = render(
      <Button variant="primary">Primary</Button>
    );
    expect(container.firstChild).toHaveClass('primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('secondary');
  });

  it('should render different sizes', () => {
    const { container, rerender } = render(
      <Button size="sm">Small</Button>
    );
    expect(container.firstChild).toHaveClass('sm');

    rerender(<Button size="lg">Large</Button>);
    expect(container.firstChild).toHaveClass('lg');
  });

  it('should render with left icon', () => {
    render(
      <Button leftIcon={<Upload data-testid="upload-icon" />}>
        Upload
      </Button>
    );
    expect(screen.getByTestId('upload-icon')).toBeInTheDocument();
  });

  it('should be disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);

    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

#### Test Card Component

Create `frontend/tests/unit/components/Card.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/Card';

describe('Card Component', () => {
  it('should render all card parts', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('should apply glass variant', () => {
    const { container } = render(
      <Card variant="glass">Content</Card>
    );
    expect(container.firstChild).toHaveClass('glass');
  });

  it('should apply hover effect', () => {
    const { container } = render(
      <Card hover>Content</Card>
    );
    expect(container.firstChild).toHaveClass('hover');
  });
});
```

#### Test ThemeContext

Create `frontend/tests/unit/contexts/ThemeContext.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// Test component that uses theme
const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should provide default theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('should change theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should persist theme to localStorage', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark'));
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should load theme from localStorage', () => {
    (localStorage.getItem as any).mockReturnValue('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });
});
```

#### Test API Service

Create `frontend/tests/unit/services/api.service.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { apiService } from '@/services/api.service';

vi.mock('axios');
const mockedAxios = axios as any;

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Authentication', () => {
    it('should register user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe'
      };

      const mockResponse = {
        data: {
          token: 'mock-jwt-token',
          user: { userId: '123', email: userData.email }
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await apiService.register(userData);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        userData
      );
      expect(result.token).toBe('mock-jwt-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-jwt-token');
    });

    it('should login user successfully', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'SecurePass123!'
      };

      const mockResponse = {
        data: {
          token: 'mock-jwt-token',
          user: { userId: '123', email: credentials.email }
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await apiService.login(credentials);

      expect(result.token).toBe('mock-jwt-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-jwt-token');
    });

    it('should logout and clear token', () => {
      localStorage.setItem('token', 'mock-token');

      apiService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('File Operations', () => {
    it('should upload file with progress callback', async () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const onProgress = vi.fn();

      const mockResponse = {
        data: {
          fileId: '123',
          fileName: 'test.txt'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await apiService.uploadFile(file, onProgress);

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result.fileId).toBe('123');
    });

    it('should get files list', async () => {
      const mockFiles = [
        { fileId: '1', fileName: 'file1.txt' },
        { fileId: '2', fileName: 'file2.pdf' }
      ];

      mockedAxios.get.mockResolvedValue({ data: mockFiles });

      const result = await apiService.getFiles();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/files')
      );
      expect(result).toEqual(mockFiles);
    });

    it('should delete file', async () => {
      const fileId = '123';

      mockedAxios.delete.mockResolvedValue({ data: { success: true } });

      await apiService.deleteFile(fileId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        expect.stringContaining(`/files/${fileId}`)
      );
    });
  });
});
```

### Running Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run in watch mode
npm test -- --watch

# Run specific test file
npm test -- Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

---

## 🔗 Integration Testing

Integration tests verify that different parts of the system work together correctly.

### Database Integration Tests

Create `backend/tests/integration/database.test.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

describe('Database Integration', () => {
  beforeAll(async () => {
    // Clean test database
    await prisma.auditLog.deleteMany();
    await prisma.conversion.deleteMany();
    await prisma.share.deleteMany();
    await prisma.file.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('User Operations', () => {
    it('should create user with all fields', async () => {
      const userData = {
        email: faker.internet.email(),
        passwordHash: await bcrypt.hash('password123', 12),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName()
      };

      const user = await prisma.user.create({ data: userData });

      expect(user.userId).toBeTruthy();
      expect(user.email).toBe(userData.email);
      expect(user.storageQuota).toBe(BigInt(5368709120));
      expect(user.storageUsed).toBe(BigInt(0));
    });

    it('should enforce unique email constraint', async () => {
      const email = faker.internet.email();

      await prisma.user.create({
        data: {
          email,
          passwordHash: await bcrypt.hash('password', 12)
        }
      });

      await expect(
        prisma.user.create({
          data: {
            email,
            passwordHash: await bcrypt.hash('password', 12)
          }
        })
      ).rejects.toThrow();
    });
  });

  describe('File Operations', () => {
    it('should create file with foreign key to user', async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          passwordHash: await bcrypt.hash('password', 12)
        }
      });

      const file = await prisma.file.create({
        data: {
          userId: user.userId,
          fileName: faker.system.fileName(),
          fileSize: BigInt(1024),
          mimeType: 'text/plain',
          storagePath: faker.system.filePath()
        }
      });

      expect(file.fileId).toBeTruthy();
      expect(file.userId).toBe(user.userId);
    });

    it('should handle file tags', async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          passwordHash: await bcrypt.hash('password', 12)
        }
      });

      const tags = ['work', 'important', 'review'];
      const file = await prisma.file.create({
        data: {
          userId: user.userId,
          fileName: faker.system.fileName(),
          fileSize: BigInt(1024),
          mimeType: 'text/plain',
          storagePath: faker.system.filePath(),
          tags
        }
      });

      expect(file.tags).toEqual(tags);
    });
  });

  describe('Share Operations', () => {
    it('should create share link with expiration', async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          passwordHash: await bcrypt.hash('password', 12)
        }
      });

      const file = await prisma.file.create({
        data: {
          userId: user.userId,
          fileName: faker.system.fileName(),
          fileSize: BigInt(1024),
          mimeType: 'text/plain',
          storagePath: faker.system.filePath()
        }
      });

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const share = await prisma.share.create({
        data: {
          userId: user.userId,
          fileId: file.fileId,
          expiresAt,
          maxDownloads: 10
        }
      });

      expect(share.shareId).toBeTruthy();
      expect(share.expiresAt).toEqual(expiresAt);
      expect(share.maxDownloads).toBe(10);
      expect(share.downloads).toBe(0);
    });
  });
});
```

---

## 🎭 End-to-End Testing

### Setup Playwright

```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
```

Create `frontend/playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI
  }
});
```

### E2E Test Examples

Create `frontend/tests/e2e/auth.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Authentication Flow', () => {
  test('should register new user', async ({ page }) => {
    await page.goto('/');

    // Click register tab
    await page.click('text=Register');

    // Fill registration form
    await page.fill('input[type="email"]', faker.internet.email());
    await page.fill('input[type="password"]', 'SecurePass123!');
    await page.fill('input[name="firstName"]', faker.person.firstName());
    await page.fill('input[name="lastName"]', faker.person.lastName());

    // Submit form
    await page.click('button:has-text("Create Account")');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=LiveData')).toBeVisible();
  });

  test('should login existing user', async ({ page }) => {
    await page.goto('/');

    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'SecurePass123!');

    // Submit form
    await page.click('button:has-text("Sign In")');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should logout user', async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'SecurePass123!');
    await page.click('button:has-text("Sign In")');

    // Wait for dashboard
    await expect(page).toHaveURL(/dashboard/);

    // Click logout
    await page.click('button:has-text("Logout")');

    // Should redirect to login
    await expect(page).toHaveURL(/\/$/);
  });
});
```

Create `frontend/tests/e2e/file-management.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'SecurePass123!');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should upload file', async ({ page }) => {
    // Click upload button
    const fileInput = page.locator('input[type="file"]');

    // Create test file
    const testFilePath = path.join(__dirname, '../fixtures/test-file.txt');

    // Upload file
    await fileInput.setInputFiles(testFilePath);

    // Wait for upload to complete
    await expect(page.locator('text=test-file.txt')).toBeVisible();
  });

  test('should search files', async ({ page }) => {
    // Type in search box
    await page.fill('input[placeholder*="Search"]', 'report');

    // Should see filtered results
    const fileCards = page.locator('[data-testid="file-card"]');
    await expect(fileCards.first()).toContainText('report');
  });

  test('should download file', async ({ page }) => {
    // Find first file
    const firstFile = page.locator('[data-testid="file-card"]').first();

    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download');

    // Click download button
    await firstFile.locator('button:has-text("Download")').click();

    // Wait for download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('should delete file', async ({ page }) => {
    // Find first file
    const firstFile = page.locator('[data-testid="file-card"]').first();
    const fileName = await firstFile.locator('h3').textContent();

    // Click delete button
    await firstFile.locator('button:has-text("Delete")').click();

    // Confirm deletion
    page.on('dialog', dialog => dialog.accept());

    // File should be removed
    await expect(page.locator(`text=${fileName}`)).not.toBeVisible();
  });
});
```

### Run E2E Tests

```bash
cd frontend

# Run all E2E tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific browser
npx playwright test --project=chromium

# Run in debug mode
npx playwright test --debug

# Generate code
npx playwright codegen http://localhost:5173
```

---

## ⚡ Performance Testing

### Setup k6

Install k6: https://k6.io/docs/getting-started/installation/

Create `backend/tests/performance/load-test.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '2m', target: 50 },   // Stay at 50 users
    { duration: '30s', target: 0 }    // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    errors: ['rate<0.1']              // Error rate must be below 10%
  }
};

const BASE_URL = __ENV.API_URL || 'http://localhost:4000/api/v1';
let authToken;

export function setup() {
  // Register test user
  const registerRes = http.post(`${BASE_URL}/auth/register`, JSON.stringify({
    email: `perf-test-${Date.now()}@example.com`,
    password: 'TestPassword123!',
    firstName: 'Performance',
    lastName: 'Test'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  return { token: registerRes.json('token') };
}

export default function(data) {
  // Test file listing
  const listRes = http.get(`${BASE_URL}/files`, {
    headers: { Authorization: `Bearer ${data.token}` }
  });

  check(listRes, {
    'list files status 200': (r) => r.status === 200,
    'list files response time < 200ms': (r) => r.timings.duration < 200
  }) || errorRate.add(1);

  sleep(1);

  // Test file search
  const searchRes = http.get(`${BASE_URL}/files/search?q=test`, {
    headers: { Authorization: `Bearer ${data.token}` }
  });

  check(searchRes, {
    'search status 200': (r) => r.status === 200,
    'search response time < 300ms': (r) => r.timings.duration < 300
  }) || errorRate.add(1);

  sleep(1);
}

export function teardown(data) {
  // Cleanup if needed
}
```

### Run Performance Tests

```bash
# Run load test
k6 run backend/tests/performance/load-test.js

# Run with custom target
k6 run --vus 100 --duration 5m backend/tests/performance/load-test.js

# Run with cloud reporting
k6 cloud backend/tests/performance/load-test.js
```

---

## 🔒 Security Testing

### 1. Dependency Vulnerability Scanning

```bash
# Backend
cd backend
npm audit
npm audit fix

# Frontend
cd frontend
npm audit
npm audit fix
```

### 2. OWASP ZAP Security Scan

Install OWASP ZAP: https://www.zaproxy.org/download/

Create `security/zap-scan.sh`:

```bash
#!/bin/bash

# Start your application
docker-compose up -d

# Wait for application to be ready
sleep 10

# Run ZAP baseline scan
docker run --network="host" -v $(pwd):/zap/wrk/:rw \
  -t owasp/zap2docker-stable zap-baseline.py \
  -t http://localhost:4000 \
  -r security-report.html

# Stop application
docker-compose down
```

### 3. SQL Injection Testing

Create `backend/tests/security/sql-injection.test.ts`:

```typescript
import request from 'supertest';
import app from '../../src/app';

describe('SQL Injection Protection', () => {
  it('should protect against SQL injection in search', async () => {
    const maliciousQuery = "'; DROP TABLE users; --";

    const response = await request(app)
      .get(`/api/v1/files/search?q=${encodeURIComponent(maliciousQuery)}`)
      .set('Authorization', `Bearer ${token}`);

    // Should not cause SQL error
    expect(response.status).not.toBe(500);
  });

  it('should protect against SQL injection in login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: "admin' OR '1'='1",
        password: "' OR '1'='1"
      });

    expect(response.status).toBe(401);
  });
});
```

### 4. XSS Testing

Create `frontend/tests/security/xss.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardTitle } from '@/components/ui/Card';

describe('XSS Protection', () => {
  it('should sanitize user input in card title', () => {
    const maliciousInput = '<script>alert("XSS")</script>';

    render(
      <Card>
        <CardTitle>{maliciousInput}</CardTitle>
      </Card>
    );

    // React automatically escapes, script should not execute
    const title = screen.getByText(maliciousInput);
    expect(title.innerHTML).not.toContain('<script>');
  });

  it('should not execute inline event handlers', () => {
    const maliciousInput = '<img src=x onerror="alert(1)">';

    render(
      <Card>
        <CardTitle>{maliciousInput}</CardTitle>
      </Card>
    );

    // Should be rendered as text, not HTML
    expect(screen.getByText(maliciousInput)).toBeInTheDocument();
  });
});
```

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  backend-tests:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        run: cd backend && npm ci

      - name: Run Prisma migrations
        run: cd backend && npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db

      - name: Run tests
        run: cd backend && npm run test:coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-secret
          SIGNING_SECRET: test-signing-secret

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/coverage-final.json
          flags: backend

  frontend-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: cd frontend && npm ci

      - name: Run tests
        run: cd frontend && npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/coverage-final.json
          flags: frontend

  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Start services
        run: docker-compose up -d

      - name: Wait for services
        run: sleep 30

      - name: Install Playwright
        run: cd frontend && npm ci && npx playwright install --with-deps

      - name: Run E2E tests
        run: cd frontend && npx playwright test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: frontend/playwright-report/
```

---

## ✅ Best Practices

### 1. Test Naming

```typescript
// ✅ Good
describe('UserService', () => {
  describe('register', () => {
    it('should create user with hashed password', () => {});
    it('should throw error if email exists', () => {});
  });
});

// ❌ Bad
describe('Test1', () => {
  it('works', () => {});
});
```

### 2. Arrange-Act-Assert Pattern

```typescript
it('should return user data', () => {
  // Arrange
  const userId = '123';
  const mockUser = { userId, name: 'John' };
  mockRepository.findById.mockResolvedValue(mockUser);

  // Act
  const result = await userService.getUser(userId);

  // Assert
  expect(result).toEqual(mockUser);
});
```

### 3. Test Independence

```typescript
// ✅ Good - Each test is independent
beforeEach(() => {
  user = createTestUser();
});

it('test 1', () => {
  // Uses fresh user
});

it('test 2', () => {
  // Uses fresh user
});
```

### 4. Use Factories for Test Data

```typescript
// tests/factories/user.factory.ts
export const createTestUser = (overrides = {}) => ({
  userId: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  ...overrides
});

// In tests
const user = createTestUser({ email: 'specific@email.com' });
```

### 5. Mock External Dependencies

```typescript
// ✅ Good
vi.mock('axios');
mockedAxios.get.mockResolvedValue({ data: mockData });

// ❌ Bad - Making real API calls in tests
const result = await axios.get('https://real-api.com');
```

### 6. Test Error Scenarios

```typescript
describe('Error Handling', () => {
  it('should handle network errors', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(apiService.getFiles()).rejects.toThrow('Network error');
  });

  it('should handle 404 errors', async () => {
    mockedAxios.get.mockResolvedValue({ status: 404 });

    await expect(apiService.getFile('invalid-id')).rejects.toThrow();
  });
});
```

### 7. Keep Tests Fast

```typescript
// ✅ Good - Use in-memory database for unit tests
const prisma = new PrismaClient({
  datasources: { db: { url: 'postgresql://memory' } }
});

// ❌ Bad - Unnecessary delays
await sleep(5000);
```

### 8. Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical paths covered
- **E2E Tests**: Happy paths + critical errors

---

## 📚 Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [k6 Documentation](https://k6.io/docs/)

### Tools
- **Code Coverage**: [Codecov](https://about.codecov.io/), [Coveralls](https://coveralls.io/)
- **Test Reporting**: [Allure](https://docs.qameta.io/allure/), [Mochawesome](https://github.com/adamgruber/mochawesome)
- **Mocking**: [MSW](https://mswjs.io/), [Nock](https://github.com/nock/nock)
- **Visual Testing**: [Percy](https://percy.io/), [Chromatic](https://www.chromatic.com/)

---

## 🎯 Next Steps

1. **Week 1-2**: Implement backend unit tests (auth, file operations)
2. **Week 3-4**: Implement frontend unit tests (components, hooks)
3. **Week 5**: Add integration tests (API endpoints)
4. **Week 6**: Add E2E tests (critical user flows)
5. **Week 7**: Performance and security testing
6. **Week 8**: CI/CD integration and documentation

---

**Document Version:** 1.0.0
**Last Updated:** 2025-01-14
**Maintained By:** LiveData Team
