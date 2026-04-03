"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, UserCircle, Briefcase, FileText, DollarSign, LayoutDashboard, Database, ChevronDown, CheckCircle, RefreshCw, Landmark, Scale, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { DossierManual } from "@/components/shared/DossierManual";


/* ═══ ANU Dossier Data ═══ */
const dossierData = [
  {
    id: "cx",
    title: "CLIENT EXPERIENCE",
    subtitle: "Concierge Skills",
    icon: CheckCircle,
    colSpan: 1, 
    items: [
      "Scope clarification & expectation alignment",
      "Pre-order vetting & intake protocols",
      "Clear timelines & revision control logic",
      "Security-first communication practices"
    ],
    color: "#EAB308" // Gold
  },
  {
    id: "crm",
    title: "LIFECYCLE MANAGEMENT",
    subtitle: "Full CRM Management",
    icon: RefreshCw,
    colSpan: 1,
    items: [
      "End-to-end client journey mapping",
      "Automated onboarding, milestones, offboarding",
      "Feedback & NPS operational systems",
      "Per-client knowledge-base portals (Notion)"
    ],
    color: "#FEF08A" // Champagne
  },
  {
    id: "finance",
    title: "FINANCIAL OPERATIONS",
    subtitle: "Invoicing & Profitability",
    icon: Landmark,
    colSpan: 1,
    items: [
      "Automated invoicing & payment chasing",
      "Real-time project profitability tracking",
      "Expense categorization & tax-ready exports",
      "Tools: Stripe, QuickBooks, Wise"
    ],
    color: "#FDE047" // Light Gold
  },
  {
    id: "legal",
    title: "LEGAL ARCHITECTURE",
    subtitle: "Advanced Workflow",
    icon: Scale,
    colSpan: 1,
    items: [
      "Modular contract templates & clause libraries",
      "E-signature & version control flows",
      "Scope change & amendment automation",
      "IP ownership & NDA systems"
    ],
    color: "#CA8A04" // Deep Gold
  }
];

