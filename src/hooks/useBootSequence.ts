"use client";

import { useEffect } from "react";

/**
 * useBootSequence
 * A tactical entrance animation hook that applies a staggered scanline and fade-in 
 * effect to a target element.
 */
export function useBootSequence(element: HTMLElement | null, options: { delay?: number } = {}) {
  const { delay = 0 } = options;

  useEffect(() => {
    if (!element) return;

    // Set initial state
    element.style.opacity = "0";
    element.style.transform = "translateY(10px) perspective(1000px) rotateX(5deg)";
    element.style.transition = "none";

    const timeout = setTimeout(() => {
      element.style.transition = "opacity 800ms var(--ease-tactical), transform 800ms var(--ease-tactical)";
      element.style.opacity = "1";
      element.style.transform = "translateY(0) perspective(1000px) rotateX(0deg)";
      
      // Add a visual 'glitch' or scanline flash class if needed
      element.classList.add("booting");
      
      setTimeout(() => {
        element.classList.remove("booting");
      }, 1000);
    }, delay * 1000 + 100);

    return () => clearTimeout(timeout);
  }, [element, delay]);
}
