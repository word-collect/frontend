'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { ClipLoader } from 'react-spinners'

type Thesaurus = {
  fl: string
  shortdef: string[]
  meta: { id: string; syns: string[][]; ants: string[][] }
}

function isEntryArray(data: unknown): data is Thesaurus[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === 'object' &&
    data[0] !== null &&
    'meta' in data[0]
  )
}

export default function ThesaurusTermPage() {
  const { term } = useParams<{ term: string }>()
  const router = useRouter()

  /* ------------------------------------------------------------------
   * iOS Safari preserves the scroll position that was set while the
   * keyboard was visible on the search page.  As soon as we reach the
   * term-results page we reset the scroll so the search bar is visible.
   * ------------------------------------------------------------------*/
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, []) // run only on first mount

  const [search, setSearch] = useState(term ? decodeURIComponent(term) : '')
  const [thesaurus, setThesaurus] = useState<Thesaurus | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  // fetch whenever `term` changes or on first mount
  useEffect(() => {
    async function fetchDefs() {
      if (!term) return
      setLoading(true)
      const resp = await fetch(`/api/thesaurus?q=${term}`)
      const raw: Thesaurus[] | string[] = await resp.json()
      console.log('raw', raw)
      if (isEntryArray(raw) && raw.length) {
        setThesaurus(raw[0])
      } else {
        setThesaurus(null)
        setSuggestions(raw as string[])
        if (!raw.length) {
          setErrorText('No results found')
        }
      }
      setLoading(false)
    }
    fetchDefs()
  }, [term])

  // allow new searches directly from this page too
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = search.trim()
    if (next) router.push(`/thesaurus/${encodeURIComponent(next)}`)
  }

  let result

  if (loading) {
    result = (
      <div className="pt-16 flex justify-center items-center">
        <ClipLoader
          color={'#22C55E'}
          loading={loading}
          size={32}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  } else if (thesaurus) {
    let syns = [...new Set(thesaurus.meta.syns.flat())]
    let ants = [...new Set(thesaurus.meta.ants.flat())]
    result = (
      <div className="mt-4 text-white list-decimal list-inside pb-4 pt-8">
        <div className="mb-8">
          <h2 className="font-bold">Synonyms</h2>
          <div className="flex flex-wrap">
            {syns.map((syn) => (
              <span
                key={syn}
                className="underline mr-3 text-wrap text-green-500 cursor-pointer"
                onClick={() => {
                  router.push(`/dictionary/${encodeURIComponent(syn)}`)
                }}
              >
                {syn}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold">Antonyms</h2>
          <div className="flex flex-wrap">
            {ants.map((ant) => (
              <span
                key={ant}
                className="underline mr-3 text-wrap text-green-500 cursor-pointer"
                onClick={() => {
                  router.push(`/dictionary/${encodeURIComponent(ant)}`)
                }}
              >
                {ant}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  } else if (suggestions.length) {
    result = (
      <div className="text-white mt-8">
        <h2>No results found. Suggestions:</h2>
        <div className="flex flex-wrap">
          {suggestions.map((suggestion) => (
            <span
              key={suggestion}
              className="underline mr-3 text-wrap text-green-500 cursor-pointer"
              onClick={() => {
                router.push(`/thesaurus/${encodeURIComponent(suggestion)}`)
              }}
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    )
  } else if (errorText) {
    result = <div className="text-white mt-8">{errorText}</div>
  } else {
    result = ''
  }

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <div className="flex flex-1 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            value={search}
            onChange={(e) => {
              if (thesaurus) {
                setThesaurus(null)
              }
              if (suggestions.length) {
                setSuggestions([])
              }

              if (errorText) {
                setErrorText('')
              }
              setSearch(e.target.value)
            }}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Search
        </button>
      </form>

      {result}
    </section>
  )
}
