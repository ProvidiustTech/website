'use client';
// components/blog/BlogCard.tsx
import Link from "next/link";
import { BlogPost, formatDate } from "@/lib/blog";

interface Props {
  post: BlogPost;
  variant?: "featured" | "card";
}

// Fallback placeholder image (SVG data-uri) — no external dependency
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='480' viewBox='0 0 800 480'%3E%3Crect width='800' height='480' fill='%23EAF6F2'/%3E%3Ccircle cx='400' cy='200' r='60' fill='%231BAA87' opacity='.25'/%3E%3Crect x='300' y='280' width='200' height='20' rx='4' fill='%231BAA87' opacity='.2'/%3E%3Crect x='340' y='314' width='120' height='14' rx='4' fill='%231BAA87' opacity='.15'/%3E%3C/svg%3E";

export default function BlogCard({ post, variant = "card" }: Props) {
  /* ── FEATURED (hero row: image right, text left) ──────────────────────── */
  if (variant === "featured") {
    return (
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image side */}
          <div className="md:w-[42%] xl:left-[56%] relative min-h-[220px] bg-[] flex-shrink-0 overflow-hidden">
            {/* Decorative circle behind image */}
            <div className="absolute bottom-4 right-4 w-40 h-40 rounded-full opacity-60" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-contain p-4"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
            />
          </div>
          {/* Text side */}
          <div className="flex-1 p-7 xl:relative xl:right-[40%] flex flex-col justify-center">
            <h2 className="xl:text-5xl font-bold text-[#1A1F2E] leading-snug mb-3">
              <span className="text-[#1A1F2E]">How to Automate </span>
              <span className="text-[#1BAA87]">Customer Support</span>
              <span className="text-[#1A1F2E]"> for E-commerce (Step-by-Step Guide)  that runs itself</span>
            </h2>

            {/* Meta row */}
            <p className="text-[0.6rem] font-bold text-[#1BAA87] tracking-widest uppercase mb-1">
              {post.author}
              <span className="text-[#9CA3AF] font-normal"> · {formatDate(post.publishedAt)} · {post.readingTime} MINS READ</span>
            </p>

            <p className="text-[#6B7280] text-lg leading-relaxed mt-2 mb-5 line-clamp-4">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.map((t) => (
                <span key={t} className="text-[0.6rem] font-medium bg-[#F0FAF7] text-[#1BAA87] border border-[#C3E9E0] px-2.5 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 bg-[#1BAA87] hover:bg-[#169A79] text-white text-sm font-semibold px-5 py-2.5 rounded-xl self-start transition-colors"
            >
              Read Full Story
            </Link>
          </div>

          
        </div>
      </article>
    );
  }

  /* ── CARD (grid item) ─────────────────────────────────────────────────── */
  return (
    <article className="bg-white w-[80%] rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[46vh] hover:shadow-md transition-shadow">
      {/* Cover */}
      <div className="relative h-44 bg-[#EAF6F2] overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-contain p-3"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[0.6rem] font-bold text-[#1BAA87] tracking-widest uppercase mb-1.5">
          {post.author}
          <span className="text-[#9CA3AF] font-normal"> · {formatDate(post.publishedAt)} · {post.readingTime} MINS READ</span>
        </p>

        <h3 className="font-bold text-[#1A1F2E] leading-snug text-sm mb-2 line-clamp-3">
          {post.title}
        </h3>

        <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-4 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((t) => (
            <span key={t} className="text-[.8rem] font-medium bg-[#F0FAF7] text-[#1BAA87] border border-[#C3E9E0] px-2.5 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 bg-[#1BAA87] hover:bg-[#169A79] text-white text-xs font-semibold px-4 py-2 rounded-xl self-start transition-colors mt-auto"
        >
          Read Full Story
        </Link>
      </div>
    </article>
  );
}
