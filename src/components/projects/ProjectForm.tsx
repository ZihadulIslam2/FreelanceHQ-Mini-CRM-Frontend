import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import * as projectService from '../../services/projectService'
import { CreateProjectDto, UpdateProjectDto } from '../../types/project'
import './ProjectForm.css'

const schema = yup.object().shape({
  name: yup.string().required('Project name is required'),
  details: yup.string().required('Project details are required'),
  status: yup
    .string()
    .oneOf(['not_started', 'in_progress', 'completed', 'on_hold', 'cancelled'])
    .required('Status is required'),
})

export const ProjectForm = () => {
  const { clientId, projectId } = useParams<{
    clientId: string
    projectId?: string
  }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectDto>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (projectId && clientId) {
      const loadProject = async () => {
        try {
          setLoading(true)
          const project = await projectService.getProjectById(
            Number(clientId),
            Number(projectId)
          )
          reset(project)
          setError('')
        } catch (error) {
          setError('Failed to load project')
          console.error('Error loading project:', error)
        } finally {
          setLoading(false)
        }
      }
      loadProject()
    }
  }, [projectId, clientId, reset])

  const onSubmit = async (data: CreateProjectDto) => {
    if (!clientId) {
      setError('Client ID is missing')
      return
    }
    try {
      setLoading(true)
      if (projectId) {
        await projectService.updateProject(
          Number(clientId),
          Number(projectId),
          data as UpdateProjectDto
        )
      } else {
        await projectService.createProject(Number(clientId), data)
      }
      navigate(`/clients/${clientId}`)
    } catch (error) {
      setError(
        projectId ? 'Failed to update project' : 'Failed to create project'
      )
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && projectId) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  )

  return (
    <div className="project-form-container">
      <div className="project-form-wrapper">
        <div className="project-form-header">
          <h1 className="project-form-title">
            {projectId ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="project-form-subtitle">
            {projectId ? 'Update project information' : 'Add a new project to your client'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="project-form">
          <div className="form-group">
            <label className="form-label">
              Project Name
              <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              {...register('name')}
              className="form-input"
              placeholder="Enter project name"
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Details
              <span className="required-mark">*</span>
            </label>
            <textarea
              {...register('details')}
              className="form-input form-textarea"
              placeholder="Enter project details"
            />
            {errors.details && (
              <p className="form-error">{errors.details.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Status
              <span className="required-mark">*</span>
            </label>
            <select
              {...register('status')}
              className="form-input form-select"
            >
              <option value="">Select status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <p className="form-error">{errors.status.message}</p>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() =>
                navigate(clientId ? `/clients/${clientId}` : '/clients')
              }
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
                projectId ? 'Update Project' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
