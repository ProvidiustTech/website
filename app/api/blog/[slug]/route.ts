// app/api/blog/[slug]/route.ts
import { list, del, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ slug: string }> };

// ── GET /api/blog/[slug] ──────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const { blobs } = await list({ prefix: `posts/${slug}.json` });
    if (blobs.length === 0)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const res = await fetch(blobs[0].url);
    if (!res.ok) throw new Error("Fetch failed");

    const post = await res.json();
    return NextResponse.json(post);
  } catch (err) {
    console.error("[api/blog/[slug] GET]", err);
    return NextResponse.json({ error: "Failed to load post" }, { status: 500 });
  }
}

// ── DELETE /api/blog/[slug] ───────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const { blobs } = await list({ prefix: `posts/${slug}.json` });
    if (blobs.length === 0)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    // Also delete cover + additional images stored under blog/slug/
    const { blobs: mediaBlobs } = await list({ prefix: `blog/${slug}/` });

    await Promise.all([
      del(blobs[0].url),
      ...mediaBlobs.map((b) => del(b.url)),
    ]);

    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error("[api/blog/[slug] DELETE]", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

// ── PUT /api/blog/[slug] ──────────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    // Find the existing blob first so we can preserve fields not in the form
    const { blobs: existing } = await list({ prefix: `posts/${slug}.json` });
    if (existing.length === 0)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const existingRes = await fetch(existing[0].url);
    const existingPost = await existingRes.json();

    const fd = await req.formData();

    // Upload new cover if provided
    let coverImage = existingPost.coverImage;
    const coverFile = fd.get("cover") as File | null;
    if (coverFile && coverFile.size > 0) {
      const { url } = await put(
        `blog/${slug}/cover-${Date.now()}.${coverFile.name.split(".").pop()}`,
        coverFile,
        { access: "public" }
      );
      coverImage = url;
    }

    // Upload new additional images if provided
    let images: string[] = existingPost.images ?? [];
    const newImageFiles = [
      fd.get("image-0") as File | null,
      fd.get("image-1") as File | null,
      fd.get("image-2") as File | null,
    ].filter((f): f is File => !!f && f.size > 0);

    if (newImageFiles.length > 0) {
      images = await Promise.all(
        newImageFiles.map(async (f, i) => {
          const { url } = await put(
            `blog/${slug}/img-${i}-${Date.now()}.${f.name.split(".").pop()}`,
            f,
            { access: "public" }
          );
          return url;
        })
      );
    }

    const updatedPost = {
      ...existingPost,
      title: fd.get("title") as string,
      excerpt: fd.get("excerpt") as string,
      content: fd.get("content") as string,
      author: fd.get("author") as string,
      readingTime: Number(fd.get("readingTime")),
      tags: JSON.parse(fd.get("tags") as string),
      featured: fd.get("featured") === "true",
      coverImage,
      images,
      updatedAt: new Date().toISOString(),
    };

    // Overwrite the existing blob
    await put(`posts/${slug}.json`, JSON.stringify(updatedPost), {
      access: "public",
      allowOverwrite: true,
      contentType: "application/json",
    });

    return NextResponse.json({ slug });
  } catch (err) {
    console.error("[api/blog/[slug] PUT]", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}