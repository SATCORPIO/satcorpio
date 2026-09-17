/**
 * STREET LEVEL   every string both surfaces use, in one module.
 *
 * Same discipline as `relentless.ts` and `forfeiture.ts`, and for a third
 * reason on top of theirs.
 *
 * **The title is not chosen.** `GDD.md` §1.9 records that this game ships under
 * a standalone name, that "Street Level" is an internal working title only, and
 * that a naming pass with a clearance check has not run. `TITLE` is the one
 * place the name is written, so the rename is this line.
 *
 * **The copy is load-bearing.** This is the first Ki-Ra title that will ask a
 * stranger for money, so every sentence here is a commitment quoted back on the
 * day the store page opens. Holding them in one module means the complete set
 * of claims satcorp.io makes about this game can be reviewed in ninety seconds
 * by somebody who does not read React.
 *
 * **And this module is a brand boundary, not just a data file.**
 *
 * `GDD.md` §1.9 and §8.6 isolate this title from the studio's Unreal Engine 5
 * game: it ships standalone and is retro-branded only once it has proven
 * itself, because a poor store rating is permanent and searchable. The
 * advertising brief turns that into a hard rule for this page   credit Ki-Ra
 * Studios as the developer and stop.
 *
 * Six rules live here and nowhere else. The last one is the one most likely to
 * be broken by accident, because the tempting copy is one import away:
 *
 *   1. No date. Not a launch, not a window, not a year. §1.7 says none is set
 *      and none will be announced, and a fabricated one would be the single
 *      false sentence on the page.
 *   2. No Early Access framing, even informally. No roadmap, no "more coming",
 *      no "we'll add". §1.2 rejects the tag and §7.8 freezes the feature list,
 *      and both are selling points rather than omissions to apologise for.
 *   3. No cut or deferred feature is named, ever, including as "later". The
 *      exclusion list is §2.10, §3.9, §4.11 and §7.9 taken together.
 *   4. No scale the game does not have. One small dense district, 4 to 6 zones,
 *      40 to 80 players (§7.7, §3.5, §1.4). Not an open world, not an MMO.
 *   5. **Nothing here references the studio's other crime game, its engine, or
 *      a shared universe.** Not by name, not as "our other title", not as a
 *      teaser.
 *   6. **Nothing here borrows that game's vocabulary.** §8.3 protects the
 *      detective loop   multi-turn questioning, contradiction detection, an
 *      evidence board   as the flagship's moat, and this game does not build
 *      it. So a case here is a **gate** ("a documented case is one of four
 *      conditions") and never **content**. The words *evidence board*,
 *      *interrogation*, *chain of custody*, *forensics* and *building the case*
 *      do not appear on either surface.
 *
 * Rule 6 is why this module imports nothing from `forfeiture.ts`, including the
 * Discord constant, which is deliberately re-declared below rather than shared.
 *
 * And one rule of voice, which matters more here than on any other page of this
 * site: **the furniture may be theatrical, the claims may not.** The brief asks
 * for grounded and unglamorous   nobody in this game is cool, everybody is
 * trying to make rent   and this site's Concierge register is playful enough to
 * curdle into exactly the crime glamour that bans. Stamps, file numbers and the
 * dossier grammar stay. Winking about crime does not.
 */

/** The one place the name is written. A clearance rename is this line. */
export const TITLE = "STREET LEVEL";

/**
 * Said out loud rather than discovered at the storefront. The site's whole
 * register is candour about status, and a reader who learns the name changed
 * *after* it changes is worse off than one told now.
 */
export const WORKING_TITLE_NOTE =
  "Working title. The name on the store page will be its own.";

/** Dossier file number. `SL-` throughout; `NM-`, `NR-` and `FT-` are taken. */
export const FILE = "SL-001";

/**
 * Honest today, and verified against the project rather than the document:
 * the design is frozen (§7.8) and the netcode spike (§9.2, S0) is running.
 */
export const STANDING = "DESIGN FROZEN · SPIKE RUNNING";

/** Short form, for the tab bar and anywhere the long one would wrap. */
export const STANDING_SHORT = "IN DESIGN";

/**
 * The studio's room, re-declared rather than imported.
 *
 * Two reasons, and the second is the real one. Sharing a constant would put an
 * import edge between this module and another title's, which rule 5 above
 * exists to prevent. And this is a placeholder: the campaign plan argues this
 * title needs a room of its own, because community building is one of three
 * stated purposes of the product (§1.2) rather than a nice-to-have, and because
 * a room shared with the studio's other titles is a connection no amount of
 * care on the page prevents. **When that room exists, this is one line.**
 */
