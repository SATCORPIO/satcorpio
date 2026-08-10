/**
 * FINGERPRINT 2.5 — THE MONOGRAM
 * Drawn once, used everywhere: the tab bar, the wax seal, the loading state,
 * the open-graph cards. Never redrawn per division.
 */
export function Monogram({
  className,
  strokeWidth = 6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M29 2 L71 2 L98 29 L98 71 L71 98 L29 98 L2 71 L2 29 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.5}
        opacity={0.55}
      />
      <path
        d="M65 37 C65 29 53 26 45 28.5 C34 32 32.5 44 44.5 48 L56 52 C68.5 56 67 68 56.5 71 C48 73.5 35.5 70.5 35.5 62"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
    </svg>
  );
}
