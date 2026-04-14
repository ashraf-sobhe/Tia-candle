'use client'

import { useState } from 'react'
import { useProducts } from '@/lib/hooks/useProducts'
import { useCategories } from '@/lib/hooks/useCategories'
import { useBrands } from '@/lib/hooks/useBrands'
import { ProductsParams } from '@/lib/types/product.types'
import ProductCard from '@/components/product/ProductCard'
import Spinner from '@/components/ui/Spinner'
import { SlidersHorizontal, X } from 'lucide-react'

export default function ProductsPage() {
  const [params, setParams] = useState<ProductsParams>({
    page: 1,
    limit: 99999,
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data, isLoading } = useProducts(params)
  const { data: categoriesData } = useCategories()
  const { data: brandsData } = useBrands()

  const handleFilter = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value || undefined, page: 1 }))
  }

  const handleSort = (sort: string) => {
    setParams(prev => ({ ...prev, sort, page: 1 }))
  }

  const handleSearch = (keyword: string) => {
    setParams(prev => ({ ...prev, keyword: keyword || undefined, page: 1 }))
  }

  const handlePage = (page: number) => {
    setParams(prev => ({ ...prev, page }))
  }

  const clearFilters = () => {
    setParams({ page: 1, limit: 99999 })
  }

  const filterContent = (
    <div
      className="rounded-xl p-5 border space-y-5"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>الفلاتر</h2>
        <button
          onClick={() => { clearFilters(); setShowFilters(false) }}
          className="text-xs flex items-center gap-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X size={12} />
          مسح الكل
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>بحث</label>
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>ترتيب حسب</label>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
        >
          <option value="">الافتراضي</option>
          <option value="-createdAt">الأحدث</option>
          <option value="price">السعر: الأقل أولاً</option>
          <option value="-price">السعر: الأعلى أولاً</option>
          <option value="-ratingsAverage">الأعلى تقييماً</option>
          <option value="-sold">الأكثر مبيعاً</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>الفئة</label>
        <select
          onChange={(e) => handleFilter('category', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
        >
          <option value="">كل الفئات</option>
          {categoriesData?.data.categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>الماركة</label>
        <select
          onChange={(e) => handleFilter('brand', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
        >
          <option value="">كل الماركات</option>
          {brandsData?.data.brands.map(brand => (
            <option key={brand._id} value={brand._id}>{brand.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>نطاق السعر</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="من"
            onChange={(e) => handleFilter('price[gte]', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
          />
          <input
            type="number"
            placeholder="إلى"
            onChange={(e) => handleFilter('price[lte]', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {showFilters && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowFilters(false)}
        />
      )}

      {showFilters && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-base" style={{ color: 'var(--color-text)' }}>الفلاتر</span>
            <button onClick={() => setShowFilters(false)}>
              <X size={20} style={{ color: 'var(--color-text)' }} />
            </button>
          </div>
          {filterContent}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>المنتجات</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium md:hidden"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
        >
          <SlidersHorizontal size={16} />
          فلتر
        </button>
      </div>

      <div className="flex gap-6">

        <aside className="hidden md:block w-64 shrink-0">
          {filterContent}
        </aside>

        <div className="flex-1 space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : data?.data.products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <p className="text-lg font-medium" style={{ color: 'var(--color-text-muted)' }}>
                لا توجد منتجات
              </p>
              <button onClick={clearFilters} className="text-sm" style={{ color: 'var(--color-primary)' }}>
                مسح الفلاتر
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {data?.meta?.total} منتج
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.data.products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}