export const DISCORD = "https://discord.gg/guDzGUkJSb";

/**
 * THE HERO, in three parts.
 *
 * The order is the argument. Both available lines are strong and only one of
 * them is unavailable to every competitor in this category: Rust, Tarkov and
 * EVE have all sold a version of *everything you build can be taken*, and the
 * audience has read it before. Nobody else can currently write the first line
 * below. So the differentiator is the headline and the stake is the coda, which
 * is also the order the brief asks for when it says the asymmetry should anchor
 * every piece of copy.
 */
export const POSITIONING =
  "The police hunting you are other players, with careers of their own.";

export const STAKE =
  "Everything you build can be taken. By a rival crew, or by a warrant.";

/** The `/kira` section leads on the same sentence the page does. */
export const HEADLINE = POSITIONING;

/**
 * THE PITCH.
 *
 * The second paragraph is doing the heavy lifting and it is the game's own
 * observation (§2.1), which is why it survives verbatim: a loop nobody
 * interrupts is a failure state. It reframes a familiar production loop as a
 * setting for interference rather than as the product, which is the exact
 * distinction the brief asks the copy to draw.
 */
export const PITCH: readonly string[] = [
  "Build a production operation with a crew of up to five. Fight rival crews for the streets. Sell where the price is good, which is never where you are safe.",
  "The loop is familiar ground on purpose. What is new is that every step of it is somewhere a rival crew or an undercover officer can interrupt you. A player who runs it uninterrupted for an hour has had a bad session, not a good one.",
] as const;

/**
 * The dossier header row. Four facts, none of which can expire.
 *
 * The fourth is a positioning claim rather than a specification. In a category
 * where the default is free-to-play or an Early Access roadmap, refusing both
 * in six words is the most efficient trust purchase on the page.
 */
export const FACTS: [string, string][] = [
  ["Designation", "Persistent online crime sim"],
  ["Standing", "Design frozen · netcode spike"],
  ["Played on", "PC · Steam"],
  ["Model", "Premium, one purchase. Not Early Access"],
];

/**
 * THE THRESHOLD   the section the bespoke drawing exists for.
 *
 * The brief splits this into two hooks (forfeiture is the stake; the safehouse
 * is inviolable) and they are stronger together, because neither is honest
 * alone. Forfeiture without the safehouse reads as punishment. The safehouse
 * without forfeiture reads as a game with no stakes. The pair is the design.
 *
 * The middle band is what earns a bespoke component. Anyone can draw a safe
 * room and a dangerous street; the band in between, where police presence is
 * neither permitted nor forbidden but *priced*, and where the crew can watch
 * the price being paid, is the part no competitor's page can draw   and it is
 * the answer to the reader's actual question, which is never "is my base safe"
 * but "so they just wait outside, then?"
 */
export const THRESHOLD = {
  label: "The threshold",
  heading: "One line decides whether you can lose what you are holding.",
  /** The three bands, in the order the drawing reads them. */
  bands: [
    {
      name: "Inside",
      rule: "Nothing here can be taken by force",
      body: "Not by police, not by a rival crew, not with a warrant, not ever. Nobody enters uninvited from any direction.",
    },
    {
      name: "The block",
      rule: "Police can stand here, and it costs them",
      body: "A shared counter runs across the whole block. When it trips, your crew is told, every officer inside it is flagged, and standing there takes their rank rather than their pay.",
    },
    {
      name: "The street",
      rule: "Everything you carry is forfeit",
      body: "Arrest or robbery takes all carried cash and all product. Tools and equipment persist, so you lose the run and not the ability to run again.",
    },
  ] as const,
  /** The game's own sentence. It carries this section and sets up the next. */
  coda:
    "No badge crosses the threshold. Only a person does, and only if the organization lets them in.",
  /** Long form. The full page has room for the objection; the section does not. */
  deep: [
    "The safehouse is a promise rather than a feature, which is why it is absolute. A base that is conditionally safe is a base you cannot plan from, and a game where the counter-play to an uncrossable door is to sit outside it forever has simply moved the problem onto the doorstep.",
    "So the block outside is priced instead of forbidden. Presence there is legal and visible: the counter is on screen for the police, the flag is on screen for the crew, and a crew that drives off a flagged officer is exercising the intended counter-play rather than starting a war.",
    "None of which makes your operation safe. Production at scale happens in leased property that can be watched and raided freely, and exposure is what you are buying when you scale up. You cannot build an empire inside the one room nobody can enter.",
  ],
} as const;

