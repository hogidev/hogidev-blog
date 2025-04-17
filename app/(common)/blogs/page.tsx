import BlogPosts from "@/components/posts";

export const metadata = {
  title: 'Blogs',
  description: 'Interesting articles',
}

export default function Page() {
  return (
    <>
      <header className="max-w-4xl">
        <h1
          className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
        >
          Writing on technologies, works, experiences, etc...
        </h1>
        <p
          className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
        >
          All of my long-form thoughts on programming, leadership, product design, and more.
        </p>
      </header>
      <div className="mt-16">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            <BlogPosts />
          </div>
        </div>
      </div>
    </>
  )
}