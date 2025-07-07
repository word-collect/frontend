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
    if (latest === EVENT_TYPES.COLLECTION_UPDATED) {
      const timer = setTimeout(() => {
        router.push('/collection')
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [latest, router])

  let text = ''
  let progress = 0

  switch (latest) {
    case EVENT_TYPES.UPLOAD_RECEIVED:
      text = 'Upload received'
      progress = 2
      break
    case EVENT_TYPES.ANALYSIS_STARTED:
      text = 'Analyzing'
      progress = 3
      break
    case EVENT_TYPES.ANALYSIS_COMPLETED:
      text = 'Analysis complete'
      progress = 4
      break
    case EVENT_TYPES.ANALYSIS_READY:
      text = 'Extraction processed'
      progress = 5
      break
    case EVENT_TYPES.COLLECTION_UPDATED:
      progress = 6
      text = 'Collection updated. Redirecting'
      break
    default:
      text = `Uploading ${fileName}`
      progress = 1
  }

  return (
    <div>
      <progress value={progress} max={6} className="w-full" />
      <p className="animate-pulse text-gray-500">{text}&hellip;</p>
    </div>
  )
}
