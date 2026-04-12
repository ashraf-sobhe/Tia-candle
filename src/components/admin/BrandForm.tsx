'use client'

import { useCreateBrand, useUpdateBrand } from '@/lib/hooks/useBrands'
import { Brand } from '@/lib/types/brand.types'
import { X } from 'lucide-react'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

interface BrandFormProps {
  brand?: Brand | null
  onClose: () => void
}

export default function BrandForm({ brand, onClose }: BrandFormProps) {
  const { mutate: createBrand, isPending: isCreating, isError: isCreateError, error: createError } = useCreateBrand()
  const { mutate: updateBrand, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateBrand()
  const [name, setName] = useState(brand?.name || '')
  const [image, setImage] = useState<File | null>(null)
  const [nameError, setNameError] = useState('')

  const isEdit = !!brand
  const isPending = isCreating || isUpdating
  const isError = isCreateError || isUpdateError
  const error = createError || updateError

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setNameError('اسم الماركة مطلوب')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    if (image) formData.append('image', image)

    if (isEdit) {
      updateBrand({ id: brand._id, data: formData }, { onSuccess: onClose })
    } else {
      createBrand(formData, { onSuccess: onClose })
    }
  }

  return (
    <div
      className="rounded-xl p-6 border space-y-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {isEdit ? 'تعديل الماركة' : 'إضافة ماركة جديدة'}
        </h2>
        <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      {isError && <ErrorMessage message={getErrorMessage(error)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="اسم الماركة"
          placeholder="Candle Co."
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setNameError('')
          }}
          error={nameError}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            صورة الماركة (اختياري)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 rounded-lg border outline-none"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text)',
            }}
          />
        </div>

        <div className="flex items-center gap-3 justify-end pt-2">
          <Button variant="outline" type="button" onClick={onClose} className="px-6 py-2">
            إلغاء
          </Button>
          <Button type="submit" isLoading={isPending} className="px-6 py-2">
            {isEdit ? 'حفظ التعديلات' : 'إضافة الماركة'}
          </Button>
        </div>
      </form>
    </div>
  )
}