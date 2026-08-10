import { Stamp } from "@/components/fingerprints/Stamp";
import { BriefForm } from "@/components/ledger/BriefForm";
import { LedgerButton } from "@/components/ledger/LedgerButton";

/**
 * THE ENGAGEMENT BRIEF
 *
 * The intake form, structured as the Concierge Engagement Model so the sales
 * process and the theme are the same object.
 */
export default function EngagePage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="pb-12 pt-24">
        <Stamp tone="brass">FILE OPENING</Stamp>

        <h1 className="mt-8 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-bone">
          The Engagement Brief
        </h1>

        <p className="mt-8 max-w-2xl font-display text-xl leading-relaxed text-bone-dim">
          Three movements and a seal. Tell me what&rsquo;s true, we&rsquo;ll
          agree on what gets built, and then it gets built.
        </p>

        <p className="mt-6 max-w-2xl font-mono text-[0.7rem] leading-relaxed text-bone-dim/70">
          Anything you marked in the{" "}
          <LedgerButton className="text-brass underline-offset-4 hover:underline">
            Ledger
          </LedgerButton>{" "}
          is already carried across.
        </p>
      </section>

      <section className="pb-28">
        <BriefForm />
      </section>
    </div>
  );
}
