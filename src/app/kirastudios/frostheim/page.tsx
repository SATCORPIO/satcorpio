"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, Snowflake, Wind, Mountain, Swords, Map, 
  Thermometer, Shield, Target, Play, ShieldAlert, MessageSquare, 
  Activity, Layers, Fingerprint, Radio 
} from "lucide-react";
import { motion } from "framer-motion";
import { DiscordButton } from "@/components/shared/DiscordButton";

/* ═══ Snow Canvas ═══ */
function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    interface Flake { x: number; y: number; r: number; dx: number; dy: number; o: number }
    const isMobile = window.innerWidth <= 768;
    const flakeCount = isMobile ? 30 : 80;
    
    const flakes: Flake[] = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + (Math.random() * (isMobile ? 1.5 : 2.5)),
      dx: (Math.random() - 0.5) * 0.6,
      dy: 0.3 + Math.random() * 1.2,
      o: 0.15 + Math.random() * 0.35,
    }));

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const f of flakes) {
        f.x += f.dx + Math.sin(f.y * 0.01) * 0.3;
        f.y += f.dy;
        if (f.y > canvas!.height) { 
          f.y = -5; 
          f.x = Math.random() * canvas!.width; 
        }
        if (f.x > canvas!.width) f.x = 0;
        if (f.x < 0) f.x = canvas!.width;
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(186,230,253,${f.o})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="snow-canvas" />;
}

const creatures = [
  { id: "FH-01", name: "FROSTBACK REX", cls: "APEX PREDATOR", threat: 5, region: "GLACIAL PEAKS", color: "#EF4444" },
  { id: "FH-02", name: "MAMMOTH", cls: "TAMEABLE HEAVY", threat: 3, region: "FROZEN TUNDRA", color: "#00FF41" },
  { id: "FH-03", name: "SABRETOOTH", cls: "PACK HUNTER", threat: 4, region: "SNOWFIELDS", color: "#F59E0B" },
  { id: "FH-04", name: "BLIZZARD WYVERN", cls: "BOSS / ALPHA", threat: 5, region: "SUMMIT NEST", color: "#7DD3FC" },
];

