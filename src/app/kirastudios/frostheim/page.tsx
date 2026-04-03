"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Snowflake, Wind, Mountain, Swords, Map, Thermometer, Shield, Target, Play, ShieldAlert, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

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
  { id: "FH-01", name: "FROSTBACK REX", cls: "APEX PREDATOR", threat: 5, region: "GLACIAL PEAKS", desc: "40-foot carnivore with ice-hardened scales. The undisputed apex.", color: "#EF4444" },
  { id: "FH-02", name: "MAMMOTH", cls: "TAMEABLE HEAVY", threat: 3, region: "FROZEN TUNDRA", desc: "Essential for transport and heavy resource gathering.", color: "#34D399" },
  { id: "FH-03", name: "SABRETOOTH", cls: "PACK HUNTER", threat: 4, region: "SNOWFIELDS", desc: "Ambush predator that hunts in coordinated packs of 3-8.", color: "#F59E0B" },
  { id: "FH-04", name: "BLIZZARD WYVERN", cls: "BOSS / ALPHA", threat: 5, region: "SUMMIT NEST", desc: "Legendary dragon of the peaks. Generates localized ice storms.", color: "#7DD3FC" },
];

export default function FrostheimPage() {
  return (
    <main className="frost film-grain">
      {/* Immersive Background */}
      <div className="hero-bg">
        <Image src="/frostheim_viking.png" alt="Frostheim" fill priority style={{ objectFit: "cover" }} />
      </div>
      <div className="bg-vignette" />
      <div className="grid-overlay" />
      <SnowCanvas />

      <nav className="tactical-nav">
        <Link href="/kirastudios" className="nav-btn">
          <ChevronLeft size={14} /> KI-RA HUB
        </Link>
      </nav>

      <div className="dashboard-layout">
        {/* LEFT COLUMN: HERO & OVERVIEW */}
        <div className="left-column">
          <div className="title-panel spatial-panel">
            <div className="badge">
              <Snowflake size={10} className="pulse-icon" /> ASA: PROJECT FROSTHEIM
            </div>
            <h1 className="frost-title">
              FROST<span className="title-glow">HEIM</span>
            </h1>
            <p className="hero-desc">
              TACTICAL BRIEF: A Viking survival simulation generated in UE5. 
              Norse legends intersect with prehistoric apex predators. 
              The extreme climate protocol treats temperature as the primary hazard.
            </p>

            <div className="cta-grid">
              <button className="cta-primary">
                <ShieldAlert size={14} /> REQUEST ALPHA CLEARANCE
              </button>
              <button className="cta-secondary">
                <Play size={14} /> PLAY ARCHIVE FOOTAGE
              </button>
              
              <motion.a 
                href="https://discord.gg/R9Axsm7JfN"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-discord spatial-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <MessageSquare size={14} /> JOIN WAR-CHIEF DISCORD
              </motion.a>
            </div>
          </div>

          <div className="sensor-block spatial-panel">
            <div className="panel-header">
              <Wind size={14} className="accent-icon" />
              <span>ENVIRONMENTAL SENSORS</span>
            </div>
            <div className="sensor-readouts">
              <div className="s-box">
                <Thermometer size={20} className="s-icon" />
                <div className="s-data">
                  <span className="s-val">-47°C</span>
                  <span className="s-lbl">CORE TEMP</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-box">
                <Wind size={20} className="s-icon" />
                <div className="s-data">
                  <span className="s-val">84 KM/H</span>
                  <span className="s-lbl">WIND SHEAR</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-box">
                <Mountain size={20} className="s-icon" />
                <div className="s-data">
                  <span className="s-val">GLACIAL</span>
                  <span className="s-lbl">BIOME ID</span>
                </div>
              </div>
            </div>
          </div>

          <div className="features-block spatial-panel">
            <div className="panel-header">
              <Swords size={14} className="accent-icon" />
              <span>SURVIVAL PROTOCOLS</span>
            </div>
            <div className="feat-grid">
              {[
                { title: "NORSE CRAFTING", desc: "Forge legendary weapons from local alloys." },
                { title: "ICE CITADELS", desc: "Construct fortified glacial outposts." },
                { title: "PVE RAIDS", desc: "Assault 10-player subterranean dungeons." },
              ].map(f => (
                <div key={f.title} className="feat-card">
                  <span className="f-dot" />
                  <div>
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
          <div className="database-panel spatial-panel">
            <div className="panel-header">
              <Target size={14} className="accent-icon" />
              <span>ASSET DATABANK: FAUNA [LOCAL]</span>
            </div>
            
            <div className="db-table-wrapper">
              <table className="db-table">
                <thead>
                  <tr>
                    <th>ASSET ID</th>
                    <th>DESIGNATION</th>
                    <th>CLASS</th>
                    <th>THREAT LVL</th>
                    <th>REGION</th>
                  </tr>
                </thead>
                <tbody>
                  {creatures.map(c => (
                    <tr key={c.id}>
                      <td className="t-mono t-dim">{c.id}</td>
                      <td className="t-bold t-glow">{c.name}</td>
                      <td className="t-mono">{c.cls}</td>
                      <td>
                        <div className="threat-bar">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="threat-pip" style={{
                              background: i < c.threat ? c.color : "rgba(255,255,255,0.06)",
                              boxShadow: i < c.threat ? `0 0 5px ${c.color}66` : "none"
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
            
            <div className="db-scan-overlay" />
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
          background: #020B18;
          font-family: var(--font-mono);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-bg { position: fixed; inset: 0; z-index: 0; opacity: 0.5; }
        .bg-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(circle at 60% 50%, transparent 20%, #020B18 90%);
        }
        .grid-overlay {
          position: fixed; inset: 0; z-index: 1;
          background-image: 
            linear-gradient(rgba(125, 211, 252, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125, 211, 252, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .snow-canvas {
          position: fixed; inset: 0; z-index: 2;
          pointer-events: none;
        }

        .tactical-nav {
          position: fixed; top: 24px; left: 32px; z-index: 200;
        }
        .nav-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(125, 211, 252, 0.6);
          text-decoration: none; padding: 8px 16px; border-radius: 4px;
          border: 1px solid rgba(125, 211, 252, 0.1);
          background: rgba(2, 11, 24, 0.8); backdrop-filter: blur(8px);
          transition: all 200ms;
        }
        .nav-btn:hover { color: #7DD3FC; border-color: rgba(125, 211, 252, 0.4); background: rgba(125, 211, 252, 0.05); }

        .spatial-panel {
          background: rgba(4, 18, 38, 0.7);
          border: 1px solid rgba(125, 211, 252, 0.08);
          border-radius: 6px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .dashboard-layout {
          position: relative; z-index: 10;
          padding: 100px 32px 40px;
          display: grid; grid-template-columns: 480px 1fr;
          gap: 24px; max-width: 1600px; margin: 0 auto; width: 100%;
          flex: 1;
        }

        .left-column { display: flex; flex-direction: column; gap: 24px; }
        
        .title-panel { padding: 40px 32px; }
        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 8px; letter-spacing: 3px; color: rgba(125, 211, 252, 0.8);
          border: 1px solid rgba(125, 211, 252, 0.2); padding: 4px 12px;
          border-radius: 2px; background: rgba(125, 211, 252, 0.05);
          margin-bottom: 24px;
        }
        .pulse-icon { animation: pulse-glow 2s infinite; }

        .frost-title {
          font-family: var(--font-tactical);
          font-size: clamp(48px, 5vw, 64px);
          font-weight: 900; letter-spacing: 6px; line-height: 1;
          color: #E0F2FE; margin-bottom: 24px;
        }
        .title-glow { color: #7DD3FC; text-shadow: 0 0 30px rgba(125, 211, 252, 0.6); }

        .hero-desc {
          font-size: 13px; line-height: 1.8; color: rgba(125, 211, 252, 0.5);
          margin-bottom: 32px;
        }

        .cta-grid { display: flex; flex-direction: column; gap: 12px; }
        .cta-primary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 11px; letter-spacing: 2px; font-weight: 700;
          padding: 16px; border-radius: 4px; border: none; cursor: pointer;
          background: #7DD3FC; color: #020B18; transition: all 200ms;
        }
        .cta-primary:hover { background: #38BDF8; box-shadow: 0 0 20px rgba(125, 211, 252, 0.4); }
        .cta-secondary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 11px; letter-spacing: 2px;
          padding: 16px; border-radius: 4px; cursor: pointer;
          background: transparent; border: 1px solid rgba(125, 211, 252, 0.2); color: #7DD3FC;
          transition: all 200ms;
        }
        .cta-secondary:hover { border-color: rgba(125, 211, 252, 0.5); background: rgba(125, 211, 252, 0.05); }

        .cta-discord {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 11px; letter-spacing: 2px;
          padding: 16px; border-radius: 4px; text-decoration: none;
          background: rgba(125, 211, 252, 0.05); border: 1px solid rgba(125, 211, 252, 0.15); 
          color: #7DD3FC; transition: all 300ms;
        }
        .cta-discord:hover {
          background: rgba(125, 211, 252, 0.15); color: #FFF;
          border-color: #7DD3FC; box-shadow: 0 0 20px rgba(125, 211, 252, 0.3);
        }

        .panel-header {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(125, 211, 252, 0.5);
          padding-bottom: 16px; margin-bottom: 20px;
          border-bottom: 1px solid rgba(125, 211, 252, 0.08);
        }
        .accent-icon { color: #7DD3FC; }

        .sensor-block { padding: 24px 32px; }
        .sensor-readouts { display: flex; align-items: center; justify-content: space-between; }
        .s-box { display: flex; align-items: center; gap: 12px; }
        .s-icon { color: #38BDF8; filter: drop-shadow(0 0 6px rgba(56,189,248,0.4)); }
        .s-data { display: flex; flex-direction: column; }
        .s-val { font-family: var(--font-tactical); font-size: 18px; color: #E0F2FE; }
        .s-lbl { font-size: 8px; letter-spacing: 2px; color: rgba(125, 211, 252, 0.4); }
        .s-sep { width: 1px; height: 30px; background: rgba(125, 211, 252, 0.1); }

        .features-block { padding: 24px 32px; }
        .feat-grid { display: flex; flex-direction: column; gap: 16px; }
        .feat-card { display: flex; gap: 12px; align-items: flex-start; }
        .f-dot { margin-top: 5px; width: 4px; height: 4px; background: #7DD3FC; border-radius: 50%; box-shadow: 0 0 8px #7DD3FC; }
        .f-title { font-family: var(--font-tactical); font-size: 11px; letter-spacing: 2px; color: #E0F2FE; margin-bottom: 4px; }
        .f-desc { font-size: 11px; color: rgba(125, 211, 252, 0.4); line-height: 1.5; }

        .right-column { display: flex; flex-direction: column; }
        .database-panel { flex: 1; padding: 24px 32px; position: relative; overflow: hidden; }
        
        .db-table-wrapper { width: 100%; overflow-x: auto; position: relative; z-index: 2; }
        .db-table { width: 100%; border-collapse: collapse; text-align: left; }
        .db-table th {
          font-size: 9px; letter-spacing: 2px; color: rgba(125, 211, 252, 0.4);
          padding: 12px 16px; border-bottom: 1px solid rgba(125, 211, 252, 0.1);
          white-space: nowrap;
        }
        .db-table td {
          padding: 16px; border-bottom: 1px solid rgba(125, 211, 252, 0.05);
          font-size: 11px; color: rgba(255, 255, 255, 0.8);
        }
        .db-table tbody tr { transition: background 200ms; }
        .db-table tbody tr:hover { background: rgba(125, 211, 252, 0.05); }

        .t-mono { font-family: var(--font-mono); }
        .t-dim { color: rgba(125, 211, 252, 0.5); }
        .t-bold { font-weight: 700; letter-spacing: 1px; }
        .t-glow { color: #7DD3FC; text-shadow: 0 0 10px rgba(125, 211, 252, 0.3); }

        .threat-bar { display: flex; gap: 3px; }
        .threat-pip { width: 10px; height: 10px; border-radius: 2px; }
        .inline-icon { display: inline; position: relative; top: -1px; margin-right: 4px; opacity: 0.7; }

        .db-scan-overlay {
          position: absolute; left: 0; right: 0; top: 0; height: 100%;
          background: linear-gradient(180deg, transparent, rgba(125, 211, 252, 0.03) 50%, transparent);
          pointer-events: none; z-index: 10;
          animation: scan-vertical 4s linear infinite;
        }
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .frost-footer {
          margin: 0 32px 24px; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .copyright { font-size: 10px; letter-spacing: 2px; color: rgba(125, 211, 252, 0.3); }
        .rune-text { font-family: var(--font-tactical); font-size: 14px; letter-spacing: 3px; color: #7DD3FC; opacity: 0.3; }

        @media (max-width: 1200px) {
          .dashboard-layout { grid-template-columns: 1fr; }
          .left-column { max-width: 800px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 768px) {
          .sensor-readouts { flex-direction: column; gap: 16px; align-items: flex-start; }
          .s-sep { width: 100%; height: 1px; }
          .dashboard-layout { padding: 80px 16px 32px; gap: 20px; }
          .tactical-nav { left: 16px; top: 16px; }
          .db-table-wrapper { overflow-x: scroll; -webkit-overflow-scrolling: touch; }
          .frost-title { font-size: 48px; letter-spacing: 4px; }
          .title-panel { padding: 28px 20px; }
          .sensor-block { padding: 20px; }
          .features-block { padding: 20px; }
          .database-panel { padding: 20px; }
          .cta-grid { gap: 10px; }
          .cta-primary, .cta-secondary { font-size: 10px; padding: 14px; }
          .frost-footer { margin: 0 16px 16px; flex-direction: column; gap: 8px; text-align: center; }
          .rune-text { font-size: 10px; }
        }
        @media (max-width: 480px) {
          .dashboard-layout { padding: 70px 12px 24px; gap: 16px; }
          .tactical-nav { left: 12px; top: 12px; }
          .nav-btn { font-size: 9px; letter-spacing: 2px; padding: 6px 12px; }
          .frost-title { font-size: 36px; letter-spacing: 3px; }
          .hero-desc { font-size: 12px; line-height: 1.7; }
          .badge { font-size: 7px; letter-spacing: 2px; padding: 3px 10px; }
          .panel-header { font-size: 9px; letter-spacing: 2px; }
          .title-panel { padding: 24px 16px; }
          .s-val { font-size: 14px; }
          .s-lbl { font-size: 7px; }
          .s-icon { width: 16px; height: 16px; }
          .f-title { font-size: 10px; }
          .f-desc { font-size: 10px; }
          .db-table th { font-size: 8px; padding: 10px 12px; }
          .db-table td { padding: 12px; font-size: 10px; }
          .threat-pip { width: 8px; height: 8px; }
          .cta-primary, .cta-secondary { font-size: 9px; padding: 12px; }
          .frost-footer { margin: 0 10px 12px; padding: 12px 16px; }
          .copyright { font-size: 8px; }
          .rune-text { font-size: 10px; letter-spacing: 2px; }
        }
      `}</style>
    </main>
  );
}
