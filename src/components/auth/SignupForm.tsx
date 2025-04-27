import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignupCredentials } from '../../types/auth'
import { signupSchema } from './validationSchemas'
import { useAuth } from '../../hooks/useAuth'

export const SignupForm = () => {
  const { signup } = useAuth()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = async (data: SignupCredentials) => {
    try {
      setError('')
      await signup(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    }
  }

  return (
    <div className="public-route-bg flex items-center justify-center min-h-screen p-4">
      <div className="auth-container w-full">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Sign up to get started with your account</p>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="auth-label">Name</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="auth-input"
                placeholder="Enter your name"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="auth-input"
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
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
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
