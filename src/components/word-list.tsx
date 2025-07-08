'use client'
import { createWord, deleteWord, listWords, updateWord } from '@/lib/collection'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

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
    const word = prompt('new word')?.trim().toLowerCase()
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

  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = items[index]

    return (
      /* NOTE: apply react-window's positioning via the ‘style’ prop */
      <li style={style} key={item.word} className="py-5 gap-x-4 list-none">
        <div className="flex justify-between mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* everything inside here is identical to your old <li> */}
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm/6 font-semibold text-white-900 break-words">
                {item.word}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
              <p className="break-words">{item.notes || 'No notes'}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
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
                        await updateWord(item.word, n.toLowerCase()) // ➋ update
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
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center">
        <div className="flex w-full items-center justify-between mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="text-green-500">
            Collected: {items?.length || 0}
          </span>
          <button className="text-green-500 cursor-pointer" onClick={add}>
            ➕ Add
          </button>
        </div>
      </div>

      <div className="flex-1">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height} // full remaining height
              width={width} // full width
              itemCount={items.length}
              itemSize={90}
              style={{
                overflowX: 'hidden', // block X-axis scrolling
                WebkitOverflowScrolling: 'touch', // keep momentum scroll
                overscrollBehaviorX: 'contain' // stop the sideways rubber-band
              }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}
