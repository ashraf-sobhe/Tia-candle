import { Product } from './product.types'

export interface CartItem {
  _id: string
  product: Product
  quantity: number
  color: string
  price: number
}

export interface Cart {
  _id: string
  cartItems: CartItem[]
  totalCartPrice: number
  totalPriceAfterDiscount?: number
  isDiscountApplied: boolean
  user: string
  createdAt: string
  updatedAt: string
}

export interface CartResponse {
  status: 'success'
  numOfCartItems: number
  results: number
  data: {
    cart: Cart
  }
}

export interface AddToCartRequest {
  productId: string
  color?: string
}

export interface UpdateCartItemRequest {
  quantity: number
}

export interface ApplyCouponRequest {
  couponName: string
}