"use client";

import { useEffect, useRef, useState } from "react";
import { leaveAddress } from "@/app/actions/notify";
import { NOTIFY_CHANNELS, type NotifyChannel } from "@/lib/notify-schema";
import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import {
  ChoiceRow,
  Field,
  inputClass,
  textareaClass,
} from "@/components/ledger/BriefField";

/**
 * FIELD NOTES — leave a forwarding address.
 *
 * The whole of the announcement's ask. There is nothing to install, nothing to
 * pre-order, and no date to count down to, so the only thing worth collecting
 * is permission to say something later.
 *
 * Three fields and a checkbox. State is held plainly rather than through
 * react-hook-form: a form this small does not earn a resolver, and the same
 * validators run on the server from the same module either way.
 *
 * Note what this is *not*: a pre-registration. Pre-registration belongs to a
 * store listing and a launch window, and a reward attached to one now would be
 * a promise made two years early to people who will have changed phones twice.
 */

const EMPTY = { via: "Email" as NotifyChannel, contact: "", note: "" };

/**
 * The time-trap reading, taken outside the component. The clock is only ever
 * read from an event handler, but a `Date.now()` written inline in JSX is a
 * call the purity rule has to assume could run during render.
 */
function elapsedSince(start: number): number {
  return Date.now() - start;
}

export function FieldNotes() {
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const mountedAt = useRef(0);
  const honeypot = useRef("");

  // Set in an effect so nothing impure runs during render.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setFormError(null);
    setErrors({});

    const result = await leaveAddress({
      via: form.via,
      contact: form.contact,
      note: form.note,
      consent,
      company_website: honeypot.current,
      elapsedMs: elapsedSince(mountedAt.current),
    });

    setSending(false);

    if (result.ok) {
      setReference(result.reference);
      return;
    }

    setFormError(result.error);
    setErrors(result.fieldErrors ?? {});
  }

  if (reference) {
    return (
      <div className="border border-accent/30 bg-ink-raised/70 p-8 backdrop-blur-sm">
        <Stamp tone="accent" rotate={-1.5}>
          ADDRESS TAKEN
        </Stamp>
        <p className="mt-6 max-w-lg font-display text-xl leading-relaxed text-bone">
          Filed. You will hear from the studio when there is something worth
          hearing, and not before.
        </p>
        <p className="label mt-6 text-[0.55rem]">REFERENCE {reference}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-bone/12 bg-ink-raised/70 p-8 backdrop-blur-sm"
      noValidate
    >
      {/* Never shown, never focusable, never announced. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute size-0 opacity-0"
        onChange={(e) => {
          honeypot.current = e.target.value;
        }}
      />

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="How to reach you" required>
          <ChoiceRow
            name="Channel"
            options={NOTIFY_CHANNELS}
            value={form.via}
            onChange={(via) => setForm((f) => ({ ...f, via }))}
          />
        </Field>

        <Field
          label={form.via === "Email" ? "Address" : "Handle"}
          error={errors.contact?.[0]}
          required
        >
          <input
            className={inputClass}
            value={form.contact}
            inputMode={form.via === "Email" ? "email" : "text"}
            autoComplete={form.via === "Email" ? "email" : "off"}
            placeholder={form.via === "Email" ? "you@somewhere" : "@you"}
            onChange={(e) =>
              setForm((f) => ({ ...f, contact: e.target.value }))
            }
          />
        </Field>
      </div>

      <div className="mt-7">
        <Field
          label="Anything you want the studio to know"
          hint="Optional. If you build these for a living, say so — that is read by a person."
          error={errors.note?.[0]}
        >
          <textarea
            className={textareaClass}
            value={form.note}
            maxLength={600}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          />
        </Field>
      </div>

      {/* Explicit, never pre-ticked. This list is written to for years and read
          in jurisdictions where an assumed opt-in is not consent at all. */}
      <label className="mt-8 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 appearance-none border border-bone/30 bg-transparent transition-colors checked:border-accent checked:bg-accent"
        />
        <span className="font-mono text-[0.68rem] leading-relaxed text-bone-dim">
          Send me development notes about this title. Nothing else, no third
          parties, and one line in any of them will take me off the list. The{" "}
          <ThreadLink
            href="/privacy"
            className="text-bone underline-offset-4 hover:underline"
          >
            privacy policy
          </ThreadLink>{" "}
          says what happens to it.
        </span>
      </label>
      {errors.consent?.[0] && (
        <p className="mt-2 font-mono text-[0.66rem] text-blood">
          {errors.consent[0]}
        </p>
      )}

      {formError && (
        <p className="mt-6 font-mono text-[0.7rem] text-blood">{formError}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-8 border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-accent hover:bg-accent hover:text-ink disabled:cursor-wait disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-bone"
      >
        {sending ? "FILING…" : "LEAVE A FORWARDING ADDRESS →"}
      </button>
    </form>
  );
}
