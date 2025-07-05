// app/login/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { signIn, signOut } from 'next-auth/react'

async function handleFullLogout() {
  // 1  Clear NextAuth’s session cookie (no browser redirect)
  await signOut({ redirect: false })

  // 2  Send the browser to Cognito’s logout endpoint
  const logoutUrl =
    `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout` +
    `?client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}` +
    `&logout_uri=${encodeURIComponent(window.location.origin)}`

  window.location.href = logoutUrl
}

export default function RedirectToLogin() {
  useEffect(() => {
    /**
     * `callbackUrl` tells Next-Auth where to land after Cognito returns.
     * If the user typed /collection first, `from` === '/collection'.
     */
    handleFullLogout()
  }, [])

  return (
    <section className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
      <p>Logging out...</p>
    </section>
  )
}
