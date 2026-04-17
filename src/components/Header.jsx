import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from './Menu'
import SignInModal from './SignInModal'
import { useAuth } from '../context/AuthContext'
import MagneticWrapper from './MagneticWrapper'

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
    const userSlug = currentUser.username.split('@')[0]
    if (role === 'admin')    navigate(`/portal/admin/${userSlug}`)
    else if (role === 'developer') navigate(`/portal/dev/${userSlug}`)
    else                     navigate(`/portal/Contact/${userSlug}`)
  }

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        {/* LEFT — Sign In / Portal */}
        <div className="header-left">
          {currentUser ? (
            <MagneticWrapper strength={0.25}>
              <button
                id="portal-btn"
                className="header-portal-btn"
                onClick={handlePortalClick}
                aria-label={`Go to ${currentUser.role} portal`}
              >
                <span className="portal-btn-dot" />
                Ops Portal
              </button>
            </MagneticWrapper>
          ) : (
            <MagneticWrapper strength={0.25}>
              <button
                id="sign-in-btn"
                className="header-signin-btn"
                onClick={() => setSignInOpen(true)}
                aria-label="Sign in to SATCORP"
              >
                SIGN IN
              </button>
            </MagneticWrapper>
          )}
        </div>

        <div className="header-center">
          <MagneticWrapper strength={0.2}>
            <button
              id="header-title-btn"
              className="header-title-btn"
              onClick={() => navigate('/')}
              aria-label="Go to SATCORP main page"
            >
              {title}
            </button>
          </MagneticWrapper>
        </div>

        <div className="header-right">
          <MagneticWrapper strength={0.4}>
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
          </MagneticWrapper>
        </div>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {signInOpen && <SignInModal onClose={() => setSignInOpen(false)} />}
    </>
  )
}
