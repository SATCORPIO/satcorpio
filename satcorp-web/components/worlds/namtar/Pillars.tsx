/**
 * The five pillars.
 *
 * Formerly a set of buttons wired to monoliths standing on the terrain behind
 * the page. The monoliths are gone from the 3D world, so this is now what the
 * copy always was on its own: a plain, complete list that never depended on
 * the canvas existing.
 */

export interface PillarCopy {
  name: string;
  body: string;
}

export function Pillars({ pillars }: { pillars: PillarCopy[] }) {
  return (
    <ul className="mt-12 space-y-px">
      {pillars.map((pillar, i) => (
        <li
          key={pillar.name}
          className="grid items-baseline gap-4 border border-bone/10 bg-ink-raised/70 p-8 lg:grid-cols-[6rem_14rem_1fr] lg:gap-10"
        >
          <span className="font-mono text-[0.66rem] text-accent/70">
            {String(i + 1).padStart(2, "0")} / 05
          </span>
          <span className="font-display text-3xl text-bone">{pillar.name}</span>
          <span className="max-w-2xl leading-relaxed text-bone-dim">
            {pillar.body}
          </span>
        </li>
      ))}
    </ul>
  );
}
