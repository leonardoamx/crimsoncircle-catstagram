import { createContext, useContext, useState, type ReactNode } from 'react'
import type { LoginData } from '../models/LoginData'
import type { UserModel } from '../models/UserModel'

interface AuthContextValue {
  token: string | null,
  user: UserModel | null,
  login: (loginData: LoginData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // @TODO: Test replacing useState with useMemo
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'))
  const [user, setUser] = useState<UserModel | null>(() => {
    const storedUser = localStorage.getItem('auth_user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = (loginData: LoginData) => {
    setToken(loginData.token)
    setUser(loginData.user)
    localStorage.setItem('auth_token', loginData.token)
    localStorage.setItem('auth_user', JSON.stringify(loginData.user));
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
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
