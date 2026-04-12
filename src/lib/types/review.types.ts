import { User } from './auth.types'

export interface Review {
  _id: string
  title: string
  ratings: number
  user: User
  product: string
  createdAt: string
  updatedAt: string
}

export interface ReviewsResponse {
  status: 'success'
  meta: {
    currentPage: number
    limit: number
    numberOfPages: number
    total: number
  }
  data: {
    reviews: Review[]
  }
}

export interface ReviewResponse {
  status: 'success'
  data: {
    review: Review
  }
}

export interface CreateReviewRequest {
  title: string
  ratings: number
  product: string
}