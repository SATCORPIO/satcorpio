import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { LedgerButton } from "@/components/ledger/LedgerButton";

/**
 * ESTABLISHMENT 6 — PULSE
 * A live broadcast network. The one page allowed energy: hot red, lower-third
 * chips, LIVE states, the quickest scroll in the building.
 */

const POWERS = [
  "Creator experiences",
  "Live events",
  "Community hubs",
  "Broadcast systems",
  "Digital campaigns",
  "Audience engagement",
  "Sponsorship opportunities",
  "Growth analytics",
];

const PANELS = [
  {
    label: "Creator Network",
    items: [
      "Creator profiles",
      "Channels",
      "Content feeds",
      "Community pages",
      "Collaboration spaces",
    ],
  },
  {
    label: "Live Experiences",
    items: [
      "Live events",
      "Broadcasts",
      "Digital gatherings",
      "Interactive experiences",
      "Community moments",
    ],
  },
  {
    label: "Growth Intelligence",
    items: [
      "Audience engagement",
      "Campaign performance",
      "Community analytics",
      "Revenue tracking",
      "Sponsorship metrics",
    ],
  },
  {
    label: "Community Fabric",
    items: [
      "Groups",
      "Discussions",
      "Events",
      "Shared experiences",
      "Creator-to-community connections",
    ],
  },
];

const DISCORD = "https://discord.gg/Fh5qy6tCTc";

export default function PulsePage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* ---------- HERO ---------- */}
      <section className="flex min-h-[82vh] flex-col justify-center py-24">
        <div className="flex items-center gap-4">
          <Stamp tone="live" rotate={-1}>
            ON AIR
          </Stamp>
          <span className="label text-[0.55rem]">SATCORP / PULSE</span>
        </div>

        <h1 className="mt-8 font-display text-[clamp(3rem,12vw,9rem)] leading-[0.88] text-bone">
          PULSE
        </h1>

        <p className="mt-6 max-w-3xl text-xl font-medium leading-snug text-bone sm:text-2xl">
          The Digital Frontline of SATCORP.
        </p>

        <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
          Pulse connects creators, communities, audiences and experiences
          through a unified platform built for engagement, interaction and
          growth. It is where communities gather, events happen, creators
          connect with audiences, and digital experiences come alive.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-blood-hot px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
          >
            JOIN THE SIGNAL
          </a>
          <LedgerButton className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood-hot">
            BROADCAST WITH US
          </LedgerButton>
        </div>
      </section>

      {/* ---------- WHAT PULSE IS — lower-third chips ---------- */}
      <section className="border-t border-bone/10 py-16">
        <p className="label label-accent">What Pulse Is</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
          SATCORP&rsquo;s community and media ecosystem.
        </p>

        <ul className="mt-10 flex flex-wrap gap-px">
          {POWERS.map((p) => (
            <li
              key={p}
              className="border-l-2 border-blood-hot bg-ink-raised px-5 py-3 font-mono text-[0.68rem] tracking-wide text-bone-dim transition-colors hover:text-bone"
            >
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- THE BROADCAST WALL ---------- */}
      <section className="py-16">
        <div className="grid gap-px lg:grid-cols-2">
          {PANELS.map((panel) => (
            <article
              key={panel.label}
              className="border border-bone/10 bg-ink-raised p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl text-bone">
                  {panel.label}
                </h2>
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-blood-hot"
                  style={{ animation: "live-pulse 1.6s ease-in-out infinite" }}
                />
              </div>

              <ul className="mt-6 space-y-2.5">
                {panel.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-mono text-[0.7rem] text-bone-dim"
                  >
                    <span className="text-blood-hot">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 font-mono text-[0.64rem] tracking-[0.18em] text-bone-dim/60">
          GROWTH INTELLIGENCE IS POWERED BY{" "}
          <ThreadLink
            href="/kyrax"
            className="text-bone underline-offset-4 hover:underline"
          >
            KYRAX
          </ThreadLink>
        </p>
      </section>

      {/* ---------- CORE STATEMENT ---------- */}
      <section className="border-y border-bone/10 py-28 text-center">
        <blockquote className="mx-auto max-w-4xl font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.3] text-balance text-bone">
          &ldquo;Pulse is where people connect with ideas, creators and
          experiences. It is the heartbeat of SATCORP&rsquo;s digital
          communities.&rdquo;
        </blockquote>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-24 text-center">
        <p className="label label-accent">Get on the frequency</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer noopener"
            className="bg-blood-hot px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
          >
            JOIN THE SIGNAL
          </a>
          <ThreadLink
            href="/engage"
            className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood-hot"
          >
            BEGIN THE BRIEF →
          </ThreadLink>
        </div>
      </section>
    </div>
  );
}
