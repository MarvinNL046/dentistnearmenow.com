import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Log requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Request for: ${url.pathname}`)
  }

  // Block indexing of .vercel.app domain to prevent duplicate content
  // Google may try to index both dentistnearmenow.com and dentistnearmenow-com.vercel.app
  // This adds X-Robots-Tag header to tell search engines not to index the Vercel preview domain
  if (hostname.includes('.vercel.app')) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

// Configure which paths middleware should check
export const config = {
  matcher: [
    // Match all paths except static files (but include all pages for X-Robots-Tag on .vercel.app)
    '/((?!_next/static|_next/image|favicon.ico|cache).*)',
  ],
}
