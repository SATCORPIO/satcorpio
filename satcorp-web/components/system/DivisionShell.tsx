import type { ReactNode } from "react";
import type { ThemeId } from "@/lib/divisions";
import { ThemeSync } from "./ThemeSync";

/**
 * Every route group wraps its pages in this. The `data-division` attribute is
 * what swaps the accent, page ground and texture defined in globals.css, so
 * the theme is present in the server-rendered HTML and never flashes.
 *
 * Grain and vignette live here rather than on <body> because their weight
 * differs per establishment: KYRAX is nearly clean, ANU is heavily filmic.
 */
export function DivisionShell({
  theme,
  children,
}: {
  theme: ThemeId;
  children: ReactNode;
}) {
  return (
    <div data-division={theme} className="grain vignette relative min-h-dvh">
      <ThemeSync theme={theme} />
      <div className="relative z-10 pt-[var(--chrome-h)]">{children}</div>
    </div>
  );
}
