'use client'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Tag,
  Layers,
  Award,
  ShoppingBag,
  Users,
  Ticket,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const sidebarLinks = [
  { href: '/dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'المنتجات', icon: Package },
  { href: '/dashboard/categories', label: 'الفئات', icon: Tag },
  { href: '/dashboard/subcategories', label: 'الفئات الفرعية', icon: Layers },
  { href: '/dashboard/brands', label: 'الماركات', icon: Award },
  { href: '/dashboard/orders', label: 'الطلبات', icon: ShoppingBag },
  { href: '/dashboard/users', label: 'المستخدمين', icon: Users },
  { href: '/dashboard/coupons', label: 'الكوبونات', icon: Ticket },
  { href: '/dashboard/settings', label: 'الإعدادات', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
      router.replace('/')
    }
  }, [user, router])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) return null

  const SidebarContent = () => (
    <>
      <div className="p-6 pt-20 lg:pt-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>لوحة التحكم</h2>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{user.name}</p>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? 'var(--color-primary-foreground)' : 'var(--color-text-muted)',
              }}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <LayoutDashboard size={18} />
          <span>العودة للموقع</span>
        </Link>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen" dir="rtl">

      
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      <aside
        className="fixed top-0 right-0 h-full w-64 z-30 flex flex-col transition-transform duration-300 lg:hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 p-2 rounded-lg"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X size={20} />
        </button>
        <SidebarContent />
      </aside>

      
      <aside
        className="hidden lg:flex w-64 flex-col flex-shrink-0"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
        }}
      >
        <SidebarContent />
      </aside>

     
      <main className="flex-1 min-w-0" style={{ backgroundColor: 'var(--color-background)' }}>

      
        <div
          className="lg:hidden flex items-center gap-4 px-4 py-3 border-b sticky top-0 z-10"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <Menu size={22} />
          </button>
          <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>لوحة التحكم</h2>
        </div>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}