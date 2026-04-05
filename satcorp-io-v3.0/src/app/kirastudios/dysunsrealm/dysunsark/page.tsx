"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Server, Activity, Users, Shield, Cpu, Database, 
  AlertCircle, Sun, Flame, Zap, Radio, Fingerprint, ExternalLink,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

function PopulationTelemetry() {
  const [pop, setPop] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPop(p => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = p + delta;
        return next < 0 ? 0 : next > 100 ? 100 : next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="telemetry-box">
      <div className="t-header">
         <Users size={12} className="f-amber" />
         <span>ORBITAL POPULATION // SIMULATED</span>
      </div>
      <div className="t-gauge">
        <svg viewBox="0 0 100 50" className="gauge-svg">
          <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="var(--c2-amber)" strokeWidth="8" 
                strokeDasharray={`${(pop / 100) * 126} 126`} strokeLinecap="round" className="gauge-fill" />
        </svg>
        <div className="t-val">{pop}</div>
        <div className="t-lbl">CONNECTED_NODES</div>
      </div>
      <style jsx>{`
        .telemetry-box { font-family: var(--font-mono); }
        .t-header { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 2px; color: var(--c2-amber); margin-bottom: 24px; font-weight: 700; }
        .t-gauge { position: relative; width: 200px; margin: 0 auto; text-align: center; }
        .gauge-svg { width: 100%; filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.3)); }
        .gauge-fill { transition: stroke-dasharray 1s ease; }
        .t-val { font-family: var(--font-tactical); font-size: 32px; font-weight: 900; color: #FFF; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); }
        .t-lbl { font-size: 8px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); margin-top: 12px; }
        .f-amber { color: var(--c2-amber); }
      `}</style>
    </div>
  );
}

