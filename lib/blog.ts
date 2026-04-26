import { prisma } from "./prisma";

export type Tag = "E-commerce" | "Enterprise AI" | "Sales" | "Automation" | "Customer Support";

export interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;          // HTML
  coverImage: string;
  author: string;
  publishedAt: string;      // ISO 8601
  readingTime: number;      // minutes
  tags: Tag[];
  featured?: boolean;
  images?: string[];        // Additional images (2-3 per post)
  updatedAt?: string;
  createdAt?: string;
}

// ─── Database Functions ───────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return posts.map((p) => ({
      ...p,
      tags: typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags,
      images: typeof p.images === "string" ? JSON.parse(p.images) : p.images || [],
      publishedAt: p.publishedAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("[getAllPosts]", err);
    return [];
  }
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { featured: true },
      orderBy: { publishedAt: "desc" },
    });
    if (!post) return undefined;
    return {
      ...post,
      tags: typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags,
      images: typeof post.images === "string" ? JSON.parse(post.images) : post.images || [],
      publishedAt: post.publishedAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      createdAt: post.createdAt.toISOString(),
    };
  } catch (err) {
    console.error("[getFeaturedPost]", err);
    return undefined;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!post) return undefined;
    return {
      ...post,
      tags: typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags,
      images: typeof post.images === "string" ? JSON.parse(post.images) : post.images || [],
      publishedAt: post.publishedAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      createdAt: post.createdAt.toISOString(),
    };
  } catch (err) {
    console.error("[getPostBySlug]", err);
    return undefined;
  }
}

export async function addPost(post: BlogPost): Promise<BlogPost | null> {
  try {
    const created = await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        author: post.author,
        readingTime: post.readingTime,
        tags: JSON.stringify(post.tags),
        featured: post.featured ?? false,
        images: JSON.stringify(post.images || []),
        publishedAt: new Date(post.publishedAt),
      },
    });
    return {
      ...created,
      tags: typeof created.tags === "string" ? JSON.parse(created.tags) : created.tags,
      images: typeof created.images === "string" ? JSON.parse(created.images) : created.images || [],
      publishedAt: created.publishedAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
      createdAt: created.createdAt.toISOString(),
    };
  } catch (err) {
    console.error("[addPost]", err);
    return null;
  }
}

export async function updatePost(id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(updates.title && { title: updates.title }),
        ...(updates.slug && { slug: updates.slug }),
        ...(updates.excerpt && { excerpt: updates.excerpt }),
        ...(updates.content && { content: updates.content }),
        ...(updates.coverImage && { coverImage: updates.coverImage }),
        ...(updates.author && { author: updates.author }),
        ...(updates.readingTime && { readingTime: updates.readingTime }),
        ...(updates.tags && { tags: JSON.stringify(updates.tags) }),
        ...(updates.featured !== undefined && { featured: updates.featured }),
        ...(updates.images && { images: JSON.stringify(updates.images) }),
        ...(updates.publishedAt && { publishedAt: new Date(updates.publishedAt) }),
      },
    });
    return {
      ...updated,
      tags: typeof updated.tags === "string" ? JSON.parse(updated.tags) : updated.tags,
      images: typeof updated.images === "string" ? JSON.parse(updated.images) : updated.images || [],
      publishedAt: updated.publishedAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      createdAt: updated.createdAt.toISOString(),
    };
  } catch (err) {
    console.error("[updatePost]", err);
    return null;
  }
}

export async function deletePost(id: number): Promise<boolean> {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    return true;
  } catch (err) {
    console.error("[deletePost]", err);
    return false;
  }
}

export function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    .toUpperCase();
}
