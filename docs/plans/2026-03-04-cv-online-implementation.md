# CV Online Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bold, creative single-page online CV for a Senior Fullstack Developer with PDF export, deployed on Vercel.

**Architecture:** Next.js App Router single-page app. All CV data lives in a typed TypeScript file (`resume.ts`). Six sections (Hero, About, Experience, Skills, Education, Contact) compose the page. Playwright generates PDF via an API route. Tailwind CSS handles styling with a custom "Electric Midnight" color palette.

**Tech Stack:** Next.js 14+, Tailwind CSS, TypeScript, Playwright (PDF), Vercel deployment

**Design Doc:** `docs/plans/2026-03-04-cv-online-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/fonts.ts`, `postcss.config.mjs`

**Step 1: Initialize Next.js project**

Run from `/Users/quynhlx/Sources/my-cv`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
Expected: Project created with Next.js boilerplate.

**Step 2: Configure custom fonts**

Create `src/lib/fonts.ts`:
```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```

**Step 3: Configure Tailwind with "Electric Midnight" palette**

Update `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#FF6B6B",
        "deep-space": {
          1: "#0F0C29",
          2: "#302B63",
          3: "#24243E",
        },
        "text-light": "#F8F8F2",
        "text-dark": "#1A1A2E",
        "bg-light": "#FAFAFA",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 4: Update root layout with fonts and metadata**

Replace `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quynh Le | Senior Fullstack Developer",
  description:
    "12+ years building scalable web & mobile applications. Expertise in React, .NET, Node.js, and cloud infrastructure.",
  openGraph: {
    title: "Quynh Le | Senior Fullstack Developer",
    description:
      "12+ years building scalable web & mobile applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-bg-light text-text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 5: Update globals.css**

Replace `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
}
```

**Step 6: Create placeholder page**

Replace `src/app/page.tsx`:
```typescript
export default function Home() {
  return (
    <main>
      <h1 className="font-heading text-4xl font-bold text-center py-20">
        CV Coming Soon
      </h1>
    </main>
  );
}
```

**Step 7: Verify dev server starts**

```bash
cd /Users/quynhlx/Sources/my-cv && npm run dev
```
Expected: Server starts at localhost:3000, page renders "CV Coming Soon" with Space Grotesk font.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and custom fonts"
```

---

### Task 2: Resume Data & Types

**Files:**
- Create: `src/data/resume.ts`

**Step 1: Create typed resume data file**

Create `src/data/resume.ts`:
```typescript
export type Social = {
  github?: string;
  linkedin?: string;
  website?: string;
  email?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  techStack: string[];
};

export type Skill = {
  name: string;
  level: number; // 0-100
};

export type SkillCategory = {
  label: string;
  skills: Skill[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  description?: string;
};

export type Resume = {
  personal: {
    name: string;
    title: string;
    avatar: string;
    summary: string;
    location: string;
    email: string;
    phone: string;
    socials: Social;
  };
  experience: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
};

export const resume: Resume = {
  personal: {
    name: "Quynh Le",
    title: "Senior Fullstack Developer",
    avatar: "/images/avatar.jpg",
    summary:
      "Passionate fullstack developer with 12+ years of experience building scalable web and mobile applications. Proven track record of leading teams, architecting complex systems, and delivering high-impact products across diverse technology stacks.",
    location: "Vietnam",
    email: "your.email@example.com",
    phone: "+84 xxx xxx xxx",
    socials: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
    },
  },
  experience: [
    {
      company: "Company Name",
      role: "Senior Fullstack Developer",
      period: "2020 - Present",
      description:
        "Leading development of enterprise-scale web applications and microservices architecture.",
      highlights: [
        "Architected and led migration from monolith to microservices, reducing deployment time by 70%",
        "Mentored team of 5 junior developers, establishing code review practices and CI/CD pipelines",
        "Designed and implemented real-time data processing pipeline handling 10K+ events/second",
      ],
      techStack: ["React", "NestJS", "PostgreSQL", "Docker", "K8S"],
    },
    {
      company: "Previous Company",
      role: "Fullstack Developer",
      period: "2017 - 2020",
      description:
        "Developed and maintained multiple client-facing web and mobile applications.",
      highlights: [
        "Built cross-platform mobile app with React Native serving 50K+ users",
        "Implemented automated testing pipeline reducing bug reports by 40%",
        "Optimized database queries resulting in 3x improvement in API response times",
      ],
      techStack: ["Angular", ".NET", "MSSQL", "React Native"],
    },
    {
      company: "Earlier Company",
      role: "Software Developer",
      period: "2014 - 2017",
      description:
        "Full-cycle development of web applications from requirements gathering to deployment.",
      highlights: [
        "Developed enterprise resource planning system used by 200+ employees",
        "Integrated third-party payment and logistics APIs",
        "Established Git workflow and code review process for the team",
      ],
      techStack: [".NET", "Angular", "MSSQL"],
    },
  ],
  skillCategories: [
    {
      label: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "Angular", level: 85 },
        { name: "TypeScript", level: 95 },
        { name: "Next.js", level: 90 },
      ],
    },
    {
      label: "Backend",
      skills: [
        { name: ".NET", level: 90 },
        { name: "NestJS", level: 90 },
        { name: "Node.js", level: 90 },
        { name: "Express", level: 85 },
      ],
    },
    {
      label: "Mobile",
      skills: [
        { name: "React Native", level: 85 },
        { name: "Expo", level: 80 },
      ],
    },
    {
      label: "DevOps",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "Cloud Server", level: 80 },
      ],
    },
    {
      label: "Database",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "MSSQL", level: 90 },
      ],
    },
  ],
  education: [
    {
      school: "University Name",
      degree: "Bachelor of Computer Science",
      period: "2010 - 2014",
      description: "Focused on software engineering and distributed systems.",
    },
  ],
};
```

**Step 2: Commit**

```bash
git add src/data/resume.ts
git commit -m "feat: add typed resume data with placeholder content"
```

---

### Task 3: UI Components - ScrollReveal & SkillBar

**Files:**
- Create: `src/components/ui/ScrollReveal.tsx`
- Create: `src/components/ui/SkillBar.tsx`
- Create: `src/components/ui/Timeline.tsx`

**Step 1: Create ScrollReveal component**

Create `src/components/ui/ScrollReveal.tsx`:
```typescript
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Create SkillBar component**

