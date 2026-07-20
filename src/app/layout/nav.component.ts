import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a class="brand" routerLink="/" aria-label="Go to home"><b>~/</b>tran-hoang-giang</a>
      <div class="nav-links" [class.open]="menuOpen()">
        <a class="tab" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
           (click)="close()">Home</a>
        <a class="tab" routerLink="/about" routerLinkActive="active" (click)="close()">About</a>
        <a class="tab" routerLink="/blogs" routerLinkActive="active" (click)="close()">Blogs</a>
        <a class="tab" routerLink="/projects" routerLinkActive="active" (click)="close()">Projects</a>
      </div>
      <button class="btn" id="theme-toggle" title="Toggle dark / light" aria-label="Toggle theme"
              (click)="theme.toggle()" [innerHTML]="icon()"></button>
      <button class="btn" id="nav-toggle" aria-label="Menu" [attr.aria-expanded]="menuOpen()"
              (click)="toggleMenu($event)">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </nav>
  `
})
export class NavComponent {
  readonly theme = inject(ThemeService);
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly sanitizer = inject(DomSanitizer);
  readonly menuOpen = signal(false);

  private readonly SUN =
    '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  private readonly MOON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  icon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.theme.mode() === 'light' ? this.SUN : this.MOON);
  }

  toggleMenu(e: Event): void {
    e.stopPropagation();
    this.menuOpen.update((v) => !v);
  }

  close(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event): void {
    if (!this.host.nativeElement.contains(e.target as Node)) this.menuOpen.set(false);
  }
}
