import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const word = req.nextUrl.searchParams.get('q')
  if (!word) return NextResponse.json({ error: 'Missing q' }, { status: 400 })

  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
    word
  )}?key=${process.env.DICTIONARY_API_KEY}`

  const mwResp = await fetch(url, { next: { revalidate: 60 } }) // cache 60 s
  const data = await mwResp.json()

  return NextResponse.json(data) // or strip to what the UI needs
}
