/**
 * THE LEDGER   the single source of truth for everything SATCORP sells.
 *
 * Feeds three surfaces: the ledger modal, the Scope step of the engagement
 * brief, and (later) the package/tier pages. Only market-facing, deliverable
 * work lives here   identity, ideal clients and differentiators from the skill
 * deck are copy, not products.
 */

export type TierId = "basic" | "standard" | "premium";

export interface LedgerItem {
  id: string;
  /** Line-item name, set in the display serif. */
  name: string;
  /** One line of scope, set in the dossier mono. */
  scope: string;
  /** What actually lands in the client's hands. */
  deliverable: string;
  /** Which package tiers this item is offered at. */
  tiers: TierId[];
  /** Marks the entries worth leading with in each section. */
  featured?: boolean;
}

export interface LedgerSection {
  id: string;
  /** File-tab label inside the ledger. */
  tab: string;
  title: string;
  /** Reddington-voice line at the head of the page. */
  epigraph: string;
  items: LedgerItem[];
}

export const LEDGER: LedgerSection[] = [
  {
    id: "brand",
    tab: "Brand",
    title: "Brand & Identity",
    epigraph:
      "A name is only worth what people assume when they hear it. We handle the assuming.",
    items: [
      {
        id: "identity-system",
        name: "Full Identity System",
        scope: "Brand foundation, modular framework, usage doctrine",
        deliverable: "Source files, brand book, usage and spacing rules",
        tiers: ["standard", "premium"],
        featured: true,
      },
      {
        id: "wordmark",
        name: "Wordmark & Logotype",
        scope: "Minimalist, luxury or modern   one direction, taken seriously",
        deliverable: "PNG / SVG / AI source, lockups, favicon set",
        tiers: ["basic", "standard", "premium"],
        featured: true,
      },
      {
        id: "color-type",
        name: "Color Doctrine & Type System",
        scope: "Palette logic, typographic scale, application rules",
        deliverable: "Token sheet, type specimen, do/don't reference",
        tiers: ["standard", "premium"],
      },
      {
        id: "brand-book",
        name: "Brand Guideline Book",
        scope: "The document that keeps everyone else honest",
        deliverable: "Editable and print-ready PDF, versioned",
        tiers: ["standard", "premium"],
      },
      {
        id: "social-kit",
        name: "Social Platform Asset Kit",
        scope: "Instagram grids and stories, TikTok covers, channel art",
        deliverable: "Platform-sized exports plus editable templates",
        tiers: ["basic", "standard", "premium"],
      },
      {
        id: "collateral",
        name: "Decks & Print Collateral",
        scope: "Presentation decks, pitch slides, banners, print pieces",
        deliverable: "Editable deck, print-ready exports",
        tiers: ["basic", "standard", "premium"],
      },
      {
        id: "templates",
        name: "Editable Template Systems",
        scope: "Canva and equivalent   so your team can hold the line",
        deliverable: "Template library with usage notes",
        tiers: ["basic", "standard"],
      },
    ],
  },
  {
    id: "web",
    tab: "Web",
    title: "Web & Interactive",
    epigraph:
      "Anyone can put a page on the internet. Rather fewer can make you look inevitable once you're there.",
    items: [
      {
        id: "landing",
        name: "Landing Page",
        scope: "One page, one objective, engineered to convert",
        deliverable: "Deployed site, source, deployment notes",
        tiers: ["basic", "standard", "premium"],
        featured: true,
      },
      {
        id: "business-site",
        name: "Business Site or Portfolio",
        scope: "Multi-page, responsive, structured for growth",
        deliverable: "Deployed site, CMS or content structure, handoff docs",
        tiers: ["standard", "premium"],
        featured: true,
      },
      {
        id: "dashboard",
        name: "Dashboard or Portal UI",
        scope: "Web app interfaces, data views, internal tooling",
        deliverable: "Component system, screens, implementation-ready build",
        tiers: ["premium"],
      },
      {
        id: "design-system",
        name: "Responsive Design System",
        scope: "Components, states, breakpoints, dark and light modes",
        deliverable: "Design system files plus coded components",
        tiers: ["standard", "premium"],
      },
      {
        id: "interactive-3d",
        name: "Interactive & 3D Web Experience",
        scope: "GSAP motion, WebGL scenes, scroll-driven storytelling",
        deliverable: "Deployed experience, optimized assets, perf budget",
        tiers: ["premium"],
        featured: true,
      },
      {
        id: "deployment",
        name: "Hosting & Deployment Strategy",
        scope: "Local to VPS to scalable environments",
        deliverable: "Environment setup, deploy pipeline, runbook",
        tiers: ["standard", "premium"],
      },
      {
        id: "performance",
        name: "SEO Structure & Performance Tuning",
        scope: "Structure, metadata, Core Web Vitals",
        deliverable: "Audit, fixes applied, before/after report",
        tiers: ["basic", "standard", "premium"],
      },
    ],
  },
  {
    id: "systems",
    tab: "Systems",
    title: "Systems & Automation",
    epigraph:
      "Most businesses don't have a problem. They have twelve problems wearing one coat.",
    items: [
      {
        id: "workflow-mapping",
        name: "Workflow Mapping & SOPs",
        scope: "How the work actually moves, written down and made repeatable",
        deliverable: "Process maps, SOP library, versioned documentation",
        tiers: ["standard", "premium"],
        featured: true,
      },
      {
        id: "intake-systems",
        name: "Client Intake & Asset Organization",
        scope: "Intake, file structure, asset naming, delivery folders",
        deliverable: "Structured system plus templates and conventions",
        tiers: ["basic", "standard", "premium"],
      },
      {
        id: "ai-pipelines",
        name: "AI-Assisted Production Pipeline",
        scope: "Automation inside an already-defined system, not instead of one",
        deliverable: "Pipeline design, configured tools, operating guide",
        tiers: ["premium"],
        featured: true,
      },
      {
        id: "toolchain",
        name: "Toolchain Optimization",
        scope: "Fewer tools, better wired, doing more",
        deliverable: "Audit, recommended stack, migration plan",
        tiers: ["standard", "premium"],
      },
      {
        id: "service-architecture",
        name: "Service & Offer Architecture",
        scope: "Package tiers, scope boundaries, upsell logic",
        deliverable: "Offer structure, pricing architecture, scope sheets",
        tiers: ["standard", "premium"],
      },
      {
        id: "advisory",
        name: "Advisory Retainer",
        scope: "Brand clarity, positioning, creative direction, scalability",
        deliverable: "Standing counsel with scheduled sessions and notes",
        tiers: ["premium"],
      },
    ],
  },
  {
    id: "broadcast",
    tab: "Broadcast",
    title: "Broadcast & Streaming",
    epigraph:
      "The camera is unforgiving. Your overlay shouldn't be the reason.",
    items: [
      {
        id: "stream-package",
        name: "Stream Branding Package",
        scope: "The full look: scenes, alerts, panels, transitions",
        deliverable: "Import-ready OBS package plus source files",
        tiers: ["standard", "premium"],
        featured: true,
      },
      {
        id: "obs-architecture",
        name: "OBS Scene Architecture",
        scope: "Scene structure, sources, hotkeys, redundancy",
        deliverable: "Configured scene collection with operating notes",
        tiers: ["basic", "standard", "premium"],
      },
      {
        id: "overlays",
        name: "Animated Overlays & HUD",
        scope: "Alerts, HUD-style UI, lower thirds, scene layouts",
        deliverable: "Animated web overlays and static exports",
        tiers: ["standard", "premium"],
      },
      {
        id: "live-kit",
        name: "TikTok & Live Broadcast Kit",
        scope: "Vertical-first visual system for live formats",
        deliverable: "Platform-sized overlays, covers, templates",
        tiers: ["basic", "standard"],
      },
    ],
  },
  {
    id: "ai",
    tab: "AI",
    title: "AI-Enhanced Creative",
    epigraph:
      "The machine is quick. Someone still has to know what's worth asking for.",
    items: [
      {
        id: "prompt-frameworks",
        name: "Prompt Engineering Frameworks",
        scope: "Reusable, documented prompt systems your team can run",
        deliverable: "Prompt library, usage guide, revision process",
        tiers: ["basic", "standard", "premium"],
        featured: true,
      },
      {
        id: "style-locked",
        name: "Style-Locked AI Visual Pipeline",
        scope: "Brand-consistent generation that stays on-model",
        deliverable: "Configured pipeline, reference set, output standards",
        tiers: ["standard", "premium"],
        featured: true,
      },
      {
        id: "concept-iteration",
        name: "Rapid Concept Iteration",
        scope: "Many directions, quickly, before anything gets expensive",
        deliverable: "Concept sheets with selected directions developed",
        tiers: ["basic", "standard"],
      },
      {
        id: "ai-personas",
        name: "Custom AI Personas & Agents",
        scope: "Operational agents scoped to a real job in your business",
        deliverable: "Configured persona, instructions, handover documentation",
        tiers: ["premium"],
      },
    ],
  },
  {
    id: "game",
    tab: "Game & 3D",
    title: "Game Development & 3D",
    epigraph:
      "Worlds are just systems with better lighting. We build both.",
    items: [
      {
        id: "game-assets",
        name: "Game-Ready Asset Creation",
        scope: "Blender to engine, optimized and export-standard",
        deliverable: "FBX/GLTF assets, textures, LODs, source files",
        tiers: ["basic", "standard", "premium"],
        featured: true,
      },
      {
        id: "environments",
        name: "Environment & Level Prototyping",
        scope: "Blockouts, level layout, playable spatial design",
        deliverable: "Engine scene, blockout assets, design notes",
        tiers: ["standard", "premium"],
      },
      {
        id: "vertical-slice",
        name: "Interactive Prototype / Vertical Slice",
        scope: "A real, playable demonstration of the idea",
        deliverable: "Playable build plus project source",
        tiers: ["premium"],
        featured: true,
      },
      {
        id: "mobile-proto",
        name: "Mobile Game Prototype",
        scope: "Unity, iOS and Android first, performance-aware",
        deliverable: "Test build and project source",
        tiers: ["standard", "premium"],
      },
      {
        id: "mods",
        name: "Gameplay & QOL Mods",
        scope: "Systems, quality-of-life, server-side behaviour",
        deliverable: "Packaged mod plus install and config guide",
        tiers: ["basic", "standard"],
      },
      {
        id: "hud-kit",
        name: "UI / HUD Kit",
        scope: "Interface systems for games and simulations",
        deliverable: "Component kit, states, engine-ready exports",
        tiers: ["standard", "premium"],
      },
      {
        id: "worldbuilding",
        name: "Worldbuilding & Canon Documentation",
        scope: "Factions, operators, environments, lore bible",
        deliverable: "Canon-locked reference document and taxonomy",
        tiers: ["standard", "premium"],
      },
      {
        id: "key-art",
        name: "Key Art & Cinematic Posters",
        scope: "The image the whole project gets judged by",
        deliverable: "Print and web exports plus layered source",
        tiers: ["basic", "standard", "premium"],
      },
    ],
  },
  {
    id: "delivery",
    tab: "Delivery",
    title: "Documentation & Delivery",
    epigraph:
      "Anyone can finish. Rather fewer can hand it over so it still works in a year.",
    items: [
      {
        id: "documentation",
        name: "Long-Form Guides & Databases",
        scope: "Structured references, taxonomies, versioned documentation",
        deliverable: "Living document set with version control",
        tiers: ["standard", "premium"],
      },
      {
        id: "packaging",
        name: "Asset Packaging & Handoff",
        scope: "Professional file structuring, print- and web-ready exports",
        deliverable: "Organized delivery package with a handoff index",
        tiers: ["basic", "standard", "premium"],
        featured: true,
      },
    ],
  },
];

export const LEDGER_ITEMS: LedgerItem[] = LEDGER.flatMap((s) => s.items);

export const LEDGER_ITEM_BY_ID = Object.fromEntries(
  LEDGER_ITEMS.map((i) => [i.id, i]),
) as Record<string, LedgerItem>;

export function sectionForItem(itemId: string): LedgerSection | undefined {
  return LEDGER.find((s) => s.items.some((i) => i.id === itemId));
}

export const TIER_LABELS: Record<TierId, string> = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
};

/** Budget bands, dressed as retainer classes on the intake form. */
export const RETAINER_CLASSES = [
  { id: "i", label: "Class I", range: "Under $1k" },
  { id: "ii", label: "Class II", range: "$1k – $5k" },
  { id: "iii", label: "Class III", range: "$5k – $15k" },
  { id: "iv", label: "Class IV", range: "$15k and above" },
] as const;
