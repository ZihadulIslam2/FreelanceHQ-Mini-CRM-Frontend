import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Client } from '../../types/client'
import { Project } from '../../types/project'
import * as clientService from '../../services/clientService'
import * as projectService from '../../services/projectService'
import { InteractionLogTimeline } from './InteractionLogTimeline'
import { AddInteractionLogForm } from './AddInteractionLogForm'
import './ClientDetails.css'

export const ClientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshLogs, setRefreshLogs] = useState(0)

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

  const handleLogAdded = () => {
    setRefreshLogs(prev => prev + 1)
  }

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  )
  
  if (error) return (
    <div className="error-container">
      <div className="error-message">{error}</div>
    </div>
  )
  
  if (!client) return (
    <div className="not-found-container">
      <div className="not-found-message">Client not found</div>
    </div>
  )

  return (
    <div className="client-details-container">
      {/* Client Header Section */}
      <div className="client-header">
        <div className="client-header-content">
          <div className="client-header-top">
            <div className="client-info">
              <div className="client-avatar">
                <span className="client-avatar-initial">
                  {client.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="client-name">{client.name}</h1>
                <p className="client-subtitle">Client Details</p>
              </div>
            </div>
            <div className="client-actions">
              <button
                onClick={() => navigate(`/clients/${id}/edit`)}
                className="btn btn-secondary"
              >
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Client
              </button>
              <button
                onClick={() => navigate(`/clients/${id}/projects/new`)}
                className="btn btn-primary"
              >
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Project
              </button>
            </div>
          </div>
        </div>
        
        {/* Client Info Section */}
        <div className="client-info-section">
          <div className="client-info-grid">
            <div className="client-info-item">
              <svg className="client-info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <p className="client-info-label">Email</p>
                <p className="client-info-value">{client.email}</p>
              </div>
            </div>
            <div className="client-info-item">
              <svg className="client-info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div>
                <p className="client-info-label">Phone</p>
                <p className="client-info-value">{client.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content">
        {/* Interaction Logs Section */}
        <div className="content-card">
          <div className="card-header">
            <h2 className="card-title">Interaction History</h2>
          </div>
          <div className="card-content">
            <InteractionLogTimeline key={refreshLogs} clientId={Number(id)} />
          </div>
          <div className="card-header">
            <AddInteractionLogForm clientId={Number(id)} onLogAdded={handleLogAdded} />
          </div>
        </div>

        {/* Projects Section */}
        <div className="content-card">
          <div className="card-header">
            <h2 className="card-title">Projects</h2>
          </div>
          <div className="card-content">
            {projects.length === 0 ? (
              <div className="empty-state">
                <svg className="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="empty-state-title">No projects</h3>
                <p className="empty-state-description">Get started by creating a new project.</p>
                <div className="empty-state-button">
                  <button
                    onClick={() => navigate(`/clients/${id}/projects/new`)}
                    className="btn btn-primary"
                  >
                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create First Project
                  </button>
                </div>
              </div>
            ) : (
              <div className="project-list">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="project-card"
                  >
                    <div className="project-header">
                      <div>
                        <h3 className="project-title">
                          <Link
                            to={`/clients/${id}/projects/${project.id}`}
                          >
                            {project.name}
                          </Link>
                        </h3>
                        <p className="project-description">{project.details}</p>
                      </div>
                      <span className={`project-status ${
                        project.status === 'completed' ? 'status-completed' :
                        project.status === 'in_progress' ? 'status-in-progress' :
                        project.status === 'on_hold' ? 'status-on-hold' :
                        project.status === 'cancelled' ? 'status-cancelled' :
                        ''
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="project-actions">
                      <Link
                        to={`/clients/${id}/projects/${project.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        View
                      </Link>
                      <Link
                        to={`/clients/${id}/projects/${project.id}/edit`}
                        className="btn btn-secondary btn-sm"
                      >
                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 