"use client";
// app/admin/blog/dashboard/page.tsx
// ⚠️ Client component — imports NOTHING from lib/blog.ts or lib/supabase-admin.ts
// All data comes through /api/blog (server-side API route)

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type SortField = "title" | "publishedAt" | "author";
type SortOrder = "asc" | "desc";

// Minimal inline type — no import from lib/blog.ts
interface Post {
  slug:        string;
  title:       string;
  excerpt:     string;
  author:      string;
  publishedAt: string;
  coverImage?: string;
  featured?:   boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function AdminDashboard() {
  const { authenticated, loading: authLoading, logout } = useAdminAuth();
  const [posts, setPosts]                 = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading]             = useState(true);
  const [searchTerm, setSearchTerm]       = useState("");
  const [sortField, setSortField]         = useState<SortField>("publishedAt");
  const [sortOrder, setSortOrder]         = useState<SortOrder>("desc");
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [message, setMessage]             = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ── Fetch all posts from API route (server-side, has service role key) ───────
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog", { credentials: "include" });
        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok) {
          throw new Error(data?.error ?? `Failed to load posts (${res.status})`);
        }

        const arr = Array.isArray(data) ? data : (data?.posts ?? []);
        setPosts(arr);
        setFilteredPosts(arr);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to load posts" });
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // ── Filter + sort ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let results = [...posts];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.excerpt.toLowerCase().includes(term) ||
          p.author.toLowerCase().includes(term)
      );
    }

    results.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];
      if (sortField === "publishedAt") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredPosts(results);
  }, [posts, searchTerm, sortField, sortOrder]);

  // ── Auth guards ───────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1BAA87] border-t-transparent mx-auto mb-4" />
          <p className="text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }
  if (!authenticated) return null;

  if (loading) {
    return (
      <div className=" bg-[#F4F6F8] flex items-center justify-center min-h-[70vh]">
        <p className="text-[#6B7280]">Loading posts...</p>
      </div>
    );
  }

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE", credentials: "include" });
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      if (!res.ok) throw new Error(data?.error ?? "Failed to delete");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setMessage({ type: "success", text: "Post deleted successfully" });
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to delete post" });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSlugs.size === 0) return;
    const count = selectedSlugs.size;
    try {
      await Promise.all(
        Array.from(selectedSlugs).map((slug) =>
          fetch(`/api/blog/${slug}`, { method: "DELETE" })
        )
      );
      setPosts((prev) => prev.filter((p) => !selectedSlugs.has(p.slug)));
      setSelectedSlugs(new Set());
      setMessage({ type: "success", text: `Deleted ${count} posts` });
    } catch {
      setMessage({ type: "error", text: "Failed to delete some posts" });
    }
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedSlugs(checked ? new Set(filteredPosts.map((p) => p.slug)) : new Set());
  };

  const toggleSelect = (slug: string, checked: boolean) => {
    const s = new Set(selectedSlugs);
    checked ? s.add(slug) : s.delete(slug);
    setSelectedSlugs(s);
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1F2E]">Blog Management</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Session expires after 10 mins of inactivity</p>
          </div>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <p className="text-sm text-[#6B7280] mt-1">Manage all your blog posts in one place</p>
          <Link
            href="/admin/blog"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-[#1BAA87] hover:bg-[#169A79] text-white font-semibold px-4 sm:px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </Link>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-4 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-[#E6F7F4] text-[#0E7A5A] border border-[#A7E3D4]"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#F8FAFB] border border-gray-200 rounded-lg text-sm text-[#1A1F2E] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1BAA87]/30 focus:border-[#1BAA87] transition-colors"
            />
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="w-full px-4 py-2 bg-[#F8FAFB] border border-gray-200 rounded-lg text-sm text-[#1A1F2E] focus:outline-none focus:ring-2 focus:ring-[#1BAA87]/30 focus:border-[#1BAA87] transition-colors cursor-pointer"
            >
              <option value="publishedAt">Published Date</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full px-4 py-2 bg-[#F8FAFB] border border-gray-200 rounded-lg text-sm text-[#1A1F2E] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1BAA87]/30 transition-colors text-left flex items-center justify-between"
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={sortOrder === "asc" ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"} />
              </svg>
            </button>
            {selectedSlugs.size > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
              >
                Delete {selectedSlugs.size} selected
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedSlugs.size > 0 && selectedSlugs.size === filteredPosts.length}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#1BAA87] cursor-pointer"
                  />
                </th>
                <th className="px-4 sm:px-6 py-4 text-left font-semibold text-[#1A1F2E]">Title</th>
                <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left font-semibold text-[#1A1F2E]">Author</th>
                <th className="hidden lg:table-cell px-4 sm:px-6 py-4 text-left font-semibold text-[#1A1F2E]">Published</th>
                <th className="px-4 sm:px-6 py-4 text-left font-semibold text-[#1A1F2E]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 sm:px-6 py-8 text-center text-[#9CA3AF]">No posts found</td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.slug} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSlugs.has(post.slug)}
                        onChange={(e) => toggleSelect(post.slug, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1BAA87] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={post.coverImage} alt={post.title} className="w-10 h-10 rounded object-cover hidden sm:block" />
                        )}
                        <div>
                          <p className="font-medium text-[#1A1F2E] line-clamp-2">{post.title}</p>
                          {post.featured && (
                            <span className="text-xs bg-[#E6F7F4] text-[#1BAA87] px-2 py-0.5 rounded-full">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-[#6B7280]">{post.author}</td>
                    <td className="hidden lg:table-cell px-4 sm:px-6 py-4 text-[#6B7280]">{formatDate(post.publishedAt)}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/edit/${post.slug}`}
                          className="px-3 py-1.5 text-xs font-medium bg-[#E6F7F4] text-[#1BAA87] hover:bg-[#1BAA87] hover:text-white rounded transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(post.slug)}
                          className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-[#6B7280]">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      {/* Delete modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-[#1A1F2E] mb-2">Delete Post?</h3>
            <p className="text-[#6B7280] mb-6">This action cannot be undone. The post will be permanently deleted.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium bg-gray-100 text-[#1A1F2E] hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}