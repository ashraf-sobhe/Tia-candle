import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriesApi } from '../api/categories.api'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories().then(res => res.data),
  })
}

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getCategory(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useSubCategories = (categoryId: string) => {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => categoriesApi.getSubCategories(categoryId).then(res => res.data),
    enabled: !!categoryId,
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => categoriesApi.createCategory(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      categoriesApi.updateCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => categoriesApi.deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })
}

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: { name: string } }) =>
      categoriesApi.createSubCategory(categoryId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] }),
  })
}

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      categoriesApi.updateSubCategory(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] }),
  })
}

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => categoriesApi.deleteSubCategory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] }),
  })
}