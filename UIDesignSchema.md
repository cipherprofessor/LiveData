# NeoDesk Design System Documentation

## 🎨 Design Philosophy

NeoDesk follows a **Modern Glass Morphism** design philosophy with clean aesthetics, subtle animations, and premium visual effects. The design emphasizes:

- **Clean & Minimal** - Uncluttered interfaces with purposeful whitespace
- **Glass Morphism** - Translucent backgrounds with blur effects
- **Smooth Animations** - Spring-based easing with staggered entrances
- **Gradient Accents** - Subtle gradients for depth and visual interest
- **Accessible Design** - WCAG compliant with reduced motion support
- **Dynamic Theming** - Seamless light/dark mode transitions
- **Always give files in tsx and module.scss seperately 

---

## 🌓 Theme System

### Theme Structure
NeoDesk uses CSS custom properties with HSL values for perfect theme switching:

```scss
:root {
  /* Light Theme Variables (Default) */
}

.dark {
  /* Dark Theme Variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Automatic dark mode based on system preference */
  }
}
```

---

## 🎭 Color Palette

### Light Theme Colors
```scss
:root {
  /* Backgrounds */
  --background: 0 0% 100%;             // #ffffff (Pure White)
  --foreground: 217 19% 15%;           // #1e293b (Dark Text)
  --card: 0 0% 100%;                   // #ffffff (Card Background)
  --card-alt: 220 14% 96%;             // #f8fafc (Alternative Cards)
  
  /* Primary Colors */
  --primary: 214 95% 55%;              // #3b82f6 (Modern Blue)
  --primary-hover: 214 95% 60%;       // #60a5fa (Hover Blue)
  --primary-foreground: 0 0% 100%;    // #ffffff (White Text)
  
  /* Secondary Colors */
  --secondary: 220 14% 96%;            // #f8fafc (Light Gray)
  --secondary-foreground: 217 19% 15%; // #1e293b (Dark Text)
  
  /* Muted Colors */
  --muted: 220 14% 96%;                // #f8fafc (Muted Background)
  --muted-foreground: 217 13% 45%;    // #64748b (Muted Text)
  
  /* Accent Colors */
  --accent: 220 14% 96%;               // #f8fafc (Accent Background)
  --accent-foreground: 217 19% 15%;   // #1e293b (Accent Text)
  
  /* Borders & Inputs */
  --border: 220 13% 91%;               // #e2e8f0 (Light Border)
  --border-hover: 220 13% 85%;        // #cbd5e1 (Hover Border)
  --input: 220 13% 91%;               // #e2e8f0 (Input Background)
  --ring: 214 95% 55%;                // #3b82f6 (Focus Ring)
  
  /* Glass Morphism */
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-blur: 20px;
}
```

### Dark Theme Colors
```scss
.dark {
  /* Backgrounds */
  --background: 217 19% 12%;           // #1e293b (Deep Blue-Gray)
  --foreground: 213 31% 91%;           // #f1f5f9 (Light Text)
  --card: 217 19% 15%;                 // #334155 (Card Background)
  --card-alt: 217 19% 18%;             // #475569 (Alternative Cards)
  
  /* Primary Colors */
  --primary: 214 95% 65%;              // #60a5fa (Brighter Blue)
  --primary-hover: 214 95% 70%;       // #93c5fd (Hover Blue)
  --primary-foreground: 213 31% 91%;  // #f1f5f9 (Light Text)
  
  /* Secondary Colors */
  --secondary: 217 19% 21%;            // #475569 (Dark Gray)
  --secondary-foreground: 213 31% 91%; // #f1f5f9 (Light Text)
  
  /* Muted Colors */
  --muted: 217 19% 18%;                // #475569 (Muted Background)
  --muted-foreground: 217 13% 65%;    // #94a3b8 (Muted Text)
  
  /* Accent Colors */
  --accent: 217 19% 21%;               // #475569 (Accent Background)
  --accent-foreground: 213 31% 91%;   // #f1f5f9 (Accent Text)
  
  /* Borders & Inputs */
  --border: 217 19% 22%;               // #475569 (Dark Border)
  --border-hover: 217 19% 25%;        // #64748b (Hover Border)
  --input: 217 19% 18%;               // #475569 (Input Background)
  --ring: 214 95% 65%;                // #60a5fa (Focus Ring)
  
  /* Glass Morphism */
  --glass-bg: rgba(0, 0, 0, 0.4);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: 20px;
}
```