Create `src/components/ui/SkillBar.tsx`:
```typescript
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  level: number;
};

export default function SkillBar({ name, level }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-mono text-sm font-medium">{name}</span>
        <span className="font-mono text-sm text-primary">{level}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}
```

**Step 3: Create Timeline component**

Create `src/components/ui/Timeline.tsx`:
```typescript
type Props = {
  children: React.ReactNode;
};

export function Timeline({ children }: Props) {
  return (
    <div className="relative pl-8 border-l-2 border-primary/30">
      {children}
    </div>
  );
}

export function TimelineItem({ children }: Props) {
  return (
    <div className="relative mb-12 last:mb-0">
      <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-bg-light" />
      {children}
    </div>
  );
}
```

**Step 4: Verify by importing in page**

Temporarily import one component in `src/app/page.tsx` to verify no build errors:
```typescript
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main>
      <ScrollReveal>
        <h1 className="font-heading text-4xl font-bold text-center py-20">
          CV Coming Soon
        </h1>
      </ScrollReveal>
    </main>
  );
}
```

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add ScrollReveal, SkillBar, and Timeline UI components"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`
- Create: `public/images/` directory (add placeholder avatar)

**Step 1: Create placeholder avatar**

```bash
mkdir -p public/images
```

Place a placeholder avatar image at `public/images/avatar.jpg` (or use a generated placeholder for now).

**Step 2: Create Hero component**

