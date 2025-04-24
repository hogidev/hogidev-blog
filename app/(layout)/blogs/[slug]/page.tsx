import {formatDate, getBlogPosts} from "@/utils/blog";
import {notFound} from "next/navigation";
import BackButton from "@/components/back-button";
import React from "react";
import CustomMDX from "@/components/mdx";

type Props = {
  params: Promise<{ slug: string }>
};

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const posts = getBlogPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <div className="xl:relative">
        <div className="mx-auto max-w-4xl">
          <BackButton/>
          <article>
            <header className="flex flex-col">
              <h1
                className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl dark:text-zinc-100"
              >
                {post.metadata.title}
              </h1>
              <time
                dateTime={post.metadata.publishedAt}
                className="order-first flex items-center text-base dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                <span className="ml-3">{formatDate(post.metadata.publishedAt)}</span>
              </time>
            </header>
            <div className="mt-8 prose dark:prose-invert">
              <CustomMDX content={post.content}/>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}