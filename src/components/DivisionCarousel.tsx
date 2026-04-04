"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { navLinks } from "@/data/dossier";
import { useClientCore } from "@/app/ClientProviders";

/**
 * DivisionCarousel
 * High-fidelity infinite marquee for division cards.
 * Uses pure CSS for performance and seamless looping.
 */
export default function DivisionCarousel() {
  const { playHover, playClick } = useClientCore();

  // Duplicate the list to create a seamless loop (A B C D E | A B C D E)
  const items = [...navLinks, ...navLinks];

  return (
    <section className="carousel-section" role="region" aria-label="Division overview" aria-live="off">
      <div className="carousel-container">
        <div className="carousel-track">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article key={`${item.id}-${idx}`}>
                <Link
                  href={item.href}
                  className={`carousel-card ${item.status === "LOCKED" ? "locked" : ""}`}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  aria-labelledby={`card-title-${item.id}-${idx}`}
                >
                  <div className="card-bg">
                    <Image
                      src={item.img}
                      alt="" /* Decorative background image */
                      fill
                      sizes="(max-width: 768px) 220px, 280px"
                      loading="lazy"
                      style={{ objectFit: 'cover', opacity: 0.8 }}
                    />
                    <div className="card-overlay" style={{ background: `linear-gradient(180deg, transparent 40%, ${item.color}33 100%)` }} />
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <div className="icon-box" style={{ color: item.color }}>
                        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <span className="status-label" style={{ color: item.color }} aria-label={`Status: ${item.status}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="card-footer">
                      <h2 className="card-title" id={`card-title-${item.id}-${idx}`}>{item.label}</h2>
                      {item.status !== "LOCKED" && (
                        <div className="card-cta" style={{ color: item.color }}>
                          INIT <ChevronRight size={12} aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .carousel-section {
          padding: 80px 0;
          position: relative;
          z-index: 20;
          overflow: hidden;
        }

        .carousel-container {
          width: 100%;
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .carousel-track {
          display: flex;
          gap: 32px;
          padding: 24px 0;
          width: max-content;
          animation: marquee-scroll 45s linear infinite;
          touch-action: pan-x; /* Explicitly allow horizontal touch swipe */
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .carousel-card {
          display: block;
          position: relative;
          width: 280px;
          height: 180px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(10, 14, 24, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
          text-decoration: none;
          color: white;
        }

        .carousel-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .card-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .card-content {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icon-box {
          background: rgba(0, 0, 0, 0.5);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-label {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
        }

        .card-title {
          font-family: var(--font-tactical);
          font-size: 16px;
          letter-spacing: 2px;
          margin: 0;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .card-cta {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 1px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.7;
        }

        .locked {
          filter: grayscale(1) brightness(0.6);
        }

        @media (max-width: 768px) {
          .carousel-card {
            width: 220px;
            height: 140px;
          }
          .carousel-track {
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
