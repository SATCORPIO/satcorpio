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
  | "forfeiture"
  | "streetlevel"
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
    id: "forfeiture",
    name: "FORFEITURE",
    tab: "FORFEITURE",
    href: "/forfeiture",
    role: "The case",
    tagline:
      "A persistent first-person crime simulation. A city that runs while you are logged off, evidence that physically exists, and a law-enforcement career played by other people.",
    establishment: "An open case file. Procedural, unglamorous, and still running.",
    /**
     * Institutional blue-grey, and the one genuinely new decision in this
     * establishment. The game's art bible rations colour to meaning and
     * reserves police blue for law-enforcement presence; this page's whole
     * argument is that law enforcement is real here, so it spends the law's
     * own colour on itself. It is also the only cold accent on the site apart
     * from KYRAX's near-white.
     *
     * The instinctive pick   sodium-vapour amber, the game's signature night
     * light   lands within a few degrees of NAMTAR's #d97e2f, which is exactly
     * the collision to avoid when a third Ki-Ra title joins the slate.
     */
    accent: "#5a7d94",
    scrollLerp: 0.07,
    cursor: "reticle",
    stamp: "PRE-PRODUCTION",
  },
  {
    id: "streetlevel",
    name: "STREET LEVEL",
    tab: "STREET LEVEL",
    href: "/streetlevel",
    role: "First on the bill",
    tagline:
      "A persistent online crime sim where you build a production operation with a crew, fight rival crews for the streets, and the police hunting you are other players with careers of their own.",
    establishment: "A working title, and the first one you will be able to buy.",
    /**
     * Municipal green, and the instinctive pick was wrong here in a way that
     * costs more than usual.
     *
     * This game is about police, so police blue is the obvious accent   and
     * police blue on this site is #5a7d94, one entry above. Taking it would
     * visually merge the two crime games on the tab bar, in the link-preview
     * cards, and in every screenshot anybody ever takes of this site. The
     * game's own design register (`GDD.md` §1.9) isolates this title from the
     * studio's other one deliberately, so the accent is spent as the cheapest
     * brand-isolation instrument available rather than as decoration.
     *
     * So it is chosen off a different axis entirely. The brief asks for
     * grounded and unglamorous   municipal paint, a stairwell, old signage,
     * army surplus   and a desaturated yellow-leaning green is the one thing
     * on this site that is not a crime-thriller colour. It clears the wheel by
     * some margin: the Ki-Ra teals sit near 176 degrees and this is near 97.
     */
    accent: "#6e8c5a",
    scrollLerp: 0.08,
    cursor: "reticle",
    stamp: "IN DESIGN",
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
