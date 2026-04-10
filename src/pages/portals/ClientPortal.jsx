import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ClientPortal() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="page-wrapper portal-page">
      <Header title="SATCORP" />

      <div className="portal-bg">
        <div className="portal-grid-overlay" />
      </div>

      <main className="portal-main">
        {/* Portal Header Bar */}
        <div className="portal-topbar">
          <div className="portal-topbar-left">
            <span className="portal-role-badge client-badge">CLIENT</span>
            <span className="portal-username">{currentUser?.username}</span>
          </div>
          <div className="portal-topbar-right">
            <div className="portal-status-dot" />
            <span className="portal-status-text">SESSION ACTIVE</span>
            <button id="client-logout-btn" className="portal-logout-btn" onClick={handleLogout}>
              TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="portal-welcome">
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" />
            <span className="op-eyebrow-text">SATCORP CLIENT ACCESS NODE</span>
          </div>
          <h1 className="portal-title">
            CLIENT <span className="portal-title-accent">PORTAL</span>
          </h1>
          <p className="portal-subtitle">CLEARANCE LEVEL: GAMMA — CLIENT ACCESS</p>
        </div>

        {/* Placeholder Grid */}
        <div className="portal-section-label">// CLIENT MODULES — PENDING DEPLOYMENT</div>
        <div className="portal-modules-grid">
          {['PROJECT STATUS', 'DELIVERABLES', 'INVOICES', 'COMMUNICATIONS', 'FEEDBACK', 'DOCUMENTS'].map((mod, i) => (
            <div key={i} className="portal-module-card coming-soon">
              <div className="module-card-icon">◈</div>
              <div className="module-card-title">{mod}</div>
              <div className="module-card-status">COMING ONLINE</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
