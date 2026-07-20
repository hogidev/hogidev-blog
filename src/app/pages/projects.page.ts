import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../data/projects';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  template: `
    <section class="page" id="projects">
      <div class="wrap">
        <h2>Projects</h2>
        <p class="sub">Selected work — currently being put together.</p>
        @if (projects.length) {
          <div class="proj-grid">
            @for (p of projects; track p.num) {
              <a class="card" [href]="p.link || null" target="_blank" rel="noopener">
                <span class="num">{{ p.num }}</span>
                <h3>{{ p.title }}</h3>
                <p>{{ p.description }}</p>
                <div class="tags">
                  @for (tag of p.tags; track tag) {
                    <span>{{ tag }}</span>
                  }
                </div>
              </a>
            }
          </div>
        } @else {
          <div class="empty-state">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
              <path d="M12 12v4M10 14h4" />
            </svg>
            <span class="mono">// nothing here yet</span>
            <h3>No projects published</h3>
            <p>I'm still packaging up what I've built. Check back soon, or reach out if you'd like a preview.</p>
            <a class="btn primary" routerLink="/about">Get in touch →</a>
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsPage {
  readonly projects = PROJECTS;
}