export default function FrostheimPage() {
  return (
    <main className="frost film-grain">
      {/* Immersive Background */}
      <div className="hero-bg">
        <Image 
          src="/frostheim_viking.png" 
          alt="Frostheim Viking Hub" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover", filter: "brightness(0.6) contrast(1.1)" }}
        />
      </div>
      <div className="bg-vignette" />
      <div className="noise-overlay" />
      <div className="scanline-overlay" />
      <SnowCanvas />

      <nav className="tactical-nav">
        <Link href="/kirastudios" className="nav-btn spatial-panel">
          <ChevronLeft size={14} /> <span className="btn-text">RETURN TO HUB</span>
        </Link>
      </nav>

      <div className="dashboard-layout">
        {/* LEFT COLUMN: HERO & OVERVIEW */}
        <div className="left-column">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="title-panel spatial-panel"
          >
            <div className="badge-neural">
              <Snowflake size={10} className="pulse-icon f-cyan" /> 
              <span className="badge-text">PROJECT FROSTHEIM // ASA_ARC_PROTOCOL</span>
            </div>
            
            <h1 className="frost-title">
              FROST<span className="title-glow">HEIM_</span>
            </h1>

            <div className="status-banner">
              <Radio size={14} className="f-cyan" />
              <span>SERVER STATUS: DEVELOPMENT // COMING SOON TO ASA</span>
            </div>

            <p className="hero-desc">
              TACTICAL BRIEF: A Viking survival simulation generated in UE5. 
              Norse legends intersect with prehistoric apex predators. 
              The extreme climate protocol treats temperature as the primary hazard.
            </p>

            <div className="cta-grid">
              <button className="cta-primary btn-tactical">
                <ShieldAlert size={14} /> REQUEST ALPHA ACCESS
              </button>
              <button className="cta-secondary spatial-panel">
                <Play size={14} /> VIEW ARCHIVE FOOTAGE
              </button>
              
              <Link href="/namtarsurvey" className="cta-secondary spatial-panel" style={{ color: "var(--c2-cyan)", borderColor: "rgba(147, 197, 253, 0.3)" }}>
                <Snowflake size={14} /> CALIBRATION SURVEY
              </Link>
              
              <DiscordButton 
                href="https://discord.gg/R9Axsm7JfN"
                variant="blue"
                label="FROSTHEIM DISCORD"
              />
            </div>
          </motion.div>

          <div className="sensor-block spatial-panel">
            <div className="panel-header">
              <Wind size={14} className="accent-icon" />
              <span>ENVIRONMENTAL SENSOR_ARRAY</span>
            </div>
            <div className="sensor-readouts">
              <div className="s-box">
                <Thermometer size={20} className="s-icon" />
                <div className="s-data">
                  <span className="s-val">-47°C</span>
                  <span className="s-lbl">CORE_TEMP</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-box">
                <Wind size={20} className="s-icon" />
                <div className="s-data">
                  <span className="s-val">84 KM/H</span>
                  <span className="s-lbl">WIND_SHEAR</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-box">
                <Mountain size={20} className="s-icon" />
                <div className="s-data">
                  <span className="s-val">GLACIAL</span>
                  <span className="s-lbl">BIOME_ID</span>
                </div>
              </div>
            </div>
          </div>

          <div className="features-block spatial-panel">
            <div className="panel-header">
              <Swords size={14} className="accent-icon" />
              <span>SURVIVAL_PROTOCOLS</span>
            </div>
            <div className="feat-grid">
              {[
                { title: "NORSE CRAFTING", desc: "Forge legendary weapons from local alloys." },
                { title: "ICE CITADELS", desc: "Construct fortified glacial outposts." },
                { title: "PVE RAIDS", desc: "Assault 10-player subterranean dungeons." },
              ].map(f => (
                <div key={f.title} className="feat-row">
                  <div className="f-pip" />
                  <div className="f-content">
                    <h4 className="f-title">{f.title}</h4>
                    <p className="f-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CREATURE INDEX DB */}
        <div className="right-column">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="database-panel spatial-panel"
          >
            <div className="panel-header">
              <Target size={14} className="accent-icon" />
              <span>ASSET_DATABANK: FAUNA [LOCAL]</span>
            </div>
            
            <div className="db-table-wrapper">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>ASSET_ID</th>
                    <th>DESIGNATION</th>
                    <th>CLASS</th>
                    <th>THREAT_LVL</th>
                    <th>REGION</th>
                  </tr>
                </thead>
                <tbody>
                  {creatures.map(c => (
                    <tr key={c.id} className="group">
                      <td className="t-mono t-dim">{c.id}</td>
                      <td className="t-bold t-glow">{c.name}</td>
                      <td className="t-mono">{c.cls}</td>
                      <td>
                        <div className="threat-bar">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="threat-pip" style={{
                              background: i < c.threat ? c.color : "rgba(255,255,255,0.05)",
                              boxShadow: i < c.threat ? `0 0 8px ${c.color}66` : "none"
                            }} />
                          ))}
                        </div>
                      </td>
                      <td className="t-mono t-dim"><Map size={10} className="inline-icon" /> {c.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="db-footer">
               <div className="df-item"><Fingerprint size={10} /> ENCRYPTED_LINK</div>
               <div className="df-item"><Activity size={10} /> SCANNING...</div>
            </div>
            
            <div className="db-scan-overlay" />
          </motion.div>

          {/* Infrastructure Layer */}
          <div className="infra-layers spatial-panel">
               <div className="panel-header">
                <Layers size={12} /> INFRASTRUCTURE_NODES
              </div>
              <div className="layer-list">
                <div className="layer-item">
                    <span className="dot active" />
                    <span>FJORD_BACKBONE // ASA_ASA_1</span>
                </div>
                <div className="layer-item">
                    <span className="dot" />
                    <span>SUMMIT_RELAY [PROVISIONING]</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      <footer className="frost-footer spatial-panel">
        <span className="rune-text">ᚠ ᚱ ᛟ ᛊ ᛏ ᚺ ᛖ ᛁ ᛗ</span>
        <span className="copyright">FROSTHEIM © {new Date().getFullYear()} — OPERATION COMMAND</span>
        <span className="rune-text">ᛗ ᛁ ᛖ ᚺ ᛏ ᛊ ᛟ ᚱ ᚠ</span>
      </footer>

      <style jsx>{`
        .frost {
          --c2-cyan: #93C5FD; /* Shifted to Frosty Blue for Viking Vibe */
          --c2-green: #34D399; /* Cold mint green */
          --c2-red: #F87171;
          --c2-amber: #FCA5A5; /* Shifted to pale red instead of warm amber */
          --bg-dark: #020617; /* Deep slate */
          --surface-neural: #0F172A;
          --glass-border: rgba(147, 197, 253, 0.15);

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
        .bg-image { filter: brightness(0.6) contrast(1.1); }
        .bg-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(circle at 60% 50%, transparent 20%, var(--bg-dark) 95%);
        }
        .noise-overlay {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
        }
        .scanline-overlay {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(to bottom, transparent 50%, rgba(125, 211, 252, 0.02) 50.1%);
          background-size: 100% 4px;
        }
        .snow-canvas { position: fixed; inset: 0; z-index: 3; pointer-events: none; }

        .tactical-nav { position: fixed; top: 24px; left: 32px; z-index: 200; }
        .nav-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 20px; text-decoration: none;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.6); transition: all 300ms;
        }
        .nav-btn:hover { color: var(--c2-cyan); border-color: var(--c2-cyan); }

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
          display: grid; grid-template-columns: 500px 1fr;
          gap: 24px; max-width: 1600px; margin: 0 auto; width: 100%;
          flex: 1;
        }

        .left-column { display: flex; flex-direction: column; gap: 24px; }
        
        .title-panel { padding: 48px; }
        .badge-neural {
          display: flex; align-items: center; gap: 12px;
          padding: 8px 16px; background: rgba(125, 211, 252, 0.05);
          border: 1px solid rgba(125, 211, 252, 0.1); border-radius: 2px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--c2-cyan);
          margin-bottom: 24px;
        }
        .f-cyan { color: var(--c2-cyan); }
        .status-banner { 
          display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--c2-cyan);
          font-weight: 700;
        }

        .frost-title {
          font-family: var(--font-tactical);
          font-size: clamp(48px, 5vw, 72px);
          font-weight: 900; letter-spacing: -1px; line-height: 0.9;
          color: #E0F2FE; margin-bottom: 24px;
        }
        .title-glow { color: var(--c2-cyan); text-shadow: 0 0 30px rgba(125, 211, 252, 0.4); }

        .hero-desc { font-size: 14px; line-height: 1.8; color: rgba(125, 211, 252, 0.4); margin-bottom: 32px; }

        .cta-grid { display: flex; flex-direction: column; gap: 12px; }
        .btn-tactical {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 16px; background: transparent; color: var(--c2-cyan);
          border: 1px solid rgba(125, 211, 252, 0.3); border-radius: 4px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; transition: all 300ms;
        }
        .btn-tactical:hover { background: rgba(125, 211, 252, 0.1); border-color: var(--c2-cyan); box-shadow: 0 0 20px rgba(125, 211, 252, 0.2); }

        .cta-secondary {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 16px; background: rgba(255, 255, 255, 0.03); color: #FFF;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          border-radius: 4px; cursor: pointer; transition: all 300ms; border: 1px solid transparent;
        }
        .cta-secondary:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }

        /* ── Discord Button Component Handles Styling ── */

        .panel-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3);
          padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .accent-icon { color: var(--c2-cyan); }

        .sensor-block { padding: 32px; }
        .sensor-readouts { display: flex; align-items: center; justify-content: space-between; }
        .s-box { display: flex; align-items: center; gap: 16px; }
        .s-icon { color: var(--c2-cyan); filter: drop-shadow(0 0 6px rgba(125, 211, 252, 0.4)); }
        .s-data { display: flex; flex-direction: column; }
        .s-val { font-family: var(--font-tactical); font-size: 20px; color: #FFF; }
        .s-lbl { font-family: var(--font-mono); font-size: 8px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3); }
        .s-sep { width: 1px; height: 32px; background: rgba(255, 255, 255, 0.05); }

        .features-block { padding: 32px; }
        .feat-grid { display: flex; flex-direction: column; gap: 20px; }
        .feat-row { display: flex; gap: 16px; align-items: flex-start; }
        .f-pip { margin-top: 6px; width: 4px; height: 4px; background: var(--c2-cyan); border-radius: 50%; box-shadow: 0 0 8px var(--c2-cyan); }
        .f-title { font-family: var(--font-tactical); font-size: 12px; letter-spacing: 2px; color: #FFF; margin-bottom: 4px; }
        .f-desc { font-size: 11px; color: rgba(255, 255, 255, 0.3); line-height: 1.6; }

        .right-column { display: flex; flex-direction: column; gap: 24px; }
        .database-panel { flex: 1; padding: 48px 40px; position: relative; overflow: hidden; }
        
        .db-table-wrapper { width: 100%; overflow-x: auto; position: relative; z-index: 2; margin-bottom: 24px; }
        .db-table { width: 100%; border-collapse: collapse; text-align: left; }
        .db-table th {
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(125, 211, 252, 0.4);
          padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .db-table td {
          padding: 20px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 12px; color: rgba(255, 255, 255, 0.8);
        }
        .db-table tbody tr:hover { background: rgba(125, 211, 252, 0.03); }

        .t-mono { font-family: var(--font-mono); }
        .t-dim { color: rgba(255, 255, 255, 0.3); }
        .t-bold { font-weight: 700; letter-spacing: 1px; }
        .t-glow { color: var(--c2-cyan); text-shadow: 0 0 10px rgba(125, 211, 252, 0.3); }

        .threat-bar { display: flex; gap: 4px; }
        .threat-pip { width: 10px; height: 10px; border-radius: 1px; }
        .inline-icon { display: inline; position: relative; top: -1px; margin-right: 4px; opacity: 0.5; }

        .db-footer {
          display: flex; gap: 24px; font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2);
        }
        .df-item { display: flex; align-items: center; gap: 8px; }

        .db-scanline { width: 100%; height: 2px; background: rgba(125, 211, 252, 0.2); position: absolute; top: 0; left: 0; animation: scan 4s linear infinite; }
        @keyframes scan { from { transform: translateY(0); } to { transform: translateY(600px); } }

        .infra-layers { padding: 32px; }
        .layer-list { display: flex; flex-direction: column; gap: 12px; }
        .layer-item { display: flex; align-items: center; gap: 12px; font-family: var(--font-mono); font-size: 10px; color: rgba(255, 255, 255, 0.3); }
        .dot { width: 4px; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; }
        .dot.active { background: var(--c2-cyan); box-shadow: 0 0 8px var(--c2-cyan); }

        .frost-footer {
          margin: 40px 32px 32px; padding: 24px 32px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .copyright { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3); }
        .rune-text { font-family: var(--font-tactical); font-size: 16px; letter-spacing: 4px; color: var(--c2-cyan); opacity: 0.3; }

        @media (max-width: 1280px) {
          .dashboard-layout { grid-template-columns: 1fr; }
          .left-column { max-width: 800px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 768px) {
          .dashboard-layout { padding: 80px 16px 24px; }
          .frost-title { font-size: 48px; }
          .sensor-readouts { flex-direction: column; gap: 20px; align-items: flex-start; }
          .s-sep { width: 100%; height: 1px; }
          .title-panel { padding: 32px 24px; }
        }
      `}</style>
    </main>
  );
}
