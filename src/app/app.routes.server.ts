import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

interface PostManifestEntry {
  id?: string;
}

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'projects',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'uses',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const filePath = join(process.cwd(), 'public', 'content', 'posts', 'index.json');
      const raw = await readFile(filePath, 'utf-8');
      const posts = JSON.parse(raw) as PostManifestEntry[];
      return posts.filter((p) => !!p.id).map((p) => ({ id: p.id as string }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
