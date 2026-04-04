"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronDown, Anchor, Snowflake, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { DossierSection } from "@/components/DossierSection";

const realms = [
  {
    title: "NAMTAR",
    desc: "Deep-ocean tactical interface and abyssal node monitoring systems.",
    icon: Anchor,
    href: "/kirastudios/namtar",
    bgImage: "/namtar_survival.png"
  },
  {
    title: "FROSTHEIM",
    desc: "Arctic data preservation and sub-zero core infrastructure protocols.",
    icon: Snowflake,
    href: "/kirastudios/frostheim",
    bgImage: "/frostheim_viking.png"
  },
  {
    title: "DYSUN'S REALM",
    desc: "Solar-thermal energy management and orbital relay synchronization.",
    icon: Sun,
    href: "/kirastudios/dysunsrealm",
    bgImage: "/dysuns_dark.png"
  }
];

export default function KiraPage() {
  const scrollToDossier = () => {
    document.getElementById('kira-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="kira">
      {/* ─── Immersive Background ─── */}
      <div className="hero-bg">
        <Image src="/kirastudios_ue5.png" alt="Ki-Ra Studios" fill priority className="bg-image" style={{ objectFit: "cover" }} />
      </div>
      <div className="bg-vignette" />

      {/* Local nav removed in favor of global header */}

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-header"
          >
            <div className="badge spatial-panel" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
              <span className="dot" style={{ background: '#A855F7', boxShadow: '0 0 8px #A855F7' }} /> CREATIVE DIRECTION
            </div>
            <h1 className="title" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>KI-RA STUDIOS</h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="desc"
          >
            Where logic meets aesthetics. Designing the visual language of the future. 
            We build digital environments that feel physical, reactive, and premium.
          </motion.p>

          <div className="capabilities-grid">
            {realms.map((realm, i) => {
              const Icon = realm.icon;
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(255, 255, 255, 0.4)' }}
                >
                  <Link 
                    href={realm.href} 
                    className="cap-card spatial-panel" 
                    style={{ 
                      textDecoration: 'none', 
                      display: 'block', 
                      height: '100%',
                      backgroundImage: `linear-gradient(to bottom, rgba(5,5,10,0.4) 0%, rgba(5,5,10,0.95) 100%), url(${realm.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="cap-header">
                      <div className="cap-icon-box">
                        <Icon size={20} className="cap-icon" strokeWidth={1.5} />
                      </div>
                      <span className="cap-title">{realm.title}</span>
                    </div>
                    <p className="cap-desc">{realm.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <ChevronDown size={18} className="bounce-arrow" />
          </motion.div>
        </div>
      </section>

      <div id="kira-dossier">
        <DossierSection
          division="kira"
          classification="RECONSTRUCTION // v3.5"
          title="VISUAL ARCHITECTURE"
          accentColor="#A855F7"
          entries={[
            { index: "01", text: "COMING SOON // UNDER RECONSTRUCTION" },
            { index: "02", text: "COMING SOON // UNDER RECONSTRUCTION" },
            { index: "03", text: "COMING SOON // UNDER RECONSTRUCTION" }
          ]}
          tabs={[
            {
               label: "RECONSTRUCTION",
               content: [
                 "COMING SOON // UNDER RECONSTRUCTION v3.5",
               ]
            }
          ]}
        />
      </div>

      <footer className="kira-footer spatial-panel">
        <span>KI-RA STUDIOS © {new Date().getFullYear()}</span>
      </footer>

      <style jsx>{`
        .kira {
          background: #000;
          font-family: var(--font-body);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .hero-bg { position: fixed; inset: 0; z-index: 0; opacity: 0.6; }
        .bg-image { filter: brightness(0.6) contrast(1.1) saturate(1.2); }
        .bg-vignette {
          position: fixed; inset: 0; z-index: 1;
          background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(168, 85, 247, 0.1) 60%, #030508 100%);
        }

        .kira-nav {
          position: relative;
          z-index: 100;
          padding: 24px 32px;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-share-tech-mono), monospace; font-size: 10px; letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.7); text-decoration: none;
          padding: 10px 16px; border-radius: 6px;
          transition: all 300ms;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(5, 5, 10, 0.8);
        }
        .back-link:hover { color: #A855F7; border-color: #A855F7; }

        .hero {
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px 80px;
          text-align: center;
          position: relative;
          z-index: 10;
        }

        .hero-inner {
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .hero-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-share-tech-mono), monospace; font-size: 10px; letter-spacing: 3px;
          color: #FFF; border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 16px; border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
        }
        .dot {
          width: 6px; height: 6px; border-radius: 50%;
        }

        .title {
          font-family: var(--font-tactical);
          font-size: clamp(50px, 8vw, 110px);
          font-weight: 800; letter-spacing: 12px;
          line-height: 1;
        }

        .desc {
          max-width: 680px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 40px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .capabilities-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 24px; width: 100%; text-align: left;
        }

        .cap-card {
          padding: 32px; border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: crosshair;
          backdrop-filter: blur(20px);
        }

        .cap-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
        }
        .cap-icon-box {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
          padding: 12px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .cap-icon { color: #FFF; filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4)); }

        .cap-title {
          font-family: var(--font-tactical); font-size: 15px; font-weight: 700;
          letter-spacing: 3px; color: #FFF;
        }
        .cap-desc {
          font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.5);
        }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: var(--font-share-tech-mono), monospace; font-size: 10px; letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.4); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #A855F7; }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        .kira-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between;
          font-family: var(--font-share-tech-mono), monospace; font-size: 9px; letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.4); border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(5, 5, 10, 0.8); position: relative; z-index: 100;
          backdrop-filter: blur(10px);
        }

        @media (max-width: 1024px) {
          .capabilities-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .capabilities-grid { grid-template-columns: 1fr; gap: 16px; }
          .title { letter-spacing: 6px; }
          .kira-footer { flex-direction: column; gap: 10px; text-align: center; margin: 16px; }
          .hero { min-height: auto; padding: 60px 16px 40px; }
          .kira-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
          .cap-card { padding: 24px; }
          .scroll-indicator { margin-top: 40px; }
        }
      `}</style>
    </main>
  );
}
