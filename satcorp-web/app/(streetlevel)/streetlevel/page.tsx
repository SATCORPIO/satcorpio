import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import {
  Comparison,
  ProgrammeLine,
  Standing,
} from "@/components/worlds/kira/Programme";
import { FieldNotes } from "@/components/worlds/kira/FieldNotes";
import { Threshold } from "@/components/worlds/kira/Threshold";
import {
  APPARATUS,
  APPARATUS_NOTE,
  BADGE,
  CONTACT_SHEET,
  CONTACT_SHEET_NOTE,
  COVENANT,
  CREW,
  DISCORD,
  FACTS,
  FIELD_NOTES_BLURB,
  FILE,
  LADDER,
  LADDER_CODA,
  PERSISTENCE,
  PITCH,
  POSITIONING,
  ROOM_BLURB,
  SEGMENTS,
  STAKE,
  STANDING as GAME_STANDING,
  THRESHOLD,
  TITLE,
  WAYS,
  WISHLIST_PENDING,
  WORKING_TITLE_NOTE,
} from "@/components/worlds/kira/streetlevel";

/**
 * ESTABLISHMENT 9   STREET LEVEL
 *
 * The full advertisement, in the brief's own recommended order.
 *
 * A linear scroll rather than the dossier-and-folders shape `/relentless` uses,
 * for the reason its sibling page records: an advertisement that asks a reader
 * to open things is an advertisement that does not get read. Every section here
 * is short by instruction.
 *
 * **The thing that makes this page different from the other two Ki-Ra title
 * pages on this site is that it has something to sell.** RELENTLESS is a
 * prototype and the studio's other crime game is in pre-production; both pages
 * plant a position and collect an address. This one is the first title that
 * will ask a stranger for money, which is why the ask at the bottom is a real
 * CTA block with a wishlist slot in it rather than a mailing list with a
 * Discord link beside it.
 *
 * The one departure from the brief's structure is the hero. It asks for a
 * grounded documentary image; none exists, and a placeholder in a hero is
 * weaker than no image at all. So the hero is typographic and the empty frames
 * live at the contact sheet, where their emptiness is the argument. That
 * reverses itself the day there is a capture.
 *
 * A server component throughout. The only client boundaries are the drawing,
 * which needs one, and the forwarding form, which needs one.
 */

