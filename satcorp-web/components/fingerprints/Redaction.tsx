"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FINGERPRINT 2.4   REDACTION REVEALS
 *
 * Text arrives struck out under a black bar and un-redacts as you reach it:
 * the site decides to trust you. The bar is drawn with a pseudo-element, so
 * the real words are always present in the DOM for screen readers and
 * crawlers   this is presentation, never a content gate.
 */
export function Redact({
  children,
  /** Hold the bar until hover instead of revealing on scroll. */
  manual = false,
  delay = 0,
  className = "",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  manual?: boolean;
  delay?: number;
  className?: string;
  as?: "span" | "strong" | "em";
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (manual) return;
    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => setRevealed(true), delay);
      },
      { threshold: 0.4, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [manual, delay]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLSpanElement>}
      className={`redact ${className}`}
      data-revealed={revealed ? "true" : "false"}
    >
      {children}
    </Tag>
  );
}
