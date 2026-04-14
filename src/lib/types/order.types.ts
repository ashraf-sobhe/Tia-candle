import { Product } from './product.types'
import { User } from './auth.types'

export interface OrderItem {
  product: Product
  quantity: number
  color: string
  price: number
  _id: string
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
  postalCode: string
}

export interface Order {
  _id: string
  user: User
  cartItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethodType: 'cash' | 'card'
  totalOrderPrice: number
  isPaid: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
  createdAt: string
  updatedAt: string
}

export interface OrdersResponse {
  status: 'success'
  results: number
  paginationResult: {
    totalResults: number   
    currentPage: number
    limit: number
    numberOfPages: number
    totalPages: number     
    prevPage: number | null  
    nextPage: number | null  
  }
  data: {
    orders: Order[]
  }
}

export interface OrderResponse {
  status: 'success'
  data: {
    order: Order
  }
}