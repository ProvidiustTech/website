// lib/blog.ts
import { supabaseAdmin } from "./supabase-admin";
import { normalize } from "./blog-normalize";

export interface BlogPost {
  id?:         string;
  slug:        string;
  title:       string;
  excerpt:     string;
  content:     string;
  author:      string;
  readingTime: number;
  tags:        string[];
  featured?:   boolean;
  coverImage:  string;
  images?:     string[];
  publishedAt: string;
  updatedAt?:  string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) { console.error("[getAllPosts]", error.message); return []; }
  return (data ?? []).map(normalize);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return normalize(data);
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const { data } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .single();

  return data ? normalize(data) : null;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}