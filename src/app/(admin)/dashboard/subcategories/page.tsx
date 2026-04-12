'use client'

import { useState } from 'react'
import { useCategories, useDeleteSubCategory } from '@/lib/hooks/useCategories'
import { SubCategory } from '@/lib/types/category.types'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import SubCategoryForm from '@/components/admin/SubCategoryForm'

export default function AdminSubCategoriesPage() {
  const { data: categoriesData, isLoading } = useCategories()
  const { mutate: deleteSubCategory, isPending: isDeleting } = useDeleteSubCategory()
  const [showForm, setShowForm] = useState(false)
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null)

  const handleEdit = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory)
    setShowForm(true)
  }

  const handleAdd = () => {
    setSelectedSubCategory(null)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setSelectedSubCategory(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
          الفئات الفرعية
        </h1>
        <Button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2">
          <Plus size={18} />
          إضافة فئة فرعية
        </Button>
      </div>

      {showForm && <SubCategoryForm subCategory={selectedSubCategory} onClose={handleClose} />}

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[--color-border]">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: 'var(--color-surface)' }}>
              <tr>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الاسم</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الفئة الرئيسية</th>
                <th className="text-right px-4 py-3 font-medium" style={{ color: 'var(--color-text-muted)' }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData?.data.categories.map((category) =>
                category.subCategories?.map((sub, index) => (
                  <tr
                    key={sub._id}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)',
                      borderTop: '1px solid var(--color-border)'
                    }}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>
                      {sub.name}
                    </td>
                    <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>
                      {category.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(sub)}
                          className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteSubCategory(sub._id)}
                          disabled={isDeleting}
                          className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                          style={{ color: 'var(--color-error)' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}