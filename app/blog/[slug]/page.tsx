// app/blog/[slug]/page.tsx — Individual blog post display
import Link from "next/link";
import { getPostBySlug, getAllPosts, formatDate, BlogPost } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import ShareButtons from "@/components/blog/ShareButtons";
import ImageWithFallback from "@/components/ImageWithFallback";

interface Props {
  params: Promise<{ slug: string }>;
}

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='480' viewBox='0 0 800 480'%3E%3Crect width='800' height='480' fill='%23EAF6F2'/%3E%3Ccircle cx='400' cy='200' r='60' fill='%231BAA87' opacity='.25'/%3E%3Crect x='300' y='280' width='200' height='20' rx='4' fill='%231BAA87' opacity='.2'/%3E%3Crect x='340' y='314' width='120' height='14' rx='4' fill='%231BAA87' opacity='.15'/%3E%3C/svg%3E";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  if (!post) {
    return { title: "Post not found" };
  }
  return {
    title: `${post.title} | ProvidIusTech Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));
  const allPosts = await getAllPosts();

  if (!post) {
    return (
      <div className="max-h-screen bg-[#F6F6F6]">
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#1A1F2E] mb-2">Post not found</h1>
            <p className="text-[#6B7280] mb-6">This blog post doesn't exist or has been removed.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#1BAA87] hover:bg-[#169A79] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <FadeInOnScroll>
          <Footer />
        </FadeInOnScroll>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  return (
    <div className="bg-[#F6F6F6] max-h-screen">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero Section with Cover */}
        <section className="relative w-full overflow-hidden bg-white ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold bg-[#E6F7F4] text-[#1BAA87] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1F2E] leading-tight mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-6">
                  <span className="font-semibold text-[#1BAA87]">{post.author}</span>
                  <span>•</span>
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>

                <p className="text-lg text-[#6B7280] leading-relaxed">{post.excerpt}</p>
              </div>

              {/* Cover Image */}
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg bg-[#EAF6F2]">
                <ImageWithFallback
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  fallback={PLACEHOLDER}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-3">
              {/* Render HTML Content with Image Integration */}
              <div
                className="prose prose-sm sm:prose md:prose-lg max-w-none
                  prose-headings:text-[#1A1F2E] prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-h2:text-2xl sm:prose-h2:text-3xl
                  prose-h3:text-xl sm:prose-h3:text-2xl
                  prose-p:text-[#6B7280] prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-[#6B7280] prose-li:mb-2
                  prose-a:text-[#1BAA87] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#1A1F2E] prose-strong:font-semibold
                  prose-em:text-[#6B7280] prose-em:italic"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Additional Images Gallery */}
              {post.images && post.images.length > 0 && (
                <section className="mt-16 pt-16 border-t border-gray-200">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1F2E] mb-8">Key Visuals</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {post.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-[#EAF6F2]"
                      >
                        <ImageWithFallback
                          src={img}
                          alt={`${post.title} visual ${idx + 1}`}
                          className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                          fallback={PLACEHOLDER}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Footer CTA */}
              <section className="mt-16 pt-12 border-t border-gray-200">
                <div className="bg-gradient-to-r from-[#14b8a558] to-[#dbebf3] rounded-2xl p-8 md:p-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A1F2E] mb-3">Ready to automate your support?</h3>
                  <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                    Discover how ProvidIusTech can help you streamline customer support with AI-powered solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/founding"
                      className="inline-flex items-center justify-center bg-[#1BAA87] hover:bg-[#169A79] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-[#1BAA87] font-semibold px-6 py-3 rounded-xl border border-[#1BAA87] transition-colors"
                    >
                      Explore More Posts
                    </Link>
                  </div>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Post Meta */}
              <div className="sticky top-24 space-y-8">
                {/* <ShareButtons slug={post.slug} title={post.title} /> */}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-[#1A1F2E] mb-4">Related posts</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relPost) => (
                        <Link
                          key={relPost.slug}
                          href={`/blog/${relPost.slug}`}
                          className="block p-3 rounded-lg hover:bg-[#F6F6F6] transition-colors group"
                        >
                          <h4 className="text-sm font-semibold text-[#1A1F2E] group-hover:text-[#1BAA87] line-clamp-2 mb-1">
                            {relPost.title}
                          </h4>
                          <p className="text-xs text-[#9CA3AF]">{formatDate(relPost.publishedAt)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-[#1A1F2E] mb-2">About the author</h3>
                  <p className="text-sm text-[#6B7280]">{post.author}</p>
                  <p className="text-xs text-[#9CA3AF] mt-3">
                    Bringing insights on AI, automation, and customer support to help businesses scale efficiently.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <FadeInOnScroll>
        <Footer />
      </FadeInOnScroll>
    </div>
  );
}
