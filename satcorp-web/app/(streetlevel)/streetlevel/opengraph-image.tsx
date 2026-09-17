import { ImageResponse } from "next/og";
import { OG_SIZE, ogCard } from "@/lib/og-card";
import {
  POSITIONING,
  STANDING_SHORT,
  TITLE,
} from "@/components/worlds/kira/streetlevel";

/**
 * The link-preview card, and on this page it is the advertisement rather than
 * an accessory to one: with no store page and no capture, it is the whole of
 * what a reader sees when somebody pastes the URL into a room they already
 * belong to.
 *
 * The subtitle is the positioning line rather than the stake, which is the
 * opposite of the instinct. *Everything you build can be taken* is the better
 * five words and the worse preview: in a card seen for one second beside a
 * dozen others, the line that has to land is the one nobody else could have
 * written.
 *
 * `STANDING_SHORT` rather than the full standing. At 22px with six units of
 * letter-spacing the long form runs most of the card's width and starts
 * competing with the title.
 *
 * No live dot. That one belongs to PULSE and it means "on air"; on a game that
 * has not been built it would be the first thing here to overclaim.
 */

export const alt = `${TITLE}   ${POSITIONING}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: STANDING_SHORT,
      title: TITLE,
      subtitle: POSITIONING,
      footer: "SATCORP / KI-RA STUDIOS",
      accent: "#6e8c5a",
      background: "#08090a",
      live: false,
    }),
    size,
  );
}
