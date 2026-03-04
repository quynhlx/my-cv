# CV Online - Design Document

## Overview

Modern, professional, "one-of-a-kind" online CV for a Senior Fullstack Developer with 12+ years of experience. Targets international recruiters and companies. Supports PDF export.

## Target & Context

- **Audience:** International recruiters & companies
- **Language:** English
- **Style:** Bold & Creative - gradient accents, asymmetric layout, dynamic elements
- **Deploy:** Vercel

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Intersection Observer (scroll reveal), CSS transitions
- **PDF Export:** Playwright (server-side rendering to PDF via API route)
- **Fonts:** Space Grotesk (headings), Inter (body), JetBrains Mono (code/tech keywords)

## Architecture: Single-Page App

All CV content on one scrollable page. Data separated from UI in a typed TypeScript file.

```
my-cv/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, metadata, OG tags)
│   │   ├── page.tsx                # Main CV page - composes all sections
│   │   └── api/
│   │       └── generate-pdf/
│   │           └── route.ts        # Playwright PDF generation endpoint
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Full-width gradient header, name, title, avatar
│   │   │   ├── About.tsx           # Personal summary with keyword highlights
│   │   │   ├── Experience.tsx      # Vertical timeline with expandable cards
│   │   │   ├── Skills.tsx          # Categorized skill bars/circles
│   │   │   ├── Education.tsx       # Education cards with icons
│   │   │   └── Contact.tsx         # Contact info + social links
│   │   └── ui/
│   │       ├── ScrollReveal.tsx    # Intersection Observer animation wrapper
│   │       ├── SkillBar.tsx        # Animated progress bar component
│   │       └── Timeline.tsx        # Reusable timeline component
│   ├── data/
│   │   └── resume.ts              # All CV data (typed constants)
│   └── lib/
│       └── fonts.ts               # Next.js font configuration
├── public/
│   ├── images/                    # Avatar, etc.
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Visual Design

### Color Palette - "Electric Midnight"

| Role       | Color     | Hex       |
|------------|-----------|-----------|
| Primary    | Electric Indigo | `#6C63FF` |
| Secondary  | Coral     | `#FF6B6B` |
| Gradient start | Deep Space 1 | `#0F0C29` |
| Gradient mid   | Deep Space 2 | `#302B63` |
| Gradient end   | Deep Space 3 | `#24243E` |
| Text light | Off White | `#F8F8F2` |
| Text dark  | Dark Navy | `#1A1A2E` |
| BG light   | Near White| `#FAFAFA` |

### Typography

- **Headings:** Space Grotesk (bold, geometric, modern)
- **Body:** Inter (clean, readable)
- **Code/Tech:** JetBrains Mono (monospace accents)

### Section Layouts

1. **Hero:** Full-width dark gradient, geometric floating shapes (subtle), large bold name, title, glowing avatar border, "Download PDF" CTA
2. **About:** Light background, large readable text, gradient-underlined keywords
3. **Experience:** Vertical timeline with connecting line + dots, hover-expandable cards, tech stack tags per entry
4. **Skills:** Grid layout, animated progress bars, grouped by category (Frontend, Backend, Mobile, DevOps, Database)
5. **Education:** Clean cards with icons
6. **Contact:** Dark section, social links with hover glow effects

### Signature Elements

- Floating geometric shapes in background (subtle animation)
- Gradient text on key headings
- Custom cursor trail effect
- Smooth scroll transitions with light parallax

## Data Structure

```typescript
type Resume = {
  personal: {
    name: string;
    title: string;
    avatar: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    socials: { github?: string; linkedin?: string; website?: string };
  };
  experience: Array<{
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    techStack: string[];
  }>;
  skills: {
    [category: string]: Array<{ name: string; level: number }>;
  };
  education: Array<{
    school: string;
    degree: string;
    period: string;
    description?: string;
  }>;
};
```

**Tech stack categories:** Frontend (.NET, Angular, React), Backend (NestJS, Node.js, Express), Mobile (React Native, Expo), DevOps (Docker, K8S, Cloud Server), Database (MSSQL, PostgreSQL, MongoDB)

## PDF Export

1. User clicks "Download PDF" button
2. Frontend calls `POST /api/generate-pdf`
3. API route uses Playwright: opens CV page → `page.pdf()` with A4 format
4. Returns PDF binary for browser download
5. CSS `@media print` ensures clean PDF layout:
   - Hide animations, interactive elements, download button
   - Adjust spacing and colors for print
   - Smart page breaks (never cut mid-card)
   - Optimize contrast for print readability

## Decisions Log

- **Single-page over multi-page:** CV doesn't need routing complexity. One scrollable page is standard and effective.
- **Playwright over React-PDF:** Maintains exact visual parity between web and PDF. No duplicate layout code.
- **Data in TS file over CMS:** For a personal CV, a typed TS file is simpler and version-controlled. No external dependencies.
- **Tailwind over CSS Modules:** Faster development, utility-first approach fits component-based architecture.
