import Image from 'next/image'
import Link from 'next/link'

const contactInfo = [
  { label: 'تليفون', value: '01000000000', href: 'tel:01000000000' },
  { label: 'إيميل', value: 'hello@candles.com', href: 'mailto:hello@candles.com' },
  { label: 'العنوان', value: 'القاهرة، مصر', href: null },
]

const socials = [
  {
    name: 'واتساب',
    href: 'https://wa.me/201000000000',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.856L.057 23.215a.75.75 0 0 0 .916.927l5.556-1.507A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.355l-.355-.211-3.668.995.963-3.574-.232-.368A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>
    ),
  },
  {
    name: 'إنستجرام',
    href: 'https://instagram.com/yourpage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'فيسبوك',
    href: 'https://facebook.com/yourpage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'تيك توك',
    href: 'https://tiktok.com/@yourpage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }} dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-black tracking-widest uppercase" style={{ color: 'var(--color-text)' }}>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>تواصل </span>معنا
            <span className="inline-block w-12 h-px align-middle mr-3" style={{ backgroundColor: 'var(--color-text)' }} />
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
              <Image src="/hero2.png" alt="تواصل معنا" fill className="object-cover" />
            </div>
          </div>

          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>بيانات التواصل</h2>
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-sm w-16 shrink-0" style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                    <span className="w-px h-4" style={{ backgroundColor: 'var(--color-border)' }} />
                    {item.href ? (
                      <a href={item.href} className="text-sm hover:underline" style={{ color: 'var(--color-text)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--color-text)' }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>تابعنا على</h2>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border border-[var(--color-border)] text-[var(--color-text)] bg-[var(--color-surface)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:border-[var(--color-primary)]"
                  >
                    {s.icon}
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}