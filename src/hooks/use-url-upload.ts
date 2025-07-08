export const useUrlUpload = () => {
  const upload = async (pageUrl: string) => {
    const r = await fetch('/api/upload-from-url', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url: pageUrl })
    })
    if (!r.ok) throw new Error('Upload failed')
    const { key } = await r.json()
    return key // same output as file uploader
  }
  return { upload }
}
