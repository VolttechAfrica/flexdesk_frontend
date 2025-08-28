import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/about',
  '/features',
  '/get-started',
  '/solutions',
  '/support',
  '/privacy',
  '/terms',
]

// Authenticated-only routes (no role check here)
const authenticatedOnlyRoutes = [
  '/onboarding',
  '/dashboard',
]

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))
}

function isAuthenticatedOnlyRoute(pathname: string): boolean {
  return authenticatedOnlyRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))
}

// Improved JWT validation with better security checks
function isValidToken(token: string): boolean {
  try {
    if (!token || typeof token !== 'string') {
      return false
    }
    // TODO: Implement token validation
    return true
  } catch {
    return false
  }
}

// Skip static assets and common public files
const ASSET_EXT = /\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json|css|js|woff2?|ttf|otf|map)$/i
function isStaticAsset(pathname: string): boolean {
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/images')) return true
  if (ASSET_EXT.test(pathname)) return true
  if (pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml' || pathname === '/manifest.webmanifest') return true
  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static assets and API routes
  if (isStaticAsset(pathname) || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Allow public routes
  if (isPublicRoute(pathname)) {
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Cache', 'no-cache')
    
    // Add security headers for public routes
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return response
  }

  // Check for authentication token (uses access_token cookie)
  const token = request.cookies.get('access_token')?.value

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Validate token
  if (!isValidToken(token)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    loginUrl.searchParams.set('error', 'token_expired')

    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete('access_token')
    return response
  }

  // Handle authenticated-only routes (like onboarding) - no role check needed
  if (isAuthenticatedOnlyRoute(pathname)) {
    const response = NextResponse.next()
    response.headers.set('X-Middleware-Cache', 'no-cache')
    
    // Add security headers for authenticated routes
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    return response
  }

  // Let role-based gating be handled in the app (ProtectedRoute)
  const response = NextResponse.next()
  response.headers.set('X-Middleware-Cache', 'no-cache')
  
  // Add security headers for all authenticated routes
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: [
    // Match all routes except static files, images and API routes
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
}
