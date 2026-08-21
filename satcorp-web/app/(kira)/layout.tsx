import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "Ki-Ra Studios — Building Worlds Worth Living In",
  description:
    "SATCORP's interactive entertainment division: immersive games, persistent online worlds and next-generation digital experiences.",
};

export default function KiraLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="kira">{children}</DivisionShell>;
}
