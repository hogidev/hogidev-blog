import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { POSTS, PostSummary, PostDetail } from '../data/posts';

/** Reads the static post list and renders markdown bodies to HTML. */
@Injectable({ providedIn: 'root' })
export class BlogService {
  getPosts(): PostSummary[] {
    return POSTS.map(({ content, ...summary }) => summary);
  }

  getPostBySlug(slug: string): PostDetail | null {
    return POSTS.find((p) => p.slug === slug) ?? null;
  }

  renderMarkdown(markdown: string): string {
    return marked.parse(markdown, { async: false }) as string;
  }
}
