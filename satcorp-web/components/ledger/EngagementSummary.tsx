"use client";

import {
  LEDGER_ITEM_BY_ID,
  sectionForItem,
} from "@/lib/ledger-catalog";
import { useEngagement, useHydrated } from "@/lib/store";
import { Stamp } from "@/components/fingerprints/Stamp";
import { LedgerButton } from "./LedgerButton";

/**
 * The Scope step reads whatever was stamped in the Ledger. In Phase 2 these
 * become the pre-checked selections on the real form; for now they prove the
 * store survives navigation and reloads.
 */
export function EngagementSummary() {
  const selected = useEngagement((s) => s.selected);
  const remove = useEngagement((s) => s.remove);
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <p className="font-mono text-[0.68rem] text-bone-dim/60">
        Reading the ledger…
      </p>
    );
  }

  if (selected.length === 0) {
    return (
      <div className="border border-dashed border-bone/15 p-6">
        <p className="font-mono text-[0.7rem] leading-relaxed text-bone-dim">
          Nothing marked yet. Open the Ledger and stamp what you need — or
          describe the problem and let me tell you what it actually is.
        </p>
        <LedgerButton className="mt-5 font-mono text-[0.62rem] tracking-[0.22em] text-brass transition-colors hover:text-bone">
          OPEN THE LEDGER →
        </LedgerButton>
      </div>
    );
  }

  // Group by ledger section so the brief reads like a filed document.
  const grouped = new Map<string, string[]>();
  for (const id of selected) {
    const key = sectionForItem(id)?.title ?? "Other";
    grouped.set(key, [...(grouped.get(key) ?? []), id]);
  }

  return (
    <div className="border border-bone/10 bg-ink/40 p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="label">Marked for scope</p>
        <Stamp tone="blood" rotate={-3}>
          {selected.length} ENGAGED
        </Stamp>
      </div>

      <div className="mt-6 space-y-5">
        {[...grouped.entries()].map(([section, ids]) => (
          <div key={section}>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-brass">
              {section.toUpperCase()}
            </p>
            <ul className="mt-2 space-y-1.5">
              {ids.map((id) => (
                <li
                  key={id}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="font-mono text-[0.72rem] text-bone">
                    {LEDGER_ITEM_BY_ID[id]?.name ?? id}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(id)}
                    className="shrink-0 font-mono text-[0.58rem] tracking-[0.18em] text-bone-dim transition-colors hover:text-blood"
                  >
                    REMOVE
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
