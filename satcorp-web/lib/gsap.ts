"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

/**
 * Single registration point. Importing gsap from anywhere else in the app
 * risks registering plugins twice or, worse, not at all.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);

  // The Concierge default: unhurried, never bouncy.
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export { gsap, ScrollTrigger, Flip };
