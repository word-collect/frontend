'use client'

import { useUploader } from '@/hooks/use-uploader'

export const Uploader = () => {
  const { upload } = useUploader()
  return (
    <>
      <input
        id="file_input"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) upload(file).then(() => alert('Done!'))
        }}
      />
    </>
  )
}
