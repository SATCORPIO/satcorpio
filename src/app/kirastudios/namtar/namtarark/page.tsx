"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, Server, Activity, Users, Shield, Cpu, Database, 
  AlertCircle, MapPin, Radio, Wifi, Radiation, MessageSquare, 
  Zap, Fingerprint, ExternalLink 
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

function RaidSimulation() {
  const [raids, setRaids] = useState<{ id: string; target: string; intensity: number; attackers: number }[]>([]);

  useEffect(() => {
    const locations = ["SECTOR-7 SLUMS", "ABANDONED SILO", "CRATER LAKE", "RADIATION ZONE B", "RUINED OVERPASS"];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setRaids(prev => {
          const newRaid = {
            id: `ACT-${Math.floor(Math.random() * 9000) + 1000}`,
            target: locations[Math.floor(Math.random() * locations.length)],
            intensity: Math.floor(Math.random() * 100),
            attackers: Math.floor(Math.random() * 40) + 5
          };
          const next = [newRaid, ...prev].slice(0, 4);
          return next;
        });
      }
    }, 3000);

    setRaids([
      { id: "ACT-4021", target: "SECTOR-7 SLUMS", intensity: 84, attackers: 23 },
      { id: "ACT-2199", target: "CRATER LAKE", intensity: 41, attackers: 8 }
    ]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="raid-sim">
      <div className="sim-header">
        <AlertCircle size={12} className="pulse-icon f-red" />
        <span>ACTIVE RAID DETECTIONS</span>
      </div>
      <div className="raid-list">
        {raids.map(r => (
          <motion.div 
            key={r.id} 
            className="raid-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="r-left">
              <span className="r-id">{r.id}</span>
              <span className="r-target">{r.target}</span>
            </div>
            <div className="r-right">
              <span className="r-att"><Users size={10} style={{ display: "inline", marginRight: "4px" }} />{r.attackers} HOSTILES</span>
              <div className="r-intensity-bar">
                <div className="r-fill" style={{ width: `${r.intensity}%`, background: r.intensity > 70 ? "var(--c2-red)" : "var(--c2-amber)" }} />
              </div>
            </div>
          </motion.div>
        ))}
        {raids.length === 0 && <div className="no-raids">NO ACTIVE RAIDS DETECTED</div>}
      </div>

       <style jsx>{`
        .raid-sim { font-family: var(--font-mono); }
        .sim-header { display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 2px; color: var(--c2-red); margin-bottom: 24px; font-weight: 700; }
        .raid-list { display: flex; flex-direction: column; gap: 8px; }
        .raid-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(239, 68, 68, 0.05); border-left: 2px solid var(--c2-red); border-radius: 0 4px 4px 0; }
        .r-left { display: flex; flex-direction: column; gap: 4px; }
        .r-id { font-size: 9px; color: rgba(239, 68, 68, 0.7); letter-spacing: 1px; }
        .r-target { font-size: 11px; color: #FFF; font-weight: 700; letter-spacing: 1px; }
        .r-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; width: 120px; }
        .r-att { font-size: 9px; color: rgba(255, 255, 255, 0.4); }
        .r-intensity-bar { width: 100%; height: 2px; background: rgba(0, 0, 0, 0.5); border-radius: 1px; overflow: hidden; }
        .r-fill { height: 100%; transition: width 0.5s ease; }
        .no-raids { font-size: 11px; color: rgba(255, 255, 255, 0.2); letter-spacing: 2px; text-align: center; padding: 20px; }
        .f-red { color: var(--c2-red); }
      `}</style>
    </div>
  );
}

