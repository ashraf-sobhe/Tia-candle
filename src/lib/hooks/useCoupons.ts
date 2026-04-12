import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { couponsApi } from '../api/coupons.api'
import { CreateCouponRequest } from '../types/coupon.types'

export const useCoupons = () => {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: () => couponsApi.getCoupons().then(res => res.data),
  })
}

export const useCreateCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCouponRequest) => couponsApi.createCoupon(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
  })
}

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCouponRequest> }) =>
      couponsApi.updateCoupon(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
  })
}

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => couponsApi.deleteCoupon(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
  })
}

export const useActivateCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => couponsApi.activateCoupon(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
  })
}

export const useDeactivateCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => couponsApi.deactivateCoupon(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['coupons'] }),
  })
}