import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { ProductsParams } from '../types/product.types'

export const useProducts = (params?: ProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getProducts(params).then(res => res.data),
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useTopProducts = () => {
  return useQuery({
    queryKey: ['products', 'top'],
    queryFn: () => productsApi.getTopProducts().then(res => res.data),
  })
}

export const useLatestProducts = () => {
  return useQuery({
    queryKey: ['products', 'latest'],
    queryFn: () => productsApi.getLatestProducts().then(res => res.data),
    
  })
}

export const useTopRatedProducts = () => {
  return useQuery({
    queryKey: ['products', 'top-rated'],
    queryFn: () => productsApi.getTopRatedProducts().then(res => res.data),
  })
}

export const useRelatedProducts = (id: string) => {
  return useQuery({
    queryKey: ['products', 'related', id],
    queryFn: () => productsApi.getRelatedProducts(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => productsApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      productsApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => productsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}