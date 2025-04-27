import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Client } from '../../types/client'
import { Project } from '../../types/project'
import * as clientService from '../../services/clientService'
import * as projectService from '../../services/projectService'

export const ClientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadClientAndProjects = async () => {
      try {
        setLoading(true)
        const clientData = await clientService.getClientById(Number(id))
        setClient(clientData)
        const projectsData = await projectService.getAllProjects(Number(id))
        setProjects(projectsData)
        setError('')
      } catch (error) {
        setError('Failed to load client details')
        console.error('Error loading client details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadClientAndProjects()
    }
  }, [id])

  const handleDeleteProject = async (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(Number(id), projectId)
        setProjects(projects.filter(project => project.id !== projectId))
      } catch (error) {
        setError('Failed to delete project')
        console.error('Error deleting project:', error)
      }
    }
  }

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (!client) return <div className="text-center">Client not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{client.name}</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate(`/clients/${id}/edit`)}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Edit Client
            </button>
            <button
              onClick={() => navigate(`/clients/${id}/projects/new`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Project
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{client.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{client.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No projects found for this client.</p>
            <button
              onClick={() => navigate(`/clients/${id}/projects/new`)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    project.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.details}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => navigate(`/clients/${id}/projects/${project.id}/edit`)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 