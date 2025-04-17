'use client';

import Image from 'next/image';

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/assets/maintenance.svg"
        alt=""
        loading="lazy"
        width="300"
        height="300"
      />
      <h1 className="text-3xl font-bold mb-4">Down for Maintenance</h1>
      <a
        href="/"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm bg-white/90 px-3 py-2 ring-1 shadow-lg shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-undo h-4 w-4"
        >
          <path d="M3 7v6h6"></path>
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
        </svg>
        Back to Homepage
      </a>
    </div>
  );
}