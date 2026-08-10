import { z } from "zod";

/**
 * THE ENGAGEMENT BRIEF   shape and rules.
 *
 * Shared by the client form and the server action, so validation cannot drift
 * between them. Error messages are written in the Concierge voice: a form that
 * scolds you is a form that loses you.
 */

export const CONTACT_CHANNELS = [
  "Email",
  "Discord",
  "Phone",
  "Whatever is discreet",
] as const;

export const CADENCES = [
  "Daily notes",
  "Twice weekly",
  "Weekly summary",
  "Only when it matters",
] as const;

export const TIMELINES = [
  "Yesterday",
  "Within a month",
  "One to three months",
  "No fixed date",
] as const;

export const intakeSchema = z.object({
  /* --- I. CLARITY --- */
  name: z
    .string()
    .trim()
    .min(2, "I'll need something to call you.")
    .max(120),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  channel: z.enum(CONTACT_CHANNELS),
  contact: z
    .string()
    .trim()
    .min(3, "I'll need a way to reach you.")
    .max(200),
  matter: z
    .string()
    .trim()
    .min(20, "A little more. The detail is where the work actually lives.")
    .max(4000),
  referral: z.string().trim().max(200).optional().or(z.literal("")),

  /* --- II. SCOPE --- */
  services: z.array(z.string()).max(60).default([]),
  retainer: z.string().trim().max(40).optional().or(z.literal("")),
  timeline: z.enum(TIMELINES).optional(),
  existingAssets: z.string().trim().max(2000).optional().or(z.literal("")),

  /* --- III. EXECUTION --- */
  cadence: z.enum(CADENCES).optional(),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),

  /* --- Quiet checks. Neither is ever shown to a person. --- */
  // Honeypot: a field only a bot would fill in.
  company_website: z.string().max(0).optional().or(z.literal("")),
  // Time-trap: milliseconds between the form mounting and being submitted.
  elapsedMs: z.coerce.number().int().nonnegative().default(0),
});

export type IntakeInput = z.input<typeof intakeSchema>;
export type IntakeData = z.output<typeof intakeSchema>;

export type IntakeResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** No human completes this form in under four seconds. */
export const MIN_ELAPSED_MS = 4000;
