export interface User {
  _id: string
  name: string
  email: string
  slug: string
  phone?: string
  profileImage?: string
  role: 'user' | 'manager' | 'admin'
  active: boolean
  wishlist: string[]
  addresses: Address[]
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  alias: string
  details: string
  phone: string
  city: string
  postalCode: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface VerifyResetCodeRequest {
  resetCode: string
}

export interface ResetPasswordRequest {
  email: string
  newPassword: string
  confirmPassword: string
}

export interface AuthResponse {
  status: 'success'
  data: {
    user: User
    accessToken: string
  }
}

export interface ForgotPasswordResponse {
  status: 'success'
  message: string
}

export interface VerifyResetCodeResponse {
  status: 'success'
  message: string
}

export interface ResetPasswordResponse {
  status: 'success'
  message: string
  accessToken: string
}

export interface RefreshTokenResponse {
  status: 'success'
  data: {
    accessToken: string
  }
}

export interface LogoutResponse {
  status: 'success'
  message: string
}