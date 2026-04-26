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
      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row cursor-pointer">
          {/* Image side */}
          <div className="md:w-[45%] relative min-h-[240px] md:min-h-[360px] bg-[#EAF6F2] flex-shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
            />
          </div>
          {/* Text side */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((t) => (
                <span key={t} className="text-[0.65rem] font-semibold bg-[#E6F7F4] text-[#1BAA87] px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1A1F2E] leading-snug mb-3">
              {post.title}
            </h2>

            {/* Meta row */}
            <p className="text-[0.7rem] sm:text-[0.75rem] font-semibold text-[#1BAA87] tracking-widest uppercase mb-4">
              {post.author}
              <span className="text-[#9CA3AF] font-normal"> · {formatDate(post.publishedAt)} · {post.readingTime} MINS READ</span>
            </p>

            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="inline-flex items-center gap-2 bg-[#1BAA87] hover:bg-[#169A79] text-white text-sm font-semibold px-5 py-2.5 rounded-xl self-start transition-colors">
              Read Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  /* ── CARD (grid item) ─────────────────────────────────────────────────── */
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Cover */}
        <div className="relative h-40 sm:h-48 bg-[#EAF6F2] overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER; }}
          />
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold text-[#1BAA87] tracking-widest uppercase mb-2">
            {post.author}
            <span className="text-[#9CA3AF] font-normal"> · {formatDate(post.publishedAt)} · {post.readingTime} MINS READ</span>
          </p>

          <h3 className="font-bold text-[#1A1F2E] leading-snug text-base sm:text-lg mb-2 line-clamp-3 group-hover:text-[#1BAA87] transition-colors">
            {post.title}
          </h3>

          <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[0.65rem] font-medium bg-[#F0FAF7] text-[#1BAA87] border border-[#C3E9E0] px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-[0.65rem] font-medium bg-[#F0FAF7] text-[#1BAA87] border border-[#C3E9E0] px-2 py-0.5 rounded-full">
                +{post.tags.length - 2}
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-2 bg-[#1BAA87] group-hover:bg-[#169A79] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors">
            Read Story
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
