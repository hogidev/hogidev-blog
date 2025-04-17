import Image from "next/image";
import {SOCIALS} from "@/app/(common)/about/socials.const";

export const metadata = {
  title: 'About',
  description: 'About me',
}

export default function About() {
  return (
    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div className="lg:pl-20">
        <div className="max-w-xs px-2.5 lg:max-w-none">
          <Image
            alt=""
            loading="lazy"
            width="800"
            height="800"
            decoding="async"
            data-nimg="1"
            className="aspect-square rotate-3 rounded-2xl object-cover"
            sizes="(min-width: 1024px) 32rem, 20rem"
            src="/assets/portrait.jpeg"
          />
        </div>
      </div>
      <div className="lg:order-first lg:row-span-2">
        <h1
          className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
        >
          Giang Tran
        </h1>
        <span className="text-xs">Developer | Contributor | Life long learner | Cat lover</span>
        <div className="mt-6 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
          <p>My name is Giang Tran. I&#39;m currently working as a Sr. Front-end Engineer at Techcombank Vietnam.</p>
          <p>
            I write this blog to share my knowledge about Web Technologies like Angular, React, TypeScript,...
            and apply something cool related coding. I&#39;ve collected this knowledge through my work, research, explore
            the world.
            In addition, I also like to share it because writing it down will help me organized and remember it better.
          </p>
          <p>
            I hope you can find interesting things in my blog. If you have any questions,
            do not hesitate to contact me via email or social platform.
          </p>
        </div>
      </div>
      <div className="lg:pl-20">
        <ul role="list">
          {
            SOCIALS.map((social, index) => (
              <li key={index} className={`flex ${index > 0 ? 'mt-4' : ''}`}>
                <a
                  href={social.url}
                  target="_blank"
                  className="group flex text-sm font-medium transition hover:text-teal-500 dark:hover:text-teal-500 items-center"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true"
                       className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500">
                    <path d={social.icon}></path>
                  </svg>
                  <span className="ml-4">Follow on {social.name}</span>
                </a>
              </li>
            ))
          }
          <li className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex">
            <a
              className="group flex text-sm font-medium transition hover:text-teal-500 dark:hover:text-teal-500 items-center"
              href="mailto:hoanggiang521999@gmail.com"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500"
              >
                <path
                  fillRule="evenodd"
                  d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
                ></path>
              </svg>
              <span className="ml-4">hoanggiang521999@gmail.com</span></a></li>
        </ul>
      </div>
    </div>
  )
}