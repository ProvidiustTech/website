// lib/blog.ts
import { getSupabaseAdmin } from "./supabase-admin";
import { normalize } from "./blog-normalize";
import type { BlogPost } from "./blog-types";
export type { BlogPost } from "./blog-types";

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) { console.error("[getAllPosts]", error.message); return []; }
    return (data ?? []).map(normalize);
  } catch (err) {
    console.error("[getAllPosts] Supabase not configured:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return normalize(data);
  } catch (err) {
    console.error("[getPostBySlug] Supabase not configured:", err);
    return null;
  }
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("featured", true)
      .order("published_at", { ascending: false })
      .limit(1)
      .single();

    return data ? normalize(data) : null;
  } catch (err) {
    console.error("[getFeaturedPost] Supabase not configured:", err);
    return null;
  }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}