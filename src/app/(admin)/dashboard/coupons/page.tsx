'use client'

import { useState } from 'react'
import { useCoupons, useDeleteCoupon, useActivateCoupon, useDeactivateCoupon } from '@/lib/hooks/useCoupons'
import { Coupon } from '@/lib/types/coupon.types'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import CouponForm from '@/components/admin/CouponForm'

export default function AdminCouponsPage() {
  const { data, isLoading } = useCoupons()
  const { mutate: deleteCoupon, isPending: isDeleting } = useDeleteCoupon()
  const { mutate: activateCoupon } = useActivateCoupon()
  const { mutate: deactivateCoupon } = useDeactivateCoupon()
  const [showForm, setShowForm] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setShowForm(true)
  }

  const handleAdd = () => {
    setSelectedCoupon(null)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setSelectedCoupon(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          الكوبونات
        </h1>
        <Button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2">
          <Plus size={18} />
          إضافة كوبون
        </Button>
      </div>

      {showForm && <CouponForm coupon={selectedCoupon} onClose={handleClose} />}

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[--color-border]">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--color-surface)' }}>
              <tr>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الكود</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الخصم</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>تاريخ الانتهاء</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الحالة</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.coupons.map((coupon, index) => (
                <tr
                  key={coupon._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)',
                    borderTop: '1px solid var(--color-border)'
                  }}
                >
                  <td className="px-4 py-3 font-bold font-mono" style={{ color: 'var(--color-text)' }}>
                    {coupon.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text)' }}>
                    {coupon.discount}%
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(coupon.expire).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: coupon.isActive ? 'var(--color-success)' : 'var(--color-error)',
                        color: '#fff'
                      }}
                    >
                      {coupon.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => coupon.isActive ? deactivateCoupon(coupon._id) : activateCoupon(coupon._id)}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: coupon.isActive ? 'var(--color-warning)' : 'var(--color-success)' }}
                        title={coupon.isActive ? 'تعطيل' : 'تفعيل'}
                      >
                        {coupon.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      </button>
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteCoupon(coupon._id)}
                        disabled={isDeleting}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--color-error)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}