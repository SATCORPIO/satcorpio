import type { MetadataRoute } from "next";
import { DIVISIONS } from "@/lib/divisions";
import { LEGAL } from "@/lib/legal";

/**
 * THE SITEMAP   derived, not hand-maintained.
 *
 * `DIVISIONS` is already the single source of truth for every establishment's
 * route (`lib/divisions.ts` feeds the tab bar, the front-page network, and
 * now this). Adding a division there is what it takes for the sitemap to
 * pick it up too, rather than a second list somebody has to remember to
 * update.
 *
 * Routes that are not a division get listed explicitly below   there are few
 * enough of them (the two intake doors, the two legal documents, and PULSE's
 * own specification) that a derived list would cost more clarity than it
 * saves. NAMTAR RELENTLESS no longer needs an entry here: it's a division
 * now, so the loop below picks it up.
 */

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/engage", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partner", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pulse/specification", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const divisionEntries: MetadataRoute.Sitemap = DIVISIONS.map((d) => ({
    url: `${LEGAL.siteUrl}${d.href}`,
    lastModified: now,
    changeFrequency: d.id === "satcorp" ? "weekly" : "monthly",
    priority: d.href === "/" ? 1 : 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${LEGAL.siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...divisionEntries, ...staticEntries];
}
