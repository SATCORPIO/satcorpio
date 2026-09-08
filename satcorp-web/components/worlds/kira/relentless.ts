/**
 * NAMTAR RELENTLESS   every string the announcement uses, in one module.
 *
 * Two reasons this is data rather than prose typed into JSX.
 *
 * **The title is not cleared.** The game's own legal register holds external
 * use of the mark until counsel returns a clearance search, and a page on this
 * domain is external use. `TITLE` is the only place the name is written down,
 * so a rename is this one line and nothing else   the same discipline the game
 * applies to its own config, where ids never carry display names.
 *
 * **The copy is load-bearing.** What may be said about an unreleased title is a
 * decision made in the pre-production dossier, not at a keyboard at midnight.
 * Holding it in one file means the next person to touch this page can read
 * every claim the site makes about the game in ninety seconds.
 *
 * Four rules live here and nowhere else:
 *
 *   1. No date appears in this file. Not a launch, not a soft launch, not a
 *      year. Every date past the vertical slice is provisional and will move.
 *   2. No price, no monetisation mechanic, no soft-launch market.
 *   3. No faction, officer, unit or region proper name. Those clear in batches,
 *      and the four factions are the highest-exposure batch there is precisely
 *      because they are the names that end up in marketing.
 *   4. Nothing here promises a feature. It states decisions already made, which
 *      is the only currency an announcement from a prototype actually has.
 */

/** The one place the title is written. A clearance rename is this line. */
export const TITLE = "NAMTAR RELENTLESS";

/** Dossier file number. `NR-` throughout; `NM-` belongs to the flagship. */
export const FILE = "NR-001";

/** Honest, and it will still be honest in a year. */
export const STANDING = "PHASE A · LANDFALL";

/** The studio's room. Shared with the safe houses further down `/kira`. */
export const DISCORD = "https://discord.gg/Fh5qy6tCTc";

/** The external positioning line, verbatim from the vision document. */
export const POSITIONING =
  "A 4X survival war game where the planet fights back   and the map remembers who held it.";

export const HEADLINE =
  "A planet that repairs itself, and considers you the damage.";

export const PREMISE =
  "The same planet, at ground level. A failed colony builds outposts from salvage among machinery it does not understand   and the machinery is still running. It reads construction as damage. On a clock everyone can see, it comes to repair the fault.";

/** The dossier header row. Four facts, none of which can expire. */
export const FACTS: [string, string][] = [
  ["Designation", "Mobile 4X survival"],
  ["Standing", "Phase A prototype"],
  ["Platform", "iOS · Android"],
  ["A session", "Three minutes, honestly"],
];

/**
 * THE CYCLE   the differentiator, and the only reason to publish anything.
 *
 * Note what is absent: a cadence. Whether the Surge arms weekly or against
 * sector age is an open design question, so the copy says "on a clock everyone
 * can see" and never names an interval. A schedule printed here becomes a
 * promise the prototype has not yet earned the right to make.
 */
export const CYCLE = {
  label: "The house clock",
  heading: "The planet is the enemy that never stops.",
  beats: [
    ["I", "The sector builds. The reading rises."],
    ["II", "The Surge arms. Everyone is told when."],
    ["III", "What the sector holds, the map keeps. What it loses, turns."],
  ] as [string, string][],
  coda:
    "There is no boss here and no war to win. There is a maintenance system running on a dead world, and you are the fault condition.",
  /** Long form. The route has the room for it; the section does not. */
  deep: [
    "Every sector carries a threat reading that climbs with everything built on it. Strength is not a defence against this. Strength is the input.",
    "When the reading crosses, the world answers across the whole sector at once   driven fauna, woken machines, and matter that should not move the way it moves. It is telegraphed. Nobody is ambushed. What varies is whether the people around you are ready.",
    "Ground the sector holds stays productive. Ground it loses turns, and stays turned until somebody goes and takes it back. The map is the scoreboard, it is persistent, and it does not care who was at war with whom last week.",
  ],
} as const;

