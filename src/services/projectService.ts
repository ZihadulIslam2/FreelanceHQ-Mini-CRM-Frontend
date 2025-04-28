import axios from 'axios'
import { Project, CreateProjectDto, UpdateProjectDto } from '../types/project'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const getAllProjects = async (clientId: number): Promise<Project[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/clients/${clientId}/projects`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
  return response.data
}

export const getProjectById = async (
  clientId: number,
  projectId: number
): Promise<Project> => {
  const response = await axios.get(
    `${API_BASE_URL}/clients/${clientId}/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
  return response.data
}

export const createProject = async (
  clientId: number,
  data: CreateProjectDto
): Promise<Project> => {
  const response = await axios.post(
    `${API_BASE_URL}/clients/${clientId}/projects`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

export const updateProject = async (
  clientId: number,
  projectId: number,
  data: UpdateProjectDto
): Promise<Project> => {
  const response = await axios.put(
    `${API_BASE_URL}/clients/${clientId}/projects/${projectId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

export const deleteProject = async (
  clientId: number,
  projectId: number
): Promise<void> => {
  await axios.delete(
    `${API_BASE_URL}/clients/${clientId}/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )
}
