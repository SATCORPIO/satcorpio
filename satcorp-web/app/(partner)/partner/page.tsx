import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { PartnerForm } from "@/components/partner/PartnerForm";

/**
 * PARTNER WITH SATCORP
 *
 * The other door. The Engagement Brief is for someone commissioning work; this
 * is for someone proposing to stand alongside a division   a studio, a vendor,
 * a creator, an operator. Different questions, different desk, different
 * webhook.
 */
export default function PartnerPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="pb-12 pt-24">
        <Stamp tone="brass">APPROACH</Stamp>

        <h1 className="mt-8 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-bone">
          Partner With SATCORP
        </h1>

        <p className="mt-8 max-w-2xl font-display text-xl leading-relaxed text-bone-dim">
          Six operations, and every one of them is easier to run with the right
          people standing next to it. Tell us which division you have in mind
          and what you would bring to it.
        </p>

        <p className="mt-6 max-w-2xl font-mono text-[0.7rem] leading-relaxed text-bone-dim/70">
          Looking to commission work rather than collaborate on it? That is a
          different conversation   open{" "}
          <ThreadLink
            href="/engage"
            className="text-brass underline-offset-4 hover:underline"
          >
            the Engagement Brief
          </ThreadLink>{" "}
          instead.
        </p>
      </section>

      <section className="pb-28">
        <PartnerForm />
      </section>
    </div>
  );
}
