"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, Server, Activity, Users, Shield, Cpu, Database, 
  AlertCircle, ChevronRight, MessageSquare, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { DiscordButton } from "@/components/shared/DiscordButton";

export default function NamtarArkPage() {
  const [pop, setPop] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPop(p => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = p + delta;
        return next < 0 ? 0 : next > 100 ? 100 : next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="namtar-ark-hub film-grain">
      {/* Immersive Background */}
      <div className="telemetry-bg">
        <Image 
          src="/namtar_trex_survival.png" 
          alt="Namtar Ark Telemetry" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover", filter: "brightness(0.4) contrast(1.2)" }}
        />
        <div className="radial-glow" />
        <div className="noise-overlay" />
        <div className="scanline-overlay" />
      </div>

      <nav className="tactical-nav">
        <Link href="/kirastudios/namtar" className="nav-btn spatial-panel">
          <ChevronLeft size={14} /> <span className="btn-text">NAMTAR COMMAND HUB</span>
        </Link>
      </nav>

      <div className="hub-container">
        <header className="hub-header spatial-panel">
          <div className="badge-neural">
            <Zap size={10} className="pulse-icon f-amber" /> 
            <span className="badge-text">SURVIVAL INFRASTRUCTURE // NAMTAR_ASA_BETA</span>
          </div>
          
          <div className="header-titles">
            <div className="status-badge">DEPLOYMENT_STATUS: CALIBRATING</div>
            <h1 className="title">NAMTAR SECTOR</h1>
            <p className="subtitle">ARK: SURVIVAL ASCENDED // TACTICAL NODE</p>
          </div>

          <div className="status-indicator">
            <Shield size={16} className="active-icon" />
            <div className="status-text">
              <span className="st-main">NEURAL LINK 100%</span>
              <span className="st-sub">Atmospheric scanning active</span>
            </div>
          </div>
          
          <DiscordButton 
            href="https://discord.gg/mypZpPsPeb"
            variant="amber"
            label="NAMTAR DISCORD"
          />
        </header>

        <div className="dashboard-grid">
           {/* SURVEY PROMO PANEL */}
          <div className="promo-box spatial-panel">
            <div className="promo-content">
              <div className="promo-header">
                <AlertCircle size={14} className="f-amber" />
                <span className="promo-tag">SURVIVOR ACTION REQUIRED</span>
              </div>
              <h2 className="promo-title">SHAPE THE NAMTAR EXPERIENCE</h2>
              <p className="promo-desc">
                We are currently calibrating the NAMTAR server parameters. Your input 
                on rates, mods, and rules is critical to our survival protocol.
              </p>
              <div className="promo-cta">
                <Link href="/namtarsurvey" className="btn-tactical amber-btn">
                  START CALIBRATION SURVEY <ChevronRight size={14} />
                </Link>
                <div className="eta">EST. DEPLOYMENT: Q4 2026</div>
              </div>
            </div>
             <div className="promo-visual">
                <div className="thermal-pips">
                   <div className="pip" />
                   <div className="pip" />
                   <div className="pip" />
                </div>
                <div className="visual-scan">SURVEY_ACTIVE</div>
             </div>
          </div>

           {/* Metrics Grid */}
          <div className="metrics-panel spatial-panel">
            <h3 className="panel-title"><Cpu size={14} /> SERVER_HARDWARE</h3>
            <div className="m-list">
              <div className="m-item">
                <span className="m-lbl">CPU_FREQ</span>
                <span className="m-val">5.2 GHZ / DEDICATED</span>
              </div>
              <div className="m-item">
                <span className="m-lbl">MEMORY</span>
                <span className="m-val">128GB DDR5</span>
              </div>
              <div className="m-item">
                <span className="m-lbl">UPLINK</span>
                <span className="m-val">10 GBPS</span>
              </div>
            </div>
          </div>

          <div className="metrics-panel spatial-panel">
             <h3 className="panel-title"><Activity size={14} /> POPULATION_SIM</h3>
             <div className="sim-box">
                <div className="sim-val">{pop}</div>
                <div className="sim-lbl">SIMULATED_SURVIVORS</div>
                <div className="sim-bar">
                   <div className="sim-fill" style={{ width: `${pop}%` }} />
                </div>
             </div>
          </div>

          <div className="security-panel spatial-panel">
            <h3 className="panel-title"><Shield size={14} /> SYSTEM_SECURITY</h3>
            <div className="sec-list">
              <div className="sec-item">
                <div className="dot active" />
                <span className="s-lbl">ARK_SECURE_BOOT</span>
              </div>
              <div className="sec-item">
                <div className="dot active" />
                <span className="s-lbl">D-DOS_MITIGATION</span>
              </div>
            </div>
          </div>

          <div className="server-terminal spatial-panel">
            <h3 className="panel-title"><Database size={14} /> SECTOR_TERMINAL</h3>
            <div className="term-content">
              <div className="term-line">{">"} INITIALIZING NAMTAR_PROTOCOL...</div>
              <div className="term-line">{">"} SCANNING WASTELAND NODES...</div>
              <div className="term-line f-amber">{">"} WAITING FOR SURVIVOR DATA...</div>
            </div>
          </div>

        </div>
      </div>

      <footer className="namtar-footer spatial-panel">
        <div className="f-inner">
           <span>NAMTAR SECTOR © {new Date().getFullYear()} — SURVIVAL COMMAND</span>
           <span className="separator">//</span>
           <span className="f-amber">ATMOSPHERIC LEVELS STABLE</span>
        </div>
      </footer>

      <style jsx>{`
        .namtar-ark-hub {
          --c2-amber: #FFB830;
          --c2-green: #39FF14;
          --c2-red: #FF3A3A;
          --c2-cyan: #00D4C8;
          --bg-dark: #050A0F;
          --surface-neural: #081018;
          --glass-border: rgba(255, 184, 48, 0.15);

          background: var(--bg-dark);
          font-family: var(--font-body);
          color: #E2E8F0;
          min-height: 100vh;
          position: relative;
          padding-bottom: 60px;
          overflow-x: hidden;
        }

        .telemetry-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .radial-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% -20%, rgba(255, 184, 48, 0.1), transparent 70%);
        }
        .noise-overlay {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
        }
        .scanline-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255, 184, 48, 0.02) 50.1%);
          background-size: 100% 4px;
        }

        .tactical-nav { position: absolute; top: 24px; left: 32px; z-index: 200; }
        .nav-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 20px; text-decoration: none;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.6); transition: all 300ms;
        }
        .nav-btn:hover { color: var(--c2-amber); border-color: var(--c2-amber); }

        .spatial-panel {
          background: var(--surface-neural);
          border: 1px solid var(--glass-border);
          border-radius: 4px;
          backdrop-filter: blur(32px) saturate(1.8);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        .hub-container {
          position: relative; z-index: 10;
          max-width: 1300px; margin: 0 auto;
          padding: 100px 32px 40px;
        }

        .hub-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 32px 40px; margin-bottom: 24px;
        }

        .badge-neural {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 16px; background: rgba(255, 184, 48, 0.05);
          border: 1px solid rgba(255, 184, 48, 0.1); border-radius: 2px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--c2-amber);
        }
        .f-amber { color: var(--c2-amber); }

        .header-titles { text-align: center; }
        .status-badge { 
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; 
          color: var(--c2-amber); margin-bottom: 8px;
        }
        .title {
          font-family: var(--font-tactical); font-size: 42px;
          font-weight: 800; letter-spacing: 4px; color: #FFF; line-height: 1; margin-bottom: 12px;
          text-shadow: 0 0 30px rgba(255, 184, 48, 0.3);
        }
        .subtitle { font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px; color: rgba(255, 255, 255, 0.4); }

        .status-indicator { display: flex; align-items: center; gap: 16px; }
        .active-icon { color: var(--c2-amber); filter: drop-shadow(0 0 10px var(--c2-amber)); }
        .status-text { display: flex; flex-direction: column; gap: 2px; }
        .st-main { font-family: var(--font-tactical); font-size: 12px; font-weight: 700; color: var(--c2-amber); letter-spacing: 1px; }
        .st-sub { font-size: 9px; letter-spacing: 1px; color: rgba(255, 255, 255, 0.3); }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .panel-title {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.4);
          padding-bottom: 20px; margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .panel-title :global(svg) { color: var(--c2-amber); }

        /* Promo Box */
        .promo-box { grid-column: span 2; padding: 48px; display: grid; grid-template-columns: 1fr 200px; gap: 40px; border-color: rgba(255, 184, 48, 0.3); }
        .promo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .promo-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--c2-amber); font-weight: 700; }
        .promo-title { font-family: var(--font-tactical); font-size: 24px; font-weight: 800; letter-spacing: 2px; margin-bottom: 16px; color: #FFF; }
        .promo-desc { font-size: 14px; line-height: 1.8; color: rgba(255, 255, 255, 0.4); margin-bottom: 32px; }
        .promo-cta { display: flex; align-items: center; gap: 24px; }
        .btn-tactical {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 28px; background: transparent; color: var(--c2-amber);
          border: 1px solid rgba(255, 184, 48, 0.4); border-radius: 2px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; transition: all 300ms; text-decoration: none;
        }
        .btn-tactical:hover { background: rgba(255, 184, 48, 0.1); border-color: var(--c2-amber); box-shadow: 0 0 20px rgba(255, 184, 48, 0.2); }
        .eta { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        
        .promo-visual { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; position: relative; }
        .thermal-pips { display: flex; gap: 8px; }
        .pip { width: 6px; height: 6px; background: var(--c2-amber); border-radius: 50%; animation: pulse-glow 2s infinite; }
        .visual-scan { font-family: var(--font-mono); font-size: 9px; color: var(--c2-amber); letter-spacing: 2px; opacity: 0.5; }

        .metrics-panel { padding: 32px; }
        .m-list { display: flex; flex-direction: column; gap: 20px; }
        .m-item { display: flex; justify-content: space-between; align-items: center; }
        .m-lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        .m-val { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #FFF; }

        .sim-box { text-align: center; }
        .sim-val { font-family: var(--font-tactical); font-size: 42px; font-weight: 900; color: #FFF; line-height: 1; }
        .sim-lbl { font-family: var(--font-mono); font-size: 8px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3); margin: 8px 0 16px; }
        .sim-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; overflow: hidden; }
        .sim-fill { height: 100%; background: var(--c2-amber); transition: width 0.5s ease; box-shadow: 0 0 10px var(--c2-amber); }

        .security-panel { padding: 32px; }
        .sec-list { display: flex; flex-direction: column; gap: 16px; }
        .sec-item { display: flex; align-items: center; gap: 16px; padding: 12px; background: rgba(255, 255, 255, 0.02); border-radius: 2px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
        .dot.active { background: var(--c2-amber); box-shadow: 0 0 10px var(--c2-amber); }
        .s-lbl { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: #FFF; letter-spacing: 1px; }

        .server-terminal { grid-column: span 2; padding: 32px; }
        .term-content { font-family: var(--font-mono); font-size: 12px; display: flex; flex-direction: column; gap: 8px; color: rgba(255, 255, 255, 0.4); }
        .term-line { border-left: 2px solid rgba(255, 255, 255, 0.05); padding-left: 16px; }

        .namtar-footer { margin: 40px 32px 0; padding: 24px; }
        .f-inner { display: flex; align-items: center; justify-content: center; gap: 16px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        .separator { opacity: 0.1; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 1200px) {
          .hub-header { flex-direction: column; gap: 40px; text-align: center; }
          .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
          .promo-box { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .promo-box, .metrics-panel, .security-panel, .server-terminal { grid-column: span 1; }
          .promo-box { grid-template-columns: 1fr; padding: 32px; }
          .promo-visual { display: none; }
          .hub-container { padding: 80px 16px 40px; }
          .title { font-size: 32px; }
        }
      `}</style>
    </main>
  );
}
