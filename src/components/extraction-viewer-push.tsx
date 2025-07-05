'use client'

import { useState } from 'react'
import { useAnalysisSocket } from '@/hooks/use-analysis-socket'

/**
 * Displays the Bedrock analysis result in real time.
 * – Connects to the notification-service WebSocket.
 * – Shows a “waiting” placeholder until the message for this uploadId arrives.
 *
 * NOTE: If the user refreshes the page *after* the analysis has already
 * finished, no text will show (because there’s no polling fallback).
 */
export default function ExtractionViewerPush({
  uploadId
}: {
  uploadId: string
}) {
  const [text, setText] = useState<string | null>(null)

  // Opens the socket and updates state once we receive { s3Key, result }
  const latest = useAnalysisSocket(uploadId, setText)

  if (!text) {
    return (
      <p className="animate-pulse text-gray-500">
        Waiting for analysis&hellip;
      </p>
    )
  }

  // const splitText = text.split(',')

  return (
    <div>
      {text}
      {/* {splitText.map((item) => (
        <li key={item} className="text-white-500">
          {item}
        </li>
      ))} */}
    </div>
  )
}
