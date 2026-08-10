import { DIVISIONS } from "@/lib/divisions";
import { Monogram } from "@/components/fingerprints/Monogram";
import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { LedgerButton } from "@/components/ledger/LedgerButton";
import { Reveal, ScrollTriggerRefresh } from "@/components/system/Reveal";
import { HeroMark } from "@/components/worlds/satcorp/HeroMark";

/**
 * ESTABLISHMENT 1   SATCORP
 * A shadow holding company's front door: sober, architectural, quietly
 * enormous. Pure black, red and bone; no tinted accent of its own.
 */
export default function SatcorpPage() {
  const network = DIVISIONS.filter((d) => d.id !== "satcorp");

  return (
    <>
      <ScrollTriggerRefresh />

      {/* ---------- HERO ---------- */}
      {/* The mark carries the hero on its own now: no wordmark, no epigraph,
          no scroll cue. Everything below it is spaced off the mark rather than
          off a headline that is no longer there. */}
      <section className="relative flex min-h-[86vh] flex-col items-center justify-center px-6 text-center">
        {/* The mark assembles from embers. */}
        <HeroMark className="pointer-events-none absolute inset-x-0 top-[6%] mx-auto h-[46vh] max-w-3xl opacity-90" />

        <p className="relative mt-[34vh] max-w-2xl text-balance font-mono text-[0.74rem] leading-loose text-bone-dim/80">
          Intelligent systems. Creative platforms. Digital worlds. Engineered,
          connected, and run on our own iron.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <LedgerButton className="border border-bone/20 px-7 py-3 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood hover:bg-blood">
            OPEN THE LEDGER
          </LedgerButton>
        </div>
      </section>

      {/* ---------- THE NETWORK ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <header>
          <p className="label label-accent">The Network</p>
          <h2 className="mt-3 font-display text-3xl text-bone sm:text-4xl">
            Five divisions. One operation.
          </h2>
        </header>

        <div className="rule mb-10 mt-8" />

        <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {network.map((d) => (
            <li key={d.id}>
              <ThreadLink
                href={d.href}
                className="group flex h-full flex-col justify-between gap-8 border border-bone/10 bg-ink-raised p-6 transition-colors hover:border-bone/25"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="label">{d.role}</span>
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full transition-transform duration-500 group-hover:scale-150"
                      style={{ background: d.accent }}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-bone">
                    {d.name}
                  </h3>
                  <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-bone-dim">
                    {d.tagline}
                  </p>
                </div>
                <span className="font-mono text-[0.62rem] tracking-[0.22em] text-bone-dim transition-colors group-hover:text-bone">
                  PROCEED →
                </span>
              </ThreadLink>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- WHAT SATCORP DOES ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
        <p className="label label-accent">What SATCORP Does</p>
        <div className="mt-8 grid gap-px lg:grid-cols-2">
          <article className="dossier p-8">
            <Stamp tone="blood">COGNITIVE</Stamp>
            <h3 className="mt-5 font-display text-2xl text-bone">
              Artificial Intelligence &amp; Cognitive Systems
            </h3>
            <p className="mt-3 font-mono text-[0.72rem] text-bone-dim">
              KYRAX   the intelligence layer behind SATCORP.
            </p>
            <ul className="mt-6 space-y-2.5 font-mono text-[0.7rem] text-bone-dim">
              {[
                "Adaptive AI systems",
                "Autonomous decision-making",
                "Research and development",
                "Human-AI interaction models",
                "AI integration across all SATCORP divisions",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-blood"> </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="dossier p-8">
            <Stamp tone="bone">INFRASTRUCTURE</Stamp>
            <h3 className="mt-5 font-display text-2xl text-bone">
              Infrastructure &amp; Solutions
            </h3>
            <p className="mt-3 font-mono text-[0.72rem] text-bone-dim">
              The framework everything else is built on.
            </p>
            <ul className="mt-6 space-y-2.5 font-mono text-[0.7rem] text-bone-dim">
              {[
                "Technology services",
                "Digital infrastructure",
                "Business solutions",
                "Future-focused development",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-blood"> </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* ---------- THE VISION ---------- */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
        <Reveal>
          <blockquote className="font-display text-[clamp(1.6rem,4.5vw,3rem)] leading-[1.25] text-balance text-bone">
            &ldquo;To create a connected ecosystem where intelligence,
            creativity, and technology evolve together.&rdquo;
          </blockquote>
          <p className="label mt-8 text-[0.55rem]">The SATCORP Vision</p>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="label label-accent">Explore the Ecosystem</p>
        <div className="mt-6 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/kyrax", label: "EXPLORE KYRAX AI" },
            { href: "/namtar", label: "ENTER NAMTAR" },
            { href: "/kira", label: "VISIT KI-RA STUDIOS" },
            { href: "/partner", label: "PARTNER WITH SATCORP" },
          ].map((cta) => (
            <ThreadLink
              key={cta.href}
              href={cta.href}
              className="border border-bone/10 bg-ink-raised px-6 py-7 font-mono text-[0.64rem] tracking-[0.2em] text-bone-dim transition-colors hover:border-blood hover:text-bone"
            >
              {cta.label}
            </ThreadLink>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="max-w-2xl font-display text-xl leading-relaxed text-bone">
            Whether you need a custom web platform or Technical/Tactical
            Concierge Service, SATCORP provides the framework.
          </p>

          <div className="mt-12 flex items-center gap-3 text-bone-dim">
            <Monogram className="size-6" />
            <span className="font-mono text-[0.62rem] tracking-[0.28em]">
              SATCORP
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
