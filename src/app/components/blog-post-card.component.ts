import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostSummary } from '../core/models/post.model';

@Component({
  selector: 'app-blog-post-card',
  imports: [RouterLink, DatePipe],
  template: `
    <article class="rounded-xl border border-gray-200 p-5 dark:border-[#2e3744]">
      <div class="mb-3 flex flex-wrap gap-2">
        @for (tag of post.tags; track tag) {
          <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300">
            {{ tag }}
          </span>
        }
      </div>
      <h2 class="text-2xl tracking-tight">
        <a [routerLink]="['/blog', post.id]" class="hover:underline">{{ post.title }}</a>
      </h2>
      <p class="mt-3 text-gray-600 dark:text-gray-300">{{ post.excerpt }}</p>
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <time>{{ post.date | date: 'longDate' }}</time>
      </div>
    </article>
  `,
})
export class BlogPostCardComponent {
  @Input({ required: true }) post!: PostSummary;
}
