import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Registered users — credentials stored here for now
const USERS = [
  { username: 'anu@satcorp.io',     password: 'Hess1862$',       role: 'admin' },
  { username: 'iss@satcorp.io',     password: 'Muscleman320$',   role: 'operator' },
  { username: 'dhalsim@satcorp.io', password: 'Hiimpaul$',       role: 'operator' },
  { username: 'babajoe1@satcorp.io',password: 'Whoisjeff$',      role: 'operator' },
  { username: 'dysun@satcorp.io',   password: 'Ikickdodos556$',  role: 'client' },
]

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loginError, setLoginError] = useState('')

  const login = useCallback((username, password) => {
    const user = USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )
    if (user) {
      setCurrentUser(user)
      setLoginError('')
      return user
    } else {
      setLoginError('Invalid credentials. Access denied.')
      return null
    }
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setLoginError('')
  }, [])

  const clearError = useCallback(() => setLoginError(''), [])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loginError, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