/**
 * THE BADGE   the differentiator, and the reason this page exists at all.
 *
 * `GDD.md` §4.1 names the three ways a player-police faction fails in this
 * genre: the role is a service, it has no progression, and losing is boring.
 * The copy answers the middle one with the ladder and the last one with the
 * blown-cover line, which the design document itself calls the best moment in
 * the game for both sides.
 *
 * The closing line is the strongest sentence available to this title. Every
 * competitor's infiltration system is a mechanic that can be countered with a
 * mechanic; this one cannot be defended against with a button, and saying why
 * is more persuasive than any feature list.
 */
export const BADGE = {
  label: "The badge is a career",
  heading: "Five ranks, three bands, and each tier is a different game.",
  body: [
    "Not a service role and not a chore anyone plays out of duty. Five ranks across three bands, four specializations chosen at the third, and a precinct with a ladder of its own that gates what it is allowed to do.",
    "Cops do not lose career progress on death. They lose the gear and the credit to replace it, which is real and recurring and never touches the ladder. A career you can be knocked off in one bad night is a career nobody starts.",
  ],
  /** The undercover ladder, as a running order. Three tiers, three games. */
  ladder: [
    [
      "I",
      "Customer",
      "Buy from street sellers. It works because the seller cannot tell you from anyone else walking up, which is what makes a single street sale a decision rather than a transaction.",
      "BAND 1",
    ],
    [
      "II",
      "Dealer",
      "Move product yourself. Distribution-side access, the people who supply it, and volume that a controlled purchase never reaches.",
      "BAND 2",
    ],
    [
      "III",
      "Full member",
      "Invited into the organization itself. No powers, no equipment, no backup, and no badge at the door. Everything the crew has: the treasury, the plans, the membership, the inside of the building.",
      "BAND 3",
    ],
  ] as readonly [string, string, string, string][],
  /** The two lines that make the ladder believable rather than claimed. */
  coda:
    "There is no infiltration mechanic. No disguise system, no reputation meter, no fake-credentials minigame. An officer gets inside the way anybody else does, because somebody in that crew decided to trust them, and that is why it cannot be defended against with a button.",
  burn:
    "Your own convictions are what burn your face. Go loud early and you spend the anonymity the rank you are climbing toward requires, which makes the career an arc rather than an unlock.",
} as const;

/**
 * CREW OR BADGE   two ways to play, set against each other.
 *
 * The badge takes the accent column. It is the surprising half, it is the half
 * no incumbent offers, and the brief is explicit that the asymmetry is the
 * product. Every row is a decision recorded in the design documents rather than
 * a feature aspiration.
 */
export const WAYS = {
  heading: "Two ways to play, and both of them are played by people.",
  blurb:
    "Neither is a mode you switch into for an evening. They are careers with separate progression that happen to be pointed at each other, and the only thing they share is a city small enough that you keep running into the same faces.",
  rows: [
    [
      "You are",
      "One of five, building something that can be taken",
      "One of five, holding a rank nobody can buy",
    ],
    [
      "The work",
      "Produce, package, move, sell, bank, and decide every trip how much to carry",
      "Take the calls, work the street, and then work on not being recognisable",
    ],
    [
      "The clock",
      "Bank now and lose the trip's tempo, or keep running and carry the exposure",
      "Every conviction spends anonymity you are going to want later",
    ],
    [
      "You build",
      "A treasury, a territory, and a standing that buys you attention",
      "Five ranks, four specializations, and a precinct that earns its own tier",
    ],
    [
      "You lose",
      "Everything carried, on an arrest or a robbery",
      "The gear, and the credit to replace it. Never the ladder",
    ],
    [
      "The prize",
      "A district that pays while nobody is logged in",
      "An invitation into the crew you have been working",
    ],
  ] as [string, string, string][],
} as const;

/**
 * THE CREW.
 *
 * The brief offers *Ocean's Eleven energy* and it is the right read of the
 * social core. It is also a trap: that film is about glamorous professionals
 * and this game has no heists and nobody cool in it. So the copy takes the
 * trust and leaves the tuxedos   what is being sold is the arithmetic of who
 * you let in, not the caper.
 *
 * The permission table is the whole point. Betrayal here is a legal action
 * somebody takes with the rights you gave them, which is a far better story
 * than a system that tries to prevent it.
 */
