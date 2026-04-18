import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { MOCK_PROJECTS, SYSTEM_GATES, PRIORITY_STACK } from '../../data/projectData'

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASES = [
  { id: 1, name: 'CLARITY',   sub: 'Diagnostic Engine',    color: '#06b6d4', icon: '◎', desc: 'Truth extraction & problem definition' },
  { id: 2, name: 'SCOPE',     sub: 'Architectural Engine', color: '#3b82f6', icon: '◈', desc: 'System blueprint & tech stack lock' },
  { id: 3, name: 'EXECUTION', sub: 'Build Generation',     color: '#f59e0b', icon: '◉', desc: 'Core build → deploy → iterate' },
  { id: 4, name: 'POLISH',    sub: 'Prestige Generation',  color: '#b78846', icon: '◆', desc: 'Refinement → scale → prestige layer' },
]

const PHASE_TOOLS = {
  1: [
    { icon: '◎', title: 'INTAKE FORM',           desc: '8-point client intake: Intel, Entity, Problem, Root Cause, Impact, Stack, Opportunity, Urgency' },
    { icon: '⚡', title: 'PROBLEM SYNTHESIZER',   desc: 'Generate standardized Problem Statements using the Universal Formula' },
    { icon: '◈', title: 'PRIORITY STACK',         desc: 'Rank identified opportunities P0 (Survival) → P4 (Prestige)' },
    { icon: '◉', title: 'OPPORTUNITY MAP',        desc: 'Translate Bleed Zones into Revenue, Efficiency, Visibility & Replacement zones' },
  ],
  2: [
    { icon: '🏗', title: 'SYSTEM BLUEPRINT',      desc: '9-dimensional architecture: Overview, Roles, Workflows, Features, Data, Integrations, Automations, Constraints, Metrics' },
    { icon: '⚙', title: 'TECH STACK ENGINE',      desc: 'Tier 1 Lightweight / Tier 2 Operational / Tier 3 Enterprise decision matrix' },
    { icon: '💰', title: 'COST / ROI PROJECTION', desc: '4-bucket model: Build, Infrastructure, Maintenance, Hidden Opportunity' },
    { icon: '✓',  title: 'BLUEPRINT GATE',        desc: 'Anti-vagueness test, ROI filter, Workflow Integrity, Measurability check' },
  ],
  3: [
    { icon: '◎', title: 'TASK ARCHITECTURE',      desc: 'Deconstruct blueprint into Epic → Feature → Task → Subtask (30-second rule)' },
    { icon: '🔒', title: 'EXECUTION GATES',        desc: '8-gate validation pipeline: Readiness → Core → Connect → QA → Deploy → Live → Stabilize → Handoff' },
    { icon: '📊', title: 'IPM REPORTS',            desc: 'Initial Performance Metrics: Adoption, Workflow Efficiency, System Health, ROI, Friction Signals' },
    { icon: '🚀', title: 'DEPLOY PIPELINE',        desc: 'Rollback-ready deployment with production environment & security lock' },
  ],
  4: [
    { icon: '◆', title: 'POLISH SCORER',           desc: 'Weighted 100-point system: Brand Translation, Experience Consistency, Friction, Prestige Finish' },
    { icon: '🏛', title: 'INFRA AUDIT',             desc: '10 Gates: Stability, Scalability, Automation, Data Integrity, Observability, Readiness, Performance, Failsafe, Deploy, Qualification' },
    { icon: '✨', title: 'PERCEPTION ENGINE',       desc: '10-Second Trust Test, Ownership Language, grid discipline, micro-animation sweep' },
    { icon: '📜', title: 'DELIVERY CERTIFICATION', desc: 'Formal Scope Verification, Scalability Proof, Performance & Integrity sign-off, Value Result' },
  ],
}

