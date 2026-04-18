import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// ─── Constants ────────────────────────────────────────────────────────────────

const MODULE_REGISTRY = [
  { key: '450kpar',         route: '/portal/modules/450kpar',         icon: '⚡', title: '450kW PARALLEL',   desc: 'Dual 450kW genset parallel operation reference' },
  { key: 'dualcore-900',    route: '/portal/modules/dualcore-900',    icon: '⚙', title: 'DUALCORE 900',      desc: 'Integrated dual-engine generator design doc' },
  { key: 'dualcore-900-v2', route: '/portal/modules/dualcore-900-v2', icon: '⚙', title: 'DUALCORE 900 V2',   desc: 'Updated dual-engine generator design doc' },
  { key: 'gendashv2',       route: '/portal/modules/gendashv2',       icon: '◉', title: 'GEN DASH V2',       desc: '450kW diesel genset engineering dashboard' },
  { key: 'xoi-audit',       route: '/portal/modules/xoi-audit',       icon: '◈', title: 'XOI AUDIT',         desc: 'XOi feature audit & decision board' },
  { key: 'xoi-client',      route: '/portal/modules/xoi-client',      icon: '◆', title: 'XOI CLIENT',        desc: 'Field service discovery matrix form' },
]

// The SATCORP 8-week delivery roadmap (from master model)
const JOURNEY_MILESTONES = [
  { week: 'Day 1–3',  phase: 'Clarity Lock',    experience: 'Receive Your Project Map',       icon: '◎' },
  { week: 'Day 3–7',  phase: 'System Design',   experience: 'Review Your System Blueprint',   icon: '◈' },
  { week: 'Week 1–3', phase: 'Core Build',       experience: 'See Your First Live Preview',    icon: '◉' },
  { week: 'Week 3–5', phase: 'Connectivity',     experience: 'Manual Processes Replaced',      icon: '⚙' },
  { week: 'Week 5–6', phase: 'Live Deployment',  experience: 'Your Go-Live Moment',            icon: '🚀' },
  { week: 'Week 6–8', phase: 'Optimization',     experience: 'Friction Points Disappear',      icon: '◆' },
  { week: 'Ongoing',  phase: 'Polish & Scale',   experience: 'Your Premium System Evolves',    icon: '✦' },
]

