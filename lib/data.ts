export const profile = {
  name: "Sabharish Varshaan S",
  role: "Backend Engineer",
  tagline: "I build secure, scalable APIs that hold up under real load.",
  location: "Chennai, Tamil Nadu, India",
  email: "sabharishvarshaans@gmail.com",
  linkedin: "https://www.linkedin.com/in/sabharish-varshaan-s-729a52294",
  github: "https://github.com/Sabharish-Varshaan",
};

export const about = [
  "I'm a backend engineer who enjoys designing clean, secure, and scalable server-side systems. I work mainly with Python, FastAPI, and PostgreSQL, and I care about the parts of a system that only show up under real use: database performance, concurrency, authentication, and access control.",
  "I like understanding how things behave under load, not just making them work. That means thinking about service-layer structure, indexing and query tuning, rate limiting, and security from the start rather than as an afterthought.",
  "I also enjoy leading and sharing what I know. I've organized technical workshops and competitions for a community of developers, which taught me how to explain complex ideas clearly.",
];

export const principles = [
  { k: "01", t: "Performance", d: "Indexing, query tuning and concurrency, measured under load." },
  { k: "02", t: "Security", d: "JWT, RBAC and rate limiting designed in, not bolted on." },
  { k: "03", t: "Structure", d: "Clean service layers and REST contracts that stay maintainable." },
];

export const stack = [
  { group: "Languages & Frameworks", items: ["Python", "FastAPI", "SQLAlchemy", "REST API design"] },
  { group: "Data", items: ["PostgreSQL", "Redis", "Database Optimization", "Data Structures & Algorithms"] },
  { group: "Security", items: ["JWT", "RBAC", "Authentication", "Rate limiting"] },
  { group: "Tooling", items: ["Docker", "Git", "GitHub"] },
];

export const journey = [
  {
    when: "Mar 2026 — Apr 2026",
    title: "Student Coordinator, CSI Student Branch",
    org: "Computer Society of India, Chennai",
    desc: "Coordinated the state-level Quiz 2 Code Challenge: Round 1 online quiz with 219 students across Tamil Nadu, and an offline Round 2 final for the top 60. Honored at the CSI badging ceremony.",
    tag: "Leadership",
  },
  {
    when: "2025 — 2026",
    title: "Lead Backend Engineer",
    org: "Personal & academic projects: Smart Attendance, GuardGig, Preop-Triage",
    desc: "Led backend and AI engineering across three projects: a campus attendance platform, an automated insurance claims engine and a clinical decision-support system.",
    tag: "Projects",
  },
  {
    when: "Jun 2025 — Mar 2026 · 10 mos",
    title: "Technical Lead",
    org: "Intellects Club, SRM Ramapuram",
    desc: "Led the technical roadmap and mentorship for a 60-member club. Delivered 3 workshops and coding competitions, each attended by 50–70 students.",
    tag: "Leadership",
  },
  {
    when: "Aug 2024 — Jun 2025 · 11 mos",
    title: "Member, Technical Domain",
    org: "Intellects Club, SRM Ramapuram",
    desc: "Joined the club's technical domain, the start of 1 year 8 months with Intellects Club.",
    tag: "Community",
  },
  {
    when: "2024 — 2025",
    title: "Development Team Member",
    org: "Placement Attendance Management System",
    desc: "Built a core module used to track student participation in campus placement training.",
    tag: "Engineering",
  },
  {
    when: "Jun 2023 — May 2027",
    title: "B.Tech, Computer Science and Engineering",
    org: "SRM Institute of Science and Technology, Ramapuram",
    desc: "CGPA 9.48 / 10. Coursework: Database Management Systems, Concurrency Control, Backend Systems Architecture, Operating Systems, Machine Learning.",
    tag: "Education",
  },
  {
    when: "Jun 2017 — Apr 2023",
    title: "Higher Secondary",
    org: "Vanavani Matriculation Higher Secondary School",
    desc: "School education before starting university.",
    tag: "Education",
  },
];

export const certifications = [
  "Python Bootcamp",
  "Python for Data Science, AI and Development",
  "Data Analysis with Python",
];

export const projects = [
  {
    n: "01",
    title: "Smart Attendance Platform",
    kind: "Campus Infrastructure",
    desc: "Role-based attendance platform that replaced manual Excel tracking for 2,500+ students across four interfaces: student, teacher, incharge and admin.",
    points: [
      "66 REST APIs and 23 indexes (15 single-column, 8 composite); p99 latency under 1s at peak load",
      "Atomic database-level operations to fix a race condition in concurrent attendance updates",
      "Custom Redis sliding-window rate limiter tuned for shared campus WiFi/NAT",
      "JWT, bcrypt and RBAC; moved auth storage to HttpOnly cookies after fixing an XSS issue",
    ],
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "Docker", "JWT & RBAC"],
    link: "https://github.com/Sabharish-Varshaan",
    linkLabel: "GitHub profile ↗",
  },
  {
    n: "02",
    title: "GuardGig",
    kind: "Automated Claims Engine",
    desc: "Insurance claims backend with a service-layer architecture separating routes from business logic, covering policy, claims and payout workflows for policyholders, agents and admins.",
    points: [
      "APScheduler job every 5 minutes evaluates live trigger data against active policies and processes eligible claims",
      "Stateful JWT and RBAC for immediate access revocation",
      "Scikit-Learn model flags high-risk claims for manual investigation",
    ],
    stack: ["FastAPI", "PostgreSQL", "Supabase", "Scikit-Learn", "APScheduler", "Stateful JWT"],
    link: "https://github.com/Sabharish-Varshaan/GuardGig",
    linkLabel: "View on GitHub ↗",
  },
  {
    n: "03",
    title: "Preop-Triage",
    kind: "Clinical Decision-Support",
    desc: "Pre-operative risk scoring that combines a deterministic clinical rules engine with an AI-assisted advisory layer.",
    points: [
      "Role-based workflows for patients, doctors and admins with JWT authentication",
      "Automated case routing for moderate- and high-risk patients",
      "Validation layer that catches unsafe AI-generated content before it reaches a user",
    ],
    stack: ["FastAPI", "Next.js", "TypeScript", "FAISS", "Ollama/Mistral", "SQLAlchemy"],
    link: "https://github.com/Sabharish-Varshaan/Preop-Triage",
    linkLabel: "View on GitHub ↗",
  },
];

export const topSkills = ["Data Structures & Algorithms", "Database Optimization", "GitHub"];
export const languages = [{ name: "English", level: "Professional Working" }];
