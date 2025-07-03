// app/(public)/signup/page.tsx      -- App Router example
'use client'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'

export default function RedirectToSignup() {
  useEffect(() => {
    signIn('cognito')
  }, [])
  return <p>Redirecting to sign-up…</p>
}
