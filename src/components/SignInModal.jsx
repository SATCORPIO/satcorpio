import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignInModal({ onClose }) {
  const navigate = useNavigate()
  const { login, loginError, clearError } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  // Focus username field on mount
  useEffect(() => {
    inputRef.current?.focus()
    return () => clearError()
  }, [clearError])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password) return
    setLoading(true)
    // Brief simulated auth delay for tactical feel
    await new Promise(r => setTimeout(r, 600))
    const user = login(username.trim(), password)
    setLoading(false)
    if (user) {
      onClose()
      const role = user.role
      if (role === 'admin') navigate('/portal/admin')
      else if (role === 'operator') navigate('/portal/operator')
      else navigate('/portal/client')
    }
  }

  return (
    <div className="signin-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="signin-panel" role="dialog" aria-modal="true" aria-label="Sign In">
        {/* Header */}
        <div className="signin-head">
          <div className="signin-head-label">// SATCORP SECURE ACCESS</div>
          <div className="signin-head-title">OPERATOR SIGN IN</div>
          <button className="signin-close modal-x" onClick={onClose} aria-label="Close sign in">✕</button>
        </div>

        {/* Scan line accent */}
        <div className="signin-scan-bar" />

        {/* Form */}
        <form className="signin-body" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label className="form-label" htmlFor="si-username">
              Username <span className="req">*</span>
            </label>
            <input
              ref={inputRef}
              id="si-username"
              className="form-input"
              type="text"
              placeholder="operator@satcorp.io"
              value={username}
              onChange={e => { setUsername(e.target.value); clearError() }}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="si-password">
              Password <span className="req">*</span>
            </label>
            <input
              id="si-password"
              className="form-input"
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); clearError() }}
              autoComplete="current-password"
            />
          </div>

          {loginError && (
            <div className="signin-error" role="alert">
              <span className="signin-error-dot" />
              {loginError}
            </div>
          )}

          <button
            id="signin-submit-btn"
            className={`btn-primary signin-submit${loading ? ' loading' : ''}`}
            type="submit"
            disabled={loading || !username.trim() || !password}
          >
            {loading ? (
              <span className="signin-loading-text">
                <span className="signin-dots" />
                AUTHENTICATING
              </span>
            ) : 'AUTHENTICATE'}
          </button>
        </form>

        {/* Footer */}
        <div className="signin-foot">
          <span className="signin-foot-text">CLEARANCE REQUIRED — AUTHORIZED PERSONNEL ONLY</span>
        </div>
      </div>
    </div>
  )
}
