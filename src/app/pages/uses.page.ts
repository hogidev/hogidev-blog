import { Component, OnInit } from '@angular/core';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-uses-page',
  template: `
    <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 class="mb-4 text-4xl md:text-5xl font-medium">Uses</h1>
      <p class="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Tools and setup used by HogiDev for development, writing, and design.
      </p>

      <div class="space-y-4">
        <article class="rounded-lg border border-gray-200 p-5 dark:border-[#2e3744]">
          <h2 class="text-xl font-semibold">Editor</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">Cursor + VSCode ecosystem</p>
        </article>
        <article class="rounded-lg border border-gray-200 p-5 dark:border-[#2e3744]">
          <h2 class="text-xl font-semibold">Frontend Stack</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-300">Angular, TailwindCSS, TypeScript</p>
        </article>
      </div>
    </section>
  `,
})
export class UsesPage implements OnInit {
  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Uses | HogiDev',
      'See the software, tools, and workflow used by HogiDev.',
      'https://hogidev.local/uses',
    );
  }
}
