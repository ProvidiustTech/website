// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { normalize } from "@/lib/blog-normalize";

type Params = { params: Promise<{ slug: string }> };

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  return NextResponse.json(normalize(data));
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { slug } = await params;

  // Grab media URLs before deleting the row
  const { data } = await supabaseAdmin
    .from("posts")
    .select("cover_image, images")
    .eq("slug", slug)
    .single();

  const { error } = await supabaseAdmin.from("posts").delete().eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Best-effort media cleanup
  if (data) {
    const urls: string[] = [data.cover_image, ...(data.images ?? [])].filter(Boolean);
    const paths = urls
      .map((u) => u.split("/blog-media/")[1])
      .filter(Boolean);
    if (paths.length) {
      await supabaseAdmin.storage.from("blog-media").remove(paths);
    }
  }

  return NextResponse.json({ deleted: true });
}

// ── PUT ───────────────────────────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const fd = await req.formData();

    // Get existing for media fallback
    const { data: existing } = await supabaseAdmin
      .from("posts")
      .select("cover_image, images")
      .eq("slug", slug)
      .single();

    // Cover — only upload if a new file was attached
    let coverImage = existing?.cover_image ?? "";
    const coverFile = fd.get("cover") as File | null;
    if (coverFile && coverFile.size > 0) {
      const ext = coverFile.name.split(".").pop();
      const path = `covers/${slug}-${Date.now()}.${ext}`;
      const { error } = await supabaseAdmin.storage
        .from("blog-media")
        .upload(path, coverFile, { upsert: true });
      if (!error) {
        const { data } = supabaseAdmin.storage.from("blog-media").getPublicUrl(path);
        coverImage = data.publicUrl;
      }
    }

    // Additional images — only replace if new files provided
    let images: string[] = existing?.images ?? [];
    const newFiles = [0, 1, 2]
      .map((i) => fd.get(`image-${i}`) as File | null)
      .filter((f): f is File => !!f && f.size > 0);

    if (newFiles.length > 0) {
      const uploaded = await Promise.all(
        newFiles.map(async (f, i) => {
          const ext = f.name.split(".").pop();
          const path = `images/${slug}-${i}-${Date.now()}.${ext}`;
          const { error } = await supabaseAdmin.storage
            .from("blog-media")
            .upload(path, f, { upsert: true });
          if (error) return "";
          const { data } = supabaseAdmin.storage.from("blog-media").getPublicUrl(path);
          return data.publicUrl;
        })
      );
      images = uploaded.filter(Boolean);
    }

    const { error } = await supabaseAdmin
      .from("posts")
      .update({
        title:        fd.get("title") as string,
        excerpt:      fd.get("excerpt") as string,
        content:      fd.get("content") as string,
        author:       fd.get("author") as string,
        reading_time: Number(fd.get("readingTime")),
        tags:         JSON.parse((fd.get("tags") as string) || "[]"),
        featured:     fd.get("featured") === "true",
        cover_image:  coverImage,
        images,
        updated_at:   new Date().toISOString(),
      })
      .eq("slug", slug);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ slug });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}