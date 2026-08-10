import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "ANU   Lead Systems Architect & Technical Concierge",
  description:
    "Engineering the SATCORP ecosystem. Full-stack development, enterprise-grade infrastructure, and bespoke digital solutions.",
};

export default function AnuLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="anu">{children}</DivisionShell>;
}
