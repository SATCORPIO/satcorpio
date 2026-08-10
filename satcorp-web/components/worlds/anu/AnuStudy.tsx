"use client";

import { useEffect, useRef } from "react";
import { Stage } from "@/components/system/Stage";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useDocumentScrollProgress } from "@/lib/scroll-progress";
import { useReducedMotion } from "@/lib/tier";
import { DeskScene } from "./DeskScene";

/**
 * The study sits fixed behind the whole ANU page while the writing scrolls
 * over it, so the camera dolly and the chapters are the same movement.
 *
 * On lite tier the canvas is replaced by a still rendered from the same
 * Blender scene at the same camera stop   identical art direction, no GPU.
 */
export function AnuStudy() {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useDocumentScrollProgress(!reducedMotion);

  useEffect(() => {
    // Fade the room up once, rather than snapping on at full brightness.
    const root = rootRef.current;
    if (!root) return;
    const tween = gsap.fromTo(
      root,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.6, ease: "power2.out", delay: 0.15 },
    );
    ScrollTrigger.refresh();
    return () => {
      tween.kill();
      gsap.set(root, { autoAlpha: 1 });
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <Stage
        interactive={false}
        camera={{ position: [0, 1.28, 2.15], fov: 42 }}
        fallback={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/anu-study-still.jpg"
            alt=""
            className="size-full object-cover opacity-60"
          />
        }
      >
        <DeskScene reducedMotion={reducedMotion} />
      </Stage>

      {/* The writing runs down the left, so the room is held back hardest on
          that side and allowed to breathe on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/85" />
    </div>
  );
}
