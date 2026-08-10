import { Monogram } from "@/components/fingerprints/Monogram";
import { Stamp } from "@/components/fingerprints/Stamp";
import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";

/**
 * The burned dossier. The best page on the site, and the one people screenshot.
 */
export default function NotFound() {
  return (
    <div
      data-division="satcorp"
      className="grain vignette relative grid min-h-dvh place-items-center px-6"
    >
      <div className="relative z-10 max-w-lg text-center">
        <div className="flex justify-center">
          <Stamp tone="blood" rotate={-6}>
            NO SUCH FILE
          </Stamp>
        </div>

        <Monogram className="mx-auto mt-12 size-10 text-blood/40" />

        <h1 className="mt-10 font-display text-[clamp(2.5rem,9vw,4.5rem)] leading-none text-bone">
          404
        </h1>

        <p className="mt-8 font-display text-xl italic leading-relaxed text-bone-dim">
          That file never existed.
        </p>

        <p className="mt-5 font-mono text-[0.72rem] leading-loose text-bone-dim/70">
          And if it did, it doesn&rsquo;t now. I&rsquo;d suggest you go back to
          the index and ask for something I can actually get you.
        </p>

        <ThreadLink
          href="/"
          className="mt-12 inline-block border border-bone/20 px-8 py-3.5 font-mono text-[0.66rem] tracking-[0.24em] text-bone transition-colors hover:border-blood hover:bg-blood"
        >
          RETURN TO THE INDEX
        </ThreadLink>
      </div>
    </div>
  );
}
