import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  Inject,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HouseSceneService } from '../core/three/house-scene.service';
import { ThemeService } from '../core/theme.service';
import { NavComponent } from './nav.component';

type Tab = 'home' | 'about' | 'blogs' | 'projects';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav />
    <div id="celestial" #celestial></div>
    <div id="hero3d" #hero3d></div>
    <div id="scrim"></div>

    <main>
      <router-outlet />
    </main>

    <footer>
      <span>© 2026 Trần Hoàng Giang</span>
    </footer>
  `
})
export class ShellComponent implements AfterViewInit, OnDestroy {
  @ViewChild('hero3d') hero3d!: ElementRef<HTMLElement>;
  @ViewChild('celestial') celestial!: ElementRef<HTMLElement>;

  private readonly scene = inject(HouseSceneService);
  private readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);
  private readonly isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.theme.init();

    // Sun (light) / moon (dark) rises from below whenever the theme changes.
    effect(() => {
      this.theme.mode();
      if (!this.isBrowser || !this.celestial) return;
      const el = this.celestial.nativeElement;
      el.classList.remove('rise');
      void el.offsetWidth;
      el.classList.add('rise');
    });

    // Keep body[data-tab] + camera view in sync with the active route.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncTab());
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    // View is ready; boot the 3D scene outside Angular's zone.
    this.zone.runOutsideAngular(() => this.scene.init(this.hero3d.nativeElement));
    this.syncTab();
    this.celestial.nativeElement.classList.add('rise');
  }

  private syncTab(): void {
    const tab = this.deepestTab();
    this.document.body.dataset['tab'] = tab;
    this.scene.setView(tab);
  }

  private deepestTab(): Tab {
    let route = this.router.routerState.snapshot.root;
    let tab: Tab = 'home';
    while (route) {
      if (route.data && route.data['tab']) tab = route.data['tab'] as Tab;
      route = route.firstChild!;
    }
    return tab;
  }

  ngOnDestroy(): void {
    this.scene.dispose();
  }
}
