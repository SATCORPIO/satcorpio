import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal, ScrollTriggerRefresh } from "@/components/system/Reveal";
import { PlanetScene } from "@/components/worlds/namtar/PlanetScene";
import { AltitudeHud } from "@/components/worlds/namtar/AltitudeHud";
import { Pillars } from "@/components/worlds/namtar/Pillars";
import { Artifacts } from "@/components/worlds/namtar/Artifacts";
import { Consciousness } from "@/components/worlds/namtar/Consciousness";

/**
 * ESTABLISHMENT 5 — NAMTAR
 *
 * A blockbuster game landing page: giant type, minimal chrome, HUD mono for
 * stats. The most 3D-ambitious route on the site — and the only one whose
 * copy is written to an altitude. The reader starts in orbit, falls through
 * the cloud deck around "what is NAMTAR", is on the deck for the pillars and
 * KYRAX, and is lifted back out for the closing invitation. Moving a section
 * moves where in the descent it happens, so keep the order — and if the page
 * grows again, re-measure the bands in `journey.ts` rather than guessing them.
 */

const PILLARS = [
  {
    name: "Explore",
    body: "Ruined cities, industrial dead zones, alien-contaminated ground and ocean trenches deep enough to hide a war.",
  },
  {
    name: "Build",
    body: "From a first shelter to a fortified base with power networks, automated defences and a perimeter someone will test.",
  },
  {
    name: "Fight",
    body: "Real-time tactical combat with firearms, melee and advanced tech — on foot, in a mech, or from the air.",
  },
  {
    name: "Survive",
    body: "Mutated wildlife, hostile weather, limited resources, and other survivors who want what you carry.",
  },
  {
    name: "Command",
    body: "Deploy drones, automate production, and operate mechs, submarines, aircraft and advanced military vehicles.",
  },
  {
    name: "Destroy",
    body: "A fully destructible environment. Cover fails, walls come down, and no position is permanent — including yours.",
  },
];

const WORLD_RAIL = [
  ["Orbit view of NAMTAR", "NM-101"],
  ["Massive forests", "NM-102"],
  ["Oceans", "NM-103"],
  ["Mountains", "NM-104"],
  ["Desert biomes", "NM-105"],
  ["Underground cave systems", "NM-106"],
  ["Ruined megastructures", "NM-107"],
  ["Dynamic weather", "NM-108"],
  ["Night sky with moons", "NM-109"],
];

/** What KYRAX actually does, once it can see. */
const KYRAX_CAPABILITIES = [
  [
    "Vehicles & mechs",
    "Target lock, fire assist, damage relay, fuel sync.",
  ],
  [
    "Base automation",
    "Offline defence — turrets, patrol drones, lockdown while you are gone.",
  ],
  [
    "Assisted construction",
    "Holographic blueprints, structural integrity analysis, defensive placement.",
  ],
  [
    "Combat HUD",
    "Threat arcs, terrain mapping, squad vitals, hazard alerts.",
  ],
  [
    "Voice command",
    "Mark a target, request a route, call in support — mid-firefight.",
  ],
] as const;

const LIVING_PLANET = [
  "Fully destructible environment",
  "Rain covers sound",
  "Fog closes the range",
  "Dust storms hide an ambush",
  "Day / night cycle",
  "Seasons",
  "Ocean ecosystems",
  "Wildlife behaviour",
  "Deep oceans",
  "Massive atmosphere",
  "Air combat",
  "Naval warfare",
];

const RESEARCH = [
  {
    file: "NM-401",
    name: "Ancient technology",
    note: "Recovered intact from sites that predate every record of settlement.",
  },
  {
    file: "NM-402",
    name: "Blueprints",
    note: "What you can build is what you have found, not what you have paid for.",
  },
  {
    file: "NM-403",
    name: "Schematics",
    note: "Fabrication data for systems the planet was not meant to give up.",
  },
  {
    file: "NM-404",
    name: "Alien artifacts",
    note: "Function unclear. Effects repeatable. Origin still an open question.",
  },
  {
    file: "NM-405",
    name: "Research projects",
    note: "Long programmes that change what the next expedition is capable of.",
  },
];

/** Six stages between waking with nothing and running an Empire. Names only. */
const STAGES = [
  "The Drop",
  "Primitive Survival",
  "Tech Awakening",
  "Tactical Dominance",
  "Empire Control",
  "Endgame Ascension",
] as const;

/** Formerly nine flat chips. Three claims that actually say something. */
const EMPIRES = [
  {
    tag: "EMPIRES",
    title: "Build one, or break one.",
    body: "Found an Empire, recruit into it, form alliances and end them. AI-run Empires play the game alongside you — they build, expand and go to war exactly as players do.",
  },
  {
    tag: "CONFLICT",
    title: "PvP and territory.",
    body: "Bases worth defending, naval fleets, contested airspace, and the alliances that decide who holds a coastline. What you build can be raided. What you scavenge can be taken.",
  },
  {
    tag: "COMMAND",
    title: "A chain of command.",
    body: "Nine ranks from Emperor down to Legionnaires and Warclads, with KYRAX combat networks anchoring the base of it. Roles are assigned, and KYRAX adapts to each one.",
  },
];

