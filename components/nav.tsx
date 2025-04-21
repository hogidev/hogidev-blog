'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";

const navItems = [
  {name: 'Blogs', path: '/blogs'},
  {name: 'About', path: '/about'},
  {name: 'Projects', path: '/projects'},
  {name: 'Uses', path: '/uses'},
];

export function Navbar({ isRoot }: { isRoot?: boolean }) {
  const currentPath = usePathname();

  return (
    <div>
      {!isRoot && (
        <div className="pointer-events-auto md:hidden">
          <Menu>
            <MenuButton
              className="border rounded-md w-6 h-6 flex items-center justify-center data-[open]:bg-zinc-300 dark:data-[open]:bg-zinc-700"
            >
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="flex flex-col w-52 origin-top-right rounded-xl border border-gray-500/30 dark:border-white/5 bg-white dark:bg-zinc-800 p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-amber-600"
            >
              {navItems.map(({name, path}) => {
                const isActive = currentPath === path;

                return (
                  <MenuItem key={path}>
                    <Link
                      href={path}
                      className={`w-full text-left rounded-lg py-1.5 px-3 ${
                        isActive
                          ? 'dark:bg-white/10 bg-zinc-300 dark:hover:bg-white/5 hover:bg-zinc-200'
                          : ''
                      }`}
                    >
                      {name}
                    </Link>
                  </MenuItem>
                )
              })}
            </MenuItems>
          </Menu>
        </div>
      )}
      <nav className={`pointer-events-auto ${isRoot ? 'block' : 'hidden md:block'}`}>
        <TabGroupCustom />
      </nav>
    </div>
  )
}

function TabGroupCustom() {
  const currentPath = usePathname();

  return (
    <div>
      <div className="flex gap-4" role="tablist" aria-orientation="horizontal">
        {navItems.map(({ name, path }) => {
          let dataAttrs = {};
          const pathSplit = currentPath.split('/')[1];
          if (`/${pathSplit}` === path) {
            dataAttrs = {
              ...dataAttrs,
              "data-selected": true
            };
          }
          return (
            <a
              key={path}
              className="rounded-full py-1 px-3 text-sm/6 font-semibold dark:data-[selected]:bg-white/10 dark:hover:bg-white/5 hover:bg-zinc-200 data-[selected]:bg-zinc-300"
              role="tab"
              type="button"
              href={path}
              {...dataAttrs}
            >
              {name}
            </a>
          )
        })}
      </div>
    </div>
  )
}