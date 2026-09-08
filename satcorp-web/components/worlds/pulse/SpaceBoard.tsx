"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  SPACE_KINDS,
  SPACE_MODULES,
  type SpaceKindId,
} from "@/lib/pulse-platform";

/**
 * SPACES   §V of the build plan.
 *
 * One structure, four shapes: a creator, a community, a business and a game
 * all get the same fourteen modules, with a different subset switched on.
 * Client component, no network, no store   tab state is `useState`, which is
 * all this needs.
 *
 * A proper WAI-ARIA tabs widget rather than a styled radio group: `role`,
 * `aria-selected`/`aria-controls`, a roving `tabIndex`, and arrow-key/Home/End
 * navigation that moves focus and activates in the same step (the
 * "automatic activation" pattern the APG describes for a small, static tab
 * set like this one).
 */

const TAB_CLIP = "polygon(0.55rem 0, 100% 0, 100% 100%, 0 100%)";

export function SpaceBoard() {
  const [active, setActive] = useState<SpaceKindId>(SPACE_KINDS[0].id);
  const tabRefs = useRef<Partial<Record<SpaceKindId, HTMLButtonElement>>>({});

  const focusAndActivate = (index: number) => {
    const kind = SPACE_KINDS[(index + SPACE_KINDS.length) % SPACE_KINDS.length];
    tabRefs.current[kind.id]?.focus();
    setActive(kind.id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusAndActivate(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusAndActivate(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAndActivate(0);
        break;
      case "End":
        event.preventDefault();
        focusAndActivate(SPACE_KINDS.length - 1);
        break;
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Space kind"
        className="flex flex-wrap gap-px"
      >
        {SPACE_KINDS.map((kind, i) => {
          const isActive = kind.id === active;
          return (
            <button
              key={kind.id}
              ref={(el) => {
                tabRefs.current[kind.id] = el ?? undefined;
              }}
              type="button"
              role="tab"
              id={`space-tab-${kind.id}`}
              aria-selected={isActive}
              aria-controls={`space-panel-${kind.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(kind.id)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className={[
                "px-5 py-3 font-mono text-[0.66rem] tracking-[0.2em] transition-all duration-300",
                isActive
                  ? "bg-ink-raised text-bone"
                  : "bg-gunmetal/25 text-bone-dim hover:bg-gunmetal/50 hover:text-bone",
              ].join(" ")}
              style={{ clipPath: TAB_CLIP }}
            >
              {kind.name.toUpperCase()}
            </button>
          );
        })}
      </div>

      {SPACE_KINDS.map((kind) => {
        const isActive = kind.id === active;
        const kindModules = new Set(kind.modules);
        return (
          <div
            key={kind.id}
            role="tabpanel"
            id={`space-panel-${kind.id}`}
            aria-labelledby={`space-tab-${kind.id}`}
            hidden={!isActive}
            className="border border-t-0 border-bone/10 bg-ink-raised/40 p-6 sm:p-8"
          >
            <p className="font-mono text-[0.7rem] leading-relaxed text-bone-dim">
              {kind.line}
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-px sm:grid-cols-4">
              {SPACE_MODULES.map((module) => {
                const on = kindModules.has(module.id);
                return (
                  <li
                    key={module.id}
                    className={[
                      "border p-4 transition-colors",
                      on
                        ? "border-blood-hot/40 bg-ink-raised/90 text-bone"
                        : "border-bone/5 text-bone-dim/35",
                    ].join(" ")}
                  >
                    <p className="font-mono text-[0.6rem] tracking-[0.14em]">
                      {module.name.toUpperCase()}
                    </p>
                    {on && (
                      <p className="mt-1.5 font-mono text-[0.6rem] leading-snug text-bone-dim">
                        {module.line}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
