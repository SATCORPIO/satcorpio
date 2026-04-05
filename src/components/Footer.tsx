import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-6 py-8 mt-auto tactical-border-top bg-surface/30 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-text-muted tracking-widest leading-none">SATCORP OPERATIONAL INTERFACE</span>
          <span className="text-[10px] font-mono text-text-dim tracking-widest mt-1">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 group cursor-pointer">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent tracking-widest uppercase">STATION READY</span>
        </div>
        
        <div className="text-[10px] font-mono text-text-muted border-l border-border pl-6 flex flex-col">
          <span className="opacity-50">LOCATION: </span>
          <span className="tracking-widest">DEEP SPACE HUB // 2026</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
