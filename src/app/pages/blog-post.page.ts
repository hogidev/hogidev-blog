import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { BlogService } from '../core/blog.service';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink],
  template: `
    <section class="page" id="blogs">
      <div class="wrap">
        @if (post(); as p) {
          <article class="article">
            <a class="back-link" routerLink="/blogs">← All posts</a>
            <p class="article-meta">{{ p.date }} · {{ p.readMinutes }} min read</p>
            <h1>{{ p.title }}</h1>
            <div class="prose" [innerHTML]="body()"></div>
          </article>
        } @else {
          <article class="article">
            <a class="back-link" routerLink="/blogs">← All posts</a>
            <h1>Post not found</h1>
            <p class="sub">This article doesn’t exist. Head back to the blog index.</p>
          </article>
        }
      </div>
    </section>
  `,
})
export class BlogPostPage {
  // Bound from the route param via withComponentInputBinding-style :slug.
  readonly slug = input<string>('');

  private readonly blog = inject(BlogService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly post = computed(() => this.blog.getPostBySlug(this.slug()));
  readonly body = computed<SafeHtml>(() => {
    const p = this.post();
    if (!p) return '';
    return this.sanitizer.bypassSecurityTrustHtml(this.blog.renderMarkdown(p.content));
  });
}
