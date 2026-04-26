// app/api/blog/route.ts - GET all posts
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    console.error("[blog/GET]", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
