'use client'

import { useCart } from '@/lib/hooks/useCart'
import { useCartStore } from '@/lib/store/cartStore'
import { useAuthStore } from '@/lib/store/authStore'
import { ordersApi } from '@/lib/api/orders.api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutFormData } from '@/lib/validations/checkout.schema'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'
import { ShoppingBag, CreditCard, Banknote } from 'lucide-react'

export default function CheckoutPage() {
  const { user } = useAuthStore()
  const { cartId, clearCart } = useCartStore()
  const { data, isLoading } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
  })

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
          سجل دخولك أولاً
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
  if (!cart || cart.cartItems.length === 0) {
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

  const onSubmit = async (data: CheckoutFormData) => {
    if (!cartId) return
    setIsPending(true)
    setError('')

    try {
      if (paymentMethod === 'cash') {
        const res = await ordersApi.createCashOrder(cartId, {
          details: data.details,
          phone: data.phone,
          city: data.city,
          postalCode: data.postalCode,
        })
        clearCart()
        router.push(`/orders/${res.data.data.order._id}`)
      } else {
        const res = await ordersApi.getCheckoutSession(cartId)
        window.location.href = res.data.data.session.url
      }
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
        إتمام الشراء
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        <div className="lg:col-span-2 space-y-6">

          
          <div
            className="rounded-xl p-6 border space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              عنوان الشحن
            </h2>

            {error && <ErrorMessage message={error} />}

            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="العنوان بالتفصيل"
                placeholder="الشارع، المبنى، الشقة..."
                error={errors.details?.message}
                {...register('details')}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="رقم الهاتف"
                  placeholder="01xxxxxxxxx"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Input
                  label="المدينة"
                  placeholder="القاهرة"
                  error={errors.city?.message}
                  {...register('city')}
                />
              </div>
              <Input
                label="الرمز البريدي (اختياري)"
                placeholder="12345"
                error={errors.postalCode?.message}
                {...register('postalCode')}
              />
            </form>
          </div>

          
          <div
            className="rounded-xl p-6 border space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              طريقة الدفع
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('cash')}
                className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: paymentMethod === 'cash' ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: paymentMethod === 'cash' ? 'var(--color-primary)' : 'transparent',
                  color: paymentMethod === 'cash' ? 'var(--color-primary-foreground)' : 'var(--color-text)',
                }}
              >
                <Banknote size={20} />
                <span className="font-medium">الدفع عند الاستلام</span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all"
                style={{
                  borderColor: paymentMethod === 'card' ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: paymentMethod === 'card' ? 'var(--color-primary)' : 'transparent',
                  color: paymentMethod === 'card' ? 'var(--color-primary-foreground)' : 'var(--color-text)',
                }}
              >
                <CreditCard size={20} />
                <span className="font-medium">بطاقة ائتمان</span>
              </button>
            </div>
          </div>

        </div>

        
        <div className="space-y-4">
          <div
            className="rounded-xl p-6 border space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              ملخص الطلب
            </h2>

            <div className="space-y-3">
              {cart.cartItems.map(item => (
                <div key={item._id} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--color-text)' }}>
                      {item.product.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {item.quantity} × {item.price} ج.م
                    </p>
                  </div>
                  <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {item.quantity * item.price} ج.م
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--color-text-muted)' }}>المجموع</span>
                <span style={{ color: 'var(--color-text)' }}>{cart.totalCartPrice} ج.م</span>
              </div>
              {cart.isDiscountApplied && cart.totalPriceAfterDiscount && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-success)' }}>بعد الخصم</span>
                  <span style={{ color: 'var(--color-success)' }}>{cart.totalPriceAfterDiscount} ج.م</span>
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

            <Button
              type="submit"
              form="checkout-form"
              isLoading={isPending}
              className="w-full py-3"
            >
              {paymentMethod === 'cash' ? 'تأكيد الطلب' : 'الدفع بالبطاقة'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}