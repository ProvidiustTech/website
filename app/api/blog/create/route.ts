// app/api/blog/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { addPost, BlogPost, Tag } from "@/lib/blog";

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    const title = fd.get("title") as string;
    const excerpt = fd.get("excerpt") as string;
    const content = fd.get("content") as string;
    const author = (fd.get("author") as string) ?? "ProvidIusTech Media";
    const readingTime = Number(fd.get("readingTime") ?? 4);
    const featured = fd.get("featured") === "true";
    const tags: Tag[] = JSON.parse((fd.get("tags") as string) ?? "[]");

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: "title, excerpt, and content are required." }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);

    // Handle cover image
    let coverImage = "/blog-images/placeholder.jpg";
    const coverFile = fd.get("cover") as File | null;
    if (coverFile && coverFile.size > 0) {
      const bytes = await coverFile.arrayBuffer();
      const ext = coverFile.name.split(".").pop() ?? "jpg";
      const filename = `${slug}.${ext}`;
      const dir = path.join(process.cwd(), "public", "blog-images");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, filename), Buffer.from(bytes));
      coverImage = `/blog-images/${filename}`;
    }

    const post: BlogPost = {
      slug, title, excerpt, content, author, readingTime, featured, tags,
      coverImage, publishedAt: new Date().toISOString(),
    };

    addPost(post);

    return NextResponse.json({ slug, message: "Published." }, { status: 201 });
  } catch (err) {
    console.error("[blog/create]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
