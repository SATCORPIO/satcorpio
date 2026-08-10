import { LEDGER, RETAINER_CLASSES, TIER_LABELS } from "./ledger-catalog";
import { DIVISIONS, ENGAGEMENT_MODEL } from "./divisions";
import { LEGAL, governingLaw } from "./legal";

/**
 * THE REGISTRY INDEX
 *
 * What KYRAX actually holds, and the scoring that answers a question from it.
 *
 * The previous Ask the Registry was nine hand-written answers behind a keyword
 * match. It could only answer what it had been told to answer, so its polite
 * refusal fired on almost everything and read as a broken toy rather than as
 * discretion. This is the correction, and it has two halves:
 *
 * 1. The index is *derived* from the data the site already runs on   the
 *    Ledger catalogue, the divisions, the engagement model, the retainer
 *    classes and the paperwork. Add a service to `LEDGER` and the archive can
 *    answer questions about it the same afternoon. Nothing here is a second
 *    copy of anything.
 *
 * 2. The scope is stated to the reader up front (`HOLDINGS`), so a miss reads
 *    as a boundary rather than a failure. An archive that tells you which
 *    drawers exist is being discreet when it declines; one that implies it
 *    knows everything is simply wrong.
 *
 * Entirely deterministic and entirely client-side. No model, no API key, no
 * per-query cost, and nothing it can be talked into saying.
 */

export type EntryKind =
  | "service"
  | "division"
  | "retainer"
  | "engagement"
  | "paperwork";

export interface RegistryEntry {
  /** Stable file reference, shown on the card. */
  file: string;
  kind: EntryKind;
  title: string;
  /** One line, in the archive's voice. */
  summary: string;
  /** Supporting detail shown under the summary. */
  detail?: string;
  /** Where this entry lives on the site, if anywhere. */
  href?: string;
  /**
   * Ledger id, for entries that can be marked for scope. Present only on
   * services   the whole point of the funnel is that it never offers to
   * arrange something that is not actually for sale.
   */
  itemId?: string;
  /** Section or division this belongs under, shown as the classification. */
  group: string;
  /** Extra terms that should find this entry but do not appear in its copy. */
  aliases: string[];

  /* --- Precomputed for the scorer. Built once, at module load. --- */
  titleTokens: Set<string>;
  aliasTokens: Set<string>;
  summaryTokens: Set<string>;
  allTokens: Set<string>;
  /** Multi-word aliases, matched against the raw question as phrases. */
  aliasPhrases: string[];
}

/* ============================================================
   THE TOKENISER

   Declared before the index because the index is built at module
   load and every entry is tokenised as it is created. A `const`
   is not hoisted the way a `function` is, so STOPWORDS living
   below the build would be in its temporal dead zone   which
   throws on import and takes the whole route down with it.
   ============================================================ */

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "can", "could", "do", "does",
  "for", "from", "has", "have", "how", "i", "if", "in", "is", "it", "me",
  "much", "my", "of", "on", "or", "our", "so", "that", "the", "there",
  "they", "this", "to", "was", "we", "what", "when", "where", "which",
  "who", "why", "will", "with", "would", "you", "your",
]);

/**
 * Singular/plural and the handful of endings worth folding together.
 *
 * The `-es` rule only fires after a sibilant   "boxes" and "classes" lose the
 * whole ending, but "websites", "guides" and "services" only lose the "s",
 * because the "e" belongs to the word. Stripping "es" blindly turned
 * "websites" into "websit" while the alias "website" stayed whole, so the two
 * never met and the query found nothing.
 *
 * Words ending "-ss" keep it: "business" is not a plural, and "busines" is not
 * a word.
 */
function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  if (word.length > 4 && /(?:s|x|z|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) {
    return word.slice(0, -1);
  }
  if (word.length > 5 && word.endsWith("ing")) return word.slice(0, -3);
  return word;
}

export function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .map(stem);
}

/* ============================================================
   ALIASES
   The vocabulary a visitor uses is not the vocabulary of a
   catalogue. These are the gaps worth closing by hand   each
   one is a question somebody would actually type.
   ============================================================ */

