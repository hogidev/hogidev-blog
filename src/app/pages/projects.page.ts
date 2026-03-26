import { Component, OnInit } from '@angular/core';
import { SeoService } from '../core/services/seo.service';

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
}

@Component({
  selector: 'app-projects-page',
  template: `
    <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 class="mb-4 text-4xl font-medium md:text-5xl">Projects</h1>
      <p class="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        A curated list of products, experiments, and open-source work from HogiDev.
      </p>

      @if (projects.length === 0) {
        <section
          class="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-[#2e3744] dark:bg-[#252b36] sm:p-10"
          aria-label="No projects yet"
        >
          <div class="pointer-events-none absolute inset-0">
            <div
              class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/70 blur-3xl dark:bg-indigo-500/10"
            ></div>
            <div
              class="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-200/70 blur-3xl dark:bg-sky-500/10"
            ></div>
          </div>

          <div class="relative flex flex-col items-start gap-5">
            <div
              class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 8h8M8 12h5M8 16h7" />
              </svg>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">Coming soon</h2>
              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                I’m polishing a few projects and will publish them here soon. In the meantime, you can check out my work on
                GitHub or reach out if you want to collaborate.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/hogidev"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#252b36]"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                View GitHub
              </a>

              <a
                href="mailto:hoanggiang521999@gmail.com"
                class="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-[#3d4a5c] dark:bg-[#1f252e] dark:text-gray-100 dark:hover:bg-[#2a3340] dark:focus-visible:ring-offset-[#252b36]"
              >
                Contact me
              </a>
            </div>
          </div>
        </section>
      } @else {
        <div class="grid gap-8 sm:grid-cols-2 sm:gap-6">
          @for (project of projects; track project.title) {
            <article
              class="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-[#2e3744] dark:bg-[#252b36] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
            >
              <div
                class="relative aspect-video overflow-hidden border-b border-gray-100 bg-gray-50 dark:border-[#2e3744] dark:bg-[#1c2129]"
              >
                <img
                  [src]="project.imageSrc"
                  [alt]="project.imageAlt"
                  class="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="flex flex-1 flex-col p-5 sm:p-6">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ project.title }}</h2>
                <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {{ project.description }}
                </p>
                <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Tech stack">
                  @for (tech of project.techStack; track tech) {
                    <span
                      role="listitem"
                      class="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                    >
                      {{ tech }}
                    </span>
                  }
                </div>
                <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  <a
                    [href]="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-blue-800 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-300 dark:focus-visible:ring-offset-[#252b36]"
                  >
                    <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live demo
                  </a>
                  <a
                    [href]="project.githubUrl"
                    class="inline-flex items-center gap-1.5 text-blue-800 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-300 dark:focus-visible:ring-offset-[#252b36]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                    Source code
                  </a>
                </div>
              </div>
            </article>
          }
        </div>
      }
    </section>
  `,
})
export class ProjectsPage implements OnInit {
  protected readonly projects: Project[] = [
    // {
    //   title: 'UI kit playground',
    //   description:
    //     'Component experiments with tokens, accessibility checks, and documentation patterns.',
    //   imageSrc: 'https://images.unsplash.com/photo-1676263813382-bb5ba4b63f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjc3MlMjBncmlkJTIwcmVzcG9uc2l2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQyMzc4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    //   imageAlt: 'Sample preview of UI kit components',
    //   techStack: ['Angular', 'Storybook', 'CSS variables'],
    //   demoUrl: 'https://example.com',
    //   githubUrl: 'https://github.com/yourusername/ui-kit-playground',
    // },
  ];

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Projects | HogiDev',
      'Explore products, experiments, and open-source projects by HogiDev.',
      'https://hogidev.local/projects',
    );
  }
}
