'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { ClipLoader } from 'react-spinners'
import { createWord } from '@/lib/collection'

type Definition = {
  fl: string
  shortdef: string[]
  meta: { id: string }
}

function isEntryArray(data: unknown): data is Definition[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === 'object' &&
    data[0] !== null &&
    'meta' in data[0]
  )
}

export default function DictionaryTermPage() {
  const { term } = useParams<{ term: string }>()
  const router = useRouter()
  const [search, setSearch] = useState(term ? decodeURIComponent(term) : '')
  const [definitions, setDefinitions] = useState<Definition[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [saveButtonLoading, setSaveButtonLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  // fetch whenever `term` changes or on first mount
  useEffect(() => {
    async function fetchDefs() {
      if (!term) return
      setLoading(true)
      const resp = await fetch(`/api/dictionary?q=${term}`)
      const raw: Definition[] | string[] = await resp.json()
      console.log('RAWDICT', raw)
      if (isEntryArray(raw) && raw.length) {
        setDefinitions(raw.filter((d) => d.shortdef.length))
      } else {
        setDefinitions([])
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
    if (next) router.push(`/dictionary/${encodeURIComponent(next)}`)
  }

  async function handleSave() {
    if (!search) return
    if (!definitions.length) return
    setSaveButtonLoading(true)
    await createWord(search)
    setSaveButtonLoading(false)
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
                router.push(`/dictionary/${encodeURIComponent(suggestion)}`)
              }}
            >
              {suggestion}
            </span>
          ))}
        </div>
      </div>
    )
  } else if (definitions.length) {
    result = (
      <ol className="mt-4 text-white list-decimal list-inside pb-32 pt-8">
        {definitions.map((def) => (
          <li key={def.meta.id}>
            <span className="font-bold">{def.fl}</span>
            <ul className="list-disc pl-3 list-outside ml-4">
              {def.shortdef.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
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
              if (definitions.length) {
                setDefinitions([])
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
        <button
          type="button"
          disabled={saveButtonLoading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-16"
          onClick={handleSave}
        >
          {saveButtonLoading ? (
            <ClipLoader color={'#22C55E'} size={12} />
          ) : (
            <span>Save</span>
          )}
        </button>
      </form>

      {result}
    </section>
  )
}
