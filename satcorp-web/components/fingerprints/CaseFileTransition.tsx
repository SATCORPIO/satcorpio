"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useUI } from "@/lib/store";
import { useReducedMotion } from "@/lib/tier";
import { divisionFromPath } from "@/lib/divisions";
import { Monogram } from "./Monogram";

/**
 * FINGERPRINT 2.4 — THE CASE-FILE TRANSITION
 *
 * Leaving an establishment folds the viewport shut like a manila folder, a
 * stamp comes down on the cover, and the next file opens. Roughly 900ms end to
 * end, skippable, and replaced by a plain crossfade under reduced motion.
 *
 * Navigation is routed through here rather than <Link> so the animation and
 * the router stay in step.
 */

type NavigateFn = (href: string) => void;

const ConciergeNavContext = createContext<NavigateFn>(() => {});

/** Navigate the way the site wants to be navigated. */
export function useConciergeNav(): NavigateFn {
  return useContext(ConciergeNavContext);
}

const OUT_MS = 520;
/**
 * requestAnimationFrame stalls in a backgrounded tab, which would leave the
 * closing animation — and therefore the navigation it triggers — suspended.
 * This guarantees the trip completes whatever the browser decides to do.
 */
const SAFETY_MS = 1600;

export function CaseFileTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const setPhase = useUI((s) => s.setPhase);
  const closeLedger = useUI((s) => s.closeLedger);

  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const safetyTimer = useRef(0);

  const navigate = useCallback<NavigateFn>(
    (href) => {
      if (navigating.current) return;
      const target = href.split("#")[0] || "/";
      if (target === pathname) return;

      closeLedger();

      if (reducedMotion) {
        router.push(href);
        return;
      }

      navigating.current = true;
      setPhase("out");

      const root = rootRef.current;
      if (root) root.style.pointerEvents = "auto";

      // Whichever gets there first wins; the second call is a no-op.
      let pushed = false;
      const go = () => {
        if (pushed) return;
        pushed = true;
        router.push(href);
      };

      gsap
        .timeline({
          defaults: { duration: OUT_MS / 1000, ease: "power3.inOut" },
          onComplete: go,
        })
        .set(rootRef.current, { autoAlpha: 1 })
        .fromTo(
          topRef.current,
          { yPercent: -101 },
          { yPercent: 0 },
          0,
        )
        .fromTo(
          bottomRef.current,
          { yPercent: 101 },
          { yPercent: 0 },
          0,
        )
        .fromTo(
          stampRef.current,
          { scale: 2.4, autoAlpha: 0, rotate: -14 },
          {
            scale: 1,
            autoAlpha: 1,
            rotate: -6,
            duration: 0.26,
            ease: "power4.out",
          },
          OUT_MS / 1000 - 0.18,
        );

      safetyTimer.current = window.setTimeout(go, SAFETY_MS);
    },
    [pathname, reducedMotion, router, setPhase, closeLedger],
  );

  // The file opens once the next establishment has actually arrived.
  useEffect(() => {
    window.clearTimeout(safetyTimer.current);
    if (!navigating.current) return;

    setPhase("in");

    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      navigating.current = false;
      setPhase("idle");
      gsap.set(rootRef.current, { autoAlpha: 0, pointerEvents: "none" });
    };

    gsap
      .timeline({
        defaults: { duration: 0.42, ease: "power3.inOut" },
        onComplete: settle,
      })
      .to(stampRef.current, { autoAlpha: 0, duration: 0.2 }, 0)
      .to(topRef.current, { yPercent: -101 }, 0.06)
      .to(bottomRef.current, { yPercent: 101 }, 0.06);

    // Never leave the folder shut over a live page.
    safetyTimer.current = window.setTimeout(settle, SAFETY_MS);
    return () => window.clearTimeout(safetyTimer.current);
  }, [pathname, setPhase]);

  useEffect(() => () => window.clearTimeout(safetyTimer.current), []);

  const division = divisionFromPath(pathname);

  return (
    <ConciergeNavContext.Provider value={navigate}>
      {children}

      <div
        ref={rootRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] invisible opacity-0"
      >
        {/* Two halves of a manila folder closing over the viewport. */}
        <div
          ref={topRef}
          className="absolute inset-x-0 top-0 h-1/2 bg-ink"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #131316 0%, #0a0a0b 100%)",
            borderBottom: "1px solid rgba(233,225,211,0.10)",
          }}
        />
        <div
          ref={bottomRef}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
          style={{
            backgroundImage: "linear-gradient(0deg, #131316 0%, #0a0a0b 100%)",
            borderTop: "1px solid rgba(233,225,211,0.10)",
          }}
        />

        <div
          ref={stampRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0"
        >
          <Monogram className="size-10 text-blood" />
          <div className="stamp text-blood text-[0.7rem]">TRANSFERRED</div>
          <div className="label text-[0.6rem]">
            {division.name} — FILE OPEN
          </div>
        </div>
      </div>
    </ConciergeNavContext.Provider>
  );
}

/**
 * A link that goes through the case-file transition. Renders a real anchor so
 * middle-click, keyboard and crawlers all behave normally.
 */
export function ThreadLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: React.ComponentProps<"a"> & { href: string }) {
  const navigate = useConciergeNav();
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        // Leave modified clicks to the browser.
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
