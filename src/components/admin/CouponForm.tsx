'use client'

import { useCreateCoupon, useUpdateCoupon } from '@/lib/hooks/useCoupons'
import { Coupon } from '@/lib/types/coupon.types'
import { X } from 'lucide-react'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

interface CouponFormProps {
  coupon?: Coupon | null
  onClose: () => void
}

export default function CouponForm({ coupon, onClose }: CouponFormProps) {
  const { mutate: createCoupon, isPending: isCreating, isError: isCreateError, error: createError } = useCreateCoupon()
  const { mutate: updateCoupon, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateCoupon()

  const [name, setName] = useState(coupon?.name || '')
  const [discount, setDiscount] = useState(coupon?.discount?.toString() || '')
  const [expire, setExpire] = useState(coupon?.expire ? coupon.expire.split('T')[0] : '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEdit = !!coupon
  const isPending = isCreating || isUpdating
  const isError = isCreateError || isUpdateError
  const error = createError || updateError

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'كود الكوبون مطلوب'
    if (!discount) newErrors.discount = 'نسبة الخصم مطلوبة'
    if (Number(discount) < 1 || Number(discount) > 100) newErrors.discount = 'نسبة الخصم يجب أن تكون بين 1 و 100'
    if (!expire) newErrors.expire = 'تاريخ الانتهاء مطلوب'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const data = {
      name: name.toUpperCase(),
      discount: Number(discount),
       expire: new Date(expire).toISOString(),
    }

    if (isEdit) {
      updateCoupon({ id: coupon._id, data }, { onSuccess: onClose })
    } else {
      createCoupon(data, { onSuccess: onClose })
    }
  }

  return (
    <div
      className="rounded-xl p-6 border space-y-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {isEdit ? 'تعديل الكوبون' : 'إضافة كوبون جديد'}
        </h2>
        <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      {isError && <ErrorMessage message={getErrorMessage(error)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="كود الكوبون"
          placeholder="SUMMER20"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          error={errors.name}
        />
        <Input
          label="نسبة الخصم (%)"
          type="number"
          placeholder="20"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          error={errors.discount}
        />
        <Input
          label="تاريخ الانتهاء"
          type="date"
          value={expire}
          onChange={(e) => setExpire(e.target.value)}
          error={errors.expire}
        />

        <div className="flex items-center gap-3 justify-end pt-2">
          <Button variant="outline" type="button" onClick={onClose} className="px-6 py-2">
            إلغاء
          </Button>
          <Button type="submit" isLoading={isPending} className="px-6 py-2">
            {isEdit ? 'حفظ التعديلات' : 'إضافة الكوبون'}
          </Button>
        </div>
      </form>
    </div>
  )
}