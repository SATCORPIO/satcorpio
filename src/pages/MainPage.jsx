import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SkillCard from '../components/SkillCard'
import RequisitionHub from '../components/RequisitionHub'
import JsonLd from '../components/JsonLd'
import { SKILL_CARDS } from '../data/skillCards'
import { PAGES } from '../data/pages'
import MagneticWrapper from '../components/MagneticWrapper'

/* ── CFCM DATA ─────────────────────────────────────────────── */

const IDENTITY_ARE = [
  {
    bold: 'A Systems Concierge Company',
    rest: ' — High-touch, end-to-end service architecture.',
  },
  {
    bold: 'A Problem-Solving Firm',
    rest: ' — We design the solution before we build.',
  },
  {
    bold: 'A Business Optimization Engine',
    rest: ' — Focused on efficiency, ROI, and measurable growth.',
  },
]

const IDENTITY_NOT = [
  'A freelancer',
  'A dev shop',
  'A SaaS reseller',
]

const ROADMAP = [
  { time: 'Day 1–3',    phase: '1. Clarity Lock',      client: 'Receive "Project Map" summary.',         internal: 'Goal alignment & P0/P1 priority ranking.' },
  { time: 'Day 3–7',    phase: '2. System Design',     client: 'Review "System Blueprint."',              internal: 'Architecture & phase sequencing.' },
  { time: 'Week 1–3',   phase: '3. Core Build',        client: 'First live preview / demo.',              internal: 'MVP engine development.' },
  { time: 'Week 3–5',   phase: '4. Connectivity',      client: 'Manual processes are replaced.',          internal: 'API & automation integration.' },
  { time: 'Week 5–6',   phase: '5. Live Deployment',   client: 'The Go-Live Moment.',                    internal: 'Production setup & security lock.' },
  { time: 'Week 6–8',   phase: '6. Optimization',      client: 'Friction points disappear.',              internal: 'Real-world behavior monitoring.' },
  { time: 'Ongoing',    phase: '7. Polish & Scale',    client: 'A "Premium" system evolves.',            internal: 'UI/UX & infrastructure scaling.' },
]

const PHASES = [
  {
    number: '01',
    name: 'Clarity',
    sub: 'Discovery → Truth Extraction',
    desc: 'No building begins without absolute clarity. We translate vague ideas into ranked, monetizable business leverage maps using structured intake, problem synthesis, and a scored Priority Stack.',
    directive: '"No Clarity → No Build"',
    color: '#00ff41',
  },
  {
    number: '02',
    name: 'Scope',
    sub: 'System Design → Solution Architecture',
    desc: 'Clarity defines the seed; Scope defines the tree. We auto-generate a 7-point System Blueprint, tech stack selection, and phased delivery plan — all locked to the Clarity output.',
    directive: '"Scope Controls Everything"',
    color: '#00cc33',
  },
  {
    number: '03',
    name: 'Execution',
    sub: 'Build → Deploy → Iterate',
    desc: 'The Onyx & Gold Standard. We move from blueprints to working systems through 8 execution gates — Core Build, Connectivity, QA, Deployment, Live Validation, Stabilization, and Handoff.',
    directive: '"Execution is Phased, Not Chaotic"',
    color: '#e8b422',
  },
  {
    number: '04',
    name: 'Polish',
    sub: 'Refinement → Scale → Prestige',
    desc: 'The Concierge Feel layer. We transform a functional tool into a prestige asset — invisible complexity, visible simplicity. Systems must score ≥90/100 to earn the SATCORP Signature.',
    directive: '"Polish = Premium Positioning"',
    color: '#c9960c',
  },
]

const HERO_STATS = [
  {
    icon: '◈',
    value: 'Systems Concierge',
    label: 'High-touch, end-to-end delivery from intake to infrastructure.',
  },
  {
    icon: '◈',
    value: '8-Week Pipeline',
    label: 'Structured lifecycle: Day 1 Clarity Lock → Week 8 Optimization.',
  },
  {
    icon: '◈',
    value: 'Phased Execution',
    label: 'No chaos. No feature creep. Every layer is gated and validated.',
  },
  {
    icon: '◈',
    value: 'SATCORP Signature',
    label: 'Systems scoring ≥90 on the Polish Evaluation earn elite certification.',
  },
]

/* ─────────────────────────────────────────────────────────── */

