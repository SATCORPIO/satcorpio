import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

/**
 * PLAN §7.6   INFRASTRUCTURE IS NOT A PRIVACY CLAIM
 *
 * The site's whole positioning rests on the privacy policy being literally
 * true. Track B stores user media with a third party (build plan §9.2), so
 * any page claiming "we host everything ourselves" becomes false the day the
 * platform opens   and it will be quoted back. Pages describe *conduct*
 * ("no advertising"), never *topology* ("your data never leaves our
 * servers"). Where topology matters to a reader it belongs in the
 * sub-processor register (plan §9.3.1), the one surface built to stay
 * accurate as the infrastructure moves.
 *
 * A source scan rather than a review checklist, because a checklist gets
 * skipped under deadline and a failing test does not. This list is
 * permanently incomplete by nature, the same way `SERVICE_ALIASES` in
 * `registry-index.ts` is   a phrase that slips through here and gets caught
 * in review is the cheapest source of an addition.
 */

const BANNED: [RegExp, string][] = [
  [/never leaves our (own )?servers/i, '"never leaves our servers"'],
  [/fully self[- ]hosted/i, '"fully self-hosted"'],
  // Deliberately narrow: "no third-party trackers/analytics/advertisers" is
  // legitimate, true conduct copy that appears throughout the real privacy
  // policy. What is actually banned is the broader claim that no third party
  // is involved at all, which the sharing section's named vendor list
  // already contradicts by design.
  [
    /no third[- ]part(y|ies)(?!\s+(tracker|analytic|advertis|marketing))/i,
    '"no third parties" used as a blanket claim rather than about trackers/analytics/advertising specifically',
  ],
  [/we (host|store) everything (ourselves|in[- ]house)/i, '"we host/store everything ourselves"'],
  [/your data (is|stays) (only )?ours/i, '"your data is ours"'],
  [/we run our own iron/i, '"we run our own iron" (true of the app, not of user media)'],
];

// Scanned files, not just PULSE's: the rule is site-wide (plan §7.6), and the
// doctrine is cheapest to protect everywhere at once.
const SOURCE_FILES = globSync("{app,components,lib}/**/*.{ts,tsx}", {
  exclude: ["**/node_modules/**"],
});

describe("privacy copy claims conduct, never topology (plan §7.6)", () => {
  it("scanned at least one source file", () => {
    // A regression in the glob itself   an empty match set   would make
    // every test below vacuously pass, which is worse than not having them.
    expect(SOURCE_FILES.length).toBeGreaterThan(50);
  });

  for (const file of SOURCE_FILES) {
    it(`${file}   carries none of the banned phrases`, () => {
      const source = readFileSync(file, "utf8");
      for (const [pattern, label] of BANNED) {
        expect(source, `${file} matched ${label}`).not.toMatch(pattern);
      }
    });
  }
});
