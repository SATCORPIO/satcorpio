import { Stamp, type StampTone } from "@/components/fingerprints/Stamp";

/**
 * PLACEHOLDER DISCIPLINE (build plan §12)
 *
 * Every slot waiting on final art ships as a designed classified frame with a
 * stamp and a file number. The site reads as intentional long before the
 * renders, screenshots and trailers exist   and dropping the real asset in
 * later costs no layout work.
 */
export function Placeholder({
  label,
  file,
  aspect = "16 / 9",
  stamp = "AWAITING CLEARANCE",
  tone = "blood",
  className = "",
}: {
  /** What will eventually live here. */
  label: string;
  /** Dossier file number, e.g. "KR-041". */
  file: string;
  aspect?: string;
  stamp?: string;
  tone?: StampTone;
  className?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden border border-bone/10 bg-ink-raised ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {/* Registration marks, as on a printed contact sheet. */}
      <span
        aria-hidden
        className="absolute inset-3 border border-dashed border-bone/10"
      />
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 9px, #E9E1D3 9px 10px)",
        }}
      />

      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <Stamp tone={tone}>{stamp}</Stamp>
        <p className="font-mono text-[0.7rem] leading-relaxed text-bone-dim">
          {label}
        </p>
        <p className="label text-[0.55rem] text-bone-dim/50">FILE {file}</p>
      </figcaption>
    </figure>
  );
}
