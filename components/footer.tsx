'use client'

export default function Footer() {
  const currentDate = new Date();

  return (
    <footer className="mt-32 flex-none">
      <div className="sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="border-t border-zinc-300 sm:pt-4 sm:pb-8 pt-2 pb-4 dark:border-zinc-700/40">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                  <p className="text-sm text-zinc-600 dark:text-zinc-500">
                    © {currentDate.getUTCFullYear()} Giang Tran. Some rights reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
