import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewsApi } from '../api/reviews.api'
import { CreateReviewRequest } from '../types/review.types'

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewsApi.getProductReviews(productId).then(res => res.data),
    enabled: !!productId,
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewsApi.createReview(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.product] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.product] })
    },
  })
}

export const useUpdateReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateReviewRequest> }) =>
      reviewsApi.updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => reviewsApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}