"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { divisionFromPath, type CursorKind } from "@/lib/divisions";
import { useFinePointer, useReducedMotion } from "@/lib/tier";

/**
 * Each establishment hands you a different instrument at the door: a crosshair
 * at SATCORP, a terminal block in KYRAX, a reticle in the game worlds, a pulse
 * on PULSE. ANU gives you nothing — the study is analogue.
 *
 * Falls back to the system cursor on touch and under reduced motion.
 */
export function Cursor() {
  const pathname = usePathname();
  const kind = divisionFromPath(pathname).cursor;
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const enabled = finePointer && !reducedMotion && kind !== "native";

  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.removeProperty("cursor");
      return;
    }

    document.documentElement.style.cursor = "none";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    // The ring trails the dot — the instrument catching up with the hand.
    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, input, textarea, select, [role='button']",
      );
      ringRef.current?.setAttribute(
        "data-hot",
        interactive ? "true" : "false",
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty("cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        data-hot="false"
        className="absolute left-0 top-0 transition-[width,height,opacity] duration-200 data-[hot=true]:opacity-100"
        style={{ opacity: 0.7 }}
      >
        <CursorMark kind={kind} />
      </div>
    </div>
  );
}

function CursorMark({ kind }: { kind: CursorKind }) {
  if (kind === "block") {
    return (
      <div className="size-4 border border-accent bg-accent/15" />
    );
  }

  if (kind === "pulse") {
    return (
      <div
        className="size-8 rounded-full border border-accent"
        style={{ animation: "live-pulse 1.2s ease-in-out infinite" }}
      />
    );
  }

  if (kind === "reticle") {
    return (
      <svg viewBox="0 0 40 40" className="size-10 text-accent">
        <circle
          cx="20"
          cy="20"
          r="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M20 2v7M20 31v7M2 20h7M31 20h7"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }

  // crosshair
  return (
    <svg viewBox="0 0 40 40" className="size-8 text-accent">
      <path
        d="M20 4v10M20 26v10M4 20h10M26 20h10"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
