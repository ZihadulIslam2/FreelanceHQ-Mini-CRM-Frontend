import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CreateClientDto } from '../../types/client'
import * as clientService from '../../services/clientService'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
})

export const ClientForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientDto>({
    resolver: yupResolver(schema),
  })

  const loadClient = useCallback(async () => {
    try {
      setLoading(true)
      const client = await clientService.getClientById(Number(id))
      reset(client)
    } catch (error) {
      setError('Failed to load client')
      console.error('Error loading client:', error)
    } finally {
      setLoading(false)
    }
  }, [id, reset])

  useEffect(() => {
    if (id) {
      loadClient()
    }
  }, [id, loadClient])

  const onSubmit = async (data: CreateClientDto) => {
    try {
      setLoading(true)
      if (id) {
        await clientService.updateClient(Number(id), data)
      } else {
        await clientService.createClient(data)
      }
      navigate('/clients')
    } catch (error) {
      setError(id ? 'Failed to update client' : 'Failed to create client')
      console.error('Error saving client:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && id) return <div className="text-center">Loading...</div>

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Client' : 'Create New Client'}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
