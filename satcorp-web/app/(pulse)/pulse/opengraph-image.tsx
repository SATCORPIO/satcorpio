import { ImageResponse } from "next/og";
import { OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "PULSE   The Digital Frontline of SATCORP";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "On Air",
      title: "PULSE",
      subtitle:
        "Your audience. Your community. Your identity. One place.",
      footer: "SATCORP / PULSE",
    }),
    size,
  );
}
