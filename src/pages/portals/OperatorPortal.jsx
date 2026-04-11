import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

// Module registry — shared definition
const MODULE_REGISTRY = [
  { key: '450kpar',      route: '/portal/modules/450kpar',      icon: '⚡', title: '450kW PARALLEL',   desc: 'Dual 450kW genset parallel operation reference' },
  { key: 'dualcore-900', route: '/portal/modules/dualcore-900', icon: '⚙', title: 'DUALCORE 900',      desc: 'Integrated dual-engine generator design doc' },
  { key: 'dualcore-900-v2', route: '/portal/modules/dualcore-900-v2', icon: '⚙', title: 'DUALCORE 900 V2', desc: 'Updated dual-engine generator design doc' },
  { key: 'gendashv2',    route: '/portal/modules/gendashv2',    icon: '◉', title: 'GEN DASH V2',       desc: '450kW diesel genset engineering dashboard' },
  { key: 'xoi-audit',   route: '/portal/modules/xoi-audit',    icon: '◈', title: 'XOI AUDIT',         desc: 'XOi feature audit & decision board' },
  { key: 'xoi-client',  route: '/portal/modules/xoi-client',   icon: '◆', title: 'XOI CLIENT',        desc: 'Field service discovery matrix form' },
  { key: 'anu-operator',route: '/portal/modules/anu-operator', icon: '⟡', title: 'ANU CONCIERGE',     desc: 'Concierge Operator Skills & Service Procurement' },
]

export default function OperatorPortal() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const userModules = MODULE_REGISTRY.filter(m =>
    currentUser?.modules?.includes(m.key)
  )

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

        {/* Module Grid */}
        {userModules.length > 0 ? (
          <>
            <div className="portal-section-label">// ASSIGNED MODULES — {userModules.length} ACTIVE</div>
            <div className="portal-modules-grid">
              {userModules.map((mod) => (
                <div
                  key={mod.key}
                  className="portal-module-card"
                  onClick={() => navigate(mod.route)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="module-card-icon">{mod.icon}</div>
                  <div className="module-card-title">{mod.title}</div>
                  <div className="module-card-status" style={{ color: 'var(--accent-cyan, #06b6d4)' }}>LAUNCH MODULE →</div>
                  <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '6px', fontFamily: 'monospace' }}>{mod.desc}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
