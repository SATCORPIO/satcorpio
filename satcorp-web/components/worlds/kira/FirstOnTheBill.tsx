import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import { Comparison, WorldDossier } from "./Programme";
import { Threshold } from "./Threshold";
import {
  DISCORD,
  FACTS,
  FILE,
  FRAMES,
  HEADLINE,
  STAKE,
  STANDING,
  THRESHOLD,
  TITLE,
  WAYS,
} from "./streetlevel";

/**
 * FIRST ON THE BILL   STREET LEVEL's announcement on `/kira`.
 *
 * **Deliberately not "the fourth feature", and that is the one structural
 * decision in this component.** The running order in this room is the feature
 * presentation, the second feature, the third feature   and continuing to count
 * would do two unwanted things at once. It makes a slate of four read as thin
 * rather than deep, and it narrates a lineage between the third entry and this
 * one, which is precisely the connection the game's own naming decision
 * (`GDD.md` §1.9) exists to avoid drawing.
 *
 * So the eyebrow is a billing position rather than a sequence number. It is the
 * room's own language, and it says the only thing that actually separates this
 * title from the other three: it is the one a reader will be able to buy first.
 *
 * That choice has a useful second property. Because the section carries no
 * number, it can sit third or fourth on this page with no copy change at all,
 * which keeps the studio's decision about what to publish in which order a
 * decision rather than a rewrite.
 *
 * An **announcement**, not the advertisement. It carries the hook, the one
 * drawing, the two ways to play and a link. The pillars, the covenant, the
 * undercover ladder, the audience segments and the ask all live at
 * `/streetlevel`   which is also the only place a reader can honestly be asked
 * for anything, because a section on somebody else's page cannot run a room or
 * a list.
 *
 * Runs plain rather than in a tinted band, keeping this page's alternating
 * rhythm intact against the tinted section above it.
 *
 * Server component. The only client boundary is the drawing, which needs one.
 */
export function FirstOnTheBill() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {/* ---------- THE ANNOUNCEMENT ---------- */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label label-accent">First on the bill</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              {HEADLINE}
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
            The newest thing on the slate, and the first one you will be able to
            buy. Small on purpose, finished on purpose.
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
          <p>{STAKE}</p>
        </WorldDossier>
      </div>

      {/* ---------- THE HOOK ----------
          Immediately under the dossier, because it is the only part of this
          section that would survive being cut to a single screen. */}
      <div className="mt-4 border border-bone/12 bg-ink-raised/70 px-6 py-9 backdrop-blur-sm sm:px-8">
        <Reveal>
          <p className="label label-accent">{THRESHOLD.label}</p>
          <h3 className="mt-4 max-w-xl font-display text-2xl leading-snug text-bone sm:text-3xl">
            {THRESHOLD.heading}
          </h3>
        </Reveal>

        <div className="mt-9">
          <Threshold />
        </div>
      </div>

      {/* ---------- CREW OR BADGE ----------
          The claim on its own   "the police are real players with careers"   is
          the kind of thing every game in this category says. The table is what
          makes it checkable, which is why it is here rather than left to the
          full page. */}
      <div className="mt-16">
        <Reveal>
          <p className="label label-accent">Crew or badge</p>
          <h3 className="mt-4 max-w-2xl font-display text-2xl text-bone sm:text-3xl">
            {WAYS.heading}
          </h3>
          <p className="mt-5 max-w-2xl leading-relaxed text-bone-dim">
            {WAYS.blurb}
          </p>
        </Reveal>

        <div className="mt-8">
          <Comparison columns={["The crew", "The badge"]} rows={WAYS.rows} />
        </div>
      </div>

      {/* ---------- NOT BUILT YET ----------
          Multi-column at every width. Stacked full-bleed, three empty frames
          become three screens of nothing to scroll past. */}
      <div className="mt-16">
        <Reveal>
          <p className="label label-accent">Not built yet</p>
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

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <ThreadLink
          href="/streetlevel"
          className="inline-block border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
        >
          READ THE WHOLE THING →
        </ThreadLink>
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-block border border-bone/15 px-7 py-3.5 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
        >
          JOIN THE ROOM →
        </a>
        {/* Bone, never the live tone. Nothing here is running. */}
        <Stamp tone="bone" rotate={2}>
          {STANDING}
        </Stamp>
      </div>
    </section>
  );
}
