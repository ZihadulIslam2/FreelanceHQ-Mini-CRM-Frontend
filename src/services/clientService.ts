import { api } from './api'
import { Client, CreateClientDto, UpdateClientDto } from '../types/client'

export const getAllClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get<Client[]>('/clients')
    return response.data
  } catch (error) {
    console.error('Error fetching clients:', error)
    throw new Error('Failed to fetch clients')
  }
}

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get<Client>(`/clients/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching client ${id}:`, error)
    throw new Error('Failed to fetch client')
  }
}

export const createClient = async (data: CreateClientDto): Promise<Client> => {
  try {
    const response = await api.post<Client>('/clients', data)
    return response.data
  } catch (error) {
    console.error('Error creating client:', error)
    throw new Error('Failed to create client')
  }
}

export const updateClient = async (id: number, data: UpdateClientDto): Promise<Client> => {
  try {
    const response = await api.put<Client>(`/clients/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating client ${id}:`, error)
    throw new Error('Failed to update client')
  }
}

export const deleteClient = async (id: number): Promise<void> => {
  try {
    await api.delete(`/clients/${id}`)
  } catch (error) {
    console.error(`Error deleting client ${id}:`, error)
    throw new Error('Failed to delete client')
  }
}
