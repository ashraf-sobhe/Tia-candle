import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'متجر إلكتروني',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.variable} suppressHydrationWarning>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}