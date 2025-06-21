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
                      className="h-9 w-9"
                    >
                      <a aria-label="Home" className="pointer-events-auto" href="/">
                        <Image
                          className="object-cover"
                          alt=""
                          width={36}
                          height={36}
                          src="/assets/avatar.png"
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
