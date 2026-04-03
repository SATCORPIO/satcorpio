"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Flame, AlertOctagon, Eye, Skull, Zap, Shield, Play, ChevronRight, Activity, Terminal, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

/* ═══ Ember Canvas ═══ */
function EmberCanvas() {
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

    interface Ember { x: number; y: number; dx: number; dy: number; r: number; o: number; life: number }
    const embers: Ember[] = [];
    function spawn() {
      embers.push({
        x: Math.random() * canvas!.width * 0.6 + canvas!.width * 0.2,
        y: canvas!.height + 5,
        dx: (Math.random() - 0.5) * 0.8,
        dy: -(1 + Math.random() * 2.5),
        r: 1 + Math.random() * 2,
        o: 0.6 + Math.random() * 0.4,
        life: 100 + Math.random() * 200,
      });
    }

    function draw() {
      const isMobile = window.innerWidth <= 768;
      const spawnFrequency = isMobile ? 0.925 : 0.85;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      if (Math.random() > spawnFrequency) spawn();
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.dx;
        e.y += e.dy;
        e.life--;
        e.o *= 0.995;
        if (e.life <= 0 || e.o <= 0.01) { embers.splice(i, 1); continue; }
        const g = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 2);
        g.addColorStop(0, `rgba(255,69,0,${e.o})`);
        g.addColorStop(0.5, `rgba(255,0,0,${e.o * 0.5})`);
        g.addColorStop(1, `rgba(0,0,0,0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r * 2, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="ember-canvas" />;
}

/* ═══ Counter ═══ */
function SoulCounter({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = target / 50;
    const id = setInterval(() => {
      n += step;
      if (n >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(n));
    }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <span>{val.toLocaleString()}</span>;
}

const bestiary = [
  { id: "01", name: "THE PRIMORDIAL", class: "GOD-TIER [REDACTED]", status: "SEALED", threat: 10, color: "#8B5CF6", desc: "Ancient deity at the core. Energy readings indicate local reality distortion. Currently bound by failing containment seals." },
  { id: "02", name: "BONE COLOSSUS", class: "SIEGE WEAPON", status: "ACTIVE", threat: 8, color: "#C9A84C", desc: "200-foot construct of fused remains. Tactical priority: Evade. Guards the inner sanctum approaches." },
  { id: "03", name: "LAVA DRAKE", class: "AERIAL / AQUATIC", status: "ROAMING", threat: 7, color: "#FF4500", desc: "Serpentine apex predator utilizing molten currents. Exothermic breath weapon melts standard durasteel." },
  { id: "04", name: "SHADOW WRAITH", class: "INCORPOREAL", status: "DORMANT", threat: 9, color: "#8B5CF6", desc: "Anomalous entity. Drains bio-electrical fields on contact. Kinetic weapons ineffective." },
  { id: "05", name: "CORRUPTION SPAWN", class: "SWARM", status: "HOSTILE", threat: 4, color: "#EF4444", desc: "Aggressive bioweeding mechanism. Overwhelming numbers. Engage at range." },
];

export default function DysunsRealmPage() {
  const [warning, setWarning] = useState(true);

  return (
    <main className="dysun film-grain">
      {/* Immersive Background */}
      <div className="hero-bg">
        <Image src="/dysuns_dark.png" alt="Dysun's Realm Background" fill priority style={{ objectFit: "cover" }} />
      </div>
      <div className="bg-vignette" />
      <div className="grid-overlay" />
      <EmberCanvas />

      {warning && (
        <div className="warning-strip">
          <AlertOctagon size={12} className="pulse-icon" />
          <span>ALERT: YOU ARE MONITORING DYSUN&apos;S REALM — CONTAINMENT INTEGRITY FAILING</span>
          <button onClick={() => setWarning(false)} className="warn-close" aria-label="Dismiss">[ACKNOWLEDGE]</button>
        </div>
      )}

      <nav className="tactical-nav" style={{ top: warning ? 48 : 24 }}>
        <Link href="/kirastudios" className="nav-btn">
          <ChevronLeft size={14} /> KI-RA HUB
        </Link>
      </nav>

      <div className="dashboard-layout">
        {/* LEFT COLUMN: TELEMETRY & HERO */}
        <div className="telemetry-panel spatial-panel">
          <div className="telemetry-header">
            <Flame size={14} className="accent-icon" />
            <span className="telemetry-title">EXPANSION PROTOCOL</span>
            <span className="telemetry-id">NMS-001</span>
          </div>

          <h1 className="dysun-title">
            DYSUN&apos;S
            <br />
            <span className="realm-text">REALM</span>
          </h1>

          <p className="hero-desc">
            CLASSIFIED LOG: Descend into the domain of the Primal Nemesis. A world of primordial corruption where rivers of magma carve through fossilized cathedrals. Containment breaches detected.
          </p>

          <div className="gauge-container">
            <div className="gauge-header">
              <span className="gauge-label">GLOBAL CORRUPTION INDEX</span>
              <span className="gauge-val critical">84.2% [CRITICAL]</span>
            </div>
            <div className="gauge-track">
              <motion.div 
                className="gauge-fill"
                initial={{ width: 0 }}
                animate={{ width: "84.2%" }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />
              <div className="gauge-markers">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="cta-grid">
            <Link href="/kirastudios/dysunsrealm/dysunsark" className="cta-primary">
              <Activity size={14} /> INITIALIZE ARK SERVERS
            </Link>
            <button className="cta-secondary">
              <Terminal size={14} /> READ DATALOGS
            </button>
            
            <motion.a 
              href="https://discord.gg/ka2zXPMUJG"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-btn spatial-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <MessageSquare size={14} />
              <span>JOIN INFERNAL DISCORD</span>
            </motion.a>
          </div>
        </div>

        {/* RIGHT COLUMN: STATS & BESTIARY */}
        <div className="data-column">
          <div className="data-row">
            <div className="stat-card spatial-panel">
              <span className="stat-value"><SoulCounter target={147382} /></span>
              <span className="stat-label">SOULS CONSUMED</span>
            </div>
            <div className="stat-card spatial-panel">
              <span className="stat-value"><SoulCounter target={7} /></span>
              <span className="stat-label">REALMS CORRUPTED</span>
            </div>
            <div className="stat-card spatial-panel">
              <span className="stat-value"><SoulCounter target={50} />K+</span>
              <span className="stat-label">YEARS SEALED</span>
            </div>
          </div>

          <div className="database-panel spatial-panel">
            <div className="db-header">
              <Eye size={12} className="accent-icon" />
              <span>THREAT ENTITY DATABASE</span>
            </div>
            <div className="db-list">
              {bestiary.map((b) => (
                <div key={b.id} className="target-row group">
                  <div className="target-id">{b.id}</div>
                  <div className="target-info">
                    <div className="target-header">
                      <span className="target-name">{b.name}</span>
                      <span className="target-threat" style={{ color: b.color }}>
                        CLASS: {b.class} | LVL {b.threat}
                      </span>
                    </div>
                    <p className="target-desc">{b.desc}</p>
                  </div>
                  <div className="target-status">
                    <span className="status-dot" style={{ background: b.color }} />
                    {b.status}
                  </div>
                  <div className="scan-line" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="dysun-footer spatial-panel">
        <div className="footer-content">
          <span>DYSUN'S REALM © {new Date().getFullYear()} — KI-RA STUDIOS // OPERATION COMMAND</span>
          <span className="critical">THE NEMESIS STIRS.</span>
        </div>
      </footer>

      <style jsx>{`
        .dysun {
          background: #050506;
          font-family: var(--font-mono);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-bg { position: fixed; inset: 0; z-index: 0; opacity: 0.6; }
        .bg-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(circle at 50% 50%, transparent 20%, #050506 90%);
        }
        .grid-overlay {
          position: fixed; inset: 0; z-index: 1;
          background-image: 
            linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .ember-canvas { position: fixed; inset: 0; z-index: 2; pointer-events: none; }

        .warning-strip {
          position: fixed; top: 0; left: 0; right: 0; z-index: 300;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 8px 24px;
          background: rgba(255, 69, 0, 0.1);
          border-bottom: 1px solid rgba(255, 69, 0, 0.5);
          font-size: 10px; letter-spacing: 2px; color: #FF4500;
          backdrop-filter: blur(12px);
        }
        .pulse-icon { animation: pulse-glow 2s infinite; }
        .warn-close {
          margin-left: auto; background: none; border: none;
          color: rgba(255, 69, 0, 0.6); cursor: pointer; font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 1px; transition: color 200ms;
        }
        .warn-close:hover { color: #FF4500; }

        .tactical-nav {
          position: fixed; left: 32px; z-index: 200;
          transition: top 300ms;
        }
        .nav-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(255, 255, 255, 0.6);
          text-decoration: none; padding: 8px 16px; border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 12, 0.8); backdrop-filter: blur(8px);
          transition: all 200ms;
        }
        .nav-btn:hover { color: #FFF; border-color: rgba(255, 69, 0, 0.4); background: rgba(255, 69, 0, 0.05); }

        .dashboard-layout {
          position: relative; z-index: 10;
          padding: 100px 32px 40px;
          display: grid; grid-template-columns: 420px 1fr;
          gap: 24px; max-width: 1600px; margin: 0 auto; width: 100%;
          flex: 1;
        }

        .spatial-panel {
          background: rgba(10, 10, 12, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .telemetry-panel { padding: 40px 32px; display: flex; flex-direction: column; }
        
        .telemetry-header {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(255, 255, 255, 0.4);
          margin-bottom: 32px;
        }
        .accent-icon { color: #FF4500; }
        .telemetry-title { flex: 1; }
        .telemetry-id { color: rgba(255, 69, 0, 0.6); }

        .dysun-title {
          font-family: var(--font-tactical);
          font-size: clamp(48px, 4vw, 72px);
          font-weight: 800; letter-spacing: 4px;
          line-height: 1.1; margin-bottom: 24px;
          color: #E2E8F0;
        }
        .realm-text { color: #FF4500; text-shadow: 0 0 20px rgba(255, 69, 0, 0.4); }

        .hero-desc {
          font-size: 13px; line-height: 1.8; color: rgba(255, 255, 255, 0.5);
          margin-bottom: 40px;
        }

        .gauge-container { margin-bottom: 40px; }
        .gauge-header {
          display: flex; justify-content: space-between; margin-bottom: 12px;
          font-size: 10px; letter-spacing: 2px;
        }
        .gauge-label { color: rgba(255, 255, 255, 0.5); }
        .critical { color: #FF4500; font-weight: 700; text-shadow: 0 0 10px rgba(255, 69, 0, 0.5); }
        .gauge-track {
          height: 12px; background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 69, 0, 0.2); border-radius: 2px;
          position: relative; overflow: hidden;
        }
        .gauge-fill {
          height: 100%; background: linear-gradient(90deg, #8B0000, #FF4500);
          border-right: 2px solid #FFF;
          box-shadow: 0 0 15px #FF4500;
        }
        .gauge-markers {
          position: absolute; inset: 0; display: flex; justify-content: space-between;
          padding: 0 4px; pointer-events: none;
        }
        .gauge-markers span {
          width: 1px; height: 100%; background: rgba(255, 255, 255, 0.1);
          color: transparent; /* hide text, just lines */
        }

        .cta-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: auto; }
        .cta-primary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 12px; letter-spacing: 2px; font-weight: 700;
          padding: 16px; border-radius: 4px; text-decoration: none;
          background: rgba(255, 69, 0, 0.1); border: 1px solid #FF4500; color: #FF4500;
          transition: all 200ms;
        }
        .cta-primary:hover { background: rgba(255, 69, 0, 0.2); box-shadow: 0 0 20px rgba(255, 69, 0, 0.3); }
        
        .cta-secondary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 12px; letter-spacing: 2px;
          padding: 16px; border-radius: 4px; cursor: pointer;
          background: transparent; border: 1px solid rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.6);
          transition: all 200ms;
        }
        .cta-secondary:hover { border-color: rgba(255, 255, 255, 0.3); color: #FFF; background: rgba(255, 255, 255, 0.02); }

        .discord-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          border-radius: 4px;
          text-decoration: none;
          color: #FF4500;
          font-family: var(--font-tactical);
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          border-color: rgba(255, 69, 0, 0.2);
          background: rgba(255, 69, 0, 0.05);
          transition: all 300ms;
        }
        .discord-btn:hover {
          color: #FFF;
          background: rgba(255, 69, 0, 0.2);
          border-color: #FF4500;
          box-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
        }

        .data-column { display: flex; flex-direction: column; gap: 24px; }
        
        .data-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .stat-card {
          padding: 32px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; border-color: rgba(255, 69, 0, 0.1);
        }
        .stat-value {
          font-family: var(--font-tactical); font-size: 36px; font-weight: 800;
          color: #C9A84C; text-shadow: 0 0 20px rgba(201, 168, 76, 0.3);
          margin-bottom: 8px;
        }
        .stat-label { font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.4); }

        .database-panel { flex: 1; display: flex; flex-direction: column; padding: 32px; border-color: rgba(255, 69, 0, 0.1); }
        .db-header {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 3px; color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .db-list { display: flex; flex-direction: column; gap: 8px; }
        
        .target-row {
          position: relative; display: grid; grid-template-columns: 40px 1fr 100px; gap: 24px;
          padding: 20px 24px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px; overflow: hidden; transition: all 300ms;
        }
        .target-row:hover { background: rgba(255, 69, 0, 0.05); border-color: rgba(255, 69, 0, 0.2); }
        
        .target-id { font-size: 12px; color: rgba(255, 255, 255, 0.2); font-weight: 700; }
        .target-info { display: flex; flex-direction: column; gap: 8px; }
        .target-header { display: flex; align-items: center; gap: 16px; }
        .target-name { font-family: var(--font-tactical); font-size: 15px; letter-spacing: 2px; color: #FFF; }
        .target-threat { font-size: 10px; letter-spacing: 1px; font-weight: 700; opacity: 0.8; }
        .target-desc { font-size: 12px; line-height: 1.6; color: rgba(255, 255, 255, 0.4); max-width: 600px; }
        
        .target-status {
          display: flex; align-items: center; justify-content: flex-end; gap: 8px;
          font-size: 10px; letter-spacing: 1px; color: rgba(255, 255, 255, 0.6);
        }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 10px currentColor; }
        
        .scan-line {
          position: absolute; left: 0; right: 0; top: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 69, 0, 0.5), transparent);
          opacity: 0; transform: translateY(-100%);
        }
        .target-row:hover .scan-line {
          animation: scan 1.5s linear infinite; opacity: 1;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(80px); }
        }

        .dysun-footer {
          margin: 0 32px 24px; padding: 16px 24px;
          border-color: rgba(255, 69, 0, 0.2); background: rgba(10, 10, 12, 0.9);
        }
        .footer-content {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 1200px) {
          .dashboard-layout { grid-template-columns: 1fr; }
          .telemetry-panel { max-width: 800px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 768px) {
          .data-row { grid-template-columns: 1fr 1fr; }
          .target-row { grid-template-columns: 1fr; gap: 12px; }
          .target-status { justify-content: flex-start; }
          .dashboard-layout { padding: 80px 16px 32px; gap: 20px; }
          .tactical-nav { left: 16px; }
          .dysun-title { font-size: 40px; letter-spacing: 3px; }
          .telemetry-panel { padding: 28px 20px; }
          .database-panel { padding: 24px 16px; }
          .cta-grid { gap: 10px; }
          .cta-primary, .cta-secondary { font-size: 11px; padding: 14px; }
          .warning-strip { font-size: 9px; padding: 8px 16px; gap: 8px; flex-wrap: wrap; }
          .dysun-footer { margin: 0 16px 16px; }
          .footer-content { flex-direction: column; gap: 8px; text-align: center; }
          .stat-value { font-size: 28px; }
          .stat-card { padding: 24px 16px; }
        }
        @media (max-width: 480px) {
          .dashboard-layout { padding: 70px 12px 24px; gap: 16px; }
          .tactical-nav { left: 12px; }
          .nav-btn { font-size: 9px; letter-spacing: 2px; padding: 6px 12px; }
          .dysun-title { font-size: 32px; letter-spacing: 2px; }
          .realm-text { font-size: inherit; }
          .hero-desc { font-size: 12px; line-height: 1.7; }
          .telemetry-panel { padding: 24px 16px; }
          .telemetry-header { font-size: 9px; letter-spacing: 2px; margin-bottom: 24px; }
          .data-row { grid-template-columns: 1fr; gap: 12px; }
          .stat-value { font-size: 24px; }
          .stat-label { font-size: 9px; }
          .stat-card { padding: 20px 12px; }
          .database-panel { padding: 20px 12px; }
          .db-header { font-size: 10px; letter-spacing: 2px; margin-bottom: 16px; padding-bottom: 12px; }
          .target-row { padding: 16px; gap: 8px; }
          .target-name { font-size: 13px; }
          .target-threat { font-size: 9px; }
          .target-desc { font-size: 11px; }
          .target-header { flex-direction: column; gap: 6px; }
          .gauge-header { font-size: 9px; }
          .gauge-track { height: 10px; }
          .cta-primary, .cta-secondary { font-size: 10px; padding: 12px; }
          .warning-strip { font-size: 8px; padding: 6px 12px; }
          .warn-close { font-size: 9px; }
          .dysun-footer { margin: 0 10px 12px; padding: 12px 16px; }
          .footer-content { font-size: 9px; }
        }
      `}</style>
    </main>
  );
}
