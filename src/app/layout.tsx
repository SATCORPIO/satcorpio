import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import { ClientProviders } from "./ClientProviders";
import { FloatingActions } from "@/components/shared/FloatingActions";
import "./globals.css";
import "../styles/tokens.css";
import "../../styles/animations.css";
import "../../styles/responsive.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SATCORP | Tactical Command & Control",
  description: "SATCORP — Orbital defense, advanced technology, and strategic intelligence. A private military technology conglomerate operating at the edge of human capability.",
  keywords: "SATCORP, military technology, tactical systems, Ki-Ra Studios, PULSE",
  openGraph: {
    title: "SATCORP | Tactical Command & Control",
    description: "Orbital defense, advanced technology, and strategic intelligence.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${shareTechMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#050A0F] text-white antialiased">
        <ClientProviders>
          <FloatingActions />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
