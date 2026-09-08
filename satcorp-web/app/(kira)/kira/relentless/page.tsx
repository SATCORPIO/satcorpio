import type { Metadata } from "next";
import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Placeholder } from "@/components/system/Placeholder";
import { Reveal } from "@/components/system/Reveal";
import {
  Comparison,
  ProgrammeLine,
  Standing,
} from "@/components/worlds/kira/Programme";
import { CycleClock } from "@/components/worlds/kira/CycleClock";
import { FieldNotes } from "@/components/worlds/kira/FieldNotes";
import {
  APPARATUS,
  APPARATUS_NOTE,
  COMPARISON,
  CONTACT_SHEET,
  COVENANT,
  CYCLE,
  DISCORD,
  FACTIONS,
  FACTIONS_NOTE,
  FACTS,
  FAMILIES,
  FILE,
  HOUSE_RULES,
  LADDER,
  LADDER_CODA,
  POSITIONING,
  PREMISE,
  STANDING,
  TITLE,
} from "@/components/worlds/kira/relentless";

/**
 * THE FULL BRIEF   `/kira/relentless`
 *
 * `/kira` announces the title. This is where an interested reader is taken
 * seriously: the mechanic in full, the commitments, who is on the planet, what
 * comes out of it, and the one thing the studio actually wants — an address.
 *
 * A sub-route rather than a seventh establishment. The six-establishment
 * doctrine is the site's spine and a game is a title, not a division; putting
 * this under `/kira` also means `divisionFromPath` resolves it to Ki-Ra, so the
 * accent, the cursor, the scroll weight and the file-tab all stay where they
 * belong with no new wiring.
 *
 * No 3D. The Screening Room belongs to `/kira` and one room per establishment
 * is the rule — a second projector on a sub-page would be a different room in
 * the same building. What this page has instead is the clock, and the clock is
 * the only thing on it that needed to move.
 */

export const metadata: Metadata = {
  title: `${TITLE}   Ki-Ra Studios`,
  description:
    "A mobile 4X survival strategy game where the world escalates against every outpost on a clock, and the map keeps what the sector held.",
};

