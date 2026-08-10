import { ENGAGEMENT_MODEL } from "@/lib/divisions";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { LedgerButton } from "@/components/ledger/LedgerButton";
import { AnuStudy } from "@/components/worlds/anu/AnuStudy";

/**
 * ESTABLISHMENT 2   ANU
 * A private study, received at midnight. Brass, generous whitespace, a narrow
 * measure, and the slowest scroll on the site. Nothing here is in a hurry.
 */

const OVERSIGHT = [
  {
    n: "01",
    title: "Systems Architecture",
    body: "Designing how platforms communicate, share data, and grow together.",
  },
  {
    n: "02",
    title: "Artificial Intelligence",
    body: "Developing intelligent assistants and automation that enhance every SATCORP product.",
  },
  {
    n: "03",
    title: "Research & Development",
    body: "Exploring emerging technologies and turning ideas into practical solutions.",
  },
  {
    n: "04",
    title: "Digital Infrastructure",
    body: "Creating secure, scalable foundations capable of supporting millions of users.",
  },
  {
    n: "05",
    title: "Innovation Strategy",
    body: "Identifying future opportunities and directing the evolution of the ecosystem.",
  },
  {
    n: "06",
    title: "User Experience Philosophy",
    body: "Ensuring every interaction across SATCORP is intuitive, consistent, and purposeful.",
  },
];

export default function AnuPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-6">
      {/* The study, fixed behind the writing. The camera moves as you read. */}
      <AnuStudy />

      {/* ---------- I. HERO   framed on the empty chair ---------- */}
      <section className="relative grid min-h-[92vh] items-end gap-16 pb-24 pt-28 lg:min-h-[96vh]">
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] text-bone">
            ANU
          </h1>
          <p className="mt-4 font-display text-xl italic text-brass sm:text-2xl">
            Lead Systems Architect &amp; Tactical Concierge
          </p>

          <div className="rule mt-10 max-w-xs" />

          <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-bone-dim">
            Engineering the SATCORP ecosystem. Full-stack development,
            enterprise-grade infrastructure, and bespoke digital solutions.
          </p>
        </div>
      </section>

      {/* ---------- II. THE PHILOSOPHY   the fountain pen ---------- */}
      <section className="relative max-w-2xl py-24 sm:py-32">
        <p className="label label-accent">The Philosophy</p>
        <p className="mt-7 font-display text-[clamp(1.35rem,3vw,2rem)] leading-[1.4] text-bone">
          ANU represents the strategic and creative core of SATCORP. Every
          platform, product and initiative begins with a single philosophy:
          design systems that are intelligent, scalable, and interconnected.
        </p>
        <p className="mt-8 font-sans leading-relaxed text-bone-dim">
          Rather than building isolated applications, ANU guides the creation of
          a unified ecosystem where technology, artificial intelligence,
          entertainment, infrastructure and digital services evolve together.
          Each project serves a purpose on its own while contributing to a
          larger, long-term vision.
        </p>
      </section>

      {/* ---------- III. WHAT ANU OVERSEES   the dossier stack ---------- */}
      <section className="relative py-16">
        <p className="label label-accent">What ANU Oversees</p>

        <ul className="mt-10">
          {OVERSIGHT.map((item) => (
            <li
              key={item.n}
              className="group grid gap-4 border-t border-bone/10 py-8 transition-colors last:border-b hover:bg-bone/[0.02] sm:grid-cols-[4rem_1fr] sm:gap-10"
            >
              <span className="font-mono text-[0.7rem] text-brass/70">
                {item.n}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl text-bone">
                  {item.title}
                </h3>
                <p className="mt-2.5 font-sans text-sm leading-relaxed text-bone-dim">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- IV. THE ENGAGEMENT MODEL   the rotary phone ---------- */}
      <section className="relative border-t border-bone/10 py-24">
        <p className="label label-accent">The Concierge Engagement Model</p>
        <p className="mt-4 max-w-xl font-mono text-[0.72rem] leading-relaxed text-bone-dim">
          Three movements. In that order, every time, whether the engagement
          runs a week or a year.
        </p>

        <ol className="mt-12 grid gap-px md:grid-cols-3">
          {ENGAGEMENT_MODEL.map((step) => (
            <li
              key={step.id}
              className="border border-bone/10 bg-ink-raised/75 p-7 backdrop-blur-sm"
            >
              <span className="font-display text-3xl text-brass/60">
                {step.step}
              </span>
              <h3 className="mt-5 font-display text-2xl text-bone">
                {step.title}
              </h3>
              <p className="mt-1.5 font-mono text-[0.66rem] tracking-wide text-brass">
                {step.subtitle}
              </p>
              <p className="mt-5 font-sans text-sm leading-relaxed text-bone-dim">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- CTA   the receiver lifts ---------- */}
      <section className="relative border-t border-bone/10 py-24 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ThreadLink
            href="/engage"
            className="border border-brass/40 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:bg-brass hover:text-ink"
          >
            REQUEST AN AUDIENCE
          </ThreadLink>
          <LedgerButton className="px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone-dim transition-colors hover:text-bone">
            OPEN THE LEDGER
          </LedgerButton>
        </div>
      </section>
    </div>
  );
}