/**
 * The five pillars, published as commitments rather than features.
 *
 * These are the only claims on the page a reader can hold the studio to in
 * three years, which is exactly why they are the ones worth making. Ranked;
 * when two conflict, the lower number wins. That ordering is the content.
 */
export const HOUSE_RULES: readonly [string, string, string, string][] = [
  [
    "I",
    "The planet is the antagonist",
    "Other players are simply the ones standing in the way.",
    "PILLAR",
  ],
  [
    "II",
    "You are slowed, never erased",
    "Wounded, not dead. There is always a way back, and you can see it from where you fell.",
    "PILLAR",
  ],
  [
    "III",
    "The thinking happens before the fight",
    "Composition, technology, intel, timing. Not reflexes. A loss you cannot read is a defect, not a lesson.",
    "PILLAR",
  ],
  [
    "IV",
    "Every player matters to someone",
    "A wall held is worth more to this sector than a neighbour farmed.",
    "PILLAR",
  ],
  [
    "V",
    "Three minutes is a real session",
    "Deeper if you have the evening. Never required.",
    "PILLAR",
  ],
] as const;

/**
 * The anti-goals, said out loud.
 *
 * Every line is a decision already taken internally, which is what makes
 * publishing them cheap. The first one is a marketing promise about marketing,
 * and it is the most differentiating sentence available in this category.
 */
export const COVENANT: readonly string[] = [
  "No power for sale that cannot be reached by playing.",
  "No advertisement showing a game that does not exist.",
  "No home screen with forty things blinking on it.",
  "No wiki required   the tables ship in the client.",
  "Forty frames a second on an ordinary phone outranks any visual feature we might want more.",
] as const;

/**
 * TWO OBJECTS, ONE WORLD.
 *
 * The single highest-risk thing about this announcement is a reader leaving
 * the page thinking the flagship went mobile. This block exists to make that
 * impossible, and it is placed high for that reason rather than as a courtesy.
 */
export const COMPARISON = {
  heading: "Two objects, one world.",
  blurb:
    "NAMTAR is the world. This is a second picture shot on location. The planet is shared. The games are not.",
  /**
   * Every row here quotes the flagship the way its own dossier one section
   * above quotes it. Two adjacent sections describing NAMTAR differently is
   * worse than no comparison at all, so if that dossier is edited, edit this.
   *
   * The phone row is the one that earns its place. NAMTAR already ships an
   * iOS and Android *companion app*   base status, alerts, logistics   and
   * without this line a reader meets two Ki-Ra things on a phone and merges
   * them. That is the precise misreading this whole block exists to prevent,
   * so the distinction is drawn rather than left to be inferred.
   */
  rows: [
    ["Form", "Open-world post-apocalyptic survival", "4X survival strategy"],
    ["Built in", "Unreal Engine 5", "Unity 6"],
    ["Played on", "PC · Xbox · PlayStation", "iOS · Android"],
    ["On your phone", "A companion app, beside the game", "The whole game"],
    ["You are", "A person, on the ground", "An outpost, in a sector"],
    ["A session", "An evening", "Three minutes, or an evening"],
    ["Standing", "In development", "Phase A prototype"],
  ] as [string, string, string][],
} as const;

/** Placeholder discipline: designed frames with file numbers, not apologies. */
export const FRAMES = [
  { label: "Sector map", file: "NR-010", stamp: "AWAITING CLEARANCE" },
  { label: "Outpost render", file: "NR-011", stamp: "AWAITING CLEARANCE" },
  { label: "Surge sequence", file: "NR-012", stamp: "REEL NOT CUT" },
] as const;

/** The deeper contact sheet, for the full brief. */
export const CONTACT_SHEET = [
  ["Concept   the ruins", "NR-020"],
  ["Concept   an outpost", "NR-021"],
  ["The three hostile families", "NR-022"],
  ["Faction silhouettes", "NR-023"],
  ["Interface studies", "NR-024"],
  ["The sky at high threat", "NR-025"],
] as const;

