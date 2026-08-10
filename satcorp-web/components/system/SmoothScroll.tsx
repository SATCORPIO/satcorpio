"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { divisionFromPath } from "@/lib/divisions";
import { useReducedMotion } from "@/lib/tier";

/**
 * Lenis drives scroll for the whole site and hands its position to
 * ScrollTrigger, so scrubbed camera rigs stay locked to the actual scroll
 * position rather than the browser's.
 *
 * The lerp is retuned per establishment   ANU is the slowest room in the
 * building, PULSE the quickest   by rebuilding the instance on arrival.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const lerp = divisionFromPath(pathname).scrollLerp;

  useEffect(() => {
    if (reducedMotion) {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native scroll on touch beats an emulated one on every device tested.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    lenis.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, [lerp, reducedMotion, pathname]);

  return null;
}
