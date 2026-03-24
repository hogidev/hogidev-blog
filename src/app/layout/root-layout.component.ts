import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header.component';
import { ScrollToTopComponent } from '../components/scroll-to-top.component';
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, HeaderComponent, ScrollToTopComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-scroll-to-top />
  `,
})
export class RootLayoutComponent implements OnInit {
  private readonly theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.init();
  }
}
