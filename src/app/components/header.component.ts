import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-[#2e3744] dark:bg-[#1f252e]">
      <nav class="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <a routerLink="/" class="flex items-center gap-2 hover:opacity-80" aria-label="HogiDev home">
          <img
            src="/assets/logo-hogidev-icon.svg"
            alt="HogiDev icon"
            width="32"
            height="32"
            class="h-7 w-auto sm:h-8"
          />
          <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">HogiDev_</span>
        </a>
        <div class="flex items-center gap-2 md:hidden">
          <button
            class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border dark:border-[#364252] dark:bg-[#25303d] dark:text-gray-200 dark:hover:bg-[#2e3a49]"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            [attr.title]="theme.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            type="button"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-5 w-5"
              [class.hidden]="theme.mode() !== 'dark'"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.64 5.64l1.56 1.56M16.8 16.8l1.56 1.56M18.36 5.64 16.8 7.2M7.2 16.8l-1.56 1.56"></path>
            </svg>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-5 w-5"
              [class.hidden]="theme.mode() === 'dark'"
            >
              <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
            </svg>
          </button>
          <button
            class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border dark:border-[#364252] dark:bg-[#25303d] dark:text-gray-200 dark:hover:bg-[#2e3a49]"
            type="button"
            [attr.aria-expanded]="mobileMenuOpen()"
            [attr.aria-label]="mobileMenuOpen() ? 'Close navigation menu' : 'Open navigation menu'"
            (click)="mobileMenuOpen.set(!mobileMenuOpen())"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="h-5 w-5"
              [class.hidden]="mobileMenuOpen()"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="h-5 w-5"
              [class.hidden]="!mobileMenuOpen()"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="hidden items-center gap-7 md:flex">
          <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="font-semibold">Home</a>
          <a routerLink="/about" routerLinkActive="font-semibold">About</a>
          <a routerLink="/projects" routerLinkActive="font-semibold">Projects</a>
          <a routerLink="/uses" routerLinkActive="font-semibold">Uses</a>
          <button
            class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border dark:border-[#364252] dark:bg-[#25303d] dark:text-gray-200 dark:hover:bg-[#2e3a49]"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            [attr.title]="theme.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            type="button"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-5 w-5"
              [class.hidden]="theme.mode() !== 'dark'"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.64 5.64l1.56 1.56M16.8 16.8l1.56 1.56M18.36 5.64 16.8 7.2M7.2 16.8l-1.56 1.56"></path>
            </svg>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              class="h-5 w-5"
              [class.hidden]="theme.mode() === 'dark'"
            >
              <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"></path>
            </svg>
          </button>
        </div>
      </nav>
      <div class="mx-auto flex max-w-4xl flex-col gap-3 px-4 pb-4 md:hidden" [class.hidden]="!mobileMenuOpen()">
        <a
          routerLink="/"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="font-semibold"
          (click)="mobileMenuOpen.set(false)"
          >Home</a>
        <a routerLink="/about" routerLinkActive="font-semibold" (click)="mobileMenuOpen.set(false)">About</a>
        <a routerLink="/projects" routerLinkActive="font-semibold" (click)="mobileMenuOpen.set(false)">Projects</a>
        <a routerLink="/uses" routerLinkActive="font-semibold" (click)="mobileMenuOpen.set(false)">Uses</a>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly mobileMenuOpen = signal(false);
  readonly theme = inject(ThemeService);
}
