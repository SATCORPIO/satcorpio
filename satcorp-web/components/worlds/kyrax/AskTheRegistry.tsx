"use client";

import { useRef, useState } from "react";
import { useEngagement, useHydrated, useUI } from "@/lib/store";
import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import {
  HOLDINGS,
  consultRegistry,
  type RegistryEntry,
  type RegistryHit,
} from "@/lib/registry-index";

/**
 * ASK THE REGISTRY   rebuilt
 *
 * The previous version promised general knowledge and had nine hard-coded
 * answers behind it, so the polite refusal fired on nearly everything and read
 * as a broken toy rather than as discretion.
 *
 * This one states its holdings before it is asked anything. It indexes what
 * SATCORP actually runs on   every service in the Ledger, the six operations,
 * the retainer classes, the engagement model and the paperwork   and it returns
 * real filed entries rather than prose about them. Anything it finds that can
 * be arranged carries a mark, which drops straight into the Ledger and arrives
 * pre-checked on the brief.
 *
 * No model, no API key, no per-query cost, and nothing it can be talked into
 * saying. When it finds nothing it says what it does cover, which is a boundary
 * rather than a failure   and is the whole reason the scope is published.
 */

const SUGGESTIONS = [
  "What does a brand system cost?",
  "Can you build a game prototype?",
  "How is my data handled?",
  "Who runs SATCORP?",
];

const KIND_LABEL: Record<RegistryEntry["kind"], string> = {
  service: "ARRANGEABLE",
  division: "OPERATION",
  retainer: "RETAINER",
  engagement: "PROCEDURE",
  paperwork: "PAPERWORK",
};

export function AskTheRegistry() {
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState<{
    q: string;
    hits: RegistryHit[];
  } | null>(null);
  const [consulting, setConsulting] = useState(false);
  const timer = useRef(0);

  const ask = (raw: string) => {
    const q = raw.trim();
    if (!q || consulting) return;
    setQuestion(q);
    setConsulting(true);
    setAnswered(null);

    // A beat of looking it up. The archive is thorough, not instant.
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setAnswered({ q, hits: consultRegistry(q) });
      setConsulting(false);
    }, 420);
  };

  return (
    <div className="border border-bone/10 bg-ink-raised/70 p-7 backdrop-blur-sm sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="label label-accent">Ask the Registry</p>
        <Stamp tone="accent" rotate={-2}>
          OPEN ENQUIRY
        </Stamp>
      </div>

      <p className="mt-5 max-w-2xl font-display text-xl leading-relaxed text-bone">
        It will tell you what it holds before you ask, which is more than most
        archives will do.
      </p>

      {/* The holdings, stated up front. Counted from the index rather than
          written down, so the claim cannot drift from the contents. */}
      <p className="mt-4 max-w-2xl font-mono text-[0.7rem] leading-relaxed text-bone-dim">
        Indexed: {HOLDINGS.services} services across {HOLDINGS.sections}{" "}
        sections, {HOLDINGS.divisions} operations, the retainer classes, the
        engagement model and the paperwork. Not indexed: clients, figures,
        anything not already on these pages.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
        className="mt-8 flex flex-wrap items-center gap-3 border-b border-bone/20 pb-3 focus-within:border-accent"
      >
        <span aria-hidden className="font-mono text-sm text-accent">
          ?
        </span>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask it something from the drawers above."
          aria-label="Ask the Registry a question"
          maxLength={140}
          className="min-w-0 flex-1 bg-transparent font-mono text-[0.82rem] text-bone outline-none placeholder:text-bone-dim/40"
        />
        <button
          type="submit"
          disabled={consulting || question.trim().length === 0}
          className="font-mono text-[0.62rem] tracking-[0.22em] text-bone-dim transition-colors hover:text-bone disabled:opacity-35"
        >
          {consulting ? "CONSULTING…" : "ENQUIRE"}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => ask(s)}
            className="border border-bone/12 px-3 py-1.5 font-mono text-[0.6rem] text-bone-dim transition-colors hover:border-accent/50 hover:text-bone"
          >
            {s}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-8 min-h-24">
        {consulting && (
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-bone-dim/70">
            LOOKING IT UP…
          </p>
        )}

        {answered && answered.hits.length > 0 && (
          <>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/60">
              {answered.hits.length}{" "}
              {answered.hits.length === 1 ? "ENTRY" : "ENTRIES"} FILED UNDER
              &ldquo;{answered.q.toUpperCase()}&rdquo;
            </p>
            <ul className="mt-4 space-y-2">
              {answered.hits.map((hit) => (
                <li key={hit.entry.file}>
                  <Result entry={hit.entry} />
                </li>
              ))}
            </ul>
          </>
        )}

        {answered && answered.hits.length === 0 && <NothingFiled />}
      </div>

      <div className="mt-9 border-t border-bone/10 pt-7">
        <p className="max-w-2xl font-mono text-[0.72rem] leading-loose text-bone-dim">
          The index is a catalogue, not a counsel. For anything that needs
          judgement rather than a file number, you&rsquo;ll want the Concierge.
        </p>
        <ThreadLink
          href="/engage"
          className="mt-5 inline-block border border-accent/40 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone transition-colors hover:bg-accent hover:text-ink"
        >
          OPEN A FILE →
        </ThreadLink>
      </div>
    </div>
  );
}

