import macosWebDevSetup2026 from './posts/macos-web-dev-setup-2026.md';

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
 * Blog post metadata + markdown body. To add a post: drop a `.md` file in
 * `./posts/`, then add an entry here pointing at it.
 */
export const POSTS: PostDetail[] = [
  {
    slug: 'macos-web-dev-setup-2026',
    title: 'My macOS Web Development Setup (2026)',
    date: 'Mar 2026',
    readMinutes: 6,
    excerpt:
      'A practical, step-by-step macOS setup: Xcode CLI tools, Homebrew, terminal, Git + SSH, Node via NVM, and editors.',
    tags: ['macOS', 'Setup', 'Tooling'],
    content: macosWebDevSetup2026
  }
];
