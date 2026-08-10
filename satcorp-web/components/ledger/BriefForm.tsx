"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "@/lib/gsap";
import {
  CADENCES,
  CONTACT_CHANNELS,
  TIMELINES,
  intakeSchema,
  type IntakeInput,
} from "@/lib/intake-schema";
import { LEDGER, RETAINER_CLASSES } from "@/lib/ledger-catalog";
import { ENGAGEMENT_MODEL } from "@/lib/divisions";
import { submitBrief } from "@/app/actions/intake";
import { useEngagement, useHydrated } from "@/lib/store";
import { Stamp } from "@/components/fingerprints/Stamp";
import { Monogram } from "@/components/fingerprints/Monogram";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Field, ChoiceRow, inputClass, textareaClass } from "./BriefField";

/**
 * THE ENGAGEMENT BRIEF
 *
 * Four movements: Clarity, Scope, Execution, and the Seal. The steps are the
 * Concierge Engagement Model, so the sales process and the theme are the same
 * object rather than a theme laid over a form.
 *
 * Everything marked in the Ledger arrives pre-checked at Scope.
 */

type StepId = "clarity" | "scope" | "execution" | "seal";
const STEPS: StepId[] = ["clarity", "scope", "execution", "seal"];

/** Fields that must be valid before a step will let you past it. */
const GATES: Record<StepId, (keyof IntakeInput)[]> = {
  clarity: ["name", "channel", "contact", "matter"],
  scope: [],
  execution: [],
  seal: [],
};

