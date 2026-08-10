"use client";

import { useEffect } from "react";
import type { ThemeId } from "@/lib/divisions";

/**
 * The page content is scoped by its own [data-division] wrapper, but the fixed
 * chrome   tab bar, seal, cursor   sits outside it in the root layout. This
 * mirrors the current establishment onto <html> so those elements can read the
 * same accent.
 */
export function ThemeSync({ theme }: { theme: ThemeId }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.division;
    root.dataset.division = theme;
    return () => {
      if (previous) root.dataset.division = previous;
    };
  }, [theme]);

  return null;
}