export default function DysunsArkPage() {
  return (
    <main className="dysun-ark film-grain">
      {/* Immersive Background */}
      <div className="telemetry-bg">
        <Image 
          src="/KYRAX738383737.png" 
          alt="Dysun Ark Telemetry" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover", filter: "brightness(0.5) contrast(1.2)" }}
        />
        <div className="noise-overlay" />
      </div>

      <nav className="tactical-nav">
        <Link href="/kirastudios/dysunsrealm" className="nav-btn spatial-panel">
          <ChevronLeft size={14} /> <span className="btn-text">DYSUN COMMAND HUB</span>
        </Link>
      </nav>

      <div className="hub-container">
        <header className="hub-header spatial-panel">
          <div className="badge-neural">
            <Sun size={10} className="pulse-icon f-amber" /> 
            <span className="badge-text">ORBITAL INFRASTRUCTURE // ASA_ASA_HOST</span>
          </div>
          
          <div className="header-titles">
            <div className="status-badge">DEPLOYMENT_STATUS: PROVISIONING</div>
            <h1 className="title">DYSUN SECTOR</h1>
            <p className="subtitle">ASA DEDICATED HOSTING // COMING SOON</p>
          </div>

          <div className="status-indicator">
            <Shield size={16} className="active-icon" />
            <div className="status-text">
              <span className="st-main">THERMAL SHIELD 100%</span>
              <span className="st-sub">Radiation hardening complete</span>
            </div>
          </div>
          
        </header>

        <div className="dashboard-grid">
           {/* ADVERTISEMENT PANEL */}
          <div className="ad-box spatial-panel">
            <div className="ad-content">
              <div className="ad-header">
                <Radio size={14} className="f-amber" />
                <span className="ad-tag">SECTOR BROADCAST</span>
              </div>
              <h2 className="ad-title">SOLAR-THERMAL ASA TESTING</h2>
              <p className="ad-desc">
                The Dysun Ark sector is preparing for high-intensity thermal simulation. 
                Optimized for ASA with custom solar-flare mechanics and volcanic raid bosses.
              </p>
              <div className="ad-cta">
                <button className="btn-tactical amber-btn">REGISTER FOR UPDATES</button>
                <div className="eta">ETA: Q4 2026</div>
              </div>
            </div>
             <div className="ad-visual">
                <div className="thermal-pips">
                   <div className="pip" />
                   <div className="pip" />
                   <div className="pip" />
                </div>
             </div>
          </div>

           {/* Metrics Grid */}
          <div className="metrics-panel spatial-panel">
            <h3 className="panel-title"><Cpu size={14} /> HARVEST_SPECIFICATIONS</h3>
            <div className="m-list">
              <div className="m-item">
                <span className="m-lbl">TICK RATE</span>
                <span className="m-val">128 HZ</span>
              </div>
              <div className="m-item">
                <span className="m-lbl">MAX_PLAYERS</span>
                <span className="m-val">70/70</span>
              </div>
              <div className="m-item">
                <span className="m-lbl">REGION</span>
                <span className="m-val">NA // EAST</span>
              </div>
            </div>
          </div>

          <div className="telemetry-panel spatial-panel">
            <PopulationTelemetry />
          </div>

          <div className="security-panel spatial-panel">
            <h3 className="panel-title"><Shield size={14} /> SECURITY_OVERRIDE</h3>
            <div className="sec-list">
              <div className="sec-item">
                <div className="dot active" />
                <span className="s-lbl">VAC_SECURE</span>
              </div>
              <div className="sec-item">
                <div className="dot active" />
                <span className="s-lbl">SAT_ENCRYPT</span>
              </div>
              <div className="sec-item">
                <div className="dot" />
                <span className="s-lbl">ADMIN_BYPASS</span>
              </div>
            </div>
          </div>

          <div className="server-terminal spatial-panel">
            <h3 className="panel-title"><Database size={14} /> SECTOR_TERMINAL</h3>
            <div className="term-content">
              <div className="term-line">{">"} INITIALIZING SOLAR RELAY...</div>
              <div className="term-line">{">"} MOD_ARCHITECTURE: DYSUN_ASA_V1</div>
              <div className="term-line">{">"} NO ASSETS DETECTED IN SECTOR 0.</div>
              <div className="term-line f-amber">{">"} STATUS: STANDBY_MODE</div>
            </div>
          </div>

          <div className="auth-panel spatial-panel">
            <h3 className="panel-title"><Fingerprint size={14} /> ORBITAL_KEY</h3>
            <div className="auth-data">
              <div className="auth-item">
                <span className="ai-lbl">U_ID:</span>
                <span className="ai-val">DYS-000-X</span>
              </div>
              <Link href="/kirastudios/dysunsrealm" className="auth-link">
                 COMMAND CENTER <ExternalLink size={10} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <footer className="dysun-footer spatial-panel">
        <div className="f-inner">
           <span>DYSUN'S SECTOR © {new Date().getFullYear()} — ORBITAL COMMAND</span>
           <span className="separator">//</span>
           <span className="f-amber">THERMAL MONITORING NOMINAL</span>
        </div>
      </footer>

      <style jsx>{`
        .dysun-ark {
          --c2-amber: #F59E0B;
          --c2-green: #00FF41;
          --c2-red: #EF4444;
          --c2-cyan: #0FB9B1;
          --bg-dark: #030508;
          --surface-neural: #070C11;
          --glass-border: rgba(255, 255, 255, 0.08);

          background: var(--bg-dark);
          font-family: var(--font-body);
          color: #F8FAFC;
          min-height: 100vh;
          position: relative;
          padding-bottom: 60px;
          overflow-x: hidden;
        }

        .telemetry-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(245, 158, 11, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .noise-overlay {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
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
          padding: 8px 16px; background: rgba(245, 158, 11, 0.05);
          border: 1px solid rgba(245, 158, 11, 0.1); border-radius: 2px;
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
          text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
        }
        .subtitle { font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px; color: rgba(255, 255, 255, 0.4); }

        .status-indicator { display: flex; align-items: center; gap: 16px; }
        .active-icon { color: var(--c2-amber); filter: drop-shadow(0 0 10px var(--c2-amber)); }
        .status-text { display: flex; flex-direction: column; gap: 2px; }
        .st-main { font-family: var(--font-tactical); font-size: 12px; font-weight: 700; color: var(--c2-amber); letter-spacing: 1px; }
        .st-sub { font-size: 9px; letter-spacing: 1px; color: rgba(255, 255, 255, 0.3); }

        /* ── Discord Button Component Handles Styling ── */

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

        /* Ad Box */
        .ad-box { grid-column: span 2; padding: 48px; display: grid; grid-template-columns: 1fr 200px; gap: 40px; border-color: rgba(245, 158, 11, 0.2); }
        .ad-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .ad-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--c2-amber); font-weight: 700; }
        .ad-title { font-family: var(--font-tactical); font-size: 24px; font-weight: 800; letter-spacing: 2px; margin-bottom: 16px; color: #FFF; }
        .ad-desc { font-size: 14px; line-height: 1.8; color: rgba(255, 255, 255, 0.4); margin-bottom: 32px; }
        .ad-cta { display: flex; align-items: center; gap: 24px; }
        .btn-tactical {
          padding: 14px 28px; background: transparent; color: var(--c2-amber);
          border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 2px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; transition: all 300ms;
        }
        .btn-tactical:hover { background: rgba(245, 158, 11, 0.1); border-color: var(--c2-amber); }
        .eta { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        .ad-visual { display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .f-amber-o { color: var(--c2-amber); opacity: 0.1; filter: blur(2px); }
        .thermal-pips { display: flex; gap: 8px; margin-top: 24px; }
        .pip { width: 6px; height: 6px; background: var(--c2-amber); border-radius: 50%; animation: pulse-glow 2s infinite; }
        .pip:nth-child(2) { animation-delay: 0.3s; }
        .pip:nth-child(3) { animation-delay: 0.6s; }

        .metrics-panel { padding: 32px; }
        .m-list { display: flex; flex-direction: column; gap: 20px; }
        .m-item { display: flex; justify-content: space-between; align-items: center; }
        .m-lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        .m-val { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #FFF; }

        .telemetry-panel { padding: 32px; border-color: rgba(245, 158, 11, 0.15); }

        .security-panel { padding: 32px; }
        .sec-list { display: flex; flex-direction: column; gap: 16px; }
        .sec-item { display: flex; align-items: center; gap: 16px; padding: 12px; background: rgba(255, 255, 255, 0.02); border-radius: 2px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
        .dot.active { background: var(--c2-amber); box-shadow: 0 0 10px var(--c2-amber); }
        .s-lbl { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: #FFF; letter-spacing: 1px; }

        .server-terminal { grid-column: span 2; padding: 32px; }
        .term-content { font-family: var(--font-mono); font-size: 12px; display: flex; flex-direction: column; gap: 8px; color: rgba(255, 255, 255, 0.4); }
        .term-line { border-left: 2px solid rgba(255, 255, 255, 0.05); padding-left: 16px; }

        .auth-panel { padding: 32px; }
        .auth-data { display: flex; flex-direction: column; gap: 16px; }
        .auth-item { display: flex; justify-content: space-between; }
        .ai-lbl { font-family: var(--font-mono); font-size: 10px; color: rgba(255, 255, 255, 0.2); }
        .ai-val { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #FFF; }
        .auth-link { display: flex; align-items: center; gap: 8px; color: var(--c2-amber); font-family: var(--font-mono); font-size: 10px; text-decoration: none; margin-top: 8px; }
        .auth-link:hover { text-decoration: underline; }

        .dysun-footer { margin: 40px 32px 0; padding: 24px; }
        .f-inner { display: flex; align-items: center; justify-content: center; gap: 16px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        .separator { opacity: 0.1; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 1200px) {
          .hub-header { flex-direction: column; gap: 40px; text-align: center; }
          .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
          .ad-box { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .ad-box, .metrics-panel, .telemetry-panel, .security-panel, .server-terminal, .auth-panel { grid-column: span 1; }
          .ad-box { grid-template-columns: 1fr; padding: 32px; }
          .ad-visual { display: none; }
          .hub-container { padding: 80px 16px 40px; }
          .title { font-size: 32px; }
        }
      `}</style>
    </main>
  );
}
