import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function OperatorPortal() {
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
            <span className="portal-role-badge operator-badge">OPERATOR</span>
            <span className="portal-username">{currentUser?.username}</span>
          </div>
          <div className="portal-topbar-right">
            <div className="portal-status-dot" />
            <span className="portal-status-text">SESSION ACTIVE</span>
            <button id="operator-logout-btn" className="portal-logout-btn" onClick={handleLogout}>
              TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="portal-welcome">
          <div className="portal-eyebrow">
            <div className="op-eyebrow-line" />
            <span className="op-eyebrow-text">SATCORP OPERATIONS NODE</span>
          </div>
          <h1 className="portal-title">
            OPERATOR <span className="portal-title-accent">DASHBOARD</span>
          </h1>
          <p className="portal-subtitle">CLEARANCE LEVEL: BETA — OPERATIONS ACCESS</p>
        </div>

        {/* Placeholder Grid */}
        <div className="portal-section-label">// OPERATOR MODULES — PENDING DEPLOYMENT</div>
        <div className="portal-modules-grid">
          {['ACTIVE MISSIONS', 'TASK QUEUE', 'CLIENT COMMS', 'ASSET LIBRARY', 'REPORTS', 'TOOLS'].map((mod, i) => (
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
