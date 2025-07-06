'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Architecture', href: '/architecture' },
  { name: 'About', href: '/about' },
  { name: 'Code', href: 'https://github.com/word-collect' }
]

const isActive = (pathname: string, href: string) => pathname === href

export default function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/bedrock-color.svg" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm/6 font-semibold ${
                isActive(pathname, item.href) ? 'text-green-500' : 'text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <span
            onClick={() => signIn('cognito', { callbackUrl: '/collection' })}
            className="text-sm/6 font-semibold text-white cursor-pointer"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/bedrock-color.svg" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                      isActive(pathname, item.href)
                        ? 'text-green-500'
                        : 'text-white'
                    } hover:bg-gray-800`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <span
                  onClick={() =>
                    signIn('cognito', { callbackUrl: '/collection' })
                  }
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                >
                  Log in
                </span>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
