import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
      <h1 class="text-5xl font-semibold">404</h1>
      <p class="mt-3 text-gray-600 dark:text-gray-300">This page does not exist.</p>
      <a routerLink="/" class="mt-6 inline-flex rounded bg-gray-900 px-4 py-2 text-white dark:bg-white dark:text-gray-900">Back home</a>
    </section>
  `,
})
export class NotFoundPage {}
