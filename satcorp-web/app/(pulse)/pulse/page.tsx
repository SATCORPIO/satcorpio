import { Stamp, type StampTone } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Reveal, ScrollTriggerRefresh } from "@/components/system/Reveal";
import { SignalTriggers } from "@/components/worlds/pulse/SignalScene";
import { SignalSceneDeferred } from "@/components/worlds/pulse/SignalSceneLoader";
import { Dashboard } from "@/components/worlds/pulse/Dashboard";
import { ReservationForm } from "@/components/worlds/pulse/ReservationForm";
import { Position } from "@/components/worlds/pulse/Position";
import { SpaceBoard } from "@/components/worlds/pulse/SpaceBoard";
import {
  CREATOR_SURFACES,
  DOCTRINE,
  IDENTITY_LEVELS,
  PILLARS,
  ROADMAP,
  ROADMAP_STAMP,
  VERIFICATION,
  type RoadmapState,
} from "@/lib/pulse-platform";

/**
 * ESTABLISHMENT 6   PULSE
 *
 * A live broadcast network, and   as of this pass   the platform's public
 * specification and front door. The one page allowed energy: hot red,
 * lower-third chips, LIVE states, the quickest scroll in the building.
 *
 * The EKG trace behind the page is this establishment's red thread, and it is
 * the only world on the site that *reacts* to the reader rather than being
 * moved by them   sections marked `data-signal` quicken it as they arrive. The
 * number on the attribute is how hard that section hits.
 *
 * Section numbering follows the build plan
 * (`../../../../Next Builds/PULSE/PULSE-BUILD-PLAN.md` §4) rather than the
 * page's own top-to-bottom order, so later phases slot in without a renumber:
 *
 *   I    Hero                              shipped
 *   II   What PULSE Is   the pillars       shipped
 *   III  The Position   ecosystem diagram  shipped
 *   IV   PULSE ID + the handle claim       shipped
 *   V    Spaces                            shipped
 *   VI   The Creator Hub                   shipped
 *   VII  Transmission Schedule             shipped
 *   VIII Growth Intelligence               shipped, specimen-stamped
 *   IX   The Doctrine                      shipped   gate cleared, see below
 *   X    Core Statement                    shipped
 *   XI   CTA                               shipped
 *
 * All eleven sections are built. Two sequencing notes worth keeping, because
 * they explain why the page did not fill in strict paragraph order:
 *
 * §IV shipped before §III and §V (Track A phase 3 landed ahead of phase 2):
 * the phase guide's own sequencing note (§6) says build the reservation
 * before the presentation, because it is the one part of this page that
 * compounds.
 *
 * §IX was gated on plan §7.4   a form collecting an email address on the
 * strength of an undisclosed processing purpose is the one mistake this
 * site's positioning cannot absorb. The gate cleared when the privacy policy
 * was amended for the PULSE handle claim in the same change that added the
 * form (see `app/(legal)/privacy/page.tsx`), so this section's claim and the
 * policy's claim are the same document read twice.
 *
 * Two build-plan decisions (§13.1 domain, §13.2 open-vs-invited queue) are
 * proceeding under the plan's own recommendations   `pulse.satcorp.io`, an
 * open queue with gated allocation   as stated assumptions rather than
 * blocking questions; both are one constant to change if decided otherwise
 * (`PULSE_DOMAIN` in `ReservationForm.tsx`).
 *
 * Every state on this page has to be real   plan §7. `ROADMAP` is typed data
 * in `lib/pulse-platform.ts`, not copy: nothing here carries `tone="live"`
 * except the establishment's own on-air stamp in the hero, because nothing on
 * the roadmap is live yet. §III's KYRAX edge is drawn deliberately differently
 * from the other four for the same reason   named and deferred, not
 * demonstrated (plan §7.3).
 */

/** Roadmap state -> stamp tone. `"live"` is deliberately never a target here. */
const ROADMAP_TONE: Record<RoadmapState, StampTone> = {
  "in-development": "blood",
  queued: "bone",
  planned: "bone",
  later: "bone",
};

const DISCORD = "https://discord.gg/guDzGUkJSb";