Create `src/components/sections/Hero.tsx`:
```typescript
"use client";

import Image from "next/image";
import { resume } from "@/data/resume";

export default function Hero() {
  const { name, title, summary, avatar } = resume.personal;

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch("/api/generate-pdf", { method: "POST" });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/\s+/g, "_")}_CV.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep-space-1 via-deep-space-2 to-deep-space-3">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-primary/20 rotate-45 animate-spin-slow" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary/50 shadow-[0_0_40px_rgba(108,99,255,0.3)]">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-text-light mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        {/* Title */}
        <p className="font-heading text-xl md:text-2xl text-text-light/80 mb-6">
          {title}
        </p>

        {/* Summary */}
        <p className="text-text-light/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          {summary}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleDownloadPDF}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-heading font-semibold rounded-full hover:shadow-[0_0_30px_rgba(108,99,255,0.5)] transition-all duration-300 hover:scale-105 print:hidden"
          >
            Download PDF
          </button>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-primary/50 text-text-light font-heading font-semibold rounded-full hover:bg-primary/10 transition-all duration-300 print:hidden"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce print:hidden">
        <div className="w-6 h-10 border-2 border-text-light/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-text-light/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Add slow spin animation to Tailwind config**

Add to `tailwind.config.ts` inside `extend`:
```typescript
animation: {
  "spin-slow": "spin 20s linear infinite",
},
```

**Step 4: Update page to use Hero**

Update `src/app/page.tsx`:
```typescript
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

**Step 5: Verify visually**

Run: `npm run dev`
Visit localhost:3000. Expected: Full-screen gradient hero with name, title, avatar area, floating shapes, and buttons.

