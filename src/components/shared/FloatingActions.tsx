"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, FileText, Radio, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useClientCore } from "@/app/ClientProviders";

/* ═══ Configuration Matrix ═══ */
const SECTION_CONFIG: Record<string, { invite: string; label: string; variant: "default"|"amber"|"blue"|"red"|"cyan"|"purple" }> = {
  "/kirastudios/namtar": { invite: "https://discord.gg/mypZpPsPeb", label: "NAMTAR OPS", variant: "amber" },
  "/kirastudios/frostheim": { invite: "https://discord.gg/uU5K64kXjY", label: "FROSTHEIM OPS", variant: "blue" },
  "/kirastudios/dysunsrealm": { invite: "https://discord.gg/R9Axsm7JfN", label: "DYSUN OPS", variant: "red" },
  "/pulse": { invite: "https://discord.gg/RmpHjJsSBC", label: "PULSE UPLINK", variant: "cyan" },
  "/kirastudios": { invite: "https://discord.gg/mypZpPsPeb", label: "KIRA STUDIOS", variant: "purple" },
  "/anu": { invite: "https://discord.gg/KqphHMq6vS", label: "ANU CONCIERGE", variant: "amber" },
  "default": { invite: "https://discord.gg/KqphHMq6vS", label: "SATCORP HQ", variant: "default" }
};

const THEMES = {
  default: { primary: "#00FF41", glow: "rgba(0, 255, 65, 0.5)", border: "rgba(0, 255, 65, 0.3)" },
  amber:   { primary: "#F59E0B", glow: "rgba(245, 158, 11, 0.5)", border: "rgba(245, 158, 11, 0.3)" },
  blue:    { primary: "#00A8FF", glow: "rgba(0, 168, 255, 0.5)", border: "rgba(0, 168, 255, 0.3)" },
  red:     { primary: "#EF4444", glow: "rgba(239, 68, 68, 0.5)", border: "rgba(239, 68, 68, 0.3)" },
  cyan:    { primary: "#00F5FF", glow: "rgba(0, 245, 255, 0.5)", border: "rgba(0, 245, 255, 0.3)" },
  purple:  { primary: "#A855F7", glow: "rgba(168, 85, 247, 0.5)", border: "rgba(168, 85, 247, 0.3)" },
};

export function FloatingActions() {
  const pathname = usePathname();
  const { playHover, playClick } = useClientCore();

  // 1. Resolve Discord Context
  const context = useMemo(() => {
    const key = Object.keys(SECTION_CONFIG).find(path => pathname?.startsWith(path));
    return SECTION_CONFIG[key || "default"];
  }, [pathname]);

  // 2. Visibility Logic
  const showSurvey = useMemo(() => {
    if (pathname === "/namtarsurvey") return false;
    return pathname?.includes("namtar") || pathname?.includes("frostheim") || pathname?.includes("dysun");
  }, [pathname]);

  // 3. Render Helpers
  const render3DPopButton = (id: string, icon: React.ReactNode, label: string, href: string, themeKey: keyof typeof THEMES, isExternal = false) => {
    const theme = THEMES[themeKey] || THEMES.default;
    
    const ButtonElement = isExternal ? motion.a : motion(Link as any);
    const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

    return (
      <ButtonElement
        {...props}
        key={id}
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.8 }}
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={playHover}
        onClick={playClick}
        className="action-btn"
      >
        <div className="btn-3d-layers">
          <div className="layer bg" />
          <div className="layer border" style={{ borderColor: theme.border }} />
          <div className="layer glow" style={{ background: `radial-gradient(circle at center, ${theme.glow}, transparent 70%)` }} />
        </div>
        
        <div className="btn-content">
          <div className="icon-wrapper" style={{ color: theme.primary }}>
            {icon}
            <div className="pulse-ring" style={{ border: `1px solid ${theme.primary}` }} />
          </div>
          <div className="label-wrapper">
            <span className="btn-label">{label}</span>
            <span className="btn-meta">UPLINK_0x{id.slice(0,2).toUpperCase()}</span>
          </div>
        </div>

        <style jsx>{`
          .action-btn {
            position: relative;
            height: 56px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            z-index: 10;
            overflow: visible;
          }

          .btn-3d-layers {
            position: absolute;
            inset: 0;
            z-index: -1;
            perspective: 500px;
          }

          .layer {
            position: absolute;
            inset: 0;
            border-radius: 8px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .layer.bg {
            background: rgba(10, 15, 25, 0.7);
            backdrop-filter: blur(20px) saturate(1.8);
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.4),
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
          }

          .layer.border {
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .layer.glow {
            opacity: 0;
            filter: blur(10px);
          }

          .action-btn:hover .layer.glow { opacity: 0.2; }
          .action-btn:hover .layer.bg { background: rgba(15, 22, 35, 0.85); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
          .action-btn:hover .layer.border { border-color: ${theme.primary}; box-shadow: 0 0 15px ${theme.glow}; }

          .btn-content {
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 2;
          }

          .icon-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .pulse-ring {
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            opacity: 0;
          }
          .action-btn:hover .pulse-ring {
            animation: ring-pop 1.5s infinite;
          }

          @keyframes ring-pop {
            0% { transform: scale(0.8); opacity: 0.6; }
            100% { transform: scale(1.4); opacity: 0; }
          }

          .label-wrapper {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .btn-label {
            font-family: var(--font-tactical);
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            white-space: nowrap;
          }

          .btn-meta {
            font-family: var(--font-mono);
            font-size: 7px;
            letter-spacing: 1px;
            opacity: 0.4;
          }

          @media (max-width: 768px) {
            .btn-label { font-size: 9px; letter-spacing: 1px; }
            .action-btn { height: 48px; padding: 0 14px; }
            .btn-meta { display: none; }
          }
        `}</style>
      </ButtonElement>
    );
  };

  return (
    <div className="fixed top-[100px] right-8 z-[9999] pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {/* 1. DISCORD BUTTON */}
          {context && render3DPopButton(
            "discord",
            <MessageSquare size={18} />,
            context.label,
            context.invite,
            context.variant,
            true
          )}

          {/* 2. SURVEY BUTTON */}
          {showSurvey && render3DPopButton(
            "survey",
            <FileText size={18} />,
            "QUALIFICATION SURVEY",
            "/namtarsurvey",
            "cyan"
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
