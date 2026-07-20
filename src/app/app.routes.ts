import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
    data: { tab: 'home' }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about.page').then((m) => m.AboutPage),
    data: { tab: 'about' }
  },
  {
    path: 'blogs',
    loadComponent: () => import('./pages/blogs.page').then((m) => m.BlogsPage),
    data: { tab: 'blogs' }
  },
  {
    path: 'blogs/:slug',
    loadComponent: () => import('./pages/blog-post.page').then((m) => m.BlogPostPage),
    data: { tab: 'blogs' }
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects.page').then((m) => m.ProjectsPage),
    data: { tab: 'projects' }
  },
  { path: '**', redirectTo: '' }
];
