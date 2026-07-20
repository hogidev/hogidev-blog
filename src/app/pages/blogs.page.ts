import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../core/blog.service';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink],
  template: `
    <section class="page" id="blogs">
      <div class="wrap">
        <h2>Blogs</h2>
        <p class="sub">Notes on building for the web — replace with your own posts.</p>
        <div class="blog-list">
          @for (post of posts; track post.slug) {
            <a class="post" [routerLink]="['/blogs', post.slug]">
              <span class="post-date mono">{{ post.date }} · {{ post.readMinutes }} min read</span>
              <h3>{{ post.title }}</h3>
              <p>{{ post.excerpt }}</p>
              <div class="tags">
                @for (tag of post.tags; track tag) {
                  <span>{{ tag }}</span>
                }
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `
})
export class BlogsPage {
  private readonly blog = inject(BlogService);
  readonly posts = this.blog.getPosts();
}
