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
