import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import * as projectService from '../../services/projectService'
import { CreateProjectDto, UpdateProjectDto } from '../../types/project'

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

  if (loading && projectId) return <div className="text-center">Loading...</div>

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {projectId ? 'Edit Project' : 'Create New Project'}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
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
            Details
          </label>
          <textarea
            {...register('details')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
          />
          {errors.details && (
            <p className="mt-1 text-sm text-red-500">
              {errors.details.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() =>
              navigate(clientId ? `/clients/${clientId}` : '/clients')
            }
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : projectId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
