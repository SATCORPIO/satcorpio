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
        <h1 className="font-display text-[clamp(3rem,11vw,8rem)] leading-[0.9] text-bone">
          KYRAX
        </h1>

        <p className="mt-6 max-w-3xl font-display text-xl italic leading-relaxed text-accent sm:text-2xl">
          Tactical intelligence. Connected systems.
        </p>

        <p className="mt-9 max-w-2xl font-sans leading-relaxed text-bone-dim">
          KYRAX is SATCORP&rsquo;s intelligence architecture   the layer that
          connects, analyses, automates and evolves everything the ecosystem
          runs. From creative development and gaming worlds to enterprise
          operations, it is the cognitive foundation the rest of it stands on.
        </p>
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
