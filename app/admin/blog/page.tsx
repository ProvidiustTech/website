"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useRouter } from "next/navigation";

const ALL_TAGS = ["E-commerce", "Enterprise AI", "Sales", "Automation", "Customer Support"] as const;
type Tag = (typeof ALL_TAGS)[number];
type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1F2E] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1BAA87]/30 focus:border-[#1BAA87] transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#374151] mb-1.5">
        {label}
        {required && <span className="text-[#1BAA87] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminBlogPage() {
  const router = useRouter();
  const { authenticated, loading: authLoading, logout } = useAdminAuth();

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("ProvidIusTech Media");
  const [readingTime, setReadingTime] = useState(4);
  const [tags, setTags] = useState<Tag[]>([]);
  const [featured, setFeatured] = useState(false);

  // Media State
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // UI Status
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  if (authLoading)
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1BAA87] border-t-transparent" />
      </div>
    );
  if (!authenticated) return null;

  function toggleTag(t: Tag) {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setCoverFile(f);
    setCoverPreview(URL.createObjectURL(f));
  }

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 3);
    setImageFiles(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  }

  // Remove a single additional image
  function removeImage(idx: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !excerpt || !content || !coverFile) {
      setStatus("error");
      setMessage("Title, excerpt, content, and a cover image are required.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("slug", slug);
    fd.append("excerpt", excerpt);
    fd.append("content", content);
    fd.append("author", author);
    fd.append("readingTime", String(readingTime));
    fd.append("publishedAt", new Date().toISOString());
    fd.append("tags", JSON.stringify(tags));
    fd.append("featured", String(featured));
    fd.append("cover", coverFile);
    imageFiles.forEach((f, i) => fd.append(`image-${i}`, f));

    try {
      const res = await fetch("/api/blog/create", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to publish");

      setStatus("success");
      setMessage("Published successfully! Redirecting…");
      setTimeout(() => router.push("/admin/blog/dashboard"), 2000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-[#6B7280] hover:text-[#1A1F2E] transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-[#1A1F2E]">New Blog Post</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main content ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-6">
              <Field label="Post Title" required>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Future of Agentic AI Systems"
                  className={inputCls}
                />
              </Field>

              <Field label="Excerpt" required>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short compelling summary..."
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <Field label="Content (HTML)" required>
                <textarea
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<h2>Heading</h2><p>Paragraph content...</p>"
                  className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
                />
              </Field>

              {/* Author + Reading time row */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Author">
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Reading Time (min)">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={readingTime}
                    onChange={(e) => setReadingTime(Number(e.target.value))}
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
              {/* Cover image */}
              <Field label="Cover Image" required>
                <div className="relative border-2 border-dashed rounded-xl p-4 text-center border-gray-200 hover:border-[#1BAA87] transition-colors cursor-pointer">
                  {coverPreview ? (
                    <>
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-[10px] text-[#9CA3AF] mt-2">Click to replace</p>
                    </>
                  ) : (
                    <div className="py-4 text-[#9CA3AF]">
                      <p className="text-2xl mb-1">🖼️</p>
                      <p className="text-xs">Click to upload cover</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleCover}
                  />
                </div>
              </Field>

              {/* Additional images — was missing from original */}
              <Field label="Additional Images (up to 3)">
                <div className="relative border-2 border-dashed rounded-xl p-4 text-center border-gray-200 hover:border-[#1BAA87] transition-colors cursor-pointer">
                  <div className="py-2 text-[#9CA3AF]">
                    <p className="text-xs">Click to upload images</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImages}
                  />
                </div>

                {/* Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={src}
                          alt={`Additional image ${idx + 1}`}
                          className="w-full h-16 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>

              {/* Tags */}
              <Field label="Tags">
                <div className="flex flex-wrap gap-2">
                  {ALL_TAGS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTag(t)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all
                        ${
                          tags.includes(t)
                            ? "bg-[#1BAA87] border-[#1BAA87] text-white"
                            : "bg-white border-gray-200 text-gray-500 hover:border-[#1BAA87]"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Featured toggle */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[#1BAA87] focus:ring-[#1BAA87]"
                  />
                  <span className="text-sm font-semibold text-[#374151]">Mark as Featured</span>
                </label>
              </div>

              {/* Status messages */}
              {status === "error" && (
                <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
                  {message}
                </div>
              )}
              {status === "success" && (
                <div className="p-3 bg-green-50 text-green-600 text-xs rounded-lg border border-green-100">
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#1BAA87] hover:bg-[#169A79] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {status === "loading" && (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                )}
                {status === "loading" ? "Publishing…" : "Publish Now"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}