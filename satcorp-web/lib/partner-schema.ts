import { z } from "zod";

/**
 * PARTNER WITH SATCORP   shape and rules.
 *
 * A different animal to the Engagement Brief. The Brief is for a client buying
 * work; this is for an organisation, studio, creator or operator proposing to
 * work *alongside* a division. So the intake branches: pick the division, and
 * the questions that follow are the ones that division actually needs answered
 * before anyone's time is spent.
 *
 * Answers are collected as a map keyed by field id rather than as a fixed
 * object. Six divisions with their own question sets would otherwise be a
 * thirty-field schema where twenty-five fields are blank on every submission.
 * The server re-derives which fields belong to the chosen division and
 * validates against that, so a forged division/field pair gets nowhere.
 */

export const PARTNER_CHANNELS = [
  "Email",
  "Discord",
  "Phone",
  "Whatever is discreet",
] as const;

export type PartnerFieldKind = "text" | "textarea" | "choice";

export interface PartnerField {
  id: string;
  label: string;
  kind: PartnerFieldKind;
  /** Present on `choice` fields; the only accepted values. */
  options?: readonly string[];
  hint?: string;
  placeholder?: string;
  required?: boolean;
  max?: number;
}

export interface PartnerDivision {
  id: string;
  name: string;
  /** What partnering with this division actually means, in one line. */
  role: string;
  /** Who this branch is for. Shown on the division card. */
  audience: string;
  fields: PartnerField[];
}

const TEXT_MAX = 300;
const LONG_MAX = 2500;

