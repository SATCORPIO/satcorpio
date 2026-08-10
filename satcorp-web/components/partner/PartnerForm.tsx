"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import {
  PARTNER_CHANNELS,
  PARTNER_DIVISIONS,
  validateAnswers,
  type PartnerDivision,
  type PartnerField,
} from "@/lib/partner-schema";
import { submitApproach } from "@/app/actions/partner";
import { Stamp } from "@/components/fingerprints/Stamp";
import { Monogram } from "@/components/fingerprints/Monogram";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Field, ChoiceRow, inputClass, textareaClass } from "@/components/ledger/BriefField";

/**
 * THE APPROACH
 *
 * Three movements: pick the division, answer that division's questions, sign
 * it. The middle movement is different every time   which is the whole reason
 * this is not the Engagement Brief with an extra dropdown.
 *
 * State is held plainly rather than through react-hook-form: the field set is
 * generated at runtime from the chosen division, so a resolver built around a
 * fixed shape would have to be rebuilt on every branch change anyway. The same
 * validators run here and on the server, from the same module.
 */

type Step = "division" | "proposal" | "seal";

interface Shared {
  name: string;
  organisation: string;
  channel: (typeof PARTNER_CHANNELS)[number];
  contact: string;
  referral: string;
  notes: string;
}

/**
 * The time-trap reading, taken outside the component. The clock is only ever
 * read from an event handler, but a `Date.now()` written inline in JSX is a
 * call the purity rule has to assume could run during render.
 */
function elapsedSince(start: number): number {
  return Date.now() - start;
}

const EMPTY_SHARED: Shared = {
  name: "",
  organisation: "",
  channel: "Email",
  contact: "",
  referral: "",
  notes: "",
};

/** The query string never changes under us, so there is nothing to subscribe to. */
const noSubscription = () => () => {};

/**
 * The division named in the URL: `/partner?division=pulse` opens on that branch.
 *
 * Read through `useSyncExternalStore` rather than `useSearchParams`, and rather
 * than in an effect. `useSearchParams` turns this subtree into a
 * client-side-rendering bailout, so the server would ship a fallback instead of
 * the form and *every* visitor would wait on hydration to see a single field.
 * An effect would work but has to `setState` to do it, which is a cascading
 * render for something that was knowable on the first client pass.
 *
 * This reads null on the server and the real value on the client; React
 * re-renders once when the two snapshots disagree, which is exactly the shape
 * of the problem. Anything unrecognised is ignored rather than trusted   the
 * result only ever comes from the table.
 */
function useRequestedDivision(): string | null {
  return useSyncExternalStore(
    noSubscription,
    () => {
      const id = new URLSearchParams(window.location.search).get("division");
      return id && PARTNER_DIVISIONS.some((d) => d.id === id) ? id : null;
    },
    () => null,
  );
}

