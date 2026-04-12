import api from './axios'
import { CouponsResponse, CouponResponse, CreateCouponRequest } from '../types/coupon.types'

export const couponsApi = {
  getCoupons: () =>
    api.get<CouponsResponse>('/coupons'),

  getCoupon: (id: string) =>
    api.get<CouponResponse>(`/coupons/${id}`),

  createCoupon: (data: CreateCouponRequest) =>
    api.post<CouponResponse>('/coupons', data),

  updateCoupon: (id: string, data: Partial<CreateCouponRequest>) =>
    api.put<CouponResponse>(`/coupons/${id}`, data),

  deleteCoupon: (id: string) =>
    api.delete(`/coupons/${id}`),

  activateCoupon: (id: string) =>
    api.patch(`/coupons/activate/${id}`),

  deactivateCoupon: (id: string) =>
    api.patch(`/coupons/deactivate/${id}`),
}