import type { Metadata } from "next";
import { DivisionShell } from "@/components/system/DivisionShell";
import { ONE_LINER, TITLE } from "@/components/worlds/kira/forfeiture";

/**
 * The description is the Steam one-liner and nothing else. It is the sentence
 * the game was positioned on, it says the genre and the differentiator in one
 * breath, and a search result is exactly the place where a reader decides in
 * three seconds whether this is the thing they have been looking for.
 */
export const metadata: Metadata = {
  title: `${TITLE}   Ki-Ra Studios`,
  description: ONE_LINER,
};

export default function ForfeitureLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="forfeiture">{children}</DivisionShell>;
}
