import { Stamp } from "@/components/fingerprints/Stamp";
import { Redact } from "@/components/fingerprints/Redaction";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Reveal } from "@/components/system/Reveal";
import { RegistryScene } from "@/components/worlds/kyrax/RegistryScene";
import { IndexCard } from "@/components/worlds/kyrax/IndexCard";
import { AskTheRegistry } from "@/components/worlds/kyrax/AskTheRegistry";

/**
 * ESTABLISHMENT 3   KYRAX, THE REGISTRY
 *
 * Not a terminal. Reddington's advantage was never technology   it was that he
 * had already been told. KYRAX is the archive that makes SATCORP the
 * best-informed operation in the room: cold, orderly, and unhurried, filed on
 * index cards by something that never sleeps.
 */

/* What it knows   the cognitive core, in archive language. */
const KNOWS = [
  {
    file: "KX-011",
    title: "Inference",
    body: "Reasoning across mixed signals. The value is rarely in one fact   it is in noticing that two of them are about the same person.",
    tilt: -0.6,
  },
  {
    file: "KX-012",
    title: "Intake",
    body: "Every signal the ecosystem produces, normalised, enriched and filed the moment it arrives. Nothing is thrown away.",
    tilt: 0.7,
  },
  {
    file: "KX-013",
    title: "Recognition",
    body: "Behaviour, anomaly and trend. The same shape appearing in three unrelated files is not a coincidence, and it is not treated as one.",
    tilt: -0.4,
  },
  {
    file: "KX-014",
    title: "Counsel",
    body: "Ranked options with the reasoning attached. A recommendation you cannot interrogate is not advice, it is a guess in good clothes.",
    tilt: 0.5,
  },
  {
    file: "KX-015",
    title: "Memory",
    body: "Learning frameworks that improve from the system's own operation. The archive is better this month than it was last month.",
    tilt: -0.8,
  },
];

/* Who it talks to   the integration layer, as a network of sources. */
const SOURCES = [
  { name: "SATCORP", role: "Ecosystem operations", href: "/" },
  { name: "NAMTAR", role: "World, wildlife and NPC systems", href: "/namtar" },
  { name: "Ki-Ra Studios", role: "Production intelligence", href: "/kira" },
  { name: "PULSE", role: "Audience and growth analytics", href: "/pulse" },
  { name: "Business platforms", role: "Workflow and automation", href: null },
  { name: "Tactical clusters", role: "Server orchestration", href: null },
];

/* What it does with it   applications. */
const APPLICATIONS = [
  {
    file: "KX-101",
    title: "NPC Intelligence",
    body: "Behaviour that reads as intent rather than scripting. They remember what you did the last time.",
  },
  {
    file: "KX-102",
    title: "Procedural World Systems",
    body: "Generation held inside design rules, so a world can be endless without being arbitrary.",
  },
  {
    file: "KX-103",
    title: "Player Behaviour Analysis",
    body: "What players actually do, as distinct from what they report doing. The two are seldom the same.",
  },
  {
    file: "KX-104",
    title: "AI-Driven Ecosystems",
    body: "Populations that respond to pressure   hunted, fed, displaced   without anyone scripting the consequence.",
  },
];

export default function KyraxPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6">
      {/* The archive itself, running behind the whole page. */}
      <RegistryScene />

      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[88vh] flex-col justify-center py-24">
        <div className="flex items-center gap-4">
          <Stamp tone="accent">EYES ONLY</Stamp>
          <span className="label text-[0.55rem]">SATCORP / THE REGISTRY</span>
        </div>

        <h1 className="mt-9 font-display text-[clamp(3rem,11vw,8rem)] leading-[0.9] text-bone">
          KYRAX
        </h1>

        <p className="mt-6 max-w-3xl font-display text-xl italic leading-relaxed text-accent sm:text-2xl">
          Tactical intelligence. Connected systems.
        </p>

        <p className="mt-10 max-w-2xl font-display text-[clamp(1.2rem,2.4vw,1.7rem)] leading-[1.45] text-bone">
          <Redact delay={500}>
            Everyone assumes I&rsquo;m well informed. I&rsquo;m not. I&rsquo;m
            well indexed.
          </Redact>
        </p>

        <p className="mt-9 max-w-2xl font-sans leading-relaxed text-bone-dim">
          KYRAX is SATCORP&rsquo;s intelligence architecture   the layer that
          connects, analyses, automates and evolves everything the ecosystem
          runs. From creative development and gaming worlds to enterprise
          operations, it is the cognitive foundation the rest of it stands on.
        </p>

        <p className="label mt-16 text-[0.55rem]">
          Scroll   the index goes back further than this
        </p>
      </section>

      {/* ---------- WHAT IT KNOWS ---------- */}
      <section className="relative py-24">
        <Reveal>
          <p className="label label-accent">What it knows</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-bone sm:text-4xl">
            The cognitive core, filed in five drawers.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KNOWS.map((card) => (
            <IndexCard
              key={card.file}
              file={card.file}
              title={card.title}
              classification="CORE"
              tilt={card.tilt}
            >
              {card.body}
            </IndexCard>
          ))}

          <div className="flex items-end border border-dashed border-bone/12 p-6">
            <p className="font-mono text-[0.68rem] leading-relaxed text-bone-dim/70">
              Drawers six through forty-one are not indexed for visitors.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- WHO IT TALKS TO ---------- */}
      <section className="relative py-24">
        <Reveal>
          <p className="label label-accent">Who it talks to</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-bone sm:text-4xl">
            One intelligence. Six sources. Nothing filed twice.
          </h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-bone/10 border-y border-bone/10">
          {SOURCES.map((source) => {
            const row = (
              <>
                <span className="font-display text-xl text-bone">
                  {source.name}
                </span>
                <span className="font-mono text-[0.7rem] text-bone-dim">
                  {source.role}
                </span>
                <span className="font-mono text-[0.58rem] tracking-[0.2em] text-bone-dim/50">
                  {source.href ? "REPORTING →" : "INTERNAL"}
                </span>
              </>
            );

            return (
              <li key={source.name}>
                {source.href ? (
                  <ThreadLink
                    href={source.href}
                    className="grid items-baseline gap-2 py-6 transition-colors hover:bg-bone/[0.03] sm:grid-cols-[14rem_1fr_8rem] sm:gap-8"
                  >
                    {row}
                  </ThreadLink>
                ) : (
                  <div className="grid items-baseline gap-2 py-6 sm:grid-cols-[14rem_1fr_8rem] sm:gap-8">
                    {row}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- WHAT IT DOES WITH IT ---------- */}
      <section className="relative py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label label-accent">What it does with it</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
                Gaming intelligence.
              </h2>
              <p className="mt-3 max-w-xl font-sans leading-relaxed text-bone-dim">
                Dynamic worlds powered by adaptive systems.
              </p>
            </div>
            <ThreadLink
              href="/namtar"
              className="font-mono text-[0.64rem] tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
            >
              SEE IT RUNNING IN NAMTAR →
            </ThreadLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {APPLICATIONS.map((card, i) => (
            <IndexCard
              key={card.file}
              file={card.file}
              title={card.title}
              classification="ACTIVE"
              tilt={i % 2 === 0 ? -0.5 : 0.6}
            >
              {card.body}
            </IndexCard>
          ))}
        </div>
      </section>

      {/* ---------- ASK THE REGISTRY ---------- */}
      <section className="relative pb-28 pt-8">
        <AskTheRegistry />
      </section>
    </div>
  );
}
