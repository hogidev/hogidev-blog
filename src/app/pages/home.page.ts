import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../core/blog.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="page" id="home">
      <div class="wrap">
        <div>
          <p class="kicker">// fullstack developer</p>
          <h1>Trần Hoàng Giang</h1>
          <p class="lede">I build web products end to end — from database schemas and APIs to fast, responsive interfaces. Currently focused on TypeScript, Node.js and cloud-native systems.</p>
          <div class="latest">
            <div class="latest-head">
              <span class="mono">// latest writing</span>
              <a class="latest-all" routerLink="/blogs">All posts →</a>
            </div>
            @for (post of latest; track post.slug) {
              <a class="latest-post" [routerLink]="['/blogs', post.slug]">
                <span class="post-date mono">{{ post.date }}</span>
                <span class="latest-title">{{ post.title }}</span>
              </a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomePage {
  private readonly blog = inject(BlogService);
  readonly latest = this.blog.getPosts().slice(0, 2);
}
