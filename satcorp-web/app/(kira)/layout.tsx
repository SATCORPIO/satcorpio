import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";
import { TITLE as RELENTLESS } from "@/components/worlds/kira/relentless";

/**
 * The description names both titles because the studio now has a slate rather
 * than a flagship, and a search result that mentions only one of them sends the
 * mobile audience to the wrong page.
 *
 * This is external use of an uncleared mark, exactly as the page body is. If
 * the title is held back, hold this line with it — which is why it interpolates
 * the same constant rather than spelling the name out again.
 */
export const metadata: Metadata = {
  title: "Ki-Ra Studios   Building Worlds Worth Living In",
  description: `SATCORP's interactive entertainment division: immersive games, persistent online worlds and next-generation digital experiences. Home of NAMTAR and ${RELENTLESS}.`,
};

export default function KiraLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="kira">{children}</DivisionShell>;
}
