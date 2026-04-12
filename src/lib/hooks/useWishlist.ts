import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistApi } from '../api/wishlist.api'

export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.getWishlist().then(res => res.data),
  })
}

export const useAddToWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.addToWishlist(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  })
}

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.removeFromWishlist(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  })
}