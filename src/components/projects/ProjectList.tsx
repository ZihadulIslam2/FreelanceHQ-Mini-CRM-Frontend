import { useState, useEffect } from 'react'
import * as projectService from '../../services/projectService'
import { Project } from '../../types/project'

interface ProjectListProps {
  clientId: number
}

export const ProjectList = ({ clientId }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectService.getAllProjects(clientId)
        setProjects(data)
        setError('')
      } catch (error) {
        setError('Failed to load projects')
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [clientId])

  if (loading) return <div className="text-center">Loading projects...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found for this client.</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li key={project.id} className="border p-3 rounded shadow-sm">
              <h3 className="font-bold">{project.name}</h3>
              <p>{project.details}</p>
              <p className="text-sm text-gray-600">Status: {project.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
