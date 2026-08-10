import { Stamp } from "@/components/fingerprints/Stamp";
import { Redact } from "@/components/fingerprints/Redaction";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import { ScreeningRoom } from "@/components/worlds/kira/ScreeningRoom";
import { ProgrammeLine, WorldDossier } from "@/components/worlds/kira/Programme";

/**
 * ESTABLISHMENT 4   KI-RA STUDIOS, THE SCREENING ROOM
 *
 * The hardest synthesis on the site: a AAA games studio that still feels like
 * the same man was just here. The bridge is in the studio's own line  
 * "Building Worlds Worth Living In" is witness-protection copy. Ki-Ra builds
 * worlds; the Concierge builds places to disappear into. So the games are
 * presented as a fixer presents destinations: designation, standing, house
 * rules, and what it costs to get in.
 *
 * Every requirement from the studio brief is kept. Only the framing changed.
 */

const PROGRAMME = [
  ["I", "Open-world survival games", "Scarcity, weather, and other people.", "FEATURE"],
  ["II", "Multiplayer online experiences", "Worlds that keep running when you log off.", "FEATURE"],
  ["III", "Original science fiction universes", "Canon written before the first asset is made.", "ORIGINAL"],
  ["IV", "AI-driven gameplay systems", "Behaviour, not scripting. Supplied by KYRAX.", "SYSTEMS"],
  ["V", "Dynamic ecosystems", "Populations that respond to pressure.", "SYSTEMS"],
  ["VI", "Cross-platform experiences", "PC, mobile and web, from one pipeline.", "DELIVERY"],
  ["VII", "Community-driven live services", "The audience is a collaborator, not a metric.", "ONGOING"],
] as const;

/** Server clusters, presented as what they actually are: safe houses. */
const SAFE_HOUSES = [
  {
    name: "NAMTAR",
    rules: "PvP · Fibercraft · No-Wipe",
    character: "For those who intend to take something and keep it.",
    status: "OFFLINE",
  },
  {
    name: "HYPERION",
    rules: "PvP · 15× · No-Wipe",
    character: "Faster. Considerably less forgiving.",
    status: "OFFLINE",
  },
  {
    name: "FROSTHEIM",
    rules: "PvE · 15× · No-Wipe",
    character: "No one will trouble you here. The cold will.",
    status: "OFFLINE",
  },
];

const APPARATUS = [
  "AI Systems",
  "Procedural Generation",
  "Dynamic Weather",
  "Cross Platform",
  "Multiplayer",
  "Dedicated Servers",
  "Persistent Worlds",
];

/** The studio timeline, as an object's chain of custody. */
const PROVENANCE = [
  ["Studio founded", "COMPLETE"],
  ["First prototype", "COMPLETE"],
  ["First public reveal", "IN PROGRESS"],
  ["Alpha", "SCHEDULED"],
  ["Beta", "SCHEDULED"],
  ["Launch", "[REDACTED]"],
  ["Continuous evolution", "[REDACTED]"],
] as const;

const CONTACT_SHEET = [
  ["Environment concept art", "KR-101"],
  ["Creatures", "KR-102"],
  ["Vehicles", "KR-103"],
  ["Architecture", "KR-104"],
  ["Characters", "KR-105"],
  ["Weapons", "KR-106"],
  ["Space scenes", "KR-107"],
  ["Planetary renders", "KR-108"],
] as const;

const DISCORD = "https://discord.gg/Fh5qy6tCTc";

