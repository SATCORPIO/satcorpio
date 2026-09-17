import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";
import { TITLE as RELENTLESS } from "@/components/worlds/kira/relentless";
import { TITLE as FORFEITURE } from "@/components/worlds/kira/forfeiture";
import { TITLE as STREET_LEVEL } from "@/components/worlds/kira/streetlevel";

/**
 * The description names every title because the studio now has a slate rather
 * than a flagship, and a search result that mentions only one of them sends
 * that title's audience to the wrong page.
 *
 * This is external use of an uncleared mark, exactly as the page body is. If
 * the title is held back, hold this line with it   which is why it interpolates
 * the same constant rather than spelling the name out again. Two of the four
 * are uncleared now, and both interpolate for the same reason.
 *
 * **This is the one string on the site where the two crime titles are named in
 * the same breath, and it is deliberate rather than an oversight.** Their pages
 * are isolated from each other by decision: neither names the other, they share
 * no copy module, no accent, no file series and no consent scope. But this is
 * the studio's own page, its body already carries all four titles, and a slate
 * that lists three of them to protect the fourth is theatre rather than
 * isolation. A studio page showing a studio's games is the ordinary thing; what
 * the isolation rules actually prevent is either *title* page doing the linking.
 */
export const metadata: Metadata = {
  title: "Ki-Ra Studios   Building Worlds Worth Living In",
  description: `SATCORP's interactive entertainment division: immersive games, persistent online worlds and next-generation digital experiences. Home of NAMTAR, ${RELENTLESS}, ${FORFEITURE} and ${STREET_LEVEL}.`,
};

export default function KiraLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="kira">{children}</DivisionShell>;
}
