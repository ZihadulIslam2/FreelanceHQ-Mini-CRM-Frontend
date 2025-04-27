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
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter your email"
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="Enter your password"
          required
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          size="lg"
        >
          Sign In
        </Button>
      </form>
    </Container>
  )
}