export default function KiraPage() {
  return (
    <>
      {/* ---------- THE SCREENING ---------- */}
      <section className="relative flex min-h-[86vh] items-end overflow-hidden">
        <ScreeningRoom />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="flex flex-wrap items-center gap-4">
            <Stamp tone="accent">PRIVATE SCREENING</Stamp>
            <span className="label text-[0.55rem]">
              SATCORP / KI-RA STUDIOS
            </span>
          </div>

          <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-bone">
            Building Worlds Worth Living In.
          </h1>

          <p className="mt-7 max-w-2xl font-display text-lg italic leading-relaxed text-accent">
            <Redact delay={600}>
              Everybody needs somewhere to go. We build the somewhere.
            </Redact>
          </p>

          <p className="mt-7 max-w-2xl leading-relaxed text-bone-dim">
            SATCORP&rsquo;s interactive entertainment division: immersive games,
            persistent online worlds and next-generation digital experiences.
            Built around player freedom, long-term progression, and technology
            that evolves alongside its community.
          </p>
        </div>
      </section>

      {/* ---------- THE PROGRAMME ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label label-accent">This evening&rsquo;s programme</p>
              <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                What we create.
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              Seven items. None of them are finished, which is rather the point.
            </p>
          </div>
        </Reveal>

        <ol className="mt-12">
          {PROGRAMME.map(([index, title, note, meta]) => (
            <ProgrammeLine
              key={index}
              index={index}
              title={title}
              note={note}
              meta={meta}
            />
          ))}
        </ol>
      </section>

      {/* ---------- FEATURE PRESENTATION ---------- */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">Feature presentation</p>
          </Reveal>

          <div className="mt-8">
            <WorldDossier
              designation="WORLD DOSSIER   NM-001"
              title="NAMTAR"
              standing="IN DEVELOPMENT"
              facts={[
                ["Designation", "Seamless planet"],
                ["Standing", "Pre-reveal"],
                ["Terrain", "Forest · ocean · desert · cave"],
                ["Threat", "Environmental & human"],
              ]}
            >
              <p>
                The flagship survival universe, built around one idea: every
                decision changes your future. Explore an enormous planet,
                construct settlements, uncover lost civilizations, research
                advanced technologies   and, when the body fails, continue in
                another one.
              </p>
            </WorldDossier>
          </div>

          {/* Kept multi-column at every width: stacked full-bleed, three empty
              frames become three screens of nothing to scroll past. */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Placeholder
              label="Hero artwork"
              file="NM-010"
              aspect="4 / 3"
              stamp="AWAITING CLEARANCE"
              tone="accent"
            />
            <Placeholder
              label="Planet render"
              file="NM-011"
              aspect="4 / 3"
              stamp="AWAITING CLEARANCE"
              tone="accent"
            />
            <Placeholder
              label="Trailer"
              file="NM-012"
              aspect="4 / 3"
              stamp="REEL NOT CUT"
              tone="accent"
            />
          </div>

          <ThreadLink
            href="/namtar"
            className="mt-10 inline-block border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            ARRANGE PASSAGE TO NAMTAR →
          </ThreadLink>
        </div>
      </section>

      {/* ---------- THE SAFE HOUSES ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label label-accent">The safe houses</p>
              <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                ARK: Survival Ascended clusters.
              </h2>
              <p className="mt-3 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
                Three addresses. None of them are receiving at present. The
                house rules stand regardless, and they are not negotiable.
              </p>
            </div>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/60">
              SELF-HOSTED ON SATCORP IRON
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {SAFE_HOUSES.map((house) => (
            <li
              key={house.name}
              className="flex flex-col justify-between border border-bone/12 bg-ink-raised/70 p-7 backdrop-blur-sm transition-colors hover:border-accent/45"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl text-bone">
                    {house.name}
                  </h3>
                  {/* Dim bone, not the pulsing live tone: an offline cluster
                      must not read as a heartbeat. */}
                  <Stamp tone="bone" rotate={-1}>
                    {house.status}
                  </Stamp>
                </div>

                <p className="mt-5 font-mono text-[0.66rem] tracking-wide text-accent/85">
                  {house.rules}
                </p>
                <p className="mt-4 font-display text-base italic leading-relaxed text-bone-dim">
                  {house.character}
                </p>
              </div>

              <p className="mt-8 font-mono text-[0.55rem] tracking-[0.2em] text-bone-dim/45">
                UNDER DEVELOPMENT
              </p>
            </li>
          ))}
        </ul>

        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 inline-block border border-bone/15 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
        >
          REQUEST THE ADDRESS →
        </a>
      </section>

      {/* ---------- NOT YET ISSUED ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <p className="label label-accent">Not yet issued</p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["PROJECT [REDACTED]", "SEALED"],
            ["COMING SOON", "SEALED"],
            ["RESEARCH & DEVELOPMENT", "SEALED"],
          ].map(([title, stamp]) => (
            <li
              key={title}
              className="border border-dashed border-bone/15 bg-ink-raised/40 p-8 text-center"
            >
              <p className="font-display text-xl text-bone/65">{title}</p>
              <div className="mt-6 flex justify-center">
                <Stamp tone="bone" rotate={3}>
                  {stamp}
                </Stamp>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[0.66rem] text-bone-dim/60">
          The studio is busier than this page suggests. That is deliberate.
        </p>
      </section>

      {/* ---------- PHILOSOPHY ---------- */}
      <section className="border-y border-bone/10 py-28">
        <blockquote className="mx-auto max-w-4xl px-6 text-center font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.3] text-balance text-bone">
          &ldquo;We believe players deserve worlds that continue growing long
          after launch.&rdquo;
        </blockquote>
      </section>

      {/* ---------- THE APPARATUS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="label label-accent">The apparatus</p>
          <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            The equipment in the projection booth. Unglamorous, and the whole
            reason the picture runs.
          </p>
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-2">
          {APPARATUS.map((t) => (
            <li
              key={t}
              className="border border-bone/15 px-4 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[0.66rem] leading-relaxed text-bone-dim/70">
          Every Ki-Ra experience is built on technologies developed across the
          SATCORP ecosystem   the intelligence layer comes from{" "}
          <ThreadLink
            href="/kyrax"
            className="text-bone underline-offset-4 hover:underline"
          >
            KYRAX
          </ThreadLink>
          , the iron from SATCORP.
        </p>
      </section>

      {/* ---------- PROVENANCE ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <p className="label label-accent">Provenance   NAMTAR</p>
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROVENANCE.map(([stage, status]) => (
            <li
              key={stage}
              className="border border-bone/10 bg-ink-raised/60 p-6"
            >
              <p className="font-display text-lg text-bone">{stage}</p>
              <p
                className={`mt-3 font-mono text-[0.58rem] tracking-[0.2em] ${
                  status === "COMPLETE"
                    ? "text-accent"
                    : status === "IN PROGRESS"
                      ? "text-bone-dim"
                      : "text-bone-dim/40"
                }`}
              >
                {status}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- CONTACT SHEET ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <p className="label label-accent">Contact sheet</p>
          <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            Reconnaissance from a world that does not exist yet.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-px lg:grid-cols-4">
          {CONTACT_SHEET.map(([label, file]) => (
            <Placeholder
              key={file}
              label={label}
              file={file}
              aspect="1 / 1"
              stamp="UNRELEASED"
              tone="accent"
            />
          ))}
        </div>
      </section>

      {/* ---------- KNOWN ASSOCIATES ---------- */}
      <section className="border-t border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="label label-accent">Known associates</p>
          </Reveal>

          <ul className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Discord", DISCORD],
              ["Development updates", null],
              ["Community events", null],
              ["Patch notes", null],
              ["Dev program", null],
              ["Feedback portal", null],
            ].map(([label, href]) =>
              href ? (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block border border-bone/10 bg-ink-raised p-6 font-mono text-[0.7rem] text-bone transition-colors hover:border-accent"
                  >
                    {label} →
                  </a>
                </li>
              ) : (
                <li
                  key={label}
                  className="border border-bone/10 bg-ink-raised p-6 font-mono text-[0.7rem] text-bone-dim/60"
                >
                  {label}
                  <span className="ml-2 text-[0.55rem] tracking-[0.2em]">
                    SOON
                  </span>
                </li>
              ),
            )}
          </ul>

          <p className="mt-16 max-w-3xl font-display text-xl leading-relaxed text-bone">
            At Ki-Ra Studios, we&rsquo;re building worlds players will call home
            for years to come. Every adventure begins with a single idea, and
            every idea is crafted to become something worth exploring.
          </p>

          <p className="label mt-10 text-[0.55rem]">
            Powered by SATCORP   the lights, the iron, and the intelligence.
          </p>
        </div>
      </section>
    </>
  );
}
