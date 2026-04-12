import api from './axios'
import { CartResponse, AddToCartRequest, UpdateCartItemRequest, ApplyCouponRequest } from '../types/cart.types'

export const cartApi = {
  getCart: () =>
    api.get<CartResponse>('/cart'),

  addToCart: (data: AddToCartRequest) =>
    api.post<CartResponse>('/cart', data),

  updateCartItem: (itemId: string, data: UpdateCartItemRequest) =>
    api.put<CartResponse>(`/cart/${itemId}`, data),

  removeCartItem: (itemId: string) =>
    api.delete<CartResponse>(`/cart/${itemId}`),

  clearCart: () =>
    api.delete('/cart/clear'),

  applyCoupon: (data: ApplyCouponRequest) =>
    api.put<CartResponse>('/cart/apply-coupon', data),
}