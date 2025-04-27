import axios from 'axios'
import { LoginCredentials, SignupCredentials, User } from '../types/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (credentials: LoginCredentials) => {
  const response = await authApi.post<{ user: User; token: string }>(
    '/auth/login',
    credentials
  )
  return response.data
}

export const signup = async (credentials: SignupCredentials) => {
  const response = await authApi.post<{ user: User; token: string }>(
    '/auth/signup',
    credentials
  )
  return response.data
}

export const getCurrentUser = async () => {
  const response = await authApi.get<{ user: User }>('/auth/me')
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
}
