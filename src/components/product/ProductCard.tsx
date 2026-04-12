'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types/product.types'
import { useEffect, useRef, useState } from 'react'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <Link href={`/products/${product._id}`} className="group block">
        <div
          className="relative overflow-hidden rounded-xl bg-[--color-surface] aspect-square"
          style={{ transition: 'transform 0.15s ease' }}
          onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {product.imageCover ? (
  <Image
    src={product.imageCover}
    alt={product.title || 'منتج'}
    fill
    className="object-cover transition-transform duration-500 group-hover:scale-105"
  />
) : (
  <div className="w-full h-full bg-[--color-surface] flex items-center justify-center">
    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>لا توجد صورة</span>
  </div>
)}
          {product.priceAfterDiscount && (
            <span className="absolute top-3 right-3 bg-[--color-error] text-white text-xs font-bold px-2 py-1 rounded-lg">
              خصم
            </span>
          )}
          {product.quantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-medium">نفذت الكمية</span>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          {product.brand && (
            <p className="text-xs text-[--color-text-muted] uppercase tracking-wider">
              {product.brand.name}
            </p>
          )}
          <h3 className="text-sm font-medium text-[--color-text] line-clamp-2 group-hover:text-[--color-primary] transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-base font-bold text-[--color-primary]">
                  {product.priceAfterDiscount} ج.م
                </span>
                <span className="text-sm text-[--color-text-muted] line-through">
                  {product.price} ج.م
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-[--color-text]">
                {product.price} ج.م
              </span>
            )}
          </div>
          {product.ratingsAverage && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-xs text-[--color-text-muted]">
                {product.ratingsAverage.toFixed(1)} ({product.ratingQuantity})
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}