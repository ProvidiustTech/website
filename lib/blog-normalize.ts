// lib/blog-normalize.ts
// Single source of truth for DB row → BlogPost shape

import { BlogPost } from "./blog";

export function normalize(row: any): BlogPost {
  return {
    id:          row.id,
    slug:        row.slug,
    title:       row.title,
    excerpt:     row.excerpt,
    content:     row.content,
    author:      row.author,
    readingTime: row.reading_time,
    tags:        row.tags ?? [],
    featured:    row.featured ?? false,
    coverImage:  row.cover_image ?? "",
    images:      row.images ?? [],
    publishedAt: row.published_at,
    updatedAt:   row.updated_at,
  };
}