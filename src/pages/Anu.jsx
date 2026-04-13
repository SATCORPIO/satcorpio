import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';
import JsonLd from '../components/JsonLd';
import TacticalCardWrapper from '../components/TacticalCardWrapper';
import RequisitionHub from '../components/RequisitionHub';

const SKILL_CARDS = [
  {
    id: "client-exp",
    title: "Client Experience / Concierge Skills",
    shortDesc: "Scope, expectations, and polished delivery.",
    image: "/assets/anu_client_exp.png",
    capabilities: [
      "Scope clarification/expectation alignment",
      "Pre-order vetting/intake",
      "Clear timelines/revision control",
      "Security-first communication practices"
    ],
    process: [
      "Clarify goal/constraints",
      "Align scope/deliverables",
      "Execute with checkpoints",
      "Polish/export/handoff"
    ],
    services: [
      "Scope Clarification Session",
      "Project Vetting & Intake",
      "Milestone Planning",
      "Final Export & Handoff"
    ]
  },
  {
    id: "crm-lifecycle",
    title: "Full CRM & Client Lifecycle Management",
    shortDesc: "End-to-end journey maps and bespoke portals.",
    image: "/assets/anu_crm_lifecycle.png",
    capabilities: [
      "End-to-end client journey mapping",
      "Automated onboarding, milestones, offboarding",
      "Feedback & NPS systems",
      "Knowledge-base per-client portals"
    ],
    toolsTech: ["Notion", "HubSpot", "Pipedrive", "Custom Airtable"],
    deliverables: ["Live CRM workspace + automation rules"],
    services: [
      "Client Journey Mapping",
      "CRM Automation Setup",
      "NPS System Integration",
      "Client Portal Development"
    ]
  },
  {
    id: "financial-ops",
    title: "Financial Operations, Invoicing & Profitability Systems",
    shortDesc: "Automated chasing, forecasting, and retention.",
    image: "/assets/anu_financial_ops.png",
    capabilities: [
      "Automated invoicing & payment chasing",
      "Real-time project profitability tracking",
      "Expense categorization & tax-ready exports",
      "Forecasting & retainer management"
    ],
    toolsTech: ["Stripe", "QuickBooks", "Wise", "Notion Finance DB"],
    deliverables: ["Dashboard + monthly financial SOPs"],
    services: [
      "Invoice Automation & Payment Chasing",
      "Profitability Tracking & Expense Setup",
      "General forecasting / Retainer Management"
    ]
  },
  {
    id: "legal-architect",
    title: "Advanced Contract & Legal Workflow Architecture",
    shortDesc: "E-signatures, modular templates, and IP flows.",
    image: "/assets/anu_legal_architect.png",
    capabilities: [
      "Modular contract templates & clause libraries",
      "E-signature & version control flows",
      "Scope change & amendment automation",
      "IP ownership & NDA systems"
    ],
    toolsTech: ["DocuSign", "PandaDoc", "Notion Contracts DB"],
    deliverables: ["Full legal asset library + workflow templates"],
    services: [
      "Contract Template & Clause Library Creation",
      "E-Signature Workflow Setup",
      "NDA & IP Ownership System Integration",
      "Scope Change / Amendment Automation"
    ]
  }
];

export default function Anu() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="page-wrapper portal-page anu-operator-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>ANU â€” Systems Architecture & Consulting</title>
        <meta name="description" content="SATCORP OPERATOR NODE - TACTICAL CONCIERGE SERVICES. Systems Architecture & Consulting, Scope clarification, CRM lifecycle, and financial operations." />
        <meta property="og:title" content="ANU â€” Systems Architecture & Consulting" />
        <meta property="og:description" content="SATCORP OPERATOR NODE - TACTICAL CONCIERGE SERVICES. Systems Architecture & Consulting, Scope clarification, CRM lifecycle, and financial operations." />
        <meta property="og:url" content="https://satcorp.io/anu" />
        <meta property="og:image" content="https://satcorp.io/og/anu.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://satcorp.io/og/anu.png" />
      </Helmet>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Systems Architecture & Consulting",
        "provider": { "@type": "Organization", "name": "SATCORP", "url": "https://satcorp.io" },
        "name": "ANU",
        "url": "https://satcorp.io/anu",
        "description": "SATCORP OPERATOR NODE - TACTICAL CONCIERGE SERVICES. Systems Architecture & Consulting, Scope clarification, CRM lifecycle, and financial operations."
      }} />
      <Header title="ANU" />
      <div className="portal-bg" style={{ backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(30,15,5,0.7) 50%, rgba(10,5,0,0.95) 100%), url(/assets/anu_bg_gold.png)' }} />
      <GalaxyBackground />
      
      <style dangerouslySetInnerHTML={{__html: `
        .anu-operator-wrapper .portal-main { flex: 1; padding-bottom: 80px; position: relative; z-index: 10; }
        .anu-skill-card {
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(255, 215, 0, 0.15);
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        }
        .anu-skill-card .card-overlay {
           position: absolute;
           inset: 0;
           background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
           z-index: 1;
        }
        .anu-skill-card:hover {
          border-color: rgba(255, 215, 0, 0.5);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
          transform: translateY(-5px) scale(1.02);
        }
        
        .anu-skill-card .card-title {
          font-family: var(--font-header), monospace;
          color: #ffca28;
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        .anu-skill-card .card-short-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 2;
        }
        .anu-skill-card:hover .card-short-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .pulse-footer {
           position: fixed; bottom: 0; left: 0; right: 0;
           height: 60px; padding: 0 40px;
           display: flex; justify-content: space-between; align-items: center;
           border-top: 1px solid rgba(255, 215, 0, 0.1);
           background: rgba(0, 0, 0, 0.8);
           backdrop-filter: blur(5px);
           font-family: monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4);
           z-index: 100;
        }
      `}}/>

      <main className="portal-main">
        <div style={{ marginBottom: '40px' }}>
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" style={{ background: '#ffca28' }} />
            <span className="op-eyebrow-text" style={{ color: '#ffca28' }}>ANU CONCIERGE DIVISION // ENHANCED SERVICES</span>
          </div>
          <h1 className="portal-title">
            MISSION <span className="portal-title-accent" style={{ color: '#ffca28' }}>MANAGEMENT</span>
          </h1>
          <p className="portal-subtitle">SELECT A SERVICE MODULE TO INITIATE SATCORP PROTOCOLS</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {SKILL_CARDS.map(card => (
            <TacticalCardWrapper
              key={card.id}
              className="pulse-skill-card anu-skill-card"
              onClick={() => setActiveCard(card)}
              style={{ backgroundImage: card.image ? `url(${card.image})` : 'none' }}
            >
              <div className="card-overlay" />
              <div className="card-title">{card.title}</div>
              <div className="card-short-desc">{card.shortDesc}</div>
            </TacticalCardWrapper>
          ))}
        </div>
      </main>

      <div className="pulse-footer">
        <div>2026 SATCORP</div>
        <div>ANU Concierge Division // Artisan Tier</div>
      </div>

      {activeCard && (
        <RequisitionHub 
          activeCard={activeCard} 
          onClose={() => setActiveCard(null)}
          divisionTag="ANU CONCIERGE DIVISION"
          theme={{
            color: '#ffca28',
            glow: 'rgba(255, 202, 40, 0.35)',
            rgb: '255, 202, 40'
          }}
        />
      )}
    </div>
  );
}
