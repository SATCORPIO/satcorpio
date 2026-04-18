import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SkillCard from '../components/SkillCard'
import RequisitionHub from '../components/RequisitionHub'
import JsonLd from '../components/JsonLd'
import { PAGES } from '../data/pages'
import MagneticWrapper from '../components/MagneticWrapper'
import SatcorpSignature from '../components/SatcorpSignature'
import '../prestige.css'

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
  { time: 'Week 1-2', phase: '1. Clarity & Scope',    client: 'Receive Project Map & 7-Point Blueprint.', internal: 'Diagnostic Lock & Architectural Engine sync.' },
  { time: 'Week 2-4', phase: '2. Core Build',         client: 'First live preview / system connectivity.', internal: 'Workflow replacement begins (Gate 01-04).' },
  { time: 'Week 4-5', phase: '3. Process Replacement', client: 'A manual process is fully replaced.',     internal: 'Connectivity & API hardening (Gate 05-07).' },
  { time: 'Week 5-6', phase: '4. Deployment',         client: 'The Go-Live moment.',                      internal: 'Production deployment & Security lock.' },
  { time: 'Week 6-8', phase: '5. Polish & Scale',     client: 'Prestige UI/UX & High-Performance.',        internal: '6-Pillar Polish Audit & Scaling setup.' },
  { time: 'Ongoing',   phase: '6. SATCORP Signature',  client: 'Continuous optimization & certification.', internal: '10 Gates of Infrastructure Validation.' },
]

const PHASES = [
  {
    number: '01',
    name: 'Clarity',
    sub: 'Diagnostic Engine → Truth Extraction',
    desc: 'No building begins without absolute clarity. We translate vague ideas into a structured Problem Statement and Priority Stack (P0-P4) using the SATCORP Truth Extraction protocol.',
    directive: '"No Clarity → No Build"',
    color: '#00ff41',
  },
  {
    number: '02',
    name: 'Scope',
    sub: 'Architectural Engine → 7-Point Blueprint',
    desc: 'The blueprint gates the build. We generate a 7-point System Blueprint covering feature extraction, data flow, and tech stack selection (Tiers 1-3) tailored to your ROI profile.',
    directive: '"Scope Controls Everything"',
    color: '#00cc33',
  },
  {
    number: '03',
    name: 'Execution',
    sub: '8 Execution Gates → Core Build',
    desc: 'We move through 8 strict Execution Gates. From Core Build and Connectivity to QA and Live Validation, ensuring the system replaces manual friction without breaking during growth.',
    directive: '"Execution is Phased, Not Chaotic"',
    color: '#e8b422',
  },
  {
    number: '04',
    name: 'Polish',
    sub: '6-Pillar Audit → SATCORP Signature',
    desc: 'Functional is not enough. We apply a 6-Pillar Polish Score—UX, UI, Performance, Automation, Perception, and Hardening. Only assets scoring ≥90 earn the SATCORP Signature.',
    directive: '"Polish = Premium Positioning"',
    color: '#c9960c',
  },
]

const HERO_STATS = [
  {
    icon: '◈',
    value: 'Diagnostic Engine',
    label: 'High-touch Truth Extraction before a single line of code is drafted.',
  },
  {
    icon: '◈',
    value: '8-Week Pipeline',
    label: 'Structured path: Week 1-2 Clarity Lock → Week 8 Signature Delivery.',
  },
  {
    icon: '◈',
    value: '10 Validation Gates',
    label: 'Every system is hardened against 10 infrastructure quality gates.',
  },
  {
    icon: '◈',
    value: 'SATCORP Signature',
    label: 'Elite certification for systems achieving a 90+ Polish Score.',
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
              {' '}Your system moves through our <strong>Diagnostic Engine</strong> into a structured <strong>8-Week Pipeline</strong> where we design, architect, and harden every layer until it is a certified SATCORP asset.
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
            The Delivery Promise: After the <strong>Diagnostic Lock</strong>, your system moves through a gated architecture process where we{' '}
            <strong>architect, build, deploy, and polish</strong>{' '}
            until your business operations are frictionless.
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

      {/* ── THE 6 PILLARS OF POLISH ──────────────────────────── */}
      <section className="polish-pillars-section">
        <div className="section-heading-block">
          <div className="section-header-row">
            <span className="section-label-text">// THE 6 PILLARS OF POLISH</span>
            <div className="section-rule" />
          </div>
          <p className="section-tagline">The difference between "functional" and "prestige" assets.</p>
        </div>

        <div className="polish-grid">
          {[
            { name: 'UX Refinement', desc: 'Removing friction. Core actions take ≤ 3-5 steps.' },
            { name: 'UI Consistency', desc: 'Absolute grid discipline and architectural authority.' },
            { name: 'Performance', desc: 'Optimization of speed for instant user load states.' },
            { name: 'Automation', desc: 'High workflow density to minimize human input dependency.' },
            { name: 'Perception', desc: 'Micro-copy and animations that tell your dashboard story.' },
            { name: 'Hardening', desc: 'Scalability measures and concurrency protection logic.' }
          ].map((pillar, i) => (
            <div key={pillar.name} className="pillar-item">
              <div className="pillar-count">0{i + 1}</div>
              <div className="pillar-name">{pillar.name}</div>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INFRASTRUCTURE GATES ─────────────────────────────── */}
      <section className="infra-gates-section">
        <div className="infra-gates-container">
          <div className="infra-gates-content">
            <div className="section-label-text">// INFRASTRUCTURE AUTHORITY</div>
            <h2 className="infra-title">The 10 Gates of Validation</h2>
            <p className="infra-desc">
              Every build is subjected to the SATCORP Infrastructure Litmus Test. 
              We ensure <strong>Employee Neutrality</strong>, <strong>Modular Decoupling</strong>, and <strong>Silent Recovery</strong>.
            </p>
            <div className="gates-list">
              {[
                'Stability', 'Scalability', 'Automation', 'Data Integrity', 'Observability',
                'Readiness', 'Performance', 'Failsafe', 'Deployment', 'Qualification'
              ].map((gate, i) => (
                <div key={gate} className="gate-tag">
                  <span className="gate-num">GATE {String(i + 1).padStart(2, '0')}</span>
                  <span className="gate-label">{gate}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="infra-gates-visual">
             <div className="signature-showcase">
                <SatcorpSignature size={250} />
                <div className="signature-label">CERTIFIED INFRASTRUCTURE</div>
             </div>
          </div>
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
                onClick={() => {
                   // Placeholder for diagnostic entrance
                   alert("Initiating Diagnostic Engine... Please wait for Truth Extraction.");
                }}
              >
                INITIATE YOUR DIAGNOSTIC
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
