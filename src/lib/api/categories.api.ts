import api from './axios'
import { CategoriesResponse, CategoryResponse, SubCategoriesResponse, SubCategoryResponse } from '../types/category.types'

export const categoriesApi = {
  getCategories: () =>
    api.get<CategoriesResponse>('/categories'),

  getCategory: (id: string) =>
    api.get<CategoryResponse>(`/categories/${id}`),

  createCategory: (data: FormData) =>
    api.post<CategoryResponse>('/categories', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  updateCategory: (id: string, data: FormData) =>
    api.put<CategoryResponse>(`/categories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  deleteCategory: (id: string) =>
    api.delete(`/categories/${id}`),

  getSubCategories: (categoryId: string) =>
    api.get<SubCategoriesResponse>(`/categories/${categoryId}/subcategories`),

  getSubCategory: (id: string) =>
    api.get<SubCategoryResponse>(`/subcategories/${id}`),

  createSubCategory: (categoryId: string, data: { name: string }) =>
    api.post<SubCategoryResponse>(`/categories/${categoryId}/subcategories`, data),

  updateSubCategory: (id: string, data: { name: string }) =>
    api.put<SubCategoryResponse>(`/subcategories/${id}`, data),

  deleteSubCategory: (id: string) =>
    api.delete(`/subcategories/${id}`),
}