export const PARTNER_DIVISIONS: PartnerDivision[] = [
  {
    id: "satcorp",
    name: "SATCORP",
    role: "The organization",
    audience:
      "Companies, vendors and operators proposing to work with the ecosystem itself.",
    fields: [
      {
        id: "arrangement",
        label: "Nature of the arrangement",
        kind: "choice",
        required: true,
        options: [
          "Technology partner",
          "Infrastructure or hosting",
          "Reseller or referral",
          "Strategic or investment",
          "Vendor or supplier",
        ],
      },
      {
        id: "organisationType",
        label: "What kind of operation are you",
        kind: "text",
        placeholder: "Agency, studio, vendor, independent",
        max: TEXT_MAX,
      },
      {
        id: "bring",
        label: "What you bring",
        kind: "textarea",
        required: true,
        hint: "Capability, capacity, reach, or something we do not currently have.",
        placeholder: "Be specific. Generalities cost us both a fortnight.",
        max: LONG_MAX,
      },
      {
        id: "want",
        label: "What you would want from SATCORP",
        kind: "textarea",
        required: true,
        placeholder: "The arrangement as you see it from your side.",
        max: LONG_MAX,
      },
      {
        id: "footprint",
        label: "Where you operate",
        kind: "text",
        hint: "Region, time zone, and whether that matters to the work.",
        max: TEXT_MAX,
      },
    ],
  },
  {
    id: "anu",
    name: "ANU",
    role: "The architect",
    audience:
      "Designers, engineers and studios proposing to build alongside the practice.",
    fields: [
      {
        id: "arrangement",
        label: "Nature of the arrangement",
        kind: "choice",
        required: true,
        options: [
          "Subcontract or white-label",
          "Joint venture on a project",
          "Referral partner",
          "Advisory or fractional",
        ],
      },
      {
        id: "discipline",
        label: "Your discipline",
        kind: "text",
        required: true,
        placeholder: "Front-end, systems, brand, 3D, infrastructure",
        max: TEXT_MAX,
      },
      {
        id: "work",
        label: "Work we can look at",
        kind: "text",
        required: true,
        hint: "A link is fine. Two is better.",
        placeholder: "https://",
        max: TEXT_MAX,
      },
      {
        id: "capacity",
        label: "Capacity and availability",
        kind: "text",
        placeholder: "Hours a week, notice period, current commitments",
        max: TEXT_MAX,
      },
      {
        id: "shape",
        label: "What the collaboration looks like",
        kind: "textarea",
        required: true,
        placeholder: "How you would want the work divided, and on what terms.",
        max: LONG_MAX,
      },
    ],
  },
  {
    id: "kyrax",
    name: "KYRAX",
    role: "The brain",
    audience:
      "Data holders, research groups and integration partners for the intelligence layer.",
    fields: [
      {
        id: "arrangement",
        label: "Nature of the arrangement",
        kind: "choice",
        required: true,
        options: [
          "Data or signal source",
          "Model or research collaboration",
          "Integration or API partner",
          "Applied AI pilot",
        ],
      },
      {
        id: "systems",
        label: "What you would connect",
        kind: "textarea",
        required: true,
        hint: "The systems, feeds or datasets on your side of the join.",
        max: LONG_MAX,
      },
      {
        id: "stack",
        label: "Your stack",
        kind: "text",
        placeholder: "Languages, platforms, model providers, transport",
        max: TEXT_MAX,
      },
      {
        id: "constraints",
        label: "Handling constraints",
        kind: "textarea",
        hint: "Residency, retention, licensing, regulated data. Say it now, not later.",
        max: LONG_MAX,
      },
      {
        id: "outcome",
        label: "The outcome you are after",
        kind: "textarea",
        required: true,
        placeholder: "What would have to be true for this to be worth doing.",
        max: LONG_MAX,
      },
    ],
  },
  {
    id: "kira",
    name: "Ki-Ra Studios",
    role: "The creator",
    audience:
      "Studios, publishers, contractors and creators working on interactive titles.",
    fields: [
      {
        id: "arrangement",
        label: "Nature of the arrangement",
        kind: "choice",
        required: true,
        options: [
          "Co-development studio",
          "Publishing or funding",
          "Contract art, audio or engineering",
          "Creator or community program",
          "Server or infrastructure partner",
        ],
      },
      {
        id: "craft",
        label: "Your craft",
        kind: "text",
        required: true,
        placeholder: "Environment art, gameplay, audio, tech art, production",
        max: TEXT_MAX,
      },
      {
        id: "reel",
        label: "Portfolio or reel",
        kind: "text",
        required: true,
        placeholder: "https://",
        max: TEXT_MAX,
      },
      {
        id: "shipped",
        label: "What you have shipped",
        kind: "textarea",
        hint: "Titles, platforms, and what part of them was yours.",
        max: LONG_MAX,
      },
      {
        id: "team",
        label: "Team size and availability",
        kind: "text",
        placeholder: "Solo, five people, a studio of forty",
        max: TEXT_MAX,
      },
      {
        id: "interest",
        label: "What you would want to work on",
        kind: "textarea",
        required: true,
        max: LONG_MAX,
      },
    ],
  },
  {
    id: "namtar",
    name: "NAMTAR",
    role: "The world",
    audience:
      "Testers, creators, cluster operators and contributors to the world itself.",
    fields: [
      {
        id: "arrangement",
        label: "How you would take part",
        kind: "choice",
        required: true,
        options: [
          "Playtesting and feedback",
          "Content creation and coverage",
          "Server or cluster operator",
          "World, lore or design contribution",
          "Tooling, mods or integrations",
        ],
      },
      {
        id: "platforms",
        label: "Platforms and community",
        kind: "text",
        required: true,
        placeholder: "Where you post, stream, or run a community",
        max: TEXT_MAX,
      },
      {
        id: "links",
        label: "Links",
        kind: "text",
        hint: "Channel, guild, server, or whatever stands in for a résumé here.",
        placeholder: "https://",
        max: TEXT_MAX,
      },
      {
        id: "reach",
        label: "Size and cadence",
        kind: "text",
        placeholder: "Members, average viewers, how often you run",
        max: TEXT_MAX,
      },
      {
        id: "contribution",
        label: "What you would bring to the world",
        kind: "textarea",
        required: true,
        max: LONG_MAX,
      },
    ],
  },
  {
    id: "pulse",
    name: "PULSE",
    role: "The heartbeat",
    audience:
      "Creators, communities, event partners and sponsors on the network.",
    fields: [
      {
        id: "arrangement",
        label: "Nature of the arrangement",
        kind: "choice",
        required: true,
        options: [
          "Creator on the network",
          "Community or guild",
          "Event or broadcast partner",
          "Sponsor or brand",
          "Platform or analytics integration",
        ],
      },
      {
        id: "handles",
        label: "Platforms and handles",
        kind: "text",
        required: true,
        placeholder: "@you, and where",
        max: TEXT_MAX,
      },
      {
        id: "audience",
        label: "Audience and cadence",
        kind: "text",
        placeholder: "Size, engagement, how often you go live",
        max: TEXT_MAX,
      },
      {
        id: "formats",
        label: "Formats you run",
        kind: "textarea",
        hint: "Streams, events, series, campaigns   whatever the calendar looks like.",
        max: LONG_MAX,
      },
      {
        id: "want",
        label: "What you want out of the network",
        kind: "textarea",
        required: true,
        max: LONG_MAX,
      },
    ],
  },
];

