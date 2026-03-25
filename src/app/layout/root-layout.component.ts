import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header.component';
import { ScrollToTopComponent } from '../components/scroll-to-top.component';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, HeaderComponent, ScrollToTopComponent],
  template: `
    <div class="flex min-h-dvh flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <footer class="border-t border-gray-200 dark:border-[#2e3744]">
        <div class="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <p class="text-center text-sm text-gray-500 dark:text-gray-400">
            © {{ year }} HogiDev. Some rights reserved.
          </p>
        </div>
      </footer>
      <app-scroll-to-top />
    </div>
  `,
})
export class RootLayoutComponent implements OnInit {
  protected readonly year = new Date().getFullYear();

  private readonly theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.init();
  }
}
