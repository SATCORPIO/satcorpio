import React, { useState } from 'react';

export default function RequisitionHub({ 
  activeCard, 
  onClose, 
  theme = {
    color: '#00ff41',
    glow: 'rgba(0, 255, 65, 0.4)',
    rgb: '0, 255, 65'
  },
  divisionTag = 'SATCORP OPERATIONS',
  webhookUrl = 'https://discord.com/api/webhooks/1492038802544267395/XHgcF2P_gMzDELXeuL2mw6LfKrNsj2HyhLagC5jHqgmc1MHX15mK3NaMmIAGgc_8JVVv'
}) {
  const [selectedServices, setSelectedServices] = useState({});
  const [serviceDetails, setServiceDetails] = useState({});
  const [clientType, setClientType] = useState('Personal');
  const [clientName, setClientName] = useState('');
  const [contactMethods, setContactMethods] = useState({
    Email: false,
    Discord: false,
    Signal: false,
    Other: false
  });
  const [contactDetails, setContactDetails] = useState({});
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [briefDescription, setBriefDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const resetForm = () => {
    setSelectedServices({});
    setServiceDetails({});
    setClientType('Personal');
    setClientName('');
    setContactMethods({ Email: false, Discord: false, Signal: false, Other: false });
    setContactDetails({});
    setBriefDescription('');
    setSubmitSuccess(false);
  };

  const toggleService = (service) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  const handleServiceDetailChange = (service, value) => {
    setServiceDetails(prev => ({
      ...prev,
      [service]: value
    }));
  };

  const toggleContactMethod = (method) => {
    setContactMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  const handleContactDetailChange = (method, value) => {
    setContactDetails(prev => ({
      ...prev,
      [method]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const activeServices = Object.keys(selectedServices).filter(s => selectedServices[s]);
    const serviceLines = activeServices.map(s => `**${s}**: ${serviceDetails[s] || 'No specific parameters'}`).join('\n');
    const contacts = Object.keys(contactMethods).filter(m => contactMethods[m]).map(m => `**${m}**: ${contactDetails[m] || 'N/A'}`).join('\n');

    const embed = {
      title: `ðŸŽ¯ NEW SERVICE REQUISITION â€” ${activeCard.title.toUpperCase()}`,
      color: parseInt(theme.color.replace('#', ''), 16),
      fields: [
        { name: 'ðŸ“‹ Objective Modules', value: serviceLines || 'None selected', inline: false },
        { name: 'ðŸ‘¤ Entity Info', value: `**Type:** ${clientType}\n**Name:** ${clientName}`, inline: true },
        { name: 'ðŸ“ž Comm-Links', value: contacts || 'None provided', inline: true },
        { name: 'ðŸ“ Mission Brief', value: briefDescription || 'N/A', inline: false },
      ],
      footer: { text: `${divisionTag} // Requisition Terminal` },
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        alert('Transmission failed. Emergency protocols initiated. Please retry.');
      }
    } catch (err) {
      console.error(err);
      alert('Network disruption detected. Unable to establish uplink.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get service categories from card data
  // Fallback for different data structures (portals use .services, main page uses .sections)
  const availableServices = activeCard.services || (activeCard.sections ? activeCard.sections.flatMap(s => s.items) : []);

  return (
    <div 
      className="requisition-hub-overlay" 
      onClick={() => {
        if (!isSubmitting) {
          onClose();
          resetForm();
        }
      }}
      style={{
        '--division-color': theme.color,
        '--division-bg-glow': theme.glow,
        '--division-rgb': theme.rgb
      }}
    >
      <div className="requisition-hub-panel" onClick={e => e.stopPropagation()}>
        {/* LEFT COLUMN: MODULE INFO */}
        <div className="req-info-column">
          <div className="req-division-tag">{divisionTag}</div>
          <h2 className="req-module-title">{activeCard.title}</h2>
          
          {(activeCard.capabilities || (activeCard.sections && activeCard.sections[0]?.items)) && (
            <div className="req-section">
              <h3 className="req-section-title">Field Capabilities</h3>
              <ul className="req-list">
                {(activeCard.capabilities || activeCard.sections[0].items).map((item, i) => (
                  <li key={i} className="req-list-item">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {activeCard.toolsTech && (
            <div className="req-section">
              <h3 className="req-section-title">Operational Tech Stack</h3>
              <ul className="req-list">
                {activeCard.toolsTech.map((item, i) => <li key={i} className="req-list-item">{item}</li>)}
              </ul>
            </div>
          )}

          {(activeCard.deliverables || (activeCard.sections && activeCard.sections[1]?.items)) && (
            <div className="req-section">
              <h3 className="req-section-title">Mission Deliverables</h3>
              <ul className="req-list">
                {(activeCard.deliverables || activeCard.sections[1].items).map((item, i) => (
                  <li key={i} className="req-list-item">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: REQUISITION FORM */}
        <div className="req-form-column">
          {submitSuccess ? (
            <div className="req-success">
              <div className="req-success-icon">âœ“</div>
              <h3 className="success-title">TRANSMISSION SUCCESSFUL</h3>
              <p className="success-text">
                Your requisition has been encrypted and routed to the {divisionTag}. 
                Stand by for operator response.
              </p>
              <button 
                className="req-submit-btn" 
                style={{ maxWidth: '200px' }}
                onClick={() => { onClose(); resetForm(); }}
              >
                CLOSE TERMINAL
              </button>
            </div>
          ) : (
            <>
              <div className="req-form-title">
                <span>SERVICE REQUISITION</span>
                <button className="req-close-btn" onClick={() => { onClose(); resetForm(); }}>Ã—</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="req-form-group">
                  <label className="req-label">1. OBJECTIVE MODULES</label>
                  <div className="req-service-grid">
                    {availableServices.map((service, idx) => (
                      <div 
                        key={idx} 
                        className={`req-service-option ${selectedServices[service] ? 'selected' : ''}`}
                        onClick={() => toggleService(service)}
                      >
                        <div className="req-checkbox-row">
                          <div className="req-checkbox" />
                          <div className="req-service-name">{service}</div>
                        </div>
                        {selectedServices[service] && (
                          <textarea 
                            className="req-textarea" 
                            style={{ marginTop: '12px', fontSize: '0.85rem' }}
                            placeholder="Specify parameters for this service..."
                            value={serviceDetails[service] || ''}
                            onClick={e => e.stopPropagation()}
                            onChange={(e) => handleServiceDetailChange(service, e.target.value)}
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="req-form-group">
                    <label className="req-label">2. ENTITY STATUS</label>
                    <select 
                      className="req-select" 
                      value={clientType} 
                      onChange={(e) => setClientType(e.target.value)}
                      required
                    >
                      <option value="Personal">Personal</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div className="req-form-group">
                    <label className="req-label">ENTITY NAME</label>
                    <input 
                      type="text" 
                      className="req-input" 
                      placeholder="Operator Designation" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="req-form-group">
                  <label className="req-label">3. COMM-LINK PREFERENCE</label>
                  <div 
                    className="req-input" 
                    style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={() => setShowContactDropdown(!showContactDropdown)}
                  >
                    <span style={{ fontSize: '0.9rem' }}>
                      {Object.entries(contactMethods).filter(([_,v]) => v).map(([k]) => k).join(', ') || 'Select Channels...'}
                    </span>
                    <span>â–¼</span>
                  </div>
                  
                  {showContactDropdown && (
                    <div style={{ 
                      marginTop: '4px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '4px', overflow: 'hidden', position: 'absolute', width: 'calc(100% - 80px)', zIndex: 10
                    }}>
                      {Object.keys(contactMethods).map(method => (
                        <div 
                          key={method}
                          style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                          onClick={() => toggleContactMethod(method)}
                        >
                          <div style={{ 
                            width: '14px', height: '14px', border: `1px solid ${theme.color}`, 
                            background: contactMethods[method] ? theme.color : 'transparent',
                            borderRadius: '2px'
                          }} />
                          <span style={{ fontSize: '0.85rem' }}>{method}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {Object.entries(contactMethods).some(([_, active]) => active) && (
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                       {Object.keys(contactMethods).filter(m => contactMethods[m]).map(method => (
                          <input 
                            key={method}
                            type="text" 
                            className="req-input" 
                            style={{ fontSize: '0.85rem' }}
                            placeholder={`${method} Address/Handle`}
                            value={contactDetails[method] || ''}
                            onChange={(e) => handleContactDetailChange(method, e.target.value)}
                            required
                          />
                       ))}
                    </div>
                  )}
                </div>

                <div className="req-form-group">
                  <label className="req-label">4. MISSION BRIEF</label>
                  <textarea 
                    className="req-textarea" 
                    rows="3" 
                    placeholder="Define operational objectives and creative scope..."
                    value={briefDescription}
                    onChange={(e) => setBriefDescription(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="req-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'INITIATE REQUEST'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
