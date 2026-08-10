import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";

export const metadata: Metadata = {
  title: "KYRAX — Tactical Intelligence. Connected Systems.",
  description:
    "KYRAX is SATCORP's advanced intelligence architecture — designed to connect, analyze, automate and evolve the systems that power the ecosystem.",
};

export default function KyraxLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="kyrax">{children}</DivisionShell>;
}
