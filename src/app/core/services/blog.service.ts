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
    const parsed = await marked.parse(markdown);
    return parsed.toString();
  }
}
