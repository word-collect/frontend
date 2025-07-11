import { Uploader } from '@/components/uploader'
import { Suspense } from 'react'

export default function ExtractPage() {
  return (
    <section className="flex-1 mx-auto max-w-4xl px-2 sm:px-6 lg:px-8 pt-4 flex flex-col justify-center">
      <Suspense fallback={null}>
        <Uploader />
      </Suspense>
    </section>
  )
}
