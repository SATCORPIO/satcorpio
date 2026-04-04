"use client";

import { useEffect } from "react";

/**
 * useBootSequence Hook
 * Handles the "booting" animation sequence for tactical elements.
 * Animates opacity, transform, and optionally triggers scanline effects.
 */

interface BootOptions {
  delay?: number;
  duration?: number;
  distance?: string;
  autoPlay?: boolean;
}

export function useBootSequence(
  element: HTMLElement | null,
  options: BootOptions = {}
) {
  const {
    delay = 0,
    duration = 800,
    distance = "20px",
    autoPlay = true,
  } = options;

  useEffect(() => {
    if (!element || !autoPlay) return;

    // Set initial hidden state
    element.style.opacity = "0";
    element.style.transform = `translateY(${distance})`;
    element.style.transition = "none";
    element.style.pointerEvents = "none";

    // Re-flow trigger
    element.offsetHeight;

    // Apply the transition
    element.style.transition = `
      opacity ${duration}ms var(--ease-tactical), 
      transform ${duration}ms var(--ease-tactical),
      filter ${duration}ms var(--ease-tactical)
    `;

    const timer = setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      element.style.pointerEvents = "all";
      
      // Optional: highlight effect on boot complete
      element.style.filter = "brightness(1.5) contrast(1.1)";
      setTimeout(() => {
        if (element) {
          element.style.filter = "";
        }
      }, 300);
    }, delay);

    return () => clearTimeout(timer);
  }, [element, delay, duration, distance, autoPlay]);
}
