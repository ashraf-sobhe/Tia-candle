import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/profile', '/orders', '/wishlist', '/reviews']
const adminRoutes = ['/dashboard']
const authRoutes = ['/login', '/register', '/forgot-password', '/verify-code', '/reset-password']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
    || request.headers.get('authorization')?.split(' ')[1]

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAdminRoute && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}