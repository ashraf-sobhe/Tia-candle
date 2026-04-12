'use client'

import { useProductReviews, useCreateReview, useDeleteReview } from '@/lib/hooks/useReviews'
import { useAuthStore } from '@/lib/store/authStore'
import { useState } from 'react'
import { Star, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'
import Spinner from '@/components/ui/Spinner'

interface ReviewSectionProps {
  productId: string
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const { user } = useAuthStore()
  const { data, isLoading } = useProductReviews(productId)
  const { mutate: createReview, isPending: isCreating, isError, error } = useCreateReview()
  const { mutate: deleteReview } = useDeleteReview()

  const [title, setTitle] = useState('')
  const [ratings, setRatings] = useState(5)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [titleError, setTitleError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setTitleError('الرأي مطلوب')
      return
    }
    createReview(
      { title, ratings, product: productId },
      {
        onSuccess: () => {
          setTitle('')
          setRatings(5)
          setTitleError('')
        },
      }
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
        التقييمات والمراجعات
      </h2>

     
      {user?.role === 'user' && (
        <div
          className="rounded-xl p-6 border space-y-4"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
            اكتب مراجعتك
          </h3>

          {isError && <ErrorMessage message={getErrorMessage(error)} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                تقييمك
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatings(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    <Star
                      size={28}
                      fill={star <= (hoveredStar || ratings) ? 'var(--color-warning)' : 'none'}
                      stroke={star <= (hoveredStar || ratings) ? 'var(--color-warning)' : 'var(--color-border)'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                رأيك في المنتج
              </label>
              <textarea
                rows={3}
                placeholder="اكتب رأيك هنا..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  setTitleError('')
                }}
                className="w-full px-4 py-2 rounded-lg border outline-none resize-none"
                style={{
                  borderColor: titleError ? 'var(--color-error)' : 'var(--color-border)',
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text)',
                }}
              />
              {titleError && (
                <span className="text-sm" style={{ color: 'var(--color-error)' }}>{titleError}</span>
              )}
            </div>

            <Button type="submit" isLoading={isCreating} className="px-8 py-2">
              نشر المراجعة
            </Button>
          </form>
        </div>
      )}

      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : data?.data.reviews.length === 0 ? (
        <p className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
          لا توجد مراجعات بعد
        </p>
      ) : (
        <div className="space-y-4">
          {data?.data.reviews.map(review => (
            <div
              key={review._id}
              className="rounded-xl p-5 border space-y-3"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium" style={{ color: 'var(--color-text)' }}>
                    {review.user?.name}
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= review.ratings ? 'var(--color-warning)' : 'none'}
                        stroke={star <= review.ratings ? 'var(--color-warning)' : 'var(--color-border)'}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(review.createdAt).toLocaleDateString('ar-EG')}
                  </p>
                  {(user?._id === review.user?._id || user?.role === 'admin' || user?.role === 'manager') && (
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="p-1 hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-error)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {review.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}