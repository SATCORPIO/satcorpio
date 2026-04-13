import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';
import JsonLd from '../components/JsonLd';
import TacticalCardWrapper from '../components/TacticalCardWrapper';
import RequisitionHub from '../components/RequisitionHub';

const SKILL_CARDS = [
  {
    id: "game-dev-world-building",
    title: "Game-Development/World-Building Design",
    shortDesc: "Real-time engine workflows, custom lore bibles, and prototype builds.",
    backgroundImage: "/assets/kira_game_dev_bg.png",
    capabilities: [
      "Real-time engine workflows (Unity/Unreal Engine)",
      "Gameplay/systems/QOL MODs",
      "Game-ready asset creation/optimization",
      "Environment/blockout/level prototyping",
      "Interactive prototypes/vertical slices",
      "Mobile game prototyping (iOS/Android focus)",
      "Technical art pipelines (assets→engine)",
      "Performance-aware design (LOD/batching/optimization)",
      "Cross-platform (PC/Mobile/WebGL)",
      "HUD/UI systems for games/interactive apps",
      "Canon documentation/lore systems",
      "Faction/operator/environment design",
      "Poster/cinematic key art"
    ],
    toolsEngines: [
      "Blender – Modeling/Sculpting/Uvs/Animations/Export pipelines",
      "Unity – 2D/3D Games/Mobile-first builds/Rapid Prototyping",
      "Unreal Engine – Cinematic visuals/High-fidelity environments/Blueprints",
      "Substance (as needed) – Materials/Texturing",
      "Engine-ready export standards (FBX/GLTF/PNG/EXR)"
    ],
    gameAdjacentFocus: [
      "UI/HUD concepts for games/simulations",
      "Worldbuilding systems/canon documentation",
      "Factions/operators/environments/lore bibles",
      "Poster/key art/cinematic mockups",
      "Brand-locked game worlds (visual+narrative cohesion)"
    ],
    deliverables: [
      "Engine-ready assets",
      "Packaged Mods",
      "Prototype builds/Playable demos",
      "Visual slices (cinematic/interactive)",
      "UI/HUD kits",
      "World/system Docs",
      "Source files+structured handoff"
    ],
    services: [
      "Real-time engine workflows (Unity/Unreal Engine)",
      "Gameplay/systems/QOL MODs",
      "Game-ready asset creation/optimization",
      "Environment/blockout/level prototyping",
      "Interactive prototypes/vertical slices",
      "Mobile game prototyping (iOS/Android focus)",
      "Technical art pipelines (assets→engine)",
      "Performance-aware design (LOD/batching/optimization)",
      "Cross-platform (PC/Mobile/WebGL)",
      "HUD/UI systems for games/interactive apps",
      "Canon documentation/lore systems",
      "Faction/operator/environment design",
      "Poster/cinematic key art"
    ]
  },
  {
    id: "narrative-design",
    title: "Narrative Design & Interactive Storytelling Systems",
    shortDesc: "Branching dialogues, lore bibles, and player experience flows.",
    backgroundImage: "/assets/kira_narrative_design_bg.png",
    capabilities: [
      "Branching dialogue trees & choice-driven narratives",
      "Lore bibles, faction backstories, character arcs",
      "Quest & progression system design",
      "World canon documentation & consistency engines",
      "Emotional beat mapping & player experience flows",
      "Transmedia storytelling extensions (game → content → merch)"
    ],
    toolsTech: [
      "Yarn Spinner", "Twine", "Ink", "Notion", "World Anvil"
    ],
    deliverables: [
      "Complete narrative docs + integrated engine files"
    ],
    services: [
      "Branching dialogue trees & choice-driven narratives",
      "Lore bibles, faction backstories, character arcs",
      "Quest & progression system design",
      "World canon documentation & consistency engines",
      "Emotional beat mapping & player experience flows",
      "Transmedia storytelling extensions (game → content → merch)"
    ]
  },
  {
    id: "procedural-generation",
    title: "Procedural Generation & Dynamic World Pipelines",
    shortDesc: "Procedural terrain, dynamic NPCs, and runtime optimization.",
    backgroundImage: "/assets/kira_procedural_gen_bg.png",
    capabilities: [
      "Terrain, city, dungeon & ecosystem procedural systems",
      "Dynamic NPC behaviors & event generation",
      "Loot & item procedural systems",
      "Runtime optimization & seed-based reproducibility",
      "Hybrid hand-crafted + procedural workflows"
    ],
    toolsTech: [
      "Houdini", "Unity PCG", "Unreal Niagara & PCG", "Blender Geometry Nodes"
    ],
    deliverables: [
      "Procedural modules + editor tools + documentation"
    ],
    services: [
      "Terrain, city, dungeon & ecosystem procedural systems",
      "Dynamic NPC behaviors & event generation",
      "Loot & item procedural systems",
      "Runtime optimization & seed-based reproducibility",
      "Hybrid hand-crafted + procedural workflows"
    ]
  },
  {
    id: "vr-ar-xr",
    title: "VR/AR/XR Experience Prototyping",
    shortDesc: "Immersive interaction design and cross-device spatial environments.",
    backgroundImage: "/assets/kira_xr_proto_bg.png",
    capabilities: [
      "Full XR scene builds & interaction design",
      "Hand tracking, spatial UI, locomotion systems",
      "Cross-device deployment (Quest, Vision Pro, mobile AR)",
      "Immersive storytelling in XR",
      "Performance profiling for standalone headsets"
    ],
    toolsTech: [
      "Unity XR Interaction Toolkit", "Unreal OpenXR", "AR Foundation"
    ],
    deliverables: [
      "Playable XR builds + full source + optimization reports"
    ],
    services: [
      "Full XR scene builds & interaction design",
      "Hand tracking, spatial UI, locomotion systems",
      "Cross-device deployment (Quest, Vision Pro, mobile AR)",
      "Immersive storytelling in XR",
      "Performance profiling for standalone headsets"
    ]
  },
  {
    id: "audio-design",
    title: "Full Audio Design & Immersive Sound Systems",
    shortDesc: "Adaptive music, Foley, and spatial audio integration engines.",
    backgroundImage: "/assets/kira_audio_design_bg.png",
    capabilities: [
      "Adaptive music & dynamic audio engines",
      "Foley, voice direction, soundscape design",
      "Spatial audio (3D/ambisonics)",
      "Audio middleware integration",
      "Localization & accessibility audio layers"
    ],
    toolsTech: [
      "FMOD", "Wwise", "Reaper", "ElevenLabs (voice)", "Audacity"
    ],
    deliverables: [
      "Complete audio banks + implementation guides"
    ],
    services: [
      "Adaptive music & dynamic audio engines",
      "Foley, voice direction, soundscape design",
      "Spatial audio (3D/ambisonics)",
      "Audio middleware integration",
      "Localization & accessibility audio layers"
    ]
  },
  {
    id: "game-economy",
    title: "Game Economy, Balancing & Live-Service Ops",
    shortDesc: "Economy loops, battle-pass architecture, and churn analysis.",
    backgroundImage: "/assets/kira_game_economy_bg.png",
    capabilities: [
      "Economy design (currencies, sinks, progression)",
      "Meta & balancing systems with data-driven iteration",
      "Live-ops event frameworks",
      "Monetization & battle-pass architecture",
      "Player retention & churn analysis loops"
    ],
    deliverables: [
      "Economy spreadsheets + balancing tools + live-ops playbooks"
    ],
    services: [
      "Economy design (currencies, sinks, progression)",
      "Meta & balancing systems with data-driven iteration",
      "Live-ops event frameworks",
      "Monetization & battle-pass architecture",
      "Player retention & churn analysis loops"
    ]
  }
];

