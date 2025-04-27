import { Reminder, CreateReminderDto, UpdateReminderDto } from '../types/reminder';
import { api } from './api';

export const reminderService = {
  getAll: async (): Promise<Reminder[]> => {
    const response = await api.get('/reminders');
    return response.data;
  },

  getDueThisWeek: async (): Promise<Reminder[]> => {
    const response = await api.get('/reminders/due-this-week');
    return response.data;
  },

  getById: async (id: number): Promise<Reminder> => {
    const response = await api.get(`/reminders/${id}`);
    return response.data;
  },

  create: async (data: CreateReminderDto): Promise<Reminder> => {
    const response = await api.post('/reminders', data);
    return response.data;
  },

  update: async (id: number, data: UpdateReminderDto): Promise<Reminder> => {
    const response = await api.put(`/reminders/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/reminders/${id}`);
  }
}; 