import axios from 'axios';
import { InteractionLog, CreateInteractionLogDto, UpdateInteractionLogDto } from '../types/interactionLog';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const getAllInteractionLogs = async (clientId?: number): Promise<InteractionLog[]> => {
  const url = clientId 
    ? `${API_BASE_URL}/interaction-logs?clientId=${clientId}`
    : `${API_BASE_URL}/interaction-logs`;
    
  const response = await axios.get(url, { headers: getAuthHeaders() });
  return response.data;
};

export const getInteractionLogById = async (id: number): Promise<InteractionLog> => {
  const response = await axios.get(
    `${API_BASE_URL}/interaction-logs/${id}`,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const createInteractionLog = async (data: CreateInteractionLogDto): Promise<InteractionLog> => {
  const response = await axios.post(
    `${API_BASE_URL}/interaction-logs`,
    data,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const updateInteractionLog = async (id: number, data: UpdateInteractionLogDto): Promise<InteractionLog> => {
  const response = await axios.put(
    `${API_BASE_URL}/interaction-logs/${id}`,
    data,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteInteractionLog = async (id: number): Promise<void> => {
  await axios.delete(
    `${API_BASE_URL}/interaction-logs/${id}`,
    { headers: getAuthHeaders() }
  );
}; 