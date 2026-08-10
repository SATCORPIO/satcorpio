"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";

/**
 * The house arrival motion: content rises a little and resolves as you reach
 * it. Deliberately understated   the Concierge does not make an entrance.
 *
 * Under reduced motion nothing animates and nothing is hidden; the content is
 * simply there.
 */
export function Reveal({
  children,
  /** Seconds of delay after the trigger fires. */
  delay = 0,
  /** Stagger direct children instead of moving the block as one. */
  stagger,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;

    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Leave the content visible if this unmounts mid-flight.
      gsap.set(targets, { clearProps: "opacity,visibility,transform" });
    };
  }, [delay, stagger, y, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Refreshes ScrollTrigger once fonts and images have settled the layout. */
export function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);
  return null;
}
