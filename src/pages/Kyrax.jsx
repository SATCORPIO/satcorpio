import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';
import JsonLd from '../components/JsonLd';
import TacticalCardWrapper from '../components/TacticalCardWrapper';
import RequisitionHub from '../components/RequisitionHub';

const SKILL_CARDS = [
  {
    id: "ai-workflows",
    title: "AI-Enhanced Creative Workflows",
    image: "/assets/kyrax_ai_workflows.png",
    shortDesc: "Brand-consistent AI visuals, custom personas, and rapid iteration pipelines.",
    capabilities: [
      "Prompt engineering/reusable prompt frameworks",
      "Brand-consistent AI visuals/style-locked pipelines",
      "Rapid concept iteration",
      "Task automation using AI tools",
      "Custom AI personas/operational agents",
      "AI accelerated execution inside already-defined systems"
    ],
    services: [
      "Prompt engineering/reusable prompt frameworks",
      "Brand-consistent AI visuals/style-locked pipelines",
      "Rapid concept iteration",
      "Task automation using AI tools",
      "Custom AI personas/operational agents",
      "AI accelerated execution inside already-defined systems"
    ]
  },
  {
    id: "multi-agent",
    title: "Multi-Agent AI Orchestration Networks",
    image: "/assets/kyrax_multi_agent.png",
    shortDesc: "Crew-based AI teams with memory persistence and task delegation.",
    capabilities: [
      "Crew-based AI teams (researcher + designer + editor + strategist)",
      "Autonomous task delegation & handoff",
      "Memory & context persistence across agents",
      "Human-in-the-loop oversight dashboards"
    ],
    toolsTech: ["CrewAI", "AutoGen", "LangGraph", "Custom GPTs"],
    deliverables: ["Deployable agent swarms + monitoring interface"],
    services: [
      "Crew-based AI teams (researcher + designer + editor + strategist)",
      "Autonomous task delegation & handoff",
      "Memory & context persistence across agents",
      "Human-in-the-loop oversight dashboards"
    ]
  },
  {
    id: "generative-pipelines",
    title: "Generative Video / Voice / Motion AI Pipelines",
    image: "/assets/kyrax_generative_pipelines.png",
    shortDesc: "Brand-consistent scene generation, voice cloning, and text-to-video.",
    capabilities: [
      "Text-to-video, image-to-video, lip-sync",
      "Brand-consistent character & scene generation",
      "Long-form AI video with editing hooks",
      "Voice cloning & emotional delivery"
    ],
    toolsTech: ["Runway Gen-3", "Kling", "Luma Dream Machine", "ElevenLabs", "HeyGen"],
    deliverables: ["Production-ready video assets + prompt libraries"],
    services: [
      "Text-to-video, image-to-video, lip-sync",
      "Brand-consistent character & scene generation",
      "Long-form AI video with editing hooks",
      "Voice cloning & emotional delivery"
    ]
  },
  {
    id: "autonomous-research",
    title: "Autonomous Research & Predictive Intelligence Units",
    image: "/assets/kyrax_autonomous_research.png",
    shortDesc: "Deep-dive market research, trend prediction, and personalized briefs.",
    capabilities: [
      "Deep-dive market/competitor research agents",
      "Trend prediction & opportunity mapping",
      "Real-time news & sentiment analysis",
      "Personalized client intelligence briefs"
    ],
    toolsTech: ["Perplexity", "Custom GPT research agents", "Make + Google Alerts"],
    deliverables: ["Weekly intelligence reports + live dashboards"],
    services: [
      "Deep-dive market/competitor research agents",
      "Trend prediction & opportunity mapping",
      "Real-time news & sentiment analysis",
      "Personalized client intelligence briefs"
    ]
  }
];

