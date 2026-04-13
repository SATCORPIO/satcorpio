import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';
import JsonLd from '../components/JsonLd';
import TacticalCardWrapper from '../components/TacticalCardWrapper';
import RequisitionHub from '../components/RequisitionHub';

const SKILL_CARDS = [
  {
    id: "stream-design",
    title: "Streaming/Broadcast/Overlay Design",
    shortDesc: "OBS scene architecture, UI design, and broadcast visual kits.",
    backgroundImage: "/assets/pulse_stream_design_bg.png",
    capabilities: [
      "OBS scene architecture/overlay design",
      "Alert/HUD style UI design",
      "Stream branding packages",
      "TikTok/live-broadcast visual kits",
      "Animated overlays/scene layouts",
      "Creator-focused visual systems"
    ],
    services: [
      "OBS scene architecture/overlay design",
      "Alert/HUD style UI design",
      "Stream branding packages",
      "TikTok/live-broadcast visual kits",
      "Animated overlays/scene layouts",
      "Creator-focused visual systems"
    ]
  },
  {
    id: "video-pipelines",
    title: "Full Video Editing & Post-Production Pipelines",
    shortDesc: "Long-form cinematic edits, VFX, AI-assisted cutting, and live-to-VOD.",
    backgroundImage: "/assets/pulse_video_editing_bg.png",
    capabilities: [
      "Long-form & cinematic editing",
      "Color grading, VFX, motion graphics integration",
      "AI-assisted cutting & upscaling",
      "Multi-cam live-to-VOD workflows",
      "Subtitle & accessibility post"
    ],
    toolsTech: ["DaVinci Resolve", "Premiere Pro", "CapCut", "Runway Gen-3", "Topaz"],
    deliverables: ["Final masters + project files + asset libraries"],
    services: [
      "Long-form & cinematic editing",
      "Color grading, VFX, motion graphics integration",
      "AI-assisted cutting & upscaling",
      "Multi-cam live-to-VOD workflows",
      "Subtitle & accessibility post"
    ]
  },
  {
    id: "short-form-optimization",
    title: "Short-Form Content Strategy & Optimization Systems",
    shortDesc: "Viral frameworks, platform targeting, and batch production.",
    backgroundImage: "/assets/pulse_short_form_bg.png",
    capabilities: [
      "Viral hook frameworks & 15–60s content blueprints",
      "Platform-specific optimization (algorithm targeting)",
      "Batch production & repurposing systems",
      "Thumbnail & caption testing loops",
      "Trend-jacking & seasonal calendars"
    ],
    deliverables: ["30-day content calendars + template packs"],
    services: [
      "Viral hook frameworks & 15–60s content blueprints",
      "Platform-specific optimization (algorithm targeting)",
      "Batch production & repurposing systems",
      "Thumbnail & caption testing loops",
      "Trend-jacking & seasonal calendars"
    ]
  },
  {
    id: "syndication-automation",
    title: "Multi-Platform Syndication & Automation Hubs",
    shortDesc: "Auto-clipping, cross-posting, and one-to-many publishing.",
    backgroundImage: "/assets/pulse_automation_bg.png",
    capabilities: [
      "One-to-many publishing pipelines",
      "Auto-clipping & cross-posting",
      "Performance-based redistribution rules",
      "Community management automation"
    ],
    toolsTech: ["Make.com", "Zapier", "Buffer", "Ayrshare", "Opus Clip"],
    deliverables: ["Live automation hub + SOPs"],
    services: [
      "One-to-many publishing pipelines",
      "Auto-clipping & cross-posting",
      "Performance-based redistribution rules",
      "Community management automation"
    ]
  },
  {
    id: "virtual-event-command",
    title: "Virtual Event / Live Production Command Systems",
    shortDesc: "Virtual summit production, multi-stream routing, and event command.",
    backgroundImage: "/assets/pulse_virtual_events_bg.png",
    capabilities: [
      "End-to-end virtual summit & concert production",
      "Multi-stream routing & guest management",
      "Interactive elements (polls, shops, chats)",
      "Post-event highlight automation"
    ],
    toolsTech: ["StreamYard", "Restream", "vMix", "Hopin/Remo"],
    deliverables: ["Event command center + replay packages"],
    services: [
      "End-to-end virtual summit & concert production",
      "Multi-stream routing & guest management",
      "Interactive elements (polls, shops, chats)",
      "Post-event highlight automation"
    ]
  },
  {
    id: "creator-merch-sys",
    title: "Creator Merch & Hybrid Product Visual Systems",
    shortDesc: "POD mockups, merch collection design, and 3D visualization.",
    backgroundImage: "/assets/pulse_merch_visuals_bg.png",
    capabilities: [
      "Print-on-demand mockup pipelines",
      "Merch branding & collection design",
      "3D product visualization",
      "Limited-drop campaign visuals"
    ],
    deliverables: ["Full merch asset kits + shop integration files"],
    services: [
      "Print-on-demand mockup pipelines",
      "Merch branding & collection design",
      "3D product visualization",
      "Limited-drop campaign visuals"
    ]
  }
];

