import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { brandsApi } from '../api/brands.api'

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => brandsApi.getBrands().then(res => res.data),
  })
}

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: ['brand', id],
    queryFn: () => brandsApi.getBrand(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useCreateBrand = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => brandsApi.createBrand(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  })
}

export const useUpdateBrand = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      brandsApi.updateBrand(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  })
}

export const useDeleteBrand = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => brandsApi.deleteBrand(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  })
}