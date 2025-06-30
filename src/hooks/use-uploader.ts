export const useUploader = () => {
  const getUrl = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UPLOAD_SERVICE_URL}/upload-url`
    )
    if (!res.ok) throw new Error('Could not get upload URL')
    return res.json() as Promise<{ url: string; key: string }>
  }

  const upload = async (file: File) => {
    const { url, key } = await getUrl()
    await fetch(url, { method: 'PUT', body: file })
    return key // you can stash this if you need it later
  }

  return { upload }
}