export default function Pulse() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="page-wrapper portal-page pulse-operator-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>PULSE — Broadcast & Creator Hub</title>
        <meta name="description" content="PULSE /// LIVE BROADCAST BRANCH - BROADCAST / CREATOR HUB. Streaming design, video pipelines, short-form optimization, and virtual event command." />
        <meta property="og:title" content="PULSE — Broadcast & Creator Hub" />
        <meta property="og:description" content="PULSE /// LIVE BROADCAST BRANCH - BROADCAST / CREATOR HUB. Streaming design, video pipelines, short-form optimization, and virtual event command." />
        <meta property="og:url" content="https://satcorp.io/pulse" />
        <meta property="og:image" content="https://satcorp.io/og/pulse.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://satcorp.io/og/pulse.png" />
      </Helmet>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Motion Design & Animation",
        "provider": { "@type": "Organization", "name": "SATCORP", "url": "https://satcorp.io" },
        "name": "PULSE",
        "url": "https://satcorp.io/pulse",
        "description": "PULSE /// LIVE BROADCAST BRANCH - BROADCAST / CREATOR HUB. Streaming design, video pipelines, short-form optimization, and virtual event command."
      }} />
      <Header title="PULSE" />
      <div className="portal-bg" style={{ backgroundImage: 'url(/assets/pulse_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5 }} />
      <GalaxyBackground />
      
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-operator-wrapper .portal-main { flex: 1; padding-bottom: 80px; position: relative; z-index: 10; }
        .pulse-skill-card {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 8px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
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
          border-color: rgba(6, 182, 212, 0.8);
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.1);
          transform: translateY(-5px) scale(1.02);
        }
        .pulse-skill-card .card-bg-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 80%);
          z-index: 1;
          transition: opacity 0.3s ease;
        }
        .pulse-skill-card:hover .card-bg-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
        }
        
        .pulse-skill-card .card-title {
          font-family: var(--font-header), monospace;
          color: #fff;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          z-index: 2;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          transition: color 0.3s ease;
        }
        .pulse-skill-card:hover .card-title {
          color: var(--accent-cyan);
        }
        
        .pulse-skill-card .card-short-desc {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
          z-index: 2;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .pulse-skill-card:hover .card-short-desc {
          opacity: 1;
          max-height: 100px;
          margin-top: 8px;
        }

        .pulse-footer {
           position: fixed; bottom: 0; left: 0; right: 0;
           height: 60px; padding: 0 40px;
           display: flex; justify-content: space-between; align-items: center;
           border-top: 1px solid rgba(6, 182, 212, 0.1);
           background: rgba(0, 0, 0, 0.8);
           backdrop-filter: blur(5px);
           font-family: monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4);
           z-index: 100;
        }
      `}}/>

      <main className="portal-main">
        <div style={{ marginBottom: '40px' }}>
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" style={{ background: '#06b6d4' }} />
            <span className="op-eyebrow-text" style={{ color: '#06b6d4' }}>PULSE BROADCAST WING /// LIVE OPERATIONS</span>
          </div>
          <h1 className="portal-title">
            NETWORK <span className="portal-title-accent" style={{ color: '#06b6d4' }}>BROADCAST</span>
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
              style={{ backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : 'none' }}
            >
              <div className="card-bg-overlay" />
              <div className="card-title">{card.title}</div>
              <div className="card-short-desc">{card.shortDesc}</div>
            </TacticalCardWrapper>
          ))}
        </div>
      </main>

      <div className="pulse-footer">
        <div>2026 PULSE</div>
        <div>SATCORP Broadcast Hub // Artisan Tier</div>
      </div>

      {activeCard && (
        <RequisitionHub 
          activeCard={activeCard} 
          onClose={() => setActiveCard(null)}
          divisionTag="PULSE BROADCAST WING"
          theme={{
            color: '#06b6d4',
            glow: 'rgba(6, 182, 212, 0.35)',
            rgb: '6, 182, 212'
          }}
        />
      )}
    </div>
  );
}
