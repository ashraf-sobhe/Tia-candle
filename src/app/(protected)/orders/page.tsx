'use client'

import { useMyOrders } from '@/lib/hooks/useOrders'
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'
import Button from '@/components/ui/Button'
import { ShoppingBag, ChevronLeft } from 'lucide-react'

export default function MyOrdersPage() {
  const { data, isLoading } = useMyOrders()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    )
  }

  const orders = data?.data.orders

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag size={48} style={{ color: 'var(--color-text-muted)' }} />
        <p className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>
          لا توجد طلبات
        </p>
        <Link href="/products">
          <Button className="px-8 py-3">تسوق الآن</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
        طلباتي
      </h1>

      {orders.map(order => (
        <div
          key={order._id}
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div
            className="px-6 py-4 flex items-center justify-between border-b"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="space-y-1">
              <p className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
                #{order._id.slice(-8)}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {new Date(order.createdAt).toLocaleDateString('ar-EG')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: order.isDelivered ? 'var(--color-success)' : 'var(--color-warning)',
                  color: '#fff'
                }}
              >
                {order.isDelivered ? 'تم التوصيل' : 'قيد التوصيل'}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: order.isPaid ? 'var(--color-success)' : 'var(--color-warning)',
                  color: '#fff'
                }}
              >
                {order.isPaid ? 'مدفوع' : 'غير مدفوع'}
              </span>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between">
            <p className="font-bold" style={{ color: 'var(--color-primary)' }}>
              {order.totalOrderPrice} ج.م
            </p>
            <Link href={`/orders/${order._id}`}>
              <button
                className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity"
                style={{ color: 'var(--color-primary)' }}
              >
                <span>التفاصيل</span>
                <ChevronLeft size={16} />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}