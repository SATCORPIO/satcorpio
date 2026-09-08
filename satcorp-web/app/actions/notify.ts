"use server";

import { headers } from "next/headers";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  NOTIFY_MIN_ELAPSED_MS,
  notifySchema,
  type NotifyData,
  type NotifyResult,
} from "@/lib/notify-schema";
import { LEGAL } from "@/lib/legal";
import { createRateLimit } from "@/lib/rate-limit";

/**
 * FIELD NOTES — the forwarding list for the mobile title.
 *
 * Its own pipeline for the same reason the Approach is not a flag on the Brief:
 * this is a standing list that will be written to for years, and mixing it into
 * an enquiry channel means somebody eventually mails a client roster a
 * development update.
 *
 *   NOTIFY_WEBHOOK_URL                 → the studio channel
 *   RESEND_API_KEY + NOTIFY_TO_EMAIL   → email
 *   a JSON file on disk                → the record, where the disk persists
 *
 * The durability rule from the other two pipelines applies unchanged, and it
 * matters more here than anywhere else on the site. Every other form ends in a
 * conversation, so a dropped submission surfaces when nobody replies. This one
 * ends in silence *by design* — the next contact might be months away — so a
 * reader has no way to notice they were never actually added. A list that
 * quietly fails to record people is worse than no list, which is why nothing is
 * reported as taken until at least one durable transport has succeeded.
 */

const EPHEMERAL_FS = Boolean(process.env.VERCEL);

const RECORD_DIR =
  process.env.NOTIFY_DIR ??
  (EPHEMERAL_FS
    ? path.join(os.tmpdir(), "satcorp-notify")
    : path.join(process.cwd(), ".notify"));

// Looser than the enquiry forms. Two people behind one office address signing
// up inside a minute is ordinary; two engagement briefs from one address is not.
const rateLimited = createRateLimit({ windowMs: 60_000, max: 6 });

function reference(): string {
  const now = new Date();
  const stamp =
    `${now.getUTCFullYear()}`.slice(2) +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");
  return `FN-${stamp}-${randomUUID().slice(0, 4).toUpperCase()}`;
}

function asPlainText(data: NotifyData, ref: string): string {
  return [
    `SATCORP   KI-RA STUDIOS   FIELD NOTES ${ref}`,
    "",
    `  Via:      ${data.via}`,
    `  Contact:  ${data.contact}`,
    `  Consent:  recorded ${new Date().toISOString()}`,
    "",
    "  WHY THEY ARE HERE",
    `    ${(data.note || "—").replace(/\n/g, "\n    ")}`,
  ].join("\n");
}

/** Writes the record. Never throws — the caller decides what a failure means. */
async function fileRecord(
  data: NotifyData,
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
          list: "kira/relentless",
          receivedAt: new Date().toISOString(),
          ...meta,
          via: data.via,
          contact: data.contact,
          note: data.note ?? "",
          // The proof, not the checkbox: a consent record is only worth
          // anything if it says when it was given and to what.
          consent: {
            given: true,
            at: new Date().toISOString(),
            scope: "Development notes for the Ki-Ra Studios mobile title.",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("[notify] could not write the record", error);
    return false;
  }
}

async function sendEmail(data: NotifyData, ref: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_TO_EMAIL ?? process.env.INTAKE_TO_EMAIL;
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
        subject: `Field notes ${ref}   ${data.via}`,
        text: asPlainText(data, ref),
      }),
    });

    if (!response.ok) {
      console.error("[notify] resend rejected the address", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[notify] resend unreachable", error);
    return false;
  }
}

const EMBED_COLOR = 0x1f6f6b; // Ki-Ra teal
const FIELD_MAX = 1024;

function clamp(text: string, max: number): string {
  const trimmed = text.trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max - 1)}…`;
}

async function sendDiscord(data: NotifyData, ref: string): Promise<boolean> {
  // Its own webhook, falling back to the brief channel only if one was never
  // configured — a fresh deployment must not silently drop an address.
  const url = process.env.NOTIFY_WEBHOOK_URL ?? process.env.DISCORD_WEBHOOK_URL;
  if (!url) return false;

  const fields = [
    { name: "Via", value: data.via, inline: true },
    { name: "Contact", value: clamp(data.contact, 200), inline: true },
  ];
  if (data.note) {
    fields.push({
      name: "Why they are here",
      value: clamp(data.note, FIELD_MAX),
      inline: false,
    });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "SATCORP",
        embeds: [
          {
            author: { name: "KI-RA STUDIOS   FIELD NOTES" },
            title: ref,
            color: EMBED_COLOR,
            fields,
            footer: { text: `Filed from ${LEGAL.domain} · forwarding list` },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "[notify] discord rejected the address",
        response.status,
        await response.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("[notify] discord unreachable", error);
    return false;
  }
}

export async function leaveAddress(raw: unknown): Promise<NotifyResult> {
  const parsed = notifySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Not quite.",
      fieldErrors: flattenIssues(parsed.error),
    };
  }

  const data = parsed.data;
  const ref = reference();

  // Screening. Both fail silently and identically to a success, so a bot
  // learns nothing from the response.
  if (data.company_website) return { ok: true, reference: ref };
  if (data.elapsedMs < NOTIFY_MIN_ELAPSED_MS) return { ok: true, reference: ref };

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
      `[notify] ${ref} was not recorded   no transport succeeded` +
        (EPHEMERAL_FS
          ? ". Running on an ephemeral filesystem: set NOTIFY_WEBHOOK_URL or RESEND_API_KEY + NOTIFY_TO_EMAIL."
          : "."),
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
