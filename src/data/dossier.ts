import {
  Gamepad2,
  Radio,
  UserCircle,
  Brain,
  Lock,
  TerminalSquare,
  Palette,
  MonitorSmartphone,
  Network,
  Video,
  Users,
  Code2,
  LineChart,
  Fingerprint,
  Briefcase,
  Database
} from "lucide-react";

export const navLinks = [
  {
    id: "kirastudios",
    label: "KI-RA STUDIOS",
    desc: "Independent game studio building next-gen survival worlds in Unreal Engine 5. Three active projects spanning apocalyptic wastelands, frozen Viking frontiers, and corrupted hellscapes.",
    icon: Gamepad2,
    href: "/kirastudios",
    status: "ACTIVE",
    color: "#00A8FF",
    img: "/kirastudios_ue5.png",
  },
  {
    id: "pulse",
    label: "PULSE",
    desc: "Underground cyberpunk radio network broadcasting continuous synthesized frequencies from the neon-drenched future. 47 episodes. 24/7 signal.",
    icon: Radio,
    href: "/pulse",
    status: "TRANSMITTING",
    color: "#FF006E",
    img: "/pulse_cyber.png", 
  },
  {
    id: "anu",
    label: "ANU",
    desc: "Concierge Operator. Client lifecycle management, financial operations, and advanced legal workflow architecture.",
    icon: UserCircle,
    href: "/anu",
    status: "OPERATIONAL",
    color: "#EAB308",
    img: "/satcorp_ultrarealistic_1775186489305.png",
  },
  {
    id: "kyrax",
    label: "KYRAX",
    desc: "AI Concierge. Multi-Agent AI orchestration networks, generative video pipelines, and predictive intelligence units.",
    icon: Brain,
    href: "/kyrax",
    status: "ACTIVE",
    color: "#A855F7",
    img: "/wolf.png",
  },
  {
    id: "classified",
    label: "CLASSIFIED",
    desc: "Access restricted. This division requires Level 5 clearance authorization. Contact SATCORP command for access credentials.",
    icon: Lock,
    href: "#",
    status: "LOCKED",
    color: "#EF4444",
    img: "/satcorp_c2.png", 
  },
];

