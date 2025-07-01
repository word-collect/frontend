'use client'

import { useUploader } from '@/hooks/use-uploader'
import { useState } from 'react'
import ExtractionViewerPush from './extraction-viewer-push'

export const Uploader = () => {
  const [uploadId, setUploadId] = useState<string | null>(null)
  const { upload } = useUploader()
  return (
    <>
      <input
        id="file_input"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          try {
            const id = await upload(file) // <- returns the key
            setUploadId(id)
          } catch (err) {
            console.error(err)
            alert('Upload failed')
          }
        }}
      />
      {/* ── Real-time viewer ────────────────────────────────────────── */}
      {uploadId && (
        <section className="mt-4 w-full max-w-2xl">
          <h2 className="font-medium mb-2">Extraction result</h2>
          <ExtractionViewerPush uploadId={uploadId} />
        </section>
      )}
    </>
  )
}
