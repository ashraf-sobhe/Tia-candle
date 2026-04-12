import api from './axios'
import {
  SignupRequest,
  LoginRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  AuthResponse,
  ForgotPasswordResponse,
  VerifyResetCodeResponse,
  ResetPasswordResponse,
  RefreshTokenResponse,
  LogoutResponse
} from '../types/auth.types'

export const authApi = {

  signup: (data: SignupRequest) =>
    api.post<AuthResponse>('/auth/signup', data),

  login: (data: LoginRequest) =>
    api.post<AuthResponse>('/auth/login', data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<ForgotPasswordResponse>('/auth/password/forgot', data),

  verifyResetCode: (data: VerifyResetCodeRequest) =>
    api.post<VerifyResetCodeResponse>('/auth/password/verify', data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<ResetPasswordResponse>('/auth/password/reset', data),

  refreshToken: () =>
    api.get<RefreshTokenResponse>('/auth/refresh-token'),

  logout: () =>
    api.post<LogoutResponse>('/auth/logout'),

}