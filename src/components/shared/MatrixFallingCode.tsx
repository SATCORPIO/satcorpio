"use client";

import React, { useEffect, useRef } from "react";

interface MatrixFallingCodeProps {
  color?: string;
  alpha?: number;
  fontSize?: number;
}

/**
 * MatrixFallingCode
 * High-performance canvas-based matrix rain effect.
 */
export const MatrixFallingCode: React.FC<MatrixFallingCodeProps> = ({
  color = "#00FF41",
  alpha = 0.05,
  fontSize = 14,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start at random heights above the screen
    }

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = `rgba(5, 10, 15, ${alpha})`;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px var(--font-share-tech-mono), monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      // Adjust drops array size on resize
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, alpha, fontSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    />
  );
};