const GALLERY = [
  ["Alien creatures", "NM-301"],
  ["Vehicles", "NM-302"],
  ["Bases", "NM-303"],
  ["Ruins", "NM-304"],
  ["Technology", "NM-305"],
  ["Combat", "NM-306"],
];

/**
 * The 65 × 65 km figure never appears without its qualifier, which is the
 * paragraph directly under this table. It is the Alpha/Beta test map, not the
 * planet. No full-planet figure is published, because none is defined.
 */
const SCALE = [
  ["ALPHA MAP", "65 × 65 km"],
  ["WORLD", "Growing toward a full seamless planet"],
  ["TRAVERSAL", "Half a day on foot · minutes by air"],
  ["AIRSPACE", "Surface to near space · 100 km"],
  ["OCEAN", "Coastal to abyssal · 10 km"],
  ["ECOSYSTEMS", "Dynamic"],
];

const PLATFORMS = [
  ["PC — Windows and Linux", "Lead platform. Everything is built here first."],
  ["Xbox Series X|S", "Console release."],
  ["PlayStation 5", "Console release."],
  [
    "iOS and Android",
    "Companion app — base status, KYRAX alerts and logistics from outside the game.",
  ],
] as const;

const DISCORD = "https://discord.gg/Fh5qy6tCTc";

/**
 * A full-width darkening behind a section, faded at both ends. Used where a
 * block of copy needs contrast against the live world running behind it.
 */
const SLAB =
  "bg-[linear-gradient(to_bottom,transparent,rgba(8,8,11,0.74)_9%,rgba(8,8,11,0.74)_91%,transparent)]";

