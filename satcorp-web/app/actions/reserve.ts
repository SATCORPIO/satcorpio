"use server";

import { headers } from "next/headers";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  MIN_ELAPSED_MS,
  pulseReservationSchema,
  type PulseReservationData,
  type PulseReservationResult,
} from "@/lib/pulse-schema";
import { LEGAL } from "@/lib/legal";
import { createRateLimit } from "@/lib/rate-limit";
import {
  buildReference,
  isEphemeralFilesystem,
  resolveRecordDir,
  wasDelivered,
} from "@/lib/delivery";

/**
 * THE HANDLE CLAIM   the third intake pipeline.
 *
 * Modelled line for line on the Engagement Brief (`app/actions/intake.ts`)
 * and the Approach (`app/actions/partner.ts`): validate, screen, then deliver
 * by whatever transports are configured, and refuse rather than silently
 * drop a submission when nothing durable was reached.
 *
 *   PULSE_WEBHOOK_URL                → falls back to DISCORD_WEBHOOK_URL
 *   RESEND_API_KEY + PULSE_TO_EMAIL  → falls back to INTAKE_TO_EMAIL
 *   a JSON file on disk              → the record, where the disk persists
 *
 * A claim is a filed position in a queue, not an allocation   plan §6.4.
 * There is no unique index anywhere in this pipeline (that arrives with the
 * platform's own database in Track B phase 1), so two people can file the
 * same handle and both will be told it is filed. That is by design: the
 * copy this action's caller shows never promises the name is reserved, only
 * that the claim has been. Do not let a later change to the confirmation
 * text imply otherwise without a uniqueness check to back it.
 */

const EPHEMERAL_FS = isEphemeralFilesystem();
const RECORD_DIR = resolveRecordDir(process.env.PULSE_DIR, "reservations");

// Tighter than the brief's three-per-minute: a handle claim has exactly one
// legitimate reason to be resubmitted quickly (a typo), never a burst.
const rateLimited = createRateLimit({ windowMs: 60_000, max: 2 });

function reference(): string {
  return buildReference("PR");
}

function asPlainText(data: PulseReservationData, ref: string): string {
  return [
    `PULSE   HANDLE CLAIM ${ref}`,
    "",
    `  Handle:  @${data.handle}`,
    `  Intent:  ${data.intent}`,
    `  Contact: ${data.contact}`,
  ].join("\n");
}

/** Writes the record. Never throws   the caller decides what a failure means. */
async function fileRecord(
  data: PulseReservationData,
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
    console.error("[reserve] could not write the record", error);
    return false;
  }
}

async function sendEmail(
  data: PulseReservationData,
  ref: string,
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.PULSE_TO_EMAIL ?? process.env.INTAKE_TO_EMAIL;
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
        reply_to: data.contact,
        subject: `Handle claim ${ref}   @${data.handle}`,
        text: asPlainText(data, ref),
      }),
    });

    if (!response.ok) {
      console.error("[reserve] resend rejected the claim", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[reserve] resend unreachable", error);
    return false;
  }
}

const EMBED_COLOR = 0xff2b3a; // blood-hot   PULSE's own accent

async function sendDiscord(
  data: PulseReservationData,
  ref: string,
): Promise<boolean> {
  const url = process.env.PULSE_WEBHOOK_URL ?? process.env.DISCORD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "PULSE",
        embeds: [
          {
            author: { name: "PULSE   HANDLE CLAIM" },
            title: `${ref} · @${data.handle}`,
            color: EMBED_COLOR,
            fields: [
              { name: "Intent", value: data.intent, inline: true },
              { name: "Contact", value: data.contact, inline: true },
            ],
            footer: { text: `Filed from ${LEGAL.domain} · a queue position, not an allocation` },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        "[reserve] discord rejected the claim",
        response.status,
        await response.text().catch(() => ""),
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("[reserve] discord unreachable", error);
    return false;
  }
}

export async function reserveHandle(
  raw: unknown,
): Promise<PulseReservationResult> {
  const parsed = pulseReservationSchema.safeParse(raw);

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
  const durable = wasDelivered({ posted, emailed, filed });

  if (!durable) {
    console.error(
      `[reserve] ${ref} could not be delivered   no transport succeeded` +
        (EPHEMERAL_FS
          ? ". Running on an ephemeral filesystem: set PULSE_WEBHOOK_URL (or DISCORD_WEBHOOK_URL) or RESEND_API_KEY + PULSE_TO_EMAIL."
          : "."),
      // Logged so the claim is at least recoverable from the platform logs.
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
