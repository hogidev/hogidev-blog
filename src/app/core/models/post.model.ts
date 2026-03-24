export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  file: string;
}

export interface PostDetail extends PostSummary {
  content: string;
}
