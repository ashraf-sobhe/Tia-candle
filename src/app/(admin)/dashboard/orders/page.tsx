'use client'

import { useOrders, useUpdateOrderToPaid, useUpdateOrderToDelivered } from '@/lib/hooks/useOrders'
import { CheckCircle, Truck } from 'lucide-react'
import Spinner from '@/components/ui/Spinner'

export default function AdminOrdersPage() {
  const { data, isLoading } = useOrders()
  const { mutate: markAsPaid, isPending: isPaying } = useUpdateOrderToPaid()
  const { mutate: markAsDelivered, isPending: isDelivering } = useUpdateOrderToDelivered()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
        الطلبات
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <>
         
          <div className="hidden md:block rounded-xl overflow-hidden border border-[--color-border]">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: 'var(--color-surface)' }}>
                <tr>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>رقم الطلب</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>المستخدم</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الإجمالي</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الدفع</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>التوصيل</th>
                  <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.orders.map((order, index) => (
                  <tr
                    key={order._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)',
                      borderTop: '1px solid var(--color-border)'
                    }}
                  >
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>{order._id.slice(-6)}</td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text)' }}>{order.user?.name}</td>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>{order.totalOrderPrice} ج.م</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: order.isPaid ? 'var(--color-success)' : 'var(--color-warning)', color: '#fff' }}>
                        {order.isPaid ? 'مدفوع' : 'غير مدفوع'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: order.isDelivered ? 'var(--color-success)' : 'var(--color-warning)', color: '#fff' }}>
                        {order.isDelivered ? 'تم التوصيل' : 'قيد التوصيل'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!order.isPaid && (
                          <button onClick={() => markAsPaid(order._id)} disabled={isPaying} className="p-2 rounded-lg hover:opacity-70 transition-opacity" style={{ color: 'var(--color-success)' }} title="تأكيد الدفع">
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {!order.isDelivered && (
                          <button onClick={() => markAsDelivered(order._id)} disabled={isDelivering} className="p-2 rounded-lg hover:opacity-70 transition-opacity" style={{ color: 'var(--color-primary)' }} title="تأكيد التوصيل">
                            <Truck size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          
          <div className="md:hidden space-y-3">
            {data?.data.orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl p-4 border space-y-3"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>#{order._id.slice(-6)}</span>
                  <span className="font-bold" style={{ color: 'var(--color-text)' }}>{order.totalOrderPrice} ج.م</span>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>{order.user?.name}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: order.isPaid ? 'var(--color-success)' : 'var(--color-warning)', color: '#fff' }}>
                    {order.isPaid ? 'مدفوع' : 'غير مدفوع'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: order.isDelivered ? 'var(--color-success)' : 'var(--color-warning)', color: '#fff' }}>
                    {order.isDelivered ? 'تم التوصيل' : 'قيد التوصيل'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!order.isPaid && (
                    <button onClick={() => markAsPaid(order._id)} disabled={isPaying} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs hover:opacity-70 transition-opacity border" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
                      <CheckCircle size={14} /> تأكيد الدفع
                    </button>
                  )}
                  {!order.isDelivered && (
                    <button onClick={() => markAsDelivered(order._id)} disabled={isDelivering} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs hover:opacity-70 transition-opacity border" style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                      <Truck size={14} /> تأكيد التوصيل
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}