import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import {
  Comparison,
  ProgrammeLine,
  Standing,
  WorldDossier,
} from "./Programme";
import { CycleClock } from "./CycleClock";
import {
  COMPARISON,
  CYCLE,
  DISCORD,
  FACTS,
  FILE,
  FRAMES,
  HEADLINE,
  HOUSE_RULES,
  LADDER,
  LADDER_CODA,
  PREMISE,
  STANDING,
  TITLE,
} from "./relentless";

/**
 * THE SECOND FEATURE   the mobile title's announcement on `/kira`.
 *
 * Placed directly after the NAMTAR feature presentation, which is where the
 * room's own metaphor puts it: the main picture, then the second feature. The
 * flagship keeps the tinted band and the heavier frame; this section runs
 * plain, on the page's alternating rhythm, and the difference in weight is the
 * hierarchy. Nothing here needs to shout   a second feature announced quietly
 * in a screening room is a studio with a slate, not a studio changing course.
 *
 * The section is an announcement, not a brief. It carries the hook, the
 * disambiguation, and the standing; everything deeper lives at
 * `/kira/relentless` behind one link. Two reasons for the split: a reader
 * scrolling `/kira` is here for the studio, not for one title's design
 * philosophy   and the full brief is where an interested reader can be asked
 * for something, which a section on somebody else's page cannot honestly do.
 *
 * Server component. The only client boundary is the clock, which needs one.
 */
export function SecondFeature() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {/* ---------- THE ANNOUNCEMENT ---------- */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label label-accent">The second feature</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              {HEADLINE}
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
            A second picture, shot on location. Different camera. Same planet.
          </p>
        </div>
      </Reveal>

      <div className="mt-12">
        <WorldDossier
          designation={`WORLD DOSSIER   ${FILE}`}
          title={TITLE}
          standing={STANDING}
          facts={FACTS}
        >
          <p>{PREMISE}</p>
        </WorldDossier>
      </div>

      {/* ---------- THE CYCLE ----------
          The hook, and the only part of this section that would survive being
          cut down to a single screen. It sits immediately under the dossier for
          that reason. */}
      <div className="mt-4 border border-bone/12 bg-ink-raised/70 px-6 py-9 backdrop-blur-sm sm:px-8">
        <Reveal>
          <p className="label label-accent">{CYCLE.label}</p>
          <h3 className="mt-4 max-w-xl font-display text-2xl leading-snug text-bone sm:text-3xl">
            {CYCLE.heading}
          </h3>
        </Reveal>

        <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <ol className="space-y-5">
            {CYCLE.beats.map(([index, beat]) => (
              <li key={index} className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4">
                <span className="font-mono text-[0.64rem] text-accent/70">
                  {index}
                </span>
                <span className="font-display text-lg leading-snug text-bone">
                  {beat}
                </span>
              </li>
            ))}
          </ol>

          <CycleClock />
        </div>

        <p className="mt-9 max-w-2xl border-t border-bone/10 pt-7 font-display text-lg italic leading-relaxed text-accent">
          {CYCLE.coda}
        </p>
      </div>

      {/* ---------- TWO OBJECTS, ONE WORLD ----------
          High on purpose. The one way this announcement genuinely goes wrong is
          a reader leaving the page believing the flagship went mobile, and that
          misreading is cheapest to prevent before they have scrolled past it. */}
      <div className="mt-16">
        <Reveal>
          <p className="label label-accent">{COMPARISON.heading}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
            {COMPARISON.blurb}
          </p>
        </Reveal>

        <div className="mt-8">
          <Comparison columns={["NAMTAR", TITLE]} rows={COMPARISON.rows} />
        </div>
      </div>

      {/* ---------- HOUSE RULES ----------
          The page's own layout unit, reused. The pillars are a running order
          because that is how this room presents anything it means. */}
      <div className="mt-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label label-accent">House rules</p>
              <h3 className="mt-4 font-display text-2xl text-bone sm:text-3xl">
                Five, and they are ranked.
              </h3>
            </div>
            <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              When two of them disagree, the lower number wins. That ordering is
              the actual content.
            </p>
          </div>
        </Reveal>

        <ol className="mt-10">
          {HOUSE_RULES.map(([index, title, note, meta]) => (
            <ProgrammeLine
              key={index}
              index={index}
              title={title}
              note={note}
              meta={meta}
            />
          ))}
        </ol>
      </div>

      {/* ---------- REEL NOT CUT ----------
          Three designed frames rather than three apologies. Multi-column at
          every width: stacked full-bleed, empty frames become three screens of
          nothing to scroll past. */}
      <div className="mt-16">
        <Reveal>
          <p className="label label-accent">Reel not cut</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {FRAMES.map((frame) => (
            <Placeholder
              key={frame.file}
              label={frame.label}
              file={frame.file}
              aspect="4 / 3"
              stamp={frame.stamp}
              tone="accent"
            />
          ))}
        </div>
      </div>

      {/* ---------- STANDING ---------- */}
      <div className="mt-16">
        <Reveal>
          <p className="label label-accent">Standing</p>
        </Reveal>
        <Standing items={LADDER} className="mt-8" />

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <p className="font-display text-lg italic text-bone-dim">
            {LADDER_CODA}
          </p>
          {/* Bone, not the live tone. Nothing about this game is running yet
              and a pulsing dot would say otherwise. */}
          <Stamp tone="bone" rotate={2}>
            ADVANCE NOTICE
          </Stamp>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ThreadLink
          href="/kira/relentless"
          className="inline-block border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
        >
          READ THE FULL BRIEF →
        </ThreadLink>
        {/* Not a hash link into the brief. Lenis owns scroll on this site and a
            cross-route anchor lands where it feels like landing; the forwarding
            address is offered on the brief itself, beside the thing it is for. */}
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-block border border-bone/15 px-7 py-3.5 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
        >
          ASK IN THE ROOM →
        </a>
      </div>
    </section>
  );
}
