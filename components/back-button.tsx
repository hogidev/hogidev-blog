'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      aria-label="Go back to articles"
      className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full transition xl:-top-1.5 xl:left-0 xl:mt-0 bg-white/90 ring-1 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => {
        router.back()
      }}
    >
      <svg viewBox="0 0 16 16"
           fill="none"
           aria-hidden="true"
           className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
      >
        <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </button>
  )
}
