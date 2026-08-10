import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Reveal, ScrollTriggerRefresh } from "@/components/system/Reveal";
import { SignalScene, SignalTriggers } from "@/components/worlds/pulse/SignalScene";
import { Dashboard } from "@/components/worlds/pulse/Dashboard";

/**
 * ESTABLISHMENT 6   PULSE
 *
 * A live broadcast network. The one page allowed energy: hot red, lower-third
 * chips, LIVE states, the quickest scroll in the building.
 *
 * The EKG trace behind the page is this establishment's red thread, and it is
 * the only world on the site that *reacts* to the reader rather than being
 * moved by them   sections marked `data-signal` quicken it as they arrive. The
 * number on the attribute is how hard that section hits.
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

const CREATOR_NETWORK = [
  {
    name: "Creator profiles",
    note: "One identity that travels with you across the network.",
  },
  {
    name: "Channels",
    note: "Your own frequency. Programmed by you, carried by us.",
  },
  {
    name: "Content feeds",
    note: "What your audience sees when they are not looking for you.",
  },
  {
    name: "Community pages",
    note: "The room your people go to when the broadcast ends.",
  },
  {
    name: "Collaboration spaces",
    note: "Where two audiences become one for an evening.",
  },
];

/** Live experiences, presented the way a network presents a schedule. */
const SCHEDULE = [
  {
    slot: "01",
    name: "Live events",
    note: "Scheduled, promoted, and run end to end.",
    state: "LIVE",
  },
  {
    slot: "02",
    name: "Broadcasts",
    note: "Multi-platform, one control room.",
    state: "LIVE",
  },
  {
    slot: "03",
    name: "Digital gatherings",
    note: "Smaller rooms, deliberately. Not everything should scale.",
    state: "SCHEDULED",
  },
  {
    slot: "04",
    name: "Interactive experiences",
    note: "The audience is a participant, not a viewer count.",
    state: "SCHEDULED",
  },
  {
    slot: "05",
    name: "Community moments",
    note: "The unscheduled ones. Usually the ones people remember.",
    state: "SCHEDULED",
  },
];

const FABRIC = [
  ["Groups", "Standing rooms, organised around a shared interest."],
  ["Discussions", "Threaded, moderated, and archived rather than lost."],
  ["Events", "From a community calendar through to the door policy."],
  ["Shared experiences", "Watch-alongs, launches, and the nights in between."],
  [
    "Creator-to-community",
    "The shortest path between someone making a thing and the people who want it.",
  ],
] as const;

const DISCORD = "https://discord.gg/Fh5qy6tCTc";