export default function Kyrax() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="page-wrapper portal-page pulse-operator-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>KYRAX â€” Tactical Intelligence Wing</title>
        <meta name="description" content="TACTICAL INTELLIGENCE WING - KYRAX /// AI CONCIERGE. AI-Enhanced Creative Workflows, Multi-Agent Orchestration, and Autonomous Research." />
        <meta property="og:title" content="KYRAX â€” Tactical Intelligence Wing" />
        <meta property="og:description" content="TACTICAL INTELLIGENCE WING - KYRAX /// AI CONCIERGE. AI-Enhanced Creative Workflows, Multi-Agent Orchestration, and Autonomous Research." />
        <meta property="og:url" content="https://satcorp.io/kyrax" />
        <meta property="og:image" content="https://satcorp.io/og/kyrax.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://satcorp.io/og/kyrax.png" />
      </Helmet>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "No-Code / Low-Code Product Builds",
        "provider": { "@type": "Organization", "name": "SATCORP", "url": "https://satcorp.io" },
        "name": "KYRAX",
        "url": "https://satcorp.io/kyrax",
        "description": "TACTICAL INTELLIGENCE WING - KYRAX /// AI CONCIERGE. AI-Enhanced Creative Workflows, Multi-Agent Orchestration, and Autonomous Research."
      }} />
      <Header title="KYRAX" />
      <div className="portal-bg" style={{ backgroundImage: 'url(/assets/kyrax_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
      <GalaxyBackground />
      
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-operator-wrapper .portal-main { flex: 1; padding-bottom: 80px; position: relative; z-index: 10; }
        .pulse-skill-card {
           background: rgba(0, 0, 0, 0.4);
           border: 1px solid rgba(59, 130, 246, 0.2);
           border-radius: 8px;
           padding: 24px;
           cursor: pointer;
           transition: all 0.3s ease;
           position: relative;
           overflow: hidden;
           min-height: 180px;
           display: flex;
           flex-direction: column;
           background-size: cover;
           background-position: center;
        }
        .pulse-skill-card .card-overlay {
           position: absolute;
           inset: 0;
           background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
           z-index: 1;
        }
        .pulse-skill-card:hover {
           border-color: rgba(59, 130, 246, 0.6);
           box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
           transform: translateY(-2px);
        }
        
        .pulse-skill-card .card-title {
           font-family: var(--font-header), monospace;
           color: #3b82f6;
           font-size: 1.25rem;
           font-weight: 700;
           letter-spacing: 0.05em;
           margin-bottom: 12px;
           z-index: 2;
        }
        
        .pulse-skill-card .card-short-desc {
           font-size: 0.9rem;
           color: rgba(255, 255, 255, 0.7);
           line-height: 1.5;
           opacity: 0;
           transform: translateY(10px);
           transition: all 0.3s ease;
           z-index: 2;
        }
        .pulse-skill-card:hover .card-short-desc {
           opacity: 1;
           transform: translateY(0);
        }

        .pulse-footer {
           position: fixed; bottom: 0; left: 0; right: 0;
           height: 60px; padding: 0 40px;
           display: flex; justify-content: space-between; align-items: center;
           border-top: 1px solid rgba(59, 130, 246, 0.1);
           background: rgba(0, 0, 0, 0.8);
           backdrop-filter: blur(5px);
           font-family: monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4);
           z-index: 100;
        }
      `}}/>

      <main className="portal-main">
        <div style={{ marginBottom: '40px' }}>
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" style={{ background: '#3b82f6' }} />
            <span className="op-eyebrow-text" style={{ color: '#3b82f6' }}>TACTICAL INTELLIGENCE WING</span>
          </div>
          <h1 className="portal-title">
            KYRAX <span className="portal-title-accent" style={{ color: '#3b82f6' }}>/// AI CONCIERGE</span>
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
              className="pulse-skill-card"
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
        <div>SATCORP Tactical Intelligence</div>
      </div>

      {activeCard && (
        <RequisitionHub 
          activeCard={activeCard} 
          onClose={() => setActiveCard(null)}
          divisionTag="KYRAX TACTICAL WING"
          theme={{
            color: '#3b82f6',
            glow: 'rgba(59, 130, 246, 0.35)',
            rgb: '59, 130, 246'
          }}
        />
      )}
    </div>
  );
}
