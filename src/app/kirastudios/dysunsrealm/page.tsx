"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, Sun, Flame, Database, Skull, Shield, 
  Target, Play, AlertCircle, MessageSquare, Activity, 
  Layers, Fingerprint, Zap, Radio, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { DiscordButton } from "@/components/shared/DiscordButton";

/* ═══ Solar Ember Canvas ═══ */
function SolarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = Math.random(); // Trigger re-render check, not used
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    interface Ember { x: number; y: number; r: number; dx: number; dy: number; o: number; hue: number }
    const isMobile = window.innerWidth <= 768;
    const count = isMobile ? 20 : 50;
    const embers: Ember[] = Array.from({ length: count }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * (isMobile ? 2 : 4),
      dx: (Math.random() - 0.5) * 0.5,
      dy: -(0.5 + Math.random() * 1.5),
      o: 0.1 + Math.random() * 0.4,
      hue: 20 + Math.random() * 20, // 20-40 is Orange/Amber range
    }));

    function draw() {
      ctx!.clearRect(0, 0, c!.width, c!.height);
      for (const e of embers) {
        e.y += e.dy;
        e.x += e.dx + Math.sin(e.y * 0.02) * 0.5;
        if (e.y < -10) { 
          e.y = c!.height + 10; 
          e.x = Math.random() * c!.width; 
        }
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${e.hue}, 100%, 50%, ${e.o})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="solar-canvas" />;
}

const threatDB = [
  { id: "DS-666", name: "MAGMA GOLEM", cls: "TITAN", threat: "EXTREME", harvest: "14.2k", stat: "ACTIVE" },
  { id: "DS-102", name: "CINDER DRAKE", cls: "AERIAL PREDATOR", threat: "HIGH", harvest: "8.1k", stat: "TRACKED" },
  { id: "DS-404", name: "ASH STALKER", cls: "INFILTRATOR", threat: "MEDIUM", harvest: "2.4k", stat: "STABLE" },
  { id: "DS-001", name: "DYSU ARCHON", cls: "MOD BOSS", threat: "FATAL", harvest: "??", stat: "UNSTABLE" },
];

