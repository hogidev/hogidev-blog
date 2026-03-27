import { Component, OnInit } from '@angular/core';
import { SeoService } from '../core/services/seo.service';

interface UsesItem {
  name: string;
  description: string;
}

interface UsesSection {
  id: string;
  title: string;
  items: UsesItem[];
}

@Component({
  selector: 'app-uses-page',
  template: `
    <section class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 class="mb-4 text-4xl font-medium md:text-5xl">Uses</h1>
      <p class="mb-12 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        Tools and setup used by HogiDev for development, writing, and design.
      </p>

      @for (section of sections; track section.id) {
        <section class="mb-8 last:mb-0" [attr.aria-labelledby]="'uses-' + section.id">
          <div class="mb-4 flex items-center gap-3">
            <h2 class="text-3xl text-gray-900 dark:text-gray-100" [id]="'uses-' + section.id">
              {{ section.title }}
            </h2>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 sm:gap-4">
            @for (item of section.items; track item.name) {
              <article
                class="rounded-xl border border-gray-200 bg-white p-4 dark:border-[#2e3744] dark:bg-[#252b36] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
              >
                <h3 class="text-gray-900 dark:text-gray-100">{{ item.name }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </article>
            }
          </div>
        </section>
      }
    </section>
  `,
})
export class UsesPage implements OnInit {
  protected readonly sections: UsesSection[] = [
    {
      id: 'hardware',
      title: 'Hardware',
      items: [
        { name: 'MacBook Pro 14" M1', description: 'Primary development machine' },
        { name: 'Dell UltraSharp 27" Monitor', description: 'External 4K display' }
      ],
    },
    {
      id: 'development',
      title: 'Development',
      items: [
        { name: 'WebStorm', description: 'Primary code editor with various extensions' },
        { name: 'Visual Studio Code', description: 'Alternative IDE' },
        { name: 'iTerm2 + Oh My Zsh', description: 'Terminal with custom theme and plugins' },
        { name: 'Postman', description: 'API development and testing' },
      ],
    },
    {
      id: 'productivity',
      title: 'Productivity',
      items: [
        { name: 'Figma', description: 'UI/UX design and prototyping' },
        { name: 'Notion', description: 'Project planning and documentation' }
      ],
    },
    {
      id: 'frontend-stack',
      title: 'Frontend Stack',
      items: [
        { name: 'Angular', description: 'Primary framework for web applications' },
        { name: 'React', description: 'For smaller projects and component libraries' },
        { name: 'RxJS', description: 'Reactive programming library' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
      ],
    },
    {
      id: 'backend-database',
      title: 'Backend & Database',
      items: [
        { name: 'Java (Spring)', description: 'Backend API development' },
        { name: 'Node.js + Express', description: 'Backend API development' },
        { name: 'MySQL', description: 'Relational database' }
      ],
    },
    {
      id: 'tools',
      title: 'DevOps & Tools',
      items: [
        { name: 'Git', description: 'Version control and collaboration' },
        { name: 'Docker', description: 'Containerization for development and deployment' },
        { name: 'npm/pnpm', description: 'Package management' },
        { name: 'Vercel', description: 'Deployment and hosting' },
        { name: 'AWS', description: 'Cloud services for production environments' },
        { name: 'ArgoCD', description: 'Continuous deployment and infrastructure as code' },
      ],
    },
  ];

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Uses | HogiDev',
      'See the software, tools, and workflow used by HogiDev.',
      'https://hogidev.com/uses',
    );
  }
}
