"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* ============================================================
   THE ENGAGEMENT — line items marked in the Ledger.
   Persisted, because a visitor who stamps six entries and then
   wanders off to NAMTAR should find them still stamped on return.
   ============================================================ */

interface EngagementState {
  selected: string[];
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useEngagement = create<EngagementState>()(
  persist(
    (set) => ({
      selected: [],
      toggle: (id) =>
        set((s) => ({
          selected: s.selected.includes(id)
            ? s.selected.filter((x) => x !== id)
            : [...s.selected, id],
        })),
      add: (id) =>
        set((s) =>
          s.selected.includes(id) ? s : { selected: [...s.selected, id] },
        ),
      remove: (id) =>
        set((s) => ({ selected: s.selected.filter((x) => x !== id) })),
      clear: () => set({ selected: [] }),
    }),
    {
      name: "satcorp.engagement",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ selected: s.selected }),
    },
  ),
);

/* ============================================================
   UI — chrome that spans establishments.
   ============================================================ */

export type TransitionPhase = "idle" | "out" | "in";

interface UIState {
  ledgerOpen: boolean;
  indexOpen: boolean;
  audioEnabled: boolean;
  phase: TransitionPhase;
  openLedger: () => void;
  closeLedger: () => void;
  setIndexOpen: (v: boolean) => void;
  toggleAudio: () => void;
  setPhase: (p: TransitionPhase) => void;
}

export const useUI = create<UIState>()(
  persist(
    (set) => ({
      ledgerOpen: false,
      indexOpen: false,
      audioEnabled: false,
      phase: "idle",
      openLedger: () => set({ ledgerOpen: true }),
      closeLedger: () => set({ ledgerOpen: false }),
      setIndexOpen: (v) => set({ indexOpen: v }),
      toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
      setPhase: (p) => set({ phase: p }),
    }),
    {
      name: "satcorp.ui",
      storage: createJSONStorage(() => localStorage),
      // Only the audio preference is worth remembering between visits.
      partialize: (s) => ({ audioEnabled: s.audioEnabled }),
    },
  ),
);

/**
 * Persisted stores read localStorage after the first client render, so any
 * component that displays persisted values must wait for this to avoid a
 * hydration mismatch between the server HTML and the restored state.
 */
const neverChanges = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );
}
