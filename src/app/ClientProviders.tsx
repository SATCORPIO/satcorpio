"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AudioEngine } from "@/lib/AudioEngine";

interface ClientContextType {
  audioReady: boolean;
  playHover: () => void;
  playClick: () => void;
  registerVisit: (sectionId: string) => void;
  getInsights: () => { [key: string]: number };
}

const ClientContext = createContext<ClientContextType>({
  audioReady: false,
  playHover: () => {},
  playClick: () => {},
  registerVisit: () => {},
  getInsights: () => ({}),
});

export const useClientCore = () => useContext(ClientContext);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [audioReady, setAudioReady] = useState(false);
  const [interactions, setInteractions] = useState<{ [key: string]: number }>({});
  const [showConsent, setShowConsent] = useState(true);

  // Initialize AI UX memories
  useEffect(() => {
    try {
      const stored = localStorage.getItem("satcorp_ai_ux");
      if (stored) {
        setInteractions(JSON.parse(stored));
      }
    } catch(e) { console.warn("Failed to load AI UX data") }
  }, []);

  const registerVisit = (sectionId: string) => {
    setInteractions(prev => {
      const nw = { ...prev, [sectionId]: (prev[sectionId] || 0) + 1 };
      try {
        localStorage.setItem("satcorp_ai_ux", JSON.stringify(nw));
      } catch(e) {}
      return nw;
    });
  };

  const getInsights = () => interactions;

  const initSystem = async () => {
    await AudioEngine.init();
    setAudioReady(true);
    setShowConsent(false);
    AudioEngine.startHum();
  };

  return (
    <ClientContext.Provider value={{
      audioReady,
      playHover: () => audioReady && AudioEngine.playHover(),
      playClick: () => {
        if(audioReady) AudioEngine.playClick();
      },
      registerVisit,
      getInsights,
    }}>
      {showConsent && (
        <div className="fixed inset-0 z-[9999] bg-[#030508] bg-opacity-95 flex flex-col items-center justify-center font-mono">
          <div className="border border-[#00ff41] border-opacity-30 p-8 rounded bg-[#00ff41] bg-opacity-5 flex flex-col items-center max-w-md text-center">
            <h2 className="text-[#00ff41] font-bold tracking-[6px] mb-4 text-xl">INITIALIZE SYSTEM?</h2>
            <p className="text-gray-400 text-[10px] tracking-widest mb-8 uppercase">Activation requires Audio & Sensory protocols.</p>
            <button 
              onClick={initSystem}
              className="px-6 py-3 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all font-bold tracking-widest text-xs uppercase"
            >
              [ ACCEPT & PROCEED ]
            </button>
          </div>
        </div>
      )}
      {children}
    </ClientContext.Provider>
  );
}
