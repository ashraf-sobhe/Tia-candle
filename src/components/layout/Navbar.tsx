'use client'

import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useLogout } from '@/lib/hooks/useAuth'
import { useCartStore } from '@/lib/store/cartStore'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Heart, User, LayoutDashboard, LogOut, Menu, X, Store } from 'lucide-react'

export default function Navbar() {
  const { user } = useAuthStore()
  const { mutate: logout, isPending } = useLogout()
  const { itemsCount } = useCartStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const pathname = usePathname()
  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)

  const authRoutes = ['/forgot-password', '/verify-code', '/reset-password']
  const isAuthPage = authRoutes.includes(pathname)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setUserDropdown(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current && !desktopDropdownRef.current.contains(e.target) &&
        mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)
      ) {
        setUserDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (isAuthPage) return null

 const UserDropdownContent = () => (
  <div
    className="w-48 rounded-xl overflow-hidden z-[999] shadow-xl"
    style={{
      backgroundColor: 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
    }}
  >
    {user ? (
      <>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-text-muted)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-primary-foreground)' }}>
            {user.name}
          </p>
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer"
          style={{ color: 'var(--color-primary-foreground)', opacity: 0.7 }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--color-text-muted)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <User size={16} />
          <span>الملف الشخصي</span>
        </Link>
        {(user.role === 'admin' || user.role === 'manager') && (
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer"
            style={{ color: 'var(--color-primary-foreground)', opacity: 0.7 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--color-text-muted)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <LayoutDashboard size={16} />
            <span>لوحة التحكم</span>
          </Link>
        )}
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer"
          style={{ color: 'var(--color-primary-foreground)', opacity: 0.7 }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--color-text-muted)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <LogOut size={16} />
          <span>{isPending ? '...' : 'تسجيل الخروج'}</span>
        </button>
      </>
    ) : (
      <>
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer"
          style={{ color: 'var(--color-primary-foreground)', opacity: 0.7 }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--color-text-muted)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <User size={16} />
          <span>تسجيل الدخول</span>
        </Link>
        <Link
          href="/register"
          className="flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer"
          style={{ color: 'var(--color-primary-foreground)', opacity: 0.7 }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'var(--color-text-muted)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <Store size={16} />
          <span>إنشاء حساب</span>
        </Link>
      </>
    )}
  </div>
)
  return (
    <nav className={`sticky top-0 z-[100] w-full border-b border-[--color-border] bg-[--color-background] transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        <div className="hidden md:flex items-center justify-between h-16">
          <Link href="/" className="text-lg font-bold tracking-widest uppercase text-[--color-text]">
            Tia candle
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/products" className="text-base font-medium text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">المنتجات</Link>
            <Link href="/about" className="text-base font-medium text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">من نحن</Link>
            <Link href="/contact" className="text-base font-medium text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">تواصل معنا</Link>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/cart" className="relative text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">
              <ShoppingCart size={22} />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                  {itemsCount}
                </span>
              )}
            </Link>

            <Link href="/wishlist" className="text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">
              <Heart size={22} />
            </Link>

            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer"
              >
                <User size={22} />
              </button>
              {userDropdown && (
                <div className="absolute left-0 mt-3">
                  <UserDropdownContent />
                </div>
              )}
            </div>
          </div>
        </div>

        
        <div className="flex md:hidden items-center justify-between h-16">

          
          <Link href="/" className="text-lg font-bold tracking-widest uppercase text-[--color-text]">
            Tia candle
          </Link>

          
          <div className="flex items-center gap-5">
            <Link href="/cart" className="relative text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">
              <ShoppingCart size={22} />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
                  {itemsCount}
                </span>
              )}
            </Link>

            <Link href="/wishlist" className="text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer">
              <Heart size={22} />
            </Link>

            
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => { setUserDropdown(!userDropdown); setMenuOpen(false) }}
                className="text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer"
              >
                <User size={22} />
              </button>
              {userDropdown && (
                <div className="absolute left-0 mt-3">
                  <UserDropdownContent />
                </div>
              )}
            </div>
          </div>

          
          <button
            onClick={() => { setMenuOpen(!menuOpen); setUserDropdown(false) }}
            className="text-[--color-text-muted] hover:text-[--color-text] transition-colors cursor-pointer"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden border-t border-[--color-border] bg-[--color-background]">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link href="/products" className="text-base font-medium text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">المنتجات</Link>
            <Link href="/about" className="text-base font-medium text-[--color-text-muted] hover:text-[--color-text] cursor-pointer"> من نحن</Link>
            <Link href="/contact" className="text-base font-medium text-[--color-text-muted] hover:text-[--color-text] cursor-pointer">تواصل معنا</Link>
          </div>
        </div>
      )}
    </nav>
  )
}