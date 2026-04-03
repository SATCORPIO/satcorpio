"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Server, Activity, Users, Shield, Cpu, Database, AlertCircle, MapPin, Radio, Wifi, Radiation } from "lucide-react";
import { motion } from "framer-motion";

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

    // Initial population
    setRaids([
      { id: "ACT-4021", target: "SECTOR-7 SLUMS", intensity: 84, attackers: 23 },
      { id: "ACT-2199", target: "CRATER LAKE", intensity: 41, attackers: 8 }
    ]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="raid-sim">
      <div className="sim-header">
        <AlertCircle size={12} className="pulse-icon" style={{ color: "#EF4444" }} />
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
                <div className="r-fill" style={{ width: `${r.intensity}%`, background: r.intensity > 70 ? "#EF4444" : "#F59E0B" }} />
              </div>
            </div>
          </motion.div>
        ))}
        {raids.length === 0 && <div className="no-raids">NO ACTIVE RAIDS DETECTED</div>}
      </div>
    </div>
  );
}

export default function NamtarArkPage() {
  return (
    <main className="namtar-ark film-grain">
      {/* Immersive Background */}
      <div className="telemetry-bg">
        <div className="radial-glow" />
        <div className="grid-overlay" />
      </div>

      <nav className="tactical-nav">
        <Link href="/kirastudios/namtar" className="nav-btn">
          <ChevronLeft size={14} /> NAMTAR HQ
        </Link>
      </nav>

      <div className="hub-container">
        <header className="hub-header spatial-panel">
          <div className="badge">
            <Server size={10} className="pulse-icon" /> INFRASTRUCTURE LAYER
          </div>
          <div className="header-titles">
            <h1 className="title">NAMTAR CLUSTER</h1>
            <p className="subtitle">ASA DEDICATED HOSTING</p>
          </div>
          <div className="status-indicator">
            <Shield size={16} className="active-icon" />
            <div className="status-text">
              <span className="st-main">DDOS SHIELD ACTIVE</span>
              <span className="st-sub">Traffic securely routed</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* Main Server Specs */}
          <div className="main-specs spatial-panel">
            <h3 className="panel-title"><Cpu size={14} /> HARDWARE METRICS</h3>
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
                  <span className="sr-val">NVME</span>
                  <span className="sr-lbl">STATE SAVES</span>
                </div>
              </div>
              <div className="s-sep" />
              <div className="s-readout">
                <Users size={24} className="sr-icon" />
                <div className="sr-data">
                  <span className="sr-val">ON</span>
                  <span className="sr-lbl">CROSS-PLAY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Radiation Zones - Specific to Namtar */}
          <div className="radiations-panel spatial-panel">
            <h3 className="panel-title"><Radiation size={14} /> TOXICITY ZONES</h3>
            <div className="zone-grid">
              {[
                { name: "CRATER ZERO", rad: "7.4 THz", cap: "LETHAL", color: "#EF4444" },
                { name: "WASTELAND EDGE", rad: "1.2 THz", cap: "WARNING", color: "#F59E0B" },
                { name: "UNDERGROUND BUNKER", rad: "0.1 THz", cap: "SAFE", color: "#84CC16" }
              ].map(z => (
                <div key={z.name} className="zone-card">
                  <MapPin size={12} color={z.color} />
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
            <h3 className="panel-title"><Wifi size={14} /> CROSS-PLAY GATEWAYS</h3>
            <div className="node-list">
              <div className="node-item">
                <div className="node-icon online" />
                <span className="ni-name">STEAM BACKBONE</span>
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
          
          {/* Action Panel */}
          <div className="action-panel spatial-panel">
            <h3 className="panel-title"><Radio size={14} /> DEPLOYMENT ACCESS</h3>
            <p className="ap-desc">High-performance dedicated hosting launching soon. Secure your faction's slot.</p>
            <button className="notify-btn">NOTIFY ON DEPLOYMENT</button>
          </div>

        </div>
      </div>

      <style jsx>{`
        .namtar-ark {
          background: #0C0500;
          font-family: var(--font-mono);
          color: white;
          min-height: 100vh;
          position: relative;
          padding-bottom: 60px;
        }

        .telemetry-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
        }
        .radial-glow {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% -20%, rgba(217, 119, 6, 0.1), transparent 70%);
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(217, 119, 6, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 119, 6, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .tactical-nav {
          position: absolute; top: 24px; left: 32px; z-index: 200;
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

        .hub-container {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 100px 32px 40px;
        }

        .hub-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 32px 40px; margin-bottom: 24px;
          border-color: rgba(217, 119, 6, 0.15);
        }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; letter-spacing: 3px; color: #D97706;
          border: 1px solid rgba(217, 119, 6, 0.3); padding: 6px 16px;
          border-radius: 2px; background: rgba(217, 119, 6, 0.05);
        }
        .pulse-icon { animation: pulse-glow 2s infinite; }

        .header-titles { text-align: center; }
        .title {
          font-family: var(--font-tactical); font-size: clamp(24px, 4vw, 42px);
          font-weight: 800; letter-spacing: 6px; color: #FFF; line-height: 1; margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(217, 119, 6, 0.3);
        }
        .subtitle { font-size: 11px; letter-spacing: 4px; color: rgba(217, 119, 6, 0.6); }

        .status-indicator { display: flex; align-items: center; gap: 12px; }
        .active-icon { color: #84CC16; filter: drop-shadow(0 0 8px rgba(132,204,22,0.6)); }
        .status-text { display: flex; flex-direction: column; gap: 2px; }
        .st-main { font-family: var(--font-tactical); font-size: 14px; font-weight: 700; color: #84CC16; letter-spacing: 2px; }
        .st-sub { font-size: 9px; letter-spacing: 1px; color: rgba(255, 255, 255, 0.4); }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 24px;
        }

        .panel-title {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 3px; color: rgba(255, 255, 255, 0.6);
          padding-bottom: 16px; margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .panel-title svg { color: #D97706; }

        /* Main Specs */
        .main-specs { grid-column: span 3; padding: 24px 32px; }
        .spec-readouts { display: flex; align-items: center; justify-content: space-around; }
        .s-readout { display: flex; align-items: center; gap: 16px; }
        .sr-icon { color: #D97706; opacity: 0.8; }
        .sr-data { display: flex; flex-direction: column; }
        .sr-val { font-family: var(--font-tactical); font-size: 24px; color: #FFF; font-weight: 700; }
        .sr-lbl { font-size: 9px; letter-spacing: 2px; color: rgba(217, 119, 6, 0.6); }
        .s-sep { width: 1px; height: 40px; background: rgba(217, 119, 6, 0.2); }

        /* Zones */
        .radiations-panel { grid-column: span 1; padding: 24px; }
        .zone-grid { display: flex; flex-direction: column; gap: 12px; }
        .zone-card {
          display: flex; align-items: center; gap: 12px;
          padding: 12px; border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.3); border-radius: 4px;
        }
        .z-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .z-name { font-size: 10px; font-weight: 700; color: #FFF; letter-spacing: 1px; }
        .z-rad { font-family: var(--font-mono); font-size: 11px; color: rgba(255, 255, 255, 0.5); }
        .z-cap { font-family: var(--font-tactical); font-size: 9px; letter-spacing: 1px; }

        /* Raid Panel */
        .raid-panel { grid-column: span 2; padding: 24px; background: rgba(239, 68, 68, 0.02); border-color: rgba(239, 68, 68, 0.1); }
        .sim-header {
          display: flex; align-items: center; gap: 8px; font-size: 10px; letter-spacing: 2px;
          color: #EF4444; margin-bottom: 20px; font-weight: 700;
        }
        .raid-list { display: flex; flex-direction: column; gap: 8px; }
        .raid-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 16px; background: rgba(239, 68, 68, 0.05);
          border-left: 2px solid #EF4444; border-radius: 0 4px 4px 0;
        }
        .r-left { display: flex; flex-direction: column; gap: 4px; }
        .r-id { font-size: 9px; color: rgba(239, 68, 68, 0.7); font-family: var(--font-tactical); letter-spacing: 1px; }
        .r-target { font-size: 11px; color: #FFF; font-weight: 700; letter-spacing: 1px;  }
        .r-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; width: 120px; }
        .r-att { font-size: 9px; color: rgba(255, 255, 255, 0.6); }
        .r-intensity-bar { width: 100%; height: 4px; background: rgba(0, 0, 0, 0.5); border-radius: 2px; }
        .r-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
        .no-raids { font-size: 11px; color: rgba(255, 255, 255, 0.3); letter-spacing: 2px; text-align: center; padding: 20px; }

        /* Nodes Panel */
        .nodes-panel { grid-column: span 1; padding: 24px; }
        .node-list { display: flex; flex-direction: column; gap: 12px; }
        .node-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 255, 255, 0.02); border-radius: 4px; }
        .node-icon { width: 8px; height: 8px; border-radius: 50%; }
        .node-icon.online { background: #84CC16; box-shadow: 0 0 8px #84CC16; }
        .ni-name { font-size: 10px; font-weight: 700; color: #FFF; flex: 1; letter-spacing: 1px; }
        .ni-ping { font-size: 10px; color: #84CC16; font-family: var(--font-tactical); }

        /* Action Panel */
        .action-panel { grid-column: span 2; padding: 24px; display: flex; justify-content: space-between; align-items: center; gap: 40px; }
        .ap-desc { font-size: 12px; line-height: 1.6; color: rgba(255, 255, 255, 0.5); flex: 1; max-width: 400px; }
        .notify-btn {
          flex-shrink: 0;
          background: rgba(217, 119, 6, 0.15); color: #D97706; border: 1px solid #D97706;
          padding: 16px 32px; font-family: var(--font-tactical); font-size: 12px; font-weight: 700;
          letter-spacing: 3px; border-radius: 3px; cursor: pointer; transition: all 200ms;
        }
        .notify-btn:hover { background: #D97706; color: #000; box-shadow: 0 0 20px rgba(217, 119, 6, 0.4); }

        @media (max-width: 1024px) {
          .hub-header { flex-direction: column; gap: 24px; }
          .dashboard-grid { grid-template-columns: 1fr 1fr; }
          .main-specs { grid-column: span 2; }
          .raid-panel { grid-column: span 2; }
          .nodes-panel { grid-column: span 1; }
          .action-panel { grid-column: span 2; flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .main-specs, .radiations-panel, .raid-panel, .nodes-panel, .action-panel { grid-column: span 1; }
          .spec-readouts { flex-direction: column; gap: 20px; align-items: flex-start; }
          .s-sep { width: 100%; height: 1px; }
          .hub-container { padding: 80px 16px 40px; }
          .tactical-nav { left: 16px; }
        }
      `}</style>
    </main>
  );
}
