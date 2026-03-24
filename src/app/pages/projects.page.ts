import { Component, OnInit } from '@angular/core';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-projects-page',
  template: `
    <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 class="mb-4 text-4xl md:text-5xl">Projects</h1>
      <p class="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        A curated list of products, experiments, and open-source work from HogiDev.
      </p>

      <div class="space-y-4">
        <article class="rounded-lg border border-gray-200 p-5 dark:border-[#2e3744]">
          <h2 class="text-xl font-semibold">HogiDev Blog</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">
            A markdown-first Angular blog focused on architecture, performance, and maintainability.
          </p>
        </article>
      </div>
    </section>
  `,
})
export class ProjectsPage implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Projects | HogiDev',
      'Explore products, experiments, and open-source projects by HogiDev.',
      'https://hogidev.local/projects',
    );
  }
}
