"use client";

import type { ReactNode } from "react";

/**
 * Form furniture in the dossier language: mono labels, a ruled line rather
 * than a box, and errors that read like the Concierge correcting you gently.
 */

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="label flex items-baseline gap-2">
        {label}
        {required && <span className="text-blood">*</span>}
      </span>
      {hint && (
        <span className="mt-1.5 block font-mono text-[0.62rem] text-bone-dim/60">
          {hint}
        </span>
      )}
      <span className="mt-2 block">{children}</span>
      {error && (
        <span className="mt-2 block font-mono text-[0.66rem] text-blood">
          {error}
        </span>
      )}
    </label>
  );
}

export const inputClass =
  "w-full border-0 border-b border-bone/20 bg-transparent px-0 py-2.5 font-mono text-[0.82rem] text-bone outline-none transition-colors placeholder:text-bone-dim/35 focus:border-accent";

export const textareaClass = `${inputClass} min-h-32 resize-y leading-relaxed`;

export function ChoiceRow<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly T[];
  value: T | undefined;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${name}: ${option}`}
            onClick={() => onChange(option)}
            className={[
              "border px-4 py-2 font-mono text-[0.66rem] tracking-wide transition-colors",
              active
                ? "border-accent bg-accent/15 text-bone"
                : "border-bone/15 text-bone-dim hover:border-bone/35 hover:text-bone",
            ].join(" ")}
          >
            {option}
          </button>
        );
      })}
    </span>
  );
}
