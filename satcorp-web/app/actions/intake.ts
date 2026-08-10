"use server";

import { headers } from "next/headers";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  intakeSchema,
  MIN_ELAPSED_MS,
  type IntakeData,
  type IntakeResult,
} from "@/lib/intake-schema";
import { LEDGER, LEDGER_ITEM_BY_ID } from "@/lib/ledger-catalog";
import { LEGAL } from "@/lib/legal";

/**
 * THE SEAL — the intake pipeline.
 *
 * Validates, screens, then delivers by whatever transports are configured:
 *
 *   DISCORD_WEBHOOK_URL                → a formatted brief in the ops channel
 *   RESEND_API_KEY + INTAKE_TO_EMAIL   → email
 *   a JSON file on disk                → the record, where the disk persists
 *
 * A brief is only reported as received once at least one *durable* delivery has
 * succeeded. That distinction matters more than it looks:
 *
 * On a box we own, the file write is the record — transports fail, a disk does
 * not. On a serverless platform the filesystem is read-only apart from a
 * temporary directory that is discarded when the instance is recycled, so a
 * write there proves nothing and cannot be allowed to count. On that platform
 * a configured transport is the only thing standing between an enquiry and
 * oblivion, and if none is configured we say so plainly rather than show a wax
 * seal over a message that went nowhere.
 */

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;

/**
 * Serverless platforms mount the deployment read-only and recycle instances
 * without warning, so anything written during a request is a scratch file
 * rather than a record.
 */
const EPHEMERAL_FS = Boolean(process.env.VERCEL);

const RECORD_DIR =
  process.env.INTAKE_DIR ??
  (EPHEMERAL_FS
    ? path.join(os.tmpdir(), "satcorp-intake")
    : path.join(process.cwd(), ".intake"));

// Single-instance, self-hosted deployment, so an in-process map is honest.
// Behind more than one replica this needs to move to Redis.
const attempts = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  attempts.set(key, recent);

  // Keep the map from growing without bound on a long-lived process.
  if (attempts.size > 5000) {
    for (const [k, times] of attempts) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        attempts.delete(k);
      }
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function reference(): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}`.slice(2) +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");
  return `SC-${stamp}-${randomUUID().slice(0, 4).toUpperCase()}`;
}

function serviceNames(ids: string[]): string[] {
  return ids.map((id) => LEDGER_ITEM_BY_ID[id]?.name ?? id);
}

function asPlainText(data: IntakeData, ref: string): string {
  const services = serviceNames(data.services);
  return [
    `SATCORP — ENGAGEMENT BRIEF ${ref}`,
    "",
    "I. CLARITY",
    `  Name:        ${data.name}`,
    `  Organisation:${data.organisation || " —"}`,
    `  Channel:     ${data.channel}`,
    `  Contact:     ${data.contact}`,
    `  Referral:    ${data.referral || "—"}`,
    "",
    "  The matter:",
    `  ${data.matter.replace(/\n/g, "\n  ")}`,
    "",
    "II. SCOPE",
    `  Retainer:    ${data.retainer || "unstated"}`,
    `  Timeline:    ${data.timeline ?? "unstated"}`,
    `  Marked (${services.length}):`,
    ...(services.length
      ? services.map((s) => `    - ${s}`)
      : ["    - nothing marked"]),
    `  Existing assets: ${data.existingAssets || "—"}`,
    "",
    "III. EXECUTION",
    `  Cadence:     ${data.cadence ?? "unstated"}`,
    `  Notes:       ${data.notes || "—"}`,
  ].join("\n");
}

/** Writes the record. Never throws — the caller decides what a failure means. */
async function fileRecord(
  data: IntakeData,
  ref: string,
  meta: object,
): Promise<boolean> {
  try {
    await fs.mkdir(RECORD_DIR, { recursive: true });
    await fs.writeFile(
      path.join(RECORD_DIR, `${ref}.json`),
      JSON.stringify(
        { reference: ref, receivedAt: new Date().toISOString(), ...meta, ...data },
        null,
        2,
      ),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("[intake] could not write the record", error);
    return false;
  }
}

async function sendEmail(data: IntakeData, ref: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_TO_EMAIL;
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
        reply_to: data.channel === "Email" ? data.contact : undefined,
        subject: `Engagement brief ${ref} — ${data.name}`,
        text: asPlainText(data, ref),
      }),
    });

    if (!response.ok) {
      console.error("[intake] resend rejected the brief", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[intake] resend unreachable", error);
    return false;
  }
}

/* ============================================================
   THE DISCORD DOSSIER
   The channel is where these are actually read, so the message
   is set out as a document rather than dumped as a payload:
   three movements in the order of the brief, the matter given
   room, and every marked service grouped under its own heading.
   ============================================================ */

const EMBED_COLOR = 0xa6192e; // blood
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

/** A full-width heading between movements. Discord has no such thing natively. */
function movement(label: string): EmbedField {
  return { name: "​", value: `**${label}**\n${RULE}`, inline: false };
}

/**
 * Long prose across as many fields as it takes, split on a line break where
 * one is available so a paragraph is not cut mid-word. Capped at two fields;
 * the untruncated text is always in the email and the filed record.
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
          : `${clamp(rest, FIELD_MAX - 40)}\n*— truncated. Full text in the record.*`,
    },
  ];
}

/** Marked services, grouped under their Ledger section in catalogue order. */
function markedServices(ids: string[]): string {
  if (!ids.length) return "*Nothing marked.*";

  const marked = new Set(ids);
  const blocks: string[] = [];

  for (const section of LEDGER) {
    const hits = section.items.filter((item) => marked.has(item.id));
    if (hits.length) {
      blocks.push(
        `**${section.title}**\n${hits.map((i) => `▸ ${i.name}`).join("\n")}`,
      );
    }
  }

  // Anything not in the catalogue — a stale id from an old visit — still shows.
  const known = new Set(LEDGER.flatMap((s) => s.items.map((i) => i.id)));
  const orphans = ids.filter((id) => !known.has(id));
  if (orphans.length) blocks.push(`**Unrecognised**\n${orphans.join(", ")}`);

  return clamp(blocks.join("\n\n"), FIELD_MAX);
}

function buildEmbed(data: IntakeData, ref: string) {
  const count = data.services.length;

  // The headline: who, from where, and how to reach them — above the fold.
  const intro = [
    data.organisation ? `**${clamp(data.organisation, 200)}**` : null,
    `▸ Reach via **${data.channel}** — ${clamp(data.contact, 200)}`,
    data.referral ? `▸ Found us via ${clamp(data.referral, 200)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const fields: EmbedField[] = [
    movement("I · CLARITY"),
    ...prose("The matter", data.matter),

    movement("II · SCOPE"),
    { name: "Retainer", value: data.retainer || "*unstated*", inline: true },
    { name: "Timeline", value: data.timeline ?? "*unstated*", inline: true },
    {
      name: "Marked",
      value: count ? `**${count}** ${count === 1 ? "entry" : "entries"}` : "*none*",
      inline: true,
    },
    { name: "Marked for scope", value: markedServices(data.services) },
    ...prose("What already exists", data.existingAssets ?? ""),

    movement("III · EXECUTION"),
    { name: "Cadence", value: data.cadence ?? "*unstated*", inline: true },
    ...prose("Notes", data.notes ?? ""),
  ];

  return {
    author: { name: "SATCORP — ENGAGEMENT BRIEF" },
    title: `${ref} · ${clamp(data.name, 200)}`,
    description: clamp(`${intro}\n${RULE}`, 4096),
    color: EMBED_COLOR,
    // Discord allows 25; the brief cannot generate that many, but a cap costs
    // nothing and a rejected webhook costs an enquiry.
    fields: fields.slice(0, 25),
    footer: { text: `Filed from ${LEGAL.domain} · reply within 24 hours` },
    timestamp: new Date().toISOString(),
  };
}

