# 🎨 NeoEdu Suite - Comprehensive Design System Documentation

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Architecture](#component-architecture)
6. [Layout System](#layout-system)
7. [Icon System](#icon-system)
8. [Animation & Transitions](#animation--transitions)
9. [Dark Mode Implementation](#dark-mode-implementation)
10. [Component Specifications](#component-specifications)
11. [Code Standards](#code-standards)
12. [Accessibility Guidelines](#accessibility-guidelines)

---

## Design Philosophy

NeoEdu Suite follows a modern, glassmorphic design approach inspired by contemporary SaaS applications like Appwrite, Linear, and Vercel. The design emphasizes:

- **Clarity & Hierarchy**: Clear visual hierarchy with purposeful use of color and spacing
- **Modern Aesthetics**: Gradient icons, smooth animations, and subtle depth effects
- **Consistency**: Unified design language across all components
- **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios
- **Dark Mode First**: Beautiful dark theme as the primary experience
- **Responsive**: Mobile-first approach with breakpoints for all devices

---

## Color System

### Theme Structure

The design system uses CSS custom properties (HSL format) for dynamic theming:

```css
/* HSL Format: hue saturation% lightness% */
--color-name: 214 95% 55%;

/* Usage */
background: hsl(var(--color-name));
background: hsl(var(--color-name) / 0.5); /* with opacity */
```

### Light Theme Colors

```css
:root {
  /* Base Colors */
  --background: 0 0% 100%;           /* Pure white #ffffff */
  --foreground: 222 47% 11%;         /* Dark text #1a202c */
  --card: 0 0% 100%;                 /* White cards #ffffff */
  --card-alt: 220 14% 98%;           /* Slight gray #f8fafc */
  
  /* Primary Brand */
  --primary: 214 95% 55%;            /* Blue #3b82f6 */
  --primary-hover: 214 95% 60%;      /* Lighter blue #60a5fa */
  --primary-foreground: 0 0% 100%;   /* White text */
  
  /* Secondary */
  --secondary: 220 14% 96%;          /* Light gray #f1f5f9 */
  --secondary-foreground: 222 47% 11%; /* Dark text */
  
  /* Muted Elements */
  --muted: 220 14% 96%;              /* Light gray #f1f5f9 */
  --muted-foreground: 215 16% 47%;   /* Medium gray #64748b */
  
  /* Accent */
  --accent: 220 14% 96%;             /* Light gray #f1f5f9 */
  --accent-foreground: 222 47% 11%;  /* Dark text */
  
  /* Borders & Inputs */
  --border: 220 13% 91%;             /* Light border #e2e8f0 */
  --border-hover: 220 13% 85%;       /* Darker border #cbd5e1 */
  --input: 220 13% 91%;              /* Input background #e2e8f0 */
  --ring: 214 95% 55%;               /* Focus ring blue */
  
  /* Semantic Colors */
  --success: 142 71% 45%;            /* Green #10b981 */
  --warning: 45 93% 47%;             /* Orange #f59e0b */
  --destructive: 0 84% 60%;          /* Red #ef4444 */
  --info: 214 95% 65%;               /* Light blue #60a5fa */
}
```

### Dark Theme Colors

```css
html.dark,
html[data-theme="dark"] {
  /* Base Colors - Deep Dark */
  --background: 240 10% 3.9%;        /* Near black #0a0a0a */
  --foreground: 0 0% 98%;            /* Near white #f8fafc */
  --card: 240 6% 10%;                /* Dark gray #19191c */
  --card-alt: 240 5% 12%;            /* Slightly lighter #1e1e21 */
  
  /* Primary - Vibrant Cyan */
  --primary: 193 97% 61%;            /* Cyan #22d3ee */
  --primary-hover: 193 97% 66%;      /* Lighter cyan #4adeec */
  --primary-foreground: 0 0% 100%;   /* White text */
  
  /* Secondary */
  --secondary: 240 5% 15%;           /* Dark gray #26262a */
  --secondary-foreground: 0 0% 98%;  /* White text */
  
  /* Muted Elements */
  --muted: 240 4% 16%;               /* Dark gray #28282c */
  --muted-foreground: 240 5% 65%;    /* Light gray #94a3b8 */
  
  /* Accent */
  --accent: 240 5% 15%;              /* Dark gray #26262a */
  --accent-foreground: 0 0% 98%;     /* White text */
  
  /* Borders & Inputs */
  --border: 240 6% 18%;              /* Subtle border #2d2d32 */
  --border-hover: 240 6% 25%;        /* Lighter border #3f3f46 */
  --input: 240 6% 12%;               /* Input background #1e1e21 */
  --ring: 193 97% 61%;               /* Focus ring cyan */
  
  /* Semantic Colors - Adjusted for Dark */
  --success: 142 76% 36%;            /* Green #059669 */
  --warning: 32 95% 44%;             /* Orange #d97706 */
  --destructive: 0 62% 50%;          /* Red #dc2626 */
  --info: 193 97% 61%;               /* Cyan #22d3ee */
}
```

### Gradient System

```css
/* Primary Gradients */
--gradient-primary: linear-gradient(135deg, #3b82f6, #1d4ed8);      /* Light mode */
--gradient-primary: linear-gradient(135deg, #22d3ee, #06b6d4);      /* Dark mode */

/* Icon Gradients */
--gradient-blue: linear-gradient(135deg, #3b82f6, #1d4ed8);
--gradient-purple: linear-gradient(135deg, #8b5cf6, #7c3aed);
--gradient-green: linear-gradient(135deg, #10b981, #059669);
--gradient-orange: linear-gradient(135deg, #f59e0b, #d97706);
--gradient-cyan: linear-gradient(135deg, #06b6d4, #0891b2);
--gradient-pink: linear-gradient(135deg, #ec4899, #db2777);
--gradient-lime: linear-gradient(135deg, #84cc16, #65a30d);
--gradient-teal: linear-gradient(135deg, #14b8a6, #0d9488);
--gradient-indigo: linear-gradient(135deg, #6366f1, #4f46e5);
--gradient-violet: linear-gradient(135deg, #a855f7, #9333ea);
--gradient-rose: linear-gradient(135deg, #f43f5e, #e11d48);
--gradient-gray: linear-gradient(135deg, #64748b, #475569);
--gradient-red: linear-gradient(135deg, #ef4444, #dc2626);
```

### Shadow System

```css
/* Light Mode Shadows */
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.1);
--shadow-glow: 0 8px 25px rgba(59, 130, 246, 0.15);
--shadow-hover: 0 12px 30px rgba(59, 130, 246, 0.2);
--shadow-card: 0 4px 12px rgba(0, 0, 0, 0.05);

/* Dark Mode Shadows */
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 8px 25px rgba(34, 211, 238, 0.1);
--shadow-hover: 0 12px 30px rgba(34, 211, 238, 0.15);
--shadow-card: 0 4px 12px rgba(0, 0, 0, 0.3);
```

### Color Usage Guidelines

#### When to Use Each Color

**Primary (Blue/Cyan)**
- Primary actions (Save, Submit, Create)
- Active states
- Links
- Focus indicators
- Brand elements

**Success (Green)**
- Success messages
- Completed states
- Positive indicators
- Active/enrolled status

**Warning (Orange)**
- Warning messages
- Pending states
- Caution indicators

**Destructive (Red)**
- Delete actions
- Error messages
- Critical warnings
- Negative indicators

**Muted (Gray)**
- Secondary text
- Placeholders
- Disabled states
- Subtle backgrounds

**Foreground (Black/White)**
- Primary text
- Headings
- High-emphasis content

---

## Typography

### Font Family

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
             Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
```

### Type Scale

```css
/* Font Sizes */
.text-xs    { font-size: 0.75rem;   line-height: 1rem;    }  /* 12px */
.text-sm    { font-size: 0.875rem;  line-height: 1.25rem; }  /* 14px */
.text-base  { font-size: 1rem;      line-height: 1.5rem;  }  /* 16px */
.text-lg    { font-size: 1.125rem;  line-height: 1.75rem; }  /* 18px */
.text-xl    { font-size: 1.25rem;   line-height: 1.75rem; }  /* 20px */
.text-2xl   { font-size: 1.5rem;    line-height: 2rem;    }  /* 24px */
.text-3xl   { font-size: 1.875rem;  line-height: 2.25rem; }  /* 30px */
.text-4xl   { font-size: 2.25rem;   line-height: 2.5rem;  }  /* 36px */
.text-5xl   { font-size: 3rem;      line-height: 1;       }  /* 48px */
```

### Font Weights

```css
.font-light     { font-weight: 300; }
.font-normal    { font-weight: 400; }
.font-medium    { font-weight: 500; }
.font-semibold  { font-weight: 600; }
.font-bold      { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

### Typography Usage

```css
/* Page Title */
h1 {
  font-size: 1.875rem;      /* 30px */
  font-weight: 700;
  color: hsl(var(--foreground));
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* Section Heading */
h2 {
  font-size: 1.5rem;        /* 24px */
  font-weight: 700;
  color: hsl(var(--foreground));
  line-height: 1.3;
  letter-spacing: -0.01em;
}

/* Card Title */
h3 {
  font-size: 1.125rem;      /* 18px */
  font-weight: 600;
  color: hsl(var(--foreground));
  line-height: 1.4;
}

/* Body Text */
p {
  font-size: 0.875rem;      /* 14px */
  font-weight: 400;
  color: hsl(var(--foreground));
  line-height: 1.5;
}

/* Small Text / Labels */
.label {
  font-size: 0.75rem;       /* 12px */
  font-weight: 600;
  color: hsl(var(--foreground));
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Muted Text */
.muted {
  font-size: 0.875rem;      /* 14px */
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
}
```

---

## Spacing System

### Base Unit: 4px (0.25rem)

```css
/* Spacing Scale */
--spacing-0: 0;           /* 0px */
--spacing-1: 0.25rem;     /* 4px */
--spacing-2: 0.5rem;      /* 8px */
--spacing-3: 0.75rem;     /* 12px */
--spacing-4: 1rem;        /* 16px */
--spacing-5: 1.25rem;     /* 20px */
--spacing-6: 1.5rem;      /* 24px */
--spacing-8: 2rem;        /* 32px */
--spacing-10: 2.5rem;     /* 40px */
--spacing-12: 3rem;       /* 48px */
--spacing-16: 4rem;       /* 64px */
--spacing-20: 5rem;       /* 80px */
```

### Component Spacing Guidelines

```css
/* Card Padding */
.card {
  padding: 1.5rem;        /* 24px */
}

/* Section Spacing */
.section {
  margin-bottom: 2rem;    /* 32px */
}

/* Form Groups */
.form-group {
  margin-bottom: 1rem;    /* 16px */
  gap: 0.5rem;            /* 8px */
}

/* Button Padding */
.button {
  padding: 0.75rem 1.5rem;  /* 12px 24px */
}

/* Input Padding */
.input {
  padding: 0.75rem 1rem;    /* 12px 16px */
}

/* Gap Between Elements */
.stack-tight { gap: 0.25rem; }   /* 4px */
.stack-sm    { gap: 0.5rem; }    /* 8px */
.stack-md    { gap: 1rem; }      /* 16px */
.stack-lg    { gap: 1.5rem; }    /* 24px */
.stack-xl    { gap: 2rem; }      /* 32px */
```

---

## Component Architecture

### Three-Tier Sidebar System

#### 1. Primary Sidebar (70px wide)

**Purpose**: Top-level section navigation

**Specifications**:
```scss
width: 70px;
background: hsl(var(--card));
border-right: 1px solid hsl(var(--border));
position: fixed;
left: 0;
top: 0;
bottom: 0;
z-index: 1000;
```

**Components**:
- Logo (44x44px, gradient background)
- Navigation items (60px min-height)
- Icon size: 20px within 40x40px gradient containers
- Label: 11px (0.6875rem), weight 600
- Footer with version info

**Icon Gradients**:
```scss
.dashboardIcon  { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.academicIcon   { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.studentsIcon   { background: linear-gradient(135deg, #10b981, #059669); }
.staffIcon      { background: linear-gradient(135deg, #f59e0b, #d97706); }
.operationsIcon { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.financialIcon  { background: linear-gradient(135deg, #ec4899, #db2777); }
.reportsIcon    { background: linear-gradient(135deg, #14b8a6, #0d9488); }
.settingsIcon   { background: linear-gradient(135deg, #64748b, #475569); }
```

**States**:
```scss
// Default
color: hsl(var(--muted-foreground));

// Hover
background: hsl(var(--accent) / 0.5);
transform: translateY(-2px);

// Active
background: hsl(var(--primary) / 0.12);
color: hsl(var(--primary));
```

#### 2. Secondary Sidebar (240px wide)

**Purpose**: Sub-navigation for current section

**Specifications**:
```scss
width: 240px;
background: hsl(var(--card));
border-right: 1px solid hsl(var(--border));
position: fixed;
left: 70px;
top: 0;
bottom: 0;
z-index: 999;
```

**Components**:
- Header (32px icon, 15px title, 16px padding)
- Navigation sections (compact spacing)
- Section labels (11px uppercase, 0.5rem padding)
- Nav items (10px padding, 28px icon)

**Spacing**:
```scss
.header {
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border));
}

.navSection {
  padding: 0.75rem 0.875rem;
}

.navItem {
  padding: 0.625rem 0.75rem;
  gap: 0.75rem;
  border-radius: 8px;
}
```

**States**:
```scss
// Hover
background: hsl(var(--accent) / 0.5);
transform: translateX(2px);

// Active
background: hsl(var(--primary) / 0.12);
border-left: 3px solid hsl(var(--primary));
```

#### 3. Header (70px height)

**Purpose**: Page context, search, actions

**Specifications**:
```scss
height: 70px;
background: hsl(var(--card));
border-bottom: 1px solid hsl(var(--border));
position: fixed;
top: 0;
left: 310px; /* 70px + 240px */
right: 0;
z-index: 998;
padding: 0 1.5rem;
```

**Components**:
- Breadcrumbs (13px text)
- Page title (22px, weight 700)
- Search bar (240px min-width)
- Action buttons (44x44px)
- User menu

**Responsive Behavior**:
```scss
// Tablet (1024px)
left: 70px; /* Hide secondary sidebar */

// Mobile (768px)
left: 0; /* Hide both sidebars */
height: 64px;
```

### Layout System

```scss
/* Main Content Area */
.mainContent {
  margin-left: 310px;  /* 70px + 240px */
  margin-top: 70px;
  padding: 2rem;
  min-height: calc(100vh - 70px);
}

/* Responsive Layouts */
@media (max-width: 1024px) {
  .mainContent {
    margin-left: 70px;  /* Only primary sidebar */
  }
}

@media (max-width: 768px) {
  .mainContent {
    margin-left: 0;
    margin-top: 64px;
    padding: 1rem;
  }
}
```

---

## Icon System

### Icon Library: Lucide React

```bash
npm install lucide-react
```

### Icon Sizes

```tsx
// Small Icons (UI elements)
<Icon size={14} />

// Medium Icons (Buttons, Cards)
<Icon size={18} />

// Large Icons (Features, Empty States)
<Icon size={24} />

// Extra Large (Hero Sections)
<Icon size={32} />
```

### Icon with Gradient Background

```tsx
<div className={styles.iconWrapper}>
  <Icon size={18} />
</div>

// SCSS
.iconWrapper {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Icon Color Guidelines

- **White**: On colored backgrounds (gradients)
- **Foreground**: Primary icons
- **Muted-foreground**: Secondary icons
- **Primary**: Active/selected states
- **Semantic**: Success, warning, error states

---

## Animation & Transitions

### Timing Functions

```css
/* Easing Variables */
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);      /* Smooth spring */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);       /* Material design */

/* Duration */
--animation-fast: 0.15s;
--animation-normal: 0.3s;
--animation-slow: 0.5s;
```

### Standard Transitions

```css
/* Hover Effects */
.hover-effect {
  transition: all var(--animation-normal) var(--ease-spring);
}

.hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* Click Effects */
.click-effect:active {
  transform: scale(0.98);
}

/* Slide In */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s var(--ease-spring);
}

/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.2s ease-out;
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.3s var(--ease-spring);
}
```

### Performance Guidelines

```css
/* Use transform and opacity for animations */
/* ✅ Good */
transform: translateX(10px);
opacity: 0.5;

/* ❌ Bad (causes reflow) */
left: 10px;
width: 100px;
```

---

## Dark Mode Implementation

### Theme Toggle

```typescript
// ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const toggleTheme = () => setThemeState(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### Using Theme in Components

```scss
// Component.module.scss
.component {
  background: hsl(var(--card));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  
  // Dark mode adjustments happen automatically via CSS variables
  // No need for manual dark mode selectors in most cases
}

// Only use manual dark mode selectors for special cases
.specialComponent {
  background: white;
  
  :global(.dark) & {
    background: #19191c;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}
```

### Dark Mode Background

```css
/* Applied to body in theme.css */
html.dark body {
  background: #0a0a0a;
  color: #f8fafc;
  
  /* Subtle gradients for depth */
  background-image: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 211, 238, 0.08), transparent),
    radial-gradient(ellipse 60% 80% at -10% 50%, rgba(168, 85, 247, 0.05), transparent),
    radial-gradient(ellipse 60% 80% at 110% 50%, rgba(236, 72, 153, 0.05), transparent);
  
  background-attachment: fixed;
}

/* Noise texture overlay */
html.dark body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* Noise pattern */
  z-index: -1;
  opacity: 0.6;
}
```

---

## Component Specifications

### Buttons

#### Primary Button

```tsx
// Usage
<button className={styles.btnPrimary}>
  <Icon size={18} />
  Save Changes
</button>

// SCSS
.btnPrimary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: hsl(var(--primary-foreground));
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

#### Secondary Button

```scss
.btnSecondary {
  @extend .btnPrimary;
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
  
  &:hover:not(:disabled) {
    background: hsl(var(--accent));
    border-color: hsl(var(--border-hover));
  }
}
```

#### Ghost Button

```scss
.btnGhost {
  @extend .btnPrimary;
  background: transparent;
  color: hsl(var(--foreground));
  
  &:hover:not(:disabled) {
    background: hsl(var(--accent));
  }
}
```

#### Icon Button

```scss
.btnIcon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover {
    background: hsl(var(--accent));
    border-color: hsl(var(--border-hover));
  }
}
```

### Cards

#### Standard Card

```tsx
// Usage
<div className={styles.card}>
  <h3 className={styles.cardTitle}>Card Title</h3>
  <p className={styles.cardDescription}>Description text</p>
</div>

// SCSS
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover {
    border-color: hsl(var(--border-hover));
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }
}

.cardTitle {
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-bottom: 0.5rem;
}

.cardDescription {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  line-height: 1.5;
}
```

#### Stat Card

```tsx
// Usage
<div className={styles.statCard}>
  <div className={styles.statIcon}>
    <Icon size={20} />
  </div>
  <div className={styles.statContent}>
    <p className={styles.statLabel}>Total Students</p>
    <h3 className={styles.statValue}>1,234</h3>
    <p className={styles.statChange}>+12% from last month</p>
  </div>
</div>

// SCSS
.statCard {
  @extend .card;
  display: flex;
  gap: 1rem;
}

.statIcon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: var(--gradient-blue);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.statContent {
  flex: 1;
}

.statLabel {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 0.25rem;
}

.statValue {
  font-size: 2rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  line-height: 1;
  margin-bottom: 0.25rem;
}

.statChange {
  font-size: 0.75rem;
  color: hsl(var(--success));
}
```

### Inputs

#### Text Input

```tsx
// Usage
<div className={styles.formGroup}>
  <label className={styles.label}>Email Address</label>
  <input 
    type="email" 
    className={styles.input}
    placeholder="Enter your email"
  />
</div>

// SCSS
.formGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: hsl(var(--input));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  transition: all var(--animation-normal) var(--ease-smooth);
  
  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
  
  &:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

#### Select Dropdown

```tsx
// Usage
<select className={styles.select}>
  <option>Select option</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

// SCSS
.select {
  @extend .input;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* Chevron icon */
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
  cursor: pointer;
}
```

### Badges

```tsx
// Usage
<span className={styles.badgePrimary}>Active</span>
<span className={styles.badgeSuccess}>Completed</span>
<span className={styles.badgeWarning}>Pending</span>
<span className={styles.badgeDestructive}>Failed</span>

// SCSS
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}

.badgePrimary {
  @extend .badge;
  background: hsl(var(--primary) / 0.15);
  color: hsl(var(--primary));
  border-color: hsl(var(--primary) / 0.2);
}

.badgeSuccess {
  @extend .badge;
  background: hsl(var(--success) / 0.15);
  color: hsl(var(--success));
  border-color: hsl(var(--success) / 0.2);
}

.badgeWarning {
  @extend .badge;
  background: hsl(var(--warning) / 0.15);
  color: hsl(var(--warning));
  border-color: hsl(var(--warning) / 0.2);
}

.badgeDestructive {
  @extend .badge;
  background: hsl(var(--destructive) / 0.15);
  color: hsl(var(--destructive));
  border-color: hsl(var(--destructive) / 0.2);
}
```

### Tables

```tsx
// Usage
<div className={styles.tableContainer}>
  <table className={styles.table}>
    <thead className={styles.thead}>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody className={styles.tbody}>
      <tr>
        <td>John Doe</td>
        <td><span className={styles.badgeSuccess}>Active</span></td>
        <td>2025-01-15</td>
      </tr>
    </tbody>
  </table>
</div>

// SCSS
.tableContainer {
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  overflow: hidden;
}

.table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.875rem;
  }
  
  th {
    background: hsl(var(--muted));
    font-weight: 600;
    color: hsl(var(--foreground));
    border-bottom: 1px solid hsl(var(--border));
  }
  
  td {
    color: hsl(var(--foreground));
    border-bottom: 1px solid hsl(var(--border));
  }
  
  tbody tr {
    transition: background var(--animation-fast) ease;
    
    &:hover {
      background: hsl(var(--accent) / 0.5);
    }
    
    &:last-child td {
      border-bottom: none;
    }
  }
}
```

### Modals/Dialogs

```tsx
// Usage
<div className={styles.modalOverlay}>
  <div className={styles.modal}>
    <div className={styles.modalHeader}>
      <h2>Modal Title</h2>
      <button className={styles.modalClose}>×</button>
    </div>
    <div className={styles.modalBody}>
      <p>Modal content goes here</p>
    </div>
    <div className={styles.modalFooter}>
      <button className={styles.btnSecondary}>Cancel</button>
      <button className={styles.btnPrimary}>Confirm</button>
    </div>
  </div>
</div>

// SCSS
.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease-out;
}

.modal {
  width: 90%;
  max-width: 500px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  box-shadow: var(--shadow-glass);
  animation: scaleIn 0.3s var(--ease-spring);
}

.modalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid hsl(var(--border));
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: hsl(var(--foreground));
  }
}

.modalClose {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  color: hsl(var(--muted-foreground));
  font-size: 1.5rem;
  cursor: pointer;
  transition: all var(--animation-fast) ease;
  
  &:hover {
    background: hsl(var(--accent));
    color: hsl(var(--foreground));
  }
}

.modalBody {
  padding: 1.5rem;
}

.modalFooter {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid hsl(var(--border));
}
```

### Dropdowns

```tsx
// Usage
<div className={styles.dropdown}>
  <button className={styles.dropdownTrigger}>
    Options
    <ChevronDown size={16} />
  </button>
  <div className={styles.dropdownContent}>
    <button className={styles.dropdownItem}>
      <Icon size={16} />
      Edit
    </button>
    <button className={styles.dropdownItem}>
      <Icon size={16} />
      Delete
    </button>
  </div>
</div>

// SCSS
.dropdown {
  position: relative;
}

.dropdownTrigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all var(--animation-normal) ease;
  
  &:hover {
    background: hsl(var(--accent));
  }
}

.dropdownContent {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.75rem;
  padding: 0.5rem;
  box-shadow: var(--shadow-glass);
  animation: scaleIn 0.2s var(--ease-spring);
  z-index: 1000;
}

.dropdownItem {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  text-align: left;
  cursor: pointer;
  transition: all var(--animation-fast) ease;
  
  &:hover {
    background: hsl(var(--accent));
  }
}
```

---

## Code Standards

### File Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.scss
│   │   │   └── index.ts
│   │   ├── Card/
│   │   └── Input/
│   ├── layouts/               # Layout components
│   │   ├── TenantAdminLayout/
│   │   │   ├── TenantAdminLayout.tsx
│   │   │   ├── components/
│   │   │   │   ├── PrimarySidebar/
│   │   │   │   ├── SecondarySidebar/
│   │   │   │   └── Header/
│   │   │   └── index.ts
│   └── features/              # Feature-specific components
├── pages/                     # Page components
├── styles/
│   ├── theme.css             # CSS variables (MUST load first)
│   ├── variables.scss        # SCSS variables
│   ├── globals.scss          # Global styles
│   └── animations.scss       # Animation definitions
├── contexts/                 # React contexts
│   └── ThemeContext.tsx
└── hooks/                    # Custom hooks
```

### Naming Conventions

```typescript
// Components: PascalCase
export const PrimarySidebar: React.FC = () => {};

// Props interfaces: ComponentNameProps
interface PrimarySidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

// CSS Modules: camelCase
.primarySidebar { }
.navItem { }
.navItemActive { }

// Files: PascalCase for components
PrimarySidebar.tsx
PrimarySidebar.module.scss

// Constants: UPPER_SNAKE_CASE
const MAX_ITEMS = 10;
const API_BASE_URL = 'https://api.example.com';

// Functions: camelCase
const handleClick = () => {};
const fetchUserData = async () => {};
```

### TypeScript Guidelines

```typescript
// Always use explicit types for props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// Use React.FC with props
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Export types for reuse
export type { ButtonProps };
```

### SCSS Best Practices

```scss
// Use CSS variables for theming
.component {
  background: hsl(var(--card));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}

// Nested selectors for states
.button {
  // Base styles
  
  &:hover {
    // Hover styles
  }
  
  &:disabled {
    // Disabled styles
  }
  
  &.active {
    // Active styles
  }
}

// Use :global() for dark mode
.component {
  background: white;
  
  :global(.dark) & {
    background: hsl(var(--card));
  }
}

// Mobile-first media queries
.component {
  // Mobile styles (default)
  
  @media (min-width: 768px) {
    // Tablet and above
  }
  
  @media (min-width: 1024px) {
    // Desktop and above
  }
}
```

### Responsive Breakpoints

```scss
// Standard breakpoints
$breakpoint-sm: 640px;   // Small devices
$breakpoint-md: 768px;   // Tablets
$breakpoint-lg: 1024px;  // Laptops
$breakpoint-xl: 1280px;  // Desktops
$breakpoint-2xl: 1536px; // Large desktops

// Usage
@media (max-width: $breakpoint-md) {
  // Styles for mobile and below
}

@media (min-width: $breakpoint-lg) {
  // Styles for desktop and above
}
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast

**Minimum contrast ratios**:
- Normal text: 4.5:1
- Large text (18px+ or 14px+ bold): 3:1
- UI components: 3:1

**Tested combinations**:
```css
/* Light Mode */
--foreground: 222 47% 11%;  /* #1a202c on white = 12.6:1 ✅ */
--muted-foreground: 215 16% 47%;  /* #64748b on white = 4.57:1 ✅ */

/* Dark Mode */
--foreground: 0 0% 98%;  /* #f8fafc on #0a0a0a = 16.8:1 ✅ */
--muted-foreground: 240 5% 65%;  /* #94a3b8 on #19191c = 5.2:1 ✅ */
```

#### Keyboard Navigation

```tsx
// All interactive elements must be keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  tabIndex={0}
>
  Click me
</button>

// Skip links for keyboard users
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Focus visible styles
button:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

#### ARIA Labels

```tsx
// Icon-only buttons
<button aria-label="Close dialog">
  <X size={20} />
</button>

// Form inputs
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-hint"
  aria-required="true"
/>
<p id="email-hint">We'll never share your email</p>

// Status messages
<div role="status" aria-live="polite">
  Settings saved successfully
</div>

// Navigation
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

#### Screen Reader Support

```tsx
// Hide decorative icons
<span aria-hidden="true">
  <Icon size={16} />
</span>

// Provide text alternatives
<button>
  <Icon size={16} aria-hidden="true" />
  <span>Save</span>
</button>

// Loading states
<button disabled aria-busy="true">
  <Loader className="animate-spin" aria-hidden="true" />
  <span>Loading...</span>
</button>
```

### Reduced Motion

```scss
// Respect user preferences
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Quick Reference

### Common Patterns

#### Loading State

```tsx
{isLoading ? (
  <div className={styles.loadingState}>
    <Loader className="animate-spin" size={24} />
    <p>Loading...</p>
  </div>
) : (
  <div>{content}</div>
)}
```

#### Empty State

```tsx
<div className={styles.emptyState}>
  <div className={styles.emptyIcon}>
    <Icon size={48} />
  </div>
  <h3>No items found</h3>
  <p>Get started by creating your first item</p>
  <button className={styles.btnPrimary}>
    <Plus size={18} />
    Create Item
  </button>
</div>
```

#### Error State

```tsx
<div className={styles.errorState}>
  <AlertCircle size={24} />
  <p>Something went wrong. Please try again.</p>
  <button onClick={retry}>Retry</button>
</div>
```

---

## Implementation Checklist

### For New Components

- [ ] Use CSS variables for colors (`hsl(var(--color-name))`)
- [ ] Support both light and dark themes
- [ ] Include hover/active/focus states
- [ ] Add proper TypeScript types
- [ ] Implement keyboard navigation
- [ ] Add ARIA labels where needed
- [ ] Test color contrast (4.5:1 minimum)
- [ ] Use proper spacing scale
- [ ] Add loading/error/empty states
- [ ] Test on mobile, tablet, desktop
- [ ] Add smooth transitions (0.3s default)
- [ ] Use gradient icons consistently
- [ ] Follow naming conventions
- [ ] Document props interface
- [ ] Add responsive breakpoints

### For New Pages

- [ ] Use TenantAdminLayout wrapper
- [ ] Add proper page title
- [ ] Include breadcrumb navigation
- [ ] Implement responsive grid
- [ ] Add loading skeleton
- [ ] Handle error states
- [ ] Include empty states
- [ ] Test dark mode appearance
- [ ] Verify sidebar navigation
- [ ] Check mobile experience
- [ ] Add proper metadata
- [ ] Test keyboard navigation

---


Use this toaster

Here's a quick guide to using the toast system in any file:

1. Basic Usage - Simple Toast

import { showToast } from "@/components/ui/mohsin-toast";

// Basic toast with title, message, and variant
showToast("Title", "Your message here", "success");

2. Advanced Usage - Toast with Options

import { toast } from "@/components/ui/mohsin-toast";

// Using the toast function with more options
toast({
  title: "Hello",
  description: "Detailed message here",
  variant: "success", // "success" | "error" | "warning" | "info" | "discovery" | "notification" | "update"
  duration: 5000, // milliseconds
  style: "glass", // "solid" | "outline" | "glass"
  size: "md" // "sm" | "md" | "lg"
});


3. Shorthand Methods

import { toast } from "@/components/ui/mohsin-toast";

// Success toast
toast.success({
  title: "Success!",
  description: "Operation completed"
});

// Error toast
toast.error({
  title: "Error!",
  description: "Something went wrong"
});

// Warning toast
toast.warning({
  title: "Warning",
  description: "Please check your input"
});

Use Advanced Usage - Toast with Options 


## Version History

**v1.0** - Initial design system (October 2025)
- Established three-tier sidebar architecture
- Defined dark mode color palette
- Created gradient icon system
- Implemented responsive layouts
- Added animation standards
- Documented all component specifications

---

## Support & Resources

**Design Tools**:
- Figma file: [Link to design file]
- Icon library: [Lucide Icons](https://lucide.dev)
- Color picker: [HSL Color Picker](https://hslpicker.com)

**Development**:
- React 18+ with TypeScript
- SCSS Modules for styling
- Vite for build tooling
- Lucide React for icons

**References**:
- [Appwrite Design](https://appwrite.io)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**This design system is maintained by the NeoEdu development team. For questions or suggestions, please open an issue in the project repository.**