export function BriefForm() {
  const selected = useEngagement((s) => s.selected);
  const hydrated = useHydrated();

  const [step, setStep] = useState<StepId>("clarity");
  const [reference, setReference] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const mountedAt = useRef(0);
  const sealRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLFormElement>(null);

  // The time-trap reference point. Set in an effect so nothing impure runs
  // during render.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IntakeInput>({
    resolver: zodResolver(intakeSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      organisation: "",
      channel: "Email",
      contact: "",
      matter: "",
      referral: "",
      services: [],
      retainer: "",
      existingAssets: "",
      notes: "",
      company_website: "",
      elapsedMs: 0,
    },
  });

  // useWatch subscribes without handing back an unmemoizable function.
  const services = useWatch({ control, name: "services" }) ?? [];

  // Ledger selections are the client's own marks — they arrive already made.
  useEffect(() => {
    if (hydrated) setValue("services", selected);
  }, [hydrated, selected, setValue]);

  const goTo = async (next: StepId) => {
    const currentIndex = STEPS.indexOf(step);
    const nextIndex = STEPS.indexOf(next);

    // Moving forward means passing this step's gate; moving back is free.
    if (nextIndex > currentIndex) {
      const gate = GATES[step];
      if (gate.length && !(await trigger(gate))) return;
    }

    setStep(next);
    panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const sendBrief = async (values: IntakeInput) => {
    setFormError(null);
    const result = await submitBrief({
      ...values,
      elapsedMs: Date.now() - mountedAt.current,
    });

    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setReference(result.reference);
  };

  // The seal comes down on the finished dossier.
  useEffect(() => {
    if (!reference || !sealRef.current) return;
    gsap.fromTo(
      sealRef.current,
      { scale: 2.6, autoAlpha: 0, rotate: -18 },
      {
        scale: 1,
        autoAlpha: 1,
        rotate: -7,
        duration: 0.5,
        ease: "power4.out",
      },
    );
  }, [reference]);

  if (reference) return <Sealed reference={reference} sealRef={sealRef} />;

  const stepIndex = STEPS.indexOf(step);

  return (
    <form
      // handleSubmit is invoked here rather than during render, so the ref
      // read and the clock call both happen at event time.
      onSubmit={(event) => void handleSubmit(sendBrief)(event)}
      noValidate
      ref={panelRef}
    >
      {/* --- Progress, as stamps accumulating on the cover --- */}
      <ol className="flex flex-wrap gap-px">
        {ENGAGEMENT_MODEL.map((movement, i) => {
          const id = movement.id as StepId;
          const done = i < stepIndex;
          const active = id === step;
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => goTo(id)}
                aria-current={active ? "step" : undefined}
                className={[
                  "w-full border px-4 py-4 text-left transition-colors",
                  active
                    ? "border-brass/50 bg-brass/10"
                    : "border-bone/10 bg-ink-raised hover:border-bone/25",
                ].join(" ")}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-lg text-bone">
                    {movement.step}
                  </span>
                  {done && (
                    <span className="font-mono text-[0.55rem] text-brass">
                      ✓
                    </span>
                  )}
                </span>
                <span className="mt-1 block font-mono text-[0.62rem] tracking-[0.18em] text-bone-dim">
                  {movement.title.toUpperCase()}
                </span>
              </button>
            </li>
          );
        })}
        <li className="flex-1">
          <div
            className={[
              "h-full border px-4 py-4",
              step === "seal"
                ? "border-brass/50 bg-brass/10"
                : "border-bone/10 bg-ink-raised",
            ].join(" ")}
          >
            <span className="font-display text-lg text-bone">IV</span>
            <span className="mt-1 block font-mono text-[0.62rem] tracking-[0.18em] text-bone-dim">
              THE SEAL
            </span>
          </div>
        </li>
      </ol>

      <div className="dossier mt-px p-6 sm:p-10">
        {/* ---------- I. CLARITY ---------- */}
        {step === "clarity" && (
          <div className="space-y-8">
            <Movement
              title="Clarity"
              subtitle="Discovery & Truth Extraction"
              body="Tell me what's actually going on. Not the version you'd put in a brief — the version you'd say out loud."
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Your name" required error={errors.name?.message}>
                <input
                  {...register("name")}
                  className={inputClass}
                  placeholder="Who am I speaking with?"
                  autoComplete="name"
                />
              </Field>

              <Field label="Organisation" error={errors.organisation?.message}>
                <input
                  {...register("organisation")}
                  className={inputClass}
                  placeholder="If there is one"
                  autoComplete="organization"
                />
              </Field>
            </div>

            <Field label="Reach you how" required>
              <Controller
                control={control}
                name="channel"
                render={({ field }) => (
                  <ChoiceRow
                    name="Channel"
                    options={CONTACT_CHANNELS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field
              label="And at what"
              required
              error={errors.contact?.message}
              hint="Address, handle, or number — whichever matches the above."
            >
              <input
                {...register("contact")}
                className={inputClass}
                placeholder="you@example.com"
              />
            </Field>

            <Field
              label="The matter"
              required
              error={errors.matter?.message}
              hint="What you're trying to become, and what's currently in the way."
            >
              <textarea
                {...register("matter")}
                className={textareaClass}
                placeholder="Start anywhere. I'll find the thread."
              />
            </Field>

            <Field label="How did you find me" error={errors.referral?.message}>
              <input
                {...register("referral")}
                className={inputClass}
                placeholder="Referral, search, somewhere less official"
              />
            </Field>

            <NoticeAtCollection />
          </div>
        )}

        {/* ---------- II. SCOPE ---------- */}
        {step === "scope" && (
          <div className="space-y-8">
            <Movement
              title="Scope"
              subtitle="Architecture & Solution Design"
              body="Mark what you think you need. If you're wrong about some of it, I'll say so before either of us spends anything."
            />

            <Controller
              control={control}
              name="services"
              render={({ field }) => (
                <ServicePicker
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              )}
            />

            <Field
              label="Retainer class"
              hint="Stated plainly, this saves us both a fortnight."
            >
              <Controller
                control={control}
                name="retainer"
                render={({ field }) => (
                  <ChoiceRow
                    name="Retainer"
                    options={RETAINER_CLASSES.map(
                      (c) => `${c.label} — ${c.range}`,
                    )}
                    value={field.value || undefined}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field label="Timeline">
              <Controller
                control={control}
                name="timeline"
                render={({ field }) => (
                  <ChoiceRow
                    name="Timeline"
                    options={TIMELINES}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field
              label="What already exists"
              hint="Brand files, a site, half a system somebody else abandoned."
            >
              <textarea
                {...register("existingAssets")}
                className={textareaClass}
                placeholder="Anything I'd be building on or replacing."
              />
            </Field>
          </div>
        )}

        {/* ---------- III. EXECUTION ---------- */}
        {step === "execution" && (
          <div className="space-y-8">
            <Movement
              title="Execution"
              subtitle="Development & Deployment"
              body="How you'd like to be kept informed while it's being built."
            />

            <Field label="Cadence">
              <Controller
                control={control}
                name="cadence"
                render={({ field }) => (
                  <ChoiceRow
                    name="Cadence"
                    options={CADENCES}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field
              label="Anything else"
              hint="Constraints, sensitivities, people I should know about."
            >
              <textarea
                {...register("notes")}
                className={textareaClass}
                placeholder="Optional. Often the most useful box on the page."
              />
            </Field>
          </div>
        )}

        {/* ---------- IV. THE SEAL ---------- */}
        {step === "seal" && (
          <div className="space-y-8">
            <Movement
              title="The Seal"
              subtitle="Review & Send"
              body="Read it back. If it's true, seal it."
            />
            <Review values={getValues()} serviceCount={services.length} />

            {/* The disclosure has to sit where the decision is made, not three
                clicks away in a footer. */}
            <p className="border-l-2 border-brass/60 bg-brass/[0.06] px-5 py-4 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              Pressing the seal sends this brief to SATCORP and files it under
              your reference. It is used to answer you and, if we proceed, to
              run the engagement — never sold, never shared with advertisers.
              You may ask for a copy or ask us to delete it at any time. The{" "}
              <ThreadLink
                href="/privacy"
                className="text-brass underline-offset-4 hover:underline"
              >
                Privacy Policy
              </ThreadLink>{" "}
              says exactly what happens to it, and the{" "}
              <ThreadLink
                href="/terms"
                className="text-brass underline-offset-4 hover:underline"
              >
                Terms
              </ThreadLink>{" "}
              apply. Sending a brief creates no contract and commits you to
              nothing.
            </p>

            {formError && (
              <p className="border-l-2 border-blood bg-blood/10 px-4 py-3 font-mono text-[0.7rem] text-bone">
                {formError}
              </p>
            )}
          </div>
        )}

        {/* --- Quiet checks. Never shown, never announced. --- */}
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

        {/* --- Movement controls --- */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-8">
          <button
            type="button"
            onClick={() => goTo(STEPS[Math.max(0, stepIndex - 1)])}
            disabled={stepIndex === 0}
            className="font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:text-bone disabled:pointer-events-none disabled:opacity-30"
          >
            ← BACK
          </button>

          {step === "seal" ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-brass bg-brass px-9 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {isSubmitting ? "SEALING…" : "PRESS THE SEAL"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => goTo(STEPS[stepIndex + 1])}
              className="border border-brass/40 px-9 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:bg-brass hover:text-ink"
            >
              CONTINUE →
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

/**
 * Notice at collection. GDPR Art. 13 and the CCPA both want the reader told
 * what happens to this data at the moment they are asked for it, not after.
 */
function NoticeAtCollection() {
  return (
    <p className="font-mono text-[0.64rem] leading-relaxed text-bone-dim/70">
      What you enter here is used to answer you and nothing else. It is never
      sold or shared with advertisers, and you can ask for a copy or ask us to
      delete it whenever you like —{" "}
      <ThreadLink
        href="/privacy"
        className="text-brass underline-offset-4 hover:underline"
      >
        how your data is handled
      </ThreadLink>
      .
    </p>
  );
}

function Movement({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <header>
      <p className="label label-accent">{subtitle}</p>
      <h2 className="mt-3 font-display text-3xl text-bone">{title}</h2>
      <p className="mt-4 max-w-2xl font-sans leading-relaxed text-bone-dim">
        {body}
      </p>
    </header>
  );
}

function ServicePicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) =>
    onChange(
      value.includes(id) ? value.filter((x) => x !== id) : [...value, id],
    );

  return (
    <fieldset>
      <legend className="label flex items-baseline gap-3">
        Marked for scope
        {value.length > 0 && (
          <Stamp tone="blood" rotate={-3}>
            {value.length} ENGAGED
          </Stamp>
        )}
      </legend>

      <div className="mt-6 space-y-8">
        {LEDGER.map((section) => (
          <div key={section.id}>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-brass">
              {section.title.toUpperCase()}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {section.items.map((item) => {
                const on = value.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(item.id)}
                    className={[
                      "border px-3.5 py-2 text-left font-mono text-[0.66rem] transition-colors",
                      on
                        ? "border-blood bg-blood/15 text-bone"
                        : "border-bone/15 text-bone-dim hover:border-bone/35 hover:text-bone",
                    ].join(" ")}
                  >
                    {on && <span className="mr-2 text-blood">✓</span>}
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function Review({
  values,
  serviceCount,
}: {
  values: IntakeInput;
  serviceCount: number;
}) {
  const rows: [string, string][] = [
    ["Name", values.name || "—"],
    ["Organisation", values.organisation || "—"],
    ["Reach via", `${values.channel} — ${values.contact || "—"}`],
    ["Marked", serviceCount ? `${serviceCount} entries` : "nothing marked"],
    ["Retainer", values.retainer || "unstated"],
    ["Timeline", values.timeline ?? "unstated"],
    ["Cadence", values.cadence ?? "unstated"],
  ];

  return (
    <div className="border border-bone/10 bg-ink/40 p-6">
      <dl className="divide-y divide-bone/10">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <dt className="label text-[0.55rem]">{label}</dt>
            <dd className="font-mono text-[0.74rem] text-bone">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-bone/10 pt-5">
        <p className="label text-[0.55rem]">The matter</p>
        <p className="mt-2 whitespace-pre-wrap font-mono text-[0.72rem] leading-relaxed text-bone-dim">
          {values.matter || "—"}
        </p>
      </div>
    </div>
  );
}

function Sealed({
  reference,
  sealRef,
}: {
  reference: string;
  sealRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="dossier px-6 py-20 text-center sm:px-12">
      <div ref={sealRef} className="mx-auto grid size-24 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute size-24">
          <defs>
            <radialGradient id="sealed-wax" cx="38%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#d4283f" />
              <stop offset="55%" stopColor="#a6192e" />
              <stop offset="100%" stopColor="#5c0d19" />
            </radialGradient>
          </defs>
          <path
            fill="url(#sealed-wax)"
            d="M50 4c12 0 17 6 27 9s18 3 18 15-7 15-7 24 8 15 2 24-17 4-27 10-13 10-24 6-11-11-20-16S4 71 4 60s9-13 9-23S9 21 20 15 38 4 50 4z"
          />
        </svg>
        <Monogram className="relative size-10 text-bone/90" strokeWidth={7} />
      </div>

      <p className="mt-12 font-display text-3xl text-bone">
        Your file has been opened.
      </p>

      <p className="mt-6 font-mono text-[0.72rem] leading-loose text-bone-dim">
        Expect contact within twenty-four hours.
        <br />
        In the meantime — don&rsquo;t do anything I wouldn&rsquo;t do.
      </p>

      <p className="label mt-10 text-[0.55rem]">
        Reference{" "}
        <span className="ml-2 font-mono text-bone">{reference}</span>
      </p>
    </div>
  );
}
