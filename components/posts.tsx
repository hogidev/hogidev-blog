import {formatDate, getBlogPosts} from "@/utils/blog"

export default function BlogPosts() {
  const allBlogs = getBlogPosts().sort((a, b) => {
    if (
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
    ) {
      return -1
    }
    return 1
  })

  return (
    <>
      {
        allBlogs
          .map((post, index) => (
            <article
              key={index}
              className='md:grid md:grid-cols-4 md:items-baseline'
            >
              <div className="md:col-span-3 group relative flex flex-col items-start">
                <Title title={post.metadata.title} slug={post.slug}/>
                <p className="relative z-10 mt-2 text-sm dark:text-zinc-400">
                  {post.metadata.summary}
                </p>
                <Time date={post.metadata.publishedAt} isShowIcon={true}
                      className='pl-3.5 md:hidden'/>
                <ReadArticle/>
              </div>
              <Time date={post.metadata.publishedAt} className={'mt-1 max-md:hidden'}/>
            </article>
          ))
      }
    </>
  )
}

function Time({date, isShowIcon, className}: { date: string; isShowIcon?: boolean; className: string }) {
  return (
    <time
      className={`relative z-10 order-first mb-3 flex items-center text-sm text-zinc-700 dark:text-zinc-500 ${className}`}
      dateTime={date}
    >
      {isShowIcon && <IconTimeline/>}
      {formatDate(date, false)}
    </time>
  )
}

function IconTimeline() {
  return (
    <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
    </span>
  )
}

function Title({slug, title}: { slug: string; title: string; }) {
  return (
    <h2 className="text-base font-semibold tracking-tight dark:text-zinc-100">
      <div
        className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-200 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"
      ></div>
      <a href={`/blogs/${slug}`}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
        <span className="relative z-10">{title}</span>
      </a>
    </h2>
  )
}

function ReadArticle() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      Read article
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="ml-1 h-4 w-4 stroke-current"
      >
        <path
          d="M6.75 5.75 9.25 8l-2.5 2.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  )
}