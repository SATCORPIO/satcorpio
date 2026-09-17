/**
 * The establishments.
 *
 * Every page is art-directed as its own standalone site. This table holds the
 * handful of values that are allowed to differ   accent, scroll feel, cursor,
 * voice   so the rest of the system can stay identical across all of them.
 *
 * NAMTAR RELENTLESS sits here as its own tab, not folded under Ki-Ra's,
 * because it now needs to be reachable in one click rather than a scroll and
 * a click through `/kira`. It keeps Ki-Ra's accent (same studio, same teal)
 * and stays introduced from the `/kira` page as the second feature   this
 * entry is what makes it a destination in its own right as well.
 */

export type DivisionId =
  | "satcorp"
  | "anu"
  | "kyrax"
  | "kira"
  | "namtar"
  | "relentless"
  | "pulse";

export type ThemeId = DivisionId | "engage";

export type CursorKind = "crosshair" | "native" | "block" | "reticle" | "pulse";

export interface Division {
  id: DivisionId;
  /** Full name as it appears in headlines. */
  name: string;
  /** Short label for the file-tab nav. */
  tab: string;
  href: string;
  /** One line, dossier voice   what this division is inside the ecosystem. */
  role: string;
  /** Hero sub-headline. */
  tagline: string;
  /** Establishment identity: what the page should feel like. */
  establishment: string;
  /** Hex accent. Mirrors the [data-division] block in globals.css. */
  accent: string;
  /** Lenis lerp. Lower is heavier   ANU is the slowest room in the building. */
  scrollLerp: number;
  cursor: CursorKind;
  /** Status chip rendered in the tab bar. */
  stamp: string;
}

export const DIVISIONS: Division[] = [
  {
    id: "satcorp",
    name: "SATCORP",
    tab: "SATCORP",
    href: "/",
    role: "The organization",
    tagline:
      "Intelligent systems. Creative platforms. Digital worlds. Engineered, connected, and run on our own iron.",
    establishment: "A shadow holding company's front door.",
    accent: "#a6192e",
    scrollLerp: 0.08,
    cursor: "crosshair",
    stamp: "ACTIVE",
  },
  {
    id: "anu",
    name: "ANU",
    tab: "ANU",
    href: "/anu",
    role: "The architect",
    tagline:
      "Engineering the SATCORP ecosystem. Full-stack development, enterprise-grade infrastructure, and bespoke digital solutions.",
    establishment: "A private study, received at midnight.",
    accent: "#b08d57",
    scrollLerp: 0.06,
    cursor: "native",
    stamp: "EYES ONLY",
  },
  {
    id: "kyrax",
    name: "KYRAX",
    tab: "KYRAX",
    href: "/kyrax",
    role: "The brain",
    tagline:
      "Tactical intelligence. Connected systems. The cognitive foundation behind everything SATCORP operates.",
    establishment:
      "A private intelligence registry. Not a terminal   an archive that already knows.",
    accent: "#d6e4e5",
    scrollLerp: 0.1,
    cursor: "block",
    stamp: "CLASSIFIED",
  },
  {
    id: "kira",
    name: "Ki-Ra Studios",
    tab: "KI-RA",
    href: "/kira",
    role: "The creator",
    tagline:
      "SATCORP's interactive entertainment division. Immersive games, persistent online worlds, next-generation digital experiences.",
    establishment:
      "A private screening room. Worlds presented the way a fixer presents destinations.",
    accent: "#1f6f6b",
    scrollLerp: 0.09,
    cursor: "reticle",
    stamp: "IN PRODUCTION",
  },
  {
    id: "namtar",
    name: "NAMTAR",
    tab: "NAMTAR",
    href: "/namtar",
    role: "The world",
    tagline:
      "An open-world post-apocalyptic survival game. KYRAX AI woven through combat, vehicles and bases, player- and AI-run Empires, and a fully destructible world.",
    establishment: "A blockbuster game launch.",
    accent: "#d97e2f",
    scrollLerp: 0.07,
    cursor: "reticle",
    stamp: "IN DEVELOPMENT",
  },
  {
    id: "relentless",
    name: "NAMTAR RELENTLESS",
    tab: "RELENTLESS",
    href: "/relentless",
    role: "The second feature",
    tagline:
      "A mobile 4X survival strategy game where the world escalates against every outpost on a clock, and the map keeps what the sector held.",
    establishment: "A second picture, shot on location. Same planet, different camera.",
    accent: "#1f6f6b",
    scrollLerp: 0.09,
    cursor: "reticle",
    stamp: "PHASE A",
  },
  {
    id: "pulse",
    name: "PULSE",
    tab: "PULSE",
    href: "/pulse",
    role: "The heartbeat",
    tagline:
      "Connecting creators, communities, audiences, and experiences through a unified platform built for engagement, interaction, and growth.",
    establishment: "A live broadcast network.",
    accent: "#ff2b3a",
    scrollLerp: 0.12,
    cursor: "pulse",
    stamp: "● LIVE",
  },
];

export const DIVISION_BY_ID = Object.fromEntries(
  DIVISIONS.map((d) => [d.id, d]),
) as Record<DivisionId, Division>;

/** Resolve a pathname to its establishment. Unknown routes read as SATCORP. */
export function divisionFromPath(pathname: string): Division {
  if (pathname === "/") return DIVISION_BY_ID.satcorp;
  const match = DIVISIONS.find(
    (d) => d.href !== "/" && pathname.startsWith(d.href),
  );
  return match ?? DIVISION_BY_ID.satcorp;
}

/** The Concierge Engagement Model   the sales spine, reused by the intake form. */
export const ENGAGEMENT_MODEL = [
  {
    id: "clarity",
    step: "I",
    title: "Clarity",
    subtitle: "Discovery & Truth Extraction",
    body: "Before anything is built, we establish what is actually true   the goal beneath the request, the constraint nobody mentioned, the outcome that would count as a win.",
  },
  {
    id: "scope",
    step: "II",
    title: "Scope",
    subtitle: "Architecture & Solution Design",
    body: "The work is drawn before it is made: deliverables, systems, dependencies, and the shape of the finished asset. Nothing is left to interpretation.",
  },
  {
    id: "execution",
    step: "III",
    title: "Execution",
    subtitle: "Development & Deployment",
    body: "Built, reviewed at checkpoints, polished, packaged, and handed off   deployable, scalable, and documented well enough to outlive the engagement.",
  },
] as const;
