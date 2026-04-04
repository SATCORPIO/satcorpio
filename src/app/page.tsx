"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import DivisionCard from "@/components/DivisionCard";
import { navLinks } from "@/data/dossier";
import OperationsSection from "@/components/OperationsSection";
import { HeroGlobe } from "@/components/HeroGlobe";
import { useClientCore } from "@/app/ClientProviders";

export default function SatcorpHome() {
  const { playClick, playHover } = useClientCore();

  const scrollToDossier = () => {
    playClick();
    document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="home film-grain">
      {/* ─── WebGL Hero Scene (Background) ─── */}
      <HeroGlobe />

      {/* ─── Spatial Hub (Viewport 1) ─── */}
      <section className="spatial-hub pt-32 pb-20 relative z-10">
        <div className="max-w-[1500px] mx-auto px-8">
          <div className="cards-spatial">
            {navLinks.map((link, idx) => (
              <DivisionCard 
                key={link.id}
                {...link}
                status={link.status as "ACTIVE" | "TRANSMITTING" | "OPERATIONAL" | "LOCKED"}
                delay={idx * 0.15}
              />
            ))}
          </div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }}
          onClick={scrollToDossier}
          onMouseEnter={playHover}
        >
          <ChevronDown size={18} className="bounce-arrow" />
        </motion.div>

      </section>

      {/* ─── Operation Command (Viewport 2) ─── */}
      <OperationsSection />

      {/* ─── FOOTER ─── */}
      <footer className="hud-footer spatial-panel">
        <span>CLASSIFICATION: COMMAND ARCHITECTURE</span>
        <span>SATCORP © {new Date().getFullYear()}</span>
      </footer>

      <style jsx>{`
        .home {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          color: white;
          overflow-x: hidden;
          background: #030508;
        }

        .spatial-hub {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          justify-content: center;
          position: relative;
        }

        .cards-spatial {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
          perspective: 1500px;
        }

        .scroll-indicator {
          margin-top: 60px;
          align-self: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 300ms;
        }
        .scroll-indicator:hover { color: white; transform: translateY(5px); }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ── Footer ── */
        .hud-footer {
          margin: 0 20px 20px;
          padding: 16px 32px;
          position: relative;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          border-radius: 12px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
        }

        @media (max-width: 1200px) {
           .cards-spatial { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 768px) {
          .cards-spatial { grid-template-columns: 1fr; gap: 20px; }
          .spatial-hub { padding-top: 100px; }
          .hud-footer { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
    </main>
  );
}
