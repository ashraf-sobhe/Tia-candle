import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../api/cart.api'
import { useCartStore } from '../store/cartStore'
import { AddToCartRequest, UpdateCartItemRequest, ApplyCouponRequest } from '../types/cart.types'

export const useCart = () => {
  const { setCart } = useCartStore()
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await cartApi.getCart()
      setCart(res.data.data.cart._id, res.data.numOfCartItems)
      return res.data
    },
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  const { setCart } = useCartStore()
  return useMutation({
    mutationFn: (data: AddToCartRequest) => cartApi.addToCart(data),
    onSuccess: (res) => {
setCart(res.data.data.cart._id, res.data.results)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()
  const { setCart } = useCartStore()
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateCartItemRequest }) =>
      cartApi.updateCartItem(itemId, data),
    onSuccess: (res) => {
      setCart(res.data.data.cart._id, res.data.numOfCartItems)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()
  const { setCart } = useCartStore()
  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeCartItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()
  const { clearCart } = useCartStore()
  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      clearCart()
      queryClient.removeQueries({ queryKey: ['cart'] })
    },
  })
}

export const useApplyCoupon = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ApplyCouponRequest) => cartApi.applyCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}