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

export default function BlogPage() {
  const featured = getFeaturedPost();
  const allPosts = getAllPosts();
  // Non-featured posts for the grid
  const gridPosts = allPosts.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="bg-[#F6F6F6] overflow-y-hidden">
      <Navbar />

    

      <main className="min-h-screen bg-[#F6F6F6] mb-20 pt-32 w-[88%] max-w-8xl mx-auto">
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b  rounded-3xl shadow-sm from-[#14b8a558] to-[#dbebf3] py-16 px-4 text-center">
        <span className="inline-flex items-center gap-2 text-xs xl:text-sm xl:mt-3 font-medium text-gray-600 bg-white  rounded-full px-4 py-1.5 mb-6 shadow-sm">
          <img src="/check1.png" className="w-7 xl:w-10" alt="" />
          Stay updated with our News &amp; Insight
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-8 font-bold text-[#1A1F2E] mb-4 leading-tight">
          Read our Topics on AI, AGI,
          <br className="hidden sm:block" /> and Agentic Systems
        </h1>
        <p className="text-[#6B7280] max-w-4xl mx-auto text-base sm:text-lg">
          Explore ProvidIusTech&apos;s AI-driven customer support solutions, enhancing efficiency and
          satisfaction across diverse sectors.
        </p>
      </section>

      <div className="max-w-9xl w-[100%] rounded-3xl mx-auto bg-white mt-20 xl:py-20 xl:px-40 pb-20">
        {/* ── Featured post ──────────────────────────────────────────────── */}
        {featured && (
          <section className="mb-12">
            <BlogCard post={featured} variant="featured" />
          </section>
        )}

        {/* ── Grid of remaining posts ────────────────────────────────────── */}
        {gridPosts.length > 0 && (
          <section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {gridPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {allPosts.length === 0 && (
          <div className="text-center py-24 text-[#9CA3AF]">
            <p className="text-lg font-medium">No posts yet. Check back soon!</p>
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
