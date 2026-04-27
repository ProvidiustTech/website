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

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Featured Post */}
          {featured && (
            <section className="mb-16 md:mb-24">
              <div className="mb-6">
                <span className="text-sm font-bold text-[#1BAA87] tracking-wider uppercase">Featured</span>
              </div>
              <BlogCard post={featured} variant="featured" />
            </section>
          )}

          {gridPosts.length > 0 && (
            <section>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A1F2E]">Latest Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {gridPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} variant="card" />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {allPosts.length === 0 && (
            <div className="text-center py-20">
              {/* <div className="text-6xl mb-4">📝</div> */}
              <h3 className="text-2xl font-bold text-[#1A1F2E] mb-2">No posts yet</h3>
              <p className="text-[#6B7280] text-lg">Check back soon for our latest insights and updates.</p>
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
