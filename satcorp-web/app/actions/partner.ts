"use server";

import { headers } from "next/headers";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  PARTNER_DIVISION_BY_ID,
  PARTNER_MIN_ELAPSED_MS,
  answersForDivision,
  partnerBaseSchema,
  validateAnswers,
  type PartnerDivision,
  type PartnerResult,
} from "@/lib/partner-schema";
import { LEGAL } from "@/lib/legal";
import { createRateLimit } from "@/lib/rate-limit";

/**
 * THE APPROACH   the partnership intake pipeline.
 *
 * Deliberately a separate pipeline from the Engagement Brief, not a flag on it.
 * A client asking for work and an organisation proposing to work alongside us
 * are read by different people, answered on different timescales, and belong in
 * different channels   so this delivers to its own webhook and its own inbox,
 * and files under its own reference series.
 *
 *   PARTNER_WEBHOOK_URL                 → the partnerships channel
 *   RESEND_API_KEY + PARTNER_TO_EMAIL   → email
 *   a JSON file on disk                 → the record, where the disk persists
 *
 * The durability rule from the brief pipeline applies unchanged: on a platform
 * with an ephemeral filesystem a write proves nothing, so at least one
 * transport must succeed before an approach is reported as received.
 */

const EPHEMERAL_FS = Boolean(process.env.VERCEL);

const RECORD_DIR =
  process.env.PARTNER_DIR ??
  (EPHEMERAL_FS
    ? path.join(os.tmpdir(), "satcorp-partner")
    : path.join(process.cwd(), ".partner"));

const rateLimited = createRateLimit({ windowMs: 60_000, max: 3 });

function reference(): string {
  const now = new Date();
  const stamp =
    `${now.getUTCFullYear()}`.slice(2) +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");
  return `SP-${stamp}-${randomUUID().slice(0, 4).toUpperCase()}`;
}

interface Approach {
  division: PartnerDivision;
  name: string;
  organisation: string;
  channel: string;
  contact: string;
  referral: string;
  answers: Record<string, string>;
  notes: string;
}

function asPlainText(approach: Approach, ref: string): string {
  const lines = [
    `SATCORP   PARTNERSHIP APPROACH ${ref}`,
    "",
    `Division:     ${approach.division.name}   ${approach.division.role}`,
    "",
    "WHO",
    `  Name:         ${approach.name}`,
    `  Organisation: ${approach.organisation || " "}`,
    `  Channel:      ${approach.channel}`,
    `  Contact:      ${approach.contact}`,
    `  Referral:     ${approach.referral || " "}`,
    "",
    `${approach.division.name.toUpperCase()}   THE PROPOSAL`,
  ];

  for (const field of approach.division.fields) {
    const value = approach.answers[field.id];
    if (!value) continue;
    lines.push(`  ${field.label}:`);
    lines.push(`    ${value.replace(/\n/g, "\n    ")}`);
  }

  lines.push("", "ANYTHING ELSE", `  ${approach.notes || " "}`);
  return lines.join("\n");
}

/** Writes the record. Never throws   the caller decides what a failure means. */
async function fileRecord(
  approach: Approach,
  ref: string,
  meta: object,
): Promise<boolean> {
  try {
    await fs.mkdir(RECORD_DIR, { recursive: true });
    await fs.writeFile(
      path.join(RECORD_DIR, `${ref}.json`),
      JSON.stringify(
        {
          reference: ref,
          receivedAt: new Date().toISOString(),
          division: approach.division.id,
          ...meta,
          name: approach.name,
          organisation: approach.organisation,
          channel: approach.channel,
          contact: approach.contact,
          referral: approach.referral,
          answers: approach.answers,
          notes: approach.notes,
        },
        null,
        2,
      ),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("[partner] could not write the record", error);
    return false;
  }
}

async function sendEmail(approach: Approach, ref: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.PARTNER_TO_EMAIL ?? process.env.INTAKE_TO_EMAIL;
  const from = process.env.INTAKE_FROM_EMAIL ?? `brief@${LEGAL.domain}`;
  if (!key || !to) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: approach.channel === "Email" ? approach.contact : undefined,
        subject: `Partnership approach ${ref}   ${approach.division.name}   ${approach.name}`,
        text: asPlainText(approach, ref),
      }),
    });

    if (!response.ok) {
      console.error("[partner] resend rejected the approach", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[partner] resend unreachable", error);
    return false;
  }
}

/* ============================================================
   THE DISCORD DOSSIER
   Same document treatment as the engagement brief, arranged
   around the one thing that matters first: which division was
   approached, and by whom.
   ============================================================ */

const EMBED_COLOR = 0xb08d57; // brass
const FIELD_MAX = 1024;
const RULE = "━━━━━━━━━━━━━━━━━━━━━━━━━━━";

interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

