export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  tags: string[];
}

export interface PostDetail extends PostSummary {
  content: string; // markdown
}

/**
 * Blog content. Edit these entries (or load them from files/CMS later).
 * `content` is markdown, rendered to HTML by BlogService.
 */
export const POSTS: PostDetail[] = [
  {
    slug: 'rendering-3d-house-threejs',
    title: 'Rendering a 3D house scene at 60fps with Three.js',
    date: 'Jul 2026',
    readMinutes: 6,
    excerpt:
      "How I kept draw calls low, ran the render loop outside the framework's change detection, and lit two floors without tanking performance.",
    tags: ['three.js', 'WebGL', 'Performance'],
    content: `The house on the home page is a single Three.js scene rendered into one WebGL
context that persists across route changes. Here is what mattered for keeping it smooth.

## One context, many views

Instead of mounting a canvas per page, the scene lives in a root-level service and
the router only swaps a **camera view target**. Creating and destroying WebGL contexts
on every navigation is the fastest way to make a 3D site feel janky.

## Run the loop outside Angular

The animation loop calls \`renderer.setAnimationLoop\` inside
\`NgZone.runOutsideAngular\`, so 60 frames per second never trigger change detection.
Angular only re-renders on discrete events — a route change or a theme toggle.

## Cheap lighting

- Bake as much as possible into emissive materials (screens, lamps).
- One shadow-casting \`DirectionalLight\`; everything else is ambient or point lights with no shadows.
- Lerp light intensities between themes instead of swapping materials.

> The result: a detailed two-story interior that holds 60fps on a laptop GPU.

Next up: exporting the geometry to glTF so it loads even faster.`,
  },
  {
    slug: 'api-that-outlives-its-first-feature',
    title: 'Designing an API that outlives its first feature',
    date: 'Jun 2026',
    readMinutes: 8,
    excerpt:
      'Lessons on schema versioning, pagination, and error contracts from shipping a product API used by three client apps.',
    tags: ['Node.js', 'API Design', 'PostgreSQL'],
    content: `An API is a promise. Once a client depends on a shape, changing it costs everyone.
Here is how I keep that promise cheap to maintain.

## Version at the edge, not everywhere

Put the version in the URL prefix and keep controllers thin. The moment versioning
leaks into your domain layer, every feature pays the tax.

## Pagination is a contract

Decide **cursor vs. offset** on day one and document the guarantees. Cursor pagination
survives inserts; offset does not.

## Error shapes

Every error returns the same JSON envelope: \`code\`, \`message\`, \`details\`. Clients
write one handler and trust it.

\`\`\`json
{ "code": "VALIDATION", "message": "Email is required", "details": { "field": "email" } }
\`\`\`

Boring, predictable APIs are the ones people love to build on.`,
  },
  {
    slug: 'dark-mode-without-the-flash',
    title: 'Dark mode without the flash: a pragmatic approach',
    date: 'May 2026',
    readMinutes: 5,
    excerpt:
      'A small, dependency-free pattern for theme switching that persists choice and animates the transition smoothly.',
    tags: ['CSS', 'UX'],
    content: `The flash of the wrong theme on load is avoidable without a framework.

## Store the choice, read it early

Persist the mode to \`localStorage\` and apply \`data-theme\` on \`<html>\` before the
first paint. CSS variables keyed off that attribute do the rest.

## Animate the variables

Put \`transition: background 0.6s, color 0.6s\` on the root so the whole page eases
between palettes instead of snapping.

That is the entire trick — no library required.`,
  },
  {
    slug: 'typescript-to-runtime-confidence',
    title: 'From TypeScript types to runtime confidence',
    date: 'Apr 2026',
    readMinutes: 7,
    excerpt:
      'Where static types stop helping and how I use schema validation to guard the boundaries of a fullstack app.',
    tags: ['TypeScript', 'Testing'],
    content: `Types vanish at runtime. At the boundaries of your app — network, forms, storage —
you need a real check.

## Validate what you do not control

Parse incoming data with a schema validator and derive the TypeScript type from the
schema, so the two can never drift.

## Trust the interior

Once data is validated at the edge, the interior of the app can rely on types alone.
Do not re-validate on every function call — that is noise.

The goal is confidence at the seams and speed everywhere else.`,
  },
];
