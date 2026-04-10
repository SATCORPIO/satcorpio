import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Reusable lore page template for all sub-sector pages.
 * config = {
 *   headerTitle, bgImage, overlayGradient, borderColor,
 *   accent, accentGlow,
 *   badge, badgeDot, badgeDotColor,
 *   sectorName, designation,
 *   lore, pills, extraContent
 * }
 */
export default function LorePage({ config }) {
  const {
    headerTitle, bgImage, overlayGradient,
    accent, accentGlow,
    badgeLabel, badgeDotColor,
    sectorName, designation,
    lore, pills, extraContent,
    leftBorderColor,
  } = config

  return (
    <div className="lore-page">
      <Header title={headerTitle} />

      <div style={{ paddingTop: 'var(--header-h)' }}>
        <div className="lore-hero">
          {/* BG */}
          <div
            className="lore-bg-img"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* Overlay */}
          <div className="lore-grad" style={{ background: overlayGradient }} />

          {/* Content */}
          <div className="lore-hero-inner">
            {/* Badge */}
            <div
              className="lore-badge"
              style={{ borderColor: accent, color: accent }}
            >
              <div className="lore-badge-dot" style={{ background: badgeDotColor || accent }} />
              {badgeLabel}
            </div>

            {/* Name */}
            <h1
              className="lore-main-name"
              style={{ textShadow: `0 0 60px ${accentGlow || 'rgba(0,255,65,0.3)'}` }}
            >
              {sectorName}
            </h1>

            {/* Designation */}
            <div className="lore-desig" style={{ color: accent }}>
              {designation}
            </div>

            {/* Lore text */}
            <div
              className="lore-text-card"
              style={{ borderLeft: `2px solid ${accent}` }}
            >
              <p>{lore}</p>
            </div>

            {/* Status pills */}
            {pills && (
              <div className="lore-pills">
                {pills.map((pill, i) => (
                  <div key={i} className="lore-pill">
                    <div
                      className={`pill-dot ${pill.status}`}
                      style={{ background: pill.color || accent, color: pill.color || accent }}
                    />
                    <span className="pill-label">{pill.label}</span>
                    <span className="pill-val">{pill.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Extra content slot */}
            {extraContent}

            {/* Coming soon tag */}
            <div className="lore-cs-tag">
              <div className="lore-cs-pulse" style={{ background: accent }} />
              <span className="lore-cs-text">SECTOR INTEL INCOMING — STAND BY</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
