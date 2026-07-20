import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section class="page" id="about">
      <div class="wrap">
        <h2>About</h2>
        <p class="sub">A short introduction — edit this with your own story.</p>
        <div class="about-grid">
          <div>
            <p>I'm Giang, a fullstack developer based in Vietnam. I enjoy owning features from idea to production:
              designing the data model, shipping the API, and polishing the UI until it feels effortless.</p>
            <p>My day-to-day stack is TypeScript across the board - Angular on the front, Java Spring Boot on the back - with
               Docker and a healthy respect for good CI. I care about performance budgets, readable code, and
              interfaces that stay out of the user's way.</p>
            <p>Outside of work I contribute to open source, and drink more coffee than the mug in that scene suggests.</p>
            <div class="timeline">
              <div class="t-item"><span class="t-year">2021 - now</span>
                <div><b>Frontend Developer</b><span>Product team, web platform</span></div>
              </div>
              <div class="t-item"><span class="t-year">2017 - 2021</span>
                <div><b>B.Sc. Computer Science</b><span>University of Transport and Communications</span></div>
              </div>
            </div>
          </div>
          <div class="panel">
            <h3>// skills</h3>
            <div class="chips">
              <span class="chip">TypeScript</span><span class="chip">Angular</span><span
              class="chip">Java (Spring Boot)</span>
              <span class="chip">Docker</span><span class="chip">AWS</span>
              <span class="chip">CI/CD</span><span class="chip">Testing</span>
            </div>
            <h3 style="margin-top: 26px;">// connect</h3>
            <div class="socials">
              <a class="social" href="https://github.com/hogidev" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path
                    d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a class="social" href="https://www.linkedin.com/in/gnaigaliot/" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.66c0-1.35-.03-3.08-1.9-3.08-1.9 0-2.2 1.46-2.2 2.98V21H9V9Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a class="social" href="mailto:hoanggiang521999@gmail.com">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="m3 6 9 6.5L21 6" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutPage {
}