export default function NamtarArkPage() {
  return (
    <main className="namtar-ark film-grain">
      {/* Immersive Background */}
      <div className="telemetry-bg">
        <Image 
          src="/namtar_survival.png" 
          alt="Namtar Survival Protocol" 
          fill 
          priority 
          className="bg-image"
          style={{ objectFit: "cover", filter: "brightness(0.5) contrast(1.2)" }}
        />
        <div className="radial-glow" />
        <div className="noise-overlay" />
      </div>

      <nav className="tactical-nav">
        <Link href="/kirastudios/namtar" className="nav-btn spatial-panel">
          <ChevronLeft size={14} /> <span className="btn-text">NAMTAR SURVIVAL HQ</span>
        </Link>
      </nav>

      <div className="hub-container">
        <header className="hub-header spatial-panel">
          <div className="badge-neural">
            <Server size={10} className="pulse-icon f-cyan" /> 
            <span className="badge-text">INFRASTRUCTURE LAYER // ASA_HOSTING</span>
          </div>
          
          <div className="header-titles">
            <div className="status-badge">RESERVE_STATUS: ACTIVE</div>
            <h1 className="title">NAMTAR CLUSTER</h1>
            <p className="subtitle">ASA DEDICATED HOSTING // COMING SOON</p>
          </div>

          <div className="status-indicator">
            <Shield size={16} className="active-icon" />
            <div className="status-text">
              <span className="st-main">DDOS SHIELD ACTIVE</span>
              <span className="st-sub">Traffic securely routed through SATCORP</span>
            </div>
          </div>
          
          <motion.a 
            href="https://discord.gg/mypZpPsPeb"
            target="_blank"
            rel="noopener noreferrer"
            className="discord-btn spatial-panel"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare size={14} />
            <span>JOIN FACTION</span>
          </motion.a>
        </header>

        <div className="dashboard-grid">
          {/* ADVERTISEMENT PANEL */}
          <div className="ad-box spatial-panel">
            <div className="ad-content">
              <div className="ad-header">
                <Radio size={14} className="f-cyan" />
                <span className="ad-tag">DEPLOYMENT NOTICE</span>
              </div>
              <h2 className="ad-title">HIGH-PERFORMANCE ASA SERVERS</h2>
              <p className="ad-desc">
                The Namtar Ark cluster is currently undergoing stress testing. 
                Dedicated 128hz tick-rate hosting with extreme survival parameters.
              </p>
              <div className="ad-cta">
                <button className="btn-tactical">NOTIFY ON DEPLOYMENT</button>
                <div className="eta">ESTIMATED ETA: Q3 2026</div>
              </div>
            </div>
             <div className="ad-visual">
                <Cpu size={80} className="f-cyan-o" />
                <div className="data-pips">
                   <div className="pip" />
                   <div className="pip" />
                   <div className="pip" />
                </div>
             </div>
          </div>

          {/* Main Server Specs */}
          <div className="main-specs spatial-panel">
            <h3 className="panel-title"><Cpu size={14} /> PROJECTED HARDWARE METRICS</h3>
            <div className="spec-readouts">
              <div className="s-readout">
                <Cpu size={24} className="sr-icon" />
                <div className="sr-data">
                  <span className="sr-val">128hz</span>
                  <span className="sr-lbl">TICK RATE</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-readout">
                <Database size={24} className="sr-icon" />
                <div className="sr-data">
                  <span className="sr-val">NVME GEN5</span>
                  <span className="sr-lbl">STORAGE LAYER</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-readout">
                <Wifi size={24} className="sr-icon" />
                <div className="sr-data">
                  <span className="sr-val">ASA</span>
                  <span className="sr-lbl">CROSS-PLAY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Radiation Zones - Specific to Namtar */}
          <div className="radiations-panel spatial-panel">
            <h3 className="panel-title"><Radiation size={14} /> TOXICITY ZONES // LIVE DATA</h3>
            <div className="zone-grid">
              {[
                { name: "CRATER ZERO", rad: "7.4 THz", cap: "LETHAL", color: "var(--c2-red)" },
                { name: "WASTELAND EDGE", rad: "1.2 THz", cap: "WARNING", color: "var(--c2-amber)" },
                { name: "UNDERGROUND BUNKER", rad: "0.1 THz", cap: "SAFE", color: "var(--c2-green)" }
              ].map(z => (
                <div key={z.name} className="zone-card">
                  <MapPin size={12} style={{ color: z.color }} />
                  <div className="z-info">
                    <span className="z-name">{z.name}</span>
                    <span className="z-rad">{z.rad}</span>
                  </div>
                  <span className="z-cap" style={{ color: z.color }}>{z.cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RAID SIMULATION */}
          <div className="raid-panel spatial-panel">
            <RaidSimulation />
          </div>

          {/* Cross-play Nodes */}
          <div className="nodes-panel spatial-panel">
            <h3 className="panel-title"><Wifi size={14} /> NETWORK BACKBONE</h3>
            <div className="node-list">
              <div className="node-item">
                <div className="node-icon online" />
                <span className="ni-name">STEAM GLOBAL</span>
                <span className="ni-ping">4ms</span>
              </div>
              <div className="node-item">
                <div className="node-icon online" />
                <span className="ni-name">XBOX NETWORK</span>
                <span className="ni-ping">12ms</span>
              </div>
              <div className="node-item">
                <div className="node-icon online" />
                <span className="ni-name">PSN GATEWAY</span>
                <span className="ni-ping">18ms</span>
              </div>
            </div>
          </div>
          
          {/* System Info */}
          <div className="system-panel spatial-panel">
            <h3 className="panel-title"><Fingerprint size={14} /> COMMANDER AUTH</h3>
             <div className="sys-items">
                <div className="sys-item">
                    <span className="si-lbl">ENCRYPTION</span>
                    <span className="si-val f-cyan">AES-256</span>
                </div>
                <div className="sys-item">
                    <span className="si-lbl">VERSION</span>
                    <span className="si-val">NMT_v4.2.1</span>
                </div>
                <div className="sys-item">
                    <Link href="/kirastudios/namtar" className="si-link">
                        VIEW BRIEFING <ExternalLink size={10} />
                    </Link>
                </div>
             </div>
          </div>

        </div>
      </div>

      <footer className="namtar-footer spatial-panel">
        <div className="f-inner">
           <span>NAMTAR © {new Date().getFullYear()} — INFRASTRUCTURE ARCHIVE</span>
           <span className="separator">//</span>
           <span className="f-cyan">SYSTEM MONITORING ACTIVE</span>
        </div>
      </footer>

      <style jsx>{`
        .namtar-ark {
          --c2-cyan: #D97706;
          --c2-green: #84CC16;
          --c2-red: #EF4444;
          --c2-amber: #F59E0B;
          --bg-dark: #070605;
          --surface-neural: #120e0a;
          --glass-border: rgba(217, 119, 6, 0.15);

          background: var(--bg-dark);
          font-family: var(--font-body);
          color: #F8FAFC;
          min-height: 100vh;
          position: relative;
          padding-bottom: 60px;
          overflow-x: hidden;
        }

        .telemetry-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
        .radial-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% -20%, rgba(0, 168, 255, 0.1), transparent 70%);
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(0, 168, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 168, 255, 0.03) 1px, transparent 1px);
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
        .nav-btn:hover { color: var(--c2-cyan); border-color: var(--c2-cyan); }

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
          padding: 8px 16px; background: rgba(0, 168, 255, 0.05);
          border: 1px solid rgba(0, 168, 255, 0.1); border-radius: 2px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--c2-cyan);
        }
        .f-cyan { color: var(--c2-cyan); }

        .header-titles { text-align: center; }
        .status-badge { 
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; 
          color: var(--c2-green); margin-bottom: 8px;
        }
        .title {
          font-family: var(--font-tactical); font-size: 42px;
          font-weight: 800; letter-spacing: 4px; color: #FFF; line-height: 1; margin-bottom: 12px;
          text-shadow: 0 0 30px rgba(0, 168, 255, 0.3);
        }
        .subtitle { font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px; color: rgba(255, 255, 255, 0.4); }

        .status-indicator { display: flex; align-items: center; gap: 16px; }
        .active-icon { color: var(--c2-green); filter: drop-shadow(0 0 10px var(--c2-green)); }
        .status-text { display: flex; flex-direction: column; gap: 2px; }
        .st-main { font-family: var(--font-tactical); font-size: 12px; font-weight: 700; color: var(--c2-green); letter-spacing: 1px; }
        .st-sub { font-size: 9px; letter-spacing: 1px; color: rgba(255, 255, 255, 0.3); }

        .discord-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 24px; color: #FFF; text-decoration: none;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          background: rgba(0, 168, 255, 0.05); border-color: rgba(0, 168, 255, 0.2);
        }
        .discord-btn:hover { background: rgba(0, 168, 255, 0.15); border-color: var(--c2-cyan); }

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
        .panel-title svg { color: var(--c2-cyan); }

        /* Ad Box */
        .ad-box { grid-column: span 2; padding: 48px; display: grid; grid-template-columns: 1fr 200px; gap: 40px; border-color: rgba(0, 168, 255, 0.2); }
        .ad-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .ad-tag { font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--c2-cyan); font-weight: 700; }
        .ad-title { font-family: var(--font-tactical); font-size: 24px; font-weight: 800; letter-spacing: 2px; margin-bottom: 16px; color: #FFF; }
        .ad-desc { font-size: 14px; line-height: 1.8; color: rgba(148, 163, 184, 0.6); margin-bottom: 32px; }
        .ad-cta { display: flex; align-items: center; gap: 24px; }
        .btn-tactical {
          padding: 14px 28px; background: transparent; color: var(--c2-cyan);
          border: 1px solid rgba(0, 168, 255, 0.3); border-radius: 2px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
          text-transform: uppercase; cursor: pointer; transition: all 300ms;
        }
        .btn-tactical:hover { background: rgba(0, 168, 255, 0.1); border-color: var(--c2-cyan); }
        .eta { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.2); }
        .ad-visual { display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
        .f-cyan-o { color: var(--c2-cyan); opacity: 0.1; filter: blur(2px); }
        .data-pips { display: flex; gap: 8px; margin-top: 24px; }
        .pip { width: 6px; height: 6px; background: var(--c2-cyan); border-radius: 50%; animation: pulse-glow 2s infinite; }
        .pip:nth-child(2) { animation-delay: 0.3s; }
        .pip:nth-child(3) { animation-delay: 0.6s; }

        /* Specs */
        .main-specs { grid-column: span 1; padding: 32px; }
        .spec-readouts { display: flex; flex-direction: column; gap: 24px; }
        .s-readout { display: flex; align-items: center; gap: 20px; }
        .sr-icon { color: var(--c2-cyan); opacity: 0.6; }
        .sr-data { display: flex; flex-direction: column; }
        .sr-val { font-family: var(--font-tactical); font-size: 20px; color: #FFF; font-weight: 700; }
        .sr-lbl { font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3); }

        /* Zones */
        .radiations-panel { padding: 32px; }
        .zone-grid { display: flex; flex-direction: column; gap: 16px; }
        .zone-card {
          display: flex; align-items: center; gap: 16px;
          padding: 16px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 2px;
        }
        .z-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .z-name { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: #FFF; letter-spacing: 1px; }
        .z-rad { font-family: var(--font-mono); font-size: 11px; color: rgba(255, 255, 255, 0.3); }
        .z-cap { font-family: var(--font-tactical); font-size: 10px; font-weight: 700; text-align: right; min-width: 70px; }

        /* Raid */
        .raid-panel { grid-column: span 2; padding: 32px; }

        /* Nodes */
        .nodes-panel { padding: 32px; }
        .node-list { display: flex; flex-direction: column; gap: 16px; }
        .node-item { display: flex; align-items: center; gap: 16px; padding: 12px; background: rgba(255, 255, 255, 0.02); border-radius: 2px; }
        .node-icon { width: 8px; height: 8px; border-radius: 50%; }
        .node-icon.online { background: var(--c2-green); box-shadow: 0 0 10px var(--c2-green); }
        .ni-name { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: #FFF; flex: 1; letter-spacing: 1px; }
        .ni-ping { font-family: var(--font-tactical); font-size: 11px; color: var(--c2-green); }

        /* System */
        .system-panel { grid-column: span 1; padding: 32px; }
        .sys-items { display: flex; flex-direction: column; gap: 16px; }
        .sys-item { display: flex; justify-content: space-between; align-items: center; }
        .si-lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3); }
        .si-val { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: #FFF; }
        .si-link { 
            display: flex; align-items: center; gap: 8px; margin-top: 8px;
            font-family: var(--font-mono); font-size: 10px; letter-spacing: 1px;
            color: var(--c2-cyan); text-decoration: none; 
        }
        .si-link:hover { text-decoration: underline; }

        .namtar-footer {
          margin: 40px 32px 0; padding: 24px;
        }
        .f-inner { display: flex; align-items: center; justify-content: center; gap: 16px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.3); }
        .separator { opacity: 0.2; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 1200px) {
          .hub-header { flex-direction: column; gap: 40px; text-align: center; }
          .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
          .ad-box { grid-column: span 2; }
          .status-indicator { justify-content: center; }
        }

        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .ad-box, .main-specs, .radiations-panel, .raid-panel, .nodes-panel, .system-panel { grid-column: span 1; }
          .ad-box { grid-template-columns: 1fr; padding: 32px; }
          .ad-visual { display: none; }
          .hub-container { padding: 80px 16px 40px; }
          .title { font-size: 32px; }
        }
      `}</style>
    </main>
  );
}
