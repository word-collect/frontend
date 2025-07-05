import { authedFetch } from '@/lib/auth-fetch'

export const runtime = 'nodejs'

export async function GET() {
  const upstream = process.env.UPLOAD_SERVICE_URL!
  const r = await authedFetch(`${upstream}/upload-url`, { cache: 'no-store' })
  return new Response(await r.text(), {
    status: r.status,
    headers: { 'content-type': 'application/json' }
  })
}