### Semantic Colors (Both Themes)
```scss
/* State Colors - Consistent across themes */
--success: 142 71% 45%;              // #10b981 (Green)
--success-foreground: 213 31% 91%;  // #f1f5f9 (Light Text)
--warning: 45 93% 47%;               // #f59e0b (Amber)
--warning-foreground: 213 31% 91%;  // #f1f5f9 (Light Text)
--destructive: 0 84% 60%;            // #ef4444 (Red)
--destructive-foreground: 213 31% 91%; // #f1f5f9 (Light Text)
--info: 214 95% 65%;                 // #60a5fa (Blue)
--info-foreground: 213 31% 91%;     // #f1f5f9 (Light Text)
```

---

## 🎨 Gradient System

### Light Theme Gradients
```scss
/* Light Mode Glass Effects */
--gradient-glass-light: linear-gradient(135deg, 
  rgba(255, 255, 255, 0.9) 0%,
  rgba(248, 250, 252, 0.95) 50%,
  rgba(241, 245, 249, 0.9) 100%
);

--gradient-card-light: linear-gradient(135deg, 
  rgba(255, 255, 255, 0.8) 0%,
  rgba(248, 250, 252, 0.9) 100%
);

--gradient-primary-light: linear-gradient(135deg, #3b82f6, #1d4ed8);
--gradient-secondary-light: linear-gradient(135deg, #f8fafc, #e2e8f0);
```

### Dark Theme Gradients  
```scss
/* Dark Mode Glass Effects */
--gradient-glass-dark: linear-gradient(135deg, 
  rgba(30, 41, 59, 0.9) 0%,
  rgba(51, 65, 85, 0.95) 50%,
  rgba(71, 85, 105, 0.9) 100%
);

--gradient-card-dark: linear-gradient(135deg, 
  rgba(51, 65, 85, 0.8) 0%,
  rgba(71, 85, 105, 0.9) 100%
);

--gradient-primary-dark: linear-gradient(135deg, #60a5fa, #3b82f6);
--gradient-secondary-dark: linear-gradient(135deg, #475569, #334155);
```

### Multi-Color Gradients (Theme Agnostic)
```scss
--gradient-rainbow: linear-gradient(90deg, 
  #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6
);

--gradient-purple: linear-gradient(135deg, #8b5cf6, #7c3aed);
--gradient-green: linear-gradient(135deg, #10b981, #059669);
--gradient-orange: linear-gradient(135deg, #f59e0b, #d97706);
--gradient-pink: linear-gradient(135deg, #ec4899, #db2777);
--gradient-blue: linear-gradient(135deg, #3b82f6, #1d4ed8);
```

---

## 🔧 Component Architecture

### Theme-Aware Component Template
```tsx
// ComponentName.tsx
import React from 'react';
import styles from './ComponentName.module.scss';
import { Icon } from 'lucide-react';

interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'auto';
  children: React.ReactNode;
  className?: string;
}

export const ComponentName = ({ 
  variant = 'primary', 
  size = 'md',
  theme = 'auto',
  children, 
  className 
}: ComponentProps) => {
  return (
    <div className={`
      ${styles.component} 
      ${styles[variant]} 
      ${styles[size]} 
      ${theme !== 'auto' ? styles[theme] : ''}
      ${className || ''}
    `}>
      <div className={styles.backgroundGlow}></div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.hoverGlow}></div>
    </div>
  );
};
```

