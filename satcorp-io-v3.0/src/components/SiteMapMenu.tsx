"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, MessageSquare, ExternalLink, ShieldCheck, ShoppingCart } from "lucide-react";
import { useClientCore } from "@/app/ClientProviders";

interface SiteMapMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuLink {
  label: string;
  href: string;
  id: string;
  discord?: string;
  isComingSoon?: boolean;
  subLinks?: {
    label: string;
    href: string;
    discord?: string;
  }[];
}

interface MenuCategory {
  category: string;
  links: MenuLink[];
}

const MENU_STRUCTURE: MenuCategory[] = [
  {
    category: "OPERATIONAL CORE",
    links: [
      { label: "NEURAL HUB (HOME)", href: "/", id: "home", discord: "https://discord.gg/KqphHMq6vS" },
      { label: "NAMTAR CALIBRATION", href: "/namtarsurvey", id: "survey" },
    ]
  },
  {
    category: "TACTICAL DIVISIONS",
    links: [
      { 
        label: "KI-RA STUDIOS", 
        href: "/kirastudios", 
        id: "kira",
        discord: "https://discord.gg/mypZpPsPeb",
        subLinks: [
          { label: "NAMTAR OPERATION", href: "/kirastudios/namtar", discord: "https://discord.gg/mypZpPsPeb" },
          { label: "FROSTHEIM OPERATION", href: "/kirastudios/frostheim", discord: "https://discord.gg/uU5K64kXjY" },
          { label: "DYSUN OPERATION", href: "/kirastudios/dysunsrealm", discord: "https://discord.gg/R9Axsm7JfN" },
        ]
      },
      { 
        label: "PULSE BROADCAST", 
        href: "/pulse", 
        id: "pulse",
        discord: "https://discord.gg/RmpHjJsSBC"
      },
      { 
        label: "ANU CONCIERGE", 
        href: "/anu", 
        id: "anu",
        discord: "https://discord.gg/KqphHMq6vS"
      },
      { 
        label: "KYRAX AI", 
        href: "/kyrax", 
        id: "kyrax",
        discord: "https://discord.gg/KqphHMq6vS"
      }
    ]
  },
  {
    category: "LOGISTICS & ASSETS",
    links: [
      { label: "SERVICE PORTAL (v4.0)", href: "/service", id: "shop", isComingSoon: true },
      { label: "OPERATOR DOSSIER", href: "/#dossier", id: "dossier" },
    ]
  }
];

