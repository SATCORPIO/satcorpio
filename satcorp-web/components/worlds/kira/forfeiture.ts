/**
 * FORFEITURE   every string both surfaces use, in one module.
 *
 * Same discipline as `relentless.ts`, for a different reason. That title's
 * copy lives in one file because the mark is not cleared and a rename has to
 * be one line. This one *is* cleared   `NAMING.md` §2 records a completed US
 * check on 15 September 2026, Steam and USPTO both clean in the classes that
 * matter   so the constant exists for the other reason, which is the one that
 * actually costs money later:
 *
 * **The copy is load-bearing.** The game is in pre-production. There is no
 * build, no footage, no render and no date, so every sentence the site
 * publishes is a commitment the studio is held to and quoted back on Early
 * Access day. Holding all of them in one module means the complete set of
 * claims satcorp.io makes about an unreleased title can be reviewed in ninety
 * seconds by somebody who does not read React.
 *
 * Six rules live here and nowhere else. The first five come from the marketing
 * brief's own "what not to advertise" section, which is longer than its "what
 * to advertise" section, and deliberately so:
 *
 *   1. No date. Not a launch, not an Early Access window, not a year. Nothing
 *      past the vertical slice is scheduled and a fabricated date would be the
 *      one false sentence on the page.
 *   2. No price. The GDD targets $25–35; that is a real decision and it still
 *      gains the studio nothing to print two years before a storefront exists.
 *      The *model* is published, because "never free-to-play" is a promise
 *      worth making. The number is not.
 *   3. No cut or deferred feature is named   corrupt cops, player lawyers and
 *      judges, heists, hacking, a federal-investigator role, districts beyond
 *      the launch four or five. All of those are post-1.0 or unbuilt, and
 *      naming them now sets an expectation the first build breaks.
 *   4. Nothing implies footage exists. No frame, no stamp, no caption.
 *   5. Nothing here promises a feature. It states decisions already taken,
 *      which is the only currency a pre-production page actually has.
 *   6. **No other game is named.** Not a competitor, not an inspiration, not
 *      as flattery. The audience blocks name the *appetite* a reader arrived
 *      with   persistent crime roleplay, production chains, real loss   and
 *      never the product that gave it to them. Three reasons, and the third is
 *      the one that matters: naming somebody else's trademark in our own
 *      advertising is an avoidable legal exposure; a comparison dates the
 *      moment that game ships an update or dies; and a page that defines
 *      itself against a list of other games is telling a reader what to go and
 *      play instead. The appetite is the durable thing. Describe that.
 *
 * And one rule of voice, which matters more here than anywhere else on this
 * site: **the furniture may be theatrical, the claims may not.** The art bible
 * rejects crime glamour on sight, and this site's Concierge register is playful
 * enough to curdle into exactly that if it is allowed near the subject. Stamps,
 * file numbers and the dossier grammar stay. Winking about crime does not.
 */

/** The title. Cleared, unlike the mobile one, and still written once. */
export const TITLE = "FORFEITURE";

/** Dossier file number. `FT-` throughout; `NM-` and `NR-` belong to NAMTAR. */
export const FILE = "FT-001";

/** Honest today, and still honest in two years. */
export const STANDING = "PRE-PRODUCTION";

/** The studio's room. Shared with RELENTLESS and the ARK clusters   for now. */
export { DISCORD } from "./relentless";

/** The Steam one-liner, verbatim from the brief. The hero carries this. */
export const ONE_LINER =
  "Build a criminal enterprise in a living city where every crime leaves evidence and every detective is another player.";

/** The eight words that do the most work. The `/kira` section leads on them. */
export const HEADLINE =
  "Every crime leaves evidence. Every detective is another player.";

/**
 * THE MOAT   the most valuable claim available to this title.
 *
 * Every incumbent in persistent-crime roleplay runs its consequence layer on
 * people: moderators, whitelists, applications, appeal threads. This one runs
 * it on systems, and the audience being spoken to has spent years being
 * adjudicated by volunteers.
 *
 * The marketing brief offers a slogan for this   "the rules are in the code,
 * not in the Discord"   and the studio cut it. It was the right cut, and for
 * the brief's own stated reason: headlines here read like a case file or a
 * business plan, never a movie poster, and that line is a movie poster. What
 * replaces it says the same thing as a fact rather than a boast, which is also
 * the only form of it a reader can hold the studio to.
 *
 * The argument is kept in full. Only the catchphrase is gone.
 */
