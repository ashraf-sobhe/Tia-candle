'use client'

import { useParams } from 'next/navigation'
import { useProduct, useRelatedProducts } from '@/lib/hooks/useProducts'
import { useAddToCart } from '@/lib/hooks/useCart'
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/lib/hooks/useWishlist'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import { ShoppingCart, Heart, Star, ChevronRight } from 'lucide-react'
import ReviewSection from '@/components/product/ReviewSection'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data, isLoading } = useProduct(id as string)
  const { data: relatedData } = useRelatedProducts(id as string)
  const { data: wishlistData } = useWishlist()
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()
  const { mutate: addToWishlist } = useAddToWishlist()
  const { mutate: removeFromWishlist } = useRemoveFromWishlist()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = data?.data.product
  const isInWishlist = wishlistData?.data.wishlist.some(p => p._id === product?._id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!product) return null

  const images = [product.imageCover, ...(product.images || [])]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <Link href="/" className="hover:opacity-70">الرئيسية</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:opacity-70">المنتجات</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-text)' }}>{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
            <Image src={images[selectedImage]} alt={product.title} fill className="object-cover" />
            {product.priceAfterDiscount && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--color-error)', color: '#fff' }}>
                خصم
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all"
                  style={{ borderColor: selectedImage === index ? 'var(--color-primary)' : 'var(--color-border)' }}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {product.brand && (
            <p className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              {product.brand.name}
            </p>
          )}

          <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{product.title}</h1>

          {product.ratingsAverage && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= Math.round(product.ratingsAverage!) ? 'var(--color-warning)' : 'none'}
                    stroke={star <= Math.round(product.ratingsAverage!) ? 'var(--color-warning)' : 'var(--color-border)'}
                  />
                ))}
              </div>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                ({product.ratingQuantity} تقييم)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {product.priceAfterDiscount} ج.م
                </span>
                <span className="text-xl line-through" style={{ color: 'var(--color-text-muted)' }}>
                  {product.price} ج.م
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
                {product.price} ج.م
              </span>
            )}
          </div>

          <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {product.description}
          </p>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>الألوان</p>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <span key={color} className="px-3 py-1 rounded-full text-sm border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>الكمية</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-lg border flex items-center justify-center font-bold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>-</button>
              <span className="w-8 text-center font-medium" style={{ color: 'var(--color-text)' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))} className="w-9 h-9 rounded-lg border flex items-center justify-center font-bold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>+</button>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {product.quantity > 0 ? `${product.quantity} متاح` : 'نفذت الكمية'}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={() => addToCart({ productId: product._id })} isLoading={isAddingToCart} disabled={product.quantity === 0} className="flex-1 py-3 flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              أضف للسلة
            </Button>
            <button onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)} className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all" style={{ borderColor: 'var(--color-border)', color: isInWishlist ? 'var(--color-error)' : 'var(--color-text)' }}>
              <Heart size={20} fill={isInWishlist ? 'var(--color-error)' : 'none'} />
            </button>
          </div>

          <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: 'var(--color-surface)' }}>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>الفئة: <span style={{ color: 'var(--color-primary)' }}>{product.category?.name}</span></p>
            {product.brand && (
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>الماركة: <span style={{ color: 'var(--color-primary)' }}>{product.brand.name}</span></p>
            )}
          </div>
        </div>
      </div>

      {relatedData?.data.products && relatedData.data.products.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>منتجات مشابهة</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedData.data.products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}

      <ReviewSection productId={id as string} />
    </div>
  )
}