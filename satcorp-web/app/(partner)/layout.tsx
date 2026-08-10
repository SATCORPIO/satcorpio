import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "Partner With SATCORP",
  description:
    "Propose an arrangement with a SATCORP division   technology, studio, creator, community or infrastructure.",
  robots: { index: false, follow: true },
};

export default function PartnerLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="engage">{children}</DivisionShell>;
}