function clamp(text: string, max: number): string {
  const trimmed = text.trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max - 1)}…`;
}

/**
 * Long prose across as many fields as it takes, split on a line break where one
 * is available. Capped at two fields; the untruncated text is always in the
 * email and the filed record.
 */
function prose(name: string, text: string): EmbedField[] {
  const body = text.trim();
  if (!body) return [];
  if (body.length <= FIELD_MAX) return [{ name, value: body }];

  const breakAt = body.lastIndexOf("\n", FIELD_MAX);
  const cut = breakAt > FIELD_MAX * 0.6 ? breakAt : FIELD_MAX;
  const rest = body.slice(cut).trim();

  return [
    { name, value: body.slice(0, cut).trim() },
    {
      name: `${name} (continued)`,
      value:
        rest.length <= FIELD_MAX
          ? rest
          : `${clamp(rest, FIELD_MAX - 40)}\n*  truncated. Full text in the record.*`,
    },
  ];
}

function buildEmbed(approach: Approach, ref: string) {
  const intro = [
    approach.organisation ? `**${clamp(approach.organisation, 200)}**` : null,
    `▸ Approaching **${approach.division.name}**   ${approach.division.role}`,
    `▸ Reach via **${approach.channel}**   ${clamp(approach.contact, 200)}`,
    approach.referral ? `▸ Found us via ${clamp(approach.referral, 200)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const fields: EmbedField[] = [
    { name: "​", value: `**THE PROPOSAL**\n${RULE}`, inline: false },
  ];

  for (const field of approach.division.fields) {
    const value = approach.answers[field.id];
    if (!value) continue;
    // Short answers sit side by side; anything written out gets its own row.
    if (field.kind === "textarea") {
      fields.push(...prose(field.label, value));
    } else {
      fields.push({
        name: field.label,
        value: clamp(value, FIELD_MAX),
        inline: true,
      });
    }
  }

  if (approach.notes) {
    fields.push({ name: "​", value: `**ANYTHING ELSE**\n${RULE}` });
    fields.push(...prose("Notes", approach.notes));
  }

  return {
    author: { name: "SATCORP   PARTNERSHIP APPROACH" },
    title: `${ref} · ${clamp(approach.name, 200)}`,
    description: clamp(`${intro}\n${RULE}`, 4096),
    color: EMBED_COLOR,
    // Discord allows 25. The longest branch cannot reach that, but a rejected
    // webhook costs an approach, and a cap costs nothing.
    fields: fields.slice(0, 25),
    footer: { text: `Filed from ${LEGAL.domain} · partnerships` },
    timestamp: new Date().toISOString(),
  };
}

async function sendDiscord(approach: Approach, ref: string): Promise<boolean> {
  // Its own webhook. Falls back to the brief channel only if one was never
  // configured, so a fresh deployment does not silently drop approaches.
  const url =
    process.env.PARTNER_WEBHOOK_URL ?? process.env.DISCORD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "SATCORP",
        embeds: [buildEmbed(approach, ref)],
      }),
    });

    if (!response.ok) {
      console.error(
        "[partner] discord rejected the approach",
        response.status,
        await response.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("[partner] discord unreachable", error);
    return false;
  }
}

export async function submitApproach(raw: unknown): Promise<PartnerResult> {
  const parsed = partnerBaseSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "A few details still need attention.",
      fieldErrors: flattenIssues(parsed.error),
    };
  }

  const data = parsed.data;
  const division = PARTNER_DIVISION_BY_ID[data.division];
  if (!division) {
    return { ok: false, error: "Pick a division to approach." };
  }

  // The branch is validated server-side against the division that was actually
  // chosen, so a payload carrying another division's fields gains nothing.
  const answerErrors = validateAnswers(division, data.answers);
  if (Object.keys(answerErrors).length) {
    return {
      ok: false,
      error: "A few details still need attention.",
      fieldErrors: answerErrors,
    };
  }

  // Screening. Both fail silently and identically to a success, so a bot learns
  // nothing from the response.
  const ref = reference();
  if (data.company_website) return { ok: true, reference: ref };
  if (data.elapsedMs < PARTNER_MIN_ELAPSED_MS) {
    return { ok: true, reference: ref };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return {
      ok: false,
      error: "That's several in quick succession. Give it a minute.",
    };
  }

  const approach: Approach = {
    division,
    name: data.name,
    organisation: data.organisation ?? "",
    channel: data.channel,
    contact: data.contact,
    referral: data.referral ?? "",
    answers: answersForDivision(division, data.answers),
    notes: data.notes ?? "",
  };

  const filed = await fileRecord(approach, ref, {
    userAgent: headerList.get("user-agent") ?? null,
  });

  const [posted, emailed] = await Promise.all([
    sendDiscord(approach, ref),
    sendEmail(approach, ref),
  ]);

  // A scratch file on a recycled instance is not a record.
  const durable = posted || emailed || (filed && !EPHEMERAL_FS);

  if (!durable) {
    console.error(
      `[partner] ${ref} could not be delivered   no transport succeeded` +
        (EPHEMERAL_FS
          ? ". Running on an ephemeral filesystem: set PARTNER_WEBHOOK_URL or RESEND_API_KEY + PARTNER_TO_EMAIL."
          : "."),
      asPlainText(approach, ref),
    );
    return {
      ok: false,
      error: "Something went wrong on my end. Try again in a moment.",
    };
  }

  return { ok: true, reference: ref };
}

/** Narrow helper so the Zod import stays confined to the schema module. */
function flattenIssues(error: {
  issues: { path: PropertyKey[]; message: string }[];
}): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "form";
    (out[key] ??= []).push(issue.message);
  }
  return out;
}
