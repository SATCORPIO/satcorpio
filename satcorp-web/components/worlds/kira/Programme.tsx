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
