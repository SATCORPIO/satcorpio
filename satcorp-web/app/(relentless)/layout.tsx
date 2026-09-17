import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";
import { TITLE } from "@/components/worlds/kira/relentless";

export const metadata: Metadata = {
  title: `${TITLE}   Ki-Ra Studios`,
  description:
    "A mobile 4X survival strategy game where the world escalates against every outpost on a clock, and the map keeps what the sector held.",
};

export default function RelentlessLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="relentless">{children}</DivisionShell>;
}