### Theme-Aware SCSS Template
```scss
// ComponentName.module.scss
.component {
  // Base styles using CSS variables
  background: linear-gradient(135deg, 
    hsl(var(--card)) 0%, 
    hsl(var(--card-alt)) 100%
  );
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all var(--animation-normal) var(--ease-spring);
  position: relative;
  overflow: hidden;
  
  // Glass morphism effect
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  
  &:hover {
    border-color: hsl(var(--border-hover));
    transform: translateY(-2px);
    box-shadow: 0 8px 25px hsl(var(--primary) / 0.15);
    
    .hoverGlow {
      opacity: 1;
    }
  }
  
  // Dark mode specific adjustments (if needed)
  :global(.dark) & {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
}

.backgroundGlow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    hsl(var(--primary) / 0.05),
    hsl(var(--accent) / 0.02)
  );
  opacity: 0;
  transition: opacity var(--animation-normal) ease;
}

.hoverGlow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    hsl(var(--primary) / 0.1),
    hsl(var(--accent) / 0.05)
  );
  opacity: 0;
  transition: opacity var(--animation-normal) ease;
  border-radius: inherit;
}

.content {
  position: relative;
  z-index: 1;
}

// Variant styles
.primary {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--primary-hover))
  );
  color: hsl(var(--primary-foreground));
}

.secondary {
  background: linear-gradient(135deg, 
    hsl(var(--secondary)), 
    hsl(var(--muted))
  );
  color: hsl(var(--secondary-foreground));
}

.outline {
  background: hsl(var(--background));
  border: 2px solid hsl(var(--border));
  
  &:hover {
    background: hsl(var(--accent));
    border-color: hsl(var(--primary) / 0.5);
  }
}

.ghost {
  background: transparent;
  
  &:hover {
    background: hsl(var(--accent));
  }
}

// Size variants
.sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.md {
  padding: 0.75rem 1rem;
  font-size: 1rem;
}

.lg {
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
}
```

---

## 🎪 Animation System

