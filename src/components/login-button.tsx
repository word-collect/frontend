'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

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

export default function AuthButtons() {
  const { data: sess, status } = useSession()
  if (status === 'loading') return null

  return sess ? (
    <button onClick={handleFullLogout}>Sign out</button>
  ) : (
    <>
      <button onClick={() => signIn('cognito')}>Sign in</button>
      <button onClick={() => signIn('cognito-signup')}>Sign up</button>
    </>
  )
}
