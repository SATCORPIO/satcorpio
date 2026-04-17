import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Module keys — must match route paths defined in App.jsx
const ALL_MODULES = ['450kpar', 'dualcore-900', 'dualcore-900-v2', 'gendashv2', 'xoi-audit', 'xoi-client', 'aire-serv-proposal']

// Registered users — credentials stored here for now
const USERS = [
  { username: 'anu@satcorp.io',     password: 'Hess1862$',       role: 'admin',    modules: ALL_MODULES },
  { username: 'iss@satcorp.io',     password: 'Muscleman320$',   role: 'developer', modules: ['450kpar', 'dualcore-900-v2', 'gendashv2'] },
  { username: 'dhalsim@satcorp.io', password: 'Hiimpaul$',       role: 'developer', modules: ['450kpar', 'dualcore-900', 'gendashv2'] },
  { username: 'babajoe1@satcorp.io',password: 'Whoisjeff$',      role: 'developer', modules: [] },
  { username: 'dysun@satcorp.io',   password: 'Ikickdodos556$',  role: 'client',   modules: ['xoi-audit', 'xoi-client'] },
]

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('satcorp_user')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved user', e)
        return null
      }
    }
    return null
  })
  const [loginError, setLoginError] = useState('')

  const login = useCallback((username, password) => {
    const user = USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )
    if (user) {
      setCurrentUser(user)
      localStorage.setItem('satcorp_user', JSON.stringify(user))
      setLoginError('')
      return user
    } else {
      setLoginError('Invalid credentials. Access denied.')
      return null
    }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    localStorage.removeItem('satcorp_user')
    setLoginError('')
  }, [])

  const clearError = useCallback(() => setLoginError(''), [])

  const hasModule = useCallback((key) => {
    if (!currentUser) return false
    return currentUser.modules?.includes(key) ?? false
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loginError, clearError, hasModule }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
