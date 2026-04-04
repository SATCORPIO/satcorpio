"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dossierData } from "@/data/dossier";
import { useClientCore } from "@/app/ClientProviders";

/**
 * OperationsSection
 * High-fidelity tabbed interface for SATCORP strategic modules.
 * Features smooth transitions, interactive underlines, and concise capability indexing.
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
        <p className="section-subtitle">STRATEGIC CAPABILITY INDEX // VER v4.0</p>
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="ops-content"
            >
              <div className="content-side">
                <div className="desc-block">
                  <div className="desc-header" style={{ color: activeData.color }}>
                    {activeData.subtitle.toUpperCase()}
                  </div>
                  <h3 className="desc-title">{activeData.title}</h3>
                  <p className="desc-text">
                    Professional grade implementation of {activeData.title.toLowerCase()} across the SATCORP ecosystem. 
                    Engineered for high-performance delivery and modular scalability.
                  </p>
                </div>

                <div className="capability-block">
                  <div className="cap-header">CORE CAPABILITIES</div>
                  <ul className="cap-list">
                    {activeData.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="cap-item">
                        <span className="cap-dot" style={{ background: activeData.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="content-decoration">
                <div className="decor-icon" style={{ color: activeData.color }}>
                  <activeData.icon size={120} strokeWidth={0.5} opacity={0.1} />
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
          background: linear-gradient(180deg, transparent, rgba(3, 5, 8, 0.8) 20%);
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
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 4px;
          color: var(--c2-green);
          opacity: 0.8;
        }

        .ops-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          background: rgba(4, 6, 12, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
          min-height: 500px;
        }

        .ops-tabs {
          display: flex;
          flex-wrap: wrap;
          padding: 12px;
          gap: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.2);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .ops-tabs::-webkit-scrollbar {
          display: none;
        }

        .tab-btn {
          position: relative;
          padding: 14px 24px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          font-family: var(--font-tactical);
          font-size: 11px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.02);
        }

        .tab-btn.active {
          color: var(--c2-green);
        }

        .tab-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: var(--c2-green);
          box-shadow: 0 0 8px var(--c2-green-glow);
        }

        .ops-viewport {
          flex: 1;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }

.ops-content {
  display: flex;
  gap: 60px;
  height: 100%;
  min-height: 400px; /* Prevent layout shifts when switching tabs */
}

        .content-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 48px;
          max-width: 600px;
        }

        .desc-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .desc-header {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 4px;
          font-weight: 700;
        }

        .desc-title {
          font-family: var(--font-tactical);
          font-size: 42px;
          letter-spacing: 2px;
          color: white;
          margin-bottom: 8px;
        }

        .desc-text {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
        }

        .capability-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cap-header {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
          width: fit-content;
        }

        .cap-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cap-item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-mono);
          letter-spacing: 1px;
        }

        .cap-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          filter: blur(1px);
        }

        .content-decoration {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.5;
        }

        @media (max-width: 1024px) {
          .ops-content { flex-direction: column; gap: 40px; }
          .content-decoration { display: none; }
          .desc-title { font-size: 32px; }
          .ops-viewport { padding: 40px; }
        }

        @media (max-width: 768px) {
          .ops-section { padding: 60px 20px; }
          .section-title { font-size: 24px; letter-spacing: 4px; }
          .ops-tabs { padding: 4px; }
          .tab-btn { padding: 12px 16px; font-size: 9px; }
          .ops-viewport { padding: 32px 24px; }
          .desc-title { font-size: 28px; }
          .desc-text { font-size: 14px; }
          .cap-item { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}
