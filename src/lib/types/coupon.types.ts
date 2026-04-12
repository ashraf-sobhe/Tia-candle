export interface Coupon {
  _id: string
  name: string
  expire: string
  discount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CouponsResponse {
  status: 'success'
  results: number
  data: {
    coupons: Coupon[]
  }
}

export interface CouponResponse {
  status: 'success'
  data: {
    coupon: Coupon
  }
}

export interface CreateCouponRequest {
  name: string
  expire: string
  discount: number
}
export interface ApplyCouponRequest {
  couponName: string
}