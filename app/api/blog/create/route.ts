// app/api/blog/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

async function uploadToStorage(file: File, path: string): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.storage
    .from("blog-media")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabaseAdmin.storage.from("blog-media").getPublicUrl(path);
  return data.publicUrl;
}

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const fd = await req.formData();

    const title = fd.get("title") as string;
    const slug =
      (fd.get("slug") as string) ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Upload cover
    const coverFile = fd.get("cover") as File | null;
    if (!coverFile || coverFile.size === 0) {
      return NextResponse.json({ error: "Cover image is required" }, { status: 400 });
    }
    const ext = coverFile.name.split(".").pop();
    const coverImage = await uploadToStorage(
      coverFile,
      `covers/${slug}-${Date.now()}.${ext}`
    );

    // Upload additional images
    const images: string[] = [];
    for (let i = 0; i < 3; i++) {
      const f = fd.get(`image-${i}`) as File | null;
      if (!f || f.size === 0) continue;
      const imgExt = f.name.split(".").pop();
      const url = await uploadToStorage(f, `images/${slug}-${i}-${Date.now()}.${imgExt}`);
      images.push(url);
    }

    const { error } = await (supabaseAdmin.from("posts") as any).insert({
      slug,
      title,
      excerpt:      fd.get("excerpt") as string,
      content:      fd.get("content") as string,
      author:       fd.get("author") as string,
      reading_time: Number(fd.get("readingTime")),
      tags:         JSON.parse((fd.get("tags") as string) || "[]"),
      featured:     fd.get("featured") === "true",
      cover_image:  coverImage,
      images,
      published_at: (fd.get("publishedAt") as string) || new Date().toISOString(),
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ slug });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
