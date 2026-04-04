"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import DivisionCarousel from "@/components/DivisionCarousel";
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

      {/* ─── BANNER HEADER ─── */}
      <div className="banner-header">
        <Image 
          src="/004cc.PNG" 
          alt="SATCORP Banner" 
          width={800} 
          height={270} 
          priority 
          className="banner-img"
        />
      </div>


      {/* ─── Spatial Hub (Viewport 1) ─── */}
      <section className="spatial-hub" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10 }}>


        <DivisionCarousel />

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

      <OperationsSection />

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

        .banner-header {
          position: relative;
          z-index: 100;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          animation: fade-in 1.2s cubic-bezier(0.2, 0, 0.2, 1);
          padding: 0 40px; 
          max-height: 280px; 
          margin-top: 20px;
          overflow: visible; /* Let the shadow spill naturally */
        }
        .banner-img {
          width: 100%;
          height: auto;
          max-width: 800px; 
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 0 40px rgba(0,255,65,0.2));
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
          .dossier-manual { flex-direction: column; height: auto; min-height: 600px; }
          .manual-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); height: auto; max-height: 220px; flex: none; }
          .viewport-content { padding: 28px; }
          .vh-title { font-size: 22px; letter-spacing: 2px; }
        }
        @media (max-width: 768px) {
          .banner-header { padding: 0 16px; margin-top: 10px; }
          .hud-footer { flex-direction: column; gap: 8px; text-align: center; margin: 0 10px 10px; padding: 12px 16px; }
          .cards-spatial { flex-direction: column; align-items: center; }
          .nav-card { width: 100%; max-width: 400px; height: 320px; }
          .hub-title { font-size: 36px; letter-spacing: 4px; }
          .spatial-hub { padding: 20px 12px; }
          .dossier-section { padding: 60px 16px; }
          .vh-left { flex-direction: column; align-items: flex-start; gap: 12px; }
          .vh-right { display: none; }
          .viewport-list li { flex-direction: column; gap: 8px; font-size: 13px; padding: 12px 16px; }
          .scroll-indicator { margin-top: 32px; font-size: 9px; letter-spacing: 2px; }
        }
        @media (max-width: 480px) {
          .hub-title { font-size: 28px; letter-spacing: 3px; }
          .hub-desc { font-size: 13px; line-height: 1.6; }
          .hub-badge { font-size: 9px; letter-spacing: 2px; padding: 5px 12px; }
          .hud-footer { font-size: 8px; letter-spacing: 1px; margin: 0 8px 8px; padding: 10px 12px; border-radius: 8px; }
          .scroll-indicator { margin-top: 20px; }
          .dossier-section { padding: 40px 12px; }
          .spatial-hub { padding: 16px 8px; }
        }
      `}</style>
    </main>
  );
}
