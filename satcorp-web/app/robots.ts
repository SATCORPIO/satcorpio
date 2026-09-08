import type { MetadataRoute } from "next";
import { LEGAL } from "@/lib/legal";

/**
 * Nothing on this site needs to be hidden from a crawler   there is no
 * authenticated area, no draft content, and no query-string state worth
 * excluding. One rule, allowing everything, pointing at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${LEGAL.siteUrl}/sitemap.xml`,
  };
}
