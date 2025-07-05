'use client'

import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { EVENT_TYPES } from '@/constants'

/* --- helper to fetch once via SWR --- */
const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useAnalysisSocket() {
  /* 1️⃣  grab the wss:// URL from your API route  */
  const { data } = useSWR('/api/ws-url', fetcher) // { wsUrl }
  /* 2️⃣  get the ID-token from next-auth            */
  const { data: session } = useSession() // contains idToken
  const idToken = session?.id_token // undefined until sign-in

  const socketRef = useRef<WebSocket>(null) // check initial value
  const [latest, setLatest] = useState<string | null>(null)

  // (1) open the WebSocket when we have both wsUrl + uploadId
  useEffect(() => {
    if (!data?.wsUrl || !idToken) return

    if (socketRef.current && socketRef.current.readyState < WebSocket.CLOSING) {
      return
    }

    // append the token as ?token=…  (URL already includes wss://…/stage)
    const url =
      data.wsUrl +
      (data.wsUrl.includes('?') ? '&' : '?') +
      'token=' +
      encodeURIComponent(idToken)

    const ws = new WebSocket(url)
    socketRef.current = ws

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data) // { s3Key, result }
        const eventType = msg.eventType

        setLatest(eventType)

        if (eventType === EVENT_TYPES.COLLECTION_UPDATED) {
          ws.close(1000, 'done')
        }
      } catch {
        /* ignore malformed */
      }
    }

    ws.onclose = (evt) => {
      socketRef.current = null
      console.log('socket closed', evt.code, evt.reason)
    }

    return () => {
      ws.close()
      socketRef.current = null
    }
  }, [data?.wsUrl, idToken])

  return latest // null until message arrives
}
