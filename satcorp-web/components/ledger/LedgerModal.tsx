"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LEDGER,
  LEDGER_ITEM_BY_ID,
  TIER_LABELS,
  type LedgerItem,
} from "@/lib/ledger-catalog";
import { gsap } from "@/lib/gsap";
import { useEngagement, useHydrated, useUI } from "@/lib/store";
import { useReducedMotion } from "@/lib/tier";
import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";

/**
 * THE LEDGER
 *
 * Reddington keeps a list. So does SATCORP.
 *
 * A black leather book: the index down the left page, the entries on the
 * right, and the engagement tray along the spine. Marking a line stamps it
 * ENGAGED and carries it through to the brief. Changing section turns the page.
 */
export function LedgerModal() {
  const open = useUI((s) => s.ledgerOpen);
  const close = useUI((s) => s.closeLedger);
  const selected = useEngagement((s) => s.selected);
  const toggle = useEngagement((s) => s.toggle);
  const clear = useEngagement((s) => s.clear);
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();

  const [tab, setTab] = useState(LEDGER[0].id);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  /* --- Open: the book comes off the shelf --- */
  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    bookRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    let tween: gsap.core.Tween | undefined;
    if (!reducedMotion && bookRef.current) {
      tween = gsap.fromTo(
        bookRef.current,
        { autoAlpha: 0, y: 26, rotateX: -8, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      tween?.kill();
      restoreFocus.current?.focus?.();
    };
  }, [open, close, reducedMotion]);

  /* --- Section change: the page turns ---
     The tab changes first and the turn animates as a consequence. Gating the
     state on an animation callback would strand the reader on the old page
     any time the tween is interrupted or the tab is backgrounded. --- */
  const turnTo = (next: string) => setTab(next);

  useEffect(() => {
    const page = pageRef.current;
    if (reducedMotion || !page) return;
    const tween = gsap.fromTo(
      page,
      { rotateY: 15, autoAlpha: 0, x: 26 },
      { rotateY: 0, autoAlpha: 1, x: 0, duration: 0.45, ease: "power3.out" },
    );
    return () => {
      tween.kill();
      // Whatever happens to the tween, the page is left readable.
      gsap.set(page, { rotateY: 0, autoAlpha: 1, x: 0 });
    };
  }, [tab, reducedMotion]);

  const section = LEDGER.find((s) => s.id === tab) ?? LEDGER[0];
  const engaged = useMemo(
    () => (hydrated ? selected : []),
    [hydrated, selected],
  );

  // "Frequently arranged together"   the featured entries this visitor has
  // not marked, drawn from the sections they are actually looking at.
  const suggestions = useMemo(
    () =>
      section.items.filter((i) => i.featured && !engaged.includes(i.id)),
    [section, engaged],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The Ledger"
      className="fixed inset-0 z-[65] flex items-stretch justify-center bg-ink/90 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      style={{ perspective: "1800px" }}
    >
      <button
        type="button"
        aria-label="Close the Ledger"
        onClick={close}
        className="absolute inset-0 cursor-default"
      />

      <div
        ref={bookRef}
        tabIndex={-1}
        className="leather relative flex h-full w-full max-w-6xl flex-col overflow-hidden outline-none sm:h-[88vh]"
      >
        {/* ---------- Head ---------- */}
        <header className="flex items-start justify-between gap-6 border-b border-brass/20 px-5 py-5 sm:px-9 sm:py-7">
          <div className="min-w-0">
            <p className="label text-brass">The Ledger</p>
            <p className="mt-2.5 max-w-xl font-display text-lg leading-snug text-bone sm:text-xl">
              Everything on these pages can be arranged.
              <span className="text-bone-dim"> Some of it quickly.</span>
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="shrink-0 font-mono text-[0.62rem] tracking-[0.22em] text-bone-dim transition-colors hover:text-bone"
          >
            CLOSE ✕
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* ---------- Left page: the index ---------- */}
          <nav
            aria-label="Ledger sections"
            className="flex shrink-0 gap-px overflow-x-auto border-b border-brass/15 lg:w-60 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
          >
            {LEDGER.map((s) => {
              const count = s.items.filter((i) =>
                engaged.includes(i.id),
              ).length;
              const isActive = s.id === section.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => turnTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "flex shrink-0 items-center justify-between gap-3 px-5 py-3.5 text-left font-mono text-[0.66rem] tracking-[0.2em] transition-colors",
                    isActive
                      ? "bg-brass/12 text-bone"
                      : "text-bone-dim hover:bg-bone/[0.03] hover:text-bone",
                  ].join(" ")}
                >
                  <span className="whitespace-nowrap">
                    {s.tab.toUpperCase()}
                  </span>
                  {count > 0 && (
                    <span className="rounded-full bg-blood px-1.5 font-mono text-[0.55rem] text-bone">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ---------- Right page: the entries ---------- */}
          <div className="ledger-page min-h-0 flex-1 overflow-y-auto">
            <div
              ref={pageRef}
              className="page-turn px-5 py-7 sm:px-9"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 className="font-display text-2xl text-bone">
                {section.title}
              </h2>
              <p className="mt-2.5 max-w-2xl font-display text-sm italic leading-relaxed text-brass/80">
                {section.epigraph}
              </p>

              <ul className="mt-8 space-y-px">
                {section.items.map((item) => (
                  <LedgerLine
                    key={item.id}
                    item={item}
                    engaged={engaged.includes(item.id)}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </ul>

              {suggestions.length > 0 && (
                <div className="mt-10 border-t border-brass/15 pt-6">
                  <p className="label text-[0.55rem] text-brass">
                    Frequently arranged together
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggle(item.id)}
                        className="border border-brass/25 px-3.5 py-2 font-mono text-[0.62rem] text-bone-dim transition-colors hover:border-brass hover:text-bone"
                      >
                        + {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------- The spine: the engagement tray ---------- */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-brass/20 bg-ink/70 px-5 py-4 sm:px-9">
          <p className="label shrink-0">
            Engaged
            <span className="ml-2 font-mono text-sm text-bone">
              {engaged.length.toString().padStart(2, "0")}
            </span>
          </p>

          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
            {engaged.length === 0 ? (
              <span className="font-mono text-[0.66rem] text-bone-dim/70">
                Nothing marked yet. Take your time.
              </span>
            ) : (
              engaged.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className="group flex items-center gap-2 border border-brass/25 px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-bone-dim transition-colors hover:border-blood hover:text-bone"
                >
                  {LEDGER_ITEM_BY_ID[id]?.name ?? id}
                  <span className="text-bone-dim/60 group-hover:text-blood">
                    ✕
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {engaged.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim transition-colors hover:text-blood"
              >
                CLEAR
              </button>
            )}
            <ThreadLink
              href="/engage"
              onClick={close}
              className="bg-blood px-5 py-2.5 font-mono text-[0.64rem] tracking-[0.22em] text-bone transition-colors hover:bg-blood-hot"
            >
              BEGIN THE BRIEF →
            </ThreadLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function LedgerLine({
  item,
  engaged,
  onToggle,
}: {
  item: LedgerItem;
  engaged: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={engaged}
        className={[
          "flex w-full items-start gap-4 border-l-2 px-4 py-4 text-left transition-colors",
          engaged
            ? "border-blood bg-blood/[0.09]"
            : "border-transparent hover:border-brass/40 hover:bg-bone/[0.03]",
        ].join(" ")}
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-base text-bone">
              {item.name}
            </span>
            {item.featured && !engaged && (
              <span className="label text-[0.55rem] text-brass">
                often arranged
              </span>
            )}
            {engaged && (
              <Stamp tone="blood" rotate={-4}>
                ENGAGED
              </Stamp>
            )}
          </span>

          <span className="mt-1.5 block font-mono text-[0.7rem] leading-relaxed text-bone-dim">
            {item.scope}
          </span>
          <span className="mt-1 block font-mono text-[0.66rem] text-bone-dim/60">
            Delivered as: {item.deliverable}
          </span>

          <span className="mt-2.5 flex flex-wrap gap-1.5">
            {item.tiers.map((t) => (
              <span
                key={t}
                className="border border-brass/20 px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.18em] text-bone-dim"
              >
                {TIER_LABELS[t].toUpperCase()}
              </span>
            ))}
          </span>
        </span>

        <span
          aria-hidden
          className={[
            "mt-1 grid size-5 shrink-0 place-items-center border transition-colors",
            engaged
              ? "border-blood bg-blood text-bone"
              : "border-bone/25 text-transparent",
          ].join(" ")}
        >
          ✓
        </span>
      </button>
    </li>
  );
}