const SERVICE_ALIASES: Record<string, string[]> = {
  wordmark: ["logo", "logotype", "mark", "icon", "favicon"],
  "identity-system": ["branding", "rebrand", "brand identity", "visual identity"],
  "brand-book": ["style guide", "brand guidelines", "guidelines"],
  "color-type": ["palette", "colours", "colors", "fonts", "typeface"],
  "social-kit": ["instagram", "tiktok", "social media", "channel art"],
  landing: ["landing page", "one pager", "microsite", "website"],
  "business-site": ["website", "web site", "webpage", "portfolio", "multi page"],
  dashboard: ["admin panel", "web app", "portal", "saas", "internal tool"],
  "design-system": ["components", "ui kit", "dark mode", "responsive"],
  "interactive-3d": ["webgl", "three js", "3d website", "animation", "gsap", "scrollytelling"],
  deployment: ["hosting", "vps", "server", "deploy", "devops", "docker"],
  performance: ["seo", "core web vitals", "lighthouse", "page speed", "slow site"],
  "workflow-mapping": ["sop", "process", "operations", "documentation"],
  "intake-systems": ["onboarding", "client intake", "file structure", "organisation"],
  "ai-pipelines": ["automation", "ai workflow", "productivity"],
  toolchain: ["tools", "stack", "software audit"],
  "service-architecture": ["pricing", "packages", "offers", "tiers"],
  advisory: ["consulting", "retainer", "coaching", "strategy"],
  "stream-package": ["twitch", "streaming", "obs", "stream overlay"],
  "obs-architecture": ["obs", "scenes", "streaming setup"],
  overlays: ["alerts", "lower thirds", "hud", "stream graphics"],
  "live-kit": ["tiktok live", "vertical", "mobile stream"],
  "prompt-frameworks": ["prompts", "prompt engineering", "llm"],
  "style-locked": ["ai images", "midjourney", "generative", "consistent style"],
  "concept-iteration": ["concepts", "moodboard", "exploration"],
  "ai-personas": ["agents", "chatbot", "assistant", "custom gpt"],
  "game-assets": ["blender", "3d models", "unity", "unreal", "game art"],
  environments: ["level design", "blockout", "map"],
  "vertical-slice": ["prototype", "demo", "playable", "proof of concept"],
  "mobile-proto": ["mobile game", "ios", "android", "unity"],
  mods: ["modding", "ark", "server mods", "quality of life"],
  "hud-kit": ["game ui", "hud", "interface"],
  worldbuilding: ["lore", "canon", "narrative", "story bible"],
  "key-art": ["poster", "cover art", "cinematic", "splash"],
  documentation: ["docs", "manual", "guide", "wiki"],
  packaging: ["handoff", "delivery", "file structure", "exports"],
};

const DIVISION_ALIASES: Record<string, string[]> = {
  satcorp: ["company", "organisation", "organization", "ecosystem", "who are you", "about"],
  anu: ["architect", "who runs", "founder", "owner", "lead", "concierge", "contact"],
  kyrax: ["ai", "intelligence", "registry", "archive", "brain", "machine learning"],
  kira: ["studio", "games", "game studio", "ki-ra", "kira", "entertainment"],
  namtar: ["game", "survival", "world", "planet", "ark"],
  pulse: ["community", "creators", "streaming", "events", "broadcast", "audience"],
};

/* ============================================================
   THE HOLDINGS
   ============================================================ */

type EntrySeed = Omit<
  RegistryEntry,
  "titleTokens" | "aliasTokens" | "summaryTokens" | "allTokens" | "aliasPhrases"
>;

/**
 * Tokenises an entry's text once, at module load.
 *
 * Everything is matched on whole stemmed tokens rather than substrings, which
 * is not a micro-optimisation   substring matching had "do you build websites"
 * returning *Worldbuilding & Canon Documentation* above the two actual web
 * services, and "how is my data handled" pulling in *Long-Form Guides &
 * Databases*. A term must be a word here, not a fragment of one.
 */
