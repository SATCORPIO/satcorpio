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

const OP_VALUES = [
  { bold: 'End-to-end problem solver', rest: ' bridging design / automation / branding / systems' },
  { bold: 'Translates vague ideas', rest: ' into deployable assets (web / brand / workflow / media)' },
  { bold: 'High-performance workstation', rest: ' driven delivery (RTX workflows / rapid iteration)' },
  { bold: 'Client-first concierge model:', rest: ' clarity â†’ scope â†’ execution â†’ polish' },
]

export default function MainPage() {
  const [activeCard, setActiveCard] = useState(null)
  const mainPageData = PAGES.find(p => p.id === 'main')

  return (
    <div className="page-wrapper main-page">
      <Helmet>
        <title>SATCORP â€” Creative & Technology Organization</title>
        <meta name="description" content="Multi-division creative and technology organization â€” brand identity, web systems, motion design, no-code builds, and strategic consulting." />
        <meta property="og:title" content="SATCORP â€” Creative & Technology Organization" />
        <meta property="og:description" content="Multi-division creative and technology organization â€” brand identity, web systems, motion design, no-code builds, and strategic consulting." />
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
        "description": "Multi-division creative and technology organization â€” brand identity, web systems, motion design, no-code builds, and strategic consulting.",
        "sameAs": []
      }} />
      <div className="main-bg-container">
        <div className="main-bg-img" 
          style={{ backgroundImage: `url(${mainPageData?.image})` }} 
        />
        <div className="main-bg-overlay" />
        <div className="tactical-grid" />
      </div>
      <Header title="SATCORP" />

      {/* Hero section */}
      <section className="operator-section">
        <div className="op-eyebrow">
          <div className="op-eyebrow-line" />
          <span className="op-eyebrow-text">SATCORP OPERATION BRANCH</span>
        </div>
        <h1 className="op-main-title">
          Core Identity <em>/</em> Operator Value
        </h1>
        
        <div className="op-actions" style={{ marginBottom: '32px' }}>
          <MagneticWrapper strength={0.2}>
            <a 
              href="https://discord.gg/KqphHMq6vS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)',
                animation: 'blinkDot 1.6s ease-in-out infinite'
              }} />
              JOIN COMMUNICATION HUB
            </a>
          </MagneticWrapper>
        </div>

        <div className="op-value-grid">
          {OP_VALUES.map((v, i) => (
            <div key={i} className="op-value-item">
              <p>
                <strong>{v.bold}</strong>
                {v.rest}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Cards */}
      <section className="skills-section">
        <div className="section-header-row">
          <span className="section-label-text">// SERVICE CATEGORY DEPLOYMENT</span>
          <div className="section-rule" />
        </div>

        <div className="skills-grid">
          {SKILL_CARDS.map(card => (
            <SkillCard key={card.id} card={card} onSelect={setActiveCard} />
          ))}
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
