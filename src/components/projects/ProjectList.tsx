import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Project } from '../../types/project'
import { Client } from '../../types/client'
import * as projectService from '../../services/projectService'
import * as clientService from '../../services/clientService'
import './ProjectList.css'

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterClient, setFilterClient] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const clientsData = await clientService.getAllClients()
        setClients(clientsData)
        
        // Fetch all projects for all clients
        const allProjects = await Promise.all(
          clientsData.map(client => projectService.getAllProjects(client.id))
        )
        setProjects(allProjects.flat())
        setError('')
      } catch (error) {
        setError('Failed to load projects')
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  const filteredProjects = projects
    .filter(project => filterStatus === 'all' || project.status === filterStatus)
    .filter(project => filterClient === 'all' || project.clientId === Number(filterClient))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'client':
          return getClientName(a.clientId).localeCompare(getClientName(b.clientId))
        default:
          return 0
      }
    })

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

  return (
    <div className="project-list-container">
      <div className="project-list-wrapper">
        <div className="project-list-header">
          <div>
            <h1 className="project-list-title">Projects</h1>
            <p className="project-list-subtitle">Manage all your projects across clients</p>
          </div>
          <button
            onClick={() => navigate('/clients')}
            className="create-project-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Project
          </button>
        </div>

        <div className="project-list-filters">
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="client-filter">Client:</label>
            <select
              id="client-filter"
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Clients</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Sort By:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Project Name</option>
              <option value="status">Status</option>
              <option value="client">Client</option>
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-state-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="empty-state-title">No projects found</h3>
            <p className="empty-state-description">Try adjusting your filters or create a new project.</p>
          </div>
        ) : (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-card-content">
                  <div className="project-card-header">
                    <div className="project-info">
                      <Link
                        to={`/clients/${project.clientId}/projects/${project.id}`}
                        className="project-name"
                      >
                        {project.name}
                      </Link>
                      <p className="project-client">
                        Client: {getClientName(project.clientId)}
                      </p>
                    </div>
                    <span className={`project-status ${project.status}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="project-details">{project.details}</p>

                  <div className="project-actions">
                    <Link
                      to={`/clients/${project.clientId}/projects/${project.id}`}
                      className="project-action-button view-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      View
                    </Link>
                    <Link
                      to={`/clients/${project.clientId}/projects/${project.id}/edit`}
                      className="project-action-button edit-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </Link>
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
