'use client'

import { useEffect } from 'react'
import { useAnalysisSocket } from '@/hooks/use-analysis-socket'
import { EVENT_TYPES } from '@/constants'
import { useRouter } from 'next/navigation'

export default function ExtractionViewerPush({
  fileName
}: {
  fileName: string
}) {
  const router = useRouter()
  const latest = useAnalysisSocket()

  useEffect(() => {
    if (!latest) return
    if (latest.eventType === EVENT_TYPES.COLLECTION_UPDATED) {
      const timer = setTimeout(() => {
        router.push('/collection')
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [latest, router])

  let text = ''
  let progress = 0

  switch (latest?.eventType) {
    case EVENT_TYPES.UPLOAD_RECEIVED:
      text = 'Upload received'
      progress = 2
      break
    case EVENT_TYPES.ANALYSIS_STARTED:
      text = 'Classifying'
      progress = 3
      break
    case EVENT_TYPES.CLASSIFICATION_COMPLETED:
      text = `${latest.classification} detected. Extracting`
      progress = 4
      break
    case EVENT_TYPES.ANALYSIS_COMPLETED:
      text = 'Cleaning up'
      progress = 5
      break
    case EVENT_TYPES.ANALYSIS_READY:
      text = 'Updating collection'
      progress = 6
      break
    case EVENT_TYPES.COLLECTION_UPDATED:
      progress = 7
      text = `Saved ${latest.saved} words. Redirecting`
      break
    default:
      text = `Uploading ${fileName}`
      progress = 1
  }

  return (
    <div>
      <progress value={progress} max={7} className="w-full" />
      <p className="animate-pulse text-gray-500">{text}&hellip;</p>
    </div>
  )
}
