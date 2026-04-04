"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useBootSequence } from "@/hooks/useBootSequence";
import { StatusBadge } from "./StatusBadge";

interface DivisionCardProps {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string; ariaHidden?: boolean }>;
  href: string;
  status: "ACTIVE" | "TRANSMITTING" | "OPERATIONAL" | "LOCKED";
  color: string;
  img: string;
  delay?: number;
}

export default function DivisionCard({
  id,
  label,
  desc,
  icon: Icon,
  href,
  status,
  color,
  img,
  delay = 0,
}: DivisionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Apply boot sequence animation
  useBootSequence(cardRef.current, { delay });

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      setIsHovered(true);
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized position (-0.5 to 0.5)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      // Clamp to ±0.5 range
      const clampedX = Math.max(-0.5, Math.min(0.5, normalizedX));
      const clampedY = Math.max(-0.5, Math.min(0.5, normalizedY));
      
      // Convert to degrees (±8°)
      const rotateX = clampedY * 8;
      const rotateY = clampedX * 8;
      
      // Update mouse position for image parallax
      setMousePos({ x: clampedX * 20, y: clampedY * 20 }); // Scale for parallax effect
      
      // Apply transform and dynamic shadow
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      cardRef.current.style.boxShadow = `0 0 30px ${color}33, 0 0 10px ${color}1a`;
    },
    [color]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
    cardRef.current.style.boxShadow = "";
    cardRef.current.style.transition = "transform 400ms var(--ease-tactical), box-shadow 400ms var(--ease-tactical)";
    setMousePos(null);
    
    // Reset transition after animation completes
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transition = "";
      }
    }, 400);
  }, []);

  return (
    <Link
      href={href}
      className={`division-card ${status === "LOCKED" ? "locked" : ""}`}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      aria-label={`Division: ${label}`}
      style={{'--card-accent': color} as React.CSSProperties}
    >
      <div className="card-bg" ref={cardRef}>
        <Image
          src={img}
          alt={`${label} background`}
          fill
          ref={imgRef}
          style={{
            objectFit: 'cover',
            opacity: 0.8,
            transform: mousePos ? `translate(${mousePos.x}px, ${mousePos.y}px)` : "translate(0px, 0px)",
            transition: mousePos ? "transform 300ms ease" : "transform 400ms ease",
          }}
        />
        <div 
          className="card-overlay" 
          style={{ 
            background: `linear-gradient(180deg, transparent 40%, ${color}33 100%)`,
            position: 'absolute',
            inset: 0,
          }} 
        />
        {/* Scanline effect on hover */}
        <div className={`scanline-sweep ${isHovered ? 'active' : ''}`} />
      </div>

      <div className="card-content">
        <div className="card-header">
          <div className="icon-box" style={{ color }}>
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <StatusBadge status={status} className="card-status-badge" />
        </div>

        <div className="card-footer">
          <h2 className="card-title">{label}</h2>
          {status !== "LOCKED" && (
            <div className="card-cta" style={{ color }}>
              INIT <ChevronRight size={12} aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .division-card {
           display: block;
           position: relative;
           text-decoration: none;
           perspective: 1000px;
        }
        .card-bg {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-surface);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: border-color 0.3s var(--ease-tactical);
          z-index: 1;
        }
        .division-card:hover .card-bg {
          border-color: var(--card-accent);
        }
        .card-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
          pointer-events: none;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .icon-box {
          background: rgba(0, 0, 0, 0.5);
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
        }
        .card-title {
          font-family: var(--font-display);
          font-size: 28px;
          letter-spacing: 4px;
          color: white;
          margin-bottom: 12px;
          text-shadow: 0 4px 12px rgba(0,0,0,0.8);
        }
        .card-cta {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.8;
        }
        .scanline-sweep {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: translateY(-100%);
          opacity: 0;
          z-index: 5;
        }
        .scanline-sweep.active {
          animation: scanline 0.6s var(--ease-tactical) forwards;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(480px); opacity: 0; }
        }
        .locked {
          filter: grayscale(0.8) brightness(0.6);
          cursor: not-allowed;
        }
      `}</style>
    </Link>
  );
}