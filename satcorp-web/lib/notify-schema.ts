import { z } from "zod";

/**
 * FIELD NOTES — shape and rules for the forwarding list.
 *
 * The smallest intake on the site, and deliberately so. The Engagement Brief
 * asks a client what they want built; the Approach asks an organisation what it
 * proposes. This asks for one thing: where to send a note when there is
 * something worth sending. Every extra field on a form like this is a reader
 * lost for nothing, because there is nothing here to qualify — the studio is
 * not selecting anybody, it is keeping an address.
 *
 * Two things it does insist on, and both are deliberate:
 *
 *   **Consent is explicit.** This list will be written to for years and read by
 *   people in jurisdictions where a pre-ticked box is not consent. A checkbox
 *   costs one interaction and settles the question permanently.
 *
 *   **The channel is chosen, not assumed.** A reader who lives in the studio's
 *   Discord should not have to surrender an email address to hear about a
 *   prototype, and asking for one anyway is how a list fills with addresses
 *   nobody reads.
 */

export const NOTIFY_CHANNELS = ["Email", "Discord"] as const;
export type NotifyChannel = (typeof NOTIFY_CHANNELS)[number];

/** Deliberately loose. A validator that rejects real addresses is a bug. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const notifySchema = z
  .object({
    via: z.enum(NOTIFY_CHANNELS),

    contact: z
      .string()
      .trim()
      .min(3, "I'll need somewhere to send it.")
      .max(200),

    /**
     * Optional, and it earns its place: the announcement is a recruiting
     * surface as much as an audience one, and the people worth hearing from
     * will say why they are here in one line.
     */
    note: z.string().trim().max(600).optional().or(z.literal("")),

    consent: z
      .boolean()
      .refine((v) => v === true, "I'd rather have this in writing."),

    /* --- Quiet checks. Neither is ever shown to a person. --- */
    company_website: z.string().max(0).optional().or(z.literal("")),
    elapsedMs: z.coerce.number().int().nonnegative().default(0),
  })
  .superRefine((data, ctx) => {
    // Checked here rather than in the field so the rule follows the channel:
    // an address is required to look like one, a handle is not.
    if (data.via === "Email" && !EMAIL.test(data.contact)) {
      ctx.addIssue({
        code: "custom",
        path: ["contact"],
        message: "That doesn't look like an address I can reach.",
      });
    }
  });

export type NotifyInput = z.input<typeof notifySchema>;
export type NotifyData = z.output<typeof notifySchema>;

export type NotifyResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** Nobody fills in three fields in under two and a half seconds. */
export const NOTIFY_MIN_ELAPSED_MS = 2500;
