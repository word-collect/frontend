import { authedFetch } from './auth-fetch'

const base = process.env.NEXT_PUBLIC_COLLECTION_SERVICE_URL!

export const listWords = () => authedFetch(base).then((r) => r.json())

export const createWord = (word: string, notes = '') =>
  authedFetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word, notes })
  })

export const updateWord = (word: string, notes = '') =>
  authedFetch(base, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word, notes })
  })

export const deleteWord = (word: string) =>
  authedFetch(base, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word })
  })
