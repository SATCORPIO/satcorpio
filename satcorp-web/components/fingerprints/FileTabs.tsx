"use client";

import { usePathname } from "next/navigation";
import { DIVISIONS, divisionFromPath } from "@/lib/divisions";
import { useUI } from "@/lib/store";
import { Monogram } from "./Monogram";
import { ThreadLink } from "./CaseFileTransition";

/**
 * FINGERPRINT 2.4   THE FILE TABS
 *
 * Navigation is a row of tabs along the top edge of a drawer. The open file is
 * pulled forward. On small screens the drawer closes to a single tab: THE INDEX.
 */

const TAB_CLIP = "polygon(0.55rem 0, 100% 0, 100% 100%, 0 100%)";

export function FileTabs() {
  const pathname = usePathname();
  const active = divisionFromPath(pathname);
  const indexOpen = useUI((s) => s.indexOpen);
  const setIndexOpen = useUI((s) => s.setIndexOpen);
  const audioEnabled = useUI((s) => s.audioEnabled);
  const toggleAudio = useUI((s) => s.toggleAudio);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[var(--chrome-h)]">
      <div className="absolute inset-0 border-b border-bone/10 bg-ink/80 backdrop-blur-md" />

      <nav
        aria-label="SATCORP divisions"
        className="relative flex h-full items-stretch gap-px pl-3 pr-2"
      >
        <ThreadLink
          href="/"
          className="flex shrink-0 items-center gap-2 pr-4 text-bone transition-colors hover:text-blood"
          aria-label="SATCORP   the index"
        >
          <Monogram className="size-5" />
          <span className="hidden font-mono text-[0.7rem] tracking-[0.3em] sm:inline">
            SATCORP
          </span>
        </ThreadLink>

        {/* Desktop: the whole drawer, open. */}
        <ul className="hidden h-full items-end gap-px lg:flex">
          {DIVISIONS.map((d) => {
            const isActive = d.id === active.id;
            return (
              <li key={d.id} className="h-full">
                <ThreadLink
                  href={d.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group relative flex h-full items-center gap-2 px-4 pt-1",
                    "font-mono text-[0.66rem] tracking-[0.22em] transition-all duration-300",
                    isActive
                      ? "bg-ink-raised text-bone"
                      : "bg-gunmetal/25 text-bone-dim hover:bg-gunmetal/50 hover:text-bone",
                  ].join(" ")}
                  style={{ clipPath: TAB_CLIP }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300"
                    style={{
                      background: d.accent,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  {d.tab}
                  <span
                    aria-hidden
                    className="hidden text-[0.55rem] text-bone-dim/60 xl:inline"
                  >
                    {d.role}
                  </span>
                </ThreadLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile: the drawer, closed. */}
        <button
          type="button"
          onClick={() => setIndexOpen(!indexOpen)}
          aria-expanded={indexOpen}
          className="ml-auto flex items-center gap-3 px-3 font-mono text-[0.66rem] tracking-[0.22em] text-bone-dim transition-colors hover:text-bone lg:hidden"
        >
          <span className="text-bone">{active.tab}</span>
          <span aria-hidden className="text-bone-dim/50">/</span>
          THE INDEX
        </button>

        <button
          type="button"
          onClick={toggleAudio}
          aria-pressed={audioEnabled}
          title={audioEnabled ? "Silence the room" : "Room tone"}
          className="ml-auto hidden items-center gap-2 px-3 font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim transition-colors hover:text-bone lg:flex"
        >
          <span
            aria-hidden
            className="inline-block h-3 w-px bg-current"
            style={{ opacity: audioEnabled ? 1 : 0.3 }}
          />
          {audioEnabled ? "SOUND ON" : "SOUND OFF"}
        </button>
      </nav>

      {indexOpen && (
        <div className="absolute inset-x-0 top-full border-b border-bone/10 bg-ink/95 backdrop-blur-md lg:hidden">
          <ul className="divide-y divide-bone/5">
            {DIVISIONS.map((d) => (
              <li key={d.id}>
                <ThreadLink
                  href={d.href}
                  onClick={() => setIndexOpen(false)}
                  className="flex items-baseline justify-between gap-4 px-5 py-4"
                >
                  <span className="font-mono text-xs tracking-[0.22em] text-bone">
                    {d.tab}
                  </span>
                  <span className="label text-[0.58rem]">{d.role}</span>
                </ThreadLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={toggleAudio}
                className="flex w-full items-center justify-between px-5 py-4 font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim"
              >
                ROOM TONE
                <span className="text-bone">
                  {audioEnabled ? "ON" : "OFF"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
