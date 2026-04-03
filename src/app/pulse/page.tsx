"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronDown, Video, Scissors, TrendingUp, Share2, RadioReceiver, ShoppingBag, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { DossierManual } from "@/components/shared/DossierManual";
import { DiscordButton } from "@/components/shared/DiscordButton";
import { dossierData as masterDossier } from "@/data/dossier";

/* ═══ Pulse Dossier Data ═══ */
const pulseDossier = [
  {
    id: "broadcast",
    title: "STREAMING & OVERLAYS",
    subtitle: "Broadcast Design",
    icon: Video,
    colSpan: 2, 
    items: [
      "OBS scene architecture & overlay design",
      "Alert & HUD style UI design",
      "TikTok & live-broadcast visual kits",
      "Animated overlays & scene layouts",
      "Creator-focused visual systems"
    ],
    color: "#22D3EE" // Cyan
  },
  {
    id: "postprod",
    title: "POST-PRODUCTION",
    subtitle: "Full Video Editing",
    icon: Scissors,
    colSpan: 1,
    items: [
      "Long-form & cinematic editing",
      "Color grading, VFX, motion graphics",
      "AI-assisted cutting & upscaling",
      "Tools: DaVinci, Premiere, Runway Gen-3"
    ],
    color: "#818CF8" // Indigo
  },
  {
    id: "shortform",
    title: "SHORT-FORM CONTENT",
    subtitle: "Strategy & Optimization",
    icon: TrendingUp,
    colSpan: 1,
    items: [
      "Viral hook frameworks (15–60s)",
      "Algorithm targeting & optimization",
      "Thumbnail & caption testing loops",
      "Trend-jacking & seasonal calendars"
    ],
    color: "#F472B6" // Pink
  },
  {
    id: "automation",
    title: "SYNDICATION HUBS",
    subtitle: "Multi-Platform Automation",
    icon: Share2,
    colSpan: 1,
    items: [
      "One-to-many publishing pipelines",
      "Auto-clipping & cross-posting",
      "Community management automation",
      "Tools: Make.com, Zapier, Opus Clip"
    ],
    color: "#34D399" // Emerald
  },
  {
    id: "live",
    title: "Command Systems",
    subtitle: "Virtual Event Production",
    icon: RadioReceiver,
    colSpan: 2,
    items: [
      "End-to-end virtual summit & concert production",
      "Multi-stream routing & guest management",
      "Interactive elements (polls, shops, chats)",
      "Tools: StreamYard, Restream, vMix, Hopin"
    ],
    color: "#FBBF24" // Amber
  },
  {
    id: "merch",
    title: "HYBRID PRODUCT VISUALS",
    subtitle: "Creator Merch",
    icon: ShoppingBag,
    colSpan: 1,
    items: [
      "Print-on-demand mockup pipelines",
      "Merch branding & collection design",
      "3D product visualization",
      "Limited-drop campaign visuals"
    ],
    color: "#A78BFA" // Violet
  }
];

