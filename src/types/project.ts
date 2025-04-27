export interface Project {
  id: number
  clientId: number
  name: string
  details: string
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'
}

export interface CreateProjectDto {
  name: string
  details: string
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'
}

export interface UpdateProjectDto {
  name?: string
  details?: string
  status?: 'not_started' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'
}
