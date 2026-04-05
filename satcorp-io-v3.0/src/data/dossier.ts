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
    desc: "RECONSTRUCTION // v3.5",
    icon: Gamepad2,
    href: "/kirastudios",
    status: "ACTIVE",
    color: "#00A8FF",
    img: "/kirastudios_ue5.png",
  },
  {
    id: "pulse",
    label: "PULSE",
    desc: "RECONSTRUCTION // v3.5",
    icon: Radio,
    href: "/pulse",
    status: "TRANSMITTING",
    color: "#FF006E",
    img: "/pulse_cyber.png", 
  },
  {
    id: "anu",
    label: "ANU",
    desc: "RECONSTRUCTION // v3.5",
    icon: UserCircle,
    href: "/anu",
    status: "OPERATIONAL",
    color: "#EAB308",
    img: "/satcorp_ultrarealistic_1775186489305.png",
  },
  {
    id: "kyrax",
    label: "KYRAX",
    desc: "RECONSTRUCTION // v3.5",
    icon: Brain,
    href: "/kyrax",
    status: "ACTIVE",
    color: "#A855F7",
    img: "/satcorp_c2.png",
  },
  {
    id: "classified",
    label: "CLASSIFIED",
    desc: "UPLINK // DISCORD HQ",
    icon: Lock,
    href: "https://discord.gg/Ff8mArCacW",
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
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#00FF41"
  },
  {
    id: "brand",
    title: "BRAND SYSTEMS",
    subtitle: "Visual & Platform Architecture",
    icon: Palette,
    colSpan: 2,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#A855F7"
  },
  {
    id: "web",
    title: "WEB & UI",
    subtitle: "Frontend Architecture",
    icon: MonitorSmartphone,
    colSpan: 1,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#38BDF8"
  },
  {
    id: "systems",
    title: "SYSTEMS",
    subtitle: "Architecture & Logic",
    icon: Network,
    colSpan: 1,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#EAB308"
  },
  {
    id: "motion",
    title: "MOTION DESIGN",
    subtitle: "Advanced Animation Systems",
    icon: Video,
    colSpan: 2,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#FF006E"
  },
  {
    id: "discord",
    title: "DISCORD ENGINES",
    subtitle: "Community Engineering",
    icon: Users,
    colSpan: 2,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#5865F2"
  },
  {
    id: "nocode",
    title: "NO-CODE",
    subtitle: "Product Architecture",
    icon: Code2,
    colSpan: 1,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#10B981"
  },
  {
    id: "growth",
    title: "GROWTH",
    subtitle: "Performance Analytics",
    icon: LineChart,
    colSpan: 1,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#F97316"
  },
  {
    id: "ip",
    title: "IP STRATEGY",
    subtitle: "Brand Protection",
    icon: Fingerprint,
    colSpan: 1,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#94A3B8"
  },
  {
    id: "platforms",
    title: "MARKETPLACES",
    subtitle: "Offer Structuring",
    icon: Briefcase,
    colSpan: 1,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#1DBF73"
  },
  {
    id: "docs",
    title: "KNOWLEDGE",
    subtitle: "Documentation",
    icon: Database,
    colSpan: 2,
    items: ["COMING SOON // UNDER RECONSTRUCTION"],
    description: "COMING SOON // UNDER RECONSTRUCTION",
    color: "#0EA5E9"
  }
];
