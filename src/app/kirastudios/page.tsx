"use client";

import Link from "next/link";
import { ChevronLeft, Anchor, Snowflake, Sun, Palette, Boxes, Fingerprint, Layers, Cpu, ChevronDown, Gamepad2, FileText, Database, Headset, Music, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { DossierManual } from "@/components/shared/DossierManual";

const realms = [
  {
    title: "NAMTAR",
    desc: "Deep-ocean tactical interface and abyssal node monitoring systems.",
    icon: Anchor,
    href: "/kirastudios/namtar"
  },
  {
    title: "FROSTHEIM",
    desc: "Arctic data preservation and sub-zero core infrastructure protocols.",
    icon: Snowflake,
    href: "/kirastudios/frostheim"
  },
  {
    title: "DYSUN's REALM",
    desc: "Solar-thermal energy management and orbital relay synchronization.",
    icon: Sun,
    href: "/kirastudios/dysunsrealm"
  }
];

/* ═══ Ki-Ra Dossier Data ═══ */
const dossierData = [
  {
    id: "gamedev",
    title: "GAME DEVELOPMENT",
    subtitle: "World-Building Design",
    icon: Gamepad2,
    colSpan: 2, 
    items: [
      "Real-time engine workflows (Unity / Unreal Engine 5)",
      "Gameplay programming, QOL MODs, and asset optimization",
      "Environment prototyping, blockouts, and vertical slice builds",
      "UI/HUD systems and cross-platform (PC/Mobile/WebGL) development",
      "Tools: Blender, Unity, Unreal Engine, Substance Painter"
    ],
    color: "#FFFFFF"
  },
  {
    id: "narrative",
    title: "NARRATIVE DESIGN",
    subtitle: "Interactive Storytelling Systems",
    icon: FileText,
    colSpan: 1,
    items: [
      "Branching dialogue trees",
      "Lore bibles & faction backstories",
      "Quest system design",
      "Tools: Twine, Yarn Spinner, World Anvil"
    ],
    color: "#D1D5DB"
  },
  {
    id: "procedural",
    title: "PROCEDURAL WORLD GEN",
    subtitle: "Dynamic Pipelines",
    icon: Database,
    colSpan: 1,
    items: [
      "Terrain & ecosystem generation",
      "Dynamic NPC behaviors & events",
      "Runtime optimization & seeds",
      "Tools: Houdini, PCG, Geo Nodes"
    ],
    color: "#9CA3AF"
  },
  {
    id: "xr",
    title: "XR PROTOTYPING",
    subtitle: "VR/AR/XR Experiences",
    icon: Headset,
    colSpan: 1,
    items: [
      "Full XR scene builds & spatial UI",
      "Hand tracking & locomotion logic",
      "Cross-device deployment (Quest)",
      "Tools: XR Interaction Toolkit, OpenXR"
    ],
    color: "#E5E7EB"
  },
  {
    id: "audio",
    title: "AUDIO ARCHITECTURE",
    subtitle: "Immersive Sound Systems",
    icon: Music,
    colSpan: 2,
    items: [
      "Adaptive music & dynamic audio engines",
      "Foley, voice direction, soundscape design",
      "Spatial audio (3D/ambisonics)",
      "Tools: FMOD, Wwise, Reaper, ElevenLabs",
      "Complete audio banks + implementation guides"
    ],
    color: "#F3F4F6"
  },
  {
    id: "economy",
    title: "LIVE-SERVICE OPS",
    subtitle: "Game Economy & Balancing",
    icon: Coins,
    colSpan: 1,
    items: [
      "Economy design (currencies, sinks)",
      "Meta systems with data-driven tuning",
      "Live-ops event frameworks",
      "Player retention & churn analysis"
    ],
    color: "#6B7280"
  }
];

export default function KiraPage() {
  const scrollToDossier = () => {
    document.getElementById('kira-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="kira film-grain">
      {/* ─── Parallax Background ─── */}
      <div className="bg-kira">
        <div className="bg-gradient" />
        <div className="glass-spheres" />
      </div>

      <nav className="kira-nav">
        <Link href="/" className="back-link spatial-panel">
          <ChevronLeft size={16} /> <span className="bl-text">RETURN TO HUB</span>
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-header"
          >
            <div className="badge spatial-panel">
              <span className="dot" /> CREATIVE DIRECTION
            </div>
            <h1 className="title">KI-RA STUDIOS</h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="desc"
          >
            Where logic meets aesthetics. Designing the visual language of the future. 
            We build digital environments that feel physical, reactive, and premium.
          </motion.p>

          <div className="capabilities-grid">
            {realms.map((realm, i) => {
              const Icon = realm.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(255, 255, 255, 0.4)' }}
                >
                  <Link href={realm.href} className="cap-card spatial-panel" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div className="cap-header">
                      <div className="cap-icon-box">
                        <Icon size={20} className="cap-icon" strokeWidth={1.5} />
                      </div>
                      <span className="cap-title">{realm.title}</span>
                    </div>
                    <p className="cap-desc">{realm.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <span>TASK FORCE DOSSIER</span>
            <ChevronDown size={14} className="bounce-arrow" />
          </motion.div>
        </div>
      </section>

      <DossierManual 
        items={dossierData}
        sectionTitle="TASK FORCE BRANCH"
        sectionSubtitle="WORLD-BUILDING & EXPERIENTIAL SYSTEMS DOSSIER"
        terminalPrefix="KIRA"
        anchorId="kira-dossier"
      />

      <footer className="kira-footer spatial-panel">
        <span>KI-RA © {new Date().getFullYear()} — SATCORP CREATIVE</span>
        <span className="clearance-level">
          <Cpu size={12} style={{ display: 'inline', marginRight: '6px' }} /> RENDERING OK
        </span>
      </footer>

      <style jsx>{`
        .kira {
          background: #000;
          font-family: var(--font-body);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .bg-kira {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, #1A1A1E 0%, #000000 70%);
        }
        .glass-spheres {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(255,255,255,0.03) 0%, transparent 20%),
            radial-gradient(circle at 85% 30%, rgba(255,255,255,0.04) 0%, transparent 25%);
          filter: blur(40px);
        }

        .kira-nav {
          position: relative;
          z-index: 100;
          padding: 24px 32px;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.7); text-decoration: none;
          padding: 10px 16px; border-radius: 6px;
          transition: all 300ms;
          border-color: rgba(255, 255, 255, 0.15);
        }
        .back-link:hover { color: #FFF; background: rgba(255, 255, 255, 0.05); }

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
          gap: 12px;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: #FFF; border-color: rgba(255, 255, 255, 0.2);
          padding: 8px 16px; border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
        }
        .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #FFF; box-shadow: 0 0 8px #FFF;
        }

        .title {
          font-family: var(--font-tactical);
          font-size: clamp(50px, 8vw, 110px);
          font-weight: 800; letter-spacing: 12px;
          background: linear-gradient(180deg, #FFFFFF 0%, #888888 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-shadow: 0 10px 40px rgba(255, 255, 255, 0.1);
          line-height: 1;
        }

        .subtitle {
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 6px;
          color: rgba(255, 255, 255, 0.5);
        }

        .desc {
          max-width: 680px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 40px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .capabilities-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; width: 100%; text-align: left;
        }

        .cap-card {
          padding: 32px; border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.1);
          cursor: crosshair;
          backdrop-filter: blur(20px);
        }

        .cap-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
        }
        .cap-icon-box {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          padding: 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .cap-icon { color: #FFF; filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4)); }

        .cap-title {
          font-family: var(--font-tactical); font-size: 15px; font-weight: 700;
          letter-spacing: 3px; color: #FFF;
        }
        .cap-desc {
          font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.5);
        }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.4); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #FFF; }
        .bounce-arrow { animation: bounce-y 2s infinite; }

        @keyframes bounce-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        /* ── Dossier Section ── */
        .dossier-section {
          position: relative; z-index: 10;
          padding: 100px 40px;
          background: linear-gradient(180deg, transparent, rgba(5,5,6,0.95) 200px);
        }


        .kira-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.4); border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03); position: relative; z-index: 100;
        }
        .clearance-level { color: rgba(255, 255, 255, 0.3); }

        @media (max-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-card { grid-column: span 1 !important; }
          .capabilities-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .capabilities-grid { grid-template-columns: 1fr; gap: 16px; }
          .bento-grid { grid-template-columns: 1fr; }
          .title { letter-spacing: 6px; }
          .kira-footer { flex-direction: column; gap: 10px; text-align: center; margin: 16px; }
          .hero { min-height: auto; padding: 60px 16px 40px; }
          .kira-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
          .cap-card { padding: 24px; }
          .scroll-indicator { margin-top: 40px; }
        }
        @media (max-width: 480px) {
          .title { font-size: 32px; letter-spacing: 4px; }
          .badge { font-size: 9px; letter-spacing: 2px; padding: 6px 12px; }
          .desc { font-size: 13px; line-height: 1.7; }
          .hero { padding: 40px 12px 32px; }
          .kira-nav { padding: 12px; }
          .back-link { font-size: 9px; padding: 8px 12px; }
          .cap-card { padding: 20px; }
          .cap-header { gap: 12px; margin-bottom: 12px; }
          .cap-title { font-size: 13px; letter-spacing: 2px; }
          .cap-desc { font-size: 12px; }
          .cap-icon-box { padding: 10px; }
          .kira-footer { margin: 12px 10px; padding: 12px 16px; font-size: 8px; }
          .scroll-indicator { margin-top: 24px; font-size: 9px; letter-spacing: 2px; }
        }
      `}</style>
    </main>
  );
}
