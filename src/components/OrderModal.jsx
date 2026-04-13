import { useState } from 'react'

const WEBHOOK = 'https://discord.com/api/webhooks/1492038802544267395/XHgcF2P_gMzDELXeuL2mw6LfKrNsj2HyhLagC5jHqgmc1MHX15mK3NaMmIAGgc_8JVVv'

const CONTACT_OPTIONS = ['Email', 'Phone', 'Signal', 'Discord', 'Other']
const TOTAL_STEPS = 5

export default function OrderModal({ card, onClose }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  // Step 1: selected services
  const allServices = card.sections.flatMap(s => s.items)
  const [selectedServices, setSelectedServices] = useState([])

  // Step 2: project details per service
  const [projectDetails, setProjectDetails] = useState({})

  // Step 3: client type + name
  const [clientType, setClientType] = useState('')
  const [clientName, setClientName] = useState('')

  // Step 4: contact info
  const [selectedContacts, setSelectedContacts] = useState([])
  const [contactValues, setContactValues] = useState({})

  // Step 5: brief description
  const [briefDesc, setBriefDesc] = useState('')

  // Helpers
  const toggleService = (item) => {
    setSelectedServices(prev =>
      prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item]
    )
  }

  const toggleContact = (c) => {
    setSelectedContacts(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )
  }

  const canNext = () => {
    if (step === 1) return selectedServices.length > 0
    if (step === 2) return selectedServices.every(s => (projectDetails[s] || '').trim().length > 0)
    if (step === 3) return clientType !== '' && clientName.trim().length > 0
    if (step === 4) return selectedContacts.length > 0 && selectedContacts.every(c => (contactValues[c] || '').trim().length > 0)
    if (step === 5) return briefDesc.trim().length > 10
    return false
  }

  const handleSubmit = async () => {
    setSending(true)
    setError('')
    try {
      const serviceLines = selectedServices.map(s =>
        `**${s}**\n> ${projectDetails[s] || 'No details'}`
      ).join('\n\n')

      const contactLines = selectedContacts.map(c =>
        `**${c}:** ${contactValues[c] || ''}`
      ).join('\n')

      const embed = {
        title: '🎯 NEW SERVICE REQUEST — SATCORP',
        color: 0x00ff41,
        fields: [
          { name: '📋 Services Requested', value: serviceLines || 'N/A', inline: false },
          { name: '👤 Client Type', value: clientType, inline: true },
          { name: '🚪 Name', value: clientName, inline: true },
          { name: '📞 Contact Info', value: contactLines || 'N/A', inline: false },
          { name: '📜 Project Brief', value: briefDesc || 'N/A', inline: false },
        ],
        footer: { text: 'SATCORP Service Request System — satcorp.io' },
        timestamp: new Date().toISOString(),
      }

      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      })

      if (res.ok || res.status === 204) {
        setSubmitted(true)
      } else {
        setError('Transmission failed. Please try again.')
      }
    } catch {
      setError('Network error. Check connection and retry.')
    } finally {
      setSending(false)
    }
  }

  const stepSegments = Array.from({ length: TOTAL_STEPS }, (_, i) => {
    if (i + 1 < step) return 'done'
    if (i + 1 === step) return 'active'
    return ''
  })

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Order Services"
    >
      <div className="order-panel">
        {/* Header */}
        <div className="order-head">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="order-head-label">// SERVICE REQUEST — {card.title.toUpperCase()}</div>
              <div className="order-head-title">
                {submitted ? 'Request Transmitted' : `Step ${step} of ${TOTAL_STEPS}`}
              </div>
            </div>
            <button className="modal-x" onClick={onClose} aria-label="Close">✕</button>
          </div>
          {!submitted && (
            <div className="order-step-bar" role="progressbar" aria-valuenow={step} aria-valuemax={TOTAL_STEPS}>
              {stepSegments.map((cls, i) => (
                <div key={i} className={`order-step-seg ${cls}`} />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="order-body">
          {submitted ? (
            <div className="submit-success">
              <div className="success-icon">✅</div>
              <div className="success-title">Request Transmitted</div>
              <p className="success-text">
                Your service request has been received by SATCORP Command. Expect contact through your provided channels within 24–48 hours.
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Select services */}
              {step === 1 && (
                <div>
                  <div className="form-label">Select Services <span className="req">*</span></div>
                  <div className="form-hint" style={{ marginBottom: '12px' }}>Choose one or more capabilities to order. You can select multiple.</div>
                  <div className="checkbox-list" style={{ maxHeight: '340px', overflowY: 'auto' }}>
                    {allServices.map((item, i) => (
                      <label key={i} className="check-item">
                        <input
                          type="checkbox"
                          id={`svc-${i}`}
                          checked={selectedServices.includes(item)}
                          onChange={() => toggleService(item)}
                        />
                        <span className="check-label">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Project details */}
              {step === 2 && (
                <div>
                  <div className="form-label">Project Details <span className="req">*</span></div>
                  <div className="form-hint" style={{ marginBottom: '14px' }}>Brief initial details for each selected service.</div>
                  {selectedServices.map((svc, i) => (
                    <div key={i} className="form-group">
                      <label className="form-label" htmlFor={`detail-${i}`}>{svc}</label>
                      <textarea
                        id={`detail-${i}`}
                        className="form-textarea"
                        placeholder={`Describe your requirements for: ${svc}`}
                        value={projectDetails[svc] || ''}
                        onChange={e => setProjectDetails(p => ({ ...p, [svc]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Client type */}
              {step === 3 && (
                <div>
                <div className="form-group">
                  <label className="form-label">2. ENTITY STATUS <span className="req">*</span></label>
                  <select
                    className="req-select"
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Status...</option>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                  {clientType && (
                    <div className="form-group">
                      <label className="form-label" htmlFor="client-name">
                        {clientType === 'Business' ? 'Business Name' : 'Your Name'} <span className="req">*</span>
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        className="form-input"
                        placeholder={clientType === 'Business' ? 'Company or brand name' : 'Your full name'}
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Contact info */}
              {step === 4 && (
                <div>
                  <div className="form-group">
                    <div className="form-label">Contact Method <span className="req">*</span></div>
                    <div className="form-hint" style={{ marginBottom: '10px' }}>Select one or more. You will be prompted to fill in each.</div>
                    <div className="checkbox-list" style={{ marginBottom: '16px' }}>
                      {CONTACT_OPTIONS.map(c => (
                        <label key={c} className="check-item">
                          <input
                            type="checkbox"
                            id={`contact-${c}`}
                            checked={selectedContacts.includes(c)}
                            onChange={() => toggleContact(c)}
                          />
                          <span className="check-label">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {selectedContacts.map(c => (
                    <div key={c} className="form-group">
                      <label className="form-label" htmlFor={`contact-val-${c}`}>{c} <span className="req">*</span></label>
                      <input
                        id={`contact-val-${c}`}
                        type={c === 'Email' ? 'email' : 'text'}
                        className="form-input"
                        placeholder={
                          c === 'Email' ? 'your@email.com' :
                          c === 'Phone' ? '+1 (555) 000-0000' :
                          c === 'Signal' ? 'Signal username or number' :
                          c === 'Discord' ? 'username#0000 or username' :
                          'Contact handle or info'
                        }
                        value={contactValues[c] || ''}
                        onChange={e => setContactValues(p => ({ ...p, [c]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 5: Brief description */}
              {step === 5 && (
                <div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="brief-desc">
                      Project Brief <span className="req">*</span>
                    </label>
                    <div className="form-hint" style={{ marginBottom: '8px' }}>Give us a solid overview of your project, goals, and any relevant details.</div>
                    <textarea
                      id="brief-desc"
                      className="form-textarea"
                      style={{ minHeight: '120px' }}
                      placeholder="Describe your overall project, goals, timelines, budget range, or anything else we should know..."
                      value={briefDesc}
                      onChange={e => setBriefDesc(e.target.value)}
                    />
                  </div>
                  {error && (
                    <div style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', marginTop: '8px' }}>
                      ⚠️ {error}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div className="order-foot">
            <div style={{ display: 'flex', gap: '10px' }}>
              {step > 1 && (
                <button className="btn-secondary" onClick={() => setStep(s => s - 1)} disabled={sending}>
                  ← Back
                </button>
              )}
              <button className="btn-secondary" onClick={onClose} disabled={sending}>
                Cancel
              </button>
            </div>
            <button
              id="order-next-btn"
              className="btn-primary"
              onClick={step === TOTAL_STEPS ? handleSubmit : () => setStep(s => s + 1)}
              disabled={!canNext() || sending}
              style={{ opacity: (!canNext() || sending) ? 0.45 : 1 }}
            >
              {sending ? 'Transmitting...' : step === TOTAL_STEPS ? 'Submit Request' : 'Next →'}
            </button>
          </div>
        )}

        {submitted && (
          <div className="order-foot" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}
