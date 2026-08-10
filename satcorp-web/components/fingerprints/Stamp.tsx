/**
 * FINGERPRINT 2.4 — RUBBER STAMPS
 *
 * Status is never a coloured pill on this site. It is a stamp: slightly off
 * axis, ink a little uneven, as if pressed by hand a moment before you arrived.
 */

export type StampTone = "blood" | "bone" | "brass" | "accent" | "live";

const TONE_CLASS: Record<StampTone, string> = {
  blood: "text-blood",
  bone: "text-bone-dim",
  brass: "text-brass",
  accent: "text-accent",
  live: "text-blood-hot",
};

export function Stamp({
  children,
  tone = "blood",
  rotate = -2.5,
  className = "",
}: {
  children: React.ReactNode;
  tone?: StampTone;
  /** Degrees off axis. A stamp pressed perfectly straight looks printed. */
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`stamp ${TONE_CLASS[tone]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tone === "live" && (
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-current"
          style={{ animation: "live-pulse 1.6s ease-in-out infinite" }}
        />
      )}
      {children}
    </span>
  );
}