export default function AnuPage() {
  const scrollToDossier = () => {
    document.getElementById('anu-dossier')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="anu film-grain">
      {/* ─── High-Fidelity Background ─── */}
      <div className="bg-container">
        <Image src="/satcorp_ultrarealistic_1775186489305.png" alt="ANU Concierge Lounge" fill priority style={{ objectFit: 'cover' }} />
        <div className="bg-overlay" />
      </div>

      <nav className="anu-nav">
        <Link href="/" className="back-link spatial-panel">
          <ChevronLeft size={16} /> <span className="bl-text">RETURN TO HUB</span>
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-header"
          >
            <div className="badge spatial-panel">
              <span className="gold-dot" /> EXECUTIVE PROTOCOL
            </div>
            <h1 className="title">ANU</h1>
            <p className="subtitle">LIFECYCLE & CONCIERGE OPERATIONS</p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="desc"
          >
            End-to-end problem solver bridging design, automation, branding, and systems. 
            Translates vague ideas into deployable assets with high-performance operator protocols.
          </motion.p>
          
          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
            onClick={scrollToDossier}
          >
            <ChevronDown size={18} className="bounce-arrow" />
          </motion.div>

        </div>
      </section>

      <DossierManual 
        items={dossierData}
        sectionTitle="OPERATOR BRANCH"
        sectionSubtitle="CONCIERGE / CLIENT EXPERIENCE DOSSIER"
        terminalPrefix="ANU"
        anchorId="anu-dossier"
      />

      <footer className="anu-footer spatial-panel">
        <span>ANU © {new Date().getFullYear()} — SATCORP CONCIERGE</span>
        <span className="clearance-level">LEVEL 4 CLEARANCE</span>
      </footer>

      <style jsx>{`
        .anu {
          background: #080705;
          font-family: var(--font-body);
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-x: hidden;
        }

        .bg-container {
          position: fixed;
          inset: 0;
          z-index: 0;
        }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(8,7,5,0.4) 0%, #080705 80%);
        }

        .anu-nav {
          position: relative;
          z-index: 100;
          padding: 24px 32px;
        }
        .back-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(234, 179, 8, 0.7); text-decoration: none;
          padding: 10px 16px; border-radius: 6px;
          transition: all 300ms;
          border-color: rgba(234, 179, 8, 0.15);
        }
        .back-link:hover { color: #EAB308; background: rgba(234, 179, 8, 0.05); }

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
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: #EAB308; border-color: rgba(234, 179, 8, 0.2);
          padding: 8px 16px; border-radius: 4px;
          background: rgba(234, 179, 8, 0.03);
          box-shadow: 0 4px 12px rgba(234, 179, 8, 0.05);
        }
        .gold-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #EAB308; box-shadow: 0 0 8px #EAB308;
        }

        .title {
          font-family: var(--font-tactical);
          font-size: clamp(60px, 8vw, 110px);
          font-weight: 800; letter-spacing: 12px;
          background: linear-gradient(180deg, #FFFDEB 0%, #EAB308 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-shadow: 0 10px 40px rgba(234, 179, 8, 0.3);
          line-height: 1;
        }

        .subtitle {
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 6px;
          color: rgba(234, 179, 8, 0.5);
        }

        .desc {
          max-width: 680px; font-size: 16px; line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 40px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .capabilities-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 24px; width: 100%; text-align: left;
        }

        .cap-card {
          padding: 32px; border-radius: 8px;
          background: rgba(8, 7, 5, 0.7);
          border-color: rgba(234, 179, 8, 0.1);
          cursor: crosshair;
        }

        .cap-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
        }
        .cap-icon-box {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.1), transparent);
          padding: 12px; border-radius: 6px; border: 1px solid rgba(234, 179, 8, 0.2);
        }
        .cap-icon { color: #EAB308; filter: drop-shadow(0 0 6px rgba(234, 179, 8, 0.4)); }

        .cap-title {
          font-family: var(--font-tactical); font-size: 15px; font-weight: 700;
          letter-spacing: 3px; color: #F5EFDA;
        }
        .cap-desc {
          font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.5);
        }

        .scroll-indicator {
          margin-top: 60px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
          color: rgba(234, 179, 8, 0.5); cursor: pointer; transition: color 300ms;
        }
        .scroll-indicator:hover { color: #EAB308; }
        .bounce-arrow { animation: bounce-y 2s infinite; }
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* ── Dossier Section ── */
        .dossier-section {
          position: relative; z-index: 10;
          padding: 100px 40px;
          background: linear-gradient(180deg, transparent, rgba(5,4,2,0.98) 200px);
        }


        .anu-footer {
          margin: 20px 32px; padding: 16px 24px;
          display: flex; justify-content: space-between;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: 2px;
          color: rgba(234, 179, 8, 0.4); border-color: rgba(234, 179, 8, 0.1);
          background: rgba(234, 179, 8, 0.02); position: relative; z-index: 100;
        }
        .clearance-level { color: rgba(234, 179, 8, 0.3); }

        @media (max-width: 768px) {
          .capabilities-grid { grid-template-columns: 1fr; }
          .bento-grid { grid-template-columns: 1fr; }
          .title { font-size: 48px; letter-spacing: 6px; }
          .subtitle { font-size: 10px; letter-spacing: 4px; }
          .anu-footer { flex-direction: column; gap: 10px; text-align: center; margin: 16px; }
          .hero { min-height: auto; padding: 60px 16px 40px; }
          .anu-nav { padding: 16px; }
          .desc { font-size: 14px; margin-bottom: 24px; }
          .scroll-indicator { margin-top: 40px; }
        }
        @media (max-width: 480px) {
          .title { font-size: 36px; letter-spacing: 4px; }
          .subtitle { font-size: 9px; letter-spacing: 3px; }
          .badge { font-size: 9px; letter-spacing: 2px; padding: 6px 12px; }
          .desc { font-size: 13px; line-height: 1.7; }
          .hero { padding: 40px 12px 32px; }
          .anu-nav { padding: 12px; }
          .back-link { font-size: 9px; padding: 8px 12px; }
          .cap-card { padding: 24px; }
          .cap-title { font-size: 13px; letter-spacing: 2px; }
          .cap-desc { font-size: 13px; }
          .anu-footer { margin: 12px 10px; padding: 12px 16px; font-size: 8px; }
          .scroll-indicator { margin-top: 24px; font-size: 9px; letter-spacing: 2px; }
        }
      `}</style>
    </main>
  );
}