### CSS Variables
```scss
:root {
  --animation-fast: 0.15s;
  --animation-normal: 0.3s;
  --animation-slow: 0.5s;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Standard Animations
```scss
// Entrance Animations
@keyframes slideInFromBottom {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInFromLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInFromRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInFromTop {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 0.8; transform: scale(1.05); }
  70% { opacity: 0.9; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

// Continuous Animations
@keyframes pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### Animation Usage Patterns
```scss
// Component entrance with stagger
.component {
  animation: slideInFromBottom 0.6s var(--ease-spring) both;
}

// Staggered children
.component:nth-child(1) { animation-delay: 0s; }
.component:nth-child(2) { animation-delay: 0.1s; }
.component:nth-child(3) { animation-delay: 0.2s; }
.component:nth-child(4) { animation-delay: 0.3s; }

// Hover effects
.component:hover {
  transform: translateY(-2px);
  transition: all var(--animation-normal) var(--ease-spring);
}

// Loading states
.loading {
  .icon {
    animation: rotate 1s linear infinite;
  }
}
```

---

## ✨ Glass Morphism Effects

### Light Theme Glass
```scss
.glassLight {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%,
    rgba(248, 250, 252, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### Dark Theme Glass
```scss
.glassDark {
  background: linear-gradient(135deg, 
    rgba(30, 41, 59, 0.9) 0%,
    rgba(51, 65, 85, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 116, 139, 0.5);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Universal Glass Component
```scss
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  
  // Light theme
  :root & {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  // Dark theme
  :global(.dark) & {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}
```

---

## 🔥 Hover & Interaction Effects

### Standard Hover Patterns
```scss
// Lift Effect
.hoverLift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px hsl(var(--primary) / 0.2);
}

// Scale Effect
.hoverScale:hover {
  transform: scale(1.02);
}

// Glow Effect
.hoverGlow:hover {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}

// Tilt Effect
.hoverTilt:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
}

// Shimmer Effect
.shimmer {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
}
```

### Button Interaction States
```scss
.button {
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px hsl(var(--primary) / 0.4);
  }
  
  &:active {
    transform: translateY(0);
    transition-duration: var(--animation-fast);
  }
  
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
}
```

---

## 📱 Responsive Design

### Breakpoint System
```scss
// Mobile First Approach
$breakpoints: (
  'xs': 0,
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);

// Usage
@media (min-width: 640px) {
  .component { /* Tablet and up */ }
}

@media (min-width: 1024px) {
  .component { /* Desktop and up */ }
}
```

### Responsive Patterns
```scss
.responsiveGrid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

---

## 🎯 Icon System

### Icon Library: Lucide React
```tsx
import { 
  Zap, Sparkles, Users, Settings, Bell, Search, Plus,
  ChevronDown, ChevronRight, ArrowRight, ExternalLink,
  Check, X, Info, AlertTriangle, Heart, Star,
  Home, Dashboard, Projects, Calendar, Messages
} from 'lucide-react';
```

### Icon Usage Patterns
```tsx
// Standard sizes
<Icon size={16} />  // Small
<Icon size={20} />  // Medium (default)
<Icon size={24} />  // Large

// With animations
<Icon 
  size={20} 
  className={styles.iconRotate}  // Rotating animation
/>

// Colored icons
<Icon 
  size={20} 
  style={{ color: 'hsl(var(--primary))' }}
/>
```

---

## ♿ Accessibility Guidelines

### Focus Management
```scss
.focusable {
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-radius: 0.375rem;
  }
}
```

### Reduced Motion Support
```scss
@media (prefers-reduced-motion: reduce) {
  .component,
  .component *,
  .component *::before,
  .component *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Support
```scss
@media (prefers-contrast: high) {
  .component {
    border-width: 2px;
    border-color: currentColor;
  }
}
```

---

## 🔍 Implementation Checklist

### For AI Models:
- [ ] Use HSL color values with CSS custom properties
- [ ] Implement glass morphism with backdrop-filter
- [ ] Add spring-based animations with cubic-bezier easing
- [ ] Support both light and dark themes
- [ ] Use Lucide React icons consistently
- [ ] Add hover effects with transform and box-shadow
- [ ] Include reduced motion support
- [ ] Implement proper focus states
- [ ] Use responsive grid layouts
- [ ] Add loading and error states

### For Human Developers:
- [ ] Install required dependencies (Lucide React, SCSS)
- [ ] Set up theme provider for light/dark switching
- [ ] Configure CSS custom properties
- [ ] Test across different devices and browsers
- [ ] Validate accessibility with screen readers
- [ ] Optimize animations for performance
- [ ] Add proper TypeScript interfaces
- [ ] Document component APIs
- [ ] Test theme switching functionality
- [ ] Verify glass morphism effects across browsers

---

## 🚀 Quick Start Example

```tsx
// ThemeProvider setup
import { ThemeProvider } from 'next-themes';

export default function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}

// Component implementation
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus } from 'lucide-react';

export function Example() {
  return (
    <Card variant="glass" className="animate-slide-up">
      <h2>Modern NeoDesk Component</h2>
      <Button variant="primary" size="md">
        <Plus size={16} />
        Create New
      </Button>
    </Card>
  );
}
```

---

## 📋 Theme Implementation Fixes Needed

### 1. Update Global CSS (globals.css)
```scss
/* Ensure proper theme detection */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Apply dark theme when system is dark and not explicitly light */
    --background: 217 19% 12%;
    --foreground: 213 31% 91%;
    /* ... other dark theme variables */
  }
}
```

### 2. Component SCSS Updates Required
All component `.module.scss` files need to be updated to use CSS variables:

```scss
// OLD (Hard-coded colors)
.component {
  background: #1e293b;
  color: #f1f5f9;
}

// NEW (Theme-aware)
.component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### 3. ThemeProvider Configuration
```tsx
// app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange={false}
  storageKey="neodesk-theme"
>
```

### 4. Theme Toggle Component
```tsx
// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

---

## 🎨 Color Usage Examples

### Buttons
```scss
.primaryButton {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--primary-hover))
  );
  color: hsl(var(--primary-foreground));
}

.secondaryButton {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
}
```

### Cards
```scss
.card {
  background: linear-gradient(135deg, 
    hsl(var(--card)) 0%, 
    hsl(var(--card-alt)) 100%
  );
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
}
```

### Inputs
```scss
.input {
  background: hsl(var(--input));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
  
  &:focus {
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.2);
  }
}
```

---

## 🔧 Component Status Indicators

### Status Colors
```scss
.statusSuccess {
  background: linear-gradient(135deg, 
    hsl(var(--success)), 
    hsl(var(--success)) 80%
  );
  color: hsl(var(--success-foreground));
}

.statusWarning {
  background: linear-gradient(135deg, 
    hsl(var(--warning)), 
    hsl(var(--warning)) 80%
  );
  color: hsl(var(--warning-foreground));
}

.statusError {
  background: linear-gradient(135deg, 
    hsl(var(--destructive)), 
    hsl(var(--destructive)) 80%
  );
  color: hsl(var(--destructive-foreground));
}
```

---

## 🎭 Advanced Animation Patterns

### Staggered Animations
```scss
.staggerContainer > * {
  animation: slideInFromBottom 0.6s var(--ease-spring) both;
}

.staggerContainer > *:nth-child(1) { animation-delay: 0s; }
.staggerContainer > *:nth-child(2) { animation-delay: 0.1s; }
.staggerContainer > *:nth-child(3) { animation-delay: 0.2s; }
.staggerContainer > *:nth-child(4) { animation-delay: 0.3s; }
.staggerContainer > *:nth-child(5) { animation-delay: 0.4s; }
```

### Complex Hover Effects
```scss
.complexHover {
  position: relative;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent, 
      hsl(var(--primary) / 0.1), 
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 12px 30px hsl(var(--primary) / 0.2),
      0 0 20px hsl(var(--primary) / 0.1);
    
    &::before {
      transform: translateX(100%);
    }
  }
}
```

---

## 🎯 Layout Patterns

### Responsive Grids
```scss
.autoGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    gap: 2rem;
  }
}

.responsiveColumns {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

### Flexible Layouts
```scss
.sidebar {
  width: 320px;
  transition: width var(--animation-normal) var(--ease-spring);
  
  &.collapsed {
    width: 80px;
  }
  
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }
}
```

---

## 🎨 Typography System

### Font Scale
```scss
.textXs { font-size: 0.75rem; line-height: 1rem; }
.textSm { font-size: 0.875rem; line-height: 1.25rem; }
.textBase { font-size: 1rem; line-height: 1.5rem; }
.textLg { font-size: 1.125rem; line-height: 1.75rem; }
.textXl { font-size: 1.25rem; line-height: 1.75rem; }
.text2Xl { font-size: 1.5rem; line-height: 2rem; }
.text3Xl { font-size: 1.875rem; line-height: 2.25rem; }
.text4Xl { font-size: 2.25rem; line-height: 2.5rem; }
```

### Text Styles
```scss
.textGradient {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--accent))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.textMuted {
  color: hsl(var(--muted-foreground));
}

.textSubtle {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
```

---

## 🚨 Implementation Warnings

### Critical Issues to Fix:
1. **Theme not switching**: CSS variables not properly scoped
2. **Hard-coded colors**: Components using fixed hex values
3. **Missing glass effects**: backdrop-filter not applied consistently
4. **Animation performance**: Too many simultaneous animations
5. **Accessibility gaps**: Focus states and reduced motion not implemented

### Next Steps:
1. Update all component SCSS files to use CSS variables
2. Implement proper theme provider setup
3. Add glass morphism effects consistently
4. Test theme switching functionality
5. Optimize animations for performance
6. Add comprehensive accessibility support

This documentation provides the complete foundation for implementing a consistent, modern, and accessible design system across all NeoDesk components with proper light/dark theme support. { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

// Continuous Animations
@keyframes pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Animation Usage Patterns
```scss
// Component entrance with stagger
.component {
  animation: slideInFromBottom 0.6s var(--ease-spring) both;
}

// Staggered children
.component:nth-child(1) { animation-delay: 0s; }
.component:nth-child(2) { animation-delay: 0.1s; }
.component:nth-child(3) { animation-delay: 0.2s; }

// Hover effects
.component:hover {
  transform: translateY(-2px);
  transition: all var(--animation-normal) var(--ease-spring);
}
```

---

## ✨ Glass Morphism Effects

### Base Glass Component
```scss
.glassComponent {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### Light Theme Glass
```scss
.glassLight {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%,
    rgba(248, 250, 252, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### Dark Theme Glass
```scss
.glassDark {
  background: linear-gradient(135deg, 
    rgba(30, 41, 59, 0.9) 0%,
    rgba(51, 65, 85, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(100, 116, 139, 0.5);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Universal Glass Component
```scss
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  
  // Light theme
  :root & {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  // Dark theme
  :global(.dark) & {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}
```

---

## 🔥 Hover & Interaction Effects

### Standard Hover Patterns
```scss
// Lift Effect
.hoverLift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px hsl(var(--primary) / 0.2);
}

// Scale Effect
.hoverScale:hover {
  transform: scale(1.02);
}

// Glow Effect
.hoverGlow:hover {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}

// Tilt Effect
.hoverTilt:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
}

// Shimmer Effect
.shimmer {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
}
```

### Button Interaction States
```scss
.button {
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px hsl(var(--primary) / 0.4);
  }
  
  &:active {
    transform: translateY(0);
    transition-duration: var(--animation-fast);
  }
  
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
}
```

---

## 📱 Responsive Design

### Breakpoint System
```scss
// Mobile First Approach
$breakpoints: (
  'xs': 0,
  'sm': 640px,
  'md': 768px,
  'lg': 1024px,
  'xl': 1280px,
  '2xl': 1536px
);

// Usage
@media (min-width: 640px) {
  .component { /* Tablet and up */ }
}

@media (min-width: 1024px) {
  .component { /* Desktop and up */ }
}
```

### Responsive Patterns
```scss
.responsiveGrid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

---

## 🎯 Icon System

### Icon Library: Lucide React
```tsx
import { 
  Zap, Sparkles, Users, Settings, Bell, Search, Plus,
  ChevronDown, ChevronRight, ArrowRight, ExternalLink,
  Check, X, Info, AlertTriangle, Heart, Star,
  Home, Dashboard, Projects, Calendar, Messages
} from 'lucide-react';
```

### Icon Usage Patterns
```tsx
// Standard sizes
<Icon size={16} />  // Small
<Icon size={20} />  // Medium (default)
<Icon size={24} />  // Large

// With animations
<Icon 
  size={20} 
  className={styles.iconRotate}  // Rotating animation
/>

// Colored icons
<Icon 
  size={20} 
  style={{ color: 'hsl(var(--primary))' }}
/>
```

---

## ♿ Accessibility Guidelines

### Focus Management
```scss
.focusable {
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
    border-radius: 0.375rem;
  }
}
```

### Reduced Motion Support
```scss
@media (prefers-reduced-motion: reduce) {
  .component,
  .component *,
  .component *::before,
  .component *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Support
```scss
@media (prefers-contrast: high) {
  .component {
    border-width: 2px;
    border-color: currentColor;
  }
}
```

---

## 🔍 Implementation Checklist

### For AI Models:
- [ ] Use HSL color values with CSS custom properties
- [ ] Implement glass morphism with backdrop-filter
- [ ] Add spring-based animations with cubic-bezier easing
- [ ] Support both light and dark themes
- [ ] Use Lucide React icons consistently
- [ ] Add hover effects with transform and box-shadow
- [ ] Include reduced motion support
- [ ] Implement proper focus states
- [ ] Use responsive grid layouts
- [ ] Add loading and error states

### For Human Developers:
- [ ] Install required dependencies (Lucide React, SCSS)
- [ ] Set up theme provider for light/dark switching
- [ ] Configure CSS custom properties
- [ ] Test across different devices and browsers
- [ ] Validate accessibility with screen readers
- [ ] Optimize animations for performance
- [ ] Add proper TypeScript interfaces
- [ ] Document component APIs
- [ ] Test theme switching functionality
- [ ] Verify glass morphism effects across browsers

---

## 🚀 Quick Start Example

```tsx
// ThemeProvider setup
import { ThemeProvider } from 'next-themes';

export default function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}

// Component implementation
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus } from 'lucide-react';

export function Example() {
  return (
    <Card variant="glass" className="animate-slide-up">
      <h2>Modern NeoDesk Component</h2>
      <Button variant="primary" size="md">
        <Plus size={16} />
        Create New
      </Button>
    </Card>
  );
}
```

---

## 📋 Theme Implementation Fixes Needed

### 1. Update Global CSS (globals.css)
```scss
/* Ensure proper theme detection */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Apply dark theme when system is dark and not explicitly light */
    --background: 217 19% 12%;
    --foreground: 213 31% 91%;
    /* ... other dark theme variables */
  }
}
```

### 2. Component SCSS Updates Required
All component `.module.scss` files need to be updated to use CSS variables:

```scss
// OLD (Hard-coded colors)
.component {
  background: #1e293b;
  color: #f1f5f9;
}

// NEW (Theme-aware)
.component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### 3. ThemeProvider Configuration
```tsx
// app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange={false}
  storageKey="neodesk-theme"
>
```

### 4. Theme Toggle Component
```tsx
// components/ThemeToggle.tsx
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

---

## 🎨 Color Usage Examples

### Buttons
```scss
.primaryButton {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--primary-hover))
  );
  color: hsl(var(--primary-foreground));
}

.secondaryButton {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
}
```

### Cards
```scss
.card {
  background: linear-gradient(135deg, 
    hsl(var(--card)) 0%, 
    hsl(var(--card-alt)) 100%
  );
  border: 1px solid hsl(var(--border));
  color: hsl(var(--card-foreground));
}
```

### Inputs
```scss
.input {
  background: hsl(var(--input));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
  
  &:focus {
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.2);
  }
}
```

---

## 🔧 Component Status Indicators

### Status Colors
```scss
.statusSuccess {
  background: linear-gradient(135deg, 
    hsl(var(--success)), 
    hsl(var(--success)) 80%
  );
  color: hsl(var(--success-foreground));
}

.statusWarning {
  background: linear-gradient(135deg, 
    hsl(var(--warning)), 
    hsl(var(--warning)) 80%
  );
  color: hsl(var(--warning-foreground));
}

.statusError {
  background: linear-gradient(135deg, 
    hsl(var(--destructive)), 
    hsl(var(--destructive)) 80%
  );
  color: hsl(var(--destructive-foreground));
}
```

---

## 🎭 Advanced Animation Patterns

### Staggered Animations
```scss
.staggerContainer > * {
  animation: slideInFromBottom 0.6s var(--ease-spring) both;
}

.staggerContainer > *:nth-child(1) { animation-delay: 0s; }
.staggerContainer > *:nth-child(2) { animation-delay: 0.1s; }
.staggerContainer > *:nth-child(3) { animation-delay: 0.2s; }
.staggerContainer > *:nth-child(4) { animation-delay: 0.3s; }
.staggerContainer > *:nth-child(5) { animation-delay: 0.4s; }
```

### Complex Hover Effects
```scss
.complexHover {
  position: relative;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, 
      transparent, 
      hsl(var(--primary) / 0.1), 
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 12px 30px hsl(var(--primary) / 0.2),
      0 0 20px hsl(var(--primary) / 0.1);
    
    &::before {
      transform: translateX(100%);
    }
  }
}
```

---

## 🎯 Layout Patterns

### Responsive Grids
```scss
.autoGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    gap: 2rem;
  }
}

.responsiveColumns {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

### Flexible Layouts
```scss
.sidebar {
  width: 320px;
  transition: width var(--animation-normal) var(--ease-spring);
  
  &.collapsed {
    width: 80px;
  }
  
  @media (max-width: 767px) {
    position: fixed;
    width: 100%;
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }
}
```

---

## 🎨 Typography System

### Font Scale
```scss
.textXs { font-size: 0.75rem; line-height: 1rem; }
.textSm { font-size: 0.875rem; line-height: 1.25rem; }
.textBase { font-size: 1rem; line-height: 1.5rem; }
.textLg { font-size: 1.125rem; line-height: 1.75rem; }
.textXl { font-size: 1.25rem; line-height: 1.75rem; }
.text2Xl { font-size: 1.5rem; line-height: 2rem; }
.text3Xl { font-size: 1.875rem; line-height: 2.25rem; }
.text4Xl { font-size: 2.25rem; line-height: 2.5rem; }
```

### Text Styles
```scss
.textGradient {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--accent))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.textMuted {
  color: hsl(var(--muted-foreground));
}

.textSubtle {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
}
```

---

## 🚨 Implementation Warnings

### Critical Issues to Fix:
1. **Theme not switching**: CSS variables not properly scoped
2. **Hard-coded colors**: Components using fixed hex values
3. **Missing glass effects**: backdrop-filter not applied consistently
4. **Animation performance**: Too many simultaneous animations
5. **Accessibility gaps**: Focus states and reduced motion not implemented

### Next Steps:
1. Update all component SCSS files to use CSS variables
2. Implement proper theme provider setup
3. Add glass morphism effects consistently
4. Test theme switching functionality
5. Optimize animations for performance
6. Add comprehensive accessibility support

This documentation provides the complete foundation for implementing a consistent, modern, and accessible design system across all NeoDesk components with proper light/dark theme support.