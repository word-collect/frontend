// app/(protected)/layout.tsx
import { auth } from '@/auth' // ← your export from auth.ts
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import Content from '@/components/content'
import Navbar from '@/components/navbar'

export default async function ProtectedLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await auth()

  // 1️⃣ no session? bounce them to the login page
  if (!session) redirect('/login') // keeps URL history clean

  // 2️⃣ you can read `session.user` here for role-based gating, etc.
  return (
    <main className="flex min-h-[100dvh] flex-col">
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <div className="flex flex-1 justify-center pt-16">{children}</div>
    </main>
  )
}
