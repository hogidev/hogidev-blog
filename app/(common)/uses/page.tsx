export const metadata = {
  title: 'Uses',
  description: 'My uses',
}

interface UseItem {
  category: string;
  items: Array<string>
}

const uses: UseItem[] = [
  {
    category: 'Workstation',
    items: ['14” MacBook Pro, M1, 16GB RAM (2021)', 'Apple Magic Keyboard', 'Logitech M650', 'Dell P2723DE, 27 inch, 2K']
  },
  {
    category: 'Development tools',
    items: ['Jetbrains IDEs', 'Sublime Text 4', 'Warp']
  },
  {
    category: 'Design',
    items: ['Figma']
  },
  {
    category: 'Productivity',
    items: ['Notion', 'Microsoft apps']
  }
]

export default function Uses() {
  return (
    <>
      <header className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Software, gadgets I use and other things I recommend
        </h1>
      </header>
      <div className="mt-16">
        <div className="space-y-10">
          {
            uses.map(useItem => (
              // eslint-disable-next-line react/jsx-key
              <UsesItem item={useItem} />
            ))
          }
        </div>
      </div>
    </>
  )
}

function UsesItem({ item }: { item: UseItem }) {
  return (
    <section className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{item.category}</h2>
        <div className="md:col-span-3">
          <ul className="space-y-2">
            {item.items.map((name, index) => (
              <li key={index} className="group relative flex flex-col items-start">
                <h4 className="text-base tracking-tight text-zinc-800 dark:text-zinc-100">
                  {name}
                </h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}