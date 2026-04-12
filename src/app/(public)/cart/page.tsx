'use client'

import { useCart, useRemoveCartItem, useUpdateCartItem, useClearCart, useApplyCoupon } from '@/lib/hooks/useCart'
import { useAuthStore } from '@/lib/store/authStore'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'
import { useState } from 'react'

export default function CartPage() {
  const { user } = useAuthStore()
  const { data, isLoading } = useCart()
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem()
  const { mutate: updateItem } = useUpdateCartItem()
  const { mutate: clearCart, isPending: isClearing } = useClearCart()
  const { mutate: applyCoupon, isPending: isApplying, isError: isCouponError, error: couponError } = useApplyCoupon()
  const [couponCode, setCouponCode] = useState('')

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag size={48} style={{ color: 'var(--color-text-muted)' }} />
        <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
          سجل دخولك لتتمكن من رؤية السلة
        </p>
        <Link href="/login">
          <Button className="px-8 py-3">تسجيل الدخول</Button>
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  const cart = data?.data.cart
  const isEmpty = !cart || cart.cartItems.length === 0

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag size={48} style={{ color: 'var(--color-text-muted)' }} />
        <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
          السلة فارغة
        </p>
        <Link href="/products">
          <Button className="px-8 py-3">تسوق الآن</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          السلة ({data?.numOfCartItems} منتج)
        </h1>
        <button
          onClick={() => clearCart()}
          disabled={isClearing}
          className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-error)' }}
        >
          <Trash2 size={14} />
          مسح السلة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

       
        <div className="lg:col-span-2 space-y-4">
          {cart.cartItems.map(item => (
            <div
              key={item._id}
              className="flex gap-4 p-4 rounded-xl border"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <Link href={`/products/${item.product._id}`}>
                  <h3 className="font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--color-text)' }}>
                    {item.product.title}
                  </h3>
                </Link>
                {item.color && (
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    اللون: {item.color}
                  </p>
                )}
                <p className="font-bold" style={{ color: 'var(--color-primary)' }}>
                  {item.price} ج.م
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateItem({ itemId: item._id, data: { quantity: item.quantity - 1 } })}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center font-bold disabled:opacity-50"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium" style={{ color: 'var(--color-text)' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateItem({ itemId: item._id, data: { quantity: item.quantity + 1 } })}
                      className="w-8 h-8 rounded-lg border flex items-center justify-center font-bold"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    disabled={isRemoving}
                    className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-error)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="space-y-4">
          <div
            className="rounded-xl p-6 border space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              ملخص الطلب
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--color-text-muted)' }}>المجموع</span>
                <span style={{ color: 'var(--color-text)' }}>{cart.totalCartPrice} ج.م</span>
              </div>
              {cart.isDiscountApplied && cart.totalPriceAfterDiscount && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-success)' }}>بعد الخصم</span>
                  <span className="font-bold" style={{ color: 'var(--color-success)' }}>
                    {cart.totalPriceAfterDiscount} ج.م
                  </span>
                </div>
              )}
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between font-bold">
                <span style={{ color: 'var(--color-text)' }}>الإجمالي</span>
                <span style={{ color: 'var(--color-primary)' }}>
                  {cart.totalPriceAfterDiscount ?? cart.totalCartPrice} ج.م
                </span>
              </div>
            </div>

            
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                كود الخصم
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="أدخل الكود"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-text)',
                  }}
                />
                <Button
                  onClick={() => applyCoupon({ couponName: couponCode })}
                  isLoading={isApplying}
                  className="px-4 py-2 text-sm"
                >
                  تطبيق
                </Button>
              </div>
              {isCouponError && <ErrorMessage message={getErrorMessage(couponError)} />}
            </div>

            <Link href="/checkout" className="block">
              <Button className="w-full py-3">
                إتمام الشراء
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}