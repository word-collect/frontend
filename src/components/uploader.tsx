'use client'

import { useUploader } from '@/hooks/use-uploader'
import { useState, useCallback } from 'react'
import ExtractionViewerPush from './extraction-viewer-push'
import { DocumentTextIcon } from '@heroicons/react/20/solid'
import { useUrlUpload } from '@/hooks/use-url-upload'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export const Uploader = () => {
  const [fileName, setFileName] = useState<string | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)
  const [url, setUrl] = useState<string>('')
  const { upload } = useUploader()
  const { upload: uploadUrl } = useUrlUpload()

  // upload helper reused by click-select *and* drag-drop
  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return
      setFileName(file.name)
      try {
        await upload(file) // returns the S3 key
      } catch (err) {
        console.error(err)
        setFileName(null)
        alert('Upload failed')
      }
    },
    [upload]
  )

  const handleUrlUpload = useCallback(
    async (url: string) => {
      setFileName(url)
      try {
        await uploadUrl(url) // returns the S3 key
      } catch (err) {
        console.error(err)
        setFileName(null)
        alert('Upload failed')
      }
    },
    [uploadUrl]
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url) return
    if (fileName) return
    await handleUrlUpload(url.trim())
  }

  return (
    <>
      {/* ── Real-time viewer ────────────────────────────────────────── */}
      {fileName ? (
        <section className="mt-4 w-full max-w-4xl">
          {/* <h2 className="font-medium mb-2">Extraction result</h2> */}
          <ExtractionViewerPush fileName={fileName} />
        </section>
      ) : (
        <>
          <div className="col-span-full">
            <div
              className="flex justify-end items-center gap-1 mb-4 cursor-pointer"
              onClick={() => setHelpOpen(true)}
            >
              <span className="text-green-500">Help</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                color="var(--color-green-500)"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>

            <div
              className="mt-2 flex justify-center rounded-lg border border-dashed
                     border-white/25 px-6 py-10"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                if (fileName) return
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
                      disabled={!!fileName}
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
          <span className="separator py-10">Or</span>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
            <div className="flex flex-1 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                id="search"
                name="search"
                type="text"
                placeholder="Provide a URL"
                className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                autoCapitalize="none"
                suppressHydrationWarning
                value={url}
                disabled={!!fileName}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={!!fileName}
              className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </form>
        </>
      )}

      <Dialog
        open={helpOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setHelpOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Welcome to WordCollect!
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                If you've got a document with some words or phrases you'd like
                to extract, upload it here. Works great with Kindle annotations
                and text files of all kinds, whether they're structured lists of
                terms or straight-up prose.
              </p>
              <p className="mt-2 text-sm/6 text-white/50">
                You can also paste in a URL to a vocabulary list, an article, or
                to any site on earth. Give it a try. Google 'of mice and men
                vocabulary words' or 'sat words' or grab something completely
                random and full of jargon off of PubMed and see what happens.
              </p>
              <div className="mt-4">
                <button
                  className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setHelpOpen(false)}
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
