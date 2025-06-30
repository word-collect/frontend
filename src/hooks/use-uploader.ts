export const useUploader = () => {
  const getUrl = () => fetch('/api/upload-url').then((r) => r.json())
  const upload = async (file: File) => {
    const { url, key } = await getUrl()
    await fetch(url, { method: 'PUT', body: file })
    return key
  }
  return { upload }
}
