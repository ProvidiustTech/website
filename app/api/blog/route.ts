// app/api/blog/route.ts
import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "posts/" });

    // Filter to only .json files (ignore folder placeholders)
    const jsonBlobs = blobs.filter((b) => b.pathname.endsWith(".json"));

    const posts = await Promise.all(
      jsonBlobs.map(async (blob) => {
        const res = await fetch(blob.url);
        if (!res.ok) return null;
        return res.json();
      })
    );

    // Strip nulls from any failed fetches
    const valid = posts.filter(Boolean);

    // Sort newest first
    valid.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json(valid);
  } catch (err) {
    console.error("[api/blog GET]", err);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}