export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with React',
    excerpt:
      'Exploring the latest patterns and best practices for building scalable React applications.',
    content: `# Building Modern Web Applications with React
## The Evolution of React
From class components to hooks and server rendering, React keeps evolving.
### Key Concepts to Master
- React Server Components
- Concurrent features
- Suspense boundaries
- Custom hooks
## Best Practices
Keep state local when possible, and design components with one clear responsibility.
## Conclusion
Stay curious, keep learning, and build amazing things.`,
    date: '2026-03-20',
    author: 'Alex Johnson',
    readTime: '5 min read',
    tags: ['React', 'Web Development', 'JavaScript'],
  },
  {
    id: '2',
    title: 'The Power of TypeScript in Large Codebases',
    excerpt: 'How TypeScript helps teams maintain quality and productivity at scale.',
    content: `# The Power of TypeScript in Large Codebases
## Why TypeScript Matters
Type safety helps prevent bugs and creates self-documenting APIs.
### Real-World Benefits
- Refactoring confidence
- Better IntelliSense
- Better module contracts
## Migration Strategy
Start incrementally and tighten strictness over time.`,
    date: '2026-03-18',
    author: 'Sarah Chen',
    readTime: '7 min read',
    tags: ['TypeScript', 'Programming', 'Best Practices'],
  },
  {
    id: '3',
    title: 'Mastering CSS Grid and Flexbox',
    excerpt: 'A practical guide to modern CSS layout techniques.',
    content: `# Mastering CSS Grid and Flexbox
## When to Use What
Flexbox is ideal for one-dimensional flows, while Grid excels at two-dimensional layouts.
### Flexbox Fundamentals
- justify-content
- align-items
- flex-grow and flex-shrink
### Grid Essentials
Use grid templates and named areas for complex page layouts.
## Conclusion
Master both tools and you can implement nearly any design.`,
    date: '2026-03-15',
    author: 'David Martinez',
    readTime: '6 min read',
    tags: ['CSS', 'Web Design', 'Frontend'],
  },
  {
    id: '4',
    title: 'Introduction to Web Performance Optimization',
    excerpt: 'Essential techniques to make web apps faster and more reliable.',
    content: `# Introduction to Web Performance Optimization
## Core Web Vitals
- LCP
- FID
- CLS
## Optimization Strategies
- Image optimization
- Code splitting
- Caching
- Lazy loading
## Conclusion
Performance is an ongoing practice: measure, optimize, repeat.`,
    date: '2026-03-12',
    author: 'Emma Wilson',
    readTime: '8 min read',
    tags: ['Performance', 'Web Development', 'SEO'],
  },
  {
    id: '5',
    title: 'Getting Started with Design Systems',
    excerpt: 'Why design systems matter and how to build one effectively.',
    content: `# Getting Started with Design Systems
## What is a Design System?
A design system is a shared language of design tokens, components, and guidelines.
### Benefits
- Consistency
- Scalability
- Better collaboration
## Conclusion
Investing in a design system pays off as products and teams grow.`,
    date: '2026-03-08',
    author: 'Michael Brown',
    readTime: '9 min read',
    tags: ['Design Systems', 'UI/UX', 'Frontend'],
  },
];
