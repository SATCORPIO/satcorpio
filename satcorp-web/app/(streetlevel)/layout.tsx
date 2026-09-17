import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";
import { POSITIONING, STAKE, TITLE } from "@/components/worlds/kira/streetlevel";

/**
 * The description is the positioning line and the stake, in that order, which
 * is the same order the hero uses and for the same reason: a search result is
 * where a reader decides in three seconds whether this is the thing they have
 * been looking for, and the differentiating sentence has to be the one they
 * read first.
 *
 * Note what is absent, deliberately. No studio slate, no sibling title, no
 * engine, no universe. `GDD.md` §1.9 isolates this title from the studio's
 * other crime game until it has proven itself, and a metadata description is
 * exactly the kind of place that isolation gets broken by accident, because it
 * is the one string nobody re-reads.
 */
export const metadata: Metadata = {
  title: `${TITLE}   Ki-Ra Studios`,
  description: `${POSITIONING} ${STAKE}`,
};

export default function StreetLevelLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="streetlevel">{children}</DivisionShell>;
}
