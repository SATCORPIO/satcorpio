"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronLeft, AlertTriangle, Heart, Zap, Skull, Droplets, Shield, 
  Radiation, Play, ChevronRight, FileText, Crosshair, Activity, 
  MessageSquare, Fingerprint, Layers, Cpu 
} from "lucide-react";
import { motion } from "framer-motion";

/* ═══ Animated Counter ═══ */
function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = value / 40;
    const id = setInterval(() => {
      n += step;
      if (n >= value) { setDisp(value); clearInterval(id); }
      else setDisp(Math.floor(n));
    }, 30);
    return () => clearInterval(id);
  }, [value]);
  return <span>{disp.toLocaleString()}{suffix}</span>;
}

/* ═══ Typing Effect ═══ */
function TypeWriter({ text, delay = 40 }: { text: string; delay?: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) { setShown(text.slice(0, i)); i++; }
      else clearInterval(id);
    }, delay);
    return () => clearInterval(id);
  }, [text, delay]);
  return <>{shown}<span style={{ opacity: shown.length < text.length ? 1 : 0, color: "var(--c2-cyan)" }}>_</span></>;
}

const features = [
  { icon: Crosshair, title: "HOSTILE WORLD", desc: "Every creature, faction, and weather event is designed to kill you. The wasteland owes you nothing." },
  { icon: Shield, title: "BASE BUILDING", desc: "Construct fortified shelters from scavenged materials. Defend against raids, radiation storms, and beasts." },
  { icon: Zap, title: "ANCIENT TECH", desc: "Discover pre-collapse technology buried in irradiated ruins. Decode the NAMTAR Protocol." },
  { icon: Heart, title: "SURVIVAL SYSTEMS", desc: "Manage hunger, thirst, radiation exposure, temperature, and disease. Every resource is critical." },
];

