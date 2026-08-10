/**
 * THE PAPERWORK — every fact the legal pages assert, stated once.
 *
 * Terms and the Privacy Policy both make claims about who SATCORP is, where it
 * can be reached, and what law governs. Those claims have to agree with each
 * other or the documents undermine themselves, so they live here rather than
 * being typed twice.
 *
 * When any of this changes, bump `revised` — a policy whose date does not move
 * when its substance moves is worse than no date at all.
 */

export const LEGAL = {
  /** Trading name. */
  entity: "SATCORP",

  /**
   * Legal form, as it stands today. SATCORP is not yet incorporated, so the
   * documents bind an individual trading under a name. Replace this line and
   * `registration` on the day the entity is formed.
   */
  form: "an unincorporated business established in the United States and trading as SATCORP",

  /** Registered name and number, once there is one. */
  registration: null as string | null,

  domain: "satcorp.io",
  siteUrl: "https://satcorp.io",

  /** Published for privacy requests, legal notices and copyright complaints. */
  contactEmail: "satcorpvk@gmail.com",

  /**
   * Governing state. Left unset until SATCORP has a stated principal place of
   * business; `governingLaw()` renders a determinate clause either way, so the
   * documents are enforceable now and get sharper the day this is filled in.
   */
  governingState: null as string | null,

  /** Date these documents took effect, and the date of the current revision. */
  effective: "9 August 2026",
  revised: "9 August 2026",
  version: "1.0",

  /** How long a sealed brief is kept once a matter closes. */
  retentionMonths: 24,
} as const;

/**
 * The governing-law phrase. Naming a state is better; not naming one is still
 * determinate, because a principal place of business is a question of fact.
 */
export function governingLaw(): string {
  return LEGAL.governingState
    ? `the laws of the State of ${LEGAL.governingState}, United States of America`
    : "the laws of the United States and of the State in which SATCORP maintains its principal place of business";
}

/** Courts with exclusive jurisdiction, phrased to match `governingLaw()`. */
export function governingForum(): string {
  return LEGAL.governingState
    ? `the state and federal courts located in the State of ${LEGAL.governingState}`
    : "the state and federal courts serving SATCORP's principal place of business";
}

export interface LegalRoute {
  href: string;
  label: string;
}

/** The links that must appear on every page of the site. */
export const LEGAL_ROUTES: LegalRoute[] = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/privacy#cookies", label: "Cookies" },
];