export default function RelentlessPage() {
  return (
    <>
      {/* ---------- ADVANCE NOTICE ---------- */}
      <section className="border-b border-bone/10">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24">
          <div className="flex flex-wrap items-center gap-4">
            <Stamp tone="accent">ADVANCE NOTICE</Stamp>
            <span className="label text-[0.55rem]">
              SATCORP / KI-RA STUDIOS / {FILE}
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.95] text-bone">
            {TITLE}
          </h1>

          <p className="mt-7 max-w-2xl font-display text-lg italic leading-relaxed text-accent">
            {POSITIONING}
          </p>

          <p className="mt-7 max-w-2xl leading-relaxed text-bone-dim">
            {PREMISE}
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

      {/* ---------- THE CYCLE ----------
          The one section that would survive if the rest of the page were cut. */}
      <section className="border-b border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">{CYCLE.label}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              {CYCLE.heading}
            </h2>
          </Reveal>

          <div className="mt-12">
            <CycleClock />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <ol className="space-y-6">
              {CYCLE.beats.map(([index, beat]) => (
                <li
                  key={index}
                  className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4 border-t border-bone/10 pt-5"
                >
                  <span className="font-mono text-[0.64rem] text-accent/70">
                    {index}
                  </span>
                  <span className="font-display text-lg leading-snug text-bone">
                    {beat}
                  </span>
                </li>
              ))}
            </ol>

            <div className="space-y-6">
              {CYCLE.deep.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-bone-dim">
                  {paragraph}
                </p>
              ))}
              <p className="border-t border-bone/10 pt-6 font-display text-xl italic leading-relaxed text-accent">
                {CYCLE.coda}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HOUSE RULES ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label label-accent">House rules</p>
              <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                Five, and they are ranked.
              </h2>
            </div>
            <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              When two of them disagree, the lower number wins. Pillars that
              cannot be ranked do not settle arguments.
            </p>
          </div>
        </Reveal>

        <ol className="mt-12">
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
      </section>

      {/* ---------- THE COVENANT ----------
          Anti-goals, published. Every line is a decision already taken, which
          is the only reason it is safe to print. The first one is a promise
          about advertising, made in a category where that promise is unusual
          enough to be worth more than any feature on the page. */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">What we will not do</p>
            <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
              Hold us to these. They are cheap to say today and expensive to
              break later, which is precisely what makes them worth writing
              down.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-px sm:grid-cols-2">
            {COVENANT.map((line) => (
              <li
                key={line}
                className="border border-bone/10 bg-ink-raised/60 p-7 font-display text-lg leading-relaxed text-bone"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- TWO OBJECTS, ONE WORLD ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">{COMPARISON.heading}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
            {COMPARISON.blurb}
          </p>
        </Reveal>

        <div className="mt-10">
          <Comparison columns={["NAMTAR", TITLE]} rows={COMPARISON.rows} />
        </div>

        <ThreadLink
          href="/namtar"
          className="mt-10 inline-block border border-bone/15 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
        >
          ARRANGE PASSAGE TO NAMTAR →
        </ThreadLink>
      </section>

      {/* ---------- THE SURVIVORS ----------
          Four factions, presented by role. The names are withheld until
          clearance returns, and on this site that reads as intent rather than
          as a gap   which is the one advantage of a house style built out of
          redaction bars. */}
      <section className="border-y border-bone/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label label-accent">The survivors</p>
                <h2 className="mt-4 font-display text-3xl text-bone sm:text-4xl">
                  Four factions. None of them is the good one.
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[0.68rem] leading-relaxed text-bone-dim">
                Each is right about something and wrong about something, and the
                player is never asked to settle it.
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {FACTIONS.map((faction) => (
              <li
                key={faction.role}
                className="border border-bone/12 bg-ink-raised/70 p-7 backdrop-blur-sm transition-colors hover:border-accent/45"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* The bar carries no text underneath it. The site's usual
                      redaction keeps the real words in the DOM and reveals them
                      on hover, which is right everywhere else and wrong here:
                      a redaction that leaks what counsel asked us to hold is
                      not a redaction. */}
                  <span
                    role="img"
                    aria-label="Name withheld pending clearance"
                    className="mt-1 inline-block h-5 w-36 bg-bone/80"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.06)",
                    }}
                  />
                  <span className="label text-[0.52rem] text-accent">
                    {faction.role}
                  </span>
                </div>

                <p className="mt-6 leading-relaxed text-bone-dim">
                  {faction.character}
                </p>

                <dl className="mt-7 space-y-4 border-t border-bone/10 pt-6">
                  {[
                    ["Silhouette", faction.silhouette],
                    ["Materials", faction.materials],
                    ["Insignia", faction.mark],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="label text-[0.5rem]">{label}</dt>
                      <dd className="mt-1 font-mono text-[0.7rem] leading-relaxed text-bone">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl font-mono text-[0.68rem] leading-relaxed text-bone-dim/70">
            {FACTIONS_NOTE}
          </p>
        </div>
      </section>

      {/* ---------- WHAT IS OUT THERE ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">What is out there</p>
          <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            Three families. Only one of them is meant to frighten you, and it is
            used sparingly enough to keep working.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-px lg:grid-cols-3">
          {FAMILIES.map(([name, what, reads]) => (
            <li
              key={name}
              className="border border-bone/10 bg-ink-raised p-7"
            >
              <h3 className="font-display text-2xl text-bone">{name}</h3>
              <p className="mt-4 font-mono text-[0.7rem] leading-relaxed text-accent/85">
                {what}
              </p>
              <p className="mt-4 font-display text-base italic leading-relaxed text-bone-dim">
                {reads}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- THE APPARATUS ---------- */}
      <section className="border-y border-bone/10 bg-ink-raised/25">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="label label-accent">The apparatus</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
              The client draws. The server decides.
            </h2>
          </Reveal>

          <ul className="mt-10 flex flex-wrap gap-2">
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

      {/* ---------- STANDING ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">Standing</p>
        </Reveal>

        <Standing items={LADDER} className="mt-10" />

        <p className="mt-8 font-display text-xl italic text-bone-dim">
          {LADDER_CODA}
        </p>
      </section>

      {/* ---------- CONTACT SHEET ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <p className="label label-accent">Contact sheet</p>
          <p className="mt-4 max-w-xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            Nothing has been shot yet. When it has, it goes here   and not one
            frame of it will be something the game cannot do.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-px lg:grid-cols-3">
          {CONTACT_SHEET.map(([label, file]) => (
            <Placeholder
              key={file}
              label={label}
              file={file}
              aspect="4 / 3"
              stamp="UNRELEASED"
              tone="accent"
            />
          ))}
        </div>
      </section>

      {/* ---------- FIELD NOTES ----------
          The whole of the ask. Nothing to install, nothing to pre-order   only
          permission to say something later. */}
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
                Development notes from the prototype, sent when there is
                something worth sending and not on a schedule invented to look
                busy. No countdown, no pre-order, and nothing to install for a
                long while yet.
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

            <FieldNotes />
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
            {TITLE} · {STANDING} · Powered by SATCORP.
          </p>
        </div>
      </section>
    </>
  );
}
