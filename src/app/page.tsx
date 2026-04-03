"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { TacticalHeader } from "@/components/shared/TacticalHeader";
import { SpatialCard } from "@/components/shared/SpatialCard";
import { DossierManual } from "@/components/shared/DossierManual";
import { navLinks, dossierData } from "@/data/dossier";

export default function SatcorpHome() {
  const [activeNav, setActiveNav] = useState(0);

  const scrollToDossier = () => {
    document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="home film-grain">
      {/* ─── Volumetric Background (Fixed for parallax illusion) ─── */}
      <div className="hub-bg">
        <Image src="/globe_tactical.png" alt="Tactical Globe" fill priority style={{ objectFit: 'cover', opacity: 0.6 }} />
      </div>
      <div className="hub-dim" />
      <div className="volumetric-flare" style={{ background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 70%)', top: '10%', left: '20%', position: 'fixed' }} />
      <div className="volumetric-flare" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', bottom: '10%', right: '10%', position: 'fixed' }} />

      {/* ─── TOP BAR ─── */}
      <TacticalHeader />

      {/* ─── Spatial Hub (Viewport 1) ─── */}
      <section className="spatial-hub" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


        {/* ─── Floating Cards 3D Wheel ─── */}
        <div className="wheel-container">
          <div className="wheel-track">
            {/* Double the cards for seamless loop */}
            {[...navLinks, ...navLinks].map((n, i) => (
              <div key={`${n.id}-${i}`} className="wheel-item">
                <SpatialCard
                  {...n}
                  index={i}
                  isActive={activeNav === i % navLinks.length}
                  onHover={() => setActiveNav(i % navLinks.length)}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          onClick={scrollToDossier}
        >
          <span>OPERATIONAL DOSSIER</span>
          <ChevronDown size={14} className="bounce-arrow" />
        </motion.div>
      </section>

      <DossierManual 
        items={dossierData}
        sectionTitle="SATCORP OPERATION COMMAND"
        sectionSubtitle="DEVELOPER BRANCH // CONCIERGE / SYSTEM ARCHITECT / CREATIVE OP"
        terminalPrefix="SAT"
        anchorId="dossier"
      />

      {/* ─── FOOTER ─── */}
      <footer className="hud-footer spatial-panel">
        <span>CLASSIFICATION: COMMAND ARCHITECTURE</span>
        <span>SATCORP © {new Date().getFullYear()}</span>
        <span className="alert-text">RESTRICTED DOSSIER LOGGED</span>
      </footer>

      <style jsx>{`
        .home {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          color: white;
          overflow-x: hidden;
        }

        .hub-bg {
          position: fixed;
          inset: -5%;
          z-index: 0;
          animation: slow-pan 40s ease-in-out infinite alternate;
        }
        
        .hub-dim {
          position: fixed;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at top center, rgba(3,5,8,0.3) 0%, rgba(3,5,8,0.7) 70%, rgba(3,5,8,0.8) 100%);
        }

        .hero {
          min-height: 100vh;
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

        .hub-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 4px;
          color: var(--c2-green);
          border: 1px solid rgba(0,255,65,0.2);
          padding: 6px 16px;
          border-radius: 4px;
          background: rgba(0,255,65,0.05);
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,255,65,0.05);
        }

        .hub-title {
          font-family: var(--font-tactical);
          font-size: clamp(48px, 6vw, 84px);
          font-weight: 900;
          letter-spacing: 8px;
          line-height: 1.1;
          text-shadow: var(--shadow-spatial-lg);
          margin-bottom: 16px;
        }

        .hub-desc {
          font-size: 15px;
          color: rgba(248,250,252,0.5);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
          letter-spacing: 0.5px;
        }

        .cards-spatial {
          display: flex;
          justify-content: center;
          gap: 20px;
          perspective: 1500px;
          flex-wrap: wrap;
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
          color: rgba(0,255,65,0.5);
          cursor: pointer;
          transition: color 300ms;
        }
        .scroll-indicator:hover { color: var(--c2-green); }
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
        .alert-text {
          color: rgba(239, 68, 68, 0.6);
        }

        @media (max-width: 1200px) {
          .nav-card { min-width: 200px; height: 380px; }
        }
        @media (max-width: 900px) {
          .dossier-manual { flex-direction: column; height: 800px; }
          .manual-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); height: 250px; flex: none; }
          .viewport-content { padding: 32px; }
          .vh-title { font-size: 24px; }
        }
        @media (max-width: 768px) {
          .topbar { flex-direction: column; gap: 16px; padding: 20px; }
          .hud-footer { flex-direction: column; gap: 8px; text-align: center; }
          .cards-spatial { flex-direction: column; align-items: center; }
          .nav-card { width: 100%; max-width: 400px; height: 320px; }
          .hub-title { font-size: 40px; }
          .spatial-hub { padding: 40px 20px; }
          .dossier-section { padding: 60px 20px; }
          .vh-left { flex-direction: column; align-items: flex-start; gap: 16px; }
          .vh-right { display: none; }
          .viewport-list li { flex-direction: column; gap: 8px; font-size: 14px; }
        }
      `}</style>
    </main>
  );
}