function entry(e: EntrySeed): RegistryEntry {
  const titleTokens = new Set(tokenise(e.title));
  const summaryTokens = new Set(tokenise(e.summary));
  const aliasTokens = new Set(e.aliases.flatMap(tokenise));
  const allTokens = new Set([
    ...titleTokens,
    ...summaryTokens,
    ...aliasTokens,
    ...tokenise(e.detail ?? ""),
    ...tokenise(e.group),
  ]);

  return {
    ...e,
    titleTokens,
    summaryTokens,
    aliasTokens,
    allTokens,
    aliasPhrases: e.aliases.filter((a) => a.includes(" ")).map((a) => a.toLowerCase()),
  };
}

function buildIndex(): RegistryEntry[] {
  const entries: RegistryEntry[] = [];

  // --- Services. The only entries that can be marked for scope. ---
  LEDGER.forEach((section, s) => {
    section.items.forEach((item, i) => {
      entries.push(
        entry({
          file: `KX-${String(s + 1).padStart(2, "0")}${String(i + 1).padStart(2, "0")}`,
          kind: "service",
          title: item.name,
          summary: item.scope,
          detail: `Delivered as: ${item.deliverable}. Offered at ${item.tiers
            .map((t) => TIER_LABELS[t])
            .join(", ")}.`,
          itemId: item.id,
          group: section.title,
          aliases: SERVICE_ALIASES[item.id] ?? [],
        }),
      );
    });
  });

  // --- The six operations. ---
  DIVISIONS.forEach((d, i) => {
    entries.push(
      entry({
        file: `KX-90${i + 1}`,
        kind: "division",
        title: d.name,
        summary: d.tagline,
        detail: d.establishment,
        href: d.href,
        group: `Operations   ${d.role}`,
        aliases: DIVISION_ALIASES[d.id] ?? [],
      }),
    );
  });

  // --- What things cost. The most-asked question on any site.
  //     One entry rather than four: the bands are a single fact, and four
  //     near-identical cards crowded everything else out of a five-slot result.
  entries.push(
    entry({
      file: "KX-951",
      kind: "retainer",
      title: "Retainer classes",
      summary:
        "Budget stated as a band on the brief, so neither party wastes a fortnight discovering it.",
      detail: `${RETAINER_CLASSES.map((c) => `${c.label}, ${c.range}`).join(
        " · ",
      )}. Bands rather than quotes   what a matter actually costs is settled at Scope, once the work is drawn.`,
      href: "/engage",
      group: "Retainer classes",
      aliases: [
        "price",
        "pricing",
        "cost",
        "costs",
        "budget",
        "how much",
        "rates",
        "fees",
        "quote",
        "expensive",
        "cheap",
        "afford",
        "class i",
        "class ii",
        "class iii",
        "class iv",
      ],
    }),
  );

  // --- How the work runs. ---
  ENGAGEMENT_MODEL.forEach((step, i) => {
    entries.push(
      entry({
        file: `KX-96${i + 1}`,
        kind: "engagement",
        title: `${step.step}. ${step.title}`,
        summary: step.subtitle,
        detail: step.body,
        href: "/anu",
        group: "The Concierge Engagement Model",
        aliases: [
          "process",
          "how do you work",
          "what happens",
          "timeline",
          "steps",
          "onboarding",
          "getting started",
        ],
      }),
    );
  });

  // --- The paperwork. ---
  entries.push(
    entry({
      file: "KX-971",
      kind: "paperwork",
      title: "How your data is handled",
      summary:
        "What a brief is used for, who sees it, and how to have it back or deleted.",
      detail: `Briefs are kept for ${LEGAL.retentionMonths} months after a matter closes. Nothing is sold, and nothing goes to advertisers. Requests to ${LEGAL.contactEmail}.`,
      href: "/privacy",
      group: "The paperwork",
      aliases: [
        "privacy",
        "gdpr",
        "ccpa",
        "data",
        "cookies",
        "tracking",
        "delete my data",
        "retention",
        "analytics",
      ],
    }),
    entry({
      file: "KX-972",
      kind: "paperwork",
      title: "Terms of engagement",
      summary:
        "What sending a brief does and does not commit you to, and whose law governs.",
      detail: `Sending a brief creates no contract. Governed by ${governingLaw()}.`,
      href: "/terms",
      group: "The paperwork",
      aliases: [
        "terms",
        "contract",
        "legal",
        "liability",
        "agreement",
        "conditions",
        "governing law",
      ],
    }),
    entry({
      file: "KX-973",
      kind: "paperwork",
      title: "Opening a file",
      summary:
        "The Engagement Brief   three movements and a seal. Answered within twenty-four hours.",
      detail:
        "For collaborating rather than commissioning, the Approach is the other door.",
      href: "/engage",
      group: "The paperwork",
      aliases: [
        "contact",
        "get in touch",
        "email",
        "hire",
        "work with",
        "enquiry",
        "start",
        "book",
        "partner",
        "collaborate",
      ],
    }),
  );

  return entries;
}