export default function PulsePage() {
  return (
    <div className="relative">
      {/* The trace, running behind the whole page. */}
      <SignalScene />
      <SignalTriggers />
      <ScrollTriggerRefresh />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ---------- I. HERO ---------- */}
        <section
          data-signal="1.2"
          className="flex min-h-[86vh] flex-col justify-center py-24"
        >
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
            <ThreadLink
              href="/partner?division=pulse"
              className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood-hot"
            >
              BROADCAST WITH US
            </ThreadLink>
          </div>
        </section>

        {/* ---------- II. WHAT PULSE IS   lower-third chips ---------- */}
        <section data-signal="0.7" className="border-t border-bone/10 py-20">
          <Reveal>
            <p className="label label-accent">What Pulse Is</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              SATCORP&rsquo;s community and media ecosystem.
            </h2>
          </Reveal>

          <ul className="mt-10 flex flex-wrap gap-px">
            {POWERS.map((p) => (
              <li
                key={p}
                className="border-l-2 border-blood-hot bg-ink-raised/80 px-5 py-3 font-mono text-[0.68rem] tracking-wide text-bone-dim backdrop-blur-sm transition-colors hover:text-bone"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- III. CREATOR NETWORK   the broadcast wall ---------- */}
        <section data-signal="0.8" className="py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label label-accent">Creator Network</p>
                <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                  Everyone gets a channel.
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
                Five surfaces. One identity carried across all of them.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {CREATOR_NETWORK.map((item) => (
              <li
                key={item.name}
                className="group border border-bone/10 bg-ink-raised/70 p-7 backdrop-blur-sm transition-colors hover:border-blood-hot/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl text-bone">
                    {item.name}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-blood-hot/50 transition-colors group-hover:bg-blood-hot"
                  />
                </div>
                <p className="mt-4 font-mono text-[0.7rem] leading-relaxed text-bone-dim">
                  {item.note}
                </p>
              </li>
            ))}

            <li className="flex items-end border border-dashed border-bone/12 p-7">
              <p className="font-mono text-[0.68rem] leading-relaxed text-bone-dim/70">
                The network is small on purpose. It is not accepting everyone,
                and that is the feature.
              </p>
            </li>
          </ul>
        </section>

        {/* ---------- IV. LIVE EXPERIENCES   the schedule ---------- */}
        <section data-signal="0.9" className="py-20">
          <Reveal>
            <p className="label label-accent">Live Experiences</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              Tonight&rsquo;s schedule, and every night after it.
            </h2>
          </Reveal>

          <ol className="mt-10 divide-y divide-bone/10 border-y border-bone/10">
            {SCHEDULE.map((item) => {
              const live = item.state === "LIVE";
              return (
                <li
                  key={item.slot}
                  className="grid items-baseline gap-2 py-6 transition-colors hover:bg-bone/[0.03] sm:grid-cols-[3rem_16rem_1fr_7rem] sm:gap-8"
                >
                  <span className="font-mono text-[0.66rem] text-blood-hot/70">
                    {item.slot}
                  </span>
                  <span className="font-display text-2xl text-bone">
                    {item.name}
                  </span>
                  <span className="font-mono text-[0.7rem] leading-relaxed text-bone-dim">
                    {item.note}
                  </span>
                  <span className="sm:justify-self-end">
                    <Stamp tone={live ? "live" : "bone"} rotate={live ? -2 : 1}>
                      {item.state}
                    </Stamp>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ---------- V. GROWTH INTELLIGENCE ---------- */}
        <section data-signal="1" className="py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="label label-accent">Growth Intelligence</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
                The room, read back to you.
              </h2>
              <p className="mt-6 leading-relaxed text-bone-dim">
                Engagement, campaign performance, community analytics, revenue
                and sponsorship metrics   gathered while the broadcast is
                running rather than reconstructed afterwards.
              </p>
              <p className="mt-6 font-mono text-[0.68rem] leading-relaxed text-bone-dim/75">
                The analytics are{" "}
                <ThreadLink
                  href="/kyrax"
                  className="text-bone underline-offset-4 hover:underline"
                >
                  KYRAX
                </ThreadLink>
                . PULSE reports; the archive is what notices the pattern.
              </p>
            </Reveal>

            <Dashboard />
          </div>
        </section>

        {/* ---------- VI. COMMUNITY FABRIC ---------- */}
        <section data-signal="0.7" className="py-20">
          <Reveal>
            <p className="label label-accent">Community Fabric</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              What holds once the lights go down.
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {FABRIC.map(([name, note]) => (
              <li
                key={name}
                className="border border-bone/10 bg-ink-raised/70 p-7 backdrop-blur-sm"
              >
                <h3 className="font-mono text-[0.66rem] tracking-[0.2em] text-blood-hot">
                  {name.toUpperCase()}
                </h3>
                <p className="mt-4 leading-relaxed text-bone-dim">{note}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ---------- VII. CORE STATEMENT   the trace swells ---------- */}
      <section
        data-signal="1.5"
        className="relative border-y border-bone/10 py-32 text-center"
      >
        <blockquote className="mx-auto max-w-4xl px-6 font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.3] text-balance text-bone">
          &ldquo;Pulse is where people connect with ideas, creators and
          experiences. It is the heartbeat of SATCORP&rsquo;s digital
          communities.&rdquo;
        </blockquote>
      </section>

      {/* ---------- VIII. CTA ---------- */}
      <div className="relative mx-auto max-w-6xl px-6">
        <section data-signal="0.9" className="py-24 text-center">
          <p className="label label-accent">Get on the frequency</p>
          <p className="mx-auto mt-6 max-w-xl font-display text-2xl leading-relaxed text-bone">
            Come and be on it, or come and be carried by it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={DISCORD}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-blood-hot px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
            >
              JOIN THE SIGNAL
            </a>
            <ThreadLink
              href="/partner?division=pulse"
              className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood-hot"
            >
              BROADCAST WITH US →
            </ThreadLink>
            <ThreadLink
              href="/engage"
              className="px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone-dim transition-colors hover:text-bone"
            >
              BEGIN THE BRIEF
            </ThreadLink>
          </div>
        </section>
      </div>
    </div>
  );
}
