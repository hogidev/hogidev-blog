import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-to-top',
  template: `
    <button
      type="button"
      class="fixed bottom-6 right-6 z-40 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-opacity duration-200 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      [class.opacity-0]="!visible()"
      [class.pointer-events-none]="!visible()"
      [attr.aria-hidden]="!visible()"
      [attr.tabindex]="visible() ? 0 : -1"
      [attr.aria-label]="'Scroll to top'"
      (click)="scrollToTop()"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5"
      >
        <path d="M12 19V5M5 12l7-7 7 7"></path>
      </svg>
    </button>
  `,
})
export class ScrollToTopComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly visible = signal(false);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    fromEvent(window, 'scroll', { passive: true })
      .pipe(throttleTime(100, undefined, { leading: true, trailing: true }), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.visible.set(window.scrollY > 320);
      });
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
