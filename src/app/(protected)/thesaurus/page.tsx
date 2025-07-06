'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ThesaurusSearchPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const term = search.trim()
    if (term) router.push(`/thesaurus/${encodeURIComponent(term)}`)
  }

  return (
    <section className="flex h-full flex-1 items-center justify-center">
      <div className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
          <div className="flex flex-1 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search"
              className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  )
}