export const REGISTRY_INDEX: RegistryEntry[] = buildIndex();

/** Stated to the reader before they ask. A drawer count, not a promise. */
export const HOLDINGS = {
  services: REGISTRY_INDEX.filter((e) => e.kind === "service").length,
  sections: LEDGER.length,
  divisions: DIVISIONS.length,
  total: REGISTRY_INDEX.length,
};

/* ============================================================
   THE SCORER
   ============================================================ */

export interface RegistryHit {
  entry: RegistryEntry;
  score: number;
}

/**
 * Weighted whole-token matching. A title hit is worth far more than a body
 * hit, and an alias hit is worth nearly as much as a title one   aliases exist
 * because they are what a person actually types.
 */
function scoreEntry(
  entry: RegistryEntry,
  terms: string[],
  question: string,
): number {
  let score = 0;
  for (const term of terms) {
    if (entry.titleTokens.has(term)) score += 6;
    else if (entry.aliasTokens.has(term)) score += 5;
    else if (entry.summaryTokens.has(term)) score += 2.5;
    else if (entry.allTokens.has(term)) score += 1;
  }

  // "brand guidelines" landing on the brand book is a stronger signal than
  // either word on its own.
  for (const phrase of entry.aliasPhrases) {
    if (question.includes(phrase)) score += 6;
  }

  // Matching more of the question beats matching one word of it loudly.
  const matched = terms.filter((t) => entry.allTokens.has(t)).length;
  if (matched > 1) score *= 1 + (matched - 1) * 0.35;

  return score;
}

/** Most a single catalogue section may contribute before others get a turn. */
const PER_GROUP_CAP = 2;

/**
 * Consults the index.
 *
 * Results are capped per group before the list is filled out by score. Without
 * that, "what does a brand system cost" returned five Brand & Identity
 * services and no pricing at all   every slot won by the two words that
 * matched a section title, while the word the question was actually about sat
 * just below the cut.
 *
 * Returns an empty array rather than a consolation entry when nothing clears
 * the threshold. The caller then says what the archive *does* hold, which is
 * the honest answer and the one the old version could not give.
 */
export function consultRegistry(question: string, limit = 5): RegistryHit[] {
  const cleaned = question.toLowerCase();
  const terms = tokenise(question);
  if (!terms.length) return [];

  const ranked = REGISTRY_INDEX.map((entry) => ({
    entry,
    score: scoreEntry(entry, terms, cleaned),
  }))
    .filter((h) => h.score >= 4)
    .sort(
      (a, b) => b.score - a.score || a.entry.file.localeCompare(b.entry.file),
    );

  const taken: RegistryHit[] = [];
  const perGroup = new Map<string, number>();
  const overflow: RegistryHit[] = [];

  for (const hit of ranked) {
    const used = perGroup.get(hit.entry.group) ?? 0;
    if (used < PER_GROUP_CAP && taken.length < limit) {
      taken.push(hit);
      perGroup.set(hit.entry.group, used + 1);
    } else {
      overflow.push(hit);
    }
  }

  // Spare slots go back to whatever scored highest, cap or no cap.
  for (const hit of overflow) {
    if (taken.length >= limit) break;
    taken.push(hit);
  }

  return taken.sort((a, b) => b.score - a.score);
}
