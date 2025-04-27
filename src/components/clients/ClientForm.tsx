import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CreateClientDto } from '../../types/client'
import * as clientService from '../../services/clientService'
import './ClientForm.css'

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

  if (loading && id) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  )

  return (
    <div className="client-form-container">
      <div className="client-form-wrapper">
        <div className="client-form-header">
          <h1 className="client-form-title">
            {id ? 'Edit Client' : 'Create New Client'}
          </h1>
          <p className="client-form-subtitle">
            {id ? 'Update client information' : 'Add a new client to your CRM'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="client-form">
          <div className="form-group">
            <label className="form-label">
              Name
              <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="form-input"
              placeholder="Enter client name"
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Email
              <span className="required-mark">*</span>
            </label>
            <input
              type="email"
              {...register('email')}
              className="form-input"
              placeholder="Enter client email"
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Phone
              <span className="required-mark">*</span>
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="form-input"
              placeholder="Enter client phone number"
            />
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                id ? 'Update Client' : 'Create Client'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
