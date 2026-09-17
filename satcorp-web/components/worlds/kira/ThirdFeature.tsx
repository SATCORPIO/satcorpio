import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import { Comparison, WorldDossier } from "./Programme";
import { ProofLine } from "./ProofLine";
import {
  DISCORD,
  EVIDENCE,
  FACTS,
  FANTASY,
  FILE,
  FRAMES,
  HEADLINE,
  PROFESSIONS,
  STANDING,
  TITLE,
} from "./forfeiture";

/**
 * THE THIRD FEATURE   FORFEITURE's announcement on `/kira`.
 *
 * The studio's slate is three titles now, and a screening room that shows two
 * of them is under-selling itself. It sits where the room's own running order
 * puts it: the feature presentation, the second feature, then this.
 *
 * An **announcement**, not a brief. It carries the hook, the one drawing, the
 * two professions, and a link. The pillars, the covenant, the audience
 * segments and the standing ladder are deliberately not here   they live at
 * `/forfeiture`, which is also the only place a reader can honestly be asked
 * for something, because a section on somebody else's page cannot run a
 * forwarding list.
 *
 * One thing this section must not do, and the reason it is written tightly:
 * `/kira` already introduces two titles that share a planet. FORFEITURE shares
 * nothing with them but a studio, so the section borrows none of NAMTAR's
 * visual language   no planet, no orange, no clock   and leads with the one
 * sentence that could not possibly belong to either of them.
 *
 * Server component. The only client boundary is the drawing, which needs one.
 */
export function ThirdFeature() {
  return (
    <section className="border-y border-bone/10 bg-ink-raised/25">
      <div className="mx-auto max-w-6xl px-6 py-24">
        {/* ---------- THE ANNOUNCEMENT ---------- */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label label-accent">The third feature</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
                {HEADLINE}
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              A different picture entirely. No planet, no salvage, no clock. A
              city, this century, and the paperwork that follows you out of it.
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
            <p>{FANTASY}</p>
          </WorldDossier>
        </div>

        {/* ---------- THE HOOK ----------
            Immediately under the dossier, because it is the only part of this
            section that would survive being cut to a single screen. */}
        <div className="mt-4 border border-bone/12 bg-ink/45 px-6 py-9 backdrop-blur-sm sm:px-8">
          <Reveal>
            <p className="label label-accent">{EVIDENCE.label}</p>
            <h3 className="mt-4 max-w-xl font-display text-2xl leading-snug text-bone sm:text-3xl">
              {EVIDENCE.heading}
            </h3>
          </Reveal>

          <div className="mt-9">
            <ProofLine />
          </div>
        </div>

        {/* ---------- TWO PROFESSIONS ----------
            The moat, made concrete, and left to speak for itself. The claim
            stated in prose   "police is a real profession"   is the kind of
            thing every game in this space says; the table is what makes it
            checkable, so the table is all this section needs. */}
        <div className="mt-16">
          <Reveal>
            <p className="label label-accent">Two professions</p>
            <h3 className="mt-4 font-display text-2xl text-bone sm:text-3xl">
              {PROFESSIONS.heading}
            </h3>
            <p className="mt-5 max-w-2xl leading-relaxed text-bone-dim">
              {PROFESSIONS.blurb}
            </p>
          </Reveal>

          <div className="mt-8">
            <Comparison
              columns={["The criminal", "The detective"]}
              rows={PROFESSIONS.rows}
            />
          </div>
        </div>

        {/* ---------- NOTHING SHOT YET ----------
            Multi-column at every width. Stacked full-bleed, three empty frames
            become three screens of nothing to scroll past. */}
        <div className="mt-16">
          <Reveal>
            <p className="label label-accent">Nothing shot yet</p>
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
            href="/forfeiture"
            className="inline-block border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            OPEN THE CASE FILE →
          </ThreadLink>
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-block border border-bone/15 px-7 py-3.5 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
          >
            ASK IN THE ROOM →
          </a>
          {/* Bone, never the live tone. Nothing here is running. */}
          <Stamp tone="bone" rotate={2}>
            {STANDING}
          </Stamp>
        </div>
      </div>
    </section>
  );
}
