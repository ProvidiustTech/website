"use client";
// app/admin/blog/edit/[id]/page.tsx — Edit existing blog post

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { BlogPost } from "@/lib/blog";

const ALL_TAGS = ["E-commerce", "Enterprise AI", "Sales", "Automation", "Customer Support"] as const;
type Tag = (typeof ALL_TAGS)[number];
type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full bg-[#F8FAFB] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1A1F2E] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1BAA87]/30 focus:border-[#1BAA87] transition-colors";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#374151] mb-1.5">
        {label}{required && <span className="text-[#1BAA87] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [readingTime, setReadingTime] = useState(4);
  const [tags, setTags] = useState<Tag[]>([]);
  const [featured, setFeatured] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Failed to load post");
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setAuthor(data.author);
        setReadingTime(data.readingTime);
        setTags(data.tags);
        setFeatured(data.featured || false);
        setCoverPreview(data.coverImage);
        setImagePreviews(data.images || []);
      } catch (err) {
        setMessage("Failed to load post");
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  function toggleTag(t: Tag) {
    setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
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

  function removeImage(index: number) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      setStatus("error");
      setMessage("Title, excerpt, and content are required.");
      return;
    }
    
    setStatus("loading");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("excerpt", excerpt);
    fd.append("content", content);
    fd.append("author", author);
    fd.append("readingTime", String(readingTime));
    fd.append("tags", JSON.stringify(tags));
    fd.append("featured", String(featured));
    if (coverFile) fd.append("cover", coverFile);
    imageFiles.forEach((f, i) => fd.append(`image-${i}`, f));

    try {
      const res = await fetch(`/api/blog/${id}`, { method: "PUT", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      
      setStatus("success");
      setMessage("Post updated successfully!");
      setTimeout(() => router.push("/admin/blog/dashboard"), 2000);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8]">
        <Navbar />
        <div className="flex items-center justify-center min-h-[70vh]">
          <p className="text-[#6B7280]">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-7">
          <span className="inline-block text-xs font-semibold bg-[#E6F7F4] text-[#1BAA87] px-3 py-1 rounded-full mb-3">Admin</span>
          <h1 className="text-2xl font-bold text-[#1A1F2E]">Edit Blog Post</h1>
          <p className="text-sm text-[#6B7280] mt-1">Update this blog post and save changes.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Post Title" required>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="How to Automate Customer Support…"
                className={inputCls}
              />
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Author">
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} />
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

            <Field label="Tags">
              <div className="flex flex-wrap gap-2 mt-1">
                {ALL_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                      ${tags.includes(t)
                        ? "bg-[#1BAA87] border-[#1BAA87] text-white"
                        : "bg-white border-gray-200 text-[#6B7280] hover:border-[#1BAA87] hover:text-[#1BAA87]"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setFeatured((v) => !v)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${featured ? "bg-[#1BAA87]" : "bg-gray-200"}`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                      featured ? "left-5" : "left-0.5"
                    }`}
                  />
                </div>
                <span className="text-sm text-[#374151] font-medium">Mark as Featured post</span>
              </label>
            </Field>

            <Field label="Cover Image">
              <label className="block cursor-pointer">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-colors
                  ${coverPreview ? "border-[#1BAA87]" : "border-gray-200 hover:border-[#1BAA87]"}`}
                >
                  {coverPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverPreview} alt="preview" className="mx-auto max-h-40 rounded-lg object-contain" />
                  ) : (
                    <div className="py-5">
                      <svg className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-[#9CA3AF]">Click to upload cover (JPG, PNG, WebP · 1200×630 recommended)</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleCover} />
                </div>
              </label>
            </Field>

            <Field label="Additional Images (2-3 images)">
              <label className="block cursor-pointer">
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-colors
                  ${imagePreviews.length > 0 ? "border-[#1BAA87]" : "border-gray-200 hover:border-[#1BAA87]"}`}
                >
                  {imagePreviews.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={preview} alt={`preview-${idx}`} className="w-full h-24 rounded-lg object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-5">
                      <svg className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-xs text-[#9CA3AF]">Click to add images (up to 3)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImages}
                  />
                </div>
              </label>
            </Field>

            <Field label="Excerpt" required>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short compelling summary shown on listing cards…"
                className={`${inputCls} resize-none`}
              />
            </Field>

            <Field label="Content (HTML)" required>
              <textarea
                rows={14}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"<h2>Introduction</h2>\n<p>Your content here…</p>"}
                className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              />
              <p className="mt-1 text-xs text-[#9CA3AF]">Supported tags: h2, h3, p, ul, li, strong, em, a</p>
            </Field>

            {status === "error" && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{message}</div>}
            {status === "success" && (
              <div className="bg-[#E6F7F4] border border-[#A7E3D4] text-[#0E7A5A] rounded-xl px-4 py-3 text-sm font-medium">
                ✓ {message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 bg-[#1BAA87] hover:bg-[#169A79] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm text-sm"
              >
                {status === "loading" ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/blog/dashboard")}
                className="px-6 bg-white border border-gray-200 text-[#1A1F2E] hover:bg-gray-50 font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
