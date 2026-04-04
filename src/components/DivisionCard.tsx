"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useBootSequence } from "../hooks/useBootSequence";

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
  useBootSequence(cardRef, { delay });

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      
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
      
      // Apply transform
      cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
    cardRef.current.style.transition = "transform 400ms ease";
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
            transition: mousePos ? "transform 300ms ease" : "",
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
        <div 
          className="scanline" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.4)',
            transform: 'translateY(-100%)',
            animation: isHovered ? 'scanline 600ms forwards' : 'none',
          }} 
        />
      </div>

      <div className="card-content">
        <div className="card-header">
          <div className="icon-box" style={{ color }}>
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span 
            className="status-label" 
            style={{ color }} 
            aria-label={`Status: ${status}`}
          >
            {status}
          </span>
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
    </Link>
  );
}