import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'hogidev-theme';
  readonly mode = signal<ThemeMode>('light');

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  init(): void {
    const stored = this.getStoredTheme();
    this.setTheme(stored ?? 'light');
  }

  toggle(): void {
    this.setTheme(this.mode() === 'dark' ? 'light' : 'dark');
  }

  private setTheme(mode: ThemeMode): void {
    this.mode.set(mode);
    this.document.documentElement.classList.toggle('dark', mode === 'dark');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, mode);
    }
  }

  private getStoredTheme(): ThemeMode | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const stored = localStorage.getItem(this.key);
    return stored === 'light' || stored === 'dark' ? stored : null;
  }
}
