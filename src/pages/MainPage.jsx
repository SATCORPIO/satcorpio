import Header from '../components/Header'
import Footer from '../components/Footer'
import SkillCard from '../components/SkillCard'
import { SKILL_CARDS } from '../data/skillCards'
import { PAGES } from '../data/pages'

const OP_VALUES = [
  { bold: 'End-to-end problem solver', rest: ' bridging design / automation / branding / systems' },
  { bold: 'Translates vague ideas', rest: ' into deployable assets (web / brand / workflow / media)' },
  { bold: 'High-performance workstation', rest: ' driven delivery (RTX workflows / rapid iteration)' },
  { bold: 'Client-first concierge model:', rest: ' clarity → scope → execution → polish' },
]

export default function MainPage() {
  const mainPageData = PAGES.find(p => p.id === 'main')

  return (
    <div className="page-wrapper main-page">
      <div className="main-bg-container">
        <div 
          className="main-bg-img" 
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
        <p className="op-sub">CLASSIFIED OPERATIONAL PROFILE — CLEARANCE LEVEL UNRESTRICTED</p>

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
          <span className="section-label-text">// SKILL CATEGORY DEPLOYMENT</span>
          <div className="section-rule" />
        </div>

        <div className="skills-grid">
          {SKILL_CARDS.map(card => (
            <SkillCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
