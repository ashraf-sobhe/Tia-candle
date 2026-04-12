'use client'

import { useCategories, useCreateSubCategory, useUpdateSubCategory } from '@/lib/hooks/useCategories'
import { SubCategory } from '@/lib/types/category.types'
import { X } from 'lucide-react'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

interface SubCategoryFormProps {
  subCategory?: SubCategory | null
  onClose: () => void
}

export default function SubCategoryForm({ subCategory, onClose }: SubCategoryFormProps) {
  const { data: categoriesData } = useCategories()
  const { mutate: createSubCategory, isPending: isCreating, isError: isCreateError, error: createError } = useCreateSubCategory()
  const { mutate: updateSubCategory, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateSubCategory()
  const [name, setName] = useState(subCategory?.name || '')
  const [categoryId, setCategoryId] = useState(subCategory?.category || '')
  const [nameError, setNameError] = useState('')
  const [categoryError, setCategoryError] = useState('')

  const isEdit = !!subCategory
  const isPending = isCreating || isUpdating
  const isError = isCreateError || isUpdateError
  const error = createError || updateError

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setNameError('اسم الفئة الفرعية مطلوب')
      return
    }
    if (!categoryId) {
      setCategoryError('الفئة الرئيسية مطلوبة')
      return
    }

    if (isEdit) {
      updateSubCategory(
        { id: subCategory._id, data: { name } },
        { onSuccess: onClose }
      )
    } else {
      createSubCategory(
        { categoryId, data: { name } },
        { onSuccess: onClose }
      )
    }
  }

  return (
    <div
      className="rounded-xl p-6 border space-y-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {isEdit ? 'تعديل الفئة الفرعية' : 'إضافة فئة فرعية جديدة'}
        </h2>
        <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      {isError && <ErrorMessage message={getErrorMessage(error)} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="اسم الفئة الفرعية"
          placeholder="شموع زهور"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setNameError('')
          }}
          error={nameError}
        />

        {!isEdit && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              الفئة الرئيسية
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border outline-none"
              style={{
                borderColor: categoryError ? 'var(--color-error)' : 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value)
                setCategoryError('')
              }}
            >
              <option value="">اختر الفئة</option>
              {categoriesData?.data.categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            {categoryError && (
              <span className="text-sm" style={{ color: 'var(--color-error)' }}>{categoryError}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 justify-end pt-2">
          <Button variant="outline" type="button" onClick={onClose} className="px-6 py-2">
            إلغاء
          </Button>
          <Button type="submit" isLoading={isPending} className="px-6 py-2">
            {isEdit ? 'حفظ التعديلات' : 'إضافة الفئة الفرعية'}
          </Button>
        </div>
      </form>
    </div>
  )
}