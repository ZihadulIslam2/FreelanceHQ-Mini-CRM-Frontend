import { createContext, useState, useEffect } from 'react'
import { LoginCredentials, SignupCredentials, AuthState } from '../types/auth'
import * as authService from '../services/authService'

interface AuthContextType extends AuthState {
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const { user } = await authService.getCurrentUser()
          setState({ user, token, isAuthenticated: true })
        } catch {
          localStorage.removeItem('token')
          setState({ user: null, token: null, isAuthenticated: false })
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials)
    localStorage.setItem('token', token)
    setState({ user, token, isAuthenticated: true })
  }

  const signup = async (credentials: SignupCredentials) => {
    const { user, token } = await authService.signup(credentials)
    localStorage.setItem('token', token)
    setState({ user, token, isAuthenticated: true })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setState({ user: null, token: null, isAuthenticated: false })
    authService.logout()
  }

  return (
    <AuthContext.Provider value={{ ...state, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
