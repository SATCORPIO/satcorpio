"use client";

import React from "react";
import { MessageSquare, Radio } from "lucide-react";
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
  label = "ESTABLISH MISSION UPLINK",
  subLabel = "SATCORP // MISSION CONTROL",
  variant = "default",
  className = "",
}: DiscordButtonProps) {
  const { playHover, playClick } = useClientCore();

  const themes = {
    default: {
      primary: "var(--c2-green, #00FF41)",
      bg: "rgba(0, 255, 65, 0.03)",
      border: "rgba(0, 255, 65, 0.2)",
      hoverBg: "rgba(0, 255, 65, 0.1)",
      glow: "rgba(0, 255, 65, 0.2)",
    },
    amber: {
      primary: "var(--namtar-amber, #D97706)",
      bg: "rgba(217, 119, 6, 0.03)",
      border: "rgba(217, 119, 6, 0.2)",
      hoverBg: "rgba(217, 119, 6, 0.12)",
      glow: "rgba(217, 119, 6, 0.25)",
    },
    blue: {
      primary: "var(--ue5-blue, #00A8FF)",
      bg: "rgba(0, 168, 255, 0.03)",
      border: "rgba(0, 168, 255, 0.2)",
      hoverBg: "rgba(0, 168, 255, 0.12)",
      glow: "rgba(0, 168, 255, 0.3)",
    },
    red: {
      primary: "var(--c2-red, #EF4444)",
      bg: "rgba(239, 68, 68, 0.03)",
      border: "rgba(239, 68, 68, 0.2)",
      hoverBg: "rgba(239, 68, 68, 0.1)",
      glow: "rgba(239, 68, 68, 0.25)",
    },
    cyan: {
      primary: "var(--pulse-cyan, #00F5FF)",
      bg: "rgba(0, 245, 255, 0.03)",
      border: "rgba(0, 245, 255, 0.2)",
      hoverBg: "rgba(0, 245, 255, 0.1)",
      glow: "rgba(0, 245, 255, 0.25)",
    },
    purple: {
      primary: "#A855F7",
      bg: "rgba(168, 85, 247, 0.03)",
      border: "rgba(168, 85, 247, 0.2)",
      hoverBg: "rgba(168, 85, 247, 0.12)",
      glow: "rgba(168, 85, 247, 0.3)",
    },
  };

  const currentTheme = themes[variant] || themes.default;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`discord-uplink spatial-panel ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={playHover}
      onClick={playClick}
    >
      <div className="uplink-scanner" />
      <div className="uplink-glow" />
      
      <div className="uplink-status-tray">
        <div className="status-ping" />
        <span className="status-text">UPLINK: ACTIVE</span>
      </div>

      <div className="uplink-main">
        <div className="icon-box">
          <MessageSquare size={20} className="main-icon" />
          <Radio size={12} className="sub-icon pulse-anim" />
        </div>
        
        <div className="uplink-content">
          <span className="uplink-label">{label}</span>
          <span className="uplink-sublabel">{subLabel}</span>
        </div>
      </div>

      <style jsx>{`
        .discord-uplink {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 28px;
          text-decoration: none;
          color: ${currentTheme.primary};
          background: ${currentTheme.bg};
          border: 1px solid ${currentTheme.border};
          backdrop-filter: blur(12px);
          border-radius: 8px;
          overflow: hidden;
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 280px;
        }

        .discord-uplink:hover {
          background: ${currentTheme.hoverBg};
          border-color: ${currentTheme.primary};
          box-shadow: 0 0 30px ${currentTheme.glow};
          color: white;
        }

        .uplink-scanner {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            ${currentTheme.primary}44,
            transparent
          );
          height: 20%;
          width: 100%;
          opacity: 0.1;
          pointer-events: none;
          animation: scan-vertical 3s linear infinite;
        }

        .uplink-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, ${currentTheme.primary}22, transparent 70%);
          opacity: 0;
          transition: opacity 400ms;
        }

        .discord-uplink:hover .uplink-glow {
          opacity: 1;
        }

        .uplink-status-tray {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .status-ping {
          width: 6px;
          height: 6px;
          background: ${currentTheme.primary};
          border-radius: 50%;
          position: relative;
        }

        .status-ping::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1px solid ${currentTheme.primary};
          border-radius: 50%;
          animation: ping-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 2px;
          opacity: 0.6;
        }

        .uplink-main {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-icon {
          filter: drop-shadow(0 0 8px ${currentTheme.primary});
        }

        .sub-icon {
          position: absolute;
          top: -8px;
          right: -8px;
          opacity: 0.8;
        }

        .uplink-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .uplink-label {
          font-family: var(--font-tactical);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          line-height: 1.2;
        }

        .uplink-sublabel {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 400ms;
        }

        .discord-uplink:hover .uplink-sublabel {
          color: rgba(255, 255, 255, 0.7);
        }

        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        @keyframes ping-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .pulse-anim {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px currentColor); }
          50% { opacity: 0.4; filter: drop-shadow(0 0 1px currentColor); }
        }

        @media (max-width: 768px) {
          .discord-uplink {
            min-width: unset;
            width: 100%;
            padding: 16px 20px;
          }
          .uplink-label { font-size: 11px; }
          .uplink-sublabel { font-size: 8px; }
        }
      `}</style>
    </motion.a>
  );
}
