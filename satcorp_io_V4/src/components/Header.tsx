"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Wifi, Battery, Shield, Cpu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4 hud-glass tactical-border-bottom flex items-center justify-between">
      <div className="flex items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-accent/20 rounded-sm flex items-center justify-center tactical-border glow-teal">
            <Cpu size={18} className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-accent tracking-widest opacity-70">SATCORP COMMAND</span>
            <span className="text-lg font-display tracking-widest font-bold">UNIT: SAT-2026</span>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 ml-4">
          {['DASHBOARD', 'NETWORK', 'OPERATIONS', 'INTEL'].map((item, i) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              href="#"
              className="text-[10px] font-mono tracking-[0.2em] text-text-muted hover:text-accent transition-tactical cursor-pointer"
            >
              [{item}]
            </motion.a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-text-dim border-l border-border pl-6">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-accent opacity-50" />
            <span className="tracking-widest">SECURE</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={12} className="text-accent opacity-50" />
            <span className="tracking-widest">UPLINK</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery size={12} className="text-accent opacity-50" />
            <span className="tracking-widest">100%</span>
          </div>
        </div>
        
        <button className="p-2 hover:bg-white/5 rounded-full transition-tactical cursor-pointer group">
          <Menu size={20} className="text-text-primary group-hover:text-accent" />
        </button>
      </div>
    </header>
  );
};

export default Header;
