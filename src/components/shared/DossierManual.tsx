"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface DossierItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  items: string[];
  color: string;
}

interface DossierManualProps {
  items: DossierItem[];
  sectionTitle: string;
  sectionSubtitle: string;
  terminalPrefix: string;
  anchorId: string;
}

export function DossierManual({ 
  items, 
  sectionTitle, 
  sectionSubtitle, 
  terminalPrefix,
  anchorId 
}: DossierManualProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [suffix, setSuffix] = useState<string | null>(null);

  useEffect(() => {
    setSuffix((Math.floor(Math.random() * 900) + 100).toString());
  }, [activeId]);

  const activeItem = items.find(i => i.id === activeId) || items[0];

  return (
    <section id={anchorId} className="dossier-section">
      <div className="dossier-header">
        <div className="dossier-line" />
        <h2 className="dossier-title">{sectionTitle}</h2>
        <p className="dossier-subtitle">{sectionSubtitle}</p>
        <div className="dossier-line" />
      </div>

      <div className="dossier-manual spatial-panel">
        <aside className="manual-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">INDEX // OPERATIONS</span>
            <div className="sidebar-line" />
          </div>
          <nav className="sidebar-nav">
            {items.map((node) => {
              const Icon = node.icon;
              const isActive = activeId === node.id;
              return (
                <button
                  key={node.id}
                  className={`sidebar-item ${isActive ? "active" : ""}`}
                  onClick={() => setActiveId(node.id)}
                  style={{ "--item-color": node.color } as React.CSSProperties}
                >
                  <div className="item-icon-box">
                    <Icon size={14} className="item-icon" />
                  </div>
                  <span className="item-label">{node.title}</span>
                  {isActive && (
                    <motion.div layoutId="activeInd" className="active-indicator" style={{ background: node.color }} />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="manual-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              className="viewport-content"
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Unique Background Design based on ID */}
              <div className="viewport-bg">
                <div className="bg-gradient" style={{ background: `radial-gradient(circle at 70% 30%, ${activeItem.color}15 0%, transparent 60%)` }} />
                <activeItem.icon size={400} className="bg-watermark" style={{ color: activeItem.color }} />
                <div className="bg-grid-overlay" style={{ backgroundImage: `radial-gradient(${activeItem.color}22 1px, transparent 1px)` }} />
              </div>

              <div className="viewport-header">
                <div className="vh-left">
                  <div className="vh-icon-wrap" style={{ color: activeItem.color, borderColor: `${activeItem.color}44`, background: `${activeItem.color}11` }}>
                    <activeItem.icon size={32} />
                  </div>
                  <div className="vh-title-group">
                    <span className="vh-sub" style={{ color: activeItem.color }}>{activeItem.subtitle}</span>
                    <h3 className="vh-title">{activeItem.title}</h3>
                  </div>
                </div>
                <div className="vh-right">
                  <div className="vh-class">CLASSIFIED LEVEL 5</div>
                  <div className="vh-id" style={{ color: activeItem.color }}>REF: {terminalPrefix}-{activeItem.id.toUpperCase()}-00{suffix || "..."}</div>
                </div>
              </div>

              <div className="viewport-body">
                <div className="data-readout" style={{ color: activeItem.color }}>{`> UPLINK ESTABLISHED... DECRYPTING [${activeItem.id.toUpperCase()}_DATA]`}</div>
                <ul className="viewport-list">
                  {activeItem.items.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                    >
                      <span className="li-index" style={{ color: activeItem.color }}>{`[${(idx + 1).toString().padStart(2, '0')}]`}</span>
                      <span className="li-text">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="viewport-corners">
                <div className="vc-tl" style={{ borderColor: activeItem.color }} />
                <div className="vc-tr" style={{ borderColor: activeItem.color }} />
                <div className="vc-bl" style={{ borderColor: activeItem.color }} />
                <div className="vc-br" style={{ borderColor: activeItem.color }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .dossier-section {
          position: relative;
          z-index: 10;
          padding: 100px 40px;
          background: linear-gradient(180deg, transparent, rgba(2,3,5,0.95) 200px);
        }
        .dossier-header {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 60px;
          text-align: center;
        }
        .dossier-line {
          width: 2px; height: 40px;
          background: linear-gradient(180deg, transparent, var(--c2-green));
        }
        .dossier-title {
          font-family: var(--font-tactical);
          font-size: 32px;
          letter-spacing: 8px;
          color: white;
          text-shadow: 0 0 20px rgba(255,255,255,0.1);
        }
        .dossier-subtitle {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 4px;
          color: var(--c2-green);
        }

        .dossier-manual {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          height: 700px;
          background: rgba(5,7,12,0.8);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1);
        }
        
        .manual-sidebar {
          width: 320px;
          border-right: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
        }
        
        .sidebar-header {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .sidebar-title {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.4);
        }
        
        .sidebar-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
        }
        
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 12px;
          gap: 4px;
        }
        
        .sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          position: relative;
          text-align: left;
          transition: all 0.2s;
        }
        
        .sidebar-item:hover {
          background: rgba(255,255,255,0.02);
          color: rgba(255,255,255,0.8);
        }
        
        .sidebar-item.active {
          color: white;
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.05);
        }
        
        .item-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--item-color);
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        
        .sidebar-item.active .item-icon-box {
          opacity: 1;
          filter: drop-shadow(0 0 8px var(--item-color));
        }
        
        .item-label {
          font-family: var(--font-tactical);
          font-size: 13px;
          letter-spacing: 1px;
          flex: 1;
        }
        
        .active-indicator {
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 3px;
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px currentColor;
        }
        
        .manual-viewport {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: rgba(2,3,5,0.7);
        }
        
        .viewport-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          padding: 48px;
        }
        
        .viewport-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .bg-gradient {
          position: absolute;
          inset: 0;
          opacity: 0.8;
          transition: background 0.5s ease;
        }
        
        .bg-watermark {
          position: absolute;
          right: -5%;
          bottom: -10%;
          opacity: 0.03;
          transform: rotate(-15deg);
          filter: blur(4px);
        }
        
        .bg-grid-overlay {
          position: absolute;
          inset: 0;
          background-size: 30px 30px;
          opacity: 0.5;
          mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
        }
        
        .viewport-header {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 32px;
        }
        
        .vh-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        
        .vh-icon-wrap {
          border: 1px solid;
          padding: 16px;
          border-radius: 8px;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        
        .vh-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .vh-sub {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 3px;
        }
        
        .vh-title {
          font-family: var(--font-tactical);
          font-size: 32px;
          letter-spacing: 4px;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        
        .vh-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .vh-class {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          color: #EF4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
          padding: 4px 8px;
          border-radius: 4px;
          background: rgba(239, 68, 68, 0.1);
        }
        
        .vh-id {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 1px;
          opacity: 0.8;
        }
        
        .viewport-body {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        
        .data-readout {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 1px;
          opacity: 0.7;
          border-left: 2px solid;
          padding-left: 12px;
        }
        
        .viewport-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .viewport-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          background: rgba(0,0,0,0.3);
          padding: 16px 20px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .li-index {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          margin-top: 2px;
        }
        
        .li-text {
          flex: 1;
        }
        
        .viewport-corners div {
          position: absolute;
          width: 30px;
          height: 30px;
          opacity: 0.4;
          z-index: 20;
        }
        
        .vc-tl { top: 20px; left: 20px; border-top: 2px solid; border-left: 2px solid; }
        .vc-tr { top: 20px; right: 20px; border-top: 2px solid; border-right: 2px solid; }
        .vc-bl { bottom: 20px; left: 20px; border-bottom: 2px solid; border-left: 2px solid; }
        .vc-br { bottom: 20px; right: 20px; border-bottom: 2px solid; border-right: 2px solid; }

        @media (max-width: 900px) {
          .dossier-manual { flex-direction: column; height: 800px; }
          .manual-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); height: 250px; flex: none; }
          .viewport-content { padding: 32px; }
          .vh-title { font-size: 24px; }
        }
        @media (max-width: 768px) {
          .vh-left { flex-direction: column; align-items: flex-start; gap: 16px; }
          .vh-right { display: none; }
          .viewport-list li { flex-direction: column; gap: 8px; font-size: 14px; }
        }
      `}</style>
    </section>
  );
}
