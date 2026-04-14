export interface User {
  _id: string
  name: string
  email: string
  role: string
  active: boolean
  accessToken?: string  
  createdAt: string
  updatedAt: string
}

export interface UsersResponse {
  status: 'success'
  results: number
  meta?: {
    totalResults: number
    currentPage: number
    limit: number
    numberOfPages: number
  }
  data: {
    users: User[]
  }
}