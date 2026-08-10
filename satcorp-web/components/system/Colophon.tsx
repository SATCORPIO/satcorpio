import { ThreadLink } from "@/components/fingerprints/CaseFileTransition";
import { Monogram } from "@/components/fingerprints/Monogram";
import { LEGAL, LEGAL_ROUTES } from "@/lib/legal";

/**
 * THE COLOPHON — the legal strip beneath every establishment.
 *
 * Lives in the root layout rather than in any one page, because a link to the
 * terms and the privacy policy that appears on only some pages is, for
 * compliance purposes, a link that does not appear at all.
 *
 * Deliberately quiet: this is the one piece of chrome that should never
 * compete with the establishment above it. It sits outside DivisionShell and
 * inherits the accent from the mirrored attribute on <html>, so it takes on the
 * colour of whichever establishment you are standing in.
 *
 * Kept short on purpose — /namtar derives its descent from fractions of total
 * document scroll, so anything tall added at the foot of every page shifts that
 * journey underneath it.
 */
export function Colophon() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-10 gap-y-5 px-6 py-7">
        <div className="flex items-center gap-3">
          <Monogram className="size-4 text-bone-dim/60" />
          <p className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/70">
            © {year} {LEGAL.entity}
          </p>
        </div>

        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {LEGAL_ROUTES.map((route) => (
              <li key={route.href}>
                <ThreadLink
                  href={route.href}
                  className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/70 uppercase transition-colors hover:text-accent"
                >
                  {route.label}
                </ThreadLink>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${LEGAL.contactEmail}`}
                className="font-mono text-[0.6rem] tracking-[0.2em] text-bone-dim/70 uppercase transition-colors hover:text-accent"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
