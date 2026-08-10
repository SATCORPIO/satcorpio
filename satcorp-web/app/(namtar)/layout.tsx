import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "NAMTAR   Survive. Adapt. Concore.",
  description:
    "A next-generation open-world survival experience where exploration, technology, AI and player freedom redefine what survival means.",
};

export default function NamtarLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="namtar">{children}</DivisionShell>;
}
