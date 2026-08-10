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
 * the cloud deck around "what is NAMTAR", is on the deck for the pillars, and
 * is lifted back out for the closing invitation. Moving a section moves where
 * in the descent it happens, so keep the order.
 */

const PILLARS = [
  {
    name: "Explore",
    body: "Discover a seamless planet filled with unique ecosystems, hidden technologies, ancient ruins and breathtaking landscapes.",
  },
  {
    name: "Build",
    body: "Construct anything from small shelters to sprawling industrial cities powered by advanced technology.",
  },
  {
    name: "Evolve",
    body: "Research new technologies, unlock schematics, and transfer your consciousness into entirely new human or robotic bodies.",
  },
  {
    name: "Survive",
    body: "Face dangerous wildlife, harsh environments, limited resources and unpredictable encounters with other survivors.",
  },
  {
    name: "Command",
    body: "Deploy drones, automate factories, operate robots, submarines, aircraft and advanced military vehicles.",
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

const LIVING_PLANET = [
  "Dynamic weather",
  "Day / night cycle",
  "Ocean ecosystems",
  "Wildlife behaviour",
  "Seasons",
  "Environmental hazards",
  "Realistic terrain",
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

const MULTIPLAYER = [
  "Cooperative survival",
  "PvE expeditions",
  "PvP conflict",
  "Massive player-built settlements",
  "Trading",
  "Exploration",
  "Naval fleets",
  "Air combat",
  "Alliances",
];

const GALLERY = [
  ["Alien creatures", "NM-301"],
  ["Vehicles", "NM-302"],
  ["Bases", "NM-303"],
  ["Ruins", "NM-304"],
  ["Technology", "NM-305"],
  ["Combat", "NM-306"],
];

const SCALE = [
  ["WORLD", "Fully seamless"],
  ["LANDMASS", "Vast, plus oceans"],
  ["AIRSPACE", "Massive vertical"],
  ["OCEANS", "Submarine-deep"],
  ["RANGE", "Hundreds of km"],
  ["ECOSYSTEMS", "Dynamic"],
];

const DISCORD = "https://discord.gg/Fh5qy6tCTc";

/**
 * A full-width darkening behind a section, faded at both ends. Used where a
 * block of copy needs contrast against the live world running behind it.
 */
const SLAB =
  "bg-[linear-gradient(to_bottom,transparent,rgba(8,8,11,0.74)_9%,rgba(8,8,11,0.74)_91%,transparent)]";

/**
 * The pillars are written down the left so the monoliths standing on the right
 * of frame stay visible. A full-width darkening would have hidden the one
 * thing the section is pointing at.
 */
const LEFT_WASH =
  "bg-[linear-gradient(to_right,rgba(8,8,11,0.88),rgba(8,8,11,0.70)_40%,transparent_68%)]";

export default function NamtarPage() {
  return (
    <div className="relative">
      {/* The planet, and the descent to its surface, behind the whole page. */}
      <PlanetScene />
      <AltitudeHud />
      <ScrollTriggerRefresh />

      {/* ---------- HERO — ORBIT ---------- */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-24 text-center">
        <Stamp tone="accent">IN DEVELOPMENT</Stamp>

        <h1 className="mt-10 font-display text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight text-bone">
          NAMTAR
        </h1>

        <p className="mt-6 font-mono text-sm tracking-[0.5em] text-accent sm:text-base">
          SURVIVE. ADAPT. CONCORE.
        </p>

        <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-bone-dim">
          A next-generation open-world survival experience where exploration,
          technology, AI and player freedom redefine what survival means.
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
            A seamless open-world survival game built around one idea: every
            decision changes your future.
          </p>
          <p className="mt-8 max-w-3xl leading-relaxed text-bone-dim">
            Explore an enormous planet, construct thriving settlements, uncover
            lost civilizations, research advanced technologies, transfer your
            consciousness, command robotic companions, and survive against both
            the planet itself and the universe.
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

      {/* ---------- THE PILLARS — THE MONOLITHS RISE ---------- */}
      <section className={`relative ${LEFT_WASH}`}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-3xl">
            <p className="label label-accent">The Pillars</p>
            <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
              Five of them are standing on the ground to your right. Choose one
              and the camera will hold on it.
            </p>
            <Pillars pillars={PILLARS} />
          </div>
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
          </Reveal>

          <Artifacts artifacts={RESEARCH} />
        </div>
      </section>

      {/* ---------- CONSCIOUSNESS SYSTEM ---------- */}
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

      {/* ---------- MULTIPLAYER ---------- */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <p className="label label-accent">Multiplayer</p>
        <ul className="mt-8 grid gap-px sm:grid-cols-3">
          {MULTIPLAYER.map((m) => (
            <li
              key={m}
              className="border border-bone/10 bg-ink-raised/70 p-6 font-mono text-[0.7rem] text-bone-dim"
            >
              {m}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- MASSIVE SCALE ---------- */}
      <section className={`relative ${SLAB}`}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="label label-accent">Massive Scale</p>
          <dl className="mt-10 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
            {SCALE.map(([label, value]) => (
              <div key={label} className="border-l border-accent/30 pl-4">
                <dt className="label text-[0.55rem]">{label}</dt>
                <dd className="mt-3 font-mono text-sm text-bone">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
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
          The future of survival begins on NAMTAR.
        </p>
        <p className="mt-8 leading-relaxed text-bone-dim">
          Every expedition uncovers new mysteries. Every discovery changes the
          world. Every choice shapes your evolution.
        </p>
        <p className="mt-8 font-display text-2xl italic text-accent">
          Will you merely survive… or become something more?
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
