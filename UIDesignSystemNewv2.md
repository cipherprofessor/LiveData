Excellent idea! I'll create a comprehensive design system documentation. This will ensure consistency across your entire application.

# Design System Documentation

## Table of Contents
1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Animations](#animations)
6. [Glassmorphism](#glassmorphism)
7. [Dark Mode](#dark-mode)
8. [Best Practices](#best-practices)

---

## Color System

### CSS Custom Properties
All colors are defined using HSL values in CSS custom properties for easy theming and dark mode support.

```css
:root {
  /* Primary Colors */
  --primary: 217 91% 60%;           /* #3b82f6 - Main brand color */
  --primary-hover: 217 91% 55%;     /* Hover state */
  --primary-foreground: 0 0% 100%;  /* Text on primary */

  /* Semantic Colors */
  --success: 142 71% 45%;           /* #22c55e - Success states */
  --warning: 38 92% 50%;            /* #f59e0b - Warning states */
  --destructive: 0 84% 60%;         /* #ef4444 - Error/Delete actions */
  
  /* Neutral Colors */
  --background: 0 0% 100%;          /* Page background */
  --foreground: 222 47% 11%;        /* Primary text */
  --muted: 210 40% 96%;             /* Muted backgrounds */
  --muted-foreground: 215 16% 47%;  /* Secondary text */
  
  /* UI Elements */
  --card: 0 0% 100%;                /* Card backgrounds */
  --card-alt: 210 40% 98%;          /* Alternate card bg */
  --border: 214 32% 91%;            /* Border color */
  --border-hover: 217 91% 60%;      /* Border hover state */
  --input: 0 0% 100%;               /* Input backgrounds */
  --accent: 210 40% 96%;            /* Accent backgrounds */
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 222 47% 15%;
  --card-alt: 222 47% 13%;
  --border: 217 33% 25%;
  --muted: 217 33% 20%;
  --muted-foreground: 215 20% 65%;
  --input: 217 33% 20%;
  --accent: 217 33% 20%;
}
```

### Gradient System

#### Primary Gradients
```scss
// Primary Blue Gradient
background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-hover)));

// Success Green Gradient
background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

// Warning Orange Gradient
background: linear-gradient(135deg, #fad961 0%, #f76b1c 100%);

// Purple Gradient
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

// Cyan Gradient
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

// Pink Gradient
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

#### Usage Example
```scss
.iconWrapper {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  box-shadow: 0 4px 12px rgba(67, 233, 123, 0.3);
}
```

---

## Typography

### Font Stack
```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               'Helvetica Neue', Arial, sans-serif;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Font Sizes & Weights

```scss
// Headings
.title {
  font-size: clamp(1.75rem, 4vw, 2.5rem); // 28px - 40px
  font-weight: 700;
  line-height: 1.2;
}

.subtitle {
  font-size: 1.125rem; // 18px
  font-weight: 400;
  line-height: 1.5;
}

.sectionTitle {
  font-size: 1.25rem; // 20px
  font-weight: 700;
}

// Body Text
.body {
  font-size: 0.9375rem; // 15px
  font-weight: 400;
  line-height: 1.6;
}

// Small Text
.helpText {
  font-size: 0.8125rem; // 13px
  font-weight: 500;
}

// Extra Small
.badge {
  font-size: 0.75rem; // 12px
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

---

## Spacing & Layout

### Spacing Scale
```scss
:root {
  --spacing-xs: 0.25rem;   // 4px
  --spacing-sm: 0.5rem;    // 8px
  --spacing-md: 1rem;      // 16px
  --spacing-lg: 1.5rem;    // 24px
  --spacing-xl: 2rem;      // 32px
  --spacing-2xl: 3rem;     // 48px
  --spacing-3xl: 4rem;     // 64px
}
```

### Container Widths
```scss
.container {
  max-width: 1400px; // Standard container
  padding: 2rem;
  margin: 0 auto;
}

.contentWidth {
  max-width: 1200px; // Content container
}

.narrowContent {
  max-width: 800px; // Narrow content (forms, articles)
}
```

### Grid System
```scss
// Auto-fit Grid
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

// Fixed Columns
.gridTwo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.gridThree {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

// Responsive
@media (max-width: 768px) {
  .grid,
  .gridTwo,
  .gridThree {
    grid-template-columns: 1fr;
  }
}
```

---

## Components

### Buttons

#### Primary Button
```scss
.primaryButton {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-hover)));
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px hsl(var(--primary) / 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
}
```

#### Secondary Button
```scss
.secondaryButton {
  background: transparent;
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);

  &:hover:not(:disabled) {
    background: hsl(var(--accent));
    border-color: hsl(var(--primary) / 0.3);
  }

  :global(.dark) & {
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover:not(:disabled) {
      background: rgba(59, 130, 246, 0.1);
    }
  }
}
```

#### Destructive Button
```scss
.destructiveButton {
  background: hsl(var(--destructive));
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);

  &:hover:not(:disabled) {
    background: hsl(var(--destructive) / 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px hsl(var(--destructive) / 0.4);
  }
}
```

### Cards

#### Glassmorphic Card
```scss
.card {
  background: linear-gradient(
    135deg,
    hsl(var(--card) / 0.7) 0%,
    hsl(var(--card-alt) / 0.6) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: 1.25rem;
  padding: 1.5rem;
  transition: all var(--animation-normal) var(--ease-spring);

  &:hover {
    transform: translateY(-4px);
    border-color: hsl(var(--primary) / 0.3);
    box-shadow: 0 8px 24px hsl(var(--primary) / 0.15);
  }

  :global(.dark) & {
    background-color: rgb(25, 25, 28);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(59, 131, 246, 0.213);

    &:hover {
      box-shadow: 0 8px 24px rgba(59, 131, 246, 0.3);
    }
  }
}
```

#### Stat Card
```scss
.statCard {
  background: linear-gradient(
    135deg,
    hsl(var(--card) / 0.7) 0%,
    hsl(var(--card-alt) / 0.6) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  :global(.dark) & {
    background-color: rgb(25, 25, 28);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.statIcon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  svg {
    color: white;
  }
}

.statValue {
  font-size: 2rem;
  font-weight: 700;
  color: hsl(var(--foreground));
  margin: 0;
  line-height: 1.2;
}

.statLabel {
  font-size: 0.8125rem;
  font-weight: 600;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

### Form Elements

#### Input Field
```scss
.input {
  width: 100%;
  padding: 0.875rem 1rem;
  background: hsl(var(--input) / 0.5);
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: hsl(var(--foreground));
  transition: all var(--animation-normal) var(--ease-spring);

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
    background: hsl(var(--input));
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  :global(.dark) & {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }
}

.inputError {
  border-color: hsl(var(--destructive));

  &:focus {
    box-shadow: 0 0 0 3px hsl(var(--destructive) / 0.1);
  }
}
```

#### Select Field
```scss
.select {
  width: 100%;
  padding: 0.875rem 1rem;
  background: hsl(var(--input) / 0.5);
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: hsl(var(--foreground));
  cursor: pointer;
  transition: all var(--animation-normal) var(--ease-spring);

  &:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
    background: hsl(var(--input));
  }

  :global(.dark) & {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

#### Textarea
```scss
.textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: hsl(var(--input) / 0.5);
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: hsl(var(--foreground));
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: all var(--animation-normal) var(--ease-spring);

  &:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
    background: hsl(var(--input));
  }

  :global(.dark) & {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

### Badges

#### Status Badges
```scss
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: capitalize;
  border: 1px solid;
  letter-spacing: 0.3px;
}

// Success
.badgeSuccess {
  background: rgba(67, 233, 123, 0.1);
  color: #43e97b;
  border-color: rgba(67, 233, 123, 0.3);
}

// Warning
.badgeWarning {
  background: hsl(var(--warning) / 0.1);
  color: hsl(var(--warning));
  border-color: hsl(var(--warning) / 0.3);
}

// Error/Destructive
.badgeDestructive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

// Info
.badgeInfo {
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
  border-color: hsl(var(--primary) / 0.3);
}
```

#### Difficulty Badges
```scss
.difficultyEasy {
  background: rgba(67, 233, 123, 0.1);
  color: #43e97b;
  border-color: rgba(67, 233, 123, 0.3);
}

.difficultyMedium {
  background: rgba(250, 217, 97, 0.1);
  color: #f76b1c;
  border-color: rgba(250, 217, 97, 0.3);
}

.difficultyHard {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}
```

### Tags
```scss
.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: hsl(var(--primary) / 0.1);
  border: 1px solid hsl(var(--primary) / 0.3);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  transition: all var(--animation-normal) var(--ease-spring);

  &:hover {
    background: hsl(var(--primary) / 0.15);
    border-color: hsl(var(--primary) / 0.5);
  }

  :global(.dark) & {
    background: rgba(59, 130, 246, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
}

.tagRemove {
  background: transparent;
  border: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--animation-fast) var(--ease-spring);

  &:hover {
    background: hsl(var(--destructive) / 0.2);
    color: hsl(var(--destructive));
  }
}
```

---

## Animations

### Timing Functions
```css
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  
  --animation-fast: 150ms;
  --animation-normal: 250ms;
  --animation-slow: 350ms;
}
```

### Keyframe Animations

#### Fade In
```scss
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  animation: fadeIn 0.4s var(--ease-spring);
}
```

#### Slide In From Top
```scss
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slideInTop {
  animation: slideInFromTop 0.6s var(--ease-spring);
}
```

#### Slide In From Bottom
```scss
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slideInBottom {
  animation: slideInFromBottom 0.6s var(--ease-spring);
}
```

#### Staggered Animations
```scss
// Use animation-delay for staggered effects
.item1 { animation-delay: 0s; }
.item2 { animation-delay: 0.1s; }
.item3 { animation-delay: 0.2s; }
.item4 { animation-delay: 0.3s; }

// Always use animation-fill-mode
.staggered {
  animation: slideInFromBottom 0.6s var(--ease-spring);
  animation-fill-mode: both;
}
```

#### Float Animation
```scss
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

#### Pulse Animation
```scss
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

#### Spin (Loading)
```scss
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid hsl(var(--muted));
  border-top: 4px solid hsl(var(--primary));
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

---

## Glassmorphism

### Standard Glass Effect
```scss
.glass {
  background: linear-gradient(
    135deg,
    hsl(var(--card) / 0.7) 0%,
    hsl(var(--card-alt) / 0.6) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: 1.25rem;

  :global(.dark) & {
    background-color: rgb(25, 25, 28);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(59, 131, 246, 0.213);
  }
}
```

### Section Header with Glass
```scss
.sectionHeader {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid hsl(var(--border) / 0.5);
  background: hsl(var(--muted) / 0.3);

  :global(.dark) & {
    border-bottom-color: rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
  }
}
```

### Icon Wrapper with Gradient
```scss
.iconWrapper {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-hover)));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.3);

  svg {
    color: white;
  }
}
```

---

## Dark Mode

### Implementation Strategy

#### 1. Always Use HSL Variables
```scss
// ✅ Good - Uses CSS variables
color: hsl(var(--foreground));
background: hsl(var(--background));

// ❌ Bad - Hard-coded colors
color: #1e293b;
background: white;
```

#### 2. Dark Mode Overrides
```scss
.element {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));

  :global(.dark) & {
    background-color: rgb(25, 25, 28);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
```

#### 3. Opacity for Consistency
```scss
// Use opacity for glassmorphism
background: linear-gradient(
  135deg,
  hsl(var(--card) / 0.7) 0%,
  hsl(var(--card-alt) / 0.6) 100%
);

// Dark mode with opacity
:global(.dark) & {
  background: rgba(255, 255, 255, 0.05);
}
```

#### 4. Shadow Adjustments
```scss
.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  :global(.dark) & {
    box-shadow: 0 4px 12px rgba(59, 131, 246, 0.213);
  }
}
```

---

## Best Practices

### 1. Component Structure
```scss
// File: Component.module.scss

// Container
.container {
  // Layout properties
  // Animation
}

// Main content wrapper
.content {
  max-width: 1400px;
  margin: 0 auto;
}

// Header section
.header {
  // Header styles
}

// Sub-components follow
.element {
  // Element styles
  
  // Hover states
  &:hover {
    // Hover styles
  }
  
  // Active states
  &:active {
    // Active styles
  }
  
  // Disabled states
  &:disabled {
    // Disabled styles
  }
  
  // Dark mode
  :global(.dark) & {
    // Dark mode overrides
  }
}
```

### 2. Responsive Design
```scss
// Mobile first approach
.element {
  // Base mobile styles
  padding: 1rem;
}

// Tablet
@media (max-width: 1024px) {
  .element {
    padding: 1.5rem;
  }
}

// Desktop
@media (max-width: 768px) {
  .element {
    padding: 2rem;
  }
}

// Small mobile
@media (max-width: 480px) {
  .element {
    padding: 0.75rem;
  }
}
```

### 3. Accessibility

#### Focus States
```scss
.button {
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.3);
  }

  &:focus-visible {
    outline: 2px solid hsl(var(--primary));
    outline-offset: 2px;
  }
}
```

#### Color Contrast
- Text on light backgrounds: Minimum 4.5:1 contrast ratio
- Text on dark backgrounds: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio

#### Interactive Elements
```scss
.interactive {
  cursor: pointer;
  user-select: none;
  
  &:hover {
    // Visual feedback
  }
  
  &:active {
    // Press feedback
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
```

### 4. Performance

#### Use CSS Transforms
```scss
// ✅ Good - GPU accelerated
transform: translateY(-2px);

// ❌ Avoid - Triggers layout
top: -2px;
```

#### Optimize Animations
```scss
// ✅ Good - Hardware accelerated
.element {
  will-change: transform;
  transform: translateZ(0); // Force GPU
}

// Only animate transform and opacity
transition: transform 0.25s, opacity 0.25s;
```

### 5. Naming Conventions

#### BEM-like Structure
```scss
// Block
.card { }

// Element
.cardHeader { }
.cardContent { }
.cardFooter { }

// Modifier
.cardLarge { }
.cardActive { }
```

#### State Classes
```scss
.button { }
.buttonLoading { }
.buttonDisabled { }
.buttonActive { }
```

### 6. Z-Index Scale
```scss
:root {
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-modal: 100;
  --z-toast: 200;
  --z-tooltip: 300;
}
```

### 7. Common Patterns

#### Loading State
```scss
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
  animation: fadeIn 0.4s var(--ease-spring);

  p {
    color: hsl(var(--muted-foreground));
    font-size: 1.125rem;
    font-weight: 500;
  }
}
```

#### Empty State
```scss
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1.5rem;
  text-align: center;
  padding: 3rem 2rem;
}

