import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "NAMTAR — Survive. Adapt. Conquer.",
  description:
    "NAMTAR is an open-world post-apocalyptic survival game: KYRAX AI woven into combat, vehicles and bases, player-run Empires, a fully destructible world, and land, sea and air as one theatre. In development at Ki-Ra Studios on Unreal Engine 5.",
};

export default function NamtarLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="namtar">{children}</DivisionShell>;
}
