"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * A single mutable number shared between ScrollTrigger and the render loop.
 *
 * Deliberately not React state: the camera dolly reads this every frame, and
 * pushing scroll position through useState would re-render the tree sixty
 * times a second to move a camera that React does not own anyway.
 */
export const scrollProgress = { value: 0 };

export function setScrollProgress(v: number) {
  scrollProgress.value = v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Maps the whole document's scroll onto 0..1 for whichever world is mounted.
 * Only one page exists at a time, so a single shared value is enough.
 */
export function useDocumentScrollProgress(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      setScrollProgress(0);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, [enabled]);
}
