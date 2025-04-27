export interface Client {
  id: number
  name: string
  email: string
  phone: string
}

export interface CreateClientDto {
  name: string
  email: string
  phone: string
}

// Removed UpdateClientDto as it was redundant
export interface UpdateClientDto {
  name?: string
  email?: string
}