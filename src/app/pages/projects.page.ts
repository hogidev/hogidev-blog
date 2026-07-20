import { Component } from '@angular/core';
import { PROJECTS } from '../data/projects';

@Component({
  selector: 'app-projects',
  template: `
    <section class="page" id="projects">
      <div class="wrap">
        <h2>Projects</h2>
        <p class="sub">Placeholder projects — replace with your real work.</p>
        <div class="proj-grid">
          @for (p of projects; track p.num) {
            <div class="card">
              <span class="num">{{ p.num }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
              <div class="tags">
                @for (tag of p.tags; track tag) {
                  <span>{{ tag }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsPage {
  readonly projects = PROJECTS;
}
