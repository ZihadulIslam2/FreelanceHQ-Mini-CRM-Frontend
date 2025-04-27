export interface Reminder {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReminderDto {
  title: string;
  description: string;
  dueDate: string;
}

export interface UpdateReminderDto {
  title?: string;
  description?: string;
  dueDate?: string;
} 