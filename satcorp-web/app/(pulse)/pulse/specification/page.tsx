import type { Metadata } from "next";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Stamp } from "@/components/fingerprints/Stamp";
import {
  API_SKETCH,
  CREATOR_SURFACES,
  DOCTRINE,
  IDENTITY_LEVELS,
  OAUTH_SKETCH,
  PILLARS,
  ROADMAP,
  ROADMAP_STAMP,
  SPACE_KINDS,
  SPACE_MODULES,
  VERIFICATION,
} from "@/lib/pulse-platform";

export const metadata: Metadata = {
  // A complete title, not a fragment for a template to complete   this site
  // does not use title.template anywhere (every division layout sets a flat
  // string), and Next only applies a parent's template when nothing between
  // the page and that ancestor has already set its own plain-string title.
  // The pulse layout already has one, so a fragment here would render with
  // no site context at all rather than silently inheriting one. Matches the
  // convention every division layout already establishes: a flat title
  // string, not a template fragment.
  title: "PULSE Specification   SATCORP",
  description:
    "The full PULSE platform specification: identity, Spaces, the Creator Hub, the roadmap, the privacy doctrine, and a sketch of the eventual API.",
  alternates: { canonical: "/pulse/specification" },
};

/**
 * THE SPECIFICATION   the long-form document, Track A phase 2.
 *
 * `/pulse` carries the story; this carries the detail   the full module
 * list, the identity/verification matrix, the roadmap in full, and a sketch
 * of the API that does not exist yet. Reuses the `.legal` type treatment
 * Terms and Privacy already use (long-form measure, dossier-mono labels),
 * but deliberately **not** the shared `<LegalDocument>` component: that
 * component hardcodes the brass accent and "In effect / Last revised"
 * framing that belong to the paperwork's own "engage" theme. This is a
 * product specification living under PULSE's own accent, not a legal
 * document, and reusing LEGAL's dates here would misstate what they mean   a
 * spec's own revision has nothing to do with when the privacy policy was
 * last amended. Plan §3.1: PULSE's accent stays the accent on every surface
 * that is actually PULSE's.
 *
 * Renders entirely from `lib/pulse-platform.ts`. Nothing on this page is a
 * second copy of anything on `/pulse` itself   if a number or a line of copy
 * needs to change, it changes once, in the data module, and both routes pick
 * it up.
 */

const SPEC_META = {
  published: "8 September 2026",
  version: "0.2",
};

interface Section {
  id: string;
  title: string;
  short: string;
}

const SECTIONS: Section[] = [
  { id: "overview", title: "Overview", short: "What PULSE is, in five pillars." },
  { id: "identity", title: "PULSE ID", short: "Identity levels and verification classes." },
  { id: "spaces", title: "Spaces", short: "One structure, four shapes, fourteen modules." },
  { id: "creator", title: "The Creator Hub", short: "Seven surfaces for anyone publishing through PULSE." },
  { id: "roadmap", title: "The Roadmap", short: "Every phase, and the state it is actually in." },
  { id: "doctrine", title: "The Doctrine", short: "The privacy position, and why it is a position." },
  { id: "api", title: "The API", short: "A sketch, not a service. Track B phase 7." },
];

