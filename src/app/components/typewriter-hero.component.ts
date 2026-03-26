import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-typewriter-hero',
  template: `
    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-4xl px-4 sm:px-6">
        <h1
          class="typewriter-heading mb-4 font-medium leading-tight tracking-tight text-[clamp(1.25rem,4.6vw+0.4rem,2.35rem)] sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl"
        >
          <span class="typewriter-hero__line">
            {{ currentText() }}<span class="animate-pulse select-none" aria-hidden="true">_</span>
          </span>
        </h1>
        <p class="max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
          A collection of thoughts, tutorials, and insights on modern web development and software
          engineering.
        </p>
      </div>
    </section>
  `,
})
export class TypewriterHeroComponent implements OnInit, OnDestroy {
  private readonly strings = [
    'Hello World!',
    'Welcome to HogiDev',
    'Explore Web Techniques',
    'Learn & Grow Together',
    'Build Amazing Things',
  ];
  private textIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly currentText = signal('');

  ngOnInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private tick(): void {
    const current = this.strings[this.textIndex];
    if (this.deleting) {
      this.charIndex -= 1;
    } else {
      this.charIndex += 1;
    }
    this.currentText.set(current.slice(0, this.charIndex));

    let delay = this.deleting ? 50 : 80;
    if (!this.deleting && this.charIndex === current.length) {
      delay = 1100;
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.textIndex = (this.textIndex + 1) % this.strings.length;
      delay = 300;
    }
    this.timer = setTimeout(() => this.tick(), delay);
  }
}
