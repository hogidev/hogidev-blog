'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

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
      <nav className={`pointer-events-auto ${isRoot ? 'block' : 'hidden md:block'}`}>
        <ul
          className="flex px-3 text-sm font-medium"
        >
          {navItems.map(({name, path}) => {
            const isActive = currentPath === path;
            return (
              <Link
                key={path}
                href={path}
                className={`relative block px-3 py-2 transition ${
                  isActive
                    ? 'text-teal-500 dark:text-teal-400'
                    : 'dark:hover:text-teal-400 hover:text-teal-500'
                }`}
              >
                {name}
              </Link>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}