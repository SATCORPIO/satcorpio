import type { Metadata, Viewport } from "next";
import { Playfair_Display, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

import { CaseFileTransition } from "@/components/fingerprints/CaseFileTransition";
import { FileTabs } from "@/components/fingerprints/FileTabs";
import { Seal } from "@/components/fingerprints/Seal";
import { Cursor } from "@/components/fingerprints/Cursor";
import { ThreadBackdrop } from "@/components/fingerprints/ThreadBackdrop";
import { LedgerModal } from "@/components/ledger/LedgerModal";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { Colophon } from "@/components/system/Colophon";
import { LEGAL } from "@/lib/legal";

/* --- Fingerprint 2.2: The Three Voices --- */

/** The Concierge — headlines, quotes, the things said slowly. */
const concierge = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-concierge",
  display: "swap",
});

/** The Dossier — labels, stamps, classified copy, form fields. */
const dossier = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dossier",
  display: "swap",
});

/** The Operator — UI chrome and long body copy. */
const operator = Inter({
  subsets: ["latin"],
  variable: "--font-operator",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(LEGAL.siteUrl),
  title: {
    default: "SATCORP — Intelligent systems, creative platforms, digital worlds",
    template: "%s — SATCORP",
  },
  description:
    "SATCORP is a technology ecosystem built to develop, connect and operate the next generation of intelligent systems, creative platforms and digital worlds.",
  openGraph: {
    type: "website",
    siteName: "SATCORP",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-division="satcorp"
      className={`${concierge.variable} ${dossier.variable} ${operator.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <CaseFileTransition>
          {/* Fingerprint 2.3 — the thread runs behind every establishment. */}
          <ThreadBackdrop />

          <FileTabs />

          <main id="content">{children}</main>

          {/* The paperwork, reachable from every page. */}
          <Colophon />

          {/* Fingerprint 2.5 — the one element that never changes. */}
          <Seal />
          <LedgerModal />

          <Cursor />
          <SmoothScroll />
        </CaseFileTransition>
      </body>
    </html>
  );
}
