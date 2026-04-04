"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navLinks } from "@/data/dossier";
import DivisionCard from "./DivisionCard";
import { useClientCore } from "@/app/ClientProviders";

/**
 * DivisionCarousel
 * High-fidelity manual carousel for division cards.
 * Features:
 * - Desktop: Manual arrow navigation (Left/Right)
 * - Mobile: Native-feel horizontal dragging with scroll-snap
 * - Aesthetic: v3.0 vertical 480px cards with 3D tilt
 */
export default function DivisionCarousel() {
  const { playHover, playClick } = useClientCore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      checkScroll();
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    playClick();
    const scrollAmount = 400; // Adjust based on card width + gap
    const newScrollLeft = 
      direction === "left" 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth"
    });
  };

  return (
    <section className="carousel-wrapper" aria-label="Division Strategic Command">
      <div className="carousel-controls-container">
        {/* Navigation Arrows */}
        <button 
          className={`nav-btn left ${canScrollLeft ? 'visible' : ''}`}
          onClick={() => scroll("left")}
          onMouseEnter={playHover}
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="scroll-viewport" ref={scrollRef}>
          <div className="carousel-track">
            {navLinks.map((link, idx) => (
              <div key={link.id} className="carousel-item">
                <DivisionCard 
                  {...link}
                  status={link.status as any}
                  delay={idx * 0.1}
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className={`nav-btn right ${canScrollRight ? 'visible' : ''}`}
          onClick={() => scroll("right")}
          onMouseEnter={playHover}
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx>{`
        .carousel-wrapper {
          position: relative;
          width: 100%;
          padding: 40px 0;
          z-index: 20;
        }

        .carousel-controls-container {
          position: relative;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .scroll-viewport {
          overflow-x: scroll;
          overflow-y: hidden;
          scrollbar-width: none; /* Hide scrollbar Firefox */
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 20px 0 60px;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }

        .scroll-viewport::-webkit-scrollbar {
          display: none; /* Hide scrollbar Chrome/Safari */
        }

        .carousel-track {
          display: flex;
          gap: 32px;
          padding: 0 100px; /* Side padding to allow cards to center */
          width: max-content;
        }

        .carousel-item {
          width: 380px; /* Card width */
          flex-shrink: 0;
          scroll-snap-align: center;
          transition: transform 0.4s var(--ease-tactical);
        }

        /* Navigation Buttons */
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(10, 14, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .nav-btn.visible {
          opacity: 0.6;
          pointer-events: auto;
        }

        .nav-btn:hover {
          opacity: 1;
          border-color: rgba(0, 255, 65, 0.4);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.15);
        }

        .nav-btn.left { left: 40px; }
        .nav-btn.right { right: 40px; }

        @media (max-width: 1200px) {
          .carousel-item { width: 320px; }
          .carousel-track { padding: 0 20px; }
        }

        @media (max-width: 768px) {
          .carousel-item { width: 85vw; }
          .carousel-track { padding: 0 20px; gap: 16px; }
          .nav-btn { display: none; }
          .scroll-viewport { mask-image: none; -webkit-mask-image: none; }
        }
      `}</style>
    </section>
  );
}
