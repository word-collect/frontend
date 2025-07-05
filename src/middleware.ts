// src/middleware.ts
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Which routes need a valid session?
 * Keep this in one place so it’s easy to add/remove pages later.
 */
const PROTECTED = ['/collection', '/extract'] as const

export async function middleware(req: NextRequest) {
  const session = await auth()

  const wantsProtectedPage = PROTECTED.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  )

  // 🚫  No session + asking for a protected page → bounce to /login?from=/the/page
  if (!session && wantsProtectedPage) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search) // keep any ?q=foo search params
    return NextResponse.redirect(loginUrl)
  }

  // ✅  Either already authed *or* hitting a public route
  return NextResponse.next()
}

/**
 * Tell Next.js to run this middleware only on the
 * routes we care about (cheap & tidy).
 */
export const config = {
  matcher: ['/collection', '/extract']
}
