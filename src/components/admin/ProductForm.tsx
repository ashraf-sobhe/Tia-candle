'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, ProductFormData } from '@/lib/validations/product.schema'
import { useCreateProduct, useUpdateProduct } from '@/lib/hooks/useProducts'
import { useCategories } from '@/lib/hooks/useCategories'
import { useBrands } from '@/lib/hooks/useBrands'
import { Product } from '@/lib/types/product.types'
import { X } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const { data: categoriesData } = useCategories()
  const { data: brandsData } = useBrands()
  const { mutate: createProduct, isPending: isCreating, isError: isCreateError, error: createError } = useCreateProduct()
  const { mutate: updateProduct, isPending: isUpdating, isError: isUpdateError, error: updateError } = useUpdateProduct()
  const [imageCover, setImageCover] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])

  const isEdit = !!product
  const isPending = isCreating || isUpdating
  const isError = isCreateError || isUpdateError
  const error = createError || updateError

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      title: product.title,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      priceAfterDiscount: product.priceAfterDiscount,
      colors: product.colors,
      category: product.category._id,
      brand: product.brand?._id,
    } : {},
  })

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('quantity', String(data.quantity))
    formData.append('price', String(data.price))
    formData.append('category', data.category)
    if (data.priceAfterDiscount) formData.append('priceAfterDiscount', String(data.priceAfterDiscount))
    if (data.brand) formData.append('brand', data.brand)
    if (data.colors) data.colors.forEach(c => formData.append('colors[]', c))
    if (imageCover) formData.append('imageCover', imageCover)
    if (images.length > 0) images.forEach(img => formData.append('images', img))

    if (isEdit) {
      updateProduct({ id: product._id, data: formData }, { onSuccess: onClose })
    } else {
      createProduct(formData, { onSuccess: onClose })
    }
  }

  return (
    <div
      className="rounded-xl p-6 border space-y-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
        </h2>
        <button onClick={onClose} style={{ color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      {isError && <ErrorMessage message={getErrorMessage(error)} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="اسم المنتج"
            placeholder="شمعة الورد"
            error={errors.title?.message}
            {...register('title')}
          />
          <Input
            label="السعر"
            type="number"
            placeholder="100"
            error={errors.price?.message}
            {...register('price', { valueAsNumber: true })}
          />
          <Input
            label="الكمية"
            type="number"
            placeholder="10"
            error={errors.quantity?.message}
            {...register('quantity', { valueAsNumber: true })}
          />
          <Input
            label="السعر بعد الخصم (اختياري)"
            type="number"
            placeholder="80"
            error={errors.priceAfterDiscount?.message}
            {...register('priceAfterDiscount', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            الوصف
          </label>
          <textarea
            rows={3}
            placeholder="وصف المنتج..."
            className="w-full px-4 py-2 rounded-lg border outline-none transition-all duration-200 resize-none"
            style={{
              borderColor: errors.description ? 'var(--color-error)' : 'var(--color-border)',
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text)',
            }}
            {...register('description')}
          />
          {errors.description && (
            <span className="text-sm" style={{ color: 'var(--color-error)' }}>
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              الفئة
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border outline-none"
              style={{
                borderColor: errors.category ? 'var(--color-error)' : 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
              {...register('category')}
            >
              <option value="">اختر الفئة</option>
              {categoriesData?.data.categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-sm" style={{ color: 'var(--color-error)' }}>
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              الماركة (اختياري)
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border outline-none"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
              {...register('brand')}
            >
              <option value="">اختر الماركة</option>
              {brandsData?.data.brands.map(brand => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              صورة الغلاف
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageCover(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 rounded-lg border outline-none"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              صور إضافية (اختياري)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="w-full px-4 py-2 rounded-lg border outline-none"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pt-2">
          <Button variant="outline" type="button" onClick={onClose} className="px-6 py-2">
            إلغاء
          </Button>
          <Button type="submit" isLoading={isPending} className="px-6 py-2">
            {isEdit ? 'حفظ التعديلات' : 'إضافة المنتج'}
          </Button>
        </div>
      </form>
    </div>
  )
}