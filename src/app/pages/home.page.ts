import { Component, OnInit, computed, signal } from '@angular/core';
import { BlogPostCardComponent } from '../components/blog-post-card.component';
import { TypewriterHeroComponent } from '../components/typewriter-hero.component';
import { PostSummary } from '../core/models/post.model';
import { BlogService } from '../core/services/blog.service';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-home-page',
  imports: [TypewriterHeroComponent, BlogPostCardComponent],
  template: `
    <app-typewriter-hero />
    <section class="mx-auto max-w-4xl px-4 pb-14 sm:px-6">
      <h2 class="mb-8 text-2xl md:text-3xl">Latest Posts</h2>
      <div class="grid gap-6">
        @for (post of paginatedPosts(); track post.id) {
          <app-blog-post-card [post]="post" />
        }
      </div>
      @if (totalPages() > 1) {
        <nav class="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
          <button
            type="button"
            class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
            [disabled]="currentPage() === 1"
            aria-label="Previous page"
            (click)="prevPage()"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          @for (page of pageNumbers(); track page) {
            <button
              type="button"
              class="cursor-pointer rounded px-3 py-1.5 text-sm"
              [class.bg-gray-900]="page === currentPage()"
              [class.text-white]="page === currentPage()"
              [class.dark:bg-gray-100]="page === currentPage()"
              [class.dark:text-gray-900]="page === currentPage()"
              [class.border]="page !== currentPage()"
              [class.border-gray-300]="page !== currentPage()"
              [class.dark:border-gray-700]="page !== currentPage()"
              (click)="setPage(page)"
            >
              {{ page }}
            </button>
          }
          <button
            type="button"
            class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
            [disabled]="currentPage() === totalPages()"
            aria-label="Next page"
            (click)="nextPage()"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </nav>
      }
    </section>
  `,
})
export class HomePage implements OnInit {
  private readonly pageSize = 10;
  readonly posts = signal<PostSummary[]>([]);
  readonly currentPage = signal(1);
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.posts().length / this.pageSize)),
  );
  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1),
  );
  readonly paginatedPosts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.posts().slice(start, start + this.pageSize);
  });

  constructor(
    private readonly blogService: BlogService,
    private readonly seo: SeoService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.seo.setPageMeta(
      'HogiDev | Home',
      'Explore web development insights, tutorials, and engineering notes.',
      'https://hogidev.local/',
    );
    this.posts.set(await this.blogService.getPosts());
  }

  setPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.setPage(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.setPage(this.currentPage() - 1);
    }
  }
}
