'use client'

import { useUploader } from '@/hooks/use-uploader'
import { useState, useCallback } from 'react'
import ExtractionViewerPush from './extraction-viewer-push'
import { DocumentTextIcon } from '@heroicons/react/20/solid'

export const Uploader = () => {
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const { upload } = useUploader()

  // upload helper reused by click-select *and* drag-drop
  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return
      setFileName(file.name)
      try {
        const id = await upload(file) // returns the S3 key
        setUploadId(id)
      } catch (err) {
        console.error(err)
        alert('Upload failed')
      }
    },
    [upload]
  )

  return (
    <>
      <div className="col-span-full">
        <div
          className="mt-2 flex justify-center rounded-lg border border-dashed
                     border-white/25 px-6 py-10 mb-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            void handleFile(e.dataTransfer.files?.[0])
          }}
        >
          <div className="text-center">
            <DocumentTextIcon
              aria-hidden="true"
              className="mx-auto size-12 text-gray-500"
            />
            <div className="mt-4 flex text-sm/6 text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:outline-hidden hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs/5 text-gray-400">
              HTML, PDF, MD, TXT up to 10MB
            </p>
          </div>
        </div>
      </div>
      {/* {fileName && <p className="text-sm text-gray-500">{fileName}</p>} */}
      {/* ── Real-time viewer ────────────────────────────────────────── */}
      {fileName && (
        <section className="mt-4 w-full max-w-4xl">
          {/* <h2 className="font-medium mb-2">Extraction result</h2> */}
          <ExtractionViewerPush fileName={fileName} />
        </section>
      )}
    </>
  )
}