async function sendDiscord(data: IntakeData, ref: string): Promise<boolean> {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "SATCORP",
        embeds: [buildEmbed(data, ref)],
      }),
    });

    if (!response.ok) {
      console.error(
        "[intake] discord rejected the brief",
        response.status,
        await response.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("[intake] discord unreachable", error);
    return false;
  }
}

export async function submitBrief(
  raw: unknown,
): Promise<IntakeResult> {
  const parsed = intakeSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "A few details still need attention.",
      fieldErrors: z_flatten(parsed.error),
    };
  }

  const data = parsed.data;

  // Screening. Both of these fail silently and identically to a success, so a
  // bot learns nothing from the response.
  const ref = reference();
  if (data.company_website) return { ok: true, reference: ref };
  if (data.elapsedMs < MIN_ELAPSED_MS) return { ok: true, reference: ref };

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

  // The record first, then the transports. Nothing here throws, so one dead
  // channel cannot take the others down with it.
  const filed = await fileRecord(data, ref, {
    userAgent: headerList.get("user-agent") ?? null,
  });

  const [posted, emailed] = await Promise.all([
    sendDiscord(data, ref),
    sendEmail(data, ref),
  ]);

  // A scratch file on a recycled instance is not a record.
  const durable = posted || emailed || (filed && !EPHEMERAL_FS);

  if (!durable) {
    console.error(
      `[intake] ${ref} could not be delivered — no transport succeeded` +
        (EPHEMERAL_FS
          ? ". Running on an ephemeral filesystem: set DISCORD_WEBHOOK_URL or RESEND_API_KEY + INTAKE_TO_EMAIL."
          : "."),
      // Logged so the enquiry is at least recoverable from the platform logs.
      asPlainText(data, ref),
    );
    return {
      ok: false,
      error: "Something went wrong on my end. Try again in a moment.",
    };
  }

  return { ok: true, reference: ref };
}

/** Narrow helper so the Zod import stays confined to the schema module. */
function z_flatten(error: {
  issues: { path: PropertyKey[]; message: string }[];
}): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (out[key] ??= []).push(issue.message);
  }
  return out;
}
