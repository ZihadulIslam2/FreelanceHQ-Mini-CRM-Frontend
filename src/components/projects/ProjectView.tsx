import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Project } from '../../types/project'
import * as projectService from '../../services/projectService'
import './ProjectView.css'

export const ProjectView = () => {
  const { clientId, projectId } = useParams<{
    clientId: string
    projectId: string
  }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        const projectData = await projectService.getProjectById(
          Number(clientId),
          Number(projectId)
        )
        setProject(projectData)
        setError('')
      } catch (error) {
        setError('Failed to load project details')
        console.error('Error loading project details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (clientId && projectId) {
      loadProject()
    }
  }, [clientId, projectId])

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  )

  if (error) return (
    <div className="error-message">
      <div className="error-content">
        {error}
      </div>
    </div>
  )

  if (!project) return (
    <div className="error-message">
      <div className="error-content">
        Project not found
      </div>
    </div>
  )

  return (
    <div className="project-view-container">
      <div className="project-view-wrapper">
        <div className="project-view-header">
          <div>
            <h1 className="project-view-title">{project.name}</h1>
            <p className="project-view-subtitle">Project Details</p>
          </div>
          <button
            onClick={() => navigate(`/clients/${clientId}/projects/${projectId}/edit`)}
            className="edit-project-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Project
          </button>
        </div>

        <div className="project-details">
          <div className="project-detail-item">
            <h3 className="project-detail-label">Status</h3>
            <span className={`project-status ${project.status}`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>

          <div className="project-detail-item">
            <h3 className="project-detail-label">Details</h3>
            <p className="project-detail-content">{project.details}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 