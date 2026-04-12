import React, { useState } from 'react';
import Header from '../components/Header';
import GalaxyBackground from '../components/GalaxyBackground';

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1492038802544267395/XHgcF2P_gMzDELXeuL2mw6LfKrNsj2HyhLagC5jHqgmc1MHX15mK3NaMmIAGgc_8JVVv';

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
      title: `🎙️ NEW SERVICE REQUEST — SATCORP (${activeCard.title})`,
      color: 0x06b6d4,
      fields: [
        { name: '📋 Services Requested', value: serviceLines || 'N/A', inline: false },
        { name: '👤 Client Type', value: clientType, inline: true },
        { name: '🪪 Name', value: clientName, inline: true },
        { name: '📞 Contact Info', value: contactLines || 'N/A', inline: false },
        { name: '📝 Project Brief', value: briefDescription || 'N/A', inline: false },
      ],
      footer: { text: 'SATCORP Service Request System — satcorp.io / PULSE' },
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
      <Header title="PULSΞ" />
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
          border: 1px solid var(--accent-cyan);
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
          background: rgba(6, 182, 212, 0.05);
        }
        
        .skill-deck-body { padding: 24px; flex: 1; color: #ddd; }
        .skill-deck-footer { padding: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: flex-end; gap: 16px; background: rgba(0,0,0,0.5); }
        
        .modal-btn {
          padding: 10px 24px; border-radius: 4px; font-family: var(--font-header), monospace;
          cursor: pointer; transition: all 0.2s ease;
          font-size: 0.9rem; letter-spacing: 1px;
        }
        .modal-btn.primary {
          background: var(--accent-cyan); color: #000; border: none; font-weight: bold;
        }
        .modal-btn.primary:hover { background: #fff; box-shadow: 0 0 15px var(--accent-cyan); }
        .modal-btn.secondary {
          background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3);
        }
        .modal-btn.secondary:hover { background: rgba(255,255,255,0.1); }
        
        .deck-list { list-style-type: none; padding-left: 0; margin-bottom: 24px; }
        .deck-list li { padding: 6px 0; padding-left: 20px; position: relative; }
        .deck-list li::before { content: '▹'; position: absolute; left: 0; color: var(--accent-cyan); }
        .deck-section-title { font-family: var(--font-header), monospace; font-size: 1.1rem; color: #fff; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
        
        /* Form Overrides */
        .pulse-form-group { margin-bottom: 20px; }
        .pulse-label { display: block; margin-bottom: 8px; color: #aaa; font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase; }
        .pulse-input, .pulse-textarea, .pulse-select {
          width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; padding: 12px; border-radius: 4px; font-family: var(--font-body), sans-serif;
        }
        .pulse-input:focus, .pulse-textarea:focus, .pulse-select:focus { outline: none; border-color: var(--accent-cyan); }
        
        .pulse-checkbox-group { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
        .pulse-checkbox { mt-1 flex-shrink-0; width: 18px; height: 18px; accent-color: var(--accent-cyan); }
        
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
            <div className="op-eyebrow-line" style={{ background: 'var(--accent-cyan)' }} />
            <span className="op-eyebrow-text" style={{ color: 'var(--accent-cyan)' }}>PULSΞ /// LIVE BROADCAST BRANCH</span>
          </div>
          <h1 className="portal-title">
            BROADCAST / <span className="portal-title-accent">CREATOR HUB</span>
          </h1>
          <p className="portal-subtitle">SELECT A SERVICE MODULE TO INITIATE SATCORP PROTOCOLS</p>
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
              style={{ backgroundImage: card.backgroundImage ? `url(${card.backgroundImage})` : 'none' }}
              onClick={() => setActiveCard(card)}
            >
              <div className="card-bg-overlay" />
              <div className="card-title">{card.title}</div>
              <div className="card-short-desc">{card.shortDesc}</div>
            </div>
          ))}
        </div>
      </main>

      <div className="pulse-footer">
        <div>2026 Ki-Ra Studios</div>
        <div>SATCORP Broadcast Hub // Broadcast Division</div>
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
              {activeCard.toolsTech && (
                <>
                  <div className="deck-section-title">TOOLS/TECH</div>
                  <ul className="deck-list">
                    {activeCard.toolsTech.map((item, i) => <li key={i}>{item}</li>)}
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
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', marginTop: '4px' }}>// MODULE: {activeCard.title.toUpperCase()}</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setShowOrderForm(false)}>×</button>
            </div>

            <div className="skill-deck-body">
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--accent-cyan)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--font-header)', letterSpacing: '2px' }}>REQUEST SECURELY TRANSMITTED</h3>
                  <p style={{ color: '#aaa' }}>PULSE operators have been notified.</p>
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
