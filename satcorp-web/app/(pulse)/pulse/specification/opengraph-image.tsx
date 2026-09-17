import { ImageResponse } from "next/og";
import { OG_SIZE, ogCard } from "@/lib/og-card";

export const alt = "PULSE Specification   SATCORP";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "File Pulse-Spec",
      title: "Specification",
      subtitle:
        "Identity, Spaces, the Creator Hub, the roadmap, the doctrine, and a sketch of the API.",
      footer: "SATCORP / PULSE",
    }),
    size,
  );
}
