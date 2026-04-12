'use client'

import { useOrders } from '@/lib/hooks/useOrders'
import { useProducts } from '@/lib/hooks/useProducts'
import { useUsers } from '@/lib/hooks/useUsers'
import { useCategories } from '@/lib/hooks/useCategories'
import { Package, ShoppingBag, Users, Tag } from 'lucide-react'
import Spinner from '@/components/ui/Spinner'

interface StatCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  isLoading: boolean
}

function StatCard({ label, value, icon, isLoading }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-6 flex items-center gap-4"
      style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
    >
      <div
        className="p-3 rounded-lg"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{value}</p>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { data: orders, isLoading: ordersLoading } = useOrders({ limit: 99999 })
  const { data: products, isLoading: productsLoading } = useProducts({ limit: 99999 })
  const { data: users, isLoading: usersLoading } = useUsers({ limit: 99999 })
  const { data: categories, isLoading: categoriesLoading } = useCategories({ limit: 99999 })

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
        مرحباً، <span style={{ color: 'var(--color-primary)' }}>لوحة التحكم</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="المنتجات"
          value={products?.meta?.totalResults ?? products?.data?.products?.length ?? 0}
          icon={<Package size={22} />}
          isLoading={productsLoading}
        />
        <StatCard
          label="الطلبات"
          value={orders?.meta?.totalResults ?? orders?.data?.orders?.length ?? 0}
          icon={<ShoppingBag size={22} />}
          isLoading={ordersLoading}
        />
        <StatCard
          label="المستخدمين"
          value={users?.meta?.totalResults ?? users?.data?.users?.length ?? 0}
          icon={<Users size={22} />}
          isLoading={usersLoading}
        />
        <StatCard
          label="الفئات"
          value={categories?.meta?.totalResults ?? categories?.data?.categories?.length ?? 0}
          icon={<Tag size={22} />}
          isLoading={categoriesLoading}
        />
      </div>
    </div>
  )
}