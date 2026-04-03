"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useClientCore } from "@/app/ClientProviders";
import { GlitchText } from "@/components/shared/GlitchText";

gsap.registerPlugin(ScrollTrigger);

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
  const { playHover, playClick, registerVisit } = useClientCore();
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [suffix, setSuffix] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isIntersecting = useRef(false);

  useEffect(() => {
    setSuffix((Math.floor(Math.random() * 900) + 100).toString());
    registerVisit(activeId);
  }, [activeId]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => {
          isIntersecting.current = true;
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const activeItem = items.find(i => i.id === activeId) || items[0];

  return (
    <section id={anchorId} className="dossier-section" ref={containerRef}>
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
                    onClick={() => {
                       setActiveId(node.id);
                       playClick();
                    }}
                    onMouseEnter={() => playHover()}
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
              {/* Backgrounds removed for readability */}
              <div className="viewport-header">
                <div className="vh-left">
                  <div className="vh-icon-wrap" style={{ color: activeItem.color }}>
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
                <div className="data-readout" style={{ color: activeItem.color }}>
                  {`> UPLINK ESTABLISHED... DECRYPTING [${activeItem.id.toUpperCase()}_DATA]`}
                </div>
                <ul className="viewport-list">
                  {activeItem.items.map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      style={{ borderLeft: `2px solid ${activeItem.color}66` }}
                      className="terminal-li"
                      onMouseEnter={() => playHover()}
                    >
                      <span className="li-index" style={{ color: activeItem.color }}>{`[${(idx + 1).toString().padStart(2, '0')}]`}</span>
                      <span className="li-text">
                        <GlitchText text={item} active={true} />
                      </span>
                    </motion.li>
                  ))}
                </ul>
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
          background: rgba(4, 6, 12, 0.95);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5);
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
          background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);
          border-color: transparent;
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
          background: transparent;
        }
        
        .viewport-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          padding: 48px;
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
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
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
        
        .terminal-li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
          background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%);
          padding: 12px 20px;
          border-radius: 0 4px 4px 0;
          border: 1px solid rgba(255,255,255,0.02);
          border-left: none; /* Handled inline via activeItem.color */
          transition: all 0.2s;
        }
        
        .terminal-li:hover {
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          transform: translateX(4px);
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
        

        @media (max-width: 900px) {
          .dossier-section { padding: 60px 20px; }
          .dossier-title { font-size: 24px; letter-spacing: 4px; }
          .dossier-subtitle { font-size: 9px; letter-spacing: 3px; }
          .dossier-header { margin-bottom: 40px; gap: 12px; }
          .dossier-line { height: 28px; }

          .dossier-manual { flex-direction: column; height: auto; min-height: 550px; }
          .manual-sidebar {
            width: 100%; border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            height: auto; max-height: 200px; flex: none;
          }
          .sidebar-nav { flex-direction: row; flex-wrap: wrap; gap: 4px; padding: 8px; }
          .sidebar-item { padding: 8px 12px; gap: 10px; }
          .item-label { font-size: 11px; }
          
          .viewport-content { padding: 28px; position: relative; }
          .vh-title { font-size: 22px; letter-spacing: 2px; }
          .viewport-header { flex-direction: column; gap: 16px; }
        }
        @media (max-width: 768px) {
          .dossier-section { padding: 48px 16px; }
          .dossier-title { font-size: 20px; letter-spacing: 3px; }
          .dossier-header { margin-bottom: 32px; }

          .dossier-manual { min-height: auto; }
          .manual-sidebar { max-height: 180px; }
          .sidebar-header { padding: 16px; }
          .sidebar-title { font-size: 9px; }
          .sidebar-nav { overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; }
          .sidebar-item { white-space: nowrap; flex-shrink: 0; padding: 8px 10px; }
          .item-label { font-size: 10px; letter-spacing: 0.5px; }
          .item-icon-box { display: none; }

          .viewport-content { padding: 20px; }
          .vh-left { flex-direction: column; align-items: flex-start; gap: 12px; }
          .vh-icon-wrap { padding: 12px; }
          .vh-title { font-size: 18px; letter-spacing: 1px; }
          .vh-sub { font-size: 9px; letter-spacing: 2px; }
          .vh-right { display: none; }
          
          .data-readout { font-size: 10px; padding-left: 10px; }
          .viewport-list { gap: 12px; }
          .terminal-li {
            flex-direction: column; gap: 6px;
            font-size: 13px; padding: 12px 16px;
          }
          .li-index { font-size: 11px; }

          .viewport-corners div { width: 16px; height: 16px; }
          .vc-tl { top: 10px; left: 10px; }
          .vc-tr { top: 10px; right: 10px; }
          .vc-bl { bottom: 10px; left: 10px; }
          .vc-br { bottom: 10px; right: 10px; }
        }
        @media (max-width: 480px) {
          .dossier-section { padding: 32px 10px; }
          .dossier-title { font-size: 16px; letter-spacing: 2px; }
          .dossier-subtitle { font-size: 8px; letter-spacing: 2px; }
          .dossier-line { height: 20px; }
          .dossier-header { margin-bottom: 24px; }

          .manual-sidebar { max-height: 160px; }
          .sidebar-header { padding: 12px; gap: 8px; }
          .sidebar-item { padding: 6px 8px; }
          .item-label { font-size: 9px; }
          .active-indicator { width: 2px; }

          .viewport-content { padding: 16px; }
          .vh-icon-wrap { padding: 10px; border-radius: 6px; }
          .vh-title { font-size: 15px; }
          .vh-sub { font-size: 8px; }
          .data-readout { font-size: 9px; }
          .terminal-li { font-size: 12px; padding: 10px 12px; }
          .li-index { font-size: 10px; }

        }
      `}</style>
    </section>
  );
}
