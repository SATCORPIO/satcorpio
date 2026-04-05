"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { DossierSection } from "@/components/DossierSection";
import { dossierData as masterDossier } from "@/data/dossier";

export default function PulsePage() {
  const scrollToDossier = () => {
    document.getElementById('pulse-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="pulse">
      {/* ─── Cybernetic Background ─── */}
      <div className="bg-pulse">
        <Image src="/pulse_radio.png" alt="Pulse Radio Hub" fill priority style={{ objectFit: 'cover' }} />
        <div className="bg-scanline" />
        <div className="bg-vignette" />
        <div className="noise-overlay" />
      </div>

      {/* Local nav removed in favor of global header */}
      <div className="pulse-status-bar">
        <div className="now-broadcasting">
          <div className="broadcast-indicator">
            <span className="indicator-dot"></span>
            <span className="indicator-text">SIGNAL: ACTIVE</span>
          </div>
          <div className="waveform">
             <div className="bar"></div>
             <div className="bar"></div>
             <div className="bar"></div>
             <div className="bar"></div>
             <div className="bar"></div>
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            initial={{ opacity: 0, y: -40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="hero-header"
            style={{ perspective: 1000 }}
          >
            <p className="subtitle">ELITE BROADCAST ARCHITECTURE & LIVE OPERATIONS</p>
            <Image
              src="/file_000000006e7061faa7eeea560cc41296.png"
              alt="PULSE"
              width={800}
              height={240}
              className="hero-logo"
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.4))' }}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="desc"
          >
            Architecting the next generation of digital signal transmission. We build high-fidelity creator environments, 
            cinematic post-production pipelines, and automated syndication hubs for the modern broadcast era.
          </motion.p>
          
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <ChevronDown size={18} className="bounce-arrow" />
          </motion.div>
        </div>
      </section>

      <div id="pulse-dossier">
        <DossierSection
          division="pulse"
          classification="RECONSTRUCTION // v3.5"
          title="BROADCAST PROTOCOLS"
          accentColor="#22D3EE"
          entries={[
            { index: "01", text: "COMING SOON // UNDER RECONSTRUCTION" },
            { index: "02", text: "COMING SOON // UNDER RECONSTRUCTION" },
            { index: "03", text: "COMING SOON // UNDER RECONSTRUCTION" }
          ]}
          tabs={[
            {
               label: "RECONSTRUCTION",
               content: [
                 "COMING SOON // UNDER RECONSTRUCTION v3.5",
               ]
            }
          ]}
        />
      </div>

      <footer className="pulse-footer spatial-panel">
        <span>PULSE © {new Date().getFullYear()}</span>
        <span className="now-broadcasting">NETWORK SIGNAL: ONLINE</span>
      </footer>

      <style jsx>{`
        .pulse {
          background: #02060A;
          font-family: var(--font-body);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .bg-pulse {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .bg-scanline {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.15),
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 2;
        }
        .bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(2,6,10,0.3) 0%, #02060A 90%);
          z-index: 1;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 3;
          animation: noise-shift 0.2s steps(2) infinite;
        }

        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(1%, 1%); }
        }

        .pulse-nav {
          position: relative;
          z-index: 100;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(34, 211, 238, 0.7); text-decoration: none;
          padding: 10px 16px; border-radius: 4px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(34, 211, 238, 0.2);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, rgba(2, 6, 10, 0.8) 100%);
        }
        .back-link:hover {
          color: #22D3EE;
          border-color: rgba(34, 211, 238, 0.5);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.2), inset 0 0 10px rgba(34, 211, 238, 0.1);
        }

        .now-broadcasting {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.4);
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid rgba(34, 211, 238, 0.1);
          backdrop-filter: blur(8px);
        }

        .broadcast-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .indicator-dot {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 8px #ef4444;
          animation: pulse-red 1.5s infinite;
        }

        @keyframes pulse-red {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .indicator-text {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: #ef4444;
        }

        .waveform {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 16px;
        }

        .bar {
          width: 2px;
          background: #22D3EE;
          animation: equalize 1s infinite;
        }

        .bar:nth-child(1) { height: 10px; animation-delay: 0.1s; }
        .bar:nth-child(2) { height: 16px; animation-delay: 0.3s; }
        .bar:nth-child(3) { height: 12px; animation-delay: 0.2s; }
        .bar:nth-child(4) { height: 14px; animation-delay: 0.4s; }
        .bar:nth-child(5) { height: 8px; animation-delay: 0.5s; }

        @keyframes equalize {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
        }

        .broadcast-label {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(34, 211, 238, 0.8);
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px 80px;
          text-align: center;
          position: relative;
          z-index: 10;
        }

        .hero-inner {
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .hero-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .subtitle {
          font-family: var(--font-share-tech-mono), monospace; 
          font-size: 14px; letter-spacing: 8px;
          color: rgba(34, 211, 238, 0.9);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .hero-logo {
          max-width: 800px;
          width: 90%;
          height: auto;
          filter: drop-shadow(0 0 50px rgba(34, 211, 238, 0.3));
        }

        .desc {
          max-width: 680px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 40px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(34, 211, 238, 0.5); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #22D3EE; }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        .pulse-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-share-tech-mono), monospace; font-size: 9px; letter-spacing: 2px;
          color: rgba(34, 211, 238, 0.5); border-color: rgba(34, 211, 238, 0.2);
          background: rgba(2, 6, 10, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 2px; position: relative; z-index: 100;
        }
        .system-perf { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.4); }
        .separator { color: rgba(34, 211, 238, 0.3); }

        @media (max-width: 900px) {
          .now-broadcasting { display: none; }
          .hero-logo { width: 100%; max-width: 500px; }
          .hero { padding: 60px 16px 40px; }
          .pulse-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
        }
      `}</style>
    </main>
  );
}
