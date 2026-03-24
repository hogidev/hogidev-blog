import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/root-layout.component').then((m) => m.RootLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
      },
      {
        path: 'blog/:id',
        loadComponent: () => import('./pages/blog-post.page').then((m) => m.BlogPostPage),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'projects',
        loadComponent: () => import('./pages/projects.page').then((m) => m.ProjectsPage),
      },
      {
        path: 'uses',
        loadComponent: () => import('./pages/uses.page').then((m) => m.UsesPage),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.page').then((m) => m.NotFoundPage),
  },
];
