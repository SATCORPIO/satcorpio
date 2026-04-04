"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DossierEntry {
  index: string;
  text: string;
}

interface DossierTab {
  label: string;
  content: string[];
}

interface DossierSectionProps {
  division: string;
  classification: string;
  title?: string;
  entries: DossierEntry[];
  tabs: DossierTab[];
  accentColor: string;
}

/**
 * DossierSection
 * Tactical terminal-style readout for division sub-pages.
 * Features indexed entries, classification headers, and interactive tabbed modules.
 */
export const DossierSection: React.FC<DossierSectionProps> = ({
  division,
  classification,
  title = "CORE IDENTITY",
  entries,
  tabs,
  accentColor,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="dossier-root">
      <div className="terminal-shell" style={{ '--accent': accentColor } as React.CSSProperties}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="status-group">
            <span className="blink-dot"></span>
            <span className="terminal-id">REF: {division.toUpperCase()} // DOSSIER</span>
          </div>
          <div className="classification-box">
             <span className="cl-label">CLASS:</span>
             <span className="cl-value">{classification}</span>
          </div>
        </div>

        <div className="terminal-body">
          {/* ─── Faded Watermark ─── */}
          <div className="terminal-watermark">
            SATCORP // NEURAL CORE // v3.0
          </div>

          <div className="body-grid">
            {/* Left Column: Indexed Entries */}
            <div className="entry-column">
              <h2 className="section-title">{title}</h2>
              <div className="entry-list">
                {entries.map((entry, idx) => (
                  <div key={idx} className="entry-row">
                    <span className="entry-idx">[{entry.index}]</span>
                    <p className="entry-text">{entry.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Tabs */}
            <div className="tab-column">
              <div className="tab-nav">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    className={`tab-btn ${activeTab === idx ? "active" : ""}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="tab-content-area">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="tab-content"
                  >
                    <ul className="content-list">
                      {tabs[activeTab].content.map((item, idx) => (
                        <li key={idx} className="content-item">
                          <span className="bullet">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Meta Info */}
        <div className="terminal-footer">
          <span className="meta-info">DECRYPTED PORTAL ACCESS // VERIFIED OK</span>
          <span className="timestamp">{new Date().toISOString().split('T')[0]}</span>
        </div>
      </div>

      <style jsx>{`
        .dossier-root {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .terminal-shell {
          background: rgba(5, 10, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 4px solid var(--accent);
          border-radius: 4px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .status-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .blink-dot {
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent);
          animation: terminal-blink 2s infinite;
        }

        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .terminal-id {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--accent);
          font-weight: 700;
        }

        .classification-box {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .cl-label { color: rgba(255, 255, 255, 0.4); margin-right: 8px; }
        .cl-value { color: #FFF; background: rgba(255, 255, 255, 0.1); padding: 2px 6px; border-radius: 2px; }

        .terminal-body {
          padding: 40px;
          position: relative;
        }

        .terminal-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-5deg);
          font-family: var(--font-orbitron), sans-serif;
          font-size: clamp(40px, 8vw, 70px);
          font-weight: 900;
          color: white;
          opacity: 0.03;
          pointer-events: none;
          white-space: nowrap;
          z-index: 0;
          letter-spacing: 20px;
        }

        .body-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
        }

        .section-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 20px;
          letter-spacing: 4px;
          color: white;
          margin-bottom: 32px;
        }

        .entry-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .entry-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .entry-idx {
          font-family: var(--font-share-tech-mono), monospace;
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          opacity: 0.8;
          padding-top: 4px;
        }

        .entry-text {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .tab-nav {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .tab-btn {
          padding: 12px 20px;
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.4);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-btn:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .tab-btn.active {
          color: var(--accent);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }

        .tab-content-area {
          min-height: 200px;
        }

        .content-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .content-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .bullet {
          color: var(--accent);
          font-weight: bold;
        }

        .terminal-footer {
          display: flex;
          justify-content: space-between;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.02);
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 900px) {
          .body-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .terminal-body {
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
};