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
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
      )}

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
        <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>
      )}

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <button
        type="submit"
        className="auth-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  )
}