export default function PulseSpecificationPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* --- Header --- */}
      <header className="pb-14 pt-24">
        <Stamp tone="accent" rotate={-1}>
          FILE PULSE-SPEC
        </Stamp>

        <h1 className="mt-8 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[0.98] text-bone">
          PULSE Specification
        </h1>

        <p className="mt-8 max-w-2xl font-display text-xl leading-relaxed text-bone-dim">
          The detail behind{" "}
          <ThreadLink href="/pulse" className="text-bone underline-offset-4 hover:underline">
            /pulse
          </ThreadLink>
          : every identity level, every module, the roadmap in full, and the
          shape of the API that does not exist yet.
        </p>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ["Published", SPEC_META.published],
            ["Version", SPEC_META.version],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="label text-[0.55rem]">{label}</dt>
              <dd className="mt-1.5 font-mono text-[0.72rem] text-bone">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-2xl font-mono text-[0.66rem] leading-relaxed text-bone-dim/70">
          The idea is not the moat. This document is public on purpose   see
          plan §13.4.
        </p>
      </header>

      {/* --- Contents --- */}
      <nav aria-label="Contents" className="dossier p-6 sm:p-8">
        <p className="label label-accent">Contents</p>
        <ol className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
          {SECTIONS.map((section, i) => (
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
        {/* 01. OVERVIEW */}
        <Clause index={0} section={SECTIONS[0]}>
          <p>
            PULSE is SATCORP&rsquo;s engagement and community platform   the
            connective layer between creators, audiences, communities, and the
            experiences they build. It is not a sixth product standing beside
            the other five divisions; it is the layer between them.
          </p>
          <dl>
            {PILLARS.map((pillar) => (
              <div key={pillar.id}>
                <dt>
                  {pillar.name}
                  {pillar.later && (
                    <>
                      {" "}
                      <span className="text-bone-dim/60">(later phase)</span>
                    </>
                  )}
                </dt>
                <dd>{pillar.line}</dd>
              </div>
            ))}
          </dl>
        </Clause>

        {/* 02. IDENTITY */}
        <Clause index={1} section={SECTIONS[1]}>
          <p>
            One account. One identity. Multiple experiences. A PULSE identity
            travels with its holder into Ki-Ra&rsquo;s communities, into
            NAMTAR&rsquo;s world, and into anything SATCORP opens next.
          </p>
          <h3>Identity levels</h3>
          <ul>
            {IDENTITY_LEVELS.map((level) => (
              <li key={level.id}>{level.name}</li>
            ))}
          </ul>
          <h3>Verification classes</h3>
          <dl>
            {VERIFICATION.map((v) => (
              <div key={v.id}>
                <dt>{v.name}</dt>
                <dd>{v.line}</dd>
              </div>
            ))}
          </dl>
        </Clause>

        {/* 03. SPACES */}
        <Clause index={2} section={SECTIONS[2]}>
          <p>
            A Space is a complete digital home. A creator, a community, a
            business and a game all get the same fourteen modules; what
            differs is which ones are switched on.
          </p>
          <h3>The fourteen modules</h3>
          <ul>
            {SPACE_MODULES.map((m) => (
              <li key={m.id}>
                <strong>{m.name}</strong>   {m.line}
              </li>
            ))}
          </ul>
          <h3>Space kinds</h3>
          <dl>
            {SPACE_KINDS.map((kind) => (
              <div key={kind.id}>
                <dt>{kind.name}</dt>
                <dd>
                  {kind.line} Modules:{" "}
                  {kind.modules
                    .map(
                      (id) => SPACE_MODULES.find((m) => m.id === id)?.name,
                    )
                    .join(", ")}
                  .
                </dd>
              </div>
            ))}
          </dl>
        </Clause>

        {/* 04. CREATOR HUB */}
        <Clause index={3} section={SECTIONS[3]}>
          <ul>
            {CREATOR_SURFACES.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>   {s.line}
              </li>
            ))}
          </ul>
        </Clause>

        {/* 05. ROADMAP */}
        <Clause index={4} section={SECTIONS[4]}>
          <p>
            Every state below is real   nothing on this page or on{" "}
            <ThreadLink href="/pulse">/pulse</ThreadLink> carries a live stamp
            until the corresponding phase actually is.
          </p>
          <dl>
            {ROADMAP.map((phase) => (
              <div key={phase.slot}>
                <dt>
                  {phase.slot}   {phase.name}{" "}
                  <span className="text-blood-hot">
                    [{ROADMAP_STAMP[phase.state]}]
                  </span>
                </dt>
                <dd>{phase.note}</dd>
              </div>
            ))}
          </dl>
        </Clause>

        {/* 06. DOCTRINE */}
        <Clause index={5} section={SECTIONS[5]}>
          <p className="conspicuous">{DOCTRINE.claim}</p>
          <p>{DOCTRINE.body}</p>
          <p>{DOCTRINE.footer}</p>
          <p>
            Full detail   what is collected, why, who else sees it, and for
            how long   is in the{" "}
            <ThreadLink href="/privacy">Privacy Policy</ThreadLink>. This
            section states conduct, never data-infrastructure topology: see
            build plan §7.6.
          </p>
        </Clause>

        {/* 07. API */}
        <Clause index={6} section={SECTIONS[6]}>
          <p>
            Nothing below is callable. Track B phase 7   &ldquo;Platform&rdquo;
            in the build plan&rsquo;s own roadmap   is the last phase, not the
            first, and is published here so a developer deciding whether to
            build against PULSE later can see the shape of the commitment now.
          </p>
          <dl>
            {API_SKETCH.map((endpoint) => (
              <div key={`${endpoint.method}-${endpoint.path}`}>
                <dt>
                  {endpoint.method} {endpoint.path}
                </dt>
                <dd>{endpoint.note}</dd>
              </div>
            ))}
          </dl>
          <h3>Sign-in</h3>
          <p>{OAUTH_SKETCH}</p>
        </Clause>
      </div>
    </div>
  );
}

function Clause({
  index,
  section,
  children,
}: {
  index: number;
  section: Section;
  children: React.ReactNode;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-[calc(var(--chrome-h)+2rem)] border-t border-bone/10 pt-12 mt-16"
    >
      <p className="label label-accent">Section {String(index + 1).padStart(2, "0")}</p>

      <h2 className="mt-4 font-display text-[clamp(1.6rem,3.5vw,2.25rem)] leading-tight text-bone">
        {section.title}
      </h2>

      <p className="mt-5 border-l-2 border-blood-hot/60 bg-blood-hot/[0.06] px-5 py-3.5 font-mono text-[0.72rem] leading-relaxed text-bone">
        <span className="text-blood-hot">In short   </span>
        {section.short}
      </p>

      <div className="legal mt-7">{children}</div>
    </section>
  );
}
