import type { ReactNode } from "react";
import { Stamp } from "@/components/fingerprints/Stamp";
import { LEGAL } from "@/lib/legal";

/**
 * THE RECORD   the frame both legal documents are set in.
 *
 * Sections are passed as data rather than written inline so the contents list
 * and the document itself cannot drift apart: one array produces both. A table
 * of contents that lies about what is in the document is the single most common
 * defect in policies of this kind.
 *
 * Everything here is static and server-rendered. Nothing about a legal document
 * should depend on JavaScript having loaded.
 */

export interface LegalSection {
  id: string;
  title: string;
  /**
   * One line of plain English, shown above the operative text. Required of a
   * privacy notice by GDPR Art. 12; owed to a reader everywhere else.
   */
  short?: string;
  body: ReactNode;
}

export function LegalDocument({
  fileNumber,
  title,
  lede,
  sections,
}: {
  fileNumber: string;
  title: string;
  lede: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="pb-14 pt-24">
        <Stamp tone="brass">{fileNumber}</Stamp>

        <h1 className="mt-8 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[0.98] text-bone">
          {title}
        </h1>

        <div className="mt-8 max-w-2xl font-display text-xl leading-relaxed text-bone-dim">
          {lede}
        </div>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ["In effect", LEGAL.effective],
            ["Last revised", LEGAL.revised],
            ["Version", LEGAL.version],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="label text-[0.55rem]">{label}</dt>
              <dd className="mt-1.5 font-mono text-[0.72rem] text-bone">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* --- Contents --- */}
      <nav aria-label="Contents" className="dossier p-6 sm:p-8">
        <p className="label label-accent">Contents</p>
        <ol className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
          {sections.map((section, i) => (
            <li key={section.id} className="flex gap-3">
              <span className="font-mono text-[0.62rem] leading-6 text-bone-dim/60 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${section.id}`}
                className="font-mono text-[0.72rem] leading-6 text-bone-dim transition-colors hover:text-accent"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* --- The document --- */}
      <div className="pb-28">
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-[calc(var(--chrome-h)+2rem)] border-t border-bone/10 pt-12 mt-16"
          >
            <p className="label label-accent">
              Clause {String(i + 1).padStart(2, "0")}
            </p>

            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.5vw,2.25rem)] leading-tight text-bone">
              {section.title}
            </h2>

            {section.short && (
              <p className="mt-5 border-l-2 border-brass/60 bg-brass/[0.06] px-5 py-3.5 font-mono text-[0.72rem] leading-relaxed text-bone">
                <span className="text-brass">In short   </span>
                {section.short}
              </p>
            )}

            <div className="legal mt-7">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
