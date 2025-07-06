'use client'
import { createWord, deleteWord, listWords, updateWord } from '@/lib/collection'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

export default function Example() {
  const [items, setItems] = useState<{ word: string; notes: string }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { status } = useSession()
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function init() {
      if (status === 'authenticated' && !initialized) {
        setLoading(true)
        const items = await listWords()
        if (items) setItems(items)
        setInitialized(true)
        setLoading(false)
      }
    }
    init()
  }, [status, initialized])

  async function add() {
    const word = prompt('new word')?.trim()
    if (!word) return
    setLoading(true)
    await createWord(word) // ➊ create
    setItems(await listWords())
    setLoading(false)
  }

  function handleDefine(term: string) {
    if (term) router.push(`/dictionary/${encodeURIComponent(term)}`)
  }

  function handleRelate(term: string) {
    if (term) router.push(`/thesaurus/${encodeURIComponent(term)}`)
  }

  if (loading)
    return (
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

  return (
    <div>
      <div className="h-16 flex flex-row items-center justify-between">
        <span className="text-green-500">Collected: {items?.length || 0}</span>
        <button className="text-green-500 cursor-pointer" onClick={add}>
          ➕ Add
        </button>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {items.map((item) => (
          <li
            key={item.word}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold text-white-900">
                  {item.word}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                <p className="whitespace-nowrap">{item.notes || 'No notes'}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <span
                className="cursor-pointer hidden rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                onClick={() => handleDefine(item.word)}
              >
                Define
              </span>
              <span
                className="cursor-pointer hidden rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                onClick={() => handleRelate(item.word)}
              >
                Relate
              </span>
              <Menu as="div" className="relative flex-none">
                <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                  <span className="absolute -inset-2.5" />
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <span
                      className="cursor-pointer block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      onClick={async () => {
                        const n = prompt('edit notes', item.notes) ?? item.notes
                        await updateWord(item.word, n) // ➋ update
                        setItems(await listWords())
                      }}
                    >
                      Edit
                    </span>
                  </MenuItem>
                  <MenuItem>
                    <span
                      className="cursor-pointer block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      onClick={async () => {
                        await deleteWord(item.word) // ➌ delete
                        setItems(await listWords())
                      }}
                    >
                      Delete
                    </span>
                  </MenuItem>
                  <MenuItem>
                    <span
                      className="cursor-pointer block sm:hidden px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      onClick={() => handleDefine(item.word)}
                    >
                      Define
                    </span>
                  </MenuItem>
                  <MenuItem>
                    <span
                      className="cursor-pointer block sm:hidden px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                      onClick={() => handleRelate(item.word)}
                    >
                      Relate
                    </span>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
