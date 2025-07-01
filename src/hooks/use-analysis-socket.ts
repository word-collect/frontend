'use client'

import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'

/* --- helper to fetch once via SWR --- */
const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useAnalysisSocket(
  uploadId: string | undefined, // the S3 key you care about
  onMessage?: (result: string) => void // optional side-effect
) {
  const { data } = useSWR('/api/ws-url', fetcher) // { wsUrl }
  const socketRef = useRef<WebSocket>(null) // check initial value
  const [latest, setLatest] = useState<string | null>(null)

  // (1) open the WebSocket when we have both wsUrl + uploadId
  useEffect(() => {
    if (!data?.wsUrl || !uploadId) return

    const ws = new WebSocket(data.wsUrl)
    socketRef.current = ws

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data) // { s3Key, result }
        if (msg.s3Key === uploadId) {
          setLatest(msg.result)
          onMessage?.(msg.result)
        }
      } catch {
        /* ignore malformed */
      }
    }

    return () => ws.close()
  }, [data?.wsUrl, uploadId])

  return latest // null until message arrives
}
