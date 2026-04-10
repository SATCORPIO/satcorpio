import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const BOOT_LINES = [
  { text: '[ SATCORP SYSTEMS INITIALIZE ]', cls: 'white', delay: 0 },
  { text: '-------------------------------------------', cls: 'dim', delay: 200 },
  { text: 'KERNEL BUILD: SC-NAMTAR-7.4.1 ... OK', cls: 'green', delay: 500 },
  { text: 'LOADING CALIBRATION SUBSYSTEM ... OK', cls: 'green', delay: 900 },
  { text: 'MOUNTING SURVIVOR DATABASE ... OK', cls: 'green', delay: 1300 },
  { text: 'INTEGRITY CHECK: PASSED [SHA256 VERIFIED]', cls: 'green', delay: 1700 },
  { text: 'AUTH LAYER: ACTIVE — TIER 3 CLEARANCE REQUIRED', cls: 'yellow', delay: 2100 },
  { text: 'LOADING QUESTION MATRIX ...', cls: 'green', delay: 2600 },
  { text: '  > MODULE 01: IDENTITY CALIBRATION ........', cls: 'dim', delay: 3000 },
  { text: '  > MODULE 02: BEHAVIORAL MAPPING ..........', cls: 'dim', delay: 3300 },
  { text: '  > MODULE 03: THREAT ASSESSMENT ...........', cls: 'dim', delay: 3600 },
  { text: '  > MODULE 04: SURVIVABILITY SCORE .........', cls: 'dim', delay: 3900 },
  { text: '', cls: 'dim', delay: 4200 },
  { text: '⚠  WARNING: SURVEY INCOMPLETE — PENDING DEPLOYMENT', cls: 'red', delay: 4500 },
  { text: '   CALIBRATION PROTOCOL NOT YET AUTHORIZED', cls: 'red', delay: 4800 },
  { text: '', cls: 'dim', delay: 5000 },
  { text: 'REDIRECTING TO STANDBY INTERFACE ...', cls: 'yellow', delay: 5400 },
  { text: '-------------------------------------------', cls: 'dim', delay: 5700 },
]

const BOOT_TOTAL_MS = 6200

export default function NamtarSurvey() {
  const [visibleLines, setVisibleLines] = useState([])
  const [booted, setBooted] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show each boot line at its delay
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, line.delay)
      return () => clearTimeout(t)
    })

    // Begin fadeout
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, BOOT_TOTAL_MS)

    // Show survey page
    const bootTimer = setTimeout(() => {
      setBooted(true)
    }, BOOT_TOTAL_MS + 650)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(bootTimer)
    }
  }, [])

  return (
    <>
      {/* Boot sequence — no header */}
      {!booted && (
        <div
          id="survey-boot-screen"
          className={`survey-boot${fadeOut ? ' fade-out' : ''}`}
          aria-label="System boot sequence"
        >
          <div className="boot-terminal">
            {BOOT_LINES.map((line, i) => (
              visibleLines.includes(i) ? (
                <div
                  key={i}
                  className={`boot-line ${line.cls}`}
                  style={{ animationDelay: '0ms' }}
                >
                  {line.text}
                  {i === visibleLines[visibleLines.length - 1] && i < BOOT_LINES.length - 1 && (
                    <span className="boot-cursor" />
                  )}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Survey page — header shows here */}
      {booted && (
        <div className="survey-main">
          <Header title="SURVIVOR CALIBRATION" />

          <div style={{ paddingTop: 'var(--header-h)' }}>
            {/* BG */}
            <div style={{
              position: 'fixed', inset: 0, zIndex: 0,
              backgroundImage: 'url(/assets/namtarsurvey_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.25)',
            }} />
            <div style={{
              position: 'fixed', inset: 0, zIndex: 1,
              background: 'rgba(0,0,0,0.6)',
            }} />

            <div className="survey-coming" style={{ position: 'relative', zIndex: 10 }}>
              <div className="survey-cs-badge">
                <div className="survey-cs-dot" />
                CALIBRATION OFFLINE
              </div>

              <h1 className="survey-cs-title">
                SURVIVOR<br />CALIBRATION
              </h1>

              <div className="survey-cs-line" />

              <p className="survey-cs-desc">
                The Survivor Calibration Protocol is currently pending authorization. Question matrices are being prepared. Stand by for deployment.
              </p>

              <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                {['IDENTITY CALIBRATION', 'BEHAVIORAL MAPPING', 'THREAT ASSESSMENT', 'SURVIVABILITY SCORE'].map((mod, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '9px 20px',
                    border: '1px solid rgba(239,68,68,0.15)',
                    borderRadius: '2px',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    width: '100%', maxWidth: '340px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                      color: '#555', letterSpacing: '0.15em',
                    }}>MODULE {String(i + 1).padStart(2, '0')}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      color: '#444', letterSpacing: '0.15em', flex: 1,
                    }}>{mod}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                      color: '#ef4444', letterSpacing: '0.1em',
                    }}>OFFLINE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  )
}