export const CREW = {
  label: "The crew",
  heading: "Five people, including you.",
  body: [
    "A hard cap, with no expansion path and nothing that raises it. Five is small enough that the shard holds a dozen organizations rather than two, and small enough that every single invitation is a decision somebody can be wrong about.",
    "Three ranks and a permission table, and the table is where betrayal lives. A Lieutenant can withdraw to their daily cap and disappear. The audit log tells the Boss who did it, afterwards. That is not an exploit to be patched; it is the cost of delegation, and it gives treachery a shape that does not depend on anyone agreeing to role-play it.",
    "And the person you just invited runs a character on the other side of the shard too. They may never have worked undercover in their life and still be a serving officer, with everything your crew told them already in their head.",
  ],
  coda:
    "Recruiting five people is the highest-stakes thing a crew ever does. There is no vetting screen and no detect-undercover button. Suspicion is your job.",
} as const;

/** The no-wipe promise. A promise, not a section, so it is kept short. */
export const PERSISTENCE = {
  label: "Nothing resets",
  heading: "No seasons. No wipes. Not ever.",
  body: "What you build stays until somebody takes it from you. There is no reset that forgives a bad month and none that erases a good year, and every organization that ever held a zone is still in the record of the shard that watched it happen.",
} as const;

/**
 * WHERE YOU ARE COMING FROM   the audience table, answered.
 *
 * Written to be read in any order: a reader recognises one card, reads that
 * one, skips the rest. Every answer is a system rather than a reassurance.
 *
 * **No competitor is named.** The brief's anchor comparisons are targeting
 * notes, not copy, and it is explicit that this game must not be sold as the
 * next anything   the audience most likely to arrive is the one that would be
 * flattened by that framing. Category labels do the same recognition work
 * without borrowing somebody else's product as a description of this one.
 */
export const SEGMENTS: readonly {
  from: string;
  want: string;
  answer: string;
}[] = [
  {
    from: "Production-loop crime sims",
    want: "The acquire, produce and sell loop, running against something other than a script.",
    answer:
      "The loop is familiar on purpose. What is new is that every step of it is a place a rival crew or an undercover officer can interrupt you, and the interference is the game rather than the friction.",
  },
  {
    from: "Faction and territory PvP",
    want: "Ground worth contesting, betrayal that means something, and the sense that anything can be taken.",
    answer:
      "Four to six zones, taken by a declared fight with a clock on it, capped at ten people and winnable by five in one sitting. A Lieutenant can legally drain the treasury to their cap and walk. Nothing wipes.",
  },
  {
    from: "Full-loss sandboxes",
    want: "Real stakes, without a bad ten minutes costing the whole evening.",
    answer:
      "Everything carried outside the door goes on an arrest or a robbery. Tools and equipment persist, so you lose the run and not the ability to run again. And nothing enters the safehouse, from any direction, ever.",
  },
  {
    from: "I want to play the cop",
    want: "A career, rather than a minigame or a favour done for the other faction.",
    answer:
      "Five ranks, three bands, four specializations, three undercover tiers, and a precinct with a ladder of its own. Death costs gear and never rank, because a career you can be knocked off in one night is one nobody starts.",
  },
];

/**
 * THE COVENANT   the brief's "what not to advertise" list, inverted.
 *
 * Every line is a decision already recorded, which is what makes publishing it
 * cheap today and expensive to be cynical about later.
 *
 * Deliberately short, and deliberately built from claims the studio's other
 * announced titles cannot make. Three pages publishing near-identical covenants
 * would read as one voice at best and as connective tissue at worst, so the
 * obvious line about footage is absent: it is true here too, it belongs to
 * another page, and the empty frames say it better than a sentence does.
 *
 * The second line is the strongest one available to this title. In a category
 * where every competitor's answer to "is it finished" is a roadmap, a frozen
 * feature list is a genuinely unusual thing to promise.
 */
export const COVENANT: readonly string[] = [
  "It ships finished, or it does not ship. There is no Early Access tag.",
  "A frozen feature list. What arrives at 1.0 is what was designed, and nothing is being held back to sell you later.",
  "No seasons, no wipes, and nothing ever erased.",
  "One purchase. No subscription.",
  "You can host it yourself, from launch, on the official ruleset.",
];