export default function PulsePage() {
  const scrollToDossier = () => {
    document.getElementById('pulse-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="pulse film-grain">
      {/* ─── Cybernetic Background ─── */}
      <div className="bg-pulse">
        <Image src="/pulse_radio.png" alt="Pulse Radio Hub" fill priority style={{ objectFit: 'cover' }} />
        <div className="bg-scanline" />
        <div className="bg-vignette" />
      </div>

      <nav className="pulse-nav">
        <Link href="/" className="back-link spatial-panel">
          <ChevronLeft size={16} className="text-cyan-400" /> <span className="bl-text">RETURN TO HUB</span>
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            initial={{ opacity: 0, y: -40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="hero-header"
            style={{ perspective: 1000 }}
          >
            <div className="badge spatial-panel cyber-border">
              <span className="cyan-blink" /> BROADCAST PROTOCOLS
            </div>
            <Image
              src="/file_000000006e7061faa7eeea560cc41296.png"
              alt="PULSE"
              width={400}
              height={120}
              style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.4))' }}
            />
            <p className="subtitle">ELITE BROADCAST ARCHITECTURE & LIVE OPERATIONS</p>
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
          


          <DiscordButton 
            href="https://discord.gg/RmpHjJsSBC"
            variant="cyan"
            label="PULSE DISCORD"
          />

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <ChevronDown size={18} className="bounce-arrow" />
          </motion.div>

        </div>
      </section>

      <DossierManual 
        items={[...pulseDossier, ...masterDossier]}
        sectionTitle="TASK FORCE BRANCH"
        sectionSubtitle="BROADCAST & CREATOR HUB ARCHITECTURE"
        terminalPrefix="PULSE"
        anchorId="pulse-dossier"
      />

      <footer className="pulse-footer spatial-panel">
        <span>PULSE © {new Date().getFullYear()} — SATCORP ENGINEERING</span>
        <span className="system-perf">
          FPS: 144 <span className="separator">|</span> LATENCY: ~12ms
        </span>
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
        }
        .bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(2,6,10,0.3) 0%, #02060A 90%);
        }

        .pulse-nav {
          position: relative;
          z-index: 100;
          padding: 24px 32px;
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

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: #22D3EE; 
          padding: 8px 16px; border-radius: 2px;
          background: rgba(34, 211, 238, 0.05);
          border: 1px solid rgba(34, 211, 238, 0.3);
          box-shadow: inset 0 0 10px rgba(34, 211, 238, 0.1);
          position: relative;
        }
        .cyan-blink {
          width: 8px; height: 8px; border-radius: 1px;
          background: #22D3EE; box-shadow: 0 0 8px #22D3EE;
          animation: blink 2s steps(2) infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .title {
          font-family: var(--font-tactical);
          font-size: clamp(60px, 10vw, 130px);
          font-weight: 900; letter-spacing: 14px;
          color: #F8FAFC;
          text-shadow: 0 10px 40px rgba(34, 211, 238, 0.3), -2px -2px 0 rgba(34, 211, 238, 0.5);
          line-height: 1;
          margin-bottom: -8px;
        }

        .subtitle {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 8px;
          color: rgba(34, 211, 238, 0.7);
        }

        .desc {
          max-width: 680px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 40px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; width: 100%; text-align: left;
        }

        .svc-card {
          position: relative;
          padding: 32px 24px; border-radius: 4px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(2, 6, 10, 0.95));
          border: 1px solid rgba(34, 211, 238, 0.15);
          cursor: crosshair;
        }

        .svc-header {
          display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px;
        }
        .svc-icon-box {
          width: fit-content;
          color: #22D3EE; background: rgba(34, 211, 238, 0.05);
          padding: 12px; border-radius: 4px; 
          border: 1px solid rgba(34, 211, 238, 0.2);
          box-shadow: inset 0 0 16px rgba(34, 211, 238, 0.1);
        }

        .svc-title {
          font-family: var(--font-tactical); font-size: 14px; font-weight: 700;
          letter-spacing: 2px; color: #F8FAFC;
        }
        .svc-desc {
          font-size: 13px; line-height: 1.7; color: rgba(255, 255, 255, 0.5);
        }

        .cyber-corner {
          position: absolute; width: 16px; height: 16px;
          border-right: 2px solid rgba(34, 211, 238, 0.4);
          border-bottom: 2px solid rgba(34, 211, 238, 0.4);
        }
        .bottom-right { bottom: -1px; right: -1px; }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(34, 211, 238, 0.5); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #22D3EE; }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ── Discord Button Component Handles Styling ── */

        /* ── Dossier Section ── */
        .dossier-section {
          position: relative; z-index: 10;
          padding: 100px 40px;
          background: linear-gradient(180deg, transparent, rgba(2,6,10,0.95) 200px);
        }


        .pulse-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px;
          color: rgba(34, 211, 238, 0.5); border-color: rgba(34, 211, 238, 0.2);
          background: linear-gradient(135deg, rgba(2, 6, 10, 0.9), rgba(2, 6, 10, 0.95)), 
                      url('/file_000000007e78622fb81e236a8644294d.png');
          background-size: cover;
          background-position: center;
          border-radius: 2px; position: relative; z-index: 100;
        }
        .system-perf { display: flex; align-items: center; gap: 8px; color: rgba(255, 255, 255, 0.4); }
        .separator { color: rgba(34, 211, 238, 0.3); }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-card { grid-column: span 1 !important; }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; gap: 16px; }
          .bento-grid { grid-template-columns: 1fr; }
          .title { font-size: 52px; letter-spacing: 8px; }
          .subtitle { font-size: 9px; letter-spacing: 5px; }
          .pulse-footer { flex-direction: column; gap: 10px; text-align: center; margin: 16px; }
          .hero { padding: 60px 16px 40px; }
          .pulse-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
          .svc-card { padding: 24px 20px; }
          .scroll-indicator { margin-top: 40px; }
        }
        @media (max-width: 480px) {
          .title { font-size: 40px; letter-spacing: 6px; }
          .subtitle { font-size: 8px; letter-spacing: 3px; }
          .badge { font-size: 9px; letter-spacing: 2px; padding: 6px 12px; }
          .desc { font-size: 13px; line-height: 1.7; }
          .hero { padding: 40px 12px 32px; }
          .pulse-nav { padding: 12px; }
          .back-link { font-size: 9px; padding: 8px 12px; }
          .svc-card { padding: 20px 16px; }
          .svc-header { gap: 12px; margin-bottom: 12px; }
          .svc-title { font-size: 12px; letter-spacing: 1.5px; }
          .svc-desc { font-size: 12px; }
          .svc-icon-box { padding: 10px; }
          .pulse-footer { margin: 12px 10px; padding: 12px 16px; font-size: 8px; }
          .scroll-indicator { margin-top: 24px; font-size: 9px; letter-spacing: 2px; }
        }
      `}</style>
    </main>
  );
}
