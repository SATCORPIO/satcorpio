import { ImageResponse } from "next/og";
import { OG_SIZE, ogCard } from "@/lib/og-card";
import { HEADLINE, STANDING, TITLE } from "@/components/worlds/kira/forfeiture";

/**
 * The link-preview card, and for a title with no store page and no trailer it
 * is the closest thing to an advertisement the studio currently owns: it is
 * the whole of what a reader sees when somebody pastes the URL into a Discord
 * they already belong to.
 *
 * No live dot. That one is PULSE's and it means "on air"   on a game in
 * pre-production it would be the first thing on this page to overclaim.
 */

export const alt = `${TITLE}   ${HEADLINE}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: STANDING,
      title: TITLE,
      subtitle: HEADLINE,
      footer: "SATCORP / KI-RA STUDIOS",
      accent: "#5a7d94",
      background: "#08090a",
      live: false,
    }),
    size,
  );
}
