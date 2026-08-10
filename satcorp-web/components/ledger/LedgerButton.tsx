"use client";

import { useUI } from "@/lib/store";

/**
 * A second door into the Ledger, for placing in-context — the SATCORP partner
 * CTA, ANU's engagement section, PULSE's "broadcast with us". The wax seal is
 * always available; this is for when the invitation should be explicit.
 */
export function LedgerButton({
  children,
  className = "",
  section,
}: {
  children: React.ReactNode;
  className?: string;
  /** Reserved for Phase 2: open the ledger on a specific tab. */
  section?: string;
}) {
  const openLedger = useUI((s) => s.openLedger);

  return (
    <button
      type="button"
      onClick={() => openLedger()}
      data-section={section}
      aria-haspopup="dialog"
      className={className}
    >
      {children}
    </button>
  );
}