.emptyIcon {
  width: 5rem;
  height: 5rem;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary) / 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary));
  animation: float 3s ease-in-out infinite;
}
```

#### Error Message
```scss
.errorMessage {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: hsl(var(--destructive));
  font-weight: 500;
  padding: 0.375rem 0.5rem;
  background: hsl(var(--destructive) / 0.1);
  border-radius: 0.375rem;

  svg {
    flex-shrink: 0;
  }
}
```

---

## Quick Reference

### Component Checklist
When creating a new component, ensure:

- [ ] Uses CSS custom properties for colors
- [ ] Includes dark mode support with `:global(.dark) &`
- [ ] Has proper hover/active/disabled states
- [ ] Implements glassmorphic card when appropriate
- [ ] Uses gradient icons for visual hierarchy
- [ ] Includes staggered animations (0.1s, 0.2s, 0.3s delays)
- [ ] Is fully responsive (mobile-first)
- [ ] Has proper focus states for accessibility
- [ ] Uses transform for animations (not position/margin)
- [ ] Includes loading and error states
- [ ] Follows BEM-like naming convention
- [ ] Has proper TypeScript types

### Color Usage Guide
- **Primary**: Main actions, links, focus states
- **Success**: Completed actions, positive states
- **Warning**: Cautions, important notices
- **Destructive**: Delete actions, errors
- **Muted**: Backgrounds, disabled states
- **Foreground**: Primary text
- **Muted-foreground**: Secondary text

### Animation Guidelines
- Use `var(--ease-spring)` for interactive elements
- Stagger animations by 0.1s increments
- Always include `animation-fill-mode: both`
- Keep animations under 0.6s for snappiness
- Use `transform` and `opacity` only for performance

### Gradient Icon Colors
- Primary: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-hover)))`
- Success: `linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)`
- Warning: `linear-gradient(135deg, #fad961 0%, #f76b1c 100%)`
- Info: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`
- Purple: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Pink: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`

---

## Usage for AI Models

When creating new components or pages:

1. **Always start with the glassmorphic card structure**
2. **Use gradient icons with shadows** (0 4px 12px with 0.3 opacity)
3. **Implement staggered animations** (0s, 0.1s, 0.2s, 0.3s delays)
4. **Include dark mode for every element** using `:global(.dark) &`
5. **Use the spring easing function** `var(--ease-spring)`
6. **Make it responsive** with mobile-first approach
7. **Add hover effects** with transform and shadow changes
8. **Use HSL custom properties** for all colors
9. **Include loading, error, and empty states**
10. **Follow the spacing scale** (0.5rem, 1rem, 1.5rem, 2rem)

This design system ensures consistency, maintainability, and a modern, professional look across the entire application! 🎨✨