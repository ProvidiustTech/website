// lib/blog-types.ts
export interface BlogPost {
  id?:         string;
  slug:        string;
  title:       string;
  excerpt:     string;
  content:      string;
  author:      string;
  readingTime: number;
  tags:        string[];
  featured?:   boolean;
  coverImage:  string;
  images?:     string[];
  publishedAt: string;
  updatedAt?:  string;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
