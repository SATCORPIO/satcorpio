import { z } from "zod";
import { MIN_ELAPSED_MS } from "./intake-schema";

/**
 * THE HANDLE CLAIM   shape and rules.
 *
 * Shared by the client form and the server action, so validation cannot drift
 * between them   the server re-runs every check here rather than trusting the
 * client's copy of the rules.
 *
 * A handle is an identity, so `normaliseHandle` is a security control, not a
 * formatting nicety (build plan §6.3). It is exported as a pure, synchronous
 * function precisely so it can be unit-tested without a request; the schema
 * and the live in-form validation both call through it rather than each
 * carrying their own copy of the rules.
 */

export const RESERVATION_INTENTS = [
  "Member",
  "Creator",
  "Community",
  "Business",
  "Developer",
] as const;

export type ReservationIntent = (typeof RESERVATION_INTENTS)[number];

/**
 * Every division id, plus the words a handle claim would be able to
 * impersonate or that the platform itself will need. Permanently incomplete
 * by nature, the same way `SERVICE_ALIASES` in `registry-index.ts` is   a
 * name that slips through here is the cheapest source of an addition.
 */
const RESERVED_HANDLES = new Set([
  "satcorp",
  "satcorpio",
  "pulse",
  "kyrax",
  "anu",
  "namtar",
  "kira",
  "kirastudios",
  "official",
  "support",
  "help",
  "admin",
  "administrator",
  "mod",
  "moderator",
  "staff",
  "system",
  "api",
  "www",
  "mail",
  "security",
  "billing",
  "root",
  "null",
  "undefined",
]);

// Zero-width space, zero-width non-joiner/joiner, and the byte-order mark    a
// handle built from these characters would be visually indistinguishable from
// one without them. Built from character codes rather than a regex escape
// literal so the codepoints are unambiguous on the page and in a diff.
const ZERO_WIDTH_CODEPOINTS = [0x200b, 0x200c, 0x200d, 0xfeff];
const ZERO_WIDTH = new RegExp(
  `[${ZERO_WIDTH_CODEPOINTS.map((code) => String.fromCharCode(code)).join("")}]`,
  "g",
);

/**
 * Folded on the *comparison* key only   never on the stored handle. Exactly
 * the substitutions plan §6.3 names; this is a security boundary, not a
 * leetspeak decoder, so it stays deliberately narrow rather than growing to
 * catch every visually-similar character.
 */
const CONFUSABLES: Record<string, string> = { "0": "o", "1": "l", _: "" };

function foldConfusables(input: string): string {
  return input.replace(/[01_]/g, (ch) => CONFUSABLES[ch] ?? ch);
}

export interface NormalisedHandle {
  /** The handle as it will be stored and displayed. */
  handle: string;
  /** The folded form used for uniqueness and reserved-word comparison only. */
  key: string;
}

/**
 * Normalises and validates a handle in one pass. Returns `null` on any
 * rejection rather than a reason   the caller decides what to say, and the
 * live in-form check and the server schema both want different copy for the
 * same `null`.
 */
export function normaliseHandle(input: unknown): NormalisedHandle | null {
  if (typeof input !== "string") return null;

  // 1. NFKC, then casefold. 2. Strip zero-width characters outright.
  const handle = input
    .normalize("NFKC")
    .toLowerCase()
    .replace(ZERO_WIDTH, "")
    .trim();

  // 3. ASCII only for phase one   confusable-character defence across full
  // Unicode is its own project, and shipping it half-done is worse than
  // deferring it.
  if (!/^[a-z0-9_]{3,24}$/.test(handle)) return null;

  // 6. No all-digits, no leading underscore.
  if (/^\d+$/.test(handle) || handle.startsWith("_")) return null;

  // 4. Fold confusables for comparison only.
  const key = foldConfusables(handle);

  // 5. Reserved words, checked against both forms   "satc0rp" must not slip
  // past "satcorp" being reserved.
  if (RESERVED_HANDLES.has(handle) || RESERVED_HANDLES.has(key)) return null;

  return { handle, key };
}

export const pulseReservationSchema = z.object({
  handle: z
    .string()
    .trim()
    .min(3, "Three characters, at least.")
    .max(24, "Twenty-four characters is the ceiling.")
    .refine((v) => normaliseHandle(v) !== null, {
      message: "That name is not available to claim.",
    }),
  contact: z
    .string()
    .trim()
    .min(3, "I'll need a way to reach you.")
    .max(200)
    .email("That doesn't read as an address."),
  intent: z.enum(RESERVATION_INTENTS),

  /* --- Quiet checks. Neither is ever shown to a person. --- */
  // Honeypot: a field only a bot would fill in.
  company_website: z.string().max(0).optional().or(z.literal("")),
  // Time-trap: milliseconds between the form mounting and being submitted.
  elapsedMs: z.coerce.number().int().nonnegative().default(0),
});

export type PulseReservationInput = z.input<typeof pulseReservationSchema>;
export type PulseReservationData = z.output<typeof pulseReservationSchema>;

export type PulseReservationResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export { MIN_ELAPSED_MS };
