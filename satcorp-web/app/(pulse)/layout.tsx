import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "PULSE — The Digital Frontline of SATCORP",
  description:
    "Pulse connects creators, communities, audiences and experiences through a unified platform built for engagement, interaction and growth.",
};

export default function PulseLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="pulse">{children}</DivisionShell>;
}
