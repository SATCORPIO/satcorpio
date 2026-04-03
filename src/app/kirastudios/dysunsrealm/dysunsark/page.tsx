"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Flame, HardDrive, ShieldAlert, Cpu, Activity, Terminal, Users, Database, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

function ServerTerminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const baseLogs = [
    "[SYSTEM] Root protocols engaged...",
    "[NETWORK] Encrypted tunnel established to NAMTAR-ARK-01",
    "[DB] NVME State Save loaded. Integrity 99.8%",
    "[WARN] Anomalous corruption spikes detected in Sector 4",
    "[BALANCING] PvPvE rulesets injected",
    "[NODE] Starting physics sub-step processing..."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < baseLogs.length) {
        setLogs(prev => [...prev, baseLogs[index]]);
        index++;
      } else {
        // Generate random logs after base init
        const event = Math.random();
        if (event > 0.8) {
          const lat = (Math.random() * 10 + 10).toFixed(1);
          setLogs(prev => [...prev.slice(-7), `[PING] Node ${Math.floor(Math.random() * 5)} latency checking at ${lat}ms`]);
        } else if (event > 0.6) {
          setLogs(prev => [...prev.slice(-7), `[SECURITY] Handshake validated for client_id_${Math.floor(Math.random() * 9000) + 1000}`]);
        }
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window">
      <div className="term-header">
        <Terminal size={12} />
        <span>DYSUN-ARK-DAEMON-v4.7.2</span>
      </div>
      <div className="term-body">
        {logs.map((l, i) => (
          <div key={i} className="log-line">
            <span className="log-time">[{new Date().toISOString().substring(11, 19)}]</span>
            <span className={l.includes("[WARN]") ? "log-warn" : "log-text"}>{l}</span>
          </div>
        ))}
        <div className="cursor-line"><span className="cursor-blink">_</span></div>
      </div>
    </div>
  );
}

