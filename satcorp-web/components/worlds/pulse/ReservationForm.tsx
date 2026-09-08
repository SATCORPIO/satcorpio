"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RESERVATION_INTENTS,
  pulseReservationSchema,
  normaliseHandle,
  type PulseReservationInput,
} from "@/lib/pulse-schema";
import { reserveHandle } from "@/app/actions/reserve";
import { Stamp } from "@/components/fingerprints/Stamp";
import { Field, ChoiceRow, inputClass } from "@/components/ledger/BriefField";

/**
 * THE HANDLE CLAIM
 *
 * Three fields, deliberately   handle, contact, intent. Every field beyond
 * these costs conversions on the only conversion this page has (plan §6.2).
 *
 * The handle gets a live read-out as you type, run through the same
 * `normaliseHandle` the server re-validates with, so a rejection reads
 * immediately and in voice rather than waiting for blur or submit.
 *
 * The domain printed here, `pulse.satcorp.io`, is the build plan's own
 * recommendation for the still-open decision at §13.1   change this one
 * constant if that is decided the other way.
 */

const PULSE_DOMAIN = "pulse.satcorp.io";

export function ReservationForm() {
  const [reference, setReference] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const mountedAt = useRef(0);

  // The time-trap reference point. Set in an effect so nothing impure runs
  // during render.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PulseReservationInput>({
    resolver: zodResolver(pulseReservationSchema),
    mode: "onBlur",
    defaultValues: {
      handle: "",
      contact: "",
      intent: undefined,
      company_website: "",
      elapsedMs: 0,
    },
  });

  const handleValue = useWatch({ control, name: "handle" }) ?? "";
  const intent = useWatch({ control, name: "intent" });
  const showReadout = handleValue.trim().length >= 3;
  const normalised = showReadout ? normaliseHandle(handleValue) : null;

  const file = async (values: PulseReservationInput) => {
    setFormError(null);
    const result = await reserveHandle({
      ...values,
      elapsedMs: Date.now() - mountedAt.current,
    });

    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setReference(result.reference);
  };

  return (
    <div aria-live="polite" aria-atomic="true">
      {reference ? (
        <Filed reference={reference} />
      ) : (
        <form
          // handleSubmit is invoked here rather than during render, so the
          // ref read and the clock call both happen at event time.
          onSubmit={(event) => void handleSubmit(file)(event)}
          noValidate
          className="space-y-6"
        >
          <Field
            label="Handle"
            hint={`${PULSE_DOMAIN}/@   three to twenty-four characters, lowercase letters, numbers and underscores.`}
            error={errors.handle?.message}
            required
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[0.82rem] text-bone-dim/50">
                @
              </span>
              <input
                {...register("handle")}
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="yourname"
                className={inputClass}
              />
            </div>
            {showReadout && (
              <p
                className={[
                  "mt-2 font-mono text-[0.62rem] tracking-wide",
                  normalised ? "text-blood-hot" : "text-bone-dim/70",
                ].join(" ")}
              >
                {normalised
                  ? `@${normalised.handle} is well-formed and open to claim.`
                  : "That name is not available to claim."}
              </p>
            )}
          </Field>

          <Field
            label="Contact"
            hint="An address. Used only to reach you about this claim."
            error={errors.contact?.message}
            required
          >
            <input
              {...register("contact")}
              type="email"
              autoComplete="email"
              placeholder="you@wherever.com"
              className={inputClass}
            />
          </Field>

          <Field label="Intent" error={errors.intent?.message} required>
            <ChoiceRow
              name="Intent"
              options={RESERVATION_INTENTS}
              value={intent}
              onChange={(v) =>
                setValue("intent", v, { shouldValidate: true })
              }
            />
          </Field>

          <p className="font-mono text-[0.64rem] leading-relaxed text-bone-dim/70">
            A claim is a place in the queue, not a deed. Handles are allocated
            when the network opens, in the order they were filed, subject to
            review.
          </p>

          {formError && (
            <p className="border-l-2 border-blood bg-blood/10 px-4 py-3 font-mono text-[0.7rem] text-bone">
              {formError}
            </p>
          )}

          {/* --- Quiet check. Never shown, never announced. --- */}
          <div aria-hidden className="hidden">
            <label>
              Company website
              <input
                {...register("company_website")}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blood-hot px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? "FILING…" : "FILE THE CLAIM"}
          </button>
        </form>
      )}
    </div>
  );
}

function Filed({ reference }: { reference: string }) {
  return (
    <div className="border border-bone/10 bg-ink-raised/70 p-7 backdrop-blur-sm">
      <Stamp tone="live" rotate={-2}>
        FILED
      </Stamp>
      <p className="mt-6 font-display text-2xl text-bone">
        Your claim is filed.
      </p>
      <p className="mt-4 font-mono text-[0.72rem] leading-relaxed text-bone-dim">
        The name is held in the queue, not in your hand. We will be in touch
        when the network opens.
      </p>
      <p className="label mt-6 text-[0.55rem]">
        Reference <span className="ml-2 font-mono text-bone">{reference}</span>
      </p>
    </div>
  );
}