export default function NamtarPage() {
  return (
    <main className="namtar film-grain">
      {/* Immersive Background */}
      <div className="hero-bg">
        <Image 
          src="/namtar_abyssal_terminal.webp" 
          alt="Namtar Abyssal Terminal" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover" }} 
        />
      </div>
      <div className="bg-vignette" />
      <div className="noise-overlay" />
      <div className="scanline-overlay" />

      <nav className="tactical-nav">
        <Link href="/kirastudios" className="nav-btn spatial-panel">
          <ChevronLeft size={14} /> <span className="btn-text">RETURN TO HUB</span>
        </Link>
      </nav>

      <div className="dashboard-layout">
        {/* TOP SECTION: HERO & HUD */}
        <section className="hero-section">
          <div className="hero-content">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="threat-bar spatial-panel"
            >
              <AlertTriangle size={12} className="pulse-icon f-red" />
              <span>THREAT LEVEL: EXTREME // RADIATION ZONE ACTIVE</span>
            </motion.div>

            <span className="genre-badge">// FUTURISTIC SURVIVAL RPG_INTERFACE</span>

            <h1 className="namtar-title">NAMTAR</h1>
            <p className="tagline"><TypeWriter text="> SURVIVE THE UNNAMED." /></p>

            <p className="hero-desc">
              Year 2187. Seven city-states obliterated by cascading reactor failures.
              What remains is a toxic wasteland of pre-collapse technology, tribal
              warfare, and mutated ecosystems. Your survival starts now.
            </p>

            <div className="cta-row">
              <Link href="/kirastudios/namtar/namtarark" className="cta-primary btn-tactical">
                DEPLOY TO ARK <ChevronRight size={14} />
              </Link>
              <button className="cta-secondary spatial-panel">
                <Play size={14} /> ARCHIVE FOOTAGE
              </button>
              
              <motion.a 
                href="https://discord.gg/mypZpPsPeb"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-discord spatial-panel"
                whileHover={{ scale: 1.02 }}
              >
                <MessageSquare size={14} /> JOIN ABYSSAL CHAT
              </motion.a>
            </div>
          </div>

          {/* Survival HUD overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="survival-hud spatial-panel"
          >
            <div className="panel-header">
              <Activity size={12} className="accent-icon" /> BIO-METRICS MONITOR
            </div>
            <div className="hud-list">
              <div className="hud-stat">
                <Heart size={14} className="hud-icon f-red" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-red" style={{ width: "64%" }} />
                </div>
                <span className="hud-val">64%</span>
              </div>
              <div className="hud-stat">
                <Zap size={14} className="hud-icon f-amber" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-amber" style={{ width: "45%" }} />
                </div>
                <span className="hud-val">45%</span>
              </div>
              <div className="hud-stat">
                <Radiation size={14} className="hud-icon f-green" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-green" style={{ width: "31%" }} />
                </div>
                <span className="hud-val">31%</span>
              </div>
              <div className="hud-stat">
                <Droplets size={14} className="hud-icon f-cyan" />
                <div className="hud-bar-container">
                  <div className="hud-bar-fill bg-cyan" style={{ width: "58%" }} />
                </div>
                <span className="hud-val">58%</span>
              </div>
            </div>
            <div className="hud-footer">
              <Fingerprint size={10} strokeWidth={3} /> SYSTEM: STABLE_V4.2
            </div>
          </motion.div>
        </section>

        {/* BOTTOM SECTION: STORY & FEATURES */}
        <section className="intel-section">
          <div className="story-panel spatial-panel">
            <div className="panel-header">
              <FileText size={12} className="accent-icon" /> NEXUS INCIDENT REPORT // CLASSIFIED
            </div>
            
            <div className="story-content">
              <h2 className="section-title">HUMANITY <span className="accent-word">FELL_</span></h2>
              <p className="section-desc">
                The cascading failure started in Reactor Complex Omega. Within hours,
                a chain reaction consumed seven major city-states. The survivors were
                cast into a new dark age — armed with fragments of impossible technology
                and the primal will to endure.
              </p>
              <p className="section-desc">
                Now factions wage war over the ruins. Mutated predators stalk the
                wastes. And somewhere beneath the rubble, the NAMTAR Protocol awaits
                — a technology older than human civilization.
              </p>
            </div>

            <div className="stat-grid">
              <div className="stat-card spatial-panel">
                <span className="stat-num"><AnimatedStat value={7} /></span>
                <span className="stat-label">CITIES DESTROYED</span>
              </div>
              <div className="stat-card spatial-panel">
                <span className="stat-num"><AnimatedStat value={2187} /></span>
                <span className="stat-label">TIMELINE_YEAR</span>
              </div>
              <div className="stat-card spatial-panel">
                <span className="stat-num"><AnimatedStat value={94} suffix="%" /></span>
                <span className="stat-label">EXTINCTION RATE</span>
              </div>
              <div className="stat-card spatial-panel">
                <span className="stat-num"><AnimatedStat value={64} /></span>
                <span className="stat-label">PLAYER_CAP</span>
              </div>
            </div>
          </div>

          <div className="features-container">
             <div className="features-grid">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div 
                    key={f.title} 
                    className="feature-card spatial-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Icon size={20} className="feature-icon" />
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <div className="tech-layers spatial-panel">
               <div className="panel-header">
                <Layers size={12} /> INFRASTRUCTURE_DECODER
              </div>
              <div className="layer-list">
                <div className="layer-item"><Cpu size={12} /> NEURAL_LINK: ACTIVE</div>
                <div className="layer-item"><div className="dot" /> UE5_RENDERING: OPTIMIZED</div>
                <div className="layer-item"><div className="dot" /> ARCHIVE_INDEX: 4096-7</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="namtar-footer spatial-panel">
        <div className="f-left">NAMTAR // SURVIVAL RPG ARCHIVE © {new Date().getFullYear()}</div>
        <div className="f-right critical-text pulse-glow">RADIATION SPIKE DETECTED</div>
      </footer>

      <style jsx>{`
        .namtar {
          --c2-cyan: #00A8FF;
          --c2-green: #00FF41;
          --c2-red: #EF4444;
          --c2-amber: #F59E0B;
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
        .bg-image { filter: brightness(0.7) contrast(1.1); }
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
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 168, 255, 0.02) 50.1%);
          background-size: 100% 4px;
        }

        .tactical-nav {
          position: fixed; top: 24px; left: 32px; z-index: 200;
        }
        .nav-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 20px; text-decoration: none;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.6); transition: all 300ms;
        }
        .nav-btn:hover { color: var(--c2-cyan); border-color: var(--c2-cyan); }

        .dashboard-layout {
          position: relative; z-index: 10;
          padding: 100px 32px 40px;
          display: flex; flex-direction: column; gap: 48px;
          max-width: 1600px; margin: 0 auto; width: 100%;
          flex: 1;
        }

        .spatial-panel {
          background: var(--surface-neural);
          border: 1px solid var(--glass-border);
          border-radius: 4px;
          backdrop-filter: blur(32px) saturate(1.8);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
        }

        /* ── HERO SECTION ── */
        .hero-section {
          display: flex; justify-content: space-between; align-items: center; gap: 60px;
        }
        .hero-content { flex: 1; max-width: 800px; }

        .threat-bar {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 8px 16px; margin-bottom: 24px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
          color: var(--c2-red); border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.05);
        }
        .f-red { color: var(--c2-red); }
        .f-amber { color: var(--c2-amber); }
        .f-green { color: var(--c2-green); }
        .f-cyan { color: var(--c2-cyan); }

        .genre-badge { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 4px; color: rgba(255, 255, 255, 0.3); margin-bottom: 12px; }

        .namtar-title {
          font-family: var(--font-tactical);
          font-size: clamp(64px, 8vw, 120px); font-weight: 900; letter-spacing: -2px; line-height: 0.9;
          margin-bottom: 16px; background: linear-gradient(180deg, #FFF 0%, #AAA 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .tagline { font-family: var(--font-mono); font-size: 16px; letter-spacing: 4px; color: var(--c2-cyan); margin-bottom: 32px; min-height: 32px; }
        .hero-desc { font-size: 16px; line-height: 1.8; color: rgba(148, 163, 184, 0.8); margin-bottom: 40px; }

        .cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-tactical {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 32px; background: transparent; color: var(--c2-cyan);
          border: 1px solid rgba(0, 168, 255, 0.3); border-radius: 4px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; transition: all 300ms; text-decoration: none;
        }
        .btn-tactical:hover { background: rgba(0, 168, 255, 0.1); border-color: var(--c2-cyan); box-shadow: 0 0 20px rgba(0, 168, 255, 0.2); }

        .cta-secondary {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 32px; background: rgba(255, 255, 255, 0.03); color: #FFF;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          border-radius: 4px; cursor: pointer; transition: all 300ms; border: 1px solid transparent;
        }
        .cta-secondary:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2); }

        .cta-discord {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 24px; color: #FFF; text-decoration: none;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          background: rgba(0, 168, 255, 0.05); border-color: rgba(0, 168, 255, 0.2);
        }
        .cta-discord:hover { background: rgba(0, 168, 255, 0.15); border-color: var(--c2-cyan); }

        .survival-hud { width: 340px; padding: 32px; flex-shrink: 0; }
        .panel-header {
          display: flex; align-items: center; gap: 12px; margin-bottom: 32px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.4);
        }
        .accent-icon { color: var(--c2-cyan); }
        .hud-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px; }
        .hud-stat { display: flex; align-items: center; gap: 16px; }
        .hud-bar-container { flex: 1; height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; overflow: hidden; }
        .hud-bar-fill { height: 100%; border-radius: 2px; }
        .bg-red { background: var(--c2-red); box-shadow: 0 0 10px var(--c2-red); }
        .bg-amber { background: var(--c2-amber); box-shadow: 0 0 10px var(--c2-amber); }
        .bg-green { background: var(--c2-green); box-shadow: 0 0 10px var(--c2-green); }
        .bg-cyan { background: var(--c2-cyan); box-shadow: 0 0 10px var(--c2-cyan); }
        .hud-val { font-family: var(--font-tactical); font-size: 14px; font-weight: 700; min-width: 45px; text-align: right; }
        .hud-footer { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); display: flex; align-items: center; gap: 8px; }

        /* ── INTEL SECTION ── */
        .intel-section { display: grid; grid-template-columns: 1fr 400px; gap: 24px; }

        .story-panel { padding: 48px; }
        .story-content { margin-bottom: 48px; }
        .section-title {
          font-family: var(--font-tactical); font-size: 32px; font-weight: 800; letter-spacing: 4px;
          margin-bottom: 24px; color: #FFF;
        }
        .accent-word { color: var(--c2-cyan); text-shadow: 0 0 15px rgba(0, 168, 255, 0.5); }
        .section-desc { font-size: 14px; line-height: 2; color: rgba(148, 163, 184, 0.6); margin-bottom: 20px; }

        .stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .stat-card { padding: 32px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .stat-num { font-family: var(--font-tactical); font-size: 32px; font-weight: 900; color: #FFF; margin-bottom: 8px; }
        .stat-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 3px; color: rgba(255, 255, 255, 0.3); }

        .features-container { display: flex; flex-direction: column; gap: 24px; }
        .features-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .feature-card { padding: 32px; transition: all 300ms; }
        .feature-card:hover { border-color: var(--c2-cyan); background: rgba(0, 168, 255, 0.05); }
        .feature-icon { color: var(--c2-cyan); margin-bottom: 20px; filter: drop-shadow(0 0 8px rgba(0, 168, 255, 0.4)); }
        .feature-title { font-family: var(--font-tactical); font-size: 14px; letter-spacing: 2px; color: #FFF; margin-bottom: 12px; }
        .feature-desc { font-size: 12px; line-height: 1.8; color: rgba(255, 255, 255, 0.4); }

        .tech-layers { padding: 32px; }
        .layer-list { display: flex; flex-direction: column; gap: 16px; }
        .layer-item {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3);
        }
        .dot { width: 4px; height: 4px; background: var(--c2-cyan); border-radius: 50%; box-shadow: 0 0 6px var(--c2-cyan); }

        .namtar-footer {
          margin: 40px 32px 32px; padding: 24px 32px;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3);
        }
        .critical-text { color: var(--c2-red); font-weight: 700; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-glow { animation: pulse-glow 2s infinite; }

        @media (max-width: 1280px) {
          .intel-section { grid-template-columns: 1fr; }
          .hero-section { flex-direction: column; text-align: center; gap: 40px; }
          .hero-content { max-width: 100%; display: flex; flex-direction: column; align-items: center; }
          .threat-bar { margin: 0 auto 24px; }
          .cta-row { justify-content: center; }
          .survival-hud { width: 100%; max-width: 600px; display: grid; grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .dashboard-layout { padding: 80px 16px 24px; gap: 32px; }
          .namtar-title { font-size: 48px; }
          .section-title { font-size: 24px; }
          .story-panel { padding: 32px 24px; }
          .stat-grid { grid-template-columns: 1fr; }
          .namtar-footer { flex-direction: column; gap: 16px; text-align: center; margin: 24px 16px; }
        }
      `}</style>
    </main>
  );
}
