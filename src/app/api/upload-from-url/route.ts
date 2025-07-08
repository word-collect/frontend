import { authedFetch } from '@/lib/auth-fetch'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const upstream = process.env.UPLOAD_SERVICE_URL!
  const body = await req.text()
  const r = await authedFetch(`${upstream}/upload-from-url`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    cache: 'no-store'
  })
  return new Response(await r.text(), {
    status: r.status,
    headers: { 'content-type': 'application/json' }
  })
}
