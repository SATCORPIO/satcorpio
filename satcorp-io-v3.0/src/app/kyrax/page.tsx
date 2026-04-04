"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Brain, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { DossierSection } from "@/components/DossierSection";
import { MatrixFallingCode } from "@/components/shared/MatrixFallingCode";
import { DiscordButton } from "@/components/shared/DiscordButton";

export default function KyraxPage() {
  const scrollToDossier = () => {
    document.getElementById('kyrax-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="kyrax">
      {/* ─── Neural Core Background ─── */}
      <div className="bg-neural">
        <Image src="/kyrax_ultrarealistic_1775186474360.png" alt="Kyrax Neural Core" fill priority style={{ objectFit: 'cover' }} />
        <div className="bg-dimmer" />
        <MatrixFallingCode color="#A855F7" alpha={0.03} />
      </div>

      {/* Local nav removed in favor of global header */}

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hero-header"
          >
            <div className="badge spatial-panel chromatic-text">
              <Brain size={12} className="brain-pulse" /> NEURAL ARCHITECTURE
            </div>
            <h1 className="title">KYRAX</h1>
            <p className="subtitle">ARTIFICIAL INTELLIGENCE ORCHESTRATION</p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="desc"
          >
            Deploying multi-agent networks and autonomous operational intelligence 
            to accelerate workflow efficiency across the SATCORP ecosystem.
          </motion.p>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <ChevronDown size={18} className="bounce-arrow" />
          </motion.div>

          {/* ─── DISCORD MOVED TO MENU ─── */}
        </div>
      </section>

      <div id="kyrax-dossier">
        <DossierSection
          division="kyrax"
          classification="RECONSTRUCTION // v3.5"
          title="AUTONOMOUS SYSTEMS"
          accentColor="#A855F7"
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

      <footer className="kyrax-footer spatial-panel">
        <span>KYRAX © {new Date().getFullYear()}</span>
        <span className="network-status">
          <span className="pulse-dot" /> NEURAL NETWORK: STABLE
        </span>
      </footer>

      <style jsx>{`
        .kyrax {
          background: #040108;
          font-family: var(--font-body);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .bg-neural {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .bg-dimmer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(4,1,8,0.9) 70%, #040108 100%);
          z-index: 1;
        }

        .kyrax-nav {
          position: relative;
          z-index: 100;
          padding: 24px 32px;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(168, 85, 247, 0.7); text-decoration: none;
          padding: 10px 16px; border-radius: 6px;
          transition: all 300ms;
          border-color: rgba(168, 85, 247, 0.15);
        }
        .back-link:hover { color: #A855F7; box-shadow: 0 0 16px rgba(168, 85, 247, 0.3); }

        .hero {
          min-height: 90vh;
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
          max-width: 960px;
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

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: #E879F9; border-color: rgba(168, 85, 247, 0.3);
          padding: 8px 16px; border-radius: 4px;
          background: rgba(168, 85, 247, 0.05);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }
        
        .brain-pulse {
          animation: pulse-glow 2s infinite;
        }

        .title {
          font-family: var(--font-tactical);
          font-size: clamp(60px, 10vw, 120px);
          font-weight: 900; letter-spacing: 16px;
          background: linear-gradient(180deg, #FFFFFF 0%, #A855F7 60%, #E879F9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-shadow: 0 0 60px rgba(168, 85, 247, 0.4);
          line-height: 1;
        }

        .subtitle {
          font-family: var(--font-share-tech-mono), monospace; font-size: 12px; letter-spacing: 6px;
          color: rgba(168, 85, 247, 0.6);
          margin-top: 8px;
        }

        .desc {
          max-width: 640px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 40px;
        }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(168, 85, 247, 0.5); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #E879F9; }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        .discord-link-absolute {
          margin-top: 40px;
        }

        .kyrax-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-share-tech-mono), monospace; font-size: 9px; letter-spacing: 2px;
          color: rgba(168, 85, 247, 0.4); border-color: rgba(168, 85, 247, 0.15);
          background: rgba(4, 1, 8, 0.6); position: relative; z-index: 100;
          backdrop-filter: blur(10px);
        }
        .network-status { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.4); }
        .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #A855F7; box-shadow: 0 0 8px #A855F7; animation: pulse-glow 1.5s infinite; }

        @media (max-width: 768px) {
          .title { font-size: 48px; letter-spacing: 8px; }
          .subtitle { font-size: 10px; letter-spacing: 4px; }
          .kyrax-footer { flex-direction: column; gap: 10px; text-align: center; margin: 16px; }
          .hero { min-height: auto; padding: 60px 16px 40px; }
          .kyrax-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
          .scroll-indicator { margin-top: 40px; }
        }
      `}</style>
    </main>
  );
}
