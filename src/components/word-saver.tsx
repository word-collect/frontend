'use client'
import { listWords, createWord, updateWord, deleteWord } from '@/lib/collection'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function WordList() {
  const [items, setItems] = useState<{ word: string; notes: string }[]>([])
  const { status } = useSession()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && !initialized) {
      listWords().then(setItems)
      setInitialized(true)
    }
  }, [status, initialized])

  async function add() {
    const word = prompt('new word')?.trim()
    if (!word) return
    await createWord(word) // ➊ create
    setItems(await listWords())
  }

  return (
    <div className="p-4">
      <button onClick={add}>➕ Add</button>
      <ul className="mt-4 space-y-2">
        {items.map(({ word, notes }) => (
          <li key={word} className="flex gap-2 items-center">
            <span className="font-medium">{word}</span>
            <span className="text-sm text-gray-500 flex-1">{notes}</span>
            <button
              onClick={async () => {
                const n = prompt('edit notes', notes) ?? notes
                await updateWord(word, n) // ➋ update
                setItems(await listWords())
              }}
            >
              ✏️
            </button>
            <button
              onClick={async () => {
                await deleteWord(word) // ➌ delete
                setItems(await listWords())
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
