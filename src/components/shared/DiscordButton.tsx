"use client";

import React, { useMemo } from "react";
import { MessageSquare, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useClientCore } from "@/app/ClientProviders";

interface DiscordButtonProps {
  href: string;
  label?: string;
  subLabel?: string;
  variant?: "default" | "amber" | "blue" | "red" | "cyan" | "purple";
  className?: string;
}

export function DiscordButton({
  href,
  label = "JOIN DISCORD",
  subLabel = "COMMUNITY",
  variant = "default",
  className = "",
}: DiscordButtonProps) {
  const { playHover, playUplink } = useClientCore();

  const themes = {
    default: {
      primary: "#00FF41",
      bg: "rgba(0, 255, 65, 0.05)",
      border: "rgba(0, 255, 65, 0.3)",
      hoverBg: "rgba(0, 255, 65, 0.15)",
      glow: "rgba(0, 255, 65, 0.4)",
    },
    amber: {
      primary: "#F59E0B",
      bg: "rgba(245, 158, 11, 0.05)",
      border: "rgba(245, 158, 11, 0.3)",
      hoverBg: "rgba(245, 158, 11, 0.15)",
      glow: "rgba(245, 158, 11, 0.4)",
    },
    blue: {
      primary: "#00A8FF",
      bg: "rgba(0, 168, 255, 0.05)",
      border: "rgba(0, 168, 255, 0.3)",
      hoverBg: "rgba(0, 168, 255, 0.15)",
      glow: "rgba(0, 168, 255, 0.4)",
    },
    red: {
      primary: "#EF4444",
      bg: "rgba(239, 68, 68, 0.05)",
      border: "rgba(239, 68, 68, 0.3)",
      hoverBg: "rgba(239, 68, 68, 0.15)",
      glow: "rgba(239, 68, 68, 0.4)",
    },
    cyan: {
      primary: "#00F5FF",
      bg: "rgba(0, 245, 255, 0.05)",
      border: "rgba(0, 245, 255, 0.3)",
      hoverBg: "rgba(0, 245, 255, 0.15)",
      glow: "rgba(0, 245, 255, 0.4)",
    },
    purple: {
      primary: "#A855F7",
      bg: "rgba(168, 85, 247, 0.05)",
      border: "rgba(168, 85, 247, 0.3)",
      hoverBg: "rgba(168, 85, 247, 0.15)",
      glow: "rgba(168, 85, 247, 0.4)",
    },
  };

  const currentTheme = themes[variant] || themes.default;

  // Generate a pseudo-random CID for tactical immersion
  const cid = useMemo(() => `CID-0x${Math.floor(Math.random() * 0x10000).toString(16).toUpperCase().padStart(4, '0')}`, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`tactical-uplink ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover="hover"
      onMouseEnter={playHover}
      onClick={playUplink}
    >
      {/* Clipped Background Layers */}
      <div className="uplink-shape-container">
        <div className="shape-bg" />
        <div className="shape-grid" />
        <div className="shape-scanline" />
        <div className="shape-border" />
      </div>

      {/* Header Info */}
      <div className="uplink-header">
        <div className="status-container">
          <div className="pulse-dot" />
          <span className="uplink-status">SECURE CHANNEL // ESTABLISHED</span>
        </div>
        <ShieldAlert size={10} className="security-icon" />
      </div>

      {/* Main Content */}
      <div className="uplink-body">
        <div className="icon-wrapper">
          <MessageSquare size={24} className="main-icon" />
          <div className="icon-overlay" />
        </div>
        
        <div className="content-stack">
          <motion.span 
            className="uplink-label"
            variants={{
              hover: { x: [0, -2, 2, -1, 0], transition: { duration: 0.2, repeat: Infinity } }
            }}
          >
            {label}
          </motion.span>
          <span className="uplink-subtitle">{subLabel} // ENCRYPTION ACTIVE</span>
        </div>
      </div>

      {/* Footer / Metadata */}
      <div className="uplink-footer">
        <div className="metadata-tag">
          <Cpu size={8} />
          <span>{cid}</span>
        </div>
        <div className="signal-bars">
          <div className="bar full" />
          <div className="bar full" />
          <div className="bar full" />
          <div className="bar empty" />
        </div>
      </div>

      <style jsx>{`
        .tactical-uplink {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 14px 20px;
          min-width: 280px;
          color: white;
          text-decoration: none;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tactical-uplink:hover {
          transform: translateY(-2px);
        }

        .uplink-shape-container {
          position: absolute;
          inset: 0;
          z-index: -1;
          clip-path: polygon(8% 0, 100% 0, 100% 75%, 92% 100%, 0 100%, 0 25%);
        }

        .shape-bg {
          position: absolute;
          inset: 0;
          background: ${currentTheme.bg};
          backdrop-filter: blur(20px);
          transition: background 0.3s;
        }

        .tactical-uplink:hover .shape-bg {
          background: ${currentTheme.hoverBg};
        }

        .shape-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 15px 15px;
          opacity: 0.4;
        }

        .shape-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.05) 50%,
            transparent
          );
          height: 10%;
          width: 100%;
          animation: scan 4s linear infinite;
          pointer-events: none;
        }

        .shape-border {
          position: absolute;
          inset: 0;
          border: 1px solid ${currentTheme.border};
          clip-path: polygon(8% 0, 100% 0, 100% 75%, 92% 100%, 0 100%, 0 25%);
          box-shadow: inset 0 0 15px rgba(255,255,255,0.02);
          transition: all 0.3s;
        }

        .tactical-uplink:hover .shape-border {
          border-color: ${currentTheme.primary};
          box-shadow: 0 0 25px ${currentTheme.glow}, inset 0 0 15px ${currentTheme.glow};
        }

        .uplink-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          opacity: 0.6;
        }

        .status-container {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pulse-dot {
          width: 5px;
          height: 5px;
          background: ${currentTheme.primary};
          border-radius: 50%;
          box-shadow: 0 0 8px ${currentTheme.primary};
          animation: pulse 1.5s ease-in-out infinite;
        }

        .uplink-status {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 1px;
        }

        .uplink-body {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-wrapper {
          position: relative;
          padding: 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }

        .main-icon {
          color: ${currentTheme.primary};
          filter: drop-shadow(0 0 5px ${currentTheme.primary});
        }

        .content-stack {
          display: flex;
          flex-direction: column;
        }

        .uplink-label {
          font-family: var(--font-tactical);
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .uplink-subtitle {
          font-family: var(--font-mono);
          font-size: 9px;
          opacity: 0.4;
          letter-spacing: 1px;
        }

        .uplink-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          opacity: 0.5;
        }

        .metadata-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 7px;
          background: rgba(255,255,255,0.05);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .signal-bars {
          display: flex;
          gap: 2px;
        }

        .bar {
          width: 2px;
          height: 8px;
          background: rgba(255,255,255,0.1);
        }

        .bar.full {
          background: ${currentTheme.primary};
          box-shadow: 0 0 4px ${currentTheme.primary}44;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .tactical-uplink {
            min-width: 240px;
            padding: 12px 16px;
          }
          .uplink-label { font-size: 12px; }
        }
      `}</style>
    </motion.a>
  );
}
