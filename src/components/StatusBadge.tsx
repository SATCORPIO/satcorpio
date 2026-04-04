"use client";

import React from "react";

type StatusType = "ACTIVE" | "TRANSMITTING" | "LOCKED" | "OPERATIONAL";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

/**
 * StatusBadge
 * High-fidelity tactical status indicator with specific pulse behaviors.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "ACTIVE":
        return {
          color: "var(--color-accent-success)",
          label: "ACTIVE",
          animation: "status-pulse 2s infinite",
          icon: null,
        };
      case "TRANSMITTING":
        return {
          color: "var(--color-accent-primary)",
          label: "TRANSMITTING",
          animation: "status-pulse 1.2s infinite, flicker 3s infinite",
          icon: null,
        };
      case "OPERATIONAL":
        return {
          color: "var(--color-accent-primary)",
          label: "OPERATIONAL",
          animation: "status-pulse 3s infinite",
          icon: null,
        };
      case "LOCKED":
        return {
          color: "var(--color-accent-warn)",
          label: "LOCKED",
          animation: "none",
          icon: "🔒",
        };
      default:
        return {
          color: "var(--color-text-muted)",
          label: status,
          animation: "none",
          icon: null,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div 
      className={`status-badge ${className}`}
      aria-label={`Status: ${status}`}
    >
      <span className="status-dot" style={{ backgroundColor: config.color, animation: config.animation }} />
      <span className="status-text" style={{ color: config.color }}>
        {config.icon && <span className="status-icon">{config.icon} </span>}
        {config.label}
      </span>

      <style jsx>{`
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }
        .status-text {
          font-family: var(--font-share-tech-mono), var(--font-mono), monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .status-icon {
          font-size: 9px;
          margin-right: 2px;
        }
      `}</style>
    </div>
  );
};
