import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Client } from '../../types/client'
import * as clientService from '../../services/clientService'

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const data = await clientService.getAllClients()
      setClients(data)
      setError('')
    } catch (error) {
      setError('Failed to load clients')
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientService.deleteClient(id)
        setClients(clients.filter((client) => client.id !== id))
      } catch (error) {
        setError('Failed to delete client')
        console.error('Error deleting client:', error)
      }
    }
  }

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          onClick={() => navigate('/clients/new')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/clients/${client.id}/edit`)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
