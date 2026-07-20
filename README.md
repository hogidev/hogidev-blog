# Trần Hoàng Giang — Personal Website (Angular + Tailwind + Three.js)

A personal portfolio with an interactive 3D two-story house rendered in real time.
The house is a fixed full-viewport background: it reacts to the mouse (parallax),
changes lighting with the theme (interior lamps at night / sun-shafts by day), plays
a Doraemon cartoon on the living-room TV, and animates a character who walks upstairs
to code, then comes down to watch TV — on a loop. Switching pages flies the camera
to a different framing of the house.

## Tech stack

- **Angular 21** (standalone components, signals, no NgModules)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) — utilities available; the bespoke
  3D-overlay layout lives in `src/styles.css`
- **Three.js** (plain, no wrapper). The render loop runs inside
  `NgZone.runOutsideAngular` so 60fps never triggers change detection
- **Angular Router** with lazy-loaded page components and `:slug` blog routes
- **marked** for rendering blog markdown

## Getting started

```bash
npm install
npm start          # ng serve → http://localhost:4200
npm run build      # production build → dist/
```

> Requires Node 20+ and the Angular CLI (installed as a dev dependency; `npm start`
> uses the local `ng`).

## Project structure

```
src/
  index.html                 # <html data-theme> + fonts; <body data-tab>
  main.ts                    # bootstrapApplication(App, appConfig)
  styles.css                 # Tailwind import + ported design system (CSS variables, layout)
  app/
    app.ts                   # root component → <app-shell>
    app.config.ts            # router (component input binding + scrolling)
    app.routes.ts            # /  /about  /blogs  /blogs/:slug  /projects
    layout/
      shell.component.ts      # nav + #celestial + #hero3d + <router-outlet> + footer;
                              #   boots the scene after first render, sets body[data-tab]
      nav.component.ts        # top nav, mobile hamburger, theme toggle (Tailwind-style icons)
    core/
      theme.service.ts        # signal<'dark'|'light'>, writes <html data-theme>, localStorage
      blog.service.ts         # reads posts, renders markdown
      three/
        house-model.ts        # buildModel(): the whole house geometry + boy + routes
        house-scene.service.ts# renderer, lights, textures, boy animation, per-tab camera
    data/
      posts.ts                # blog content (markdown) — EDIT ME
      projects.ts             # project cards — EDIT ME
    pages/
      home.page.ts  about.page.ts  blogs.page.ts  blog-post.page.ts  projects.page.ts
```

## How the 3D scene is wired

- `HouseSceneService` (root singleton) owns the **single WebGL context**. The canvas
  lives once in the shell and persists across navigation — routes only change the
  **camera view target** via `setView(tab)`.
- `ShellComponent` calls `scene.init(host)` inside `afterNextRender` +
  `runOutsideAngular`, keeps `body[data-tab]` in sync with the active route, and calls
  `scene.dispose()` on destroy (removes listeners, stops the loop, disposes the renderer).
- Themes: `ThemeService` sets `data-theme` on `<html>`; the render loop reads it each
  frame and lerps light intensities. The sun/moon rise (`#celestial`) replays on toggle.
- Responsive: `setView` pulls the camera back and shrinks/centers the house at
  ≤1024px (tablet) and ≤560px (phone). The nav collapses to a hamburger at ≤1024px.

## Editing content

- **Blog posts** → `src/app/data/posts.ts` (title, date, tags, markdown `content`).
  Each post is available at `/blogs/<slug>`.
- **Projects** → `src/app/data/projects.ts`.
- **About / socials** → `src/app/pages/about.page.ts` (GitHub/LinkedIn/email links are
  placeholders — replace them).

## Notes

- SSR is not configured (the request was browser-only). The scene is already guarded
  with `isPlatformBrowser` / `afterNextRender`, so adding `@angular/ssr` later is safe.
- All 3D textures (code, Doraemon, sky, sun-shafts) are generated at runtime on
  `<canvas>` — there are no image assets to ship.
