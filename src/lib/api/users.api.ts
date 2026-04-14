import api from './axios'
import { UsersResponse } from '../types/user.types'

export const usersApi = {
  getMe: () =>
    api.get('/users/me'),
  updateMe: (data: FormData) =>
    api.put('/users/me', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  updateMyPassword: (data: { currentPassword: string; password: string; confirmPassword: string }) =>
    api.put('/users/me/password', data),

  deactivateMyAccount: () =>
    api.put('/users/me/deactivate'),

  getUsers: () =>
    api.get('/users'),

  getUser: (id: string) =>
    api.get(`/users/${id}`),

  createUser: (data: FormData) =>
    api.post('/users', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  updateUser: (id: string, data: FormData) =>
    api.put(`/users/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  deleteUser: (id: string) =>
    api.delete(`/users/${id}`),

  deactivateUser: (id: string) =>
    api.put(`/users/${id}/deactivate`),

  reactivateUser: (id: string) =>
    api.put(`/users/${id}/reactivate`),

  changeUserPassword: (id: string, data: { password: string; confirmPassword: string }) =>
    api.put(`/users/${id}/password`, data),
}