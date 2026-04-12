'use client'

import { useCreateCategory, useUpdateCategory } from '@/lib/hooks/useCategories'
import { Category } from '@/lib/types/category.types'
import { X } from 'lucide-react'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

interface CategoryFormProps {
  category?: Category | null
  onClose: () => void
}

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const { mutate: createCategory, isPending: isCreating, isError: isCreateError, error: createError } = useCreateCategory()
  const { mutate: updateCategory, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateCategory()
  const [name, setName] = useState(category?.name || '')
  const [image, setImage] = useState<File | null>(null)
  const [nameError, setNameError] = useState('')

  const isEdit = !!category
  const isPending = isCreating || isUpdating
  const isError = isCreateError || isUpdateError
  const error = createError || updateError

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setNameError('اسم الفئة مطلوب')
      return
    }
    if (name.trim().length < 3) {
      setNameError('اسم الفئة يجب أن يكون 3 أحرف على الأقل')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    if (image) formData.append('image', image)

    if (isEdit) {
      updateCategory({ id: category._id, data: formData }, { onSuccess: onClose })
    } else {
      createCategory(formData, { onSuccess: onClose })
    }
  }

  return (
    <div
      className="rounded-xl p-6 border space-y-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {isEdit ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
        </h2>
        <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      {isError && <ErrorMessage message={getErrorMessage(error)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="اسم الفئة"
          placeholder="شموع معطرة"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setNameError('')
          }}
          error={nameError}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            صورة الفئة (اختياري)
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
            {isEdit ? 'حفظ التعديلات' : 'إضافة الفئة'}
          </Button>
        </div>
      </form>
    </div>
  )
}