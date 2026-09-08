/**
 * PULSE OG CARD   the shared visual both `opengraph-image.tsx` files render.
 *
 * `next/og`'s `ImageResponse` runs on Satori, a restricted flexbox-only CSS
 * subset   no Tailwind classes, no CSS grid, inline styles only. Kept as a
 * function returning plain JSX (not a component) so both route segments'
 * `opengraph-image.tsx` files can call it directly into `ImageResponse`
 * without an extra module boundary Satori would have to cross.
 *
 * Deliberately no custom font load. Loading Playfair/IBM Plex Mono here would
 * mean shipping their `.ttf` files into two more route handlers for images
 * that are viewed small, in a link preview, for a second   the brand cost of
 * a system sans-serif at that size and duration is close to zero, and it
 * keeps this file from growing a font-loading dependency of its own.
 */

const INK = "#0a0708";
const BLOOD_HOT = "#ff2b3a";
const BONE = "#e9e1d3";
const BONE_DIM = "#9c968c";

export const OG_SIZE = { width: 1200, height: 630 };

export function pulseOgCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 96px",
        backgroundColor: INK,
        position: "relative",
      }}
    >
      {/* The red thread, as a single hairline   this establishment's motif,
          reduced to the one thing that survives a static PNG. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          display: "flex",
          backgroundColor: BLOOD_HOT,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: BLOOD_HOT,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: BLOOD_HOT,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 108,
          lineHeight: 1,
          color: BONE,
          fontWeight: 700,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 34,
          lineHeight: 1.4,
          color: BONE_DIM,
          maxWidth: 900,
        }}
      >
        {subtitle}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 96,
          display: "flex",
          fontSize: 20,
          letterSpacing: 5,
          color: BONE_DIM,
          textTransform: "uppercase",
        }}
      >
        SATCORP / PULSE
      </div>
    </div>
  );
}
