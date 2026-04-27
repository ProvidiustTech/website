// app/api/blog/[id]/route.ts - GET, UPDATE, DELETE individual post
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getPostBySlug, updatePost, deletePost, BlogPost } from "@/lib/blog";

function verifyAdminAuth(req: NextRequest): boolean {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => {
      const [key, val] = c.split('=');
      return [key, val];
    })
  );
  return cookies['admin-auth'] === 'true';
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Resolve params promise for Next.js 16+
    const { id } = await params;
    
    // Try to fetch by ID first if it's numeric
    if (/^\d+$/.test(id)) {
      // For now, slug-based lookup. In production, you might want numeric ID lookup
      const posts = await import("@/lib/blog").then(m => m.getAllPosts());
      const post = posts.find(p => p.id?.toString() === id);
      if (post) return NextResponse.json(post, { status: 200 });
    }
    
    // Otherwise try slug
    const post = await getPostBySlug(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error("[blog/[id]/GET]", err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const fd = await req.formData();

    const title = fd.get("title") as string;
    const excerpt = fd.get("excerpt") as string;
    const content = fd.get("content") as string;
    const author = fd.get("author") as string;
    const readingTime = fd.get("readingTime") ? Number(fd.get("readingTime")) : undefined;
    const featured = fd.get("featured") === "true";
    const tags = fd.get("tags") ? JSON.parse(fd.get("tags") as string) : undefined;
    let slug = fd.get("slug") as string | undefined;
    let coverImage: string | undefined;
    let images: string[] | undefined;

    // Handle cover image upload
    const coverFile = fd.get("cover") as File | null;
    if (coverFile && coverFile.size > 0) {
      const bytes = await coverFile.arrayBuffer();
      const ext = coverFile.name.split(".").pop() ?? "jpg";
      const filename = `${slug || title.toLowerCase().replace(/\s+/g, "-")}-cover.${ext}`;
      const dir = path.join(process.cwd(), "public", "blog-images");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, filename), Buffer.from(bytes));
      coverImage = `/blog-images/${filename}`;
    }

    // Handle additional images
    const uploadedImages: string[] = [];
    for (let i = 0; i < 3; i++) {
      const imageFile = fd.get(`image-${i}`) as File | null;
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const ext = imageFile.name.split(".").pop() ?? "jpg";
        const filename = `${slug || title.toLowerCase().replace(/\s+/g, "-")}-img-${i + 1}.${ext}`;
        const dir = path.join(process.cwd(), "public", "blog-images");
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, filename), Buffer.from(bytes));
        uploadedImages.push(`/blog-images/${filename}`);
      }
    }

    if (uploadedImages.length > 0) {
      images = uploadedImages;
    }

    const updates: Partial<BlogPost> = {};
    if (title) updates.title = title;
    if (slug) updates.slug = slug;
    if (excerpt) updates.excerpt = excerpt;
    if (content) updates.content = content;
    if (coverImage) updates.coverImage = coverImage;
    if (author) updates.author = author;
    if (readingTime) updates.readingTime = readingTime;
    if (tags) updates.tags = tags;
    updates.featured = featured;
    if (images) updates.images = images;

    const updated = await updatePost(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("[blog/[id]/PUT]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    const success = await deletePost(id);
    
    if (!success) {
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("[blog/[id]/DELETE]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
