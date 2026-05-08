// app/api/blog/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
// import { addPost } from "@/lib/blog"; // You can likely remove this if addPost was using fs

function verifyAdminAuth(req: NextRequest): boolean {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((c) => {
      const [key, val] = c.split('=');
      return [key, val?.split(';')[0]];
    })
  );
  return cookies['admin-auth'] === 'true';
}

export async function POST(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const fd = await req.formData();
    const title = fd.get("title") as string;
    const excerpt = fd.get("excerpt") as string;
    const content = fd.get("content") as string;
    const author = (fd.get("author") as string) ?? "ProvidIusTech Media";
    const readingTime = Number(fd.get("readingTime") ?? 4);
    const featured = fd.get("featured") === "true";
    const tags = JSON.parse((fd.get("tags") as string) ?? "[]");

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);

    // 1. Process Cover Image
    let coverImage = "/blog-images/placeholder.jpg";
    const coverFile = fd.get("cover") as File | null;
    if (coverFile && coverFile.size > 0) {
      const blob = await put(`blog/${slug}-cover`, coverFile, {
        access: 'public',
        addRandomSuffix: true,
      });
      coverImage = blob.url;
    }

    // 2. Process Additional Images
    const images: string[] = [];
    for (let i = 0; i < 3; i++) {
      const imageFile = fd.get(`image-${i}`) as File | null;
      if (imageFile && imageFile.size > 0) {
        const blob = await put(`blog/${slug}-img-${i + 1}`, imageFile, {
          access: 'public',
          addRandomSuffix: true,
        });
        images.push(blob.url);
      }
    }

    // 3. Create the Post Object
    const post = {
      slug,
      title,
      excerpt,
      content,
      author,
      readingTime,
      featured,
      tags,
      coverImage,
      images,
      publishedAt: new Date().toISOString(),
    };

    // 4. THE MAGIC STEP: Save the post as a JSON file in Vercel Blob
    // This replaces your "addPost" function and acts as your database.
    const postData = JSON.stringify(post);
    const blogJsonBlob = await put(`posts/${slug}.json`, postData, {
      access: 'public',
      contentType: 'application/json',
    });

    return NextResponse.json({ 
        slug, 
        url: blogJsonBlob.url, // This is the permanent link to your blog data
        message: "Published successfully to Vercel Blob!" 
    }, { status: 201 });

  } catch (err) {
    console.error("[blog/create]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}