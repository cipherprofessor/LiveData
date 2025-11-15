### Reduced Motion
- Respect prefers-reduced-motion
- Disable animations if user prefers
- Keep critical info visible without animation

### Form Accessibility
- Clear labels for all inputs
- Error messages descriptive
- Success/error states visible
- Helper text for complex fields

---

## 🎯 PERFORMANCE OPTIMIZATION

### Image Optimization
- Use WebP format (fallback to JPG/PNG)
- Lazy load images below fold
- Responsive images (srcset)
- Avatar sizes: 40px, 80px, 120px, 200px
- Compress images (TinyPNG, ImageOptim)

### Loading States
- Skeleton screens while loading (not spinners)
- Progressive loading (show partial content)
- Optimistic UI updates (instant feedback)
- Loading indicators: Match content shape

### Code Optimization
- Code splitting by route
- Lazy load components below fold
- Minimize bundle size
- Tree shaking unused code
- Compress assets (Gzip, Brotli)

### Caching Strategy
- Cache static assets (images, fonts)
- Service worker for offline support
- API response caching (short TTL)
- Local storage for user preferences

### Animation Performance
- Use transform and opacity (GPU accelerated)
- Avoid animating: width, height, top, left
- Will-change for complex animations
- RequestAnimationFrame for smooth 60fps

---

## 🧪 TESTING GUIDELINES

### Device Testing
- iOS: iPhone 12, 13, 14 (Safari)
- Android: Samsung Galaxy, OnePlus, Xiaomi (Chrome)
- Tablets: iPad, Android tablets
- Desktop: Chrome, Firefox, Safari, Edge

### Screen Sizes
- Mobile: 375px, 390px, 414px widths
- Tablet: 768px, 834px, 1024px widths
- Desktop: 1280px, 1440px, 1920px widths

### Network Conditions
- Test on 3G, 4G, WiFi
- Simulate slow connections
- Offline functionality (graceful degradation)

### User Testing
- A/B test CTAs (color, text, position)
- Test onboarding flow completion rate
- Measure time to first connection
- Track swap completion rate

---

## 📝 CONTENT GUIDELINES

### Tone of Voice
- Friendly but professional
- Encouraging and motivating
- Clear and concise
- Avoid jargon
- Use simple Hindi/English mix (Hinglish) naturally

### Writing Style
- Short sentences (max 20 words)
- Active voice (not passive)
- Second person ("you" not "users")
- Positive framing ("Learn any skill" not "No expensive courses")

### Error Messages
- Be specific: "Please enter a valid phone number" not "Error"
- Be helpful: Suggest solutions
- Be friendly: No blame, no tech jargon
- Example: "Oops! We couldn't find that skill. Try searching for 'Python' or 'Guitar'"

### Success Messages
- Be celebratory: "Awesome! Profile created!" not "Success"
- Use emojis sparingly: 🎉 ✨ 🚀
- Encourage next action: "Ready to find your first match?"

### Button Text
- Action-oriented: "Start Learning" not "Submit"
- Clear outcome: "Connect Now" not "Next"
- Short and punchy: Max 3 words
- First letter capitalized (not ALL CAPS)

### Placeholder Text
- Helpful examples: "e.g., Python Programming"
- Not instructions: Don't use placeholder for required info
- Slightly grayed out (muted color)

### Empty State Copy
- Empathetic: "No messages yet. That's okay!"
- Actionable: "Find your first match to start chatting"
- Encouraging: "You're just one connection away!"

---

## 🚀 IMPLEMENTATION PRIORITIES

### Phase 1: MVP (Months 1-3)
**Essential Pages**
1. Landing page with hero
2. Sign up / login flow
3. Profile creation (skills input)
4. Basic matching (simple algorithm)
5. User profiles (view only)
6. Connection request flow
7. In-app chat (basic)
8. Swap detail page (basic tracking)

**Essential Components**
- Navigation bar
- Hero section
- Skill cards
- Match cards
- User profile cards
- Forms (inputs, buttons)
- Basic modals
- Toast notifications

**Design Focus**
- Mobile-first (80% of users)
- Fast loading (skeleton screens)
- Simple, clean UI
- Core orange/purple/cyan colors
- Basic animations (slide-ins, fades)

### Phase 2: Growth (Months 4-6)
**Additional Features**
1. SkillCoins system (basic earning/spending)
2. Rating & review system
3. Search & filters
4. Notifications page
5. Settings page
6. Leaderboards (simple)
7. Badge system (basic achievements)
8. Events/meetups listing

**Enhanced Components**
- Advanced cards (trending, featured)
- Better animations (stagger, spring)
- Gamification elements
- Progress indicators
- Empty states with illustrations

**Design Focus**
- Gamification aesthetics
- More micro-interactions
- Polish existing flows
- A/B testing variants

### Phase 3: Scale (Months 7-12)
**Premium Features**
1. Video calls integration
2. Advanced matching algorithm
3. Skill verification quizzes
4. Group learning circles
5. Corporate B2B portal
6. Premium subscription tiers
7. Voucher redemption
8. Advanced analytics dashboard

**Advanced Components**
- Video call interface
- Complex data visualizations
- Premium badges and effects
- Advanced gamification (levels, tiers)
- Social sharing components

**Design Focus**
- Premium aesthetics
- Complex interactions
- Data-driven design improvements
- Personalization

---

## 📱 COMPONENT LIBRARY CHECKLIST

### Buttons
- [ ] Primary button (orange gradient)
- [ ] Secondary button (outlined)
- [ ] Ghost button (transparent)
- [ ] Icon button (square/circular)
- [ ] Text button (link style)
- [ ] Loading state for all buttons
- [ ] Disabled state for all buttons
- [ ] Small, medium, large sizes
- [ ] With icon variants

### Forms
- [ ] Text input
- [ ] Text area
- [ ] Select dropdown
- [ ] Multiselect with tags
- [ ] Checkbox
- [ ] Radio button
- [ ] Toggle switch
- [ ] Search input with icon
- [ ] Date picker
- [ ] Time picker
- [ ] Range slider
- [ ] File upload
- [ ] Form validation states
- [ ] Helper text
- [ ] Error messages

### Cards
- [ ] Basic card
- [ ] Skill card (with icon, rating)
- [ ] Match card (user info, skills)
- [ ] Profile card (user summary)
- [ ] Stat card (number + label)
- [ ] Event card (date, location)
- [ ] Notification card
- [ ] Testimonial card
- [ ] Empty state card
- [ ] Loading skeleton card

### Navigation
- [ ] Top navigation bar (desktop)
- [ ] Mobile header
- [ ] Bottom navigation (mobile)
- [ ] Breadcrumbs
- [ ] Tabs (horizontal)
- [ ] Sidebar navigation
- [ ] Mega menu (if needed)

### Overlays
- [ ] Modal (small, medium, large)
- [ ] Bottom sheet (mobile)
- [ ] Drawer/Sidebar (slide-in)
- [ ] Tooltip
- [ ] Popover
- [ ] Context menu
- [ ] Dropdown menu

### Feedback
- [ ] Toast notification (4 types)
- [ ] Alert banner (4 types)
- [ ] Loading spinner
- [ ] Progress bar
- [ ] Circular progress
- [ ] Skeleton screens
- [ ] Success checkmark animation
- [ ] Error shake animation

### Data Display
- [ ] Avatar (with online status)
- [ ] Badge/Tag
- [ ] Chip (removable tag)
- [ ] Label
- [ ] Divider
- [ ] Stat display
- [ ] Rating stars
- [ ] List items
- [ ] Table (responsive)
- [ ] Timeline
- [ ] Calendar

### Gamification
- [ ] SkillCoin display
- [ ] Progress ring
- [ ] Badge grid
- [ ] Leaderboard row
- [ ] Achievement unlock animation
- [ ] Streak counter
- [ ] Level indicator
- [ ] XP bar

### Media
- [ ] Image with loading state
- [ ] Avatar placeholder
- [ ] Icon library (Lucide React)
- [ ] Illustration placeholders
- [ ] Video player (if needed)
- [ ] Audio player (if needed)

---

## 🎨 DESIGN TOKENS (For Developers)

### Spacing Tokens
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