const SUPPORT_CARDS = [
  {
    icon: '◎',
    title: 'CLARITY CHECK',
    desc: "Have a question about your project direction or requirements? We'll clarify—no jargon.",
    action: 'REQUEST CLARITY',
  },
  {
    icon: '📋',
    title: 'PROJECT STATUS',
    desc: 'Request a full status update on your current build phase and what comes next.',
    action: 'REQUEST UPDATE',
  },
  {
    icon: '◆',
    title: 'DIRECT LINE',
    desc: 'Connect directly with your SATCORP concierge for priority support on anything.',
    action: 'OPEN CHANNEL',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function MilestoneNode({ milestone, index, isHovered, onEnter, onLeave }) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        textAlign: 'center', padding: '16px 8px',
        borderRadius: '10px',
        background: isHovered ? 'rgba(124,58,237,0.08)' : 'transparent',
        transition: 'all 0.22s ease', cursor: 'default',
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: `2px solid ${isHovered ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
        background: isHovered ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 14px', fontSize: '17px',
        transition: 'all 0.22s ease',
        boxShadow: isHovered ? '0 0 20px rgba(124,58,237,0.35)' : 'none',
      }}>
        {milestone.icon}
      </div>

      <div style={{
        fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.1em',
        color: isHovered ? '#7c3aed' : 'rgba(255,255,255,0.22)',
        marginBottom: '5px',
      }}>
        {milestone.week}
      </div>
      <div style={{
        fontSize: '10px', fontWeight: '700', letterSpacing: '0.06em',
        color: isHovered ? '#fff' : 'rgba(255,255,255,0.45)',
        marginBottom: '5px', lineHeight: 1.3,
      }}>
        {milestone.phase}
      </div>
      <div style={{
        fontSize: '9px', color: isHovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)',
        fontFamily: 'monospace', lineHeight: 1.5, transition: 'color 0.2s ease',
      }}>
        {milestone.experience}
      </div>
    </div>
  )
}

function ModuleCard({ mod, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="portal-module-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', borderColor: hovered ? 'rgba(124,58,237,0.45)' : undefined }}
    >
      <div className="module-card-icon">{mod.icon}</div>
      <div className="module-card-title">{mod.title}</div>
      <div className="module-card-status" style={{ color: '#7c3aed' }}>
        ACCESS YOUR MODULE →
      </div>
      <div style={{ fontSize: '10px', opacity: 0.42, marginTop: '7px', fontFamily: 'monospace', lineHeight: 1.5 }}>
        {mod.desc}
      </div>
    </div>
  )
}

function SupportCard({ card }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.22)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '10px', padding: '26px',
        transition: 'all 0.22s ease', cursor: 'default',
      }}
    >
      <div style={{ fontSize: '26px', marginBottom: '14px', lineHeight: 1 }}>{card.icon}</div>
      <div style={{
        fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em',
        color: hovered ? '#9d71f0' : '#7c3aed', marginBottom: '10px',
      }}>
        {card.title}
      </div>
      <div style={{
        fontSize: '11px', color: 'rgba(255,255,255,0.38)',
        fontFamily: 'monospace', lineHeight: 1.7, marginBottom: '20px',
      }}>
        {card.desc}
      </div>
      <div style={{
        fontSize: '10px', letterSpacing: '0.1em', fontWeight: '700',
        color: hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
        transition: 'color 0.2s ease',
      }}>
        {card.action} →
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ClientPortal() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [hoveredMilestone, setHoveredMilestone] = useState(null)

  const handleLogout = () => { logout(); navigate('/') }

  const userModules = MODULE_REGISTRY.filter(m => currentUser?.modules?.includes(m.key))
  const firstName   = currentUser?.username?.split('@')[0]

  return (
    <div className="page-wrapper portal-page">
      <Header title="SATCORP" />

      {/* Background */}
      <div className="portal-bg">
        <div className="portal-grid-overlay" />
      </div>

      <main className="portal-main" style={{ maxWidth: '1400px', padding: '0 32px' }}>

        {/* ── TOPBAR ────────────────────────────────────────────────── */}
        <div className="portal-topbar">
          <div className="portal-topbar-left">
            <span className="portal-role-badge client-badge">CLIENT</span>
            <span className="portal-username">{firstName}</span>
          </div>
          <div className="portal-topbar-right">
            <div className="portal-status-dot" />
            <span className="portal-status-text">SESSION ACTIVE</span>
            <button id="client-logout-btn" className="portal-logout-btn" onClick={handleLogout}>
              TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* ── WELCOME ───────────────────────────────────────────────── */}
        <div className="portal-welcome">
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" />
            <span className="op-eyebrow-text">SATCORP CLIENT ACCESS NODE</span>
          </div>
          <h1 className="portal-title">
            YOUR <span className="portal-title-accent">COMMAND CENTER</span>
          </h1>
          <p className="portal-subtitle">WELCOME BACK — YOUR INFRASTRUCTURE IS BEING MANAGED</p>
        </div>

        {/* ── CLIENT DASHBOARD: DOCUMENTS, APPROVALS & PREVIEWS ───────────────────────────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '36px' }}>
          
          {/* Document Hub & Approvals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="portal-section-label" style={{ marginBottom: '4px' }}>
               // YOUR DOCUMENT HUB & APPROVALS
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px', padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <div>
                   <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>Phase 1: Your Problem Statement & JSON</div>
                   <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>Verify the extracted objective truth.</div>
                 </div>
                 <button style={{ background: 'transparent', border: '1px solid #7c3aed', color: '#7c3aed', padding: '6px 12px', borderRadius: '4px', fontSize: '9px', cursor: 'pointer' }}>VIEW RECORD</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <div>
                   <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>Phase 2: Your System Blueprint</div>
                   <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#f59e0b' }}>Awaiting your approval lock.</div>
                 </div>
                 <button style={{ background: '#f59e0b', border: 'none', color: '#000', padding: '6px 12px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold', cursor: 'pointer' }}>APPROVE SCOPE</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px' }}>
                 <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>Phase 4: Your Delivery Certification</div>
                     <span style={{ fontSize: '8px', padding: '2px 5px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>LOCKED</span>
                   </div>
                   <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Requires Launch Readiness, Scalability Proof & Polish Score.</div>
                 </div>
                 <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '9px', cursor: 'not-allowed' }}>PENDING</button>
              </div>
            </div>
          </div>

          {/* Live Preview & Automation Density */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="portal-section-label" style={{ marginBottom: '4px' }}>
               // ACTIVE DEPLOYMENTS & METRICS
            </div>
            
            {/* Live Previews (Replaces userModules) */}
            <div style={{
              background: 'rgba(124, 58, 237, 0.05)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              borderRadius: '10px', padding: '20px',
            }}>
               <h3 style={{ fontSize: '14px', color: '#7c3aed', fontWeight: 'bold', marginBottom: '12px' }}>LIVE PREVIEWS</h3>
               {userModules.length > 0 ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   {userModules.map(mod => (
                     <div key={mod.key} onClick={() => navigate(mod.route)} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', cursor: 'pointer' }}>
                        <span style={{ fontSize: '12px', color: '#fff' }}>{mod.icon} {mod.title}</span>
                        <span style={{ fontSize: '10px', color: '#7c3aed' }}>ACCESS →</span>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>Your infrastructure is currently in development. Modules will appear here when they pass Core Build Gate.</p>
               )}
            </div>

            {/* Automation Density */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: '8px' }}>AUTOMATION DENSITY</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>0%</div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Target: 80% replacement</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: '8px' }}>RECLAIMED HOURS / MO</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>0.0</div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>Calculating ROI pipeline...</div>
                </div>
            </div>
          </div>
        </section>

        {/* ── YOUR PROJECT JOURNEY ──────────────────────────────────── */}
        <section style={{ marginBottom: '44px' }}>
          <div className="portal-section-label" style={{ marginBottom: '14px' }}>
            // YOUR PROJECT JOURNEY — SATCORP 8-WEEK DELIVERY ROADMAP
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '32px 28px 24px',
          }}>
            <div style={{ position: 'relative' }}>
              {/* Connecting line */}
              <div style={{
                position: 'absolute', top: '22px', left: '32px', right: '32px', height: '1px',
                background: 'linear-gradient(90deg, rgba(124,58,237,0.25) 0%, rgba(183,136,70,0.25) 100%)',
                zIndex: 0,
              }} />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '6px',
                position: 'relative', zIndex: 1,
              }}>
                {JOURNEY_MILESTONES.map((milestone, i) => (
                  <MilestoneNode
                    key={i}
                    milestone={milestone}
                    index={i}
                    isHovered={hoveredMilestone === i}
                    onEnter={() => setHoveredMilestone(i)}
                    onLeave={() => setHoveredMilestone(null)}
                  />
                ))}
              </div>
            </div>

            {/* Footer quote */}
            <div style={{
              marginTop: '24px', paddingTop: '18px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              fontSize: '10px', fontFamily: 'monospace',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.06em', textAlign: 'center',
            }}>
              SATCORP DELIVERY STANDARD — "WE DON'T JUST SHIP CODE; WE SHIP BUSINESS MATURITY."
            </div>
          </div>
        </section>

        {/* ── YOUR CONCIERGE SUPPORT ────────────────────────────────── */}
        <section style={{ marginBottom: '60px' }}>
          <div className="portal-section-label" style={{ marginBottom: '14px' }}>
            // YOUR CONCIERGE SUPPORT
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {SUPPORT_CARDS.map((card, i) => (
              <SupportCard key={i} card={card} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
