import api from './axios'
import { ProductsResponse, ProductResponse, ProductsParams } from '../types/product.types'

export const productsApi = {

  getProducts: (params?: ProductsParams) =>
    api.get<ProductsResponse>('/products', { params }),

  getProduct: (id: string) =>
    api.get<ProductResponse>(`/products/${id}`),

  getTopProducts: () =>
    api.get<ProductsResponse>('/products/top-ten'),

  getLatestProducts: () =>
    api.get<ProductsResponse>('/products/latest'),

  getTopRatedProducts: () =>
    api.get<ProductsResponse>('/products/top-rated'),

  getRelatedProducts: (id: string) =>
    api.get<ProductsResponse>(`/products/${id}/related`),

  createProduct: (data: FormData) =>
    api.post<ProductResponse>('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  updateProduct: (id: string, data: FormData) =>
    api.put<ProductResponse>(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  deleteProduct: (id: string) =>
    api.delete(`/products/${id}`),
}