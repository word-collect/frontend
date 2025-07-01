import { NextResponse } from 'next/server'
import { getWsEndpoint } from '@/lib/get-ws-endpoint'

export async function GET() {
  const wsUrl = await getWsEndpoint() // wss://…/prod
  return NextResponse.json({ wsUrl }, { status: 200 })
}
