import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '../api/auth.api'
import { useAuthStore } from '../store/authStore'
import {
  SignupRequest,
  LoginRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
} from '../types/auth.types'

export const useSignup = () => {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (res) => {
      setAuth(res.data.data.user, res.data.data.accessToken)
      router.push('/login')
    },
    
  })
}

export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (res) => {
      setAuth(res.data.data.user, res.data.data.accessToken)
      router.push('/')
    },
    onError: () => {},
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onError: () => {},
  })
}

export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: (data: VerifyResetCodeRequest) => authApi.verifyResetCode(data),
    onError: () => {},
  })
}

export const useResetPassword = () => {
  const { setAccessToken } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: (res) => {
      setAccessToken(res.data.accessToken)
      router.push('/')
    },
    onError: () => {},
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()
  const router = useRouter()
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      logout()
      router.push('/login')
    },
    onError: () => {},
  })
}