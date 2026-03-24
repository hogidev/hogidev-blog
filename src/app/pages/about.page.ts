import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-about-page',
  template: `
    <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 class="mb-8 text-4xl md:text-5xl">About me</h1>

      <div class="mb-10 grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
        <div class="flex flex-col items-start gap-4">
          <img
            src="/assets/profile-hogidev.svg"
            alt="HogiDev profile photo"
            width="220"
            height="220"
            class="h-44 w-44 rounded-2xl border border-gray-200 object-cover dark:border-[#364252] md:h-[220px] md:w-[220px]"
          />
          <div class="flex items-center justify-between w-full">
            <a
              href="https://www.linkedin.com/in/hogidev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-50 dark:border-[#364252] dark:text-gray-300 dark:hover:bg-[#2e3a49]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.15 1.45-2.15 2.95v5.67H9.32V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"
                />
              </svg>
            </a>
            <a
              href="https://x.com/hogidev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              title="X (Twitter)"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-50 dark:border-[#364252] dark:text-gray-300 dark:hover:bg-[#2e3a49]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path
                  d="M18.9 2H22l-6.77 7.74L23.2 22h-6.2l-4.86-6.3L6.62 22H3.5l7.24-8.27L2.6 2h6.35l4.4 5.8L18.9 2Zm-1.08 18.2h1.71L8.03 3.7H6.2L17.82 20.2Z"
                />
              </svg>
            </a>
            <a
              href="https://github.com/hogidev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-50 dark:border-[#364252] dark:text-gray-300 dark:hover:bg-[#2e3a49]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
                <path
                  d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.9c-2.78.61-3.37-1.18-3.37-1.18-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.01 1.53 1.01.88 1.5 2.31 1.07 2.87.82.09-.63.35-1.07.63-1.32-2.22-.25-4.56-1.1-4.56-4.88 0-1.08.39-1.97 1.02-2.66-.1-.25-.44-1.28.1-2.67 0 0 .84-.27 2.75 1.02a9.7 9.7 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.54 1.39.2 2.42.1 2.67.63.69 1.02 1.58 1.02 2.66 0 3.8-2.34 4.63-4.57 4.87.36.3.67.9.67 1.83V21c0 .27.18.59.69.49A10 10 0 0 0 12 2Z"
                />
              </svg>
            </a>
            <a
              href="mailto:hello@hogidev.dev"
              aria-label="Email"
              title="Email"
              class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-50 dark:border-[#364252] dark:text-gray-300 dark:hover:bg-[#2e3a49]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18v12H3z" />
                <path d="m3 7 9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p class="mb-4 text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            I am HogiDev. I write about modern frontend engineering, architecture, and practical software craftsmanship.
          </p>
          <p class="leading-relaxed text-gray-700 dark:text-gray-300">
            My focus is building maintainable Angular apps with strong performance, clear structure, and production-ready UX.
          </p>
        </div>
      </div>

      <h2 class="mb-4 mt-8 text-2xl md:text-3xl">Our Mission</h2>
      <p class="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
        We share practical knowledge to help developers ship maintainable and high-performance software.
      </p>

      <h2 class="mb-4 mt-8 text-2xl md:text-3xl">What We Cover</h2>
      <ul class="mb-8 space-y-3">
        <li class="leading-relaxed text-gray-700 dark:text-gray-300"><strong>Frontend Engineering</strong> - Architecture and UI systems at scale.</li>
        <li class="leading-relaxed text-gray-700 dark:text-gray-300"><strong>Performance</strong> - Techniques for fast and stable applications.</li>
        <li class="leading-relaxed text-gray-700 dark:text-gray-300"><strong>Best Practices</strong> - Patterns that keep code clean and reliable.</li>
      </ul>
    </section>
  `,
})
export class AboutPage implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPageMeta(
      'About HogiDev',
      'Learn about HogiDev mission, topics, and community.',
      'https://hogidev.local/about',
    );
  }
}
