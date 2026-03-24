import { DatePipe } from '@angular/common';
import { Component, OnInit, SecurityContext, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostDetail } from '../core/models/post.model';
import { BlogService } from '../core/services/blog.service';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-blog-post-page',
  imports: [RouterLink, DatePipe],
  template: `
    @if (post(); as currentPost) {
      <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <a routerLink="/" class="mb-8 inline-flex text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          ← Back to all posts
        </a>
        <article>
          <div class="mb-4 flex flex-wrap gap-2">
            @for (tag of currentPost.tags; track tag) {
              <span class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-900 dark:text-gray-300">{{
                tag
              }}</span>
            }
          </div>
          <h1 class="mb-4 text-3xl md:text-4xl lg:text-5xl">{{ currentPost.title }}</h1>
          <div class="mb-8 border-b border-gray-200 pb-8 text-gray-600 dark:border-gray-800 dark:text-gray-300">
            <span>{{ currentPost.author }}</span> • <time>{{ currentPost.date | date: 'longDate' }}</time> •
            <span>{{ currentPost.readTime }}</span>
          </div>
          <div class="prose-post" [innerHTML]="html()"></div>
        </article>
      </section>
    } @else {
      <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 class="text-2xl font-semibold">Post not found</h1>
        <a routerLink="/" class="mt-4 inline-flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
          Back to all posts
        </a>
      </section>
    }
  `,
})
export class BlogPostPage implements OnInit {
  readonly post = signal<PostDetail | null>(null);
  readonly html = signal<SafeHtml>('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly seo: SeoService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    const post = await this.blogService.getPostById(id);
    if (!post) {
      return;
    }
    this.post.set(post);
    const rendered = await this.blogService.renderMarkdown(post.content);
    const safe = this.sanitizer.sanitize(SecurityContext.HTML, rendered) ?? '';
    this.html.set(this.sanitizer.bypassSecurityTrustHtml(safe));
    this.seo.setPageMeta(
      `${post.title} | HogiDev`,
      post.excerpt,
      `https://hogidev.local/blog/${post.id}`,
    );
  }
}
