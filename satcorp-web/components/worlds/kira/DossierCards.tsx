"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * THE CASE FILES   the brief, below the dossier, as folders you open.
 *
 * The full-brief page used to be one long scroll through every section in
 * order. That is the right shape for a reader who has already decided to
 * care; it is the wrong shape for the dossier hero, whose entire job is to
 * be read in the first few seconds. So the hero stays a single, short read,
 * and everything else becomes a folder on the desk under it   pulled out
 * only by a reader who wants that specific thing.
 *
 * No page-turning, no shared index (contrast `LedgerModal`, which is a
 * different tool for a different job: arranging a service, not reading a
 * brief). One file opens, one file closes; the grid underneath never moves.
 */

export interface DossierCard {
  id: string;
  eyebrow: string;
  title: string;
  teaser: string;
  content: ReactNode;
}

export function DossierCards({ cards }: { cards: DossierCard[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const active = cards.find((c) => c.id === openId) ?? null;

  useEffect(() => {
    if (!active) return;

    restoreFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      setVisible(false);
      restoreFocus.current?.focus?.();
    };
  }, [active]);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.id}>
            <button
              type="button"
              onClick={() => setOpenId(card.id)}
              className="group flex h-full w-full flex-col items-start border border-bone/12 bg-ink-raised/70 p-7 text-left backdrop-blur-sm transition-colors hover:border-accent/45"
            >
              <p className="label label-accent text-[0.55rem]">
                {card.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-2xl leading-tight text-bone">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 leading-relaxed text-bone-dim">
                {card.teaser}
              </p>
              <span className="mt-6 font-mono text-[0.62rem] tracking-[0.2em] text-bone-dim transition-colors group-hover:text-accent">
                OPEN THE FILE →
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className={`fixed inset-0 z-[65] flex items-stretch justify-center bg-ink/90 p-0 backdrop-blur-sm transition-opacity duration-300 sm:items-center sm:p-6 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            type="button"
            aria-label="Close the file"
            onClick={() => setOpenId(null)}
            className="absolute inset-0 cursor-default"
          />

          <div
            ref={dialogRef}
            tabIndex={-1}
            className={`relative flex h-full w-full max-w-3xl flex-col overflow-hidden border border-bone/15 bg-ink-raised outline-none transition-all duration-300 sm:h-[85vh] ${
              visible ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.98]"
            }`}
          >
            <header className="flex items-start justify-between gap-6 border-b border-accent/25 px-6 py-5 sm:px-8">
              <div className="min-w-0">
                <p className="label label-accent text-[0.55rem]">
                  {active.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl text-bone sm:text-3xl">
                  {active.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="shrink-0 font-mono text-[0.62rem] tracking-[0.22em] text-bone-dim transition-colors hover:text-bone"
              >
                CLOSE ✕
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 sm:px-8">
              {active.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