export default function MainPage() {
  const [activeCard, setActiveCard] = useState(null)
  const mainPageData = PAGES.find(p => p.id === 'main')

  return (
    <div className="page-wrapper main-page">
      <Helmet>
        <title>SATCORP — Client-First Concierge Model</title>
        <meta name="description" content="SATCORP is a Systems Concierge Company delivering structured, phased business infrastructure — Clarity → Scope → Execution → Polish. We don't just ship code; we ship business maturity." />
        <meta property="og:title" content="SATCORP — Client-First Concierge Model" />
        <meta property="og:description" content="High-touch, end-to-end systems delivery. Structured 8-week lifecycle from Clarity Lock to full infrastructure deployment." />
        <meta property="og:url" content="https://satcorp.io/" />
        <meta property="og:image" content="https://satcorp.io/og/satcorp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://satcorp.io/og/satcorp.png" />
      </Helmet>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SATCORP",
        "url": "https://satcorp.io",
        "logo": "https://satcorp.io/og/satcorp.png",
        "description": "Systems Concierge Company — high-touch, end-to-end business infrastructure delivery using the Client-First Concierge Model.",
        "sameAs": []
      }} />

      {/* Background */}
      <div className="main-bg-container">
        <div
          className="main-bg-img"
          style={{ backgroundImage: `url(${mainPageData?.image})` }}
        />
        <div className="main-bg-overlay" />
        <div className="tactical-grid" />
      </div>

      <Header title="SATCORP" />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="cfcm-hero">
        <div className="cfcm-hero-inner">
          <div className="cfcm-hero-left">
            <div className="cfcm-hero-eyebrow">
              <div className="cfcm-hero-eyebrow-line" />
              <span className="cfcm-hero-eyebrow-text">SATCORP OPERATION BRANCH</span>
            </div>

            <h1 className="cfcm-hero-title">
              Client-First
              <span className="cfcm-hero-title-accent">Concierge Model</span>
            </h1>

            <p className="cfcm-hero-pipeline">
              Clarity <span>→</span> Scope <span>→</span> Execution <span>→</span> Polish
            </p>

            <p className="cfcm-hero-tagline">
              We don't just ship code —{' '}
              <em>we ship business maturity.</em>
              {' '}After kickoff, your system moves through a structured build process where we design, develop, deploy, and continuously refine until it is fully operational in your business.
            </p>

            <div className="cfcm-hero-actions">
              <MagneticWrapper strength={0.2}>
                <button
                  id="hero-start-btn"
                  className="btn-primary"
                  onClick={() => {
                    document.getElementById('capability-stack')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  START YOUR PROJECT
                </button>
              </MagneticWrapper>
              <MagneticWrapper strength={0.2}>
                <a
                  id="hero-discord-btn"
                  href="https://discord.gg/KqphHMq6vS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)',
                    animation: 'blinkDot 1.6s ease-in-out infinite',
                  }} />
                  COMMUNICATION HUB
                </a>
              </MagneticWrapper>
            </div>
          </div>

          <div className="cfcm-hero-right">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="cfcm-stat-card">
                <div className="cfcm-stat-icon">{s.icon}</div>
                <div className="cfcm-stat-content">
                  <div className="cfcm-stat-value">{s.value}</div>
                  <div className="cfcm-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM IDENTITY ───────────────────────────────────── */}
      <section className="identity-section">
        <div className="section-heading-block">
          <div className="section-header-row">
            <span className="section-label-text">// SYSTEM IDENTITY</span>
            <div className="section-rule" />
          </div>
          <p className="section-tagline">What SATCORP is — and what it is not.</p>
        </div>

        <div className="identity-split">
          <div className="identity-col are">
            <div className="identity-col-header">
              <span className="identity-col-badge">WHAT WE ARE</span>
            </div>
            <ul className="identity-list">
              {IDENTITY_ARE.map((item, i) => (
                <li key={i} className="identity-list-item">
                  <strong>{item.bold}</strong>{item.rest}
                </li>
              ))}
            </ul>
          </div>

          <div className="identity-col not">
            <div className="identity-col-header">
              <span className="identity-col-badge">WHAT WE ARE NOT</span>
            </div>
            <ul className="identity-list">
              {IDENTITY_NOT.map((item, i) => (
                <li key={i} className="identity-list-item">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="delivery-promise">
          <div className="delivery-promise-line" />
          <p className="delivery-promise-text">
            The Delivery Promise: After kickoff, your system moves through a structured build process where we{' '}
            <strong>design, develop, deploy, and continuously refine</strong>{' '}
            it until it is fully operational in your business.
          </p>
        </div>
      </section>

      {/* ── THE 4 PHASES ──────────────────────────────────────── */}
      <section className="phases-section">
        <div className="section-heading-block">
          <div className="section-header-row">
            <span className="section-label-text">// THE 4 PHASES</span>
            <div className="section-rule" />
          </div>
          <p className="section-tagline">Every project flows through this sequence — no exceptions.</p>
        </div>

        <div className="phases-grid">
          {PHASES.map((phase) => (
            <div
              key={phase.number}
              className="phase-card"
              style={{ '--phase-color': phase.color }}
            >
              <div className="phase-number">PHASE {phase.number}</div>
              <div className="phase-name">{phase.name}</div>
              <div className="phase-sub">{phase.sub}</div>
              <p className="phase-desc">{phase.desc}</p>
              <div className="phase-directive">{phase.directive}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8-WEEK DELIVERY ROADMAP ───────────────────────────── */}
      <section className="roadmap-section">
        <div className="section-heading-block">
          <div className="section-header-row">
            <span className="section-label-text">// DELIVERY TIMELINE</span>
            <div className="section-rule" />
          </div>
          <p className="section-tagline">High-visibility, 8-week path from Kickoff to Infrastructure.</p>
        </div>

        <div className="roadmap-timeline">
          <div className="roadmap-header-row">
            <div className="roadmap-header-cell">Timeframe</div>
            <div className="roadmap-header-cell phase-col">Phase</div>
            <div className="roadmap-header-cell">Client Experience</div>
            <div className="roadmap-header-cell internal-col">Internal Milestone</div>
          </div>
          {ROADMAP.map((row, i) => (
            <div key={i} className="roadmap-row">
              <div className="roadmap-cell">
                <span className="roadmap-timeframe">{row.time}</span>
              </div>
              <div className="roadmap-cell phase-col">
                <span className="roadmap-phase">{row.phase}</span>
              </div>
              <div className="roadmap-cell">
                <span className="roadmap-client">{row.client}</span>
              </div>
              <div className="roadmap-cell internal-col">
                <span className="roadmap-internal">{row.internal}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CORE PHILOSOPHY ───────────────────────────────────── */}
      <div className="philosophy-strip">
        <div className="philosophy-strip-inner">
          <div className="philosophy-block">
            <div className="philosophy-icon">◆</div>
            <div className="philosophy-content">
              <div className="philosophy-label">Core Philosophy — The Signature of Consistency</div>
              <div className="philosophy-quote">
                Precision. Minimalism. High Performance.
              </div>
              <p className="philosophy-body">
                This model ensures that even when pivoting between vastly different domains — from high-level systems architecture to heavy mechanical engineering — the signature remains constant. Commodity delivers; SATCORP certifies.
              </p>
              <div className="philosophy-pillars">
                {['Precision', 'Minimalism', 'High Performance'].map(p => (
                  <div key={p} className="philosophy-pillar">
                    <div className="philosophy-pillar-dot" />
                    <span className="philosophy-pillar-text">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CAPABILITY STACK ──────────────────────────────────── */}
      <section className="capability-section" id="capability-stack">
        <div className="section-heading-block">
          <div className="section-header-row">
            <span className="section-label-text">// CAPABILITY STACK</span>
            <div className="section-rule" />
          </div>
          <p className="section-tagline">Select a capability to initiate service requisition.</p>
        </div>

        <div className="skills-grid">
          {SKILL_CARDS.map(card => (
            <SkillCard key={card.id} card={card} onSelect={setActiveCard} />
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-block">
          <div className="cta-left">
            <div className="cta-eyebrow">// INITIATE ENGAGEMENT</div>
            <h2 className="cta-title">
              Ready to Build<br />Business Infrastructure?
            </h2>
            <p className="cta-sub">
              Every engagement begins with Clarity. No building starts without an absolute, scored problem definition. Submit your intake — we'll map your Opportunity Zones within 24 hours.
            </p>
          </div>
          <div className="cta-actions">
            <MagneticWrapper strength={0.2}>
              <button
                id="cta-start-btn"
                className="btn-gold"
                onClick={() => document.getElementById('capability-stack')?.scrollIntoView({ behavior: 'smooth' })}
              >
                START CLARITY LOCK
              </button>
            </MagneticWrapper>
            <MagneticWrapper strength={0.2}>
              <a
                id="cta-discord-btn"
                href="https://discord.gg/KqphHMq6vS"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                JOIN DISCORD
              </a>
            </MagneticWrapper>
          </div>
        </div>
      </section>

      <Footer copyText="2026 SATCORP" />

      {/* SERVICE REQUISITION HUB */}
      {activeCard && (
        <RequisitionHub
          activeCard={activeCard}
          onClose={() => setActiveCard(null)}
          divisionTag="SATCORP OPERATIONS"
          theme={{
            color: '#00ff41',
            glow: 'rgba(0, 255, 65, 0.35)',
            rgb: '0, 255, 65'
          }}
        />
      )}
    </div>
  )
}
