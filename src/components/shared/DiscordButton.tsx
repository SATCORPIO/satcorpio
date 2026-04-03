"use client";

import React, { useMemo } from "react";
import { MessageSquare, ShieldAlert, Cpu, Radio } from "lucide-react";
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
      border: "rgba(0, 255, 65, 0.25)",
      glow: "rgba(0, 255, 65, 0.45)",
      bg: "rgba(0, 255, 65, 0.03)",
    },
    amber: {
      primary: "#F59E0B",
      border: "rgba(245, 158, 11, 0.25)",
      glow: "rgba(245, 158, 11, 0.45)",
      bg: "rgba(245, 158, 11, 0.03)",
    },
    blue: {
      primary: "#00A8FF",
      border: "rgba(0, 168, 255, 0.25)",
      glow: "rgba(0, 168, 255, 0.45)",
      bg: "rgba(0, 168, 255, 0.03)",
    },
    red: {
      primary: "#EF4444",
      border: "rgba(239, 68, 68, 0.25)",
      glow: "rgba(239, 68, 68, 0.45)",
      bg: "rgba(239, 68, 68, 0.03)",
    },
    cyan: {
      primary: "#00F5FF",
      border: "rgba(0, 245, 255, 0.25)",
      glow: "rgba(0, 245, 255, 0.45)",
      bg: "rgba(0, 245, 255, 0.03)",
    },
    purple: {
      primary: "#A855F7",
      border: "rgba(168, 85, 247, 0.25)",
      glow: "rgba(168, 85, 247, 0.45)",
      bg: "rgba(168, 85, 247, 0.03)",
    },
  };

  const currentTheme = themes[variant] || themes.default;

  const cid = useMemo(() => `NODE-0x${Math.floor(Math.random() * 0x10000).toString(16).toUpperCase().padStart(4, '0')}`, []);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`premium-uplink ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      onMouseEnter={playHover}
      onClick={playUplink}
    >
      {/* Premium Glass Background */}
      <div className="glass-back" />
      <div className="border-glow" />
      
      {/* Decorative Corners */}
      <div className="corner top-left" />
      <div className="corner bottom-right" />

      {/* Content Layout */}
      <div className="uplink-inner">
        <div className="uplink-meta">
          <div className="meta-left">
            <Radio size={10} className="pulse-icon" />
            <span>ENCRYPTED // {cid}</span>
          </div>
          <ShieldAlert size={10} className="security-icon" />
        </div>

        <div className="uplink-main">
          <div className="icon-container">
            <MessageSquare size={20} className="discord-icon" />
            <div className="icon-pulse" />
          </div>
          
          <div className="text-stack">
            <span className="label-text">{label}</span>
            <span className="subtitle-text">{subLabel} // DIRECT LINK</span>
          </div>
        </div>

        <div className="uplink-status">
          <div className="status-bars">
            <div className="bar active" />
            <div className="bar active" />
            <div className="bar active" />
            <div className="bar dim" />
          </div>
          <span className="status-label">UPLINK STABLE</span>
        </div>
      </div>

      <style jsx>{`
        .premium-uplink {
          position: relative;
          display: inline-block;
          width: fit-content;
          min-width: 260px;
          padding: 1px; /* Border gap */
          text-decoration: none;
          color: white;
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-uplink:hover {
          transform: translateY(-3px) scale(1.02);
        }

        .glass-back {
          position: absolute;
          inset: 0;
          background: rgba(10, 15, 25, 0.6);
          backdrop-filter: blur(24px) saturate(1.5);
          -webkit-backdrop-filter: blur(24px) saturate(1.5);
          border: 1px solid ${currentTheme.border};
          border-radius: 4px;
          z-index: 1;
          transition: all 0.3s ease;
        }

        .premium-uplink:hover .glass-back {
          background: rgba(15, 22, 35, 0.8);
          border-color: ${currentTheme.primary};
          box-shadow: inset 0 0 20px ${currentTheme.bg};
        }

        .border-glow {
          position: absolute;
          inset: -2px;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${currentTheme.primary} 0%, transparent 60%);
          opacity: 0;
          z-index: 0;
          transition: opacity 0.4s;
        }

        .premium-uplink:hover .border-glow {
          opacity: 0.15;
        }

        .corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 2px solid ${currentTheme.primary};
          z-index: 3;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .top-left { top: 0; left: 0; border-right: none; border-bottom: none; }
        .bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }

        .premium-uplink:hover .corner {
          opacity: 1;
        }

        .uplink-inner {
          position: relative;
          z-index: 2;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .uplink-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 1.5px;
          color: rgba(255, 255, 255, 0.3);
        }

        .meta-left { display: flex; align-items: center; gap: 6px; }
        .pulse-icon { color: ${currentTheme.primary}; animation: pulse 2s infinite; }

        .uplink-main {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-container {
          position: relative;
          background: rgba(255, 255, 255, 0.04);
          padding: 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .discord-icon {
          color: ${currentTheme.primary};
          filter: drop-shadow(0 0 8px ${currentTheme.glow});
          transition: transform 0.3s;
        }

        .premium-uplink:hover .discord-icon {
          transform: scale(1.1);
        }

        .icon-pulse {
          position: absolute;
          inset: 0;
          border: 1px solid ${currentTheme.primary};
          border-radius: 6px;
          opacity: 0;
        }

        .premium-uplink:hover .icon-pulse {
          animation: ring-pulse 1.5s infinite;
        }

        .text-stack { display: flex; flex-direction: column; gap: 2px; }
        .label-text {
          font-family: var(--font-tactical);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #FFF;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .subtitle-text {
          font-family: var(--font-mono);
          font-size: 8px;
          opacity: 0.4;
          letter-spacing: 1px;
        }

        .uplink-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }

        .status-bars { display: flex; gap: 3px; }
        .bar { width: 3px; height: 10px; border-radius: 1px; }
        .bar.active { background: ${currentTheme.primary}; box-shadow: 0 0 5px ${currentTheme.glow}; }
        .bar.dim { background: rgba(255, 255, 255, 0.1); }

        .status-label {
          font-family: var(--font-mono);
          font-size: 7px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.2);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }

        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        @media (max-width: 768px) {
          .premium-uplink { min-width: 220px; }
          .label-text { font-size: 12px; }
          .uplink-inner { padding: 12px 16px; }
        }
      `}</style>
    </motion.a>
  );
}
