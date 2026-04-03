"use client";

import { Shield } from "lucide-react";
import { MissionClock } from "./MissionClock";

export function TacticalHeader() {
  return (
    <header className="topbar spatial-panel">
      <div className="logo-group">
        <Shield size={18} strokeWidth={1.5} className="logo-icon" />
        <div>
          <span className="logo-name">SATCORP</span>
          <span className="logo-sub">TACTICAL COMMAND & CONTROL</span>
        </div>
      </div>
      <MissionClock />
      <div className="status-row">
        <span className="status-dot" />
        <span>SYSTEMS NOMINAL</span>
      </div>
    </header>
  );
}
