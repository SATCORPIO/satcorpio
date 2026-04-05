"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AudioEngine } from "@/lib/AudioEngine";

interface ClientContextType {
  audioReady: boolean;
  playHover: () => void;
  playClick: () => void;
  playUplink: () => void;
  registerVisit: (sectionId: string) => void;
  getInsights: () => { [key: string]: number };
}

const ClientContext = createContext<ClientContextType>({
  audioReady: false,
  playHover: () => {},
  playClick: () => {},
  playUplink: () => {},
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
    if (audioReady) return;
    await AudioEngine.init();
    setAudioReady(true);
    setShowConsent(false);
    AudioEngine.startHum();
  };

  useEffect(() => {
    // Attempt automatic initialization (may be blocked by browser until first click)
    const handleInitialClick = () => {
      initSystem();
      window.removeEventListener("click", handleInitialClick);
    };
    window.addEventListener("click", handleInitialClick);
    return () => window.removeEventListener("click", handleInitialClick);
  }, [audioReady]);

  return (
    <ClientContext.Provider value={{
      audioReady,
      playHover: () => audioReady && AudioEngine.playHover(),
      playClick: () => {
        if(audioReady) AudioEngine.playClick();
      },
      playUplink: () => {
        if(audioReady) AudioEngine.playUplink();
      },
      registerVisit,
      getInsights,
    }}>
      {children}
    </ClientContext.Provider>
  );
}
