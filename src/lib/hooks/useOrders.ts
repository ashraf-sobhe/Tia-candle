import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '../api/orders.api'

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getOrders().then(res => res.data),
  })
}

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['orders', 'me'],
    queryFn: () => ordersApi.getMyOrders().then(res => res.data),
  })
}

export const useMyOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getMyOrderById(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useUpdateOrderToPaid = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ordersApi.updateOrderToPaid(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  })
}

export const useUpdateOrderToDelivered = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ordersApi.updateOrderToDelivered(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  })
}