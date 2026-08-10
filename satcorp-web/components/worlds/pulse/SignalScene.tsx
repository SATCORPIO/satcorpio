"use client";

import { useEffect } from "react";
import { Stage } from "@/components/system/Stage";
import { useCapabilities } from "@/lib/tier";
import { ScrollTrigger } from "@/lib/gsap";
import { Signal } from "./Signal";
import { bumpSignal, tracePath } from "./heartbeat";

/**
 * THE SIGNAL, BEHIND THE PAGE
 *
 * PULSE's relationship to its world is different again from the other four:
 * ANU is a room you move around, KYRAX a space you fly through, Ki-Ra a room
 * you sit in once, NAMTAR a descent. This one is a *monitor you are wired to*.
 * It does not move with the scroll   it reacts to it. The trace is level and
 * unhurried until a section arrives, and then the heart quickens.
 *
 * Because it is the red thread for this route, `pulse` is listed in
 * `OWNS_ITS_THREAD` in ThreadBackdrop; running the ambient pass as well would
 * mean two threads and two WebGL contexts on one page.
 */
export function SignalScene() {
  const caps = useCapabilities();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* The graticule. Free in CSS, and the thing that says "monitor" before
          the trace has even beaten once. */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-blood-hot) 1px, transparent 1px), linear-gradient(to bottom, var(--color-blood-hot) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 4vw, 56px) clamp(32px, 4vw, 56px)",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 15%, transparent 78%)",
        }}
      />

      <Stage
        interactive={false}
        camera={{ position: [0, 0, 6], fov: 45 }}
        fallback={<SignalStill />}
      >
        <Signal segments={caps.tier === "full" ? 1400 : 800} />
      </Stage>

      {/* Weighted to the edges, so the trace stays legible where the writing
          is not and never fights the copy for the middle of the screen. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(10,7,8,0.86)_0%,rgba(10,7,8,0.62)_45%,rgba(10,7,8,0.9)_100%)]" />
    </div>
  );
}

/**
 * Lite tier. The same waveform, drawn once and left still   generated from
 * `beatAt`, so it is the trace everyone else sees with the motion taken out
 * rather than a decorative squiggle that happens to be red.
 */
function SignalStill() {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className="size-full opacity-70"
    >
      <path
        d={tracePath(1200, 400, 5)}
        fill="none"
        stroke="var(--color-blood-hot)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wires every `[data-signal]` section on the page to the trace.
 *
 * Done by attribute from one place rather than by wrapping each section in a
 * client component: the page stays a server component, and marking a section as
 * one the heart should notice costs an attribute rather than an import.
 */
export function SignalTriggers() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-signal]");
    if (!sections.length) return;

    const triggers = Array.from(sections).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        // Both directions: scrolling back up past a section is an arrival too.
        onEnter: () => bumpSignal(Number(el.dataset.signal) || 0.8),
        onEnterBack: () => bumpSignal((Number(el.dataset.signal) || 0.8) * 0.6),
      }),
    );

    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
