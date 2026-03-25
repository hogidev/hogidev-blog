import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { marked } from 'marked';
import { PostDetail, PostSummary } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private manifestCache: PostSummary[] | null = null;

  constructor(private readonly http: HttpClient) {}

  async getPosts(): Promise<PostSummary[]> {
    if (this.manifestCache) {
      return this.manifestCache;
    }
    const posts = await firstValueFrom(this.http.get<PostSummary[]>('/content/posts/index.json'));
    this.manifestCache = posts;
    return posts;
  }

  async getPostById(id: string): Promise<PostDetail | null> {
    const posts = await this.getPosts();
    const found = posts.find((post) => post.id === id);
    if (!found) {
      return null;
    }
    const content = await firstValueFrom(this.http.get(found.file, { responseType: 'text' }));
    return { ...found, content };
  }

  async renderMarkdown(markdown: string): Promise<string> {
    const body = this.stripYamlFrontmatter(markdown);
    const parsed = await marked.parse(body);
    return this.addCopyButtons(parsed.toString());
  }

  /** Removes leading `---` YAML block so it is not rendered as part of the article. */
  private stripYamlFrontmatter(markdown: string): string {
    const m = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
    return m ? m[1] : markdown;
  }

  /**
   * Injects a copy button into fenced code blocks.
   * We do this as a string transform (SSR-safe) because the content is rendered via `[innerHTML]`.
   */
  private addCopyButtons(html: string): string {
    const button =
      '<button class="code-copy-btn" type="button" data-copy-code aria-label="Copy code">' +
      '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="code-copy-icon">' +
      '<rect x="9" y="9" width="13" height="13" rx="2"></rect>' +
      '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>' +
      '</svg>' +
      '</button>';

    // <pre><code ...>  -> <pre class="code-block">[button]<code ...>
    let out = html.replace(/<pre>\s*<code(\b[^>]*)>/g, `<pre class="code-block">${button}<code$1>`);

    // <pre class="..."><code ...> -> <pre class="... code-block">[button]<code ...>
    out = out.replace(/<pre class="([^"]*)">\s*<code(\b[^>]*)>/g, `<pre class="$1 code-block">${button}<code$2>`);

    return out;
  }
}
