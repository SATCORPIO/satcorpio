import type { ReactNode } from "react";

/**
 * Ki-Ra's layout unit is a line in a screening programme: a running number,
 * a title, and a note in the margin. Old-world cinema stationery, holding
 * entirely modern game-development content.
 */
export function ProgrammeLine({
  index,
  title,
  note,
  meta,
}: {
  index: string;
  title: string;
  note?: string;
  meta?: string;
}) {
  return (
    <li className="group grid items-baseline gap-x-6 gap-y-1 border-t border-bone/10 py-5 transition-colors last:border-b hover:bg-bone/[0.03] sm:grid-cols-[3.5rem_1fr_auto]">
      <span className="font-mono text-[0.64rem] text-accent/70">{index}</span>
      <span>
        <span className="font-display text-xl text-bone">{title}</span>
        {note && (
          <span className="mt-1 block font-mono text-[0.68rem] leading-relaxed text-bone-dim">
            {note}
          </span>
        )}
      </span>
      {meta && (
        <span className="font-mono text-[0.58rem] tracking-[0.2em] text-bone-dim/55">
          {meta}
        </span>
      )}
    </li>
  );
}

/**
 * A world, presented the way a fixer presents a destination: designation,
 * standing, and what you should expect when you arrive.
 */
export function WorldDossier({
  designation,
  title,
  standing,
  children,
  facts,
}: {
  designation: string;
  title: string;
  standing: string;
  children: ReactNode;
  facts: [string, string][];
}) {
  return (
    <article className="border border-bone/12 bg-ink-raised/70 backdrop-blur-sm">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-accent/25 px-6 py-3 sm:px-8">
        <span className="font-mono text-[0.58rem] tracking-[0.22em] text-accent/80">
          {designation}
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.22em] text-bone-dim/60">
          {standing}
        </span>
      </header>

      <div className="px-6 py-8 sm:px-8">
        <h3 className="font-display text-[clamp(2rem,6vw,4rem)] leading-none text-bone">
          {title}
        </h3>
        <div className="mt-5 max-w-2xl leading-relaxed text-bone-dim">
          {children}
        </div>

        <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-bone/10 pt-7 sm:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="label text-[0.52rem]">{label}</dt>
              <dd className="mt-1.5 font-mono text-[0.74rem] text-bone">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/**
 * Two entries in the programme, set against each other.
 *
 * A real <table> at sm and above, because the row-and-column relationship is
 * the meaning here rather than the styling — and it is the only element that
 * lets a screen reader say "Form: open-world survival" instead of reading two
 * disconnected lists. Below sm the same rows become a stack of pairs; see the
 * note in the body for why that is worth two renderings.
 *
 * The second column is the one being introduced, and it carries the accent.
 */
export function Comparison({
  columns,
  rows,
}: {
  columns: [string, string];
  rows: readonly (readonly [string, string, string])[];
}) {
  return (
    <>
      {/* Below sm the table would have to scroll sideways, which puts the
          second column — the entire point of the comparison — off the edge of a
          phone behind a scrollbar most readers will not use. This is the one
          block on the page that cannot afford to be half-read, so on small
          screens it stops being a table and becomes a stack of pairs.

          Only one of the two is ever in the accessibility tree: `hidden` is
          `display: none`, so nothing is announced twice. */}
      <dl className="sm:hidden">
        {rows.map(([aspect, left, right]) => (
          <div
            key={aspect}
            className="grid grid-cols-2 gap-x-4 border-b border-bone/10 py-5"
          >
            <dt className="label col-span-2 mb-3 text-[0.52rem]">{aspect}</dt>
            <dd>
              <span className="label block text-[0.48rem]">{columns[0]}</span>
              <span className="mt-1.5 block font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                {left}
              </span>
            </dd>
            <dd>
              <span className="label block text-[0.48rem] text-accent">
                {columns[1]}
              </span>
              <span className="mt-1.5 block font-mono text-[0.72rem] leading-relaxed text-bone">
                {right}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-accent/25">
              <th className="label py-3 pr-6 text-[0.52rem] font-normal">
                <span className="sr-only">Aspect</span>
              </th>
              <th className="label py-3 pr-6 text-[0.52rem] font-normal">
                {columns[0]}
              </th>
              <th className="label py-3 text-[0.52rem] font-normal text-accent">
                {columns[1]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([aspect, left, right]) => (
              <tr key={aspect} className="border-b border-bone/10">
                <th
                  scope="row"
                  className="label py-4 pr-6 align-top text-[0.52rem] font-normal"
                >
                  {aspect}
                </th>
                <td className="py-4 pr-6 font-mono text-[0.74rem] leading-relaxed text-bone-dim">
                  {left}
                </td>
                <td className="py-4 font-mono text-[0.74rem] leading-relaxed text-bone">
                  {right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/**
 * A chain of custody: stages, and how far each one has got.
 *
 * Used for the studio's provenance and for each title's standing. The status
 * string is the only vocabulary — `COMPLETE` reads as done, `IN PROGRESS` as
 * current, and anything else (`SCHEDULED`, `[REDACTED]`) recedes, which is what
 * an honest roadmap looks like when most of it has not happened yet.
 */
export function Standing({
  items,
  className = "",
}: {
  items: readonly (readonly [string, string])[];
  className?: string;
}) {
  return (
    <ol
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map(([stage, status]) => (
        <li key={stage} className="border border-bone/10 bg-ink-raised/60 p-6">
          <p className="font-display text-lg text-bone">{stage}</p>
          <p
            className={`mt-3 font-mono text-[0.58rem] tracking-[0.2em] ${
              status === "COMPLETE"
                ? "text-accent"
                : status === "IN PROGRESS"
                  ? "text-bone-dim"
                  : "text-bone-dim/40"
            }`}
          >
            {status}
          </p>
        </li>
      ))}
    </ol>
  );
}
