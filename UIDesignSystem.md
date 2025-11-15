# CyberFort Academy UI Design System Documentation

## 🎯 Overview

CyberFort Academy follows a **Modern Glass Morphism** design philosophy with cybersecurity-themed aesthetics, smooth animations, and premium visual effects. The design emphasizes clean interfaces, translucent backgrounds, and professional dark themes suitable for a technical learning platform.

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [File Structure](#file-structure)
4. [Theme System](#theme-system)
5. [Animation System](#animation-system)
6. [Component Architecture](#component-architecture)
7. [Best Practices](#best-practices)
8. [Code Examples](#code-examples)
9. [Responsive Design](#responsive-design)
10. [Do's and Don'ts](#dos-and-donts)

---

## 🎨 Design Philosophy

### Core Principles
- **Glass Morphism**: Translucent backgrounds with backdrop-filter blur effects
- **Cybersecurity Aesthetic**: Dark themes with blue accent colors and tech-inspired elements
- **Smooth Animations**: Spring-based easing with staggered entrance effects
- **Responsive First**: Mobile-optimized layouts that scale beautifully
- **Accessible Design**: WCAG compliant with proper focus states and reduced motion support

### Visual Characteristics
- Dark gradient backgrounds with grid patterns
- Blue (#3b82f6) primary color with glowing effects
- Glass morphism cards and components
- Subtle shadows and blur effects
- Animated corner brackets and scanning elements

---

## 🌈 Color System

### Primary Colors (HSL Values)
```scss
// Light Theme
--primary: 214 95% 55%;              /* #3b82f6 */
--primary-hover: 214 95% 60%;        /* #60a5fa */
--primary-foreground: 0 0% 100%;     /* #ffffff */

// Dark Theme  
--primary: 214 95% 65%;              /* #60a5fa */
--primary-hover: 214 95% 70%;        /* #93c5fd */
```

### Semantic Colors
```scss
--success: 142 71% 45%;              /* #10b981 */
--warning: 45 93% 47%;               /* #f59e0b */
--destructive: 0 84% 60%;            /* #ef4444 */
--info: 214 95% 65%;                 /* #60a5fa */
```

### Background Colors
```scss
// Light Theme
--background: 0 0% 100%;             /* #ffffff */
--card: 0 0% 100%;                   /* #ffffff */
--card-alt: 220 14% 96%;             /* #f8fafc */

// Dark Theme
--background: 217 19% 12%;           /* #1e293b */
--card: 217 19% 15%;                 /* #334155 */
--card-alt: 217 19% 18%;             /* #475569 */
```

### Glass Morphism Variables
```scss
// Light Mode
--glass-bg: rgba(255, 255, 255, 0.8);
--glass-border: rgba(0, 0, 0, 0.1);
--glass-blur: 20px;

// Dark Mode
--glass-bg: rgba(0, 0, 0, 0.4);
--glass-border: rgba(255, 255, 255, 0.1);
```

---

## 📁 File Structure

```
frontend/src/
├── index.css                    # Main entry point with CSS variables
├── styles/
│   ├── globals.scss            # Global utilities and base styles
│   ├── animations.scss         # Animation keyframes and classes
│   └── utilities.scss          # Utility classes for layout/spacing
├── components/
│   └── ui/
│       ├── Button/
│       │   ├── Button.tsx
│       │   └── Button.module.scss
│       └── Card/
│           ├── Card.tsx
│           └── Card.module.scss
└── contexts/
    └── ThemeContext.tsx        # Theme management
```

### File Responsibilities

**index.css**: 
- CSS variable definitions
- CSS reset and base styles
- Theme switching logic
- Global imports

**globals.scss**:
- Typography scales
- Glass morphism classes
- Common component styles
- Layout utilities

**animations.scss**:
- Animation keyframes
- Animation utility classes  
- Staggered animation helpers
- Reduced motion support

**utilities.scss**:
- Flexbox/Grid utilities
- Spacing classes
- Responsive helpers
- Display utilities

---

## 🌓 Theme System

### Implementation
CyberFort Academy uses a custom React context for theme management with support for light, dark, and system themes.

### Usage Example
```tsx
import { useTheme } from '@/contexts/ThemeContext';

const Component = () => {
  const { theme, setTheme, isDark, toggle } = useTheme();
  
  return (
    <button onClick={toggle} className="theme-toggle">
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};
```

### CSS Variable Usage
```scss
.component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  
  &:hover {
    border-color: hsl(var(--border-hover));
  }
}
```

---

## 🎪 Animation System

### Animation Variables
```scss
--animation-fast: 0.15s;
--animation-normal: 0.3s;
--animation-slow: 0.5s;
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### Available Animation Classes
```scss
.animate-slide-up     /* Slide in from bottom */
.animate-fade-in      /* Fade in effect */
.animate-scale-in     /* Scale up entrance */
.animate-bounce-in    /* Bounce entrance */
.stagger-container    /* Staggered children animations */
```

### Usage Examples
```tsx
// Component entrance
<div className="animate-slide-up">Content</div>

// Staggered list items
<div className="stagger-container">
  <div>Item 1</div>  {/* Animates immediately */}
  <div>Item 2</div>  {/* Animates after 0.1s */}
  <div>Item 3</div>  {/* Animates after 0.2s */}
</div>

// Custom animation timing
<div className="animate-slide-up delay-300 duration-500">
  Delayed content
</div>
```

---

## 🏗️ Component Architecture

### File Naming Convention
```
ComponentName/
├── ComponentName.tsx           # Main component file
└── ComponentName.module.scss   # Component-specific styles
```

### Component Template
```tsx
// frontend/src/components/ui/Button/Button.tsx
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  disabled = false,
  loading = false
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};
```

### SCSS Template
```scss
/* frontend/src/components/ui/Button/Button.module.scss */

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);
  position: relative;
  overflow: hidden;
  
  // Glass morphism base
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
  }
}

// Variant styles
.primary {
  background: linear-gradient(135deg, 
    hsl(var(--primary)), 
    hsl(var(--primary-hover))
  );
  color: hsl(var(--primary-foreground));
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px hsl(var(--primary) / 0.4);
  }
}

.secondary {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  border: 1px solid hsl(var(--border));
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

## ✨ Best Practices

### Component Development
1. **Always use TypeScript interfaces** for props
2. **Implement proper error boundaries** for complex components
3. **Add loading and disabled states** for interactive elements
4. **Include proper accessibility attributes** (ARIA labels, focus management)
5. **Use CSS variables** instead of hardcoded colors

### Styling Guidelines
1. **Use HSL color values** with CSS custom properties
2. **Implement glass morphism** with backdrop-filter
3. **Add spring-based animations** with cubic-bezier easing
4. **Support both light and dark themes**
5. **Include reduced motion support**

### Performance Optimizations
1. **Use React.memo** for frequently re-rendering components
2. **Implement lazy loading** for route components
3. **Optimize animations** for 60fps performance
4. **Use proper image optimization** (WebP, lazy loading)

---

## 📱 Responsive Design

### Breakpoint System
```scss
$breakpoints: (
  'sm': 640px,    // Tablet
  'md': 768px,    // Small laptop
  'lg': 1024px,   // Desktop
  'xl': 1280px,   // Large desktop
  '2xl': 1536px   // Extra large
);

// Usage
@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}
```

### Mobile-First Approach
```scss
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;        // Mobile: single column
  gap: 1rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);  // Tablet: 2 columns
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);  // Desktop: 3 columns
    gap: 1.5rem;
  }
}
```

### Touch-Friendly Design
- Minimum touch target: 44px × 44px
- Adequate spacing between interactive elements
- Swipe gestures for mobile navigation
- Proper keyboard navigation support

---

## ✅ Do's and ❌ Don'ts

### ✅ Do's

**CSS Architecture:**
```scss
// ✅ DO: Use CSS variables with HSL
.component {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}

// ✅ DO: Use module.scss for component styles
import styles from './Component.module.scss';

// ✅ DO: Include proper animations
.card {
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover {
    transform: translateY(-2px);
  }
}

// ✅ DO: Support reduced motion
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Component Architecture:**
```tsx
// ✅ DO: Use proper TypeScript interfaces
interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

// ✅ DO: Implement proper error handling
const Component: React.FC<ComponentProps> = ({ children, ...props }) => {
  try {
    return <div className={styles.component}>{children}</div>;
  } catch (error) {
    return <ErrorFallback error={error} />;
  }
};
```

### ❌ Don'ts

**CSS Anti-Patterns:**
```scss
// ❌ DON'T: Use global selectors in module.scss
* {
  margin: 0;  // This will affect everything globally!
}

// ❌ DON'T: Use :root in component modules
:root {
  --custom-color: red;  // Use index.css instead
}

// ❌ DON'T: Use hardcoded colors
.button {
  background: #3b82f6;  // Use hsl(var(--primary)) instead
}

// ❌ DON'T: Use ambiguous class names
.btn { }      // Too generic
.button-1 { } // Non-descriptive
.blue { }     // Color-based naming
```

**Component Anti-Patterns:**
```tsx
// ❌ DON'T: Use inline styles for complex styling
<div style={{ 
  background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  padding: '1rem',
  borderRadius: '0.5rem'
}}>

// ❌ DON'T: Forget accessibility
<button onClick={handleClick}>
  <SomeIcon /> {/* No alt text or aria-label */}
</button>

// ❌ DON'T: Use browser storage in components
localStorage.setItem('theme', theme); // Use ThemeContext instead
```

---

## 🔧 Code Examples

### Glass Morphism Card
```tsx
// Card.tsx
import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  variant?: 'default' | 'glass';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className
}) => (
  <div className={`${styles.card} ${styles[variant]} ${className || ''}`}>
    {children}
  </div>
);
```

```scss
/* Card.module.scss */
.card {
  padding: 1.5rem;
  border-radius: 1rem;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &:hover {
    transform: translateY(-2px);
  }
}

.default {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.1);
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass);
}
```

### Animated Input Component
```tsx
// Input.tsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.scss';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  icon,
  value,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`${styles.inputGroup} ${isFocused ? styles.focused : ''}`}>
      {icon && (
        <div className={styles.inputIcon}>
          {icon}
        </div>
      )}
      
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.input}
      />
      
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.passwordToggle}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};
```

```scss
/* Input.module.scss */
.inputGroup {
  position: relative;
  display: flex;
  align-items: center;
  background: hsl(var(--input));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  transition: all var(--animation-normal) var(--ease-spring);
  
  &.focused,
  &:focus-within {
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 3px hsl(var(--ring) / 0.2);
    transform: translateY(-1px);
  }
}

.inputIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  color: hsl(var(--muted-foreground));
  pointer-events: none;
  
  .focused & {
    color: hsl(var(--primary));
  }
}

.input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  color: hsl(var(--foreground));
  font-size: 1rem;
  
  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
  
  &:focus {
    outline: none;
  }
}

.passwordToggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: none;
  border: none;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all var(--animation-fast) var(--ease-smooth);
  
  &:hover {
    color: hsl(var(--foreground));
    background: hsl(var(--muted) / 0.5);
  }
  
  &:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 1px;
  }
}
```

---

## 🚀 Getting Started

### Setup Instructions
1. **Install Dependencies**
   ```bash
   npm install react react-dom typescript @types/react @types/react-dom
   npm install lucide-react  # For icons
   ```

2. **File Structure Setup**
   ```bash
   mkdir -p src/styles src/components/ui src/contexts
   touch src/index.css src/styles/{globals,animations,utilities}.scss
   ```

3. **Theme Context Setup**
   ```tsx
   // src/contexts/ThemeContext.tsx
   import React, { createContext, useContext, useState, useEffect } from 'react';
   
   type ThemeMode = 'light' | 'dark' | 'system';
   
   interface ThemeContextType {
     theme: ThemeMode;
     setTheme: (theme: ThemeMode) => void;
     isDark: boolean;
     toggle: () => void;
   }
   
   const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
   
   export const useTheme = () => {
     const context = useContext(ThemeContext);
     if (!context) {
       throw new Error('useTheme must be used within ThemeProvider');
     }
     return context;
   };
   
   export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [theme, setTheme] = useState<ThemeMode>('system');
     const [isDark, setIsDark] = useState(false);
     
     // Implementation details...
   };
   ```

4. **Main App Setup**
   ```tsx
   // src/main.tsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';
   import './index.css';
   import { ThemeProvider } from './contexts/ThemeContext';
   
   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <ThemeProvider>
         <App />
       </ThemeProvider>
     </React.StrictMode>
   );
   ```

---

## 🎯 Summary

CyberFort Academy's design system provides a comprehensive foundation for building modern, accessible, and visually appealing user interfaces. By following this documentation, developers can create consistent components that align with the platform's cybersecurity-focused aesthetic while maintaining excellent user experience across all devices.

### Key Takeaways:
- Use CSS variables with HSL values for theming
- Implement glass morphism with backdrop-filter
- Create responsive, mobile-first layouts
- Include proper animations and reduced motion support
- Follow component architecture best practices
- Avoid global selectors and hardcoded values

This design system ensures scalability, maintainability, and consistency across the entire CyberFort Academy platform.