export const MOAT =
  "Law enforcement is a profession here, with its own progression, played by other people.";

export const MOAT_BODY =
  "Consequence is enforced by the simulation, not by volunteers with moderator powers. There is no application, no whitelist and no appeal thread — and the city still works when nobody is moderating it. The other side of the law is a career with a ladder of its own, not a scripted NPC on a patrol route.";

/**
 * THE FANTASY   stated as the thing it is not.
 *
 * Leading with a rejection is unusual and correct. The audience worth having
 * has been sold the gangster fantasy repeatedly and is bored of it; the
 * audience worth losing self-selects out in one sentence.
 */
export const FANTASY =
  "Not “be a gangster.” That fantasy is already well served, by studios with far bigger budgets than ours, and we would lose. This is the small-business-owner fantasy, where the business happens to be illegal: routing a supply chain so it never touches the same intersection twice, the paranoia of a van parked outside for two days, and the discipline to walk away from a compromised warehouse before the warrant lands.";

export const FANTASY_CODA = "Operational competence under pressure.";

/**
 * The dossier header row. Four facts, none of which can expire, and one of
 * which is a promise worth making early: the F2P rejection is a differentiator
 * in this genre rather than a limitation to bury.
 */
export const FACTS: [string, string][] = [
  ["Designation", "Persistent first-person crime simulation"],
  ["Standing", "Pre-production · Unreal Engine 5"],
  ["Played on", "PC · Steam · Early Access"],
  ["Model", "Premium. No free-to-play, no subscription."],
];

/**
 * HEAT AND PROOF   the section the bespoke visual exists for.
 *
 * The hardest idea on the page to carry in prose and the most valuable. Every
 * competitor in this space has a wanted-level meter. The argument here is that
 * there are two quantities, they behave differently, and the difference between
 * them is the entire detective loop.
 *
 * There is no summary line under the drawing any more, and the section is
 * better without one. It used to close on an aphorism   two quantities set
 * against each other, then a turn   which is the same construction the studio
 * cut from the moat, and it was the third time this section stated the same
 * idea: the drawing says it, the drawing's own caption says it, and then a
 * pull-quote said it again with a flourish. The drawing is the argument. Prose
 * underneath it can only explain, so what is left explains.
 */
export const EVIDENCE = {
  label: "Heat and proof",
  heading: "How a case gets made.",
  body: [
    "A shell casing exists in the world. So does a tyre impression, a witness who saw a jacket, and the camera on the corner nobody thought about. None of it is a number that ticks up.",
    "A detective has to find it, bag it, log it, and keep the chain of custody intact all the way to a charge — and the chain can break. On the other side of it, a criminal with the nerve to go back can sweep a scene clean before the first unit arrives.",
    "That is why the police side is the best puzzle in the product rather than a chore role, and it is the reason it is being built as a profession with its own progression instead of a side mode.",
  ],
} as const;

/**
 * THE TWO PROFESSIONS.
 *
 * The second column carries the accent in the `Comparison` component, which is
 * correct here: the detective is the surprising half and the half no incumbent
 * can offer. Every row is a decision recorded in the design documents, not a
 * feature aspiration.
 */
export const PROFESSIONS = {
  heading: "Two games, one world.",
  blurb:
    "One city, two careers, and both of them are played by people. Neither is a mode you switch into — they are professions with separate progression that happen to be pointed at each other.",
  rows: [
    [
      "You are",
      "A small-business owner whose business is illegal",
      "A player with a caseload and a career",
    ],
    [
      "The work",
      "Routing a supply chain so it never touches the same intersection twice",
      "Working a scene before it degrades, then proving what it says",
    ],
    [
      "The pleasure",
      "The setup, and the unwind when you walk away in time",
      "The tell — three delivery drivers who turn out to be one person",
    ],
    [
      "The clock",
      "Sweep the scene before the first unit arrives",
      "Bag it, log it, keep the chain intact",
    ],
    [
      "You build",
      "A payroll, a territory, a district",
      "A rank, a caseload, a record of what you closed",
    ],
    [
      "You lose",
      "Assets. A van, a warehouse, the cash in it",
      "The case. Not the shift, and not the evening",
    ],
  ] as [string, string, string][],
} as const;