export const dossierData = [
  {
    id: "core",
    title: "CORE IDENTITY",
    subtitle: "Operator Value",
    icon: TerminalSquare,
    colSpan: 2,
    items: [
      "End-to-end problem solver bridging design, automation, branding, and systems",
      "Translates vague ideas into deployable assets (web/brand/workflow/media)",
      "High-performance workstation driven delivery (RTX workflows/rapid iteration)",
      "Client-first concierge model: clarity → scope → execution → polish"
    ],
    description: "Multi-disciplinary approach focused on bridging the gap between high-level vision and technical execution. Delivering clean, battle-tested solutions.",
    color: "#00FF41"
  },
  {
    id: "brand",
    title: "BRAND SYSTEMS",
    subtitle: "Visual & Platform Architecture",
    icon: Palette,
    colSpan: 2,
    items: [
      "Brand foundation & full identity systems",
      "Modular design frameworks built for scalability",
      "Wordmark/logotype design (minimalist/luxury/modern)",
      "Color doctrine & typography systems rules",
      "Asset systems engineered for long-term growth",
      "Social media platform-specific assets (IG grids / TikTok Covers)",
      "Presentation Decks / Pitch slides / Print collateral"
    ],
    description: "Complete visual architecture including core brand foundations, modular identity systems, and tactical style doctrines for long-term scalability.",
    color: "#A855F7"
  },
  {
    id: "web",
    title: "WEB & UI",
    subtitle: "Frontend Architecture",
    icon: MonitorSmartphone,
    colSpan: 1,
    items: [
      "Landing pages & scalable portals",
      "Responsive design systems",
      "Interactive elements & animation",
      "Hosting & deployment strategy",
      "HTML, CSS, JS, GSAP, Vanta.js, React"
    ],
    description: "High-performance frontend architecture using Next.js, Three.js, and interactive motion systems for immersive, conversion-focused web experiences.",
    color: "#38BDF8"
  },
  {
    id: "systems",
    title: "SYSTEMS",
    subtitle: "Architecture & Logic",
    icon: Network,
    colSpan: 1,
    items: [
      "Workflow mapping & SOP creation",
      "AI-assisted production pipelines",
      "Toolchain optimization",
      "Freelance service architecture",
      "Long-term scalability planning"
    ],
    description: "Logic-driven architecture and workflow automation utilizing n8n, Make, and AI-assisted pipelines to optimize high-volume production cycles.",
    color: "#EAB308"
  },
  {
    id: "motion",
    title: "MOTION DESIGN",
    subtitle: "Advanced Animation Systems",
    icon: Video,
    colSpan: 2,
    items: [
      "Kinetic typography, logo reveals, explainer animations",
      "Complex particle systems, fluid simulations, 3D motion graphics",
      "Character rigging & 2D/3D animation pipelines",
      "Motion tracking, rotoscoping, advanced compositing",
      "Tools: After Effects, Cinema 4D, Blender, Lottie, Rive, GSAP"
    ],
    description: "Advanced animation systems including kinetic typography, 3D simulations, and generative video pipelines designed for cinematic visual impact.",
    color: "#FF006E"
  },
  {
    id: "discord",
    title: "DISCORD ENGINES",
    subtitle: "Community Engineering",
    icon: Users,
    colSpan: 2,
    items: [
      "Community identity development & monetization architecture",
      "Server architecture design (hierarchy, permissions, gating)",
      "Custom Node.js Discord bots, AI CRM setups, API integrations",
      "Security hardening, anti-raid frameworks, moderation systems",
      "Event experience systems & high-authority server deployment"
    ],
    description: "Elite community architecture including custom AI-bot development, security hardening, and high-authority infrastructure for decentralized networks.",
    color: "#5865F2"
  },
  {
    id: "nocode",
    title: "NO-CODE",
    subtitle: "Product Architecture",
    icon: Code2,
    colSpan: 1,
    items: [
      "Full MVPs built in days",
      "Custom DBs & user auth flows",
      "Automation across 20+ APIs",
      "Tools: Webflow, Bubble, Framer, Airtable"
    ],
    description: "Rapid application prototyping and low-code deployments using Bubble, Webflow, and Airtable for lightning-fast MVP turnaround.",
    color: "#10B981"
  },
  {
    id: "growth",
    title: "GROWTH",
    subtitle: "Performance Analytics",
    icon: LineChart,
    colSpan: 1,
    items: [
      "Real-time KPI tracking",
      "Funnel analysis & A/B testing",
      "Tools: GA4, Mixpanel, Looker"
    ],
    description: "Data-driven audience growth strategy, performance analytics, and retention-focused content pipelines to scale community engagement.",
    color: "#F97316"
  },
  {
    id: "ip",
    title: "IP STRATEGY",
    subtitle: "Brand Protection",
    icon: Fingerprint,
    colSpan: 1,
    items: [
      "Naming systems & tagline dev",
      "Competitor positioning audits",
      "IP asset protection systems"
    ],
    description: "Strategic brand protection, intellectual property audits, and competitive positioning frameworks for long-term market authority.",
    color: "#94A3B8"
  },
  {
    id: "platforms",
    title: "MARKETPLACES",
    subtitle: "Offer Structuring",
    icon: Briefcase,
    colSpan: 1,
    items: [
      "Fiverr gig architecture",
      "Package tier logic",
      "Upsell & add-on systems"
    ],
    description: "Monetization and offer structuring for digital marketplaces, including package tier logic and automated customer acquisition systems.",
    color: "#1DBF73"
  },
  {
    id: "docs",
    title: "KNOWLEDGE",
    subtitle: "Documentation",
    icon: Database,
    colSpan: 2,
    items: [
      "Long-form guides & databases",
      "Versioned documentation",
      "Canon-locked references"
    ],
    description: "Centralized knowledge bases, internal documentation systems, and standard operating procedures (SOPs) for distributed operations.",
    color: "#0EA5E9"
  }
];
