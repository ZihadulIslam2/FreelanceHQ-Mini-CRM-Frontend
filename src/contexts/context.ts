import { createContext } from 'react'
import { AuthState, LoginCredentials, SignupCredentials } from '../types/auth'

interface AuthContextType extends AuthState {
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