/**
 * Placeholder discipline (build plan §12), stamped for this title's situation.
 *
 * Not `COMING SOON`, which is a promise. Not `AWAITING CLEARANCE`, which is the
 * mobile title's legal problem. Not the stamps the studio's other crime game
 * uses, because reusing a sibling's stamp is a small version of exactly the
 * wrong thing. `NO CAPTURE YET` is also the more accurate word: what this game
 * will have first is an unedited grey-box capture, not a rendered trailer.
 */
export const FRAMES = [
  { label: "A buy that might be a cop", file: "SL-010", stamp: "NOT BUILT YET" },
  { label: "The block outside a safehouse", file: "SL-011", stamp: "NOT BUILT YET" },
  { label: "First capture", file: "SL-012", stamp: "NO CAPTURE YET" },
] as const;

/**
 * The deeper sheet, for the full page. Labels are the brief's own screenshot
 * priority list, in its order, so that six empty frames still advertise the
 * game rather than apologising for themselves.
 */
export const CONTACT_SHEET: readonly [string, string][] = [
  ["A buy that might be a cop", "SL-020"],
  ["The block outside a safehouse", "SL-021"],
  ["A zone contested", "SL-022"],
  ["What was carried, seized", "SL-023"],
  ["Five, moving together", "SL-024"],
  ["First capture", "SL-025"],
];

export const CONTACT_SHEET_NOTE =
  "Six frames, all of them empty. The design is frozen and the spike is running, which means there is a great deal to say and nothing yet to show. They stay empty until that is no longer true.";

/**
 * The ladder. Stage names are the project's own milestones, which are better
 * copy than a generic roadmap would be because each one names the question it
 * exists to answer rather than the content it adds.
 *
 * `[REDACTED]` is the accurate word rather than a decoration: nothing past the
 * spike is scheduled, and §1.7 says no date will be announced.
 */
export const LADDER: readonly [string, string][] = [
  ["Design document", "COMPLETE"],
  ["Scope freeze", "COMPLETE"],
  ["Netcode spike", "IN PROGRESS"],
  ["The loop", "SCHEDULED"],
  ["The crew", "SCHEDULED"],
  ["The badge", "SCHEDULED"],
  ["The shard", "SCHEDULED"],
  ["Launch", "[REDACTED]"],
];

export const LADDER_CODA =
  "There is no date on this page because there is no date, and none will be announced before there is one the studio can hit.";

/**
 * The apparatus. Every item is a decision already recorded.
 *
 * The last two are doing more work than their size suggests. Community hosting
 * is a launch commitment (§7.2), a spike gate and a ship condition (§9.2,
 * §9.3), and the advertising brief does not mention it once   for the segment
 * with the highest intent and the shortest distance to travel, *you can host it
 * yourself* may be the strongest sentence on the page. And the anti-cheat entry
 * is deliberately the honest half: §7.5 asks for the community-server caveat to
 * be stated plainly rather than discovered, and stating it a year early is the
 * cheapest credibility available here.
 */
export const APPARATUS = [
  "Unity",
  "First-Person",
  "Server-Authoritative",
  "Dedicated Server",
  "40 to 80 Per Shard",
  "Persistent · No Wipes",
  "Community-Hosted Servers",
  "Easy Anti-Cheat On Official Shards",
] as const;

export const APPARATUS_NOTE =
  "The client submits intents and draws what it is told. Money, inventory, arrests and seizure are never decided on your machine, which is an anti-cheat decision before it is anything else. Official shards run Easy Anti-Cheat; a server you host yourself keeps the server authority and does not get that guarantee, and you should know that now rather than find it out later.";

/**
 * THE ASK.
 *
 * The brief wants a wishlist as the primary action and the room as an equal
 * second. The room is ready and the store page is not: it is S4 work (§9.2) and
 * the name is not chosen (§1.9), so a wishlist button today would be the one
 * dead promise on a page whose whole argument is that it does not make any.
 *
 * So the slot is built and told the truth. That pre-sells the wishlist, proves
 * the covenant in the same screen, and means the day the store page exists this
 * is a string and a link rather than a layout change.
 */
export const WISHLIST_PENDING =
  "There is no Steam page yet. When there is one, this is where it will be.";

export const FIELD_NOTES_BLURB =
  "Development notes when there is something worth sending, and not on a schedule invented to look busy. No countdown, no pre-order, and nothing to install for a good while yet.";

export const ROOM_BLURB =
  "The other half of the ask, and not the smaller half. This game is being built to be argued about while it is built, and the room is where that happens.";
