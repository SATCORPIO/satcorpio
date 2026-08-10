import type { ReactNode } from "react";

/**
 * KYRAX's layout unit is a physical index card: a file number, a ruled header,
 * a hand-filed tilt. The archive on this page is not only in the canvas  
 * the writing is filed on the same stock.
 */
export function IndexCard({
  file,
  title,
  children,
  classification,
  tilt = 0,
  className = "",
}: {
  file: string;
  title: string;
  children: ReactNode;
  classification?: string;
  /** Degrees off square. Cards filed by hand are never straight. */
  tilt?: number;
  className?: string;
}) {
  return (
    <article
      className={`group relative border border-bone/12 bg-ink-raised/72 backdrop-blur-sm transition-transform duration-500 hover:!rotate-0 ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {/* The ruled header every card in the archive carries. */}
      <header className="flex items-baseline justify-between gap-4 border-b border-accent/25 px-6 py-3">
        <span className="font-mono text-[0.58rem] tracking-[0.22em] text-accent/80">
          {file}
        </span>
        {classification && (
          <span className="font-mono text-[0.55rem] tracking-[0.22em] text-bone-dim/60">
            {classification}
          </span>
        )}
      </header>

      <div className="px-6 py-6">
        <h3 className="font-display text-2xl leading-tight text-bone">
          {title}
        </h3>
        <div className="mt-3 font-sans text-sm leading-relaxed text-bone-dim">
          {children}
        </div>
      </div>
    </article>
  );
}
