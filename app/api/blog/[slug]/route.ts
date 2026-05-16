// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { normalize } from "@/lib/blog-normalize";

type Params = { params: Promise<{ slug: string }> };

function internalErrorResponse(err: unknown, status = 500) {
  console.error('[api/blog/[slug]] Unexpected error:', err);
  return NextResponse.json(
    { error: err instanceof Error ? err.message : 'Internal server error' },
    { status }
  );
}

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(normalize(data));
  } catch (err) {
    return internalErrorResponse(err);
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const supabaseAdmin = getSupabaseAdmin();

    const { data, error: fetchError } = await supabaseAdmin
      .from("posts")
      .select("cover_image, images")
      .eq("slug", slug)
      .single() as { data: { cover_image?: string | null; images?: string[] | null } | null; error: unknown };

    if (fetchError) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const { error } = await supabaseAdmin.from("posts").delete().eq("slug", slug);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (data) {
      const urls: string[] = [data.cover_image, ...(data.images ?? [])].filter(Boolean);
      const paths = urls
        .map((u) => u.split("/blog-media/")[1])
        .filter(Boolean);
      if (paths.length) {
        const { error: removeError } = await supabaseAdmin.storage.from("blog-media").remove(paths);
        if (removeError) {
          console.error('[DELETE /api/blog/[slug]] Storage remove error:', removeError);
        }
      }
    }

    return NextResponse.json({ deleted: true });
  } catch (err) {
    return internalErrorResponse(err);
  }
}

// ── PUT ───────────────────────────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  const { slug } = await params;
  const supabaseAdmin = getSupabaseAdmin();

  console.log(`[PUT /api/blog/${slug}] Starting update for slug: ${slug}`);

  try {
    const fd = await req.formData();
    console.log(`[PUT /api/blog/${slug}] FormData received with keys:`, Array.from(fd.keys()));

    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("posts")
      .select("cover_image, images")
      .eq("slug", slug)
      .single() as { data: { cover_image?: string | null; images?: string[] | null } | null; error: unknown };

    if (fetchError) {
      console.error(`[PUT /api/blog/${slug}] Error fetching existing post:`, fetchError);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    console.log(`[PUT /api/blog/${slug}] Existing post data:`, existing);

    let coverImage = existing?.cover_image ?? "";
    const coverFile = fd.get("cover") as File | null;
    if (coverFile && coverFile.size > 0) {
      console.log(`[PUT /api/blog/${slug}] Uploading cover file: ${coverFile.name}, size: ${coverFile.size}`);
      const ext = coverFile.name.split(".").pop();
      const path = `covers/${slug}-${Date.now()}.${ext}`;
      const { error } = await supabaseAdmin.storage
        .from("blog-media")
        .upload(path, coverFile, { upsert: true });
      if (error) {
        console.error(`[PUT /api/blog/${slug}] Cover upload error:`, error);
        return NextResponse.json({ error: `Cover upload failed: ${error.message}` }, { status: 500 });
      }
      const { data } = supabaseAdmin.storage.from("blog-media").getPublicUrl(path);
      coverImage = data.publicUrl;
      console.log(`[PUT /api/blog/${slug}] Cover uploaded to: ${coverImage}`);
    }

    let images: string[] = existing?.images ?? [];
    const newFiles = [0, 1, 2]
      .map((i) => fd.get(`image-${i}`) as File | null)
      .filter((f): f is File => !!f && f.size > 0);

    console.log(`[PUT /api/blog/${slug}] New image files: ${newFiles.length}`);

    if (newFiles.length > 0) {
      const uploaded: string[] = [];
      for (const [i, f] of newFiles.entries()) {
        console.log(`[PUT /api/blog/${slug}] Uploading image ${i}: ${f.name}, size: ${f.size}`);
        const ext = f.name.split(".").pop();
        const path = `images/${slug}-${i}-${Date.now()}.${ext}`;
        const { error } = await supabaseAdmin.storage
          .from("blog-media")
          .upload(path, f, { upsert: true });
        if (error) {
          console.error(`[PUT /api/blog/${slug}] Image ${i} upload error:`, error);
          return NextResponse.json({ error: `Image upload failed: ${error.message}` }, { status: 500 });
        }
        const { data } = supabaseAdmin.storage.from("blog-media").getPublicUrl(path);
        console.log(`[PUT /api/blog/${slug}] Image ${i} uploaded to: ${data.publicUrl}`);
        uploaded.push(data.publicUrl);
      }
      images = uploaded;
      console.log(`[PUT /api/blog/${slug}] Final images array:`, images);
    }

    const updateData = {
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
    };

    console.log(`[PUT /api/blog/${slug}] Update data:`, updateData);

    const { error } = await (supabaseAdmin.from("posts") as any)
      .update(updateData)
      .eq("slug", slug);

    if (error) {
      console.error(`[PUT /api/blog/${slug}] Database update error:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`[PUT /api/blog/${slug}] Update successful`);
    return NextResponse.json({ slug });
  } catch (err) {
    console.error(`[PUT /api/blog/${slug}] Unexpected error:`, err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
