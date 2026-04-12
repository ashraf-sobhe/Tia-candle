import api from './axios'
import { ReviewsResponse, ReviewResponse, CreateReviewRequest } from '../types/review.types'

export const reviewsApi = {
  getProductReviews: (productId: string) =>
    api.get<ReviewsResponse>(`/products/${productId}/reviews`),

  createReview: (data: CreateReviewRequest) =>
    api.post<ReviewResponse>('/reviews', data),

  updateReview: (id: string, data: Partial<CreateReviewRequest>) =>
    api.put<ReviewResponse>(`/reviews/${id}`, data),

  deleteReview: (id: string) =>
    api.delete(`/reviews/${id}`),
}