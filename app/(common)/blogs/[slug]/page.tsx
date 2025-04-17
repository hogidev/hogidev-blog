import {formatDate, getBlogPosts} from "@/utils/blog";
import {notFound} from "next/navigation";
import BackButton from "@/components/back-button";
import {CustomMDX} from "@/components/mdx";

export default function Blog({ params }: {params: {slug: string}}) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton/>
          <article>
            <header className="flex flex-col">
              <h1
                className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                {post.metadata.title}
              </h1>
              <time
                dateTime={post.metadata.publishedAt}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                <span className="ml-3">{formatDate(post.metadata.publishedAt)}</span>
              </time>
            </header>
            <div className="mt-8 prose dark:prose-invert">
              <CustomMDX source={post.content}/>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}