import api from './axios'
import { WishlistResponse } from '../types/wishlist.types'

export const wishlistApi = {
  getWishlist: () =>
    api.get<WishlistResponse>('/wishlist'),

  addToWishlist: (productId: string) =>
    api.post<WishlistResponse>('/wishlist', { productId }),

  removeFromWishlist: (productId: string) =>
    api.delete<WishlistResponse>(`/wishlist/${productId}`),
}