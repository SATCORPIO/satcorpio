import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import { Comparison, ProgrammeLine, Standing } from "@/components/worlds/kira/Programme";
import { FieldNotes } from "@/components/worlds/kira/FieldNotes";
import { ProofLine } from "@/components/worlds/kira/ProofLine";
import {
  APPARATUS,
  APPARATUS_NOTE,
  CHRONICLE,
  CONTACT_SHEET,
  CONTACT_SHEET_NOTE,
  DISCORD,
  EVIDENCE,
  FACTS,
  FANTASY,
  FANTASY_CODA,
  FIELD_NOTES_BLURB,
  FILE,
  LADDER,
  LADDER_CODA,
  MOAT,
  MOAT_BODY,
  ONE_LINER,
  PILLARS,
  PROFESSIONS,
  SEGMENTS,
  STANDING as GAME_STANDING,
  TITLE,
} from "@/components/worlds/kira/forfeiture";

/**
 * ESTABLISHMENT 8   FORFEITURE, THE OPEN CASE FILE
 *
 * The full advertisement, in the marketing brief's own recommended order.
 *
 * Deliberately a linear scroll rather than the dossier-and-folders shape the
 * RELENTLESS brief uses one route over. That shape is right for a prototype's
 * design philosophy, where nine deep sections are offered to a reader who has
 * already decided to care. It is wrong for an advertisement: an ad that asks
 * the reader to open things is an ad that does not get read. Every section
 * here is short by instruction   this is proof, not a manual.
 *
 * The one departure from the brief's structure is the hero. It asks for a
 * single grounded, documentary-style image, and none exists. A placeholder in
 * a hero is weaker than no image at all, so the hero is typographic and the
 * empty frames live further down, where their emptiness is the point. That
 * reverses itself the day there is a photograph.
 *
 * A server component throughout. The only client boundaries are the drawing,
 * which needs one, and the forwarding form, which needs one.
 */

