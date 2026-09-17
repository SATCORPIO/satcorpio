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
import { DossierCards, type DossierCard } from "@/components/worlds/kira/DossierCards";
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
 * THE FULL BRIEF   `/relentless`
 *
 * Its own tab now, not a sub-route of `/kira`: reachable in one click instead
 * of a scroll and a click-through. It keeps Ki-Ra's accent and is still
 * introduced from `/kira` as the second feature   this is where it lives
 * once a reader is actually interested.
 *
 * The page is two things, deliberately not one long scroll: the dossier
 * (the hero, read in the first few seconds), and the file underneath it, in
 * folders a reader opens only if they want that specific piece. The dossier
 * is the pitch; the folders are the depth. See `DossierCards`.
 */

export default function RelentlessPage() {
  const cards: DossierCard[] = [
    {
      id: "cycle",
      eyebrow: CYCLE.label,
      title: CYCLE.heading,
      teaser:
        "Every sector carries a threat reading that climbs with everything built on it. There is no boss here, and no war to win.",
      content: (
        <>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <ol className="space-y-5">
              {CYCLE.beats.map(([index, beat]) => (
                <li
                  key={index}
                  className="grid grid-cols-[2rem_1fr] items-baseline gap-x-4"
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
            <CycleClock />
          </div>
          <div className="mt-9 space-y-6 border-t border-bone/10 pt-7">
            {CYCLE.deep.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-bone-dim">
                {paragraph}
              </p>
            ))}
            <p className="font-display text-xl italic leading-relaxed text-accent">
              {CYCLE.coda}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "house-rules",
      eyebrow: "House rules",
      title: "Five, and they are ranked.",
      teaser:
        "When two of them disagree, the lower number wins. Pillars that cannot be ranked do not settle arguments.",
      content: (
        <ol>
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
      ),
    },
    {
      id: "covenant",
      eyebrow: "What we will not do",
      title: "The Covenant.",
      teaser:
        "Anti-goals, published. Cheap to say today and expensive to break later, which is what makes them worth writing down.",
      content: (
        <ul className="grid gap-px sm:grid-cols-2">
          {COVENANT.map((line) => (
            <li
              key={line}
              className="border border-bone/10 bg-ink/40 p-7 font-display text-lg leading-relaxed text-bone"
            >
              {line}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "comparison",
      eyebrow: COMPARISON.heading,
      title: "Two objects, one world.",
      teaser: COMPARISON.blurb,
      content: (
        <>
          <p className="max-w-2xl leading-relaxed text-bone-dim">
            {COMPARISON.blurb}
          </p>
          <div className="mt-8">
            <Comparison columns={["NAMTAR", TITLE]} rows={COMPARISON.rows} />
          </div>
          <ThreadLink
            href="/namtar"
            className="mt-8 inline-block border border-bone/15 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:border-accent hover:text-bone"
          >
            ARRANGE PASSAGE TO NAMTAR →
          </ThreadLink>
        </>
      ),
    },
    {
      id: "survivors",
      eyebrow: "The survivors",
      title: "Four factions. None of them is the good one.",
      teaser:
        "Each is right about something and wrong about something, and the player is never asked to settle it.",
      content: (
        <>
          <ul className="grid gap-4 sm:grid-cols-2">
            {FACTIONS.map((faction) => (
              <li
                key={faction.role}
                className="border border-bone/12 bg-ink/40 p-7 backdrop-blur-sm transition-colors hover:border-accent/45"
              >
                <div className="flex items-start justify-between gap-4">
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
        </>
      ),
    },
    {
      id: "families",
      eyebrow: "What is out there",
      title: "Three families.",
      teaser:
        "Only one of them is meant to frighten you, and it is used sparingly enough to keep working.",
      content: (
        <ul className="grid gap-px lg:grid-cols-3">
          {FAMILIES.map(([name, what, reads]) => (
            <li key={name} className="border border-bone/10 bg-ink/40 p-7">
              <h4 className="font-display text-2xl text-bone">{name}</h4>
              <p className="mt-4 font-mono text-[0.7rem] leading-relaxed text-accent/85">
                {what}
              </p>
              <p className="mt-4 font-display text-base italic leading-relaxed text-bone-dim">
                {reads}
              </p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "apparatus",
      eyebrow: "The apparatus",
      title: "The client draws. The server decides.",
      teaser: APPARATUS_NOTE,
      content: (
        <>
          <ul className="flex flex-wrap gap-2">
            {APPARATUS.map((item) => (
              <li
                key={item}
                className="border border-bone/15 px-4 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-bone-dim"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl leading-relaxed text-bone-dim">
            {APPARATUS_NOTE}
          </p>
        </>
      ),
    },
    {
      id: "standing",
      eyebrow: "Standing",
      title: STANDING,
      teaser: LADDER_CODA,
      content: (
        <>
          <Standing items={LADDER} />
          <p className="mt-8 font-display text-xl italic text-bone-dim">
            {LADDER_CODA}
          </p>
        </>
      ),
    },
    {
      id: "contact-sheet",
      eyebrow: "Contact sheet",
      title: "Reconnaissance from a world that does not exist yet.",
      teaser:
        "Nothing has been shot yet. When it has, it goes here   and not one frame of it will be something the game cannot do.",
      content: (
        <div className="grid grid-cols-2 gap-px lg:grid-cols-3">
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
      ),
    },
  ];

  return (
    <>
      {/* ---------- THE DOSSIER ---------- */}
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

      {/* ---------- THE FILE, IN FULL ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="label label-accent">The file, in full</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-bone sm:text-4xl">
            Nine folders. Open the ones you want.
          </h2>
        </Reveal>

        <div className="mt-12">
          <DossierCards cards={cards} />
        </div>
      </section>

      {/* ---------- FIELD NOTES ----------
          The whole of the ask. Nothing to install, nothing to pre-order   only
          permission to say something later. Stays outside the folders: the
          one action on this page that should never be a click away from a
          click away. */}
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
