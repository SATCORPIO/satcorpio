import type { Metadata } from "next";
import { Exo_2, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SATCORP | Deep Space Command",
  description: "SATCORP — Aerospace defense, orbital intelligence, and deep space exploration. A high-fidelity tactical command interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${exo2.variable} ${jetBrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#020408] text-[#f8fafc] antialiased selection:bg-[#2dd4bf] selection:text-black" style={{ 
        "--font-display": "var(--font-exo-2)",
        "--font-body": "var(--font-jetbrains-mono)"
      } as React.CSSProperties}>
        <div className="scanline-overlay" />
        <Header />
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
