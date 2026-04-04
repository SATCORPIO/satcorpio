"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dossierData } from "@/data/dossier";
import { useClientCore } from "@/app/ClientProviders";

/**
 * OperationsSection
 * High-fidelity tabbed interface for SATCORP strategic modules.
 * Features smooth transitions, interactive underlines, and a comprehensive capability index.
 */
export default function OperationsSection() {
  const { playHover, playClick } = useClientCore();
  const [activeTab, setActiveTab] = useState(dossierData[0]?.id);

  const activeData = dossierData.find((d) => d.id === activeTab) || dossierData[0];

  return (
    <section id="dossier" className="ops-section">
      <div className="section-header">
        <div className="accent-line" />
        <h2 className="section-title">SATCORP OPERATION COMMAND</h2>
        <p className="section-subtitle">STRATEGIC CAPABILITY INDEX // VER v4.5</p>
      </div>

      <div className="ops-container spatial-panel">
        {/* Tab Navigation */}
        <nav className="ops-tabs">
          {dossierData.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id);
                playClick();
              }}
              onMouseEnter={() => playHover()}
            >
              <span className="tab-label">{tab.title}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="tab-underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Content Viewport */}
        <div className="ops-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="ops-content"
            >
              <div className="content-layout">
                {/* Information Column */}
                <div className="info-column">
                  <div className="desc-block">
                    <div className="desc-header" style={{ color: activeData.color }}>
                      {activeData.subtitle.toUpperCase()}
                    </div>
                    <h3 className="desc-title">{activeData.title}</h3>
                    <p className="desc-text">
                      {activeData.description || `Professional grade implementation of ${activeData.title.toLowerCase()} across the SATCORP ecosystem. Engineered for high-performance delivery and modular scalability.`}
                    </p>
                  </div>

                  <div className="capability-grid-container">
                    <div className="cap-header">TECHNICAL CAPABILITIES</div>
                    <ul className="cap-grid">
                      {activeData.items.map((item, i) => (
                        <li key={i} className="cap-item">
                          <span className="cap-dot" style={{ background: activeData.color }} />
                          <span className="cap-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Aesthetic Column */}
                <div className="aesthetic-column">
                  <div className="decor-icon-wrap" style={{ '--accent': activeData.color } as React.CSSProperties}>
                    <activeData.icon size={200} strokeWidth={0.5} className="decor-icon" />
                    <div className="status-readout">
                        <span className="st-label">STATUS:</span>
                        <span className="st-value">OPTIMIZED</span>
                        <span className="st-label">THROUGHPUT:</span>
                        <span className="st-value">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .ops-section {
          padding: 100px 40px;
          position: relative;
          z-index: 10;
          background: linear-gradient(180deg, transparent, rgba(3, 5, 8, 1) 20%);
        }

        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 60px;
          text-align: center;
        }

        .accent-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, transparent, var(--c2-green));
        }

        .section-title {
          font-family: var(--font-tactical);
          font-size: 32px;
          letter-spacing: 8px;
          color: white;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .section-subtitle {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 10px;
          letter-spacing: 4px;
          color: var(--c2-green);
          opacity: 0.8;
        }

        .ops-container {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          background: rgba(5, 10, 15, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
        }

        .ops-tabs {
          display: flex;
          padding: 8px;
          gap: 2px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .ops-tabs::-webkit-scrollbar { display: none; }

        .tab-btn {
          position: relative;
          padding: 16px 24px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.35);
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.03);
        }

        .tab-btn.active {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .tab-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: white;
          box-shadow: 0 0 10px white;
        }

        .ops-viewport {
          padding: 60px;
          min-height: 500px;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 80px;
          align-items: flex-start;
        }

        .info-column {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .desc-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .desc-header {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 11px;
          letter-spacing: 6px;
          font-weight: 700;
        }

        .desc-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 48px;
          letter-spacing: 2px;
          color: white;
          margin: 0;
        }

        .desc-text {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.5);
          max-width: 600px;
        }

        .capability-grid-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cap-header {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.3);
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          width: fit-content;
        }

        .cap-grid {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px 40px;
        }

        .cap-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cap-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .cap-text {
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.5px;
        }

        .aesthetic-column {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        .decor-icon-wrap {
          position: relative;
          color: var(--accent);
          opacity: 0.6;
          display: flex;
          flex-direction: column;
          align-items: center;
          filter: drop-shadow(0 0 30px var(--accent));
        }

        .status-readout {
          margin-top: 20px;
          display: flex;
          gap: 12px;
          font-family: var(--font-share-tech-mono), monospace;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .st-label { color: rgba(255, 255, 255, 0.3); }
        .st-value { color: var(--accent); font-weight: 700; }

        @media (max-width: 1100px) {
          .content-layout { grid-template-columns: 1fr; gap: 60px; }
          .aesthetic-column { display: none; }
          .ops-viewport { padding: 40px; }
        }

        @media (max-width: 768px) {
          .ops-section { padding: 60px 20px; }
          .section-title { font-size: 24px; letter-spacing: 4px; }
          .ops-viewport { padding: 30px 20px; }
          .desc-title { font-size: 32px; }
          .desc-text { font-size: 15px; }
          .cap-grid { grid-template-columns: 1fr; gap: 12px; }
          .tab-btn { padding: 12px 16px; font-size: 10px; }
        }
      `}</style>
    </section>
  );
}