export function SiteMapMenu({ isOpen, onClose }: SiteMapMenuProps) {
  const pathname = usePathname();
  const { playClick, playHover } = useClientCore();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setGlitchActive(true);
      const timer = setTimeout(() => setGlitchActive(false), 500);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);

  const glitchVariants = {
    initial: { opacity: 0, scale: 1.1, filter: "blur(10px) brightness(2)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px) brightness(1)",
      transition: { duration: 0.4, ease: "easeOut" }
    } as any,
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      filter: "blur(10px) brightness(0.5)",
      transition: { duration: 0.3 }
    } as any
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#030508]/fb-95 backdrop-blur-2xl ${glitchActive ? 'glitch-overlay' : ''}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={glitchVariants}
        >
          {/* ─── DIGITAL GLITCH BACKGROUND ELEMENTS ─── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            <div className="absolute inset-0 scanline-fast" />
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-cyan-500/30 animate-pulse" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-purple-500/30 animate-pulse delay-700" />
          </div>

          <div className="relative w-full h-full max-w-7xl mx-auto p-8 md:p-16 flex flex-col">
            {/* ─── HEADER ─── */}
            <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-cyan-400" size={24} />
                <div>
                  <h2 className="text-2xl font-black tracking-[0.3em] font-orbitron">SATCORP MAP</h2>
                  <p className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase">System Navigation // v3.0 // Authorized Access Only</p>
                </div>
              </div>
              <button 
                onClick={() => { playClick(); onClose(); }}
                className="p-3 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X size={24} className="text-white/60 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            {/* ─── CONTENT GRID ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 flex-1 overflow-y-auto pr-6 custom-scrollbar">
              {MENU_STRUCTURE.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
                  className="flex flex-col gap-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-4 bg-cyan-500/50" />
                    <h3 className="text-[11px] font-mono tracking-[5px] text-cyan-400 uppercase">{section.category}</h3>
                  </div>

                  <div className="flex flex-col gap-8">
                    {section.links.map((link, lIdx) => {
                      const isActive = pathname === link.href;
                      const isComingSoon = link.isComingSoon;

                      return (
                        <div key={lIdx} className="group flex flex-col gap-4 relative">
                          {/* Active Marker */}
                          {isActive && (
                            <motion.div 
                              layoutId="activePointer"
                              className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rotate-45 shadow-[0_0_10px_#22D3EE]"
                            />
                          )}

                          <div className="flex items-center justify-between gap-4">
                            <Link 
                              href={isComingSoon ? "#" : link.href}
                              onClick={() => { if(!isComingSoon) { playClick(); onClose(); } }}
                              onMouseEnter={playHover}
                              className={`text-xl md:text-2xl font-orbitron tracking-[0.2em] transition-all duration-300 ${isActive ? 'text-cyan-400 glow-cyan translate-x-2' : isComingSoon ? 'text-white/10 cursor-not-allowed' : 'text-white/50 hover:text-white hover:translate-x-2'}`}
                            >
                              {link.label}
                            </Link>
                            
                            {link.discord && (
                              <a 
                                href={link.discord} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onMouseEnter={playHover}
                                onClick={playClick}
                                className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-sm text-[8px] font-mono text-blue-400/60 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 transition-all uppercase tracking-widest"
                              >
                                <span className="hidden sm:inline">UPLINK</span>
                                <MessageSquare size={12} />
                              </a>
                            )}
                          </div>

                          {link.subLinks && (
                            <div className="ml-6 flex flex-col gap-4 border-l border-white/5 pl-8 py-2">
                              {link.subLinks.map((sub: any, sIdx: number) => {
                                const isSubActive = pathname === sub.href;
                                return (
                                  <div key={sIdx} className="flex items-center justify-between group/sub">
                                    <div className="flex items-center gap-3">
                                      {isSubActive && <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />}
                                      <Link 
                                        href={sub.href}
                                        onClick={() => { playClick(); onClose(); }}
                                        onMouseEnter={playHover}
                                        className={`text-sm md:text-base tracking-[0.15em] transition-all ${isSubActive ? 'text-cyan-400' : 'text-white/30 hover:text-white'}`}
                                      >
                                        {sub.label}
                                      </Link>
                                    </div>
                                    {sub.discord && (
                                      <a 
                                        href={sub.discord} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-white/10 hover:text-blue-400 transition-colors p-1"
                                        title={`${sub.label} Discord`}
                                      >
                                        <MessageSquare size={14} />
                                      </a>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ─── FOOTER ─── */}
            <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
              <div className="flex items-center gap-4 text-[10px] font-mono text-white/30 tracking-tighter">
                <span>LATENCY: 12MS</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>UPLINK: SECURE</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>TERMINAL: 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-[2px]">CLASSIFICATION: UNRESTRICTED MAP HUB</div>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            .glow-cyan {
              text-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
            }
            .glitch-overlay {
              animation: glitch-anim 0.3s steps(2) infinite;
            }
            @keyframes glitch-anim {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 2px); }
              40% { transform: translate(2px, -1px); }
              60% { transform: translate(-1px, -2px); }
              80% { transform: translate(1px, 2px); }
              100% { transform: translate(0); }
            }
            .scanline-fast {
              background: linear-gradient(
                to bottom,
                transparent 50%,
                rgba(34, 211, 238, 0.1) 50.5%,
                transparent 51%
              );
              background-size: 100% 4px;
              animation: scanline 4s linear infinite;
            }
            @keyframes scanline {
              from { transform: translateY(-100%); }
              to { transform: translateY(100%); }
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.02);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(34, 211, 238, 0.2);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(34, 211, 238, 0.4);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
