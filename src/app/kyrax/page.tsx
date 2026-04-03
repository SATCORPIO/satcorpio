"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Brain, Cpu, Network, Zap, Boxes, ChevronDown, BrainCircuit, Users, Clapperboard, Radar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { DossierManual } from "@/components/shared/DossierManual";


/* ═══ Kyrax Dossier Data ═══ */
const dossierData = [
  {
    id: "workflows",
    title: "CREATIVE WORKFLOWS",
    subtitle: "AI-Enhanced Systems",
    icon: BrainCircuit,
    colSpan: 1, 
    items: [
      "Prompt engineering & reusable frameworks",
      "Brand-consistent AI visuals & static pipelines",
      "Task automation & custom AI personas",
      "AI acceleration inside defined systems"
    ],
    color: "#E879F9" // Magenta / Pink
  },
  {
    id: "orchestration",
    title: "MULTI-AGENT NETWORKS",
    subtitle: "AI Swarm Orchestration",
    icon: Users,
    colSpan: 1,
    items: [
      "Crew-based AI teams (Research/Design/Edit)",
      "Autonomous task delegation & handoff",
      "Memory & context persistence across agents",
      "Frameworks: CrewAI, AutoGen, LangGraph"
    ],
    color: "#C084FC" // Violet
  },
  {
    id: "generative",
    title: "GENERATIVE PIPELINES",
    subtitle: "Video, Voice & Motion",
    icon: Clapperboard,
    colSpan: 1,
    items: [
      "Text-to-video, image-to-video & lip-sync",
      "Brand-consistent character generation",
      "Voice cloning & emotional delivery vectors",
      "Tools: Runway Gen-3, Kling, ElevenLabs"
    ],
    color: "#A855F7" // Purple
  },
  {
    id: "research",
    title: "PREDICTIVE UNITS",
    subtitle: "Autonomous Intelligence",
    icon: Radar,
    colSpan: 1,
    items: [
      "Deep-dive market & competitor agents",
      "Trend prediction & opportunity mapping",
      "Real-time news & sentiment analysis",
      "Tools: Perplexity, Custom GPT logic loops"
    ],
    color: "#D8B4FE" // Light Violet
  }
];

