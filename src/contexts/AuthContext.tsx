import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextValue {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // @TODO: Test replacing useState with useMemo
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'))

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('auth_token', newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
