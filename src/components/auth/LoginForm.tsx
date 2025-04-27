import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginCredentials } from '../../types/auth'
import { loginSchema } from './validationSchemas'
import { useAuth } from '../../hooks/useAuth'
import { FormInput } from '../common/FormInput'
import { Button } from '../common/Button'
import { Container } from '../common/Container'

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
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
      )}

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
        <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
      )}

      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}

      <button
        type="submit"
        className="auth-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  )
}
