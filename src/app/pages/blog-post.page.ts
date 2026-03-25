import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, SecurityContext, inject, signal } from '@angular/core';
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
              <span class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300">{{
                tag
              }}</span>
            }
          </div>
          <h1 class="mb-4 text-3xl md:text-4xl lg:text-5xl">{{ currentPost.title }}</h1>
          <div class="mb-8 border-b border-gray-200 pb-8 text-gray-600 dark:border-[#2e3744] dark:text-gray-300">
            <time>{{ currentPost.date | date: 'longDate' }}</time>
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
export class BlogPostPage implements OnInit, OnDestroy {
  readonly post = signal<PostDetail | null>(null);
  readonly html = signal<SafeHtml>('');

  private readonly platformId = inject(PLATFORM_ID);
  private removeCopyListener: (() => void) | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
    private readonly seo: SeoService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  ngOnDestroy(): void {
    this.removeCopyListener?.();
    this.removeCopyListener = null;
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.installCopyListener();
    }

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

    // `[innerHTML]` is sanitized; inject copy buttons after render (browser only).
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => this.decorateCodeBlocks(), 0);
    }

    this.seo.setPageMeta(
      `${post.title} | HogiDev`,
      post.excerpt,
      `https://hogidev.local/blog/${post.id}`,
    );
  }

  private decorateCodeBlocks(): void {
    const root = document.querySelector('.prose-post');
    if (!root) return;

    const pres = Array.from(root.querySelectorAll('pre'));
    for (const pre of pres) {
      const code = pre.querySelector('code');
      if (!code) continue;

      pre.classList.add('code-block');

      // Avoid duplicating buttons if we re-run.
      if (pre.querySelector('[data-copy-code]')) continue;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-btn';
      btn.setAttribute('data-copy-code', '');
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML =
        '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="code-copy-icon">' +
        '<rect x="9" y="9" width="13" height="13" rx="2"></rect>' +
        '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
        '</svg>';

      pre.insertBefore(btn, pre.firstChild);
    }
  }

  private installCopyListener(): void {
    if (this.removeCopyListener) {
      return;
    }

    const handler = async (event: Event) => {
      const target = event.target as HTMLElement | null;
      const btn = target?.closest?.('[data-copy-code]') as HTMLElement | null;
      if (!btn) return;

      const pre = btn.closest('pre') as HTMLElement | null;
      const code = pre?.querySelector('code') as HTMLElement | null;
      const text = code?.innerText ?? '';
      if (!text.trim()) return;

      event.preventDefault();
      event.stopPropagation();

      try {
        await navigator.clipboard.writeText(text);
        btn.setAttribute('data-copied', 'true');
        window.setTimeout(() => btn.removeAttribute('data-copied'), 1200);
      } catch {
        // Fallback for older browsers: select + copy
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
          document.execCommand('copy');
          btn.setAttribute('data-copied', 'true');
          window.setTimeout(() => btn.removeAttribute('data-copied'), 1200);
        } finally {
          document.body.removeChild(ta);
        }
      }
    };

    document.addEventListener('click', handler, true);
    this.removeCopyListener = () => document.removeEventListener('click', handler, true);
  }
}
