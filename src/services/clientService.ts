import axios from 'axios'
import { Client, CreateClientDto, UpdateClientDto } from '../types/client'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const clientApi = axios.create({
  baseURL: `${API_URL}/clients`,
  headers: {
    'Content-Type': 'application/json',
  },
})

clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getAllClients = async () => {
  const response = await clientApi.get<Client[]>('')
  return response.data
}

export const getClientById = async (id: number) => {
  const response = await clientApi.get<Client>(`/${id}`)
  return response.data
}

export const createClient = async (data: CreateClientDto) => {
  const response = await clientApi.post<Client>('', data)
  return response.data
}

export const updateClient = async (id: number, data: UpdateClientDto) => {
  const response = await clientApi.put<Client>(`/${id}`, data)
  return response.data
}

export const deleteClient = async (id: number) => {
  await clientApi.delete(`/${id}`)
}
