"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";

interface SpatialCardProps {
  id: string;
  label: string;
  desc: string;
  icon: any;
  href: string;
  status: string;
  color: string;
  img: string;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

export function SpatialCard({ 
  label, 
  desc, 
  icon: Icon, 
  href, 
  status, 
  color, 
  img, 
  index, 
  isActive, 
  onHover 
}: SpatialCardProps) {
  return (
    <Link href={href}>
      <motion.div
        className={`nav-card spatial-panel ${isActive ? "active" : ""} ${status === "LOCKED" ? "locked" : ""}`}
        onMouseEnter={onHover}
        onTap={onHover}
        whileHover={{ 
          scale: 1.05, 
          y: -20, 
          rotateX: typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 0, 
          rotateY: typeof window !== 'undefined' && window.innerWidth > 768 ? -2 : 0, 
          zIndex: 200 
        }}
        whileTap={{ scale: 0.98 }}
        style={{ "--card-color": color, perspective: 1200 } as React.CSSProperties}
      >
        <div className="card-media">
          <Image src={img} alt={label} fill style={{ objectFit: 'cover' }} className="card-img" />
          <div className="card-overlay" />
          <div className="card-sheen" />
        </div>
        
        <div className="card-ui">
          <div className="card-top">
            <div className="icon-wrap" style={{ color: color, boxShadow: `0 0 15px ${color}33` }}>
              <Icon size={22} strokeWidth={1.5} />
            </div>
            <span className="card-status" style={{ color: status === "LOCKED" ? "#EF4444" : color }}>
              <span className="dot" style={{ background: status === "LOCKED" ? "#EF4444" : color, boxShadow: `0 0 10px ${status === "LOCKED" ? "#EF4444" : color}` }} />
              {status}
            </span>
          </div>
          
          <div className="card-bottom">
            <h2 className="card-title">{label}</h2>
            <div className="card-desc">
              {desc}
            </div>
            {status !== "LOCKED" && (
              <div className="card-cta" style={{ color: color, borderColor: `${color}66` }}>
                INITIALIZE ACCESS <ChevronRight size={14} />
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          .card-sheen {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              125deg,
              transparent 0%,
              transparent 40%,
              rgba(255, 255, 255, 0.1) 45%,
              rgba(255, 255, 255, 0.3) 50%,
              rgba(255, 255, 255, 0.1) 55%,
              transparent 60%,
              transparent 100%
            );
            transform: translateX(-100%);
            transition: transform 0.8s ease-in-out;
            z-index: 1;
          }
          .nav-card:hover .card-sheen {
            transform: translateX(100%);
          }
        `}</style>
      </motion.div>
    </Link>
  );
}
