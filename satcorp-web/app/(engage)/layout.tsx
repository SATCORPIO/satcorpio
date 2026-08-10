import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "The Engagement Brief",
  description:
    "Open a file with SATCORP. Clarity, scope, execution   the Concierge Engagement Model.",
  robots: { index: false, follow: true },
};

export default function EngageLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="engage">{children}</DivisionShell>;
}
