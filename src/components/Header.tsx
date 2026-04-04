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
          {/* Left: Blank */}
          <div className="w-12 h-12" />

          {/* Center: Title with dynamic effect */}
          <Link 
            href="/" 
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex flex-col items-center group cursor-pointer"
          >
            <h1 className={`text-xl md:text-2xl font-orbitron font-black tracking-[0.4em] transition-all duration-500 ${pageConfig.effect}`}>
              {pageConfig.title}
            </h1>
            <div className="h-[1px] w-0 group-hover:w-full bg-current transition-all duration-500 opacity-30 mt-1" />
          </Link>

          {/* Right: Menu Toggle */}
          <button
            onClick={() => { playClick(); setIsMenuOpen(true); }}
            onMouseEnter={playHover}
            className="p-3 hover:bg-white/5 rounded-lg transition-all group relative overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <div className="w-8 h-[2px] bg-white/80 group-hover:bg-cyan-400 group-hover:w-6 transition-all" />
              <div className="w-6 h-[2px] bg-white/80 group-hover:bg-cyan-400 group-hover:w-8 transition-all" />
              <div className="w-8 h-[2px] bg-white/80 group-hover:bg-cyan-400 group-hover:w-5 transition-all" />
            </div>
            {/* Hover Glitch Effect */}
            <div className="absolute inset-0 bg-cyan-400/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
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
