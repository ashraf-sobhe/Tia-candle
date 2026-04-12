'use client'

import { useWishlist, useRemoveFromWishlist } from '@/lib/hooks/useWishlist'
import { useAddToCart } from '@/lib/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'

export default function WishlistPage() {
  const { data, isLoading } = useWishlist()
  const { mutate: removeFromWishlist, isPending: isRemoving } = useRemoveFromWishlist()
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  const wishlist = data?.data.wishlist

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Heart size={48} style={{ color: 'var(--color-text-muted)' }} />
        <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
          قائمة المفضلة فارغة
        </p>
        <Link href="/products">
          <Button className="px-8 py-3">تصفح المنتجات</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
        المفضلة ({wishlist.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <div
            key={product._id}
            className="rounded-xl border overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <Link href={`/products/${product._id}`}>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            <div className="p-4 space-y-3">
              <Link href={`/products/${product._id}`}>
                <h3
                  className="font-medium line-clamp-2 hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text)' }}
                >
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-center gap-2">
                {product.priceAfterDiscount ? (
                  <>
                    <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                      {product.priceAfterDiscount} ج.م
                    </span>
                    <span className="text-sm line-through" style={{ color: 'var(--color-text-muted)' }}>
                      {product.price} ج.م
                    </span>
                  </>
                ) : (
                  <span className="font-bold" style={{ color: 'var(--color-text)' }}>
                    {product.price} ج.م
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => addToCart({ productId: product._id })}
                  isLoading={isAddingToCart}
                  className="flex-1 py-2 text-sm flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  أضف للسلة
                </Button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  disabled={isRemoving}
                  className="p-2 rounded-lg border hover:opacity-70 transition-opacity"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-error)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}