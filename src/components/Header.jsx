import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from './Menu'
import SignInModal from './SignInModal'
import { useAuth } from '../context/AuthContext'

export default function Header({ title }) {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu or sign-in open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || signInOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, signInOpen])

  const handlePortalClick = () => {
    if (!currentUser) return
    const role = currentUser.role
    if (role === 'admin')    navigate('/portal/admin')
    else if (role === 'operator') navigate('/portal/operator')
    else                     navigate('/portal/client')
  }

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        {/* LEFT — Sign In / Portal */}
        <div className="header-left">
          {currentUser ? (
            <button
              id="portal-btn"
              className="header-portal-btn"
              onClick={handlePortalClick}
              aria-label={`Go to ${currentUser.role} portal`}
            >
              <span className="portal-btn-dot" />
              Ops Portal
            </button>
          ) : (
            <button
              id="sign-in-btn"
              className="header-signin-btn"
              onClick={() => setSignInOpen(true)}
              aria-label="Sign in to SATCORP"
            >
              SIGN IN
            </button>
          )}
        </div>

        <div className="header-center">
          <button
            id="header-title-btn"
            className="header-title-btn"
            onClick={() => navigate('/')}
            aria-label="Go to SATCORP main page"
          >
            {title}
          </button>
        </div>

        <div className="header-right">
          <button
            id="hamburger-btn"
            className={`hamburger-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {signInOpen && <SignInModal onClose={() => setSignInOpen(false)} />}
    </>
  )
}