**Step 6: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx tailwind.config.ts public/images/
git commit -m "feat: add Hero section with gradient background and floating shapes"
```

---

### Task 5: About Section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create About component**

Create `src/components/sections/About.tsx`:
```typescript
import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  const { summary, location } = resume.personal;
  const yearsOfExperience = 12;

  return (
    <section id="about" className="py-20 px-6 bg-bg-light">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl leading-relaxed text-text-dark/80 text-center mb-12">
            {summary}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {yearsOfExperience}+
              </div>
              <div className="text-sm text-text-dark/60 mt-2">
                Years Experience
              </div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {resume.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}+
              </div>
              <div className="text-sm text-text-dark/60 mt-2">Technologies</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
              <div className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {resume.experience.length}+
              </div>
              <div className="text-sm text-text-dark/60 mt-2">
                Companies
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

**Step 2: Add to page**

Update `src/app/page.tsx`:
```typescript
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
```

**Step 3: Verify visually and commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx
git commit -m "feat: add About section with stats cards"
```

---

### Task 6: Experience Section

**Files:**
- Create: `src/components/sections/Experience.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Experience component**

Create `src/components/sections/Experience.tsx`:
```typescript
import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-deep-space-1 via-deep-space-2 to-deep-space-3">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center text-text-light">
            Work{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </ScrollReveal>

        <Timeline>
          {resume.experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <TimelineItem>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="font-heading text-xl font-bold text-text-light">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-sm text-primary">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-heading text-secondary font-semibold mb-3">
                    {exp.company}
                  </p>
                  <p className="text-text-light/60 mb-4">{exp.description}</p>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-text-light/70 text-sm flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 shrink-0">&#9654;</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-primary/20 text-primary rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TimelineItem>
            </ScrollReveal>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
```

**Step 2: Add to page**

Update `src/app/page.tsx` - add `import Experience from "@/components/sections/Experience"` and `<Experience />` after `<About />`.

**Step 3: Verify visually and commit**

```bash
git add src/components/sections/Experience.tsx src/app/page.tsx
git commit -m "feat: add Experience section with timeline layout"
```

---

### Task 7: Skills Section

**Files:**
- Create: `src/components/sections/Skills.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Skills component**

Create `src/components/sections/Skills.tsx`:
```typescript
import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillBar from "@/components/ui/SkillBar";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-bg-light">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
            Tech{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resume.skillCategories.map((category, index) => (
            <ScrollReveal key={category.label} delay={index * 150}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  {category.label}
                </h3>
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page**

Update `src/app/page.tsx` - add `import Skills from "@/components/sections/Skills"` and `<Skills />` after `<Experience />`.

**Step 3: Verify visually and commit**

```bash
git add src/components/sections/Skills.tsx src/app/page.tsx
git commit -m "feat: add Skills section with animated progress bars"
```

---

### Task 8: Education Section

**Files:**
- Create: `src/components/sections/Education.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Education component**

Create `src/components/sections/Education.tsx`:
```typescript
import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-gradient-to-br from-deep-space-1 via-deep-space-2 to-deep-space-3">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center text-text-light">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Education
            </span>
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {resume.education.map((edu, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text-light">
                      {edu.degree}
                    </h3>
                    <p className="text-secondary font-semibold">{edu.school}</p>
                    <p className="font-mono text-sm text-primary mt-1">
                      {edu.period}
                    </p>
                    {edu.description && (
                      <p className="text-text-light/60 mt-3">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page and commit**

```bash
git add src/components/sections/Education.tsx src/app/page.tsx
git commit -m "feat: add Education section with icon cards"
```

---

### Task 9: Contact Section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Contact component**

Create `src/components/sections/Contact.tsx`:
```typescript
import { resume } from "@/data/resume";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Contact() {
  const { email, phone, location, socials } = resume.personal;

  const contactItems = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
    },
    {
      label: "Location",
      value: location,
      href: undefined,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
      ),
    },
  ];

  const socialLinks = [
    { name: "GitHub", url: socials.github, icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
    { name: "LinkedIn", url: socials.linkedin, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-deep-space-1">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-text-light">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-text-light/60 mb-12 max-w-lg mx-auto">
            I&apos;m always open to new opportunities and interesting projects.
            Let&apos;s connect!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,99,255,0.2)] block"
              >
                <svg
                  className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
                <p className="text-text-light/60 text-sm">{item.label}</p>
                <p className="text-text-light font-medium mt-1">{item.value}</p>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex justify-center gap-4">
            {socialLinks
              .filter((link) => link.url)
              .map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all duration-300 group"
                  aria-label={link.name}
                >
                  <svg
                    className="w-5 h-5 text-text-light/60 group-hover:text-primary transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <p className="text-text-light/30 text-sm mt-16">
            &copy; {new Date().getFullYear()} {resume.personal.name}. Built with Next.js.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

**Step 2: Update page with all sections**

Final `src/app/page.tsx`:
```typescript
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
```

**Step 3: Verify visually and commit**

```bash
git add src/components/sections/Contact.tsx src/app/page.tsx
git commit -m "feat: add Contact section and compose all sections in page"
```

---

### Task 10: Print/PDF Styles

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add print-specific CSS**

Append to `src/app/globals.css`:
```css
@media print {
  body {
    background: white !important;
    color: #1a1a2e !important;
    font-size: 11pt;
  }

  .print\\:hidden {
    display: none !important;
  }

  section {
    break-inside: avoid;
    page-break-inside: avoid;
    background: white !important;
    color: #1a1a2e !important;
    padding: 1rem !important;
  }

  /* Override dark sections for print */
  .bg-gradient-to-br,
  .bg-deep-space-1 {
    background: white !important;
  }

  .text-text-light,
  .text-text-light\\/80,
  .text-text-light\\/60,
  .text-text-light\\/70 {
    color: #1a1a2e !important;
  }

  .text-text-light\\/30 {
    color: #666 !important;
  }

  .bg-white\\/5,
  .bg-white\\/10 {
    background: #f5f5f5 !important;
    border: 1px solid #ddd !important;
  }

  .border-white\\/10 {
    border-color: #ddd !important;
  }

  /* Ensure skill bars are visible */
  .bg-gray-200 {
    background: #e5e5e5 !important;
  }

  /* Reduce spacing for print */
  .min-h-screen {
    min-height: auto !important;
  }

  .py-20 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }

  /* Remove animations */
  * {
    animation: none !important;
    transition: none !important;
  }

  /* Page breaks */
  #experience,
  #skills {
    break-before: page;
  }
}
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add print-optimized CSS for PDF generation"
```

---

### Task 11: PDF API Route with Playwright

**Files:**
- Create: `src/app/api/generate-pdf/route.ts`
- Modify: `package.json` (add playwright dependency)

**Step 1: Install Playwright**

```bash
cd /Users/quynhlx/Sources/my-cv && npm install playwright
npx playwright install chromium
```

**Step 2: Create the API route**

Create `src/app/api/generate-pdf/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST() {
  let browser = null;

  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    await page.goto(baseUrl, { waitUntil: "networkidle" });

    // Wait for fonts and images to load
    await page.waitForTimeout(1000);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0.5cm",
        right: "0.5cm",
        bottom: "0.5cm",
        left: "0.5cm",
      },
    });

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Quynh_Le_CV.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
```

**Step 3: Add NEXT_PUBLIC_BASE_URL to environment**

Create `.env.local`:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Add `.env.local` to `.gitignore` if not already there.

**Step 4: Test PDF generation**

Run `npm run dev`, then in another terminal:
```bash
curl -X POST http://localhost:3000/api/generate-pdf -o test.pdf
```
Expected: A PDF file is generated and downloaded.

**Step 5: Commit**

```bash
git add src/app/api/generate-pdf/route.ts .env.local
git commit -m "feat: add Playwright PDF generation API route"
```

---

### Task 12: Cursor Trail Effect

**Files:**
- Create: `src/components/ui/CursorTrail.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create CursorTrail component**

Create `src/components/ui/CursorTrail.tsx`:
```typescript
"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      alpha: number;
      size: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          alpha: 1,
          size: Math.random() * 3 + 1,
        });
      }
      if (particles.length > 50) particles.splice(0, 2);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= 0.02;
        p.size *= 0.98;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${p.alpha})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Only show on non-touch devices
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 hidden md:block print:hidden"
    />
  );
}
```

**Step 2: Add to layout**

Add `<CursorTrail />` inside body in `src/app/layout.tsx`:
```typescript
import CursorTrail from "@/components/ui/CursorTrail";
// ... existing imports

// Inside body:
<body className="font-body bg-bg-light text-text-dark antialiased">
  <CursorTrail />
  {children}
</body>
```

**Step 3: Commit**

```bash
git add src/components/ui/CursorTrail.tsx src/app/layout.tsx
git commit -m "feat: add subtle cursor trail effect"
```

---

### Task 13: Final Polish & Build Verification

**Files:**
- Modify: various (fixes from build test)

**Step 1: Run production build**

```bash
cd /Users/quynhlx/Sources/my-cv && npm run build
```
Expected: Build succeeds with no errors.

**Step 2: Test production mode**

```bash
npm run start
```
Visit localhost:3000. Verify:
- [ ] All 6 sections render correctly
- [ ] Scroll animations work
- [ ] Skill bars animate on scroll
- [ ] Gradient text renders properly
- [ ] Cursor trail works on desktop
- [ ] Mobile responsive (resize browser)
- [ ] "Download PDF" button triggers download
- [ ] "Contact Me" scrolls to contact section

**Step 3: Fix any issues found**

Address build errors or visual issues.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final polish and build verification"
```

---

### Task 14: Deploy to Vercel

**Step 1: Push to GitHub**

```bash
cd /Users/quynhlx/Sources/my-cv
gh repo create my-cv --public --source=. --push
```

**Step 2: Deploy via Vercel CLI or dashboard**

```bash
npx vercel --prod
```

Set environment variable `NEXT_PUBLIC_BASE_URL` to the production URL in Vercel dashboard.

**Step 3: Verify production deployment**

Visit the deployed URL. Test PDF generation in production.

**Step 4: Commit Vercel config if any**

```bash
git add -A
git commit -m "chore: add Vercel deployment configuration"
```

---

## Summary

| Task | Description | Est. Steps |
|------|-------------|-----------|
| 1 | Project scaffolding (Next.js + Tailwind + fonts) | 8 |
| 2 | Resume data & types | 2 |
| 3 | UI components (ScrollReveal, SkillBar, Timeline) | 5 |
| 4 | Hero section | 6 |
| 5 | About section | 3 |
| 6 | Experience section | 3 |
| 7 | Skills section | 3 |
| 8 | Education section | 2 |
| 9 | Contact section | 3 |
| 10 | Print/PDF styles | 2 |
| 11 | PDF API route (Playwright) | 5 |
| 12 | Cursor trail effect | 3 |
| 13 | Final polish & build verification | 4 |
| 14 | Deploy to Vercel | 4 |
