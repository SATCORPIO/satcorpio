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
      <header className="fixed top-0 left-0 w-full z-[9000] border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="max-w-[1600px] mx-auto h-24 px-10 flex items-center justify-between relative">
          {/* Left: Tactical Spacer (Blank as requested) */}
          <div className="hidden md:flex w-32 h-full items-center">
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="ml-4 flex flex-col gap-1">
              <div className="w-4 h-[1px] bg-white/20" />
              <div className="w-2 h-[1px] bg-white/20" />
            </div>
          </div>

          {/* Center: Interactive Page Title */}
          <Link 
            href="/" 
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex flex-col items-center group cursor-pointer absolute left-1/2 -translate-x-1/2 z-10"
          >
            <div className="relative">
              <h1 className={`text-2xl md:text-3xl font-orbitron font-black tracking-[0.5em] transition-all duration-700 uppercase ${pageConfig.effect} group-hover:scale-105`}>
                {pageConfig.title}
              </h1>
              {/* Tactical Scanline on Title */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 overflow-hidden">
                <div className="w-full h-[1px] bg-white animate-scanline" />
              </div>
            </div>
            <div className="h-[2px] w-12 group-hover:w-full bg-current transition-all duration-700 opacity-20 mt-2" />
            <p className="text-[7px] font-mono tracking-[0.4em] opacity-0 group-hover:opacity-40 transition-all duration-500 uppercase mt-1">Uplink established // Return to core</p>
          </Link>

          {/* Right: Full-Screen Menu Toggle */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex flex-col items-end text-[8px] font-mono text-white/30 tracking-[0.2em] uppercase">
              <span>LOC_0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
              <span>SECURE_UPLINK</span>
            </div>
            <button
              id="menu-trigger"
              onClick={() => { playClick(); setIsMenuOpen(true); }}
              onMouseEnter={playHover}
              className="p-4 hover:bg-white/5 rounded-none border-l border-white/5 transition-all group relative overflow-hidden"
              aria-label="Open Menu"
            >
              <div className="flex flex-col gap-2 items-end">
                <div className="w-10 h-[2px] bg-white group-hover:bg-cyan-400 transition-all duration-300" />
                <div className="w-7 h-[2px] bg-white/60 group-hover:bg-cyan-400/60 transition-all duration-300" />
                <div className="w-10 h-[2px] bg-white group-hover:bg-cyan-400 transition-all duration-300" />
              </div>
              {/* Visual Glitch Hover State */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
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

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
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
