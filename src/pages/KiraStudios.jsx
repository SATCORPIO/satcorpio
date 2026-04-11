import React, { useState } from 'react';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1492038802544267395/XHgcF2P_gMzDELXeuL2mw6LfKrNsj2HyhLagC5jHqgmc1MHX15mK3NaMmIAGgc_8JVVv';

const SKILL_CARDS = [
  {
    id: "game-dev-world-building",
    title: "Game-Development/World-Building Design",
    shortDesc: "Real-time engine workflows, custom lore bibles, and prototype builds.",
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
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Form State
  const [selectedServices, setSelectedServices] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
  const [clientType, setClientType] = useState('Personal');
  const [clientName, setClientName] = useState('');
  
  // Custom multiselect dropdown for contact info state
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [contactMethods, setContactMethods] = useState({
    Email: false,
    Phone: false,
    Signal: false,
    Discord: false,
    Other: false
  });
  const [contactDetails, setContactDetails] = useState({});
  const [briefDescription, setBriefDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handlers
  const toggleContactMethod = (method) => {
    setContactMethods(prev => ({ ...prev, [method]: !prev[method] }));
  };

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const copy = { ...prev };
      if (copy[service]) {
        delete copy[service];
      } else {
        copy[service] = true;
      }
      return copy;
    });
  };

  const handleServiceDetailChange = (service, value) => {
    setServiceDetails(prev => ({ ...prev, [service]: value }));
  };

  const handleContactDetailChange = (method, value) => {
    setContactDetails(prev => ({ ...prev, [method]: value }));
  };

  const resetForm = () => {
    setSelectedServices({});
    setServiceDetails({});
    setClientType('Personal');
    setClientName('');
    setContactMethods({ Email: false, Phone: false, Signal: false, Discord: false, Other: false });
    setContactDetails({});
    setBriefDescription('');
    setShowContactDropdown(false);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Quick validation
    const hasService = Object.keys(selectedServices).length > 0;
    const hasContact = Object.entries(contactMethods).some(([_, active]) => active);
    
    if (!clientName || !briefDescription || !hasService || !hasContact) {
      alert("Please fill out all required fields (Name, at least one service, at least one contact method, and brief description).");
      return;
    }

    setIsSubmitting(true);
    
    // Check active services and contacts
    const activeServices = Object.keys(selectedServices).filter(s => selectedServices[s]);
    const activeContacts = Object.keys(contactMethods).filter(m => contactMethods[m]);

    const serviceLines = activeServices.map(s => 
      `**${s}**\n> ${serviceDetails[s] || 'No details'}`
    ).join('\\n\\n');

    const contactLines = activeContacts.map(c => 
      `**${c}:** ${contactDetails[c] || ''}`
    ).join('\\n');

    const embed = {
      title: `🎨 NEW SERVICE REQUEST — SATCORP (${activeCard.title})`,
      color: 0xd946ef,
      fields: [
        { name: '📋 Services Requested', value: serviceLines || 'N/A', inline: false },
        { name: '👤 Client Type', value: clientType, inline: true },
        { name: '🪪 Name', value: clientName, inline: true },
        { name: '📞 Contact Info', value: contactLines || 'N/A', inline: false },
        { name: '📝 Project Brief', value: briefDescription || 'N/A', inline: false },
      ],
      footer: { text: 'SATCORP Service Request System — satcorp.io / KI-RA' },
      timestamp: new Date().toISOString(),
    }

    const payload = {
      embeds: [embed]
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowOrderForm(false);
          setActiveCard(null);
          resetForm();
        }, 3000);
      } else {
        alert("Failed to submit request to Discord. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper portal-page pulse-operator-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="SATCORP" />
      <div className="portal-bg" style={{ backgroundImage: 'url(/assets/kirastudios_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }} />
      <GalaxyBackground />
      
      <style dangerouslySetInnerHTML={{__html: `
        .pulse-operator-wrapper .portal-main { flex: 1; padding-bottom: 80px; position: relative; z-index: 10; }
        .pulse-skill-card {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(217, 70, 239, 0.2);
          border-radius: 8px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-height: 180px;
          display: flex;
          flex-direction: column;
        }
        .pulse-skill-card:hover {
          border-color: rgba(217, 70, 239, 0.6);
          box-shadow: 0 0 20px rgba(217, 70, 239, 0.1);
          transform: translateY(-2px);
        }
        .pulse-skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(217,70,239,0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pulse-skill-card:hover::before { opacity: 1; }
        
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

        .skill-deck-modal {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }

        .skill-deck-content {
          background: rgba(10, 10, 12, 0.95);
          border: 1px solid #d946ef;
          border-radius: 12px;
          width: 100%; max-width: 800px; max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: flex; flex-direction: column;
        }
        
        .skill-deck-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex; justify-content: space-between; align-items: center;
          background: rgba(217, 70, 239, 0.05);
        }
        
        .skill-deck-body { padding: 24px; flex: 1; color: #ddd; }
        .skill-deck-footer { padding: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: flex-end; gap: 16px; background: rgba(0,0,0,0.5); }
        
        .modal-btn {
          padding: 10px 24px; border-radius: 4px; font-family: var(--font-header), monospace;
          cursor: pointer; transition: all 0.2s ease;
          font-size: 0.9rem; letter-spacing: 1px;
        }
        .modal-btn.primary {
          background: #d946ef; color: #fff; border: none; font-weight: bold;
        }
        .modal-btn.primary:hover { background: #e879f9; box-shadow: 0 0 15px #d946ef; }
        .modal-btn.secondary {
          background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3);
        }
        .modal-btn.secondary:hover { background: rgba(255,255,255,0.1); }
        
        .deck-list { list-style-type: none; padding-left: 0; margin-bottom: 24px; }
        .deck-list li { padding: 6px 0; padding-left: 20px; position: relative; }
        .deck-list li::before { content: '▹'; position: absolute; left: 0; color: #d946ef; }
        .deck-section-title { font-family: var(--font-header), monospace; font-size: 1.1rem; color: #fff; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
        
        /* Form Overrides */
        .pulse-form-group { margin-bottom: 20px; }
        .pulse-label { display: block; margin-bottom: 8px; color: #aaa; font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase; }
        .pulse-input, .pulse-textarea, .pulse-select {
          width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; padding: 12px; border-radius: 4px; font-family: var(--font-body), sans-serif;
        }
        .pulse-input:focus, .pulse-textarea:focus, .pulse-select:focus { outline: none; border-color: #d946ef; }
        
        .pulse-checkbox-group { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
        .pulse-checkbox { mt-1 flex-shrink-0; width: 18px; height: 18px; accent-color: #d946ef; }
        
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
            <span className="op-eyebrow-text" style={{ color: '#d946ef' }}>KI-RA STUDIOS – TASK FORCE BRANCH</span>
          </div>
          <h1 className="portal-title">
            WORLD-BUILDING / <span className="portal-title-accent" style={{ color: '#d946ef' }}>GAME DEV STUDIO</span>
          </h1>
          <p className="portal-subtitle">SELECT A SKILL MODULE TO INITIATE SERVICE PROTOCOLS</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {SKILL_CARDS.map(card => (
            <div 
              key={card.id} 
              className="pulse-skill-card"
              onClick={() => setActiveCard(card)}
            >
              <div className="card-title">{card.title}</div>
              <div className="card-short-desc">{card.shortDesc}</div>
            </div>
          ))}
        </div>
      </main>

      <div className="pulse-footer">
        <div>2026 KI-RA STUDIOS</div>
        <div>SATCORP Creative Sanctum // Artisan Tier</div>
      </div>

      {/* SKILL DECK MODAL */}
      {activeCard && !showOrderForm && (
        <div className="skill-deck-modal" onClick={() => setActiveCard(null)}>
          <div className="skill-deck-content" onClick={e => e.stopPropagation()}>
            <div className="skill-deck-header">
              <h2 style={{ margin: 0, fontFamily: 'var(--font-header), monospace', fontSize: '1.4rem' }}>{activeCard.title}</h2>
              <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setActiveCard(null)}>×</button>
            </div>
            
            <div className="skill-deck-body">
              {activeCard.capabilities && (
                <>
                  <div className="deck-section-title">CAPABILITIES</div>
                  <ul className="deck-list">
                    {activeCard.capabilities.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </>
              )}
              {activeCard.toolsEngines && (
                <>
                  <div className="deck-section-title">TOOLS/ENGINES</div>
                  <ul className="deck-list">
                    {activeCard.toolsEngines.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </>
              )}
              {activeCard.toolsTech && (
                <>
                  <div className="deck-section-title">TOOLS/TECH</div>
                  <ul className="deck-list">
                    {activeCard.toolsTech.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </>
              )}
              {activeCard.gameAdjacentFocus && (
                <>
                  <div className="deck-section-title">GAME-ADJACENT FOCUS</div>
                  <ul className="deck-list">
                    {activeCard.gameAdjacentFocus.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </>
              )}
              {activeCard.deliverables && (
                <>
                  <div className="deck-section-title">DELIVERABLES</div>
                  <ul className="deck-list">
                    {activeCard.deliverables.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </>
              )}
            </div>
            
            <div className="skill-deck-footer">
              <button className="modal-btn secondary" onClick={() => setActiveCard(null)}>CANCEL</button>
              <button className="modal-btn primary" onClick={() => { setShowOrderForm(true); resetForm(); }}>ORDER SERVICES</button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER FORM MODAL */}
      {showOrderForm && activeCard && (
        <div className="skill-deck-modal" onClick={() => setShowOrderForm(false)}>
          <div className="skill-deck-content" onClick={e => e.stopPropagation()}>
            <div className="skill-deck-header">
              <div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-header), monospace', fontSize: '1.4rem' }}>SERVICE REQUISITION</h2>
                <div style={{ color: '#d946ef', fontSize: '0.85rem', marginTop: '4px' }}>// MODULE: {activeCard.title.toUpperCase()}</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setShowOrderForm(false)}>×</button>
            </div>

            <div className="skill-deck-body">
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#d946ef' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-header)', letterSpacing: '2px', color: '#fff' }}>REQUEST SECURELY TRANSMITTED</h3>
                  <p style={{ color: '#aaa' }}>KI-RA STUDIO artisans have been notified.</p>
                </div>
              ) : (
                <form id="pulse-order-form">
                  <div className="pulse-form-group">
                    <label className="pulse-label">1. SELECT REQUIRED SERVICES</label>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {activeCard.services.map((service, idx) => (
                        <div key={idx} style={{ marginBottom: idx !== activeCard.services.length - 1 ? '16px' : '0' }}>
                          <div className="pulse-checkbox-group">
                            <input 
                              type="checkbox" 
                              className="pulse-checkbox"
                              name={service}
                              checked={!!selectedServices[service]}
                              onChange={() => toggleService(service)}
                              style={{ marginTop: '4px' }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ color: '#fff', fontWeight: '500', marginBottom: selectedServices[service] ? '8px' : '0' }}>{service}</div>
                              {selectedServices[service] && (
                                <textarea 
                                  className="pulse-textarea" 
                                  placeholder="Initial details for this project service..."
                                  rows="2"
                                  value={serviceDetails[service] || ''}
                                  onChange={(e) => handleServiceDetailChange(service, e.target.value)}
                                  required
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div className="pulse-form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label className="pulse-label">2. CLIENT TYPE *</label>
                      <select 
                        className="pulse-select" 
                        value={clientType} 
                        onChange={(e) => setClientType(e.target.value)}
                        required
                      >
                        <option value="Personal">Personal</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <div className="pulse-form-group" style={{ flex: 2, marginBottom: 0 }}>
                      <label className="pulse-label">CLIENT NAME *</label>
                      <input 
                        type="text" 
                        className="pulse-input" 
                        placeholder="Operator/Entity Name" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pulse-form-group">
                    <label className="pulse-label">3. CONTACT INFO (SELECT ALL THAT APPLY) *</label>
                    <div style={{ position: 'relative' }}>
                      <div 
                        className="pulse-input" 
                        style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', padding: '12px' }}
                        onClick={() => setShowContactDropdown(!showContactDropdown)}
                      >
                        <span>{Object.entries(contactMethods).filter(([_,v]) => v).map(([k]) => k).join(', ') || 'Select Contact Methods...'}</span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>▼</span>
                      </div>
                      
                      {showContactDropdown && (
                        <div style={{ 
                          position: 'absolute', top: '100%', left: 0, right: 0, 
                          background: '#111', border: '1px solid rgba(255,255,255,0.2)', 
                          borderTop: 'none', borderRadius: '0 0 4px 4px', zIndex: 20,
                          boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                        }}>
                          {Object.keys(contactMethods).map(method => (
                            <div 
                              key={method}
                              style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                              onClick={() => toggleContactMethod(method)}
                            >
                              <input type="checkbox" className="pulse-checkbox" checked={contactMethods[method]} readOnly />
                              <span style={{ color: '#ccc' }}>{method}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {Object.entries(contactMethods).some(([_, active]) => active) && (
                      <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         {Object.keys(contactMethods).filter(m => contactMethods[m]).map(method => (
                            <div key={method} style={{ marginBottom: '12px' }}>
                              <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '4px' }}>{method.toUpperCase()} DETAILS</div>
                              <input 
                                type="text" 
                                className="pulse-input" 
                                placeholder={`Enter ${method}...`}
                                value={contactDetails[method] || ''}
                                onChange={(e) => handleContactDetailChange(method, e.target.value)}
                                required
                              />
                            </div>
                         ))}
                      </div>
                    )}
                  </div>

                  <div className="pulse-form-group">
                    <label className="pulse-label">4. BRIEF DESCRIPTION OF REQUESTED SERVICE *</label>
                    <textarea 
                      className="pulse-textarea" 
                      rows="4" 
                      placeholder="Outline project parameters..."
                      value={briefDescription}
                      onChange={(e) => setBriefDescription(e.target.value)}
                      required
                    />
                  </div>

                </form>
              )}
            </div>

            <div className="skill-deck-footer">
              {!submitSuccess && (
                <>
                  <button 
                    className="modal-btn secondary" 
                    onClick={() => setShowOrderForm(false)}
                    disabled={isSubmitting}
                  >BACK</button>
                  <button 
                    className="modal-btn primary" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT REQUEST'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
