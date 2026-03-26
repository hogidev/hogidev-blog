import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, SecurityContext, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostDetail, PostSummary } from '../core/models/post.model';
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
          <div class="mb-8 border-b border-gray-200 pb-8 dark:border-[#2e3744]">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-col flex-wrap text-sm text-gray-600 dark:text-gray-300 gap-y-1">
                <span class="font-medium text-gray-900 dark:text-gray-100">{{ currentPost.author }}</span>
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <time>{{ currentPost.date | date: 'longDate' }}</time>
                  <span aria-hidden="true">|</span>
                  <span class="inline-flex items-center gap-1.5">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9z" />
                    </svg>
                    {{ currentPost.readTime }}
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-1.5">
                <span class="text-xs text-gray-500 dark:text-gray-400">Share:</span>

                <a
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-[#2e3744] dark:bg-[#1f252e] dark:text-gray-200 dark:hover:bg-[#2a3340]"
                  [href]="shareXUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  title="Share on X"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5">
                    <path
                      d="M18.146 2H21.5l-7.33 8.38L22.5 22h-6.53l-5.11-6.67L4.98 22H1.62l7.84-8.97L1.5 2h6.7l4.62 6.12L18.146 2Zm-1.15 18h1.86L7.13 3.9H5.14L17 20Z"
                    />
                  </svg>
                </a>

                <a
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-[#2e3744] dark:bg-[#1f252e] dark:text-gray-200 dark:hover:bg-[#2a3340]"
                  [href]="shareFacebookUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5">
                    <path
                      d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.5-.1-2.9-.1-2.9 0-4.9 1.7-4.9 5V10.9H6.8V14h2.4v8H13.5Z"
                    />
                  </svg>
                </a>

                <a
                  class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-[#2e3744] dark:bg-[#1f252e] dark:text-gray-200 dark:hover:bg-[#2a3340]"
                  [href]="shareLinkedInUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5">
                    <path
                      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.32V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="prose-post" [innerHTML]="html()"></div>

          @if (relatedPosts().length > 0) {
            <section class="mt-14 border-t border-gray-200 pt-10 dark:border-[#2e3744]" aria-label="Related posts">
              <h2 class="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-100">Related posts</h2>
              <div class="grid gap-4 md:grid-cols-3">
                @for (p of relatedPosts(); track p.id) {
                  <article class="rounded-lg border border-gray-200 p-4 dark:border-[#2e3744]">
                    <div class="mb-2 flex flex-wrap gap-1.5">
                      @for (tag of p.tags.slice(0, 2); track tag) {
                        <span
                          class="rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700 dark:bg-[rgba(255,255,255,0.1)] dark:text-gray-300"
                        >
                          {{ tag }}
                        </span>
                      }
                    </div>
                    <h3 class="text-base font-semibold leading-snug text-gray-900 dark:text-gray-100">
                      <a [routerLink]="['/blog', p.id]" class="hover:underline">{{ p.title }}</a>
                    </h3>
                    <p class="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{{ p.excerpt }}</p>
                    <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <time>{{ p.date | date: 'mediumDate' }}</time>
                    </div>
                  </article>
                }
              </div>
            </section>
          }
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
  readonly shareUrl = signal<string>('');
  readonly relatedPosts = signal<PostSummary[]>([]);

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
    const allPosts = await this.blogService.getPosts();
    this.relatedPosts.set(this.pickRelatedPosts(post, allPosts));
    this.shareUrl.set(
      isPlatformBrowser(this.platformId) ? window.location.href : `https://hogidev.local/blog/${post.id}`,
    );
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

  shareXUrl(): string {
    const meta = this.getShareMeta();
    if (!meta) return '#';
    return this.buildShareUrl('https://x.com/share', {
      url: meta.url,
      text: meta.title,
    });
  }

  shareFacebookUrl(): string {
    const meta = this.getShareMeta();
    if (!meta) return '#';
    return this.buildShareUrl('https://www.facebook.com/sharer/sharer.php', {
      u: meta.url,
      t: meta.title,
    });
  }

  shareLinkedInUrl(): string {
    const meta = this.getShareMeta();
    if (!meta) return '#';
    return this.buildShareUrl('https://www.linkedin.com/shareArticles', {
      url: meta.url,
      title: meta.title,
    });
  }

  private getShareMeta(): { url: string; title: string } | null {
    const p = this.post();
    const url = this.shareUrl();
    if (!p || !url) return null;
    return { url, title: p.title };
  }

  private buildShareUrl(baseUrl: string, params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return `${baseUrl}?${query}`;
  }

  private pickRelatedPosts(current: PostSummary, all: PostSummary[]): PostSummary[] {
    const currentTags = new Set((current.tags ?? []).map((t) => t.toLowerCase()));

    const scored = all
      .filter((p) => p.id !== current.id)
      .map((p) => {
        const tags = (p.tags ?? []).map((t) => t.toLowerCase());
        const score = tags.reduce((acc, t) => acc + (currentTags.has(t) ? 1 : 0), 0);
        return { post: p, score };
      });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Newer first (ISO date strings)
      return (b.post.date ?? '').localeCompare(a.post.date ?? '');
    });

    const best = scored.filter((x) => x.score > 0).slice(0, 3).map((x) => x.post);
    if (best.length > 0) return best;

    // Fallback: latest posts
    return scored.slice(0, 3).map((x) => x.post);
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