/** One filed entry. Services carry a mark; everything else carries a door. */
function Result({ entry }: { entry: RegistryEntry }) {
  const selected = useEngagement((s) => s.selected);
  const toggle = useEngagement((s) => s.toggle);
  const openLedger = useUI((s) => s.openLedger);
  const hydrated = useHydrated();

  // The mark is persisted state, so it cannot be read until the client has
  // rehydrated or the server HTML and the restored state will disagree.
  const marked = hydrated && entry.itemId ? selected.includes(entry.itemId) : false;

  return (
    <article className="border border-bone/12 bg-ink/45">
      <header className="flex items-baseline justify-between gap-4 border-b border-accent/20 px-5 py-2.5">
        <span className="font-mono text-[0.56rem] tracking-[0.22em] text-accent/80">
          {entry.file}
        </span>
        <span className="font-mono text-[0.54rem] tracking-[0.22em] text-bone-dim/55">
          {KIND_LABEL[entry.kind]} · {entry.group}
        </span>
      </header>

      <div className="px-5 py-5">
        <h3 className="font-display text-xl leading-tight text-bone">
          {entry.title}
        </h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-bone-dim">
          {entry.summary}
        </p>
        {entry.detail && (
          <p className="mt-2 font-mono text-[0.66rem] leading-relaxed text-bone-dim/70">
            {entry.detail}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {entry.itemId && (
            <button
              type="button"
              aria-pressed={marked}
              onClick={() => toggle(entry.itemId!)}
              className={[
                "border px-4 py-2 font-mono text-[0.6rem] tracking-[0.2em] transition-colors",
                marked
                  ? "border-blood bg-blood/15 text-bone"
                  : "border-bone/20 text-bone-dim hover:border-accent hover:text-bone",
              ].join(" ")}
            >
              {marked ? "✓ MARKED" : "MARK FOR SCOPE"}
            </button>
          )}

          {entry.itemId && marked && (
            <button
              type="button"
              onClick={openLedger}
              className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
            >
              OPEN THE LEDGER →
            </button>
          )}

          {entry.href && !entry.itemId && (
            <ThreadLink
              href={entry.href}
              className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
            >
              SEE THE FILE →
            </ThreadLink>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * The honest miss. Because the holdings were published before the question was
 * asked, this is a statement of scope rather than an apology.
 */
function NothingFiled() {
  return (
    <article className="border-l-2 border-accent/60 bg-ink/50 py-4 pl-5 pr-4">
      <p className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/60">
        FILE NIL
      </p>
      <p className="mt-3 font-display text-lg leading-relaxed text-bone">
        Nothing filed under that.
      </p>
      <p className="mt-3 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
        The drawers hold what SATCORP builds, what it costs, how the work runs
        and what happens to your data. They do not hold client names, live
        figures, or anything that is not already on these pages   and the
        archive would rather say so than improvise.
      </p>
    </article>
  );
}