export default function DysunsArkPage() {
  return (
    <main className="dysuns-ark film-grain">
      {/* Immersive Background */}
      <div className="telemetry-bg">
        <div className="radial-glow" />
        <div className="grid-overlay" />
      </div>

      <nav className="tactical-nav">
        <Link href="/kirastudios/dysunsrealm" className="nav-btn">
          <ChevronLeft size={14} /> DOMAIN RETURN
        </Link>
      </nav>

      <div className="hub-container">
        <header className="hub-header spatial-panel">
          <div className="badge">
            <Flame size={10} className="pulse-icon" /> SYSTEM ONLINE
          </div>
          <div className="header-titles">
            <h1 className="title">DYSUN'S REALM</h1>
            <p className="subtitle">ASA CLUSTER: EXTREME PVPVE</p>
          </div>
          <div className="status-indicator">
            <Activity size={16} className="active-icon" />
            <div className="status-text">
              <span className="st-main">CLUSTER LIVE</span>
              <span className="st-sub">Hosted via NAMTAR Infrastructure</span>
            </div>
          </div>
          
          <motion.a 
            href="https://discord.gg/ka2zXPMUJG"
            target="_blank"
            rel="noopener noreferrer"
            className="discord-btn spatial-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MessageSquare size={14} />
            <span>JOIN FACTION</span>
          </motion.a>
        </header>

        <div className="dashboard-grid">
          {/* Main Stats */}
          <div className="main-stats spatial-panel">
            <h3 className="panel-title"><Cpu size={14} /> LIVE TELEMETRY</h3>
            <div className="stats-readouts">
              <div className="s-readout">
                <span className="sr-label">TICK RATE</span>
                <span className="sr-value">128hz</span>
              </div>
              <div className="s-readout">
                <span className="sr-label">AVERAGE PING</span>
                <span className="sr-value ping-good">14ms</span>
              </div>
              <div className="s-readout">
                <span className="sr-label">UPTIME</span>
                <span className="sr-value">99.9%</span>
              </div>
            </div>
          </div>

          {/* Player Load */}
          <div className="player-load spatial-panel">
            <h3 className="panel-title"><Users size={14} /> POPULATION METRICS</h3>
            <div className="load-meter">
              <div className="lm-labels">
                <span>ONLINE: 84</span>
                <span>CAPACITY: 100</span>
              </div>
              <div className="lm-track">
                <motion.div 
                  className="lm-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "84%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
            <p className="queue-status">QUEUE: 0 PLAYERS</p>
          </div>

          {/* Terminal */}
          <div className="terminal-panel spatial-panel">
            <ServerTerminal />
          </div>

          {/* Map Node Status */}
          <div className="nodes-panel spatial-panel">
            <h3 className="panel-title"><Database size={14} /> INFRASTRUCTURE NODES</h3>
            <div className="node-list">
              <div className="node-item">
                <div className="node-icon online" />
                <div className="node-info">
                  <span className="ni-name">DYS-CORE-01</span>
                  <span className="ni-loc">FRANKFURT</span>
                </div>
                <span className="ni-ping">12ms</span>
              </div>
              <div className="node-item">
                <div className="node-icon online" />
                <div className="node-info">
                  <span className="ni-name">DYS-CORE-02</span>
                  <span className="ni-loc">NEW YORK</span>
                </div>
                <span className="ni-ping">85ms</span>
              </div>
              <div className="node-item">
                <div className="node-icon warn" />
                <div className="node-info">
                  <span className="ni-name">DYS-BACKUP</span>
                  <span className="ni-loc">TOKYO</span>
                </div>
                <span className="ni-ping">234ms</span>
              </div>
            </div>
          </div>
          
          {/* Action Panel */}
          <div className="action-panel spatial-panel">
            <h3 className="panel-title"><ShieldAlert size={14} /> ACCESS PROTOCOLS</h3>
            <p className="ap-desc">Whitelist required for early access phases. PVPVE Balancing is active.</p>
            <button className="notify-btn">REQUEST WHITELIST</button>
          </div>

        </div>
      </div>

      <style jsx>{`
        .dysuns-ark {
          background: #050506;
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
          background: radial-gradient(circle at 50% -20%, rgba(255, 69, 0, 0.1), transparent 70%);
        }
        .grid-overlay {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(rgba(255, 69, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 69, 0, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .tactical-nav {
          position: absolute; top: 24px; left: 32px; z-index: 200;
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

        .spatial-panel {
          background: rgba(10, 10, 12, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .hub-container {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 100px 32px 40px;
        }

        .hub-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 32px 40px; margin-bottom: 24px;
          border-color: rgba(255, 69, 0, 0.15);
        }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9px; letter-spacing: 3px; color: #FF4500;
          border: 1px solid rgba(255, 69, 0, 0.3); padding: 6px 16px;
          border-radius: 2px; background: rgba(255, 69, 0, 0.05);
        }
        .pulse-icon { animation: pulse-glow 2s infinite; }

        .discord-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
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

        .header-titles { text-align: center; }
        .title {
          font-family: var(--font-tactical); font-size: clamp(24px, 4vw, 42px);
          font-weight: 800; letter-spacing: 6px; color: #FFF; line-height: 1; margin-bottom: 8px;
          text-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
        }
        .subtitle { font-size: 11px; letter-spacing: 4px; color: rgba(255, 69, 0, 0.6); }

        .status-indicator { display: flex; align-items: center; gap: 12px; }
        .active-icon { color: #10B981; filter: drop-shadow(0 0 8px rgba(16,185,129,0.6)); }
        .status-text { display: flex; flex-direction: column; gap: 2px; }
        .st-main { font-family: var(--font-tactical); font-size: 14px; font-weight: 700; color: #10B981; letter-spacing: 2px; }
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
        .panel-title svg { color: #FF4500; }

        /* Main Stats */
        .main-stats { grid-column: span 1; padding: 24px; }
        .stats-readouts { display: flex; flex-direction: column; gap: 16px; }
        .s-readout { display: flex; justify-content: space-between; align-items: flex-end; }
        .sr-label { font-size: 10px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.4); }
        .sr-value { font-family: var(--font-tactical); font-size: 20px; font-weight: 700; color: #FFF; }
        .ping-good { color: #10B981; }

        /* Player Load */
        .player-load { grid-column: span 2; padding: 24px; }
        .load-meter { margin-bottom: 12px; }
        .lm-labels { display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 2px; color: #FFF; margin-bottom: 8px; }
        .lm-track { height: 16px; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden; }
        .lm-fill { height: 100%; background: linear-gradient(90deg, #FF4500, #C9A84C); box-shadow: 0 0 15px rgba(255, 69, 0, 0.4); }
        .queue-status { font-size: 9px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.4); text-align: right; }

        /* Terminal */
        .terminal-panel { grid-column: span 2; padding: 8px; /* handled by inner comp */ background: rgba(0, 0, 0, 0.6); }
        .terminal-window { display: flex; flex-direction: column; height: 100%; min-height: 200px; padding: 16px; }
        .term-header { display: flex; align-items: center; gap: 8px; font-size: 9px; letter-spacing: 2px; color: rgba(255, 69, 0, 0.6); margin-bottom: 16px; }
        .term-body { display: flex; flex-direction: column; gap: 4px; font-family: var(--font-mono); font-size: 11px; }
        .log-line { display: flex; gap: 8px; }
        .log-time { color: rgba(255, 255, 255, 0.3); }
        .log-text { color: #E2E8F0; }
        .log-warn { color: #F59E0B; }
        .cursor-line { margin-top: 4px; }
        .cursor-blink { animation: blink 1s step-end infinite; color: #FF4500; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Nodes Panel */
        .nodes-panel { grid-column: span 1; grid-row: span 2; padding: 24px; }
        .node-list { display: flex; flex-direction: column; gap: 16px; }
        .node-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid rgba(255, 255, 255, 0.05); background: rgba(255, 255, 255, 0.02); border-radius: 4px; }
        .node-icon { width: 8px; height: 8px; border-radius: 50%; }
        .node-icon.online { background: #10B981; box-shadow: 0 0 8px #10B981; }
        .node-icon.warn { background: #F59E0B; box-shadow: 0 0 8px #F59E0B; }
        .node-info { display: flex; flex-direction: column; flex: 1; }
        .ni-name { font-size: 11px; font-weight: 700; color: #FFF; }
        .ni-loc { font-size: 9px; color: rgba(255, 255, 255, 0.4); letter-spacing: 1px; }
        .ni-ping { font-size: 10px; color: #10B981; font-family: var(--font-tactical); }

        /* Action Panel */
        .action-panel { grid-column: span 2; padding: 24px; display: flex; flex-direction: column; justify-content: center; }
        .ap-desc { font-size: 12px; line-height: 1.6; color: rgba(255, 255, 255, 0.5); margin-bottom: 24px; max-width: 500px; }
        .notify-btn {
          align-self: flex-start;
          background: rgba(255, 69, 0, 0.15); color: #FF4500; border: 1px solid #FF4500;
          padding: 14px 32px; font-family: var(--font-tactical); font-size: 12px; font-weight: 700;
          letter-spacing: 3px; border-radius: 3px; cursor: pointer; transition: all 200ms;
        }
        .notify-btn:hover { background: #FF4500; color: #000; box-shadow: 0 0 20px rgba(255, 69, 0, 0.4); }

        @media (max-width: 1024px) {
          .hub-header { flex-direction: column; gap: 24px; }
          .dashboard-grid { grid-template-columns: 1fr 1fr; }
          .nodes-panel { grid-column: span 2; grid-row: auto; }
        }
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .main-stats, .player-load, .terminal-panel, .nodes-panel, .action-panel { grid-column: span 1; }
          .hub-container { padding: 80px 16px 40px; }
          .tactical-nav { left: 16px; }
        }
      `}</style>
    </main>
  );
}