/**
 * THE FOUR PILLARS, published as commitments.
 *
 * In the brief's own order, which puts the living city first because it is the
 * claim the whole genre is shopping for, and the loss design last because it is
 * the objection-handler rather than the hook.
 *
 * Every title here is a flat statement of what a system does. That is a rule,
 * not a style preference. The brief names these pillars in the register
 * marketing reaches for by default   *evidence is physical, not a meter* and
 * the like   and titles built that way do two bad things at once on a page
 * about an unbuilt game: they sound like advertising, which is the one thing
 * this audience has learned to discount, and an "X, not Y" is a comparison to
 * something unnamed rather than a description of anything. A reader cannot hold
 * the studio to a contrast. They can hold it to "jail is capped at forty-five
 * minutes".
 *
 * So: no antithesis, no personification, no turn. If a title cannot be read
 * aloud in a meeting by somebody who did not write it, it is the wrong title.
 */
export const PILLARS: readonly [string, string, string, string][] = [
  [
    "I",
    "The city runs while you are logged off",
    "The economy, the rival organisations and the pressure the police are under all keep moving. Your warehouse can be raided at 4am — but the raid takes real time, makes noise, and can never zero you out.",
    "SIMULATION",
  ],
  [
    "II",
    "Evidence exists in the world and has to be collected",
    "Nothing accumulates on its own. Somebody has to find it, bag it and log it, and the chain of custody can break along the way. You can sweep a scene clean before the first unit arrives.",
    "THE LAW",
  ],
  [
    "III",
    "There are no wipes and no seasons",
    "Every war, every notorious player and every district held since year one stays in the shard's history, and stays there permanently.",
    "PERSISTENCE",
  ],
  [
    "IV",
    "Losing costs you property, and at most forty-five minutes",
    "A confiscated van, the cash inside it, the warehouse it was parked at. The sentence itself is playable — contacts worth making, contraband worth moving, work that shortens it — and your organisation can bail you, buy you out, or come and get you.",
    "FAILURE DESIGN",
  ],
] as const;

/**
 * THE CHRONICLE   the no-wipe promise made into an object.
 *
 * Ships at half strength on purpose. The promise is publishable today; the
 * rendered artefact is not, because there is no shard and therefore no history.
 * Written so that the day one exists, this becomes a link and nothing else on
 * the page changes.
 */
export const CHRONICLE = {
  label: "A city that remembers",
  heading: "The Chronicle.",
  body: "The wars, the market crashes, the districts held since year one, the longest uncaught criminal career — rendered as a public record that no reset ever takes away. It writes itself: every input already exists in the ledger, the case files and the territory log.",
  /**
   * The honest half, and the reason it is worth keeping: a feature described
   * in the present tense that does not exist yet is the exact thing this page
   * is built not to do. Stated flat   it is a status, not a reveal.
   */
  caveat:
    "Designed and specified, not built. No shard is running yet, so there is no history to show. It is also the reason the game will never wipe.",
} as const;

/**
 * WHERE YOU'RE COMING FROM   the audience table, answered.
 *
 * The brief's closing paragraph argues this block does the conversion work, and
 * it is written to be read in any order: a reader recognises one card, reads
 * that one, and skips the rest. Every "answer" is a system, not a reassurance.
 */
export const SEGMENTS: readonly {
  from: string;
  want: string;
  answer: string;
}[] = [
  {
    from: "Crime roleplay",
    want: "Persistent criminal-life roleplay, minus the admin drama and the whitelist application.",
    answer:
      "Law and consequence run in the code. No application, no tribunal, and the game still works with nobody moderating it.",
  },
  {
    from: "Production chains",
    want: "The production-chain loop — but it is solo or co-op, and it ends.",
    answer:
      "Real rivals, real territory, and a police side that other players actually play instead of a checklist NPC.",
  },
  {
    from: "Persistent PvP",
    want: "Real loss and real raid windows, without being wiped out overnight.",
    answer:
      "Offline raids are capped, noisy, take real time, and can never zero you out. Loss is legal and asset-based — you will want it back, not a refund on your evening.",
  },
  {
    from: "Player-driven economies",
    want: "A player-driven economy and politics that write their own history.",
    answer:
      "The Chronicle. A shard's wars, market crashes and notorious careers become a permanent public record. No wipes, ever.",
  },
  {
    from: "Investigation",
    want: "A puzzle loop with real stakes and a real answer.",
    answer:
      "Evidence is physical and player-handled — chain of custody, contradictions, and the moment a case closes. Designed to be the best puzzle in the product, not a side mode.",
  },
];

