import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Client } from '../../types/client'
import * as clientService from '../../services/clientService'
import './ClientList.css'

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await clientService.getAllClients()
      setClients(data)
    } catch (error) {
      setError('Failed to load clients. Please try again later.')
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        setError(null)
        await clientService.deleteClient(id)
        setClients(clients.filter((client) => client.id !== id))
      } catch (error) {
        setError('Failed to delete client. Please try again later.')
        console.error('Error deleting client:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading clients...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadClients} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="client-list-container">
      <div className="client-list-wrapper">
        <div className="client-list-header">
          <div>
            <h1 className="client-list-title">Clients</h1>
            <p className="client-list-subtitle">Manage your client relationships and projects</p>
          </div>
          <button
            onClick={() => navigate('/clients/new')}
            className="add-client-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Client
          </button>
        </div>

        {clients.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="empty-state-title">No clients</h3>
            <p className="empty-state-description">Get started by creating a new client.</p>
            <div className="empty-state-button">
              <button
                onClick={() => navigate('/clients/new')}
                className="add-client-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Client
              </button>
            </div>
          </div>
        ) : (
          <div className="client-grid">
            {clients.map((client) => (
              <div key={client.id} className="client-card">
                <div className="client-card-content">
                  <div className="client-card-header">
                    <div className="client-avatar">
                      <span className="client-avatar-initial">
                        {client.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="client-info">
                      <Link
                        to={`/clients/${client.id}`}
                        className="client-name"
                      >
                        {client.name}
                      </Link>
                      <p className="client-email">{client.email}</p>
                    </div>
                  </div>
                  
                  <div className="client-phone">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {client.phone}
                  </div>

                  <div className="client-actions">
                    <Link
                      to={`/clients/${client.id}/projects/new`}
                      className="client-action-button add-project-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Project
                    </Link>
                    <button
                      onClick={() => navigate(`/clients/${client.id}/edit`)}
                      className="client-action-button edit-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="client-action-button delete-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
