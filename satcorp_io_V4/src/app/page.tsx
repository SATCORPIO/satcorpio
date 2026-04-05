"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-accent-teal) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full tactical-border bg-accent/5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent tracking-[0.3em] uppercase">System Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          SYSTEM INITIALIZED
        </h1>
        
        <p className="max-w-2xl mx-auto text-text-muted font-mono text-sm md:text-base leading-relaxed tracking-wide opacity-80">
          CORE MODULES LOADED // STABLE UPLINK ESTABLISHED<br />
          SATCORP V4.0 DEEP SPACE INFRASTRUCTURE ACTIVE
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-accent/50 to-transparent" />
          <span className="text-[10px] font-mono text-text-dim uppercase tracking-[0.5em]">Awaiting Further Instructions</span>
        </motion.div>
      </motion.div>

      {/* Frame Decor */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/20" />
    </div>
  );
}
