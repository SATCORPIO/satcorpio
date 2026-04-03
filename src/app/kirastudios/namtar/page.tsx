"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, AlertTriangle, Heart, Zap, Skull, Droplets, Shield, Radiation, Play, ChevronRight, FileText, Crosshair, Activity } from "lucide-react";
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
  return <>{shown}<span style={{ opacity: shown.length < text.length ? 1 : 0, color: "#D97706" }}>_</span></>;
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
        <Image src="/namtar_survival.png" alt="Namtar UI Background" fill priority style={{ objectFit: "cover" }} />
      </div>
      <div className="bg-vignette" />
      <div className="grid-overlay" />

      <nav className="tactical-nav">
        <Link href="/kirastudios" className="nav-btn">
          <ChevronLeft size={14} /> KI-RA HUB
        </Link>
      </nav>

      <div className="dashboard-layout">
        {/* TOP SECTION: HERO & HUD */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="threat-bar spatial-panel">
              <AlertTriangle size={12} className="pulse-icon" />
              <span>THREAT LEVEL: EXTREME — RADIATION ZONE ACTIVE</span>
            </div>

            <span className="genre-badge">// FUTURISTIC SURVIVAL RPG</span>

            <h1 className="namtar-title">NAMTAR</h1>
            <p className="tagline"><TypeWriter text="> SURVIVE THE UNNAMED." /></p>

            <p className="hero-desc">
              Year 2187. Seven city-states obliterated by cascading reactor failures.
              What remains is a toxic wasteland of pre-collapse technology, tribal
              warfare, and mutated ecosystems. Your survival starts now.
            </p>

            <div className="cta-row">
              <Link href="/kirastudios/namtar/namtarark" className="cta-primary">
                ENTER NAMTAR ARK <ChevronRight size={14} />
              </Link>
              <button className="cta-secondary">
                <Play size={14} /> PLAY ARCHIVE
              </button>
            </div>
          </div>

          {/* Survival HUD overlay */}
          <div className="survival-hud spatial-panel">
            <div className="panel-header">
              <Activity size={12} className="accent-icon" /> BIO-METRICS
            </div>
            <div className="hud-list">
              <div className="hud-stat">
                <Heart size={14} className="hud-icon alert" />
                <div className="hud-bar"><div className="hud-fill" style={{ width: "64%", background: "#EF4444" }} /></div>
                <span className="hud-val">64%</span>
              </div>
              <div className="hud-stat">
                <Zap size={14} className="hud-icon warn" />
                <div className="hud-bar"><div className="hud-fill" style={{ width: "45%", background: "#F59E0B" }} /></div>
                <span className="hud-val">45%</span>
              </div>
              <div className="hud-stat">
                <Radiation size={14} className="hud-icon safe" />
                <div className="hud-bar"><div className="hud-fill" style={{ width: "31%", background: "#84CC16" }} /></div>
                <span className="hud-val">31%</span>
              </div>
              <div className="hud-stat">
                <Droplets size={14} className="hud-icon info" />
                <div className="hud-bar"><div className="hud-fill" style={{ width: "58%", background: "#06B6D4" }} /></div>
                <span className="hud-val">58%</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION: STORY & FEATURES */}
        <section className="intel-section">
          <div className="story-panel spatial-panel">
            <div className="panel-header">
              <FileText size={12} className="accent-icon" /> NEXUS INCIDENT REPORT — CLASSIFIED
            </div>
            
            <div className="story-content">
              <h2 className="section-title">HUMANITY <span className="accent-word">FELL.</span></h2>
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
              <div className="stat-card">
                <span className="stat-num"><AnimatedStat value={7} /></span>
                <span className="stat-label">CITIES DESTROYED</span>
              </div>
              <div className="stat-card">
                <span className="stat-num"><AnimatedStat value={2187} /></span>
                <span className="stat-label">YEAR</span>
              </div>
              <div className="stat-card">
                <span className="stat-num"><AnimatedStat value={94} suffix="%" /></span>
                <span className="stat-label">EXTINCTION RATE</span>
              </div>
              <div className="stat-card">
                <span className="stat-num"><AnimatedStat value={64} /></span>
                <span className="stat-label">MAX PLAYERS</span>
              </div>
            </div>
          </div>

          <div className="features-grid">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="feature-card spatial-panel">
                  <Icon size={20} className="feature-icon" />
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <footer className="namtar-footer spatial-panel">
        <span>NAMTAR © {new Date().getFullYear()} — POST-COLLAPSE ARCHIVE</span>
        <span className="critical-text">CONNECTION UNSTABLE</span>
      </footer>

      <style jsx>{`
        .namtar {
          background: #0C0500;
          font-family: var(--font-mono);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .hero-bg { position: fixed; inset: 0; z-index: 0; opacity: 0.4; }
        .bg-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(circle at 70% 30%, transparent 10%, #0C0500 85%);
        }
        .grid-overlay {
          position: fixed; inset: 0; z-index: 1;
          background-image: 
            linear-gradient(rgba(217, 119, 6, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 119, 6, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .tactical-nav {
          position: fixed; top: 24px; left: 32px; z-index: 200;
        }
        .nav-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(217, 119, 6, 0.6);
          text-decoration: none; padding: 8px 16px; border-radius: 4px;
          border: 1px solid rgba(217, 119, 6, 0.1);
          background: rgba(12, 5, 0, 0.8); backdrop-filter: blur(8px);
          transition: all 200ms;
        }
        .nav-btn:hover { color: #FFF; border-color: rgba(217, 119, 6, 0.4); background: rgba(217, 119, 6, 0.1); }

        .spatial-panel {
          background: rgba(12, 5, 0, 0.7);
          border: 1px solid rgba(217, 119, 6, 0.08);
          border-radius: 6px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .dashboard-layout {
          position: relative; z-index: 10;
          padding: 100px 32px 40px;
          display: flex; flex-direction: column; gap: 40px;
          max-width: 1600px; margin: 0 auto; width: 100%;
          flex: 1;
        }

        /* ── HERO SECTION ── */
        .hero-section {
          display: flex; justify-content: space-between; align-items: center; gap: 40px;
        }
        .hero-content {
          flex: 1; display: flex; flex-direction: column; gap: 16px; max-width: 700px;
        }

        .threat-bar {
          display: flex; align-items: center; gap: 8px; width: fit-content;
          font-size: 9px; letter-spacing: 2px; color: #EF4444;
          padding: 8px 16px; border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.05);
        }
        .pulse-icon { animation: pulse-glow 2s infinite; }

        .genre-badge { font-size: 9px; letter-spacing: 4px; color: rgba(217, 119, 6, 0.6); }

        .namtar-title {
          font-family: var(--font-tactical);
          font-size: clamp(64px, 8vw, 110px); font-weight: 900; letter-spacing: 8px; line-height: 1;
          color: #D97706; text-shadow: 0 0 30px rgba(217, 119, 6, 0.4);
        }
        .tagline { font-size: 14px; letter-spacing: 4px; color: rgba(248, 250, 252, 0.7); min-height: 24px; }
        .hero-desc { font-size: 14px; line-height: 1.9; color: rgba(248, 250, 252, 0.4); }

        .cta-row { display: flex; gap: 12px; margin-top: 16px; }
        .cta-primary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 12px; letter-spacing: 2px; font-weight: 700;
          padding: 16px 32px; border-radius: 4px; border: none; cursor: pointer;
          background: #D97706; color: #0C0500; text-decoration: none; transition: all 200ms;
        }
        .cta-primary:hover { background: #F59E0B; box-shadow: 0 0 20px rgba(217, 119, 6, 0.4); }
        .cta-secondary {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-tactical); font-size: 12px; letter-spacing: 2px;
          padding: 16px 32px; border-radius: 4px; cursor: pointer;
          background: transparent; border: 1px solid rgba(217, 119, 6, 0.3); color: #D97706;
          transition: all 200ms;
        }
        .cta-secondary:hover { border-color: #D97706; background: rgba(217, 119, 6, 0.05); }

        .survival-hud { padding: 24px; width: 320px; flex-shrink: 0; }
        .panel-header {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(217, 119, 6, 0.6);
          padding-bottom: 12px; margin-bottom: 24px; border-bottom: 1px solid rgba(217, 119, 6, 0.1);
        }
        .accent-icon { color: #D97706; }
        
        .hud-list { display: flex; flex-direction: column; gap: 20px; }
        .hud-stat { display: flex; align-items: center; gap: 12px; }
        .hud-icon { filter: drop-shadow(0 0 4px currentColor); }
        .hud-icon.alert { color: #EF4444; }
        .hud-icon.warn { color: #F59E0B; }
        .hud-icon.safe { color: #84CC16; }
        .hud-icon.info { color: #06B6D4; }
        .hud-bar { flex: 1; height: 6px; background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(217, 119, 6, 0.2); border-radius: 2px; overflow: hidden; }
        .hud-fill { height: 100%; transition: width 1s ease; }
        .hud-val { font-family: var(--font-tactical); font-size: 13px; color: #FFF; min-width: 32px; text-align: right; }

        /* ── STORY & FEATURES ── */
        .intel-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

        .story-panel { padding: 40px; display: flex; flex-direction: column; }
        .story-content { margin-bottom: 40px; }
        .section-title {
          font-family: var(--font-tactical); font-size: 32px; font-weight: 800; letter-spacing: 3px;
          color: #FFF; margin-bottom: 20px; line-height: 1.2;
        }
        .accent-word { color: #D97706; text-shadow: 0 0 15px rgba(217, 119, 6, 0.5); }
        .section-desc { font-size: 13px; line-height: 1.8; color: rgba(248, 250, 252, 0.5); margin-bottom: 16px; }

        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: auto; }
        .stat-card {
          padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center;
          background: rgba(217, 119, 6, 0.05); border: 1px solid rgba(217, 119, 6, 0.1); border-radius: 4px;
        }
        .stat-num { font-family: var(--font-tactical); font-size: 28px; font-weight: 700; color: #D97706; margin-bottom: 4px; }
        .stat-label { font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.4); }

        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .feature-card { padding: 32px 24px; transition: all 200ms; }
        .feature-card:hover { border-color: rgba(217, 119, 6, 0.3); background: rgba(217, 119, 6, 0.05); }
        .feature-icon { color: #D97706; margin-bottom: 16px; filter: drop-shadow(0 0 6px rgba(217,119,6,0.4)); }
        .feature-title { font-family: var(--font-tactical); font-size: 13px; letter-spacing: 2px; color: #FFF; margin-bottom: 12px; }
        .feature-desc { font-size: 11px; line-height: 1.7; color: rgba(248, 250, 252, 0.4); }

        .namtar-footer {
          margin: 0 32px 24px; padding: 16px 24px;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 10px; letter-spacing: 2px; color: rgba(217, 119, 6, 0.4);
        }
        .critical-text { color: #EF4444; animation: pulse-glow 2s infinite; }

        @media (max-width: 1200px) {
          .hero-section { flex-direction: column; align-items: stretch; }
          .survival-hud { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .hud-list { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .intel-section { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .survival-hud { grid-template-columns: 1fr; padding: 16px; }
          .hud-list { grid-template-columns: 1fr; gap: 16px; }
          .stat-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .dashboard-layout { padding-left: 16px; padding-right: 16px; }
          .tactical-nav { left: 16px; }
        }
      `}</style>
    </main>
  );
}
