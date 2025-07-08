'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 md:py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
            Project code is public on GitHub.{' '}
            <Link href="/" className="font-semibold text-white">
              <span aria-hidden="true" className="absolute inset-0" />
              View source <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Improve your vocab with AI
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            WordCollect helps you extract vocabulary words and phrases from
            files and stores them automatically so you can commit them to
            memory.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <span
              onClick={() =>
                signIn('cognito-signup', { callbackUrl: '/collection' })
              }
              className="cursor-pointer rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Get started
            </span>
            <Link href="/about" className="text-sm/6 font-semibold text-white">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-x-8 gap-y-10">
          <img
            alt="Step Functions"
            src="/Arch_AWS-Step-Functions_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="Lambda"
            src="/Arch_AWS-Lambda_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="Bedrock"
            src="/Arch_Amazon-Bedrock_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="Elastic Container Service"
            src="/Arch_Amazon-Elastic-Container-Service_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="EventBridge"
            src="/Arch_Amazon-EventBridge_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="Cognito"
            src="/Arch_Amazon-Cognito_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="DynamoDB"
            src="/Arch_Amazon-DynamoDB_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="Cloud Development Kit"
            src="/Arch_AWS-Cloud-Development-Kit_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          <img
            alt="Elastic Load Balancing"
            src="/Arch_Elastic-Load-Balancing_64.svg"
            // width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          />
          {/* <img
            alt="Simple Storage Service"
            src="/Arch_Amazon-Simple-Storage-Service_64.svg"
            width={48}
            height={48}
            className="max-h-12 w-10 sm:w-24"
          /> */}
        </div>
      </div>
    </div>
  )
}