export default function KiraStudios() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="page-wrapper portal-page pulse-operator-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>KI-RA Studios — SATCORP</title>
        <meta name="description" content="KI-RA STUDIOS /// TASK FORCE BRANCH - WORLD-BUILDING / GAME DEV STUDIO. Game development, narrative design, procedural generation, and immersive spatial environments." />
        <meta property="og:title" content="KI-RA Studios — SATCORP" />
        <meta property="og:description" content="KI-RA STUDIOS /// TASK FORCE BRANCH - WORLD-BUILDING / GAME DEV STUDIO. Game development, narrative design, procedural generation, and immersive spatial environments." />
        <meta property="og:url" content="https://satcorp.io/kirastudios" />
        <meta property="og:image" content="https://satcorp.io/og/ki-ra.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://satcorp.io/og/ki-ra.png" />
      </Helmet>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Brand Identity & Visual Systems",
        "provider": { "@type": "Organization", "name": "SATCORP", "url": "https://satcorp.io" },
        "name": "KI-RA Studios",
        "url": "https://satcorp.io/kirastudios",
        "description": "KI-RA STUDIOS /// TASK FORCE BRANCH - WORLD-BUILDING / GAME DEV STUDIO. Game development, narrative design, procedural generation, and immersive spatial environments."
      }} />
      <Header title="KI-RA STUDIOS" />
      <div className="portal-bg" style={{ backgroundImage: 'url(/assets/kirastudios_main_bg_v2.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
      <GalaxyBackground />
      
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-operator-wrapper .portal-main { flex: 1; padding-bottom: 80px; position: relative; z-index: 10; }
        .pulse-skill-card {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(217, 70, 239, 0.2);
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
          border-color: rgba(217, 70, 239, 0.8);
          box-shadow: 0 0 30px rgba(217, 70, 239, 0.2), inset 0 0 20px rgba(217, 70, 239, 0.1);
          transform: translateY(-5px) scale(1.01);
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
          color: #d946ef;
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
           border-top: 1px solid rgba(217, 70, 239, 0.1);
           background: rgba(0, 0, 0, 0.8);
           backdrop-filter: blur(5px);
           font-family: monospace; font-size: 0.75rem; color: rgba(255,255,255,0.4);
           z-index: 100;
        }
      `}}/>

      <main className="portal-main">
        <div style={{ marginBottom: '40px' }}>
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" style={{ background: '#d946ef' }} />
            <span className="op-eyebrow-text" style={{ color: '#d946ef' }}>KI-RA STUDIOS /// TASK FORCE BRANCH</span>
          </div>
          <h1 className="portal-title">
            WORLD-BUILDING / <span className="portal-title-accent" style={{ color: '#d946ef' }}>GAME DEV STUDIO</span>
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
        <div>2026 Ki-Ra Studios</div>
        <div>SATCORP Creative Sanctum // Artisan Tier</div>
      </div>

      {activeCard && (
        <RequisitionHub 
          activeCard={activeCard} 
          onClose={() => setActiveCard(null)}
          divisionTag="KI-RA CREATIVE WING"
          theme={{
            color: '#d946ef',
            glow: 'rgba(217, 70, 239, 0.35)',
            rgb: '217, 70, 239'
          }}
        />
      )}
    </div>
  );
}
