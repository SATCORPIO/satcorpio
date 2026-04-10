import { useNavigate } from 'react-router-dom'
import { PAGES } from '../data/pages'

export default function Menu({ open, onClose }) {
  const navigate = useNavigate()

  const handleNav = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <nav id="menu-overlay" className={`menu-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="menu-top-bar">
        <span className="menu-nav-label">// SATCORP NAVIGATION SYSTEM</span>
        <button
          id="menu-close-btn"
          className="menu-close-btn"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
      </div>

      <div className="menu-grid">
        {PAGES.map((page, i) => (
          <button
            key={page.id}
            id={`page-card-${page.id}`}
            className="page-card"
            style={{
              '--card-accent': page.accent,
              animationDelay: open ? `${i * 35}ms` : '0ms',
            }}
            onClick={() => handleNav(page.path)}
            aria-label={`Navigate to ${page.title}`}
          >
            <div
              className="page-card-bg"
              style={{ backgroundImage: `url(${page.image})` }}
            />
            <div className="page-card-overlay" />
            <div className="page-card-content">
              <div className="page-card-desig" style={{ color: page.accent }}>
                {page.designation}
              </div>
              <div className="page-card-title">{page.title}</div>
            </div>
          </button>
        ))}
      </div>
    </nav>
  )
}
