// app/blog/page.tsx  —  Blog listing / index page
import BlogCard from "@/components/blog/BlogCard";
import CTASection from "@/components/CTASection";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";

export const metadata = {
  title: "Blog | ProvidIusTech",
  description: "Read our Topics on AI, AGI, and Agentic Systems",
};

export default async function BlogPage() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);

  // Non-featured posts for the grid
  const gridPosts = allPosts.filter((p) => !featured || p.slug !== featured.slug);

  return (
    <div className="bg-[#F6F6F6] overflow-y-hidden">
      <Navbar />


      <main className="min-h-screen bg-[#F6F6F6] mb-20 pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6 lg:px-8 w-full">
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b rounded-2xl sm:rounded-3xl shadow-sm from-[#14b8a558] to-[#dbebf3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center max-w-6xl mx-auto mb-12 md:mb-20">
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-white rounded-full px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 shadow-sm">
          <img src="/check1.png" className="w-5 sm:w-7 md:w-10" alt="" />
          Stay updated with our News &amp; Insight
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1F2E] mb-3 sm:mb-4 leading-tight">
          Read our Topics on AI, AGI,
          <br className="hidden sm:block" /> and Agentic Systems
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#6B7280] max-w-4xl mx-auto px-2">
          Explore ProvidIusTech&apos;s AI-driven customer support solutions, enhancing efficiency and
          satisfaction across diverse sectors.
        </p>
      </section>

      <div className="max-w-6xl mx-auto">
        {/* ── Featured post ──────────────────────────────────────────────── */}
        {featured && (
          <section className="mb-12 md:mb-20">
            <BlogCard post={featured} variant="featured" />
          </section>
        )}

        {/* ── Grid of remaining posts ────────────────────────────────────── */}
        {gridPosts.length > 0 && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {gridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {allPosts.length === 0 && (
          <div className="text-center py-20 sm:py-24 text-[#9CA3AF]">
            <p className="text-base sm:text-lg font-medium">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </main>

      <FadeInOnScroll delay={100}>
        <CTASection />
      </FadeInOnScroll>

      <FadeInOnScroll>
        <Footer />
      </FadeInOnScroll>
    </div>
  );
}