export default function KyraxPage() {
  const scrollToDossier = () => {
    document.getElementById('kyrax-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="kyrax film-grain">
      {/* ─── Neural Core Background ─── */}
      <div className="bg-neural">
        <Image src="/kyrax_neural.png" alt="Kyrax Neural Core" fill priority style={{ objectFit: 'cover' }} />
        <div className="bg-dimmer" />
      </div>

      <nav className="kyrax-nav">
        <Link href="/" className="back-link spatial-panel">
          <ChevronLeft size={16} /> <span className="bl-text">DISCONNECT</span>
        </Link>
      </nav>

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            style={{ width: '100%', maxWidth: '800px', display: 'flex', gap: '16px', justifyContent: 'center' }}
          >
            <div style={{ flex: 1, position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(168,85,247,0.2)', aspectRatio: '16/9' }}>
               <Image src="/kyrax_ultrarealistic_1775186474360.png" alt="Kyrax Operator" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ width: '180px', flexShrink: 0, position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(168,85,247,0.2)', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Image src="/KYRAX_67646758LOGO.png" alt="Kyrax Emblem" width={120} height={120} style={{ objectFit: 'contain' }} />
            </div>
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <ChevronDown size={18} className="bounce-arrow" />
          </motion.div>

          <motion.a 
            href="https://discord.gg/KqphHMq6vS" 
            target="_blank" 
            rel="noopener noreferrer"
            className="discord-link-premium spatial-panel"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0 }}
          >
            <div className="dl-glow" />
            <MessageSquare size={18} className="discord-icon" />
            <div className="dl-content">
              <span className="dl-main">CONNECT NEURAL INTERFACE</span>
              <span className="dl-sub">KYRAX // NEURAL NETWORK</span>
            </div>
          </motion.a>

        </div>
      </section>

      <DossierManual 
        items={dossierData}
        sectionTitle="NEURAL BRANCH"
        sectionSubtitle="AUTONOMOUS ORCHESTRATION DOSSIER"
        terminalPrefix="KYRAX"
        anchorId="kyrax-dossier"
      />

      <footer className="kyrax-footer spatial-panel">
        <span>KYRAX © {new Date().getFullYear()} — SATCORP INTELLIGENCE</span>
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
          inset: -2%;
          z-index: 0;
          animation: float-slow 20s ease-in-out infinite alternate;
        }
        @keyframes float-slow {
          0% { transform: scale(1) translateY(0); filter: brightness(0.6) saturate(1.2); }
          100% { transform: scale(1.05) translateY(-2%); filter: brightness(0.8) saturate(1.5); }
        }
        .bg-dimmer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(4,1,8,0.9) 70%, #040108 100%);
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
          margin-left: 16px; /* offset for letter-spacing to visually center */
        }

        .subtitle {
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 6px;
          color: rgba(168, 85, 247, 0.6);
        }

        .desc {
          max-width: 640px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 40px;
        }

        .systems-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 24px; width: 100%; text-align: left;
        }

        .sys-card {
          position: relative; overflow: hidden;
          padding: 32px; border-radius: 8px;
          background: rgba(4, 1, 8, 0.7);
          border-color: rgba(168, 85, 247, 0.15);
        }

        .sys-hacker-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #E879F9, transparent);
          transform: translateX(-100%); transition: transform 800ms ease;
        }
        .sys-card:hover .sys-hacker-line { transform: translateX(100%); }
        .bento-card:hover .sys-hacker-line { transform: translateX(100%); }

        .sys-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
        }
        .sys-icon-wrap {
          color: #E879F9; background: rgba(168, 85, 247, 0.1);
          padding: 12px; border-radius: 6px; border: 1px solid rgba(168, 85, 247, 0.2);
          box-shadow: inset 0 0 10px rgba(168, 85, 247, 0.2);
        }

        .sys-title {
          font-family: var(--font-tactical); font-size: 15px; font-weight: 700;
          letter-spacing: 3px; color: #FFFFFF;
        }
        .sys-desc {
          font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.5);
        }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(168, 85, 247, 0.5); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #E879F9; }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ── Discord Button ── */
        .discord-link-premium {
          position: absolute;
          bottom: 12%;
          left: 5%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 28px;
          border-radius: 6px;
          text-decoration: none;
          color: #E879F9;
          background: rgba(168, 85, 247, 0.03);
          border: 1px solid rgba(168, 85, 247, 0.2);
          backdrop-filter: blur(10px);
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          overflow: hidden;
        }
        .discord-link-premium:hover {
          background: rgba(168, 85, 247, 0.1);
          border-color: #A855F7;
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.2);
          transform: translateY(-2px);
        }
        .dl-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 400ms;
        }
        .discord-link-premium:hover .dl-glow { opacity: 1; }
        
        .dl-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .dl-main {
          font-family: var(--font-tactical);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          line-height: 1;
        }
        .dl-sub {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 1px;
          color: rgba(168, 85, 247, 0.5);
        }
        .discord-icon {
          filter: drop-shadow(0 0 8px #E879F9);
          color: #E879F9;
        }

        /* ── Dossier Section ── */
        .dossier-section {
          position: relative; z-index: 10;
          padding: 100px 40px;
          background: linear-gradient(180deg, transparent, rgba(2,1,4,0.98) 200px);
        }


        .kyrax-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px;
          color: rgba(168, 85, 247, 0.4); border-color: rgba(168, 85, 247, 0.15);
          background: rgba(4, 1, 8, 0.6); position: relative; z-index: 100;
        }
        .network-status { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.4); }
        .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #A855F7; box-shadow: 0 0 8px #A855F7; animation: pulse-glow 1.5s infinite; }

        @media (max-width: 768px) {
          .systems-grid { grid-template-columns: 1fr; gap: 16px; }
          .bento-grid { grid-template-columns: 1fr; }
          .title { font-size: 48px; letter-spacing: 8px; margin-left: 8px; }
          .subtitle { font-size: 10px; letter-spacing: 4px; }
          .kyrax-footer { flex-direction: column; gap: 10px; text-align: center; margin: 16px; }
          .hero { min-height: auto; padding: 60px 16px 40px; }
          .kyrax-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
          .sys-card { padding: 24px; }
          .scroll-indicator { margin-top: 40px; }
        }
        @media (max-width: 480px) {
          .title { font-size: 36px; letter-spacing: 6px; margin-left: 6px; }
          .subtitle { font-size: 9px; letter-spacing: 3px; }
          .badge { font-size: 9px; letter-spacing: 2px; padding: 6px 12px; }
          .desc { font-size: 13px; line-height: 1.7; }
          .hero { padding: 40px 12px 32px; }
          .kyrax-nav { padding: 12px; }
          .back-link { font-size: 9px; padding: 8px 12px; }
          .sys-card { padding: 20px; }
          .sys-header { gap: 12px; margin-bottom: 12px; }
          .sys-title { font-size: 13px; letter-spacing: 2px; }
          .sys-desc { font-size: 12px; }
          .sys-icon-wrap { padding: 10px; }
          .kyrax-footer { margin: 12px 10px; padding: 12px 16px; font-size: 8px; }
          .scroll-indicator { margin-top: 24px; font-size: 9px; letter-spacing: 2px; }
        }
      `}</style>
    </main>
  );
}
