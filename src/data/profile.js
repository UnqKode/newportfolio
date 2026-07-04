export const profile = {
  name: "Manas Yadav",
  handle: "MaYa",
  tagline: "Web Developer • Creative Coder • Spider-Fan",
  email: "mycodeunq@gmail.com",
  gmailComposeUrl:
    "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=mycodeunq@gmail.com",
  bio: [
    "Hey, I'm Manas Yadav (MaYa) - a creative web developer and freelancer from India, crafting immersive digital experiences with code and motion.",
    "I blend design and development to build interfaces that not only work but feel alive.",
    "My work blends art, animation, and code - I design web pages where creativity meets interactivity.",
  ],
};

export const socials = [
  { name: "GitHub", url: "https://github.com/UnqKode", key: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/manas-yadav-0a76b4280/",
    key: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/yadav__manas/",
    key: "instagram",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/maya_1310/",
    key: "reddit",
  },
];

export const projects = [
  {
    id: 1,
    exeName: "VOXC.exe",
    title: "VOXC: AI-Powered Chrome Extension",
    description:
      "A Chrome extension offering instant AI assistance through voice-driven commands and smart actions.",
    highlights: [
      "Built with Chrome Extensions API, Web Speech API, and Gemini 2.0 Flash API.",
      "Real-time voice interaction enabling summarization, translation, and contextual replies.",
      "Achieved 150+ downloads and improved user interaction speed by ~25%.",
    ],
    tags: ["Chrome API", "JavaScript", "Web Speech API", "Gemini API"],
    iconKey: "mic",
    color: "#8b5cf6",
    link: "https://l-anding-page.vercel.app/",
  },
  {
    id: 2,
    exeName: "NexusPrice.exe",
    title: "NexusPrice: Token Price Fetcher",
    description:
      "A high-performance crypto price engine providing historical and real-time token prices with fast caching.",
    highlights: [
      "Built with Next.js, Redis caching, and Alchemy API for ultra-fast price retrieval.",
      "Interpolation fallback ensures consistent results during missing data points.",
      "Processes 500+ background jobs per minute using BullMQ workers and MongoDB.",
    ],
    tags: ["Next.js", "Redis", "BullMQ", "Alchemy API", "MongoDB"],
    iconKey: "coins",
    color: "#f59e0b",
    link: "https://nexus-price-kj4n.vercel.app/",
  },
  {
    id: 3,
    exeName: "CampusApp.exe",
    title: "Campus App",
    description:
      "A cross-platform campus application adopted by 2500+ users, offering unified, real-time campus services.",
    highlights: [
      "Built with React Native for a fast, smooth experience on Android and iOS.",
      "5 core modules: directory, canteen ordering, navigation, FAQs, and announcements.",
      "Modular architecture supporting offline bundles and department extensions.",
    ],
    tags: ["React Native", "MongoDB", "Express", "Node.js", "TailwindCSS"],
    iconKey: "gradcap",
    color: "#14b8a6",
    link: "https://github.com/varunhp06/campus-connect",
  },
  {
    id: 4,
    exeName: "Chat.io.exe",
    title: "Chat.io: Real-Time Chat Application",
    description:
      "A full-stack real-time chat platform with fast messaging, autocorrect, and scalable architecture.",
    highlights: [
      "Built using React, Express, Socket.io, and MongoDB for low-latency communication.",
      "Server-side autocorrect significantly improves message accuracy.",
      "Designed to scale for high concurrency and stable message delivery.",
    ],
    tags: ["React", "Socket.io", "Express", "MongoDB", "Node.js"],
    iconKey: "chat",
    color: "#0078d4",
    link: "https://chat-io-9xh6.onrender.com/",
  },
  {
    id: 5,
    exeName: "Spacify.exe",
    title: "Spacify",
    description:
      "A space-themed website built from scratch with plain HTML, CSS, and JavaScript, showcasing core front-end fundamentals without any framework.",
    highlights: [
      "Built using vanilla HTML, CSS, and JavaScript - no frameworks or libraries.",
      "Demonstrates fundamentals: semantic markup, responsive layout, and DOM scripting.",
      "Focused on clean structure and animation using raw CSS/JS techniques.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    iconKey: "globe",
    color: "#6366f1",
    link: "",
  },
  {
    id: 6,
    exeName: "CompanyFilter.exe",
    title: "LeetCode Company Filter",
    description:
      "A Chrome extension that filters LeetCode questions by company, pulling curated company-wise question lists from GitHub.",
    highlights: [
      "Featured badge on the Chrome Web Store with 1000+ installs and 600+ active users.",
      "Pulls and syncs company-tagged question sets from GitHub sources for leetcode.com.",
      "Lightweight extension focused entirely on speeding up targeted interview prep.",
    ],
    tags: ["Chrome Extension", "JavaScript", "GitHub API"],
    iconKey: "filter",
    color: "#f43f5e",
    link: "https://chromewebstore.google.com/detail/leetcode-company-filter/flfimdgadfpklachpkdcofdnljigmjno",
  },
];

export const skillGroups = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "C++", "Python", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "HTML/CSS"],
  },
  {
    group: "Backend & Infrastructure",
    items: ["Node.js", "Express", "Firebase", "MongoDB", "Redis", "REST APIs"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL (schema design, indexing, normalization)"],
  },
  {
    group: "Cloud & DevOps",
    items: ["Firebase Hosting", "Vercel", "Cloudinary", "CI/CD basics", "Containerization (Docker - basics)"],
  },
  {
    group: "Testing & Quality",
    items: ["Postman API Testing", "Unit Testing (Jest - basics)", "Debugging", "Performance Optimization"],
  },
  {
    group: "Developer Tools",
    items: ["Git", "GitHub", "Agile/Scrum workflows", "Postman", "Chrome DevTools", "VS Code"],
  },
  {
    group: "Specialized",
    items: ["BullMQ (Job Queues)", "Web Speech API", "Chrome Extensions", "Distributed Caching", "Asynchronous Processing"],
  },
];
