import api from './axios'
import { OrdersResponse, OrderResponse } from '../types/order.types'

export const ordersApi = {
  getOrders: () =>
    api.get<OrdersResponse>('/orders'),

  getMyOrders: () =>
    api.get<OrdersResponse>('/orders/me'),

  getMyOrderById: (id: string) =>
    api.get<OrderResponse>(`/orders/me/${id}`),

  createCashOrder: (cartId: string, shippingAddress: object) =>
    api.post<OrderResponse>(`/orders/${cartId}`, { shippingAddress }),

  getCheckoutSession: (cartId: string) =>
    api.get(`/orders/checkout-session/${cartId}`),

  updateOrderToPaid: (id: string) =>
    api.put<OrderResponse>(`/orders/${id}/pay`),

  updateOrderToDelivered: (id: string) =>
    api.put<OrderResponse>(`/orders/${id}/deliver`),
}