### Font Size Tokens
```
--text-xs: 12px
--text-sm: 14px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--text-3xl: 30px
--text-4xl: 36px
--text-5xl: 48px
```

### Font Weight Tokens
```
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
```

### Border Radius Tokens
```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 20px
--radius-full: 9999px (pill shape)
```

### Shadow Tokens
```
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.07)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15)
--shadow-glow-orange: 0 0 20px rgba(255,107,53,0.3)
--shadow-glow-purple: 0 0 20px rgba(139,92,246,0.3)
```

### Animation Tokens
```
--duration-fast: 150ms
--duration-normal: 300ms
--duration-slow: 500ms
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🔄 DESIGN SYSTEM MAINTENANCE

### Regular Updates
- Review and update colors quarterly
- Add new components as needed
- Deprecate unused components
- Version control design system
- Document all changes

### Consistency Checks
- Audit existing pages monthly
- Ensure all use design tokens
- Check for rogue styles
- Verify accessibility compliance
- Test on new devices

### Design-Dev Collaboration
- Weekly sync meetings
- Shared Figma file with devs
- Component playground/Storybook
- Design QA before deployment
- Feedback loop from users

---

## 📚 REFERENCE RESOURCES

### Design Inspiration
- Airbnb (marketplace trust elements)
- Duolingo (gamification)
- Instagram (social feed, profiles)
- WhatsApp (chat interface)
- Tinder (matching UI)
- LinkedIn (professional profiles)
- Headspace (onboarding, progress)

### Icon Library
- Lucide React: https://lucide.dev
- Modern, consistent, customizable
- Tree-shakeable (only import what you use)

### Fonts
- Inter: https://rsms.me/inter/
- Poppins: https://fonts.google.com/specimen/Poppins
- JetBrains Mono: https://www.jetbrains.com/lp/mono/

### Color Tools
- HSL Color Picker: https://hslpicker.com
- Coolors (palette generator): https://coolors.co
- Contrast Checker: https://webaim.org/resources/contrastchecker/

### Animation References
- Easings.net (easing functions): https://easings.net
- UI Movement (micro-interactions): https://uimovement.com
- Motion Design (principles): https://m2.material.io/design/motion

---

## ✅ FINAL CHECKLIST FOR AI AGENT

When building Tej India, ensure:

### Design Consistency
- [ ] All colors use CSS custom properties (HSL values)
- [ ] Primary orange (#FF6B35) used for main CTAs
- [ ] Gradients used for icons and special elements
- [ ] Typography follows Inter (body) and Poppins (headings)
- [ ] Spacing follows 4px base unit system
- [ ] Border radius: 8px (small), 12px (medium), 16px (large)

### Mobile First
- [ ] Design for 375px width first
- [ ] Increase to desktop sizes progressively
- [ ] Touch targets minimum 44x44px
- [ ] Bottom navigation on mobile
- [ ] Thumb-friendly placement of primary actions

### User Experience
- [ ] Loading states for all async actions
- [ ] Empty states with helpful messages
- [ ] Error states with recovery suggestions
- [ ] Success feedback (animations, messages)
- [ ] Clear CTAs on every page
- [ ] Max 1 primary CTA per screen section

### Gamification
- [ ] SkillCoins visible and prominent
- [ ] Progress indicators on active swaps
- [ ] Badges displayed on profiles
- [ ] Leaderboards encourage competition
- [ ] Animations for achievements
- [ ] Confetti/celebration effects

### Trust & Safety
- [ ] Verified badges clearly visible
- [ ] Rating systems on profiles
- [ ] Report/Block options accessible
- [ ] Safety tips throughout app
- [ ] In-app chat (not external)

### Accessibility
- [ ] Color contrast 4.5:1 minimum
- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Reduced motion support
- [ ] Text readable at all sizes

### Performance
- [ ] Images lazy loaded
- [ ] Skeleton screens while loading
- [ ] Optimistic UI updates
- [ ] Animations use transform/opacity
- [ ] Code split by route
- [ ] Bundle size minimized

### Content
- [ ] Tone is friendly and encouraging
- [ ] Button text is action-oriented
- [ ] Error messages are helpful
- [ ] Copy is concise (under 20 words/sentence)
- [ ] Hinglish used naturally where appropriate

---

## 🎯 SUMMARY FOR AI DEVELOPMENT

**WHAT MAKES TEJ INDIA UNIQUE:**

1. **Color Palette**: Orange (#FF6B35) + Purple (#8B5CF6) + Cyan (#06B6D4)
2. **Typography**: Inter (body) + Poppins Bold (headings)
3. **Design Style**: Modern, vibrant, gamified, community-first
4. **Key Features**: Skill matching, swaps, SkillCoins, badges, leaderboards
5. **Target Audience**: Indian youth (15-35), mobile-first
6. **Core Value**: Free skill exchange, no money involved

**PRIORITY COMPONENTS (Build First):**
1. Hero section with gradient mesh background
2. Skill cards with gradient icons
3. Match cards with percentage badge
4. User profile with stats and badges
5. Chat interface
6. SkillCoin display with animations
7. Navigation (top + bottom mobile)
8. Forms with validation states

**ANIMATION STYLE:**
- Spring easing (cubic-bezier 0.34, 1.56, 0.64, 1)
- Stagger delays (0.1s increments)
- Slide-ins from bottom
- Scale animations for modals
- Confetti for achievements
- Smooth 300ms transitions

**MUST-HAVE PAGES (MVP):**
1. Landing page
2. Sign up/Onboarding
3. Home/Dashboard
4. Explore skills
5. User profile
6. Match profile
7. Chat
8. Swap detail

This design system should give your AI agent everything needed to build a consistent, modern, and user-friendly Tej India platform! 🚀# 🚀 TEJ INDIA - COMPLETE DESIGN SYSTEM GUIDE
## For AI Development Agent Reference

---

## 🎯 PROJECT OVERVIEW

**Project Name**: Tej India  
**Type**: Peer-to-Peer Skill Exchange Platform  
**Target Audience**: Indian youth (15-35 years), students, job seekers  
**Core Value Proposition**: "सीखो और सिखाओ - Trade Skills, Not Money"  
**Platform Goal**: Enable free skill exchange without money transactions

---

## 🎨 DESIGN PHILOSOPHY

### Core Design Principles

**1. VIBRANT & YOUTHFUL**
- Use bold, energetic colors that appeal to young Indian audience
- Bright gradients (orange, purple, cyan, green)
- Dynamic animations and micro-interactions
- Playful but professional aesthetic

**2. COMMUNITY-FIRST**
- Visual elements emphasizing connection between people
- User avatars prominently displayed
- Social proof elements (ratings, reviews, swap counts)
- Trust indicators (verified badges, completion rates)

**3. GAMIFIED EXPERIENCE**
- Progress bars and achievement indicators
- Badge systems with colorful icons
- Leaderboards with competitive elements
- Reward animations (coins, stars, confetti)
- Level-up visual feedback

**4. MOBILE-FIRST DESIGN**
- 80% of users will be on mobile devices
- Thumb-friendly tap targets (minimum 44x44px)
- Bottom navigation for easy reach
- Swipe gestures for common actions
- Fast loading with skeleton screens

**5. INDIAN CONTEXT & LOCALIZATION**
- Support for Hindi/English bilingual content
- Indian rupee (₹) symbol prominently displayed
- Indian city names and locations
- Cultural color preferences (orange = energy/spirituality)
- Festival/celebration themed seasonal designs

**6. TRUST & SAFETY**
- Clean, professional layouts
- Clear verification badges
- Transparent rating systems
- Safety tips prominently displayed
- Secure payment indicators (for premium features)

---

## 🌈 COLOR PALETTE

### Primary Colors

**Primary Orange** (Main Brand Color)
- Hex: #FF6B35
- Use for: Primary CTAs, active states, brand elements
- Psychology: Energy, enthusiasm, warmth, community
- Represents: The vibrant spirit of learning and exchange

**Secondary Purple** (Trust & Premium)
- Hex: #8B5CF6
- Use for: Premium features, achievements, special badges
- Psychology: Creativity, wisdom, premium quality
- Represents: Skill mastery and expertise

**Accent Cyan** (Growth & Learning)
- Hex: #06B6D4
- Use for: Learning progress, notifications, new features
- Psychology: Innovation, freshness, clarity
- Represents: Continuous growth and learning

### Semantic Colors

**Success Green**: #10B981 (completed swaps, verified profiles)
**Warning Amber**: #F59E0B (pending actions, reminders)
**Error Red**: #EF4444 (errors, cancellations, warnings)
**Info Blue**: #3B82F6 (informational messages, tips)

### Neutral Colors

**Light Theme**
- Background: #FFFFFF (pure white)
- Surface: #FCFCFD (off-white for cards)
- Text Primary: #1A202C (dark gray - high contrast)
- Text Secondary: #64748B (medium gray)
- Text Subtle: #94A3B8 (light gray for hints)
- Border: #E2E8F0 (subtle borders)

**Dark Theme**
- Background: #0A0F1C (deep navy blue)
- Surface: #151D35 (elevated surfaces)
- Text Primary: #F8FAFC (near white)
- Text Secondary: #94A3B8 (medium gray)
- Border: #1E2A4A (subtle borders)

### Gradient System

**Hero Gradients** (for landing page, hero sections)
- Orange to Yellow: #FF6B35 → #F7931E
- Purple to Pink: #8B5CF6 → #EC4899
- Cyan to Blue: #06B6D4 → #3B82F6
- Multi-color Rainbow: Orange → Yellow → Purple → Cyan → Green

**Skill Category Gradients** (assign to different skill types)
- Coding/Tech: Blue to Purple (#667EEA → #764BA2)
- Design/Creative: Pink to Red (#F093FB → #F5576C)
- Marketing/Business: Cyan to Blue (#4FACFE → #00F2FE)
- Language/Communication: Green to Teal (#43E97B → #38F9D7)
- Music/Arts: Pink to Yellow (#FA709A → #FEE140)
- Fitness/Health: Cyan to Purple (#30CFD0 → #330867)
- Finance/Business: Teal to Pink (#A8EDEA → #FED6E3)
- Other Skills: Yellow to Blue (#FFD26F → #3677FF)

### Background Effects

**Mesh Gradients** (for hero sections, landing pages)
- Use radial gradients with multiple colors
- Low opacity (10-30%) for subtle effect
- Animated slowly for dynamic feel
- Layer multiple gradients for depth

**Grid Patterns** (for technical sections)
- Subtle line grid (1px lines, 50px spacing)
- Very low opacity (10-20%)
- Can be used behind cards/content

---

## 📝 TYPOGRAPHY SYSTEM

### Font Families

**Primary Font**: Inter
- Use for: Body text, UI elements, forms
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Characteristics: Clean, modern, highly readable
- Perfect for: Long-form content, descriptions

**Display Font**: Poppins
- Use for: Headings, hero titles, section headers
- Weights: 600 (Semibold), 700 (Bold), 800 (Extrabold)
- Characteristics: Geometric, friendly, bold
- Perfect for: Eye-catching headlines

**Monospace Font**: JetBrains Mono
- Use for: Code examples, technical details
- Only when showing programming-related content

### Font Scale (Mobile First)

**Extra Small**: 12px - Labels, badges, timestamps
**Small**: 14px - Body text, descriptions, form inputs
**Base**: 16px - Primary body text (default)
**Large**: 18px - Emphasized text, subheadings
**XL**: 20px - Card titles, small headings
**2XL**: 24px - Section subheadings
**3XL**: 30px - Section headings (mobile)
**4XL**: 36px - Page titles (mobile)
**5XL**: 48px - Hero titles (mobile)

**Desktop Scale** (increase by 1.2-1.5x for larger screens)
**3XL**: 36px - Section headings (desktop)
**4XL**: 48px - Page titles (desktop)
**5XL**: 60px - Hero titles (desktop)
**6XL**: 72px - Extra large hero titles
**7XL**: 96px - Landing page hero

### Typography Usage Guidelines

**Hero Titles**
- Font: Poppins Extrabold (800)
- Size: 48-96px (responsive)
- Line Height: 1.1 (tight)
- Letter Spacing: -0.02em (slightly tight)
- Style: Gradient text effect (apply primary gradient)
- Use for: Landing page hero, major announcements

**Section Headings**
- Font: Poppins Bold (700)
- Size: 30-48px (responsive)
- Line Height: 1.2
- Letter Spacing: -0.01em
- Color: Foreground color (high contrast)
- Use for: Main section titles

**Card Titles**
- Font: Inter Semibold (600)
- Size: 18-20px
- Line Height: 1.4
- Color: Foreground color
- Use for: Card headings, list items

**Body Text**
- Font: Inter Regular (400)
- Size: 14-16px
- Line Height: 1.6 (generous for readability)
- Color: Foreground muted (medium contrast)
- Use for: Descriptions, explanations, long content

**Labels & Badges**
- Font: Inter Semibold (600)
- Size: 12-14px
- Line Height: 1.2
- Text Transform: Uppercase
- Letter Spacing: 0.05em (slightly loose)
- Use for: Tags, categories, status labels

**Buttons**
- Font: Inter Semibold (600)
- Size: 14-16px
- Use for: All interactive buttons

---

## 🎨 COMPONENT DESIGN PATTERNS

### 1. HERO SECTION (Landing Page)

**Layout**
- Full viewport height (100vh)
- Two-column layout (text left, visual right) on desktop
- Single column stacked on mobile
- Background: Mesh gradient + subtle grid pattern

**Content Elements**
- Badge: "India's First Skill Exchange Platform" with icon
- Main Title: "सीखो और सिखाओ" (Hindi) + "Trade Skills, Not Money" (English)
- Subtitle: 2-3 sentence value proposition
- Two CTAs: Primary "Start Learning Free" + Secondary "How It Works"
- Social Proof Stats: Active learners, Skills available, Cost (₹0)

**Visual Elements**
- Animated illustrations of skill exchange
- Floating cards showing example swaps
- User avatars with connecting lines
- Subtle background animations

**Animation**
- Text slides in from left (0.8s spring easing)
- Stats count up animation
- Floating cards gentle up/down motion
- Background gradient slow rotation

### 2. SKILL CARDS

**Card Structure**
- Icon with gradient background (top)
- Category label (small uppercase text)
- Skill title (bold, 18-20px)
- Short description (2 lines max, truncated)
- Footer with rating + learner count

**Variants**
- Standard Card: Regular skill listing
- Trending Card: Has "Trending" badge, special glow effect
- Featured Card: Larger size, more prominent
- Compact Card: Horizontal layout for lists

**Interactions**
- Hover: Lift up 4px, border color change, shadow increase
- Click: Navigate to skill detail page
- Icon: Rotates 5 degrees and scales up on hover

**Visual Elements**
- Gradient icon background (matches skill category)
- Star rating with filled stars
- User count with users icon
- Optional "Trending Up" badge

### 3. MATCH CARDS (Finding Swap Partners)

**Card Structure**
- Match percentage badge (top right corner)
- User avatar with online indicator
- User name + location + distance
- Rating stars + swaps completed count
- Skill exchange visualization (what they teach → what you teach)
- "Connect Now" CTA button

**Layout**
- Horizontal layout on desktop
- Stacked layout on mobile
- Avatar: Circular with gradient border
- Skills: Two boxes with arrow between them

**Match Percentage Display**
- High Match (90-100%): Green gradient, pulsing animation
- Good Match (75-89%): Orange gradient
- Medium Match (60-74%): Yellow gradient
- Low Match (<60%): Gray (don't show these by default)

**Interactions**
- Hover: Entire card lifts, glow effect
- Click on card: View full profile
- Click on button: Initiate connection request
- Swipe right: Quick connect (mobile)
- Swipe left: Pass (mobile)

### 4. USER PROFILE CARDS

**Elements**
- Circular avatar (gradient border if verified)
- User name (bold)
- Location badge (with pin icon)
- Rating (star + number)
- Completed swaps count (with badge icon)
- Online status indicator (green dot)
- "Can Teach" skill tags (colored pills)
- "Wants to Learn" skill tags (outlined pills)

**Verification Badge**
- Small checkmark icon
- Placed on avatar or next to name
- Blue color for verified users
- Tooltip: "Verified by Tej India"

**Interaction States**
- Default: Clean, professional
- Hover: Slight scale up, name color changes
- Active/Selected: Border color change, background highlight
- Loading: Skeleton shimmer effect

### 5. NAVIGATION BAR

**Desktop Navigation**
- Logo (left): Tej India wordmark with icon
- Main Menu (center): Home, Find Skills, My Swaps, Community, How It Works
- Actions (right): Search icon, Notifications bell, SkillCoins balance, Profile avatar

**Mobile Navigation**
- Top Bar: Logo (left), Search icon, Notifications, Profile (right)
- Bottom Bar: Home, Explore, My Swaps, Messages, Profile (5 tabs)
- All icons clearly labeled below
- Active tab: Icon + text with primary color, indicator line

**Notification Badge**
- Small red circle with count
- Positioned top-right of bell icon
- Animated entrance (bounce in)
- Max display: 9+ for large numbers

### 6. BUTTONS

**Primary Button**
- Background: Orange gradient (#FF6B35 → #F7931E)
- Text: White, semibold
- Padding: 12px 24px (medium), 16px 32px (large)
- Border Radius: 12px (rounded)
- Shadow: Orange glow (subtle)
- Hover: Lift up 2px, shadow increases
- Active: Press down (translateY 0)
- States: Normal, Hover, Active, Disabled, Loading

**Secondary Button**
- Background: Transparent
- Border: 2px solid border color
- Text: Foreground color
- Same padding and radius as primary
- Hover: Background becomes surface-elevated, border becomes primary color
- Less prominent than primary

**Ghost Button**
- Background: Transparent
- No border
- Text: Foreground color
- Hover: Background becomes surface-elevated
- Minimal visual weight

**Icon Button**
- Square or circular (40x40px)
- Icon centered (20px size)
- Background: Transparent or surface
- Border: 1px solid border color
- Hover: Background becomes surface-elevated
- Use for: Close, Menu, Actions

### 7. FORMS & INPUTS

**Text Input**
- Background: Input background color
- Border: 1px solid border color
- Border Radius: 8px
- Padding: 12px 16px
- Font Size: 16px (prevents zoom on iOS)
- Placeholder: Muted text color

**Focus State**
- Border: Primary color (2px)
- Glow: Primary color shadow (0 0 0 3px with low opacity)
- Background: Slightly lighter

**Error State**
- Border: Error red color
- Error message below in red
- Icon: Alert circle in red

**Success State**
- Border: Success green
- Checkmark icon (right side)

**Select Dropdown**
- Same styling as text input
- Chevron down icon (right side)
- Animated expansion on click
- Options list: Elevated card with shadow
- Selected option: Checkmark + highlight

**Checkbox & Radio**
- Custom styled (not default browser)
- Size: 20x20px
- Border: 2px solid border color
- Checked: Primary gradient background, white checkmark
- Smooth transition animation

### 8. BADGES & TAGS

**Status Badge**
- Small rounded pill (4px radius)
- Padding: 4px 12px
- Font: 12px, semibold, uppercase
- Colors vary by status:
  - Active: Green gradient
  - Pending: Yellow/Amber
  - Completed: Blue
  - Cancelled: Red

**Skill Tag**
- Larger rounded pill (8px radius)
- Padding: 6px 16px
- Font: 14px, semibold
- Background: Skill category gradient (low opacity)
- Border: Same color (higher opacity)
- Removable: X icon on right (for input tags)
- Hover: Slight scale up

**Achievement Badge**
- Icon + text combination
- Circular icon background with gradient
- Text below or beside
- Glow effect
- Animation on unlock (scale + rotate)

### 9. CARDS & CONTAINERS

**Base Card**
- Background: Card color (white/dark surface)
- Border: 1px solid border color
- Border Radius: 16px (generously rounded)
- Padding: 24px
- Shadow: Subtle elevation shadow
- Transition: All 0.3s spring easing

**Hover State**
- Transform: translateY(-4px) (lift up)
- Border: Primary color
- Shadow: Larger, more prominent
- Cursor: Pointer

**Glass Card (Premium)**
- Background: Semi-transparent with backdrop blur
- Border: Subtle gradient
- Glow effect
- Use for: Premium features, special offers

**Stat Card**
- Icon with gradient background (top)
- Large number (primary value)
- Label below
- Optional trend indicator (up/down arrow + percentage)
- Hover: Gentle bounce animation

### 10. PROGRESS & LOADING

**Progress Bar**
- Height: 8px
- Background: Muted gray
- Fill: Gradient (primary colors)
- Border Radius: 4px (fully rounded ends)
- Animated fill (smooth transition)
- Label: Percentage or "3 of 5 complete"

**Circular Progress**
- Ring style (not filled circle)
- Stroke width: 4px
- Background: Muted gray ring
- Progress: Gradient stroke
- Animated rotation
- Center: Percentage text

**Loading Spinner**
- Size: 24px (small), 40px (medium), 60px (large)
- Style: Rotating circular dash
- Color: Primary gradient
- Animation: Smooth continuous rotation

**Skeleton Screen**
- Use while content loads
- Animated shimmer effect (left to right)
- Placeholder blocks for text, images, cards
- Gray background with lighter shimmer overlay
- Match approximate layout of real content

### 11. MODALS & DIALOGS

**Modal Overlay**
- Background: Semi-transparent black (40-60% opacity)
- Backdrop blur effect
- Click outside to close
- Prevents body scroll

**Modal Content**
- Centered on screen
- Max width: 500px (small), 700px (medium), 900px (large)
- Background: Card color
- Border Radius: 20px (well rounded)
- Shadow: Large elevation shadow
- Animation: Scale up + fade in (0.3s)

**Modal Structure**
- Header: Title (left) + Close button (right)
- Content: Scrollable area with padding
- Footer: Action buttons (right aligned)

**Dialog Types**
- Confirmation: Title, message, Cancel + Confirm buttons
- Alert: Title, message, single OK button
- Form: Title, form fields, Cancel + Submit buttons

### 12. TOOLTIPS & POPOVERS

**Tooltip**
- Small text container
- Dark background (80% opacity)
- White text
- Border Radius: 6px
- Arrow pointing to trigger element
- Appears on hover (0.2s delay)
- Max width: 200px
- Font size: 13px

**Popover**
- Larger than tooltip
- Card-style background
- Can contain rich content (images, links, lists)
- Border: 1px solid
- Shadow: Medium elevation
- Arrow pointing to trigger
- Click to open/close

### 13. LISTS & TABLES

**List Items**
- Padding: 16px
- Border bottom: 1px solid border color
- Hover: Background becomes surface-elevated
- Left: Icon or avatar
- Center: Primary content (title + subtitle)
- Right: Action or meta info (arrow, badge, etc)

**Table**
- Full width, responsive
- Header: Bold, uppercase small text, background muted
- Rows: Alternating subtle background or border-only
- Cell padding: 12px 16px
- Hover row: Highlight background
- On mobile: Convert to stacked cards

### 14. NOTIFICATIONS & TOASTS

**Toast Notification**
- Appears top-right corner (desktop) or top center (mobile)
- Width: 320px (desktop), 90% (mobile)
- Auto-dismiss after 5 seconds (or user close)
- Types:
  - Success: Green left border, checkmark icon
  - Error: Red left border, X icon
  - Warning: Yellow left border, alert icon
  - Info: Blue left border, info icon
- Animation: Slide in from right, slide out on close
- Stack multiple toasts vertically

**Notification Bell Dropdown**
- Click bell icon to open
- Dropdown card below bell
- List of recent notifications
- Each notification: Avatar, message, timestamp
- Unread: Bold text, dot indicator
- Read: Normal text
- "Mark all as read" link at bottom
- "View all" link to full notification page

### 15. GAMIFICATION ELEMENTS

**SkillCoins Display**
- Coin icon (gold, shiny)
- Number next to it
- Animated +/- when earning/spending
- Confetti animation on earning milestone
- Location: Top right of navigation

**Progress Ring/Bar**
- Shows completion of swap
- Circular ring around avatar (profile)
- Linear bar below (swap detail page)
- Gradient fill as progress increases
- Milestone markers (25%, 50%, 75%, 100%)
- Animation on milestone achievement

**Badge Display**
- Grid of earned badges
- Locked badges: Grayscale + lock icon
- Earned badges: Full color, slight glow
- Click to see badge details
- Hover: Scale up animation
- Categories: Skill Master, Fast Learner, Community Hero, etc.

**Leaderboard**
- Rank number (bold, large)
- User info (avatar + name)
- Metric (hours taught, swaps completed)
- Top 3: Special colors (gold, silver, bronze)
- Current user: Highlighted row
- Scroll for more ranks

### 16. EMPTY STATES

**When No Data**
- Large icon (60px, muted color)
- Heading: "No [items] yet"
- Description: Brief explanation
- CTA button: "Add your first [item]"
- Centered layout
- Friendly, encouraging tone

**When Search Returns Nothing**
- Search icon
- "No results found for '[query]'"
- Suggestions: Try different keywords, check spelling
- Alternative action: "Browse all skills" button

---

## 📐 LAYOUT & SPACING

### Spacing Scale
**Base Unit**: 4px (0.25rem)

- 4px (1 unit): Very tight spacing
- 8px (2 units): Tight spacing
- 12px (3 units): Small spacing
- 16px (4 units): Medium spacing (default)
- 24px (6 units): Large spacing
- 32px (8 units): Extra large spacing
- 48px (12 units): Section spacing
- 64px (16 units): Page section spacing

### Layout Grid
- Desktop: 12-column grid, 24px gutters
- Tablet: 8-column grid, 16px gutters
- Mobile: 4-column grid, 16px gutters
- Max content width: 1280px
- Container padding: 16px (mobile), 32px (tablet), 48px (desktop)

### Responsive Breakpoints
- Mobile: 0-639px (single column layouts)
- Tablet: 640-1023px (2-column layouts)
- Desktop: 1024-1279px (3-column layouts)
- Large Desktop: 1280px+ (4-column layouts, max width)

---

## 🎬 ANIMATION GUIDELINES

### Timing Functions
**Ease Spring**: cubic-bezier(0.34, 1.56, 0.64, 1) - Use for playful, bouncy animations
**Ease Smooth**: cubic-bezier(0.4, 0, 0.2, 1) - Use for smooth, professional animations
**Ease Out**: cubic-bezier(0, 0, 0.2, 1) - Use for elements entering
**Ease In**: cubic-bezier(0.4, 0, 1, 1) - Use for elements exiting

### Animation Durations
- Fast: 150ms - Hover effects, button presses
- Normal: 300ms - Card transitions, dropdown opens
- Slow: 500ms - Page transitions, modal opens
- Extra Slow: 800ms - Hero animations, special effects

### Common Animations

**Slide In From Bottom**
- Initial: opacity 0, translateY(20px)
- Final: opacity 1, translateY(0)
- Use for: Cards entering, lists appearing

**Fade In**
- Initial: opacity 0
- Final: opacity 1
- Use for: Text appearing, images loading

**Scale In**
- Initial: opacity 0, scale(0.95)
- Final: opacity 1, scale(1)
- Use for: Modals opening, popovers

**Bounce In**
- Scales from 0.3 to 1.05, then 0.9, then 1
- Use for: Achievement unlocks, special events

**Shimmer** (Loading)
- Gradient moves from left to right
- Continuous loop
- Use for: Skeleton screens

**Pulse**
- Scale alternates between 1 and 1.05
- Opacity alternates between 0.8 and 1
- Use for: Attention-grabbing elements (new notifications)

**Float**
- translateY alternates between 0 and -10px
- Smooth, continuous loop
- Use for: Floating illustrations, decorative elements

**Stagger Animation**
- Delay between each item (0.1s increments)
- Use for: Lists, grid items appearing
- Makes UI feel more dynamic

### Animation Best Practices
- Always provide reduced motion support (prefers-reduced-motion)
- Don't animate too many elements simultaneously
- Keep animations subtle (users shouldn't "feel" them)
- Use spring easing for interactive elements (buttons, cards)
- Use smooth easing for background elements
- Animate transform and opacity (GPU-accelerated)
- Avoid animating layout properties (width, height, top, left)

---

## 🖼️ ICONOGRAPHY

### Icon System
**Library**: Lucide React (modern, consistent, open-source)

### Icon Sizes
- Extra Small: 14px - Inline with text
- Small: 16px - Buttons, badges
- Medium: 20px - Default size
- Large: 24px - Card headers, navigation
- Extra Large: 32px - Feature highlights
- Hero: 48px+ - Landing page features

### Icon Usage

**Navigation Icons**
- Home, Compass (Explore), Users (Community), MessageCircle (Messages), User (Profile)
- Always pair with text labels on mobile bottom nav

**Action Icons**
- Plus (Add), X (Close), ChevronRight (Next), ChevronDown (Expand), Search, Filter, Settings, Bell (Notifications), Heart (Favorite)

**Status Icons**
- CheckCircle (Success), XCircle (Error), AlertTriangle (Warning), Info (Information), Clock (Pending), Star (Rating), Award (Badge), TrendingUp (Growth)

**Skill Category Icons**
- Code (Programming), Palette (Design), TrendingUp (Marketing), MessageSquare (Language), Music (Music/Arts), Dumbbell (Fitness), Briefcase (Business)

**Social Icons**
- User, Users (People), MapPin (Location), Calendar, Clock, Mail, Phone

### Icon with Background
- Circular or rounded square background
- Gradient fill (matches category color)
- Icon color: White
- Size: 40x40px (small), 56x56px (medium), 72x72px (large)
- Shadow: Subtle glow matching gradient color
- Use for: Feature cards, skill cards, stat cards

---

## 🎮 GAMIFICATION DESIGN

### SkillCoin System

**Visual Design**
- Icon: Gold coin with "Tej" or "TC" marking
- Shiny, metallic appearance
- Animated sparkle effect
- Display: Large number + coin icon

**Earning Animation**
- Coin flies from action location to coin counter
- Counter increments with sound effect (optional)
- "+X coins" floating text briefly appears
- Green positive indicator

**Spending Animation**
- Coins subtract with slide-out animation
- "-X coins" floating text in orange
- Confirmation before spending

**Milestone Celebrations**
- Every 100 coins: Confetti animation
- Every 500 coins: Trophy/badge popup
- 1000+ coins: Special "Whale" badge with animation

### Badge System

**Badge Categories**
1. **Skill Badges**: Earned after teaching/learning specific skills
2. **Achievement Badges**: Milestones (10 swaps, 100 hours taught)
3. **Streak Badges**: Consecutive days active
4. **Community Badges**: Helping others, high ratings
5. **Special Badges**: Limited edition, seasonal

**Badge Visual Design**
- Circular or shield shape
- Icon in center
- Gradient border (gold for rare, silver for uncommon, bronze for common)
- Subtle glow effect
- Micro-animation on hover (rotate slightly)

**Unlock Animation**
- Badge scales from 0 to 1.2, then 1
- Rotation animation (0 to 360 degrees)
- Confetti or sparkle particles
- Sound effect (optional)
- Modal shows badge details
- Social share option

### Progress Indicators

**Swap Progress**
- Circular progress ring around profile
- Shows percentage of swap completed
- Color changes: Orange (0-25%), Yellow (25-50%), Cyan (50-75%), Green (75-100%)
- Milestone markers at 25%, 50%, 75%, 100%
- Animation when milestone reached

**Level System**
- User levels: Beginner (1-3), Intermediate (4-6), Advanced (7-9), Expert (10+)
- Level badge displayed on profile
- XP bar showing progress to next level
- XP earned from: Completing swaps, ratings, helping others

**Streak Counter**
- Fire icon with number of consecutive days
- Color intensifies with longer streak
- Breaks if user misses a day (sad animation)
- Recover streak option (premium feature)

### Leaderboards

**Categories**
- Top Teachers (by hours taught)
- Top Learners (by hours learned)
- Rising Stars (new users gaining momentum)
- City Leaderboards (local competition)
- Skill-Specific Leaderboards

**Visual Design**
- Rank numbers in large, bold font
- Top 3: Special styling (gold #1, silver #2, bronze #3)
- User cards: Avatar, name, metric, mini badges
- Current user: Highlighted with glow border
- "You are ranked #X" badge for user

**Interaction**
- Filter by: Weekly, Monthly, All-Time
- Filter by: City, Skill Category, Age Group
- Smooth scroll to user's position
- Tap rank to see full profile

---

## 📱 MOBILE-SPECIFIC DESIGN

### Bottom Navigation
- 5 tabs: Home, Explore, Center Action, Messages, Profile
- Always visible (sticky)
- Active tab: Icon + text colored primary, indicator line on top
- Inactive: Icon + text muted gray
- Smooth tab switch animation

### Swipe Gestures
- Swipe right on match card: Quick connect
- Swipe left: Pass/hide
- Swipe down: Refresh feed
- Swipe left/right on images: Gallery navigation

### Thumb-Friendly Zones
- Bottom 1/3 of screen: Primary actions
- Top corners: Secondary actions (settings, notifications)
- Avoid placing important buttons in top center (hard to reach)

### Pull-to-Refresh
- Drag down from top of scrollable content
- Loading spinner appears
- Release to trigger refresh
- Smooth bounce-back animation

### Bottom Sheets
- Slide up from bottom
- Semi-transparent backdrop
- Swipe down to close
- Header with drag handle
- Use instead of modals on mobile

---

## 🌍 LOCALIZATION CONSIDERATIONS

### Bilingual Support (Hindi + English)

**Text Display**
- Primary language (user preference): Larger, bold
- Secondary language: Smaller, below primary
- Example: "सीखो और सिखाओ" (large) + "Learn and Teach" (small)

**Icon + Text Labels**
- Always use universal icons
- Supplement with text labels in user's language
- Some users may not read English well

**Number Formatting**
- Indian numbering system: 1,00,000 (1 lakh) not 100,000
- Rupee symbol: ₹ before number
- Spell out: "1 लाख users" or "1 Lakh users"

**Date/Time Formats**
- DD/MM/YYYY (Indian standard)
- 12-hour format with AM/PM
- Relative time in local language: "2 minutes ago" / "2 मिनट पहले"

**Cultural Adaptations**
- Use orange prominently (auspicious color in Indian culture)
- Festival themes during Diwali, Holi, etc.
- Regional language support planned (Tamil, Telugu, Bengali, etc.)

---

## 🔍 KEY USER FLOWS & PAGES

### 1. LANDING PAGE

**Purpose**: Convert visitors to sign-ups

**Sections (Top to Bottom)**

**A. Hero Section**
- Headline: "सीखो और सिखाओ - Trade Skills, Not Money"
- Subheadline: Value proposition
- Two CTAs: "Start Learning Free" (primary), "How It Works" (secondary)
- Hero image/animation showing skill exchange
- Social proof: User count, skills available, swaps completed

**B. How It Works (3-4 Steps)**
- Step 1: Create profile, list your skills
- Step 2: Find perfect matches nearby
- Step 3: Schedule swap, learn together
- Step 4: Earn SkillCoins, unlock badges
- Visual: Animated illustrations for each step
- Use gradient connecting lines between steps

**C. Popular Skills Categories**
- Grid of 8-12 skill category cards
- Each card: Icon, category name, skill count
- Click to explore that category
- Gradient backgrounds matching category colors

**D. Success Stories (Testimonials)**
- 3-4 user testimonials
- Card format: Avatar, name, quote, skills swapped
- Verified badge on user
- Before/After narrative
- Rotating carousel on mobile

**E. Featured Matches**
- "See who's learning near you"
- 6-8 match cards showing real users
- Creates FOMO (fear of missing out)
- CTA: "Find Your Match"

**F. Gamification Preview**
- "Earn While You Learn"
- Show SkillCoins, badges, leaderboards
- Animated counter showing coin earning
- CTA: "Start Earning"

**G. Trust & Safety**
- "Safe, Secure, Verified"
- Icons: Verified profiles, secure chat, rating system, community guidelines
- Brief explanations under each
- Build trust for new users

**H. App Download Section**
- "Take Tej India Everywhere"
- Google Play + App Store buttons
- QR code for quick download
- Phone mockup showing app interface

**I. Footer**
- About, How It Works, Safety, Blog, Careers
- Social media links (Instagram, LinkedIn, Twitter)
- Language selector (English/Hindi)
- Contact information
- Newsletter signup

**Visual Effects**
- Parallax scrolling on hero section
- Animated statistics counter
- Floating elements (coins, badges)
- Smooth scroll-triggered animations

### 2. SIGN UP / ONBOARDING FLOW

**Step 1: Welcome Screen**
- Tej India logo
- "Welcome to India's Skill Exchange Community"
- "Sign up with:" Google, Phone Number, Email
- "Already have account? Login"

**Step 2: Basic Information**
- Name
- Age (dropdown: 15-18, 18-25, 25-35, 35+)
- City (searchable dropdown with major Indian cities)
- "Continue" button

**Step 3: Skills You Can Teach**
- Search bar: "What can you teach?"
- Popular suggestions as pills
- Selected skills appear as tags
- Add proficiency level: Beginner, Intermediate, Expert
- "Add at least 2 skills to continue"
- Progress indicator: "Step 3 of 5"

**Step 4: Skills You Want to Learn**
- Search bar: "What do you want to learn?"
- Suggestions based on what's trending
- Selected skills as tags
- "Add at least 2 skills to continue"

**Step 5: Availability**
- Preferred days: Checkboxes for weekdays/weekends
- Preferred time: Morning, Afternoon, Evening, Night
- Commitment: Hours per week (slider: 2-20 hours)
- Mode: In-person, Online, or Both

**Step 6: Profile Photo & Verification**
- Upload profile photo (optional but encouraged)
- Camera or gallery option
- AI crop suggestion
- "Verify Phone Number" section
- Send OTP, enter OTP
- Badge appears when verified

**Step 7: Welcome! Profile Created**
- Confetti animation
- "Your profile is ready!"
- Show quick stats: "You can teach X skills, want to learn Y skills"
- CTA: "Find Your First Match"
- Skip option: "Explore First"

**Design Notes**
- Progress bar at top showing completion
- Back button on each step
- Auto-save progress (don't lose data)
- Form validation with helpful error messages
- Keyboard navigation support

### 3. HOME/DASHBOARD PAGE

**Layout: Feed-Style**

**Top Section**
- Welcome message: "Welcome back, [Name]!" with wave emoji
- SkillCoins balance (prominent, clickable)
- Notifications bell icon with count badge
- Profile avatar (clickable)

**Quick Stats Cards (Horizontal Scroll)**
- Active Swaps: Count + "View All" link
- Hours Taught This Week: Number + progress bar
- New Matches: Count + "See Matches" link
- Next Swap: Time + "Join Now" button

**Recommended Matches Section**
- "Perfect Matches for You" heading
- 3-4 match cards in horizontal scroll
- Each card: User info, match %, skills, "Connect" button
- "See All Matches" link at end

**Active Swaps Section**
- "Your Active Swaps" heading
- List of ongoing swaps
- Each item: Partner avatar, skill names, progress bar, "Continue" button
- Empty state: "No active swaps. Find your first match!"

**Nearby Events Section**
- "Tej Meetups Near You" heading
- 2-3 event cards
- Each card: Event image, date, title, location, "RSVP" button
- Location-based (requires permission)

**Community Activity Feed**
- "What's Happening in the Community"
- Recent activities: "[User] learned [Skill] from [User]"
- Swap completions, badges earned, milestones
- Like and comment options
- Infinite scroll

**Learning Resources (Optional)**
- "Featured Skill Guides"
- Blog posts, tips, how-tos
- Card format with thumbnail image

**Bottom Navigation** (Mobile)
- Home (active), Explore, Center Action (+), Messages, Profile

### 4. EXPLORE/FIND SKILLS PAGE

**Top Search Bar**
- Large search input: "Search for skills or people..."
- Filter icon (opens filter panel)
- View toggle: Grid view / List view

**Filter Panel** (Sidebar or Bottom Sheet)
- Skill Category (multiple select)
- Location: City + distance radius (slider)
- Availability: Days, time slots
- Experience Level: Beginner, Intermediate, Expert
- Rating: 4+ stars, 4.5+ stars, etc.
- Sort by: Best Match, Rating, Distance, Most Active
- "Apply Filters" button
- "Clear All" link

**Results Grid/List**
- Skill cards or user cards
- Total count: "Found 156 matches"
- Paginated or infinite scroll
- Loading skeletons while fetching

**No Results State**
- Illustration of searching
- "No matches found for '[query]'"
- Suggestions: Adjust filters, try different keywords
- "Browse All Skills" button

**Trending Skills Section** (Above results)
- "Trending This Week" badge
- Horizontal scrollable list
- Skill pills with trending icon
- Click to filter by that skill

### 5. SKILL DETAIL PAGE

**Hero Section**
- Large icon with gradient background
- Skill name (large, bold)
- Category badge
- Average rating (stars + number)
- Total learners count
- Trending badge (if applicable)

**About This Skill**
- Description (2-3 paragraphs)
- What you'll learn (bullet points)
- Typical duration to learn
- Prerequisites (if any)

**Teachers Available** (Main Section)
- Grid of teacher cards
- Each card:
  - Avatar with online indicator
  - Name + verified badge
  - Location + distance
  - Rating + swaps completed
  - Available times
  - "Connect" button
- Sort options: Best Match, Highest Rated, Nearest, Most Active
- Pagination

**Similar Skills Section**
- "People also learn these skills"
- Horizontal scroll of skill cards
- Quick way to explore related skills

**Reviews & Ratings**
- Overall rating breakdown (5 stars, 4 stars, etc. with bars)
- Recent reviews
- Each review: Avatar, name, rating, comment, date
- "Write a Review" button (if user learned this skill)

**CTA Section** (Bottom)
- Sticky bar on mobile
- "Want to learn [Skill]? Find teachers now!"
- "Find Teachers" button

### 6. USER PROFILE PAGE

**Profile Header**
- Cover photo (optional gradient background)
- Avatar (circular, large, center)
- Online status indicator
- Name (bold, large)
- Location + joined date
- Verified badge (if verified)
- Edit button (if own profile)

**Stats Row** (Below header)
- Total Swaps: Number + icon
- Hours Taught: Number + icon
- Hours Learned: Number + icon
- Rating: Stars + number

**Action Buttons** (If viewing other user)
- "Connect" (primary button)
- "Message" (secondary button)
- "Report" (icon, less prominent)

**Skills I Can Teach Section**
- Card with gradient background
- List of skills with proficiency badges
- Each skill: Name, level (Beginner/Intermediate/Expert), verified checkmark

**Skills I Want to Learn Section**
- Similar card layout
- Shows learning goals
- Progress indicators if actively learning

**Badges & Achievements**
- Grid of earned badges
- Click to see badge details
- "X more badges" if many badges

**Reviews Received**
- List of reviews from swap partners
- Rating, comment, date, reviewer info
- "See all reviews" link

**Active Swaps** (If viewing own profile)
- Current ongoing swaps
- Progress bars
- Quick access to swap details

**Completed Swaps** (Timeline)
- Past swaps in chronological order
- Skill learned/taught + partner info
- Rating given/received

### 7. MATCH/CONNECT FLOW

**Step 1: View Match Profile**
- Full profile of matched user
- Match percentage prominently displayed
- Skill compatibility highlight
- "Connect" button

**Step 2: Connection Request**
- Modal/Bottom sheet opens
- "Send Connection Request to [Name]"
- Message input: "Say hi and suggest a swap plan!"
- Suggested message templates:
  - "Hi! I noticed you teach [Skill]. I can teach you [Skill] in exchange!"
  - Custom message
- "Send Request" button

**Step 3: Request Sent**
- Success animation (checkmark)
- "Request sent to [Name]!"
- "They usually respond within 24 hours"
- "Explore More Matches" button
- Notification bell: "We'll notify you when they respond"

**Step 4: Request Accepted (Notification)**
- Push notification: "[Name] accepted your request!"
- In-app: Highlighted notification
- CTA: "Plan Your Swap"

**Step 5: Plan Swap**
- Chat interface opens
- Suggested questions:
  - "When are you available?"
  - "Where should we meet?"
  - "How many hours per week?"
- Quick replies: Available times, location preferences
- "Create Swap Plan" button (when details agreed)

**Step 6: Create Swap Agreement**
- Form with fields:
  - What [Partner] will teach: [Skill], [Hours]
  - What you will teach: [Skill], [Hours]
  - Schedule: Days + times
  - Duration: [Weeks]
  - Mode: In-person / Online / Hybrid
  - Meeting location (if in-person)
- "Both agree?" checkbox for each person
- "Start Swap" button

**Step 7: Swap Active**
- Confetti animation
- "Swap started! Good luck learning!"
- Redirects to swap detail page
- Calendar invites sent
- Reminder notifications scheduled

### 8. ACTIVE SWAP PAGE

**Swap Header**
- Partner's avatar + name
- Skill exchange summary
- Progress ring showing completion %
- Overall swap status: Active, Paused, Completed

**Swap Details Card**
- Your commitment: Teach [Skill], [X hours], [Y weeks]
- Their commitment: Teach [Skill], [X hours], [Y weeks]
- Schedule: Days + times
- Meeting info: Location or video link
- Start date + expected end date

**Progress Tracking**
- Your progress teaching: Hours logged, rating from partner
- Your progress learning: Hours logged, rating given
- Visual: Two progress bars (one for each person)
- Milestone markers

**Log Session Button** (Prominent)
- After each session, both log it
- Modal opens with:
  - Date/Time (auto-filled)
  - Duration (hours/minutes)
  - What was covered (text input)
  - Rate this session (1-5 stars)
  - Notes/feedback (optional)
- "Submit" button
- SkillCoins earned displayed after logging

**Upcoming Sessions**
- Calendar view of scheduled sessions
- Next session highlighted
- "Join Video Call" button (if online)
- "Get Directions" button (if in-person)
- Reschedule option

**Chat Section**
- Integrated chat with partner
- Quick access without leaving swap page
- Floating chat bubble icon

**Actions Menu** (Dots or gear icon)
- Pause swap (with reason)
- Reschedule session
- Report issue
- Complete swap early
- Cancel swap (warning message)

**Completion Flow**
- When all hours logged or time period ends
- "Congratulations! Swap completed!" message
- Confetti animation
- Request final review/rating
- SkillCoins bonus for completion
- Badge unlocked (if first swap)
- "Find Another Partner" CTA

### 9. MESSAGES/CHAT PAGE

**Chat List View**
- List of conversations
- Each item:
  - Avatar + online status
  - Name
  - Last message preview (truncated)
  - Timestamp
  - Unread count badge
- Search conversations bar at top
- Filter: All, Unread, Active Swaps

**Chat Detail View**
- Partner avatar + name (header)
- Online status
- Message thread
- Each message:
  - Avatar (for partner's messages)
  - Message bubble (different colors for sent/received)
  - Timestamp
  - Read receipt (checkmarks)
- Input box at bottom
- Attach button (images, files)
- Send button
- Typing indicator: "[Name] is typing..."

**Features**
- Auto-scroll to latest message
- Pull-to-refresh for older messages
- Long-press message options: Copy, Delete, Report
- Rich media: Image preview, link preview
- Push notifications for new messages

**Empty State**
- "No messages yet"
- "Start connecting with people to chat"
- "Explore Matches" button

### 10. SKILLCOINS & REWARDS PAGE

**Header**
- Large SkillCoins balance (animated counter)
- "You have X SkillCoins" with coin icon
- Visual: Coin pile graphic or animated coins

**How to Earn Section**
- Grid of earning methods
- Each card:
  - Icon (colorful)
  - Action: "Complete a swap"
  - Reward: "+10 coins"
  - Progress: "3 of 5 complete"
  - Claim button (if eligible)

**Ways to Earn**
- Complete swap: +10 coins
- Get 5-star rating: +5 bonus
- Refer friend (they join): +20 coins
- First swap of month: +15 coins
- Teach 100 hours: +100 coins
- Daily login streak: +1-5 coins/day
- Community contribution: +5-10 coins

**Spend SkillCoins Section**
- "Redeem Your Coins" heading
- Grid of redemption options
- Each card:
  - Icon/image
  - Reward name: "Priority Matching"
  - Cost: "30 coins"
  - Description
  - "Redeem" button

**Redemption Options**
- Priority matching (30 coins): Appear first in search results for 7 days
- Verified skill badge (50 coins): Show expertise in a skill
- Feature profile (100 coins): Homepage feature for 3 days
- Unlock premium filters (150 coins): Advanced search filters
- Gift vouchers (500+ coins): Amazon, Flipkart vouchers

**Transaction History**
- "Recent Activity" section
- List of earnings and spending
- Each row: Icon, description, amount (+/-), date
- Filter: All, Earned, Spent

**Leaderboard Link**
- "See Top Earners This Week" button
- Links to leaderboard page

**Gamification**
- Progress bar to next milestone
- "500 more coins to reach Gold tier!"
- Tier badges: Bronze, Silver, Gold, Platinum

### 11. NOTIFICATIONS PAGE

**Notification List**
- Chronological order (newest first)
- Grouped by: Today, Yesterday, This Week, Older

**Notification Types & Design**

**A. Connection Request**
- Avatar of requester
- "[Name] sent you a connection request"
- Time stamp
- Two buttons: "Accept" (primary), "Decline" (secondary)

**B. Request Accepted**
- Avatar
- "[Name] accepted your connection request!"
- "Plan your swap now" link
- Time stamp

**C. Swap Update**
- Progress icon
- "[Name] logged a session for [Skill] swap"
- "Log your session too" link
- Time stamp

**D. Swap Completed**
- Checkmark icon (green)
- "You completed your swap with [Name]!"
- "Rate your experience" link
- Time stamp

**E. SkillCoins Earned**
- Coin icon (gold)
- "You earned +10 SkillCoins for completing a swap!"
- Time stamp

**F. Badge Unlocked**
- Badge icon
- "Achievement unlocked: [Badge Name]!"
- "View badge" link
- Confetti animation effect
- Time stamp

**G. Message Received**
- Avatar
- "[Name]: [Message preview...]"
- "Reply" link
- Time stamp

**H. Event Reminder**
- Calendar icon
- "Tej Meetup starts in 1 hour!"
- Location
- "Get directions" link

**I. System Notification**
- Info icon
- "New feature: Video calls are now available!"
- "Try it now" link

**Actions**
- Swipe left to delete (mobile)
- "Mark all as read" button (top right)
- Filter: All, Unread, Swaps, Messages, System

**Empty State**
- Bell icon
- "No new notifications"
- "You're all caught up!"

### 12. SETTINGS PAGE

**Profile Settings**
- Edit profile (name, photo, bio)
- Location preferences
- Availability schedule
- Skills (add/remove/edit)

**Account Settings**
- Phone number (verified badge)
- Email address
- Password change
- Connected accounts (Google, Facebook)

**Notification Settings**
- Push notifications (toggle)
- Email notifications (toggle)
- Notification types:
  - New messages (on/off)
  - Connection requests (on/off)
  - Swap updates (on/off)
  - SkillCoins earned (on/off)
  - Weekly summary (on/off)

**Privacy Settings**
- Profile visibility: Public, Friends Only, Private
- Show online status (toggle)
- Who can send connection requests: Everyone, Mutual connections
- Block list

**App Settings**
- Language: English, Hindi, Other
- Theme: Light, Dark, Auto
- Text size: Small, Medium, Large
- Data saver mode (toggle)

**Premium/Subscription**
- Current plan: Free / Premium
- Benefits of premium
- "Upgrade to Premium" button
- Billing history (if premium)

**Help & Support**
- FAQs
- Contact support
- Report a problem
- Community guidelines
- Terms of service
- Privacy policy

**About**
- App version
- "Rate us on Play Store"
- "Share Tej India"
- Credits & acknowledgments

**Danger Zone**
- Deactivate account
- Delete account (with warning)

---

## 🔐 TRUST & SAFETY DESIGN

### Verification System

**Verified Badge**
- Blue checkmark icon next to name
- Displayed on: Profile, match cards, chat headers
- Tooltip on hover: "Phone number verified"
- Glow effect to draw attention

**Verification Levels**
- Level 1: Phone verified (blue check)
- Level 2: Email verified (+ email icon)
- Level 3: ID verified (+ shield icon) - Premium feature
- Level 4: Skill verified (+ badge icon) - Passed skill quiz

### Rating & Review System

**After Each Swap**
- Prompt both users to rate each other
- 5-star rating scale (tap stars)
- Optional text review (encourage with +5 coin bonus)
- Categories: Punctuality, Knowledge, Communication, Overall
- Cannot proceed without rating (soft requirement)

**Display on Profile**
- Overall rating: Large number + stars (e.g., 4.8 ⭐)
- Rating breakdown: 5 stars (80%), 4 stars (15%), etc.
- Recent reviews section
- "Verified swap" badge on reviews (both completed the swap)

### Report & Block Features

**Report Button**
- Three-dot menu on profile/chat
- "Report User" option (flag icon)
- Modal with options:
  - Inappropriate behavior
  - Harassment
  - Spam/Scam
  - No-show for swap
  - Fake profile
  - Other (text input)
- "Submit Report" button
- Confirmation: "Thanks for reporting. We'll review within 24 hours."

**Block Feature**
- Same menu: "Block User" option
- Warning: "They won't be able to contact you"
- Confirm block
- Blocked user: Can't see profile, send messages, or connect

### Safety Tips Section

**On Profile Creation**
- Pop-up: "Stay Safe on Tej India"
- Tips:
  - Meet in public places for first swap
  - Tell a friend where you're going
  - Trust your instincts
  - Don't share personal financial info
  - Use in-app chat (don't rush to external apps)
- "I understand" button

**Safety Banner** (Throughout app)
- Small info card in various places
- "Safety Tip: Always meet in public for in-person swaps"
- Rotates different tips
- Dismissible

### In-App Chat Safety

**Automated Moderation**
- AI scans messages for:
  - Requests for money/payment
  - Suspicious links
  - Inappropriate content
  - Personal info sharing (phone, address)
- Warning: "This message may violate our guidelines"
- Option to report

**User Controls**
- Mute conversation
- Block user (directly from chat)
- Report message (long-press menu)

### Emergency Features

**SOS Button** (During in-person swaps)
- Red button in swap detail page
- "Feeling unsafe? Press for help"
- Opens emergency contacts
- Sends alert to Tej India support
- Shows nearby police stations

---

## 📊 DATA VISUALIZATION PRINCIPLES

### Progress Bars
- Height: 8-12px
- Rounded ends (fully rounded corners)
- Background: Muted gray
- Fill: Gradient (primary colors)
- Animated fill (smooth transition, 0.5s)
- Label above or below

### Circular Progress
- Ring style (donut chart)
- Stroke width: 6-8px
- Background ring: Muted gray
- Progress ring: Gradient
- Center: Percentage number (large, bold)
- Animated rotation on load

### Charts & Graphs
- Use when showing:
  - Learning hours over time
  - SkillCoins earned trend
  - Swap completion rates
- Style: Minimalist, clean lines
- Colors: Primary palette
- Grid lines: Subtle, light gray
- Tooltips on hover: Dark background, white text
- Responsive: Stack/simplify on mobile

### Stats Display
- Large number (bold, gradient if important)
- Label below (small, muted)
- Icon next to number (optional)
- Animation: Count-up on page load
- Comparative data: "+12% from last month" in green/red

---

## ♿ ACCESSIBILITY GUIDELINES

### Color Contrast
- WCAG AA compliant minimum
- Text on light background: Dark enough (4.5:1 ratio)
- Text on dark background: Light enough (4.5:1 ratio)
- Don't rely on color alone (use icons + text)

### Font Sizes
- Minimum: 14px for body text
- Minimum: 44x44px for touch targets
- Adjustable text size (settings)

### Keyboard Navigation
- All interactive elements focusable
- Tab order logical
- Focus indicators visible (outline or glow)
- Skip links for long navigation

### Screen Reader Support
- Alt text for all images
- ARIA labels for icons-only buttons
- Semantic HTML (headers, nav, main, etc.)
- Announce notifications and updates

### Reduced Motion
- Respect prefers-reduced-motion
- Disable animations if user prefers
- Keep critical info visible without animation