export function PartnerForm() {
  // Null until the reader picks one. The URL supplies the opening branch, and
  // deriving rather than seeding state means the value is still correct on the
  // render after hydration, when the query first becomes readable.
  const requested = useRequestedDivision();
  const [chosenStep, setStep] = useState<Step | null>(null);
  const [chosenId, setDivisionId] = useState<string | null>(null);

  const divisionId = chosenId ?? requested;
  const step: Step = chosenStep ?? (requested ? "proposal" : "division");

  const [shared, setShared] = useState<Shared>(EMPTY_SHARED);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const mountedAt = useRef(0);
  const honeypot = useRef("");
  const panelRef = useRef<HTMLFormElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  // The time-trap reference point. Set in an effect so nothing impure runs
  // during render.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const division = useMemo(
    () => PARTNER_DIVISIONS.find((d) => d.id === divisionId) ?? null,
    [divisionId],
  );

  // The seal comes down on the finished dossier.
  useEffect(() => {
    if (!reference || !sealRef.current) return;
    gsap.fromTo(
      sealRef.current,
      { scale: 2.6, autoAlpha: 0, rotate: -18 },
      { scale: 1, autoAlpha: 1, rotate: -7, duration: 0.5, ease: "power4.out" },
    );
  }, [reference]);

  const scrollToPanel = () =>
    panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });

  const chooseDivision = (id: string) => {
    // Answers are keyed by field id and field ids repeat across branches, so a
    // change of division has to clear them or one branch's answer turns up
    // pre-filled under another branch's question.
    if (id !== divisionId) setAnswers({});
    setDivisionId(id);
    setErrors({});
    setStep("proposal");
    scrollToPanel();
  };

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[`answers.${id}`]) return prev;
      const next = { ...prev };
      delete next[`answers.${id}`];
      return next;
    });
  };

  /** The shared half. Mirrors the base schema's rules for these four fields. */
  const validateShared = (): Record<string, string[]> => {
    const out: Record<string, string[]> = {};
    if (shared.name.trim().length < 2) {
      out.name = ["I'll need something to call you."];
    }
    if (shared.contact.trim().length < 3) {
      out.contact = ["I'll need a way to reach you."];
    }
    return out;
  };

  const goToSeal = () => {
    if (!division) return;
    const found = {
      ...validateShared(),
      ...validateAnswers(division, answers),
    };
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep("seal");
    scrollToPanel();
  };

  /**
   * The clock and the honeypot are read at event time and handed in, never
   * touched here   this function is referenced from JSX, and a ref read or a
   * `Date.now()` inside it would be a call the compiler has to assume happens
   * during render.
   */
  const send = async (elapsedMs: number, trap: string) => {
    if (!division || sending) return;
    setSending(true);
    setFormError(null);

    const result = await submitApproach({
      division: division.id,
      ...shared,
      answers,
      company_website: trap,
      elapsedMs,
    });

    setSending(false);

    if (!result.ok) {
      setFormError(result.error);
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
        // The offending field is back on the proposal step.
        if (
          Object.keys(result.fieldErrors).some((k) => k !== "form")
        ) {
          setStep("proposal");
          scrollToPanel();
        }
      }
      return;
    }
    setReference(result.reference);
  };

  if (reference) return <Sealed reference={reference} sealRef={sealRef} />;

  return (
    <form
      ref={panelRef}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        void send(elapsedSince(mountedAt.current), honeypot.current);
      }}
    >
      <ol className="flex flex-wrap gap-px">
        <StepTab
          numeral="I"
          label="THE DIVISION"
          active={step === "division"}
          done={step !== "division"}
          onClick={() => {
            setStep("division");
            scrollToPanel();
          }}
        />
        <StepTab
          numeral="II"
          label="THE PROPOSAL"
          active={step === "proposal"}
          done={step === "seal"}
          disabled={!division}
          onClick={() => {
            setStep("proposal");
            scrollToPanel();
          }}
        />
        <StepTab numeral="III" label="THE SEAL" active={step === "seal"} />
      </ol>

      <div className="dossier mt-px p-6 sm:p-10">
        {/* ---------- I. THE DIVISION ---------- */}
        {step === "division" && (
          <div className="space-y-8">
            <Movement
              title="The Division"
              subtitle="Where you would sit"
              body="Six operations, and they do not want the same things. Choose the one you are approaching and the questions will follow from it."
            />

            <ul className="grid gap-px sm:grid-cols-2">
              {PARTNER_DIVISIONS.map((d) => {
                const chosen = d.id === divisionId;
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      aria-pressed={chosen}
                      onClick={() => chooseDivision(d.id)}
                      className={[
                        "flex h-full w-full flex-col gap-3 border p-6 text-left transition-colors",
                        chosen
                          ? "border-brass/60 bg-brass/[0.07]"
                          : "border-bone/10 bg-ink-raised hover:border-bone/30",
                      ].join(" ")}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-2xl text-bone">
                          {d.name}
                        </span>
                        <span className="label text-[0.55rem]">{d.role}</span>
                      </span>
                      <span className="font-mono text-[0.68rem] leading-relaxed text-bone-dim">
                        {d.audience}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ---------- II. THE PROPOSAL ---------- */}
        {step === "proposal" && division && (
          <div className="space-y-8">
            <Movement
              title="The Proposal"
              subtitle={`${division.name}   ${division.role}`}
              body="Answer plainly. A proposal that is vague on purpose is read as a proposal that has nothing behind it."
            />

            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Your name" required error={errors.name?.[0]}>
                <input
                  value={shared.name}
                  onChange={(e) =>
                    setShared({ ...shared, name: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Who am I speaking with?"
                  autoComplete="name"
                />
              </Field>

              <Field label="Organisation">
                <input
                  value={shared.organisation}
                  onChange={(e) =>
                    setShared({ ...shared, organisation: e.target.value })
                  }
                  className={inputClass}
                  placeholder="If there is one"
                  autoComplete="organization"
                />
              </Field>
            </div>

            <Field label="Reach you how" required>
              <ChoiceRow
                name="Channel"
                options={PARTNER_CHANNELS}
                value={shared.channel}
                onChange={(channel) => setShared({ ...shared, channel })}
              />
            </Field>

            <Field
              label="And at what"
              required
              error={errors.contact?.[0]}
              hint="Address, handle, or number   whichever matches the above."
            >
              <input
                value={shared.contact}
                onChange={(e) =>
                  setShared({ ...shared, contact: e.target.value })
                }
                className={inputClass}
                placeholder="you@example.com"
              />
            </Field>

            <div className="rule" />

            {division.fields.map((field) => (
              <DivisionField
                key={field.id}
                field={field}
                value={answers[field.id] ?? ""}
                error={errors[`answers.${field.id}`]?.[0]}
                onChange={(v) => setAnswer(field.id, v)}
              />
            ))}

            <div className="rule" />

            <Field label="How did you find us">
              <input
                value={shared.referral}
                onChange={(e) =>
                  setShared({ ...shared, referral: e.target.value })
                }
                className={inputClass}
                placeholder="Referral, search, somewhere less official"
              />
            </Field>

            <Field
              label="Anything else"
              hint="Constraints, timing, people we should know about."
            >
              <textarea
                value={shared.notes}
                onChange={(e) =>
                  setShared({ ...shared, notes: e.target.value })
                }
                className={textareaClass}
                placeholder="Optional. Often the most useful box on the page."
              />
            </Field>

            <NoticeAtCollection />
          </div>
        )}

        {/* ---------- III. THE SEAL ---------- */}
        {step === "seal" && division && (
          <div className="space-y-8">
            <Movement
              title="The Seal"
              subtitle="Review & Send"
              body="Read it back. If it's true, seal it."
            />

            <Review division={division} shared={shared} answers={answers} />

            <p className="border-l-2 border-brass/60 bg-brass/[0.06] px-5 py-4 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              Pressing the seal sends this approach to SATCORP&rsquo;s
              partnerships desk and files it under your reference. It is used to
              answer you and, if we proceed, to run the arrangement   never
              sold, never shared with advertisers. You may ask for a copy or ask
              us to delete it at any time. The{" "}
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
              apply. Sending an approach creates no contract and commits you to
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
              tabIndex={-1}
              autoComplete="off"
              onChange={(e) => {
                honeypot.current = e.target.value;
              }}
            />
          </label>
        </div>

        {/* --- Movement controls --- */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-8">
          <button
            type="button"
            onClick={() => {
              setStep(step === "seal" ? "proposal" : "division");
              scrollToPanel();
            }}
            disabled={step === "division"}
            className="font-mono text-[0.64rem] tracking-[0.22em] text-bone-dim transition-colors hover:text-bone disabled:pointer-events-none disabled:opacity-30"
          >
            ← BACK
          </button>

          {step === "seal" ? (
            <button
              type="submit"
              disabled={sending}
              className="border border-brass bg-brass px-9 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-ink transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {sending ? "SEALING…" : "PRESS THE SEAL"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (step === "division") {
                  if (!division) return;
                  setStep("proposal");
                  scrollToPanel();
                  return;
                }
                goToSeal();
              }}
              disabled={step === "division" && !division}
              className="border border-brass/40 px-9 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:bg-brass hover:text-ink disabled:pointer-events-none disabled:opacity-30"
            >
              CONTINUE →
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function StepTab({
  numeral,
  label,
  active,
  done,
  disabled,
  onClick,
}: {
  numeral: string;
  label: string;
  active: boolean;
  done?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const body = (
    <>
      <span className="flex items-baseline justify-between gap-2">
        <span className="font-display text-lg text-bone">{numeral}</span>
        {done && <span className="font-mono text-[0.55rem] text-brass">✓</span>}
      </span>
      <span className="mt-1 block font-mono text-[0.62rem] tracking-[0.18em] text-bone-dim">
        {label}
      </span>
    </>
  );

  const tone = active
    ? "border-brass/50 bg-brass/10"
    : "border-bone/10 bg-ink-raised";

  return (
    <li className="flex-1">
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-current={active ? "step" : undefined}
          className={`w-full border px-4 py-4 text-left transition-colors disabled:pointer-events-none disabled:opacity-40 ${tone} ${
            active ? "" : "hover:border-bone/25"
          }`}
        >
          {body}
        </button>
      ) : (
        <div className={`h-full border px-4 py-4 ${tone}`}>{body}</div>
      )}
    </li>
  );
}

function DivisionField({
  field,
  value,
  error,
  onChange,
}: {
  field: PartnerField;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  if (field.kind === "choice") {
    return (
      <Field
        label={field.label}
        hint={field.hint}
        error={error}
        required={field.required}
      >
        <ChoiceRow
          name={field.label}
          options={field.options ?? []}
          value={value || undefined}
          onChange={onChange}
        />
      </Field>
    );
  }

  return (
    <Field
      label={field.label}
      hint={field.hint}
      error={error}
      required={field.required}
    >
      {field.kind === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={textareaClass}
          placeholder={field.placeholder}
          maxLength={field.max}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          placeholder={field.placeholder}
          maxLength={field.max}
        />
      )}
    </Field>
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

function NoticeAtCollection() {
  return (
    <p className="font-mono text-[0.64rem] leading-relaxed text-bone-dim/70">
      What you enter here is used to answer you and nothing else. It is never
      sold or shared with advertisers, and you can ask for a copy or ask us to
      delete it whenever you like  {" "}
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

function Review({
  division,
  shared,
  answers,
}: {
  division: PartnerDivision;
  shared: Shared;
  answers: Record<string, string>;
}) {
  const rows: [string, string][] = [
    ["Division", `${division.name}   ${division.role}`],
    ["Name", shared.name || " "],
    ["Organisation", shared.organisation || " "],
    ["Reach via", `${shared.channel}   ${shared.contact || " "}`],
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

      <div className="mt-6 space-y-5 border-t border-bone/10 pt-5">
        {division.fields.map((field) => {
          const value = (answers[field.id] ?? "").trim();
          if (!value) return null;
          return (
            <div key={field.id}>
              <p className="label text-[0.55rem]">{field.label}</p>
              <p className="mt-2 whitespace-pre-wrap font-mono text-[0.72rem] leading-relaxed text-bone-dim">
                {value}
              </p>
            </div>
          );
        })}

        {shared.notes.trim() && (
          <div>
            <p className="label text-[0.55rem]">Anything else</p>
            <p className="mt-2 whitespace-pre-wrap font-mono text-[0.72rem] leading-relaxed text-bone-dim">
              {shared.notes}
            </p>
          </div>
        )}
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
            <radialGradient id="partner-wax" cx="38%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#d4283f" />
              <stop offset="55%" stopColor="#a6192e" />
              <stop offset="100%" stopColor="#5c0d19" />
            </radialGradient>
          </defs>
          <path
            fill="url(#partner-wax)"
            d="M50 4c12 0 17 6 27 9s18 3 18 15-7 15-7 24 8 15 2 24-17 4-27 10-13 10-24 6-11-11-20-16S4 71 4 60s9-13 9-23S9 21 20 15 38 4 50 4z"
          />
        </svg>
        <Monogram className="relative size-10 text-bone/90" strokeWidth={7} />
      </div>

      <p className="mt-12 font-display text-3xl text-bone">
        Your approach has been filed.
      </p>

      <p className="mt-6 font-mono text-[0.72rem] leading-loose text-bone-dim">
        It goes to the partnerships desk, not the general queue.
        <br />
        Expect an answer either way   we do not simply stop replying.
      </p>

      <div className="mt-10 flex justify-center">
        <Stamp tone="brass" rotate={-3}>
          RECEIVED
        </Stamp>
      </div>

      <p className="label mt-10 text-[0.55rem]">
        Reference <span className="ml-2 font-mono text-bone">{reference}</span>
      </p>
    </div>
  );
}