export default function PulsePage() {
  return (
    <div className="relative">
      {/* The trace, running behind the whole page. Deferred out of the
          initial bundle   see SignalSceneLoader.tsx. */}
      <SignalSceneDeferred />
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
            Your audience. Your community. Your identity. One place.
          </p>

          <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
            PULSE is SATCORP&rsquo;s engagement and community platform   the
            connective layer between creators, audiences, communities, and the
            experiences they build.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="#pulse-id"
              className="bg-blood-hot px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
            >
              RESERVE YOUR HANDLE
            </a>
            <a
              href={DISCORD}
              target="_blank"
              rel="noreferrer noopener"
              className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood-hot"
            >
              JOIN THE SIGNAL
            </a>
            <ThreadLink
              href="/partner?division=pulse"
              className="px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone-dim transition-colors hover:text-bone"
            >
              BROADCAST WITH US
            </ThreadLink>
          </div>
        </section>

        {/* ---------- II. WHAT PULSE IS   the pillars ---------- */}
        <section data-signal="0.7" className="border-t border-bone/10 py-20">
          <Reveal>
            <p className="label label-accent">What Pulse Is</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              SATCORP&rsquo;s engagement and community platform.
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.id}
                className="border-l-2 border-blood-hot bg-ink-raised/80 px-5 py-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] text-bone">
                    {pillar.name.toUpperCase()}
                  </span>
                  {pillar.later && (
                    <Stamp tone="bone" rotate={1} className="text-[0.5rem]">
                      LATER PHASE
                    </Stamp>
                  )}
                </div>
                <p className="mt-2 font-mono text-[0.66rem] leading-relaxed text-bone-dim">
                  {pillar.line}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- III. THE POSITION   the ecosystem diagram

             The claim the page has never drawn: PULSE sits between people
             and every experience SATCORP operates. `Position` is inline SVG,
             not WebGL   `SignalScene` already owns this page's one WebGL
             context, and a second one is how the page loses the first on
             mobile. Plan §4.III. ---------- */}
        <section data-signal="1" className="border-t border-bone/10 py-20">
          <Reveal>
            <p className="label label-accent">The Position</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              Not a sixth product. The layer between them.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
              PULSE sits between people and every experience SATCORP
              operates   the connective layer, not another division standing
              beside the others.
            </p>
          </Reveal>

          <div className="mt-12">
            <Position />
          </div>

          <p className="mx-auto mt-8 max-w-md text-center font-mono text-[0.64rem] leading-relaxed text-bone-dim/70">
            The KYRAX connection is drawn, not yet active   the intelligence
            layer is a later phase (plan §7.3), and this diagram says so
            rather than pretending otherwise.
          </p>
        </section>

        {/* ---------- IV. PULSE ID   the handle claim

             Shipped ahead of §III and §V   see the header comment. Left half
             is the identity claim (identity levels, verification classes);
             right half is the reservation form itself, plan §4.IV. ---------- */}
        <section
          id="pulse-id"
          data-signal="1.4"
          className="border-t border-bone/10 py-20"
        >
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <p className="label label-accent">PULSE ID</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
                One account. One identity. Multiple experiences.
              </h2>
              <p className="mt-6 leading-relaxed text-bone-dim">
                Your PULSE identity travels with you   into Ki-Ra&rsquo;s
                communities, into NAMTAR&rsquo;s world, into anything SATCORP
                opens next.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {IDENTITY_LEVELS.map((level) => (
                  <li key={level.id}>
                    <Stamp tone="bone" rotate={1} className="text-[0.55rem]">
                      {level.name.toUpperCase()}
                    </Stamp>
                  </li>
                ))}
              </ul>

              <dl className="mt-10 grid gap-5 sm:grid-cols-2">
                {VERIFICATION.map((v) => (
                  <div key={v.id}>
                    <dt className="font-mono text-[0.62rem] tracking-[0.18em] text-blood-hot">
                      {v.name.toUpperCase()}
                    </dt>
                    <dd className="mt-1.5 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
                      {v.line}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div>
              <p className="label label-accent mb-6">Reserve Your Handle</p>
              <ReservationForm />
            </div>
          </div>
        </section>

        {/* ---------- V. SPACES   one structure, four shapes

             A creator, a community, a business and a game all get the same
             fourteen modules, with a different subset switched on. The five
             lines from the original page's Community Fabric section survive
             here as module descriptions   plan §4, "Community Fabric folds
             into V and VI." ---------- */}
        <section
          id="spaces"
          data-signal="0.9"
          className="scroll-mt-[calc(var(--chrome-h)+2rem)] border-t border-bone/10 py-20"
        >
          <Reveal>
            <p className="label label-accent">Spaces</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              One structure. Four shapes.
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
              A Space is a complete digital home   the same fourteen modules
              every time, switched on differently depending on what is
              actually being built.
            </p>
          </Reveal>

          <div className="mt-10">
            <SpaceBoard />
          </div>
        </section>

        {/* ---------- VI. THE CREATOR HUB   rewrite of Creator Network ---------- */}
        <section
          id="creator-hub"
          data-signal="0.8"
          className="scroll-mt-[calc(var(--chrome-h)+2rem)] py-20"
        >
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label label-accent">The Creator Hub</p>
                <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                  Everything a creator needs, one hub.
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
                Seven surfaces. One hub, carried across all of them.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {CREATOR_SURFACES.map((item) => (
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
                  {item.line}
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

        {/* ---------- VII. TRANSMISSION SCHEDULE   rewrite of Live Experiences

             This was a broadcast schedule wearing costume over a roadmap. It
             is a roadmap now, in the same idiom: every row is a real
             development phase, from `ROADMAP` in `lib/pulse-platform.ts`, and
             every stamp is a state that is actually true. `tone="live"` is
             reserved for the establishment itself (the hero's ON AIR) until a
             phase is actually live   plan §7.1. ---------- */}
        <section
          id="roadmap"
          data-signal="0.9"
          className="scroll-mt-[calc(var(--chrome-h)+2rem)] py-20"
        >
          <Reveal>
            <p className="label label-accent">Transmission Schedule</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              The build, on the record.
            </h2>
          </Reveal>

          <ol
            data-roadmap
            className="mt-10 divide-y divide-bone/10 border-y border-bone/10"
          >
            {ROADMAP.map((phase) => (
              <li
                key={phase.slot}
                className="grid items-baseline gap-2 py-6 transition-colors hover:bg-bone/[0.03] sm:grid-cols-[3rem_16rem_1fr_9rem] sm:gap-8"
              >
                <span className="font-mono text-[0.66rem] text-blood-hot/70">
                  {phase.slot}
                </span>
                <span className="font-display text-2xl text-bone">
                  {phase.name}
                </span>
                <span className="font-mono text-[0.7rem] leading-relaxed text-bone-dim">
                  {phase.note}
                </span>
                <span className="sm:justify-self-end">
                  <Stamp
                    tone={ROADMAP_TONE[phase.state]}
                    rotate={phase.state === "in-development" ? -2 : 1}
                  >
                    {ROADMAP_STAMP[phase.state]}
                  </Stamp>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- VIII. GROWTH INTELLIGENCE ---------- */}
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
                , in a later phase. PULSE will report; the archive is what
                notices the pattern.
              </p>
            </Reveal>

            <Dashboard />
          </div>
        </section>

        {/* ---------- IX. THE DOCTRINE   the privacy position

             Gated on plan §7.4 until the privacy policy actually said what
             this section claims   it does now (see the header comment). The
             wording here is the wording of the policy, not a paraphrase of
             it: conduct, never topology (plan §7.6). This section may not
             describe SATCORP's data infrastructure or vendor relationships
             at all   `tests/unit/doctrine-copy.test.ts` holds that line in
             CI, and holds it against this very comment: an earlier draft of
             this note used the exact phrase the test exists to catch,
             describing the rule rather than breaking it, and failed anyway.
             Reworded rather than the test narrowed, since scanning comments
             too is the point   a phrase resting in a comment is a phrase one
             copy-paste away from the rendered page. ---------- */}
        <section data-signal="1.1" className="border-t border-bone/10 py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl border border-bone/10 bg-ink-raised/70 p-8 text-center backdrop-blur-sm sm:p-10">
              <p className="label label-accent">The Doctrine</p>
              <p className="mt-5 font-display text-2xl leading-snug text-bone sm:text-3xl">
                {DOCTRINE.claim}
              </p>
              <p className="mt-5 font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                {DOCTRINE.body}
              </p>
              <p className="mt-5 leading-relaxed text-bone-dim">
                {DOCTRINE.footer}
              </p>
              <ThreadLink
                href="/privacy"
                className="mt-6 inline-block font-mono text-[0.64rem] tracking-[0.2em] text-bone underline-offset-4 hover:underline"
              >
                READ THE PRIVACY POLICY →
              </ThreadLink>
            </div>
          </Reveal>
        </section>
      </div>

      {/* ---------- X. CORE STATEMENT   the trace swells ---------- */}
      <section
        data-signal="1.5"
        className="relative border-y border-bone/10 py-32 text-center"
      >
        <blockquote className="mx-auto max-w-4xl px-6 font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.3] text-balance text-bone">
          &ldquo;KYRAX is the brain. PULSE is the heartbeat.
          <br className="hidden sm:block" /> PULSE is where the SATCORP
          ecosystem becomes social.&rdquo;
        </blockquote>
      </section>

      {/* ---------- XI. CTA ----------
           BEGIN THE BRIEF is removed: someone commissioning agency work is
           not this page's audience, and the Colophon and the Ledger seal both
           already reach /engage from every page. ---------- */}
      <div className="relative mx-auto max-w-6xl px-6">
        <section data-signal="0.9" className="py-24 text-center">
          <p className="label label-accent">Get on the frequency</p>
          <p className="mx-auto mt-6 max-w-xl font-display text-2xl leading-relaxed text-bone">
            Come and be on it, or come and be carried by it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pulse-id"
              className="bg-blood-hot px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85"
            >
              RESERVE YOUR HANDLE
            </a>
            <a
              href={DISCORD}
              target="_blank"
              rel="noreferrer noopener"
              className="border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood-hot"
            >
              JOIN THE SIGNAL
            </a>
            <ThreadLink
              href="/partner?division=pulse"
              className="px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone-dim transition-colors hover:text-bone"
            >
              BROADCAST WITH US →
            </ThreadLink>
          </div>
        </section>
      </div>
    </div>
  );
}