export const PARTNER_DIVISION_BY_ID = Object.fromEntries(
  PARTNER_DIVISIONS.map((d) => [d.id, d]),
) as Record<string, PartnerDivision>;

export const PARTNER_DIVISION_IDS = PARTNER_DIVISIONS.map(
  (d) => d.id,
) as [string, ...string[]];

/**
 * The shared half of the form. Everything division-specific lands in `answers`
 * and is checked against the chosen division by `validatePartner`.
 */
export const partnerBaseSchema = z.object({
  division: z.enum(PARTNER_DIVISION_IDS),

  name: z.string().trim().min(2, "I'll need something to call you.").max(120),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  channel: z.enum(PARTNER_CHANNELS),
  contact: z.string().trim().min(3, "I'll need a way to reach you.").max(200),
  referral: z.string().trim().max(200).optional().or(z.literal("")),

  answers: z.record(z.string(), z.string().max(4000)).default({}),

  notes: z.string().trim().max(2000).optional().or(z.literal("")),

  /* --- Quiet checks. Neither is ever shown to a person. --- */
  company_website: z.string().max(0).optional().or(z.literal("")),
  elapsedMs: z.coerce.number().int().nonnegative().default(0),
});

export type PartnerInput = z.input<typeof partnerBaseSchema>;
export type PartnerData = z.output<typeof partnerBaseSchema>;

export type PartnerResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** No human completes this form in under four seconds. */
export const PARTNER_MIN_ELAPSED_MS = 4000;

/**
 * Validates the branch. Returns errors keyed the way the form addresses its
 * inputs (`answers.<fieldId>`), so the client can drop them straight onto the
 * field that caused them.
 */
export function validateAnswers(
  division: PartnerDivision,
  answers: Record<string, string>,
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const field of division.fields) {
    const raw = (answers[field.id] ?? "").trim();

    if (field.required && raw.length === 0) {
      errors[`answers.${field.id}`] = ["This one I do need."];
      continue;
    }
    if (raw.length === 0) continue;

    if (raw.length > (field.max ?? LONG_MAX)) {
      errors[`answers.${field.id}`] = ["A little shorter, if you can."];
      continue;
    }
    if (field.kind === "choice" && !field.options?.includes(raw)) {
      errors[`answers.${field.id}`] = ["Pick one of the options offered."];
    }
    if (field.kind === "textarea" && field.required && raw.length < 12) {
      errors[`answers.${field.id}`] = [
        "A little more. The detail is where the work actually lives.",
      ];
    }
  }

  return errors;
}

/** Drops answers that do not belong to the chosen division. */
export function answersForDivision(
  division: PartnerDivision,
  answers: Record<string, string>,
): Record<string, string> {
  const kept: Record<string, string> = {};
  for (const field of division.fields) {
    const value = (answers[field.id] ?? "").trim();
    if (value) kept[field.id] = value;
  }
  return kept;
}
