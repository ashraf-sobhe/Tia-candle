import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { settingsApi } from '../api/settings.api'

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => settingsApi.getSettings().then(res => res.data),
  })
}

export const useUpdateSettings = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { taxRate?: number; shippingPrice?: number }) =>
      settingsApi.updateSettings(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  })
}