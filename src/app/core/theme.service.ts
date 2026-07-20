import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

/**
 * Theme state. Writes `data-theme` on <html> (which the CSS variables and the
 * 3D scene both read) and persists the choice to localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'thg_theme';
  readonly mode = signal<ThemeMode>('dark');

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  init(): void {
    this.set(this.stored() ?? 'dark');
  }

  toggle(): void {
    this.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  private set(mode: ThemeMode): void {
    this.mode.set(mode);
    this.document.documentElement.dataset['theme'] = mode;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, mode);
    }
  }

  private stored(): ThemeMode | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const v = localStorage.getItem(this.key);
    return v === 'light' || v === 'dark' ? v : null;
  }
}
