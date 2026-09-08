import { ImageResponse } from "next/og";
import { OG_SIZE, pulseOgCard } from "@/lib/pulse-og";

export const alt = "PULSE   The Digital Frontline of SATCORP";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    pulseOgCard({
      eyebrow: "On Air",
      title: "PULSE",
      subtitle:
        "Your audience. Your community. Your identity. One place.",
    }),
    size,
  );
}