/**
 * The status ladder. `[REDACTED]` is not decoration here   it is the accurate
 * word. Nothing below the vertical slice is scheduled, and a fabricated date
 * would be the one sentence on this page that is not true.
 */
export const LADDER: readonly [string, string][] = [
  ["Pre-production dossier", "COMPLETE"],
  ["Engine specification", "COMPLETE"],
  ["Phase A prototype", "IN PROGRESS"],
  ["Vertical slice", "SCHEDULED"],
  ["Soft launch", "[REDACTED]"],
  ["Launch", "[REDACTED]"],
] as const;

export const LADDER_CODA = "No date. When there is one, it will be a real one.";

/**
 * The four survivor factions, by role.
 *
 * The names are withheld. Faction names carry the highest trademark exposure
 * of any naming batch in the game   because they are the ones that end up on
 * store pages and in advertising   and they clear as a batch, later. What is
 * published is the part that is safe and, as it happens, the part that is
 * interesting: what each of them is for, and what they look like.
 */
export const FACTIONS = [
  {
    role: "Logistics",
    character:
      "Salvage industrialists. Held the wreck sites, learned to strip and rebuild, and now supply half the continent. Pragmatic to the point of coldness.",
    silhouette: "Layered, asymmetric, visibly welded from parts that did not begin together",
    materials: "Scorched steel, cable, hazard striping",
    mark: "An interrupted line   a mark that means this was cut and rejoined",
  },
  {
    role: "Bastion",
    character:
      "Preservationists. They believe the colony failed for want of discipline, and that survival means holding, recording, and never overreaching. The best defensive engineers on the planet, and the least willing to leave their walls.",
    silhouette: "Heavy, symmetrical, closed   the outline of something sealed",
    materials: "Poured composite, dull ceramic, deep blue-grey",
    mark: "A closed ring, unbroken",
  },
  {
    role: "Warfare",
    character:
      "Raiders and expeditionaries who concluded early that this planet rewards whoever moves first. Fast, aggressive, uninterested in permanence. The other three need them and resent it.",
    silhouette: "Forward-leaning, stripped, minimal armour, exposed drives",
    materials: "Bare alloy, red oxide, worn paint over older paint",
    mark: "A slash through a boundary",
  },
  {
    role: "Technology",
    character:
      "Researchers who went underground   literally   to study what is down there. The only ones who have been inside the deeper strata and come back. Secretive, undermanned, and the source of nearly everything anyone else knows.",
    silhouette: "Slender, instrumented, deliberately non-military, sensor-heavy",
    materials: "Pale composite, glass, the relic hue used sparingly",
    mark: "An open bracket   unfinished, on purpose",
  },
] as const;

export const FACTIONS_NOTE =
  "Four names, withheld until clearance returns. The work does not wait on the paperwork, and neither does the page.";

/** What the planet sends. Three families, and only one of them is horror. */
export const FAMILIES: readonly [string, string, string][] = [
  [
    "Fauna",
    "Native life, coordinated by something below the surface",
    "The planet's immune response. Organic, overwhelming, not cruel",
  ],
  [
    "Machines",
    "Maintenance units still holding assignments nobody issued this century",
    "Indifferent. They are not fighting you; you are in the way",
  ],
  [
    "Corrupted",
    "Matter and machinery reworked by the signalling layer",
    "The genuinely wrong thing. Neither alive nor built",
  ],
] as const;

/** The apparatus, mobile edition. Every item is a decision already recorded. */
export const APPARATUS = [
  "Server-Authoritative",
  "Deterministic Resolution",
  "Persistent Sector State",
  "Unity 6 LTS",
  "Mid-Tier Android First",
  "Live Service",
  "Config Reviewed Like Code",
] as const;

export const APPARATUS_NOTE =
  "The client submits intents and draws what it is told. It never computes an outcome that matters. That is an anti-cheat decision, a fairness decision, and the reason the map can be trusted as a scoreboard.";
