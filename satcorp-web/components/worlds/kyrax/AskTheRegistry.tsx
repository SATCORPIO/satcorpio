"use client";

import { useRef, useState } from "react";
import { useUI } from "@/lib/store";
import { Stamp } from "@/components/fingerprints/Stamp";

/**
 * ASK THE REGISTRY
 *
 * A single line of input that answers a handful of things in character and
 * then, courteously, stops being useful and hands you to the Concierge. That
 * refusal is the point: the archive knows a great deal and volunteers almost
 * none of it.
 *
 * Entirely client-side and canned. Nothing is sent anywhere.
 */

interface Entry {
  /** Any of these appearing in the question triggers the answer. */
  keys: string[];
  answer: string;
  /** Rendered as the file reference on the answer card. */
  file: string;
}

const REGISTRY: Entry[] = [
  {
    keys: ["who", "what are you", "kyrax"],
    answer:
      "KYRAX. I keep what everyone else forgets to write down, and I notice when two of those things are the same thing.",
    file: "KX-000",
  },
  {
    keys: ["satcorp", "company", "ecosystem"],
    answer:
      "A technology ecosystem   intelligence, creative platforms and digital worlds, run on its own iron. Six operations. One index.",
    file: "SC-001",
  },
  {
    keys: ["anu", "architect", "concierge", "who runs"],
    answer:
      "ANU. Lead systems architect. Everything in this archive was filed on their instruction, including the entry about you.",
    file: "AN-004",
  },
  {
    keys: ["namtar", "game", "survival"],
    answer:
      "NAMTAR. A seamless planet where every decision changes your future. I run the wildlife, the weather and the things that notice you first.",
    file: "NM-012",
  },
  {
    keys: ["pulse", "community", "creator"],
    answer:
      "PULSE. Creators, audiences and live events. I read the room so nobody has to guess what the room wants.",
    file: "PL-007",
  },
  {
    keys: ["kira", "ki-ra", "studio"],
    answer:
      "Ki-Ra Studios. Worlds built to keep growing after launch. I am the part that keeps them interesting once you know your way around.",
    file: "KR-002",
  },
  {
    keys: ["price", "cost", "how much", "quote", "budget"],
    answer:
      "I don't discuss terms. I file them. For what a thing costs, you'll want the Concierge   and a rather more specific question.",
    file: " ",
  },
  {
    keys: ["secret", "blacklist", "classified", "redacted", "hidden"],
    answer:
      "There is a list. You are welcome to ask about it. I am not obliged to be forthcoming, and on this occasion I won't be.",
    file: "[REDACTED]",
  },
  {
    keys: ["hire", "work", "build", "help", "project", "engage"],
    answer:
      "Then you want an arrangement, not an answer. Open the Ledger   mark what you need and the Concierge will take it from there.",
    file: "EN-001",
  },
];

const FALLBACK: Entry = {
  keys: [],
  answer:
    "I have nothing filed under that. Which is not the same as there being nothing   only that you have not yet asked the right way.",
  file: "NIL",
};

function consult(question: string): Entry {
  const q = question.toLowerCase();
  return REGISTRY.find((e) => e.keys.some((k) => q.includes(k))) ?? FALLBACK;
}

const SUGGESTIONS = ["What is SATCORP?", "Who runs it?", "What does it cost?"];

export function AskTheRegistry() {
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState<{ q: string; entry: Entry } | null>(
    null,
  );
  const [consulting, setConsulting] = useState(false);
  const openLedger = useUI((s) => s.openLedger);
  const timer = useRef(0);

  const ask = (raw: string) => {
    const q = raw.trim();
    if (!q || consulting) return;
    setQuestion(q);
    setConsulting(true);
    setAnswered(null);
    // A beat of looking it up. The archive is thorough, not instant.
    timer.current = window.setTimeout(() => {
      setAnswered({ q, entry: consult(q) });
      setConsulting(false);
    }, 620);
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
        It will answer a few things. It will decline the rest, pleasantly.
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
          placeholder="Ask it something."
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

        {answered && (
          <article className="border-l-2 border-accent/60 bg-ink/50 py-4 pl-5 pr-4">
            <p className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/60">
              FILE {answered.entry.file}
            </p>
            <p className="mt-3 font-display text-lg leading-relaxed text-bone">
              {answered.entry.answer}
            </p>
          </article>
        )}
      </div>

      <div className="mt-9 border-t border-bone/10 pt-7">
        <p className="max-w-2xl font-mono text-[0.72rem] leading-loose text-bone-dim">
          For anything further, you&rsquo;ll want to speak with the Concierge.
        </p>
        <button
          type="button"
          onClick={openLedger}
          className="mt-5 border border-accent/40 px-7 py-3 font-mono text-[0.64rem] tracking-[0.22em] text-bone transition-colors hover:bg-accent hover:text-ink"
        >
          OPEN THE LEDGER
        </button>
      </div>
    </div>
  );
}