export default function NamtarPage() {
  return (
    <div className="relative">
      {/* The planet, and the descent to its surface, behind the whole page. */}
      <PlanetScene />
      <AltitudeHud />
      <ScrollTriggerRefresh />

      {/* ---------- HERO — ORBIT ---------- */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Stamp tone="accent">IN DEVELOPMENT</Stamp>
          <span className="label text-[0.55rem]">
            UNREAL ENGINE 5 · KI-RA STUDIOS
          </span>
        </div>

        <h1 className="mt-10 font-display text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight text-bone">
          NAMTAR
        </h1>

        <p className="mt-6 font-mono text-sm tracking-[0.5em] text-accent sm:text-base">
          SURVIVE. ADAPT. CONQUER.
        </p>

        {/* The genre line. Deliberately plain: it is the one place on the page
            that answers "what kind of game is this" without any voice on it. */}
        <p className="mt-7 max-w-3xl font-mono text-[0.66rem] leading-relaxed tracking-[0.2em] text-bone-dim">
          PvP · PvPvE · PvE — MULTIPLAYER &amp; SINGLE PLAYER —
          POST-APOCALYPTIC — TACTICAL SCI-FI — OPEN WORLD
        </p>

        <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-bone-dim">
          Civilisation fell. The machines did not. NAMTAR is an open-world
          survival game where AI is woven through your combat, your vehicles and
          your base — and where a ruined world rewards strategy, endurance and
          the choices you are willing to live with.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="border border-accent bg-accent px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
          >
            WISHLIST
          </button>
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent"
          >
            JOIN DISCORD
          </a>
          <a
            href="#what-is-namtar"
            className="px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone-dim transition-colors hover:text-bone"
          >
            LEARN MORE ↓
          </a>
        </div>

        <p className="label mt-16 text-[0.55rem] text-bone-dim/60">
          Scroll — the descent begins
        </p>
      </section>

      {/* ---------- WHAT IS NAMTAR — THROUGH THE CLOUD DECK ---------- */}
      {/* Given a full screen of its own on purpose: this is where the camera
          leaves orbit, and the dive needs somewhere to be seen. */}
      <section
        id="what-is-namtar"
        className="relative mx-auto flex min-h-[92vh] max-w-5xl scroll-mt-24 flex-col justify-center px-6 py-24"
      >
        <Reveal>
          <p className="label label-accent">What is NAMTAR?</p>
          <p className="mt-8 font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.25] text-balance text-bone">
            An open-world survival game set after a technological collapse.
          </p>
          <p className="mt-8 max-w-3xl leading-relaxed text-bone-dim">
            Scavenge a ruined world, build something worth defending, command AI
            through every system you own, and fight — other players, AI-run
            Empires, mutated wildlife and whatever the old civilisations left
            running. Survival is the floor. Strategy is what gets you off it.
          </p>
          <p className="mt-6 max-w-3xl leading-relaxed text-bone-dim">
            You wake on a world that was colonised, industrialised and then
            abandoned to itself — towering ruins and overgrown cities, salvage
            worth killing for, and a landscape that has had a long time to
            become hostile.
          </p>
        </Reveal>
      </section>

      {/* ---------- SHOW THE WORLD ---------- */}
      {/* A rail rather than a grid: nine stacked frames would have buried the
          descent under two screens of empty boxes. */}
      <section className="relative py-16">
        <p className="label label-accent mx-auto max-w-6xl px-6">
          Show the world
        </p>
        <ul className="mt-8 flex snap-x snap-mandatory gap-px overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
          {WORLD_RAIL.map(([label, file]) => (
            <li
              key={file}
              className="w-[19rem] shrink-0 snap-start sm:w-[24rem]"
            >
              <Placeholder
                label={label}
                file={file}
                aspect="16 / 10"
                stamp="UNRELEASED"
                tone="accent"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- THE PILLARS — THE LOW PASS ---------- */}
      <section className={`relative ${SLAB}`}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="label label-accent">The Pillars</p>
            <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
              Six of them. Everything the planet asks of you falls under one.
            </p>
            <Pillars pillars={PILLARS} />
          </div>
        </div>
      </section>

      {/* ---------- KYRAX — ON THE DECK ---------- */}
      {/* Placed straight after the pillars on purpose: the reader is on the
          ground by now, so this is where the machine that runs everything gets
          introduced. The right-hand panel is the strongest hook in the design
          material — you start the game unable to see. */}
      <section className={`relative ${SLAB}`}>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
          <Reveal>
            <p className="label label-accent">KYRAX</p>
            <h2 className="mt-6 font-display text-3xl leading-tight text-bone sm:text-4xl">
              Not software. A presence.
            </h2>
            <p className="mt-6 leading-relaxed text-bone-dim">
              A sentient military AI, and it runs through everything you own.
            </p>

            <dl className="mt-10 space-y-px">
              {KYRAX_CAPABILITIES.map(([name, note]) => (
                <div
                  key={name}
                  className="border border-bone/10 bg-ink-raised/70 p-5"
                >
                  <dt className="font-mono text-[0.66rem] tracking-[0.16em] text-accent/85">
                    {name}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-bone-dim">{note}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 font-display text-xl italic leading-relaxed text-accent">
              KYRAX is not just software. It is a battlefield advantage.
            </p>
          </Reveal>

          <Reveal>
            <div className="border border-bone/12 bg-ink-raised/70 p-8 backdrop-blur-sm sm:p-10">
              <p className="label label-accent">Raw spawn protocol</p>
              <h3 className="mt-6 font-display text-2xl leading-tight text-bone sm:text-3xl">
                No helmet, no overwatch.
              </h3>
              <p className="mt-6 leading-relaxed text-bone-dim">
                You wake with a KYRAX phone, an earpiece and the clothes you are
                standing in. No weapons, no armour, no HUD.
              </p>
              <p className="mt-5 leading-relaxed text-bone-dim">
                Without a visor helmet KYRAX can barely see past five metres —
                no enemy pings, no threat tags, no overlays, only the squad marks
                you place by hand.
              </p>
              <p className="mt-5 leading-relaxed text-bone">
                Earn a visor and the world lights up with data: threats,
                resources, hazards and routes, updated in real time. Lose it, and
                you are back to instinct.
              </p>

              <ThreadLink
                href="/kyrax"
                className="mt-10 inline-block border border-bone/20 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
              >
                KYRAX ACROSS THE ECOSYSTEM →
              </ThreadLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- LIVING PLANET ---------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">A Living Planet</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
            It runs whether or not anyone is watching it.
          </h2>
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-2">
          {LIVING_PLANET.map((s) => (
            <li
              key={s}
              className="border border-bone/15 bg-ink/40 px-4 py-2 font-mono text-[0.68rem] tracking-wide text-bone-dim transition-colors hover:border-accent hover:text-bone"
            >
              {s}
            </li>
          ))}
        </ul>
        {/* The promise. One line, and it is a genuine differentiator: most
            survival games tax you for going and looking. This one does not. */}
        <p className="mt-8 max-w-2xl font-mono text-[0.66rem] leading-relaxed text-bone-dim/80">
          And a promise: storms never drain KYRAX or your power. No gravity
          flips, no acid fog, no penalties for going and looking.
        </p>
      </section>

      {/* ---------- RESEARCH & PROGRESSION ---------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="label label-accent">Research &amp; Progression</p>
            <h2 className="mt-6 font-display text-3xl leading-tight text-bone sm:text-4xl">
              No levels. Discoveries.
            </h2>
            <p className="mt-6 leading-relaxed text-bone-dim">
              Every discovery expands what is possible.
            </p>

            {/* Names only. The unlock detail behind these is still being
                designed, and half of it is too granular for a public page. */}
            <p className="mt-10 font-mono text-[0.66rem] leading-relaxed text-bone-dim">
              Six stages sit between waking with nothing and running an Empire:
            </p>
            <ol className="mt-5 space-y-px">
              {STAGES.map((stage, i) => (
                <li
                  key={stage}
                  className="flex items-baseline gap-5 border border-bone/10 bg-ink-raised/60 px-5 py-3.5"
                >
                  <span className="font-mono text-[0.62rem] text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg text-bone">{stage}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Artifacts artifacts={RESEARCH} />
        </div>
      </section>

      {/* ---------- CONSCIOUSNESS SYSTEM ---------- */}
      {/* NOTE: this section is awaiting a decision (plan v3 §4.8 / Q1). The
          feature appears in no source design document, while the genetic
          augmentation system that would replace it is fully specified. The 3D
          set-piece stays either way; only the subject is in question. */}
      <section className={`relative ${SLAB}`}>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="label label-accent">The Consciousness System</p>
            <p className="mt-8 font-display text-[clamp(1.6rem,4vw,2.75rem)] leading-[1.25] text-bone">
              Death is not always the end.
            </p>
            <p className="mt-8 max-w-xl leading-relaxed text-bone-dim">
              Transfer your consciousness into new cloned bodies or synchronized
              robotic frames, allowing your journey to continue while opening
              entirely new gameplay possibilities.
            </p>
          </Reveal>

          <Consciousness />
        </div>
      </section>

      {/* ---------- EMPIRES ---------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Empires</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
            Nobody holds a coastline alone.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-px md:grid-cols-3">
          {EMPIRES.map((e) => (
            <li
              key={e.tag}
              className="border border-bone/10 bg-ink-raised/70 p-8 transition-colors hover:border-accent/45"
            >
              <p className="font-mono text-[0.6rem] tracking-[0.22em] text-accent/85">
                {e.tag}
              </p>
              <h3 className="mt-5 font-display text-2xl leading-tight text-bone">
                {e.title}
              </h3>
              <p className="mt-5 leading-relaxed text-bone-dim">{e.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- MASSIVE SCALE ---------- */}
      <section className={`relative ${SLAB}`}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="label label-accent">Massive Scale</p>
          <dl className="mt-10 grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {SCALE.map(([label, value]) => (
              <div key={label} className="border-l border-accent/30 pl-4">
                <dt className="label text-[0.55rem]">{label}</dt>
                <dd className="mt-3 font-mono text-sm leading-relaxed text-bone">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          {/* The qualifier ships with the number, in the same section, always. */}
          <p className="mt-12 max-w-3xl font-mono text-[0.66rem] leading-relaxed text-bone-dim/80">
            The 65 × 65 km region is the Alpha and Beta testing ground — roughly
            the size of Rhode Island, and not NAMTAR&rsquo;s final size. The
            seamless planetary surface arrives with the world-wrap architecture
            that every system is being built to accept.
          </p>
        </div>
      </section>

      {/* ---------- TARGET PLATFORMS ---------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Target Platforms</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
            Where it will run.
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map(([name, note]) => (
            <li
              key={name}
              className="border border-bone/10 bg-ink-raised/70 p-6"
            >
              <p className="font-display text-lg text-bone">{name}</p>
              <p className="mt-4 font-mono text-[0.66rem] leading-relaxed text-bone-dim">
                {note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="relative py-20">
        <p className="label label-accent mx-auto max-w-6xl px-6">Gallery</p>
        <ul className="mt-8 flex snap-x snap-mandatory gap-px overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
          {GALLERY.map(([label, file]) => (
            <li
              key={file}
              className="w-[17rem] shrink-0 snap-start sm:w-[21rem]"
            >
              <Placeholder
                label={label}
                file={file}
                aspect="3 / 2"
                stamp="UNRELEASED"
                tone="accent"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- CALL TO ACTION — BACK TO ORBIT ---------- */}
      <section className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <p className="font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.3] text-balance text-bone">
          Wake up with nothing. Build an empire.
        </p>
        <p className="mt-8 leading-relaxed text-bone-dim">
          Every raid redraws a border. Every alliance holds exactly as long as it
          is useful. Every choice shapes what you become and what you can hold
          onto.
        </p>
        <p className="mt-8 font-display text-2xl italic text-accent">
          Will you merely survive… or take the sky?
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="border border-accent bg-accent px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
          >
            WISHLIST
          </button>
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent"
          >
            JOIN THE COMMUNITY
          </a>
          <ThreadLink
            href="/kira"
            className="px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone-dim transition-colors hover:text-bone"
          >
            FOLLOW DEVELOPMENT →
          </ThreadLink>
        </div>
      </section>
    </div>
  );
}
