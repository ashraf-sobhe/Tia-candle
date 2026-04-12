import api from './axios'
import { BrandsResponse, BrandResponse } from '../types/brand.types'

export const brandsApi = {
  getBrands: () =>
    api.get<BrandsResponse>('/brands'),

  getBrand: (id: string) =>
    api.get<BrandResponse>(`/brands/${id}`),

  createBrand: (data: FormData) =>
    api.post<BrandResponse>('/brands', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  updateBrand: (id: string, data: FormData) =>
    api.put<BrandResponse>(`/brands/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  deleteBrand: (id: string) =>
    api.delete(`/brands/${id}`),
}