const MODULE_REGISTRY = [
  { key: '450kpar',            route: '/portal/modules/450kpar',            icon: '⚡', title: '450kW PARALLEL',   desc: 'Dual 450kW genset parallel operation reference' },
  { key: 'dualcore-900',       route: '/portal/modules/dualcore-900',       icon: '⚙', title: 'DUALCORE 900',      desc: 'Integrated dual-engine generator design doc' },
  { key: 'dualcore-900-v2',    route: '/portal/modules/dualcore-900-v2',    icon: '⚙', title: 'DUALCORE 900 V2',   desc: 'Updated dual-engine generator design doc' },
  { key: 'gendashv2',          route: '/portal/modules/gendashv2',          icon: '◉', title: 'GEN DASH V2',       desc: '450kW diesel genset engineering dashboard' },
  { key: 'xoi-audit',          route: '/portal/modules/xoi-audit',          icon: '◈', title: 'XOI AUDIT',         desc: 'XOi feature audit & decision board' },
  { key: 'xoi-client',         route: '/portal/modules/xoi-client',         icon: '◆', title: 'XOI CLIENT',        desc: 'Field service discovery matrix form' },
  { key: 'aire-serv-proposal', route: '/portal/modules/aire-serv-proposal', icon: '❄', title: 'AIRE SERV',         desc: 'Sector Aire Serv platform proposal & vector analysis' },
]

const PHASE_COLORS  = { 1: '#06b6d4', 2: '#3b82f6', 3: '#f59e0b', 4: '#b78846' }
const PRIORITY_COLORS = { P0: '#ef4444', P1: '#f59e0b', P2: '#3b82f6', P3: '#8b5cf6', P4: '#06b6d4' }
const STATUS_COLORS   = { INTAKE: '#06b6d4', REVIEW: '#3b82f6', ACTIVE: '#f59e0b', POLISH: '#b78846', COMPLETE: '#22c55e' }

// ─── Sub-components ───────────────────────────────────────────────────────────