export default function StreetLevelPage() {
  return (
    <>
      {/* ---------- THE FILE ---------- */}
      <section className="border-b border-bone/10">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24">
          <div className="flex flex-wrap items-center gap-4">
            {/* Bone, never the live tone. The design is frozen and the spike is
                running; nothing here is playable and a warm stamp would say
                otherwise. */}
            <Stamp tone="bone">{GAME_STANDING}</Stamp>
            <span className="label text-[0.55rem]">
              SATCORP / KI-RA STUDIOS / {FILE}
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.92] text-bone">
            {TITLE}
          </h1>

          {/* The differentiator first and the stake second. Both lines are
              strong; only one of them is unavailable to every competitor in
              this category, and that is the one a reader has to meet first. */}
          <p className="mt-8 max-w-3xl font-display text-xl leading-relaxed text-bone sm:text-2xl">
            {POSITIONING}
          </p>

          <p className="mt-6 max-w-2xl font-display text-lg italic leading-relaxed text-accent">
            {STAKE}
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
        <Reveal>
          <p className="label label-accent">What you actually do</p>
          <div className="mt-6 max-w-3xl space-y-6">
            {PITCH.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-bone-dim">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- THE THRESHOLD ----------
          The hook, and the only section on this page that would survive being
          cut to a single screen. It sits high for that reason. */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">{THRESHOLD.label}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              {THRESHOLD.heading}
            </h2>
          </Reveal>

          <div className="mt-12">
            <Threshold />
          </div>

          <div className="mt-12 grid gap-6 border-t border-bone/10 pt-10 lg:grid-cols-3">
            {THRESHOLD.deep.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-bone-dim">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- THE BADGE ----------
          The differentiator, and the reason this page exists. It follows the
          threshold because the drawing has just explained what an invitation
          inside is worth, which is what the top of this ladder is climbing
          toward. */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label label-accent">{BADGE.label}</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
                {BADGE.heading}
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              Not a mode you switch into. A second career, with a ladder nobody
              can buy their way up.
            </p>
          </div>

          <div className="mt-8 max-w-3xl space-y-6">
            {BADGE.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-bone-dim">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <p className="label label-accent">Undercover, in three tiers</p>
          </Reveal>
          <ol className="mt-8">
            {BADGE.ladder.map(([index, title, note, meta]) => (
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

        <div className="mt-10 grid gap-8 border-t border-bone/10 pt-10 lg:grid-cols-2">
          <p className="font-display text-lg italic leading-relaxed text-accent">
            {BADGE.coda}
          </p>
          <p className="leading-relaxed text-bone-dim">{BADGE.burn}</p>
        </div>
      </section>

      {/* ---------- CREW OR BADGE ---------- */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">Crew or badge</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
              {WAYS.heading}
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
              {WAYS.blurb}
            </p>
          </Reveal>

          <div className="mt-10">
            <Comparison
              columns={["The crew", "The badge"]}
              rows={WAYS.rows}
            />
          </div>
        </div>
      </section>

      {/* ---------- THE CREW ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">{CREW.label}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
            {CREW.heading}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {CREW.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-bone-dim">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="mt-10 max-w-2xl border-t border-bone/10 pt-8 font-display text-lg italic leading-relaxed text-accent">
          {CREW.coda}
        </p>
      </section>

      {/* ---------- NOTHING RESETS ----------
          Kept deliberately short. It is a promise rather than a system, and a
          promise that takes three paragraphs to make stops sounding like one. */}
      <section className="border-y border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <p className="label label-accent">{PERSISTENCE.label}</p>
            <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
              {PERSISTENCE.heading}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bone-dim">
              {PERSISTENCE.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHERE YOU ARE COMING FROM ----------
          Written to be read in any order: a reader recognises one card, reads
          that one, and skips the rest. */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Where you are coming from</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
            Four ways in, and a system at the end of each.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SEGMENTS.map((segment) => (
            <li
              key={segment.from}
              className="border border-bone/12 bg-ink-raised/70 p-7 backdrop-blur-sm transition-colors hover:border-accent/45"
            >
              <p className="label label-accent text-[0.55rem]">
                {segment.from}
              </p>
              <p className="mt-5 font-display text-lg leading-snug text-bone">
                {segment.want}
              </p>
              <p className="mt-5 border-t border-bone/10 pt-5 leading-relaxed text-bone-dim">
                {segment.answer}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- THE COVENANT ---------- */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">What we are not selling you</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              Five things, decided already.
            </h2>
            <p className="mt-6 max-w-2xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
              Cheap to write today and expensive to break later, which is the
              only reason a list like this is worth anything.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-px sm:grid-cols-2">
            {COVENANT.map((line) => (
              <li
                key={line}
                className="border border-bone/10 bg-ink/40 p-7 font-display text-lg leading-relaxed text-bone"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- NOTHING TO SHOW YET ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Nothing to show yet</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-bone-dim">
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
              stamp={file === "SL-025" ? "NO CAPTURE YET" : "NOT BUILT YET"}
              tone="accent"
            />
          ))}
        </div>
      </section>

      {/* ---------- STANDING ---------- */}
      <section className="border-y border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">Standing</p>
            <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
              {GAME_STANDING}
            </h2>
          </Reveal>

          <Standing items={LADDER} className="mt-10" />

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <p className="max-w-xl font-display text-lg italic leading-relaxed text-bone-dim">
              {LADDER_CODA}
            </p>
            <Stamp tone="bone" rotate={2}>
              NO DATE
            </Stamp>
          </div>

          {/* ---------- THE APPARATUS ---------- */}
          <div className="mt-16">
            <Reveal>
              <p className="label label-accent">The apparatus</p>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {APPARATUS.map((item) => (
                <li
                  key={item}
                  className="border border-bone/15 px-4 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-bone-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-3xl leading-relaxed text-bone-dim">
              {APPARATUS_NOTE}
            </p>
          </div>

          {/* The name, said out loud rather than discovered at a storefront. */}
          <p className="mt-16 border-t border-bone/10 pt-8 font-mono text-[0.68rem] leading-relaxed text-bone-dim/70">
            {WORKING_TITLE_NOTE}
          </p>
        </div>
      </section>

      {/* ---------- THE ASK ----------
          Two actions at equal weight, which is a deliberate departure from the
          pattern the other title pages on this site use. Community building is
          one of three stated purposes of this product rather than a courtesy
          extended to a mailing list, so the room is a peer here and not a
          ghost link under a heavier button.

          The wishlist slot is built and told the truth. It pre-sells the
          action, it proves the covenant on the same screen, and it means the
          day a store page exists this is a string and an href rather than a
          layout change. */}
      <section
        id="the-ask"
        className="scroll-mt-[var(--chrome-h)] bg-ink-raised/25"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">The ask</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              Two ways to be here early. Neither of them costs anything.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px lg:grid-cols-2">
            {/* The room. First on the page, and at full weight. */}
            <div className="flex flex-col justify-between border border-bone/12 bg-ink/40 p-8">
              <div>
                <p className="label label-accent text-[0.55rem]">The room</p>
                <h3 className="mt-4 font-display text-2xl text-bone">
                  Come and argue about it.
                </h3>
                <p className="mt-5 leading-relaxed text-bone-dim">
                  {ROOM_BLURB}
                </p>
              </div>
              <a
                href={DISCORD}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-10 inline-block self-start border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink"
              >
                JOIN THE ROOM →
              </a>
            </div>

            {/* The wishlist slot. Present, and honest about being empty. */}
            <div className="flex flex-col justify-between border border-dashed border-bone/15 bg-ink/40 p-8">
              <div>
                <p className="label text-[0.55rem]">The store page</p>
                <h3 className="mt-4 font-display text-2xl text-bone/65">
                  Wishlist on Steam.
                </h3>
                <p className="mt-5 leading-relaxed text-bone-dim">
                  {WISHLIST_PENDING}
                </p>
              </div>
              <div className="mt-10">
                <Stamp tone="bone" rotate={-1.5}>
                  NOT YET LISTED
                </Stamp>
              </div>
            </div>
          </div>

          {/* ---------- FIELD NOTES ---------- */}
          <div className="mt-16 grid gap-12 border-t border-bone/10 pt-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="label label-accent">Field notes</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-bone sm:text-4xl">
                Or leave a forwarding address.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-bone-dim">
                {FIELD_NOTES_BLURB}
              </p>
            </Reveal>

            {/* The list id is load-bearing: it is what gets written into the
                stored consent record as the scope this reader agreed to. */}
            <FieldNotes list="streetlevel" />
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
