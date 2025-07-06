// app/login/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { signIn } from 'next-auth/react'

function LoginInner() {
  const params = useSearchParams()
  // default to “/” if the param is missing or someone navigates to /login directly
  const from = params.get('from') ?? '/'

  useEffect(() => {
    /**
     * `callbackUrl` tells Next-Auth where to land after Cognito returns.
     * If the user typed /collection first, `from` === '/collection'.
     */
    signIn('cognito', { callbackUrl: from })
  }, [from])

  return <p>Redirecting to login…</p>
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  )
}