/**
 * THE COVENANT, REMOVED.
 *
 * `What we are not selling you`   five commitments in five boxes   was cut at
 * the studio's instruction and the page is tighter for it. Two reasons worth
 * keeping on the record so nobody rebuilds it by accident.
 *
 * **It was preachy.** A section whose heading is what we will not do, before a
 * reader has finished learning what the game is, spends the page's credibility
 * rather than earning it. Each line was also built as an aphorism, which is the
 * register the studio has now rejected three times.
 *
 * **It was already said.** Every commitment in it appears somewhere the reader
 * has to pass anyway, as a fact rather than a promise: no footage in the empty
 * contact sheet, no date on the standing ladder, no wipes in pillar III, and
 * the business model in the dossier facts. The covenant was a fifth telling.
 *
 * One line did not survive the move: *nothing for sale that touches money,
 * assets, heat or capacity.* It is the strongest anti-pay-to-win commitment the
 * design documents authorise, the GDD asks for it to be published early, and it
 * currently has no home on either surface. If it comes back it belongs beside
 * the standing ladder as a plain statement of a decision   never as a slogan.
 */

/**
 * Placeholder discipline (build plan §12), with stamps written for this title's
 * situation specifically.
 *
 * Not `COMING SOON`, which is a promise, and not `AWAITING CLEARANCE`, which is
 * RELENTLESS's legal problem rather than this one's. Labels are drawn from the
 * art bible's district kits so that an empty frame still advertises the world.
 */
export const FRAMES = [
  { label: "The Flats, 03:00", file: "FT-010", stamp: "NOTHING SHOT YET" },
  { label: "Dockside, high-mast sodium", file: "FT-011", stamp: "NOTHING SHOT YET" },
  { label: "Trailer", file: "FT-012", stamp: "NO FOOTAGE EXISTS" },
] as const;

export const CONTACT_SHEET: readonly [string, string][] = [
  ["The Flats, 03:00", "FT-020"],
  ["Dockside, high-mast sodium", "FT-021"],
  ["Kestrel Row in the evening", "FT-022"],
  ["An evidence bag", "FT-023"],
  ["An interview room", "FT-024"],
  ["A seizure notice", "FT-025"],
];

export const CONTACT_SHEET_NOTE =
  "Six frames, all of them empty, and they stay empty until there is something real to put in them. No renders, no concept art, and no engine test captioned as a screenshot.";

/**
 * The ladder. `[REDACTED]` is the accurate word rather than a decoration:
 * nothing past the vertical slice is scheduled.
 */
export const LADDER: readonly [string, string][] = [
  ["Design documents", "COMPLETE"],
  ["Vertical-slice plan", "COMPLETE"],
  ["Vertical slice", "SCHEDULED"],
  ["Early Access", "[REDACTED]"],
  ["1.0", "[REDACTED]"],
];

export const LADDER_CODA =
  "There is no date on this page because there is no date. When there is one, it will be one the studio can hit.";

/**
 * The apparatus. Every item is a decision already recorded in the design
 * documents, and the last one is doing more work than its size suggests:
 * a good dedicated-server binary and a scripting layer are what the crime-
 * roleplay audience is actually shopping for, and the design documents call
 * community servers the marketing budget and the long tail.
 */
export const APPARATUS = [
  "Unreal Engine 5",
  "Dedicated Server",
  "First-Person",
  "32 Players Per Shard",
  "Persistent · No Wipes",
  "NPC-Driven Simulation",
  "Commercial Anti-Cheat",
  "Self-Hosting, First-Class",
] as const;

export const APPARATUS_NOTE =
  "Self-hosting is a feature, not a tolerance. A dedicated-server binary, a configuration layer and a scripting API ship as first-class work — community servers are the long tail and, honestly, most of the marketing budget.";

/** What the forwarding list is for, said without a countdown attached. */
export const FIELD_NOTES_BLURB =
  "Development notes when there is something worth sending, and not on a schedule invented to look busy. No countdown, no pre-order, and nothing to install for a long while yet.";
