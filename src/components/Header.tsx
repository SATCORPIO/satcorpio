"use client";

import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { SiteMapMenu } from "./SiteMapMenu";
import { useClientCore } from "@/app/ClientProviders";

export function Header() {
  const pathname = usePathname();
  const { playClick, playHover } = useClientCore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Skip on survey page
  if (pathname === "/namtarsurvey") return null;

  // 2. Resolve page title and effect
  const pageConfig = useMemo(() => {
    if (pathname === "/") return { title: "SATCORP HUB", effect: "glow-green", color: "#00FF41" };
    if (pathname?.includes("kyrax")) return { title: "KYRAX AI", effect: "chromatic", color: "#A855F7" };
    if (pathname?.includes("anu")) return { title: "ANU CONCIERGE", effect: "neon-gold", color: "#EAB308" };
    if (pathname?.includes("pulse")) return { title: "PULSE BROADCAST", effect: "glow-blue", color: "#22D3EE" };
    if (pathname?.includes("kirastudios")) return { title: "KI-RA STUDIOS", effect: "multi-glow", color: "#FFFFFF" };
    return { title: "SATCORP", effect: "glow-white", color: "#FFFFFF" };
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9000] border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="max-w-[1400px] mx-auto h-20 px-8 flex items-center justify-between">
          {/* Left: Blank Space (per v3.0 spec) */}
          <div className="w-16 hidden md:block" />

          {/* Center: Tactical Page Title */}
          <Link 
            href="/" 
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex flex-col items-center group cursor-pointer transition-transform duration-300 active:scale-95"
          >
            <div className="relative">
              <h1 className={`text-xl md:text-3xl font-orbitron font-black tracking-[0.5em] transition-all duration-700 ${pageConfig.effect}`}>
                {pageConfig.title}
              </h1>
              {/* Underline Glitch */}
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-current opacity-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </div>
            <span className="text-[7px] font-mono tracking-[0.8em] text-white/20 mt-3 group-hover:text-white/40 transition-colors uppercase">
              Tactical Command Interface
            </span>
          </Link>

          {/* Right: Markdown Menu (3 Lines) */}
          <button
            onClick={() => { playClick(); setIsMenuOpen(true); }}
            onMouseEnter={playHover}
            className="p-4 hover:bg-white/5 rounded-xl transition-all group relative"
            aria-label="Open Site Map"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <div className="w-8 h-[2px] bg-white group-hover:bg-cyan-400 group-hover:w-10 transition-all duration-300" />
              <div className="w-10 h-[2px] bg-white group-hover:bg-cyan-400 group-hover:w-8 transition-all duration-300" />
              <div className="w-8 h-[2px] bg-white group-hover:bg-cyan-400 group-hover:w-10 transition-all duration-300" />
            </div>
            {/* Visual Flare */}
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </header>

      <SiteMapMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <style jsx global>{`
        /* ─── TITLE EFFECTS ─── */
        
        .glow-green {
          color: #00FF41;
          text-shadow: 0 0 10px rgba(0, 255, 65, 0.4), 0 0 20px rgba(0, 255, 65, 0.2);
          animation: pulse-glow-green 4s infinite;
        }
        @keyframes pulse-glow-green {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(0, 255, 65, 0.4); }
          50% { opacity: 0.8; text-shadow: 0 0 25px rgba(0, 255, 65, 0.6); }
        }

        .chromatic {
          color: #A855F7;
          position: relative;
          text-shadow: 
            2px 0 0 rgba(255, 0, 255, 0.5), 
            -2px 0 0 rgba(0, 255, 255, 0.5);
          animation: chromatic-anim 2s infinite;
        }
        @keyframes chromatic-anim {
          0% { text-shadow: 2px 0 0 rgba(255, 0, 255, 0.5), -2px 0 0 rgba(0, 255, 255, 0.5); }
          50% { text-shadow: -2px 0 0 rgba(255, 0, 255, 0.5), 2px 0 0 rgba(0, 255, 255, 0.5); }
          100% { text-shadow: 2px 0 0 rgba(255, 0, 255, 0.5), -2px 0 0 rgba(0, 255, 255, 0.5); }
        }

        .neon-gold {
          color: #EAB308;
          text-shadow: 
            0 0 5px #EAB308,
            0 0 10px #EAB308,
            0 0 20px #EAB308,
            0 0 40px rgba(234, 179, 8, 0.4);
        }

        .glow-blue {
          color: #22D3EE;
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
          animation: blue-pulse 3s infinite ease-in-out;
        }
        @keyframes blue-pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.02); filter: brightness(1.2); }
        }

        .multi-glow {
          color: #FFFFFF;
          text-shadow: 
            0 0 10px #A855F7,
            0 0 20px rgba(168, 85, 247, 0.4),
            0 0 30px rgba(255, 255, 255, 0.2);
        }

        .glow-white {
          color: #FFFFFF;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .glitch-anim {
          animation: glitch 1s infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(-2px, -1px); }
          60% { transform: translate(2px, 1px); }
          80% { transform: translate(2px, -1px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </>
  );
}
