export type InteractionType = 'meeting' | 'call' | 'email' | 'note';

export interface InteractionLog {
  id: number;
  content: string;
  date: string; // ISO string
  interactionType: InteractionType;
  clientId: number;
}

export interface CreateInteractionLogDto {
  content: string;
  date: string;
  interactionType: InteractionType;
  clientId: number;
}

export interface UpdateInteractionLogDto {
  content?: string;
  date?: string;
  interactionType?: InteractionType;
} 