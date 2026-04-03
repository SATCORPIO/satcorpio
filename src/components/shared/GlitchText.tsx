"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function GlitchText({ text, active = false }: { text: string; active?: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const textRef = useRef<HTMLSpanElement>(null);
  const originalText = text;
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  useEffect(() => {
    if (active) {
      triggerDecrypt();
    }
  }, [active, text]);

  const triggerDecrypt = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(originalText.split("").map((letter, index) => {
        if(index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));

      if(iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span 
      ref={textRef} 
      className="font-mono tracking-widest text-[#00ff41] transition-all"
    >
      {displayText}
    </span>
  );
}
