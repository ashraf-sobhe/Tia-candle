import Link from 'next/link'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'

const links = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'المنتجات', href: '/products' },
  { label: 'تواصل معنا', href: '/contact' },
]

const socials = [
  { icon: FaInstagram, href: 'https://instagram.com/yourpage', label: 'إنستجرام' },
  { icon: FaFacebook, href: 'https://facebook.com/yourpage', label: 'فيسبوك' },
  { icon: FaWhatsapp, href: 'https://wa.me/201000000000', label: 'واتساب' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }} dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--color-text)' }}>
              Tia candle<span style={{ color: 'var(--color-primary)' }}>.</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              شموع طبيعية مصنوعة بعناية، تُحوّل كل مكان إلى أجواء دافئة وساحرة تلمس الحواس.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--color-text)' }}>
              الصفحات
            </h3>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-200 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--color-text)' }}>
              تابعنا
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 border border-[var(--color-border)] text-[var(--color-text-muted)] bg-[var(--color-background)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:border-[var(--color-primary)]"
                >
                  <s.icon size={16} />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
        <p className="text-xs text-center tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
  © {new Date().getFullYear()} <span className="font-semibold">Tia Candle</span> — جميع الحقوق محفوظة
</p>
        </div>
      </div>
    </footer>
  )
}