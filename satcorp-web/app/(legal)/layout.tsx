import { DivisionShell } from "@/components/system/DivisionShell";

/**
 * THE RECORD ROOM   Terms and the Privacy Policy.
 *
 * Dressed as the engagement theme rather than an establishment of its own:
 * these pages are the paperwork behind the brief, and they should feel like it.
 * They are indexable on purpose   a legal page a search engine cannot find is a
 * legal page a regulator will treat as unpublished.
 */
export default function LegalLayout({ children }: LayoutProps<"/">) {
  return <DivisionShell theme="engage">{children}</DivisionShell>;
}