export default function DysunPage() {
  return (
    <main className="dysun film-grain">
      {/* Immersive Background */}
      <div className="hero-bg">
        <Image 
          src="/009.png" 
          alt="Dysuns Realm Solar" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover", filter: "brightness(0.6) contrast(1.1)" }}
        />
      </div>
      <div className="bg-vignette" />
      <div className="noise-overlay" />
      <div className="scanline-overlay" />
      <SolarCanvas />

      <nav className="tactical-nav">
        <Link href="/kirastudios" className="nav-btn spatial-panel">
          <ChevronLeft size={14} /> <span className="btn-text">RETURN TO HUB</span>
        </Link>
      </nav>

      <div className="dashboard-layout">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-content">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="status-bar spatial-panel"
            >
              <Radio size={12} className="pulse-icon f-amber" />
              <span>ORBITAL SECTOR: DYSUN // SOLAR ENERGY COLLECTORS: 100% ONLINE</span>
            </motion.div>

            <span className="genre-badge">// ASA_MODDED_REALM_INTERFACE</span>

            <h1 className="dysun-title">
              DYSUN'S <span className="title-glow">REALM_</span>
            </h1>

            <div className="notice-banner spatial-panel">
              <AlertCircle size={14} className="f-amber" />
              <span>ARK SURVIVAL ASCENDED SERVER // DEVELOPMENT PHASE ACTIVE</span>
            </div>

            <p className="hero-desc">
              TACTICAL SUMMARY: High-thermal modded environment for ASA. 
              The realm utilizes custom solar-thermal mechanics, extreme 
              heat-resistance progression, and the primordial "Dysun" boss architecture.
            </p>

            <div className="cta-row">
              <Link href="/kirastudios/dysunsrealm/dysunsark" className="cta-primary btn-tactical">
                DEPLOY TO DYSUN <ChevronRight size={14} />
              </Link>
              <button className="cta-secondary spatial-panel">
                <Play size={14} /> MOD OVERVIEW
              </button>
              
              <DiscordButton 
                href="https://discord.gg/R9Axsm7JfN"
                variant="red"
                label="DYSUN DISCORD"
              />
            </div>
          </div>

          {/* Thermal HUD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="thermal-hud spatial-panel"
          >
            <div className="panel-header">
              <Sun size={12} className="accent-icon" /> SOLAR-THERMAL GRID
            </div>
            <div className="hud-list">
              <div className="hud-stat">
                <Flame size={14} className="f-amber" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-amber" style={{ width: "92%" }} />
                </div>
                <span className="hud-val">1280°K</span>
              </div>
              <div className="hud-stat">
                <Zap size={14} className="f-cyan" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-cyan" style={{ width: "100%" }} />
                </div>
                <span className="hud-val">MAX</span>
              </div>
              <div className="hud-stat">
                <Database size={14} className="f-amber" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-amber" style={{ width: "42%" }} />
                </div>
                <span className="hud-val">42.1k</span>
              </div>
            </div>
            <div className="hud-footer">
              <Fingerprint size={10} strokeWidth={3} /> AUTH: COMMANDER_SAT
            </div>
          </motion.div>
        </section>

        {/* DATA SECTION */}
        <section className="data-section">
          <div className="intel-panel spatial-panel">
            <div className="panel-header">
              <Target size={14} className="accent-icon" />
              <span>THREAT_DATABASE // ASA_MOD_ENTITIES</span>
            </div>
            
            <div className="db-table-wrapper">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>NODE_ID</th>
                    <th>DESIGNATION</th>
                    <th>CLASS</th>
                    <th>THREAT_LVL</th>
                    <th>YIELD</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {threatDB.map(t => (
                    <tr key={t.id} className="group">
                      <td className="t-mono t-dim">{t.id}</td>
                      <td className="t-bold t-glow">{t.name}</td>
                      <td className="t-mono">{t.cls}</td>
                      <td className={`t-bold ${t.threat === 'EXTREME' || t.threat === 'FATAL' ? 'f-red' : 'f-amber'}`}>{t.threat}</td>
                      <td className="t-mono">{t.harvest}</td>
                      <td className="t-mono">
                        <div className="status-box">
                          <div className={`dot ${t.stat === 'ACTIVE' || t.stat === 'STABLE' ? 'active' : 'pulse'}`} />
                          {t.stat}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel-footer">
              <Activity size={10} /> TRACKING ASSETS...
            </div>
          </div>

          <div className="info-panels">
            <div className="lore-panel spatial-panel">
               <div className="panel-header">
                <Flame size={12} className="f-amber" /> SOLAR_CONVERGENCE
              </div>
              <p className="lore-text">
                The Realm is powered by the "Grand Solar Relay" — a massive 
                orbital structure that focuses thermal radiation into the 
                volcanic ecosystem. Survival requires specific gear designed 
                to withstand temperatures exceeding 1000°K.
              </p>
              <div style={{ marginTop: '24px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(245,158,11,0.2)' }}>
                <Image src="/Dysark5.png" alt="Solar Concept" width={800} height={400} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            <div className="tech-stack spatial-panel">
              <div className="panel-header">
                <Layers size={12} /> MODULAR_ARCHITECTURE
              </div>
              <div className="stack-list">
                <div className="stack-item"><span>ENGINE:</span> <span className="f-amber">UNREAL 5.4</span></div>
                <div className="stack-item"><span>ASSETS:</span> <span className="f-amber">ASA_NATIVE</span></div>
                <div className="stack-item"><span>BACKBONE:</span> <span className="f-amber">DEDICATED_C2</span></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="dysun-footer spatial-panel">
        <div className="f-left">DYSUN'S REALM // SOLAR THERMAL ARCHIVE © {new Date().getFullYear()}</div>
        <div className="f-right f-amber pulse-glow">SOLAR FLARE IMMINENT</div>
      </footer>

      <style jsx>{`
        .dysun {
          --c2-amber: #F59E0B;
          --c2-cyan: #0FB9B1;
          --c2-red: #EF4444;
          --bg-dark: #030508;
          --surface-neural: #070C11;
          --glass-border: rgba(255, 255, 255, 0.08);

          background: var(--bg-dark);
          font-family: var(--font-body);
          color: #F8FAFC;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .hero-bg { position: fixed; inset: 0; z-index: 0; opacity: 0.5; }
        .bg-image { filter: brightness(0.6) saturate(0.8) contrast(1.1); }
        .bg-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(circle at 50% 50%, transparent 20%, var(--bg-dark) 95%);
        }
        .noise-overlay {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
        }
        .scanline-overlay {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(to bottom, transparent 50%, rgba(245, 158, 11, 0.02) 50.1%);
          background-size: 100% 4px;
        }
        .solar-canvas { position: fixed; inset: 0; z-index: 3; pointer-events: none; }

        .tactical-nav { position: fixed; top: 24px; left: 32px; z-index: 200; }
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

        .dashboard-layout {
          position: relative; z-index: 10;
          padding: 100px 32px 40px;
          display: flex; flex-direction: column; gap: 48px;
          max-width: 1400px; margin: 0 auto; width: 100%;
          flex: 1;
        }

        /* ── HERO ── */
        .hero-section { display: flex; justify-content: space-between; align-items: center; gap: 60px; }
        .hero-content { flex: 1; max-width: 800px; }

        .status-bar {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 8px 16px; margin-bottom: 24px;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px;
          color: var(--c2-amber); border-color: rgba(245, 158, 11, 0.2);
          background: rgba(245, 158, 11, 0.05);
        }
        .f-amber { color: var(--c2-amber); }
        .f-red { color: var(--c2-red); }
        .f-cyan { color: var(--c2-cyan); }

        .genre-badge { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 4px; color: rgba(255, 255, 255, 0.3); margin-bottom: 12px; }

        .dysun-title {
          font-family: var(--font-tactical);
          font-size: clamp(54px, 6vw, 84px); font-weight: 900; letter-spacing: -1px; line-height: 1;
          margin-bottom: 24px; color: #FFF;
        }
        .title-glow { color: var(--c2-amber); text-shadow: 0 0 40px rgba(245, 158, 11, 0.4); }

        .notice-banner {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 20px; margin-bottom: 24px; border-color: rgba(245, 158, 11, 0.3);
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; font-weight: 700; color: #FFF;
        }

        .hero-desc { font-size: 15px; line-height: 1.8; color: rgba(255, 255, 255, 0.4); margin-bottom: 40px; }

        .cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-tactical {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 32px; background: transparent; color: var(--c2-amber);
          border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 4px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; transition: all 300ms; text-decoration: none;
        }
        .btn-tactical:hover { background: rgba(245, 158, 11, 0.1); border-color: var(--c2-amber); box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }

        .cta-secondary {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 32px; background: rgba(255, 255, 255, 0.03); color: #FFF;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          border-radius: 4px; cursor: pointer; transition: all 300ms; border: 1px solid transparent;
        }
        .cta-secondary:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }

        /* ── Discord Button Component Handles Styling ── */

        .thermal-hud { width: 340px; padding: 32px; flex-shrink: 0; }
        .panel-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 32px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3);
          padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .accent-icon { color: var(--c2-amber); }
        .hud-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px; }
        .hud-stat { display: flex; align-items: center; gap: 16px; }
        .hud-bar-container { flex: 1; height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; overflow: hidden; }
        .hud-bar-fill { height: 100%; border-radius: 2px; }
        .bg-amber { background: var(--c2-amber); box-shadow: 0 0 10px var(--c2-amber); }
        .bg-cyan { background: var(--c2-cyan); box-shadow: 0 0 10px var(--c2-cyan); }
        .hud-val { font-family: var(--font-tactical); font-size: 14px; font-weight: 700; min-width: 60px; text-align: right; }
        .hud-footer { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }

        /* ── DATA ── */
        .data-section { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }
        
        .intel-panel { padding: 40px; }
        .db-table-wrapper { margin-bottom: 24px; width: 100%; overflow-x: auto; }
        .db-table { width: 100%; border-collapse: collapse; text-align: left; }
        .db-table th {
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(245, 158, 11, 0.4);
          padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .db-table td {
          padding: 20px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.02);
          font-size: 12px; color: rgba(255, 255, 255, 0.7);
        }
        .db-table tbody tr:hover { background: rgba(245, 158, 11, 0.02); }

        .t-mono { font-family: var(--font-mono); }
        .t-dim { color: rgba(255, 255, 255, 0.3); }
        .t-bold { font-weight: 700; letter-spacing: 1px; }
        .t-glow { color: var(--c2-amber); text-shadow: 0 0 10px rgba(245, 158, 11, 0.3); }

        .status-box { display: flex; align-items: center; gap: 12px; }
        .dot { width: 4px; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; }
        .dot.active { background: var(--c2-amber); box-shadow: 0 0 8px var(--c2-amber); }
        .dot.pulse { background: var(--c2-amber); animation: pulse-glow 2s infinite; }

        .panel-footer { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }

        .info-panels { display: flex; flex-direction: column; gap: 24px; }
        .lore-panel { padding: 32px; }
        .lore-text { font-size: 13px; line-height: 1.8; color: rgba(255, 255, 255, 0.3); }

        .tech-stack { padding: 32px; }
        .stack-list { display: flex; flex-direction: column; gap: 12px; }
        .stack-item { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; color: rgba(255, 255, 255, 0.2); letter-spacing: 1px; }

        .dysun-footer {
          margin: 40px 32px 32px; padding: 24px 32px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2);
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 1280px) {
          .hero-section { flex-direction: column; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .notice-banner { justify-content: center; width: 100%; }
          .cta-row { justify-content: center; }
          .thermal-hud { width: 100%; max-width: 600px; }
          .data-section { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .dashboard-layout { padding: 80px 16px 24px; }
          .dysun-title { font-size: 42px; }
          .intel-panel { padding: 24px; }
        }
      `}</style>
    </main>
  );
}
