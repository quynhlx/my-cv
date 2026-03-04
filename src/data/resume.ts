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
    avatar: "/images/avatar-v2.jpg",
    summary:
      "12+ years building web and mobile products across Healthcare, Education, and Logistics. Tech lead at SpiderBox Design. Passionate about AI-powered development.",
    location: "Vietnam",
    email: "quynhlx@icloud.com",
    phone: "+84 388 166 199",
    socials: {
      github: "https://github.com/quynhlx",
    },
  },
  experience: [
    {
      company: "SpiderBox Design",
      role: "Senior Fullstack Developer / Tech Lead",
      period: "2019 - Present",
      description:
        "Senior developer and tech lead at SpiderBox. Building scalable web and mobile products for Healthcare and Education sectors. Pioneering the integration of AI Coding and AI Agents to enhance team productivity and delivery.",
      highlights: [
        "Core member in designing architecture and technical solutions for SpiderBox's product ecosystem",
        "Tech Lead for major Healthcare (CompanyMedicalService) and Education (MagicMap, Nimbu) projects",
        "Built cross-platform mobile apps serving 100K+ users during COVID (Health-E Passport)",
        "Mentored new team members, establishing code review practices and CI/CD pipelines",
        "Championed adoption of AI Coding and AI Agents to accelerate development workflows",
      ],
      techStack: [".NET Core", "NestJS", "PostgreSQL", "React", "Angular", "Docker", "K8S"],
    },
    {
      company: "laptrinhvien.io",
      role: "Technical Instructor",
      period: "2019 - 2020",
      description:
        "Part-time instructor at a developer training center, teaching modern web technologies to aspiring developers.",
      highlights: [
        "Taught courses on Angular and NestJS frameworks",
        "Designed curriculum covering modern fullstack development practices",
      ],
      techStack: ["Angular", "NestJS", "TypeScript"],
    },
    {
      company: "Janeto ICT (ERC Vietnam)",
      role: "Fullstack Developer / Team Lead",
      period: "2016 - 2019",
      description:
        "Developed and maintained multiple client-facing web and mobile applications for US-based clients. Led development teams and managed project delivery.",
      highlights: [
        "Built and delivered Logistics ERP, House Rental, and Virtual Data Room applications",
        "Built cross-platform mobile app with Expo serving 50K+ users",
        "Led migration of legacy MVC systems to modern Web API + Angular architecture",
        "Managed and led multiple dev teams as technical lead",
      ],
      techStack: ["Node.js", "Angular", "ElasticSearch", ".NET Core", "Web API", "MSSQL", "MongoDB"],
    },
    {
      company: "ValueComUSA",
      role: "Software Developer",
      period: "2014 - 2016",
      description:
        "Full-cycle development of web and mobile applications at a US-based software outsourcing company. From requirements gathering to deployment.",
      highlights: [
        "Developed enterprise web applications using .NET MVC stack",
        "Built iOS applications for US clients",
        "Handled full software development lifecycle from requirements to deployment",
      ],
      techStack: [".NET", "MVC", "MSSQL", "iOS"],
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
      school: "Posts and Telecommunications Institute of Technology",
      degree: "Bachelor of Information Technology",
      period: "2010 - 2014",
      description: "Focused on software engineering and telecommunications systems.",
    },
  ],
};
