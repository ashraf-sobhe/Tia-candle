'use client'

import { useState } from 'react'
import { useBrands, useDeleteBrand } from '@/lib/hooks/useBrands'
import { Brand } from '@/lib/types/brand.types'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Image from 'next/image'
import BrandForm from '@/components/admin/BrandForm'

export default function AdminBrandsPage() {
  const { data, isLoading } = useBrands()
  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteBrand()
  const [showForm, setShowForm] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand)
    setShowForm(true)
  }

  const handleAdd = () => {
    setSelectedBrand(null)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setSelectedBrand(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          الماركات
        </h1>
        <Button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2">
          <Plus size={18} />
          إضافة ماركة
        </Button>
      </div>

      {showForm && <BrandForm brand={selectedBrand} onClose={handleClose} />}

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[--color-border]">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--color-surface)' }}>
              <tr>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الصورة</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الاسم</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.brands.map((brand, index) => (
                <tr
                  key={brand._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)',
                    borderTop: '1px solid var(--color-border)'
                  }}
                >
                  <td className="px-4 py-3">
                    {brand.image ? (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image src={brand.image} alt={brand.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: 'var(--color-border)' }} />
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>
                    {brand.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteBrand(brand._id)}
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