export default function ForfeiturePage() {
  return (
    <>
      {/* ---------- THE CASE FILE ---------- */}
      <section className="border-b border-bone/10">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24">
          <div className="flex flex-wrap items-center gap-4">
            {/* Bone, not the accent and never the live tone: nothing about
                this game is running, and a warm stamp would say otherwise. */}
            <Stamp tone="bone">{GAME_STANDING}</Stamp>
            <span className="label text-[0.55rem]">
              SATCORP / KI-RA STUDIOS / {FILE}
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.92] text-bone">
            {TITLE}
          </h1>

          <p className="mt-8 max-w-3xl font-display text-xl leading-relaxed text-bone sm:text-2xl">
            {ONE_LINER}
          </p>

          {/* The moat, above the fold. It is the one sentence on this page a
              reader can repeat to somebody else, which makes it the one
              sentence that cannot be scrolled past. */}
          <p className="mt-8 max-w-2xl font-display text-lg italic leading-relaxed text-accent">
            {MOAT}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-bone/10 pt-8 sm:grid-cols-4">
            {FACTS.map(([label, value]) => (
              <div key={label}>
                <dt className="label text-[0.52rem]">{label}</dt>
                <dd className="mt-1.5 font-mono text-[0.74rem] text-bone">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- THE PITCH ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="label label-accent">The pitch</p>
            <h2 className="mt-4 max-w-md font-display text-3xl leading-tight text-bone sm:text-4xl">
              {FANTASY_CODA}
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-bone-dim">
              {FANTASY}
            </p>
          </Reveal>

          <Reveal>
            <div className="border border-bone/12 bg-ink-raised/70 p-8 backdrop-blur-sm">
              <p className="label label-accent text-[0.55rem]">
                The one thing nobody else can say
              </p>
              <p className="mt-6 font-display text-2xl leading-snug text-bone">
                {MOAT}
              </p>
              <p className="mt-6 leading-relaxed text-bone-dim">{MOAT_BODY}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- HEAT AND PROOF ----------
          The differentiator, drawn. Given a tinted band and the page's one
          bespoke visual because it is the only section here that would survive
          being cut down to a single screen. */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">{EVIDENCE.label}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              {EVIDENCE.heading}
            </h2>
          </Reveal>

          <div className="mt-12">
            <ProofLine />
          </div>

          <div className="mt-12 grid gap-8 border-t border-bone/10 pt-10 lg:grid-cols-3">
            {EVIDENCE.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-bone-dim">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TWO GAMES, ONE WORLD ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Two professions</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
            {PROFESSIONS.heading}
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
            {PROFESSIONS.blurb}
          </p>
        </Reveal>

        <div className="mt-10">
          <Comparison
            columns={["The criminal", "The detective"]}
            rows={PROFESSIONS.rows}
          />
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label label-accent">How it works</p>
                <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                  The four systems this rests on.
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
                Each of these is designed and written down. None of them is
                built yet, and the page says so further down.
              </p>
            </div>
          </Reveal>

          <ol className="mt-12">
            {PILLARS.map(([index, title, note, meta]) => (
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
      </section>

      {/* ---------- A CITY THAT REMEMBERS ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="label label-accent">{CHRONICLE.label}</p>
            <h2 className="mt-4 max-w-sm font-display text-3xl leading-tight text-bone sm:text-4xl">
              {CHRONICLE.heading}
            </h2>
          </Reveal>

          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-bone-dim">
              {CHRONICLE.body}
            </p>
            {/* The honest half, given its own frame rather than buried in the
                paragraph above it. A promise that admits what it has not done
                yet is the only kind worth publishing from pre-production. */}
            <p className="mt-8 max-w-2xl border-l-2 border-accent/50 pl-6 font-display text-lg italic leading-relaxed text-bone">
              {CHRONICLE.caveat}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHERE YOU'RE COMING FROM ----------
          Written to be read in any order: a reader recognises one card, reads
          that one, and skips the rest. That is the block doing the conversion
          work, so every answer is a system rather than a reassurance. */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div>
          <Reveal>
            <p className="label label-accent">Where you&rsquo;re coming from</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              You have probably played something close to this. Here is what it
              was missing.
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SEGMENTS.map((segment) => (
              <li
                key={segment.from}
                className="flex flex-col border border-bone/12 bg-ink/40 p-7 backdrop-blur-sm transition-colors hover:border-accent/45"
              >
                <p className="label label-accent text-[0.55rem]">
                  {segment.from}
                </p>
                <p className="mt-5 font-display text-lg italic leading-relaxed text-bone-dim">
                  {segment.want}
                </p>
                <p className="mt-6 flex-1 border-t border-bone/10 pt-6 leading-relaxed text-bone">
                  {segment.answer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- NOTHING SHOT YET ----------
          Six designed frames rather than six apologies, and the stamps say what
          is actually true instead of teasing something that is not. The empty
          frames are the page's no-fake-footage position, stated by being the
          case rather than by being announced a section earlier. */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">Nothing shot yet</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-bone-dim">
              {CONTACT_SHEET_NOTE}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-px lg:grid-cols-3">
            {CONTACT_SHEET.map(([label, file]) => (
              <Placeholder
                key={file}
                label={label}
                file={file}
                aspect="4 / 3"
                stamp="NOTHING SHOT YET"
                tone="accent"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STANDING ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Standing</p>
          <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
            Where this actually is.
          </h2>
        </Reveal>

        <Standing items={LADDER} className="mt-10" />

        <p className="mt-8 max-w-2xl font-display text-xl italic leading-relaxed text-bone-dim">
          {LADDER_CODA}
        </p>

        <div className="mt-16">
          <Reveal>
            <p className="label label-accent">The apparatus</p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-2">
            {APPARATUS.map((item) => (
              <li
                key={item}
                className="border border-bone/15 px-4 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl leading-relaxed text-bone-dim">
            {APPARATUS_NOTE}
          </p>
        </div>
      </section>

      {/* ---------- FIELD NOTES ----------
          The whole of the ask. There is no store page, no pre-order and no
          date, so the only thing worth collecting is permission to say
          something later. */}
      <section
        id="field-notes"
        className="scroll-mt-[var(--chrome-h)] border-t border-bone/10 bg-ink-raised/25"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="label label-accent">Field notes</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
                Leave a forwarding address.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-bone-dim">
                {FIELD_NOTES_BLURB}
              </p>

              <a
                href={DISCORD}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-10 inline-block border border-bone/15 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
              >
                OR ASK IN THE ROOM →
              </a>
            </Reveal>

            {/* The list id is load-bearing: it is what gets written into the
                stored consent record as the scope this reader agreed to. */}
            <FieldNotes list="forfeiture" />
          </div>
        </div>
      </section>

      {/* ---------- BACK TO THE PROGRAMME ---------- */}
      <section className="border-t border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <ThreadLink
            href="/kira"
            className="inline-block border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            ← BACK TO THE PROGRAMME
          </ThreadLink>

          <p className="label mt-12 text-[0.55rem]">
            {TITLE} · {GAME_STANDING} · Powered by SATCORP.
          </p>
        </div>
      </section>
    </>
  );
}
