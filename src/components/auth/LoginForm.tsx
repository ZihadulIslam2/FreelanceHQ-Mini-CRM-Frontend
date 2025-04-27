import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginCredentials } from '../../types/auth'
import { loginSchema } from './validationSchemas'
import { useAuth } from '../../hooks/useAuth'

export const LoginForm = () => {
  const { login } = useAuth()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: LoginCredentials) => {
    try {
      setError('')
      await login(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login')
    }
  }

  return (
    <div className="public-route-bg flex items-center justify-center min-h-screen p-4">
      <div className="auth-container w-full">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account to continue</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="auth-input"
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="auth-label">Password</label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="auth-input"
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="auth-error">{error}</div>
            )}

            <button
              type="submit"
              className="auth-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