function PhaseCard({ phase, isActive, count, onClick }) {
  const [hovered, setHovered] = useState(false)
  const lit = isActive || hovered
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: lit ? `linear-gradient(135deg,${phase.color}1a 0%,${phase.color}08 100%)` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${lit ? phase.color : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '10px', padding: '22px 18px',
        cursor: 'pointer', transition: 'all 0.22s ease',
        boxShadow: isActive ? `0 0 24px ${phase.color}22` : 'none',
      }}
    >
      {isActive && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,transparent,${phase.color},transparent)` }} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <span style={{ fontSize: '22px', lineHeight: 1 }}>{phase.icon}</span>
        <span style={{
          fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.1em', fontWeight: '700',
          color: phase.color, background: `${phase.color}18`,
          padding: '3px 9px', borderRadius: '4px', border: `1px solid ${phase.color}44`,
        }}>
          {count} {count === 1 ? 'PROJECT' : 'PROJECTS'}
        </span>
      </div>

      <div style={{ fontWeight: '800', fontSize: '12px', letterSpacing: '0.14em', color: lit ? phase.color : 'rgba(255,255,255,0.7)', marginBottom: '3px' }}>
        PHASE {phase.id}: {phase.name}
      </div>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', marginBottom: '12px' }}>{phase.sub}</div>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.6 }}>{phase.desc}</div>
    </div>
  )
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const phaseColor    = PHASE_COLORS[project.phase]
  const priorityColor = PRIORITY_COLORS[project.priority]
  const statusColor   = STATUS_COLORS[project.status]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '10px', padding: '20px',
        transition: 'all 0.22s ease', cursor: 'default',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      {/* Phase + Priority row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{
          fontSize: '9px', fontWeight: '700', letterSpacing: '0.1em',
          color: phaseColor, background: `${phaseColor}18`,
          padding: '3px 8px', borderRadius: '4px', border: `1px solid ${phaseColor}44`, fontFamily: 'monospace',
        }}>
          P{project.phase}: {project.phaseLabel}
        </span>
        <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', color: priorityColor, fontFamily: 'monospace' }}>
          {project.priority}
        </span>
      </div>

      <div style={{ fontWeight: '700', fontSize: '13px', letterSpacing: '0.06em', color: '#fff', marginBottom: '2px' }}>
        {project.clientName}
      </div>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', marginBottom: '14px' }}>
        {project.company} · {project.industry}
      </div>

      {/* Phase 1 Intake Rule: Universal Formula mock */}
      {project.phase === 1 && (
        <div style={{ marginBottom: '12px', padding: '10px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '6px', border: '1px dashed rgba(6, 182, 212, 0.2)' }}>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#06b6d4', marginBottom: '6px' }}>UNIVERSAL PROBLEM STATEMENT</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
            <span style={{ color: '#fff' }}>[{project.company}]</span> is experiencing <span style={{ color: '#ef4444' }}>[client portal friction]</span> due to <span style={{ color: '#f59e0b' }}>[fragmented data]</span>, resulting in <span style={{ color: '#06b6d4' }}>[unmeasurable impact - FLAG]</span>.
          </div>
        </div>
      )}

      {/* Polish score (Phase 4 only) */}
      {project.polishScore !== null && project.sixPillars && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}>SIX-PILLAR POLISH</span>
            <span style={{
              fontSize: '13px', fontWeight: '800',
              color: project.polishScore >= 90 ? '#22c55e' : project.polishScore >= 70 ? '#f59e0b' : '#ef4444',
            }}>
              {project.polishScore}<span style={{ fontSize: '9px', opacity: 0.6 }}>/100</span>
            </span>
            {project.polishScore < 90 && (
              <span style={{ fontSize: '9px', color: '#ef4444', fontFamily: 'monospace' }}>BELOW THRESHOLD</span>
            )}
          </div>
          {/* 5-pillar visual (Base is structural) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '3px' }}>
            {['brand', 'consistency', 'friction', 'prestige', 'base'].map(k => (
              <div key={k} style={{
                height: '4px', borderRadius: '2px',
                background: project.sixPillars[k] >= 90 ? '#22c55e' : project.sixPillars[k] >= 70 ? '#f59e0b' : '#ef4444',
                opacity: 0.8
              }} title={`${k}: ${project.sixPillars[k]}`} />
            ))}
          </div>
        </div>
      )}

      {/* Execution gate progress bar */}
      {project.gate !== null && project.gate !== undefined && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '5px' }}>
            {[1,2,3,4,5,6,7,8,9,10].map(g => (
              <div key={g} style={{
                height: '3px', flex: 1, borderRadius: '2px',
                background: g < project.gate ? '#22c55e' : g === project.gate ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                boxShadow: g === project.gate ? '0 0 6px #f59e0b' : 'none',
              }} />
            ))}
          </div>
          <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.28)' }}>
            GATE {project.gate} / 10 (INFRA)
          </div>
        </div>
      )}

      {/* Next action */}
      <div style={{
        fontSize: '9px', color: 'rgba(255,255,255,0.32)', fontFamily: 'monospace', lineHeight: 1.6,
        borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginBottom: '12px',
      }}>
        → {project.nextAction}
      </div>

      {/* Status chip */}
      <span style={{
        fontSize: '8px', fontWeight: '700', letterSpacing: '0.12em',
        color: statusColor, background: `${statusColor}15`,
        padding: '3px 10px', borderRadius: '4px', border: `1px solid ${statusColor}44`,
        fontFamily: 'monospace',
      }}>
        {project.status}
      </span>
    </div>
  )
}

function ToolCard({ tool, phaseColor }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${phaseColor}08` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${phaseColor}44` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '8px', padding: '18px',
        transition: 'all 0.2s ease', cursor: 'default',
      }}
    >
      <div style={{ fontSize: '20px', marginBottom: '10px', lineHeight: 1 }}>{tool.icon}</div>
      <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', color: hovered ? phaseColor : 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
        {tool.title}
      </div>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.32)', fontFamily: 'monospace', lineHeight: 1.6 }}>
        {tool.desc}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AdminPortal() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const { userId } = useParams()
  const [activePhase, setActivePhase] = useState(3)

  const handleLogout = () => { logout(); navigate('/') }

  const userModules   = MODULE_REGISTRY.filter(m => currentUser?.modules?.includes(m.key))
  const selectedPhase = PHASES.find(p => p.id === activePhase)
  const selectedTools = PHASE_TOOLS[activePhase] || []

  const phaseCounts = PHASES.map(p => ({
    phase: p.id,
    count: MOCK_PROJECTS.filter(pr => pr.phase === p.id).length,
  }))

  const isAnu = userId?.toLowerCase() === 'anu'

  return (
    <div className="page-wrapper portal-page">
      <Header title="SATCORP" />

      {/* Background */}
      <div className="portal-bg">
        {isAnu && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/assets/anu_ultrarealistic_1775186455303.png)',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25,
          }} />
        )}
        <div className="portal-grid-overlay" />
      </div>

      <main className="portal-main" style={{ maxWidth: '1400px', padding: '0 32px' }}>

        {/* ── TOPBAR ────────────────────────────────────────────────── */}
        <div className="portal-topbar">
          <div className="portal-topbar-left">
            <span className="portal-role-badge admin-badge">ADMIN</span>
            <span className="portal-username">{currentUser?.username?.split('@')[0]}</span>
          </div>
          <div className="portal-topbar-right">
            <div className="portal-status-dot" />
            <span className="portal-status-text">SESSION ACTIVE</span>
            <button id="admin-logout-btn" className="portal-logout-btn" onClick={handleLogout}>
              TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* ── WELCOME ───────────────────────────────────────────────── */}
        <div className="portal-welcome">
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" />
            <span className="op-eyebrow-text">SATCORP COMMAND NODE</span>
          </div>
          <h1 className="portal-title">
            ADMIN <span className="portal-title-accent">COMMAND CENTER</span>
          </h1>
          <p className="portal-subtitle">CLEARANCE LEVEL: ALPHA — UNRESTRICTED ACCESS</p>
        </div>

        {/* ── PHASE PIPELINE ────────────────────────────────────────── */}
        <section style={{ marginBottom: '36px' }}>
          <div className="portal-section-label" style={{ marginBottom: '14px' }}>
            // PHASE PIPELINE — CLARITY → SCOPE → EXECUTION → POLISH
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {PHASES.map(phase => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                isActive={activePhase === phase.id}
                count={phaseCounts.find(p => p.phase === phase.id)?.count || 0}
                onClick={() => setActivePhase(phase.id)}
              />
            ))}
          </div>
        </section>

        {/* ── CLIENT PIPELINE BOARD (ACTIVE PROJECTS) ───────────────── */}
        <section style={{ marginBottom: '36px' }}>
          <div className="portal-section-label" style={{ marginBottom: '14px' }}>
            // CLIENT PIPELINE BOARD — {MOCK_PROJECTS.length} ACTIVE PROJECTS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {MOCK_PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── SYSTEM ENGINES ────────────────────────────────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '36px' }}>
          {/* Layer 1: Diagnostic */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.05)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            borderRadius: '10px', padding: '24px', position: 'relative'
          }}>
            <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '24px', opacity: 0.8 }}>⚡</span>
            <div className="portal-section-label" style={{ marginBottom: '12px', color: '#06b6d4' }}>
              // LAYER 1: DIAGNOSTIC
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>INTAKE ENGINE</h3>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', marginBottom: '14px', lineHeight: 1.5 }}>
              Process client intel into structured JSON Objects & Universal Problem Statements.
            </p>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#06b6d4', marginBottom: '8px' }}>MANDATORY INTAKE VALIDATION</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'Is the SATCORP Intake Form complete?', check: 'complete' },
                  { label: 'Is the core problem defined vs symptom?', check: 'defined' },
                  { label: 'Is the impact quantifiable/measurable?', check: 'measurable' },
                  { label: 'Has client agreed to truth extraction?', check: 'agreed' }
                ].map((item, idx) => {
                  const isValid = MOCK_PROJECTS[3].intakeValidation[item.check]; // Using Kira Command (INTAKE mode)
                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <div style={{ width: '12px', height: '12px', border: `1px solid ${isValid ? '#06b6d4' : 'rgba(255,255,255,0.2)'}`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {isValid && <span style={{ color: '#06b6d4', fontSize: '10px' }}>✓</span>}
                       </div>
                       <span style={{ fontSize: '10px', color: isValid ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', textDecoration: isValid ? 'none' : 'line-through' }}>{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <button style={{
              background: '#06b6d4', color: '#000', border: 'none', padding: '10px 16px',
              borderRadius: '6px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', cursor: 'pointer'
            }}>RUN INTAKE SEQUENCE →</button>
          </div>

          {/* Layer 2: Architectural */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '10px', padding: '24px', position: 'relative'
          }}>
            <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '24px', opacity: 0.8 }}>🏗</span>
            <div className="portal-section-label" style={{ marginBottom: '12px', color: '#3b82f6' }}>
              // LAYER 2: ARCHITECTURAL
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>BLUEPRINT GENERATOR</h3>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', marginBottom: '18px', lineHeight: 1.5 }}>
              Consume Phase 1 JSON to architect the 9-dimensional system, tech stack, and ROI validation.
            </p>
            <button style={{
              background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 16px',
              borderRadius: '6px', fontSize: '10px', fontWeight: '800', letterSpacing: '0.1em', cursor: 'pointer'
            }}>GENERATE BLUEPRINT →</button>
          </div>
        </section>

        {/* ── SCORING TARGETS & POST-LAUNCH LIFECYCLE ───────────────── */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginBottom: '36px' }}>
          <div>
            <div className="portal-section-label" style={{ marginBottom: '14px' }}>
               // SCORING DASHBOARDS & GATES
            </div>
            {/* System Integrity Map (previously below) */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px', padding: '20px',
            }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#fff', marginBottom: '12px' }}>
                XOI VISION: EXECUTION GATES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px', marginBottom: '16px' }}>
                {SYSTEM_GATES.map(gate => {
                  const isPASS = gate.status === 'PASS'; const isACTIVE = gate.status === 'ACTIVE';
                  const barColor = isPASS ? '#22c55e' : isACTIVE ? '#f59e0b' : 'rgba(255,255,255,0.07)';
                  return (
                    <div key={gate.gate} style={{ height: '4px', background: barColor, borderRadius: '2px' }} title={`Gate ${gate.gate}: ${gate.label}`} />
                  )
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px' }}>
                   <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>POLISH SCORE AVG</div>
                   <div style={{ fontSize: '20px', color: '#b78846', fontWeight: 'bold' }}>94.2 <span style={{fontSize: '12px'}}>/100</span></div>
                 </div>
                 <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '6px' }}>
                   <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>INFRA GATES CLEARED</div>
                   <div style={{ fontSize: '20px', color: '#22c55e', fontWeight: 'bold' }}>10 <span style={{fontSize: '12px'}}>/10</span></div>
                 </div>
              </div>
            </div>
          </div>

          <div>
             <div className="portal-section-label" style={{ marginBottom: '14px' }}>
              // LIFECYCLE & RETAINER TRACKER
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px', padding: '20px',
            }}>
              {['Anunnaki Core (Expansion - Tier 3)', 'Frostheim Auth (Delivery - Tier 1)', 'Dysun CRM (Onboarding)'].map((client, i) => (
                <div key={i} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#fff' }}>{client.split(' (')[0]}</div>
                  <div style={{ 
                    fontSize: '9px', fontFamily: 'monospace', padding: '3px 8px', borderRadius: '4px',
                    background: client.includes('Expansion') ? 'rgba(183, 136, 70, 0.1)' : 'rgba(255,255,255,0.05)',
                    color: client.includes('Expansion') ? '#b78846' : 'rgba(255,255,255,0.4)'
                  }}>{client.split('(')[1].replace(')', '')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRIORITY STACK OVERVIEW ───────────────────────────────── */}
        <section style={{ marginBottom: '56px' }}>
          <div className="portal-section-label" style={{ marginBottom: '14px' }}>
            // PRIORITY STACK — AGGREGATE PIPELINE VIEW
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {PRIORITY_STACK.map(tier => (
              <div key={tier.tier} style={{
                background: tier.count > 0 ? `${tier.color}0a` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${tier.count > 0 ? `${tier.color}33` : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '10px', padding: '20px', textAlign: 'center',
                transition: 'all 0.2s ease',
              }}>
                <div style={{
                  fontSize: '32px', fontWeight: '900', letterSpacing: '0.02em', lineHeight: 1,
                  color: tier.count > 0 ? tier.color : 'rgba(255,255,255,0.12)',
                  marginBottom: '6px',
                }}>
                  {tier.count}
                </div>
                <div style={{
                  fontSize: '12px', fontWeight: '800', letterSpacing: '0.12em',
                  color: tier.count > 0 ? tier.color : 'rgba(255,255,255,0.18)',
                  marginBottom: '4px',
                }}>
                  {tier.tier}
                </div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                  {tier.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
