import Image from "next/image";
import {ModeToggle} from "@/components/mode-toggle";
import {Navbar} from "@/components/nav";

export default function Header() {
  return (
    <header className="pointer-events-none relative z-50 flex flex-none flex-col">
      <div className="top-0 z-10 h-16 pt-6">
        <div className="sm:px-8 top-(--header-top,--spacing(6)) w-full">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="relative flex gap-4 items-center">
                  <div className="flex flex-1">
                    <div
                      className="h-10 w-10 rounded-full bg-zinc-400/90 p-0.5 ring-1 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
                    >
                      <a aria-label="Home" className="pointer-events-auto" href="/">
                        <Image
                          className="rounded-full object-cover h-9 w-9"
                          alt=""
                          width={36}
                          height={36}
                          src="/assets/avatar.JPG"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-end md:justify-center">
                    <Navbar/>
                  </div>
                  <div className="flex justify-end md:flex-1">
                    <div className="pointer-events-auto">
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
