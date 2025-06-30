export const runtime = 'nodejs'

export async function GET() {
  const upstream = process.env.UPLOAD_SERVICE_URL!
  console.log('upstream', upstream)
  const r = await fetch(`${upstream}/upload-url`, { cache: 'no-store' })
  return new Response((await r.text()) + 'debug', {
    status: r.status,
    headers: { 'content-type': 'application/json' }
  })
}
