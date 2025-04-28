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

export interface UpdateClientDto {
  name?: string
  email?: string
  phone?: string
}