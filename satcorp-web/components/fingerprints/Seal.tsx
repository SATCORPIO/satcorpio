"use client";

import { useEngagement, useHydrated, useUI } from "@/lib/store";
import { Monogram } from "./Monogram";

/**
 * FINGERPRINT 2.5   THE WAX SEAL
 *
 * The only element on the entire site that never changes between
 * establishments. Six pages that look like six different companies, and the
 * same seal sitting in the corner of every one of them. That's the tell.
 *
 * It opens the Ledger.
 */
export function Seal() {
  const openLedger = useUI((s) => s.openLedger);
  const ledgerOpen = useUI((s) => s.ledgerOpen);
  const selected = useEngagement((s) => s.selected);
  const hydrated = useHydrated();

  const count = hydrated ? selected.length : 0;

  return (
    <button
      type="button"
      onClick={openLedger}
      aria-haspopup="dialog"
      aria-expanded={ledgerOpen}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 font-mono text-[0.6rem] tracking-[0.24em] text-bone-dim opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:inline">
        OPEN THE LEDGER
      </span>

      <span
        className="relative grid size-14 place-items-center sm:size-16"
        style={{ animation: "seal-breathe 4.5s ease-in-out infinite" }}
      >
        {/* The wax itself: an irregular blob, never a perfect circle. */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <defs>
            <radialGradient id="wax" cx="38%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#d4283f" />
              <stop offset="55%" stopColor="#a6192e" />
              <stop offset="100%" stopColor="#5c0d19" />
            </radialGradient>
          </defs>
          <path
            fill="url(#wax)"
            d="M50 4c12 0 17 6 27 9s18 3 18 15-7 15-7 24 8 15 2 24-17 4-27 10-13 10-24 6-11-11-20-16S4 71 4 60s9-13 9-23S9 21 20 15 38 4 50 4z"
          />
        </svg>

        <Monogram
          className="relative size-6 text-bone/90 sm:size-7"
          strokeWidth={7}
        />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-ink font-mono text-[0.6rem] text-bone ring-1 ring-blood">
            {count}
          </span>
        )}
      </span>

      <span className="sr-only">
        Open the Ledger{count > 0 ? `   ${count} entries engaged` : ""}
      </span>
    </button>
  );
}
